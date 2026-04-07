# Project Detail Alternating Media Layout Design

## Context

The Projects detail view now has slide-derived media, but it renders all media first in a grid and then renders all text sections below. The slide deck uses a stronger editorial pattern: each detail slide pairs one media/demo panel with one text panel, and alternates whether media appears on the left or right.

The portfolio site should follow that slide-deck rhythm more closely while preserving the current detail route-free interaction and existing project data.

## Goal

Rework the Projects detail view so project media and detail text are paired in alternating two-column rows.

## Approved Design

### Layout

- Keep the back button, project title, role, visit link, and summary at the top.
- Replace the separate media grid plus text-section stack with paired detail rows.
- Each row pairs one text section with one media item when media exists for that row.
- Alternate desktop placement:
  - Row 1: text left, media right.
  - Row 2: media left, text right.
  - Row 3: text left, media right.
- On mobile, stack rows as text first and media second so reading order stays clear.

### Content Pairing

- Use existing detail sections in this order:
  - What This Project Is
  - What I Focused On
  - UI/UX/HCI/Frontend Considerations
  - Project Meta
- Pair media by index with the first available sections.
- If a project has more text sections than media items, render the remaining sections as text-only rows.
- If a project has no media, keep it text-only.

### Media

- Keep existing `ProjectMediaItem` data.
- Keep `Image` for screenshots and native video for Mimesis.
- Do not add a new carousel or modal.

### Testing

- Update the project detail unit test so it asserts alternating row direction metadata.
- Keep data tests focused on media attachment.
- Use CSS style tests only if needed for structural guarantees.
