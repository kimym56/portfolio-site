import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("project grid column system", () => {
  it("uses explicit column spans instead of ad hoc fractions", () => {
    const cssPath = path.join(process.cwd(), "components", "project-grid.module.css");
    const cssContent = fs.readFileSync(cssPath, "utf8");

    expect(cssContent).toMatch(
      /\.content\s*\{[\s\S]*grid-template-columns:\s*repeat\(12,\s*minmax\(0,\s*1fr\)\);/,
    );
    expect(cssContent).toMatch(/\.heading\s*\{[\s\S]*grid-column:\s*1\s*\/\s*span\s*5;/);
    expect(cssContent).toMatch(/\.role\s*\{[\s\S]*grid-column:\s*7\s*\/\s*span\s*3;/);
    expect(cssContent).toMatch(
      /\.description\s*\{[\s\S]*grid-column:\s*1\s*\/\s*span\s*6;/,
    );
    expect(cssContent).toMatch(/\.stack\s*\{[\s\S]*grid-column:\s*7\s*\/\s*span\s*4;/);
    expect(cssContent).toMatch(/\.action\s*\{[\s\S]*grid-column:\s*12\s*\/\s*span\s*1;/);
    expect(cssContent).not.toMatch(
      /grid-template-columns:\s*minmax\(0,\s*1\.1fr\)\s*minmax\(10rem,\s*0\.7fr\)\s*auto;/,
    );
  });
});
