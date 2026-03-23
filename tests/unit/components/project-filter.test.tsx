import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ProjectFilter } from "@/components/project-filter";
import type { ProjectItem } from "@/lib/projects";

const projects: ProjectItem[] = [
  {
    id: "sellpath",
    title: "Sellpath",
    role: "Frontend Engineer",
    description: "Frontend work for a production commerce product.",
    type: "work",
    url: "https://example.com/sellpath",
    stack: ["Next.js", "TypeScript"],
    details: {
      summary: "Sellpath summary",
      whatThisProjectIs: "Sellpath overview",
      whatIFocusedOn: "Sellpath focus",
      considerations: "Sellpath considerations",
      meta: ["Type: Work Project"],
    },
  },
  {
    id: "mimesis",
    title: "Mimesis",
    role: "Side Project",
    description: "A side project exploring interface systems.",
    type: "side",
    url: "https://example.com/mimesis",
    stack: ["React", "Motion"],
    details: {
      summary: "Mimesis summary",
      whatThisProjectIs: "Mimesis overview",
      whatIFocusedOn: "Mimesis focus",
      considerations: "Mimesis considerations",
      meta: ["Type: Side Project"],
    },
  },
  {
    id: "website",
    title: "Website",
    role: "Side Project",
    description: "A personal website project.",
    type: "side",
    url: "https://example.com/website",
    stack: ["Next.js", "CSS"],
    details: {
      summary: "Website summary",
      whatThisProjectIs: "Website overview",
      whatIFocusedOn: "Website focus",
      considerations: "Website considerations",
      meta: ["Type: Side Project"],
    },
  },
  {
    id: "design-system-project",
    title: "Design System Project",
    role: "Side Project",
    description: "A reusable component and token system.",
    type: "side",
    url: "https://example.com/design-system",
    stack: ["Storybook", "TypeScript"],
    details: {
      summary: "Design system summary",
      whatThisProjectIs: "Design system overview",
      whatIFocusedOn: "Design system focus",
      considerations: "Design system considerations",
      meta: ["Type: Side Project"],
    },
  },
];

function renderProjectFilter() {
  return render(
    <ProjectFilter
      projects={projects}
      labels={{
        work: "Work Projects",
        side: "Side Projects",
        visit: "Visit project",
      }}
    />,
  );
}

describe("ProjectFilter", () => {
  let cookieStore = "";

  beforeEach(() => {
    cookieStore = "";

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

  it("shows one work project by default and three side projects after toggling", async () => {
    const user = userEvent.setup();

    renderProjectFilter();

    expect(screen.getAllByTestId("project-card")).toHaveLength(1);
    expect(screen.getByText("Sellpath")).toBeInTheDocument();
    expect(screen.queryByText("Mimesis")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Side Projects" }));

    expect(screen.getAllByTestId("project-card")).toHaveLength(3);
    expect(screen.getByText("Mimesis")).toBeInTheDocument();
    expect(screen.getByText("Website")).toBeInTheDocument();
    expect(screen.getByText("Design System Project")).toBeInTheDocument();
  });

  it("opens a project detail view and returns to the selected category list", async () => {
    const user = userEvent.setup();

    renderProjectFilter();

    await user.click(screen.getByRole("button", { name: "Side Projects" }));
    await user.click(screen.getByRole("button", { name: /mimesis/i }));

    expect(screen.getByRole("heading", { name: "Mimesis" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Back to side projects" })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Work Projects" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Side Projects" }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Back to side projects" }));

    expect(screen.getAllByTestId("project-card")).toHaveLength(3);
    expect(screen.getByText("Website")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Side Projects" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("animates the side tab content only the first time it is opened", async () => {
    const user = userEvent.setup();

    renderProjectFilter();

    await user.click(screen.getByRole("button", { name: "Side Projects" }));

    expect(screen.getByTestId("projects-tab-panel")).toHaveAttribute(
      "data-once-reveal",
      "animated",
    );

    await user.click(screen.getByRole("button", { name: "Work Projects" }));
    await user.click(screen.getByRole("button", { name: "Side Projects" }));

    expect(screen.getByTestId("projects-tab-panel")).toHaveAttribute(
      "data-once-reveal",
      "static",
    );
  });

  it("animates each project detail only on first open", async () => {
    const user = userEvent.setup();

    renderProjectFilter();

    await user.click(screen.getByRole("button", { name: "Side Projects" }));
    await user.click(screen.getByRole("button", { name: /mimesis/i }));

    expect(screen.getByTestId("project-detail-panel")).toHaveAttribute(
      "data-once-reveal",
      "animated",
    );

    await user.click(screen.getByRole("button", { name: "Back to side projects" }));
    await user.click(screen.getByRole("button", { name: /mimesis/i }));

    expect(screen.getByTestId("project-detail-panel")).toHaveAttribute(
      "data-once-reveal",
      "static",
    );
  });
});
