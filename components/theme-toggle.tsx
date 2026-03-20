"use client";

import { Moon, Sun } from "lucide-react";
import styles from "./theme-toggle.module.css";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  window.localStorage.setItem("site_theme", theme);
}

function getCurrentTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function ThemeToggle() {
  const handleToggle = () => {
    const nextTheme: Theme = getCurrentTheme() === "light" ? "dark" : "light";
    applyTheme(nextTheme);
  };

  return (
    <button
      aria-label="Toggle color theme"
      className={styles.button}
      title="Toggle color theme"
      type="button"
      onClick={handleToggle}
    >
      <Sun
        aria-hidden="true"
        className={`${styles.icon} ${styles.sun}`}
        focusable="false"
        size={18}
        strokeWidth={1.8}
      />
      <Moon
        aria-hidden="true"
        className={`${styles.icon} ${styles.moon}`}
        focusable="false"
        size={18}
        strokeWidth={1.8}
      />
    </button>
  );
}
