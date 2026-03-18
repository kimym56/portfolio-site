# Cardless Inner Pages Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the shared card surface styling from the About, Projects, and Contact page sections without affecting other `.card` consumers.

**Architecture:** Keep the shared `.card` CSS rule unchanged and remove only the `card` class token from the three page-level `<section>` elements. Cover the behavior with a focused unit regression test that renders each page component and checks the top-level section class list.

**Tech Stack:** Next.js App Router, React, TypeScript, Vitest, Testing Library.

---

## Planned File Structure

- Modify: `app/about/page.tsx`
- Modify: `app/projects/page.tsx`
- Modify: `app/contact/page.tsx`
- Create: `tests/unit/pages/inner-pages-cardless.test.tsx`

## Chunk 1: Remove Shared Card Styling From Inner Pages

### Task 1: Update Page Sections and Lock the Behavior With a Regression Test

**Files:**
- Modify: `app/about/page.tsx`
- Modify: `app/projects/page.tsx`
- Modify: `app/contact/page.tsx`
- Create: `tests/unit/pages/inner-pages-cardless.test.tsx`

- [ ] **Step 1: Write the failing test**

Create a unit test that renders `AboutPage`, `ProjectsPage`, and `ContactPage`, finds the top-level `<section>` on each page, and asserts it does not include the shared `card` class.

- [ ] **Step 2: Run test to verify it fails**

Run:
```bash
npm test -- tests/unit/pages/inner-pages-cardless.test.tsx
```
Expected: FAIL because each page still renders `className="card ..."` on the top-level section.

- [ ] **Step 3: Write the minimal implementation**

Remove `card` from the section class list in the three page components and leave the page-specific classes intact.

- [ ] **Step 4: Run test to verify it passes**

Run:
```bash
npm test -- tests/unit/pages/inner-pages-cardless.test.tsx
```
Expected: PASS.

- [ ] **Step 5: Run focused regression verification**

Run:
```bash
npm test -- tests/unit/pages/inner-pages-cardless.test.tsx
npm run test:e2e -- about-page.spec.ts contact-page.spec.ts projects-filter.spec.ts
```
Expected: PASS.
