import { expect, test } from "@playwright/test";

test("desktop home prevents page scrolling", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");

  const overflowY = await page.evaluate(
    () => getComputedStyle(document.body).overflowY,
  );

  expect(overflowY).toBe("hidden");

  const scrollY = await page.evaluate(() => window.scrollY);

  expect(scrollY).toBe(0);
});

test("mobile home allows page scrolling", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const overflowY = await page.evaluate(
    () => getComputedStyle(document.body).overflowY,
  );

  expect(overflowY).not.toBe("hidden");
});
