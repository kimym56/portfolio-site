import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

function readRootLayout() {
  return fs.readFileSync(path.join(process.cwd(), "app", "layout.tsx"), "utf8");
}

describe("root layout grid overlay", () => {
  it("renders the GridOverlay globally from the root layout", () => {
    const layout = readRootLayout();

    expect(layout).toContain('import GridOverlay from "@/components/grid-overlay";');
    expect(layout).toContain(
      'import { GRID_OVERLAY_STORAGE_KEY } from "@/lib/grid-overlay";',
    );
    expect(layout).toMatch(/<GridOverlay\s*\/>\s*<div className="site-shell">/);
    expect(layout).toContain(
      'window.localStorage.getItem("${GRID_OVERLAY_STORAGE_KEY}")',
    );
    expect(layout).toContain("document.documentElement.dataset.gridOverlay");
  });
});
