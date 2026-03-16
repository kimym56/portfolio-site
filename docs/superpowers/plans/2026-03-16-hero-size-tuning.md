# Hero Size Tuning Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Increase the home hero portrait to the approved larger size while preserving the existing text/image balance.

**Architecture:** This is a CSS-only tuning pass on the existing hero. Update the frame size and crop values in `hero-split.module.css`, and lock the new expectations in the style test before changing the implementation.

**Tech Stack:** Next.js, React, CSS Modules, Vitest

---

## Chunk 1: Lock the new hero size

### Task 1: Update the style test first

**Files:**
- Modify: `tests/unit/style/hero-image-scale.test.ts`
- Test: `tests/unit/style/hero-image-scale.test.ts`

- [ ] **Step 1: Write the failing test**
Change the expected desktop hero width to `72%`, desktop minimum height to `420px`, mobile minimum height to `360px`, and image scale to a slightly tighter crop.

- [ ] **Step 2: Run the test to verify it fails**
Run: `npm test -- tests/unit/style/hero-image-scale.test.ts`
Expected: FAIL because the CSS still reflects the smaller values.

- [ ] **Step 3: Write minimal implementation**
Update `components/hero-split.module.css` to the new approved values.

- [ ] **Step 4: Run the test to verify it passes**
Run: `npm test -- tests/unit/style/hero-image-scale.test.ts`
Expected: PASS

## Chunk 2: Final verification

### Task 2: Run focused verification

**Files:**
- Modify: `components/hero-split.module.css`
- Modify: `tests/unit/style/hero-image-scale.test.ts`

- [ ] **Step 1: Run targeted tests**
Run: `npm test -- tests/unit/style/hero-image-scale.test.ts tests/unit/style/hero-image-concealment.test.ts tests/unit/components/hero-split.test.tsx`
Expected: PASS

- [ ] **Step 2: Run lint**
Run: `npm run lint`
Expected: PASS
