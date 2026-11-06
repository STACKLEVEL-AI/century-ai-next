import { expect, test, type Locator, type Page } from "@playwright/test";
import { guideCountLabel, languageAlternates, localizedPath } from "../src/lib/i18n";
import localeRegistry from "../src/locales/config.json";

const ORIGIN = "http://127.0.0.1:4173";
const SITE = "https://century-ai.eu";
const TELEGRAM = "https://t.me/vitalibakhmat";
type Language = keyof typeof localeRegistry.locales;
const LANGUAGES = Object.keys(localeRegistry.locales) as Language[];
const LOCALE_SETTINGS = {
  en: { ...localeRegistry.locales.en, navigation: ["Main navigation", "Footer navigation"], screenshot: /^Open .+ screenshot$/ },
  de: { ...localeRegistry.locales.de, navigation: ["Hauptnavigation", "Fußnavigation"], screenshot: /^Screenshot .+ öffnen$/u },
  pl: { ...localeRegistry.locales.pl, navigation: ["Nawigacja główna", "Nawigacja w stopce"], screenshot: /^Otwórz zrzut ekranu „.+”$/u },
  uk: { ...localeRegistry.locales.uk, navigation: ["Головна навігація", "Навігація в нижній частині сторінки"], screenshot: /^Відкрити знімок екрана «.+»$/u },
  fr: { ...localeRegistry.locales.fr, navigation: ["Navigation principale", "Navigation du pied de page"], screenshot: /^Voir la capture .+ en taille réelle$/u },
  be: { ...localeRegistry.locales.be, navigation: ["Асноўная навігацыя", "Навігацыя ўнізе старонкі"], screenshot: /^Адкрыць здымак экрана: .+$/u },
};
const INTERACTIONS = {
  fr: {
    name: "French", contents: "Sommaire du guide", mobileNavigation: "Navigation mobile", home: "Accueil Century",
    filter: "Filtrer les guides par catégorie", categories: ["Premiers pas", "Connaissances", "Processus", "Déploiement"],
    allGuides: "Tous les guides", allCount: "4 guides à découvrir", categoryCount: (category: string) => `1 guide dans la catégorie « ${category} »`,
    installation: "Ce que nous définissons avant l’installation", identity: "Identité et données", securityQuestion: /Le traitement/,
  },
  pl: {
    name: "Polish", contents: "Spis treści poradnika", mobileNavigation: "Nawigacja mobilna", home: "Century — strona główna",
    filter: "Filtruj poradniki według kategorii", categories: ["Pierwsze kroki", "Wiedza", "Przepływy pracy", "Wdrożenie"],
    allGuides: "Wszystkie poradniki", allCount: "4 poradniki do odkrycia", categoryCount: (category: string) => `1 poradnik w kategorii „${category}”`,
    installation: "Co uzgadniamy przed instalacją", identity: "Tożsamość i dane", securityQuestion: /Czy Century/,
  },
  uk: {
    name: "Ukrainian", contents: "Зміст посібника", mobileNavigation: "Мобільна навігація", home: "Головна сторінка Century",
    filter: "Фільтрувати посібники за категорією", categories: ["Перші кроки", "Знання", "Робочі процеси", "Розгортання"],
    allGuides: "Усі посібники", allCount: "4 посібники для ознайомлення", categoryCount: (category: string) => `1 посібник у категорії «${category}»`,
    installation: "Що узгоджуємо перед установленням", identity: "Ідентифікація користувачів і дані", securityQuestion: /Чи /,
  },
  be: {
    name: "Belarusian", contents: "Змест дапаможніка", mobileNavigation: "Мабільная навігацыя", home: "Галоўная старонка Century",
    filter: "Фільтраваць дапаможнікі паводле катэгорый", categories: ["Першыя крокі", "Веды", "Працоўныя працэсы", "Разгортванне"],
    allGuides: "Усе дапаможнікі", allCount: "4 дапаможнікі для азнаямлення", categoryCount: (category: string) => `1 дапаможнік з катэгорыі «${category}»`,
    installation: "Што мы ўзгадняем перад усталяваннем", identity: "Ідэнтыфікацыя і даныя", securityQuestion: /Ці /,
  },
};

// An independent list of the existing public pages. A missing generated route
// must fail even if it was also accidentally omitted from the app's registry.
const CONTENT_PATHS = [
  "/", "/platform/", "/agents/", "/systems/", "/ai-gateway/",
  "/deployment/", "/ai-transformation/", "/security/", "/industries/",
  "/industries/banking/", "/industries/telecommunication/",
  "/industries/healthcare/", "/industries/utilities/",
  "/industries/insurance/", "/industries/retail/", "/industries/airlines/",
  "/about-us/", "/careers/", "/press/", "/contact/", "/blog/",
  "/blog/choose-first-ai-workflow/", "/blog/answers-need-sources/",
  "/blog/human-review/", "/blog/plan-ai-deployment/", "/privacy/",
];

function languagePath(path: string, language: Language) {
  return language === "en" ? path : `/${language}${path}`;
}

function languageMenu(page: Page, language: Language) {
  return page.locator("[data-site-header] details").filter({
    has: page.locator(`[data-language-switch="${language}"]`),
  });
}

async function switchLanguage(page: Page, language: Language) {
  const menu = languageMenu(page, language);
  await menu.locator(":scope > summary").click();
  await menu.locator(`[data-language-switch="${language}"]`).click();
}

test("Language paths preserve suffixes and assets, and guide counts use each language's grammar", () => {
  const cases = [
    { input: "/", route: "/" },
    { input: "/uk/", route: "/" },
    { input: "/be/", route: "/" },
    { input: "/be/blog/human-review?source=test#main-content", route: "/blog/human-review/?source=test#main-content" },
    { input: "/de", route: "/" },
    { input: "/fr/platform/?source=test#operating-layer", route: "/platform/?source=test#operating-layer" },
    { input: "/pl/industries/telecommunication/", route: "/industries/telecommunication/" },
    { input: "/uk/blog/human-review?source=test#main-content", route: "/blog/human-review/?source=test#main-content" },
    { input: "/ukraine/", route: "/ukraine/" },
    { input: "/depot/", route: "/depot/" },
    { input: "/platform/", route: "/platform/" },
  ];
  for (const { input, route } of cases) {
    for (const language of LANGUAGES) expect(localizedPath(input, language)).toBe(languagePath(route, language));
  }
  for (const asset of ["/media/app/files.webp", "/media/de/strategy.webp", "/media/uk/century/diagrams/platform-data.svg", "/og/century-ai-uk.png", "/downloads/guide.pdf", "#main-content", "https://example.com/", "//example.com/image.webp", "mailto:hello@example.com"]) {
    for (const language of LANGUAGES) expect(localizedPath(asset, language)).toBe(asset);
  }
  expect(languageAlternates("/uk/blog/human-review/", SITE)).toEqual({
    en: `${SITE}/blog/human-review/`, de: `${SITE}/de/blog/human-review/`,
    pl: `${SITE}/pl/blog/human-review/`, uk: `${SITE}/uk/blog/human-review/`,
    fr: `${SITE}/fr/blog/human-review/`,
    be: `${SITE}/be/blog/human-review/`,
    "x-default": `${SITE}/blog/human-review/`,
  });
  for (const [count, ukrainian, polish] of [
    [0, "посібників", "poradników"], [1, "посібник", "poradnik"],
    [2, "посібники", "poradniki"], [5, "посібників", "poradników"],
    [11, "посібників", "poradników"], [21, "посібник", "poradników"],
    [22, "посібники", "poradniki"],
  ] as const) {
    expect(guideCountLabel(count, undefined, "uk")).toBe(`${count} ${ukrainian} для ознайомлення`);
    expect(guideCountLabel(count, undefined, "pl")).toBe(`${count} ${polish} do odkrycia`);
  }
  expect(guideCountLabel(1, "Знання", "uk")).toBe("1 посібник у категорії «Знання»");
  expect(guideCountLabel(1, "Wiedza", "pl")).toBe("1 poradnik w kategorii „Wiedza”");
  expect(guideCountLabel(2, undefined, "en")).toBe("2 guides to explore");
  expect(guideCountLabel(1, "Knowledge", "en")).toBe("1 guide in knowledge");
  expect(guideCountLabel(2, undefined, "de")).toBe("2 Leitfäden zum Entdecken");
  expect(guideCountLabel(1, "Wissen", "de")).toBe("1 Leitfaden in der Kategorie Wissen");
  expect(guideCountLabel(0, undefined, "fr")).toBe("0 guide à découvrir");
  expect(guideCountLabel(1, undefined, "fr")).toBe("1 guide à découvrir");
  expect(guideCountLabel(4, undefined, "fr")).toBe("4 guides à découvrir");
  expect(guideCountLabel(1, "Connaissances", "fr")).toBe("1 guide dans la catégorie « Connaissances »");
});

// Parse the HTTP response in an inert document. This never hydrates the page,
// so these checks cannot pass because client JavaScript fixed English markup.
async function readStaticDocuments(page: Page, markup: string[]) {
  return page.evaluate(sources => sources.map(source => {
    const doc = new DOMParser().parseFromString(source, "text/html");
    const meta = (property: string) => doc.querySelector(`meta[property="${property}"]`)?.getAttribute("content");
    const alternates = Array.from(doc.querySelectorAll('link[rel="alternate"][hreflang]'));
    return {
      lang: doc.documentElement.lang,
      title: doc.title,
      headings: Array.from(doc.querySelectorAll("h1"), heading => heading.textContent?.trim()),
      description: doc.querySelector('meta[name="description"]')?.getAttribute("content"),
      canonical: doc.querySelector('link[rel="canonical"]')?.getAttribute("href"),
      alternateCount: alternates.length,
      alternates: Object.fromEntries(alternates.map(link => [link.getAttribute("hreflang"), link.getAttribute("href")])),
      ogUrl: meta("og:url"),
      ogLocale: meta("og:locale"),
      ogAlternateLocales: Array.from(doc.querySelectorAll('meta[property="og:locale:alternate"]'), meta => meta.getAttribute("content")),
      ogImage: meta("og:image"),
      navigationLabels: Array.from(doc.querySelectorAll("nav[aria-label]"), nav => nav.getAttribute("aria-label")),
      links: Array.from(doc.querySelectorAll("a[href]"), link => ({
        href: link.getAttribute("href")!,
        language: link.getAttribute("data-language-switch"),
        lang: link.getAttribute("lang"),
        hreflang: link.getAttribute("hreflang"),
        current: link.getAttribute("aria-current"),
      })),
      ids: Array.from(doc.querySelectorAll("[id]"), element => element.id),
      screenshotLabels: Array.from(doc.querySelectorAll("a.app-capture-open"), link => link.getAttribute("aria-label")),
      structuredData: Array.from(doc.querySelectorAll('script[type="application/ld+json"]'), script => JSON.parse(script.textContent || "null")),
    };
  }), markup);
}

test("All 156 pages ship localized HTML, reciprocal metadata and language-preserving navigation", async ({ page, request }) => {
  test.setTimeout(90_000);
  expect(CONTENT_PATHS).toHaveLength(26);
  expect(LANGUAGES).toEqual(["en", "de", "pl", "uk", "fr", "be"]);
  const pathsByLanguage = Object.fromEntries(LANGUAGES.map(language => [
    language, new Set(CONTENT_PATHS.map(path => languagePath(path, language))),
  ]));

  for (const path of CONTENT_PATHS) {
    const paths = LANGUAGES.map(language => languagePath(path, language));
    const responses = await Promise.all(paths.map(route => request.get(route)));
    for (let index = 0; index < responses.length; index++) expect(responses[index].status(), paths[index]).toBe(200);
    const documents = await readStaticDocuments(page, await Promise.all(responses.map(response => response.text())));
    const alternates = { ...Object.fromEntries(LANGUAGES.map(language => [language, `${SITE}${languagePath(path, language)}`])), "x-default": `${SITE}${path}` };

    for (let index = 0; index < LANGUAGES.length; index++) {
      const language = LANGUAGES[index];
      const route = paths[index];
      const snapshot = documents[index];
      const settings = LOCALE_SETTINGS[language];
      expect(snapshot.lang, route).toBe(language);
      expect(snapshot.headings, route).toHaveLength(1);
      expect(snapshot.headings[0], route).toBeTruthy();
      expect(snapshot.title, route).toBeTruthy();
      expect(snapshot.description, route).toBeTruthy();
      if (language !== "en") expect(snapshot.description, route).not.toBe(documents[0].description);
      if (language === "uk" || language === "be") expect(snapshot.description, route).toMatch(/[\u0400-\u04ff]/);
      expect(snapshot.canonical, route).toBe(`${SITE}${route}`);
      expect(snapshot.alternateCount, route).toBe(LANGUAGES.length + 1);
      expect(snapshot.alternates, route).toEqual(alternates);
      expect(snapshot.ogUrl, route).toBe(`${SITE}${route}`);
      expect(snapshot.ogLocale, route).toBe(settings.openGraphLocale);
      expect(snapshot.ogAlternateLocales.sort(), route).toEqual(LANGUAGES.filter(other => other !== language).map(other => LOCALE_SETTINGS[other].openGraphLocale).sort());
      expect(snapshot.ogImage, route).toBe(`${SITE}${settings.socialImage}`);
      for (const label of settings.navigation) expect(snapshot.navigationLabels, route).toContain(label);

      // Every equivalent page is available before JavaScript loads, including
      // the active language, which remains a native link with aria-current.
      const languageLinks = snapshot.links.filter(link => link.language);
      expect(languageLinks, route).toHaveLength(LANGUAGES.length);
      for (const target of LANGUAGES) {
        expect(languageLinks.filter(link => link.language === target), route).toEqual([{
          href: languagePath(path, target), language: target, lang: target, hreflang: target,
          current: target === language ? "page" : null,
        }]);
      }

      for (const link of snapshot.links) {
        if (link.language) continue;
        const target = new URL(link.href, `${SITE}${route}`);
        if (target.origin !== SITE) continue;
        // Downloads and authentic app screenshots retain shared asset URLs.
        if (/^\/(?:brand|media|images|og)\/.+\.[a-z0-9]+$/i.test(target.pathname)) continue;
        expect(pathsByLanguage[language].has(target.pathname), `${route}: ${link.href}`).toBe(true);
        if (target.pathname === route && target.hash) {
          expect(snapshot.ids, `${route}: ${link.href}`).toContain(decodeURIComponent(target.hash.slice(1)));
        }
      }
      for (const label of snapshot.screenshotLabels) expect(label, route).toMatch(settings.screenshot);

      if (path === "/") {
        const graph = snapshot.structuredData[0]?.["@graph"];
        expect(graph, route).toHaveLength(2);
        expect(graph.find((node: { "@type": string }) => node["@type"] === "WebSite"), route).toMatchObject({
          "@id": `${SITE}/#website`, url: `${SITE}/`, inLanguage: [...LANGUAGES],
        });
        expect(graph.find((node: { "@type": string }) => node["@type"] === "WebPage"), route).toMatchObject({
          "@id": `${SITE}${route}#webpage`, url: `${SITE}${route}`, inLanguage: language,
          isPartOf: { "@id": `${SITE}/#website` },
        });
      }
    }
  }
});

for (const language of ["pl", "uk", "fr", "be"] as const) {
  const copy = INTERACTIONS[language];
  test(`${copy.name} deep-page language switching and mobile navigation work without JavaScript`, async ({ browser }) => {
    const context = await browser.newContext({ baseURL: ORIGIN, javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    try {
      const page = await context.newPage();
      const article = "/blog/answers-need-sources/";
      await page.goto(languagePath(article, language));
      await expect(page.locator("html")).toHaveAttribute("lang", language);
      const localizedHeading = await page.getByRole("heading", { level: 1 }).innerText();
      await expect(page.locator(".co-reading-body > section").first()).toBeVisible();
      await expect(page.getByRole("navigation", { name: copy.contents })).toBeVisible();

      await switchLanguage(page, "en");
      await expect(page).toHaveURL(`${ORIGIN}${article}`);
      await expect(page.locator("html")).toHaveAttribute("lang", "en");
      await expect(page.getByRole("heading", { level: 1 })).not.toHaveText(localizedHeading);
      await switchLanguage(page, "de");
      await expect(page).toHaveURL(`${ORIGIN}/de${article}`);
      await expect(page.locator("html")).toHaveAttribute("lang", "de");
      await expect(page.getByRole("heading", { level: 1 })).not.toHaveText(localizedHeading);
      await switchLanguage(page, language);
      await expect(page).toHaveURL(`${ORIGIN}${languagePath(article, language)}`);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(localizedHeading);

      await page.locator("[data-mobile-navigation] > summary").click();
      const navigation = page.getByRole("navigation", { name: copy.mobileNavigation, exact: true });
      const destination = languagePath("/industries/telecommunication/", language);
      const group = navigation.locator("details").filter({ has: page.locator(`a[href="${destination}"]`) });
      await group.locator(":scope > summary").click();
      await group.locator(`a[href="${destination}"]`).click();
      await expect(page).toHaveURL(`${ORIGIN}${destination}`);
      await expect(page.locator("html")).toHaveAttribute("lang", language);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    } finally {
      await context.close();
    }
  });
}

test("Switching between all six languages keeps the current industry, query and section", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => {
    if (message.type() === "error" && /hydrat|server.render|did not match|minified react error/i.test(message.text())) errors.push(message.text());
  });
  const suffix = "/industries/insurance/?source=language-test#main-content";
  await page.goto(`/pl${suffix}`);
  for (const language of ["uk", "fr", "en", "fr", "de", "fr", "uk", "pl", "uk", "be", "en", "be", "de", "uk", "pl", "be"] as const) {
    await page.waitForLoadState("networkidle");
    await switchLanguage(page, language);
    await expect(page).toHaveURL(`${ORIGIN}${languagePath(suffix, language)}`);
    await expect(page.locator("html")).toHaveAttribute("lang", language);
  }
  expect(errors).toEqual([]);
});

test("Every legacy platform route preserves its language, query and anchor", async ({ page, request }) => {
  const suffix = "?source=legacy&topic=knowledge%20base#operating-layer";
  for (const language of LANGUAGES) {
    const legacy = languagePath("/ai-os/", language);
    const destination = languagePath("/platform/", language);
    const response = await request.get(legacy);
    expect(response.status()).toBe(200);
    const markup = await response.text();
    expect(markup).toContain(`lang="${language}"`);
    expect(markup).toContain(`0; url=${destination}`);
    expect(markup).toContain(localeRegistry.locales[language].redirect.message);
    await page.goto(legacy + suffix);
    await expect(page).toHaveURL(`${ORIGIN}${destination}${suffix}`);
    await expect(page.locator("html")).toHaveAttribute("lang", language);
  }
});

test("Ukrainian deployment keeps three current phases and native installation details without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ baseURL: ORIGIN, javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  try {
    const page = await context.newPage();
    await page.goto("/uk/deployment/");
    const headings = page.locator("#delivery-path h3:visible");
    await expect(headings).toHaveCount(3);
    for (const heading of await headings.all()) {
      expect(await heading.innerText()).toMatch(/[\u0400-\u04ff]/);
      await expect(heading).toBeVisible();
    }
    const installation = page.locator("#deployment-options details");
    const summary = installation.locator("summary");
    await expect(summary).toHaveText(INTERACTIONS.uk.installation);
    await expect(installation).not.toHaveAttribute("open");
    await summary.focus();
    await page.keyboard.press("Enter");
    await expect(installation).toHaveAttribute("open", "");
    await expect(installation.getByText(INTERACTIONS.uk.identity, { exact: true })).toBeVisible();
    await page.keyboard.press("Enter");
    await expect(installation).not.toHaveAttribute("open");
  } finally {
    await context.close();
  }
});

for (const width of [320, 1440]) {
  test(`The fixed English brand phrase precedes the Century wordmark in every language at ${width}px`, async ({ page }) => {
    test.setTimeout(60_000);
    await page.setViewportSize({ width, height: 900 });
    for (const language of LANGUAGES) {
      for (const path of ["/", "/industries/insurance/"]) {
        await page.goto(languagePath(path, language));
        const signature = page.locator("footer").getByRole("link", { name: "WE LEAVE IN THE AI CENTURY", exact: true });
        await expect(signature).toHaveCount(1);
        await signature.scrollIntoViewIfNeeded();
        await withinViewport(page, signature);
        await expect(signature).toHaveText("WE LEAVE IN THE AI");
        await expect(signature).toHaveAttribute("href", languagePath("/", language));
        await expect(signature).toHaveAttribute("lang", "en");
        await expect(signature).toHaveAttribute("translate", "no");
        await expect(signature).toHaveAttribute("dir", "ltr");
        const logo = signature.locator("img");
        await expect(logo).toHaveAttribute("src", "/brand/century-logo-white.svg");
        await expect(logo).toHaveAttribute("alt", "");
        await expect.poll(() => logo.evaluate(node => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
        const prefix = signature.locator("span");
        await withinViewport(page, prefix);
        await withinViewport(page, logo);
        expect(await signature.evaluate(node => {
          const prefix = node.querySelector("span")!;
          const image = node.querySelector("img")!;
          return Boolean(prefix.compareDocumentPosition(image) & Node.DOCUMENT_POSITION_FOLLOWING);
        })).toBe(true);
      }
    }
  });
}

for (const language of ["de", "pl", "uk", "fr", "be"] as const) {
  test(`${language.toUpperCase()} diagrams load localized labels without clipping text outside the viewBox`, async ({ page }) => {
    // Browser text metrics catch long translations that static markup cannot.
    for (const original of [
      "/media/century/diagrams/industry-platform.svg",
      "/media/century/diagrams/industry-frontier.svg",
      "/media/industries/airlines/platform.svg",
      "/media/industries/healthcare/platform.svg",
      "/media/industries/utilities/platform.svg",
      "/media/insurance/platform.svg",
    ]) {
      const asset = original.replace("/media/", `/media/${language}/`);
      const response = await page.goto(asset);
      expect(response?.status(), asset).toBe(200);
      const metrics = await page.evaluate(async () => {
        await document.fonts.ready;
        const svg = document.documentElement as unknown as SVGSVGElement;
        const bounds = svg.viewBox.baseVal;
        return {
          title: svg.querySelector("title")?.textContent?.trim(),
          description: svg.querySelector("desc")?.textContent?.trim(),
          labels: Array.from(svg.querySelectorAll("text"), node => {
            const box = node.getBBox();
            return {
              text: node.textContent?.trim(),
              fits: box.x >= bounds.x - 1 && box.y >= bounds.y - 1
                && box.x + box.width <= bounds.x + bounds.width + 1
                && box.y + box.height <= bounds.y + bounds.height + 1,
            };
          }),
        };
      });
      expect(metrics.title, asset).toBeTruthy();
      expect(metrics.description, asset).toBeTruthy();
      expect(metrics.labels.length, asset).toBeGreaterThan(0);
      if (language === "uk" || language === "be") {
        expect(metrics.title, asset).toMatch(/[\u0400-\u04ff]/);
        expect(metrics.description, asset).toMatch(/[\u0400-\u04ff]/);
      }
      for (const label of metrics.labels) expect(label.fits, `${asset}: ${label.text}`).toBe(true);
    }
  });
}

for (const language of ["pl", "uk", "fr", "be"] as const) {
  const copy = INTERACTIONS[language];
  test(`${copy.name} guide categories filter real articles and announce localized counts`, async ({ page }) => {
    await page.goto(languagePath("/blog/", language));
    const library = page.locator(".co-library");
    const filters = library.getByRole("group", { name: copy.filter });
    await expect(library.getByRole("article")).toHaveCount(4);
    await expect(library.getByRole("status")).toHaveText(copy.allCount);

    for (const category of copy.categories) {
      const button = filters.getByRole("button", { name: category, exact: true });
      await button.click();
      await expect(button).toHaveAttribute("aria-pressed", "true");
      await expect(library.getByRole("article")).toHaveCount(1);
      await expect(library.getByRole("status")).toHaveText(copy.categoryCount(category));
      await expect(library.getByRole("article").getByRole("link")).toHaveAttribute("href", new RegExp(`^/${language}/blog/[^/]+/$`));
    }
    await filters.getByRole("button", { name: copy.allGuides, exact: true }).click();
    await expect(library.getByRole("article")).toHaveCount(4);
    await expect(library.getByRole("status")).toHaveText(copy.allCount);
    await filters.getByRole("button", { name: copy.categories[1], exact: true }).click();
    await library.getByRole("article").getByRole("link").click();
    await expect(page).toHaveURL(`${ORIGIN}${languagePath("/blog/answers-need-sources/", language)}`);
    await expect(page.locator("html")).toHaveAttribute("lang", language);
  });

  test(`${copy.name} product tabs and deployment and security disclosures remain usable by keyboard`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    const explorers = [
      { path: "/platform/", count: 7, englishLabels: ["Quality & activity", "Workflows & agents", "Specification & development", "Knowledge", "Models", "Integrations", "Security & governance"] },
      { path: "/ai-gateway/", count: 3, englishLabels: ["Models & controls", "Files & context", "Response details"] },
      { path: "/deployment/", count: 3, englishLabels: ["Prepare", "Build & validate", "Operate & improve"] },
    ];
    for (const explorer of explorers) {
      await page.goto(languagePath(explorer.path, language));
      const tablist = page.getByRole("tablist");
      const tabs = tablist.getByRole("tab");
      await expect(tabs).toHaveCount(explorer.count);
      for (const label of await tabs.allTextContents()) expect(explorer.englishLabels).not.toContain(label.trim());
      if (language === "uk" || language === "be") for (const label of await tabs.allTextContents()) expect(label).toMatch(/[\u0400-\u04ff]/);
      await expect(tabs.first()).toHaveAttribute("aria-selected", "true");
      const firstPanelText = await page.getByRole("tabpanel").innerText();
      await tabs.first().focus();
      await page.keyboard.press("ArrowRight");
      await expect(tabs.nth(1)).toBeFocused();
      await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
      const panel = page.getByRole("tabpanel");
      await expect(panel).toHaveCount(1);
      await expect(panel).toBeVisible();
      await expect(panel).toHaveAttribute("id", (await tabs.nth(1).getAttribute("aria-controls"))!);
      await expect(panel).toHaveAttribute("aria-labelledby", (await tabs.nth(1).getAttribute("id"))!);
      await expect(panel).not.toHaveText(firstPanelText);
      for (const capture of await panel.locator("figure.app-capture").all()) {
        await expect(capture.locator(".app-capture-open")).toHaveAttribute("aria-label", LOCALE_SETTINGS[language].screenshot);
        if (language === "uk" || language === "be") await expect(capture.locator("img")).toHaveAttribute("alt", /[\u0400-\u04ff]/);
      }
      await page.keyboard.press("End");
      await expect(tabs.last()).toBeFocused();
      await expect(tabs.last()).toHaveAttribute("aria-selected", "true");
      await page.keyboard.press("Home");
      await expect(tabs.first()).toBeFocused();
      await expect(tabs.first()).toHaveAttribute("aria-selected", "true");
    }

    await page.goto(languagePath("/deployment/", language));
    const installation = page.locator("#deployment-options details");
    await expect(installation).not.toHaveAttribute("open");
    await expect(installation.locator("summary")).toHaveText(copy.installation);
    await installation.locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(installation).toHaveAttribute("open", "");
    await expect(installation.getByText(copy.identity, { exact: true })).toBeVisible();
    await page.keyboard.press("Enter");
    await expect(installation).not.toHaveAttribute("open");

    await page.goto(languagePath("/security/", language));
    const question = page.locator("#security details").first();
    await expect(question).not.toHaveAttribute("open");
    await expect(question.locator("summary")).toContainText(copy.securityQuestion);
    await question.locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(question).toHaveAttribute("open", "");
    await expect(question.locator("p")).toBeVisible();
    await page.keyboard.press("Enter");
    await expect(question).not.toHaveAttribute("open");
    expect(errors).toEqual([]);
  });
}

async function withinViewport(page: Page, locator: Locator) {
  await expect(locator).toBeVisible();
  const box = await locator.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(-1);
  expect(box!.x + box!.width).toBeLessThanOrEqual(page.viewportSize()!.width + 1);
  return box!;
}

for (const language of ["pl", "uk", "fr", "be"] as const) {
  const copy = INTERACTIONS[language];
  for (const width of [320, 390, 768]) {
    test(`${copy.name} navigation and longer headings fit at ${width}px`, async ({ page }) => {
      test.setTimeout(60_000);
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      for (const route of ["/", "/platform/", "/deployment/", "/industries/healthcare/", "/blog/answers-need-sources/"].map(route => languagePath(route, language))) {
        await page.goto(route);
        await page.evaluate(async () => { await document.fonts.ready; });
        const header = page.locator("[data-site-header]");
        const controls = [
          header.getByRole("link", { name: copy.home, exact: true }),
          languageMenu(page, language).locator(":scope > summary"),
          header.locator(`a[href="${TELEGRAM}"]`),
          page.locator("[data-mobile-navigation] > summary"),
        ];
        const boxes = [];
        for (const control of controls) boxes.push(await withinViewport(page, control));
        boxes.sort((a, b) => a.x - b.x);
        for (let index = 1; index < boxes.length; index++) {
          expect(boxes[index - 1].x + boxes[index - 1].width, route).toBeLessThanOrEqual(boxes[index].x + 1);
        }
        await withinViewport(page, page.getByRole("heading", { level: 1 }));
        const layout = await page.evaluate(() => {
          const scrollWidth = document.documentElement.scrollWidth;
          const overflow = scrollWidth <= window.innerWidth + 1 ? [] : Array.from(document.querySelectorAll("body *"))
            .map(element => ({ element, box: element.getBoundingClientRect() }))
            .filter(({ box }) => box.width > 0 && box.right > window.innerWidth + 1)
            .slice(0, 20)
            .map(({ element, box }) => ({ tag: element.tagName, className: element.getAttribute("class"), width: box.width, right: box.right }));
          return { scrollWidth, overflow };
        });
        expect(layout.scrollWidth, `${route}: ${JSON.stringify(layout.overflow)}`).toBeLessThanOrEqual(width + 1);
        const menu = page.locator("[data-mobile-navigation]");
        await menu.locator(":scope > summary").click();
        await withinViewport(page, page.getByRole("navigation", { name: copy.mobileNavigation, exact: true }));
        await page.keyboard.press("Escape");
        await expect(menu).not.toHaveAttribute("open");
      }
    });
  }
}
