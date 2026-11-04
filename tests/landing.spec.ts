import { readFile } from "node:fs/promises";
import { expect, test, type Locator, type Page } from "@playwright/test";

const ORIGIN = "http://127.0.0.1:4173";
const TELEGRAM = "https://t.me/vitalibakhmat";

async function expectLocalHeroImage(page: Page) {
  const heroImage = await page.locator("#home img").evaluate((node) => {
    const image = node as HTMLImageElement;
    return {
      complete: image.complete,
      width: image.naturalWidth,
      height: image.naturalHeight,
      declaredWidth: Number(image.getAttribute("width")),
      declaredHeight: Number(image.getAttribute("height")),
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
test("English pages have independent SEO and a non-indexable 404", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page).toHaveTitle("Century | Enterprise AI for European Businesses");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://century-ai.eu/");
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", "https://century-ai.eu/");
  await expect(page.locator("link[hreflang]")).toHaveCount(0);
  const graph = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText())["@graph"];
  expect(graph.map((node: { "@type": string }) => node["@type"])).toEqual(["WebSite", "WebPage"]);
  for (const node of graph) {
    expect(node.url).toBe("https://century-ai.eu/");
    expect(node["@id"]).toMatch(/^https:\/\/century-ai\.eu\/#/);
    expect(node.inLanguage).toBe("en");
  }
  expect(await page.locator("body").innerText()).not.toMatch(/[\u0400-\u04ff]/);

  await page.goto("/ai-os/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page).toHaveTitle("Century AI OS | Century");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://century-ai.eu/ai-os/");
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", "https://century-ai.eu/ai-os/");

  await page.goto("/404.html");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Page not found");
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
  const founders = page.locator("#founders");
  for (const name of ["Vitali Bakhmat", "Vadim Vladymtsev", "Egor Krychev"]) {
    await expect(founders.getByRole("heading", { name, exact: true })).toBeVisible();
  }
  await expect(founders.getByRole("link", { name: "vadimohka.com", exact: true })).toHaveAttribute("href", "https://vadimohka.com/");
  await expect(founders.getByRole("link", { name: "LinkedIn", exact: true })).toHaveAttribute("href", "https://www.linkedin.com/in/ekrychev/");
  await expect(founders.locator("img")).toHaveCount(3);

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
    for (const id of ["use-cases", "example", "how-we-start", "founders", "contact"]) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
    await expect(page.locator(".home-industry-fallback a")).toHaveCount(7);
    const workflow = page.locator("#use-cases details").first();
    await workflow.locator("summary").click();
    await expect(workflow.locator(".card-measure")).toBeVisible();

    const menu = page.locator(".mobile-navigation");
    await menu.locator(":scope > summary").click();
    const navigation = page.getByRole("navigation", { name: "Mobile navigation" });
    await expect(navigation).toBeVisible();
    await navigation.getByText("Platform", { exact: true }).click();
    await navigation.getByRole("link", { name: /^Century Agents/ }).click();
    await expect(page).toHaveURL(`${ORIGIN}/agents/`);
    const source = page.locator("#source-supplier-checklist");
    await source.locator("summary").click();
    await expect(source.getByText("Section 2 — Required documents")).toBeVisible();
    await expect(page.locator("#contact").getByRole("link", { name: "Message Vitali on Telegram", exact: true })).toBeVisible();

    await page.goto("/ai-os/");
    await expect(page.locator(".infra-fallback").getByRole("heading", { name: "Integrations", exact: true })).toBeVisible();
    await page.goto("/deployment/");
    await expect(page.locator(".phase-fallback").getByRole("heading", { name: "Build with your team", exact: true })).toBeVisible();
    await page.goto("/ai-gateway/");
    await expect(page.locator(".gateway-fallback table")).toBeVisible();
    await expect(page.getByRole("link", { name: "Export CSV", exact: true })).toHaveAttribute("download", "century-sample-usage-30d.csv");
  } finally {
    await context.close();
  }
});

test("Menus, source details and security FAQs support keyboard navigation", async ({ page }) => {
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

  for (const id of ["source-supplier-checklist", "source-approval-policy"]) {
    const source = page.locator(`#${id}`);
    await tabTo(page, source.locator("summary"));
    await page.keyboard.press("Enter");
    await expect(source.locator(".source-excerpt")).toBeVisible();
    await expect(page.locator(`#example a[href="#${id}"]`)).toHaveCount(1);
  }
  await page.goto("/security/");
  const faq = page.locator("#security details").first();
  await tabTo(page, faq.locator("summary"));
  await page.keyboard.press("Enter");
  await expect(faq).toHaveAttribute("open", "");
});

test("Product explorers keep keyboard focus and displayed panels in sync", async ({ page }) => {
  await page.goto("/ai-os/");
  const layers = page.getByRole("tablist", { name: "Infrastructure layers" });
  await layers.getByRole("tab", { name: "Security & governance", exact: true }).focus();
  await page.keyboard.press("ArrowDown");
  await expect(layers.getByRole("tab", { name: "Observability", exact: true })).toBeFocused();
  await expect(page.getByRole("tabpanel", { name: "Observability", exact: true })).toBeVisible();
  await page.keyboard.press("End");
  await expect(layers.getByRole("tab", { name: "Integrations", exact: true })).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("Home");
  await expect(layers.getByRole("tab", { name: "Security & governance", exact: true })).toBeFocused();

  await page.goto("/deployment/");
  const phases = page.getByRole("tablist", { name: "Deployment phases" });
  await phases.getByRole("tab", { name: /Discover/ }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(phases.getByRole("tab", { name: /Implement/ })).toBeFocused();
  await expect(page.getByRole("tabpanel", { name: /Implement/ }).getByRole("heading", { name: "Build with your team" })).toBeVisible();
  await page.keyboard.press("End");
  await expect(phases.getByRole("tab", { name: /Operate/ })).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("Home");
  await expect(phases.getByRole("tab", { name: /Discover/ })).toBeFocused();
});

test("Gateway controls update sample data and export the selected period", async ({ page }) => {
  await page.goto("/ai-gateway/");
  const demo = page.locator(".gateway-demo");
  await expect(demo.locator(".gateway-live-status")).toContainText("30 days");
  await demo.getByRole("button", { name: "7d", exact: true }).click();
  await expect(demo.locator(".gateway-metrics strong").nth(0)).toHaveText("€326.40");
  await expect(demo.locator(".gateway-metrics strong").nth(1)).toHaveText("18,420");
  await expect(demo.getByRole("img")).toHaveAttribute("aria-label", /€326\.40 over 7 days/);
  await demo.getByRole("button", { name: "90d", exact: true }).click();
  await expect(demo.locator(".gateway-metrics strong").nth(0)).toHaveText("€4,250.80");
  await expect(demo.locator(".gateway-metrics strong").nth(1)).toHaveText("246,380");

  const csvLink = demo.getByRole("link", { name: "Export CSV", exact: true });
  const href = await csvLink.getAttribute("href");
  expect(href).toMatch(/^data:text\/csv;charset=utf-8,/);
  const csv = decodeURIComponent(href!.slice(href!.indexOf(",") + 1));
  const [header, ...rows] = csv.split("\r\n");
  expect(header).toBe("sample_data,period,team,requests,estimated_cost_eur");
  expect(rows).toHaveLength(3);
  const values = rows.map(row => row.split(","));
  expect(values.every(row => row[0] === "true" && row[1] === "90d")).toBe(true);
  expect(values.reduce((total, row) => total + Number(row[3]), 0)).toBe(246380);
  expect(values.reduce((total, row) => total + Number(row[4]), 0)).toBeCloseTo(4250.8, 2);
  const [download] = await Promise.all([page.waitForEvent("download"), csvLink.click()]);
  expect(download.suggestedFilename()).toBe("century-sample-usage-90d.csv");
  const file = await download.path();
  expect(file).not.toBeNull();
  expect(await readFile(file!, "utf8")).toBe(csv);

  await demo.getByRole("button", { name: "Team usage", exact: true }).click();
  await expect(demo.locator(".gateway-table tfoot")).toContainText("246,380");
  await expect(demo.locator(".gateway-table tfoot")).toContainText("€4,250.80");
  await demo.getByRole("button", { name: "Control examples", exact: true }).click();
  await expect(demo.getByRole("heading", { name: "Questions to resolve before rollout" })).toBeVisible();
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
    for (const selector of ["header .brand", "header .btn-header", "#home a", "#contact a"]) {
      for (const link of await page.locator(selector).all()) {
        await expect(link).toBeVisible();
        const box = await link.boundingBox();
        expect(box).not.toBeNull();
        expect(box!.x).toBeGreaterThanOrEqual(0);
        expect(box!.x + box!.width).toBeLessThanOrEqual(viewport.width + 1);
      }
    }
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await expect(page.locator("#contact a")).toBeInViewport();
    await page.screenshot({ path: testInfo.outputPath(`landing-${viewport.width}.png`), fullPage: true });
  }
  await page.setViewportSize({ width: 320, height: 740 });
  for (const route of ["/ai-os/", "/ai-gateway/"]) {
    await page.goto(route);
    await expectNoHorizontalOverflow(page);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
});
