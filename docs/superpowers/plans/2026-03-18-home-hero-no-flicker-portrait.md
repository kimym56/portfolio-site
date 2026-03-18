# Home Hero No-Flicker Portrait Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the portrait flicker in the home hero without changing the current text transition.

**Architecture:** Keep `HeroSplit` as the shared timing owner, but make the portrait handoff more stable than the text. Reuse the previous image layer by key, switch portrait motion to fixed-position opacity-only crossfade, and back the media frame with `var(--surface)` so transparent PNGs cannot flash the page background during the overlap window.

**Tech Stack:** Next.js, React, TypeScript, Framer Motion, CSS Modules, Vitest, Testing Library

---

## Chunk 1: Lock in the portrait no-flicker contract

### Task 1: Update regression tests for portrait handoff

**Files:**
- Modify: `tests/unit/style/hero-motion-direction.test.ts`

- [ ] **Step 1: Write the failing tests**

```ts
expect(source).not.toMatch(/[,{]\s*y:\s*-?\d+/);
expect(source).toMatch(/key=\{previousImageSrc\}/);
```

```ts
const cssSource = fs.readFileSync(
  path.join(process.cwd(), "components", "hero-split.module.css"),
  "utf8",
);

expect(cssSource).toMatch(/background:\s*var\(--surface\)/);
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- tests/unit/style/hero-motion-direction.test.ts`
Expected: FAIL because the portrait source still contains `y` motion, the previous portrait layer is not keyed by `previousImageSrc`, and the media frame has no solid surface background.

- [ ] **Step 3: Write the minimal implementation**

```tsx
const incomingImageInitial = transitionDurationMs === 0
  ? false
  : { opacity: 0 };
const incomingImageAnimate = { opacity: 1 };
const outgoingImageInitial = transitionDurationMs === 0
  ? { opacity: 1 }
  : { opacity: 1 };
const outgoingImageAnimate = { opacity: 0 };
```

```tsx
{previousImageSrc ? (
  <m.div
    key={previousImageSrc}
    className={styles.imageLayer}
    initial={outgoingImageInitial}
    animate={outgoingImageAnimate}
    transition={imageTransition}
  >
```

```css
.media {
  background: var(--surface);
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- tests/unit/style/hero-motion-direction.test.ts`
Expected: PASS

## Chunk 2: Re-verify hero behavior

### Task 2: Confirm overlap and cleanup still behave correctly

**Files:**
- Test: `tests/unit/components/hero-split.test.tsx`

- [ ] **Step 1: Run the existing hero behavior tests**

Run: `npm test -- tests/unit/components/hero-split.test.tsx`
Expected: PASS, showing the portrait still overlaps and cleans up correctly after the stabilized handoff.

- [ ] **Step 2: Run focused final verification**

Run: `npm test -- tests/unit/style/hero-motion-direction.test.ts tests/unit/components/hero-split.test.tsx tests/unit/components/rotating-role.test.tsx tests/unit/style/rotating-role-animation-speed.test.ts`
Expected: PASS
