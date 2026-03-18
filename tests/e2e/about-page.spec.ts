import { expect, test } from "@playwright/test";

test("about page renders heading and summary content", async ({ page }) => {
  await page.goto("/about");

  await expect(page.getByRole("heading", { name: "About Me" })).toBeVisible();
  await expect(page.getByText("A developer interested in UX/HCI, thoughtful interfaces, and design engineering.")).toBeVisible();
  await expect(
    page.getByText(
      "I'm a developer with a strong interest in UX and HCI, and I care about building products that are both useful and intuitive.",
    ),
  ).toBeVisible();
});
