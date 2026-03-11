import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("typography font roles", () => {
  it("uses regular and bold font role variables across layout and styles", () => {
    const layoutPath = path.join(process.cwd(), "app", "layout.tsx");
    const globalsPath = path.join(process.cwd(), "app", "globals.css");
    const heroPath = path.join(process.cwd(), "components", "hero-split.module.css");
    const headerPath = path.join(process.cwd(), "components", "site-header.module.css");
    const projectGridPath = path.join(process.cwd(), "components", "project-grid.module.css");

    const layout = fs.readFileSync(layoutPath, "utf8");
    const globals = fs.readFileSync(globalsPath, "utf8");
    const heroCss = fs.readFileSync(heroPath, "utf8");
    const headerCss = fs.readFileSync(headerPath, "utf8");
    const projectGridCss = fs.readFileSync(projectGridPath, "utf8");

    expect(layout).toMatch(/variable:\s*"--font-regular"/);
    expect(layout).toMatch(/variable:\s*"--font-bold"/);

    expect(globals).toMatch(
      /body\s*\{[\s\S]*font-family:\s*var\(--font-regular\),\s*"Noto Sans KR",\s*sans-serif;/,
    );
    expect(globals).toMatch(
      /\.page-title\s*\{[\s\S]*font-family:\s*var\(--font-bold\),\s*"Noto Serif KR",\s*serif;/,
    );

    expect(heroCss).toMatch(/font-family:\s*var\(--font-bold\),\s*"Noto Serif KR",\s*serif;/);
    expect(headerCss).toMatch(/font-family:\s*var\(--font-bold\),\s*"Noto Serif KR",\s*serif;/);
    expect(projectGridCss).toMatch(/font-family:\s*var\(--font-bold\),\s*"Noto Serif KR",\s*serif;/);

    expect(layout).not.toMatch(/--font-sans|--font-serif/);
    expect(globals).not.toMatch(/--font-sans|--font-serif/);
  });
});
