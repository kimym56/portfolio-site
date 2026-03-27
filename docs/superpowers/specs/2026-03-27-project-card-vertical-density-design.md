# Project Card Vertical Density Design

## Context

The current project cards feel vertically diffuse inside a fixed-height shell. The user wants to keep the current overall card height, but redistribute the internal content so the card reads from the top down more efficiently.

## Goal

Make project cards feel denser vertically without shrinking the overall card height.

## Approved Direction

Keep the card height unchanged, but restructure the interior into three zones:

1. Header zone at the top:
   - title, role, and arrow remain the first visible block
   - header content should sit near the top edge rather than feeling vertically centered
2. Description zone directly below the header:
   - description should follow the title row more immediately than it does now
   - this should tighten the editorial reading order
3. Chip zone at the bottom:
   - the technology chips should settle lower in the card as the final content block
   - the chips should not crowd the description, but they should clearly read as the bottom layer

## Layout Notes

- Keep the existing card interaction model and overall `min-height`
- Reduce top and bottom card padding slightly
- Preserve the current horizontal footprint
- Use layout flow to push the chip row downward rather than absolute positioning
- Keep the current card grid behavior and hover interaction model unless needed for balance

## Component Boundaries

- `components/project-grid.tsx` may keep the existing markup if CSS alone can express the new layout cleanly
- `components/project-grid.module.css` will carry the main change:
  - denser vertical padding
  - top-anchored content flow
  - description immediately below the header
  - chip row pushed toward the bottom of the fixed-height card

## Testing

Update style coverage to assert:

- current card height is preserved
- card content is structured for top-to-bottom distribution
- description spacing is tighter than before
- chip row is pushed down using layout flow
