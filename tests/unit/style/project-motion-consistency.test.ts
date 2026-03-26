import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

function readFile(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function getBlock(cssContent: string, pattern: RegExp) {
  const match = cssContent.match(pattern);

  expect(match).not.toBeNull();

  return match?.[0] ?? "";
}

describe("project motion consistency", () => {
  it("aligns project panel reveals with the shared page stagger motion", () => {
    const globalsCss = readFile("app/globals.css");
    const filterCss = readFile("components/project-filter.module.css");
    const detailCss = readFile("components/project-detail.module.css");
    const gridCss = readFile("components/project-grid.module.css");

    expect(globalsCss).toMatch(
      /@media\s*\(prefers-reduced-motion:\s*no-preference\)\s*\{[\s\S]*\.page-stagger\s*\{[\s\S]*animation:\s*0\.6s\s+ease\s+both\s+pageStaggerEnter;/,
    );

    expect(filterCss).toMatch(/\.panelReveal\s*\{[\s\S]*animation:\s*projectOnceReveal\s+600ms\s+ease\s+both;/);
    expect(detailCss).toMatch(
      /\.panelReveal\s*\{[\s\S]*animation:\s*projectDetailReveal\s+600ms\s+ease\s+both;/,
    );
    expect(gridCss).toMatch(/\.cardReveal\s*\{[\s\S]*animation-duration:\s*600ms;/);
    expect(gridCss).toMatch(/\.cardReveal\s*\{[\s\S]*animation-timing-function:\s*ease;/);

    const filterReveal = getBlock(
      filterCss,
      /@keyframes projectOnceReveal\s*\{[\s\S]*?\n\}/,
    );
    const detailReveal = getBlock(
      detailCss,
      /@keyframes projectDetailReveal\s*\{[\s\S]*?\n\}/,
    );

    expect(filterReveal).toMatch(/transform:\s*translateY\(10px\);/);
    expect(detailReveal).toMatch(/transform:\s*translateY\(10px\);/);
    expect(filterReveal).not.toMatch(/filter:/);
    expect(detailReveal).not.toMatch(/filter:/);
  });
});
