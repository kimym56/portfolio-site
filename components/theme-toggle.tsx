"use client";

import { useEffect, useState } from "react";
import styles from "./theme-toggle.module.css";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  window.localStorage.setItem("site_theme", theme);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return "light";
    }
    const storedTheme = window.localStorage.getItem("site_theme");
    return storedTheme === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const handleToggle = () => {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  return (
    <button
      aria-label="Toggle color theme"
      className={styles.button}
      title="Toggle color theme"
      type="button"
      onClick={handleToggle}
    >
      <svg
        aria-hidden="true"
        className={styles.icon}
        fill="none"
        focusable="false"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 2v2.25M12 19.75V22M4.22 4.22l1.58 1.58M18.2 18.2l1.58 1.58M2 12h2.25M19.75 12H22M4.22 19.78l1.58-1.58M18.2 5.8l1.58-1.58" />
      </svg>
    </button>
  );
}
