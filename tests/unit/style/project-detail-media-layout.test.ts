import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

function readCss(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function readProjectDetailCss() {
  return readCss("components/project-detail.module.css");
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
      /\.mediaCard\[data-media-orientation="portrait"\]\s*\{[\s\S]*?width:\s*min\(100%,\s*26rem\);/,
    );
    expect(cssContent).toMatch(
      /\.detailRowWithMedia\[data-media-side="right"\]\s*\.mediaCard\[data-media-orientation="portrait"\]\s*\{[\s\S]*?justify-self:\s*start;/,
    );
    expect(cssContent).toMatch(
      /\.detailRowWithMedia\[data-media-side="left"\]\s*\.mediaCard\[data-media-orientation="portrait"\]\s*\{[\s\S]*?justify-self:\s*end;/,
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

  it("fills both comparison halves with media content", () => {
    const cssContent = readProjectDetailCss();

    expect(cssContent).toMatch(
      /\.mediaComparisonImage,\s*\n\.mediaComparisonVideo\s*\{[\s\S]*?height:\s*100%;[\s\S]*?object-fit:\s*cover;[\s\S]*?width:\s*100%;/,
    );
  });

  it("uses a bounded centered modal panel for expanded images instead of viewport-height sizing", () => {
    const cssContent = readProjectDetailCss();

    expect(cssContent).toMatch(
      /\.lightbox\s*\{[\s\S]*?overscroll-behavior:\s*contain;/,
    );
    expect(cssContent).toMatch(
      /\.lightboxContent\s*\{[\s\S]*?background:\s*transparent;/,
    );
    expect(cssContent).toMatch(
      /\.lightboxContent\s*\{[\s\S]*?position:\s*relative;/,
    );
    expect(cssContent).toMatch(
      /\.lightboxContent\s*\{[\s\S]*?padding:\s*0;/,
    );
    expect(cssContent).toMatch(
      /\.lightboxContent\s*\{[\s\S]*?max-width:\s*min\(90vw,\s*76rem\);/,
    );
    expect(cssContent).toMatch(
      /\.lightboxImage\s*\{[\s\S]*?max-height:\s*min\(78vh,\s*46rem\);/,
    );
    expect(cssContent).toMatch(
      /\.lightboxCloseButton\s*\{[\s\S]*?position:\s*absolute;/,
    );
    expect(cssContent).toMatch(
      /\.lightboxCloseButton\s*\{[\s\S]*?top:\s*0\.6rem;/,
    );
    expect(cssContent).toMatch(
      /\.lightboxCloseButton\s*\{[\s\S]*?right:\s*0\.6rem;/,
    );
    expect(cssContent).not.toMatch(/max-height:\s*min\(82vh,\s*820px\);/);
  });

  it("gives portrait lightbox images their own larger sizing rule", () => {
    const cssContent = readProjectDetailCss();

    expect(cssContent).toMatch(
      /\.lightboxImagePortrait\s*\{[\s\S]*?max-height:\s*min\(86vh,\s*56rem\);/,
    );
    expect(cssContent).toMatch(
      /\.lightboxImagePortrait\s*\{[\s\S]*?max-width:\s*min\(90vw,\s*42rem\);/,
    );
  });

  it("stacks the detail header earlier to avoid cramped tablet layouts", () => {
    const cssContent = readProjectDetailCss();

    expect(cssContent).toMatch(
      /@media \(max-width:\s*860px\)\s*\{[\s\S]*?\.headerTop\s*\{[\s\S]*?flex-direction:\s*column;/,
    );
    expect(cssContent).toMatch(
      /@media \(max-width:\s*860px\)\s*\{[\s\S]*?\.visitLink\s*\{[\s\S]*?white-space:\s*normal;/,
    );
  });

  it("tightens the top spacing when the projects view switches into detail mode", () => {
    const filterCss = readCss("components/project-filter.module.css");

    expect(filterCss).toMatch(
      /\.section\[data-view="detail"\]\s*\{[\s\S]*?margin-top:\s*1rem;/,
    );
  });

  it("uses a tighter editorial spacing rhythm across the detail view", () => {
    const cssContent = readProjectDetailCss();

    expect(cssContent).toMatch(
      /\.panel\s*\{[\s\S]*?gap:\s*1\.1rem;/,
    );
    expect(cssContent).toMatch(
      /\.header\s*\{[\s\S]*?gap:\s*0\.65rem;[\s\S]*?padding-bottom:\s*0\.85rem;/,
    );
    expect(cssContent).toMatch(
      /\.summaryBlock\s*\{[\s\S]*?margin-top:\s*0\.45rem;/,
    );
    expect(cssContent).toMatch(
      /\.detailRow\s*\{[\s\S]*?padding-block:\s*clamp\(1rem,\s*2\.1vw,\s*1\.45rem\);/,
    );
    expect(cssContent).toMatch(
      /\.mediaCard\s*\{[\s\S]*?gap:\s*0\.42rem;/,
    );
    expect(cssContent).toMatch(
      /\.sectionBlocks\s*\{[\s\S]*?gap:\s*0\.85rem;/,
    );
    expect(cssContent).toMatch(
      /\.lightboxCloseButton\s*\{[\s\S]*?top:\s*0\.6rem;/,
    );
    expect(cssContent).toMatch(
      /\.lightboxCloseButton\s*\{[\s\S]*?right:\s*0\.6rem;/,
    );
  });
});
