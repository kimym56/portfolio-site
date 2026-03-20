import { HeroSplit } from "@/components/hero-split";
import {
  DEFAULT_INTERVAL_MS,
  DEFAULT_TRANSITION_MS,
} from "@/components/rotating-role";
import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
  }: {
    src: string;
    alt: string;
    [key: string]: unknown;
  }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} />;
  },
}));

describe("HeroSplit", () => {
  const copy = {
    roles: [
      "I am a Design Engineer",
      "I am a UX Engineer",
      "I am a Frontend Engineer",
    ],
    profileImages: [
      "/images/profile1.png",
      "/images/profile2.png",
      "/images/profile3.png",
    ],
    name: "YongMin Kim",
    imageAlt: "Portrait image",
  };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("renders a fixed greeting line and keeps the rotating role text below it", () => {
    render(<HeroSplit copy={copy} />);

    const greeting = screen.getByText("Hi :)");
    const heading = screen.getByRole("heading", {
      level: 1,
      name: "I am a Design Engineer",
    });
    const name = screen.getByText("YongMin Kim");

    expect(greeting).toBeInTheDocument();
    expect(heading).toHaveTextContent("I am a Design Engineer");
    expect(name).toBeInTheDocument();
    expect(
      greeting.compareDocumentPosition(heading) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      heading.compareDocumentPosition(name) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("keeps the portrait source in sync with each role change", () => {
    render(<HeroSplit copy={copy} />);

    expect(screen.getByTestId("rotating-role")).toHaveTextContent(
      "I am a Design Engineer",
    );
    expect(screen.getByAltText("Portrait image")).toHaveAttribute(
      "src",
      "/images/profile1.png",
    );

    act(() => {
      vi.advanceTimersByTime(DEFAULT_INTERVAL_MS);
    });

    expect(screen.getByTestId("rotating-role")).toHaveTextContent(
      "I am a UX Engineer",
    );
    expect(screen.getByAltText("Portrait image")).toHaveAttribute(
      "src",
      "/images/profile2.png",
    );
  });

  it("renders the active portrait inside a dedicated image motion layer", () => {
    const { container } = render(<HeroSplit copy={copy} />);

    expect(
      container.querySelector("[data-testid='hero-image-layer']"),
    ).not.toBeNull();
  });

  it("keeps outgoing and incoming hero content mounted through the shared transition window", () => {
    const { container } = render(<HeroSplit copy={copy} />);

    act(() => {
      vi.advanceTimersByTime(DEFAULT_INTERVAL_MS);
    });

    const roleStack = screen.getByTestId("rotating-role-stack");

    expect(roleStack).toHaveTextContent("I am a Design Engineer");
    expect(roleStack).toHaveTextContent("I am a UX Engineer");
    expect(container.querySelectorAll("img")).toHaveLength(2);
  });

  it("cleans up the outgoing layers after the shared crossfade window", () => {
    const { container } = render(<HeroSplit copy={copy} />);

    act(() => {
      vi.advanceTimersByTime(DEFAULT_INTERVAL_MS);
    });

    act(() => {
      vi.advanceTimersByTime(DEFAULT_TRANSITION_MS);
    });

    expect(container.querySelectorAll("img")).toHaveLength(1);
  });

  it("does not render a concealment layer over the portrait corner", () => {
    const { container } = render(<HeroSplit copy={copy} />);

    const concealmentLayer = container.querySelector(
      "[data-testid='hero-image-concealment']",
    );

    expect(concealmentLayer).toBeNull();
  });
});
