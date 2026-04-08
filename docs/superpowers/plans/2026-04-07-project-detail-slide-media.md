# Project Detail Slide Media Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Render slide-derived project media in the portfolio Projects detail view.

**Architecture:** Extend the existing local `ProjectItem` data model with optional media entries and render those entries inside `ProjectDetail`. Keep media assets static under `public/`, use `next/image` for screenshots, and use a native video element for the existing Mimesis WebM preview.

**Tech Stack:** Next.js, React, TypeScript, CSS Modules, Vitest, Testing Library, Playwright.

---

## Chunk 1: Project Detail Media

### Task 1: Add Failing Media Tests

**Files:**
- Create: `tests/unit/components/project-detail.test.tsx`
- Modify: `tests/unit/lib/projects.test.ts`

- [x] **Step 1: Write a failing component test**

Add a `ProjectDetail` test that renders a project with one image and one video media item. Assert that:

- the image renders with its alt text and configured source
- the video renders with an accessible label and configured source

- [x] **Step 2: Extend the data test**

Update `tests/unit/lib/projects.test.ts` to assert:

- Sellpath has `/images/projects/sellpath_main.png`
- Mimesis has `/videos/projects/mimesis_main.webm`
- DSSkills has `/images/projects/dsskills_main.png`

- [x] **Step 3: Run the tests to verify they fail**

Run: `npm run test -- tests/unit/components/project-detail.test.tsx tests/unit/lib/projects.test.ts`
Expected: FAIL because project media types and rendering do not exist yet.

### Task 2: Copy Slide Media Assets

**Files:**
- Create: `public/images/projects/dsskills_main.png`
- Create: `public/images/projects/dsskills_detail1.png`
- Create: `public/images/projects/dsskills_detail2.png`
- Create: `public/images/projects/sellpath_main.png`
- Create: `public/images/projects/sellpath_detail1.png`
- Create: `public/images/projects/sellpath_detail2.png`
- Create: `public/videos/projects/mimesis_main.webm`

- [x] **Step 1: Copy the assets from `slides/public`**

Use the existing files from `/Users/yongminkim/Development/Portfolio/slides/public/images` and `/Users/yongminkim/Development/Portfolio/slides/public/videos`.

### Task 3: Implement Media Data and Rendering

**Files:**
- Modify: `lib/projects.ts`
- Modify: `components/project-detail.tsx`
- Modify: `components/project-detail.module.css`

- [x] **Step 1: Add typed media data**

Add `ProjectMediaItem` as an image/video union and optional `media?: ProjectMediaItem[]` to `ProjectItem`.

- [x] **Step 2: Add project media entries**

Attach Sellpath screenshots, DSSkills screenshots, and the Mimesis video preview to the relevant projects. Leave Website without media.

- [x] **Step 3: Render media in `ProjectDetail`**

Render a media grid after the summary block. Use `Image` for screenshots and `<video muted loop playsInline controls>` for WebM preview.

- [x] **Step 4: Style the media grid**

Add compact media-card styles in `project-detail.module.css` that fit the existing card language and remain responsive.

- [x] **Step 5: Run focused tests**

Run: `npm run test -- tests/unit/components/project-detail.test.tsx tests/unit/lib/projects.test.ts tests/unit/components/project-filter.test.tsx`
Expected: PASS.

### Task 4: Verify

**Files:**
- Test: full repo checks

- [x] **Step 1: Run unit tests**

Run: `npm test`
Expected: PASS.

- [x] **Step 2: Run lint**

Run: `npm run lint`
Expected: PASS.

- [x] **Step 3: Run Projects browser flow**

Run: `npm run test:e2e -- tests/e2e/projects-filter.spec.ts`
Expected: PASS.

Note: the standard Playwright command was blocked by an existing `next dev` process holding `.next/dev/lock`. The same browser-level Projects flow was run against the active local dev server on port 3000 and passed.

- [x] **Step 4: Review diff**

Run: `git diff --stat && git diff --check`
Expected: media assets, project data/rendering, tests, and docs only.
