import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("css import type declarations", () => {
  it("declares types for css side-effect imports", () => {
    const declarationsPath = path.join(process.cwd(), "types", "css.d.ts");
    const declarationContent = fs.readFileSync(declarationsPath, "utf8");

    expect(declarationContent).toMatch(/declare module "\*\.css"/);
  });
});
