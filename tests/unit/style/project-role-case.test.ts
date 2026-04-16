import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

function getRuleBody(cssContent: string, selector: string) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = cssContent.match(new RegExp(`${escapedSelector}\\s*\\{([^}]*)\\}`));

  expect(match).not.toBeNull();

  return match?.[1] ?? "";
}

describe("project role casing", () => {
  it("does not force project role labels into uppercase", () => {
    const gridCss = fs.readFileSync(
      path.join(process.cwd(), "components", "project-grid.module.css"),
      "utf8",
    );
    const detailCss = fs.readFileSync(
      path.join(process.cwd(), "components", "project-detail.module.css"),
      "utf8",
    );
    const gridRoleRuleBody = getRuleBody(gridCss, ".role");
    const detailRoleRuleBody = getRuleBody(detailCss, ".role");

    expect(gridRoleRuleBody).not.toMatch(/text-transform:\s*uppercase;/);
    expect(detailRoleRuleBody).not.toMatch(/text-transform:\s*uppercase;/);
  });
});
