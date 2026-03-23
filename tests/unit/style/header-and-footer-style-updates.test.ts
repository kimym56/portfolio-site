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
    const cssPath = path.join(process.cwd(), "components", "theme-toggle.module.css");
    const cssContent = fs.readFileSync(cssPath, "utf8");

    expect(cssContent).toMatch(/border:\s*none;/);
    expect(cssContent).toMatch(/background:\s*transparent;/);
  });

  it("centers footer text", () => {
    const cssPath = path.join(process.cwd(), "components", "site-footer.module.css");
    const cssContent = fs.readFileSync(cssPath, "utf8");

    expect(cssContent).toMatch(/text-align:\s*center;/);
  });
});
