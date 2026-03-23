// @vitest-environment node

import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { proxy } from "@/proxy";
import { COOKIE_PENDING_TRANSITION } from "@/lib/transition-cookies";

describe("first visit route rewrites", () => {
  it("rewrites an armed /about request to the animated route and clears the cookie", () => {
    const request = new NextRequest("https://example.com/about", {
      headers: {
        cookie: `${COOKIE_PENDING_TRANSITION}=%2Fabout`,
      },
    });

    const response = proxy(request);

    expect(response.headers.get("x-middleware-rewrite")).toContain("/__animated/about");
    expect(response.cookies.get(COOKIE_PENDING_TRANSITION)?.value).toBe("");
    expect(response.cookies.get(COOKIE_PENDING_TRANSITION)?.maxAge).toBe(0);
  });

  it("passes through when no pending destination matches", () => {
    const request = new NextRequest("https://example.com/about");

    const response = proxy(request);

    expect(response.headers.get("x-middleware-rewrite")).toBeNull();
  });
});
