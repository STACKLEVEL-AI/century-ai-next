import { expect, test, type Locator, type Page } from "@playwright/test";
import { SITE_ROUTES } from "../src/lib/routes";

const ORIGIN = "http://127.0.0.1:4173";

function languageMenu(page: Page, locale: "en" | "de") {
  const label = locale === "de" ? "Sprache: Deutsch" : "Language: English";
  return page.locator("[data-site-header] details").filter({
    has: page.locator(`:scope > summary[aria-label="${label}"]`),
  });
}

function navigationGroup(page: Page, navigation: Locator, label: string) {
  return navigation.locator("details").filter({
    has: page.locator("summary").filter({ hasText: new RegExp(`^${label}$`) }),
  });
}

function collectRuntimeErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error" && /hydrat|server.render|did not match|minified react error/i.test(message.text())) {
      errors.push(message.text());
    }
  });
  return errors;
}

async function expectNoSavedPreferences(page: Page) {
  expect(await page.context().cookies()).toEqual([]);
  expect(await page.evaluate(() => ({
    local: Object.keys(window.localStorage),
    session: Object.keys(window.sessionStorage),
  }))).toEqual({ local: [], session: [] });
}

// Optional checks against the production static export. These exercise actual
// links, SSR content and client state rather than the localization generator.
test("Language switching preserves a deep article, its query and its fragment", async ({ page }) => {
  const errors = collectRuntimeErrors(page);
  await page.setViewportSize({ width: 1440, height: 900 });
  const article = "/blog/choose-first-ai-workflow/";
  const suffix = "?ref=language-test&source=guide#define-success";
  await page.goto(article + suffix);

  const english = languageMenu(page, "en");
  await english.locator(":scope > summary").click();
  await expect(english.locator('[data-language-switch="en"][aria-current="page"]')).toHaveText("English");
  const germanLink = english.getByRole("link", { name: "Deutsch", exact: true });
  await expect(germanLink).toHaveAttribute("href", `/de${article}`);
  await expect(germanLink).toHaveAttribute("hreflang", "de");
  await germanLink.click();

  await expect(page).toHaveURL(`${ORIGIN}/de${article}${suffix}`);
  await expect(page.locator("html")).toHaveAttribute("lang", "de");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Beginnen Sie mit einem Workflow, der sich im Alltag bewährt");
  await expect(page.locator("#define-success h2")).toHaveText("Machen Sie Erfolg überprüfbar");

  const german = languageMenu(page, "de");
  await german.locator(":scope > summary").click();
  await expect(german.locator('[data-language-switch="de"][aria-current="page"]')).toHaveText("Deutsch");
  const englishLink = german.getByRole("link", { name: "English", exact: true });
  await expect(englishLink).toHaveAttribute("href", article);
  await englishLink.click();

  await expect(page).toHaveURL(`${ORIGIN}${article}${suffix}`);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Start with one workflow, make it worth repeating");
  await expectNoSavedPreferences(page);
  expect(errors, "Language navigation must not produce hydration or runtime errors").toEqual([]);
});

test("The German mobile menu opens translated groups and keeps the selected language", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/de/");
  const menu = page.locator("[data-mobile-navigation]");
  const trigger = menu.locator(":scope > summary");
  await trigger.click();
  const navigation = menu.getByRole("navigation");
  await expect(navigation).toBeVisible();
  const industries = navigationGroup(page, navigation, "Branchen");
  await industries.locator(":scope > summary").click();
  const airlines = industries.getByRole("link", { name: /^Fluggesellschaften\b/ });
  await expect(airlines).toHaveAttribute("href", "/de/industries/airlines/");
  await airlines.scrollIntoViewIfNeeded();
  await expect(airlines).toBeInViewport();
  await airlines.focus();
  await page.keyboard.press("Escape");
  await expect(menu).not.toHaveAttribute("open");
  await expect(trigger).toBeFocused();

  await trigger.click();
  await industries.locator(":scope > summary").click();
  await airlines.click();
  await expect(page).toHaveURL(`${ORIGIN}/de/industries/airlines/`);
  await expect(page.locator("html")).toHaveAttribute("lang", "de");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Fluggesellschaften");
  const language = languageMenu(page, "de");
  await language.locator(":scope > summary").click();
  await expect(language.getByRole("link", { name: "English", exact: true })).toHaveAttribute("href", "/industries/airlines/");
});

test("German guide filters update their cards, category and result count", async ({ page }) => {
  const errors = collectRuntimeErrors(page);
  await page.goto("/de/blog/");
  const filters = page.getByRole("group", { name: "Leitfäden nach Kategorie filtern" });
  const cards = page.locator(".co-guide-grid .co-guide-card");
  await expect(cards).toHaveCount(4);
  await filters.getByRole("button", { name: "Wissen", exact: true }).click();
  await expect(filters.getByRole("button", { name: "Wissen", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(cards).toHaveCount(1);
  await expect(cards.getByRole("heading")).toHaveText("Eine Antwort ist wertvoller, wenn Sie ihre Quellen prüfen können");
  await expect(cards.getByRole("link")).toHaveAttribute("href", "/de/blog/answers-need-sources/");
  await expect(page.getByRole("status")).toHaveText("1 Leitfaden in der Kategorie Wissen");
  await filters.getByRole("button", { name: "Alle Leitfäden", exact: true }).click();
  await expect(cards).toHaveCount(4);
  await expect(page.getByRole("status")).toHaveText("4 Leitfäden zum Entdecken");
  await expectNoSavedPreferences(page);
  expect(errors).toEqual([]);
});

test("German industry tabs respond to keyboard navigation and link to German pages", async ({ page }) => {
  const errors = collectRuntimeErrors(page);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/de/");
  const tabs = page.getByRole("tablist", { name: "Branchen entdecken" });
  const banking = tabs.getByRole("tab", { name: "Banken", exact: true });
  await banking.focus();
  await page.keyboard.press("ArrowRight");
  const telecom = tabs.getByRole("tab", { name: "Telekommunikation", exact: true });
  await expect(telecom).toBeFocused();
  await expect(telecom).toHaveAttribute("aria-selected", "true");
  await expect(banking).toHaveAttribute("aria-selected", "false");
  const panel = page.getByRole("tabpanel");
  await expect(panel.getByRole("heading")).toHaveText("Den Kundenkontext zusammenhalten");
  await expect(panel.getByRole("link")).toHaveAttribute("href", "/de/industries/telecommunication/");

  await page.keyboard.press("End");
  const airlines = tabs.getByRole("tab", { name: "Fluggesellschaften", exact: true });
  await expect(airlines).toBeFocused();
  await expect(airlines).toHaveAttribute("aria-selected", "true");
  await expect(panel.getByRole("heading")).toHaveText("Teams informieren, wenn sich Pläne ändern");
  await expect(panel.getByRole("link")).toHaveText("Mehr erfahren: Fluggesellschaften");
  await expect(panel.getByRole("link")).toHaveAttribute("href", "/de/industries/airlines/");

  await page.keyboard.press("Home");
  await expect(banking).toBeFocused();
  await expect(banking).toHaveAttribute("aria-selected", "true");
  expect(errors).toEqual([]);
});

test("German content and language links are present in the export without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ baseURL: ORIGIN, javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  try {
    const page = await context.newPage();
    const homepage = await page.goto("/de/");
    expect(homepage?.status()).toBe(200);
    expect(await homepage!.text()).toMatch(/<html\b[^>]*\blang="de"/);
    await expect(page.getByRole("heading", { name: "Entwickelt für Ihre Branche" })).toBeVisible();
    const fallback = page.getByRole("navigation", { name: "Branchenseiten", exact: true });
    await expect(fallback.getByRole("link")).toHaveCount(7);
    await expect(fallback.getByRole("link", { name: "Banken", exact: true })).toHaveAttribute("href", "/de/industries/banking/");

    const article = "/blog/choose-first-ai-workflow/";
    const response = await page.goto(`/de${article}`);
    expect(response?.status()).toBe(200);
    expect(await response!.text()).toMatch(/<html\b[^>]*\blang="de"/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Beginnen Sie mit einem Workflow, der sich im Alltag bewährt");
    await expect(page.locator(".co-reading-body")).toContainText("Ein sinnvolles erstes KI-Projekt beginnt mit einer konkreten Aufgabe.");
    await expect(page.getByRole("navigation", { name: "Inhalt des Leitfadens", exact: true })).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://century-ai.eu/de${article}`);
    await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(4);
    for (const [language, prefix] of [["en", ""], ["de", "/de"], ["pl", "/pl"], ["x-default", ""]]) {
      await expect(page.locator(`link[rel="alternate"][hreflang="${language}"]`)).toHaveAttribute("href", `https://century-ai.eu${prefix}${article}`);
    }
    await expect(page.locator('[data-language-switch="pl"]')).toHaveAttribute("href", `/pl${article}`);
    const language = languageMenu(page, "de");
    await language.locator(":scope > summary").click();
    await language.getByRole("link", { name: "English", exact: true }).click();
    await expect(page).toHaveURL(`${ORIGIN}${article}`);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  } finally {
    await context.close();
  }
});

for (const width of [320, 390]) {
  test(`German layouts fit a ${width}px viewport without hydration errors`, async ({ page }, testInfo) => {
    test.setTimeout(90_000);
    const errors = collectRuntimeErrors(page);
    await page.setViewportSize({ width, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const previews = ["/de/", "/de/platform/", "/de/deployment/", "/de/industries/healthcare/", "/de/blog/choose-first-ai-workflow/", "/de/privacy/"];
    for (const route of SITE_ROUTES.map(route => `/de${route}`)) {
      await page.goto(route);
      await page.evaluate(async () => { await document.fonts.ready; });
      await expect(page.locator("html")).toHaveAttribute("lang", "de");
      const dimensions = await page.evaluate(() => ({
        content: document.documentElement.scrollWidth,
        viewport: document.documentElement.clientWidth,
      }));
      if (dimensions.content > dimensions.viewport + 1) {
        const overflow = await page.evaluate(() => Array.from(document.querySelectorAll("body *"))
          .filter(element => element.checkVisibility())
          .map(element => ({ element: element.tagName + "." + element.className, box: element.getBoundingClientRect().toJSON() }))
          .filter(item => item.box.width > 0 && item.box.right > document.documentElement.clientWidth + 1)
          .slice(0, 25));
        console.log(`Overflow details for ${route} at ${width}px: ${JSON.stringify(overflow)}`);
      }
      expect.soft(dimensions.content, `Horizontal overflow on ${route} at ${width}px`).toBeLessThanOrEqual(dimensions.viewport + 1);
      await expect(languageMenu(page, "de").locator(":scope > summary")).toBeInViewport();
      if (width === 390 && previews.includes(route)) {
        await page.screenshot({ path: testInfo.outputPath(route.replace(/\//g, "-") + ".png"), fullPage: true });
      }
    }
    expect(errors).toEqual([]);
  });
}
