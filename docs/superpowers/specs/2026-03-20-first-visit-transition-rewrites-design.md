# First Visit Transition Rewrites Design

## Context

The site currently renders `About`, `Projects`, and `Contact` as static App Router pages and handles the `Projects` tab/detail interactions entirely in client state. There is no navigation-aware transition system yet.

The requested behavior should follow the Rauno article pattern more closely than a generic route transition system: animation is reserved for a first intentional arrival, then subsequent visits become instant so the motion keeps its novelty.

## Goal

Add first-visit-only motion to all non-home tab-like destinations:

- first intentional visits to `About`, `Projects`, and `Contact`
- first switch to `Work` and first switch to `Side` inside `Projects`
- first open of each project detail view

Home remains unchanged.

## Approved Design

### Interaction Model

- Keep `Home` excluded from this transition system.
- Animate only after an intentional in-site navigation action, not on refresh or direct-entry page loads.
- Once a destination or state has been shown with motion, later visits to that same destination or state should render instantly.
- Route-level first-visit animation should use the same pattern described in the article: set a cookie before navigation, rewrite the matching request to an animated variant, then clear the one-shot cookie in the response.
- In-page `Projects` transitions should follow the same one-time principle, but stay client-side because there is no route change for the segmented control or detail panel.

### Route-Level Architecture

- Add middleware that watches requests for `/about`, `/projects`, and `/contact`.
- The middleware should rewrite to internal animated routes only when the request path matches a destination-specific one-shot cookie.
- Use internal routes such as `/__animated/about`, `/__animated/projects`, and `/__animated/contact` so the URL remains the public path while rendering a different page tree.
- Clear the pending animation cookie in the middleware response immediately after rewriting so refreshes of the same page do not replay the effect.

### First-Visit Tracking

- Track seen route destinations in a durable cookie that can be read and updated from the client before navigation.
- Track first-seen `Projects` states with the same cookie strategy so route-level and in-page behavior share one mechanism.
- Use stable keys for each one-time reveal:
  - `page:about`
  - `page:projects`
  - `page:contact`
  - `projects:tab:work`
  - `projects:tab:side`
  - `projects:detail:<project-id>`
- The active pending route animation should use a separate cookie whose value is the public pathname to rewrite.

### Motion Language

- Use a restrained authored reveal rather than a full-screen wipe.
- The main container should enter with a quick opacity ramp, a light upward settle, and a short blur-to-sharp cleanup.
- Child content should reveal with a small stagger so the page title lands first and supporting content follows.
- `Projects` in-page transitions should reuse the same family at a smaller scale so tabs, cards, and detail content feel related to the page-level reveal.
- Reduced-motion users should receive no animated travel or stagger.

### File Structure

- Extract reusable page content components for `About`, `Projects`, and `Contact` so normal and animated routes share the same markup.
- Add a small client transition wrapper component for page-level reveal choreography.
- Add a client helper for managing the one-shot seen/pending cookies.
- Keep `ProjectFilter` responsible for the local `Projects` interaction state, but let it consult the shared transition helper before deciding whether to animate a new tab or detail panel.

### Accessibility

- Do not delay focusability or semantic structure during animated renders.
- Ensure reduced-motion users receive immediate content with no choreography.
- Preserve current button and link semantics for nav, tabs, cards, and the detail back action.

### Testing

- Add unit coverage for the cookie helper and middleware rewrite decisions.
- Add unit coverage for nav click behavior that primes the first route visit and skips repeats.
- Add unit coverage for `ProjectFilter` to prove the first `Side` switch and first project detail open animate once, then do not replay.
- Add end-to-end coverage showing the first intentional page visit exposes animated markup and a reload or repeat visit does not.
