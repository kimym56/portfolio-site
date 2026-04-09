# Projects Editorial List And Detail Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the Projects overview and selected detail view into a quieter editorial layout that matches Home and About.

**Architecture:** Keep `ProjectsPageContent`, `ProjectFilter`, `ProjectGrid`, and `ProjectDetail` as the existing rendering boundaries. Shift hierarchy away from bordered controls and cards into text tabs, divider-based list rows, and border-light detail sections, while preserving current filtering, selection, animation, and responsive media behavior.

**Tech Stack:** Next.js, React, TypeScript, CSS Modules, Vitest, Testing Library.

---

## Chunk 1: Projects Overview Styling

### Task 1: Add or update style coverage for the overview contract

**Files:**
- Inspect/Modify: `tests/unit/style/*.test.ts`
- Inspect/Modify: `tests/unit/components/*.test.tsx`

- [ ] **Step 1: Find the existing style or component tests covering the projects toggle and overview cards**

Run: `rg -n "project-filter|project-grid|toggle|project-card" tests/unit`
Expected: locate the current tests that should be extended instead of creating redundant coverage.

- [ ] **Step 2: Write failing assertions for the lighter overview treatment**

Add assertions covering:

```text
project toggle container no longer uses a visible border shell
project rows are no longer styled as bordered cards
project titles remain present and selectable
```

- [ ] **Step 3: Run the focused tests to verify failure**

Run: `npm run test -- <focused test paths>`
Expected: FAIL because the current overview still uses bordered toggle and card styling.

### Task 2: Implement the lightweight tab switcher

**Files:**
- Modify: `components/project-filter.module.css`
- Modify: `components/project-filter.tsx`

- [ ] **Step 1: Remove bordered segmented-control chrome**

Replace the current bordered `.toggles` container with a text-led tab pattern using spacing and an active underline/divider.

- [ ] **Step 2: Keep current behavior intact**

Preserve `aria-pressed`, current tab state, once-only reveal behavior, and reduced-motion behavior.

- [ ] **Step 3: Adjust indicator implementation as needed**

Either adapt the moving pill into a lighter underline treatment or replace it with a simpler active-state element without changing tab semantics.

- [ ] **Step 4: Run focused tests**

Run: `npm run test -- <focused test paths>`
Expected: PASS for the updated tab contract.

### Task 3: Implement editorial overview rows

**Files:**
- Modify: `components/project-grid.tsx`
- Modify: `components/project-grid.module.css`

- [ ] **Step 1: Remove `.card` usage from overview project items**

Stop relying on the global bordered card class for project list entries.

- [ ] **Step 2: Restructure each project as an editorial row**

Keep the button semantics, but style each entry as a divider-based row with:

```text
large project title
muted uppercase role
short description
simple arrow affordance
```

- [ ] **Step 3: Preserve responsive behavior**

Keep the list readable on mobile without reintroducing boxed UI chrome.

- [ ] **Step 4: Run focused tests**

Run: `npm run test -- <focused test paths>`
Expected: PASS for project selection and updated overview rendering.

## Chunk 2: Project Detail Styling

### Task 4: Add or update style coverage for editorial detail view

**Files:**
- Modify: `tests/unit/style/*.test.ts`
- Modify: `tests/unit/components/project-detail.test.tsx`

- [ ] **Step 1: Extend tests for the approved `D1` direction**

Add assertions that the selected project state no longer depends on a bordered panel/button treatment for its main hierarchy.

- [ ] **Step 2: Preserve existing behavioral assertions**

Keep coverage for alternating media placement, reduced motion, comparison media, and back navigation.

- [ ] **Step 3: Run the focused tests to verify failure**

Run: `npm run test -- <focused test paths>`
Expected: FAIL because the current detail view still uses panel and pill-button chrome.

### Task 5: Implement editorial detail view

**Files:**
- Modify: `components/project-detail.tsx`
- Modify: `components/project-detail.module.css`

- [ ] **Step 1: Remove the outer panel feel**

Reduce or remove visible panel framing so the selected project reads as part of the same editorial page.

- [ ] **Step 2: Simplify controls**

Restyle back and visit actions so they feel like editorial navigation instead of rounded buttons with borders.

- [ ] **Step 3: Keep section and media rhythm**

Preserve the alternating text/media structure, section headings, captions, and media comparison behavior while using dividers and whitespace for hierarchy.

- [ ] **Step 4: Keep mobile and reduced-motion behavior**

Do not regress text-first mobile order or current reduced-motion behavior.

- [ ] **Step 5: Run focused tests**

Run: `npm run test -- <focused test paths>`
Expected: PASS for the updated detail styling and existing behavior.

## Chunk 3: Verification

### Task 6: Validate the full change set

**Files:**
- Test: repo verification commands

- [ ] **Step 1: Run targeted unit tests**

Run: `npm run test -- tests/unit/components/project-detail.test.tsx tests/unit/components/project-filter.test.tsx tests/unit/style/*.test.ts`
Expected: PASS, adjusting exact paths to the tests discovered in Task 1.

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: PASS.

- [ ] **Step 3: Run build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 4: Run browser verification for `/projects`**

Run the configured e2e test if available, or the equivalent local browser flow against the active dev server.
Expected: the overview renders text tabs and divider rows, selecting a project opens the editorial detail view, and media behavior still works.

- [ ] **Step 5: Review the final diff**

Run: `git diff --stat && git diff --check`
Expected: diff is limited to Projects overview/detail styling, related tests, and docs.
