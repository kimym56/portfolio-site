# Home Hero Vertical Text Handoff Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Retune the home hero so the rotating text performs a subtle bottom-to-top handoff while the portrait image stays fade-led and calm.

**Architecture:** Keep `HeroSplit` as the single owner of the shared interval, `activeIndex`, `previousIndex`, and cleanup window. Change `RotatingRole` from blur-based text motion to small vertical offsets plus opacity, and simplify the portrait transition in `HeroSplit` to overlap-based opacity crossfade with no vertical travel.

**Tech Stack:** Next.js, React, TypeScript, Framer Motion, CSS Modules, Vitest, Testing Library

---

## Chunk 1: Replace blur-based text motion with a vertical handoff

### Task 1: Update text motion guards and `RotatingRole`

**Files:**
- Create: `tests/unit/style/hero-motion-direction.test.ts`
- Delete: `tests/unit/style/hero-motion-blur.test.ts`
- Modify: `components/rotating-role.tsx`
- Test: `tests/unit/components/rotating-role.test.tsx`

- [ ] **Step 1: Write the failing tests**

```ts
it("animates role text with a vertical enter and exit handoff", () => {
  const source = fs.readFileSync(
    path.join(process.cwd(), "components", "rotating-role.tsx"),
    "utf8",
  );

  expect(source).toMatch(/y:\s*10/);
  expect(source).toMatch(/y:\s*-10/);
  expect(source).not.toMatch(/filter:\s*"blur\(/);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- tests/unit/style/hero-motion-direction.test.ts tests/unit/components/rotating-role.test.tsx`
Expected: FAIL because the current text motion still uses blur states and no `y` offsets.

- [ ] **Step 3: Write the minimal implementation**

```tsx
const incomingRoleInitial = prefersReducedMotion
  ? false
  : { opacity: 0, y: 10 };
const incomingRoleAnimate = prefersReducedMotion
  ? { opacity: 1 }
  : { opacity: 1, y: 0 };
const outgoingRoleInitial = prefersReducedMotion
  ? false
  : { opacity: 1, y: 0 };
const outgoingRoleAnimate = prefersReducedMotion
  ? { opacity: 0 }
  : { opacity: 0, y: -10 };
```

```bash
rm tests/unit/style/hero-motion-blur.test.ts
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- tests/unit/style/hero-motion-direction.test.ts tests/unit/components/rotating-role.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/rotating-role.tsx tests/unit/style/hero-motion-direction.test.ts tests/unit/style/hero-motion-blur.test.ts
git commit -m "feat: add vertical handoff to hero role"
```

## Chunk 2: Keep the portrait transition fade-led and synchronized

### Task 2: Simplify image motion and keep hero sync coverage intact

**Files:**
- Modify: `components/hero-split.tsx`
- Modify: `tests/unit/style/hero-motion-direction.test.ts`
- Test: `tests/unit/components/hero-split.test.tsx`

- [ ] **Step 1: Write the failing tests**

```ts
it("keeps hero image motion fade-led without vertical travel", () => {
  const source = fs.readFileSync(
    path.join(process.cwd(), "components", "hero-split.tsx"),
    "utf8",
  );

  expect(source).not.toMatch(/filter:\s*"blur\(/);
  expect(source).not.toMatch(/y:\s*-?\d+/);
  expect(source).toMatch(/opacity:/);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- tests/unit/style/hero-motion-direction.test.ts tests/unit/components/hero-split.test.tsx`
Expected: FAIL because the current portrait transition still uses blur-based image states.

- [ ] **Step 3: Write the minimal implementation**

```tsx
const incomingImageInitial = transitionDurationMs === 0
  ? false
  : { opacity: 0 };
const incomingImageAnimate = { opacity: 1 };
const outgoingImageInitial = { opacity: 1 };
const outgoingImageAnimate = { opacity: 0 };
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- tests/unit/style/hero-motion-direction.test.ts tests/unit/components/hero-split.test.tsx`
Expected: PASS

- [ ] **Step 5: Run final focused verification**

Run: `npm test -- tests/unit/components/rotating-role.test.tsx tests/unit/components/hero-split.test.tsx tests/unit/style/rotating-role-animation-speed.test.ts tests/unit/style/hero-motion-direction.test.ts tests/unit/style/hero-image-scale.test.ts`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add components/hero-split.tsx tests/unit/style/hero-motion-direction.test.ts
git commit -m "feat: simplify hero portrait transition"
```

## Chunk 3: Verify the updated hero across the project

### Task 3: Run project-level verification

**Files:**
- Test: `tests/unit/components/rotating-role.test.tsx`
- Test: `tests/unit/components/hero-split.test.tsx`
- Test: `tests/unit/style/rotating-role-animation-speed.test.ts`
- Test: `tests/unit/style/hero-motion-direction.test.ts`
- Test: `tests/unit/style/hero-image-scale.test.ts`

- [ ] **Step 1: Run the full unit suite**

Run: `npm test`
Expected: PASS with the vertical text handoff and fade-led portrait transition in place.

- [ ] **Step 2: Run the production build**

Run: `npm run build`
Expected: PASS with the updated Framer Motion hero.

- [ ] **Step 3: Confirm clean status**

Run: `git status --short`
Expected: No unexpected changes after verification.
