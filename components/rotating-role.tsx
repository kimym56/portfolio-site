"use client";

import { useEffect, useState } from "react";
import { domAnimation, LazyMotion, m, useReducedMotion } from "framer-motion";
import styles from "./rotating-role.module.css";

interface RotatingRoleProps {
  roles: string[];
  activeIndex?: number;
  intervalMs?: number;
  previousIndex?: number | null;
  isTransitioning?: boolean;
}

export const DEFAULT_INTERVAL_MS = 4500;
export const DEFAULT_TRANSITION_MS = 320;

export function RotatingRole({
  roles,
  activeIndex,
  intervalMs = DEFAULT_INTERVAL_MS,
}: RotatingRoleProps) {
  const [internalActiveIndex, setInternalActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const resolvedActiveIndex = activeIndex ?? internalActiveIndex;

  useEffect(() => {
    if (activeIndex !== undefined || roles.length < 2) {
      return;
    }

    let timeoutId: number | null = null;
    let expectedTickTime = performance.now() + intervalMs;

    const tick = () => {
      setInternalActiveIndex(
        (previousIndex) => (previousIndex + 1) % roles.length,
      );
      expectedTickTime += intervalMs;
      const delayUntilNextTick = Math.max(
        0,
        expectedTickTime - performance.now(),
      );
      timeoutId = window.setTimeout(tick, delayUntilNextTick);
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
  const transition = prefersReducedMotion
    ? { duration: 0.01 }
    : {
        duration: DEFAULT_TRANSITION_MS / 1000,
        ease: [0.22, 1, 0.36, 1] as const,
      };

  return (
    <span className={styles.roleStack} data-testid="rotating-role-stack">
      <LazyMotion features={domAnimation}>
        <m.span
          key={roleIndex}
          className={styles.role}
          data-testid="rotating-role"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
        >
          {roles[roleIndex]}
        </m.span>
      </LazyMotion>
    </span>
  );
}
