import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SiteHeader } from "@/components/site-header";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/components/theme-toggle", () => ({
  ThemeToggle: () => <button type="button">theme-toggle</button>,
}));

describe("SiteHeader", () => {
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
});
