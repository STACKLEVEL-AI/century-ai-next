// Optional local inspection of the completed static export. This script is not
// called by the GitHub Pages workflow and does not build or deploy the site.
import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { runInNewContext } from "node:vm";

const root = path.resolve(process.argv[2] || "out");
const site = "https://century-ai.eu";
const telegram = "https://t.me/vitalibakhmat";

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
const publicRoutes = [...englishRoutes, ...englishRoutes.map(route => `/pl${route}`)];
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
  "og/century-ai-pl.png",
  "brand/century-logo.svg",
  "ai-os/index.html",
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
  assert(!/^\/(?:pl\/)?ai-os(?:\/|$)/.test(url.pathname), `Retired platform URL linked from ${fromRoute}: ${value}`);
  const filename = localFile(url);
  await requireFile(filename, `Broken reference from ${fromRoute}`);
  if (fragment && url.hash && filename.endsWith(".html")) {
    const target = await readPage(filename);
    const id = decodeURIComponent(url.hash.slice(1));
    assert(target.ids.has(id), `Missing anchor ${url.hash} linked from ${fromRoute} to ${url.pathname}`);
  }
  checkedReferences++;
}

async function verifyPlatformRedirect() {
  for (const locale of ["en", "pl"]) {
    const polish = locale === "pl";
    const target = polish ? "/pl/platform/" : "/platform/";
    const filename = polish ? "pl/ai-os/index.html" : "ai-os/index.html";
    const { source, tags } = await readPage(path.join(root, filename));
    assert.equal(tags.find(({ name }) => name === "html")?.attrs.lang, locale, "Wrong redirect document language");
    const canonicals = tags.filter(({ name, attrs }) => name === "link" && attrs.rel === "canonical");
    assert.deepEqual(canonicals.map(({ attrs }) => attrs.href), [`${site}${target}`], "Legacy platform canonical must point to its current localized route");
    const robots = tags.find(({ name, attrs }) => name === "meta" && attrs.name === "robots")?.attrs.content || "";
    assert.match(robots, /\bnoindex\b/i, "Legacy platform page must not be indexed");
    const refresh = tags.find(({ name, attrs }) => name === "meta" && attrs["http-equiv"]?.toLowerCase() === "refresh")?.attrs.content || "";
    assert.equal(refresh, `0; url=${target}`, "Legacy platform page needs a no-JavaScript refresh");
    assert(tags.some(({ name, attrs }) => name === "a" && attrs.href === target), "Legacy platform page needs a working fallback link");
    const script = source.match(/<script\b[^>]*>([^]*?)<\/script\s*>/i)?.[1];
    assert(script, "Legacy platform page needs its browser redirect");
    for (const [search, hash] of [["", ""], ["?utm_source=legacy&topic=knowledge%20base", "#operating-layer"]]) {
      const destinations = [];
      runInNewContext(script, { window: { location: { search, hash, replace: (url) => destinations.push(url) } } }, { timeout: 1000 });
      assert.deepEqual(destinations, [`${target}${search}${hash}`], "Legacy platform redirect must preserve query parameters and anchors");
    }
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
  assert.deepEqual(locations.sort(), publicRoutes.map((route) => `${site}${route}`).sort(), "Sitemap must contain all 52 English and Polish Century routes");
  const robots = await readFile(path.join(root, "robots.txt"), "utf8");
  assert(robots.includes(`Sitemap: ${site}/sitemap.xml`), "Wrong sitemap in robots.txt");
  await verifyPlatformRedirect();

  const titles = new Map();
  const descriptions = new Map();
  for (const route of publicRoutes) {
    const polish = route.startsWith("/pl/");
    const englishRoute = polish ? route.slice(3) : route;
    const page = await readPage(localFile(new URL(`${site}${route}`)));
    const { markup, tags } = page;
    const title = decodeEntities(markup.match(/<title>([^]*?)<\/title>/i)?.[1] || "").trim();
    const html = tags.find(({ name }) => name === "html");
    const description = tags.find(({ name, attrs }) => name === "meta" && attrs.name === "description")?.attrs.content;
    const canonicals = tags.filter(({ name, attrs }) => name === "link" && attrs.rel === "canonical");
    const openGraphUrl = tags.find(({ name, attrs }) => name === "meta" && attrs.property === "og:url")?.attrs.content;
    assert.equal(html?.attrs.lang, polish ? "pl" : "en", `Wrong document language: ${route}`);
    assert.equal(tags.filter(({ name }) => name === "h1").length, 1, `Expected one H1: ${route}`);
    assert(!tags.some(({ attrs }) => hasClass(attrs, "footer-wordmark")), `Oversized footer wordmark remains: ${route}`);
    const main = tags.find(({ name }) => name === "main");
    assert.equal(hasClass(main?.attrs || {}, "inner-page"), englishRoute !== "/", `Internal design scope must exclude the homepage: ${route}`);
    assert(title.includes("Century"), `Missing Century page title: ${route}`);
    assert(description?.trim(), `Missing description: ${route}`);
    assert(!titles.has(title), `Duplicate title on ${route} and ${titles.get(title)}`);
    assert(!descriptions.has(description), `Duplicate description on ${route} and ${descriptions.get(description)}`);
    titles.set(title, route);
    descriptions.set(description, route);
    assert.equal(canonicals.length, 1, `Expected one canonical URL: ${route}`);
    assert.equal(canonicals[0].attrs.href, `${site}${route}`, `Wrong canonical URL: ${route}`);
    assert.equal(openGraphUrl, `${site}${route}`, `Wrong Open Graph URL: ${route}`);
    const locale = tags.find(({ name, attrs }) => name === "meta" && attrs.property === "og:locale")?.attrs.content;
    assert.equal(locale, polish ? "pl_PL" : "en_GB", `Wrong Open Graph locale: ${route}`);
    const alternates = Object.fromEntries(tags.filter(({ name, attrs }) => name === "link" && attrs.rel === "alternate" && attrs.hreflang).map(({ attrs }) => [attrs.hreflang, attrs.href]));
    assert.deepEqual(alternates, { en: `${site}${englishRoute}`, pl: `${site}/pl${englishRoute}`, "x-default": `${site}${englishRoute}` }, `Wrong language alternates: ${route}`);
    for (const language of ["en", "pl"]) {
      const languageLink = tags.find(({ name, attrs }) => name === "a" && attrs["data-language-switch"] === language)?.attrs;
      assert.equal(languageLink?.href, language === "pl" ? `/pl${englishRoute}` : englishRoute, `Language switch must preserve the page: ${route}`);
      assert.equal(languageLink?.hreflang, language, `Missing language link annotation: ${route}`);
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
      assert(image.alt?.trim() && !/[\u0400-\u04ff]/.test(image.alt), `Screenshot needs localized alternative text: ${route}`);
      const openLinks = [...contents.matchAll(/<a\b[^>]*>/gi)].map((match) => attributes(match[0]))
        .filter((attrs) => hasClass(attrs, "app-capture-open"));
      assert.equal(openLinks.length, 1, `Screenshot needs one full-size image link: ${route}`);
      assert.equal(openLinks[0].href, image.src, `Screenshot link must open the displayed image: ${route}`);
      assert((polish ? /^Otwórz zrzut ekranu „.+”$/ : /^Open .+ screenshot$/).test(openLinks[0]["aria-label"] || ""), `Screenshot link needs an accessible label: ${route}`);
      assert.equal(openLinks[0].target, "_blank", `Screenshot link should open separately: ${route}`);
      assert(/\bnoopener\b/.test(openLinks[0].rel || ""), `Screenshot link needs noopener: ${route}`);
    }

    for (const { name, attrs } of tags) {
      const retiredClass = (attrs.class || "").split(/\s+/).find((name) => retiredMockClasses.has(name));
      assert(!retiredClass, `Retired interface mock ${retiredClass} remains on ${route}`);
      if (name === "a" && attrs.href) {
        const destination = new URL(attrs.href, `${site}${route}`);
        if (destination.origin === site) {
          await verifyLocalReference(attrs.href, route, { fragment: true });
          if (polish && publicRoutes.includes(destination.pathname) && !attrs["data-language-switch"]) {
            assert(destination.pathname.startsWith("/pl/"), `Polish navigation leaves its language on ${route}: ${attrs.href}`);
          }
        } else {
          assert(externalDestinations.has(destination.href), `Unexpected external link on ${route}: ${destination.href}`);
          assert.equal(attrs.target, "_blank", `External link should open separately: ${route}`);
          assert(/\bnoopener\b/.test(attrs.rel || "") && /\bnoreferrer\b/.test(attrs.rel || ""), `Missing external-link protection: ${route}`);
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

  for (const filename of ["og/century-ai-eu.png", "og/century-ai-pl.png"]) {
    const image = await readFile(path.join(root, filename));
    assert.equal(image.subarray(0, 8).toString("hex"), "89504e470d0a1a0a", "OG asset is not a PNG");
    assert.equal(image.readUInt32BE(16), 1200, "OG width must be 1200");
    assert.equal(image.readUInt32BE(20), 630, "OG height must be 630");
  }
  const notFound = await readFile(path.join(root, "404.html"), "utf8");
  assert(notFound.includes('lang="pl"') && notFound.includes('lang="en"'), "Global 404 must support both languages");
  assert(notFound.includes("Nie znaleziono strony") && notFound.includes("Page not found"), "Global 404 needs both messages");
  await inspectConnections(root);
  console.log(`Optional export inspection passed: ${publicRoutes.length} routes, unique metadata, ${checkedReferences} local links/assets, sitemap, contact destinations, application screenshots and the legacy platform redirect.`);
} catch (error) {
  console.error(`Export inspection failed: ${error.message}`);
  if (error.code === "ENOENT" || /Missing export file|Missing page/.test(error.message)) {
    console.error("Create a complete static export with npm run build first. This command does not build or deploy the website.");
  }
  process.exitCode = 1;
}
