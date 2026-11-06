import { expect, test, type Locator, type Page } from "@playwright/test";
import { guideCount, languageAlternates, locales, localizedPath, type Locale } from "../src/lib/i18n";

const ORIGIN = "http://127.0.0.1:4173";
const SITE = "https://century-ai.eu";
const TELEGRAM = "https://t.me/vitalibakhmat";

const languageLabels = { en: "English", de: "Deutsch", uk: "Українська" } as const;
const languageMenuLabels = { en: "Language: English", de: "Sprache: Deutsch", uk: "Мова: українська" } as const;

function languageMenu(page: Page, locale: Locale) {
  return page.locator("[data-site-header] details").filter({
    has: page.locator(`summary[aria-label="${languageMenuLabels[locale]}"]`),
  });
}

async function expectSelectedTab(page: Page, tab: Locator) {
  await expect(tab).toBeFocused();
  await expect(tab).toHaveAttribute("aria-selected", "true");
  const panelId = await tab.getAttribute("aria-controls");
  expect(panelId).toBeTruthy();
  await expect(page.locator(`[id="${panelId}"]`)).toBeVisible();
}

async function expectHeaderFits(page: Page, label: string) {
  const width = page.viewportSize()!.width;
  const header = page.locator("[data-site-header]");
  const desktop = header.getByRole("navigation", { name: "Головна навігація", exact: true });
  const mobileTrigger = header.locator("[data-mobile-navigation] > summary");
  const controls = [header.getByRole("link", { name: "Головна сторінка Century", exact: true })];
  if (await desktop.isVisible()) controls.push(desktop);
  controls.push(
    header.getByLabel("Мова: українська", { exact: true }),
    header.getByRole("link", { name: "Зв’язатися", exact: true }),
  );
  if (await mobileTrigger.isVisible()) controls.push(mobileTrigger);
  let previousRight = 0;
  for (const control of controls) {
    await expect(control).toBeInViewport();
    const box = await control.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.x, `${label}: a header control starts outside the viewport`).toBeGreaterThanOrEqual(-1);
    expect(box!.x + box!.width, `${label}: a header control ends outside the viewport`).toBeLessThanOrEqual(width + 1);
    expect(box!.x, `${label}: adjacent header controls overlap`).toBeGreaterThanOrEqual(previousRight - 1);
    previousRight = box!.x + box!.width;
  }
}

// Run against the production export. These checks exercise generated HTML and
// hydrated behavior without depending on internal generated-module structure.
test("Language paths preserve all three locales, route suffixes and localized guide counts", () => {
  expect(locales).toEqual(["en", "de", "uk"]);
  const routes = [
    { input: "/", en: "/", de: "/de/", uk: "/uk/" },
    { input: "/uk/", en: "/", de: "/de/", uk: "/uk/" },
    { input: "/de", en: "/", de: "/de/", uk: "/uk/" },
    { input: "/blog/answers-need-sources/", en: "/blog/answers-need-sources/", de: "/de/blog/answers-need-sources/", uk: "/uk/blog/answers-need-sources/" },
    { input: "/uk/industries/telecommunication/", en: "/industries/telecommunication/", de: "/de/industries/telecommunication/", uk: "/uk/industries/telecommunication/" },
    { input: "/de/blog/human-review?source=test#main-content", en: "/blog/human-review/?source=test#main-content", de: "/de/blog/human-review/?source=test#main-content", uk: "/uk/blog/human-review/?source=test#main-content" },
    // Words that start with a language code must remain content route segments.
    { input: "/ukraine/", en: "/ukraine/", de: "/de/ukraine/", uk: "/uk/ukraine/" },
    { input: "/depot/", en: "/depot/", de: "/de/depot/", uk: "/uk/depot/" },
  ];
  for (const route of routes) {
    for (const locale of locales) expect(localizedPath(route.input, locale)).toBe(route[locale]);
  }
  for (const path of ["/media/app/files.webp", "/media/de/strategy.webp", "/uk/media/strategy.webp", "/og/century-ai-eu-de.png", "/downloads/guide.pdf", "#main-content", "https://example.com/", "//example.com/image.webp", "mailto:hello@example.com"]) {
    for (const locale of locales) expect(localizedPath(path, locale)).toBe(path);
  }
  expect(languageAlternates("/de/blog/human-review/", SITE)).toEqual({
    en: `${SITE}/blog/human-review/`, de: `${SITE}/de/blog/human-review/`,
    uk: `${SITE}/uk/blog/human-review/`, "x-default": `${SITE}/blog/human-review/`,
  });
  for (const [count, noun] of [[0, "посібників"], [1, "посібник"], [2, "посібники"], [5, "посібників"], [11, "посібників"], [21, "посібник"], [22, "посібники"]] as const) {
    expect(guideCount(count, null, "uk")).toBe(`${count} ${noun} для ознайомлення`);
  }
  expect(guideCount(1, "Знання", "uk")).toBe("1 посібник у категорії «Знання»");
  expect(guideCount(2, null, "en")).toBe("2 guides to explore");
  expect(guideCount(1, "Knowledge", "en")).toBe("1 guide in knowledge");
  expect(guideCount(2, null, "de")).toBe("2 Leitfäden zum Entdecken");
  expect(guideCount(1, "Wissen", "de")).toBe("1 Leitfaden in der Kategorie Wissen");
});

test("Ukrainian content and language-specific SEO are present without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ baseURL: ORIGIN, javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    for (const route of ["/uk/", "/uk/platform/", "/uk/agents/", "/uk/deployment/", "/uk/industries/insurance/", "/uk/blog/answers-need-sources/", "/uk/privacy/"]) {
      const response = await page.goto(route);
      expect(response?.status(), route).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", "uk");
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      expect(await page.getByRole("heading", { level: 1 }).innerText()).toMatch(/[А-Яа-яІіЇїЄєҐґ]/);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${SITE}${route}`);
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", `${SITE}${route}`);
      await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "uk_UA");
      expect(await page.locator('meta[property="og:locale:alternate"]').evaluateAll(nodes =>
        nodes.map(node => node.getAttribute("content")).sort(),
      )).toEqual(["de_DE", "en_GB"]);
      await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(4);
      expect(await page.locator('meta[name="description"]').getAttribute("content")).toMatch(/[А-Яа-яІіЇїЄєҐґ]/);
      const englishRoute = route.slice(3) || "/";
      await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", `${SITE}${englishRoute}`);
      await expect(page.locator('link[rel="alternate"][hreflang="de"]')).toHaveAttribute("href", `${SITE}/de${englishRoute}`);
      await expect(page.locator('link[rel="alternate"][hreflang="uk"]')).toHaveAttribute("href", `${SITE}${route}`);
      await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute("href", `${SITE}${englishRoute}`);
      await expect(page.locator('[data-language-switch="en"]')).toHaveAttribute("href", englishRoute);
      await expect(page.locator('[data-language-switch="de"]')).toHaveAttribute("href", `/de${englishRoute}`);
      await expect(page.locator('[data-language-current="uk"]')).toHaveText("Українська");
    }
    await page.goto("/uk/");
    const graph = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() || "{}")["@graph"];
    expect(graph.map((entry: { "@type": string }) => entry["@type"])).toEqual(["WebSite", "WebPage"]);
    expect(graph[0]).toMatchObject({
      "@id": `${SITE}/#website`, url: `${SITE}/`, inLanguage: ["en", "de", "uk"],
    });
    expect(graph[1]).toMatchObject({
      "@id": `${SITE}/uk/#webpage`, url: `${SITE}/uk/`, inLanguage: "uk",
      isPartOf: { "@id": `${SITE}/#website` },
    });
  } finally {
    await context.close();
  }
});

test("English, German and Ukrainian language switching preserves a nested article, query parameters and anchor", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => {
    if (message.type() === "error" && /hydrat|server.render|did not match|minified react error/i.test(message.text())) {
      errors.push(message.text());
    }
  });
  const article = "/blog/answers-need-sources/";
  const suffix = "?source=locale-test&view=guide#main-content";
  await page.goto(`/uk${article}${suffix}`);
  let current: Locale = "uk";
  // Exercise EN ↔ UK and DE ↔ UK, including switching from a prefixed route.
  for (const next of ["en", "uk", "de", "uk"] as const) {
    const menu = languageMenu(page, current);
    await menu.locator(":scope > summary").click();
    await expect(menu.locator(`[data-language-current="${current}"]`)).toHaveText(languageLabels[current]);
    await expect(menu.getByRole("link", { name: languageLabels[current], exact: true })).toHaveCount(0);
    await expect(menu.getByRole("link")).toHaveCount(2);
    const link = menu.getByRole("link", { name: languageLabels[next], exact: true });
    const destination = `${next === "en" ? "" : `/${next}`}${article}`;
    await expect(link).toHaveAttribute("href", destination);
    await expect(link).toHaveAttribute("hreflang", next);
    await link.click();
    await expect(page).toHaveURL(`${ORIGIN}${destination}${suffix}`);
    await expect(page.locator("html")).toHaveAttribute("lang", next);
    current = next;
  }
  expect(errors).toEqual([]);
});

test("Legacy platform links preserve the language, query parameters and anchor", async ({ page, request }) => {
  const suffix = "?source=legacy&view=platform#operating-layer";
  for (const prefix of ["", "/de", "/uk"]) {
    const legacy = `${prefix}/ai-os/`;
    const destination = `${prefix}/platform/`;
    const response = await request.get(legacy);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain('name="robots" content="noindex,follow"');
    expect(html).toContain(`rel="canonical" href="${SITE}${destination}"`);
    await page.goto(`${legacy}${suffix}`);
    await expect(page).toHaveURL(`${ORIGIN}${destination}${suffix}`);
    await expect(page.locator("html")).toHaveAttribute("lang", prefix.slice(1) || "en");
    await expect(page.locator("#operating-layer")).toBeVisible();
  }
});

test("Internal page links keep Ukrainian across products, industries and articles", async ({ page }) => {
  for (const route of ["/uk/", "/uk/platform/", "/uk/deployment/", "/uk/industries/banking/", "/uk/blog/human-review/", "/uk/press/"]) {
    await page.goto(route);
    const links = await page.locator("a[href]:not([data-language-switch])").evaluateAll(nodes =>
      nodes.map(node => node.getAttribute("href")!),
    );
    for (const href of links) {
      const destination = new URL(href, page.url());
      if (destination.origin !== ORIGIN || /\.[a-z\d]+$/i.test(destination.pathname)) continue;
      expect(destination.pathname, `${route}: ${href}`).toMatch(/^\/uk\//);
    }
  }
  await page.getByRole("navigation", { name: "Навігація в нижній частині сторінки" })
    .getByRole("link", { name: "Контакти", exact: true }).click();
  await expect(page).toHaveURL(`${ORIGIN}/uk/contact/`);
  await page.getByRole("link", { name: "Інформація про конфіденційність", exact: true }).click();
  await expect(page).toHaveURL(`${ORIGIN}/uk/privacy/`);
});

test("The shared English footer signature stays accessible and links to the current language", async ({ page }) => {
  // The standard footer and industry footer share one signature component.
  for (const locale of ["en", "de", "uk"] as const) {
    const prefix = locale === "en" ? "" : `/${locale}`;
    const homepage = `${prefix}/`;
    for (const route of ["/", "/industries/insurance/"]) {
      await page.goto(`${prefix}${route}`);
      const signature = page.locator("footer").getByRole("link", {
        name: "WE LEAVE IN THE AI CENTURY", exact: true,
      });
      await expect(signature).toHaveCount(1);
      await signature.scrollIntoViewIfNeeded();
      await expect(signature).toBeInViewport();
      await expect(signature).toHaveText("WE LEAVE IN THE AI");
      await expect(signature).toHaveAttribute("lang", "en");
      await expect(signature).toHaveAttribute("translate", "no");
      await expect(signature).toHaveAttribute("dir", "ltr");
      await expect(signature).toHaveAttribute("href", homepage);
      const logo = signature.locator("img");
      await expect(logo).toHaveCount(1);
      await expect(logo).toHaveAttribute("src", "/brand/century-logo-white.svg");
      await expect(logo).toHaveAttribute("alt", "");
      await expect(logo).toBeVisible();
      await expect.poll(() => logo.evaluate(node => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
      await signature.click();
      await expect(page).toHaveURL(`${ORIGIN}${homepage}`);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
    }
  }
});

test("Ukrainian mobile navigation and the language selector work without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({
    baseURL: ORIGIN, javaScriptEnabled: false, viewport: { width: 390, height: 844 },
  });
  try {
    const page = await context.newPage();
    await page.goto("/uk/");
    const fallback = page.getByRole("navigation", { name: "Сторінки галузей", exact: true });
    await expect(fallback.getByRole("link")).toHaveCount(7);
    await expect(fallback.getByRole("link", { name: "Охорона здоров’я", exact: true }))
      .toHaveAttribute("href", "/uk/industries/healthcare/");
    await page.locator("[data-mobile-navigation] > summary").click();
    const navigation = page.getByRole("navigation", { name: "Мобільна навігація", exact: true });
    await expect(navigation).toBeVisible();
    await navigation.locator("summary").filter({ hasText: /^Галузі$/ }).click();
    await navigation.getByRole("link", { name: /^Телекомунікації/ }).click();
    await expect(page).toHaveURL(`${ORIGIN}/uk/industries/telecommunication/`);
    await expect(page.locator("html")).toHaveAttribute("lang", "uk");
    await page.getByLabel("Мова: українська", { exact: true }).click();
    await page.getByRole("link", { name: "English", exact: true }).click();
    await expect(page).toHaveURL(`${ORIGIN}/industries/telecommunication/`);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  } finally {
    await context.close();
  }
});

test("Translated guide filters show Ukrainian counts and retain article destinations", async ({ page }) => {
  await page.goto("/uk/blog/");
  const library = page.locator(".co-library");
  const filters = library.getByRole("group", { name: "Фільтрувати посібники за категорією" });
  await expect(filters.getByRole("button")).toHaveText(["Усі посібники", "Перші кроки", "Знання", "Робочі процеси", "Розгортання"]);
  await expect(library.getByRole("article")).toHaveCount(4);
  await expect(library.getByRole("status")).toHaveText("4 посібники для ознайомлення");
  await filters.getByRole("button", { name: "Знання", exact: true }).click();
  await expect(filters.getByRole("button", { name: "Знання", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(library.getByRole("article")).toHaveCount(1);
  await expect(library.getByRole("status")).toHaveText("1 посібник у категорії «Знання»");
  expect(await library.innerText()).not.toMatch(/\b(All guides|Getting started|Knowledge|Workflows|Deployment|Read guide|guides? to explore)\b/);
  await library.getByRole("article").getByRole("link").click();
  await expect(page).toHaveURL(`${ORIGIN}/uk/blog/answers-need-sources/`);
  await page.getByRole("link", { name: "Усі посібники Century", exact: true }).click();
  await filters.getByRole("button", { name: "Розгортання", exact: true }).click();
  await expect(library.getByRole("article")).toHaveCount(1);
  await filters.getByRole("button", { name: "Усі посібники", exact: true }).click();
  await expect(library.getByRole("article")).toHaveCount(4);
  await expect(library.getByRole("status")).toHaveText("4 посібники для ознайомлення");
});

test("Ukrainian product tabs retain keyboard behavior and localized screenshot labels", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/uk/platform/");
  const layers = page.getByRole("tablist", { name: "Дослідити інфраструктуру AI Platform" });
  await layers.getByRole("tab", { name: "Безпека й управління", exact: true }).focus();
  await page.keyboard.press("ArrowDown");
  await expectSelectedTab(page, layers.getByRole("tab", { name: "Якість і дії", exact: true }));
  await page.keyboard.press("End");
  await expectSelectedTab(page, layers.getByRole("tab", { name: "Безпека й управління", exact: true }));
  await page.keyboard.press("Home");
  await expectSelectedTab(page, layers.getByRole("tab", { name: "Якість і дії", exact: true }));

  await page.goto("/uk/ai-gateway/");
  const views = page.getByRole("tablist", { name: "Екрани застосунку Century" });
  await views.getByRole("tab", { name: "Моделі й керування", exact: true }).focus();
  await page.keyboard.press("ArrowDown");
  await expectSelectedTab(page, views.getByRole("tab", { name: "Файли й контекст", exact: true }));
  const capture = page.getByRole("tabpanel", { name: "Файли й контекст", exact: true }).locator("figure.app-capture");
  const image = capture.locator("img");
  await expect(image).toHaveAttribute("src", "/media/app/files.webp");
  expect(await image.getAttribute("alt")).toMatch(/[А-Яа-яІіЇїЄєҐґ]/);
  await expect(capture.getByRole("link")).toHaveAttribute("aria-label", /^Відкрити знімок екрана «.+»$/);
  await expect(capture.getByRole("link")).toHaveAttribute("href", "/media/app/files.webp");
  await page.keyboard.press("End");
  await expectSelectedTab(page, views.getByRole("tab", { name: "Деталі відповіді", exact: true }));
  expect(errors).toEqual([]);
});

test("Ukrainian deployment keeps its complete delivery path and installation details usable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({
    baseURL: ORIGIN, javaScriptEnabled: false, viewport: { width: 390, height: 844 },
  });
  try {
    const page = await context.newPage();
    await page.goto("/uk/deployment/");
    const journey = page.getByRole("list", { name: "Роботи та результати впровадження", exact: true });
    await expect(journey.getByRole("listitem")).toHaveCount(4);
    await expect(journey.getByRole("heading", { level: 3 })).toHaveText([
      "Визначення завдання", "Перевірка", "Розгортання", "Навчання й удосконалення",
    ]);
    for (const stage of await journey.getByRole("listitem").all()) {
      await expect(stage.getByRole("heading", { level: 3 })).toBeVisible();
      await expect(stage.getByText("Наша робота", { exact: true })).toBeVisible();
      await expect(stage.locator("dt")).toHaveText(["Що ви отримуєте", "Наступне рішення"]);
      await expect(stage.locator("dd")).toHaveCount(2);
      for (const outcome of await stage.locator("dd").all()) {
        await expect(outcome).toBeVisible();
        expect(await outcome.innerText()).toMatch(/[А-Яа-яІіЇїЄєҐґ]/);
      }
    }
    const pageNavigation = page.getByRole("navigation", { name: "На цій сторінці", exact: true });
    await expect(pageNavigation.getByRole("link")).toHaveText([
      "Етапи впровадження", "Ваша команда", "Приймання", "Інфраструктура",
    ]);
    for (const link of await pageNavigation.getByRole("link").all()) {
      const href = await link.getAttribute("href");
      expect(href).toMatch(/^#[a-z-]+$/);
      await expect(page.locator(href!)).toHaveCount(1);
    }
    await pageNavigation.getByRole("link", { name: "Інфраструктура", exact: true }).click();
    await expect(page).toHaveURL(`${ORIGIN}/uk/deployment/#deployment-options`);
    const installation = page.locator("#deployment-options details");
    const summary = installation.locator("summary");
    await expect(summary).toHaveText("Що узгоджуємо перед установленням");
    await expect(installation).not.toHaveAttribute("open");
    await summary.focus();
    await page.keyboard.press("Enter");
    await expect(installation).toHaveAttribute("open", "");
    await expect(installation.getByText("Ідентифікація користувачів і дані", { exact: true })).toBeVisible();
    await expect(summary).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(installation).not.toHaveAttribute("open");
    await expect(installation.getByText("Ідентифікація користувачів і дані", { exact: true })).not.toBeVisible();
    const contactLinks = page.locator(`main a[href="${TELEGRAM}"]`);
    await expect(contactLinks).toHaveText(["Обговорити ваш процес", "Обговорити ваш процес"]);
    for (const link of await contactLinks.all()) await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    await expect(page.getByRole("heading", { name: "Почніть з одного процесу", exact: true })).toBeVisible();
  } finally {
    await context.close();
  }
});

test("Ukrainian header controls fit and keyboard menus work across the mobile breakpoint", async ({ page }) => {
  for (const width of [320, 879, 880]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/uk/deployment/");
    await page.evaluate(async () => { await document.fonts.ready; });
    await expectHeaderFits(page, `Deployment at ${width}px`);
    const header = page.locator("[data-site-header]");
    const heading = page.getByRole("heading", { level: 1 });
    const headerBox = await header.boundingBox();
    const headingBox = await heading.boundingBox();
    expect(headerBox).not.toBeNull();
    expect(headingBox).not.toBeNull();
    expect(headingBox!.y, "The light header must leave room for the deployment heading")
      .toBeGreaterThanOrEqual(headerBox!.y + headerBox!.height);

    const mobile = width < 880;
    const menu = page.locator("[data-mobile-navigation]");
    const mobileTrigger = menu.locator(":scope > summary");
    if (mobile) {
      await mobileTrigger.focus();
      await page.keyboard.press("Enter");
      await expect(menu).toHaveAttribute("open", "");
    } else {
      await expect(mobileTrigger).not.toBeVisible();
    }
    const navigation = page.getByRole("navigation", {
      name: mobile ? "Мобільна навігація" : "Головна навігація", exact: true,
    });
    const platform = navigation.locator("details").filter({
      has: page.locator("summary").filter({ hasText: /^Платформа$/ }),
    });
    const trigger = platform.locator(":scope > summary");
    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(platform).toHaveAttribute("open", "");
    const firstLink = platform.getByRole("link").first();
    await page.keyboard.press("Tab");
    await expect(firstLink).toBeFocused();
    await expect(firstLink).toHaveAttribute("href", "/uk/platform/");
    await expect(firstLink).toBeInViewport();
    const box = await firstLink.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.x).toBeGreaterThanOrEqual(-1);
    expect(box!.x + box!.width).toBeLessThanOrEqual(width + 1);
    await page.keyboard.press("Escape");
    await expect(mobile ? menu : platform).not.toHaveAttribute("open");
    await expect(mobile ? mobileTrigger : trigger).toBeFocused();
  }
});

test("Ukrainian layouts fit phones, tablets and desktops", async ({ page }, testInfo) => {
  test.setTimeout(90_000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  const routes = ["/uk/", "/uk/platform/", "/uk/deployment/", "/uk/industries/telecommunication/", "/uk/blog/"];
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      await page.evaluate(async () => { await document.fonts.ready; });
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      const dimensions = await page.evaluate(() => ({
        content: document.documentElement.scrollWidth,
        viewport: document.documentElement.clientWidth,
      }));
      expect(dimensions.content, `${route} at ${width}px overflows horizontally`).toBeLessThanOrEqual(dimensions.viewport + 1);
      await expectHeaderFits(page, `${route} at ${width}px`);
      if (route === "/uk/deployment/") {
        // A long translated stage name can spill into the neighboring column
        // while remaining inside the viewport, so document width alone is not enough.
        const headings = page.locator('#delivery-path [class*="stageHeading"] h3');
        await expect(headings).toHaveCount(4);
        for (const heading of await headings.all()) {
          const size = await heading.evaluate(node => ({
            content: node.scrollWidth, available: node.clientWidth,
          }));
          expect(size.content, `${width}px: ${await heading.innerText()} exceeds its column`)
            .toBeLessThanOrEqual(size.available + 1);
        }
        for (const link of await page.locator(`main a[href="${TELEGRAM}"]`).all()) {
          const box = await link.boundingBox();
          expect(box).not.toBeNull();
          expect(box!.x).toBeGreaterThanOrEqual(-1);
          expect(box!.x + box!.width, `Deployment CTA at ${width}px`).toBeLessThanOrEqual(width + 1);
        }
      }

      const screenshotName = route === "/uk/" && [320, 1440].includes(width)
        ? `uk-home-${width}.png`
        : route === "/uk/industries/telecommunication/" && width === 390
          ? "uk-telecommunications-390.png"
          : null;
      if (screenshotName) {
        // Visit visible images so the full-page artifact includes lazy assets.
        for (const image of await page.locator("img").all()) {
          if (!(await image.isVisible())) continue;
          await image.scrollIntoViewIfNeeded();
          await expect(image).toHaveJSProperty("complete", true);
          await expect.poll(() => image.evaluate(node => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
        }
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
        const screenshotPath = testInfo.outputPath(screenshotName);
        await page.screenshot({ path: screenshotPath, fullPage: true, animations: "disabled" });
        await testInfo.attach(screenshotName, { path: screenshotPath, contentType: "image/png" });
      }
    }
  }
});
