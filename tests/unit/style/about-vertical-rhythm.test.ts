import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("about vertical rhythm", () => {
  it("uses the approved rem scale across the about, projects, and contact page intros", () => {
    const cssPath = path.join(process.cwd(), "app", "globals.css");
    const cssContent = fs.readFileSync(cssPath, "utf8");

    expect(cssContent).toMatch(/\.page\s*\{[\s\S]*padding-block:\s*1\.5rem;/);
    expect(cssContent).toMatch(
      /\.about-card\s*\{[\s\S]*padding-block:\s*1\.5rem;[\s\S]*row-gap:\s*0;/,
    );
    expect(cssContent).toMatch(
      /\.projects-card,\s*\n\.contact-card\s*\{[\s\S]*row-gap:\s*0;/,
    );
    expect(cssContent).toMatch(
      /\.projects-card\s*\{[\s\S]*padding-block:\s*1\.5rem;/,
    );
    expect(cssContent).toMatch(
      /\.contact-card\s*\{[\s\S]*padding-block:\s*1\.5rem;/,
    );
    expect(cssContent).toMatch(
      /\.about-card\s*>\s*\.page-title,\s*\n\.projects-card\s*>\s*\.page-title,\s*\n\.contact-card\s*>\s*\.page-title\s*\{[^}]*margin-bottom:\s*1\.5rem;/,
    );
    expect(cssContent).toMatch(
      /\.page-title\s*\{[\s\S]*font-size:\s*3rem;[\s\S]*line-height:\s*var\(--rhythm-title\);/,
    );
    expect(cssContent).not.toMatch(/\.page-title\s*\{[\s\S]*clamp\(/);
    expect(cssContent).toMatch(
      /\.about-card\s*>\s*\.page-subtitle,\s*\n\.projects-card\s*>\s*\.page-subtitle,\s*\n\.contact-card\s*>\s*\.page-subtitle\s*\{[^}]*margin-bottom:\s*1\.5rem;/,
    );
    expect(cssContent).toMatch(/\.about-paragraphs\s*\{[\s\S]*gap:\s*var\(--rhythm-step\);/);
    expect(cssContent).toMatch(/\.about-tech-stack\s*\{[\s\S]*gap:\s*var\(--rhythm-step\);/);
    expect(cssContent).toMatch(/\.about-chip\s*\{[\s\S]*min-height:\s*var\(--rhythm-step\);/);
    expect(cssContent).toMatch(/\.about-chip\s*\{[\s\S]*line-height:\s*var\(--rhythm-step\);/);
    expect(cssContent).toMatch(/\.about-chip\s*\{[\s\S]*padding:\s*0\s+0\.75rem;/);
    expect(cssContent).toMatch(/\.contact-list\s*\{[\s\S]*gap:\s*var\(--rhythm-step\);/);
    expect(cssContent).toMatch(
      /\.contact-link\s*\{[\s\S]*gap:\s*1rem;[\s\S]*min-height:\s*3rem;[\s\S]*padding:\s*0\.75rem 0;/,
    );
  });
});
