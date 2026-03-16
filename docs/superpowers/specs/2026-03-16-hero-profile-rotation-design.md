# Hero Profile Rotation Design

## Goal

Replace the static hero placeholder image with `profile1.png`, `profile2.png`, and `profile3.png`, and keep the image swap synchronized with the existing `"I am ..."` rotating title.

## Design

The hero should use one shared active index for both the role text and the portrait image. `HeroSplit` will own the rotation timing so the text and image cannot drift apart. `RotatingRole` will become a presentational component that renders the current role for a provided `activeIndex`, preserving its existing enter animation behavior.

The home copy will include a `profileImages` array so the image sequence is explicit data rather than hardcoded in the component. `HeroSplit` will rotate over the shared index at the same default `3500ms` interval already used by the role text.

The image change should use a simple crossfade. The implementation will remount the visible image per index change to trigger a lightweight fade-in animation. Reduced-motion users should not receive the fade animation.

## Files

- Modify `types/site.ts` to add typed support for `profileImages`.
- Modify `lib/site-copy.ts` to provide the three portrait image paths.
- Modify `components/hero-split.tsx` to own the shared rotation state and render the synchronized image.
- Modify `components/hero-split.module.css` to add the portrait crossfade animation.
- Modify `components/rotating-role.tsx` so it renders from a provided `activeIndex`.
- Modify or add unit tests to verify the heading and portrait source advance together.

## Testing

Add a unit test that advances fake timers and verifies the active heading text and portrait `src` change in lockstep. Keep existing rotating-role animation coverage intact.
