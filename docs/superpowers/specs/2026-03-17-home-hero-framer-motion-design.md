# Home Hero Framer Motion Design

## Goal

Improve the perceived smoothness of the home hero text and portrait rotation by replacing the current CSS-class crossfade choreography with Framer Motion-driven presence transitions.

## Design

The current hero already rotates text and image on a shared timer, but the enter and exit motion is still coordinated manually through state, timeouts, and CSS module classes. That works, but it is rigid and harder to tune. Framer Motion should be introduced only for this hero so the transition engine is better without turning the rest of the site into an animation refactor.

`HeroSplit` should remain the source of truth for the rotation clock and active index. It will continue to advance one shared `activeIndex` at the current calm interval so the text and image stay synchronized. Framer Motion will take over the visual transition layer through keyed `motion` elements inside `AnimatePresence`, removing the need for explicit `previousIndex` cleanup state in the hero.

The text transition should remain restrained. Use an opacity-first transition, with either no movement or only a very small vertical offset that stays visually quiet. The portrait should use a same-moment crossfade, optionally with a tiny scale settle only if it improves smoothness without becoming noticeable motion. Both text and image should start on the same tick with no stagger.

Reduced-motion users should receive immediate swaps or effectively instant fades. If there is only one role or one image, no animated transition should run. The existing modulo-based image selection must remain intact so shorter image arrays still rotate safely against the role list.

## Files

- Modify `package.json` and lockfile to add `framer-motion`.
- Modify `components/hero-split.tsx` to keep the shared timer while switching image presence handling to Framer Motion.
- Modify `components/rotating-role.tsx` to render keyed `motion` text content through `AnimatePresence`.
- Modify `components/hero-split.module.css` to keep structural layout and image framing while removing obsolete manual transition classes.
- Modify `components/rotating-role.module.css` to keep layout concerns only and remove obsolete CSS animation rules.
- Modify `tests/unit/components/hero-split.test.tsx` to verify synchronized text and image changes with the new transition model.
- Modify `tests/unit/components/rotating-role.test.tsx` to verify the Framer Motion-driven text swap behavior without keyed DOM remount assumptions.

## Testing

Update the focused unit tests so they assert behavior rather than CSS animation details: the next role and image become active on schedule, old content is removed after the transition window, and single-item edge cases remain stable. Keep reduced-motion handling simple and deterministic so it does not complicate unit coverage.
