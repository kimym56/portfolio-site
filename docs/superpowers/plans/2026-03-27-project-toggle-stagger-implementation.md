# Project Toggle Stagger Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add directional staggered card motion on every projects tab switch while keeping a single work-project card at the same desktop width as one side-project card.

**Architecture:** `ProjectFilter` remains the owner of tab state and computes the reveal direction for each switch. `ProjectGrid` receives directional metadata and renders per-card stagger attributes, while CSS handles the animation timing without changing the existing desktop width of a single work-project card.

**Tech Stack:** React, Next.js, TypeScript, CSS Modules, Vitest, Testing Library, Playwright

---

## Chunk 1: Directional grid reveal behavior

### Task 1: Add failing grid tests for directional stagger metadata

**Files:**
- Modify: `tests/unit/components/project-grid.test.tsx`
- Test: `tests/unit/components/project-grid.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
it("renders per-card directional stagger metadata", () => {
  render(
    <ProjectGrid
      projects={projects}
      revealDirection="forward"
      shouldAnimate
      onSelect={vi.fn()}
    />,
  );

  const cards = screen.getAllByTestId("project-card");
  expect(cards[0]).toHaveAttribute("data-reveal-direction", "forward");
  expect(cards[1]).toHaveAttribute("data-stagger-index", "1");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/unit/components/project-grid.test.tsx`
Expected: FAIL because `ProjectGrid` does not yet accept reveal props or render the expected attributes.

- [ ] **Step 3: Write minimal implementation**

```tsx
interface ProjectGridProps {
  projects: ProjectItem[];
  onSelect: (project: ProjectItem) => void;
  shouldAnimate?: boolean;
  revealDirection?: "forward" | "backward";
}
```

Render card wrappers with `data-reveal-direction`, `data-stagger-index`, and an animation class when `shouldAnimate` is true.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/unit/components/project-grid.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tests/unit/components/project-grid.test.tsx components/project-grid.tsx
git commit -m "test: cover directional project-grid stagger metadata"
```

### Task 2: Wire tab direction through the filter with TDD

**Files:**
- Modify: `tests/unit/components/project-filter.test.tsx`
- Modify: `components/project-filter.tsx`
- Modify: `components/project-grid.tsx`
- Test: `tests/unit/components/project-filter.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
it("passes forward and backward reveal directions on tab switches", async () => {
  const user = userEvent.setup();
  renderProjectFilter();

  await user.click(screen.getByRole("button", { name: "Side Projects" }));
  expect(screen.getAllByTestId("project-card")[0]).toHaveAttribute(
    "data-reveal-direction",
    "forward",
  );

  await user.click(screen.getByRole("button", { name: "Work Projects" }));
  expect(screen.getByTestId("project-card")).toHaveAttribute(
    "data-reveal-direction",
    "backward",
  );
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/unit/components/project-filter.test.tsx`
Expected: FAIL because direction is not yet derived or passed through.

- [ ] **Step 3: Write minimal implementation**

Track the latest tab-switch direction in `ProjectFilter` and pass it into `ProjectGrid` along with `shouldAnimate`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/unit/components/project-filter.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tests/unit/components/project-filter.test.tsx components/project-filter.tsx components/project-grid.tsx
git commit -m "feat: add directional tab reveal state for project grid"
```

## Chunk 2: CSS stagger styling

### Task 3: Add failing style/layout tests for directional reveal styling

**Files:**
- Modify: `tests/unit/style/project-grid-card-layout.test.ts`
- Modify: `components/project-grid.module.css`
- Test: `tests/unit/style/project-grid-card-layout.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
it("defines directional reveal keyframes for project cards", () => {
  const css = readFileSync("components/project-grid.module.css", "utf8");
  expect(css).toMatch(/@keyframes projectCardRevealForward/);
  expect(css).toMatch(/@keyframes projectCardRevealBackward/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/unit/style/project-grid-card-layout.test.ts`
Expected: FAIL because the directional reveal keyframes are absent.

- [ ] **Step 3: Write minimal implementation**

Add directional stagger keyframes plus delay rules for animated cards while preserving the current single-card desktop width.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/unit/style/project-grid-card-layout.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tests/unit/style/project-grid-card-layout.test.ts components/project-grid.module.css
git commit -m "feat: add directional stagger styling for project cards"
```

### Task 4: Verify integrated unit coverage

**Files:**
- Test: `tests/unit/components/project-filter.test.tsx`
- Test: `tests/unit/components/project-grid.test.tsx`
- Test: `tests/unit/style/project-grid-card-layout.test.ts`

- [ ] **Step 1: Run focused unit tests**

Run: `npm test -- tests/unit/components/project-filter.test.tsx tests/unit/components/project-grid.test.tsx tests/unit/style/project-grid-card-layout.test.ts`
Expected: PASS

- [ ] **Step 2: Commit**

```bash
git add tests/unit/components/project-filter.test.tsx tests/unit/components/project-grid.test.tsx tests/unit/style/project-grid-card-layout.test.ts components/project-filter.tsx components/project-grid.tsx components/project-grid.module.css
git commit -m "test: verify project toggle stagger and width behavior"
```

## Chunk 3: Browser verification

### Task 5: Update focused e2e expectation

**Files:**
- Modify: `tests/e2e/projects-filter.spec.ts`
- Test: `tests/e2e/projects-filter.spec.ts`

- [ ] **Step 1: Write the failing expectation**

Extend the spec to assert repeated animated tab switches and stable card count/visibility for both tabs.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:e2e -- tests/e2e/projects-filter.spec.ts`
Expected: FAIL before the browser assertions are updated or the dev server becomes available.

- [ ] **Step 3: Write minimal implementation**

Update the Playwright assertions to match the approved repeated animation behavior and stable layout expectations where practical.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test:e2e -- tests/e2e/projects-filter.spec.ts`
Expected: PASS if the Next test server can start cleanly.

- [ ] **Step 5: Commit**

```bash
git add tests/e2e/projects-filter.spec.ts
git commit -m "test: cover repeated projects tab animation in browser"
```
