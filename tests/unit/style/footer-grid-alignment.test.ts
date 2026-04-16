import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("footer grid alignment", () => {
  it("uses the canonical layout frame for footer layout", () => {
    const componentPath = path.join(process.cwd(), "components", "site-footer.tsx");
    const cssPath = path.join(process.cwd(), "components", "site-footer.module.css");
    const componentContent = fs.readFileSync(componentPath, "utf8");
    const cssContent = fs.readFileSync(cssPath, "utf8");

    expect(componentContent).toContain("layout-frame");
    expect(componentContent).not.toContain("layout-shell");
    expect(componentContent).not.toContain("layout-grid");
    expect(cssContent).toMatch(/\.inner p\s*\{[\s\S]*grid-column:\s*1\s*\/\s*span\s*6;/);
  });
});
