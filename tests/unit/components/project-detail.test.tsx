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
    {
      type: "image",
      src: "/images/projects/sellpath_detail2.png",
      alt: "Sellpath chat UI screenshot",
      caption: "Chat UI",
      width: 495,
      height: 846,
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
    const chatUi = within(mediaRegion).getByAltText("Sellpath chat UI screenshot");

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
    expect(mediaRows[2]).toHaveAttribute("data-media-side", "right");
    expect(chatUi.closest("figure")).toHaveAttribute(
      "data-media-orientation",
      "portrait",
    );
    expect(screenshot).toHaveAttribute("src", "/images/projects/sellpath_main.png");
    expect(preview).toHaveAttribute("src", "/videos/projects/mimesis_main.webm");
    expect(chatUi).toHaveAttribute("src", "/images/projects/sellpath_detail2.png");
    expect(preview.tagName).toBe("VIDEO");
    expect(preview).toHaveAttribute("autoplay");
    expect(preview).toHaveAttribute("loop");
    expect((preview as HTMLVideoElement).muted).toBe(true);
    expect(preview).toHaveAttribute("playsinline");
    expect(preview).toHaveAttribute("preload", "auto");
    expect(preview).not.toHaveAttribute("controls");
    expect(within(mediaRegion).getByText("Sales dashboard")).toBeInTheDocument();
    expect(within(mediaRegion).getByText("Interaction preview")).toBeInTheDocument();
    expect(within(mediaRegion).getByText("Chat UI")).toBeInTheDocument();
  });

  it("renders custom project detail sections with a left-starting media rhythm", () => {
    render(
      <ProjectDetail
        project={{
          ...projectWithMedia,
          id: "mimesis",
          title: "Mimesis",
          mediaStartSide: "left",
          media: [
            {
              type: "video",
              src: "/videos/projects/mimesis_page_curl_slide.webm",
              label: "My Mimesis iOS Page Curl slide implementation preview",
              caption: "iOS Page Curl Effect",
              width: 354,
              height: 264,
              referenceMedia: {
                type: "video",
                src: "/videos/projects/mimesis_page_curl.webm",
                ariaLabel: "Original iOS Page Curl reference preview",
                label: "Original",
                width: 600,
                height: 600,
              },
            },
            {
              type: "video",
              src: "/videos/projects/mimesis_wiper_typography_slide.webm",
              label: "My Mimesis Wiper Typography slide implementation preview",
              caption: "Wiper Typography",
              width: 548,
              height: 410,
              referenceMedia: {
                type: "video",
                src: "/videos/projects/mimesis_wiper_typography.webm",
                ariaLabel: "Original Wiper Typography reference preview",
                label: "Original",
                width: 900,
                height: 560,
              },
            },
            {
              type: "video",
              src: "/videos/projects/mimesis_black_white_circle_slide.webm",
              label: "My Mimesis Black & White Circle slide implementation preview",
              caption: "Black & White Circle",
              width: 548,
              height: 410,
              referenceMedia: {
                type: "video",
                src: "/videos/projects/mimesis_black_white_circle.webm",
                ariaLabel: "Original Black & White Circle reference preview",
                label: "Original",
                width: 360,
                height: 640,
              },
            },
          ],
          detailSections: [
            {
              id: "page-curl",
              title: "iOS Page Curl Effect",
              reference: "Page Curl inspiration from the iOS reference.",
              implementation:
                "My Mimesis implementation rebuilds the drag interaction in R3F.",
            },
            {
              id: "wiper-typography",
              title: "Wiper Typography",
              reference: "FFF typography reference by Jongmin Kim.",
              implementation:
                "My Mimesis implementation adds the Tesla driver-view scene.",
            },
            {
              id: "black-white-circle",
              title: "Black & White Circle",
              reference: "Original audio-driven particle reference.",
              implementation:
                "My Mimesis implementation analyzes browser audio output.",
            },
          ],
        }}
        backLabel="Back to side projects"
        visitLabel="Visit project"
        onBack={vi.fn()}
      />,
    );

    const mediaRows = screen.getAllByTestId("project-detail-row");

    expect(mediaRows).toHaveLength(3);
    expect(mediaRows[0]).toHaveAttribute("data-media-side", "left");
    expect(mediaRows[1]).toHaveAttribute("data-media-side", "right");
    expect(mediaRows[2]).toHaveAttribute("data-media-side", "left");
    expect(
      screen.getByRole("heading", { name: "iOS Page Curl Effect" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Wiper Typography" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Black & White Circle" }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Original reference")).toHaveLength(3);
    expect(screen.getAllByText("My Mimesis implementation")).toHaveLength(3);
    expect(
      screen.getByText("My Mimesis implementation rebuilds the drag interaction in R3F."),
    ).toBeInTheDocument();
    const originalPreview = within(mediaRows[0]).getByLabelText(
      "Original iOS Page Curl reference preview",
    );
    const slidePreview = within(mediaRows[0]).getByLabelText(
      "My Mimesis iOS Page Curl slide implementation preview",
    );

    expect(originalPreview).toHaveAttribute(
      "src",
      "/videos/projects/mimesis_page_curl.webm",
    );
    expect(slidePreview).toHaveAttribute(
      "src",
      "/videos/projects/mimesis_page_curl_slide.webm",
    );
    expect(originalPreview.closest("[data-media-role]")).toHaveAttribute(
      "data-media-role",
      "original",
    );
    expect(slidePreview.closest("[data-media-role]")).toHaveAttribute(
      "data-media-role",
      "mimesis",
    );
    expect(originalPreview.tagName).toBe("VIDEO");
    expect(originalPreview).toHaveAttribute("autoplay");
    expect(originalPreview).toHaveAttribute("loop");
    expect((originalPreview as HTMLVideoElement).muted).toBe(true);
    expect(originalPreview).toHaveAttribute("playsinline");
    expect(originalPreview).not.toHaveAttribute("controls");
    expect(slidePreview).toHaveAttribute("autoplay");
    expect(slidePreview).toHaveAttribute("loop");
    expect((slidePreview as HTMLVideoElement).muted).toBe(true);
    expect(slidePreview).toHaveAttribute("playsinline");
    expect(slidePreview).not.toHaveAttribute("controls");
    expect(within(mediaRows[0]).getByText("Original")).toBeInTheDocument();
    expect(within(mediaRows[0]).getByText("My Mimesis")).toBeInTheDocument();
    expect(
      within(mediaRows[0]).getByRole("figure"),
    ).toHaveAttribute("data-media-comparison", "true");
    expect(
      screen.queryByRole("link", { name: /Open My Mimesis/i }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("What This Project Is")).not.toBeInTheDocument();
  });
});
