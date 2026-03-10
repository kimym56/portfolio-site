import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ProjectFilter } from "@/components/project-filter";
import type { ProjectItem } from "@/lib/projects";

const projects: ProjectItem[] = [
  {
    id: "work-1",
    title: "Work Project",
    description: "A production client platform.",
    type: "work",
    url: "https://example.com/work",
    stack: ["Next.js", "TypeScript"],
  },
  {
    id: "side-1",
    title: "Side Project",
    description: "A personal experiment.",
    type: "side",
    url: "https://example.com/side",
    stack: ["React", "Framer Motion"],
  },
];

describe("ProjectFilter", () => {
  it("shows side projects when side tab is clicked", async () => {
    render(
      <ProjectFilter
        projects={projects}
        labels={{
          work: "Work Projects",
          side: "Side Projects",
          visit: "Visit project",
        }}
      />,
    );

    expect(screen.getByText("Work Project")).toBeInTheDocument();
    expect(screen.queryByText("Side Project")).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Side Projects" }));

    expect(screen.getByText("Side Project")).toBeInTheDocument();
    expect(screen.queryByText("Work Project")).not.toBeInTheDocument();
  });
});
