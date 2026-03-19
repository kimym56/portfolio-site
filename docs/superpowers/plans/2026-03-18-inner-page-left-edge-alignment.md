# Inner Page Left Edge Alignment Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align the full About, Projects, and Contact page content block to the same left edge as the shared page grid and header logo.

**Architecture:** Keep the existing shared container width untouched and remove only the extra horizontal inset from the three inner page section wrappers. Protect the layout with a focused CSS regression test that asserts those wrappers use vertical-only padding.

**Tech Stack:** Next.js App Router, React, TypeScript, Vitest.

---

## Planned File Structure

- Modify: `app/globals.css`
- Create: `tests/unit/style/inner-page-left-edge-alignment.test.ts`

## Chunk 1: Remove Inner Page Horizontal Inset

### Task 1: Lock the Layout Rule With a Failing Test and Apply the Minimal CSS Change

**Files:**
- Modify: `app/globals.css`
- Create: `tests/unit/style/inner-page-left-edge-alignment.test.ts`

- [ ] **Step 1: Write the failing test**

Create a style regression test that reads `app/globals.css`, extracts the `.about-card`, `.projects-card`, and `.contact-card` blocks, and asserts each block uses `padding-block` rather than a full `padding` shorthand.

- [ ] **Step 2: Run test to verify it fails**

Run:
```bash
npm test -- tests/unit/style/inner-page-left-edge-alignment.test.ts
```
Expected: FAIL because each section rule still uses `padding: clamp(1.2rem, 3vw, 2.2rem);`.

- [ ] **Step 3: Write the minimal implementation**

Update the three section rules in `app/globals.css` to use `padding-block: clamp(1.2rem, 3vw, 2.2rem);` and no horizontal padding.

- [ ] **Step 4: Run test to verify it passes**

Run:
```bash
npm test -- tests/unit/style/inner-page-left-edge-alignment.test.ts
```
Expected: PASS.

- [ ] **Step 5: Run focused regression verification**

Run:
```bash
npm test -- tests/unit/style/inner-page-left-edge-alignment.test.ts tests/unit/pages/inner-pages-cardless.test.tsx
npm run test:e2e -- tests/e2e/about-page.spec.ts tests/e2e/contact-page.spec.ts tests/e2e/projects-filter.spec.ts
```
Expected: PASS.
