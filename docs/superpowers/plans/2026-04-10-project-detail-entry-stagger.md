# Project Detail Entry Stagger Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the project detail view enter with the same staggered motion used across the other inner pages.

**Architecture:** Keep `ProjectFilter` as the first-open trigger owner and move the project detail entry motion onto the shared `page-stagger` utility classes. Preserve the existing row-level scroll reveal logic so only the initial shell motion changes.

**Tech Stack:** Next.js, React, TypeScript, CSS Modules, Vitest, Testing Library.

---

## Chunk 1: Define the Expected Stagger Sequence

### Task 1: Write the failing component test

**Files:**
- Modify: `tests/unit/components/project-detail.test.tsx`

- [ ] **Step 1: Add stagger class assertions**

Assert that when `animateOnFirstOpen` is `true`, `ProjectDetail` assigns the shared stagger classes to:
- the header title row
- the role line
- the summary block
- the detail body container

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `npm run test -- tests/unit/components/project-detail.test.tsx`
Expected: FAIL because the detail shell does not yet expose the shared stagger sequence.

### Task 2: Add style-level motion expectations

**Files:**
- Modify: `tests/unit/style/project-motion-consistency.test.ts`

- [ ] **Step 1: Replace the custom panel reveal assertion**

Assert that the project detail motion now depends on the shared `page-stagger` utility instead of a dedicated `projectDetailReveal` keyframe.

- [ ] **Step 2: Run the focused style test to verify it fails**

Run: `npm run test -- tests/unit/style/project-motion-consistency.test.ts`
Expected: FAIL because the stylesheet still contains the custom panel reveal rule.

## Chunk 2: Implement the Shared Entry Motion

### Task 3: Update the detail component

**Files:**
- Modify: `components/project-detail.tsx`

- [ ] **Step 1: Add shared stagger classes**

Use `animateOnFirstOpen` to conditionally add `page-stagger` / `page-stagger-N` classes to the detail shell elements in the approved order.

- [ ] **Step 2: Keep row reveal behavior intact**

Do not change the current row visibility tracking, intersection thresholds, or comparison media behavior.

- [ ] **Step 3: Re-run the focused component test**

Run: `npm run test -- tests/unit/components/project-detail.test.tsx`
Expected: PASS.

### Task 4: Remove the custom panel reveal styling

**Files:**
- Modify: `components/project-detail.module.css`

- [ ] **Step 1: Remove unused panel keyframe styling**

Delete the dedicated first-open panel animation rule and any no-longer-needed reduced-motion override for it.

- [ ] **Step 2: Preserve row reveal styling**

Leave the existing row-level stagger rules in place so only the entry shell motion changes.

- [ ] **Step 3: Re-run the focused style test**

Run: `npm run test -- tests/unit/style/project-motion-consistency.test.ts`
Expected: PASS.

## Chunk 3: Verify the Flow

### Task 5: Run targeted verification

**Files:**
- Test: project detail and motion coverage

- [ ] **Step 1: Run focused unit tests**

Run: `npm run test -- tests/unit/components/project-detail.test.tsx tests/unit/components/project-filter.test.tsx tests/unit/style/project-motion-consistency.test.ts tests/unit/style/project-detail-media-layout.test.ts tests/unit/pages/inner-page-stagger.test.tsx`
Expected: PASS.

- [ ] **Step 2: Review the diff footprint**

Run: `git diff --stat && git diff --check`
Expected: changes stay limited to project detail motion, tests, and docs.
