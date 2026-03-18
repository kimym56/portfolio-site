# Home Hero Opacity Crossfade Design

## Goal

Make the home hero text and portrait transition feel smooth and gradual by using the same opacity-only crossfade on both sides of the layout.

## Design

The current hero already overlaps outgoing and incoming states, but the two halves do not read as one motion system. `RotatingRole` still uses vertical offset for the text while `HeroSplit` fades the portrait in place, so the handoff feels less gradual than it should.

`HeroSplit` should remain the single owner of rotation timing, `activeIndex`, `previousIndex`, and overlap cleanup. On each tick it should keep the previous and current indices mounted for one shared transition window, then clear the previous index after that window ends. That preserves the existing synchronization model and keeps text and portrait locked to one clock.

`RotatingRole` should render the outgoing and incoming labels in the same footprint and animate them with opacity only. Remove the current `y` offsets so the text no longer rises or falls during the handoff. The stack should preserve a stable heading footprint during overlap so the surrounding layout does not twitch while both labels are mounted.

The portrait should keep the same layered overlap structure and use the same duration and easing as the text. Keep the existing crop and framing, but ensure the image layers fade in place with no directional travel. Reduced-motion users should still receive immediate swaps with the overlap cleanup preserved.

## Files

- Modify `components/rotating-role.tsx` to remove vertical text motion and use opacity-only motion states.
- Modify `components/rotating-role.module.css` to keep the overlapping text footprint stable.
- Modify `components/hero-split.tsx` only as needed to keep portrait timing and easing aligned with the text crossfade.
- Modify `tests/unit/components/rotating-role.test.tsx` to cover overlap behavior without keyed-remount assumptions.
- Modify `tests/unit/style/hero-motion-direction.test.ts` to assert that role text no longer uses vertical travel.

## Testing

Run focused unit tests that verify overlapping outgoing and incoming role content during a controlled transition, the absence of vertical role motion in source-level guards, and the existing hero synchronization behavior for text and portrait during the shared overlap window.
