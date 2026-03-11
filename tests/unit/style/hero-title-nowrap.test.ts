import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("hero title wrapping", () => {
  it("keeps the rotating role heading on a single line", () => {
    const cssPath = path.join(process.cwd(), "components", "hero-split.module.css");
    const cssContent = fs.readFileSync(cssPath, "utf8");

    expect(cssContent).toMatch(/\.title\s*\{[\s\S]*white-space:\s*nowrap;/);
  });
});
