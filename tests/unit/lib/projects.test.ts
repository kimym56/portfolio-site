import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { PROJECTS } from "@/lib/projects";

describe("PROJECTS", () => {
  it("uses the approved deck-aligned project set", () => {
    expect(PROJECTS.map((project) => project.id)).toEqual([
      "sellpath",
      "mimesis",
      "dsskills",
      "website",
    ]);
    expect(PROJECTS.filter((project) => project.type === "work")).toHaveLength(1);
    expect(PROJECTS.filter((project) => project.type === "side")).toHaveLength(3);
    expect(PROJECTS.map((project) => project.title)).not.toContain(
      "Design System Project",
    );
  });

  it("carries over key deck-derived content", () => {
    const sellpath = PROJECTS.find((project) => project.id === "sellpath");
    const mimesis = PROJECTS.find((project) => project.id === "mimesis");
    const dsskills = PROJECTS.find((project) => project.id === "dsskills");

    expect(sellpath?.url).toBe("https://www.sellpath.ai");
    expect(sellpath?.description).toMatch(/AI agent-based CRM and sales platform/i);
    expect(mimesis?.stack.map((item) => item.label)).toContain("R3F");
    expect(mimesis?.details.whatIFocusedOn).toMatch(/Page Curl/i);
    expect(dsskills?.url).toBe("https://ymkim-dsskills.vercel.app");
    expect(dsskills?.details.considerations).toMatch(/instant preview/i);
  });

  it("attaches slide-derived media to project detail entries", () => {
    const sellpath = PROJECTS.find((project) => project.id === "sellpath");
    const mimesis = PROJECTS.find((project) => project.id === "mimesis");
    const dsskills = PROJECTS.find((project) => project.id === "dsskills");

    expect(sellpath?.media?.map((item) => item.src) ?? []).toContain(
      "/images/projects/sellpath_main.png",
    );
    expect(mimesis?.media?.map((item) => item.src) ?? []).toEqual([
      "/images/projects/mimesis_page_curl.webp",
      "/images/projects/mimesis_wiper_typography.webp",
      "/images/projects/mimesis_black_white_circle.webp",
      "/images/projects/mimesis_staggered_text.webp",
    ]);
    expect(dsskills?.media?.map((item) => item.src) ?? []).toContain(
      "/images/projects/dsskills_main.png",
    );
  });

  it("references local project media assets that exist in public", () => {
    const mediaItems = PROJECTS.flatMap((project) => project.media ?? []);

    expect(mediaItems.length).toBeGreaterThan(0);

    for (const item of mediaItems) {
      expect(item.src.startsWith("/")).toBe(true);
      expect(fs.existsSync(path.join(process.cwd(), "public", item.src))).toBe(true);

      if ("referenceMedia" in item && item.referenceMedia) {
        expect(item.referenceMedia.src.startsWith("/")).toBe(true);
        expect(
          fs.existsSync(path.join(process.cwd(), "public", item.referenceMedia.src)),
        ).toBe(true);
      }
    }
  });

  it("uses specific Mimesis implementation detail rows", () => {
    const mimesis = PROJECTS.find((project) => project.id === "mimesis");

    expect(mimesis?.mediaStartSide).toBe("left");
    expect(mimesis?.detailSections?.map((section) => section.title)).toEqual([
      "iOS Page Curl Effect",
      "Wiper Typography",
      "Black & White Circle",
      "Staggered Text",
    ]);

    const referenceCopy = mimesis?.detailSections
      ?.map((section) => section.reference)
      .join(" ");
    const implementationCopy = mimesis?.detailSections
      ?.map((section) => section.implementation)
      .join(" ");

    expect(mimesis?.media?.map((item) => item.caption)).toEqual([
      "iOS Page Curl Effect",
      "Wiper Typography",
      "Black & White Circle",
      "Staggered Text",
    ]);
    expect(
      mimesis?.media?.map((item) =>
        "referenceMedia" in item
          ? `${item.referenceMedia?.type}:${item.referenceMedia?.src}`
          : undefined,
      ),
    ).toEqual([
      "image:/images/projects/mimesis_page_curl_original.webp",
      "image:/images/projects/mimesis_wiper_typography_original.webp",
      "image:/images/projects/mimesis_black_white_circle_original.webp",
      "image:/images/projects/mimesis_staggered_text_original.webp",
    ]);
    expect(referenceCopy).toMatch(/reference/i);
    expect(referenceCopy).toMatch(/inspir/i);
    expect(implementationCopy).toMatch(/My Mimesis/i);
    expect(implementationCopy).toMatch(/R3F/i);
    expect(implementationCopy).toMatch(/Framer Motion/i);
    expect(
      mimesis?.detailSections?.some((section) => "implementationUrl" in section),
    ).toBe(false);
    expect(mimesis?.detailSections?.some((section) => section.body)).toBe(false);
  });
});
