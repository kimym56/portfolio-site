# Control Radius Alignment Design

## Goal

Define a minimal radius design-token scale so rounded shapes stay consistent across the UI without forcing every component to use the exact same border radius.

## Design

The hero image container in `components/hero-split.module.css` currently uses a `14px` radius. Other interactive controls use a mix of `0`, `18px`, and `999px`, which makes the interface feel inconsistent.

The minimal design is to replace the temporary single control-radius token with a small semantic scale that matches the shapes already present in the product:

- `--radius-md: 14px` for controls and media
- `--radius-lg: 18px` for larger surfaced containers
- `--radius-full: 999px` for pills and circles

Use `--radius-md` for the hero image container, theme toggle, header tabs, project filter shell and toggles, project card buttons, the project detail visit link, and the project card action chip. Use `--radius-lg` for larger surfaces like `.card` and project detail sections. Use `--radius-full` for intentional fully rounded shapes like the project-detail back button and the about chips.

## Files

- Modify `app/globals.css` to define the minimal radius token scale and map large surfaces to `--radius-lg`.
- Modify `components/hero-split.module.css` to use `--radius-md` for the hero image container.
- Modify `components/theme-toggle.module.css` to use `--radius-md`.
- Modify `components/site-header.module.css` to use `--radius-md` for nav tabs.
- Modify `components/project-filter.module.css` to use `--radius-md` for the filter shell and toggle buttons.
- Modify `components/project-grid.module.css` to use `--radius-md` for card buttons and the action chip.
- Modify `components/project-detail.module.css` to use `--radius-md` for the visit link, `--radius-lg` for detail sections, and `--radius-full` for the circular back button.
- Modify `tests/unit/style/button-radius-alignment.test.ts` to lock the token scale and the intended token usage.

## Testing

Run a focused Vitest style regression that verifies the `--radius-md`, `--radius-lg`, and `--radius-full` tokens exist and that current components consume the correct token for their shape role.
