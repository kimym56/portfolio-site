# Home Hero Motion Smoothing Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Slow the home hero transition down and replace the text's abrupt enter-only swap with a softer overlap crossfade.

**Architecture:** Keep `HeroSplit` as the single owner of rotation timing, `activeIndex`, `previousIndex`, and cleanup. Reuse that shared transition window for both image and text, and make `RotatingRole` render overlapping outgoing and incoming motion layers with near-zero positional movement so the handoff feels calm instead of abrupt.

**Tech Stack:** Next.js, React, TypeScript, Framer Motion, CSS Modules, Vitest, Testing Library

---

## Chunk 1: Reintroduce overlapping text motion with calmer timing

### Task 1: Update `RotatingRole` tests and motion behavior

**Files:**
- Modify: `tests/unit/components/rotating-role.test.tsx`
- Modify: `tests/unit/style/rotating-role-animation-speed.test.ts`
- Modify: `components/rotating-role.tsx`
- Modify: `components/rotating-role.module.css`

- [ ] **Step 1: Write the failing tests**

```tsx
it("renders both outgoing and incoming roles during a controlled transition", () => {
  render(
    <RotatingRole
      roles={["I am a Design Engineer", "I am a UX Engineer"]}
      activeIndex={1}
      previousIndex={0}
      isTransitioning
    />,
  );

  const roleStack = screen.getByTestId("rotating-role-stack");

  expect(roleStack).toHaveTextContent("I am a Design Engineer");
  expect(roleStack).toHaveTextContent("I am a UX Engineer");
});
```

```ts
expect(source).toMatch(/DEFAULT_TRANSITION_MS\s*=\s*(\d+)/);
expect(durationMs).toBeGreaterThanOrEqual(420);
expect(durationMs).toBeLessThanOrEqual(480);
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- tests/unit/components/rotating-role.test.tsx tests/unit/style/rotating-role-animation-speed.test.ts`
Expected: FAIL because the current text motion only renders the incoming role and the transition constant is still too short.

- [ ] **Step 3: Write the minimal implementation**

```tsx
export const DEFAULT_TRANSITION_MS = 440;

const showPreviousRole =
  isTransitioning &&
  previousIndex !== undefined &&
  previousIndex !== null &&
  previousIndex !== roleIndex;

return (
  <span className={styles.roleStack} data-testid="rotating-role-stack">
    <LazyMotion features={domAnimation}>
      {showPreviousRole ? (
        <m.span
          className={styles.role}
          aria-hidden="true"
          initial={prefersReducedMotion ? false : { opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={transition}
        >
          {roles[resolvedPreviousIndex]}
        </m.span>
      ) : null}
      <m.span
        key={roleIndex}
        className={styles.role}
        data-testid="rotating-role"
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={transition}
      >
        {roles[roleIndex]}
      </m.span>
    </LazyMotion>
  </span>
);
```

```css
.roleStack {
  display: inline-grid;
}

.role {
  display: block;
  grid-area: 1 / 1;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- tests/unit/components/rotating-role.test.tsx tests/unit/style/rotating-role-animation-speed.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tests/unit/components/rotating-role.test.tsx tests/unit/style/rotating-role-animation-speed.test.ts components/rotating-role.tsx components/rotating-role.module.css
git commit -m "feat: soften hero role handoff"
```

## Chunk 2: Align hero image timing with the calmer text handoff

### Task 2: Tune the shared hero timing and keep sync coverage intact

**Files:**
- Modify: `components/hero-split.tsx`
- Modify: `tests/unit/components/hero-split.test.tsx`
- Test: `tests/unit/style/hero-image-scale.test.ts`

- [ ] **Step 1: Write the failing tests**

```tsx
it("keeps the outgoing portrait mounted through the slower shared transition window", () => {
  const { container } = render(<HeroSplit copy={copy} />);

  act(() => {
    vi.advanceTimersByTime(DEFAULT_INTERVAL_MS);
  });

  expect(container.querySelectorAll("img")).toHaveLength(2);
});

it("removes the outgoing portrait after the calmer transition window completes", () => {
  const { container } = render(<HeroSplit copy={copy} />);

  act(() => {
    vi.advanceTimersByTime(DEFAULT_INTERVAL_MS + DEFAULT_TRANSITION_MS);
  });

  expect(container.querySelectorAll("img")).toHaveLength(1);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- tests/unit/components/hero-split.test.tsx`
Expected: FAIL if the hero timing and cleanup do not stay aligned with the updated slower transition constant.

- [ ] **Step 3: Write the minimal implementation**

```tsx
const imageTransition = transitionDurationMs === 0
  ? { duration: 0.01 }
  : {
      duration: transitionDurationMs / 1000,
      ease: [0.16, 1, 0.3, 1] as const,
    };
```

```tsx
<RotatingRole
  roles={copy.roles}
  activeIndex={activeIndex}
  previousIndex={previousIndex}
  isTransitioning={previousIndex !== null}
/>
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- tests/unit/components/hero-split.test.tsx`
Expected: PASS

- [ ] **Step 5: Run final focused verification**

Run: `npm test -- tests/unit/components/rotating-role.test.tsx tests/unit/components/hero-split.test.tsx tests/unit/style/rotating-role-animation-speed.test.ts tests/unit/style/hero-image-scale.test.ts`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add components/hero-split.tsx tests/unit/components/hero-split.test.tsx
git commit -m "feat: slow home hero crossfade"
```

## Chunk 3: Verify the tuned motion across the project

### Task 3: Run full project verification

**Files:**
- Test: `tests/unit/components/rotating-role.test.tsx`
- Test: `tests/unit/components/hero-split.test.tsx`
- Test: `tests/unit/style/rotating-role-animation-speed.test.ts`
- Test: `tests/unit/style/hero-image-scale.test.ts`

- [ ] **Step 1: Run the full unit suite**

Run: `npm test`
Expected: PASS with the calmer overlap transition in place.

- [ ] **Step 2: Run the production build**

Run: `npm run build`
Expected: PASS with the tuned Framer Motion hero.

- [ ] **Step 3: Confirm clean status**

Run: `git status --short`
Expected: No unexpected changes after verification.
