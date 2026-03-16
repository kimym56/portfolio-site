"use client";

import { useEffect, useState } from "react";
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
  previousIndex,
  isTransitioning = false,
}: RotatingRoleProps) {
  const [internalActiveIndex, setInternalActiveIndex] = useState(0);
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
  const resolvedPreviousIndex =
    previousIndex === null || previousIndex === undefined
      ? null
      : ((previousIndex % roles.length) + roles.length) % roles.length;
  const showPreviousRole =
    isTransitioning &&
    resolvedPreviousIndex !== null &&
    resolvedPreviousIndex !== roleIndex;

  return (
    <span className={styles.roleStack} data-testid="rotating-role-stack">
      {showPreviousRole ? (
        <span className={`${styles.role} ${styles.roleExit}`} aria-hidden="true">
          {roles[resolvedPreviousIndex]}
        </span>
      ) : null}
      <span
        className={`${styles.role} ${
          isTransitioning ? styles.roleEnter : styles.roleStatic
        }`}
        data-testid="rotating-role"
      >
        {roles[roleIndex]}
      </span>
    </span>
  );
}
