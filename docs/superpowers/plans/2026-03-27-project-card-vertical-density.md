# Project Card Vertical Density Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep the current project card height while moving the header to the top, placing the description directly below it, and settling the chip row lower in the card for denser vertical rhythm.

**Architecture:** Keep the existing `ProjectGrid` structure largely intact and solve the behavior with CSS layout changes. Preserve the fixed card shell, reduce vertical padding, and use column layout flow so the chip row occupies the lower portion of the card without absolute positioning.

**Tech Stack:** React, CSS Modules, Vitest

---

## Chunk 1: Lock the desired layout in tests

### Task 1: Update the style test for the new vertical structure

**Files:**
- Modify: `tests/unit/style/project-grid-card-layout.test.ts`
- Test: `tests/unit/style/project-grid-card-layout.test.ts`

- [ ] **Step 1: Write the failing test**

Add assertions for:
- `min-height: 240px` remains on `.cardButton`
- `.cardButton` uses reduced vertical padding
- `.content` uses a full-height vertical layout
- `.description` is explicitly anchored after the header
- `.stack` is pushed lower with `margin-top: auto`

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run tests/unit/style/project-grid-card-layout.test.ts`
Expected: FAIL because the CSS still reflects the old spacing/layout.

## Chunk 2: Implement the new vertical density

### Task 2: Patch the project card CSS

**Files:**
- Modify: `components/project-grid.module.css`
- Test: `tests/unit/style/project-grid-card-layout.test.ts`

- [ ] **Step 3: Write minimal implementation**

Update CSS to:
- keep `min-height: 240px`
- reduce vertical padding while preserving horizontal padding
- change content layout to a top-to-bottom column flow that fills the card height
- keep header first
- place description directly after the header with a tighter gap
- push the chip row toward the bottom with layout flow
- slightly reduce arrow size if needed to keep the tighter shell balanced

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest run tests/unit/style/project-grid-card-layout.test.ts`
Expected: PASS

## Chunk 3: Verify no regressions

### Task 3: Run adjacent project tests

**Files:**
- Test: `tests/unit/components/project-grid.test.ts`
- Test: `tests/unit/style/project-motion-consistency.test.ts`

- [ ] **Step 5: Run focused regression checks**

Run: `pnpm vitest run tests/unit/components/project-grid.test.ts tests/unit/style/project-motion-consistency.test.ts`
Expected: PASS
