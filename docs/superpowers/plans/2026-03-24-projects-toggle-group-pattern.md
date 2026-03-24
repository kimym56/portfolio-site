# Projects Toggle Group Pattern Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework the projects category toggle so it uses a shared sliding indicator inside one stable group, matching the Motion/Base UI interaction pattern while preserving the current filter behavior.

**Architecture:** Keep the change local to `ProjectFilter` and its stylesheet. Replace the current button-local active pill with a single decorative sibling indicator inside the group, animate it with Framer Motion, and tighten unit coverage so the DOM shape reflects the intended toggle-group pattern.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Framer Motion, CSS Modules, Vitest, Testing Library

---

## Planned File Structure

- Modify: `components/project-filter.tsx`
- Modify: `components/project-filter.module.css`
- Modify: `tests/unit/components/project-filter.test.tsx`

## Chunk 1: Lock The Shared-Indicator Contract With A Failing Test

### Task 1: Update the unit test for the revised DOM structure

**Files:**
- Modify: `tests/unit/components/project-filter.test.tsx`
- Test: `components/project-filter.tsx`

- [ ] **Step 1: Write the failing test**

Assert that:

- the active indicator is rendered with `data-testid="projects-toggle-indicator"`
- it reflects the selected tab via `data-active-tab`
- it is a child of the toggle-group container
- it is not nested inside either toggle button

- [ ] **Step 2: Run the focused test to verify RED**

Run:
```bash
npm test -- tests/unit/components/project-filter.test.tsx
```
Expected: FAIL because the current implementation renders the indicator inside the active button.

## Chunk 2: Implement The Shared Toggle Group Indicator

### Task 2: Move the active tile to the group level

**Files:**
- Modify: `components/project-filter.tsx`
- Modify: `components/project-filter.module.css`

- [ ] **Step 3: Write the minimal implementation**

Render one shared indicator as a decorative sibling inside the group, animate its position between the two toggle slots with Framer Motion, and preserve the existing button click handlers, `aria-pressed` semantics, and reduced-motion fallback.

- [ ] **Step 4: Update the styles**

Style the group as a stable track, keep the buttons visually neutral, and ensure the moving active tile sits underneath the selected label rather than belonging to the button itself.

- [ ] **Step 5: Run the focused test to verify GREEN**

Run:
```bash
npm test -- tests/unit/components/project-filter.test.tsx
```
Expected: PASS.

## Chunk 3: Final Verification

### Task 3: Run scoped verification and inspect the diff

**Files:**
- Modify: none

- [ ] **Step 6: Run verification**

Run:
```bash
npm test -- tests/unit/components/project-filter.test.tsx
npm run build
```
Expected: both commands PASS.

- [ ] **Step 7: Inspect the final diff**

Run:
```bash
git diff -- components/project-filter.tsx components/project-filter.module.css tests/unit/components/project-filter.test.tsx
```
Expected: diff is limited to the shared projects toggle-group indicator and its test coverage.
