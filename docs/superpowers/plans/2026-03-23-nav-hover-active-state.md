# Nav Hover Active State Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make header nav tabs use borderless text-only hover emphasis and highlight the current route with stronger font weight.

**Architecture:** Keep the change local to the shared header by reading the current pathname in `SiteHeader` and exposing the active tab with `aria-current="page"`. Update the header CSS so hover and active states share the same text-only treatment and verify the behavior with one component test and one stylesheet regression test.

**Tech Stack:** Next.js App Router, React, TypeScript, CSS Modules, Vitest, Testing Library.

---

## Planned File Structure

- Modify: `components/site-header.tsx`
- Modify: `components/site-header.module.css`
- Modify: `tests/unit/components/site-header.test.tsx`
- Modify: `tests/unit/style/header-and-footer-style-updates.test.ts`

## Chunk 1: Add Text-Only Hover and Active Nav State

### Task 1: Lock the Current-Route Semantics With a Failing Component Test

**Files:**
- Modify: `tests/unit/components/site-header.test.tsx`

- [ ] **Step 1: Write the failing test**

Add a header test that mocks the current pathname as `/about`, renders `SiteHeader`, and asserts the `About Me` link exposes `aria-current="page"` while non-current links do not.

- [ ] **Step 2: Run test to verify it fails**

Run:
```bash
npm test -- tests/unit/components/site-header.test.tsx
```
Expected: FAIL because the current header does not read pathname or mark the active link.

### Task 2: Lock the Borderless Hover Styling With a Failing Style Test

**Files:**
- Modify: `tests/unit/style/header-and-footer-style-updates.test.ts`

- [ ] **Step 3: Write the failing test**

Add a style regression test for `components/site-header.module.css` that expects the nav hover/current styling to rely on `font-weight` and not use the old hover background or border-color rules.

- [ ] **Step 4: Run test to verify it fails**

Run:
```bash
npm test -- tests/unit/style/header-and-footer-style-updates.test.ts
```
Expected: FAIL because the current stylesheet still adds hover background and border styling and does not define a current-route selector.

### Task 3: Implement the Minimal Header Changes

**Files:**
- Modify: `components/site-header.tsx`
- Modify: `components/site-header.module.css`

- [ ] **Step 5: Write the minimal implementation**

Use `usePathname()` in `SiteHeader`, apply `aria-current="page"` to the matching route link, and update the CSS so hover and current states are text-only with stronger font weight and no border/background treatment.

- [ ] **Step 6: Run focused verification**

Run:
```bash
npm test -- tests/unit/components/site-header.test.tsx tests/unit/style/header-and-footer-style-updates.test.ts
```
Expected: PASS.
