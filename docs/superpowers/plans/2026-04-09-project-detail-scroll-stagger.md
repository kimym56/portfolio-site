# Project Detail Scroll Stagger Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add scroll-triggered staggered reveal motion to project detail rows in the Projects detail panel.

**Architecture:** Keep `ProjectDetail` as the single rendering boundary. Add a row-level `IntersectionObserver` that marks each row as revealed once, then let CSS animate the copy and media surfaces with a short stagger. Leave comparison-video activation logic intact and keep reduced-motion users fully visible.

**Tech Stack:** Next.js, React, TypeScript, CSS Modules, Vitest, Testing Library.

---

## Chunk 1: Row Reveal Behavior

### Task 1: Write Failing Component Test

**Files:**
- Modify: `tests/unit/components/project-detail.test.tsx`

- [ ] **Step 1: Add row reveal assertions**

Add a test that renders `ProjectDetail` with media rows and asserts:
- detail rows expose a hidden reveal state before intersection
- triggering the row observer for a row changes that row to the revealed state

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `npm run test -- tests/unit/components/project-detail.test.tsx`
Expected: FAIL because rows do not yet expose scroll reveal state.

### Task 2: Implement Row Reveal Tracking

**Files:**
- Modify: `components/project-detail.tsx`

- [ ] **Step 1: Add row visibility state**

Track revealed row indexes in component state and skip the behavior entirely when `shouldReduceMotion` is true or `IntersectionObserver` is unavailable.

- [ ] **Step 2: Observe detail rows**

Observe `[data-detail-row-index]` elements and mark rows as revealed once they cross a meaningful threshold.

- [ ] **Step 3: Emit reveal data attributes**

Render per-row visibility through a stable attribute so CSS can animate from it without changing the DOM structure.

- [ ] **Step 4: Re-run the focused component test**

Run: `npm run test -- tests/unit/components/project-detail.test.tsx`
Expected: PASS.

## Chunk 2: Stagger Styling

### Task 3: Write Failing Style Test

**Files:**
- Modify: `tests/unit/style/project-motion-consistency.test.ts`

- [ ] **Step 1: Add project-detail stagger assertions**

Assert that `components/project-detail.module.css` includes:
- hidden row-state styling for detail copy and media
- a 120ms stagger delay between copy and media
- reduced-motion fallback that disables the row reveal animation

- [ ] **Step 2: Run the focused style test to verify it fails**

Run: `npm run test -- tests/unit/style/project-motion-consistency.test.ts`
Expected: FAIL because project detail rows do not yet define scroll stagger styles.

### Task 4: Implement CSS Reveal Rules

**Files:**
- Modify: `components/project-detail.module.css`

- [ ] **Step 1: Add hidden and revealed row styles**

Animate row children from the existing 10px / 600ms reveal language.

- [ ] **Step 2: Add stagger timing**

Delay media slightly after copy when a row has media, while leaving text-only rows clean.

- [ ] **Step 3: Preserve reduced motion**

Ensure reduced-motion users see fully visible rows with no transition or animation delay.

- [ ] **Step 4: Re-run focused tests**

Run: `npm run test -- tests/unit/components/project-detail.test.tsx tests/unit/style/project-motion-consistency.test.ts`
Expected: PASS.

## Chunk 3: Verify

### Task 5: Run Route-Relevant Verification

**Files:**
- Test: focused project-detail checks

- [ ] **Step 1: Run focused unit tests**

Run: `npm run test -- tests/unit/components/project-detail.test.tsx tests/unit/components/project-filter.test.tsx tests/unit/style/project-motion-consistency.test.ts tests/unit/style/project-detail-media-layout.test.ts`
Expected: PASS.

- [ ] **Step 2: Run focused lint**

Run: `npm run lint -- components/project-detail.tsx tests/unit/components/project-detail.test.tsx tests/unit/style/project-motion-consistency.test.ts`
Expected: PASS.

- [ ] **Step 3: Review diff**

Run: `git diff --stat && git diff --check`
Expected: diff is limited to project detail scroll stagger implementation, tests, and docs.
