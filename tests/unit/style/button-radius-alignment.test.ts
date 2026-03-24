import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

function readFile(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

describe("button radius alignment", () => {
  it("uses a minimal semantic radius token scale across current shapes", () => {
    const globalsCss = readFile("app/globals.css");
    const heroCss = readFile("components/hero-split.module.css");
    const themeToggleCss = readFile("components/theme-toggle.module.css");
    const siteHeaderCss = readFile("components/site-header.module.css");
    const projectFilterCss = readFile("components/project-filter.module.css");
    const projectGridCss = readFile("components/project-grid.module.css");
    const projectDetailCss = readFile("components/project-detail.module.css");

    expect(globalsCss).toMatch(/--radius-md:\s*14px;/);
    expect(globalsCss).toMatch(/--radius-lg:\s*18px;/);
    expect(globalsCss).toMatch(/--radius-full:\s*999px;/);
    expect(globalsCss).toMatch(/\.card\s*\{[\s\S]*?border-radius:\s*var\(--radius-lg\);/);
    expect(globalsCss).not.toMatch(/--control-radius:/);
    expect(heroCss).toMatch(/border-radius:\s*var\(--radius-md\);/);
    expect(themeToggleCss).toMatch(/border-radius:\s*var\(--radius-md\);/);
    expect(siteHeaderCss).toMatch(/\.navLink\s*\{[\s\S]*?border-radius:\s*var\(--radius-md\);/);
    expect(projectFilterCss).toMatch(/\.toggles\s*\{[\s\S]*?border-radius:\s*var\(--radius-md\);/);
    expect(projectFilterCss).toMatch(/\.indicatorTrack\s*\{[^}]*border-radius:\s*inherit;/);
    expect(projectFilterCss).toMatch(/\.toggle\s*\{[\s\S]*?border-radius:\s*var\(--radius-md\);/);
    expect(projectGridCss).toMatch(/\.cardButton\s*\{[\s\S]*?border-radius:\s*var\(--radius-md\);/);
    expect(projectGridCss).toMatch(/\.action\s*\{[\s\S]*?border-radius:\s*var\(--radius-md\);/);
    expect(projectDetailCss).toMatch(/\.visitLink\s*\{[\s\S]*?border-radius:\s*var\(--radius-md\);/);
    expect(projectDetailCss).toMatch(/\.section\s*\{[\s\S]*?border-radius:\s*var\(--radius-lg\);/);
    expect(projectDetailCss).toMatch(/\.backButton\s*\{[\s\S]*?border-radius:\s*var\(--radius-full\);/);
  });
});
