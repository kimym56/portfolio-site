# Projects Toggle Motion Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a smooth sliding active pill to the `Work Projects` / `Side Projects` toggle without changing the existing project filtering or panel reveal behavior.

**Architecture:** Keep the change local to `ProjectFilter` by rendering a decorative active indicator inside the segmented control and moving it with Framer Motion based on the selected category. Preserve the existing button semantics, `aria-pressed` state, and project-panel reveal logic while updating the unit test to cover the indicator behavior.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Framer Motion, CSS Modules, Vitest, Testing Library

---

## Assumptions

- Work in the current workspace because the user requested a direct UI update rather than an isolated worktree flow.
- Preserve unrelated staged changes that already exist in `components/project-filter.module.css`.
- Keep reduced-motion users on an immediate state change with no spring animation.

## Planned File Structure

- Modify: `components/project-filter.tsx`
- Modify: `components/project-filter.module.css`
- Modify: `tests/unit/components/project-filter.test.tsx`

## Chunk 1: Lock The Toggle Motion Contract With A Failing Test

### Task 1: Extend the ProjectFilter unit test to cover the active indicator

**Files:**
- Modify: `tests/unit/components/project-filter.test.tsx`
- Test: `components/project-filter.tsx`

- [ ] **Step 1: Write the failing test**

Add assertions that:

- the toggle renders a decorative active indicator for the default `work` selection
- the selected toggle button remains `aria-pressed="true"`
- after switching to `side`, the active indicator now reflects the `side` state

Use a stable selector such as `data-testid="projects-toggle-indicator"` and a state attribute such as `data-active-tab`.

- [ ] **Step 2: Run the focused unit test to verify RED**

Run:
```bash
npm test -- tests/unit/components/project-filter.test.tsx
```
Expected: FAIL because the current toggle renders only two buttons and no active-indicator element.

## Chunk 2: Implement The Sliding Pill

### Task 2: Add the animated indicator and keep the current semantics

**Files:**
- Modify: `components/project-filter.tsx`
- Modify: `components/project-filter.module.css`

- [ ] **Step 3: Write the minimal implementation**

Update `ProjectFilter` to:

- render one decorative indicator inside the toggle group
- position the two toggle buttons above the indicator
- move the indicator between the two button slots with Framer Motion
- preserve the existing `aria-pressed` attributes and click handlers
- use reduced-motion preference to disable the spring transition

- [ ] **Step 4: Update the segmented-control styling**

Adjust the CSS so the toggle group can host the moving pill, the active label remains readable above it, and the control still works on mobile widths without changing the surrounding panel animation styles.

- [ ] **Step 5: Run the focused unit test to verify GREEN**

Run:
```bash
npm test -- tests/unit/components/project-filter.test.tsx
```
Expected: PASS.

## Chunk 3: Final Verification

### Task 3: Re-run scoped checks and validate production build

**Files:**
- Modify: none
- Test: `tests/unit/components/project-filter.test.tsx`

- [ ] **Step 6: Run scoped verification**

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
Expected: diff is limited to the animated projects toggle and its test coverage.
