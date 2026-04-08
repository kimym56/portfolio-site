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
  body: string;
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
