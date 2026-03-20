# Projects Tab Detail View Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the Projects page so the work/side toggle feels more intentional, the real project set is `Sellpath` + three side projects, and selecting a project opens an in-page editorial detail view with a back arrow.

**Architecture:** Keep `/projects` as a single page and manage the interaction entirely in client state inside `ProjectFilter`. Split the UI into a list view component and a dedicated detail view component so the expanded state does not overload the grid markup. Expand the local project dataset with fixed detail fields that scaffold the writing structure the user will fill later.

**Tech Stack:** Next.js App Router, React 19, TypeScript, CSS Modules, Vitest + Testing Library, Playwright

---

## Assumptions

- Implement in the current workspace because the user explicitly declined an isolated worktree.
- Avoid touching unrelated local edits already present in the repository.
- Keep the feature on the existing `/projects` route with no modal and no nested route.

## Planned File Structure

- Modify: `app/projects/page.tsx`
- Modify: `components/project-filter.tsx`
- Modify: `components/project-filter.module.css`
- Modify: `components/project-grid.tsx`
- Modify: `components/project-grid.module.css`
- Create: `components/project-detail.tsx`
- Create: `components/project-detail.module.css`
- Modify: `lib/projects.ts`
- Modify: `lib/site-copy.ts`
- Modify: `types/site.ts`
- Modify: `tests/unit/components/project-filter.test.tsx`
- Modify: `tests/e2e/projects-filter.spec.ts`

## Chunk 1: Express The New Behavior With Tests

### Task 1: Update unit coverage for counts, selection, and back navigation

**Files:**
- Modify: `tests/unit/components/project-filter.test.tsx`
- Test: `components/project-filter.tsx`

- [ ] **Step 1: Write the failing unit tests**

Add focused tests that verify:

- the default `work` view renders only one card
- the `side` view renders three cards
- selecting `Sellpath` opens the detail view and hides the toggle
- clicking the back arrow restores the previous category list

Example assertions:

```tsx
expect(screen.getAllByTestId("project-card")).toHaveLength(1);
await user.click(screen.getByRole("button", { name: /mimesis/i }));
expect(screen.getByRole("button", { name: /back to side projects/i })).toBeVisible();
```

- [ ] **Step 2: Run the unit test to verify RED**

Run:
```bash
npm test -- tests/unit/components/project-filter.test.tsx
```
Expected: FAIL because the current component only filters a grid and has no detail-view state.

- [ ] **Step 3: Commit the red test state**

Run:
```bash
git add tests/unit/components/project-filter.test.tsx
git commit -m "test: define projects detail view behavior"
```
Expected: commit created with the failing test change only.

### Task 2: Update e2e coverage for the real project counts and detail flow

**Files:**
- Modify: `tests/e2e/projects-filter.spec.ts`
- Test: `app/projects/page.tsx`

- [ ] **Step 1: Write the failing e2e assertions**

Cover:

- one visible work card on initial load
- three side cards after switching to side projects
- selecting a side project opens the detail view
- the back arrow returns to the side list

- [ ] **Step 2: Run the e2e spec to verify RED**

Run:
```bash
npm run test:e2e -- tests/e2e/projects-filter.spec.ts
```
Expected: FAIL because the list counts and detail interactions do not exist yet.

- [ ] **Step 3: Commit the red e2e state**

Run:
```bash
git add tests/e2e/projects-filter.spec.ts
git commit -m "test: add projects tab detail flow e2e coverage"
```
Expected: commit created with the failing e2e change only.

## Chunk 2: Implement The Data Model And UI

### Task 3: Expand the project content model and copy

**Files:**
- Modify: `lib/projects.ts`
- Modify: `lib/site-copy.ts`
- Modify: `types/site.ts`

- [ ] **Step 1: Add detail-view fields to the project type**

Represent the fixed scaffold explicitly, for example:

```ts
interface ProjectDetailContent {
  summary: string;
  whatThisProjectIs: string;
  whatIFocusedOn: string;
  considerations: string;
  meta: string[];
}
```

- [ ] **Step 2: Replace the placeholder projects with the approved set**

Define:

- `Sellpath` as the only `work` project
- `Mimesis`, `Website`, and `Design System Project` as `side` projects

Each entry should include title, role, short list-card description, URL, stack, and scaffolded detail text.

- [ ] **Step 3: Add any missing labels to site copy**

If needed, add labels such as `backToProjects` or `projectDetails` to the typed projects copy shape instead of hardcoding user-facing strings across components.

- [ ] **Step 4: Run the unit test again**

Run:
```bash
npm test -- tests/unit/components/project-filter.test.tsx
```
Expected: still FAIL because the UI has not been updated yet, but the data model compiles.

- [ ] **Step 5: Commit the data-model change**

Run:
```bash
git add lib/projects.ts lib/site-copy.ts types/site.ts
git commit -m "feat: add projects detail content model"
```
Expected: commit created.

### Task 4: Implement selectable list cards and the editorial detail view

**Files:**
- Modify: `components/project-filter.tsx`
- Modify: `components/project-filter.module.css`
- Modify: `components/project-grid.tsx`
- Modify: `components/project-grid.module.css`
- Create: `components/project-detail.tsx`
- Create: `components/project-detail.module.css`
- Modify: `app/projects/page.tsx`

- [ ] **Step 1: Implement state for selected category and selected project**

`ProjectFilter` should track:

- active category: `work | side`
- selected project id or `null`

When a project is selected, render `ProjectDetail` instead of `ProjectGrid`.

- [ ] **Step 2: Convert project cards into selection affordances**

Replace the list-card external link action with a selectable card/button pattern that:

- keeps the card readable as a summary
- makes click/focus states obvious
- exposes an accessible name for opening the project detail

- [ ] **Step 3: Build the detail component**

`ProjectDetail` should render:

- back arrow button with accessible label
- project title and role
- external link beside the title block
- sections for `Summary`, `What This Project Is`, `What I Focused On`, `UI/UX/HCI/Frontend Considerations`, and `Project Meta`

- [ ] **Step 4: Update styling**

Implement:

- a cleaner segmented toggle
- selectable card styling
- editorial detail layout with strong hierarchy
- responsive header so the external link sits next to the title on desktop and stacks on mobile

- [ ] **Step 5: Run the unit tests to verify GREEN**

Run:
```bash
npm test -- tests/unit/components/project-filter.test.tsx
```
Expected: PASS.

- [ ] **Step 6: Run the e2e spec to verify GREEN**

Run:
```bash
npm run test:e2e -- tests/e2e/projects-filter.spec.ts
```
Expected: PASS.

- [ ] **Step 7: Run a production build**

Run:
```bash
npm run build
```
Expected: PASS.

- [ ] **Step 8: Commit the UI implementation**

Run:
```bash
git add app/projects/page.tsx components/project-filter.tsx components/project-filter.module.css components/project-grid.tsx components/project-grid.module.css components/project-detail.tsx components/project-detail.module.css lib/projects.ts lib/site-copy.ts types/site.ts tests/unit/components/project-filter.test.tsx tests/e2e/projects-filter.spec.ts
git commit -m "feat: add expandable projects tab detail view"
```
Expected: commit created.

## Chunk 3: Final Verification

### Task 5: Re-run the scoped verification suite and inspect the diff

**Files:**
- Modify: none
- Test: `tests/unit/components/project-filter.test.tsx`
- Test: `tests/e2e/projects-filter.spec.ts`

- [ ] **Step 1: Re-run the full scoped checks**

Run:
```bash
npm test -- tests/unit/components/project-filter.test.tsx
npm run test:e2e -- tests/e2e/projects-filter.spec.ts
npm run build
```
Expected: all commands pass with no new failures.

- [ ] **Step 2: Inspect the final diff**

Run:
```bash
git diff -- app/projects/page.tsx components/project-filter.tsx components/project-filter.module.css components/project-grid.tsx components/project-grid.module.css components/project-detail.tsx components/project-detail.module.css lib/projects.ts lib/site-copy.ts types/site.ts tests/unit/components/project-filter.test.tsx tests/e2e/projects-filter.spec.ts
```
Expected: diff is limited to the projects-tab feature and its tests.
