import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("about tech stack chip weight", () => {
  it("uses distinct font weights for strong and soft chips", () => {
    const cssPath = path.join(process.cwd(), "app", "globals.css");
    const cssContent = fs.readFileSync(cssPath, "utf8");

    expect(cssContent).toMatch(
      /\.about-chip-strong\s*\{[\s\S]*font-weight:\s*700;/,
    );
    expect(cssContent).toMatch(
      /\.about-chip-soft\s*\{[\s\S]*font-weight:\s*500;/,
    );
  });
});
