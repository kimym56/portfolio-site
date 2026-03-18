import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("rotating role animation speed", () => {
  it("uses a slightly longer default interval for the slower hero rotation", () => {
    const sourcePath = path.join(process.cwd(), "components", "rotating-role.tsx");
    const source = fs.readFileSync(sourcePath, "utf8");

    const intervalMatch = source.match(/DEFAULT_INTERVAL_MS\s*=\s*(\d+)/);

    expect(intervalMatch).not.toBeNull();
    const intervalMs = Number(intervalMatch?.[1] ?? "0");
    expect(intervalMs).toBeGreaterThanOrEqual(4000);
    expect(intervalMs).toBeLessThanOrEqual(4600);
  });

  it("uses a slower shared transition duration for the hero text handoff", () => {
    const sourcePath = path.join(process.cwd(), "components", "rotating-role.tsx");
    const source = fs.readFileSync(sourcePath, "utf8");

    const durationMatch = source.match(/DEFAULT_TRANSITION_MS\s*=\s*(\d+)/);

    expect(durationMatch).not.toBeNull();
    const durationMs = Number(durationMatch?.[1] ?? "0");
    expect(durationMs).toBeGreaterThanOrEqual(860);
    expect(durationMs).toBeLessThanOrEqual(960);
  });
});
