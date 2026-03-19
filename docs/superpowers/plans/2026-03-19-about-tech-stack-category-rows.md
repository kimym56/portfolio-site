# About Tech Stack Category Rows Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Render the About page tech stack as three category-only chip rows without visible row labels.

**Architecture:** Keep the existing `SITE_COPY.about.techStack` data flat, but group it by category inside `app/about/page.tsx` using a fixed category order. Replace the single chip list with an outer labeled group plus three inner category lists, then update the About page CSS so rows stack vertically while each row wraps only within its own category. Verify the behavior with focused page and style tests.

**Tech Stack:** Next.js App Router, TypeScript, React Testing Library, Vitest

---

## Chunk 1: Tests And Rendering

### Task 1: Write the failing About page grouping test

**Files:**
- Modify: `tests/unit/pages/about-page-tech-stack.test.tsx`

- [ ] **Step 1: Update the test to expect three category row lists**

Assert that the About page renders a `Tech stack` group containing `Frontend tech stack`, `Design tech stack`, and `AI tech stack` lists in that order, with the expected chip text in each row.

- [ ] **Step 2: Run the page test to verify it fails**

Run: `npm test -- tests/unit/pages/about-page-tech-stack.test.tsx`
Expected: FAIL because the page still renders one flat chip list.

### Task 2: Render grouped category rows

**Files:**
- Modify: `app/about/page.tsx`

- [ ] **Step 1: Add fixed category order helpers**

Define the approved category order and accessible row labels near the top of the module.

- [ ] **Step 2: Group the flat tech stack data by category**

Derive three grouped arrays from `SITE_COPY.about.techStack` without changing the source data shape.

- [ ] **Step 3: Replace the flat list with grouped category lists**

Render an outer labeled group plus three category-specific lists, keeping the existing chip classes on each chip.

## Chunk 2: Styling And Verification

### Task 3: Update the stacked row styles

**Files:**
- Modify: `app/globals.css`
- Modify: `tests/unit/style/about-tech-stack-three-line-layout.test.ts`

- [ ] **Step 1: Replace the old width-constrained layout assertion**

Update the style test to verify a stacked outer container plus wrapping row lists instead of the previous three-line width cap.

- [ ] **Step 2: Update the About tech stack styles**

Make `.about-tech-stack` a vertical stack and add `.about-tech-stack-row` for per-category chip wrapping, while preserving chip visuals.

- [ ] **Step 3: Run the updated style test to verify it passes**

Run: `npm test -- tests/unit/style/about-tech-stack-three-line-layout.test.ts`
Expected: PASS

### Task 4: Verify the change

**Files:**
- Test: `tests/unit/pages/about-page-tech-stack.test.tsx`
- Test: `tests/unit/style/about-tech-stack-three-line-layout.test.ts`

- [ ] **Step 1: Run the focused tests**

Run: `npm test -- tests/unit/pages/about-page-tech-stack.test.tsx tests/unit/style/about-tech-stack-three-line-layout.test.ts`
Expected: PASS

- [ ] **Step 2: Confirm the live page behavior**

Check the About page in a browser and confirm that category rows no longer mix chips from different categories.
