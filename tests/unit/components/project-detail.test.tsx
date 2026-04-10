import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
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

const mockIntersectionObservers: MockIntersectionObserver[] = [];

class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  elements = new Set<Element>();

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    mockIntersectionObservers.push(this);
  }

  disconnect = vi.fn(() => {
    this.elements.clear();
  });

  observe = vi.fn((element: Element) => {
    this.elements.add(element);
  });

  takeRecords = vi.fn(() => []);

  trigger(target: Element, intersectionRatio: number) {
    this.callback(
      [
        {
          intersectionRatio,
          isIntersecting: intersectionRatio > 0,
          target,
        } as IntersectionObserverEntry,
      ],
      this as unknown as IntersectionObserver,
    );
  }

  unobserve = vi.fn((element: Element) => {
    this.elements.delete(element);
  });
}

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
  beforeEach(() => {
    mockIntersectionObservers.length = 0;
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
    vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
    vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

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
    expect(screen.queryByText("Summary")).not.toBeInTheDocument();
    const headerTitleRow = screen.getByTestId("project-detail-header-title-row");

    expect(
      within(headerTitleRow).getByRole("button", { name: "Back to work projects" }),
    ).toBeInTheDocument();
    expect(within(headerTitleRow).getByRole("heading", { name: "Sellpath" })).toBeInTheDocument();
    expect(within(headerTitleRow).queryByText("Frontend Engineer")).not.toBeInTheDocument();
    expect(screen.getByTestId("project-detail-header-role")).toHaveTextContent(
      "Frontend Engineer",
    );
  });

  it("reveals detail rows as they scroll into view", async () => {
    render(
      <ProjectDetail
        project={projectWithMedia}
        backLabel="Back to work projects"
        visitLabel="Visit project"
        onBack={vi.fn()}
      />,
    );

    const mediaRows = screen.getAllByTestId("project-detail-row");

    expect(mediaRows[0]).toHaveAttribute("data-row-visibility", "hidden");
    expect(mediaRows[1]).toHaveAttribute("data-row-visibility", "hidden");
    expect(mockIntersectionObservers).toHaveLength(1);

    mockIntersectionObservers[0].trigger(mediaRows[1], 0.7);

    await waitFor(() => {
      expect(mediaRows[0]).toHaveAttribute("data-row-visibility", "hidden");
      expect(mediaRows[1]).toHaveAttribute("data-row-visibility", "visible");
    });
  });

  it("opens a larger overlay when a standalone image is clicked", async () => {
    const user = userEvent.setup();

    render(
      <ProjectDetail
        project={projectWithMedia}
        backLabel="Back to work projects"
        visitLabel="Visit project"
        onBack={vi.fn()}
      />,
    );

    await user.click(
      screen.getByRole("button", {
        name: "View larger image: Sellpath dashboard screenshot",
      }),
    );

    const dialog = screen.getByRole("dialog", { name: "Expanded project image" });
    const closeButton = within(dialog).getByRole("button", {
      name: "Close image preview",
    });

    expect(dialog).toBeInTheDocument();
    expect(dialog.parentElement).toBe(document.body);
    expect(closeButton).toHaveFocus();
    expect(within(dialog).getByAltText("Sellpath dashboard screenshot")).toHaveAttribute(
      "src",
      "/images/projects/sellpath_main.png",
    );
    expect(within(dialog).queryByText("Sales dashboard")).not.toBeInTheDocument();

    await user.tab();

    expect(closeButton).toHaveFocus();

    await user.click(dialog);

    expect(screen.queryByRole("dialog", { name: "Expanded project image" })).not.toBeInTheDocument();
  });

  it("renders custom project detail sections with a left-starting media rhythm", async () => {
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
              src: "/videos/projects/mimesis_page_curl_mimesis.mp4",
              label: "My Mimesis iOS Page Curl implementation preview",
              caption: "iOS Page Curl Effect",
              width: 548,
              height: 548,
              referenceMedia: {
                type: "video",
                src: "/videos/projects/mimesis_page_curl_original.mp4",
                ariaLabel: "Original iOS Page Curl reference preview",
                label: "Original",
                width: 548,
                height: 548,
              },
            },
            {
              type: "video",
              src: "/videos/projects/mimesis_wiper_typography_mimesis.mp4",
              label: "My Mimesis Wiper Typography implementation preview",
              caption: "Wiper Typography",
              width: 548,
              height: 548,
              referenceMedia: {
                type: "video",
                src: "/videos/projects/mimesis_wiper_typography_original.mp4",
                ariaLabel: "Original Wiper Typography reference preview",
                label: "Original",
                width: 548,
                height: 548,
              },
            },
            {
              type: "video",
              src: "/videos/projects/mimesis_black_white_circle_mimesis.mp4",
              label: "My Mimesis Black & White Circle implementation preview",
              caption: "Black & White Circle",
              width: 548,
              height: 548,
              referenceMedia: {
                type: "video",
                src: "/videos/projects/mimesis_black_white_circle_original.mp4",
                ariaLabel: "Original Black & White Circle reference preview",
                label: "Original",
                width: 548,
                height: 548,
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
    const comparisonFigures = mediaRows.map((row) => within(row).getByRole("figure"));

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
    const originalPreview = within(mediaRows[0])
      .getAllByLabelText("Original iOS Page Curl reference preview")
      .find((element) => element.tagName === "VIDEO");
    const mimesisPreview = within(mediaRows[0]).getByLabelText(
      "My Mimesis iOS Page Curl implementation preview",
    );

    expect(originalPreview).toBeDefined();
    const originalPreviewElement = originalPreview as HTMLVideoElement;

    expect(originalPreviewElement).toHaveAttribute(
      "src",
      "/videos/projects/mimesis_page_curl_original.mp4",
    );
    expect(mimesisPreview).toHaveAttribute(
      "src",
      "/videos/projects/mimesis_page_curl_mimesis.mp4",
    );
    expect(originalPreviewElement.closest("[data-media-role]")).toHaveAttribute(
      "data-media-role",
      "original",
    );
    expect(mimesisPreview.closest("[data-media-role]")).toHaveAttribute(
      "data-media-role",
      "mimesis",
    );
    expect(originalPreviewElement.tagName).toBe("VIDEO");
    expect(mimesisPreview.tagName).toBe("VIDEO");
    expect(within(mediaRows[0]).getByText("Original")).toBeInTheDocument();
    expect(within(mediaRows[0]).getByText("My Mimesis")).toBeInTheDocument();
    expect(mediaRows[0].querySelector("[data-media-role='original']")).not.toHaveAttribute(
      "tabindex",
    );
    expect(mediaRows[0].querySelector("[data-media-role='mimesis']")).not.toHaveAttribute(
      "tabindex",
    );
    expect(
      within(mediaRows[0]).getByRole("figure"),
    ).toHaveAttribute("data-media-comparison", "true");
    expect(comparisonFigures[0]).toHaveAttribute("data-playback-state", "idle");
    expect(comparisonFigures[1]).toHaveAttribute("data-playback-state", "idle");
    expect(comparisonFigures[2]).toHaveAttribute("data-playback-state", "idle");
    expect(mockIntersectionObservers).toHaveLength(2);

    mockIntersectionObservers[1].trigger(comparisonFigures[1], 0.8);

    await waitFor(() => {
      expect(comparisonFigures[0]).toHaveAttribute("data-playback-state", "idle");
      expect(comparisonFigures[1]).toHaveAttribute("data-playback-state", "active");
      expect(comparisonFigures[2]).toHaveAttribute("data-playback-state", "idle");
    });

    const secondRowVideoElements = comparisonFigures[1].querySelectorAll("video");
    const firstRowVideoElements = comparisonFigures[0].querySelectorAll("video");

    expect(secondRowVideoElements).toHaveLength(2);
    expect(firstRowVideoElements).toHaveLength(2);
    expect(secondRowVideoElements[0]).toHaveAttribute("preload", "auto");
    expect(secondRowVideoElements[1]).toHaveAttribute("preload", "auto");
    expect(firstRowVideoElements[0]).toHaveAttribute("preload", "metadata");
    expect(firstRowVideoElements[1]).toHaveAttribute("preload", "metadata");
    expect(
      screen.queryByRole("link", { name: /Open My Mimesis/i }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("What This Project Is")).not.toBeInTheDocument();
  });
});
