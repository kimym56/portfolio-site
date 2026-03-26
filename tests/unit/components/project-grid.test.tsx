import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ProjectGrid } from "@/components/project-grid";
import type { ProjectItem } from "@/lib/projects";

const projects: ProjectItem[] = [
  {
    id: "sellpath",
    title: "Sellpath",
    role: "Frontend Engineer",
    description: "Frontend work for a production commerce product.",
    type: "work",
    url: "https://example.com/sellpath",
    stack: [
      { label: "React", category: "frontend", proficiency: "strong" },
      { label: "Next.js", category: "frontend", proficiency: "strong" },
      { label: "TypeScript", category: "frontend", proficiency: "strong" },
    ],
    details: {
      summary: "Sellpath summary",
      whatThisProjectIs: "Sellpath overview",
      whatIFocusedOn: "Sellpath focus",
      considerations: "Sellpath considerations",
      meta: ["Type: Work Project"],
    },
  },
  {
    id: "website",
    title: "Website",
    role: "Side Project",
    description: "A personal website project.",
    type: "side",
    url: "https://example.com/website",
    stack: [
      { label: "Next.js", category: "frontend", proficiency: "strong" },
      { label: "CSS", category: "design", proficiency: "soft" },
    ],
    details: {
      summary: "Website summary",
      whatThisProjectIs: "Website overview",
      whatIFocusedOn: "Website focus",
      considerations: "Website considerations",
      meta: ["Type: Side Project"],
    },
  },
];

describe("ProjectGrid", () => {
  it("renders tech items as chips and removes the Open label", () => {
    render(<ProjectGrid projects={projects} onSelect={vi.fn()} />);
    const sellpathCard = screen.getAllByTestId("project-card")[0];

    expect(screen.getByText("Sellpath")).toBeInTheDocument();
    expect(screen.getByText("Frontend Engineer")).toBeInTheDocument();
    expect(screen.queryByText("Open")).not.toBeInTheDocument();
    expect(within(sellpathCard).getByText("React")).toHaveClass(
      "about-chip",
      "about-chip-frontend",
      "about-chip-strong",
    );
    expect(within(sellpathCard).getByText("Next.js")).toHaveClass(
      "about-chip",
      "about-chip-frontend",
      "about-chip-strong",
    );
    expect(within(sellpathCard).getByText("TypeScript")).toHaveClass(
      "about-chip",
      "about-chip-frontend",
      "about-chip-strong",
    );
  });

  it("renders directional stagger metadata when animation is enabled", () => {
    render(
      <ProjectGrid
        projects={projects}
        revealDirection="forward"
        shouldAnimate
        onSelect={vi.fn()}
      />,
    );

    const cards = screen.getAllByTestId("project-card");

    expect(cards[0]).toHaveAttribute("data-reveal-direction", "forward");
    expect(cards[0]).toHaveAttribute("data-stagger-index", "0");
    expect(cards[1]).toHaveAttribute("data-reveal-direction", "forward");
    expect(cards[1]).toHaveAttribute("data-stagger-index", "1");
  });
});
