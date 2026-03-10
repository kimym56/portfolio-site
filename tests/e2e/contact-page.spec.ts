import { expect, test } from "@playwright/test";

test("contact page renders key contact links", async ({ page }) => {
  await page.goto("/contact");

  await expect(page.getByRole("heading", { name: "Contact" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Email yongmin.kim@example.com" })).toBeVisible();
  await expect(page.getByRole("link", { name: "LinkedIn linkedin.com/in/yongminkim" })).toBeVisible();
  await expect(page.getByRole("link", { name: "GitHub github.com/yongminkim" })).toBeVisible();
  await expect(page.getByRole("link", { name: "X x.com/yongminkim" })).toBeVisible();
});
