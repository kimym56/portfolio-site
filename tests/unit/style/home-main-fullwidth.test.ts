import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("home main width alignment", () => {
  it("uses the same container width pattern as header content", () => {
    const pagePath = path.join(process.cwd(), "app", "page.tsx");
    const globalsPath = path.join(process.cwd(), "app", "globals.css");
    const pageContent = fs.readFileSync(pagePath, "utf8");
    const globalsContent = fs.readFileSync(globalsPath, "utf8");

    expect(pageContent).toMatch(/className="home-page page container"/);
    expect(globalsContent).toMatch(/\.container\s*\{[\s\S]*width:\s*min\(1120px,\s*92vw\);/);

    const homePageRuleMatch = globalsContent.match(/\.home-page\s*\{([^}]*)\}/);
    expect(homePageRuleMatch).not.toBeNull();
    expect(homePageRuleMatch?.[1]).not.toMatch(/width:\s*100%;/);
  });
});
