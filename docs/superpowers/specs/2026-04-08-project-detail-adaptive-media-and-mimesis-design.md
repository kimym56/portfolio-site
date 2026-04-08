# Project Detail Adaptive Media And Mimesis Design

## Context

Project detail rows now use a 50:50 desktop grid. That works as a layout skeleton, but tall portrait media can feel too large when it fills its entire half of the row. Sellpath's chat UI screenshot is `495x846`, so it needs a narrower visual width than landscape dashboards.

Mimesis also only has its overview video in the portfolio. The slide deck's Mimesis detail slides do not use static PNG detail images; they render live demo components for Page Curl, Wiper Typography, Black & White Circle, and Staggered Text. The sibling Mimesis app has matching WebM recordings that are safer and lighter for the portfolio detail view.

## Goal

Keep the editorial alternating project detail layout while making media sizing content-aware and adding the missing Mimesis detail media.

## Approved Design

### Adaptive Media Sizing

- Keep the desktop row grid at 50:50.
- Do not force every media item to visually fill its 50% column.
- Detect portrait media from its intrinsic dimensions.
- Center portrait media and cap its width around `24rem`, matching the slide deck treatment for the tall Sellpath chat UI.
- Keep landscape and square media filling the available media column.
- Apply the portrait sizing rule generically so future tall media in other projects benefits automatically.

### Mimesis Media

- Copy the four Mimesis demo recordings from the sibling Mimesis app into `public/videos/projects/`.
- Use those videos for Mimesis project detail media:
  - Page Curl
  - Wiper Typography
  - Black & White Circle
  - Staggered Text
- Keep the older overview Mimesis video asset in place, but use the detail recordings for the detail rows.
- Do not import the live Mimesis React demos into the portfolio. The portfolio should remain lighter and avoid bringing the demo runtime into the project detail page.

### Testing

- Add project data coverage for the four Mimesis detail media items and their local asset files.
- Add component coverage for portrait orientation metadata.
- Add style coverage for the portrait media width cap while keeping 50:50 grid columns.
