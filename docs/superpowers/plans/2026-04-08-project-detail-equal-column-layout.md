# Project Detail Equal Column Layout Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make project detail media/text rows split 50:50 on desktop.

**Architecture:** Keep the existing `ProjectDetail` markup and data flow unchanged. Add CSS style coverage for the expected equal column contract, then update the desktop CSS grid columns in `project-detail.module.css`.

**Tech Stack:** Next.js, React, CSS Modules, Vitest.

---

## Chunk 1: Equal Desktop Columns

### Task 1: Write Failing Style Test

**Files:**
- Create: `tests/unit/style/project-detail-media-layout.test.ts`

- [x] **Step 1: Add CSS helper and assertion**

Create a style test that reads `components/project-detail.module.css` and asserts:

```text
.detailRowWithMedia {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
}

.detailRowWithMedia[data-media-side="left"] {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
}
```

- [x] **Step 2: Run the test to verify it fails**

Run: `npm run test -- tests/unit/style/project-detail-media-layout.test.ts`
Expected: FAIL because current desktop columns are `0.95fr / 1.05fr` and `1.05fr / 0.95fr`.

### Task 2: Implement Equal Columns

**Files:**
- Modify: `components/project-detail.module.css`

- [x] **Step 1: Update desktop grid ratios**

Replace both media row desktop column declarations with:

```css
grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
```

- [x] **Step 2: Preserve ordering**

Keep the `[data-media-side="left"]` order rules for `.mediaCard` and `.detailCopy`.

- [x] **Step 3: Run focused tests**

Run: `npm run test -- tests/unit/style/project-detail-media-layout.test.ts tests/unit/components/project-detail.test.tsx`
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

Note: the standard Playwright command was blocked by an existing `next dev` process holding `.next/dev/lock`. The equivalent Playwright browser flow was run against the active local dev server on port 3000 and passed, including computed equal desktop column widths for right-media and left-media rows.

- [x] **Step 5: Review diff**

Run: `git diff --stat && git diff --check`
Expected: diff is limited to project detail equal columns, tests, and docs.
