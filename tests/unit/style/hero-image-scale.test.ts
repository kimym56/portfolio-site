import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("hero image scale", () => {
  it("uses a reduced image width on desktop and full width on mobile", () => {
    const cssPath = path.join(process.cwd(), "components", "hero-split.module.css");
    const cssContent = fs.readFileSync(cssPath, "utf8");

    expect(cssContent).toMatch(/\.media\s*\{[\s\S]*width:\s*50%;/);
    expect(cssContent).toMatch(/\.media\s*\{[\s\S]*min-height:\s*\d+px;/);
    expect(cssContent).toMatch(/\.media\s*\{[\s\S]*align-self:\s*center;/);
    expect(cssContent).toMatch(/@media\s*\(max-width:\s*767px\)\s*\{[\s\S]*\.media\s*\{[\s\S]*min-height:\s*300px;/);
  });
});
