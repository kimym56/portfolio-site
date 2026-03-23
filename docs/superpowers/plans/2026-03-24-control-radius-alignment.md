# Control Radius Alignment Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the temporary single radius token with a minimal semantic radius scale that keeps controls, surfaces, and pills visually consistent.

**Architecture:** Define a small radius scale in global CSS with `--radius-md`, `--radius-lg`, and `--radius-full`, then map current components to the token that matches their shape role. Controls and media use `--radius-md`, larger surfaced containers use `--radius-lg`, and pills/circles use `--radius-full`. Verify the system with a focused style regression test.

**Tech Stack:** Next.js App Router, React, CSS Modules, Vitest.

---

## Planned File Structure

- Modify: `app/globals.css`
- Modify: `components/hero-split.module.css`
- Modify: `components/theme-toggle.module.css`
- Modify: `components/site-header.module.css`
- Modify: `components/project-filter.module.css`
- Modify: `components/project-grid.module.css`
- Modify: `components/project-detail.module.css`
- Modify: `tests/unit/style/button-radius-alignment.test.ts`

## Chunk 1: Introduce a Minimal Radius Token Scale

### Task 1: Update the style regression for the radius token scale

**Files:**
- Modify: `tests/unit/style/button-radius-alignment.test.ts`

- [ ] **Step 1: Write the failing test**

Update the style regression so it expects `--radius-md: 14px;`, `--radius-lg: 18px;`, and `--radius-full: 999px;`, expects controls/media to use `--radius-md`, expects surfaced containers to use `--radius-lg`, and expects pills/circles to use `--radius-full`.

- [ ] **Step 2: Run test to verify it fails**

Run:
```bash
npm test -- tests/unit/style/button-radius-alignment.test.ts
```
Expected: FAIL because the token does not exist yet and several controls still use mixed hard-coded radii.

### Task 2: Implement the minimal radius token scale and remap current usage

**Files:**
- Modify: `app/globals.css`
- Modify: `components/hero-split.module.css`
- Modify: `components/theme-toggle.module.css`
- Modify: `components/site-header.module.css`
- Modify: `components/project-filter.module.css`
- Modify: `components/project-grid.module.css`
- Modify: `components/project-detail.module.css`

- [ ] **Step 3: Write the minimal implementation**

Define `--radius-md`, `--radius-lg`, and `--radius-full` in the root theme tokens. Replace the temporary `--control-radius` usage with the correct semantic token in each CSS module, update `.card` and project detail sections to `--radius-lg`, and map intentional pills/circles to `--radius-full`.

- [ ] **Step 4: Run focused verification**

Run:
```bash
npm test -- tests/unit/style/button-radius-alignment.test.ts
```
Expected: PASS.

- [ ] **Step 5: Run related regression coverage**

Run:
```bash
npm test -- tests/unit/style/button-radius-alignment.test.ts tests/unit/style/header-and-footer-style-updates.test.ts
```
Expected: PASS.
