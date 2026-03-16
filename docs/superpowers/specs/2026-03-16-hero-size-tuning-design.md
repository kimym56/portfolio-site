# Hero Size Tuning Design

## Goal

Increase the home hero portrait to the recommended balance point for this layout: larger visual presence without overpowering the text column.

## Design

The current hero portrait is already synchronized and visually concealed correctly, so this change only adjusts the size and crop. The desktop media frame will move from `62%` width to `72%` width and from `360px` minimum height to `420px` minimum height. The portrait crop will tighten slightly further so the subject reads larger inside the bigger frame.

Mobile should remain full-width, but the portrait can be slightly taller to preserve the stronger visual emphasis. The concealment layer and rotation behavior stay unchanged.

## Files

- Modify `components/hero-split.module.css` for the updated frame and crop.
- Modify `tests/unit/style/hero-image-scale.test.ts` to lock the new target values.

## Testing

Update the style test first, confirm it fails, then change the CSS and rerun the targeted hero tests and lint.
