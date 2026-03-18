# Cardless Inner Pages Design

## Goal

Remove the shared card surface styling from the top-level About, Projects, and Contact page sections while keeping their existing spacing and content structure.

## Design

The current About, Projects, and Contact pages each render a `<section>` inside `main.page.container` with a shared `card` class plus a page-specific class. The visible border, background fill, and shadow come from the shared `.card` rule in `app/globals.css`.

The minimal design is to stop applying the shared `card` class on those three sections and keep the page-specific classes in place. That preserves the current padding and internal layout without changing any other component that relies on `.card`, including the home hero surface and project cards.

No global CSS token changes are needed. The existing `.about-card`, `.projects-card`, and `.contact-card` rules can continue acting as page-level spacing hooks even though they no longer represent surfaced cards.

## Files

- Modify `app/about/page.tsx` to remove `card` from the section class list.
- Modify `app/projects/page.tsx` to remove `card` from the section class list.
- Modify `app/contact/page.tsx` to remove `card` from the section class list.
- Add `tests/unit/pages/inner-pages-cardless.test.tsx` to assert the three page sections no longer render with the shared `card` class.

## Testing

Run a focused Vitest command for the new page regression test to verify it fails before the JSX change and passes after the change.
