import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ThemeToggle } from "@/components/theme-toggle";

describe("ThemeToggle", () => {
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

    document.documentElement.dataset.theme = "light";
  });

  it("renders an icon-only button with an accessible label", () => {
    render(<ThemeToggle />);

    const button = screen.getByRole("button", { name: "Toggle color theme" });

    expect(button).toBeInTheDocument();
    expect(button.textContent?.trim()).toBe("");
    expect(button.querySelector("svg")).not.toBeNull();
  });

  it("toggles the document theme and persists it", async () => {
    const user = userEvent.setup();

    render(<ThemeToggle />);

    const button = screen.getByRole("button", { name: "Toggle color theme" });

    await user.click(button);
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(window.localStorage.getItem("site_theme")).toBe("dark");

    await user.click(button);
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(window.localStorage.getItem("site_theme")).toBe("light");
  });
});
