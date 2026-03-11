import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("global background style", () => {
  it("does not use gradient backgrounds", () => {
    const cssPath = path.join(process.cwd(), "app", "globals.css");
    const cssContent = fs.readFileSync(cssPath, "utf8");

    expect(cssContent).not.toMatch(/gradient\(/i);
  });
});
