# Home Hero Crossfade Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the home hero's remount-based text and image swap with a calmer synchronized crossfade.

**Architecture:** Keep `HeroSplit` as the single rotation clock. It should manage `activeIndex`, `previousIndex`, and a shared cleanup timeout, pass the layered text state into `RotatingRole`, and render outgoing and incoming images with matching opacity-only animations driven by the same timing constants.

**Tech Stack:** Next.js, React, TypeScript, CSS Modules, Vitest, Testing Library

---

**Worktree note:** `components/hero-split.module.css`, `components/rotating-role.module.css`, and `components/rotating-role.tsx` already have local edits in the current workspace. Execute this plan in an isolated worktree and preserve those changes.

## Chunk 1: Replace remount-based text motion with a layered crossfade

### Task 1: Update the rotating role tests and implementation

**Files:**
- Modify: `tests/unit/components/rotating-role.test.tsx`
- Modify: `tests/unit/style/rotating-role-animation-speed.test.ts`
- Modify: `components/rotating-role.tsx`
- Modify: `components/rotating-role.module.css`

- [ ] **Step 1: Write the failing tests**

```tsx
it("renders both the outgoing and incoming roles during a controlled transition", () => {
  const roles = ["I am a Design Engineer", "I am a UX Engineer"];
  const { rerender } = render(<RotatingRole roles={roles} activeIndex={0} />);

  rerender(
    <RotatingRole
      roles={roles}
      activeIndex={1}
      previousIndex={0}
      isTransitioning
    />,
  );

  expect(screen.getByText("I am a Design Engineer")).toBeInTheDocument();
  expect(screen.getByText("I am a UX Engineer")).toBeInTheDocument();
});
```

```ts
expect(cssContent).toMatch(/role-fade-in\s+(\d+)ms\s+ease/);
expect(cssContent).not.toMatch(/translateY/);
expect(cssContent).toMatch(
  /@media\s*\(prefers-reduced-motion: reduce\)\s*\{[\s\S]*animation:\s*none;/,
);
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- tests/unit/components/rotating-role.test.tsx tests/unit/style/rotating-role-animation-speed.test.ts`
Expected: FAIL because `RotatingRole` only renders one keyed span and the stylesheet still uses a `translateY`-based enter animation.

- [ ] **Step 3: Write the minimal implementation**

```tsx
interface RotatingRoleProps {
  roles: string[];
  activeIndex?: number;
  intervalMs?: number;
  previousIndex?: number | null;
  isTransitioning?: boolean;
}

const shouldShowPrevious =
  isTransitioning &&
  previousIndex !== undefined &&
  previousIndex !== null &&
  previousIndex !== roleIndex;

return (
  <span className={styles.roleStack}>
    {shouldShowPrevious ? (
      <span className={`${styles.role} ${styles.roleExit}`} aria-hidden="true">
        {roles[previousIndex]}
      </span>
    ) : null}
    <span
      className={`${styles.role} ${isTransitioning ? styles.roleEnter : styles.roleStatic}`}
      data-testid="rotating-role"
    >
      {roles[roleIndex]}
    </span>
  </span>
);
```

```css
.roleStack {
  display: inline-grid;
}

.role {
  grid-area: 1 / 1;
}

.roleEnter {
  opacity: 0;
  animation: role-fade-in 320ms ease-out forwards;
}

.roleExit {
  opacity: 1;
  animation: role-fade-out 320ms ease-out forwards;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- tests/unit/components/rotating-role.test.tsx tests/unit/style/rotating-role-animation-speed.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tests/unit/components/rotating-role.test.tsx tests/unit/style/rotating-role-animation-speed.test.ts components/rotating-role.tsx components/rotating-role.module.css
git commit -m "feat: add calm rotating role crossfade"
```

## Chunk 2: Synchronize image and text crossfade in the home hero

### Task 2: Update the hero tests and implementation

**Files:**
- Modify: `tests/unit/components/hero-split.test.tsx`
- Modify: `components/hero-split.tsx`
- Modify: `components/hero-split.module.css`
- Modify: `components/rotating-role.tsx`
- Test: `tests/unit/style/hero-image-scale.test.ts`

- [ ] **Step 1: Write the failing tests**

```tsx
it("briefly renders the outgoing and incoming hero states together during a tick", () => {
  const { container } = render(<HeroSplit copy={copy} />);

  act(() => {
    vi.advanceTimersByTime(DEFAULT_INTERVAL_MS);
  });

  expect(screen.getByText("I am a Design Engineer")).toBeInTheDocument();
  expect(screen.getByText("I am a UX Engineer")).toBeInTheDocument();
  expect(container.querySelectorAll("img")).toHaveLength(2);
});

it("cleans up the outgoing layers after the shared crossfade window", () => {
  const { container } = render(<HeroSplit copy={copy} />);

  act(() => {
    vi.advanceTimersByTime(DEFAULT_INTERVAL_MS + DEFAULT_TRANSITION_MS);
  });

  expect(screen.queryByText("I am a Design Engineer")).not.toBeInTheDocument();
  expect(container.querySelectorAll("img")).toHaveLength(1);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- tests/unit/components/hero-split.test.tsx`
Expected: FAIL because `HeroSplit` still swaps immediately to one active role and one active image, and it removes the old image on a separate timeout.

- [ ] **Step 3: Write the minimal implementation**

```tsx
export const DEFAULT_INTERVAL_MS = 4500;
export const DEFAULT_TRANSITION_MS = 320;

const [activeIndex, setActiveIndex] = useState(0);
const [previousIndex, setPreviousIndex] = useState<number | null>(null);

const transitionTo = (nextIndex: number) => {
  setPreviousIndex(activeIndex);
  setActiveIndex(nextIndex);

  window.clearTimeout(cleanupTimeoutRef.current);
  cleanupTimeoutRef.current = window.setTimeout(() => {
    setPreviousIndex(null);
  }, DEFAULT_TRANSITION_MS);
};
```

```tsx
<RotatingRole
  roles={copy.roles}
  activeIndex={activeIndex}
  previousIndex={previousIndex}
  isTransitioning={previousIndex !== null}
/>

<div className={styles.media}>
  {previousImageSrc ? (
    <Image
      src={previousImageSrc}
      alt=""
      aria-hidden="true"
      fill
      className={`${styles.image} ${styles.imageExit}`}
    />
  ) : null}
  {activeImageSrc ? (
    <Image
      src={activeImageSrc}
      alt={copy.imageAlt}
      fill
      className={`${styles.image} ${previousIndex !== null ? styles.imageEnter : styles.imageStatic}`}
    />
  ) : null}
</div>
```

```css
.imageEnter {
  opacity: 0;
  animation: image-fade-in 320ms ease-out forwards;
}

.imageExit {
  opacity: 1;
  animation: image-fade-out 320ms ease-out forwards;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- tests/unit/components/hero-split.test.tsx`
Expected: PASS

- [ ] **Step 5: Run final focused verification**

Run: `npm test -- tests/unit/components/rotating-role.test.tsx tests/unit/components/hero-split.test.tsx tests/unit/style/rotating-role-animation-speed.test.ts tests/unit/style/hero-image-scale.test.ts`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add tests/unit/components/hero-split.test.tsx components/hero-split.tsx components/hero-split.module.css components/rotating-role.tsx
git commit -m "feat: sync home hero crossfade"
```
