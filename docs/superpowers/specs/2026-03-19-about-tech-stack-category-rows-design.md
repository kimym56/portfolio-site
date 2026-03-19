# About Tech Stack Category Rows Design

## Context

The About page tech stack currently renders as one flat chip list. The approved change is to keep the chips visually label-free while preventing mixed categories from sharing a row.

## Goal

Render the About page tech stack as three preserved category groups at every screen size:

- `frontend` chips in the first row group
- `design` chips in the second row group
- `ai` chips in the third row group

The page should continue using chips only, with no visible row headings.

## Approved Design

### Structure

- Replace the single wrapping chip list with one outer tech stack group and three inner category lists
- Keep the existing chip order within each category
- Use accessible labels on the inner lists rather than visible row headings

### Styling

- The outer container stacks category rows vertically
- Each category row wraps only its own chips
- Chip styling, color mapping, and strong/soft emphasis remain unchanged

### Accessibility

- Preserve an overall `Tech stack` group label
- Give each inner row an `aria-label` so screen readers can distinguish the category groups without adding visible labels
