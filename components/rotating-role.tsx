"use client";

import { domAnimation, LazyMotion, m, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./rotating-role.module.css";

interface RotatingRoleProps {
  roles: string[];
  activeIndex?: number;
  intervalMs?: number;
  previousIndex?: number | null;
  isTransitioning?: boolean;
}

export const DEFAULT_INTERVAL_MS = 2000;
export const DEFAULT_TRANSITION_MS = 900;

export function RotatingRole({
  roles,
  activeIndex,
  intervalMs = DEFAULT_INTERVAL_MS,
  previousIndex,
  isTransitioning = false,
}: RotatingRoleProps) {
  const [internalActiveIndex, setInternalActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const resolvedActiveIndex = activeIndex ?? internalActiveIndex;

  useEffect(() => {
    if (activeIndex !== undefined || roles.length < 2) {
      return;
    }

    let timeoutId: number | null = null;

    const tick = () => {
      setInternalActiveIndex(
        (previousIndex) => (previousIndex + 1) % roles.length,
      );
      // Hidden tabs can delay callbacks for a long time. Restart from "now"
      // so resume does not fast-forward through every missed role.
      timeoutId = window.setTimeout(tick, intervalMs);
    };

    timeoutId = window.setTimeout(tick, intervalMs);

    return () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [activeIndex, intervalMs, roles.length]);

  if (roles.length === 0) {
    return null;
  }

  const roleIndex =
    ((resolvedActiveIndex % roles.length) + roles.length) % roles.length;
  const resolvedPreviousIndex =
    previousIndex === null || previousIndex === undefined
      ? null
      : ((previousIndex % roles.length) + roles.length) % roles.length;
  const showPreviousRole =
    isTransitioning &&
    resolvedPreviousIndex !== null &&
    resolvedPreviousIndex !== roleIndex;
  const transition = prefersReducedMotion
    ? { duration: 0.01 }
    : {
        duration: DEFAULT_TRANSITION_MS / 1000,
        ease: [0.4, 0, 0.2, 1] as const,
      };
  const incomingRoleInitial = prefersReducedMotion
    ? false
    : { opacity: 0, y: 12 };
  const incomingRoleAnimate = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0 };
  const outgoingRoleInitial = prefersReducedMotion
    ? false
    : { opacity: 1, y: 0 };
  const outgoingRoleAnimate = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, y: -12 };

  return (
    <span className={styles.roleStack} data-testid="rotating-role-stack">
      <LazyMotion features={domAnimation}>
        {showPreviousRole ? (
          <m.span
            className={styles.role}
            aria-hidden="true"
            initial={outgoingRoleInitial}
            animate={outgoingRoleAnimate}
            transition={transition}
          >
            {roles[resolvedPreviousIndex]}
          </m.span>
        ) : null}
        <m.span
          key={roleIndex}
          className={styles.role}
          data-testid="rotating-role"
          initial={incomingRoleInitial}
          animate={incomingRoleAnimate}
          transition={transition}
        >
          {roles[roleIndex]}
        </m.span>
      </LazyMotion>
    </span>
  );
}
