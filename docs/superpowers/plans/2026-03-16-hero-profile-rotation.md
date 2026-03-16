# Hero Profile Rotation Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the static hero placeholder with rotating profile images that change in sync with the hero title.

**Architecture:** Move the rotation timer to `HeroSplit` and drive both the title and portrait from one shared `activeIndex`. Keep `RotatingRole` focused on animated rendering of the current role label while `HeroSplit` owns timing and image selection.

**Tech Stack:** Next.js, React, TypeScript, CSS Modules, Vitest, Testing Library

---

## Chunk 1: Shared hero state

### Task 1: Add a failing synchronization test

**Files:**
- Modify: `tests/unit/components/hero-split.test.tsx`
- Test: `tests/unit/components/hero-split.test.tsx`

- [ ] **Step 1: Write the failing test**
Add a test that renders `HeroSplit`, advances fake timers, and asserts that both the heading text and image `src` move from the first profile to the second profile together.

- [ ] **Step 2: Run test to verify it fails**
Run: `npm test -- tests/unit/components/hero-split.test.tsx`
Expected: FAIL because the hero image stays static and the component does not own the shared index yet.

- [ ] **Step 3: Write minimal implementation**
Update `HeroSplit` to own the timer-driven `activeIndex`, pass it into `RotatingRole`, and select the portrait image from `copy.profileImages`.

- [ ] **Step 4: Run test to verify it passes**
Run: `npm test -- tests/unit/components/hero-split.test.tsx`
Expected: PASS

## Chunk 2: Data and animation updates

### Task 2: Add profile image data and crossfade styling

**Files:**
- Modify: `types/site.ts`
- Modify: `lib/site-copy.ts`
- Modify: `components/hero-split.module.css`

- [ ] **Step 1: Write the failing test**
Extend the hero test expectations so the first render uses `profile1.png` and the next tick uses `profile2.png`.

- [ ] **Step 2: Run test to verify it fails**
Run: `npm test -- tests/unit/components/hero-split.test.tsx`
Expected: FAIL because `profileImages` is not part of the copy contract yet.

- [ ] **Step 3: Write minimal implementation**
Add `profileImages` to `HomeCopy`, populate the three image paths in `SITE_COPY.home`, and add a fade-in animation class for the remounted hero portrait with reduced-motion handling.

- [ ] **Step 4: Run test to verify it passes**
Run: `npm test -- tests/unit/components/hero-split.test.tsx`
Expected: PASS

## Chunk 3: RotatingRole interface cleanup

### Task 3: Make RotatingRole presentational

**Files:**
- Modify: `components/rotating-role.tsx`
- Modify: `tests/unit/components/rotating-role.test.tsx`

- [ ] **Step 1: Write the failing test**
Add or update a test proving `RotatingRole` renders the role matching a supplied `activeIndex` and still remounts for animation when the index changes.

- [ ] **Step 2: Run test to verify it fails**
Run: `npm test -- tests/unit/components/rotating-role.test.tsx`
Expected: FAIL because `RotatingRole` currently owns its own timer and does not accept an external index.

- [ ] **Step 3: Write minimal implementation**
Refactor `RotatingRole` to accept `activeIndex` and render the corresponding role, preserving current empty-state behavior and keyed animation mount behavior.

- [ ] **Step 4: Run test to verify it passes**
Run: `npm test -- tests/unit/components/rotating-role.test.tsx`
Expected: PASS

## Chunk 4: Final verification

### Task 4: Run targeted verification

**Files:**
- Modify: `components/hero-split.tsx`
- Modify: `components/hero-split.module.css`
- Modify: `components/rotating-role.tsx`
- Modify: `tests/unit/components/hero-split.test.tsx`
- Modify: `tests/unit/components/rotating-role.test.tsx`
- Modify: `types/site.ts`
- Modify: `lib/site-copy.ts`

- [ ] **Step 1: Run the targeted tests**
Run: `npm test -- tests/unit/components/hero-split.test.tsx tests/unit/components/rotating-role.test.tsx tests/unit/style/rotating-role-animation-speed.test.ts`
Expected: PASS

- [ ] **Step 2: Run lint for touched files**
Run: `npm run lint`
Expected: PASS
