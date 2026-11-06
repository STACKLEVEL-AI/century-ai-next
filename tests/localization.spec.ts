import { expect, test, type Locator, type Page } from "@playwright/test";

const ORIGIN = "http://127.0.0.1:4173";
const SITE = "https://century-ai.eu";
const TELEGRAM = "https://t.me/vitalibakhmat";

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

function languageMenu(page: Page, language: "en" | "pl") {
  return page.locator("[data-site-header] details").filter({
    has: page.locator(`[data-language-switch="${language}"]`),
  });
}

async function switchLanguage(page: Page, language: "en" | "pl") {
  const menu = languageMenu(page, language);
  await menu.locator(":scope > summary").click();
  await menu.locator(`[data-language-switch="${language}"]`).click();
}

// Parse the HTTP response in an inert document. This never hydrates the page,
// so these checks cannot pass because client JavaScript fixed English markup.
async function readStaticDocuments(page: Page, markup: string[]) {
  return page.evaluate(sources => sources.map(source => {
    const doc = new DOMParser().parseFromString(source, "text/html");
    const meta = (property: string) => doc.querySelector(`meta[property="${property}"]`)?.getAttribute("content");
    return {
      lang: doc.documentElement.lang,
      title: doc.title,
      headings: Array.from(doc.querySelectorAll("h1"), heading => heading.textContent?.trim()),
      description: doc.querySelector('meta[name="description"]')?.getAttribute("content"),
      canonical: doc.querySelector('link[rel="canonical"]')?.getAttribute("href"),
      alternates: Object.fromEntries(Array.from(doc.querySelectorAll('link[rel="alternate"][hreflang]'), link => [link.getAttribute("hreflang"), link.getAttribute("href")])),
      ogUrl: meta("og:url"),
      ogLocale: meta("og:locale"),
      ogImage: meta("og:image"),
      navigationLabels: Array.from(doc.querySelectorAll("nav[aria-label]"), nav => nav.getAttribute("aria-label")),
      links: Array.from(doc.querySelectorAll("a[href]"), link => ({
        href: link.getAttribute("href")!,
        language: link.getAttribute("data-language-switch"),
        current: link.getAttribute("aria-current"),
      })),
      ids: Array.from(doc.querySelectorAll("[id]"), element => element.id),
      screenshotLabels: Array.from(doc.querySelectorAll("a.app-capture-open"), link => link.getAttribute("aria-label")),
      structuredData: Array.from(doc.querySelectorAll('script[type="application/ld+json"]'), script => JSON.parse(script.textContent || "null")),
    };
  }), markup);
}

test("All 26 Polish pages ship localized HTML, reciprocal metadata and local navigation", async ({ page, request }) => {
  test.setTimeout(90_000);
  expect(CONTENT_PATHS).toHaveLength(26);
  const polishPaths = new Set(CONTENT_PATHS.map(path => `/pl${path}`));

  for (const path of CONTENT_PATHS) {
    const polishPath = `/pl${path}`;
    const [plResponse, enResponse] = await Promise.all([request.get(polishPath), request.get(path)]);
    expect(plResponse.status(), polishPath).toBe(200);
    expect(enResponse.status(), path).toBe(200);
    const [polish, english] = await readStaticDocuments(page, [await plResponse.text(), await enResponse.text()]);
    const alternates = { en: `${SITE}${path}`, pl: `${SITE}${polishPath}`, "x-default": `${SITE}${path}` };

    expect(polish.lang, polishPath).toBe("pl");
    expect(english.lang, path).toBe("en");
    expect(polish.headings, polishPath).toHaveLength(1);
    expect(polish.headings[0], polishPath).toBeTruthy();
    expect(polish.title, polishPath).toBeTruthy();
    expect(polish.description, polishPath).toBeTruthy();
    expect(polish.description, polishPath).not.toBe(english.description);
    expect(polish.canonical, polishPath).toBe(`${SITE}${polishPath}`);
    expect(english.canonical, path).toBe(`${SITE}${path}`);
    expect(polish.alternates, polishPath).toEqual(alternates);
    expect(english.alternates, path).toEqual(alternates);
    expect(polish.ogUrl, polishPath).toBe(`${SITE}${polishPath}`);
    expect(polish.ogLocale, polishPath).toBe("pl_PL");
    expect(polish.ogImage, polishPath).toBe(`${SITE}/og/century-ai-pl.png`);
    expect(polish.navigationLabels, polishPath).toContain("Nawigacja główna");
    expect(polish.navigationLabels, polishPath).toContain("Nawigacja w stopce");

    // The corresponding page is available in either language before JS loads.
    for (const [snapshot, active] of [[polish, "pl"], [english, "en"]] as const) {
      expect(snapshot.links.filter(link => link.language), path).toEqual([
        { href: path, language: "en", current: active === "en" ? "page" : null },
        { href: polishPath, language: "pl", current: active === "pl" ? "page" : null },
      ]);
    }

    for (const link of polish.links) {
      if (link.language) continue;
      const target = new URL(link.href, `${SITE}${polishPath}`);
      if (target.origin !== SITE) continue;
      // Downloads and authentic app screenshots retain their shared asset URLs.
      if (/^\/(?:brand|media|images|og)\/.+\.[a-z0-9]+$/i.test(target.pathname)) continue;
      expect(polishPaths.has(target.pathname), `${polishPath}: ${link.href}`).toBe(true);
      if (target.pathname === polishPath && target.hash) {
        expect(polish.ids, `${polishPath}: ${link.href}`).toContain(decodeURIComponent(target.hash.slice(1)));
      }
    }
    for (const label of polish.screenshotLabels) expect(label, polishPath).toMatch(/^Otwórz zrzut ekranu „.+”$/);

    if (path === "/") {
      const graph = polish.structuredData[0]["@graph"];
      expect(graph).toHaveLength(2);
      for (const node of graph) {
        expect(node.inLanguage).toBe("pl");
        expect(node.url).toBe(`${SITE}/pl/`);
        expect(node["@id"]).toMatch(/^https:\/\/century-ai\.eu\/pl\/#/);
      }
    }
  }
});

test("Polish deep-page language switching and mobile navigation work without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ baseURL: ORIGIN, javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  try {
    const page = await context.newPage();
    const article = "/blog/answers-need-sources/";
    await page.goto(`/pl${article}`);
    await expect(page.locator("html")).toHaveAttribute("lang", "pl");
    const polishHeading = await page.getByRole("heading", { level: 1 }).innerText();
    await expect(page.locator(".co-reading-body > section").first()).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Spis treści poradnika" })).toBeVisible();

    await switchLanguage(page, "en");
    await expect(page).toHaveURL(`${ORIGIN}${article}`);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByRole("heading", { level: 1 })).not.toHaveText(polishHeading);
    await switchLanguage(page, "pl");
    await expect(page).toHaveURL(`${ORIGIN}/pl${article}`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(polishHeading);

    await page.locator("[data-mobile-navigation] > summary").click();
    const navigation = page.getByRole("navigation", { name: "Nawigacja mobilna", exact: true });
    const destination = "/pl/industries/telecommunication/";
    const group = navigation.locator("details").filter({ has: page.locator(`a[href="${destination}"]`) });
    await group.locator(":scope > summary").click();
    await group.locator(`a[href="${destination}"]`).click();
    await expect(page).toHaveURL(`${ORIGIN}${destination}`);
    await expect(page.locator("html")).toHaveAttribute("lang", "pl");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  } finally {
    await context.close();
  }
});

test("Switching language keeps the current industry, query and section", async ({ page }) => {
  const suffix = "/industries/insurance/?source=language-test#main-content";
  await page.goto(`/pl${suffix}`);
  await page.waitForLoadState("networkidle");
  await switchLanguage(page, "en");
  await expect(page).toHaveURL(`${ORIGIN}${suffix}`);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.waitForLoadState("networkidle");
  await switchLanguage(page, "pl");
  await expect(page).toHaveURL(`${ORIGIN}/pl${suffix}`);
  await expect(page.locator("html")).toHaveAttribute("lang", "pl");
});

test("Polish guide categories filter real articles and announce Polish counts", async ({ page }) => {
  await page.goto("/pl/blog/");
  const library = page.locator(".co-library");
  const filters = library.getByRole("group", { name: "Filtruj poradniki według kategorii" });
  await expect(library.getByRole("article")).toHaveCount(4);
  await expect(library.getByRole("status")).toHaveText(/^4 poradniki\b/);

  for (const category of ["Pierwsze kroki", "Wiedza", "Przepływy pracy", "Wdrożenie"]) {
    const button = filters.getByRole("button", { name: category, exact: true });
    await button.click();
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(library.getByRole("article")).toHaveCount(1);
    await expect(library.getByRole("status")).toHaveText(`1 poradnik w kategorii „${category}”`);
    await expect(library.getByRole("article").getByRole("link")).toHaveAttribute("href", /^\/pl\/blog\/[^/]+\/$/);
  }
  await filters.getByRole("button", { name: "Wszystkie poradniki", exact: true }).click();
  await expect(library.getByRole("article")).toHaveCount(4);
  await expect(library.getByRole("status")).toHaveText(/^4 poradniki\b/);
  await filters.getByRole("button", { name: "Wiedza", exact: true }).click();
  await library.getByRole("article").getByRole("link").click();
  await expect(page).toHaveURL(`${ORIGIN}/pl/blog/answers-need-sources/`);
  await expect(page.locator("html")).toHaveAttribute("lang", "pl");
});

test("Polish product tabs and deployment and security disclosures remain usable by keyboard", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  const explorers = [
    { path: "/pl/platform/", count: 7, englishLabels: ["Quality & activity", "Workflows & agents", "Specification & development", "Knowledge", "Models", "Integrations", "Security & governance"] },
    { path: "/pl/ai-gateway/", count: 3, englishLabels: ["Models & controls", "Files & context", "Response details"] },
  ];
  for (const explorer of explorers) {
    await page.goto(explorer.path);
    const tablist = page.getByRole("tablist");
    const tabs = tablist.getByRole("tab");
    await expect(tabs).toHaveCount(explorer.count);
    for (const label of await tabs.allTextContents()) expect(explorer.englishLabels).not.toContain(label.trim());
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
    await page.keyboard.press("End");
    await expect(tabs.last()).toBeFocused();
    await expect(tabs.last()).toHaveAttribute("aria-selected", "true");
    await page.keyboard.press("Home");
    await expect(tabs.first()).toBeFocused();
    await expect(tabs.first()).toHaveAttribute("aria-selected", "true");
  }

  await page.goto("/pl/deployment/");
  const journey = page.getByRole("list", { name: "Prace wdrożeniowe i ich rezultaty", exact: true });
  await expect(journey.getByRole("listitem")).toHaveCount(4);
  for (const name of ["Określ zakres", "Zweryfikuj", "Wdróż", "Szkol i doskonal"]) {
    await expect(journey.getByRole("heading", { name, exact: true })).toBeVisible();
  }
  for (const stage of await journey.getByRole("listitem").all()) {
    await expect(stage.getByText("Zakres prac", { exact: true })).toBeVisible();
    await expect(stage.getByText("Rezultaty etapu", { exact: true })).toBeVisible();
    await expect(stage.getByText("Kolejna decyzja", { exact: true })).toBeVisible();
    for (const paragraph of await stage.locator("p, dd").all()) {
      await expect(paragraph).toBeVisible();
      await expect(paragraph).not.toBeEmpty();
    }
  }
  const installation = page.locator("#deployment-options details");
  await expect(installation).not.toHaveAttribute("open");
  await expect(installation.locator("summary")).toHaveText("Co uzgadniamy przed instalacją");
  await installation.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(installation).toHaveAttribute("open", "");
  await expect(installation.getByText("Tożsamość i dane", { exact: true })).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(installation).not.toHaveAttribute("open");

  await page.goto("/pl/security/");
  const question = page.locator("#security details").first();
  await expect(question).not.toHaveAttribute("open");
  await expect(question.locator("summary")).toContainText("Czy Century");
  await question.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(question).toHaveAttribute("open", "");
  await expect(question.locator("p")).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(question).not.toHaveAttribute("open");
  expect(errors).toEqual([]);
});

async function withinViewport(page: Page, locator: Locator) {
  await expect(locator).toBeVisible();
  const box = await locator.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(-1);
  expect(box!.x + box!.width).toBeLessThanOrEqual(page.viewportSize()!.width + 1);
  return box!;
}

for (const width of [390, 768]) {
  test(`Polish navigation and longer headings fit at ${width}px`, async ({ page }) => {
    test.setTimeout(60_000);
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const route of ["/pl/", "/pl/platform/", "/pl/deployment/", "/pl/industries/healthcare/", "/pl/blog/answers-need-sources/"]) {
      await page.goto(route);
      await page.evaluate(async () => { await document.fonts.ready; });
      const header = page.locator("[data-site-header]");
      const controls = [
        header.getByRole("link", { name: "Century — strona główna", exact: true }),
        languageMenu(page, "pl").locator(":scope > summary"),
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
      await withinViewport(page, page.getByRole("navigation", { name: "Nawigacja mobilna", exact: true }));
      await page.keyboard.press("Escape");
      await expect(menu).not.toHaveAttribute("open");
    }
  });
}
