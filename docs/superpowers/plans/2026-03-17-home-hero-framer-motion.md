# Home Hero Framer Motion Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the home hero's manual CSS crossfade choreography with a smoother Framer Motion-powered text and image transition.

**Architecture:** Keep `HeroSplit` as the only rotation clock and data source for the active hero state. Use `AnimatePresence` and keyed `motion` elements inside the hero text and image render paths so Framer Motion owns enter/exit motion, while CSS modules keep only structural layout, cropping, and typography concerns.

**Tech Stack:** Next.js, React, TypeScript, Framer Motion, CSS Modules, Vitest, Testing Library

---

## Chunk 1: Introduce Framer Motion and update the text transition boundary

### Task 1: Add the dependency and convert `RotatingRole` to Framer Motion

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `components/rotating-role.tsx`
- Modify: `components/rotating-role.module.css`
- Modify: `tests/unit/components/rotating-role.test.tsx`
- Modify: `tests/unit/style/rotating-role-animation-speed.test.ts`

- [ ] **Step 1: Write the failing tests**

```tsx
it("renders the externally controlled active role through a stable motion wrapper", () => {
  const { rerender } = render(
    <RotatingRole roles={roles} activeIndex={0} />,
  );

  rerender(<RotatingRole roles={roles} activeIndex={1} />);

  expect(screen.getByTestId("rotating-role")).toHaveTextContent("I am a UX Engineer");
});
```

```ts
expect(cssContent).not.toMatch(/@keyframes\s+role-fade-in/);
expect(cssContent).not.toMatch(/@keyframes\s+role-fade-out/);
expect(cssContent).toMatch(/\.roleStack\s*\{/);
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- tests/unit/components/rotating-role.test.tsx tests/unit/style/rotating-role-animation-speed.test.ts`
Expected: FAIL because `RotatingRole` still depends on manual transition props and the stylesheet still defines CSS animation keyframes.

- [ ] **Step 3: Write the minimal implementation**

```tsx
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const prefersReducedMotion = useReducedMotion();
const transition = prefersReducedMotion
  ? { duration: 0.01 }
  : { duration: 0.32, ease: "easeOut" };

return (
  <span className={styles.roleStack}>
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={roleIndex}
        data-testid="rotating-role"
        className={styles.role}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -4 }}
        transition={transition}
      >
        {roles[roleIndex]}
      </motion.span>
    </AnimatePresence>
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

- [ ] **Step 4: Install the dependency**

Run: `npm install framer-motion`
Expected: `package.json` and `package-lock.json` include `framer-motion`.

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test -- tests/unit/components/rotating-role.test.tsx tests/unit/style/rotating-role-animation-speed.test.ts`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json components/rotating-role.tsx components/rotating-role.module.css tests/unit/components/rotating-role.test.tsx tests/unit/style/rotating-role-animation-speed.test.ts
git commit -m "feat: animate hero role with framer motion"
```

## Chunk 2: Move the hero image transition to Framer Motion

### Task 2: Replace manual hero transition state with presence-based image motion

**Files:**
- Modify: `components/hero-split.tsx`
- Modify: `components/hero-split.module.css`
- Modify: `tests/unit/components/hero-split.test.tsx`
- Test: `tests/unit/style/hero-image-scale.test.ts`

- [ ] **Step 1: Write the failing tests**

```tsx
it("updates the role and portrait together after the shared interval", () => {
  render(<HeroSplit copy={copy} />);

  act(() => {
    vi.advanceTimersByTime(DEFAULT_INTERVAL_MS);
  });

  expect(screen.getByTestId("rotating-role")).toHaveTextContent("I am a UX Engineer");
  expect(screen.getByAltText("Portrait image")).toHaveAttribute("src", "/images/profile2.png");
});

it("removes the previous portrait after the transition completes", async () => {
  const { container } = render(<HeroSplit copy={copy} />);

  act(() => {
    vi.advanceTimersByTime(DEFAULT_INTERVAL_MS + DEFAULT_TRANSITION_MS);
  });

  await waitFor(() => {
    expect(container.querySelectorAll("img")).toHaveLength(1);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- tests/unit/components/hero-split.test.tsx`
Expected: FAIL because `HeroSplit` still manages `previousIndex` and manual CSS transition classes instead of Framer Motion presence.

- [ ] **Step 3: Write the minimal implementation**

```tsx
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const prefersReducedMotion = useReducedMotion();

<AnimatePresence mode="sync" initial={false}>
  {activeImageSrc ? (
    <motion.div
      key={activeImageSrc}
      className={styles.imageLayer}
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
      transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.32, ease: "easeOut" }}
    >
      <Image ... className={styles.image} />
    </motion.div>
  ) : null}
</AnimatePresence>
```

```tsx
<RotatingRole roles={copy.roles} activeIndex={activeIndex} />
```

```css
.media {
  position: relative;
  overflow: hidden;
}

.imageLayer {
  inset: 0;
  position: absolute;
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
git add components/hero-split.tsx components/hero-split.module.css tests/unit/components/hero-split.test.tsx
git commit -m "feat: animate hero image with framer motion"
```

## Chunk 3: Validate the full integration

### Task 3: Run full project verification on the Framer Motion hero

**Files:**
- Test: `tests/unit/components/rotating-role.test.tsx`
- Test: `tests/unit/components/hero-split.test.tsx`
- Test: `tests/unit/style/rotating-role-animation-speed.test.ts`
- Test: `tests/unit/style/hero-image-scale.test.ts`

- [ ] **Step 1: Run the full unit suite**

Run: `npm test`
Expected: PASS with all unit tests green after the dependency and hero transition change.

- [ ] **Step 2: Run the production build**

Run: `npm run build`
Expected: PASS with Framer Motion integrating cleanly into the Next.js client components.

- [ ] **Step 3: Commit if verification changes anything**

```bash
git status --short
```

Expected: No unexpected changes. If any test snapshot or generated artifact changes, review and commit only intentional files with:

```bash
git add <intentional-files>
git commit -m "chore: finalize hero framer motion verification"
```
