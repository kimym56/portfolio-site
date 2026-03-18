# About Tech Stack Chips Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add compact, category-colored tech stack chips under the About subtitle.

**Architecture:** Store the approved chip metadata in `SITE_COPY.about`, extend the About page type definitions to support the new structure, and render the chips directly in `app/about/page.tsx`. Use global About-page styles for the chip layout and color system, including light and dark theme variables, and verify behavior with focused unit tests.

**Tech Stack:** Next.js App Router, TypeScript, React Testing Library, Vitest

---

## Chunk 1: Data And Rendering

### Task 1: Write the failing About tech stack test

**Files:**
- Create: `tests/unit/pages/about-page-tech-stack.test.tsx`

- [ ] **Step 1: Add a test for the ordered About tech stack chips**

Write a test that renders `AboutPage`, expects an accessible `Tech stack` list, verifies the chip order, and checks representative category/proficiency classes.

- [ ] **Step 2: Run the new test to verify it fails**

Run: `npm run test -- tests/unit/pages/about-page-tech-stack.test.tsx`
Expected: FAIL because the About page does not yet render the tech stack list.

### Task 2: Add the tech stack data model

**Files:**
- Modify: `types/site.ts`
- Modify: `lib/site-copy.ts`

- [ ] **Step 1: Extend the About copy types**

Add typed category, proficiency, and tech stack item definitions used by `AboutCopy`.

- [ ] **Step 2: Add the approved About tech stack data**

Add the ordered chip list to `SITE_COPY.about.techStack`, grouped by category hue and using stronger vs softer proficiency values.

### Task 3: Render the About chips

**Files:**
- Modify: `app/about/page.tsx`

- [ ] **Step 1: Render the tech stack list under the subtitle**

Use a semantic list with `aria-label="Tech stack"` and render each chip from `SITE_COPY.about.techStack`.

- [ ] **Step 2: Attach stable styling classes**

Apply `about-chip`, category, and proficiency classes so the tests can verify the approved visual grouping logic.

## Chunk 2: Styling And Verification

### Task 4: Style the chip system

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add theme variables for chip colors**

Define light and dark theme variables for the three category families and their strong/soft saturation variants.

- [ ] **Step 2: Add About chip layout styles**

Add compact, borderless, responsive chip styles and spacing under the About subtitle.

### Task 5: Verify the change

**Files:**
- Test: `tests/unit/pages/about-page-tech-stack.test.tsx`
- Test: `tests/unit/pages/about-page-copy.test.tsx`

- [ ] **Step 1: Run the focused About page unit tests**

Run: `npm run test -- tests/unit/pages/about-page-tech-stack.test.tsx tests/unit/pages/about-page-copy.test.tsx`
Expected: PASS

- [ ] **Step 2: Commit**

```bash
git add docs/superpowers/specs/2026-03-18-about-tech-stack-chips-design.md docs/superpowers/plans/2026-03-18-about-tech-stack-chips.md types/site.ts lib/site-copy.ts app/about/page.tsx app/globals.css tests/unit/pages/about-page-tech-stack.test.tsx tests/unit/pages/about-page-copy.test.tsx
git commit -m "feat: add about page tech stack chips"
```
