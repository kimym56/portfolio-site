# Project Detail Borderless Editorial Layout Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove visible section/card chrome from project detail rows while keeping the alternating slide-like media/text layout.

**Architecture:** Keep `ProjectDetail` as the rendering boundary and preserve its existing detail row semantics. Update CSS Modules to remove row borders, backgrounds, row radius, and boxed padding, replacing them with whitespace-based rhythm. Update style tests to describe the new borderless contract.

**Tech Stack:** Next.js, React, TypeScript, CSS Modules, Vitest, Testing Library.

---

## Chunk 1: Borderless Detail Rows

### Task 1: Write Failing Style Tests

**Files:**
- Modify: `tests/unit/style/button-radius-alignment.test.ts`

- [x] **Step 1: Remove row radius expectation**

Remove the assertion that `.detailRow` must use `border-radius: var(--radius-lg)`.

- [x] **Step 2: Add borderless detail row assertions**

Add assertions that `.detailRow` does not include:

```text
background:
border:
border-radius:
padding:
```

- [x] **Step 3: Run the style test to verify it fails**

Run: `npm run test -- tests/unit/style/button-radius-alignment.test.ts`
Expected: FAIL because current `.detailRow` still has card chrome.

### Task 2: Implement Borderless Editorial Rows

**Files:**
- Modify: `components/project-detail.module.css`

- [x] **Step 1: Remove row card chrome**

Delete the `.detailRow` background, border, border-radius, and padding declarations.

- [x] **Step 2: Increase borderless rhythm**

Increase `.detailRows` gap and `.detailRow` internal grid gap so rows remain scannable without borders.

- [x] **Step 3: Preserve media/text alternation**

Keep the existing desktop ordering rules using `[data-media-side="left"]`, and keep mobile DOM order text first.

- [x] **Step 4: Run focused tests**

Run: `npm run test -- tests/unit/style/button-radius-alignment.test.ts tests/unit/components/project-detail.test.tsx`
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
Expected: PASS. If blocked by the existing `next dev` lock, run the equivalent Playwright browser flow against the active local dev server and record the reason.

Note: the standard Playwright command was blocked by an existing `next dev` process holding `.next/dev/lock`. The equivalent Playwright browser flow was run against the active local dev server on port 3000 and passed, including computed borderless detail row styles for Sellpath and Website.

- [x] **Step 5: Review diff**

Run: `git diff --stat && git diff --check`
Expected: diff is limited to project detail borderless layout, tests, and docs.
