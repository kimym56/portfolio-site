# Inner Page Always-On Stagger Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the About, Projects, and Contact pages reveal with a visible stagger on every render while preserving the existing first-visit route wrapper infrastructure.

**Architecture:** Keep `PageReveal` and the rewrite-based animated routes in place, but move the visible choreography to always-on CSS hooks applied directly in the shared page-content components. Lock the contract with one page-structure regression test and one CSS-source regression test so future edits cannot collapse the inner content back into a single animated body block.

**Tech Stack:** Next.js App Router, React, TypeScript, CSS, Vitest, Testing Library.

---

## Planned File Structure

- Modify: `app/globals.css`
- Modify: `components/about-page-content.tsx`
- Modify: `components/projects-page-content.tsx`
- Modify: `components/contact-page-content.tsx`
- Create: `tests/unit/pages/inner-page-stagger.test.tsx`
- Create: `tests/unit/style/inner-page-stagger-reveal.test.ts`

## Chunk 1: Lock In The Always-On Stagger Contract

### Task 1: Add failing regression tests for markup and CSS

**Files:**
- Create: `tests/unit/pages/inner-page-stagger.test.tsx`
- Create: `tests/unit/style/inner-page-stagger-reveal.test.ts`

- [ ] **Step 1: Write the failing page-structure test**

Render the shared About, Projects, and Contact page-content components and assert that each approved reveal step carries both the shared reveal class and the expected step-order class.

- [ ] **Step 2: Run the page-structure test to verify it fails**

Run:
```bash
npm test -- tests/unit/pages/inner-page-stagger.test.tsx
```
Expected: FAIL because the current page-content components do not expose explicit reveal-step classes.

- [ ] **Step 3: Write the failing CSS-contract test**

Read `app/globals.css` and assert that it defines an always-on reveal class, explicit step-delay classes for the approved sequence, and a reduced-motion rule that disables the always-on reveal animation.

- [ ] **Step 4: Run the CSS-contract test to verify it fails**

Run:
```bash
npm test -- tests/unit/style/inner-page-stagger-reveal.test.ts
```
Expected: FAIL because the current CSS only animates `[data-page-reveal="animated"]` blocks.

## Chunk 2: Implement The Shared Stagger Hooks

### Task 2: Add the always-on stagger classes and annotate the shared page content

**Files:**
- Modify: `app/globals.css`
- Modify: `components/about-page-content.tsx`
- Modify: `components/projects-page-content.tsx`
- Modify: `components/contact-page-content.tsx`
- Test: `tests/unit/pages/inner-page-stagger.test.tsx`
- Test: `tests/unit/style/inner-page-stagger-reveal.test.ts`

- [ ] **Step 1: Add the minimal CSS implementation**

Define reusable always-on reveal classes in `app/globals.css` that apply the existing opacity, upward-settle, and blur-cleanup language to explicit reveal items, with step-delay classes for the approved order and a reduced-motion rule that disables the animation.

- [ ] **Step 2: Update the shared page-content components**

Annotate the title, subtitle, and approved content blocks in the About, Projects, and Contact page-content components with the new reveal-step classes so the reveal order is explicit in markup.

- [ ] **Step 3: Run the focused regression tests**

Run:
```bash
npm test -- tests/unit/pages/inner-page-stagger.test.tsx tests/unit/style/inner-page-stagger-reveal.test.ts
```
Expected: PASS.

- [ ] **Step 4: Run broader verification**

Run:
```bash
npm test -- tests/unit/pages/inner-page-stagger.test.tsx tests/unit/style/inner-page-stagger-reveal.test.ts tests/unit/pages/about-page-copy.test.tsx tests/unit/components/project-filter.test.tsx
npm run build
```
Expected: PASS.
