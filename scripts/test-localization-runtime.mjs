import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const configuration = JSON.parse(await readFile(new URL("../src/locales/config.json", import.meta.url), "utf8"));
const site = { SITE_URL: "https://century-ai.eu", SITE_NAME: "Century" };

// Exercise the actual TypeScript helpers without a browser or a Next.js server.
async function loadModule(path, dependencies) {
  const source = await readFile(new URL(path, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  });
  const module = { exports: {} };
  const require = name => {
    assert(Object.hasOwn(dependencies, name), `Unexpected dependency: ${name}`);
    return dependencies[name];
  };
  new Function("require", "module", "exports", outputText)(require, module, module.exports);
  return module.exports;
}

const i18n = await loadModule("../src/lib/i18n.ts", { "@/locales/config.json": configuration, "./site": site });
const metadata = await loadModule("../src/lib/metadata.ts", {
  "./i18n": i18n, "./site": site, "./locale": { LOCALE: configuration.defaultLocale },
});
const { locales, localizedPath, localeForPath, languageAlternates, guideCountLabel } = i18n;

test("each language switches to every equivalent route and preserves query/fragment", () => {
  for (const source of locales) {
    for (const target of locales) {
      const sourcePrefix = source === "en" ? "" : `/${source}`;
      const targetPrefix = target === "en" ? "" : `/${target}`;
      for (const route of ["/", "/deployment/", "/blog/choosing-your-first-ai-workflow/"]) {
        const suffix = "?source=menu&query=%D0%A8%D0%86#delivery-ownership";
        assert.equal(localizedPath(`${sourcePrefix}${route}${suffix}`, target), `${targetPrefix}${route}${suffix}`);
      }
      assert.equal(localizedPath(`${sourcePrefix}/platform`, target), `${targetPrefix}/platform/`);
      assert.equal(localizedPath(`${sourcePrefix || "/"}`, target), `${targetPrefix}/`);
    }
  }
});

test("URL locale detection does not mistake a similar route or query for a language", () => {
  for (const locale of locales) {
    for (const ending of ["", "/", "/platform/", "?a=1", "#section"]) {
      assert.equal(localeForPath(`/${locale}${ending}`), locale);
    }
  }
  for (const path of ["/", "/deployment/", "/ukraine/", "/belarus/", "/platform/?lang=pl", "/platform/?lang=be", "/platform/?lang=sr", "/deutsch/", "/espanol/", "/srpski/", "/nederland/"]) {
    assert.equal(localeForPath(path), "en");
  }
});

test("external links, fragments and shared assets never acquire a locale prefix", () => {
  const inputs = [
    "https://century-ai.eu/pl/", "//example.com/asset", "mailto:team@example.com", "tel:+4812345",
    "#section", "?q=example", "relative/path", "/media/diagram.svg?v=2#caption", "/brand/century-logo.svg",
    "/fonts/font.woff2", "/founders/portrait.webp", "/images/photo.webp", "/og/preview.png", "/_next/static/chunk.js",
    "/sitemap.xml", "/robots.txt", "/uk/media/diagram.svg", "/pl/og/image.png?share=1", "/de/_next/data/file.json",
    "/be/media/diagram.svg", "/og/century-ai-be.png",
    "/es/media/diagram.svg", "/og/century-ai-es.png",
    "/sr/media/diagram.svg", "/og/century-ai-sr.png",
    "/nl/media/diagram.svg", "/og/century-ai-nl.png",
  ];
  for (const target of locales) for (const input of inputs) assert.equal(localizedPath(input, target), input);
});

test("alternates are reciprocal from every localized entry point", () => {
  const expected = {
    en: "https://century-ai.eu/platform/", de: "https://century-ai.eu/de/platform/",
    pl: "https://century-ai.eu/pl/platform/", uk: "https://century-ai.eu/uk/platform/",
    fr: "https://century-ai.eu/fr/platform/",
    be: "https://century-ai.eu/be/platform/",
    it: "https://century-ai.eu/it/platform/",
    es: "https://century-ai.eu/es/platform/",
    sr: "https://century-ai.eu/sr/platform/",
    nl: "https://century-ai.eu/nl/platform/",
    "x-default": "https://century-ai.eu/platform/",
  };
  for (const locale of locales) {
    assert.deepEqual(languageAlternates(localizedPath("/platform/", locale), "https://century-ai.eu/"), expected);
  }
});

test("guide counts use each language's plural rules, including Dutch and Serbian integer and fractional boundaries", () => {
  const cases = [
    ["en", 1, "1 guide to explore"], ["en", 2, "2 guides to explore"],
    ["de", 1, "1 Leitfaden zum Entdecken"], ["de", 21, "21 Leitfäden zum Entdecken"],
    ["pl", 0, "0 poradników do odkrycia"], ["pl", 1, "1 poradnik do odkrycia"],
    ["pl", 2, "2 poradniki do odkrycia"], ["pl", 5, "5 poradników do odkrycia"],
    ["pl", 12, "12 poradników do odkrycia"], ["pl", 21, "21 poradników do odkrycia"],
    ["pl", 22, "22 poradniki do odkrycia"], ["pl", 101, "101 poradników do odkrycia"],
    ["uk", 0, "0 посібників для ознайомлення"], ["uk", 1, "1 посібник для ознайомлення"],
    ["uk", 2, "2 посібники для ознайомлення"], ["uk", 5, "5 посібників для ознайомлення"],
    ["uk", 11, "11 посібників для ознайомлення"], ["uk", 21, "21 посібник для ознайомлення"],
    ["uk", 22, "22 посібники для ознайомлення"], ["uk", 112, "112 посібників для ознайомлення"],
    ["fr", 0, "0 guide à découvrir"], ["fr", 1, "1 guide à découvrir"],
    ["fr", 2, "2 guides à découvrir"], ["fr", 21, "21 guides à découvrir"],
    ["be", 0, "0 дапаможнікаў для азнаямлення"], ["be", 1, "1 дапаможнік для азнаямлення"],
    ["be", 2, "2 дапаможнікі для азнаямлення"], ["be", 5, "5 дапаможнікаў для азнаямлення"],
    ["be", 11, "11 дапаможнікаў для азнаямлення"], ["be", 12, "12 дапаможнікаў для азнаямлення"],
    ["be", 21, "21 дапаможнік для азнаямлення"], ["be", 22, "22 дапаможнікі для азнаямлення"],
    ["be", 25, "25 дапаможнікаў для азнаямлення"], ["be", 101, "101 дапаможнік для азнаямлення"],
    ["be", 112, "112 дапаможнікаў для азнаямлення"], ["be", 1.5, "1.5 дапаможніка для азнаямлення"],
    ["it", 0, "0 guide da scoprire"], ["it", 1, "1 guida da scoprire"],
    ["it", 2, "2 guide da scoprire"], ["it", 21, "21 guide da scoprire"],
    ["es", 0, "0 guías para descubrir"], ["es", 1, "1 guía para descubrir"],
    ["es", 2, "2 guías para descubrir"], ["es", 21, "21 guías para descubrir"],
    ["sr", 0, "0 vodiča za istraživanje"], ["sr", 1, "1 vodič za istraživanje"],
    ["sr", 2, "2 vodiča za istraživanje"], ["sr", 4, "4 vodiča za istraživanje"],
    ["sr", 5, "5 vodiča za istraživanje"], ["sr", 11, "11 vodiča za istraživanje"],
    ["sr", 12, "12 vodiča za istraživanje"], ["sr", 14, "14 vodiča za istraživanje"],
    ["sr", 21, "21 vodič za istraživanje"], ["sr", 22, "22 vodiča za istraživanje"],
    ["sr", 101, "101 vodič za istraživanje"], ["sr", 111, "111 vodiča za istraživanje"],
    ["sr", 1.1, "1.1 vodič za istraživanje"], ["sr", 1.2, "1.2 vodiča za istraživanje"],
    ["sr", 1.5, "1.5 vodiča za istraživanje"], ["sr", 1.11, "1.11 vodiča za istraživanje"],
    ["sr", 1.21, "1.21 vodič za istraživanje"],
    ["nl", 0, "0 gidsen om te ontdekken"], ["nl", 1, "1 gids om te ontdekken"],
    ["nl", 2, "2 gidsen om te ontdekken"], ["nl", 21, "21 gidsen om te ontdekken"],
  ];
  for (const [locale, count, expected] of cases) assert.equal(guideCountLabel(count, undefined, locale), expected);
  assert.equal(guideCountLabel(2, "Getting Started", "en"), "2 guides in getting started");
  assert.equal(guideCountLabel(2, "Erste Schritte", "de"), "2 Leitfäden in der Kategorie Erste Schritte");
  assert.equal(guideCountLabel(2, "Pierwsze kroki", "pl"), "2 poradniki w kategorii „Pierwsze kroki”");
  assert.equal(guideCountLabel(2, "Перші кроки", "uk"), "2 посібники у категорії «Перші кроки»");
  assert.equal(guideCountLabel(1, "Premiers pas", "fr"), "1 guide dans la catégorie « Premiers pas »");
  assert.equal(guideCountLabel(2, "Connaissances", "fr"), "2 guides dans la catégorie « Connaissances »");
  assert.equal(guideCountLabel(1, "Першыя крокі", "be"), "1 дапаможнік з катэгорыі «Першыя крокі»");
  assert.equal(guideCountLabel(2, "Першыя крокі", "be"), "2 дапаможнікі з катэгорыі «Першыя крокі»");
  assert.equal(guideCountLabel(1, "Conoscenza", "it"), "1 guida nella categoria «Conoscenza»");
  assert.equal(guideCountLabel(1, "Primeros pasos", "es"), "1 guía en la categoría «Primeros pasos»");
  assert.equal(guideCountLabel(2, "Conocimiento", "es"), "2 guías en la categoría «Conocimiento»");
  assert.equal(guideCountLabel(1, "Znanje", "sr"), "1 vodič u kategoriji „Znanje”");
  assert.equal(guideCountLabel(2, "Postavljanje", "sr"), "2 vodiča u kategoriji „Postavljanje”");
  assert.equal(guideCountLabel(1, "Kennis", "nl"), "1 gids in de categorie ‘Kennis’");
  assert.equal(guideCountLabel(2, "Eerste stappen", "nl"), "2 gidsen in de categorie ‘Eerste stappen’");
});

test("metadata binds canonical, social preview and alternates to the requested locale", () => {
  for (const locale of locales) {
    const settings = configuration.locales[locale];
    const result = metadata.pageMetadata("Century AI Platform", "Local description", "/platform/", locale);
    assert.equal(result.alternates.canonical, `${site.SITE_URL}${localizedPath("/platform/", locale)}`);
    assert.deepEqual(result.alternates.languages, languageAlternates("/platform/"));
    assert.equal(result.openGraph.locale, settings.openGraphLocale);
    assert.deepEqual(result.openGraph.alternateLocale, locales.filter(other => other !== locale).map(other => configuration.locales[other].openGraphLocale));
    assert.equal(result.openGraph.images[0].url, `${site.SITE_URL}${settings.socialImage}`);
    assert.equal(result.twitter.images[0].alt, settings.imageAlt);
    assert.equal(result.description, "Local description");
    assert.equal(result.title, `${settings.productTitles["Century AI Platform"] ?? "Century AI Platform"} | Century`);
    const home = metadata.homeMetadata("Local homepage title", "Local homepage description", locale);
    assert.equal(home.title, "Local homepage title");
    assert.equal(home.openGraph.title, home.title);
    assert.equal(home.alternates.canonical, `${site.SITE_URL}${localizedPath("/", locale)}`);
  }
});

test("every registered language has unique social assets and native recovery copy", () => {
  assert.deepEqual(locales, ["en", "de", "pl", "uk", "fr", "be", "it", "es", "sr", "nl"]);
  assert.equal(new Set(locales.map(locale => configuration.locales[locale].socialImage)).size, locales.length);
  for (const locale of locales) {
    const settings = configuration.locales[locale];
    assert.match(settings.socialImage, /^\/og\/[a-z-]+\.png$/);
    for (const value of [settings.label, settings.accessibleLabel, settings.imageAlt, settings.redirect.message, ...Object.values(settings.notFound), ...settings.socialPreview.lines]) {
      assert.equal(typeof value, "string");
      assert(value.trim().length > 0);
    }
  }
});
