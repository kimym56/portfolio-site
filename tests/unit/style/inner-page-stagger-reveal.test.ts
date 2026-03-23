import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("inner page stagger reveal styles", () => {
  it("defines paco-style stagger classes with 120ms steps", () => {
    const cssPath = path.join(process.cwd(), "app", "globals.css");
    const cssContent = fs.readFileSync(cssPath, "utf8");

    expect(cssContent).toMatch(
      /@media\s*\(prefers-reduced-motion:\s*no-preference\)\s*\{[\s\S]*\.page-stagger\s*\{[\s\S]*animation:\s*0\.6s\s+ease\s+both\s+pageStaggerEnter;[\s\S]*animation-delay:\s*calc\(var\(--page-stagger-step\)\s*\*\s*0\.12s\);/,
    );
    expect(cssContent).toMatch(/\.page-stagger-0\s*\{[\s\S]*--page-stagger-step:\s*0;/);
    expect(cssContent).toMatch(/\.page-stagger-1\s*\{[\s\S]*--page-stagger-step:\s*1;/);
    expect(cssContent).toMatch(/\.page-stagger-2\s*\{[\s\S]*--page-stagger-step:\s*2;/);
    expect(cssContent).toMatch(/\.page-stagger-3\s*\{[\s\S]*--page-stagger-step:\s*3;/);
    expect(cssContent).toMatch(
      /@keyframes\s+pageStaggerEnter\s*\{[\s\S]*opacity:\s*0;[\s\S]*transform:\s*translateY\(10px\);[\s\S]*opacity:\s*1;[\s\S]*transform:\s*none;/,
    );
  });

  it("disables paco-style stagger motion for reduced-motion users", () => {
    const cssPath = path.join(process.cwd(), "app", "globals.css");
    const cssContent = fs.readFileSync(cssPath, "utf8");

    expect(cssContent).toMatch(
      /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{[\s\S]*\.page-stagger\s*\{[\s\S]*animation:\s*none;/,
    );
  });
});
