import { describe, expect, it } from "vitest";
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
    expect(mimesis?.media?.map((item) => item.src) ?? []).toContain(
      "/videos/projects/mimesis_main.webm",
    );
    expect(dsskills?.media?.map((item) => item.src) ?? []).toContain(
      "/images/projects/dsskills_main.png",
    );
  });
});
