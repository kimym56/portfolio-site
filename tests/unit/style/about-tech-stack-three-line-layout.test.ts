import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

function getRuleBody(cssContent: string, selector: string) {
  const escapedSelector = selector.replace(".", "\\.");
  const match = cssContent.match(new RegExp(`${escapedSelector}\\s*\\{([^}]*)\\}`));

  expect(match).not.toBeNull();

  return match?.[1] ?? "";
}

describe("about tech stack category rows", () => {
  it("stacks category rows and lets each row wrap its own chips", () => {
    const cssPath = path.join(process.cwd(), "app", "globals.css");
    const cssContent = fs.readFileSync(cssPath, "utf8");
    const stackRuleBody = getRuleBody(cssContent, ".about-tech-stack");
    const rowRuleBody = getRuleBody(cssContent, ".about-tech-stack-row");

    expect(stackRuleBody).toMatch(/display:\s*grid;/);
    expect(stackRuleBody).toMatch(/gap:\s*0\.46rem;/);
    expect(rowRuleBody).toMatch(/display:\s*flex;/);
    expect(rowRuleBody).toMatch(/flex-wrap:\s*wrap;/);
    expect(rowRuleBody).toMatch(/list-style:\s*none;/);
    expect(rowRuleBody).toMatch(/margin:\s*0;/);
    expect(rowRuleBody).toMatch(/padding:\s*0;/);
  });
});
