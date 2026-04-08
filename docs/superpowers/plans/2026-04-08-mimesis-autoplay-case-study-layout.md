# Mimesis Autoplay Case Study Layout Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make project detail videos autoplay like the slides and render Mimesis as four properly paired implementation case-study rows.

**Architecture:** Extend the project data model with optional custom detail sections and an optional media-start side. `ProjectDetail` will use custom sections when present, otherwise it will keep its existing default sections. Video rendering changes stay local to `ProjectDetail`.

**Tech Stack:** Next.js, React, TypeScript, CSS Modules, Vitest, Testing Library, Playwright.

---

## Chunk 1: Autoplay Videos And Mimesis Case-Study Rows

### Task 1: Write Failing Tests

**Files:**
- Modify: `tests/unit/components/project-detail.test.tsx`
- Modify: `tests/unit/lib/projects.test.ts`

- [x] **Step 1: Assert videos behave like slide media**

Update the component media test to assert project detail videos have:

```text
autoplay
loop
muted
playsinline
preload="auto"
```

Also assert they do not have a `controls` attribute.

- [x] **Step 2: Assert custom Mimesis row data**

Add data tests that assert:

- Mimesis has four custom detail sections.
- The section titles are `iOS Page Curl Effect`, `Wiper Typography`, `Black & White Circle`, and `Staggered Text`.
- The section bodies include both reference/original context and implementation details.
- `mediaStartSide` is `left`.

- [x] **Step 3: Assert custom section rendering and media ordering**

Add or extend a component test with a Mimesis-like project that has custom sections and `mediaStartSide: "left"`. Assert:

- row 1 has `data-media-side="left"`
- row 2 has `data-media-side="right"`
- custom section titles render instead of default generic titles

- [x] **Step 4: Run tests to verify they fail**

Run: `npm run test -- tests/unit/components/project-detail.test.tsx tests/unit/lib/projects.test.ts`
Expected: FAIL because videos still render controls/metadata, project data has no custom sections, and media side always starts right.

### Task 2: Extend Project Data

**Files:**
- Modify: `lib/projects.ts`

- [x] **Step 1: Add optional detail sections type**

Add:

```ts
export interface ProjectDetailSection {
  id: string;
  title: string;
  body?: string;
  reference?: string;
  implementation?: string;
}
```

and optional `detailSections?: ProjectDetailSection[]` plus `mediaStartSide?: "left" | "right"` to `ProjectItem`.

- [x] **Step 2: Add Mimesis custom sections**

Add four Mimesis sections covering:

- original/reference context
- user interaction or project behavior
- my implementation details

- [x] **Step 3: Set Mimesis media start side**

Set `mediaStartSide: "left"` for Mimesis only.

### Task 3: Update Project Detail Rendering

**Files:**
- Modify: `components/project-detail.tsx`

- [x] **Step 1: Use custom sections when present**

Build `detailSections` from `project.detailSections` when provided. Otherwise use the existing default four sections.

- [x] **Step 2: Respect media start side**

Create a helper:

```ts
const firstMediaSide = project.mediaStartSide ?? "right";
```

Then alternate from that side by row index.

- [x] **Step 3: Update video attributes**

Change project detail videos to:

```tsx
autoPlay
loop
muted
playsInline
preload="auto"
```

and remove `controls`.

- [x] **Step 4: Run focused tests**

Run: `npm run test -- tests/unit/components/project-detail.test.tsx tests/unit/lib/projects.test.ts`
Expected: PASS.

### Task 4: Verify

**Files:**
- Test: full repo checks

- [x] **Step 1: Run unit tests**

Run: `npm test`
Result: PASS, 37 files / 77 tests.

- [x] **Step 2: Run lint**

Run: `npm run lint`
Result: PASS.

- [x] **Step 3: Run build**

Run: `npm run build`
Result: PASS.

- [x] **Step 4: Run or account for Projects browser flow**

Run: `npm run test:e2e -- tests/e2e/projects-filter.spec.ts`
Result: configured e2e was blocked by the existing `.next/dev/lock`, so the equivalent Playwright browser flow was run against `http://127.0.0.1:3000/projects`. The active-server check passed for the four Mimesis rows, left/right/left/right row rhythm, implementation copy, and autoplay/no-controls video behavior.

- [x] **Step 5: Review diff**

Run: `git diff --stat && git diff --check`
Result: PASS. Diff is limited to autoplay video behavior, Mimesis custom rows/layout, tests, and docs.

---

## Chunk 2: Clarify My Mimesis Implementation Presence

### Task 5: Add Regression Coverage For Implementation Visibility

**Files:**
- Modify: `tests/unit/components/project-detail.test.tsx`
- Modify: `tests/unit/lib/projects.test.ts`

- [x] **Step 1: Assert explicit reference and implementation labels**

Update the component test so custom Mimesis-like sections assert both `Original reference` and `My Mimesis implementation` labels, plus a direct implementation link.

- [x] **Step 2: Assert Mimesis media is labelled as My Mimesis**

Update the project data test so the four Mimesis media captions begin with `My Mimesis:` and the detail rows use separate `reference`, `implementation`, and implementation URL fields.

- [x] **Step 3: Verify the tests fail before the fix**

Run: `npm run test -- tests/unit/components/project-detail.test.tsx tests/unit/lib/projects.test.ts`
Result: FAIL because the component rendered one combined body paragraph and the media captions only used effect names.

### Task 6: Split Reference And Implementation Presentation

**Files:**
- Modify: `lib/projects.ts`
- Modify: `components/project-detail.tsx`
- Modify: `components/project-detail.module.css`

- [x] **Step 1: Update Mimesis data**

Replace the single combined Mimesis `body` strings with separate `reference`, `implementation`, and implementation URL fields. Update Mimesis media captions and labels so the videos are explicitly framed as My Mimesis implementation previews.

- [x] **Step 2: Render labelled borderless blocks**

Render custom detail sections as two borderless text groups: `Original reference` and `My Mimesis implementation`. Add a text link to the corresponding Mimesis implementation page.

- [x] **Step 3: Run focused tests**

Run: `npm run test -- tests/unit/components/project-detail.test.tsx tests/unit/lib/projects.test.ts`
Result: PASS, 2 files / 7 tests.

### Task 7: Verify Clarification Patch

**Files:**
- Test: full repo checks

- [x] **Step 1: Run unit tests**

Run: `npm test`
Result: PASS, 37 files / 77 tests.

- [x] **Step 2: Run lint**

Run: `npm run lint`
Result: PASS.

- [x] **Step 3: Run build**

Run: `npm run build`
Result: PASS.

- [x] **Step 4: Run or account for Projects browser flow**

Run: `npm run test:e2e -- tests/e2e/projects-filter.spec.ts`
Result: configured e2e is still blocked by the existing `.next/dev/lock`. The equivalent Playwright browser flow against `http://127.0.0.1:3000/projects` passed for the Mimesis row rhythm, four reference labels, four My Mimesis implementation labels, My Mimesis captions, implementation links, and autoplay/no-controls video behavior at that stage.

---

## Chunk 3: Split Original And My Mimesis Media Frames

### Task 8: Add Split-Frame Regression Tests

**Files:**
- Modify: `tests/unit/components/project-detail.test.tsx`
- Modify: `tests/unit/lib/projects.test.ts`

- [x] **Step 1: Assert comparison media data**

Update the Mimesis project data test so each media item has a local `referenceMedia` image and no detail section has an `implementationUrl`.

- [x] **Step 2: Assert split-frame rendering**

Update the component test with a Mimesis-like video item that includes `referenceMedia`. Assert that the row renders:

- `data-media-comparison="true"` on the figure
- an original/reference image
- a My Mimesis video
- `Original` and `My Mimesis` half labels
- no `Open My Mimesis` links

- [x] **Step 3: Verify tests fail**

Run: `npm run test -- tests/unit/components/project-detail.test.tsx tests/unit/lib/projects.test.ts`
Result: FAIL because media still rendered as a single video and Mimesis data still used the previous caption/link-oriented shape.

### Task 9: Implement Split Frames

**Files:**
- Modify: `lib/projects.ts`
- Modify: `components/project-detail.tsx`
- Modify: `components/project-detail.module.css`
- Copy assets into: `public/images/projects/`

- [x] **Step 1: Add media reference data**

Add an optional `referenceMedia` image to video media items. For Mimesis, use local reference assets copied from the sibling Mimesis project:

- `love-jones-cover.jpg`
- `wiper-typography-cover.png`
- `threads-black-white-circle-reference.jpg`
- `staggered-text-cover.svg`

- [x] **Step 2: Remove implementation links**

Remove `implementationUrl` from the Mimesis detail sections and remove the link render path from `ProjectDetail`.

- [x] **Step 3: Render comparison media**

When a video media item has `referenceMedia`, render a single fixed-size comparison frame containing the reference image on the left and the My Mimesis video on the right.

- [x] **Step 4: Add hover expansion CSS**

On hover-capable devices, let either half expand to fill the full media frame width while the other half collapses. Keep touch/mobile at the stable 50/50 split and respect reduced-motion by disabling the transition.

- [x] **Step 5: Run focused tests**

Run: `npm run test -- tests/unit/components/project-detail.test.tsx tests/unit/lib/projects.test.ts`
Result: PASS. Also ran `npm run test -- tests/unit/components/project-detail.test.tsx tests/unit/lib/projects.test.ts tests/unit/style/project-detail-media-layout.test.ts`, which passed 3 files / 10 tests.

### Task 10: Verify Split Frames

**Files:**
- Test: full repo checks

- [x] **Step 1: Run unit tests**

Run: `npm test`
Result: PASS, 37 files / 78 tests.

- [x] **Step 2: Run lint**

Run: `npm run lint`
Result: PASS.

- [x] **Step 3: Run build**

Run: `npm run build`
Result: PASS.

- [x] **Step 4: Run browser check**

Run configured e2e if possible. If the existing `.next/dev/lock` blocks it, run the equivalent Playwright browser check against `http://127.0.0.1:3000/projects` and verify the split labels, side-by-side frame, no links, and autoplaying My Mimesis videos.
Result: configured e2e is still blocked by the existing `.next/dev/lock`. The equivalent Playwright browser flow against `http://127.0.0.1:3000/projects` passed for the 50/50 split frame, hover expansion to full media-frame width, no `Open My Mimesis` links, row rhythm, labels, and autoplay/no-controls video behavior.
