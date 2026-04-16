import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("hero grid alignment", () => {
  it("fits the home hero to intentional shared column spans", () => {
    const componentPath = path.join(process.cwd(), "components", "hero-split.tsx");
    const cssPath = path.join(process.cwd(), "components", "hero-split.module.css");
    const componentContent = fs.readFileSync(componentPath, "utf8");
    const cssContent = fs.readFileSync(cssPath, "utf8");

    expect(componentContent).toContain("layout-frame");
    expect(componentContent).not.toContain("layout-shell");
    expect(componentContent).not.toContain("layout-grid");
    const heroRuleMatch = cssContent.match(/\.hero\s*\{([^}]*)\}/);
    expect(heroRuleMatch).not.toBeNull();
    expect(heroRuleMatch?.[1]).not.toMatch(/width:\s*100%;/);
    expect(heroRuleMatch?.[1]).not.toMatch(/padding:\s*0(?:\s*;|\s*$)/);
    expect(cssContent).toMatch(/\.copy\s*\{[\s\S]*grid-column:\s*1\s*\/\s*span\s*5;/);
    expect(cssContent).toMatch(/\.media\s*\{[\s\S]*grid-column:\s*8\s*\/\s*span\s*5;/);
    expect(cssContent).not.toMatch(/width:\s*72%;/);
    expect(cssContent).toMatch(/@media \(max-width:\s*64rem\)/);
    expect(cssContent).toMatch(/@media \(max-width:\s*48rem\)/);
  });
});
