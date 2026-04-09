# Projects Editorial List And Detail Design

## Context

Home and About already read as quiet editorial pages with minimal framing. The Projects route still feels heavier because the overview uses a bordered segmented toggle and bordered project cards, and the selected detail view keeps a panel-like container with button chrome. The requested direction is to make Projects visually consistent with the calmer Home/About language.

## Goal

Refresh the Projects overview and selected detail view so they feel like one border-light editorial system driven by typography, spacing, and dividers instead of boxed UI chrome.

## Approved Design

### Overview List

- Use the existing page intro in `ProjectsPageContent` unchanged.
- Replace the bordered segmented toggle with lightweight text tabs.
- Indicate the active tab with typography and a subtle underline or divider, not a pill container.
- Replace bordered project cards with editorial rows separated by horizontal rules.
- Make project titles the primary visual anchor, with muted role metadata and a simple arrow affordance.
- Keep the overview list dense enough to scan quickly, but open enough to match About's rhythm.

### Detail View

- Use the `D1` direction: detail should feel like a direct extension of the borderless overview list.
- Remove the outer panel/card feel from the selected project state.
- Keep structure through section dividers, title hierarchy, and whitespace.
- Keep media as the only soft surfaces, with gentle radii for image and video containment.
- Simplify back and visit actions so they read as editorial controls rather than pill buttons.
- Preserve the alternating media/text layout and existing responsive behavior.

### Accessibility

- Keep semantic sectioning and heading hierarchy.
- Preserve keyboard interaction for project selection and detail navigation.
- Keep alt text, video labeling, captions, and reduced-motion behavior.
- Preserve current mobile reading order with text first, then media.

### Testing

- Update style tests to describe the new border-light tab and row treatment.
- Update component tests for the new overview structure if selectors or semantics change.
- Keep existing project detail behavior coverage, especially alternating media layout and reduced-motion handling.
