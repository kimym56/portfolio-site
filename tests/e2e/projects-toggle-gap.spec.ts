import { expect, test } from "@playwright/test";

async function settlePage(page: Parameters<typeof test>[0]["page"]) {
  await page.waitForLoadState("networkidle");
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
}

test("projects list starts immediately below the type toggle", async ({ page }) => {
  await page.goto("/projects");
  await settlePage(page);

  const projectsToggle = page.getByRole("group", { name: "Project types" });
  const firstProjectButton = page.locator('[data-testid="project-card"] button').first();
  const [toggleBox, firstButtonBox] = await Promise.all([
    projectsToggle.boundingBox(),
    firstProjectButton.boundingBox(),
  ]);

  expect(toggleBox).not.toBeNull();
  expect(firstButtonBox).not.toBeNull();
  expect(firstButtonBox!.y - (toggleBox!.y + toggleBox!.height)).toBeLessThanOrEqual(1);
});
