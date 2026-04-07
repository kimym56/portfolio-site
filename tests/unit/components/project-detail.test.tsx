import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ProjectDetail } from "@/components/project-detail";
import type { ProjectItem } from "@/lib/projects";

vi.mock("next/image", () => ({
  default: ({
    alt,
    src,
  }: {
    alt: string;
    src: string;
    [key: string]: unknown;
  }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} src={src} />;
  },
}));

const projectWithMedia: ProjectItem = {
  id: "sellpath",
  title: "Sellpath",
  role: "Frontend Engineer",
  description: "Frontend work for a sales product.",
  type: "work",
  url: "https://www.sellpath.ai",
  stack: [{ label: "Next.js", category: "frontend", proficiency: "strong" }],
  media: [
    {
      type: "image",
      src: "/images/projects/sellpath_main.png",
      alt: "Sellpath dashboard screenshot",
      caption: "Sales dashboard",
      width: 1641,
      height: 865,
    },
    {
      type: "video",
      src: "/videos/projects/mimesis_main.webm",
      label: "Mimesis interaction preview",
      caption: "Interaction preview",
    },
  ],
  details: {
    summary: "Sellpath summary",
    whatThisProjectIs: "Sellpath overview",
    whatIFocusedOn: "Sellpath focus",
    considerations: "Sellpath considerations",
    meta: ["Type: Work Project"],
  },
};

describe("ProjectDetail", () => {
  it("renders project images and videos from project media data", () => {
    render(
      <ProjectDetail
        project={projectWithMedia}
        backLabel="Back to work projects"
        visitLabel="Visit project"
        onBack={vi.fn()}
      />,
    );

    const mediaRegion = screen.getByLabelText("Sellpath project details");
    const mediaRows = screen.getAllByTestId("project-detail-row");
    const screenshot = within(mediaRegion).getByAltText("Sellpath dashboard screenshot");
    const preview = within(mediaRegion).getByLabelText("Mimesis interaction preview");

    expect(mediaRows).toHaveLength(4);
    expect(mediaRows[0]).toHaveAttribute("data-media-side", "right");
    expect(mediaRows[1]).toHaveAttribute("data-media-side", "left");
    expect(within(mediaRows[0]).getByText("What This Project Is")).toBeInTheDocument();
    expect(
      within(mediaRows[0]).getByAltText("Sellpath dashboard screenshot"),
    ).toBeInTheDocument();
    expect(within(mediaRows[1]).getByText("What I Focused On")).toBeInTheDocument();
    expect(
      within(mediaRows[1]).getByLabelText("Mimesis interaction preview"),
    ).toBeInTheDocument();
    expect(screenshot).toHaveAttribute("src", "/images/projects/sellpath_main.png");
    expect(preview).toHaveAttribute("src", "/videos/projects/mimesis_main.webm");
    expect(preview.tagName).toBe("VIDEO");
    expect(within(mediaRegion).getByText("Sales dashboard")).toBeInTheDocument();
    expect(within(mediaRegion).getByText("Interaction preview")).toBeInTheDocument();
  });
});
