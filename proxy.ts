import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_PENDING_TRANSITION } from "@/lib/transition-cookies";

const REWRITE_DESTINATIONS: Record<string, string> = {
  "/about": "/__animated/about",
  "/projects": "/__animated/projects",
  "/contact": "/__animated/contact",
};

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pendingTransition = request.cookies.get(COOKIE_PENDING_TRANSITION)?.value;

  if (pendingTransition !== pathname) {
    return NextResponse.next();
  }

  const rewriteDestination = REWRITE_DESTINATIONS[pathname];

  if (!rewriteDestination) {
    return NextResponse.next();
  }

  const response = NextResponse.rewrite(new URL(rewriteDestination, request.nextUrl));
  response.cookies.set(COOKIE_PENDING_TRANSITION, "", {
    maxAge: 0,
    path: "/",
  });

  return response;
}

export const config = {
  matcher: ["/about", "/projects", "/contact"],
};
