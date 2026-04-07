# Project Content Deck Alignment Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace placeholder Projects page content with deck-aligned copy for Sellpath, Mimesis, DSSkills, and Website.

**Architecture:** Keep the existing Projects page UI and data model unchanged. Update only the local project data source and focused tests so the current filter/detail components render finished portfolio copy without new rendering logic.

**Tech Stack:** Next.js, React, TypeScript, Vitest, Testing Library, Playwright.

---

## Chunk 1: Project Data Refresh

### Task 1: Lock the Project Set in Tests

**Files:**
- Create: `tests/unit/lib/projects.test.ts`

- [x] **Step 1: Write the failing test**

```ts
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
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `npm run test -- tests/unit/lib/projects.test.ts`
Expected: FAIL because `dsskills` is not present and Design System Project is still present.

### Task 2: Update the Project Data

**Files:**
- Modify: `lib/projects.ts`

- [x] **Step 1: Replace placeholder project copy**

Update `PROJECTS` so:

- `Sellpath` uses the slide deck URL, stack, overview, Activity Modal, Chat UI, and AI CRM context.
- `Mimesis` uses the slide deck URL, stack, overview, and the four interaction explorations: Page Curl, Wiper Typography, Black & White Circle, and Staggered Text.
- `DSSkills` replaces `Design System Project` and uses the slide deck URL, stack, overview, agent skill selection, instant preview, history, and code output context.
- `Website` remains a side project and describes the current portfolio site's information hierarchy, motion, project filtering, and Next.js implementation.

- [x] **Step 2: Run the data test**

Run: `npm run test -- tests/unit/lib/projects.test.ts`
Expected: PASS.

### Task 3: Update Existing UI Expectations

**Files:**
- Modify: `tests/unit/components/project-filter.test.tsx`
- Modify: `tests/e2e/projects-filter.spec.ts`

- [x] **Step 1: Update expected side-project title**

Replace expectations for `Design System Project` with `DSSkills`.

- [x] **Step 2: Run focused unit tests**

Run: `npm run test -- tests/unit/lib/projects.test.ts tests/unit/components/project-filter.test.tsx`
Expected: PASS.

- [x] **Step 3: Run focused end-to-end test**

Run: `npm run test:e2e -- tests/e2e/projects-filter.spec.ts`
Expected: PASS.

- [x] **Step 4: Review diff**

Run: `git diff -- lib/projects.ts tests/unit/lib/projects.test.ts tests/unit/components/project-filter.test.tsx tests/e2e/projects-filter.spec.ts`
Expected: diff is limited to project content and related assertions.
