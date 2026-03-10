import { expect, test } from "@playwright/test";

test("projects page toggles between work and side lists", async ({ page }) => {
  await page.goto("/projects");

  await expect(page.getByTestId("project-card")).toHaveCount(2);
  await expect(page.getByText("Global Commerce Platform")).toBeVisible();

  await page.getByRole("button", { name: "Side Projects" }).click();

  await expect(page.getByTestId("project-card")).toHaveCount(2);
  await expect(page.getByText("Motion UI Studio")).toBeVisible();
});
