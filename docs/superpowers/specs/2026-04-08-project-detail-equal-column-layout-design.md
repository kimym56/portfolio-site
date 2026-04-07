# Project Detail Equal Column Layout Design

## Context

The project detail view uses alternating two-column rows for media and copy. The current desktop ratio is slightly weighted toward the media side (`0.95fr / 1.05fr`), which makes the slide-like layout feel uneven.

## Goal

Make every media/text project detail row use an exact 50:50 desktop split while preserving the alternating left/right media rhythm and the borderless editorial treatment.

## Approved Design

- Use `minmax(0, 1fr) minmax(0, 1fr)` for desktop rows with media.
- Keep the same equal column rule for left-media rows; only the visual order changes.
- Keep mobile layout stacked with text first, then media.
- Keep text-only rows unchanged.
- Keep the borderless row treatment unchanged.

## Testing

- Add style coverage for equal desktop columns in `project-detail.module.css`.
- Keep existing component tests for row order and media pairing.
