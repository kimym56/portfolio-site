# Project Detail Scroll Stagger Design

## Context

`ProjectDetail` already renders editorial detail rows with alternating text and media, and it already uses `IntersectionObserver` to control comparison-video playback. The requested change is to make the project detail content feel more alive when the user scrolls down the page, instead of having every row appear statically once the detail panel is open.

## Goal

Add scroll-triggered staggered reveal motion to project detail rows while preserving the current alternating layout, media behavior, and reduced-motion accessibility.

## Approved Design

### Motion Direction

- Reveal each detail row once when it meaningfully enters the viewport.
- Stagger the row internals instead of delaying the whole page:
  - detail copy enters first
  - media follows shortly after when present
- Reuse the existing 600ms / 10px reveal language already used elsewhere in the site so the motion stays visually consistent.

### Architecture

- Keep the change local to `components/project-detail.tsx` and `components/project-detail.module.css`.
- Extend the current `IntersectionObserver`-driven behavior with a row-level visibility tracker that marks rows as revealed once they cross a viewport threshold.
- Render row visibility state through data attributes so CSS can handle the reveal and stagger timing.

### Accessibility

- Preserve `prefers-reduced-motion` behavior by rendering rows fully visible with no stagger animation.
- Keep existing semantic structure, captions, labels, and keyboard focus behavior unchanged.

### Testing

- Add component coverage that proves rows start unrevealed, then become revealed when the row observer reports intersection.
- Update style coverage so the reveal timing and stagger delay live in `project-detail.module.css` rather than only in component logic.
