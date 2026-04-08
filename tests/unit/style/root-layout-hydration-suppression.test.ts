import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

function readRootLayout() {
  return fs.readFileSync(path.join(process.cwd(), "app", "layout.tsx"), "utf8");
}

describe("root layout hydration suppression", () => {
  it("tolerates browser-extension attributes on the document body", () => {
    const layout = readRootLayout();

    expect(layout).toMatch(/<html[^>]*suppressHydrationWarning/);
    expect(layout).toMatch(/<body[^>]*suppressHydrationWarning/);
  });
});
