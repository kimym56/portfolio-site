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
    stack: [
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
    id: "mimesis",
    title: "Mimesis",
    role: "Side Project",
    description: "A side project exploring interface systems.",
    type: "side",
    url: "https://example.com/mimesis",
    stack: [
      { label: "React", category: "frontend", proficiency: "strong" },
      { label: "Motion", category: "design", proficiency: "soft" },
    ],
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
  {
    id: "dsskills",
    title: "DSSkills",
    role: "Side Project",
    description: "A design-system generation sandbox.",
    type: "side",
    url: "https://ymkim-dsskills.vercel.app",
    stack: [
      { label: "TypeScript", category: "frontend", proficiency: "strong" },
      { label: "OpenAI API", category: "ai", proficiency: "strong" },
    ],
    details: {
      summary: "DSSkills summary",
      whatThisProjectIs: "DSSkills overview",
      whatIFocusedOn: "DSSkills focus",
      considerations: "DSSkills considerations",
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
    expect(screen.getByText("DSSkills")).toBeInTheDocument();
  });

  it("opens a project detail view and returns to the selected category list", async () => {
    const user = userEvent.setup();

    renderProjectFilter();

    await user.click(screen.getByRole("button", { name: "Side Projects" }));
    await user.click(screen.getByRole("button", { name: /mimesis/i }));

    expect(screen.getByTestId("project-filter")).toHaveAttribute("data-view", "detail");
    expect(screen.getByRole("heading", { name: "Mimesis" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Back to side projects" })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Work Projects" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Side Projects" }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Back to side projects" }));

    expect(screen.getByTestId("project-filter")).toHaveAttribute("data-view", "list");
    expect(screen.getAllByTestId("project-card")).toHaveLength(3);
    expect(screen.getByText("Website")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Side Projects" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("animates the tab content on every category switch", async () => {
    const user = userEvent.setup();

    renderProjectFilter();

    await user.click(screen.getByRole("button", { name: "Side Projects" }));

    expect(screen.getByTestId("projects-tab-panel")).toHaveAttribute(
      "data-once-reveal",
      "animated",
    );

    await user.click(screen.getByRole("button", { name: "Work Projects" }));

    expect(screen.getByTestId("projects-tab-panel")).toHaveAttribute(
      "data-once-reveal",
      "animated",
    );

    await user.click(screen.getByRole("button", { name: "Side Projects" }));

    expect(screen.getByTestId("projects-tab-panel")).toHaveAttribute(
      "data-once-reveal",
      "animated",
    );
  });

  it("passes forward and backward reveal directions on tab switches", async () => {
    const user = userEvent.setup();

    renderProjectFilter();

    await user.click(screen.getByRole("button", { name: "Side Projects" }));

    expect(screen.getAllByTestId("project-card")[0]).toHaveAttribute(
      "data-reveal-direction",
      "forward",
    );

    await user.click(screen.getByRole("button", { name: "Work Projects" }));

    expect(screen.getByTestId("project-card")).toHaveAttribute(
      "data-reveal-direction",
      "backward",
    );
  });

  it("renders an active indicator that follows the selected category", async () => {
    const user = userEvent.setup();

    renderProjectFilter();

    const toggleGroup = screen.getByRole("group", { name: "Project types" });
    const workButton = screen.getByRole("button", { name: "Work Projects" });
    const sideButton = screen.getByRole("button", { name: "Side Projects" });
    const indicator = screen.getByTestId("projects-toggle-indicator");

    expect(workButton).toHaveAttribute("aria-pressed", "true");
    expect(sideButton).toHaveAttribute("aria-pressed", "false");
    expect(indicator).toHaveAttribute("data-active-tab", "work");
    expect(toggleGroup).toContainElement(indicator);
    expect(workButton.contains(indicator)).toBe(false);
    expect(sideButton.contains(indicator)).toBe(false);

    await user.click(sideButton);

    expect(workButton).toHaveAttribute("aria-pressed", "false");
    expect(sideButton).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByTestId("projects-toggle-indicator")).toHaveAttribute(
      "data-active-tab",
      "side",
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
