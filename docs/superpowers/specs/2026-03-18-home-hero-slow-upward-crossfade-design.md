# Home Hero Slow Upward Crossfade Design

## Goal

Make the home hero transition feel slower and smoother by giving both the rotating role text and portrait image the same gradual upward crossfade.

## Design

The current hero uses an opacity-only crossfade. That is calmer than the earlier handoff, but it still reads too quick and blink-like for the desired feel. The next iteration should keep the shared overlap model while slowing the transition down and restoring directional motion.

`HeroSplit` should remain the single owner of the rotation clock, `activeIndex`, `previousIndex`, and overlap cleanup. Text and portrait should continue to switch on the same tick and clear the outgoing layer after one shared transition window.

`RotatingRole` should render outgoing and incoming labels in the same footprint and animate both layers upward while crossfading. The incoming label should start slightly lower with reduced opacity and rise into place. The outgoing label should fade while continuing upward out of the stack. Use a moderate travel distance so the motion is visible without becoming bouncy.

The portrait should use the same motion pattern and timing as the text. Keep the existing image crop and framing, but animate the image layer upward during the crossfade instead of leaving the portrait fixed in place. Reduced-motion users should still receive immediate swaps with the same cleanup model.

Use a slower shared transition duration of about `900ms` and a slightly longer hold interval so the hero still rests between changes. Keep the easing consistent across text and image so the motion reads as one system.

## Files

- Modify `components/rotating-role.tsx` to apply the slower upward crossfade to role text.
- Modify `components/hero-split.tsx` to apply the same slower upward crossfade to portrait images.
- Modify `tests/unit/style/hero-motion-direction.test.ts` to assert upward motion for both text and portrait.
- Modify `tests/unit/style/rotating-role-animation-speed.test.ts` to assert the slower shared duration and updated interval.

## Testing

Run focused tests that verify the motion source now includes upward travel for both text and portrait, the shared transition duration is in the slow range, and the existing overlap-based hero tests still pass with the new timing constants.
