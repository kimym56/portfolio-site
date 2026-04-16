# Inner Page Vertical Rhythm Design

## Context

The About, Projects, and Contact pages already share the same horizontal frame, but their vertical spacing does not read as one system. The page intros use a clean `1.5rem` rhythm, while the rest of the UI mixes values such as `1.35rem`, `0.85rem`, `0.72rem`, `0.45rem`, and `clamp(...)` padding endpoints. The result is that the three pages feel related structurally but not rhythmically.

## Goal

Normalize the About, Projects, and Contact pages to one rem-only spacing scale so they feel like one UI system. The pages should preserve their current structure and editorial tone, with the Projects page receiving the largest spacing cleanup. The target scale is:

- `0.5rem`
- `1rem`
- `1.5rem`
- `2rem`

Use `1.5rem` as the main section rhythm.

## Approved Design

### Shared Rule

- Keep the current page structure.
- Keep all spacing values on the approved rem scale.
- Treat `1.5rem` as the default block-to-block spacing for page intros, page sections, and project rows.
- Use `1rem` and `0.5rem` as subordinate spacing values inside tighter content groups.
- Use `2rem` only where a larger pause is genuinely needed.
- Remove one-off rem values that do not belong to the scale.

### About

- Keep the current layout and content density.
- Replace uneven section `padding-block` with spacing that lands on the shared scale.
- Preserve the existing paragraph and tech-stack rhythm because it already fits the approved scale well.
- Do not redesign the page visually; this is a consistency pass.

### Projects

- Keep the list/detail structure and the overall editorial feel.
- Normalize list spacing so toggle spacing, row spacing, internal row gaps, and chip spacing all come from the approved scale.
- Normalize detail spacing so header spacing, summary spacing, row padding, and media/copy gaps read as one system.
- The Projects page should still feel denser than About, but not bespoke.

### Contact

- Keep the page minimal.
- Normalize outer section spacing to the shared scale.
- Normalize the icon-to-text gap and link padding to the approved scale.
- Preserve the restrained visual treatment.

## Architecture

- Keep the shared inner-page intro rhythm in `app/globals.css`.
- Update only the files that currently own vertical spacing for these pages:
  - `app/globals.css`
  - `components/project-filter.module.css`
  - `components/project-grid.module.css`
  - `components/project-detail.module.css`
- Keep JSX changes out unless implementation reveals a real structural need.

## Testing

- Update the existing source-based spacing tests to assert the new rem-scale values.
- Add or tighten focused tests for the Projects page so list and detail spacing stop drifting into bespoke values.
- Verify the touched tests fail before CSS changes and pass after the refactor.
