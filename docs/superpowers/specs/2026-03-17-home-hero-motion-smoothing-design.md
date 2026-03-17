# Home Hero Motion Smoothing Design

## Goal

Make the home hero text and portrait transition feel less abrupt by slowing the motion down and changing the text handoff from an enter-only swap to a true overlap crossfade.

## Design

The current Framer Motion hero uses a calm `4500ms` hold, but the motion itself still feels rushed because both text and image complete their transition in roughly `320ms`, and the text only animates the incoming role. That makes the handoff read more like a quick replacement than a soft dissolve.

The image transition model in `HeroSplit` is already structurally close to the desired behavior: it keeps the previous image mounted briefly while the next image fades in. That should remain intact, but its shared transition duration should be increased into the calmer `420ms` to `480ms` range so the image does not feel faster than the text.

The main change should happen in `RotatingRole`. Instead of animating only the incoming role, it should render both the outgoing and incoming role during the overlap window and let them crossfade in the same footprint. The text should use opacity-first motion with no visible vertical movement. If any positional movement remains, it should be small enough to disappear into the fade.

`HeroSplit` should continue to own the rotation clock, active index, previous index, and cleanup timing. `RotatingRole` should use the existing `previousIndex` and `isTransitioning` props to render the outgoing role while the overlap window is active. This keeps timing centralized and avoids broadening the scope beyond the home hero.

Reduced-motion users should still receive immediate or near-instant swaps. Single-role and single-image states should continue to bypass unnecessary transition behavior.

## Files

- Modify `components/rotating-role.tsx` to render outgoing and incoming text layers during the overlap window.
- Modify `components/rotating-role.module.css` only if the stacked text layout needs minor structural support.
- Modify `components/hero-split.tsx` to tune the shared transition duration and easing for the image fade.
- Modify `tests/unit/components/rotating-role.test.tsx` to verify overlapping outgoing and incoming role content during a controlled transition.
- Modify `tests/unit/components/hero-split.test.tsx` to keep verifying synchronized text and image changes at the shared tick.
- Modify `tests/unit/style/rotating-role-animation-speed.test.ts` or equivalent timing coverage so the calmer transition range is asserted at the source of truth.

## Testing

Focused tests should prove three things: the text overlap exists during transition, the image and text still advance together on the same interval, and the shared transition duration has moved into the calmer range. Full unit verification should continue to pass after the motion tuning.
