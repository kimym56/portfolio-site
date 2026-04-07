# Project Detail Slide Media Design

## Context

The project copy now matches the slide deck, but the slide deck's project visuals are not available in the portfolio site. The assets still live under the separate `slides` app:

- Sellpath PNG screenshots
- DSSkills PNG screenshots
- Mimesis WebM preview

The `ymkim` project data and `ProjectDetail` component currently have no media field or rendering path.

## Goal

Bring the slide media into the portfolio Projects detail view so the improved project copy has visual support.

## Approved Design

### Assets

- Copy Sellpath and DSSkills PNGs into `public/images/projects/`.
- Copy the Mimesis WebM preview into `public/videos/projects/`.
- Do not reuse unrelated slide images such as the profile image or Love Jones cover.

### Data Model

- Add a small project media model to `ProjectItem`.
- Support image and video media.
- Store `src`, `alt`/`label`, and dimensions for images in project data.
- Keep media optional so Website can remain text-only until a real visual exists.

### Detail View

- Render project media in `ProjectDetail` after the summary block and before the text sections.
- Use Next.js `Image` for project screenshots.
- Use a native muted looping video element for the Mimesis WebM preview.
- Keep the layout compact: a responsive grid of media cards with captions.
- Preserve existing back, visit, heading, and detail-section behavior.

### Testing

- Add a component test that verifies image and video media render from project data.
- Extend the project data test to verify slide media paths are attached to Sellpath, Mimesis, and DSSkills.
- Keep the existing Projects e2e flow focused on category switching and detail opening.
