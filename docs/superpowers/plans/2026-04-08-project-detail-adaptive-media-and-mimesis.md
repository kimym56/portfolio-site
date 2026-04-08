# Project Detail Adaptive Media And Mimesis Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add missing Mimesis detail media and make tall project detail media render smaller inside the existing 50:50 row grid.

**Architecture:** Extend the existing project media model with optional dimensions for videos and derive a media orientation in `ProjectDetail`. Use data attributes for CSS styling so portrait media can be centered and capped without changing the row grid. Copy Mimesis WebM recordings into `public/videos/projects/` and reference them from `lib/projects.ts`.

**Tech Stack:** Next.js, React, TypeScript, CSS Modules, Vitest, Testing Library, Playwright.

---

## Chunk 1: Mimesis Detail Media And Adaptive Sizing

### Task 1: Write Failing Tests

**Files:**
- Modify: `tests/unit/lib/projects.test.ts`
- Modify: `tests/unit/components/project-detail.test.tsx`
- Modify: `tests/unit/style/project-detail-media-layout.test.ts`

- [x] **Step 1: Add Mimesis media data assertions**

Assert that Mimesis has the four detail WebM sources:

```text
/videos/projects/mimesis_page_curl.webm
/videos/projects/mimesis_wiper_typography.webm
/videos/projects/mimesis_black_white_circle.webm
/videos/projects/mimesis_staggered_text.webm
```

Also assert every local media asset referenced by `PROJECTS` exists under `public/`.

- [x] **Step 2: Add portrait orientation component assertion**

Add a portrait Sellpath media item to the component test and assert its rendered figure has:

```text
data-media-orientation="portrait"
```

- [x] **Step 3: Add portrait sizing CSS assertions**

Assert `.mediaCard[data-media-orientation="portrait"]` is centered and width-capped with `width: min(100%, 24rem)`.

- [x] **Step 4: Run tests to verify they fail**

Run: `npm run test -- tests/unit/lib/projects.test.ts tests/unit/components/project-detail.test.tsx tests/unit/style/project-detail-media-layout.test.ts`
Expected: FAIL because Mimesis detail videos are not referenced, portrait orientation is not rendered, and portrait CSS does not exist.

### Task 2: Add Assets And Data

**Files:**
- Copy: `/Users/yongminkim/Development/Portfolio/mimesis/public/videos/ios_curl_animation.webm` to `public/videos/projects/mimesis_page_curl.webm`
- Copy: `/Users/yongminkim/Development/Portfolio/mimesis/public/videos/wiper_typography.webm` to `public/videos/projects/mimesis_wiper_typography.webm`
- Copy: `/Users/yongminkim/Development/Portfolio/mimesis/public/videos/black-white-circle.webm` to `public/videos/projects/mimesis_black_white_circle.webm`
- Copy: `/Users/yongminkim/Development/Portfolio/mimesis/public/videos/staggered-text.webm` to `public/videos/projects/mimesis_staggered_text.webm`
- Modify: `lib/projects.ts`

- [x] **Step 1: Copy Mimesis recordings**

Copy the four WebM recordings into `public/videos/projects/`.

- [x] **Step 2: Extend video media dimensions**

Allow `ProjectVideoMedia` to carry optional `width` and `height`.

- [x] **Step 3: Replace Mimesis detail media list**

Use the four copied detail videos as Mimesis `media`, with labels, captions, width, and height.

### Task 3: Implement Adaptive Media Rendering

**Files:**
- Modify: `components/project-detail.tsx`
- Modify: `components/project-detail.module.css`

- [x] **Step 1: Derive media orientation**

Add a small helper that returns `portrait` when media has both dimensions and `height > width`; otherwise return `landscape`.

- [x] **Step 2: Mark media figures**

Set `data-media-orientation` on the media figure.

- [x] **Step 3: Cap portrait media width**

Add CSS for `.mediaCard[data-media-orientation="portrait"]`:

```css
justify-self: center;
width: min(100%, 24rem);
```

Keep landscape media at full width.

- [x] **Step 4: Run focused tests**

Run: `npm run test -- tests/unit/lib/projects.test.ts tests/unit/components/project-detail.test.tsx tests/unit/style/project-detail-media-layout.test.ts`
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

- [x] **Step 3: Run build**

Run: `npm run build`
Expected: PASS.

- [x] **Step 4: Run or account for Projects browser flow**

Run: `npm run test:e2e -- tests/e2e/projects-filter.spec.ts`
Expected: PASS. If blocked by the existing `next dev` lock, run the equivalent Playwright browser flow against the active local dev server and record the reason.

Note: the standard Playwright command was blocked by an existing `next dev` process holding `.next/dev/lock`. The equivalent Playwright browser flow was run against the active local dev server on port 3000 and passed, including Sellpath portrait media width capping and all four Mimesis detail videos.

- [x] **Step 5: Review diff**

Run: `git diff --stat && git diff --check`
Expected: diff is limited to project detail media sizing, Mimesis media assets, tests, and docs.
