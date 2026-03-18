# Home Hero Slow Upward Crossfade Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the home hero text and portrait transition as a slower shared upward crossfade instead of a quick fade-only handoff.

**Architecture:** Keep `HeroSplit` as the single source of truth for timing and overlap cleanup. Update `RotatingRole` and the portrait motion in `HeroSplit` to use the same `900ms` opacity-plus-upward-motion transition so both sides of the hero rise and fade together without desynchronizing.

**Tech Stack:** Next.js, React, TypeScript, Framer Motion, CSS Modules, Vitest, Testing Library

---

## Chunk 1: Lock in the new motion contract

### Task 1: Update motion guard tests

**Files:**
- Modify: `tests/unit/style/hero-motion-direction.test.ts`
- Modify: `tests/unit/style/rotating-role-animation-speed.test.ts`

- [ ] **Step 1: Write the failing tests**

```ts
expect(roleSource).toMatch(/y:\s*12/);
expect(roleSource).toMatch(/y:\s*-12/);
expect(imageSource).toMatch(/y:\s*12/);
expect(imageSource).toMatch(/y:\s*-12/);
```

```ts
expect(durationMs).toBeGreaterThanOrEqual(860);
expect(durationMs).toBeLessThanOrEqual(960);
expect(intervalMs).toBeGreaterThanOrEqual(4000);
expect(intervalMs).toBeLessThanOrEqual(4600);
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- tests/unit/style/hero-motion-direction.test.ts tests/unit/style/rotating-role-animation-speed.test.ts`
Expected: FAIL because the current source still uses a `480ms` duration, a `3600ms` interval, and no vertical image motion.

- [ ] **Step 3: Write the minimal implementation**

```tsx
export const DEFAULT_INTERVAL_MS = 4200;
export const DEFAULT_TRANSITION_MS = 900;
```

```tsx
const incomingInitial = prefersReducedMotion ? false : { opacity: 0, y: 12 };
const incomingAnimate = prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 };
const outgoingInitial = prefersReducedMotion ? false : { opacity: 1, y: 0 };
const outgoingAnimate = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 };
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- tests/unit/style/hero-motion-direction.test.ts tests/unit/style/rotating-role-animation-speed.test.ts`
Expected: PASS

## Chunk 2: Verify shared hero behavior still holds

### Task 2: Re-run overlap coverage with the new motion values

**Files:**
- Test: `tests/unit/components/rotating-role.test.tsx`
- Test: `tests/unit/components/hero-split.test.tsx`

- [ ] **Step 1: Run overlap tests**

Run: `npm test -- tests/unit/components/rotating-role.test.tsx tests/unit/components/hero-split.test.tsx`
Expected: PASS, showing the slower upward motion preserved the existing overlap and cleanup behavior.

- [ ] **Step 2: Run focused final verification**

Run: `npm test -- tests/unit/style/hero-motion-direction.test.ts tests/unit/style/rotating-role-animation-speed.test.ts tests/unit/components/rotating-role.test.tsx tests/unit/components/hero-split.test.tsx`
Expected: PASS
