# Project Detail Borderless Editorial Layout Design

## Context

The Projects detail view now follows the slide deck by pairing text with media and alternating the media side. Each detail row is still styled as a card, with a soft background, border, rounded row container, and boxed padding. The requested direction is to remove that visible section treatment and make every project detail feel more like a modern editorial layout.

## Goal

Refresh every project detail row so it reads as one continuous borderless composition while preserving the alternating media/text rhythm, responsive reading order, and accessibility structure.

## Approved Design

### Visual Direction

- Remove the visible row card treatment: no per-row background, no row border, no row container radius, and no boxed row padding.
- Use whitespace, type hierarchy, and media placement to separate content instead of borders.
- Keep the overall detail panel as the outer container so the page does not become visually unanchored.
- Keep media borderless and visually clean, with a small radius only on the image or video surface for asset containment.

### Layout

- Preserve the existing alternating desktop layout:
  - Row 1: text left, media right.
  - Row 2: media left, text right.
  - Row 3: text left, media right.
- Preserve mobile reading order as text first, then media.
- Increase row rhythm enough that borderless rows remain scannable.
- Keep text-only project rows aligned with the same detail rhythm.

### Accessibility

- Keep semantic structure and heading hierarchy. The request to remove "section" is interpreted as removing visible section/card UI, not removing accessible structural HTML.
- Keep image alt text, video labels, captions, keyboard-accessible controls, and the existing back/visit interactions.

### Testing

- Update style coverage so it asserts detail rows are no longer part of the card radius contract and have no row border/background styling.
- Keep component tests focused on the alternating media/text behavior.
