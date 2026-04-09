import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

function readFile(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function readClassBlock(css: string, className: string) {
  const match = css.match(new RegExp(`\\.${className}\\s*\\{([\\s\\S]*?)\\}`));

  if (!match) {
    throw new Error(`Missing CSS class block: .${className}`);
  }

  return match[1];
}

describe("button radius alignment", () => {
  it("uses a minimal semantic radius token scale across current shapes", () => {
    const globalsCss = readFile("app/globals.css");
    const heroCss = readFile("components/hero-split.module.css");
    const themeToggleCss = readFile("components/theme-toggle.module.css");
    const siteHeaderCss = readFile("components/site-header.module.css");
    const projectFilterCss = readFile("components/project-filter.module.css");
    const projectGridCss = readFile("components/project-grid.module.css");
    const projectDetailCss = readFile("components/project-detail.module.css");
    const togglesBlock = readClassBlock(projectFilterCss, "toggles");
    const indicatorTrackBlock = readClassBlock(projectFilterCss, "indicatorTrack");
    const toggleBlock = readClassBlock(projectFilterCss, "toggle");
    const cardButtonBlock = readClassBlock(projectGridCss, "cardButton");
    const actionBlock = readClassBlock(projectGridCss, "action");
    const visitLinkBlock = readClassBlock(projectDetailCss, "visitLink");
    const backButtonBlock = readClassBlock(projectDetailCss, "backButton");

    expect(globalsCss).toMatch(/--radius-md:\s*14px;/);
    expect(globalsCss).toMatch(/--radius-lg:\s*18px;/);
    expect(globalsCss).toMatch(/--radius-full:\s*999px;/);
    expect(globalsCss).toMatch(/\.card\s*\{[\s\S]*?border-radius:\s*var\(--radius-lg\);/);
    expect(globalsCss).not.toMatch(/--control-radius:/);
    expect(heroCss).toMatch(/border-radius:\s*var\(--radius-md\);/);
    expect(themeToggleCss).toMatch(/border-radius:\s*var\(--radius-md\);/);
    expect(siteHeaderCss).toMatch(/\.navLink\s*\{[\s\S]*?border-radius:\s*var\(--radius-md\);/);
    expect(togglesBlock).not.toMatch(/\bborder-radius\s*:/);
    expect(indicatorTrackBlock).not.toMatch(/\bborder-radius\s*:/);
    expect(toggleBlock).not.toMatch(/\bborder-radius\s*:/);
    expect(cardButtonBlock).not.toMatch(/\bborder-radius\s*:/);
    expect(actionBlock).not.toMatch(/\bborder-radius\s*:/);
    expect(visitLinkBlock).not.toMatch(/\bborder-radius\s*:/);
    expect(backButtonBlock).not.toMatch(/\bborder-radius\s*:/);
  });

  it("keeps project detail rows borderless instead of section cards", () => {
    const projectDetailCss = readFile("components/project-detail.module.css");
    const detailRowBlock = readClassBlock(projectDetailCss, "detailRow");
    const headerBlock = readClassBlock(projectDetailCss, "header");

    expect(detailRowBlock).not.toMatch(/\bbackground\s*:/);
    expect(detailRowBlock).not.toMatch(/\bborder\s*:/);
    expect(detailRowBlock).not.toMatch(/\bborder-radius\s*:/);
    expect(detailRowBlock).not.toMatch(/\bpadding\s*:/);
    expect(headerBlock).not.toMatch(/\bborder-bottom\s*:/);
  });
});
