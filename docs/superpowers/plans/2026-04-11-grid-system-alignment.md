# Grid System Alignment Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the `ymkim` portfolio to use one canonical rem-based grid frame across the header, hero, inner pages, project list, footer, and overlay.

**Architecture:** Define one canonical `layout-frame` in `app/globals.css` that owns max width, inline padding, and column tracks together. Move header, hero, page sections, footer, and overlay directly onto that frame, remove the split `layout-shell` / `layout-grid` model, and update source-based tests to verify one grid source of truth.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS Modules, Vitest

---

## Chunk 1: Canonical Frame Regression Tests

### Task 1: Replace split-wrapper assumptions with canonical-frame tests

**Files:**
- Modify: `tests/unit/style/header-width-alignment.test.ts`
- Modify: `tests/unit/style/home-main-fullwidth.test.ts`
- Modify: `tests/unit/style/inner-page-left-edge-alignment.test.ts`
- Create: `tests/unit/style/grid-system-foundation.test.ts`
- Test: `tests/unit/style/header-width-alignment.test.ts`
- Test: `tests/unit/style/home-main-fullwidth.test.ts`
- Test: `tests/unit/style/inner-page-left-edge-alignment.test.ts`
- Test: `tests/unit/style/grid-system-foundation.test.ts`

- [ ] **Step 1: Write the failing tests**

Assert that:
- `app/globals.css` defines a single rem-based `layout-frame`.
- `app/page.tsx`, page sections, header, footer, and overlay use that canonical frame.
- the split `layout-shell` / `layout-grid` approach is gone.
- the header no longer depends on `min(1120px, 92vw)`.

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- tests/unit/style/header-width-alignment.test.ts tests/unit/style/home-main-fullwidth.test.ts tests/unit/style/inner-page-left-edge-alignment.test.ts tests/unit/style/grid-system-foundation.test.ts`
Expected: FAIL because the source still uses the split wrapper model and the old structure is still present.

## Chunk 2: Global Frame Foundation

### Task 2: Introduce the canonical rem-based frame

**Files:**
- Modify: `app/globals.css`
- Modify: `app/page.tsx`
- Modify: `components/about-page-content.tsx`
- Modify: `components/projects-page-content.tsx`
- Modify: `components/contact-page-content.tsx`
- Test: `tests/unit/style/header-width-alignment.test.ts`
- Test: `tests/unit/style/home-main-fullwidth.test.ts`
- Test: `tests/unit/style/inner-page-left-edge-alignment.test.ts`
- Test: `tests/unit/style/grid-system-foundation.test.ts`

- [ ] **Step 1: Write minimal implementation**

Add one shared `.layout-frame` that owns:
- outer width
- inline padding
- responsive 12/8/4 column tracks
- shared gap values

Update the home page, header, footer, overlay, and inner page sections so they sit directly on that frame instead of composing multiple layout wrappers.

- [ ] **Step 2: Run the foundation tests**

Run: `npm test -- tests/unit/style/header-width-alignment.test.ts tests/unit/style/home-main-fullwidth.test.ts tests/unit/style/inner-page-left-edge-alignment.test.ts tests/unit/style/grid-system-foundation.test.ts`
Expected: PASS

## Chunk 3: Section-Level Alignment On The Canonical Frame

### Task 3: Move header and footer onto the shared grid

**Files:**
- Modify: `components/site-header.module.css`
- Modify: `components/site-footer.tsx`
- Modify: `components/site-footer.module.css`
- Test: `tests/unit/style/header-width-alignment.test.ts`
- Create: `tests/unit/style/footer-grid-alignment.test.ts`

- [ ] **Step 1: Write the failing footer/header assertions**

Assert that:
- header layout uses the canonical frame instead of split shell/grid wrappers
- footer content uses the same frame instead of a centered independent container

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- tests/unit/style/header-width-alignment.test.ts tests/unit/style/footer-grid-alignment.test.ts`
Expected: FAIL

- [ ] **Step 3: Write minimal implementation**

Update header and footer CSS/markup to use the canonical frame and rem-based spacing.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- tests/unit/style/header-width-alignment.test.ts tests/unit/style/footer-grid-alignment.test.ts`
Expected: PASS

### Task 4: Fit the hero to intentional shared column spans

**Files:**
- Modify: `components/hero-split.module.css`
- Test: `tests/unit/style/hero-grid-alignment.test.ts`

- [ ] **Step 1: Write the failing hero alignment test**

Assert that:
- `.hero` uses the canonical frame
- `.copy` and `.media` use explicit column spans
- `.media` no longer uses percentage width

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/unit/style/hero-grid-alignment.test.ts`
Expected: FAIL

- [ ] **Step 3: Write minimal implementation**

Keep the existing hero structure, but assign desktop/tablet/mobile column spans with rem-based gaps and sizing.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/unit/style/hero-grid-alignment.test.ts`
Expected: PASS

### Task 5: Fit the project list to repeatable grid tracks

**Files:**
- Modify: `components/project-grid.module.css`
- Test: `tests/unit/style/project-grid-column-system.test.ts`

- [ ] **Step 1: Write the failing project-grid test**

Assert that the project row layout uses explicit grid tracks or column spans tied to the shared layout system and no longer relies on the current ad hoc fractions for structural alignment.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/unit/style/project-grid-column-system.test.ts`
Expected: FAIL

- [ ] **Step 3: Write minimal implementation**

Update the project row content grid so title, role, description, chips, and action align predictably with the same column math used by the frame across breakpoints.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/unit/style/project-grid-column-system.test.ts`
Expected: PASS

## Chunk 4: Final Verification

### Task 6: Run the targeted layout regression suite

**Files:**
- Test: `tests/unit/style/header-width-alignment.test.ts`
- Test: `tests/unit/style/home-main-fullwidth.test.ts`
- Test: `tests/unit/style/inner-page-left-edge-alignment.test.ts`
- Test: `tests/unit/style/grid-system-foundation.test.ts`
- Test: `tests/unit/style/footer-grid-alignment.test.ts`
- Test: `tests/unit/style/hero-grid-alignment.test.ts`
- Test: `tests/unit/style/project-grid-column-system.test.ts`
- Test: `tests/unit/style/root-layout-grid-overlay.test.ts`
- Test: `tests/unit/components/grid-overlay.test.tsx`

- [ ] **Step 1: Run the final verification suite**

Run: `npm test -- tests/unit/style/header-width-alignment.test.ts tests/unit/style/home-main-fullwidth.test.ts tests/unit/style/inner-page-left-edge-alignment.test.ts tests/unit/style/grid-system-foundation.test.ts tests/unit/style/footer-grid-alignment.test.ts tests/unit/style/hero-grid-alignment.test.ts tests/unit/style/project-grid-column-system.test.ts tests/unit/style/root-layout-grid-overlay.test.ts tests/unit/components/grid-overlay.test.tsx`
Expected: PASS

- [ ] **Step 2: Inspect the touched files for leftover pixel-based layout rules**

Run: `rg -n "\\b[0-9]+px\\b" app/globals.css components/site-header.module.css components/hero-split.module.css components/project-grid.module.css components/site-footer.module.css`
Expected: no new layout-critical pixel values introduced by the refactor

- [ ] **Step 3: Commit**

```bash
git add app/globals.css app/page.tsx components/about-page-content.tsx components/projects-page-content.tsx components/contact-page-content.tsx components/site-header.module.css components/hero-split.module.css components/project-grid.module.css components/site-footer.tsx components/site-footer.module.css tests/unit/style/header-width-alignment.test.ts tests/unit/style/home-main-fullwidth.test.ts tests/unit/style/inner-page-left-edge-alignment.test.ts tests/unit/style/grid-system-foundation.test.ts tests/unit/style/footer-grid-alignment.test.ts tests/unit/style/hero-grid-alignment.test.ts tests/unit/style/project-grid-column-system.test.ts docs/superpowers/specs/2026-04-11-grid-system-alignment-design.md docs/superpowers/plans/2026-04-11-grid-system-alignment.md
git commit -m "refactor: align portfolio UI to shared grid system"
```
