import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeToggle } from "@/components/theme-toggle";

const originalWindow = globalThis.window;

function setWindowValue(value: Window | undefined) {
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    writable: true,
    value,
  });
}

describe("ThemeToggle hydration consistency", () => {
  afterEach(() => {
    setWindowValue(originalWindow);
  });

  it("renders the same initial markup on server and client", () => {
    setWindowValue(undefined);
    const serverMarkup = renderToString(<ThemeToggle />);

    const clientWindow = {
      localStorage: {
        getItem: () => "dark",
      },
    } as unknown as Window;

    setWindowValue(clientWindow);
    const clientMarkup = renderToString(<ThemeToggle />);

    expect(clientMarkup).toBe(serverMarkup);
  });
});
