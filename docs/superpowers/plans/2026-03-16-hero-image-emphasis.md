# Hero Image Emphasis Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the rotating hero portrait larger and add a natural-looking treatment that conceals the bottom-right sparkle watermark.

**Architecture:** Keep the existing synchronized hero rotation logic intact and solve the new request mostly in CSS. Increase the portrait frame size, tighten image composition with fit/positioning, and add a lightweight concealment layer over the lower-right corner of the media frame.

**Tech Stack:** Next.js, React, TypeScript, CSS Modules, Vitest, Testing Library

---

## Chunk 1: Lock expected hero image styling

### Task 1: Write failing style tests for the larger frame and concealment treatment

**Files:**
- Modify: `tests/unit/style/hero-image-scale.test.ts`
- Create: `tests/unit/style/hero-image-concealment.test.ts`
- Test: `tests/unit/style/hero-image-scale.test.ts`
- Test: `tests/unit/style/hero-image-concealment.test.ts`

- [ ] **Step 1: Write the failing tests**
Update the image scale test so it expects a larger desktop width and taller hero frame. Add a new style test that asserts the hero media includes a dedicated concealment selector and soft radial treatment for the lower-right corner.

- [ ] **Step 2: Run tests to verify they fail**
Run: `npm test -- tests/unit/style/hero-image-scale.test.ts tests/unit/style/hero-image-concealment.test.ts`
Expected: FAIL because the current CSS still uses the smaller frame and has no concealment layer.

- [ ] **Step 3: Write minimal implementation**
Update `components/hero-split.module.css` and `components/hero-split.tsx` as needed to satisfy the larger-frame and concealment expectations without changing the hero timing logic.

- [ ] **Step 4: Run tests to verify they pass**
Run: `npm test -- tests/unit/style/hero-image-scale.test.ts tests/unit/style/hero-image-concealment.test.ts`
Expected: PASS

## Chunk 2: Guard the rendered overlay contract

### Task 2: Add a focused component test if the concealment treatment uses markup

**Files:**
- Modify: `tests/unit/components/hero-split.test.tsx`
- Modify: `components/hero-split.tsx`
- Test: `tests/unit/components/hero-split.test.tsx`

- [ ] **Step 1: Write the failing test**
If the concealment is implemented as a DOM node, add a test asserting that the hero renders the overlay element once and keeps it out of the accessibility tree.

- [ ] **Step 2: Run the test to verify it fails**
Run: `npm test -- tests/unit/components/hero-split.test.tsx`
Expected: FAIL because the overlay element is not rendered yet.

- [ ] **Step 3: Write minimal implementation**
Render the concealment element inside the media frame only if it is needed for the chosen CSS treatment.

- [ ] **Step 4: Run the test to verify it passes**
Run: `npm test -- tests/unit/components/hero-split.test.tsx`
Expected: PASS

## Chunk 3: Final verification

### Task 3: Run targeted verification

**Files:**
- Modify: `components/hero-split.tsx`
- Modify: `components/hero-split.module.css`
- Modify: `tests/unit/components/hero-split.test.tsx`
- Modify: `tests/unit/style/hero-image-scale.test.ts`
- Create: `tests/unit/style/hero-image-concealment.test.ts`

- [ ] **Step 1: Run targeted tests**
Run: `npm test -- tests/unit/components/hero-split.test.tsx tests/unit/style/hero-image-scale.test.ts tests/unit/style/hero-image-concealment.test.ts tests/unit/components/rotating-role.test.tsx tests/unit/style/rotating-role-animation-speed.test.ts`
Expected: PASS

- [ ] **Step 2: Run lint**
Run: `npm run lint`
Expected: PASS
