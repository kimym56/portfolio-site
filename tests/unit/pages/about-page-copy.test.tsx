import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AboutPage from "@/app/about/page";

describe("AboutPage copy", () => {
  it("renders the updated subtitle and summary paragraphs", () => {
    render(<AboutPage />);

    expect(screen.getByRole("heading", { name: "About Me" })).toBeInTheDocument();
    expect(
      screen.getByText(
        "A developer interested in UX/HCI, thoughtful interfaces, and design engineering.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "I'm a developer with a strong interest in UX and HCI, and I care about building products that are both useful and intuitive.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Recently, I've become especially interested in design engineering: the space between design and frontend development where thoughtful interaction, visual polish, and implementation quality come together.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "I enjoy creating interfaces that are clear, usable, and built with long-term maintainability in mind.",
      ),
    ).toBeInTheDocument();
  });
});
