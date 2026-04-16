import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("grid system foundation", () => {
  it("defines one canonical rem-based layout frame", () => {
    const globalsPath = path.join(process.cwd(), "app", "globals.css");
    const globalsContent = fs.readFileSync(globalsPath, "utf8");

    expect(globalsContent).toMatch(/--layout-max:\s*75rem;/);
    expect(globalsContent).toMatch(/--layout-padding:\s*1\.5rem;/);
    expect(globalsContent).toMatch(/--layout-gap:\s*1\.5rem;/);
    expect(globalsContent).toMatch(/--layout-columns:\s*12;/);
    expect(globalsContent).toMatch(
      /\.layout-frame\s*\{[\s\S]*width:\s*min\(100%,\s*calc\(var\(--layout-max\)\s*\+\s*\(var\(--layout-padding\)\s*\*\s*2\)\)\);[\s\S]*padding-inline:\s*var\(--layout-padding\);[\s\S]*display:\s*grid;[\s\S]*grid-template-columns:\s*repeat\(var\(--layout-columns\),\s*minmax\(0,\s*1fr\)\);[\s\S]*column-gap:\s*var\(--layout-gap\);/,
    );
    expect(globalsContent).not.toMatch(/\.layout-shell\s*\{/);
    expect(globalsContent).not.toMatch(/\.layout-grid\s*\{/);
    expect(globalsContent).toMatch(
      /@media \(max-width:\s*64rem\)\s*\{[\s\S]*--layout-columns:\s*8;/,
    );
    expect(globalsContent).toMatch(
      /@media \(max-width:\s*48rem\)\s*\{[\s\S]*--layout-columns:\s*4;/,
    );
  });
});
