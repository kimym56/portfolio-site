# Project Card UI Refresh Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh the Projects grid cards so the title, role, arrow affordance, and tech chips match the approved editorial layout and About chip styling.

**Architecture:** Keep the full card as a single button, update the project data model to carry chip metadata, then render the richer chip structure in `ProjectGrid` while reusing the existing global About chip classes. Adjust only `project-grid.module.css` for the new header row, arrow placement, and tighter description-to-chip spacing.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS Modules, Vitest, Testing Library

---

## File Structure

- Modify: `lib/projects.ts`
  - Replace plain `stack: string[]` items with structured tech chip metadata.
- Modify: `components/project-grid.tsx`
  - Render the new header row, decorative arrow, and chip list markup.
- Modify: `components/project-grid.module.css`
  - Add header-row layout, arrow styling, chip list spacing, and responsive wrapping rules.
- Modify: `tests/unit/components/project-filter.test.tsx`
  - Update fixture data shape and preserve existing filter/detail behavior coverage.
- Create: `tests/unit/components/project-grid.test.tsx`
  - Add focused rendering assertions for the refreshed card structure.
- Create: `tests/unit/style/project-grid-card-layout.test.ts`
  - Add focused CSS assertions for the header row and chip spacing.

## Chunk 1: Data Shape And Card Markup

### Task 1: Add focused card rendering coverage

**Files:**
- Create: `tests/unit/components/project-grid.test.tsx`
- Modify: `tests/unit/components/project-filter.test.tsx`
- Reference: `components/project-grid.tsx`
- Reference: `lib/projects.ts`

- [ ] **Step 1: Write the failing ProjectGrid test**

```tsx
it("renders inline role text, removes the Open label, and shows tech chips", () => {
  render(<ProjectGrid projects={[project]} onSelect={vi.fn()} />);

  expect(screen.getByText("Sellpath")).toBeInTheDocument();
  expect(screen.getByText("Frontend Engineer")).toBeInTheDocument();
  expect(screen.queryByText("Open")).not.toBeInTheDocument();
  expect(screen.getByText("React")).toHaveClass(
    "about-chip",
    "about-chip-frontend",
    "about-chip-strong",
  );
});
```

- [ ] **Step 2: Run the new test to verify it fails**

Run: `npm test -- tests/unit/components/project-grid.test.tsx`
Expected: FAIL because `ProjectGrid` still joins `stack` into a string and still renders the `Open` label.

- [ ] **Step 3: Update shared project fixtures to the new stack shape**

```ts
stack: [
  { label: "React", category: "frontend", proficiency: "strong" },
  { label: "Next.js", category: "frontend", proficiency: "strong" },
]
```

Apply this shape in:
- `lib/projects.ts`
- `tests/unit/components/project-filter.test.tsx`

- [ ] **Step 4: Update ProjectGrid markup with the approved structure**

Implement:
- a single top row containing title, role, and decorative arrow
- description directly below the row
- a chip list rendered from structured `stack` items
- no visible `Open` text

Use markup along these lines:

```tsx
<span className={styles.header}>
  <span className={styles.heading}>
    <span className={styles.title}>{project.title}</span>
    <span className={styles.role}>{project.role}</span>
  </span>
  <span className={styles.action} aria-hidden="true">
    <span className={styles.actionIcon}>→</span>
  </span>
</span>
<span className={styles.description}>{project.description}</span>
<span className={styles.stack} aria-hidden="true">
  {project.stack.map((item) => (
    <span
      key={item.label}
      className={[
        "about-chip",
        `about-chip-${item.category}`,
        `about-chip-${item.proficiency}`,
      ].join(" ")}
    >
      {item.label}
    </span>
  ))}
</span>
```

- [ ] **Step 5: Run the focused component tests to verify they pass**

Run: `npm test -- tests/unit/components/project-grid.test.tsx tests/unit/components/project-filter.test.tsx`
Expected: PASS

- [ ] **Step 6: Commit the markup/data chunk**

```bash
git add lib/projects.ts components/project-grid.tsx tests/unit/components/project-grid.test.tsx tests/unit/components/project-filter.test.tsx
git commit -m "feat: refresh project card content structure"
```

## Chunk 2: Card Layout Styles And Regression Verification

### Task 2: Add focused style coverage for the new card layout

**Files:**
- Create: `tests/unit/style/project-grid-card-layout.test.ts`
- Modify: `components/project-grid.module.css`
- Reference: `app/globals.css`

- [ ] **Step 1: Write the failing style test**

```ts
it("pins the arrow in the header row and tightens the chip spacing", () => {
  const css = readFile("components/project-grid.module.css");

  expect(css).toMatch(/\.header\s*\{[\s\S]*display:\s*flex;/);
  expect(css).toMatch(/\.header\s*\{[\s\S]*justify-content:\s*space-between;/);
  expect(css).toMatch(/\.stack\s*\{[\s\S]*display:\s*flex;/);
  expect(css).toMatch(/\.stack\s*\{[\s\S]*flex-wrap:\s*wrap;/);
});
```

- [ ] **Step 2: Run the style test to verify it fails**

Run: `npm test -- tests/unit/style/project-grid-card-layout.test.ts`
Expected: FAIL because the current stylesheet still uses the old footer layout.

- [ ] **Step 3: Update project card CSS with the approved layout**

Implement in `components/project-grid.module.css`:
- `.cardButton` keeps the card shell but uses tighter internal spacing than before
- `.header` becomes the top row for heading and arrow
- `.heading` allows title and role to sit inline and wrap together
- `.description` uses a smaller bottom gap than the current footer layout
- `.stack` becomes a wrapping flex row for chips
- `.action` becomes a compact circular surface aligned to the top-right
- responsive behavior keeps the arrow fixed while the left heading block wraps

- [ ] **Step 4: Run the focused style tests to verify they pass**

Run: `npm test -- tests/unit/style/project-grid-card-layout.test.ts tests/unit/style/button-radius-alignment.test.ts tests/unit/style/typography-font-roles.test.ts`
Expected: PASS

- [ ] **Step 5: Run the full targeted regression suite**

Run: `npm test -- tests/unit/components/project-grid.test.tsx tests/unit/components/project-filter.test.tsx tests/unit/style/project-grid-card-layout.test.ts tests/unit/style/button-radius-alignment.test.ts tests/unit/style/typography-font-roles.test.ts`
Expected: PASS

- [ ] **Step 6: Commit the style chunk**

```bash
git add components/project-grid.module.css tests/unit/style/project-grid-card-layout.test.ts
git commit -m "feat: refresh project card layout styling"
```

- [ ] **Step 7: Manual browser verification**

Run: `npm run dev`
Check:
- the title, role, and arrow share the same top row
- the arrow stays pinned at the top-right on narrow cards
- description-to-chip spacing is visibly tighter than before
- chip colors match the About page style language
