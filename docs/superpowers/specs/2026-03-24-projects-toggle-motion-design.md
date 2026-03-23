# Projects Toggle Motion Design

## Context

The Projects page already filters between `Work Projects` and `Side Projects`, and the panel content has a one-time reveal animation. The category control itself still changes state abruptly, so switching tabs feels more mechanical than the rest of the page.

## Goal

Make the `Work Projects` / `Side Projects` toggle feel smooth and deliberate without changing the filtering behavior, the surrounding layout, or the existing project-panel reveal logic.

## Approved Design

### Interaction Model

- Keep the existing two-option segmented control for project categories.
- Add one decorative active pill that slides between the selected options.
- Animate only the category control; keep the current project grid filtering behavior and one-time panel reveal as-is.
- Preserve the current labels: `Work Projects` and `Side Projects`.

### Motion Behavior

- Use Framer Motion for the active pill so the selected state glides horizontally instead of switching instantly.
- Use a restrained spring transition so the control feels smooth without becoming visually noisy.
- Keep the text-color change synchronized with the moving pill so the selected label reads as continuous state.
- Respect `prefers-reduced-motion` by falling back to an immediate state change.

### Structure And Accessibility

- Keep real `button` elements inside the existing `role="group"` container.
- Preserve the current `aria-pressed` behavior for the selected state.
- Render the animated pill as decorative background UI behind the active button content.
- Keep the control fully keyboard-operable with no custom tab semantics.

### Testing And Boundaries

- Keep the existing tests that verify category filtering and panel reveal behavior.
- Add coverage that confirms the selected tab still exposes the correct `aria-pressed` state and that the active indicator follows the selected category.
- Do not redesign the surrounding projects layout.
- Do not change the detail-view transition behavior.
- Do not add new card-grid animations as part of this change.
