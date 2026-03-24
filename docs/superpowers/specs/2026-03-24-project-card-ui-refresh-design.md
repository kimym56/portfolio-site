# Project Card UI Refresh Design

## Context

The current Projects grid renders each card with the role label above the title, an `Open` text pill in the footer, and a plain dot-separated tech list. That structure weakens the title row hierarchy and makes the stack treatment feel visually disconnected from the About page.

The approved change is a tighter editorial card that:

- places the project title and role on the same header row
- replaces the footer `Open` text with a compact top-right arrow button
- reduces the vertical gap between description and technology list
- renders the technology list as About-style chips with the same category color language

## Goal

Refresh the project cards so they feel aligned with the rest of the portfolio system while preserving the current card interaction model and responsive behavior.

## Approved Direction

### Layout

Each project card keeps its current click-target behavior as a full-card button, but the internal layout changes to a three-part vertical stack:

1. A top header row with:
   - the title on the left
   - the role inline with the title in a smaller uppercase style
   - a circular arrow action button pinned on the right
2. A short description block directly below the header row
3. A compact wrap of tech chips directly below the description with less separation than the current footer layout

On narrower widths, the title and role may wrap within the left header block, but the arrow remains anchored at the top-right of the card.

### Visual Style

The title remains the primary typographic anchor. The role stays visibly secondary through smaller size, muted color, uppercase tracking, and baseline alignment beside the title.

The arrow action becomes an icon-only affordance using a right arrow character inside a small circular surface. It should read as a directional cue, not a separate CTA competing with the title.

The tech list becomes a chip row using the same visual language already established on the About page:

- rounded pill shape
- compact padding
- category-based background and text colors
- strong and soft weight treatment where needed

## Data and Rendering Model

The existing `ProjectItem.stack: string[]` data is insufficient for About-style chips because it has no category or proficiency metadata. The project data should be upgraded so each tech item can render through the shared chip styling system.

Recommended shape:

```ts
interface ProjectTechItem {
  label: string;
  category: "frontend" | "design" | "ai";
  proficiency: "strong" | "soft";
}
```

`ProjectItem.stack` should change from `string[]` to `ProjectTechItem[]`.

Project cards should map these items into chip elements using the same `about-chip`, `about-chip-<category>`, and `about-chip-<proficiency>` classes already defined in global styles. This keeps the styling source of truth shared rather than duplicating a second chip system for projects.

## Component Boundaries

- `lib/projects.ts` remains the source of project card content and gains the richer tech item structure.
- `components/project-grid.tsx` updates the card markup:
  - header row composition
  - arrow icon button treatment
  - chip list rendering
- `components/project-grid.module.css` updates spacing, alignment, responsive wrapping, and the arrow button presentation.

No new component is required unless the implementation reveals repeated chip markup worth extracting. For this change, reuse of existing global chip classes is preferred over introducing a new shared abstraction.

## Accessibility

The card remains a single button, so the arrow should stay decorative within that button rather than becoming a second interactive control.

Requirements:

- keep the full card as the only interactive element
- mark the arrow as `aria-hidden="true"`
- preserve readable text order for title, role, description, and tech chips
- ensure header wrapping still works at smaller widths without clipping the arrow

## Testing

The change needs focused coverage for structure and styling intent:

- unit test for `ProjectGrid` markup proving:
  - role renders inline in the heading area
  - the `Open` label is gone
  - tech items render as chips instead of a joined string
- style test for `project-grid.module.css` proving:
  - header row uses a shared top row layout
  - arrow action is top-aligned in that row
  - stack/chip spacing is tighter than the old footer separation

## Out of Scope

- changing the project detail view
- changing project copy beyond tech metadata shape
- introducing separate per-chip icons or animations
- changing the overall Projects page grid behavior or filtering logic
