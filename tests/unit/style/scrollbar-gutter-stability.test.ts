import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("scrollbar gutter stability", () => {
  it("reserves scrollbar space on the root scrolling context without narrowing the body frame", () => {
    const cssPath = path.join(process.cwd(), "app", "globals.css");
    const cssContent = fs.readFileSync(cssPath, "utf8");

    expect(cssContent).toMatch(/html\s*\{[\s\S]*scrollbar-gutter:\s*stable;/);
    expect(cssContent).not.toMatch(
      /html,\s*\nbody\s*\{[\s\S]*scrollbar-gutter:\s*stable;/,
    );
    expect(cssContent).not.toMatch(/body\s*\{[\s\S]*scrollbar-gutter:\s*stable;/);
  });
});
