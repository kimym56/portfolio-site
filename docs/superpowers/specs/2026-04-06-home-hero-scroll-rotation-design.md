# Home Hero Scroll Rotation Design

## Goal

Allow desktop users to rotate the home hero manually with scroll input while keeping the page visually fixed and preserving the existing timed auto-rotation.

## Design

The desktop home page already behaves like a fixed stage: the page does not scroll and the hero owns the user's attention. The new interaction should keep that presentation model, but treat wheel and trackpad scroll input as a hero control instead of a page navigation gesture.

`HeroSplit` should remain the single owner of hero state and timing. Both auto-rotation and manual input should use the same shared rotation path so the role text and portrait image always move together, keep the same `activeIndex` and `previousIndex` overlap model, and clear the outgoing layer through one shared cleanup window.

On desktop home only, scrolling down should rotate the hero forward by one item and scrolling up should rotate it backward by one item. Manual scroll input should not produce visible page movement and should not expose a scrollbar. After a manual rotation, the auto-rotation timer should restart from that moment so the next timed change does not happen immediately after the user interaction.

To keep the interaction predictable, one physical wheel gesture should map to one hero step. The implementation should guard against repeated wheel events by using a short cooldown aligned with the existing transition window. This avoids rapid multi-step jumps on sensitive trackpads while still feeling responsive.

Mobile behavior should remain unchanged. Reduced-motion users should keep the current immediate-swap behavior, with manual direction changes still updating text and image in sync.

## Files

- Modify `components/hero-split.tsx` to centralize forward/back rotation, reset the timer after manual input, and attach desktop-only wheel direction handling.
- Modify `app/page.tsx` if needed to pass a desktop/manual-rotation mode flag into the home hero without changing inner-page behavior.
- Modify `tests/unit/components/hero-split.test.tsx` to cover forward rotation, backward rotation, timer reset after manual input, and cooldown protection.
- Modify `tests/e2e/home-scroll.spec.ts` to verify desktop wheel input changes the hero while the page remains visually fixed.

## Testing

Run focused unit tests for manual forward and backward rotation, timer restart after wheel input, and immunity to repeated rapid wheel events. Add a desktop interaction check showing that wheel input changes the hero content without re-enabling normal page scrolling.
