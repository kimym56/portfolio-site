import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AboutPage from "@/app/about/page";

describe("AboutPage tech stack", () => {
  it("renders grouped tech stack chips after the description paragraphs in the approved order", () => {
    const { container } = render(<AboutPage />);

    const techStack = screen.getByRole("list", { name: "Tech stack" });
    const chips = within(techStack).getAllByRole("listitem");
    const paragraphs = container.querySelector(".about-paragraphs");

    expect(chips.map((chip) => chip.textContent)).toEqual([
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "MUI",
      "React Native",
      "Framer Motion",
      "Figma",
      "Design Systems",
      "Accessibility",
      "Claude Code",
      "Codex",
      "Gemini",
    ]);

    expect(paragraphs).not.toBeNull();
    expect(
      paragraphs?.compareDocumentPosition(techStack) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();

    expect(chips[0]).toHaveClass(
      "about-chip",
      "about-chip-frontend",
      "about-chip-strong",
    );
    expect(chips[5]).toHaveClass(
      "about-chip",
      "about-chip-frontend",
      "about-chip-soft",
    );
    expect(chips[7]).toHaveClass(
      "about-chip",
      "about-chip-design",
      "about-chip-strong",
    );
    expect(chips[10]).toHaveClass(
      "about-chip",
      "about-chip-ai",
      "about-chip-strong",
    );
    expect(chips[12]).toHaveClass(
      "about-chip",
      "about-chip-ai",
      "about-chip-soft",
    );
  });
});
