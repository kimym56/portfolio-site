# Project Detail Entry Stagger Design

## Context

`ProjectFilter` swaps the editorial project list into `ProjectDetail` when a card is selected. The destination view already has scroll-triggered row reveals, but the initial list-to-detail transition still uses a single blanket panel animation instead of the shared `page-stagger` rhythm used on About, Contact, and the projects landing content.

## Goal

Make the first-open project detail entry feel like the other inner pages by reusing the shared stagger sequence during the list-to-detail transition, while keeping the existing row-level scroll reveal behavior intact.

## Approved Design

### Motion Direction

- Replace the one-shot detail panel reveal with the shared `page-stagger` cadence.
- Stagger the detail shell in editorial order:
  - header title row first
  - role second
  - summary block third
  - body container fourth
- Keep the existing row-level `IntersectionObserver` reveal behavior for the detail rows after the page has opened.

### Architecture

- Keep the change local to `components/project-detail.tsx`, `components/project-detail.module.css`, and the related tests.
- Continue using `animateOnFirstOpen` from `ProjectFilter` as the only trigger for first-open motion.
- Emit `page-stagger` utility classes from `ProjectDetail` when `animateOnFirstOpen` is enabled instead of relying on a dedicated panel animation.

### Accessibility

- Preserve `prefers-reduced-motion` behavior by letting the shared global reduced-motion rules suppress stagger animation.
- Keep the current semantic structure, keyboard navigation, and scroll reveal fallback behavior unchanged.

### Testing

- Add component coverage proving the detail shell receives the expected `page-stagger` sequence only when first-open animation is enabled.
- Update style coverage so the project-detail motion tests assert alignment with the shared `page-stagger` system instead of a custom panel keyframe.
