// Optional local inspection of a completed static export. This does not build,
// deploy or run in deployment CI.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { runInNewContext } from "node:vm";

const root = path.resolve(process.argv[2] || "out");
const site = "https://century-ai.eu";
const telegram = "https://t.me/vitalibakhmat";
const { defaultLocale, locales: localeSettings } = JSON.parse(await readFile(new URL("../src/locales/config.json", import.meta.url), "utf8"));
const locales = Object.keys(localeSettings);
const translatedLocales = locales.filter(locale => locale !== defaultLocale);
const cyrillicLocales = new Set(["uk", "be"]);
assert.equal(defaultLocale, "en", "The existing English route contract must remain the default");
assert.deepEqual([...locales].sort(), ["be", "de", "en", "es", "fr", "it", "pl", "uk"], "All eight supported languages must remain in the registry");
const localePrefix = locale => locale === defaultLocale ? "" : `/${locale}`;
const screenshotLabels = {
  en: /^Open .+ screenshot$/,
  de: /^Screenshot .+ öffnen$/u,
  pl: /^Otwórz zrzut ekranu „.+”$/u,
  uk: /^Відкрити знімок екрана «.+»$/u,
  fr: /^Voir la capture .+ en taille réelle$/u,
  be: /^Адкрыць здымак экрана: .+$/u,
  it: /^Apri la schermata .+$/u,
  es: /^Ver .+ a tamaño completo$/u,
};

// The public route contract for the site. Keep this list and
// src/lib/routes.ts aligned when deliberately adding or removing a page.
const englishRoutes = [
  "/",
  "/platform/",
  "/agents/",
  "/systems/",
  "/ai-gateway/",
  "/deployment/",
  "/ai-transformation/",
  "/security/",
  "/industries/",
  "/industries/banking/",
  "/industries/telecommunication/",
  "/industries/healthcare/",
  "/industries/utilities/",
  "/industries/insurance/",
  "/industries/retail/",
  "/industries/airlines/",
  "/about-us/",
  "/careers/",
  "/press/",
  "/contact/",
  "/blog/",
  "/blog/choose-first-ai-workflow/",
  "/blog/answers-need-sources/",
  "/blog/human-review/",
  "/blog/plan-ai-deployment/",
  "/privacy/",
];
assert.equal(englishRoutes.length, 26, "The public route contract must cover all existing content pages");
const publicRoutes = locales.flatMap(locale => englishRoutes.map(route => `${localePrefix(locale)}${route}`));
const routeSet = new Set(publicRoutes);
const unchangedImageAlts = new Set([
  "Century", "Century AI Platform", "Century Agents", "Century Systems", "Century AI Gateway",
  "Vitali Bakhmat", "Vadim Vladymtsev", "Egor Krychev",
]);
const screenshotRoutes = new Set(["/", "/platform/", "/agents/", "/systems/", "/ai-gateway/"]);
// Include every original diagram, including those not used by the current
// first tab. A missing generated asset must fail before a visitor selects it.
const diagramPaths = [
  "/media/century/diagrams/industry-deployment.svg",
  "/media/century/diagrams/industry-frontier.svg",
  "/media/century/diagrams/industry-governance.svg",
  "/media/century/diagrams/industry-platform.svg",
  "/media/century/diagrams/platform-data.svg",
  "/media/century/diagrams/platform-security.svg",
  "/media/industries/airlines/platform.svg",
  "/media/industries/healthcare/platform.svg",
  "/media/industries/utilities/platform.svg",
  "/media/insurance/platform.svg",
];
const retiredMockClasses = new Set([
  "prod-constellation", "prod-agent-visual", "prod-systems-visual",
  "prod-workspace", "gateway-demo", "example-board",
]);
const requiredAssets = [
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "CNAME",
  ".nojekyll",
  ...locales.map(locale => localeSettings[locale].socialImage.slice(1)),
  "brand/century-logo.svg",
  "brand/century-logo-white.svg",
  ...locales.map(locale => `${localePrefix(locale)}/ai-os/index.html`.slice(1)),
  ...diagramPaths.map(value => value.slice(1)),
  ...translatedLocales.flatMap(locale => diagramPaths.map(value => localizedDiagramPath(value, locale).slice(1))),
];
const externalDestinations = new Set([
  telegram,
  "https://vadimohka.com/",
  "https://www.linkedin.com/in/ekrychev/",
]);
const forbiddenConnections = [
  "century-ai.by",
  "century-ai.ru",
  "hoster.by",
  "mc.yandex",
  "metrika",
  "googletagmanager",
  "google-analytics",
  "api.telegram.org",
  "next_public_telegram",
  "/century-ai-next/",
];

function decodeEntities(value) {
  const named = { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " " };
  return value.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi, (match, entity) => {
    if (entity[0] !== "#") return named[entity.toLowerCase()] || match;
    const hexadecimal = entity[1].toLowerCase() === "x";
    const code = Number.parseInt(entity.slice(hexadecimal ? 2 : 1), hexadecimal ? 16 : 10);
    return code >= 0 && code <= 0x10ffff ? String.fromCodePoint(code) : match;
  });
}

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)]
    .map((match) => [match[1].toLowerCase(), decodeEntities(match[2] ?? match[3])]));
}

function hasClass(attrs, name) {
  return (attrs.class || "").split(/\s+/).includes(name);
}

function localeFor(route) {
  const firstSegment = route.split("/")[1];
  return translatedLocales.includes(firstSegment) ? firstSegment : defaultLocale;
}

function englishRouteFor(route) {
  return route.slice(localePrefix(localeFor(route)).length) || "/";
}

function expectedAlternates(route) {
  const englishRoute = englishRouteFor(route);
  return {
    ...Object.fromEntries(locales.map(locale => [locale, `${site}${localePrefix(locale)}${englishRoute}`])),
    "x-default": `${site}${englishRoute}`,
  };
}

function metaContent(tags, key, attribute = "property") {
  return tags.find(({ name, attrs }) => name === "meta" && attrs[attribute] === key)?.attrs.content;
}

function verifyAlternates(alternates, route, context) {
  assert.equal(alternates.length, locales.length + 1, `Expected all languages and x-default alternates in ${context}: ${route}`);
  assert.equal(new Set(alternates.map((attrs) => attrs.hreflang)).size, locales.length + 1, `Duplicate language alternates in ${context}: ${route}`);
  assert.deepEqual(Object.fromEntries(alternates.map((attrs) => [attrs.hreflang, attrs.href])), expectedAlternates(route), `Wrong language alternates in ${context}: ${route}`);
}

function originalMediaPath(value) {
  const locale = value?.match(/^\/media\/([^/]+)\//)?.[1];
  return translatedLocales.includes(locale) ? value.replace(`/media/${locale}/`, "/media/") : value;
}

function localizedDiagramPath(value, locale) {
  return locale === defaultLocale ? value : value.replace(/^\/media\//, `/media/${locale}/`);
}

const normalizeText = value => decodeEntities(value).replace(/\s+/g, " ").trim();
const catalogs = new Map();

async function loadCatalogs() {
  for (const locale of translatedLocales) {
    const [messages, assets, keep] = await Promise.all(["messages", "assets", "keep"].map(async name =>
      JSON.parse(await readFile(new URL(`../src/locales/${locale}/${name}.json`, import.meta.url), "utf8"))));
    const kept = new Set(Object.values(keep).flat().map(normalizeText));
    const englishPhrases = new Set();
    for (const entries of Object.values(messages)) {
      for (const [key, translation] of Object.entries(entries)) {
        const phrase = normalizeText(key.replace(/^@[^:]+:/, ""));
        // Test complete phrases that the catalog explicitly translates. Short
        // words, brands and intentional same-language values are ambiguous.
        if (phrase.length >= 24 && (phrase.match(/[A-Za-z]+/g) || []).length >= 4
          && !/\{\d+\}/.test(phrase) && !kept.has(phrase) && phrase !== normalizeText(translation)) englishPhrases.add(phrase);
      }
    }
    catalogs.set(locale, { assets, keep, englishPhrases });
  }
}

function verifyTranslatedCopy(markup, tags, locale, route) {
  const englishPhrases = catalogs.get(locale)?.englishPhrases;
  if (!englishPhrases) return;
  const text = markup.replace(/<[^>]+>/g, "\n").split("\n").map(normalizeText);
  for (const [, , content] of markup.matchAll(/<(p|h[1-6]|figcaption|summary)\b[^>]*>([^]*?)<\/\1>/gi)) {
    text.push(normalizeText(content.replace(/<[^>]+>/g, " ")));
  }
  for (const { attrs } of tags) {
    for (const name of ["alt", "title", "aria-label", "aria-description", "placeholder"]) {
      if (attrs[name]) text.push(normalizeText(attrs[name]));
    }
  }
  for (const phrase of text) {
    assert(!englishPhrases.has(phrase), `Untranslated English phrase on ${route}: ${phrase}`);
    assert(!/\{\d+\}/.test(phrase), `Unfilled translation placeholder on ${route}: ${phrase}`);
  }
}

function verifyFooterBrand(markup, route) {
  const signatures = [...markup.matchAll(/<a\b([^>]*)>([^]*?)<\/a\s*>/gi)]
    .map(match => ({ markup: match[0], attrs: attributes(match[1]), content: match[2] }))
    .filter(anchor => anchor.attrs["aria-label"] === "WE LEAVE IN THE AI CENTURY");
  assert.equal(signatures.length, 1, `Expected one fixed English footer signature: ${route}`);
  const signature = signatures[0];
  assert.equal(signature.attrs.href, `${localePrefix(localeFor(route))}/`, `Footer signature must link to the localized homepage: ${route}`);
  assert.equal(signature.attrs.lang, "en", `Footer signature must retain its English language: ${route}`);
  assert.equal(signature.attrs.dir, "ltr", `Footer signature must retain left-to-right ordering: ${route}`);
  assert.equal(signature.attrs.translate, "no", `Footer signature must disable automatic translation: ${route}`);
  assert(hasClass(signature.attrs, "notranslate"), `Footer signature needs its notranslate class: ${route}`);
  assert.equal(normalizeText(signature.content.replace(/<[^>]+>/g, " ")), "WE LEAVE IN THE AI", `Wrong fixed footer wording or duplicate CENTURY text: ${route}`);
  const images = [...signature.content.matchAll(/<img\b[^>]*>/gi)].map(match => attributes(match[0]));
  assert.equal(images.length, 1, `Footer signature needs one Century wordmark: ${route}`);
  assert.equal(images[0].src, "/brand/century-logo-white.svg", `Footer signature must use the Century wordmark: ${route}`);
  assert.equal(images[0].alt, "", `Footer wordmark must not repeat its accessible label: ${route}`);
  assert(signature.content.indexOf("WE LEAVE IN THE AI") < signature.content.indexOf("<img"), `Footer phrase must precede the wordmark: ${route}`);
  assert([...markup.matchAll(/<footer\b[^>]*>([^]*?)<\/footer\s*>/gi)].some(match => match[1].includes(signature.markup)), `Brand signature must appear in the footer: ${route}`);
}

const photoHashes = new Map();
async function verifyUniquePhotos(markup, route) {
  // Header desktop/mobile copies are alternate navigation, not repeated page
  // photography. Check content photographs, excluding app frames and logos.
  const main = markup.match(/<main\b[^>]*>([^]*?)<\/main\s*>/i)?.[1] || "";
  const images = [...main.matchAll(/<img\b[^>]*>/gi)].map(match => attributes(match[0]));
  const seenPaths = new Set();
  const seenHashes = new Map();
  for (const { src } of images) {
    if (!src || !/^\/(?:media|images|founders)\/.+\.(?:webp|jpe?g|png)$/i.test(src) || src.startsWith("/media/app/")) continue;
    const normalized = src.replace(/-(?:\d+|mobile)(?=\.(?:webp|jpe?g|png)$)/i, "");
    assert(!seenPaths.has(normalized), `Repeated photograph on ${route}: ${src}`);
    seenPaths.add(normalized);
    if (!photoHashes.has(src)) photoHashes.set(src, createHash("sha256").update(await readFile(localFile(new URL(src, site)))).digest("hex"));
    const hash = photoHashes.get(src);
    assert(!seenHashes.has(hash), `Identical photograph files on ${route}: ${seenHashes.get(hash)} and ${src}`);
    seenHashes.set(hash, src);
  }
}

function markupOnly(source) {
  // Preserve resource tags while ignoring embedded scripts, styles and comments.
  return source.replace(/<!--[^]*?-->/g, "")
    .replace(/(<(?:script|style)\b[^>]*>)[^]*?<\/(?:script|style)\s*>/gi, "$1");
}

async function requireFile(filename, context) {
  let info;
  try { info = await stat(filename); } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  assert(info?.isFile(), `${context}: ${path.relative(root, filename)}`);
}

function localFile(url) {
  const pathname = decodeURIComponent(url.pathname);
  const relative = pathname.endsWith("/") ? `${pathname}index.html` : pathname;
  const filename = path.resolve(root, `.${relative}`);
  assert(filename.startsWith(`${root}${path.sep}`), `Path leaves the export: ${url.pathname}`);
  return filename;
}

const pages = new Map();
async function readPage(filename) {
  if (!pages.has(filename)) {
    await requireFile(filename, "Missing page");
    const source = await readFile(filename, "utf8");
    const markup = markupOnly(source);
    const tags = [...markup.matchAll(/<([a-z][\w:-]*)\b[^>]*>/gi)]
      .map((match) => ({ name: match[1].toLowerCase(), attrs: attributes(match[0]) }));
    const ids = tags.flatMap(({ attrs }) => attrs.id ? [attrs.id] : []);
    assert.equal(new Set(ids).size, ids.length, `Duplicate element ID in ${path.relative(root, filename)}`);
    pages.set(filename, { source, markup, tags, ids: new Set(ids) });
  }
  return pages.get(filename);
}

let checkedReferences = 0;
const checkedTranslatedSvgs = new Set();
async function verifyLocalReference(value, fromRoute, { fragment = false } = {}) {
  const url = new URL(value, `${site}${fromRoute}`);
  assert.equal(url.origin, site, `Remote resource on ${fromRoute}: ${value}`);
  const original = originalMediaPath(url.pathname);
  if (diagramPaths.includes(original)) {
    assert.equal(url.pathname, localizedDiagramPath(original, localeFor(fromRoute)), `Wrong diagram language on ${fromRoute}: ${value}`);
  }
  assert(!/^\/ai-os(?:\/|$)/.test(englishRouteFor(url.pathname)), `Retired platform URL linked from ${fromRoute}: ${value}`);
  const filename = localFile(url);
  await requireFile(filename, `Broken reference from ${fromRoute}`);
  if (fragment && url.hash && filename.endsWith(".html")) {
    const target = await readPage(filename);
    const id = decodeURIComponent(url.hash.slice(1));
    assert(target.ids.has(id), `Missing anchor ${url.hash} linked from ${fromRoute} to ${url.pathname}`);
  }
  checkedReferences++;
}

async function verifyPlatformRedirect(locale) {
  const prefix = localePrefix(locale);
  const destination = `${prefix}/platform/`;
  const { source, markup, tags } = await readPage(path.join(root, prefix.slice(1), "ai-os/index.html"));
  assert.equal(tags.find(({ name }) => name === "html")?.attrs.lang, locale, "Wrong redirect language");
  const canonicals = tags.filter(({ name, attrs }) => name === "link" && attrs.rel === "canonical");
  assert.deepEqual(canonicals.map(({ attrs }) => attrs.href), [`${site}${destination}`], "Legacy platform canonical must retain the language");
  const robots = tags.find(({ name, attrs }) => name === "meta" && attrs.name === "robots")?.attrs.content || "";
  assert.match(robots, /\bnoindex\b/i, "Legacy platform page must not be indexed");
  const refresh = tags.find(({ name, attrs }) => name === "meta" && attrs["http-equiv"]?.toLowerCase() === "refresh")?.attrs.content || "";
  assert.equal(refresh, `0; url=${destination}`, "Legacy platform page needs a no-JavaScript refresh");
  assert(tags.some(({ name, attrs }) => name === "a" && attrs.href === destination), "Legacy platform page needs a working fallback link");
  assert(normalizeText(markup.replace(/<[^>]+>/g, " ")).includes(localeSettings[locale].redirect.message), `Wrong legacy fallback language: ${locale}`);
  await verifyLocalReference(destination, `${prefix}/ai-os/`);
  const script = source.match(/<script\b[^>]*>([^]*?)<\/script\s*>/i)?.[1];
  assert(script, "Legacy platform page needs its browser redirect");
  for (const [search, hash] of [["", ""], ["?utm_source=legacy&topic=knowledge%20base", "#operating-layer"]]) {
    const destinations = [];
    runInNewContext(script, {
      window: { location: { search, hash, replace: (url) => destinations.push(url) } },
    }, { timeout: 1000 });
    assert.deepEqual(destinations, [`${destination}${search}${hash}`], "Legacy platform redirect must preserve query parameters and anchors");
  }
}

async function verifyTranslatedSvg(value, fromRoute) {
  const url = new URL(value, `${site}${fromRoute}`);
  const locale = url.pathname.match(/^\/media\/([^/]+)\/.+\.svg$/)?.[1];
  if (!translatedLocales.includes(locale) || checkedTranslatedSvgs.has(url.pathname)) return;
  const translated = await readFile(localFile(url), "utf8");
  const original = await readFile(localFile(new URL(originalMediaPath(url.pathname), site)), "utf8");
  for (const tag of ["title", "desc"]) {
    const expression = new RegExp(`<${tag}\\b[^>]*>([^]*?)<\\/${tag}\\s*>`, "i");
    const sourceText = decodeEntities(original.match(expression)?.[1] || "").trim();
    if (!sourceText) continue;
    const translatedText = decodeEntities(translated.match(expression)?.[1] || "").trim();
    assert(translatedText, `Missing localized SVG ${tag}: ${url.pathname}`);
    assert.notEqual(translatedText, sourceText, `Untranslated SVG ${tag}: ${url.pathname}`);
    if (cyrillicLocales.has(locale)) assert(/[\u0400-\u04ff]/.test(translatedText), `Missing ${locale} Cyrillic SVG ${tag}: ${url.pathname}`);
  }
  const labels = svg => [...svg.matchAll(/<(text|tspan|title|desc)\b[^>]*>([^<]*)<\/\1>/g)]
    .map(match => ({ tag: match[1], text: normalizeText(match[2]) })).filter(item => item.text);
  const originalLabels = labels(original);
  const translatedLabels = labels(translated);
  const assetKey = `public${originalMediaPath(url.pathname)}`;
  const catalog = catalogs.get(locale);
  const translations = Object.fromEntries(Object.entries(catalog.assets[assetKey] || {}).map(([key, value]) => [normalizeText(key), normalizeText(value)]));
  const kept = new Set((catalog.keep[assetKey] || []).map(normalizeText));
  assert.equal(translatedLabels.length, originalLabels.length, `Missing translated SVG labels: ${url.pathname}`);
  for (const [index, label] of translatedLabels.entries()) {
    const originalLabel = originalLabels[index];
    assert.equal(label.tag, originalLabel.tag, `Changed SVG text structure: ${url.pathname}`);
    const expected = translations[originalLabel.text] ?? (kept.has(originalLabel.text) || /^\d+$/.test(originalLabel.text) ? originalLabel.text : undefined);
    assert(expected, `Missing ${locale} SVG catalog entry: ${assetKey}: ${originalLabel.text}`);
    assert.equal(label.text, expected, `Incorrect translated SVG label: ${url.pathname}: ${originalLabel.text}`);
    assert(!/\{\d+\}/.test(label.text), `Unfilled SVG translation placeholder: ${url.pathname}`);
  }
  checkedTranslatedSvgs.add(url.pathname);
}

async function inspectConnections(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await inspectConnections(filename);
    } else if (/\.(html|js|json|txt|xml|css)$/.test(entry.name)) {
      const lower = (await readFile(filename, "utf8")).toLowerCase();
      for (const marker of forbiddenConnections) {
        assert(!lower.includes(marker), `Unexpected connection marker in ${path.relative(root, filename)}: ${marker}`);
      }
    }
  }
}

try {
  for (const file of requiredAssets) await requireFile(path.join(root, file), "Missing export file");
  assert.equal((await readFile(path.join(root, "CNAME"), "utf8")).trim(), "century-ai.eu", "Wrong export domain");

  const sitemap = await readFile(path.join(root, "sitemap.xml"), "utf8");
  const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => decodeEntities(match[1]));
  assert.equal(new Set(locations).size, locations.length, "Sitemap contains duplicate URLs");
  assert.deepEqual(locations.sort(), publicRoutes.map((route) => `${site}${route}`).sort(), `Sitemap must contain all ${publicRoutes.length} content routes in ${locales.join("/").toUpperCase()}`);
  for (const [, entry] of sitemap.matchAll(/<url>([^]*?)<\/url>/g)) {
    const location = decodeEntities(entry.match(/<loc>(.*?)<\/loc>/)?.[1] || "");
    const alternates = [...entry.matchAll(/<xhtml:link\b[^>]*>/g)].map((match) => attributes(match[0]));
    verifyAlternates(alternates, new URL(location).pathname, "sitemap");
  }
  const robots = await readFile(path.join(root, "robots.txt"), "utf8");
  assert(robots.includes(`Sitemap: ${site}/sitemap.xml`), "Wrong sitemap in robots.txt");
  for (const locale of locales) await verifyPlatformRedirect(locale);
  await loadCatalogs();
  for (const locale of translatedLocales) {
    for (const original of diagramPaths) await verifyTranslatedSvg(localizedDiagramPath(original, locale), `${localePrefix(locale)}/`);
  }

  const titles = new Map();
  const descriptions = new Map();
  for (const route of publicRoutes) {
    const locale = localeFor(route);
    const englishRoute = englishRouteFor(route);
    const settings = localeSettings[locale];
    const page = await readPage(localFile(new URL(`${site}${route}`)));
    const { source, markup, tags } = page;
    verifyTranslatedCopy(markup, tags, locale, route);
    const title = decodeEntities(markup.match(/<title>([^]*?)<\/title>/i)?.[1] || "").trim();
    const html = tags.find(({ name }) => name === "html");
    const description = tags.find(({ name, attrs }) => name === "meta" && attrs.name === "description")?.attrs.content;
    const canonicals = tags.filter(({ name, attrs }) => name === "link" && attrs.rel === "canonical");
    const openGraphUrl = metaContent(tags, "og:url");
    assert.equal(html?.attrs.lang, locale, `Wrong document language: ${route}`);
    assert.equal(tags.filter(({ name }) => name === "h1").length, 1, `Expected one H1: ${route}`);
    verifyFooterBrand(markup, route);
    await verifyUniquePhotos(markup, route);
    assert(!tags.some(({ attrs }) => hasClass(attrs, "footer-wordmark")), `Oversized footer wordmark remains: ${route}`);
    const main = tags.find(({ name }) => name === "main");
    assert.equal(hasClass(main?.attrs || {}, "inner-page"), englishRoute !== "/", `Internal design scope must exclude all homepages: ${route}`);
    assert(title.includes("Century"), `Missing Century page title: ${route}`);
    assert(description?.trim(), `Missing description: ${route}`);
    if (cyrillicLocales.has(locale)) assert(/[\u0400-\u04ff]/.test(description), `Missing ${locale} Cyrillic description: ${route}`);
    const titleKey = `${locale}:${title}`;
    assert(!titles.has(titleKey), `Duplicate title on ${route} and ${titles.get(titleKey)}`);
    assert(!descriptions.has(description), `Duplicate description on ${route} and ${descriptions.get(description)}`);
    titles.set(titleKey, route);
    descriptions.set(description, route);
    assert.equal(canonicals.length, 1, `Expected one canonical URL: ${route}`);
    assert.equal(canonicals[0].attrs.href, `${site}${route}`, `Wrong canonical URL: ${route}`);
    assert.equal(openGraphUrl, `${site}${route}`, `Wrong Open Graph URL: ${route}`);
    verifyAlternates(tags.filter(({ name, attrs }) => name === "link" && attrs.rel === "alternate" && attrs.hreflang).map(({ attrs }) => attrs), route, "page head");
    assert.equal(metaContent(tags, "og:image"), `${site}${settings.socialImage}`, `Wrong social image: ${route}`);
    assert.equal(metaContent(tags, "twitter:image", "name"), `${site}${settings.socialImage}`, `Wrong Twitter image: ${route}`);
    assert.equal(metaContent(tags, "og:locale"), settings.openGraphLocale, `Wrong Open Graph locale: ${route}`);
    const alternateLocales = tags.filter(({ name, attrs }) => name === "meta" && attrs.property === "og:locale:alternate").map(({ attrs }) => attrs.content);
    assert.deepEqual(alternateLocales.sort(), locales.filter(language => language !== locale).map(language => localeSettings[language].openGraphLocale).sort(), `Wrong alternate Open Graph locales: ${route}`);
    for (const [prefix, attribute] of [["og", "property"], ["twitter", "name"]]) {
      assert.equal(metaContent(tags, `${prefix}:title`, attribute), title, `Wrong ${prefix} title: ${route}`);
      assert.equal(metaContent(tags, `${prefix}:description`, attribute), description, `Wrong ${prefix} description: ${route}`);
      assert.equal(metaContent(tags, `${prefix}:image:alt`, attribute), settings.imageAlt, `Wrong localized ${prefix} image alternative text: ${route}`);
    }
    assert(tags.some(({ name, attrs }) => name === "summary" && attrs["aria-label"] === settings.accessibleLabel), `Missing localized language control: ${route}`);
    const languageLinks = tags.filter(({ name, attrs }) => name === "a" && attrs["data-language-switch"]);
    assert.equal(languageLinks.length, locales.length, `Expected one native link for every language: ${route}`);
    for (const language of locales) {
      const matching = languageLinks.filter(({ attrs }) => attrs["data-language-switch"] === language);
      assert.equal(matching.length, 1, `Expected one ${language} language link: ${route}`);
      const { attrs } = matching[0];
      assert.equal(new URL(attrs.href, site).href, expectedAlternates(route)[language], `Language switch must preserve the page: ${route}`);
      assert.equal(attrs.hreflang, language, `Missing language link annotation: ${route}`);
      assert.equal(attrs.lang, language, `Language switch must identify its target language: ${route}`);
      assert.equal(attrs["aria-current"], language === locale ? "page" : undefined, `Current language must be identified: ${route}`);
    }
    assert(!tags.some(({ name }) => ["form", "input", "textarea", "select"].includes(name)), `Unexpected contact or input field: ${route}`);
    assert(tags.some(({ name, attrs }) => name === "a" && attrs.href === telegram), `Missing Century contact link: ${route}`);

    if (englishRoute === "/") {
      const data = [...source.matchAll(/<script\b([^>]*)>([^]*?)<\/script\s*>/gi)]
        .filter(match => attributes(match[1]).type === "application/ld+json").map(match => JSON.parse(match[2]));
      const graph = data.flatMap(item => item["@graph"] || []);
      const website = graph.find(item => item["@type"] === "WebSite");
      const webpage = graph.find(item => item["@type"] === "WebPage");
      assert(website && webpage, `Missing WebSite or WebPage structured data: ${route}`);
      assert.deepEqual([...website.inLanguage].sort(), [...locales].sort(), `Wrong WebSite structured-data languages: ${route}`);
      assert.equal(website.url, `${site}/`, `Shared WebSite URL must remain the canonical root: ${route}`);
      assert.equal(website["@id"], `${site}/#website`, `Wrong shared WebSite identifier: ${route}`);
      assert.equal(webpage.inLanguage, locale, `Wrong WebPage structured-data language: ${route}`);
      assert.equal(webpage.url, `${site}${route}`, `Wrong WebPage structured-data URL: ${route}`);
      assert.equal(webpage.isPartOf?.["@id"], website["@id"], `WebPage must belong to the shared WebSite: ${route}`);
    }

    const captures = [...markup.matchAll(/<figure\b([^>]*)>([^]*?)<\/figure\s*>/gi)]
      .filter((match) => hasClass(attributes(match[1]), "app-capture"));
    if (screenshotRoutes.has(englishRoute)) {
      assert(captures.length > 0, `Missing application screenshot figure: ${route}`);
    }
    for (const [, , contents] of captures) {
      const images = [...contents.matchAll(/<img\b[^>]*>/gi)].map((match) => attributes(match[0]));
      assert.equal(images.length, 1, `Expected one image per screenshot figure: ${route}`);
      const image = images[0];
      assert(/^\/media\/app\/.+\.webp$/.test(image.src || ""), `Screenshot must use a local /media/app/ WebP: ${route}`);
      assert(Number(image.width) > 0 && Number(image.height) > 0, `Screenshot needs intrinsic dimensions: ${route}`);
      // Metadata is checked here; screenshot pixels require separate visual review.
      assert(image.alt?.trim(), `Screenshot needs alternative text for ${locale}: ${route}`);
      assert.equal(/[\u0400-\u04ff]/.test(image.alt), cyrillicLocales.has(locale), `Screenshot alternative text has the wrong language: ${route}`);
      const caption = normalizeText((contents.match(/<figcaption\b[^>]*>([^]*?)<\/figcaption>/i)?.[1] || "").replace(/<[^>]+>/g, " "));
      assert(caption, `Screenshot needs a caption: ${route}`);
      assert.equal(/[\u0400-\u04ff]/.test(caption), cyrillicLocales.has(locale), `Screenshot caption has the wrong language: ${route}`);
      const openLinks = [...contents.matchAll(/<a\b[^>]*>/gi)].map((match) => attributes(match[0]))
        .filter((attrs) => hasClass(attrs, "app-capture-open"));
      assert.equal(openLinks.length, 1, `Screenshot needs one full-size image link: ${route}`);
      assert.equal(openLinks[0].href, image.src, `Screenshot link must open the displayed image: ${route}`);
      assert(screenshotLabels[locale].test(openLinks[0]["aria-label"] || ""), `Screenshot link needs a localized accessible label: ${route}`);
      assert.equal(openLinks[0].target, "_blank", `Screenshot link should open separately: ${route}`);
      assert(/\bnoopener\b/.test(openLinks[0].rel || ""), `Screenshot link needs noopener: ${route}`);
    }

    const englishPage = locale !== "en" ? await readPage(localFile(new URL(`${site}${englishRoute}`))) : undefined;
    if (englishPage) {
      assert.notEqual(description, metaContent(englishPage.tags, "description", "name"), `Untranslated page description: ${route}`);
      for (const [prefix, attribute] of [["og", "property"], ["twitter", "name"]]) {
        assert.notEqual(metaContent(tags, `${prefix}:image:alt`, attribute), metaContent(englishPage.tags, `${prefix}:image:alt`, attribute), `Untranslated ${prefix} image alternative text: ${route}`);
      }
    }

    for (const { name, attrs } of tags) {
      const retiredClass = (attrs.class || "").split(/\s+/).find((name) => retiredMockClasses.has(name));
      assert(!retiredClass, `Retired interface mock ${retiredClass} remains on ${route}`);
      if (name === "a" && attrs.href) {
        const destination = new URL(attrs.href, `${site}${route}`);
        if (destination.origin === site) {
          if (routeSet.has(destination.pathname) && localeFor(destination.pathname) !== locale) {
            const targetLocale = localeFor(destination.pathname);
            assert.equal(attrs["data-language-switch"], targetLocale, `Internal link leaves the selected language: ${route} → ${attrs.href}`);
            assert.equal(attrs.hreflang, targetLocale, `Missing language link annotation: ${route}`);
            assert.equal(attrs.lang, targetLocale, `Language switch must identify its target language: ${route}`);
            assert.equal(destination.pathname, new URL(expectedAlternates(route)[targetLocale]).pathname, `Language switch leaves the equivalent page: ${route}`);
          }
          await verifyLocalReference(attrs.href, route, { fragment: true });
        } else {
          assert(externalDestinations.has(destination.href), `Unexpected external link on ${route}: ${destination.href}`);
          assert.equal(attrs.target, "_blank", `External link should open separately: ${route}`);
          assert(/\bnoopener\b/.test(attrs.rel || "") && /\bnoreferrer\b/.test(attrs.rel || ""), `Missing external-link protection: ${route}`);
        }
      }
      if (name === "img") {
        assert(Object.hasOwn(attrs, "alt"), `Image missing alternative text attribute: ${route} → ${attrs.src}`);
        if (englishPage && attrs.alt?.trim() && !unchangedImageAlts.has(attrs.alt)) {
          const originalAlts = englishPage.tags.filter((tag) => tag.name === "img" && originalMediaPath(tag.attrs.src) === originalMediaPath(attrs.src)).map((tag) => tag.attrs.alt);
          assert(!originalAlts.includes(attrs.alt), `Untranslated image alternative text: ${route} → ${attrs.src}`);
        }
        if (/^\/media\/.+\.svg$/.test(attrs.src || "")) {
          const prefix = attrs.src.split("/")[2];
          const diagramLocale = translatedLocales.includes(prefix) ? prefix : defaultLocale;
          assert.equal(diagramLocale, locale, `Diagram must use the selected language: ${route} → ${attrs.src}`);
          await verifyTranslatedSvg(attrs.src, route);
        }
      }
      for (const attribute of ["src", "poster"]) {
        if (attrs[attribute] && !attrs[attribute].startsWith("data:")) await verifyLocalReference(attrs[attribute], route);
      }
      for (const attribute of ["srcset", "imagesrcset"]) {
        if (attrs[attribute]) {
          for (const candidate of attrs[attribute].split(",")) {
            await verifyLocalReference(candidate.trim().split(/\s+/)[0], route);
          }
        }
      }
      if (name === "link" && attrs.href && /\b(?:stylesheet|preload|modulepreload|icon)\b/.test(attrs.rel || "")) {
        await verifyLocalReference(attrs.href, route);
      }
    }
  }

  const previews = new Map();
  for (const [locale, { socialImage }] of Object.entries(localeSettings)) {
    const image = await readFile(localFile(new URL(socialImage, site)));
    assert.equal(image.subarray(0, 8).toString("hex"), "89504e470d0a1a0a", `OG asset is not a PNG: ${socialImage}`);
    assert.equal(image.readUInt32BE(16), 1200, `OG width must be 1200: ${socialImage}`);
    assert.equal(image.readUInt32BE(20), 630, `OG height must be 630: ${socialImage}`);
    for (const [otherLocale, otherImage] of previews) assert(!image.equals(otherImage), `${locale} and ${otherLocale} need distinct translated social previews`);
    previews.set(locale, image);
  }
  const notFound = await readPage(path.join(root, "404.html"));
  assert.equal(notFound.tags.find(({ name }) => name === "html")?.attrs.lang, "en", "Wrong global 404 document language");
  assert.equal(notFound.tags.filter(({ name }) => name === "h1").length, 1, "Global 404 must have one primary heading");
  const robots404 = notFound.tags.filter(({ name, attrs }) => name === "meta" && attrs.name === "robots").map(({ attrs }) => attrs.content).join(",");
  assert.match(robots404, /\bnoindex\b/i, "Global 404 must not be indexed");
  const recoverySections = [...notFound.markup.matchAll(/<section\b([^>]*)>([^]*?)<\/section\s*>/gi)];
  for (const language of locales) {
    const sections = recoverySections.filter(([, attrs]) => attributes(attrs).lang === language);
    assert.equal(sections.length, 1, `Global 404 needs one ${language} recovery section`);
    const contents = sections[0][2];
    assert(normalizeText(contents.replace(/<[^>]+>/g, " ")).includes(localeSettings[language].notFound.title), `Global 404 needs a ${language} recovery message`);
    const links = [...contents.matchAll(/<a\b[^>]*>/gi)].map(match => attributes(match[0]));
    const recovery = links.filter(attrs => attrs.href === `${localePrefix(language)}/` && attrs.hreflang === language && attrs.lang === language);
    assert.equal(recovery.length, 1, `Global 404 needs one ${language} homepage link`);
    await verifyLocalReference(recovery[0].href, "/404.html");
  }
  // Application pixels remain the recorded real captures in every locale.
  // Translate their surrounding labels; never substitute a drawn interface.
  const captures = JSON.parse(await readFile(new URL("../docs/app-capture-provenance.json", import.meta.url), "utf8"));
  for (const capture of captures) {
    const file = path.join(root, capture.asset.replace(/^public\//, ""));
    const bytes = await readFile(file);
    assert.equal(createHash("sha256").update(bytes).digest("hex"), capture.asset_sha256, `Application capture differs from its recorded original: ${capture.asset}`);
  }
  await inspectConnections(root);
  console.log(`Export inspection passed: ${publicRoutes.length} routes in ${locales.join("/").toUpperCase()}, locale-specific metadata and alternates, ${checkedReferences} local links/assets, ${checkedTranslatedSvgs.size} localized SVGs, fixed English footer signatures, unique content photographs, sitemap, contact destinations, application screenshots, ${locales.length} legacy platform redirects and the multilingual 404.`);
} catch (error) {
  console.error(`Export inspection failed: ${error.message}`);
  if (error.code === "ENOENT" || /Missing export file|Missing page/.test(error.message)) {
    console.error("Create a complete static export with npm run build first. This command does not build or deploy the website.");
  }
  process.exitCode = 1;
}
