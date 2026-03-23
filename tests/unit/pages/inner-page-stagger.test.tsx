import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AboutPageContent } from "@/components/about-page-content";
import { ContactPageContent } from "@/components/contact-page-content";
import { ProjectsPageContent } from "@/components/projects-page-content";

describe("inner page stagger sequence", () => {
  it("marks the About page reveal order explicitly", () => {
    const { container } = render(<AboutPageContent />);

    expect(screen.getByRole("heading", { name: "About Me" })).toHaveClass(
      "page-stagger",
      "page-stagger-0",
    );
    expect(screen.getByText("YongMin Kim, based in Seoul, South Korea.")).toHaveClass(
      "page-stagger",
      "page-stagger-1",
    );
    expect(container.querySelector(".about-paragraphs")).toHaveClass(
      "page-stagger",
      "page-stagger-2",
    );
    expect(screen.getByRole("group", { name: "Tech stack" })).toHaveClass(
      "page-stagger",
      "page-stagger-3",
    );
  });

  it("marks the Projects page reveal order explicitly", () => {
    const { container } = render(<ProjectsPageContent />);

    expect(screen.getByRole("heading", { name: "Projects" })).toHaveClass(
      "page-stagger",
      "page-stagger-0",
    );
    expect(
      screen.getByText("Selected work and side projects with direct links to live products."),
    ).toHaveClass("page-stagger", "page-stagger-1");
    expect(container.querySelector(".page-reveal-body")).toHaveClass(
      "page-stagger",
      "page-stagger-2",
    );
  });

  it("marks the Contact page reveal order explicitly", () => {
    const { container } = render(<ContactPageContent />);

    expect(screen.getByRole("heading", { name: "Contact" })).toHaveClass(
      "page-stagger",
      "page-stagger-0",
    );
    expect(
      screen.getByText("Feel free to reach out through any channel below."),
    ).toHaveClass(
      "page-stagger",
      "page-stagger-1",
    );
    expect(container.querySelector(".contact-list")).toHaveClass(
      "page-stagger",
      "page-stagger-2",
    );
  });
});
