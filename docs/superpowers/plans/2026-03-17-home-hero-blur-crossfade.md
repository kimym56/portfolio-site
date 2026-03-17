# Home Hero Blur Crossfade Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the home hero text and portrait changes feel visibly smooth by using a shared blur crossfade with calmer timing.

**Architecture:** Keep `HeroSplit` as the single owner of rotation timing, `activeIndex`, `previousIndex`, and cleanup. Reuse the existing overlap window for both text and image, restore a calmer interval/transition balance, and animate both sides with opacity plus blur so the change reads as polished without directional movement.

**Tech Stack:** Next.js, React, TypeScript, Framer Motion, CSS Modules, Vitest, Testing Library

---

## Chunk 1: Restore calmer shared timing and add blur to the role handoff

### Task 1: Update text-side timing guards and motion values

**Files:**
- Modify: `tests/unit/style/rotating-role-animation-speed.test.ts`
- Add: `tests/unit/style/hero-motion-blur.test.ts`
- Modify: `components/rotating-role.tsx`
- Test: `tests/unit/components/rotating-role.test.tsx`

- [ ] **Step 1: Write the failing tests**

```ts
it("uses a calmer default interval for the hero rotation", () => {
  const intervalMatch = source.match(/DEFAULT_INTERVAL_MS\s*=\s*(\d+)/);

  expect(intervalMatch).not.toBeNull();
  const intervalMs = Number(intervalMatch?.[1] ?? "0");
  expect(intervalMs).toBeGreaterThanOrEqual(3200);
  expect(intervalMs).toBeLessThanOrEqual(4200);
});

it("uses a calmer shared transition duration", () => {
  const durationMatch = source.match(/DEFAULT_TRANSITION_MS\s*=\s*(\d+)/);

  expect(durationMatch).not.toBeNull();
  const durationMs = Number(durationMatch?.[1] ?? "0");
  expect(durationMs).toBeGreaterThanOrEqual(420);
  expect(durationMs).toBeLessThanOrEqual(520);
});
```

```ts
it("animates role text with blur on enter and exit", () => {
  const source = fs.readFileSync(
    path.join(process.cwd(), "components", "rotating-role.tsx"),
    "utf8",
  );

  expect(source).toMatch(/filter:\s*"blur\(/);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- tests/unit/style/rotating-role-animation-speed.test.ts tests/unit/style/hero-motion-blur.test.ts`
Expected: FAIL because the current local timing is `1500ms` / `1040ms` and the text motion has no blur.

- [ ] **Step 3: Write the minimal implementation**

```tsx
export const DEFAULT_INTERVAL_MS = 3600;
export const DEFAULT_TRANSITION_MS = 480;

const incomingTextState = prefersReducedMotion
  ? false
  : { opacity: 0, filter: "blur(10px)" };

const outgoingTextState = prefersReducedMotion
  ? false
  : { opacity: 1, filter: "blur(0px)" };
```

```tsx
{showPreviousRole ? (
  <m.span
    className={styles.role}
    aria-hidden="true"
    initial={outgoingTextState}
    animate={{ opacity: 0, filter: "blur(10px)" }}
    transition={transition}
  >
    {roles[resolvedPreviousIndex]}
  </m.span>
) : null}
<m.span
  key={roleIndex}
  className={styles.role}
  data-testid="rotating-role"
  initial={incomingTextState}
  animate={{ opacity: 1, filter: "blur(0px)" }}
  transition={transition}
>
  {roles[roleIndex]}
</m.span>
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- tests/unit/style/rotating-role-animation-speed.test.ts tests/unit/style/hero-motion-blur.test.ts tests/unit/components/rotating-role.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tests/unit/style/rotating-role-animation-speed.test.ts tests/unit/style/hero-motion-blur.test.ts tests/unit/components/rotating-role.test.tsx components/rotating-role.tsx
git commit -m "feat: add blur crossfade to hero role"
```

## Chunk 2: Mirror the blur crossfade on the portrait and keep sync intact

### Task 2: Update image-side motion and synchronized hero coverage

**Files:**
- Modify: `components/hero-split.tsx`
- Modify: `tests/unit/components/hero-split.test.tsx`
- Test: `tests/unit/style/hero-motion-blur.test.ts`

- [ ] **Step 1: Write the failing tests**

```ts
it("animates hero images with blur on enter and exit", () => {
  const source = fs.readFileSync(
    path.join(process.cwd(), "components", "hero-split.tsx"),
    "utf8",
  );

  expect(source).toMatch(/filter:\s*"blur\(/);
});
```

```tsx
it("keeps outgoing and incoming hero content mounted during the shared blur crossfade", () => {
  const { container } = render(<HeroSplit copy={copy} />);

  act(() => {
    vi.advanceTimersByTime(DEFAULT_INTERVAL_MS);
  });

  expect(screen.getByTestId("rotating-role-stack")).toHaveTextContent(
    "I am a UX Engineer",
  );
  expect(container.querySelectorAll("img")).toHaveLength(2);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- tests/unit/components/hero-split.test.tsx tests/unit/style/hero-motion-blur.test.ts`
Expected: FAIL because the portrait motion does not yet include blur-based states.

- [ ] **Step 3: Write the minimal implementation**

```tsx
const incomingImageState =
  transitionDurationMs === 0
    ? false
    : { opacity: 0, filter: "blur(6px)" };

const outgoingImageState =
  transitionDurationMs === 0
    ? { opacity: 1 }
    : { opacity: 1, filter: "blur(0px)" };
```

```tsx
{previousImageSrc ? (
  <m.div
    className={styles.imageLayer}
    initial={outgoingImageState}
    animate={{ opacity: 0, filter: "blur(6px)" }}
    transition={imageTransition}
  >
    <Image ... />
  </m.div>
) : null}
{activeImageSrc ? (
  <m.div
    key={activeImageSrc}
    className={styles.imageLayer}
    data-testid="hero-image-layer"
    initial={incomingImageState}
    animate={{ opacity: 1, filter: "blur(0px)" }}
    transition={imageTransition}
  >
    <Image ... />
  </m.div>
) : null}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- tests/unit/components/hero-split.test.tsx tests/unit/style/hero-motion-blur.test.ts`
Expected: PASS

- [ ] **Step 5: Run final focused verification**

Run: `npm test -- tests/unit/components/rotating-role.test.tsx tests/unit/components/hero-split.test.tsx tests/unit/style/rotating-role-animation-speed.test.ts tests/unit/style/hero-motion-blur.test.ts tests/unit/style/hero-image-scale.test.ts`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add components/hero-split.tsx tests/unit/components/hero-split.test.tsx tests/unit/style/hero-motion-blur.test.ts
git commit -m "feat: add blur crossfade to home hero image"
```

## Chunk 3: Verify the updated hero across the project

### Task 3: Run project-level verification

**Files:**
- Test: `tests/unit/components/rotating-role.test.tsx`
- Test: `tests/unit/components/hero-split.test.tsx`
- Test: `tests/unit/style/rotating-role-animation-speed.test.ts`
- Test: `tests/unit/style/hero-motion-blur.test.ts`
- Test: `tests/unit/style/hero-image-scale.test.ts`

- [ ] **Step 1: Run the full unit suite**

Run: `npm test`
Expected: PASS with the blur-crossfade hero in place.

- [ ] **Step 2: Run the production build**

Run: `npm run build`
Expected: PASS with the updated Framer Motion hero.

- [ ] **Step 3: Confirm expected status**

Run: `git status --short`
Expected: Only the intended implementation changes remain before final integration.
