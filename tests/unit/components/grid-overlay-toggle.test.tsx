import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { GridOverlayToggle } from "@/components/grid-overlay-toggle";

describe("GridOverlayToggle", () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    const storage = new Map<string, string>();

    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: {
        getItem: (key: string) => storage.get(key) ?? null,
        setItem: (key: string, value: string) => {
          storage.set(key, value);
        },
      },
    });

    document.documentElement.dataset.gridOverlay = "hidden";
  });

  it("renders an accessible pressed-state button", () => {
    render(<GridOverlayToggle />);

    const button = screen.getByRole("button", { name: "Toggle grid overlay" });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("toggles the grid overlay visibility and persists it", async () => {
    const user = userEvent.setup();

    render(<GridOverlayToggle />);

    const button = screen.getByRole("button", { name: "Toggle grid overlay" });

    await user.click(button);
    expect(document.documentElement.dataset.gridOverlay).toBe("visible");
    expect(window.localStorage.getItem("site_grid_overlay")).toBe("visible");
    expect(button).toHaveAttribute("aria-pressed", "true");

    await user.click(button);
    expect(document.documentElement.dataset.gridOverlay).toBe("hidden");
    expect(window.localStorage.getItem("site_grid_overlay")).toBe("hidden");
    expect(button).toHaveAttribute("aria-pressed", "false");
  });
});
