import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("home main width alignment", () => {
  it("keeps the home page wrapper simple and lets the hero own the canonical frame", () => {
    const pagePath = path.join(process.cwd(), "app", "page.tsx");
    const heroPath = path.join(process.cwd(), "components", "hero-split.tsx");
    const globalsPath = path.join(process.cwd(), "app", "globals.css");
    const pageContent = fs.readFileSync(pagePath, "utf8");
    const heroContent = fs.readFileSync(heroPath, "utf8");
    const globalsContent = fs.readFileSync(globalsPath, "utf8");

    expect(pageContent).toMatch(/className="home-page page"/);
    expect(pageContent).not.toMatch(/className="home-page page container"/);
    expect(pageContent).not.toMatch(/layout-shell|layout-grid|layout-frame/);
    expect(heroContent).toContain("layout-frame");
    expect(heroContent).not.toContain("layout-shell");
    expect(heroContent).not.toContain("layout-grid");
    expect(globalsContent).toMatch(/\.layout-frame\s*\{/);

    const homePageRuleMatch = globalsContent.match(/\.home-page\s*\{([^}]*)\}/);
    expect(homePageRuleMatch).not.toBeNull();
    expect(homePageRuleMatch?.[1]).not.toMatch(/width:\s*100%;/);
  });
});
