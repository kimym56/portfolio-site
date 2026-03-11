import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HeroSplit } from "@/components/hero-split";

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
  it("renders a fixed greeting line and keeps the rotating role text below it", () => {
    render(
      <HeroSplit
        copy={{
          roles: ["I am a Design Engineer", "I am a UX Engineer"],
          name: "YongMin Kim",
          imageAlt: "Portrait image",
        }}
      />,
    );

    const greeting = screen.getByText("Hi :)");
    const heading = screen.getByRole("heading", { level: 1, name: "I am a Design Engineer" });
    const name = screen.getByText("YongMin Kim");

    expect(greeting).toBeInTheDocument();
    expect(heading).toHaveTextContent("I am a Design Engineer");
    expect(name).toBeInTheDocument();
    expect(greeting.compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(heading.compareDocumentPosition(name) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});
