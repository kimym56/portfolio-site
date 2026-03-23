# Projects Toggle Group Pattern Design

## Context

The Projects page already has a segmented control for `Work Projects` and `Side Projects`, but the current active-state treatment is button-local. The revised goal is to match the shared-indicator interaction pattern shown in Motion's toggle-group examples more closely.

## Goal

Make the projects category control behave like a proper toggle group with one shared active indicator that moves inside the group, while keeping the existing project filtering and panel-reveal behavior unchanged.

## Approved Design

### Interaction Model

- Keep the existing two-option control and labels.
- Render one shared active indicator inside the group instead of placing a pill inside the active button.
- Let the indicator slide between the two slots when the selected category changes.
- Keep the project grid and detail-view behavior exactly as it is today.

### Visual Direction

- Preserve the site's current palette, radius, and typography rather than copying the full demo styling.
- Use the Motion/Base UI interaction pattern only: stable outer track, neutral buttons, shared active tile underneath the selected label.
- Keep the selected label legible on top of the active tile and the inactive label readable against the track.

### Structure And Accessibility

- Preserve real `button` elements and the existing `role="group"` wrapper.
- Preserve `aria-pressed` state on each button.
- Render the active indicator as a decorative sibling inside the group, not as part of either button's content.
- Respect reduced-motion preferences by disabling the spring transition.

### Testing And Boundaries

- Extend the unit test to assert that the active indicator exists at the group level and is not nested inside either button.
- Keep the existing category-filter and panel-reveal tests.
- Do not redesign the surrounding layout or change the project-panel animation.
