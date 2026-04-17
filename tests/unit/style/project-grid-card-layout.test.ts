import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

function getRuleBody(cssContent: string, selector: string) {
  const escapedSelector = selector.replace(".", "\\.");
  const match = cssContent.match(new RegExp(`${escapedSelector}\\s*\\{([^}]*)\\}`));

  expect(match).not.toBeNull();

  return match?.[1] ?? "";
}

describe("project grid card layout", () => {
  it("uses editorial rows with a pinned arrow and wrapping chip list", () => {
    const cssPath = path.join(process.cwd(), "components", "project-grid.module.css");
    const cssContent = fs.readFileSync(cssPath, "utf8");
    const cardButtonRuleBody = getRuleBody(cssContent, ".cardButton");
    const contentRuleBody = getRuleBody(cssContent, ".content");
    const headerRuleBody = getRuleBody(cssContent, ".header");
    const headingRuleBody = getRuleBody(cssContent, ".heading");
    const descriptionRuleBody = getRuleBody(cssContent, ".description");
    const stackRuleBody = getRuleBody(cssContent, ".stack");
    const actionRuleBody = getRuleBody(cssContent, ".action");

    expect(cardButtonRuleBody).not.toMatch(/\bborder-radius\s*:/);
    expect(cardButtonRuleBody).toMatch(/display:\s*flex;/);
    expect(cardButtonRuleBody).toMatch(/background:\s*transparent;/);
    expect(cardButtonRuleBody).toMatch(/border:\s*0;/);
    expect(contentRuleBody).toMatch(/display:\s*grid;/);
    expect(contentRuleBody).toMatch(/flex:\s*1;/);
    expect(contentRuleBody).toMatch(
      /grid-template-columns:\s*repeat\(12,\s*minmax\(0,\s*1fr\)\);/,
    );
    expect(contentRuleBody).toMatch(/column-gap:\s*var\(--layout-gap\);/);
    expect(headerRuleBody).toMatch(/display:\s*contents;/);
    expect(headingRuleBody).toMatch(/display:\s*grid;/);
    expect(headingRuleBody).toMatch(/grid-column:\s*1\s*\/\s*span\s*5;/);
    expect(descriptionRuleBody).not.toMatch(/margin-top:/);
    expect(descriptionRuleBody).toMatch(/grid-column:\s*1\s*\/\s*span\s*6;/);
    expect(stackRuleBody).toMatch(/display:\s*flex;/);
    expect(stackRuleBody).toMatch(/flex-wrap:\s*wrap;/);
    expect(stackRuleBody).toMatch(/grid-column:\s*7\s*\/\s*span\s*4;/);
    expect(actionRuleBody).not.toMatch(/\bborder\s*:/);
    expect(actionRuleBody).toMatch(/align-self:\s*flex-start;/);
    expect(actionRuleBody).toMatch(/grid-column:\s*12\s*\/\s*span\s*1;/);
    expect(actionRuleBody).not.toMatch(/\bheight\s*:\s*2\.25rem;/);
    expect(actionRuleBody).not.toMatch(/\bwidth\s*:\s*2\.25rem;/);
  });

  it("matches the about-page stagger timing for animated project cards", () => {
    const cssPath = path.join(process.cwd(), "components", "project-grid.module.css");
    const cssContent = fs.readFileSync(cssPath, "utf8");
    const revealRuleBody = getRuleBody(cssContent, ".cardReveal");

    expect(revealRuleBody).toMatch(/animation-duration:\s*600ms;/);
    expect(revealRuleBody).toMatch(/animation-timing-function:\s*ease;/);
    expect(cssContent).toMatch(
      /\.cardReveal\[data-stagger-index="1"\]\s*\{[^}]*animation-delay:\s*120ms;/,
    );
    expect(cssContent).toMatch(
      /\.cardReveal\[data-stagger-index="2"\]\s*\{[^}]*animation-delay:\s*240ms;/,
    );
    expect(cssContent).toMatch(
      /\.cardReveal\[data-stagger-index="3"\]\s*\{[^}]*animation-delay:\s*360ms;/,
    );
    expect(cssContent).toMatch(
      /@keyframes projectCardRevealForward\s*\{[\s\S]*translateY\(0\.625rem\)[\s\S]*\}/,
    );
    expect(cssContent).toMatch(
      /@keyframes projectCardRevealBackward\s*\{[\s\S]*translateY\(0\.625rem\)[\s\S]*\}/,
    );
  });

  it("removes the first project row border so it does not collide with the toggle underline", () => {
    const cssPath = path.join(process.cwd(), "components", "project-grid.module.css");
    const cssContent = fs.readFileSync(cssPath, "utf8");

    expect(cssContent).toMatch(/\.row\s*\{[^}]*box-shadow:\s*inset 0 0\.0625rem 0/);
    expect(cssContent).toMatch(/\.row:first-child\s*\{[^}]*box-shadow:\s*none;/);
  });

  it("keeps the toggle-to-list spacing close to the row rhythm", () => {
    const cssPath = path.join(process.cwd(), "components", "project-filter.module.css");
    const cssContent = fs.readFileSync(cssPath, "utf8");

    expect(cssContent).toMatch(/\.toggles\s*\{[\s\S]*?margin-bottom:\s*0;/);
    expect(cssContent).toMatch(/\.toggles\s*\{[\s\S]*?min-height:\s*3rem;/);
  });
});
