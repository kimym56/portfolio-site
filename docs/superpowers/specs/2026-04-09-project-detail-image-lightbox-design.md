# Project Detail Image Lightbox Design

## Context

Project detail images currently render inline only. The requested change is to let users inspect image-based detail media at a larger size without leaving the project page or opening a new browser tab.

## Goal

Allow users to click standalone project detail images and view them in a modal-style overlay with a larger preview.

## Approved Design

### Interaction

- Only standalone images in `ProjectDetail` are clickable.
- Clicking an image opens a full-screen overlay above the page.
- The overlay closes on backdrop click, close button, or `Escape`.
- While open, body scroll is locked.

### Visual Direction

- Keep the overlay minimal and editorial: darkened backdrop, centered enlarged image, caption beneath.
- Preserve the existing inline image styling when closed.
- Do not change comparison frames or video media behavior.

### Accessibility

- Clickable images must expose button semantics and a readable label.
- The overlay should use dialog semantics.
- Keyboard users must be able to close with `Escape`.

### Testing

- Add component coverage for opening the overlay from an image.
- Assert the enlarged image and caption render in the overlay.
- Assert the overlay closes correctly.
