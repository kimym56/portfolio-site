import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("grid overlay visibility", () => {
  it("defaults the overlay to hidden and reveals it from the root html dataset", () => {
    const cssPath = path.join(process.cwd(), "app", "globals.css");
    const cssContent = fs.readFileSync(cssPath, "utf8");

    expect(cssContent).toMatch(
      /\.grid-overlay\s*\{[\s\S]*opacity:\s*0;[\s\S]*visibility:\s*hidden;/,
    );
    expect(cssContent).toMatch(
      /html\[data-grid-overlay="visible"\]\s+\.grid-overlay\s*\{[\s\S]*opacity:\s*1;[\s\S]*visibility:\s*visible;/,
    );
  });
});
