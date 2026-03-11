import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("header width alignment", () => {
  it("matches header inner width to the main container width", () => {
    const cssPath = path.join(process.cwd(), "components", "site-header.module.css");
    const cssContent = fs.readFileSync(cssPath, "utf8");

    expect(cssContent).toMatch(
      /\.inner\s*\{[\s\S]*width:\s*min\(1120px,\s*92vw\);[\s\S]*margin-inline:\s*auto;/,
    );
    expect(cssContent).not.toMatch(/\.inner\s*\{[\s\S]*padding-inline:/);
  });
});
