import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AboutPage from "@/app/about/page";
import ContactPage from "@/app/contact/page";
import ProjectsPage from "@/app/projects/page";

describe("inner pages", () => {
  it("does not apply the shared card class to top-level content sections", () => {
    const { container: aboutContainer } = render(<AboutPage />);
    const { container: projectsContainer } = render(<ProjectsPage />);
    const { container: contactContainer } = render(<ContactPage />);

    const aboutSection = aboutContainer.querySelector("section");
    const projectsSection = projectsContainer.querySelector("section");
    const contactSection = contactContainer.querySelector("section");

    expect(aboutSection).not.toBeNull();
    expect(projectsSection).not.toBeNull();
    expect(contactSection).not.toBeNull();

    expect(aboutSection).not.toHaveClass("card");
    expect(projectsSection).not.toHaveClass("card");
    expect(contactSection).not.toHaveClass("card");
  });
});
