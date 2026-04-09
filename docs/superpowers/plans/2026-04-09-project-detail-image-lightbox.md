# Project Detail Image Lightbox Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a modal-style enlarged image view for standalone project-detail images.

**Architecture:** Keep the change local to `ProjectDetail`. Track the selected image in component state, render a lightweight dialog overlay when an image is active, and leave existing video/comparison media behavior unchanged. Update the component test to cover image open and close behavior.

**Tech Stack:** Next.js, React, TypeScript, CSS Modules, Vitest, Testing Library.

---

## Chunk 1: Lightbox Behavior

### Task 1: Write the failing component test

**Files:**
- Modify: `tests/unit/components/project-detail.test.tsx`

- [ ] **Step 1: Add a test for opening the enlarged image overlay**

Assert that clicking a standalone project image opens a dialog with the same image source and caption.

- [ ] **Step 2: Add a close assertion**

Assert that the overlay closes on the close control or backdrop interaction.

- [ ] **Step 3: Run the focused test to verify failure**

Run: `npm run test -- tests/unit/components/project-detail.test.tsx`
Expected: FAIL because no image lightbox exists yet.

### Task 2: Implement the lightbox

**Files:**
- Modify: `components/project-detail.tsx`
- Modify: `components/project-detail.module.css`

- [ ] **Step 1: Add selected-image state**

Store the clicked standalone image and clear it on close.

- [ ] **Step 2: Make standalone images clickable**

Wrap only standalone images with an accessible trigger and keep videos/comparison media unchanged.

- [ ] **Step 3: Render the overlay dialog**

Render the enlarged image, caption, close control, and backdrop.

- [ ] **Step 4: Add close behavior**

Support close button, backdrop click, and `Escape`, and lock body scroll while open.

- [ ] **Step 5: Run the focused test**

Run: `npm run test -- tests/unit/components/project-detail.test.tsx`
Expected: PASS.

## Chunk 2: Verification

### Task 3: Validate the change

**Files:**
- Test: repo verification commands

- [ ] **Step 1: Run focused tests**

Run: `npm run test -- tests/unit/components/project-detail.test.tsx tests/unit/components/project-filter.test.tsx`
Expected: PASS.

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: PASS.
