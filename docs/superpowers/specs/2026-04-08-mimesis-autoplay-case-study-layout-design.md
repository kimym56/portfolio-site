# Mimesis Autoplay Case Study Layout Design

## Context

Project detail videos currently render with visible controls and `preload="metadata"`. The slide deck treats videos as ambient demo media: muted, looping, inline, and autoplaying. Mimesis also now has four demo recordings, but the detail copy is still collapsed into generic project sections, which makes the four videos harder to scan and map to the actual implementations.

After the first implementation pass, the Mimesis rows still read too much like original/reference material because the media captions only used effect names and the copy opened with original-reference language. The portfolio needs to make the distinction explicit: the videos are My Mimesis implementation previews, while the text side should separately name the reference inspiration and the implementation work.

## Goal

Make all project detail videos behave like slide media, and restructure Mimesis detail rows into four specific implementation case-study rows.

## Approved Design

### Video Behavior

- All project detail videos autoplay.
- Keep videos muted, looping, and `playsInline`.
- Remove visible video controls so the media reads like slide/demo material.
- Use `preload="auto"` for these local project demo clips.

### Mimesis Content

Use explicit Mimesis rows instead of the default generic detail sections:

- `iOS Page Curl Effect`: original Page Curl inspiration, drag/flip behavior, and my R3F implementation based on the SwiftUI reference.
- `Wiper Typography`: original FFF/Jongmin Kim inspiration, real-time typography reveal behavior, and my R3F/Tesla 3D model implementation.
- `Black & White Circle`: original Yin and Yang Dynamics/SABUM inspiration, real-time audio-driven motion, and my browser-audio analysis implementation that works around direct YouTube audio extraction.
- `Staggered Text`: original Rauno Freiberg inspiration, staggered motion behavior, and my Framer Motion implementation with user-text and click-driven previews.
- Each row separates the text into `Original reference` and `My Mimesis implementation` blocks.
- Each media caption begins with `My Mimesis:` so the video is clearly framed as the implementation preview.
- Each row includes a direct link to the corresponding Mimesis implementation page.

### Mimesis Layout

- Keep the 50:50 desktop row grid.
- Start Mimesis with media on the left so the first row immediately reads as an interactive demo.
- Alternate the following rows:
  - Row 1: media left, text right.
  - Row 2: text left, media right.
  - Row 3: media left, text right.
  - Row 4: text left, media right.
- Keep mobile text-first for readability.

### Data Model

- Add optional project-level detail sections that override the default four generic sections.
- Allow Mimesis detail sections to store `reference`, `implementation`, and `implementationUrl` separately instead of one combined body string.
- Add optional project-level `mediaStartSide` so Mimesis can start with left-side media while other projects keep their existing rhythm.
