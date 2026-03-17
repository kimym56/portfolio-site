import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("rotating role animation speed", () => {
  it("keeps rotating-role CSS focused on layout instead of keyframed animation", () => {
    const cssPath = path.join(process.cwd(), "components", "rotating-role.module.css");
    const cssContent = fs.readFileSync(cssPath, "utf8");

    expect(cssContent).toMatch(/\.roleStack\s*\{/);
    expect(cssContent).toMatch(/\.role\s*\{/);
    expect(cssContent).not.toMatch(/@keyframes\s+role-fade-in/);
    expect(cssContent).not.toMatch(/@keyframes\s+role-fade-out/);
    expect(cssContent).not.toMatch(/animation:/);
  });
});
