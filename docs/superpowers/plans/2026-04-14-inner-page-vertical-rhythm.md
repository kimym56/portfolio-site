# Inner Page Vertical Rhythm Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Normalize the About, Projects, and Contact pages to a rem-only spacing scale of `0.5rem`, `1rem`, `1.5rem`, and `2rem`, with `1.5rem` as the main section rhythm.

**Architecture:** Keep the existing page structure and shared grid frame. Tighten the page-level spacing rules in `app/globals.css`, then normalize the Projects list/detail modules so all three inner pages read as one UI system without a layout redesign.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS Modules, Vitest

---

## Chunk 1: Regression Tests For The Approved Scale

### Task 1: Tighten the shared inner-page spacing assertions

**Files:**
- Modify: `tests/unit/style/about-vertical-rhythm.test.ts`
- Test: `tests/unit/style/about-vertical-rhythm.test.ts`

- [ ] **Step 1: Write the failing test**

Assert that:
- `.about-card`, `.projects-card`, and `.contact-card` use scale-friendly `padding-block`
- title and subtitle spacing stays on `1.5rem`
- About keeps `1rem` paragraph gaps and `0.5rem` tech-stack gaps
- Contact keeps `0.5rem` list spacing and moves link spacing onto approved values

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/style/about-vertical-rhythm.test.ts`
Expected: FAIL because current section padding and contact link spacing still use off-scale values.

### Task 2: Add focused Projects spacing assertions

**Files:**
- Create: `tests/unit/style/projects-vertical-rhythm.test.ts`
- Test: `tests/unit/style/projects-vertical-rhythm.test.ts`

- [ ] **Step 1: Write the failing test**

Assert that:
- `components/project-filter.module.css` uses only approved rem-scale values for vertical spacing
- `components/project-grid.module.css` uses `1.5rem` row padding, `1rem` internal row gaps, and `0.5rem` chip spacing
- `components/project-detail.module.css` uses approved rem-scale values for panel spacing, header spacing, summary spacing, row padding, and media spacing

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/style/projects-vertical-rhythm.test.ts`
Expected: FAIL because the Projects modules still contain bespoke spacing values.

## Chunk 2: Shared Inner-Page Spacing

### Task 3: Normalize the shared page-level spacing hooks

**Files:**
- Modify: `app/globals.css`
- Test: `tests/unit/style/about-vertical-rhythm.test.ts`

- [ ] **Step 1: Write minimal implementation**

Update the shared inner-page rules so:
- page section `padding-block` lands on the approved rem scale
- title and subtitle spacing remains `1.5rem`
- Contact link gap and padding move to approved scale values

- [ ] **Step 2: Run tests to verify they pass**

Run: `npx vitest run tests/unit/style/about-vertical-rhythm.test.ts`
Expected: PASS

## Chunk 3: Projects List And Detail Rhythm

### Task 4: Normalize Projects list spacing

**Files:**
- Modify: `components/project-filter.module.css`
- Modify: `components/project-grid.module.css`
- Test: `tests/unit/style/projects-vertical-rhythm.test.ts`

- [ ] **Step 1: Write minimal implementation**

Update the Projects list so:
- the filter section margin uses the approved scale
- the toggle group spacing uses approved scale values
- project rows use `1.5rem` vertical padding
- project row internal spacing uses `1rem`
- stack spacing uses `0.5rem`
- mobile spacing stays on the same scale

- [ ] **Step 2: Run tests to verify they pass**

Run: `npx vitest run tests/unit/style/projects-vertical-rhythm.test.ts`
Expected: PASS for the list assertions

### Task 5: Normalize Projects detail spacing

**Files:**
- Modify: `components/project-detail.module.css`
- Test: `tests/unit/style/projects-vertical-rhythm.test.ts`

- [ ] **Step 1: Write minimal implementation**

Update the detail view so:
- panel spacing uses approved values
- header spacing uses approved values
- summary spacing uses approved values
- detail row padding and gaps use the approved scale
- media spacing and labels move off bespoke rem values where reasonable

- [ ] **Step 2: Run tests to verify they pass**

Run: `npx vitest run tests/unit/style/projects-vertical-rhythm.test.ts`
Expected: PASS

## Chunk 4: Final Verification

### Task 6: Run the targeted spacing suite

**Files:**
- Test: `tests/unit/style/about-vertical-rhythm.test.ts`
- Test: `tests/unit/style/projects-vertical-rhythm.test.ts`

- [ ] **Step 1: Run the final verification suite**

Run: `npx vitest run tests/unit/style/about-vertical-rhythm.test.ts tests/unit/style/projects-vertical-rhythm.test.ts`
Expected: PASS

- [ ] **Step 2: Inspect touched spacing rules for leftover off-scale values**

Run: `rg -n "0\\.72rem|0\\.85rem|1\\.35rem|1\\.1rem|1\\.45rem|0\\.42rem|0\\.45rem|0\\.46rem|0\\.65rem|0\\.7rem|1\\.2rem|2\\.2rem" app/globals.css components/project-filter.module.css components/project-grid.module.css components/project-detail.module.css`
Expected: no matches in the normalized page-spacing rules
