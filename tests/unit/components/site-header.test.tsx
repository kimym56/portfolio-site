import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SiteHeader } from "@/components/site-header";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
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
});
