# About Copy Refresh Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the About page copy so it clearly presents YongMin Kim as a developer interested in UX/HCI and design engineering.

**Architecture:** The About page content remains centralized in `lib/site-copy.ts` and continues to render through the existing page component. Only the copy strings and the test assertions tied to those strings need to change.

**Tech Stack:** Next.js App Router, TypeScript, Playwright

---

## Chunk 1: Copy Update

### Task 1: Lock the new About copy in tests

**Files:**
- Modify: `tests/e2e/about-page.spec.ts`

- [ ] **Step 1: Update the About page text assertion**

Replace the current subtitle expectation with the approved subtitle and add an assertion for the opening paragraph.

- [ ] **Step 2: Run the About page end-to-end test to confirm it fails before implementation**

Run: `npx playwright test tests/e2e/about-page.spec.ts`
Expected: FAIL because the page still renders the previous copy.

### Task 2: Apply the approved About copy

**Files:**
- Modify: `lib/site-copy.ts`
- Verify: `app/about/page.tsx`

- [ ] **Step 1: Update the About subtitle**

Set `SITE_COPY.about.subtitle` to `A developer interested in UX/HCI, thoughtful interfaces, and design engineering.`

- [ ] **Step 2: Replace the About paragraphs**

Set `SITE_COPY.about.paragraphs` to the three approved statements from the design document without changing the page structure.

- [ ] **Step 3: Confirm the About page renderer still maps the copy without structural changes**

Verify `app/about/page.tsx` still reads from `SITE_COPY.about`.

### Task 3: Verify the copy change

**Files:**
- Test: `tests/e2e/about-page.spec.ts`

- [ ] **Step 1: Re-run the targeted About page test**

Run: `npx playwright test tests/e2e/about-page.spec.ts`
Expected: PASS

- [ ] **Step 2: Commit**

```bash
git add docs/superpowers/specs/2026-03-18-about-copy-refresh-design.md docs/superpowers/plans/2026-03-18-about-copy-refresh.md lib/site-copy.ts tests/e2e/about-page.spec.ts
git commit -m "feat: refresh about page copy"
```
