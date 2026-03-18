import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("hero motion direction", () => {
  it("animates role text with an upward crossfade", () => {
    const source = fs.readFileSync(
      path.join(process.cwd(), "components", "rotating-role.tsx"),
      "utf8",
    );

    expect(source).toMatch(/y:\s*12/);
    expect(source).toMatch(/y:\s*-12/);
    expect(source).not.toMatch(/filter:\s*"blur\(/);
    expect(source).toMatch(/opacity:/);
  });

  it("animates the hero image with the same upward crossfade", () => {
    const source = fs.readFileSync(
      path.join(process.cwd(), "components", "hero-split.tsx"),
      "utf8",
    );

    expect(source).not.toMatch(/filter:\s*"blur\(/);
    expect(source).toMatch(/y:\s*12/);
    expect(source).toMatch(/y:\s*-12/);
    expect(source).toMatch(/opacity:/);
  });
});
