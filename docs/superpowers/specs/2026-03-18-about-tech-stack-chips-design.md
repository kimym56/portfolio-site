# About Tech Stack Chips Design

## Context

The About page now has concise summary copy, but it does not yet expose YongMin Kim's tech stack in a quick-to-scan format. The requested treatment is a compact chip row placed directly under the About subtitle.

## Goal

Add a small, visually calm tech stack section to the About page that:

- sits below the description and above the paragraphs
- groups technologies by category through color
- shows stronger vs lighter familiarity through saturation, not through separate color families
- stays compact, borderless, and consistent with the site's warm neutral palette

## Approved Design

### Placement

Render the tech stack chips below the full About description, after the body paragraphs.

### Layout

- Use a single wrapping chip field rather than separate labeled rows
- Keep the chips small and borderless
- Preserve natural wrapping on smaller viewports

### Category Mapping

- `frontend`: React, Next.js, TypeScript, JavaScript, MUI, React Native, Framer Motion
- `design`: Figma, Design Systems, Accessibility
- `ai`: Claude Code, Codex, Gemini

### Proficiency Mapping

- `strong`: React, Next.js, TypeScript, JavaScript, Claude Code, Codex, MUI, Figma
- `soft`: React Native, Gemini, Framer Motion, Design Systems, Accessibility

### Visual Rules

- Color communicates category first
- Saturation communicates stronger vs softer familiarity within the same category
- Font weight also communicates stronger vs softer familiarity
- Chips are borderless
- Chips are ordered by similar color so categories visually cluster together

### Color Direction

- `frontend`: warm apricot
- `design`: sage
- `ai`: dusty lavender

For dark theme support, keep the same category mapping but shift the tones darker and slightly richer so contrast remains clear against the darker background.
