"use client";

import { useEffect, useState } from "react";
import styles from "./rotating-role.module.css";

interface RotatingRoleProps {
  roles: string[];
  activeIndex?: number;
  intervalMs?: number;
}

export const DEFAULT_INTERVAL_MS = 3500;

export function RotatingRole({
  roles,
  activeIndex,
  intervalMs = DEFAULT_INTERVAL_MS,
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
      setInternalActiveIndex((previousIndex) => (previousIndex + 1) % roles.length);
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

  const roleIndex = ((resolvedActiveIndex % roles.length) + roles.length) % roles.length;

  return (
    <span key={roleIndex} className={styles.role} data-testid="rotating-role">
      {roles[roleIndex]}
    </span>
  );
}
