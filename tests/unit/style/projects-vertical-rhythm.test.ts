import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

function getRuleBody(cssContent: string, selector: string) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = cssContent.match(new RegExp(`${escapedSelector}\\s*\\{([^}]*)\\}`));

  expect(match).not.toBeNull();

  return match?.[1] ?? "";
}

describe("projects vertical rhythm", () => {
  it("normalizes the filter and list spacing to the approved rem scale", () => {
    const filterPath = path.join(
      process.cwd(),
      "components",
      "project-filter.module.css",
    );
    const gridPath = path.join(
      process.cwd(),
      "components",
      "project-grid.module.css",
    );
    const filterCss = fs.readFileSync(filterPath, "utf8");
    const gridCss = fs.readFileSync(gridPath, "utf8");
    const sectionRuleBody = getRuleBody(filterCss, ".section");
    const detailSectionRuleBody = getRuleBody(filterCss, '.section[data-view="detail"]');
    const togglesRuleBody = getRuleBody(filterCss, ".toggles");
    const toggleRuleBody = getRuleBody(filterCss, ".toggle");
    const cardButtonRuleBody = getRuleBody(gridCss, ".cardButton");
    const contentRuleBody = getRuleBody(gridCss, ".content");
    const headingRuleBody = getRuleBody(gridCss, ".heading");
    const roleRuleBody = getRuleBody(gridCss, ".role");
    const titleRuleBody = getRuleBody(gridCss, ".title");
    const stackRuleBody = getRuleBody(gridCss, ".stack");
    const actionRuleBody = getRuleBody(gridCss, ".action");

    expect(sectionRuleBody).toMatch(/margin-top:\s*1\.5rem;/);
    expect(detailSectionRuleBody).toMatch(/margin-top:\s*0;/);
    expect(togglesRuleBody).toMatch(/--toggle-gap:\s*1rem;/);
    expect(togglesRuleBody).toMatch(/margin-bottom:\s*0;/);
    expect(togglesRuleBody).toMatch(/min-height:\s*3rem;/);
    expect(toggleRuleBody).toMatch(/min-height:\s*3rem;/);

    expect(cardButtonRuleBody).toMatch(/padding:\s*1\.5rem 0;/);
    expect(contentRuleBody).toMatch(/row-gap:\s*1\.5rem;/);
    expect(headingRuleBody).toMatch(/gap:\s*0;/);
    expect(roleRuleBody).toMatch(/min-height:\s*3rem;/);
    expect(titleRuleBody).toMatch(/font-size:\s*2\.25rem;/);
    expect(titleRuleBody).toMatch(/line-height:\s*3rem;/);
    expect(titleRuleBody).not.toMatch(/clamp\(/);
    expect(stackRuleBody).toMatch(/column-gap:\s*0\.5rem;/);
    expect(stackRuleBody).toMatch(/row-gap:\s*1\.5rem;/);
    expect(actionRuleBody).toMatch(/min-height:\s*3rem;/);
    expect(gridCss).toMatch(
      /@media \(max-width:\s*48rem\)\s*\{[\s\S]*\.content\s*\{[\s\S]*row-gap:\s*1\.5rem;/,
    );
  });

  it("normalizes the detail view spacing to the approved rem scale", () => {
    const detailPath = path.join(
      process.cwd(),
      "components",
      "project-detail.module.css",
    );
    const detailCss = fs.readFileSync(detailPath, "utf8");
    const panelRuleBody = getRuleBody(detailCss, ".panel");
    const backButtonRuleBody = getRuleBody(detailCss, ".backButton");
    const headerRuleBody = getRuleBody(detailCss, ".header");
    const headerCopyRuleBody = getRuleBody(detailCss, ".headerCopy");
    const headerTitleRowRuleBody = getRuleBody(detailCss, ".headerTitleRow");
    const titleRuleBody = getRuleBody(detailCss, ".title");
    const roleRuleBody = getRuleBody(detailCss, ".role");
    const visitLinkRuleBody = getRuleBody(detailCss, ".visitLink");
    const summaryBlockRuleBody = getRuleBody(detailCss, ".summaryBlock");
    const summaryRuleBody = getRuleBody(detailCss, ".summary");
    const detailRowRuleBody = getRuleBody(detailCss, ".detailRow");
    const mediaCardRuleBody = getRuleBody(detailCss, ".mediaCard");
    const sectionTitleRuleBody = getRuleBody(detailCss, ".sectionTitle");
    const sectionBodyRuleBody = getRuleBody(detailCss, ".sectionBody");
    const sectionBlocksRuleBody = getRuleBody(detailCss, ".sectionBlocks");
    const sectionBlockRuleBody = getRuleBody(detailCss, ".sectionBlock");
    const sectionLabelRuleBody = getRuleBody(detailCss, ".sectionLabel");
    const metaListRuleBody = getRuleBody(detailCss, ".metaList");

    expect(panelRuleBody).toMatch(/gap:\s*1\.5rem;/);
    expect(panelRuleBody).toMatch(/margin-top:\s*0;/);
    expect(backButtonRuleBody).toMatch(/gap:\s*0\.5rem;/);
    expect(headerRuleBody).toMatch(/gap:\s*1\.5rem;/);
    expect(headerRuleBody).toMatch(/padding-bottom:\s*1\.5rem;/);
    expect(headerCopyRuleBody).toMatch(/gap:\s*1\.5rem;/);
    expect(headerTitleRowRuleBody).toMatch(/gap:\s*1\.5rem;/);
    expect(titleRuleBody).toMatch(/font-size:\s*3rem;/);
    expect(titleRuleBody).toMatch(/line-height:\s*3rem;/);
    expect(titleRuleBody).not.toMatch(/clamp\(/);
    expect(roleRuleBody).toMatch(/font-size:\s*0\.875rem;/);
    expect(roleRuleBody).toMatch(/line-height:\s*var\(--rhythm-step\);/);
    expect(visitLinkRuleBody).toMatch(/gap:\s*0\.5rem;/);
    expect(summaryBlockRuleBody).toMatch(/gap:\s*0;/);
    expect(summaryBlockRuleBody).toMatch(/margin-top:\s*0;/);
    expect(summaryRuleBody).toMatch(/font-size:\s*1\.125rem;/);
    expect(summaryRuleBody).toMatch(/line-height:\s*var\(--rhythm-step\);/);
    expect(detailRowRuleBody).toMatch(/gap:\s*1\.5rem;/);
    expect(detailRowRuleBody).toMatch(/padding-block:\s*1\.5rem;/);
    expect(mediaCardRuleBody).toMatch(/gap:\s*1\.5rem;/);
    expect(sectionTitleRuleBody).toMatch(/font-size:\s*1\.5rem;/);
    expect(sectionTitleRuleBody).toMatch(/line-height:\s*var\(--rhythm-step\);/);
    expect(sectionBodyRuleBody).toMatch(/line-height:\s*var\(--rhythm-step\);/);
    expect(sectionBodyRuleBody).toMatch(/margin-top:\s*1\.5rem;/);
    expect(sectionBlocksRuleBody).toMatch(/gap:\s*1\.5rem;/);
    expect(sectionBlocksRuleBody).toMatch(/margin-top:\s*1\.5rem;/);
    expect(sectionBlockRuleBody).toMatch(/gap:\s*1\.5rem;/);
    expect(sectionLabelRuleBody).toMatch(/font-size:\s*0\.875rem;/);
    expect(sectionLabelRuleBody).toMatch(/line-height:\s*var\(--rhythm-step\);/);
    expect(metaListRuleBody).toMatch(/gap:\s*1\.5rem;/);
    expect(metaListRuleBody).toMatch(/margin:\s*1\.5rem 0 0;/);
  });
});
