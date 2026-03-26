import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("scrollbar gutter stability", () => {
  it("reserves vertical scrollbar space to prevent viewport-width layout shifts", () => {
    const cssPath = path.join(process.cwd(), "app", "globals.css");
    const cssContent = fs.readFileSync(cssPath, "utf8");

    expect(cssContent).toMatch(
      /html,\s*\nbody\s*\{[\s\S]*scrollbar-gutter:\s*stable;/,
    );
  });
});
