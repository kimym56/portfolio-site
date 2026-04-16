# Grid System Alignment Design

## Context

The `ymkim` portfolio currently mixes several layout systems. The global `.container` uses `min(1120px, 92vw)`, the header defines its own internal width, the home hero uses freeform fractional columns plus a percentage-based media width, and the projects list uses local grid fractions that do not align to the same outer structure. The new `GridOverlay` makes these mismatches visible.

## Goal

Refactor the UI so the site reads as one shared grid system rather than a set of locally aligned sections, while preserving the portfolio’s editorial character. The structural layout should feel disciplined and repeatable, but the hero should still have a deliberate, designed asymmetry instead of becoming mechanically rigid.

## Approved Design

### Canonical Frame

- Define one rem-based frame class in `app/globals.css`.
- That frame class owns all three structural rules together:
  - max content width
  - outer inline padding
  - column tracks and gaps
- Desktop uses a 12-column frame with:
  - `75rem` content width
  - `1.5rem` outer padding
  - `1.5rem` column gap
- Tablet collapses the same frame to 8 columns.
- Mobile collapses the same frame to 4 columns.
- New layout tokens and spacing rules should use `rem` values instead of `px`.

### Single Source Of Truth

- Header, hero, inner pages, project list, footer, and `GridOverlay` all use the same canonical frame contract.
- Do not split max width, padding, and grid tracks across separate wrapper classes.
- Do not create nested 12-column page shells unless a section actually needs its own internal layout.
- The overlay must match the exact same frame width, padding, and column math so it can act as the visual truth source.

### Controlled Exceptions

- Keep the hero visually expressive by assigning intentional column spans instead of using freeform width percentages.
- Recommended desktop hero structure:
  - copy on the left span
  - one breathing column between copy and media
  - media on the right span
- The exception is compositional, not structural: both halves still live on the same shared column system.

### Architecture

- Keep the frame definition in `app/globals.css`.
- Replace the previous `layout-shell` / `layout-grid` split with one canonical frame class.
- Update section-level CSS modules only where a component needs explicit column spans or internal track changes:
  - `components/site-header.module.css`
  - `components/hero-split.module.css`
  - `components/project-grid.module.css`
  - `components/site-footer.module.css`
- Keep JSX changes minimal and only where wrapper classes or structure must move onto the canonical frame:
  - `components/site-footer.tsx`
  - page content components
  - `components/grid-overlay.tsx`

### Testing

- Replace width-specific tests that assert `1120px`/`92vw` behavior with canonical-frame tests that assert:
  - one rem-based frame definition exists
  - structural sections use that exact frame class
  - the overlay uses that exact frame contract
  - the old split-wrapper approach is gone
  - hero and projects use explicit spans inside the single frame
- Keep tests source-based where the existing suite already validates CSS and JSX through file inspection.
