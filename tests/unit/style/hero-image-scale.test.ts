import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("hero image scale", () => {
  it("keeps the hero portrait visually subordinate to the copy block on desktop", () => {
    const cssPath = path.join(process.cwd(), "components", "hero-split.module.css");
    const cssContent = fs.readFileSync(cssPath, "utf8");

    expect(cssContent).toMatch(/\.media\s*\{[\s\S]*grid-column:\s*8\s*\/\s*span\s*5;/);
    expect(cssContent).toMatch(/\.media\s*\{[\s\S]*align-self:\s*center;/);
    expect(cssContent).toMatch(
      /\.media\s*\{[\s\S]*height:\s*clamp\(26rem,\s*42vw,\s*32rem\);/,
    );
    expect(cssContent).toMatch(/\.imageLayer\s*\{/);
    expect(cssContent).toMatch(/\.image\s*\{[\s\S]*object-fit:\s*cover;/);
    expect(cssContent).toMatch(/\.image\s*\{[\s\S]*object-position:\s*center\s*38%;/);
    expect(cssContent).not.toMatch(/\.image\s*\{[\s\S]*transform:\s*scale\(/);
    expect(cssContent).not.toMatch(/@keyframes\s+image-fade-in/);
    expect(cssContent).not.toMatch(/@keyframes\s+image-fade-out/);
    expect(cssContent).not.toMatch(/animation:/);
    expect(cssContent).toMatch(
      /@media\s*\(max-width:\s*48rem\)\s*\{[\s\S]*\.media\s*\{[\s\S]*min-height:\s*22\.5rem;/,
    );
  });
});
