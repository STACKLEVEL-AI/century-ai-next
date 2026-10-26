import { expect, test, type Locator, type Page } from "@playwright/test";

const TELEGRAM = "https://t.me/vitalibakhmat";

// These tests guard the public boundaries: indexing, contact destination,
// independent resources, no-JS access and keyboard/mobile navigation.
test("English page and independent SEO", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page).toHaveTitle(
    "Century | Enterprise AI for European Businesses",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://century-ai.eu/",
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    "content",
    "https://century-ai.eu/",
  );
  await expect(page.locator("link[hreflang]")).toHaveCount(0);
  const graph = JSON.parse(
    await page.locator('script[type="application/ld+json"]').innerText(),
  )["@graph"];
  expect(graph.map((node: { "@type": string }) => node["@type"])).toEqual([
    "WebSite",
    "WebPage",
  ]);
  for (const node of graph) {
    expect(node.url).toBe("https://century-ai.eu/");
    expect(node["@id"]).toMatch(/^https:\/\/century-ai\.eu\/#/);
    expect(node.inLanguage).toBe("en");
  }
  await page
    .locator("details")
    .evaluateAll((nodes) =>
      nodes.forEach((node) => node.setAttribute("open", "")),
    );
  const publicText = await page.locator("body").innerText();
  const attributes = await page
    .locator("[alt], [aria-label], [title]")
    .evaluateAll((nodes) =>
      nodes
        .flatMap((node) =>
          ["alt", "aria-label", "title"].map(
            (name) => node.getAttribute(name) || "",
          ),
        )
        .join(" "),
    );
  expect(publicText + attributes).not.toMatch(/[\u0400-\u04ff]/);
  await page.goto("/404.html");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Page not found",
  );
  const robots = await page
    .locator('meta[name="robots"]')
    .evaluateAll((nodes) =>
      nodes.map((node) => node.getAttribute("content")).join(","),
    );
  expect(robots).toContain("noindex");
  await expect(
    page.locator('link[rel="canonical"], script[type="application/ld+json"]'),
  ).toHaveCount(0);
});

test("Contact and founder links use approved destinations", async ({
  page,
}) => {
  await page.goto("/");
  for (const section of ["header", "#home", "#contact"]) {
    await expect(
      page.locator(section).locator(`a[href="${TELEGRAM}"]`),
    ).toHaveCount(1);
  }
  const links = await page.locator("a[href]").evaluateAll((nodes) =>
    nodes.map((node) => ({
      href: node.getAttribute("href")!,
      target: node.getAttribute("target"),
      rel: node.getAttribute("rel"),
    })),
  );
  for (const link of links) {
    const destination = new URL(link.href, "http://127.0.0.1:4173");
    if (destination.origin === "http://127.0.0.1:4173") continue;
    expect([
      TELEGRAM,
      "https://vadimohka.com/",
      "https://www.linkedin.com/in/ekrychev/",
    ]).toContain(link.href);
    expect(link.target).toBe("_blank");
    expect(link.rel).toContain("noopener");
    expect(link.rel).toContain("noreferrer");
  }
  const founders = page.locator("#founders");
  await expect(
    founders.getByRole("heading", { name: "Vitali Bakhmat" }),
  ).toBeVisible();
  await expect(
    founders.getByRole("heading", { name: "Vadim Vladymtsev" }),
  ).toBeVisible();
  await expect(
    founders.getByRole("link", { name: "vadimohka.com", exact: true }),
  ).toHaveAttribute("href", "https://vadimohka.com/");
  await expect(
    founders.getByRole("heading", { name: "Egor Krychev" }),
  ).toBeVisible();
  await expect(
    founders.getByRole("link", { name: "LinkedIn", exact: true }),
  ).toHaveAttribute("href", "https://www.linkedin.com/in/ekrychev/");
  await expect(founders.locator("img")).toHaveCount(3);
  await expect(page.locator("form, input, textarea, select")).toHaveCount(0);
});

test("Local resources and working anchors", async ({ page }) => {
  const external: string[] = [];
  const broken: string[] = [];
  const errors: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (
      ["http:", "https:"].includes(url.protocol) &&
      url.origin !== "http://127.0.0.1:4173"
    )
      external.push(url.href);
  });
  page.on("response", (response) => {
    if (response.status() >= 400) broken.push(response.url());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await page.waitForLoadState("networkidle");
  expect(external).toEqual([]);
  expect(broken).toEqual([]);
  expect(errors).toEqual([]);
  const anchors = await page
    .locator('a[href*="#"]')
    .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href")!));
  for (const href of anchors) {
    const id = href.slice(href.indexOf("#") + 1);
    await expect(page.locator(`[id="${id}"]`)).toHaveCount(1);
  }
});

test("Readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  for (const id of [
    "use-cases",
    "example",
    "security",
    "how-we-start",
    "founders",
    "contact",
  ]) {
    await expect(page.locator(`#${id}`)).toBeVisible();
  }
  await expect(page.locator("#use-cases article")).toHaveCount(3);
  await expect(
    page
      .locator("#contact")
      .getByRole("link", { name: "Message Vitali on Telegram" }),
  ).toBeVisible();
  const source = page.locator("#source-supplier-checklist");
  await source.locator("summary").click();
  await expect(source).toHaveAttribute("open", "");
  await expect(
    source.getByText("Section 2 — Required documents"),
  ).toBeVisible();
  await context.close();
});

async function tabTo(page: Page, locator: Locator) {
  for (let index = 0; index < 80; index++) {
    await page.keyboard.press("Tab");
    if (await locator.evaluate((node) => node === document.activeElement))
      return;
  }
  await expect(locator).toBeFocused();
}

test("Sources and FAQs work with a keyboard", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
  for (const id of ["source-supplier-checklist", "source-approval-policy"]) {
    const source = page.locator(`#${id}`);
    await tabTo(page, source.locator("summary"));
    await page.keyboard.press("Enter");
    await expect(source).toHaveAttribute("open", "");
    await expect(source.locator(".source-excerpt")).toBeVisible();
    await expect(page.locator(`#example a[href="#${id}"]`)).toHaveCount(1);
  }
  const faq = page.locator("#security details").first();
  await tabTo(page, faq.locator("summary"));
  await page.keyboard.press("Enter");
  await expect(faq).toHaveAttribute("open", "");
});

test("Mobile and reduced motion remain usable", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const viewport of [
    { width: 390, height: 844 },
    { width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth + 1,
      ),
    ).toBe(true);
    expect(
      await page
        .locator("html")
        .evaluate((node) => getComputedStyle(node).scrollSnapType),
    ).toBe("none");
    for (const selector of ["header a", "#home a", "#contact a"]) {
      const links = page.locator(selector);
      for (const link of await links.all()) {
        await expect(link).toBeVisible();
        const box = await link.boundingBox();
        expect(box).not.toBeNull();
        expect(box!.x).toBeGreaterThanOrEqual(0);
        expect(box!.x + box!.width).toBeLessThanOrEqual(viewport.width + 1);
      }
    }
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await expect(page.locator("#contact a")).toBeInViewport();
    await page.screenshot({
      path: testInfo.outputPath(`landing-${viewport.width}.png`),
      fullPage: true,
    });
  }
});
