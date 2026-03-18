# Home Hero No-Flicker Portrait Design

## Goal

Remove the visible portrait flicker during hero rotation while keeping the current slow text motion intact.

## Design

The reported flicker happens before the next portrait fades in, which points to the portrait transition structure rather than text timing. In the current implementation, the active portrait layer is keyed by the next image source while the outgoing portrait layer is unkeyed. That makes the handoff more fragile during a tick and can briefly expose the background, especially because two of the portrait assets are transparent PNGs.

`HeroSplit` should remain the single owner of the shared rotation clock, `activeIndex`, `previousIndex`, and cleanup timing. The text transition in `RotatingRole` should remain unchanged.

The portrait side should become more conservative than the text. Reuse the existing portrait DOM node as the outgoing layer by keying the previous portrait layer with `previousImageSrc`. Keep the active portrait layer keyed by `activeImageSrc` so React can carry the old active layer forward instead of tearing it down and remounting a separate outgoing layer.

For the portrait animation itself, remove the vertical travel and use a fixed-position opacity crossfade only. That is the cleanest no-flicker option. Also give the portrait frame a solid `var(--surface)` background so the transparent PNG edges never reveal the page background during the overlap window.

## Files

- Modify `components/hero-split.tsx` to reuse the previous portrait layer by key and remove portrait `y` motion.
- Modify `components/hero-split.module.css` to add a stable surface background behind the portrait crossfade.
- Modify `tests/unit/style/hero-motion-direction.test.ts` to assert the portrait uses fixed-position opacity-only motion and keyed previous-layer reuse.

## Testing

Run focused tests that verify portrait motion no longer contains vertical travel, the previous portrait layer is keyed by `previousImageSrc`, the portrait frame has a solid surface background, and the existing hero overlap tests continue to pass.
