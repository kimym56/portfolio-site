import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

function getRuleBody(cssContent: string, selector: string) {
  const escapedSelector = selector.replace(".", "\\.");
  const match = cssContent.match(new RegExp(`${escapedSelector}\\s*\\{([^}]*)\\}`));

  expect(match).not.toBeNull();

  return match?.[1] ?? "";
}

describe("inner page left edge alignment", () => {
  it("uses vertical-only section padding on the inner pages", () => {
    const cssPath = path.join(process.cwd(), "app", "globals.css");
    const cssContent = fs.readFileSync(cssPath, "utf8");

    for (const selector of [".about-card", ".projects-card", ".contact-card"]) {
      const ruleBody = getRuleBody(cssContent, selector);

      expect(ruleBody).toMatch(/padding-block:\s*clamp\(1\.2rem,\s*3vw,\s*2\.2rem\);/);
      expect(ruleBody).not.toMatch(/padding:\s*clamp\(1\.2rem,\s*3vw,\s*2\.2rem\);/);
      expect(ruleBody).not.toMatch(/padding-inline:/);
    }
  });
});
