import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("hero left edge alignment", () => {
  it("removes horizontal inset from hero and copy blocks", () => {
    const cssPath = path.join(process.cwd(), "components", "hero-split.module.css");
    const cssContent = fs.readFileSync(cssPath, "utf8");

    expect(cssContent).toMatch(/\.hero\s*\{[\s\S]*padding:\s*0;/);
    expect(cssContent).toMatch(/\.copy\s*\{[\s\S]*padding:\s*0;/);
  });
});
