# Inner Page Vertical Grid Snap Design

## Context

The site already has a canonical layout frame and a visible grid overlay with horizontal rows repeating every `1.5rem`. The About, Projects, and Contact pages reuse the horizontal frame correctly, but they do not fully snap to the vertical overlay system in the rendered UI.

The current drift comes from two places:

- alignment-critical values that use fluid sizing or one-off rem literals
- shared shell elements whose rendered heights do not resolve cleanly to the overlay rhythm

Source-level spacing tests exist, but they mostly assert the presence of specific CSS literals. They do not prove that rendered boxes actually land on the overlay rows in the browser.

## Goal

Make `/about`, `/projects`, and `/contact` snap to the vertical overlay grid layout system at the rendered level, not just in source tokens.

This means:

- all alignment-critical spacing uses `rem`
- the affected UI resolves to a clean vertical rhythm based on the overlay row step
- repeated elements on those pages land on the system consistently across desktop, tablet, and mobile breakpoints

## Design Principles

### 1. Rhythm Wins Over Preservation

The current visual density should not be preserved at the expense of the system. A senior UI designer would retune the UI so the rhythm reads clearly and consistently.

Small adjustments to title size, line-height, chip height, row padding, nav height, and control height are acceptable if they make the whole page lock to one vertical system.

### 2. Discrete Rem Steps, Not Fluid Drift

For pages that must visibly snap to a vertical overlay grid, exact rhythm alignment matters more than smooth interpolation. Alignment-critical `clamp(...)` values should be removed from the inner-page shell and repeated elements on these routes.

Use breakpoint-specific `rem` steps instead.

### 3. Structural Edges Must Snap

The system should be visible in:

- header height and its internal control sizing
- page top and bottom offsets
- section starts and ends
- title and subtitle stack spacing
- project list row heights and internal gaps
- project detail header, summary, and detail row spacing
- contact row heights
- About chip heights and row spacing
- footer spacing

### 4. Typography Supports the Rhythm

The goal is not to force every line of text into an artificial box. The goal is to make the line boxes, line-heights, paddings, and component heights resolve cleanly to the rhythm.

Typography may be retuned where necessary so that:

- page titles
- project titles
- subtitles
- roles and labels
- summary and body copy

fit the vertical system without looking cramped or mechanical.

## Approved Design

### Shared Rhythm Rule

- Keep the overlay row as the canonical vertical step.
- Use `rem` only for touched alignment work.
- Remove alignment-critical `clamp(...)` values from `/about`, `/projects`, `/contact`, and the shell elements those pages depend on.
- Prefer a small discrete scale built from the existing rhythm, using approved subdivisions where needed.
- Keep JSX structure stable unless a real structural blocker appears during implementation.

### Scope

The change includes both the three inner pages and the shared shell that appears on them.

#### Shared Shell

- `components/site-header.module.css`
- `components/theme-toggle.module.css`
- `components/grid-overlay-toggle.module.css`
- `components/site-footer.module.css`
- shared page-level rules in `app/globals.css`

#### About

- intro stack
- paragraph spacing and line-height
- tech-stack row spacing
- chip height and padding

#### Projects

- filter toggle rhythm
- project list row rhythm
- project title, role, and action spacing
- detail header and summary spacing
- detail row padding and copy/media spacing
- back and visit controls

#### Contact

- intro stack
- contact list spacing
- contact row height and padding
- icon-to-text spacing

## Architecture

### CSS Ownership

- `app/globals.css` owns page-level rhythm, shared title/subtitle behavior, shared inner-page spacing, and any global vertical tokens.
- `components/site-header.module.css`, `components/theme-toggle.module.css`, `components/grid-overlay-toggle.module.css`, and `components/site-footer.module.css` own the shell rhythm.
- `components/project-filter.module.css`, `components/project-grid.module.css`, and `components/project-detail.module.css` own Projects-specific rhythm.

### Implementation Direction

- Keep this mostly a CSS pass.
- Reuse existing layout structure and grid columns.
- Normalize irregular values instead of introducing a new abstraction unless duplication becomes material.

## Testing

### Source-Level Guardrails

Update the existing style tests so they stop blessing fluid or off-scale values for the affected shell and inner-page surfaces.

This includes:

- `tests/unit/style/about-vertical-rhythm.test.ts`
- `tests/unit/style/projects-vertical-rhythm.test.ts`
- `tests/unit/style/header-width-alignment.test.ts`
- `tests/unit/style/footer-grid-alignment.test.ts`
- any focused shell/control rhythm assertions needed for header controls and footer spacing

### Browser-Level Guardrail

Add a Playwright regression that checks rendered rhythm alignment on:

- `/about`
- `/projects`
- `/contact`

The test should derive the overlay step from the runtime root font size and the canonical `1.5rem` row step, then verify that the key rendered elements land on that step within a small tolerance.

At minimum, the browser-level assertion should cover:

- header shell
- page top offset
- title/subtitle blocks
- About chips
- project list rows
- project detail header and rows
- contact links
- footer

## Success Criteria

- The rendered inner pages visually lock to the overlay rows.
- Alignment-critical values are expressed in `rem`, not `px`.
- The shell and the three inner pages read as one coherent vertical system.
- Targeted unit/style tests pass.
- The new browser-level rhythm regression passes.
