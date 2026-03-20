# Projects Tab Detail View Design

## Context

The Projects page currently supports only a simple `work` / `side` filter and a flat grid of cards. The data is still placeholder content, the toggle is visually plain, and selecting a project does not expand into a deeper project-specific view.

## Goal

Improve the Projects tab so it supports:

- a more intentional toggle between work and side projects
- one work project and three side projects
- an expanded editorial detail view when a project is selected
- a back-arrow-only return path from the detail view to the filtered project list

## Approved Design

### Interaction Model

- Keep all behavior inside the existing Projects page with no route change.
- Default state shows the category toggle and the project list for the active category.
- `Work` shows one project: `Sellpath`.
- `Side` shows three projects: `Mimesis`, `Website`, and `Design System Project`.
- Selecting a project replaces the list view with a focused detail view.
- In detail view, hide the category toggle and show only a back arrow.
- Clicking the back arrow returns to the previous list view and preserves the active category.

### List View

- Keep the list compact and scannable rather than turning it into a case-study index.
- Upgrade the current toggle into a more deliberate segmented control so switching to side projects feels clearer and more polished.
- Make each project card feel explicitly selectable instead of primarily acting as an external link target.

### Detail View Layout

- Use the approved `A` editorial layout for the expanded project view.
- Show the back arrow at the top of the detail view.
- Show the project title and role as the main header block.
- Place the external project link next to the title on desktop and stack it just below on mobile.
- Keep `Summary` immediately below the title block.

### Detail View Sections

Scaffold the following sections for every project:

1. `Summary`
2. `What This Project Is`
3. `What I Focused On`
4. `UI/UX/HCI/Frontend Considerations`
5. `Project Meta`

The detail content should use clean placeholders and stable headings rather than fabricated long-form copy. The last section is reserved for metadata such as stack, category, role, or timeline without duplicating the main project link.

### Data Model

- Replace the placeholder project dataset with four real entries:
  - `Sellpath` under `work`
  - `Mimesis` under `side`
  - `Website` under `side`
  - `Design System Project` under `side`
- Expand the project model so each project can provide scaffolded detail-view fields for the approved sections.

### Accessibility

- Preserve clear button semantics for the category toggle.
- Use button semantics or equivalent keyboard-accessible selection behavior for project cards.
- Ensure the back arrow has an accessible name describing its action.
- Keep the detail-view heading structure linear and readable for screen readers.

### Testing

- Verify switching between work and side categories still works.
- Verify the correct list counts render: one work project and three side projects.
- Verify selecting a project opens the detail view.
- Verify the back arrow returns the user to the prior list view.
- Verify the selected category is preserved after backing out of the detail view.
