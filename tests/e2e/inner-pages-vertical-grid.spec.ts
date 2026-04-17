import { expect, test } from "@playwright/test";

function distanceToGrid(value: number, step: number) {
  const mod = ((value % step) + step) % step;
  return Math.min(mod, step - mod);
}

async function measure(page: Parameters<typeof test>[0]["page"], selector: string) {
  return page.locator(selector).first().evaluate((node) => {
    const rect = node.getBoundingClientRect();
    return {
      top: rect.top,
      height: rect.height,
      bottom: rect.bottom,
    };
  });
}

function expectOnGrid(value: number, step: number, label: string) {
  expect(
    distanceToGrid(value, step),
    `${label} should land on the ${step}px rhythm`,
  ).toBeLessThanOrEqual(0.75);
}

function expectNear(value: number, expected: number, tolerance: number, label: string) {
  expect(Math.abs(value - expected), `${label} should be within ${tolerance}px of ${expected}px`)
    .toBeLessThanOrEqual(tolerance);
}

async function settlePage(page: Parameters<typeof test>[0]["page"]) {
  await page.waitForLoadState("networkidle");
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
}

test.describe("inner pages vertical grid", () => {
  test.use({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });

  test("about, projects, and contact snap key elements to the overlay rhythm", async ({
    page,
  }) => {
    await page.goto("/about");
    await settlePage(page);

    const step = await page.evaluate(
      () => parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.5,
    );

    const aboutHeader = await measure(page, "header");
    const aboutCard = await measure(page, ".about-card");
    const aboutTitle = await measure(page, ".about-card > .page-title");
    const aboutSubtitle = await measure(page, ".about-card > .page-subtitle");
    const aboutChip = await measure(page, ".about-chip");
    const aboutFooter = await measure(page, "footer");
    const viewportHeight = page.viewportSize()?.height ?? 0;

    expectOnGrid(aboutHeader.height, step, "about header height");
    expectOnGrid(aboutCard.top, step, "about card top");
    expectOnGrid(aboutTitle.top, step, "about title top");
    expectOnGrid(aboutTitle.height, step, "about title height");
    expectOnGrid(aboutSubtitle.top, step, "about subtitle top");
    expectOnGrid(aboutSubtitle.height, step, "about subtitle height");
    expectOnGrid(aboutChip.height, step, "about chip height");
    expectOnGrid(aboutFooter.height, step, "about footer height");
    expectNear(aboutFooter.bottom, viewportHeight, 1, "about footer bottom");

    await page.goto("/projects");
    await settlePage(page);

    const projectsHeader = await measure(page, "header");
    const projectsCard = await measure(page, ".projects-card");
    const projectsTitle = await measure(page, ".projects-card > .page-title");
    const projectToggleGroup = await measure(page, '[aria-label="Project types"]');
    const projectCardButton = await measure(page, '[data-testid="project-card"] button');

    expectOnGrid(projectsHeader.height, step, "projects header height");
    expectOnGrid(projectsCard.top, step, "projects card top");
    expectOnGrid(projectsTitle.height, step, "projects title height");
    expectOnGrid(projectToggleGroup.height, step, "project toggle group height");
    expectOnGrid(projectCardButton.top, step, "project card button top");
    expectOnGrid(projectCardButton.height, step, "project card button height");

    await page.getByTestId("project-card").first().click();
    await page.getByRole("button", { name: /back to/i }).click();
    await page.getByTestId("project-card").first().click();
    await page.locator('[data-testid="project-detail-header-title-row"]').waitFor();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(100);

    const detailHeaderRow = await measure(
      page,
      '[data-testid="project-detail-header-title-row"]',
    );
    const detailRole = await measure(page, '[data-testid="project-detail-header-role"]');
    const detailRow = await measure(page, '[data-testid="project-detail-row"]');

    expectOnGrid(detailHeaderRow.height, step, "project detail header row height");
    expectOnGrid(detailRole.height, step, "project detail role height");
    expectOnGrid(detailRow.height, step, "project detail row height");

    await page.goto("/contact");
    await settlePage(page);

    const contactHeader = await measure(page, "header");
    const contactCard = await measure(page, ".contact-card");
    const contactTitle = await measure(page, ".contact-card > .page-title");
    const contactLink = await measure(page, ".contact-link");
    const contactFooter = await measure(page, "footer");

    expectOnGrid(contactHeader.height, step, "contact header height");
    expectOnGrid(contactCard.top, step, "contact card top");
    expectOnGrid(contactTitle.height, step, "contact title height");
    expectOnGrid(contactLink.top, step, "contact link top");
    expectOnGrid(contactLink.height, step, "contact link height");
    expectOnGrid(contactFooter.height, step, "contact footer height");
    expectNear(contactFooter.bottom, viewportHeight, 1, "contact footer bottom");
  });
});
