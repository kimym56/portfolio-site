import { expect, test } from "@playwright/test";

test("about page renders heading and summary content", async ({ page }) => {
  await page.goto("/about");

  await expect(page.getByRole("heading", { name: "About Me" })).toBeVisible();
  await expect(page.getByText("A product-minded engineer focused on quality, speed, and long-term clarity.")).toBeVisible();
});
