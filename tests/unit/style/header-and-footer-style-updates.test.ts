import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("header/footer style updates", () => {
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
