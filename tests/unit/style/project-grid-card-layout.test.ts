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
  it("uses a shared header row with a pinned arrow and wrapping chip list", () => {
    const cssPath = path.join(process.cwd(), "components", "project-grid.module.css");
    const cssContent = fs.readFileSync(cssPath, "utf8");
    const cardButtonRuleBody = getRuleBody(cssContent, ".cardButton");
    const headerRuleBody = getRuleBody(cssContent, ".header");
    const headingRuleBody = getRuleBody(cssContent, ".heading");
    const stackRuleBody = getRuleBody(cssContent, ".stack");
    const actionRuleBody = getRuleBody(cssContent, ".action");

    expect(cardButtonRuleBody).toMatch(/padding:\s*1rem 1\.2rem;/);
    expect(headerRuleBody).toMatch(/display:\s*flex;/);
    expect(headerRuleBody).toMatch(/justify-content:\s*space-between;/);
    expect(headerRuleBody).toMatch(/align-items:\s*flex-start;/);
    expect(headingRuleBody).toMatch(/display:\s*flex;/);
    expect(headingRuleBody).toMatch(/flex-wrap:\s*wrap;/);
    expect(stackRuleBody).toMatch(/display:\s*flex;/);
    expect(stackRuleBody).toMatch(/flex-wrap:\s*wrap;/);
    expect(actionRuleBody).toMatch(/border-radius:\s*var\(--radius-full\);/);
    expect(actionRuleBody).toMatch(/align-self:\s*flex-start;/);
  });
});
