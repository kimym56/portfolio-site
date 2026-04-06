# Home Hero Scroll Rotation Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let desktop users rotate the home hero forward and backward with wheel input while keeping the page fixed and preserving the existing timed auto-rotation.

**Architecture:** Keep `HeroSplit` as the single source of truth for active hero state, overlap cleanup, and timer ownership. Add one shared rotation path for timed and manual transitions, then layer a desktop-only wheel handler on top that advances or reverses exactly one step per gesture and restarts the idle timer after manual input.

**Tech Stack:** Next.js, React, TypeScript, Framer Motion, CSS Modules, Vitest, Testing Library, Playwright

---

## Chunk 1: Lock in manual hero rotation behavior

### Task 1: Add failing unit coverage for desktop scroll-driven rotation

**Files:**
- Modify: `tests/unit/components/hero-split.test.tsx`

- [ ] **Step 1: Write the failing tests**

```tsx
fireEvent.wheel(heroRoot, { deltaY: 120 });
expect(screen.getByTestId("rotating-role")).toHaveTextContent("I am a UX Engineer");
expect(screen.getByAltText("Portrait image")).toHaveAttribute("src", "/images/profile2.webp");
```

```tsx
fireEvent.wheel(heroRoot, { deltaY: -120 });
expect(screen.getByTestId("rotating-role")).toHaveTextContent("I am a Frontend Engineer");
expect(screen.getByAltText("Portrait image")).toHaveAttribute("src", "/images/profile3.webp");
```

```tsx
fireEvent.wheel(heroRoot, { deltaY: 120 });
vi.advanceTimersByTime(DEFAULT_INTERVAL_MS - 1);
expect(screen.getByTestId("rotating-role")).toHaveTextContent("I am a UX Engineer");
```

```tsx
fireEvent.wheel(heroRoot, { deltaY: 120 });
fireEvent.wheel(heroRoot, { deltaY: 120 });
expect(screen.getByTestId("rotating-role")).toHaveTextContent("I am a UX Engineer");
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- tests/unit/components/hero-split.test.tsx`
Expected: FAIL because the hero does not yet respond to wheel input or restart the timer after manual rotation.

- [ ] **Step 3: Write the minimal implementation**

```tsx
const rotate = (direction: 1 | -1) => {
  setRotationState((previousState) => ({
    activeIndex:
      (previousState.activeIndex + direction + copy.roles.length) %
      copy.roles.length,
    previousIndex: previousState.activeIndex,
  }));
};
```

```tsx
const handleWheel = (event: React.WheelEvent<HTMLElement>) => {
  if (event.deltaY === 0 || !isDesktop) return;
  event.preventDefault();
  rotate(event.deltaY > 0 ? 1 : -1);
  restartTimer();
};
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- tests/unit/components/hero-split.test.tsx`
Expected: PASS

## Chunk 2: Verify browser-level desktop behavior

### Task 2: Add a desktop interaction regression

**Files:**
- Modify: `tests/e2e/home-scroll.spec.ts`

- [ ] **Step 1: Write the failing e2e assertion**

```ts
await page.mouse.wheel(0, 300);
await expect(page.getByTestId("rotating-role")).toHaveText("I am a UX Engineer");
```

- [ ] **Step 2: Run the e2e check to verify it fails**

Run: `npm run test:e2e -- tests/e2e/home-scroll.spec.ts`
Expected: FAIL because desktop wheel input does not yet control the hero.

- [ ] **Step 3: Verify the existing fixed-page contract still holds**

```ts
const scrollY = await page.evaluate(() => window.scrollY);
expect(scrollY).toBe(0);
```

- [ ] **Step 4: Run the focused final verification**

Run: `npm test -- tests/unit/components/hero-split.test.tsx`
Expected: PASS

Run: `npm run test:e2e -- tests/e2e/home-scroll.spec.ts`
Expected: PASS
