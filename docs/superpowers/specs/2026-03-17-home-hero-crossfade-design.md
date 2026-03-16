# Home Hero Crossfade Design

## Goal

Make the home hero text and portrait rotation feel calm and synchronized by replacing the current remount-based enter animations with a same-moment crossfade.

## Design

The current hero behavior remounts the role node on every index change and fades the image in while removing the previous image on a separate timeout. Because the text uses vertical movement and the image uses a different cleanup window, the transition feels jumpy instead of subtle.

`HeroSplit` should remain the single owner of rotation timing. On each tick it should track the outgoing index, advance the active index, and keep both indices available for a short shared overlap window. After that window ends, it should clear the outgoing state with one cleanup timeout so the text and image stay aligned.

`RotatingRole` should stop depending on keyed remounts for animation. During the overlap window it should render the previous and current roles in the same footprint, fading the previous role out while fading the current role in. The text transition should be opacity-only. The current `translateY` motion should be removed.

The portrait should follow the same layered crossfade pattern. The outgoing and incoming images should overlap inside the existing media frame and fade at the same moment. Keep the current crop and scale so this change improves motion without changing the established portrait framing.

Use calmer shared timing. Increase the hold interval from `3500ms` to roughly `4500ms`, and use a shared crossfade duration around `320ms`. Reduced-motion users should receive immediate swaps without animated overlap.

## Files

- Modify `components/hero-split.tsx` to manage shared active/previous index state and synchronized transition cleanup.
- Modify `components/hero-split.module.css` to support layered image crossfades and reduced-motion behavior.
- Modify `components/rotating-role.tsx` to render current and previous roles without keyed remount animation.
- Modify `components/rotating-role.module.css` to replace the vertical enter animation with an opacity-only crossfade layout.
- Modify `tests/unit/components/hero-split.test.tsx` to verify image and text overlap during transitions and old layers are removed afterward.
- Modify `tests/unit/components/rotating-role.test.tsx` to replace remount assertions with overlap-based assertions.
- Modify `tests/unit/style/rotating-role-animation-speed.test.ts` to assert calmer timing and the absence of vertical motion.

## Testing

Update focused unit tests to cover synchronized text and image changes after the shared interval, coexistence of previous and current layers during the overlap window, cleanup of previous layers after the crossfade duration, and reduced-motion-safe CSS fallbacks.
