// Optional manual inspection of the completed static export. This script
// does not build or deploy the site and is not part of the deployment workflow.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { runInNewContext } from "node:vm";

const root = path.resolve(process.argv[2] || "out");
const site = "https://century-ai.eu";
const telegram = "https://t.me/vitalibakhmat";

// The public route contract for the site. Keep this list and
// src/lib/routes.ts aligned when deliberately adding or removing a page.
const contentRoutes = [
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
const locales = ["en", "de", "uk"];
const localePrefix = locale => locale === "en" ? "" : `/${locale}`;
const publicRoutes = locales.flatMap(locale => contentRoutes.map(route => `${localePrefix(locale)}${route}`));
const publicRouteSet = new Set(publicRoutes);
const localeOf = route => route.match(/^\/(de|uk)(?:\/|$)/)?.[1] || "en";
const contentRouteOf = route => route.replace(/^\/(?:de|uk)(?=\/|$)/, "") || "/";
const openGraphLocales = { en: "en_GB", de: "de_DE", uk: "uk_UA" };
const openGraphImages = {
  en: "/og/century-ai-eu.png",
  de: "/og/century-ai-eu-de.png",
  uk: "/uk/og/century-ai-eu.png",
};
const languageSummaries = { en: "Language: English", de: "Sprache: Deutsch", uk: "Мова: українська" };
const redirectMessages = { en: "This page has moved:", de: "Diese Seite wurde verschoben:", uk: "Цю сторінку переміщено:" };
const unchangedImageAlts = new Set([
  "Century", "Century AI Platform", "Century Agents", "Century Systems", "Century AI Gateway",
  "Vitali Bakhmat", "Vadim Vladymtsev", "Egor Krychev",
]);
// The homepage includes the models/files captures through the Platform section.
const screenshotRoutes = new Set(["/", "/platform/", "/agents/", "/systems/", "/ai-gateway/"]);
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
const diagramPathSet = new Set(diagramPaths);
const retiredMockClasses = new Set([
  "prod-constellation", "prod-agent-visual", "prod-systems-visual",
  "prod-workspace", "gateway-demo", "example-board",
]);
const requiredAssets = [
  "404.html", "robots.txt", "sitemap.xml", "CNAME", ".nojekyll", "brand/century-logo.svg",
  ...Object.values(openGraphImages).map(url => url.slice(1)),
  ...locales.map(locale => `${localePrefix(locale)}/ai-os/index.html`.slice(1)),
];
const externalDestinations = new Set([
  telegram,
  "https://vadimohka.com/",
  "https://www.linkedin.com/in/ekrychev/",
]);
const forbiddenConnections = [
  "century-ai.by", "century-ai.ru", "hoster.by", "mc.yandex", "metrika",
  "googletagmanager", "google-analytics", "api.telegram.org", "next_public_telegram", "/century-ai-next/",
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

const normalizeText = value => decodeEntities(value).replace(/\s+/g, " ").trim();
const metaValues = (tags, key, attribute = "property") => tags
  .filter(({ name, attrs }) => name === "meta" && attrs[attribute] === key).map(({ attrs }) => attrs.content);
const metaContent = (tags, key, attribute = "property") => metaValues(tags, key, attribute)[0];

function expectedAlternates(route) {
  const base = contentRouteOf(route);
  return {
    ...Object.fromEntries(locales.map(locale => [locale, `${site}${localePrefix(locale)}${base}`])),
    "x-default": `${site}${base}`,
  };
}

function verifyAlternates(links, route, context) {
  assert.equal(links.length, 4, `Expected en, de, uk and x-default alternates in ${context}`);
  assert.equal(new Set(links.map(attrs => attrs.hreflang)).size, 4, `Duplicate language alternatives in ${context}`);
  assert.deepEqual(Object.fromEntries(links.map(attrs => [attrs.hreflang, attrs.href])), expectedAlternates(route), `Wrong reciprocal language alternatives in ${context}`);
}

function originalMediaPath(value) {
  return value?.replace(/^\/media\/de\//, "/media/").replace(/^\/uk\/media\//, "/media/");
}

function localizedDiagramPath(value, locale) {
  return locale === "de" ? value.replace(/^\/media\//, "/media/de/") : locale === "uk" ? `/uk${value}` : value;
}

function verifyAssetLocale(value, route) {
  const url = new URL(value, `${site}${route}`);
  const base = originalMediaPath(url.pathname);
  if (diagramPathSet.has(base)) {
    assert.equal(url.pathname, localizedDiagramPath(base, localeOf(route)), `Wrong diagram language on ${route}: ${value}`);
  }
}

function verifyFooterBrand(markup, route) {
  const label = "WE LEAVE IN THE AI CENTURY";
  const prefix = "WE LEAVE IN THE AI";
  const anchors = [...markup.matchAll(/<a\b([^>]*)>([^]*?)<\/a\s*>/gi)]
    .map(match => ({ markup: match[0], attrs: attributes(match[1]), content: match[2] }));
  const signatures = anchors.filter(anchor => anchor.attrs["aria-label"] === label);
  assert.equal(signatures.length, 1, `Expected one fixed footer brand signature: ${route}`);
  const signature = signatures[0];
  assert.equal(signature.attrs.href, `${localePrefix(localeOf(route))}/`, `Footer brand must link to the localized homepage: ${route}`);
  assert.equal(signature.attrs.lang, "en", `Footer brand wording must retain its English language: ${route}`);
  assert.equal(signature.attrs.dir, "ltr", `Footer brand must retain left-to-right ordering: ${route}`);
  assert.equal(signature.attrs.translate, "no", `Footer brand must disable automatic translation: ${route}`);
  assert(hasClass(signature.attrs, "notranslate"), `Footer brand needs its notranslate class: ${route}`);

  const prefixes = [...signature.content.matchAll(/<span\b([^>]*)>([^]*?)<\/span\s*>/gi)];
  assert.equal(prefixes.length, 1, `Footer brand needs one prefix: ${route}`);
  assert.equal(normalizeText(prefixes[0][2].replace(/<[^>]+>/g, " ")), prefix, `Wrong fixed footer brand wording: ${route}`);
  assert.equal(attributes(prefixes[0][1])["aria-hidden"], "true", `Footer prefix must not repeat the accessible brand label: ${route}`);
  const images = [...signature.content.matchAll(/<img\b[^>]*>/gi)].map(match => attributes(match[0]));
  assert.equal(images.length, 1, `Footer brand needs one Century wordmark image: ${route}`);
  assert.equal(images[0].src, "/brand/century-logo-white.svg", `Footer brand must use the original Century wordmark: ${route}`);
  assert.equal(images[0].alt, "", `Footer wordmark must not duplicate the accessible brand label: ${route}`);
  assert.equal(images[0].width, "221", `Footer wordmark needs its intrinsic width: ${route}`);
  assert.equal(images[0].height, "58", `Footer wordmark needs its intrinsic height: ${route}`);
  assert.equal(normalizeText(signature.content.replace(/<[^>]+>/g, " ")), prefix, `Footer signature must use the wordmark without an extra CENTURY text label: ${route}`);

  const footers = [...markup.matchAll(/<footer\b[^>]*>([^]*?)<\/footer\s*>/gi)]
    .map(match => match[1]).filter(content => content.includes(signature.markup));
  assert.equal(footers.length, 1, `Brand signature must appear inside the page footer: ${route}`);
  const footerText = normalizeText(footers[0].replace(/<[^>]+>/g, " "));
  assert.equal((footerText.match(/\bWE LEAVE IN THE AI\b/g) || []).length, 1, `Duplicate brand prefix in the footer: ${route}`);
  assert(!/\bCENTURY\b/.test(footerText), `Footer must not repeat CENTURY beside the wordmark: ${route}`);
  const footerWordmarks = [...footers[0].matchAll(/<img\b[^>]*>/gi)]
    .map(match => attributes(match[0])).filter(attrs => attrs.src === "/brand/century-logo-white.svg");
  assert.equal(footerWordmarks.length, 1, `Duplicate Century wordmark in the footer: ${route}`);
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
async function verifyLocalReference(value, fromRoute, { fragment = false } = {}) {
  const url = new URL(value, `${site}${fromRoute}`);
  assert.equal(url.origin, site, `Remote resource on ${fromRoute}: ${value}`);
  assert(!/^\/(?:(?:de|uk)\/)?ai-os(?:\/|$)/.test(url.pathname), `Retired platform URL linked from ${fromRoute}: ${value}`);
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
  const from = `${prefix}/ai-os/`;
  const to = `${prefix}/platform/`;
  const { source, markup, tags } = await readPage(localFile(new URL(from, site)));
  assert.equal(tags.find(({ name }) => name === "html")?.attrs.lang, locale, `Wrong legacy redirect document language: ${from}`);
  const canonicals = tags.filter(({ name, attrs }) => name === "link" && attrs.rel === "canonical");
  assert.deepEqual(canonicals.map(({ attrs }) => attrs.href), [`${site}${to}`], `Legacy platform canonical must point to ${to}`);
  assert.match(metaContent(tags, "robots", "name") || "", /\bnoindex\b/i, `Legacy platform page must not be indexed: ${from}`);
  const refresh = tags.find(({ name, attrs }) => name === "meta" && attrs["http-equiv"]?.toLowerCase() === "refresh")?.attrs.content || "";
  assert.equal(refresh.replace(/^0;\s*url=/i, ""), to, `Legacy platform page needs a no-JavaScript refresh to ${to}`);
  assert(/^0;\s*url=/i.test(refresh), `Legacy platform refresh must be immediate: ${from}`);
  assert(tags.some(({ name, attrs }) => name === "a" && attrs.href === to), `Legacy platform page needs a working fallback link to ${to}`);
  const bodyText = normalizeText((markup.match(/<body\b[^>]*>([^]*?)<\/body>/i)?.[1] || "").replace(/<[^>]+>/g, " "));
  assert(bodyText.includes(redirectMessages[locale]), `Legacy platform fallback copy has the wrong language: ${from}`);
  await verifyLocalReference(to, from);

  const script = source.match(/<script\b[^>]*>([^]*?)<\/script\s*>/i)?.[1];
  assert(script, `Legacy platform page needs its browser redirect: ${from}`);
  for (const [search, hash] of [["", ""], ["?utm_source=legacy&topic=knowledge%20base", "#operating-layer"]]) {
    const destinations = [];
    runInNewContext(script, {
      window: { location: { search, hash, replace: (url) => destinations.push(url) } },
    }, { timeout: 1000 });
    assert.deepEqual(destinations, [`${to}${search}${hash}`], `Legacy platform redirect must preserve language, query parameters and anchors: ${from}`);
  }
}

async function verifyNotFound() {
  const { markup, tags } = await readPage(path.join(root, "404.html"));
  assert.match(metaContent(tags, "robots", "name") || "", /\bnoindex\b/i, "The global 404 must not be indexed");
  assert.equal(tags.filter(({ name }) => name === "h1").length, 1, "Expected one H1 in the global 404");
  const sections = [...markup.matchAll(/<section\b([^>]*)>([^]*?)<\/section\s*>/gi)]
    .map(match => ({ attrs: attributes(match[1]), content: match[2] }));
  const headings = { en: "Page not found", de: "Seite nicht gefunden", uk: "Сторінку не знайдено" };
  for (const locale of locales) {
    const matches = sections.filter(section => section.attrs.lang === locale);
    assert.equal(matches.length, 1, `Missing or duplicated ${locale} section in the global 404`);
    const section = matches[0].content;
    assert(normalizeText(section.replace(/<[^>]+>/g, " ")).includes(headings[locale]), `Missing ${locale} 404 heading`);
    const links = [...section.matchAll(/<a\b[^>]*>/gi)].map(match => attributes(match[0]));
    const recovery = links.filter(attrs => attrs.href === `${localePrefix(locale)}/` && attrs.hreflang === locale && attrs.lang === locale);
    assert.equal(recovery.length, 1, `The ${locale} 404 needs a language-labelled homepage link`);
    await verifyLocalReference(recovery[0].href, "/404.html");
  }
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
  assert.deepEqual(locations.sort(), publicRoutes.map((route) => `${site}${route}`).sort(), "Sitemap must contain all 78 English, German and Ukrainian Century routes");
  for (const [, entry] of sitemap.matchAll(/<url>([^]*?)<\/url>/g)) {
    const url = decodeEntities(entry.match(/<loc>(.*?)<\/loc>/)?.[1] || "");
    const links = [...entry.matchAll(/<xhtml:link\b[^>]*>/g)].map(match => attributes(match[0]));
    verifyAlternates(links, new URL(url).pathname, `sitemap entry ${url}`);
  }
  const robots = await readFile(path.join(root, "robots.txt"), "utf8");
  assert(robots.includes(`Sitemap: ${site}/sitemap.xml`), "Wrong sitemap in robots.txt");
  for (const locale of locales) await verifyPlatformRedirect(locale);
  await verifyNotFound();

  const englishMessages = new Set();
  for (const domain of ["shared", "platform", "company", "industries"]) {
    const catalog = JSON.parse(await readFile(new URL(`../src/i18n/uk/${domain}.json`, import.meta.url), "utf8"));
    for (const [english, ukrainian] of Object.entries(catalog)) {
      assert(typeof ukrainian === "string" && ukrainian.trim(), `Missing Ukrainian catalog value: ${domain}: ${english}`);
      assert.deepEqual((ukrainian.match(/\{\d+\}/g) || []).sort(), (english.match(/\{\d+\}/g) || []).sort(), `Translation placeholders differ: ${domain}: ${english}`);
      if (normalizeText(english) !== normalizeText(ukrainian) && !/\{\d+\}/.test(english)) englishMessages.add(normalizeText(english));
    }
  }
  const titles = new Map();
  const descriptions = new Map();
  for (const route of publicRoutes) {
    const locale = localeOf(route);
    const baseRoute = contentRouteOf(route);
    const { source, markup, tags } = await readPage(localFile(new URL(`${site}${route}`)));
    const englishPage = locale === "en" ? undefined : await readPage(localFile(new URL(`${site}${baseRoute}`)));
    const title = decodeEntities(markup.match(/<title>([^]*?)<\/title>/i)?.[1] || "").trim();
    const description = metaContent(tags, "description", "name");
    const canonicals = tags.filter(({ name, attrs }) => name === "link" && attrs.rel === "canonical");
    assert.equal(tags.find(({ name }) => name === "html")?.attrs.lang, locale, `Wrong document language in static HTML: ${route}`);
    assert.equal(tags.filter(({ name }) => name === "h1").length, 1, `Expected one H1: ${route}`);
    verifyFooterBrand(markup, route);
    assert(!tags.some(({ attrs }) => hasClass(attrs, "footer-wordmark")), `Oversized footer wordmark remains: ${route}`);
    assert.equal(hasClass(tags.find(({ name }) => name === "main")?.attrs || {}, "inner-page"), baseRoute !== "/", `Internal design scope must exclude all homepages: ${route}`);
    assert(title.includes("Century"), `Missing Century page title: ${route}`);
    assert(description?.trim(), `Missing description: ${route}`);
    // Product names remain brand names in every language. Require uniqueness
    // within each language, while translations may retain those product titles.
    const titleKey = `${locale}:${title}`;
    const descriptionKey = `${locale}:${description}`;
    assert(!titles.has(titleKey), `Duplicate title on ${route} and ${titles.get(titleKey)}`);
    assert(!descriptions.has(descriptionKey), `Duplicate description on ${route} and ${descriptions.get(descriptionKey)}`);
    titles.set(titleKey, route);
    descriptions.set(descriptionKey, route);
    if (englishPage) assert.notEqual(description, metaContent(englishPage.tags, "description", "name"), `Untranslated page description: ${route}`);
    if (locale === "uk") {
      assert(/[\u0400-\u04ff]/.test(description), `Missing Ukrainian description: ${route}`);
      // A separate Century wordmark and its product suffix form one brand
      // name. Generic uses of "Agents" elsewhere still require translation.
      const proseMarkup = markup.replace(/<span\b[^>]*\bclass="[^"]*productLockup[^"]*"[^>]*>\s*<img\b[^>]*>\s*<span>(?:Agents|Systems|AI Platform|AI Gateway)<\/span>\s*<\/span>/g, "");
      const visibleText = proseMarkup.replace(/<[^>]+>/g, "\n").split("\n").map(normalizeText).filter(Boolean);
      for (const text of visibleText) {
        assert(!englishMessages.has(text), `Untranslated English copy on ${route}: ${text}`);
        assert(!/\{\d+\}/.test(text), `Unfilled translation placeholder on ${route}: ${text}`);
      }
      for (const { attrs } of tags) {
        for (const attribute of ["alt", "title", "aria-label", "aria-description", "placeholder"]) {
          if (attrs[attribute]) {
            assert(!englishMessages.has(normalizeText(attrs[attribute])), `Untranslated ${attribute} on ${route}: ${attrs[attribute]}`);
            assert(!/\{\d+\}/.test(attrs[attribute]), `Unfilled ${attribute} placeholder on ${route}: ${attrs[attribute]}`);
          }
        }
      }
    }
    assert.equal(canonicals.length, 1, `Expected one canonical URL: ${route}`);
    assert.equal(canonicals[0].attrs.href, `${site}${route}`, `Wrong canonical URL: ${route}`);
    assert.equal(metaContent(tags, "og:url"), `${site}${route}`, `Wrong Open Graph URL: ${route}`);
    verifyAlternates(tags.filter(({ name, attrs }) => name === "link" && attrs.rel === "alternate" && attrs.hreflang).map(({ attrs }) => attrs), route, route);
    assert.equal(metaContent(tags, "og:locale"), openGraphLocales[locale], `Wrong Open Graph locale: ${route}`);
    assert.deepEqual(metaValues(tags, "og:locale:alternate").sort(), locales.filter(other => other !== locale).map(other => openGraphLocales[other]).sort(), `Wrong alternate Open Graph locales: ${route}`);
    for (const [prefix, attribute] of [["og", "property"], ["twitter", "name"]]) {
      assert.equal(metaContent(tags, `${prefix}:title`, attribute), title, `Wrong ${prefix} title: ${route}`);
      assert.equal(metaContent(tags, `${prefix}:description`, attribute), description, `Wrong ${prefix} description: ${route}`);
      assert.equal(metaContent(tags, `${prefix}:image`, attribute), `${site}${openGraphImages[locale]}`, `Wrong localized ${prefix} image: ${route}`);
      const imageAlt = metaContent(tags, `${prefix}:image:alt`, attribute);
      assert(imageAlt?.trim(), `Missing ${prefix} image alternative text: ${route}`);
      if (englishPage) assert.notEqual(imageAlt, metaContent(englishPage.tags, `${prefix}:image:alt`, attribute), `Untranslated ${prefix} image alternative text: ${route}`);
      if (locale === "uk") assert(/[\u0400-\u04ff]/.test(imageAlt), `Missing Ukrainian ${prefix} image alternative text: ${route}`);
    }
    assert(!tags.some(({ name }) => ["form", "input", "textarea", "select"].includes(name)), `Unexpected contact or input field: ${route}`);
    assert(tags.some(({ name, attrs }) => name === "a" && attrs.href === telegram), `Missing Century contact link: ${route}`);

    assert(tags.some(({ name, attrs }) => name === "summary" && attrs["aria-label"] === languageSummaries[locale]), `Missing localized language control: ${route}`);
    const currentLanguages = tags.filter(({ attrs }) => attrs["data-language-current"]);
    assert.equal(currentLanguages.length, 1, `Expected one current language in static HTML: ${route}`);
    const currentLanguage = currentLanguages[0];
    assert.equal(currentLanguage.name, "span", `Current language should be a text label: ${route}`);
    assert.equal(currentLanguage.attrs["data-language-current"], locale, `Wrong current-language marker: ${route}`);
    assert.equal(currentLanguage.attrs.lang, locale, `Wrong current-language label language: ${route}`);
    assert.equal(currentLanguage.attrs["aria-current"], "true", `Current language must be identified: ${route}`);
    const languageLinks = tags.filter(({ name, attrs }) => name === "a" && attrs["data-language-switch"]);
    assert.equal(languageLinks.length, 2, `Expected two alternate-language links in static HTML: ${route}`);
    for (const language of locales.filter(other => other !== locale)) {
      const matches = languageLinks.filter(({ attrs }) => attrs["data-language-switch"] === language);
      assert.equal(matches.length, 1, `Missing or duplicated ${language} switch on ${route}`);
      const { attrs } = matches[0];
      assert.equal(new URL(attrs.href, site).href, expectedAlternates(route)[language], `Language switch changes the content route on ${route}`);
      assert.equal(attrs.hreflang, language, `Language switch has wrong hreflang on ${route}`);
      assert.equal(attrs.lang, language, `Language switch has wrong label language on ${route}`);
      assert.equal(attrs["aria-current"], undefined, `An alternate language cannot be current: ${route}`);
    }
    if (baseRoute === "/") {
      const data = [...source.matchAll(/<script\b([^>]*)>([^]*?)<\/script\s*>/gi)]
        .filter(match => attributes(match[1]).type === "application/ld+json")
        .map(match => JSON.parse(match[2]));
      const graph = data.flatMap(item => item["@graph"] || []);
      const website = graph.find(item => item["@type"] === "WebSite");
      const webpage = graph.find(item => item["@type"] === "WebPage");
      assert(website && webpage, `Missing WebSite or WebPage structured data: ${route}`);
      assert.deepEqual([...website.inLanguage].sort(), [...locales].sort(), `Wrong WebSite structured-data languages: ${route}`);
      assert.equal(website.url, `${site}/`, `The shared WebSite URL must remain the canonical root: ${route}`);
      assert.equal(website["@id"], `${site}/#website`, `Wrong shared WebSite identifier: ${route}`);
      assert.equal(webpage.inLanguage, locale, `Wrong WebPage structured-data language: ${route}`);
      assert.equal(webpage.url, `${site}${route}`, `Wrong WebPage structured-data URL: ${route}`);
      assert.equal(webpage.isPartOf?.["@id"], website["@id"], `WebPage must belong to the shared WebSite: ${route}`);
    }

    const captures = [...markup.matchAll(/<figure\b([^>]*)>([^]*?)<\/figure\s*>/gi)]
      .filter((match) => hasClass(attributes(match[1]), "app-capture"));
    if (screenshotRoutes.has(baseRoute)) assert(captures.length > 0, `Missing application screenshot figure: ${route}`);
    for (const [, , contents] of captures) {
      const images = [...contents.matchAll(/<img\b[^>]*>/gi)].map((match) => attributes(match[0]));
      assert.equal(images.length, 1, `Expected one image per screenshot figure: ${route}`);
      const image = images[0];
      assert(/^\/media\/app\/.+\.webp$/.test(image.src || ""), `Screenshot must use a local /media/app/ WebP: ${route}`);
      assert(Number(image.width) > 0 && Number(image.height) > 0, `Screenshot needs intrinsic dimensions: ${route}`);
      assert(image.alt?.trim(), `Screenshot needs alternative text: ${route}`);
      assert.equal(/[\u0400-\u04ff]/.test(image.alt), locale === "uk", `Screenshot alternative text has the wrong language: ${route}`);
      const caption = normalizeText((contents.match(/<figcaption\b[^>]*>([^]*?)<\/figcaption>/i)?.[1] || "").replace(/<[^>]+>/g, " "));
      assert(caption, `Screenshot needs a caption: ${route}`);
      assert.equal(/[\u0400-\u04ff]/.test(caption), locale === "uk", `Screenshot caption has the wrong language: ${route}`);
      const openLinks = [...contents.matchAll(/<a\b[^>]*>/gi)].map((match) => attributes(match[0]))
        .filter((attrs) => hasClass(attrs, "app-capture-open"));
      assert.equal(openLinks.length, 1, `Screenshot needs one full-size image link: ${route}`);
      assert.equal(openLinks[0].href, image.src, `Screenshot link must open the displayed image: ${route}`);
      const labelPatterns = { en: /^Open .+ screenshot$/, de: /^Screenshot .+ öffnen$/u, uk: /^Відкрити знімок екрана «.+»$/ };
      assert(labelPatterns[locale].test(openLinks[0]["aria-label"] || ""), `Screenshot link needs a localized accessible label: ${route}`);
      assert.equal(openLinks[0].target, "_blank", `Screenshot link should open separately: ${route}`);
      assert(/\bnoopener\b/.test(openLinks[0].rel || ""), `Screenshot link needs noopener: ${route}`);
    }

    for (const { name, attrs } of tags) {
      const retiredClass = (attrs.class || "").split(/\s+/).find((name) => retiredMockClasses.has(name));
      assert(!retiredClass, `Retired interface mock ${retiredClass} remains on ${route}`);
      if (name === "a" && attrs.href) {
        const destination = new URL(attrs.href, `${site}${route}`);
        if (destination.origin === site) {
          if (publicRouteSet.has(destination.pathname) && localeOf(destination.pathname) !== locale) {
            const targetLocale = localeOf(destination.pathname);
            assert.equal(attrs["data-language-switch"], targetLocale, `Internal link leaves the selected language: ${route} → ${attrs.href}`);
            assert.equal(attrs.hreflang, targetLocale, `Language switch must identify its target language: ${route}`);
            assert.equal(attrs.lang, targetLocale, `Language switch must identify its label language: ${route}`);
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
          const originalAlts = englishPage.tags.filter(tag => tag.name === "img" && originalMediaPath(tag.attrs.src) === originalMediaPath(attrs.src)).map(tag => tag.attrs.alt);
          assert(!originalAlts.includes(attrs.alt), `Untranslated image alternative text: ${route} → ${attrs.src}`);
        }
      }
      for (const attribute of ["src", "poster"]) {
        if (attrs[attribute] && !attrs[attribute].startsWith("data:")) {
          verifyAssetLocale(attrs[attribute], route);
          await verifyLocalReference(attrs[attribute], route);
        }
      }
      for (const attribute of ["srcset", "imagesrcset"]) {
        if (attrs[attribute]) {
          for (const candidate of attrs[attribute].split(",")) {
            const value = candidate.trim().split(/\s+/)[0];
            verifyAssetLocale(value, route);
            await verifyLocalReference(value, route);
          }
        }
      }
      if (name === "link" && attrs.href && /\b(?:stylesheet|preload|modulepreload|icon)\b/.test(attrs.rel || "")) {
        await verifyLocalReference(attrs.href, route);
      }
    }
  }

  const previews = new Map();
  for (const [locale, url] of Object.entries(openGraphImages)) {
    const image = await readFile(localFile(new URL(url, site)));
    assert.equal(image.subarray(0, 8).toString("hex"), "89504e470d0a1a0a", `OG asset is not a PNG: ${url}`);
    assert.equal(image.readUInt32BE(16), 1200, `OG width must be 1200: ${url}`);
    assert.equal(image.readUInt32BE(20), 630, `OG height must be 630: ${url}`);
    for (const [otherLocale, otherImage] of previews) assert(!image.equals(otherImage), `${locale} and ${otherLocale} social previews must have their own artwork`);
    previews.set(locale, image);
  }

  const ukrainianDiagrams = JSON.parse(await readFile(new URL("../src/i18n/uk/diagrams.json", import.meta.url), "utf8"));
  const germanCatalogs = Object.fromEntries(await Promise.all(["site", "articles", "industries", "platform"].map(async domain =>
    [domain, JSON.parse(await readFile(new URL(`../src/locales/de/${domain}.json`, import.meta.url), "utf8"))])));
  const diagramText = svg => [...svg.matchAll(/<(text|tspan|title|desc)\b[^>]*>([^<]*)<\/\1>/g)]
    .map(match => ({ tag: match[1], text: match[2].replace(/\s+/g, " ").trim() })).filter(item => item.text);
  for (const url of diagramPaths) {
    const original = diagramText(await readFile(localFile(new URL(url, site)), "utf8"));
    for (const locale of ["de", "uk"]) {
      const translatedUrl = localizedDiagramPath(url, locale);
      const translated = diagramText(await readFile(localFile(new URL(translatedUrl, site)), "utf8"));
      assert.equal(translated.length, original.length, `Missing translated SVG labels: ${translatedUrl}`);
      for (const [index, item] of original.entries()) {
        assert.equal(translated[index].tag, item.tag, `Changed SVG text structure: ${translatedUrl}`);
        let expected;
        if (locale === "uk") {
          assert(Object.hasOwn(ukrainianDiagrams, item.text), `Missing Ukrainian SVG catalog key: ${item.text}`);
          expected = ukrainianDiagrams[item.text];
        } else {
          const key = normalizeText(item.text);
          const order = /^\/media\/(?:industries|insurance)\//.test(url) ? ["industries", "site", "platform", "articles"] : ["platform", "site", "industries", "articles"];
          const domain = order.find(name => Object.hasOwn(germanCatalogs[name], key));
          assert(domain || /^\d+$/.test(key), `Missing German SVG catalog key: ${key}`);
          expected = domain ? germanCatalogs[domain][key] : key;
        }
        assert.equal(normalizeText(translated[index].text), normalizeText(expected), `Untranslated SVG label in ${translatedUrl}: ${item.text}`);
      }
      for (const tag of ["title", "desc"]) {
        const translatedText = translated.find(item => item.tag === tag)?.text;
        const sourceText = original.find(item => item.tag === tag)?.text;
        assert(translatedText, `Missing ${locale} SVG ${tag}: ${translatedUrl}`);
        assert.notEqual(normalizeText(translatedText), normalizeText(sourceText || ""), `Untranslated SVG ${tag}: ${translatedUrl}`);
        if (locale === "uk") assert(/[\u0400-\u04ff]/.test(translatedText), `Missing Ukrainian SVG ${tag}: ${translatedUrl}`);
      }
    }
  }

  // Real application frames are shared between languages. Validate the
  // recorded originals rather than silently substituting translated mockups.
  const captures = JSON.parse(await readFile(new URL("../docs/app-capture-provenance.json", import.meta.url), "utf8"));
  for (const capture of captures) {
    const file = path.join(root, capture.asset.replace(/^public\//, ""));
    const bytes = await readFile(file);
    assert.equal(createHash("sha256").update(bytes).digest("hex"), capture.asset_sha256, `Application capture differs from the recorded original: ${capture.asset}`);
  }
  await inspectConnections(root);
  console.log(`Optional export inspection passed: ${publicRoutes.length} routes in EN/DE/UK, localized metadata and navigation, reciprocal language alternatives, fixed footer brand signatures, ${checkedReferences} local links/assets, ${diagramPaths.length * 2} translated diagrams, three social previews, original application screenshots, three legacy platform redirects and a trilingual 404.`);
} catch (error) {
  console.error(`Export inspection failed: ${error.message}`);
  if (error.code === "ENOENT" || /Missing export file|Missing page/.test(error.message)) {
    console.error("Create a complete static export with npm run build first. This command does not build or deploy the website.");
  }
  process.exitCode = 1;
}
