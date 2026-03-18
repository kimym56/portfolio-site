# Home Hero Opacity Crossfade Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the home hero text and portrait transition as one smooth, gradual opacity-only crossfade.

**Architecture:** Keep `HeroSplit` as the single rotation clock and overlap owner. Update `RotatingRole` so outgoing and incoming labels stay in the same footprint and animate with opacity only, while the portrait continues to use the same shared duration and easing so both sides of the hero stay synchronized.

**Tech Stack:** Next.js, React, TypeScript, Framer Motion, CSS Modules, Vitest, Testing Library

---

## Chunk 1: Lock in opacity-only role motion

### Task 1: Update role tests and text motion

**Files:**
- Modify: `tests/unit/components/rotating-role.test.tsx`
- Modify: `tests/unit/style/hero-motion-direction.test.ts`
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

  expect(screen.getByTestId("rotating-role-stack")).toHaveTextContent(
    "I am a Design Engineer",
  );
  expect(screen.getByTestId("rotating-role-stack")).toHaveTextContent(
    "I am a UX Engineer",
  );
});
```

```ts
expect(source).not.toMatch(/y:\s*10/);
expect(source).not.toMatch(/y:\s*-10/);
expect(source).toMatch(/opacity:/);
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- tests/unit/components/rotating-role.test.tsx tests/unit/style/hero-motion-direction.test.ts`
Expected: FAIL because `RotatingRole` still defines vertical `y` motion for the entering and exiting role states.

- [ ] **Step 3: Write the minimal implementation**

```tsx
const incomingRoleInitial = prefersReducedMotion
  ? false
  : { opacity: 0 };
const incomingRoleAnimate = { opacity: 1 };
const outgoingRoleInitial = prefersReducedMotion
  ? false
  : { opacity: 1 };
const outgoingRoleAnimate = { opacity: 0 };
```

```css
.roleStack {
  display: inline-grid;
  align-items: start;
}

.role {
  grid-area: 1 / 1;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- tests/unit/components/rotating-role.test.tsx tests/unit/style/hero-motion-direction.test.ts`
Expected: PASS

## Chunk 2: Verify hero text and image stay aligned

### Task 2: Confirm the shared hero handoff still uses one fade window

**Files:**
- Modify: `tests/unit/components/hero-split.test.tsx` only if coverage needs to reflect the stabilized crossfade layout
- Modify: `components/hero-split.tsx` only if image motion values need cleanup for consistency with the text change

- [ ] **Step 1: Run the existing hero transition tests**

Run: `npm test -- tests/unit/components/hero-split.test.tsx`
Expected: PASS or a targeted failure showing where portrait timing no longer matches the text handoff.

- [ ] **Step 2: Make the smallest implementation adjustment if needed**

```tsx
const incomingImageInitial = transitionDurationMs === 0
  ? false
  : { opacity: 0 };
const incomingImageAnimate = { opacity: 1 };
const outgoingImageAnimate = { opacity: 0 };
```

- [ ] **Step 3: Run focused final verification**

Run: `npm test -- tests/unit/components/rotating-role.test.tsx tests/unit/components/hero-split.test.tsx tests/unit/style/hero-motion-direction.test.ts tests/unit/style/rotating-role-animation-speed.test.ts`
Expected: PASS
