"use client";

import { useEffect, useState } from "react";
import styles from "./rotating-role.module.css";

interface RotatingRoleProps {
  roles: string[];
  intervalMs?: number;
}

const DEFAULT_INTERVAL_MS = 2400;

export function RotatingRole({
  roles,
  intervalMs = DEFAULT_INTERVAL_MS,
}: RotatingRoleProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (roles.length < 2) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((previousIndex) => (previousIndex + 1) % roles.length);
    }, intervalMs);

    return () => window.clearInterval(intervalId);
  }, [intervalMs, roles.length]);

  if (roles.length === 0) {
    return null;
  }

  return (
    <span key={activeIndex} className={styles.role} data-testid="rotating-role">
      {roles[activeIndex]}
    </span>
  );
}
