import { expect, test, type Locator, type Page } from "@playwright/test";

const ORIGIN = "http://127.0.0.1:4173";
const TELEGRAM = "https://t.me/vitalibakhmat";

function group(page: Page, navigation: Locator, label: string) {
  return navigation.locator("details").filter({
    has: page.locator("summary").filter({ hasText: new RegExp(`^${label}$`) }),
  });
}

async function expectWithinViewport(page: Page, element: Locator) {
  await expect(element).toBeVisible();
  const box = await element.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(page.viewportSize()!.width + 1);
}

// Focused optional checks for the shared navigation. No CI or browser-install
// changes are needed; run against the same static export as landing.spec.ts.
test("Desktop dropdowns stay reachable on hover and only one group is open", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const navigation = page.getByRole("navigation", { name: "Main navigation", exact: true });
  const platform = group(page, navigation, "Platform");
  const industries = group(page, navigation, "Industries");
  const company = group(page, navigation, "Company");

  const platformTrigger = platform.locator(":scope > summary");
  await platformTrigger.hover();
  await expect(platform).toHaveAttribute("open", "");
  await platformTrigger.click();
  await expect(platform).toHaveAttribute("open", "");
  await platformTrigger.click();
  await expect(platform).not.toHaveAttribute("open");
  await page.mouse.move(5, 850);
  await platformTrigger.hover();
  await platform.getByRole("link", { name: /^Century Agents/ }).hover();
  await expect(platform).toHaveAttribute("open", "");

  await industries.locator(":scope > summary").hover();
  await expect(industries).toHaveAttribute("open", "");
  await expect(platform).not.toHaveAttribute("open");
  await company.locator(":scope > summary").hover();
  await expect(company).toHaveAttribute("open", "");
  await expect(industries).not.toHaveAttribute("open");
  await expect(navigation.locator("details[open]")).toHaveCount(1);

  await page.mouse.click(5, 850);
  await expect(navigation.locator("details[open]")).toHaveCount(0);
});

test("Keyboard focus keeps a dropdown open and Escape restores its trigger", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/ai-os/");
  const navigation = page.getByRole("navigation", { name: "Main navigation", exact: true });
  const platform = group(page, navigation, "Platform");
  const trigger = platform.locator(":scope > summary");
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(platform).toHaveAttribute("open", "");
  await page.keyboard.press("Tab");
  const firstLink = platform.getByRole("link").first();
  await expect(firstLink).toBeFocused();

  await firstLink.hover();
  await page.mouse.move(5, 800);
  // Wait beyond the hover grace period so a delayed close cannot pass unnoticed.
  await page.waitForTimeout(250);
  await expect(firstLink).toBeFocused();
  await expect(platform).toHaveAttribute("open", "");
  await page.keyboard.press("Escape");
  await expect(platform).not.toHaveAttribute("open");
  await expect(trigger).toBeFocused();
});

test("Mobile accordion switches groups, scrolls to its links and closes with Escape", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 667 });
  await page.goto("/");
  const menu = page.locator("[data-mobile-navigation]");
  const trigger = menu.locator(":scope > summary");
  await trigger.click();
  const navigation = page.getByRole("navigation", { name: "Mobile navigation", exact: true });
  await expect(navigation).toBeVisible();
  const platform = group(page, navigation, "Platform");
  const industries = group(page, navigation, "Industries");
  await platform.locator(":scope > summary").click();
  await expect(platform).toHaveAttribute("open", "");
  await industries.locator(":scope > summary").click();
  await expect(industries).toHaveAttribute("open", "");
  await expect(platform).not.toHaveAttribute("open");
  const airlines = industries.getByRole("link", { name: /^Airlines\b/ });
  await airlines.scrollIntoViewIfNeeded();
  await expect(airlines).toBeInViewport();
  await expectWithinViewport(page, airlines);
  await airlines.focus();
  await page.keyboard.press("Escape");
  await expect(menu).not.toHaveAttribute("open");
  await expect(trigger).toBeFocused();
  await expect(navigation).not.toBeVisible();
});

test("Navigation remains usable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({
    baseURL: ORIGIN,
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  try {
    const page = await context.newPage();
    await page.goto("/industries/insurance/");
    await page.locator("[data-mobile-navigation] > summary").click();
    const navigation = page.getByRole("navigation", { name: "Mobile navigation", exact: true });
    const industries = group(page, navigation, "Industries");
    await industries.locator(":scope > summary").click();
    await industries.getByRole("link", { name: /^Telecommunications\b/ }).click();
    await expect(page).toHaveURL(`${ORIGIN}/industries/telecommunication/`);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  } finally {
    await context.close();
  }
});

test("Shared header fits each page variant and menu links resolve locally", async ({ page }) => {
  for (const width of [390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/ai-os/", "/industries/insurance/"]) {
      await page.goto(route);
      const header = page.locator("[data-site-header]");
      await expectWithinViewport(page, header.getByRole("link", { name: "Century home", exact: true }));
      await expectWithinViewport(page, header.getByRole("link", { name: "Get in touch", exact: true }));
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1);
      await page.evaluate(() => window.scrollTo({ top: 500, behavior: "instant" }));
      await expect(header.getByRole("link", { name: "Century home", exact: true })).toBeInViewport();
    }
  }

  const destinations = await page.locator("[data-site-header] a[href]").evaluateAll((links) =>
    [...new Set(links.map((link) => link.getAttribute("href")!))],
  );
  for (const href of destinations) {
    if (href === TELEGRAM) continue;
    expect(href).toMatch(/^\/(?!\/)/);
    expect((await page.request.get(href)).status(), href).toBe(200);
  }
});
