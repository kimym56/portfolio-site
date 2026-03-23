import { expect, test } from "@playwright/test";

test("about page renders heading and summary content", async ({ page }) => {
  await page.goto("/about");

  await expect(page.getByRole("heading", { name: "About Me" })).toBeVisible();
  await expect(page.getByText("YongMin Kim, based in Seoul, South Korea.")).toBeVisible();
  await expect(
    page.getByText(
      "I’m a developer interested in UX and HCI, and I care about building products that are both useful and intuitive.",
    ),
  ).toBeVisible();
});

test("about first in-site visit uses animated markup once", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "About Me" }).click();

  await expect(page.locator("[data-page-reveal='animated']")).toHaveCount(1);

  await page.getByRole("link", { name: "YMKim" }).click();
  await page.getByRole("link", { name: "About Me" }).click();

  await expect(page.locator("[data-page-reveal='animated']")).toHaveCount(0);
});
