"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GridOverlayToggle } from "@/components/grid-overlay-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  buildCookieAssignment,
  COOKIE_PENDING_TRANSITION,
  COOKIE_SEEN_TRANSITIONS,
  hasSeenTransition,
  markTransitionSeen,
  readCookieValue,
} from "@/lib/transition-cookies";
import type { NavCopy } from "@/types/site";
import styles from "./site-header.module.css";

interface SiteHeaderProps {
  navCopy: NavCopy;
}

const FIRST_VISIT_ROUTE_KEYS: Record<string, string> = {
  "/about": "page:about",
  "/projects": "page:projects",
  "/contact": "page:contact",
};

const SEEN_TRANSITIONS_MAX_AGE = 60 * 60 * 24 * 365;
const PENDING_TRANSITION_MAX_AGE = 90;

export function SiteHeader({ navCopy }: SiteHeaderProps) {
  const pathname = usePathname();

  function handleNavClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    pathname: string,
  ) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const transitionKey = FIRST_VISIT_ROUTE_KEYS[pathname];

    if (!transitionKey || window.location.pathname === pathname) {
      return;
    }

    const seenTransitionCookie = readCookieValue(
      document.cookie,
      COOKIE_SEEN_TRANSITIONS,
    );

    if (hasSeenTransition(transitionKey, seenTransitionCookie)) {
      return;
    }

    document.cookie = buildCookieAssignment(
      COOKIE_PENDING_TRANSITION,
      pathname,
      PENDING_TRANSITION_MAX_AGE,
    );
    document.cookie = buildCookieAssignment(
      COOKIE_SEEN_TRANSITIONS,
      markTransitionSeen(transitionKey, seenTransitionCookie),
      SEEN_TRANSITIONS_MAX_AGE,
    );
  }

  return (
    <header className={styles.header}>
      <div className={`${styles.inner} layout-frame`}>
        <Link href="/" className={styles.logo}>
          YMKim
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          <Link
            aria-current={pathname === "/" ? "page" : undefined}
            className={styles.navLink}
            href="/"
          >
            {navCopy.home}
          </Link>
          <Link
            aria-current={pathname === "/about" ? "page" : undefined}
            className={styles.navLink}
            href="/about"
            onClick={(event) => handleNavClick(event, "/about")}
            prefetch={false}
          >
            {navCopy.about}
          </Link>
          <Link
            aria-current={pathname === "/projects" ? "page" : undefined}
            className={styles.navLink}
            href="/projects"
            onClick={(event) => handleNavClick(event, "/projects")}
            prefetch={false}
          >
            {navCopy.projects}
          </Link>
          <Link
            aria-current={pathname === "/contact" ? "page" : undefined}
            className={styles.navLink}
            href="/contact"
            onClick={(event) => handleNavClick(event, "/contact")}
            prefetch={false}
          >
            {navCopy.contact}
          </Link>
        </nav>

        <div className={styles.controls}>
          <GridOverlayToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
