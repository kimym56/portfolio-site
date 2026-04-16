import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SiteHeader } from "@/components/site-header";

const { usePathnameMock } = vi.hoisted(() => ({
  usePathnameMock: vi.fn(),
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    onClick,
    prefetch,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    prefetch?: boolean;
    [key: string]: unknown;
  }) => {
    void prefetch;

    return (
      <a
        href={href}
        onClick={(event) => {
          onClick?.(event);
          event.preventDefault();
        }}
        {...props}
      >
        {children}
      </a>
    );
  },
}));

vi.mock("next/navigation", () => ({
  usePathname: usePathnameMock,
}));

vi.mock("@/components/theme-toggle", () => ({
  ThemeToggle: () => <button type="button">theme-toggle</button>,
}));

vi.mock("@/components/grid-overlay-toggle", () => ({
  GridOverlayToggle: () => <button type="button">grid-overlay-toggle</button>,
}));

describe("SiteHeader", () => {
  let cookieStore = "";

  beforeEach(() => {
    cookieStore = "";
    usePathnameMock.mockReturnValue("/");

    Object.defineProperty(document, "cookie", {
      configurable: true,
      get() {
        return cookieStore;
      },
      set(value: string) {
        cookieStore = cookieStore ? `${cookieStore}; ${value}` : value;
      },
    });
  });

  afterEach(() => {
    cleanup();
  });

  it("does not render a language toggle", () => {
    render(
      <SiteHeader
        navCopy={{
          home: "Home",
          about: "About Me",
          projects: "Projects",
          contact: "Contact",
        }}
      />,
    );

    expect(screen.queryByLabelText("Language selector")).not.toBeInTheDocument();
    expect(screen.getByText("theme-toggle")).toBeInTheDocument();
    expect(screen.getByText("grid-overlay-toggle")).toBeInTheDocument();
  });

  it("renders YMKim logo copy and uses full-width header layout", () => {
    const { container } = render(
      <SiteHeader
        navCopy={{
          home: "Home",
          about: "About Me",
          projects: "Projects",
          contact: "Contact",
        }}
      />,
    );

    expect(within(container).getByRole("link", { name: "YMKim" })).toBeInTheDocument();

    const header = within(container).getByRole("banner");
    const inner = header.firstElementChild;

    expect(inner).not.toBeNull();
    expect(inner?.className).not.toContain("container");
  });

  it("arms a first visit transition only for unseen non-home destinations", async () => {
    const user = userEvent.setup();

    render(
      <SiteHeader
        navCopy={{
          home: "Home",
          about: "About Me",
          projects: "Projects",
          contact: "Contact",
        }}
      />,
    );

    await user.click(screen.getByRole("link", { name: "About Me" }));

    expect(document.cookie).toContain("ymkim_pending_transition=%2Fabout");
    expect(document.cookie).toContain("ymkim_seen_transitions=page%3Aabout");

    await user.click(screen.getByRole("link", { name: "About Me" }));

    expect(document.cookie.match(/ymkim_pending_transition=/g)).toHaveLength(1);
  });

  it("marks the current route link as the active page", () => {
    usePathnameMock.mockReturnValue("/about");

    render(
      <SiteHeader
        navCopy={{
          home: "Home",
          about: "About Me",
          projects: "Projects",
          contact: "Contact",
        }}
      />,
    );

    expect(screen.getByRole("link", { name: "About Me" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute(
      "aria-current",
    );
  });
});
