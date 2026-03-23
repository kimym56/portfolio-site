import {
  buildCookieAssignment,
  COOKIE_PENDING_TRANSITION,
  COOKIE_SEEN_TRANSITIONS,
  hasSeenTransition,
  markTransitionSeen,
  readCookieValue,
} from "@/lib/transition-cookies";
import { describe, expect, it } from "vitest";

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

  it("reads named cookie values from a cookie header string", () => {
    expect(
      readCookieValue(
        `theme=light; ${COOKIE_PENDING_TRANSITION}=%2Fabout; ${COOKIE_SEEN_TRANSITIONS}=page%3Aabout`,
        COOKIE_PENDING_TRANSITION,
      ),
    ).toBe("/about");
  });

  it("builds a cookie assignment string with a path and same-site policy", () => {
    expect(buildCookieAssignment(COOKIE_PENDING_TRANSITION, "/projects", 90)).toContain(
      `${COOKIE_PENDING_TRANSITION}=%2Fprojects`,
    );
    expect(buildCookieAssignment(COOKIE_PENDING_TRANSITION, "/projects", 90)).toContain(
      "Path=/",
    );
    expect(buildCookieAssignment(COOKIE_PENDING_TRANSITION, "/projects", 90)).toContain(
      "SameSite=Lax",
    );
  });
});
