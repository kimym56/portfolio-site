import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("hero image scale", () => {
  it("keeps the hero image layout-focused while preserving the large portrait crop", () => {
    const cssPath = path.join(process.cwd(), "components", "hero-split.module.css");
    const cssContent = fs.readFileSync(cssPath, "utf8");

    expect(cssContent).toMatch(/\.media\s*\{[\s\S]*width:\s*72%;/);
    expect(cssContent).toMatch(/\.media\s*\{[\s\S]*min-height:\s*420px;/);
    expect(cssContent).toMatch(/\.media\s*\{[\s\S]*align-self:\s*center;/);
    expect(cssContent).toMatch(/\.imageLayer\s*\{/);
    expect(cssContent).toMatch(/\.image\s*\{[\s\S]*transform:\s*scale\(1\.15\);/);
    expect(cssContent).not.toMatch(/@keyframes\s+image-fade-in/);
    expect(cssContent).not.toMatch(/@keyframes\s+image-fade-out/);
    expect(cssContent).not.toMatch(/animation:/);
    expect(cssContent).toMatch(
      /@media\s*\(max-width:\s*767px\)\s*\{[\s\S]*\.media\s*\{[\s\S]*min-height:\s*360px;/,
    );
  });
});
