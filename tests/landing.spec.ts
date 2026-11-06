import { expect, test, type Locator, type Page } from "@playwright/test";
import { SITE_ROUTES } from "../src/lib/routes";

const ORIGIN = "http://127.0.0.1:4173";
const TELEGRAM = "https://t.me/vitalibakhmat";

async function expectLocalHeroImage(page: Page) {
  const heroImage = await page.locator("#home img").evaluate((node) => {
    const image = node as HTMLImageElement;
    const activeSource = Array.from(image.closest("picture")?.querySelectorAll("source") ?? [])
      .find((source) => (!source.media || window.matchMedia(source.media).matches)
        && source.srcset.split(",").some((candidate) =>
          new URL(candidate.trim().split(/\s+/)[0], document.baseURI).href === image.currentSrc,
        ));
    // A selected portrait source can override the landscape fallback's ratio.
    const dimensions = activeSource?.hasAttribute("width") && activeSource.hasAttribute("height")
      ? activeSource
      : image;
    return {
      complete: image.complete,
      width: image.naturalWidth,
      height: image.naturalHeight,
      declaredWidth: Number(dimensions.getAttribute("width")),
      declaredHeight: Number(dimensions.getAttribute("height")),
      source: image.currentSrc,
    };
  });
  expect(heroImage.complete).toBe(true);
  expect(heroImage.width).toBeGreaterThan(0);
  expect(heroImage.height).toBeGreaterThan(0);
  expect(heroImage.declaredWidth).toBeGreaterThan(0);
  expect(heroImage.declaredHeight).toBeGreaterThan(0);
  expect(heroImage.declaredWidth / heroImage.declaredHeight).toBeCloseTo(
    heroImage.width / heroImage.height,
    2,
  );
  expect(new URL(heroImage.source).origin).toBe(ORIGIN);
}

// Text checks cover labels and captions only. Screenshot pixels need a separate
// visual review; absence of Cyrillic in the DOM is not an image-language audit.
async function expectLocalAppScreenshots(page: Page) {
  const captures = page.locator("figure.app-capture:visible");
  expect(await captures.count()).toBeGreaterThan(0);
  for (const capture of await captures.all()) {
    const image = capture.locator("img");
    await expect(image).toHaveCount(1);
    await image.scrollIntoViewIfNeeded();
    await expect(image).toBeVisible();
    await expect(image).toHaveJSProperty("complete", true);
    await expect.poll(() => image.evaluate((node) => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    const details = await image.evaluate((node) => {
      const img = node as HTMLImageElement;
      return {
        complete: img.complete,
        width: img.naturalWidth,
        height: img.naturalHeight,
        declaredWidth: Number(img.getAttribute("width")),
        declaredHeight: Number(img.getAttribute("height")),
        src: img.getAttribute("src"),
        currentSrc: img.currentSrc,
        alt: img.alt,
      };
    });
    expect(details.complete).toBe(true);
    expect(details.height).toBeGreaterThan(0);
    expect(details.declaredWidth).toBeGreaterThan(0);
    expect(details.declaredHeight).toBeGreaterThan(0);
    expect(details.declaredWidth / details.declaredHeight).toBeCloseTo(details.width / details.height, 2);
    expect(details.src).toMatch(/^\/media\/app\/.+\.webp$/);
    expect(new URL(details.currentSrc).origin).toBe(ORIGIN);
    expect(new URL(details.currentSrc).pathname).toBe(details.src);
    expect(details.alt.trim()).not.toBe("");
    expect(details.alt).not.toMatch(/[\u0400-\u04ff]/);
    expect(await capture.innerText()).not.toMatch(/[\u0400-\u04ff]/);
    const openImage = capture.locator(".app-capture-open");
    await expect(openImage).toHaveCount(1);
    await expect(openImage).toHaveAttribute("href", details.src!);
    await expect(openImage).toHaveAttribute("aria-label", /^Open .+ screenshot$/);
    await expect(openImage).toHaveAttribute("target", "_blank");
    await expect(openImage).toHaveAttribute("rel", /\bnoopener\b/);
  }
}

async function tabTo(page: Page, locator: Locator) {
  for (let index = 0; index < 80; index++) {
    await page.keyboard.press("Tab");
    if (await locator.evaluate((node) => node === document.activeElement)) return;
  }
  await expect(locator).toBeFocused();
}

async function expectNoHorizontalOverflow(page: Page) {
  expect(await page.evaluate(() =>
    document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
  )).toBe(true);
}

// Optional local regression checks after a production export. Deployment CI does
// not invoke Playwright. Keep these focused on navigation and public behavior.
test("English pages have reciprocal SEO and a non-indexable trilingual 404", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page).toHaveTitle("Century | Innovation Management for Enterprise AI");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://century-ai.eu/");
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", "https://century-ai.eu/");
  await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(4);
  for (const [language, prefix] of [["en", ""], ["de", "/de"], ["pl", "/pl"], ["x-default", ""]]) {
    await expect(page.locator(`link[rel="alternate"][hreflang="${language}"]`)).toHaveAttribute("href", `https://century-ai.eu${prefix}/`);
  }
  const graph = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText())["@graph"];
  expect(graph.map((node: { "@type": string }) => node["@type"])).toEqual(["WebSite", "WebPage"]);
  for (const node of graph) {
    expect(node.url).toBe("https://century-ai.eu/");
    expect(node["@id"]).toMatch(/^https:\/\/century-ai\.eu\/#/);
    expect(node.inLanguage).toEqual(node["@type"] === "WebSite" ? ["en", "de", "pl"] : "en");
  }
  // This checks rendered text, not text embedded in screenshot pixels.
  expect(await page.locator("body").innerText()).not.toMatch(/[\u0400-\u04ff]/);

  await page.goto("/platform/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page).toHaveTitle("Century AI Platform | Century");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://century-ai.eu/platform/");
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", "https://century-ai.eu/platform/");

  await page.goto("/404.html");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Page not found");
  for (const [language, heading, home] of [
    ["en", "Page not found", "/"],
    ["de", "Seite nicht gefunden", "/de/"],
    ["pl", "Nie znaleziono strony", "/pl/"],
  ]) {
    const section = page.locator(`section[lang="${language}"]`);
    await expect(section.getByRole("heading", { name: heading, exact: true })).toBeVisible();
    await expect(section.locator(`a[hreflang="${language}"]`)).toHaveAttribute("href", home);
  }
  const robots = await page.locator('meta[name="robots"]').evaluateAll((nodes) =>
    nodes.map((node) => node.getAttribute("content")).join(","),
  );
  expect(robots).toContain("noindex");
  await expect(page.locator('link[rel="canonical"], script[type="application/ld+json"]')).toHaveCount(0);
});

test("Contact, privacy and founder links use the approved destinations", async ({ page }) => {
  await page.goto("/");
  for (const section of ["header", "#home", "#contact"]) {
    await expect(page.locator(section).locator(`a[href="${TELEGRAM}"]`)).toHaveCount(1);
  }
  const links = await page.locator("a[href]").evaluateAll((nodes) => nodes.map((node) => ({
    href: node.getAttribute("href")!,
    target: node.getAttribute("target"),
    rel: node.getAttribute("rel"),
  })));
  for (const link of links) {
    const destination = new URL(link.href, ORIGIN);
    if (destination.origin === ORIGIN) continue;
    expect([TELEGRAM, "https://vadimohka.com/", "https://www.linkedin.com/in/ekrychev/"]).toContain(link.href);
    expect(link.target).toBe("_blank");
    expect(link.rel).toContain("noopener");
    expect(link.rel).toContain("noreferrer");
  }
  const founderNames = ["Vitali Bakhmat", "Vadim Vladymtsev", "Egor Krychev"];
  const teamPreview = page.locator("#team").getByRole("list", { name: "Century founders" });
  await expect(teamPreview.locator("img")).toHaveCount(3);
  for (const name of founderNames) {
    await expect(teamPreview.getByText(name, { exact: false })).toBeVisible();
  }
  await page.locator("#team").getByRole("link", { name: /About Century/ }).click();
  await expect(page).toHaveURL(`${ORIGIN}/about-us/`);
  const founders = page.locator("#founders");
  for (const name of founderNames) {
    await expect(founders.getByRole("heading", { name, exact: true })).toBeVisible();
  }
  await expect(founders.getByRole("link", { name: "vadimohka.com", exact: true })).toHaveAttribute("href", "https://vadimohka.com/");
  await expect(founders.getByRole("link", { name: "LinkedIn", exact: true })).toHaveAttribute("href", "https://www.linkedin.com/in/ekrychev/");
  await expect(founders.locator("img")).toHaveCount(3);
  for (const link of await founders.getByRole("link").all()) {
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /\bnoopener\b/);
    await expect(link).toHaveAttribute("rel", /\bnoreferrer\b/);
  }

  await page.getByRole("navigation", { name: "Footer navigation" }).getByRole("link", { name: "Contact", exact: true }).click();
  await expect(page).toHaveURL(`${ORIGIN}/contact/`);
  await expect(page).toHaveTitle("Contact | Century");
  const contact = page.locator("main").getByRole("link", { name: "Message Vitali on Telegram", exact: true });
  await expect(contact).toBeVisible();
  await expect(contact).toHaveAttribute("href", TELEGRAM);
  await expect(contact).toHaveAttribute("target", "_blank");
  await expect(contact).toHaveAttribute("rel", "noopener noreferrer");
  await expect(contact).toHaveAttribute("referrerpolicy", "no-referrer");
  await expect(page.locator("form, input, textarea, select")).toHaveCount(0);
  await page.getByRole("link", { name: "Privacy information", exact: true }).click();
  await expect(page).toHaveURL(`${ORIGIN}/privacy/`);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Privacy starts");
  await expect(page.getByRole("navigation", { name: "Privacy information sections" })).toBeVisible();
});

test("Representative pages use local resources and resolve their own anchors", async ({ page }) => {
  const external: string[] = [];
  const broken: string[] = [];
  const errors: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (["http:", "https:"].includes(url.protocol) && url.origin !== ORIGIN) external.push(url.href);
  });
  page.on("response", (response) => { if (response.status() >= 400) broken.push(response.url()); });
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of ["/", "/ai-gateway/", "/contact/"]) {
    await page.goto(route);
    await page.locator("footer").scrollIntoViewIfNeeded();
    await page.waitForLoadState("networkidle");
    if (route === "/") await expectLocalHeroImage(page);
    const anchors = await page.locator('a[href*="#"]').evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href")!));
    for (const href of anchors) {
      const target = new URL(href, page.url());
      const current = new URL(page.url());
      if (target.origin !== current.origin || target.pathname !== current.pathname || !target.hash) continue;
      expect(await page.evaluate((id) => document.getElementById(id) !== null, decodeURIComponent(target.hash.slice(1)))).toBe(true);
    }
  }
  expect(external).toEqual([]);
  expect(broken).toEqual([]);
  expect(errors).toEqual([]);
});

test("Mobile navigation and essential content work without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL: ORIGIN, viewport: { width: 390, height: 844 } });
  try {
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    for (const id of ["use-cases", "platform", "how-we-start", "industries", "team", "contact"]) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
    await expect(page.locator(".home-industry-fallback a")).toHaveCount(7);
    await expectLocalAppScreenshots(page);
    const useCases = page.locator("#use-cases").getByRole("list", { name: "AI use cases" }).getByRole("link");
    const useCaseRoutes = ["/agents/", "/agents/", "/systems/", "/platform/", "/deployment/"];
    await expect(useCases).toHaveCount(5);
    for (const [index, route] of useCaseRoutes.entries()) {
      await expect(useCases.nth(index)).toBeVisible();
      await expect(useCases.nth(index)).toHaveAttribute("href", route);
    }

    const menu = page.locator("[data-mobile-navigation]");
    await menu.locator(":scope > summary").click();
    const navigation = page.getByRole("navigation", { name: "Mobile navigation" });
    await expect(navigation).toBeVisible();
    await navigation.getByText("Platform", { exact: true }).click();
    await navigation.getByRole("link", { name: /^Century Agents/ }).click();
    await expect(page).toHaveURL(`${ORIGIN}/agents/`);
    await expectLocalAppScreenshots(page);
    await expect(page.locator("footer").getByRole("link", { name: "Get in touch", exact: true })).toBeVisible();

    await page.goto("/platform/");
    await expect(page.getByRole("heading", { name: "Integrations", exact: true })).toBeVisible();
    await page.goto("/deployment/");
    for (const name of ["Define what the workflow must do", "Measure the result on real work", "Train the people who will keep it working"]) {
      await expect(page.getByRole("heading", { name, exact: true })).toBeVisible();
    }
    await page.goto("/ai-gateway/");
    await expectLocalAppScreenshots(page);
  } finally {
    await context.close();
  }
});

test("Menus, screenshot links and security FAQs support keyboard navigation", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();

  await page.goto("/");
  const platform = page.getByRole("navigation", { name: "Main navigation", exact: true }).locator("details").filter({ has: page.locator("summary", { hasText: "Platform" }) });
  const toggle = platform.locator("summary");
  await tabTo(page, toggle);
  await page.keyboard.press("Enter");
  await expect(platform).toHaveAttribute("open", "");
  const agents = platform.getByRole("link", { name: /^Century Agents/ });
  await tabTo(page, agents);
  await page.keyboard.press("Escape");
  await expect(platform).not.toHaveAttribute("open");
  await expect(toggle).toBeFocused();
  await page.keyboard.press("Enter");
  await tabTo(page, agents);
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(`${ORIGIN}/agents/`);

  const screenshotLink = page.locator(".app-capture-open").first();
  await tabTo(page, screenshotLink);
  await expect(screenshotLink).toBeFocused();
  const screenshotUrl = new URL((await screenshotLink.getAttribute("href"))!, ORIGIN).href;
  const [openedImage] = await Promise.all([
    page.waitForEvent("popup"),
    page.keyboard.press("Enter"),
  ]);
  try {
    await expect(openedImage).toHaveURL(screenshotUrl);
    await expect(openedImage.locator("img")).toBeVisible();
  } finally {
    await openedImage.close();
  }
  await page.goto("/security/");
  const faq = page.locator("#security details").first();
  await tabTo(page, faq.locator("summary"));
  await page.keyboard.press("Enter");
  await expect(faq).toHaveAttribute("open", "");
});

test("Product explorers keep keyboard focus and displayed panels in sync", async ({ page }) => {
  await page.goto("/platform/");
  const layers = page.getByRole("tablist", { name: "Explore AI Platform infrastructure" });
  await layers.getByRole("tab", { name: "Security & governance", exact: true }).focus();
  await page.keyboard.press("ArrowDown");
  await expect(layers.getByRole("tab", { name: "Quality & activity", exact: true })).toBeFocused();
  await expect(page.getByRole("tabpanel", { name: "Quality & activity", exact: true })).toBeVisible();
  await page.keyboard.press("End");
  await expect(layers.getByRole("tab", { name: "Security & governance", exact: true })).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("Home");
  await expect(layers.getByRole("tab", { name: "Quality & activity", exact: true })).toBeFocused();

});

test("Deployment phases and installation details support keyboard navigation", async ({ page }) => {
  await page.goto("/deployment/");
  const phases = page.getByRole("tablist", { name: "Deployment phases" });
  await phases.getByRole("tab", { name: "Prepare", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(phases.getByRole("tab", { name: "Build & validate", exact: true })).toBeFocused();
  await expect(page.getByRole("tabpanel", { name: "Build & validate", exact: true })).toBeVisible();
  await page.keyboard.press("End");
  await expect(phases.getByRole("tab", { name: "Operate & improve", exact: true })).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("Home");
  await expect(phases.getByRole("tab", { name: "Prepare", exact: true })).toBeFocused();
  await expect(page.getByRole("tabpanel", { name: "Prepare", exact: true })).toBeVisible();
  const installation = page.locator("#deployment-options details");
  await installation.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(installation).toHaveAttribute("open", "");
  await expect(installation.getByText("Identity & data", { exact: true })).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(installation).not.toHaveAttribute("open");
});

test("Product pages show real local screenshots instead of retired interface mocks", async ({ page }) => {
  for (const route of ["/", "/platform/", "/agents/", "/systems/", "/ai-gateway/"]) {
    await page.goto(route);
    await expectLocalAppScreenshots(page);
    await expect(page.locator(
      ".prod-constellation, .prod-agent-visual, .prod-systems-visual, .prod-workspace, .gateway-demo, .example-board",
    )).toHaveCount(0);
  }
});

test("Mobile layouts and reduced motion remain usable", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const viewport of [
    { width: 320, height: 740 },
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await expectLocalHeroImage(page);
    await expectNoHorizontalOverflow(page);
    expect(await page.locator("html").evaluate((node) => getComputedStyle(node).scrollSnapType)).toBe("none");
    const contactCta = page.locator(`#contact a[href="${TELEGRAM}"]`);
    for (const links of [
      page.locator("[data-site-header]").getByRole("link", { name: "Century home", exact: true }),
      page.locator("[data-site-header]").getByRole("link", { name: "Get in touch", exact: true }),
      page.locator("#home a"),
      contactCta,
      page.locator(".app-capture-open"),
    ]) {
      for (const link of await links.all()) {
        await expect(link).toBeVisible();
        const box = await link.boundingBox();
        expect(box).not.toBeNull();
        expect(box!.x).toBeGreaterThanOrEqual(0);
        expect(box!.x + box!.width).toBeLessThanOrEqual(viewport.width + 1);
      }
    }
    await contactCta.scrollIntoViewIfNeeded();
    await expect(contactCta).toBeInViewport();
    await page.screenshot({ path: testInfo.outputPath(`landing-${viewport.width}.png`), fullPage: true });
  }
  await page.setViewportSize({ width: 320, height: 740 });
  for (const route of ["/platform/", "/ai-gateway/"]) {
    await page.goto(route);
    await expectNoHorizontalOverflow(page);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
});

for (const width of [360, 768, 1440]) {
  test(`All internal routes remain readable at ${width}px`, async ({ page }) => {
    test.setTimeout(90_000);
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    for (const route of SITE_ROUTES.filter(route => route !== "/")) {
      const response = await page.goto(route);
      expect(response?.status(), route).toBe(200);
      const heading = page.getByRole("heading", { level: 1 });
      await expect(heading).toHaveCount(1);
      await expect(heading).toBeVisible();
      const box = await heading.boundingBox();
      expect(box?.x, route).toBeGreaterThanOrEqual(0);
      expect((box?.x ?? 0) + (box?.width ?? 0), route).toBeLessThanOrEqual(width + 1);
      await expectNoHorizontalOverflow(page);
      await expect(page.locator(".footer-wordmark")).toHaveCount(0);
      await expect(page.getByRole("navigation", { name: "Footer navigation" })).toBeVisible();
    }
    expect(errors).toEqual([]);
  });
}

test("Guide categories filter the library and keep articles reachable", async ({ page }) => {
  await page.goto("/blog/");
  const library = page.locator(".co-library");
  const filters = library.getByRole("group", { name: "Filter guides by category" });
  await expect(library.getByRole("article")).toHaveCount(4);
  await filters.getByRole("button", { name: "Knowledge", exact: true }).click();
  await expect(filters.getByRole("button", { name: "Knowledge", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(library.getByRole("article")).toHaveCount(1);
  await expect(library.getByRole("status")).toHaveText("1 guide in knowledge");
  await library.getByRole("article").getByRole("link").click();
  await expect(page).toHaveURL(`${ORIGIN}/blog/answers-need-sources/`);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.goto("/blog/");
  await filters.getByRole("button", { name: "Deployment", exact: true }).click();
  await expect(library.getByRole("article")).toHaveCount(1);
  await filters.getByRole("button", { name: "All guides", exact: true }).click();
  await expect(library.getByRole("article")).toHaveCount(4);
});

