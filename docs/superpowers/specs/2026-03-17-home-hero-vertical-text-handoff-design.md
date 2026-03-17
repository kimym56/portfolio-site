# Home Hero Vertical Text Handoff Design

## Goal

Make the home hero transition feel smoother and more legible by giving the rotating role text a subtle bottom-to-top handoff while keeping the portrait image mostly fade-led and visually calm.

## Design

The current hero motion uses the same blur-crossfade language for both text and image. That creates a polished dissolve, but it does not give the text a strong enough directional cue. For a portfolio hero, the best UI/UX balance is to let the text communicate the motion while keeping the portrait image stable and premium.

The role text should use a true vertical handoff. The outgoing line should fade out while moving slightly upward. The incoming line should start slightly below the resting position, then fade in and settle into place. The travel should stay restrained, around `8px` to `12px`, so the transition feels intentional without reading like a carousel or ticker.

The image should not move vertically. It should continue using overlapping outgoing and incoming layers, but the motion should remain mostly opacity-led. A very light blur or sharpen effect can remain if it helps the image fade feel softer, but the image should not compete with the text for motion attention.

`HeroSplit` should remain the single owner of the shared interval, `activeIndex`, `previousIndex`, and cleanup timing. `RotatingRole` should keep rendering overlapping outgoing and incoming text layers during the transition window, but its Framer Motion states should switch from blur-based text motion to vertical offset plus opacity. The image layers in `HeroSplit` should keep the same overlap timing so text and portrait still change on the same tick.

Framer Motion remains the best implementation choice because the hero already uses it, and it handles layered enter/exit states more cleanly than reintroducing CSS-only choreography. Reduced-motion users should still get near-instant swaps with no vertical travel. Single-role and single-image states should continue to bypass unnecessary transition work.

## Files

- Modify `components/rotating-role.tsx` to change the text animation from blur crossfade to vertical handoff plus opacity.
- Modify `components/hero-split.tsx` to keep the portrait transition fade-led and remove any image motion that conflicts with the calmer visual role.
- Modify `tests/unit/style/hero-motion-blur.test.ts` or replace it with a new motion-source test that asserts text vertical offsets and image fade-led motion.
- Modify `tests/unit/components/rotating-role.test.tsx` only if overlap behavior coverage needs to be adjusted for the new text motion states.
- Modify `tests/unit/components/hero-split.test.tsx` to keep synchronized text/image rotation behavior covered.
- Modify `tests/unit/style/rotating-role-animation-speed.test.ts` only if the timing guard needs to remain aligned with the approved transition window.

## Testing

Focused verification should prove four things: outgoing and incoming text still overlap during the handoff, text and image still rotate on the same shared tick, the source motion config now encodes vertical text offsets instead of blur-only text states, and the image transition remains fade-led without vertical travel. Full unit and build verification should continue to pass after the retune.
