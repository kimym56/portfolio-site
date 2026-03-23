import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AboutPage from "@/app/about/page";

describe("AboutPage tech stack", () => {
  it("renders three category rows after the description paragraphs", () => {
    const { container } = render(<AboutPage />);

    const techStack = screen.getByRole("group", { name: "Tech stack" });
    const paragraphs = container.querySelector(".about-paragraphs");
    const frontendRow = screen.getByRole("list", { name: "Frontend tech stack" });
    const designRow = screen.getByRole("list", { name: "Design tech stack" });
    const aiRow = screen.getByRole("list", { name: "AI tech stack" });
    const frontendChips = within(frontendRow).getAllByRole("listitem");
    const designChips = within(designRow).getAllByRole("listitem");
    const aiChips = within(aiRow).getAllByRole("listitem");

    expect(within(techStack).getAllByRole("list")).toHaveLength(3);

    expect(frontendChips.map((chip) => chip.textContent)).toEqual([
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "MUI",
      "React Native",
      "WebGL",
    ]);
    expect(designChips.map((chip) => chip.textContent)).toEqual([
      "Figma",
      "v0",
      "Design Systems",
      "Stitch",
      "Accessibility",
    ]);
    expect(aiChips.map((chip) => chip.textContent)).toEqual([
      "Claude Code",
      "Codex",
      "Gemini",
    ]);

    expect(paragraphs).not.toBeNull();
    expect(
      paragraphs!.compareDocumentPosition(techStack) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();

    expect(frontendChips[0]!).toHaveClass(
      "about-chip",
      "about-chip-frontend",
      "about-chip-strong",
    );
    expect(frontendChips[5]!).toHaveClass(
      "about-chip",
      "about-chip-frontend",
      "about-chip-soft",
    );
    expect(designChips[0]!).toHaveClass(
      "about-chip",
      "about-chip-design",
      "about-chip-strong",
    );
    expect(aiChips[0]!).toHaveClass(
      "about-chip",
      "about-chip-ai",
      "about-chip-strong",
    );
    expect(aiChips[2]!).toHaveClass(
      "about-chip",
      "about-chip-ai",
      "about-chip-strong",
    );
  });
});
