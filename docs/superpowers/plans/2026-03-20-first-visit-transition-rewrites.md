# First Visit Transition Rewrites Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add first-visit-only reveal motion for non-home page navigation and `Projects` tab/detail interactions using rewrite-based animated routes plus shared seen-state tracking.

**Architecture:** Route-level transitions use a one-shot cookie and middleware rewrite to hidden animated routes, matching the article pattern. In-page `Projects` transitions stay client-side but use the same seen-state cookie registry so each tab or detail reveal only animates once.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Framer Motion, Vitest, Playwright

---

## File Map

- Create: `middleware.ts`
- Create: `lib/transition-cookies.ts`
- Create: `components/page-reveal.tsx`
- Create: `components/about-page-content.tsx`
- Create: `components/contact-page-content.tsx`
- Create: `components/projects-page-content.tsx`
- Create: `app/__animated/about/page.tsx`
- Create: `app/__animated/projects/page.tsx`
- Create: `app/__animated/contact/page.tsx`
- Modify: `app/about/page.tsx`
- Modify: `app/contact/page.tsx`
- Modify: `app/projects/page.tsx`
- Modify: `components/site-header.tsx`
- Modify: `components/project-filter.tsx`
- Modify: `app/globals.css`
- Test: `tests/unit/components/site-header.test.tsx`
- Test: `tests/unit/components/project-filter.test.tsx`
- Test: `tests/unit/lib/transition-cookies.test.ts`
- Test: `tests/unit/middleware/first-visit-transition.test.ts`
- Test: `tests/e2e/about-page.spec.ts`
- Test: `tests/e2e/projects-filter.spec.ts`

## Chunk 1: Lock In Cookie and Rewrite Behavior

### Task 1: Add failing transition-cookie and middleware tests

**Files:**
- Create: `tests/unit/lib/transition-cookies.test.ts`
- Create: `tests/unit/middleware/first-visit-transition.test.ts`
- Reference: `lib/site-copy.ts`

- [ ] **Step 1: Write the failing cookie-helper tests**

```ts
import {
  buildSeenTransitionCookieValue,
  hasSeenTransition,
  markTransitionSeen,
} from "@/lib/transition-cookies";

describe("transition cookies", () => {
  it("marks a destination as seen without duplicating keys", () => {
    expect(markTransitionSeen("page:about", "")).toBe("page:about");
    expect(markTransitionSeen("page:about", "page:about")).toBe("page:about");
    expect(markTransitionSeen("page:projects", "page:about")).toBe(
      "page:about,page:projects",
    );
  });

  it("detects whether a transition key has been seen", () => {
    expect(hasSeenTransition("page:about", "page:about,page:projects")).toBe(true);
    expect(hasSeenTransition("page:contact", "page:about,page:projects")).toBe(false);
  });
});
```

- [ ] **Step 2: Run the new unit tests to verify they fail**

Run: `npm test -- tests/unit/lib/transition-cookies.test.ts tests/unit/middleware/first-visit-transition.test.ts`
Expected: FAIL because `lib/transition-cookies.ts` and `middleware.ts` do not exist yet.

- [ ] **Step 3: Write the failing middleware rewrite tests**

```ts
import { NextRequest } from "next/server";
import { middleware } from "@/middleware";

describe("first visit route rewrites", () => {
  it("rewrites an armed /about request to the animated route and clears the cookie", () => {
    const request = new NextRequest("https://example.com/about", {
      headers: {
        cookie: "ymkim_pending_transition=%2Fabout",
      },
    });

    const response = middleware(request);

    expect(response.headers.get("x-middleware-rewrite")).toContain("/__animated/about");
    expect(response.cookies.get("ymkim_pending_transition")?.value).toBe("");
  });

  it("passes through when no pending destination matches", () => {
    const request = new NextRequest("https://example.com/about");

    const response = middleware(request);

    expect(response.headers.get("x-middleware-rewrite")).toBeNull();
  });
});
```

- [ ] **Step 4: Run the middleware test alone to verify it fails for the expected reason**

Run: `npm test -- tests/unit/middleware/first-visit-transition.test.ts`
Expected: FAIL because the middleware implementation does not exist yet.

### Task 2: Implement cookie utilities and middleware rewrite

**Files:**
- Create: `lib/transition-cookies.ts`
- Create: `middleware.ts`
- Test: `tests/unit/lib/transition-cookies.test.ts`
- Test: `tests/unit/middleware/first-visit-transition.test.ts`

- [ ] **Step 1: Add the minimal cookie helper implementation**

```ts
export const COOKIE_PENDING_TRANSITION = "ymkim_pending_transition";
export const COOKIE_SEEN_TRANSITIONS = "ymkim_seen_transitions";

export function normalizeSeenTransitionCookie(value: string | undefined): string[] {
  if (!value) return [];

  return value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

export function hasSeenTransition(key: string, value: string | undefined): boolean {
  return normalizeSeenTransitionCookie(value).includes(key);
}

export function markTransitionSeen(key: string, value: string | undefined): string {
  const keys = normalizeSeenTransitionCookie(value);

  if (keys.includes(key)) {
    return keys.join(",");
  }

  return [...keys, key].join(",");
}
```

- [ ] **Step 2: Add the minimal middleware implementation**

```ts
import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_PENDING_TRANSITION } from "@/lib/transition-cookies";

const REWRITE_TARGETS: Record<string, string> = {
  "/about": "/__animated/about",
  "/projects": "/__animated/projects",
  "/contact": "/__animated/contact",
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pendingPath = request.cookies.get(COOKIE_PENDING_TRANSITION)?.value;
  const rewriteTarget = pathname === pendingPath ? REWRITE_TARGETS[pathname] : undefined;

  if (!rewriteTarget) {
    return NextResponse.next();
  }

  const response = NextResponse.rewrite(new URL(rewriteTarget, request.nextUrl));
  response.cookies.set(COOKIE_PENDING_TRANSITION, "", { maxAge: 0, path: "/" });
  return response;
}

export const config = {
  matcher: ["/about", "/projects", "/contact"],
};
```

- [ ] **Step 3: Run the focused tests to verify they pass**

Run: `npm test -- tests/unit/lib/transition-cookies.test.ts tests/unit/middleware/first-visit-transition.test.ts`
Expected: PASS

- [ ] **Step 4: Commit the chunk**

```bash
git add lib/transition-cookies.ts middleware.ts tests/unit/lib/transition-cookies.test.ts tests/unit/middleware/first-visit-transition.test.ts
git commit -m "feat: add first-visit transition rewrite gate"
```

## Chunk 2: Add Route-Level Animated Variants

### Task 3: Add failing tests for nav arming and animated page rendering

**Files:**
- Modify: `tests/unit/components/site-header.test.tsx`
- Modify: `tests/e2e/about-page.spec.ts`
- Reference: `components/site-header.tsx`

- [ ] **Step 1: Add a failing unit test for first-visit nav arming**

```tsx
it("arms a first visit transition for unseen non-home destinations", async () => {
  const user = userEvent.setup();
  const setCookie = vi.spyOn(document, "cookie", "set");

  render(<SiteHeader navCopy={...} />);

  await user.click(screen.getByRole("link", { name: "About Me" }));

  expect(setCookie).toHaveBeenCalledWith(
    expect.stringContaining("ymkim_pending_transition=%2Fabout"),
  );
});
```

- [ ] **Step 2: Add a failing e2e assertion for one-time animated markup**

```ts
test("about first in-site visit uses animated markup once", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "About Me" }).click();

  await expect(page.locator("[data-page-reveal='animated']")).toBeVisible();

  await page.goto("/");
  await page.getByRole("link", { name: "About Me" }).click();

  await expect(page.locator("[data-page-reveal='animated']")).toHaveCount(0);
});
```

- [ ] **Step 3: Run the focused route-level tests to verify they fail**

Run: `npm test -- tests/unit/components/site-header.test.tsx`
Expected: FAIL because the header cannot arm pending transitions yet.

### Task 4: Implement animated page variants and nav arming

**Files:**
- Create: `components/page-reveal.tsx`
- Create: `components/about-page-content.tsx`
- Create: `components/contact-page-content.tsx`
- Create: `components/projects-page-content.tsx`
- Create: `app/__animated/about/page.tsx`
- Create: `app/__animated/contact/page.tsx`
- Create: `app/__animated/projects/page.tsx`
- Modify: `app/about/page.tsx`
- Modify: `app/contact/page.tsx`
- Modify: `app/projects/page.tsx`
- Modify: `components/site-header.tsx`
- Modify: `app/globals.css`
- Test: `tests/unit/components/site-header.test.tsx`
- Test: `tests/e2e/about-page.spec.ts`

- [ ] **Step 1: Extract shared page-content components**

```tsx
export function AboutPageContent() {
  return (
    <main className="page container">
      <section className="about-card">
        ...
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Add a minimal reusable page reveal wrapper**

```tsx
"use client";

import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";

export function PageReveal({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div>{children}</div>;
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        data-page-reveal="animated"
        initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
```

- [ ] **Step 3: Add hidden animated route pages that wrap the shared content**

```tsx
import { AboutPageContent } from "@/components/about-page-content";
import { PageReveal } from "@/components/page-reveal";

export default function AnimatedAboutPage() {
  return (
    <PageReveal>
      <AboutPageContent />
    </PageReveal>
  );
}
```

- [ ] **Step 4: Make `SiteHeader` arm unseen route visits before navigation**

```tsx
"use client";

const PAGE_TRANSITION_KEYS = {
  "/about": "page:about",
  "/projects": "page:projects",
  "/contact": "page:contact",
} as const;
```

On click:
- read `document.cookie`
- if target has not been seen, set `ymkim_pending_transition` to the pathname
- append the route key to `ymkim_seen_transitions`
- allow navigation to proceed

- [ ] **Step 5: Run the focused route-level tests to verify they pass**

Run: `npm test -- tests/unit/components/site-header.test.tsx`
Expected: PASS

- [ ] **Step 6: Run the About e2e spec**

Run: `npm run test:e2e -- tests/e2e/about-page.spec.ts`
Expected: PASS

- [ ] **Step 7: Commit the chunk**

```bash
git add app/about/page.tsx app/contact/page.tsx app/projects/page.tsx app/__animated/about/page.tsx app/__animated/contact/page.tsx app/__animated/projects/page.tsx app/globals.css components/about-page-content.tsx components/contact-page-content.tsx components/projects-page-content.tsx components/page-reveal.tsx components/site-header.tsx tests/unit/components/site-header.test.tsx tests/e2e/about-page.spec.ts
git commit -m "feat: add first-visit route reveal pages"
```

## Chunk 3: Add One-Time Projects Tab and Detail Reveals

### Task 5: Add failing `ProjectFilter` tests for once-only state reveals

**Files:**
- Modify: `tests/unit/components/project-filter.test.tsx`
- Modify: `tests/e2e/projects-filter.spec.ts`
- Reference: `components/project-filter.tsx`

- [ ] **Step 1: Add a failing unit test for first-only tab reveal**

```tsx
it("animates the side tab content only the first time it is opened", async () => {
  const user = userEvent.setup();

  renderProjectFilter();

  await user.click(screen.getByRole("button", { name: "Side Projects" }));
  expect(screen.getByTestId("projects-tab-panel")).toHaveAttribute(
    "data-once-reveal",
    "animated",
  );

  await user.click(screen.getByRole("button", { name: "Work Projects" }));
  await user.click(screen.getByRole("button", { name: "Side Projects" }));

  expect(screen.getByTestId("projects-tab-panel")).toHaveAttribute(
    "data-once-reveal",
    "static",
  );
});
```

- [ ] **Step 2: Add a failing unit test for first-only project detail reveal**

```tsx
it("animates each project detail only on first open", async () => {
  const user = userEvent.setup();

  renderProjectFilter();
  await user.click(screen.getByRole("button", { name: "Side Projects" }));
  await user.click(screen.getByRole("button", { name: /mimesis/i }));

  expect(screen.getByTestId("project-detail-panel")).toHaveAttribute(
    "data-once-reveal",
    "animated",
  );

  await user.click(screen.getByRole("button", { name: "Back to side projects" }));
  await user.click(screen.getByRole("button", { name: /mimesis/i }));

  expect(screen.getByTestId("project-detail-panel")).toHaveAttribute(
    "data-once-reveal",
    "static",
  );
});
```

- [ ] **Step 3: Run the focused tests to verify they fail**

Run: `npm test -- tests/unit/components/project-filter.test.tsx`
Expected: FAIL because `ProjectFilter` does not yet expose once-only reveal state.

### Task 6: Implement shared once-only project-state reveal behavior

**Files:**
- Modify: `components/project-filter.tsx`
- Modify: `components/project-detail.tsx`
- Modify: `components/project-filter.module.css`
- Modify: `components/project-detail.module.css`
- Test: `tests/unit/components/project-filter.test.tsx`
- Test: `tests/e2e/projects-filter.spec.ts`

- [ ] **Step 1: Add a client helper inside `ProjectFilter` that checks and marks seen tab/detail keys**

```tsx
function consumeOnceReveal(key: string) {
  const hasSeen = hasSeenTransition(key, readSeenTransitionCookie());

  if (!hasSeen) {
    writeSeenTransitionCookie(markTransitionSeen(key, readSeenTransitionCookie()));
  }

  return !hasSeen;
}
```

- [ ] **Step 2: Mark tab panels and project detail panels with animated/static reveal state**

```tsx
<div
  data-testid="projects-tab-panel"
  data-once-reveal={shouldAnimateTab ? "animated" : "static"}
  className={styles.panel}
>
```

and

```tsx
<article
  data-testid="project-detail-panel"
  data-once-reveal={animateOnFirstOpen ? "animated" : "static"}
  className={`${styles.panel} card ${animateOnFirstOpen ? styles.panelReveal : ""}`}
>
```

- [ ] **Step 3: Add CSS or motion wrappers that only activate for `animated` state and respect reduced motion**

```css
.panelReveal {
  animation: projectOnceReveal 360ms cubic-bezier(0.22, 1, 0.36, 1);
}
```

- [ ] **Step 4: Run the focused unit and e2e tests**

Run: `npm test -- tests/unit/components/project-filter.test.tsx`
Expected: PASS

Run: `npm run test:e2e -- tests/e2e/projects-filter.spec.ts`
Expected: PASS

- [ ] **Step 5: Commit the chunk**

```bash
git add components/project-filter.tsx components/project-detail.tsx components/project-filter.module.css components/project-detail.module.css tests/unit/components/project-filter.test.tsx tests/e2e/projects-filter.spec.ts
git commit -m "feat: add once-only project state reveals"
```

## Chunk 4: Full Verification

### Task 7: Run full targeted verification and inspect the diff

**Files:**
- Verify only

- [ ] **Step 1: Run all focused unit tests**

Run: `npm test -- tests/unit/lib/transition-cookies.test.ts tests/unit/middleware/first-visit-transition.test.ts tests/unit/components/site-header.test.tsx tests/unit/components/project-filter.test.tsx`
Expected: PASS

- [ ] **Step 2: Run the affected e2e specs**

Run: `npm run test:e2e -- tests/e2e/about-page.spec.ts tests/e2e/projects-filter.spec.ts`
Expected: PASS

- [ ] **Step 3: Run a production build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 4: Inspect the final diff**

Run: `git diff --stat`
Expected: changes limited to transition rewrite, shared page-content extraction, and related tests/docs.
