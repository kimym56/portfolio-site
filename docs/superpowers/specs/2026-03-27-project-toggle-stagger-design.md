# Project Toggle Stagger Design

## Summary

Update the projects toggle interaction so the card area below it feels coordinated with the toggle itself. Each tab switch should replay a restrained staggered card reveal in the same horizontal direction as the toggle movement, while a single work-project card keeps the same desktop width as a single side-project card.

## Goals

- Replay card motion on every category switch.
- Make the card reveal direction match the toggle direction.
- Keep the motion subtle rather than theatrical.
- Keep a single work-project card at the same desktop width as one side-project card.

## Non-Goals

- Changing the existing project detail panel reveal behavior.
- Redesigning the toggle control itself.
- Reworking mobile layout beyond preserving the current full-width single-column behavior.

## Approaches Considered

### Recommended: Direction-aware CSS stagger driven by tab state

Track the previous and next tab selection in `ProjectFilter`, pass the reveal direction into `ProjectGrid`, and let the grid/cards apply CSS classes and stagger delays from that state.

Why this is preferred:

- Keeps the animation logic explicit and easy to test.
- Preserves the current component boundaries.
- Requires only targeted changes to the filter, grid, and tests.

### Alternative: Force a full grid remount and let a single container animation imply motion

This would replay the panel reveal on each switch but would not give each card a true stagger. It is simpler, but it does not satisfy the requested motion quality.

### Alternative: Use Framer Motion for per-card variants

This would give richer orchestration, but it introduces a larger dependency footprint into the grid interaction than the current UI needs.

## Approved Interaction Design

### Tab-switch motion

- On each category switch, the cards below the toggle replay their entrance animation.
- `Work -> Side` animates cards so the stagger visually progresses left-to-right.
- `Side -> Work` animates the returning card from the opposite horizontal direction so it still feels linked to the toggle motion.
- The effect should be subtle: mostly fade with short horizontal travel and modest stagger offsets.

### Layout behavior

- On desktop, a single `Work Projects` card should keep the same half-width column as an individual side-project card.
- `Side Projects` should keep the current multi-card grid.
- On mobile, the existing single-column full-width layout remains unchanged.

## Component Responsibilities

### `components/project-filter.tsx`

- Own selected tab state.
- Derive whether the latest switch moved toward `side` or toward `work`.
- Trigger repeated tab-panel animation on every actual tab switch.
- Pass directional reveal metadata into the project grid.

### `components/project-grid.tsx`

- Render cards with per-card stagger metadata.
- Expose enough DOM state for unit tests to verify direction and layout behavior.

### `components/project-grid.module.css`

- Apply directional stagger styles and delay values.
- Preserve the existing desktop column sizing for the single-card `work` state.

## Testing Strategy

- Update unit tests for `ProjectFilter` to preserve repeated tab animation behavior.
- Add unit tests for `ProjectGrid` covering directional reveal classes/data attributes.
- Keep style assertions focused on shared card layout and directional reveal styling.
- Update the focused Playwright projects filter spec to reflect repeated animated switches if browser verification is available.

## Risks

- CSS animation replay can silently fail if the same DOM nodes are reused without a remount or class reset.
- Directional stagger can look backward if the mapping between tab switch direction and card offsets is inverted.
- Directional reveal styling must not disturb the existing two-column side-project grid.
