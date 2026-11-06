// Inspect a completed static export locally.
// This script does not build or deploy the site.
import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { runInNewContext } from "node:vm";

const root = path.resolve(process.argv[2] || "out");
const site = "https://century-ai.eu";
const telegram = "https://t.me/vitalibakhmat";
const locales = ["en", "de", "pl"];
const localeSettings = {
  en: { ogLocale: "en_GB", ogImage: "og/century-ai-eu.png", summary: "Language: English", screenshot: /^Open .+ screenshot$/ },
  de: { ogLocale: "de_DE", ogImage: "og/century-ai-eu-de.png", summary: "Sprache: Deutsch", screenshot: /^Screenshot .+ öffnen$/u },
  pl: { ogLocale: "pl_PL", ogImage: "og/century-ai-pl.png", summary: "Język: polski", screenshot: /^Otwórz zrzut ekranu „.+”$/u },
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
const publicRoutes = locales.flatMap(locale => englishRoutes.map(route => locale === "en" ? route : `/${locale}${route}`));
const routeSet = new Set(publicRoutes);
const unchangedImageAlts = new Set([
  "Century", "Century AI Platform", "Century Agents", "Century Systems", "Century AI Gateway",
  "Vitali Bakhmat", "Vadim Vladymtsev", "Egor Krychev",
]);
const screenshotRoutes = new Set(["/", "/platform/", "/agents/", "/systems/", "/ai-gateway/"]);
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
  "og/century-ai-eu.png",
  "og/century-ai-eu-de.png",
  "og/century-ai-pl.png",
  "brand/century-logo.svg",
  "ai-os/index.html",
  "de/ai-os/index.html",
  "pl/ai-os/index.html",
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
  return route.match(/^\/(de|pl)(?:\/|$)/)?.[1] || "en";
}

function englishRouteFor(route) {
  return localeFor(route) === "en" ? route : route.slice(3) || "/";
}

function expectedAlternates(route) {
  const englishRoute = englishRouteFor(route);
  return {
    en: `${site}${englishRoute}`,
    de: `${site}/de${englishRoute}`,
    pl: `${site}/pl${englishRoute}`,
    "x-default": `${site}${englishRoute}`,
  };
}

function metaContent(tags, key, attribute = "property") {
  return tags.find(({ name, attrs }) => name === "meta" && attrs[attribute] === key)?.attrs.content;
}

function verifyAlternates(alternates, route, context) {
  assert.equal(alternates.length, 4, `Expected EN, DE, PL and x-default alternates in ${context}: ${route}`);
  assert.equal(new Set(alternates.map((attrs) => attrs.hreflang)).size, 4, `Duplicate language alternates in ${context}: ${route}`);
  assert.deepEqual(Object.fromEntries(alternates.map((attrs) => [attrs.hreflang, attrs.href])), expectedAlternates(route), `Wrong language alternates in ${context}: ${route}`);
}

function originalMediaPath(value) {
  return value?.replace(/^\/media\/(?:de|pl)\//, "/media/");
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
  assert(!/^\/(?:(?:de|pl)\/)?ai-os(?:\/|$)/.test(url.pathname), `Retired platform URL linked from ${fromRoute}: ${value}`);
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
  const prefix = locale === "en" ? "" : `/${locale}`;
  const destination = `${prefix}/platform/`;
  const { source, tags } = await readPage(path.join(root, prefix.slice(1), "ai-os/index.html"));
  assert.equal(tags.find(({ name }) => name === "html")?.attrs.lang, locale, "Wrong redirect language");
  const canonicals = tags.filter(({ name, attrs }) => name === "link" && attrs.rel === "canonical");
  assert.deepEqual(canonicals.map(({ attrs }) => attrs.href), [`${site}${destination}`], "Legacy platform canonical must retain the language");
  const robots = tags.find(({ name, attrs }) => name === "meta" && attrs.name === "robots")?.attrs.content || "";
  assert.match(robots, /\bnoindex\b/i, "Legacy platform page must not be indexed");
  const refresh = tags.find(({ name, attrs }) => name === "meta" && attrs["http-equiv"]?.toLowerCase() === "refresh")?.attrs.content || "";
  assert.equal(refresh, `0; url=${destination}`, "Legacy platform page needs a no-JavaScript refresh");
  assert(tags.some(({ name, attrs }) => name === "a" && attrs.href === destination), "Legacy platform page needs a working fallback link");
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
  if (!/^\/media\/(?:de|pl)\/.+\.svg$/.test(url.pathname) || checkedTranslatedSvgs.has(url.pathname)) return;
  const translated = await readFile(localFile(url), "utf8");
  const original = await readFile(localFile(new URL(originalMediaPath(url.pathname), site)), "utf8");
  for (const tag of ["title", "desc"]) {
    const expression = new RegExp(`<${tag}\\b[^>]*>([^]*?)<\\/${tag}\\s*>`, "i");
    const sourceText = decodeEntities(original.match(expression)?.[1] || "").trim();
    if (!sourceText) continue;
    const translatedText = decodeEntities(translated.match(expression)?.[1] || "").trim();
    assert(translatedText, `Missing localized SVG ${tag}: ${url.pathname}`);
    assert.notEqual(translatedText, sourceText, `Untranslated SVG ${tag}: ${url.pathname}`);
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
  assert.deepEqual(locations.sort(), publicRoutes.map((route) => `${site}${route}`).sort(), "Sitemap must contain all 78 English, German and Polish Century routes");
  for (const [, entry] of sitemap.matchAll(/<url>([^]*?)<\/url>/g)) {
    const location = decodeEntities(entry.match(/<loc>(.*?)<\/loc>/)?.[1] || "");
    const alternates = [...entry.matchAll(/<xhtml:link\b[^>]*>/g)].map((match) => attributes(match[0]));
    verifyAlternates(alternates, new URL(location).pathname, "sitemap");
  }
  const robots = await readFile(path.join(root, "robots.txt"), "utf8");
  assert(robots.includes(`Sitemap: ${site}/sitemap.xml`), "Wrong sitemap in robots.txt");
  for (const locale of locales) await verifyPlatformRedirect(locale);

  const titles = new Map();
  const descriptions = new Map();
  for (const route of publicRoutes) {
    const locale = localeFor(route);
    const englishRoute = englishRouteFor(route);
    const settings = localeSettings[locale];
    const page = await readPage(localFile(new URL(`${site}${route}`)));
    const { markup, tags } = page;
    const title = decodeEntities(markup.match(/<title>([^]*?)<\/title>/i)?.[1] || "").trim();
    const html = tags.find(({ name }) => name === "html");
    const description = tags.find(({ name, attrs }) => name === "meta" && attrs.name === "description")?.attrs.content;
    const canonicals = tags.filter(({ name, attrs }) => name === "link" && attrs.rel === "canonical");
    const openGraphUrl = metaContent(tags, "og:url");
    assert.equal(html?.attrs.lang, locale, `Wrong document language: ${route}`);
    assert.equal(tags.filter(({ name }) => name === "h1").length, 1, `Expected one H1: ${route}`);
    assert(!tags.some(({ attrs }) => hasClass(attrs, "footer-wordmark")), `Oversized footer wordmark remains: ${route}`);
    const main = tags.find(({ name }) => name === "main");
    assert.equal(hasClass(main?.attrs || {}, "inner-page"), englishRoute !== "/", `Internal design scope must exclude all homepages: ${route}`);
    assert(title.includes("Century"), `Missing Century page title: ${route}`);
    assert(description?.trim(), `Missing description: ${route}`);
    const titleKey = `${locale}:${title}`;
    assert(!titles.has(titleKey), `Duplicate title on ${route} and ${titles.get(titleKey)}`);
    assert(!descriptions.has(description), `Duplicate description on ${route} and ${descriptions.get(description)}`);
    titles.set(titleKey, route);
    descriptions.set(description, route);
    assert.equal(canonicals.length, 1, `Expected one canonical URL: ${route}`);
    assert.equal(canonicals[0].attrs.href, `${site}${route}`, `Wrong canonical URL: ${route}`);
    assert.equal(openGraphUrl, `${site}${route}`, `Wrong Open Graph URL: ${route}`);
    verifyAlternates(tags.filter(({ name, attrs }) => name === "link" && attrs.rel === "alternate" && attrs.hreflang).map(({ attrs }) => attrs), route, "page head");
    assert.equal(metaContent(tags, "og:image"), `${site}/${settings.ogImage}`, `Wrong social image: ${route}`);
    assert.equal(metaContent(tags, "twitter:image", "name"), `${site}/${settings.ogImage}`, `Wrong Twitter image: ${route}`);
    assert.equal(metaContent(tags, "og:locale"), settings.ogLocale, `Wrong Open Graph locale: ${route}`);
    const alternateLocales = tags.filter(({ name, attrs }) => name === "meta" && attrs.property === "og:locale:alternate").map(({ attrs }) => attrs.content);
    assert.deepEqual(alternateLocales.sort(), locales.filter(language => language !== locale).map(language => localeSettings[language].ogLocale).sort(), `Wrong alternate Open Graph locales: ${route}`);
    for (const [prefix, attribute] of [["og", "property"], ["twitter", "name"]]) {
      assert.equal(metaContent(tags, `${prefix}:title`, attribute), title, `Wrong ${prefix} title: ${route}`);
      assert.equal(metaContent(tags, `${prefix}:description`, attribute), description, `Wrong ${prefix} description: ${route}`);
      assert(metaContent(tags, `${prefix}:image:alt`, attribute)?.trim(), `Missing ${prefix} image alternative text: ${route}`);
    }
    assert(tags.some(({ name, attrs }) => name === "summary" && attrs["aria-label"] === settings.summary), `Missing localized language control: ${route}`);
    const languageLinks = tags.filter(({ name, attrs }) => name === "a" && attrs["data-language-switch"]);
    assert.equal(languageLinks.length, 3, `Expected three native language links: ${route}`);
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
      assert(image.alt?.trim() && !/[\u0400-\u04ff]/.test(image.alt), `Screenshot needs alternative text for ${locale}: ${route}`);
      const openLinks = [...contents.matchAll(/<a\b[^>]*>/gi)].map((match) => attributes(match[0]))
        .filter((attrs) => hasClass(attrs, "app-capture-open"));
      assert.equal(openLinks.length, 1, `Screenshot needs one full-size image link: ${route}`);
      assert.equal(openLinks[0].href, image.src, `Screenshot link must open the displayed image: ${route}`);
      assert(settings.screenshot.test(openLinks[0]["aria-label"] || ""), `Screenshot link needs a localized accessible label: ${route}`);
      assert.equal(openLinks[0].target, "_blank", `Screenshot link should open separately: ${route}`);
      assert(/\bnoopener\b/.test(openLinks[0].rel || ""), `Screenshot link needs noopener: ${route}`);
    }

    const englishPage = locale !== "en" ? await readPage(localFile(new URL(`${site}${englishRoute}`))) : undefined;
    if (englishPage) {
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
          const diagramLocale = attrs.src.match(/^\/media\/(de|pl)\//)?.[1] || "en";
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

  for (const { ogImage } of Object.values(localeSettings)) {
    const image = await readFile(path.join(root, ogImage));
    assert.equal(image.subarray(0, 8).toString("hex"), "89504e470d0a1a0a", `OG asset is not a PNG: ${ogImage}`);
    assert.equal(image.readUInt32BE(16), 1200, `OG width must be 1200: ${ogImage}`);
    assert.equal(image.readUInt32BE(20), 630, `OG height must be 630: ${ogImage}`);
  }
  const notFound = await readPage(path.join(root, "404.html"));
  assert.equal(notFound.tags.find(({ name }) => name === "html")?.attrs.lang, "en", "Wrong global 404 document language");
  assert.equal(notFound.tags.filter(({ name }) => name === "h1").length, 1, "Global 404 must have one primary heading");
  const robots404 = notFound.tags.filter(({ name, attrs }) => name === "meta" && attrs.name === "robots").map(({ attrs }) => attrs.content).join(",");
  assert.match(robots404, /\bnoindex\b/i, "Global 404 must not be indexed");
  const recoverySections = [...notFound.markup.matchAll(/<section\b([^>]*)>([^]*?)<\/section\s*>/gi)];
  for (const [language, message, home] of [["en", "Page not found", "/"], ["de", "Seite nicht gefunden", "/de/"], ["pl", "Nie znaleziono strony", "/pl/"]]) {
    const contents = recoverySections.find(([, attrs]) => attributes(attrs).lang === language)?.[2];
    assert(contents?.includes(message), `Global 404 needs a ${language} recovery message`);
    const links = [...contents.matchAll(/<a\b[^>]*>/gi)].map(match => attributes(match[0]));
    assert(links.some(attrs => attrs.href === home && attrs.hreflang === language && attrs.lang === language), `Global 404 needs a ${language} homepage link`);
  }
  await inspectConnections(root);
  console.log(`Export inspection passed: ${publicRoutes.length} routes in EN/DE/PL, locale-specific metadata and alternates, ${checkedReferences} local links/assets, ${checkedTranslatedSvgs.size} localized SVGs, sitemap, contact destinations, application screenshots, three legacy platform redirects and the trilingual 404.`);
} catch (error) {
  console.error(`Export inspection failed: ${error.message}`);
  if (error.code === "ENOENT" || /Missing export file|Missing page/.test(error.message)) {
    console.error("Create a complete static export with npm run build first. This command does not build or deploy the website.");
  }
  process.exitCode = 1;
}
