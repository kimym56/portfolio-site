import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("header width alignment", () => {
  it("anchors header content to the canonical layout frame", () => {
    const componentPath = path.join(process.cwd(), "components", "site-header.tsx");
    const cssPath = path.join(process.cwd(), "components", "site-header.module.css");
    const componentContent = fs.readFileSync(componentPath, "utf8");
    const cssContent = fs.readFileSync(cssPath, "utf8");

    expect(componentContent).toContain("layout-frame");
    expect(componentContent).not.toContain("layout-shell");
    expect(componentContent).not.toContain("layout-grid");
    expect(cssContent).toMatch(/\.logo\s*\{[\s\S]*grid-column:\s*1\s*\/\s*span\s*2;/);
    expect(cssContent).toMatch(/\.nav\s*\{[\s\S]*grid-column:\s*4\s*\/\s*span\s*6;/);
    expect(cssContent).toMatch(/\.controls\s*\{[\s\S]*grid-column:\s*11\s*\/\s*span\s*2;/);
    expect(cssContent).not.toMatch(/min\(1120px,\s*92vw\)/);
  });

  it("fits the header to the third vertical rhythm line", () => {
    const cssPath = path.join(process.cwd(), "components", "site-header.module.css");
    const cssContent = fs.readFileSync(cssPath, "utf8");

    expect(cssContent).toMatch(
      /\.header\s*\{[\s\S]*box-shadow:\s*inset 0 -0\.0625rem 0 var\(--border\);/,
    );
    expect(cssContent).not.toMatch(/\.header\s*\{[\s\S]*border-bottom:/);
    expect(cssContent).toMatch(/\.inner\s*\{[\s\S]*min-height:\s*var\(--shell-height\);/);
    expect(cssContent).toMatch(/\.inner\s*\{[\s\S]*padding-block:\s*0;/);
  });
});
