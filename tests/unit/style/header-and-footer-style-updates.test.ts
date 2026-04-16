import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("header/footer style updates", () => {
  it("keeps header nav hover and current states text-only", () => {
    const cssPath = path.join(process.cwd(), "components", "site-header.module.css");
    const cssContent = fs.readFileSync(cssPath, "utf8");

    expect(cssContent).toMatch(/\[aria-current="page"\]/);
    expect(cssContent).toMatch(/\.navLink:hover,[\s\S]*?font-weight:\s*800;/);
    expect(cssContent).not.toMatch(/\.navLink\s*\{[\s\S]*?\bborder:/);
    expect(cssContent).not.toMatch(/border-color:\s*var\(--border\);/);
    expect(cssContent).not.toMatch(/background:\s*var\(--surface-soft\);/);
  });

  it("uses a borderless icon-only theme toggle button", () => {
    const themeCssPath = path.join(process.cwd(), "components", "theme-toggle.module.css");
    const gridCssPath = path.join(
      process.cwd(),
      "components",
      "grid-overlay-toggle.module.css",
    );
    const themeCssContent = fs.readFileSync(themeCssPath, "utf8");
    const gridCssContent = fs.readFileSync(gridCssPath, "utf8");

    expect(themeCssContent).toMatch(/border:\s*none;/);
    expect(themeCssContent).toMatch(/background:\s*transparent;/);
    expect(gridCssContent).toMatch(/border:\s*none;/);
    expect(gridCssContent).toMatch(/background:\s*transparent;/);
  });

  it("aligns footer copy to the shared grid instead of centering it", () => {
    const componentPath = path.join(process.cwd(), "components", "site-footer.tsx");
    const cssPath = path.join(process.cwd(), "components", "site-footer.module.css");
    const componentContent = fs.readFileSync(componentPath, "utf8");
    const cssContent = fs.readFileSync(cssPath, "utf8");

    expect(componentContent).toContain("layout-frame");
    expect(componentContent).not.toContain("layout-shell");
    expect(componentContent).not.toContain("layout-grid");
    expect(cssContent).toMatch(/\.inner p\s*\{[\s\S]*grid-column:\s*1\s*\/\s*span\s*6;/);
    expect(cssContent).not.toMatch(/text-align:\s*center;/);
  });
});
