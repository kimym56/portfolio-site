import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

function readProjectDetailCss() {
  return fs.readFileSync(
    path.join(process.cwd(), "components", "project-detail.module.css"),
    "utf8",
  );
}

describe("project detail media layout", () => {
  it("uses equal 50/50 desktop columns for alternating media rows", () => {
    const cssContent = readProjectDetailCss();
    const equalColumns = /grid-template-columns:\s*minmax\(0,\s*1fr\)\s*minmax\(0,\s*1fr\);/;

    expect(cssContent).toMatch(
      /\.detailRowWithMedia\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0,\s*1fr\)\s*minmax\(0,\s*1fr\);/,
    );
    expect(cssContent).toMatch(
      /\.detailRowWithMedia\[data-media-side="left"\]\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0,\s*1fr\)\s*minmax\(0,\s*1fr\);/,
    );
    expect(cssContent.match(new RegExp(equalColumns, "g"))).toHaveLength(2);
  });

  it("caps portrait media inside the 50/50 media column", () => {
    const cssContent = readProjectDetailCss();

    expect(cssContent).toMatch(
      /\.mediaCard\[data-media-orientation="portrait"\]\s*\{[\s\S]*?justify-self:\s*center;/,
    );
    expect(cssContent).toMatch(
      /\.mediaCard\[data-media-orientation="portrait"\]\s*\{[\s\S]*?width:\s*min\(100%,\s*24rem\);/,
    );
  });

  it("expands hovered comparison media halves without resizing the outer frame", () => {
    const cssContent = readProjectDetailCss();

    expect(cssContent).toMatch(
      /\.mediaComparisonFrame\s*\{[\s\S]*?display:\s*flex;[\s\S]*?overflow:\s*hidden;[\s\S]*?width:\s*100%;/,
    );
    expect(cssContent).toMatch(
      /\.mediaComparisonPane\s*\{[\s\S]*?flex:\s*1 1 50%;/,
    );
    expect(cssContent).toMatch(
      /@media \(hover:\s*hover\) and \(pointer:\s*fine\)\s*\{[\s\S]*?\.mediaComparisonFrame:hover \.mediaComparisonPane[\s\S]*?flex-basis:\s*0%;[\s\S]*?\.mediaComparisonFrame \.mediaComparisonPane:hover[\s\S]*?flex-basis:\s*100%;/,
    );
    expect(cssContent).toMatch(
      /@media \(prefers-reduced-motion:\s*reduce\)\s*\{[\s\S]*?\.mediaComparisonPane\s*\{[\s\S]*?transition:\s*none;/,
    );
  });
});
