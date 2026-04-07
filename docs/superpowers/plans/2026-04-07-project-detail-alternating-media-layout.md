# Project Detail Alternating Media Layout Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework project detail content into alternating media/text rows similar to the slide deck.

**Architecture:** Keep `ProjectDetail` as the only rendering component changed. Convert the existing text sections into a small local array, pair each section with `project.media[index]`, and render rows with direction metadata used by CSS for desktop placement. Keep mobile order text-first using CSS grid ordering.

**Tech Stack:** Next.js, React, TypeScript, CSS Modules, Vitest, Testing Library.

---

## Chunk 1: Alternating Detail Rows

### Task 1: Write Failing Layout Tests

**Files:**
- Modify: `tests/unit/components/project-detail.test.tsx`

- [x] **Step 1: Add row direction assertions**

Update the media rendering test to assert:

- the media row wrappers exist
- row 1 has `data-media-side="right"`
- row 2 has `data-media-side="left"`
- text and media both appear within the row

- [x] **Step 2: Run the test to verify it fails**

Run: `npm run test -- tests/unit/components/project-detail.test.tsx`
Expected: FAIL because the current component has a media grid rather than alternating rows.

### Task 2: Implement Alternating Rows

**Files:**
- Modify: `components/project-detail.tsx`
- Modify: `components/project-detail.module.css`

- [x] **Step 1: Extract detail sections into a render array**

Inside `ProjectDetail`, create an array for the existing sections: `What This Project Is`, `What I Focused On`, `UI/UX/HCI/Frontend Considerations`, and `Project Meta`.

- [x] **Step 2: Render paired rows**

For each section, render a `detailRow`. If media exists at the same index, render text and media cells. Alternate `data-media-side` by row index: even rows use `right`, odd rows use `left`.

- [x] **Step 3: Render text-only fallback rows**

If no media exists for a row, render only the text section while preserving spacing and the existing text styles.

- [x] **Step 4: Update CSS**

Use a two-column grid on desktop for rows with media. Use CSS order selectors so right-media rows place text first and left-media rows place media first. Stack text before media on mobile.

- [x] **Step 5: Run focused tests**

Run: `npm run test -- tests/unit/components/project-detail.test.tsx tests/unit/components/project-filter.test.tsx`
Expected: PASS.

### Task 3: Verify

**Files:**
- Test: full repo checks

- [x] **Step 1: Run unit tests**

Run: `npm test`
Expected: PASS.

- [x] **Step 2: Run lint**

Run: `npm run lint`
Expected: PASS.

- [x] **Step 3: Run build**

Run: `npm run build`
Expected: PASS.

- [x] **Step 4: Run or account for Projects browser flow**

Run: `npm run test:e2e -- tests/e2e/projects-filter.spec.ts`
Expected: PASS. If blocked by an existing `next dev` lock, run the equivalent Playwright browser flow against the active local dev server and record the reason.

Note: the standard Playwright command was blocked by an existing `next dev` process holding `.next/dev/lock`. The equivalent Playwright browser flow was run against the active local dev server on port 3000 and passed.

- [x] **Step 5: Review diff**

Run: `git diff --stat && git diff --check`
Expected: diff is limited to project detail layout, tests, and docs.
