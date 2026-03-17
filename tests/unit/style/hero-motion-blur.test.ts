import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("hero blur motion", () => {
  it("animates role text with blur on enter and exit", () => {
    const source = fs.readFileSync(
      path.join(process.cwd(), "components", "rotating-role.tsx"),
      "utf8",
    );

    expect(source).toMatch(/filter:\s*"blur\(/);
  });

  it("animates hero images with blur on enter and exit", () => {
    const source = fs.readFileSync(
      path.join(process.cwd(), "components", "hero-split.tsx"),
      "utf8",
    );

    expect(source).toMatch(/filter:\s*"blur\(/);
  });
});
