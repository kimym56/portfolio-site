import { expect, test } from "@playwright/test";

test("projects page switches categories and opens an in-page detail view", async ({
  page,
}) => {
  await page.goto("/projects");

  await expect(page.getByTestId("project-card")).toHaveCount(1);
  await expect(page.getByText("Sellpath")).toBeVisible();
  await expect(page.getByTestId("projects-tab-panel")).toHaveAttribute(
    "data-once-reveal",
    "static",
  );

  await page.getByRole("button", { name: "Side Projects" }).click();

  await expect(page.getByTestId("project-card")).toHaveCount(3);
  await expect(page.getByTestId("projects-tab-panel")).toHaveAttribute(
    "data-once-reveal",
    "animated",
  );
  await expect(page.getByRole("button", { name: /mimesis/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /website/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /dsskills/i })).toBeVisible();

  await page.getByRole("button", { name: "Work Projects" }).click();

  await expect(page.getByTestId("projects-tab-panel")).toHaveAttribute(
    "data-once-reveal",
    "animated",
  );

  await page.getByRole("button", { name: "Side Projects" }).click();

  await expect(page.getByTestId("projects-tab-panel")).toHaveAttribute(
    "data-once-reveal",
    "animated",
  );

  await page.getByRole("button", { name: /mimesis/i }).click();

  await expect(page.getByRole("heading", { name: "Mimesis" })).toBeVisible();
  await expect(page.getByTestId("project-detail-panel")).toHaveAttribute(
    "data-once-reveal",
    "animated",
  );
  await expect(page.getByRole("button", { name: "Back to side projects" })).toBeVisible();
  await expect(page.getByRole("group", { name: "Project types" })).toHaveCount(0);

  await page.getByRole("button", { name: "Back to side projects" }).click();

  await expect(page.getByTestId("project-card")).toHaveCount(3);
  await expect(page.getByRole("button", { name: "Side Projects" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );

  await page.getByRole("button", { name: /mimesis/i }).click();

  await expect(page.getByTestId("project-detail-panel")).toHaveAttribute(
    "data-once-reveal",
    "static",
  );
});
