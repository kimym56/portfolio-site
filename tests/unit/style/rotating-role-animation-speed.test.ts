import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("rotating role animation speed", () => {
  it("uses a calmer shared transition duration for the hero text handoff", () => {
    const sourcePath = path.join(process.cwd(), "components", "rotating-role.tsx");
    const source = fs.readFileSync(sourcePath, "utf8");

    const durationMatch = source.match(/DEFAULT_TRANSITION_MS\s*=\s*(\d+)/);

    expect(durationMatch).not.toBeNull();
    const durationMs = Number(durationMatch?.[1] ?? "0");
    expect(durationMs).toBeGreaterThanOrEqual(420);
    expect(durationMs).toBeLessThanOrEqual(480);
  });
});
