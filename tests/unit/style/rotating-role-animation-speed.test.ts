import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("rotating role animation speed", () => {
  it("uses a moderate transition duration for readable text changes", () => {
    const cssPath = path.join(process.cwd(), "components", "rotating-role.module.css");
    const cssContent = fs.readFileSync(cssPath, "utf8");

    const animationMatch = cssContent.match(
      /animation:\s*role-enter\s+(\d+)ms\s+ease-in-out\s+forwards;/,
    );

    expect(animationMatch).not.toBeNull();
    const durationMs = Number(animationMatch?.[1] ?? "0");
    expect(durationMs).toBeGreaterThanOrEqual(300);
    expect(durationMs).toBeLessThanOrEqual(700);
  });
});
