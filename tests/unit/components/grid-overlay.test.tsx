import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import GridOverlay from "@/components/grid-overlay";

describe("GridOverlay", () => {
  it("renders a fixed non-interactive overlay that uses the canonical layout frame", () => {
    const { container } = render(<GridOverlay />);

    const overlay = container.firstElementChild;
    expect(overlay).toBeInstanceOf(HTMLDivElement);
    expect(overlay).toHaveAttribute("aria-hidden", "true");
    expect(overlay).toHaveClass("grid-overlay");
    expect(overlay).toHaveStyle({
      position: "fixed",
      pointerEvents: "none",
      zIndex: "9999",
      display: "flex",
      justifyContent: "center",
    });

    const grid = overlay?.firstElementChild;
    expect(grid).toBeInstanceOf(HTMLDivElement);
    expect(grid).toHaveClass("layout-frame");
    expect(grid?.getAttribute("style")).toContain("height: 100%;");
    expect(grid?.getAttribute("style")).toContain("position: relative;");

    const horizontalGuides = grid?.querySelector('[data-grid-overlay="rows"]');
    expect(horizontalGuides).toBeInstanceOf(HTMLDivElement);
    expect(horizontalGuides).toHaveStyle({
      position: "absolute",
      inset: "0",
      backgroundImage:
        "repeating-linear-gradient(to bottom, rgba(255, 0, 0, 0.2) 0, rgba(255, 0, 0, 0.2) 0.0625rem, transparent 0.0625rem, transparent 1.5rem)",
    });

    const columns = Array.from(
      grid?.querySelectorAll('[data-grid-overlay="column"]') ?? [],
    );
    expect(columns).toHaveLength(12);

    for (const column of columns) {
      expect(column).toHaveStyle({
        background: "rgba(255, 0, 0, 0.08)",
        borderLeft: "0.0625rem solid rgba(255, 0, 0, 0.2)",
        borderRight: "0.0625rem solid rgba(255, 0, 0, 0.2)",
        height: "100%",
      });
    }
  });
});
