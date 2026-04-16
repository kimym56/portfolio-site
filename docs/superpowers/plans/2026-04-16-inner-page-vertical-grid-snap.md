# Inner Page Vertical Grid Snap Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `/about`, `/projects`, and `/contact` snap to the vertical overlay grid at the rendered level by retuning shell and page rhythm with breakpoint-specific `rem` values.

**Architecture:** Keep the existing page and shell structure, normalize alignment-critical spacing and typography in the owning CSS files, and add both source-level and browser-level regression coverage so rendered rhythm drift is caught in the future.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS Modules, Vitest, Playwright

---

## File Map

- Modify: `app/globals.css`
- Modify: `components/site-header.module.css`
- Modify: `components/theme-toggle.module.css`
- Modify: `components/grid-overlay-toggle.module.css`
- Modify: `components/site-footer.module.css`
- Modify: `components/project-filter.module.css`
- Modify: `components/project-grid.module.css`
- Modify: `components/project-detail.module.css`
- Modify: `tests/unit/style/about-vertical-rhythm.test.ts`
- Modify: `tests/unit/style/projects-vertical-rhythm.test.ts`
- Modify: `tests/unit/style/header-width-alignment.test.ts`
- Modify: `tests/unit/style/footer-grid-alignment.test.ts`
- Create: `tests/e2e/inner-pages-vertical-grid.spec.ts`

## Chunk 1: Lock Down The New Behavior In Tests

### Task 1: Tighten shared inner-page and shell rhythm assertions

**Files:**
- Modify: `tests/unit/style/about-vertical-rhythm.test.ts`
- Modify: `tests/unit/style/header-width-alignment.test.ts`
- Modify: `tests/unit/style/footer-grid-alignment.test.ts`

- [ ] **Step 1: Write the failing tests**

Update the source tests to assert the approved non-fluid rhythm rules:

- `.page` no longer uses `clamp(...)` for inner-page vertical spacing
- touched title/subtitle spacing still lands on the approved scale
- About chip sizing uses rhythm-friendly `rem` values
- header rhythm no longer depends on irregular padding that breaks the overlay snap
- footer spacing uses rem values that resolve to the shared rhythm

- [ ] **Step 2: Run the tests to verify they fail**

Run:

```bash
npx vitest run \
  tests/unit/style/about-vertical-rhythm.test.ts \
  tests/unit/style/header-width-alignment.test.ts \
  tests/unit/style/footer-grid-alignment.test.ts
```

Expected: FAIL because the current shell and shared page rules still include off-rhythm values and fluid sizing.

### Task 2: Tighten Projects rhythm assertions

**Files:**
- Modify: `tests/unit/style/projects-vertical-rhythm.test.ts`

- [ ] **Step 1: Write the failing test**

Add assertions that the Projects page uses discrete `rem` rhythm values for:

- toggle spacing
- project list rows and internal spacing
- project title and role rhythm hooks
- project detail header, summary, section labels, and row padding

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npx vitest run tests/unit/style/projects-vertical-rhythm.test.ts
```

Expected: FAIL because Projects still contains fluid title sizing and several bespoke rhythm values.

### Task 3: Add a rendered vertical-grid regression

**Files:**
- Create: `tests/e2e/inner-pages-vertical-grid.spec.ts`

- [ ] **Step 1: Write the failing test**

Create a Playwright test that:

- opens `/about`, `/projects`, and `/contact`
- derives the overlay step from `1.5rem` at runtime
- measures key elements with `getBoundingClientRect()`
- asserts that top or height values of the approved structural elements land on the rhythm within a small tolerance

Use reduced motion during measurement so entry animations do not contaminate the boxes.

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npx playwright test tests/e2e/inner-pages-vertical-grid.spec.ts
```

Expected: FAIL because the current rendered shell and repeated inner-page elements do not fully align to the overlay rows.

## Chunk 2: Normalize Shared Shell And Page Rhythm

### Task 4: Retune the page-level inner-page rhythm

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Write the minimal implementation**

Update the shared inner-page rules so that:

- alignment-critical page spacing uses discrete `rem` values by breakpoint
- title/subtitle rhythm remains explicit and non-fluid where it affects page snap
- About paragraph and tech-stack groups preserve their approved subordinate spacing
- About chips use rhythm-friendly height and padding values
- Contact rows resolve to rhythm-friendly spacing

- [ ] **Step 2: Run the focused style tests**

Run:

```bash
npx vitest run tests/unit/style/about-vertical-rhythm.test.ts
```

Expected: PASS

### Task 5: Retune the shared shell rhythm

**Files:**
- Modify: `components/site-header.module.css`
- Modify: `components/theme-toggle.module.css`
- Modify: `components/grid-overlay-toggle.module.css`
- Modify: `components/site-footer.module.css`

- [ ] **Step 1: Write the minimal implementation**

Normalize the shell so that:

- header height and internal spacing resolve cleanly to the rhythm
- nav links and control buttons use rhythm-friendly control heights
- footer spacing also lands on the system
- touched values stay in `rem`

- [ ] **Step 2: Run the focused style tests**

Run:

```bash
npx vitest run \
  tests/unit/style/header-width-alignment.test.ts \
  tests/unit/style/footer-grid-alignment.test.ts
```

Expected: PASS

## Chunk 3: Normalize Projects Rhythm

### Task 6: Retune Projects list rhythm

**Files:**
- Modify: `components/project-filter.module.css`
- Modify: `components/project-grid.module.css`

- [ ] **Step 1: Write the minimal implementation**

Normalize the list view so that:

- filter controls use discrete `rem` spacing
- row padding and row internals land on the rhythm
- project title sizing and line-height stop drifting off-grid
- role/action alignment uses rhythm-friendly offsets

- [ ] **Step 2: Run the focused style test**

Run:

```bash
npx vitest run tests/unit/style/projects-vertical-rhythm.test.ts
```

Expected: PASS for list-view assertions

### Task 7: Retune Projects detail rhythm

**Files:**
- Modify: `components/project-detail.module.css`

- [ ] **Step 1: Write the minimal implementation**

Normalize the detail view so that:

- header spacing, title sizing, role sizing, and summary rhythm use discrete `rem` values
- detail rows, section blocks, labels, and meta list stay on the approved scale
- touched media labels and utility controls use rhythm-friendly `rem` values

- [ ] **Step 2: Run the focused style test**

Run:

```bash
npx vitest run tests/unit/style/projects-vertical-rhythm.test.ts
```

Expected: PASS

## Chunk 4: Browser Verification And Final Sweep

### Task 8: Make the rendered rhythm regression pass

**Files:**
- Modify: `app/globals.css`
- Modify: `components/site-header.module.css`
- Modify: `components/theme-toggle.module.css`
- Modify: `components/grid-overlay-toggle.module.css`
- Modify: `components/site-footer.module.css`
- Modify: `components/project-filter.module.css`
- Modify: `components/project-grid.module.css`
- Modify: `components/project-detail.module.css`
- Test: `tests/e2e/inner-pages-vertical-grid.spec.ts`

- [ ] **Step 1: Run the browser regression**

Run:

```bash
npx playwright test tests/e2e/inner-pages-vertical-grid.spec.ts
```

Expected: PASS

- [ ] **Step 2: Run the combined targeted verification**

Run:

```bash
npx vitest run \
  tests/unit/style/about-vertical-rhythm.test.ts \
  tests/unit/style/projects-vertical-rhythm.test.ts \
  tests/unit/style/header-width-alignment.test.ts \
  tests/unit/style/footer-grid-alignment.test.ts
```

Expected: PASS

- [ ] **Step 3: Run a leftover-value sweep**

Run:

```bash
rg -n "clamp\\(|0\\.72rem|0\\.73rem|0\\.8rem|0\\.85rem|0\\.87rem|0\\.88rem|0\\.92rem|0\\.96rem|1\\.05rem|1\\.075rem|1\\.1rem|1\\.18rem|1\\.2rem|2\\.35rem" \
  app/globals.css \
  components/site-header.module.css \
  components/theme-toggle.module.css \
  components/grid-overlay-toggle.module.css \
  components/site-footer.module.css \
  components/project-filter.module.css \
  components/project-grid.module.css \
  components/project-detail.module.css
```

Expected: no matches in the touched rhythm-critical rules
