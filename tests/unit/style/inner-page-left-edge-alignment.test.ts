import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("inner page left edge alignment", () => {
  it("moves the about, projects, and contact sections directly onto the canonical frame", () => {
    const globalsPath = path.join(process.cwd(), "app", "globals.css");
    const aboutPath = path.join(process.cwd(), "components", "about-page-content.tsx");
    const projectsPath = path.join(
      process.cwd(),
      "components",
      "projects-page-content.tsx",
    );
    const contactPath = path.join(
      process.cwd(),
      "components",
      "contact-page-content.tsx",
    );

    const globalsContent = fs.readFileSync(globalsPath, "utf8");
    const aboutContent = fs.readFileSync(aboutPath, "utf8");
    const projectsContent = fs.readFileSync(projectsPath, "utf8");
    const contactContent = fs.readFileSync(contactPath, "utf8");

    for (const content of [aboutContent, projectsContent, contactContent]) {
      expect(content).toContain('className="page"');
      expect(content).not.toContain("layout-shell");
      expect(content).not.toContain("layout-grid");
    }

    expect(aboutContent).toContain('className="about-card layout-frame"');
    expect(projectsContent).toContain('className="projects-card layout-frame"');
    expect(contactContent).toContain('className="contact-card layout-frame"');

    expect(globalsContent).toMatch(
      /\.page-reveal-body\s*\{[\s\S]*grid-column:\s*1\s*\/\s*-1;[\s\S]*grid-template-columns:\s*subgrid;/,
    );
    expect(globalsContent).toMatch(
      /\.about-card\s*>\s*\.page-title[\s\S]*grid-column:\s*1\s*\/\s*span\s*6;/,
    );
    expect(globalsContent).toMatch(
      /\.about-card\s*>\s*\.page-subtitle[\s\S]*grid-column:\s*1\s*\/\s*span\s*7;/,
    );
  });
});
