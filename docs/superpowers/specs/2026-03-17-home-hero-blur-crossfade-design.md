# Home Hero Blur Crossfade Design

## Goal

Make the home hero text and portrait changes read as visibly smooth by replacing the current plain crossfade with a restrained blur crossfade that feels polished instead of abrupt.

## Design

The current hero transition already overlaps outgoing and incoming layers, but it still feels unsatisfying because the motion cue is mostly just opacity. The local timing experiment in `components/rotating-role.tsx` also pushes the hero too far toward constant motion: a `1500ms` hold with a `1040ms` transition leaves too little settled time between changes. The next iteration should restore a calmer interval and give the motion more texture rather than simply making it longer.

Both the role text and the portrait image should use the same blur-crossfade model. The outgoing layer should fade out while picking up a small amount of blur. The incoming layer should start slightly blurred, then fade in and sharpen to full clarity. This gives users a visible sign that the content changed without introducing directional motion like sliding or swiping.

The text blur can be a little stronger than the image blur because text sharpness changes read cleanly and help sell the handoff. The image blur should stay lighter so the portrait does not look muddy. Neither layer should add visible translation. The motion cue should come from dissolve plus sharpen, not movement.

`HeroSplit` should remain the single source of truth for rotation timing, active index, previous index, and overlap cleanup. `RotatingRole` should continue to render outgoing and incoming text layers during the overlap window, but its Framer Motion values should include blur on enter and exit. The image layers in `HeroSplit` should mirror that pattern using the same shared transition duration and easing so both sides of the hero stay locked together.

Reduced-motion users should still get immediate or near-immediate swaps with no blur animation. Single-role and single-image states should continue to bypass unnecessary transition work.

## Files

- Modify `components/rotating-role.tsx` to restore calmer shared timing and animate text with opacity plus blur.
- Modify `components/hero-split.tsx` to animate portrait layers with the same shared blur-crossfade timing.
- Modify `tests/unit/components/rotating-role.test.tsx` to keep overlap behavior covered if needed by the final implementation.
- Modify `tests/unit/components/hero-split.test.tsx` to keep synchronized text/image rotation behavior covered.
- Modify `tests/unit/style/rotating-role-animation-speed.test.ts` to assert the restored interval and transition balance.
- Add or update a focused test that asserts the intended blur-based motion values exist in the text and image transition source.

## Testing

Focused verification should prove four things: the shared timing returns to a calmer interval/transition ratio, text and image still rotate together, overlap cleanup still works, and the Framer Motion configuration now includes blur on both enter and exit paths. Full unit and build verification should continue to pass after the motion update.
