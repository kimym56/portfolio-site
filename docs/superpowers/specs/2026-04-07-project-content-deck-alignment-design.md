# Project Content Deck Alignment Design

## Context

The Projects page already supports one work project and three side projects with a card list and an in-page editorial detail view. Its project data still contains placeholder detail copy for Sellpath, Mimesis, Website, and Design System Project.

The slide deck has concrete project copy for Sellpath, Mimesis, and DSSkills. The approved direction is to use that deck content to improve the portfolio site's project content and replace the generic Design System Project entry with DSSkills.

## Goal

Refresh the portfolio site's project copy so the Projects page reads like a finished portfolio section rather than a scaffold.

## Approved Design

### Project Set

- Keep Sellpath as the only work project.
- Keep three side projects.
- Use Mimesis, DSSkills, and Website as the side projects.
- Replace the current Design System Project entry with DSSkills from the slide deck.

### Content Source

- Treat the slide deck as the source of truth for Sellpath, Mimesis, and DSSkills.
- Adapt the deck's overview, feature, stack, and detail-slide copy into the portfolio site's existing data model.
- Keep the content in English because the portfolio site is currently English-only.
- For Website, write concise portfolio-site copy from the existing site context because there is no corresponding deck entry.

### Data Shape

- Keep the existing `ProjectItem` and `ProjectDetailContent` types.
- Preserve the existing detail sections:
  - `Summary`
  - `What This Project Is`
  - `What I Focused On`
  - `UI/UX/HCI/Frontend Considerations`
  - `Project Meta`
- Update card descriptions, project URLs, stacks, detail copy, and metadata.

### Testing

- Add focused project data coverage for the real project set and key deck-derived copy.
- Update any UI tests that still expect Design System Project.
- Run targeted tests around the projects data and filter behavior.
