import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("hero motion direction", () => {
  it("animates role text with a vertical enter and exit handoff", () => {
    const source = fs.readFileSync(
      path.join(process.cwd(), "components", "rotating-role.tsx"),
      "utf8",
    );

    expect(source).toMatch(/y:\s*10/);
    expect(source).toMatch(/y:\s*-10/);
    expect(source).not.toMatch(/filter:\s*"blur\(/);
  });

  it("keeps hero image motion fade-led without vertical travel", () => {
    const source = fs.readFileSync(
      path.join(process.cwd(), "components", "hero-split.tsx"),
      "utf8",
    );

    expect(source).not.toMatch(/filter:\s*"blur\(/);
    expect(source).not.toMatch(/[,{]\s*y:\s*-?\d+/);
    expect(source).toMatch(/opacity:/);
  });
});
