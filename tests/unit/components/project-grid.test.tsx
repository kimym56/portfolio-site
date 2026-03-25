import { render, screen } from "@testing-library/react";
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
];

describe("ProjectGrid", () => {
  it("renders tech items as chips and removes the Open label", () => {
    render(<ProjectGrid projects={projects} onSelect={vi.fn()} />);

    expect(screen.getByText("Sellpath")).toBeInTheDocument();
    expect(screen.getByText("Frontend Engineer")).toBeInTheDocument();
    expect(screen.queryByText("Open")).not.toBeInTheDocument();
    expect(screen.getByText("React")).toHaveClass(
      "about-chip",
      "about-chip-frontend",
      "about-chip-strong",
    );
    expect(screen.getByText("Next.js")).toHaveClass(
      "about-chip",
      "about-chip-frontend",
      "about-chip-strong",
    );
    expect(screen.getByText("TypeScript")).toHaveClass(
      "about-chip",
      "about-chip-frontend",
      "about-chip-strong",
    );
  });
});
