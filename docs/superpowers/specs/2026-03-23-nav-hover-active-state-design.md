# Nav Hover Active State Design

## Goal

Remove the visible border treatment from the header tab hover state, make hover emphasis rely on stronger font weight, and highlight the current route in the same text-only way.

## Design

The current primary navigation lives in `components/site-header.tsx` and `components/site-header.module.css`. Hover styling currently adds a soft background and border, while the component does not expose a current-route state for the nav links.

The minimal design is to make the header route-aware with `usePathname()` and mark the current link with `aria-current="page"`. CSS can then style both hover and current-route states together without introducing extra wrapper elements or page-specific logic.

The visual treatment should stay text-only. The nav links should not gain a border or background on hover or when active. Instead, both states should increase font weight so the interaction feels cleaner and the current tab remains visible without adding a filled pill treatment.

## Files

- Modify `components/site-header.tsx` to detect the current pathname and set `aria-current="page"` on the matching nav link.
- Modify `components/site-header.module.css` to remove hover border and background styling and use font-weight emphasis for hover and active states.
- Modify `tests/unit/components/site-header.test.tsx` to cover current-route highlighting semantics.
- Modify `tests/unit/style/header-and-footer-style-updates.test.ts` to lock the text-only nav styling in CSS.

## Testing

Run focused Vitest coverage for the header component and header style assertions. The new active-route test and CSS expectation should fail before implementation and pass after the component and stylesheet changes.
