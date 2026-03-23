# Inner Page Always-On Stagger Design

## Goal

Restore visible staggered reveal motion for the About, Projects, and Contact pages on every render instead of limiting the effect to first-visit animated routes.

## Design

The current inner-page reveal system is tied to `PageReveal` and the `[data-page-reveal="animated"]` selectors in `app/globals.css`. That means the authored motion only runs on the rewrite-backed `__animated` routes, and even there it animates just three coarse blocks: title, subtitle, and one body container. The visible result is that the supporting content lands as a single chunk instead of cascading.

The minimal fix is to keep the rewrite-based first-visit routing infrastructure intact but stop relying on it for the visible stagger. The shared page content components should expose explicit always-on reveal items so motion runs whenever the page mounts, regardless of whether the route came from the normal page tree or the animated rewrite tree.

Use a CSS-only reveal family that matches the existing language: quick opacity ramp, light upward settle, short blur cleanup, and modest per-step delays. Make the reveal order explicit in markup rather than inferred from broad selectors.

The reveal sequence should be:

- About: title, subtitle, paragraph block, tech-stack block
- Projects: title, subtitle, projects content block
- Contact: title, subtitle, contact list

Reduced-motion users should receive no animated travel, blur, or stagger. The existing `PageReveal` wrapper can remain as route-level markup for first-visit routing tests, but it no longer owns the user-visible choreography.

## Files

- Modify `app/globals.css` to add reusable always-on stagger classes and reduced-motion-safe fallbacks.
- Modify `components/about-page-content.tsx` to mark the approved reveal steps explicitly.
- Modify `components/projects-page-content.tsx` to mark the approved reveal steps explicitly.
- Modify `components/contact-page-content.tsx` to mark the approved reveal steps explicitly.
- Add `tests/unit/pages/inner-page-stagger.test.tsx` to assert the reveal-step structure for the three shared page-content components.
- Add `tests/unit/style/inner-page-stagger-reveal.test.ts` to assert the CSS contract for always-on stagger classes and reduced-motion behavior.

## Testing

Run focused Vitest coverage for the new page-structure and CSS-contract tests, then run a production build to confirm the shared page components still compile cleanly after the markup and style changes.
