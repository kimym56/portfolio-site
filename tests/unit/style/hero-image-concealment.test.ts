import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("hero image concealment", () => {
  it("does not define a bottom-right concealment layer for the portrait", () => {
    const cssPath = path.join(process.cwd(), "components", "hero-split.module.css");
    const cssContent = fs.readFileSync(cssPath, "utf8");

    expect(cssContent).not.toMatch(/\.logoConcealment\s*\{/);
  });
});
