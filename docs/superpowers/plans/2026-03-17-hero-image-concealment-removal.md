# Hero Image Concealment Removal Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the decorative bottom-right concealment effect from the hero portrait while keeping the rest of the hero image behavior unchanged.

**Architecture:** This is a narrow removal in the existing hero split implementation. Update the tests first to assert the overlay no longer exists, then remove the dedicated overlay element from `HeroSplit` and delete the matching CSS rule from the module stylesheet.

**Tech Stack:** Next.js, React, TypeScript, CSS Modules, Vitest, Testing Library

---

## Chunk 1: Remove the hero portrait concealment overlay

### Task 1: Update tests and implementation

**Files:**
- Modify: `tests/unit/components/hero-split.test.tsx`
- Modify: `tests/unit/style/hero-image-concealment.test.ts`
- Modify: `components/hero-split.tsx`
- Modify: `components/hero-split.module.css`

- [ ] **Step 1: Write the failing tests**

```tsx
it("does not render a concealment layer over the portrait corner", () => {
  const { container } = render(<HeroSplit copy={copy} />);

  expect(container.querySelector("[data-testid='hero-image-concealment']")).toBeNull();
});
```

```ts
expect(cssContent).not.toMatch(/\.logoConcealment\s*\{/);
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- tests/unit/components/hero-split.test.tsx tests/unit/style/hero-image-concealment.test.ts`
Expected: FAIL because the concealment span and `.logoConcealment` CSS are still present.

- [ ] **Step 3: Write the minimal implementation**

```tsx
return (
  <section className={styles.hero}>
    <div className={styles.copy}>...</div>
    <div className={styles.media}>
      {fadingImageSrc ? <Image ... /> : null}
      {activeImageSrc ? <Image ... /> : null}
    </div>
  </section>
);
```

```css
/* Remove the obsolete .logoConcealment block entirely. */
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- tests/unit/components/hero-split.test.tsx tests/unit/style/hero-image-concealment.test.ts`
Expected: PASS

- [ ] **Step 5: Run final focused verification**

Run: `npm test -- tests/unit/components/hero-split.test.tsx tests/unit/style/hero-image-concealment.test.ts tests/unit/style/hero-image-scale.test.ts`
Expected: PASS
