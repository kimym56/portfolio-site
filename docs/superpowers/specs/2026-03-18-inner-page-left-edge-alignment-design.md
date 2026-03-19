# Inner Page Left Edge Alignment Design

## Goal

Align the full About, Projects, and Contact page content block to the same shared page grid as the header logo.

## Design

The header and the main page content already share the same outer container width through `min(1120px, 92vw)`. The visible mismatch comes from the inner page section classes adding horizontal padding inside that container, which pushes page titles and body content to the right of the header logo.

The minimal design is to keep the shared container unchanged and remove only the horizontal inset from the three inner page section wrappers. Vertical spacing should remain intact, so the section rules should keep the existing top and bottom spacing with `padding-block` while dropping horizontal padding entirely.

This preserves the current page architecture, keeps paragraph measure controlled by existing `max-width` rules, and lets local components such as project cards and contact links keep their own internal padding.

## Files

- Modify `app/globals.css` to replace the horizontal-and-vertical section padding on `.about-card`, `.projects-card`, and `.contact-card` with vertical-only padding.
- Add `tests/unit/style/inner-page-left-edge-alignment.test.ts` to lock the CSS behavior.

## Testing

Run a focused Vitest command for the new style regression test to verify it fails before the CSS change and passes after the update.
