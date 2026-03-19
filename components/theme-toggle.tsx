"use client";

import { Moon, Sun } from "lucide-react";
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

  const Icon = theme === "light" ? Sun : Moon;

  return (
    <button
      aria-label="Toggle color theme"
      className={styles.button}
      title="Toggle color theme"
      type="button"
      onClick={handleToggle}
    >
      <Icon
        aria-hidden="true"
        className={styles.icon}
        focusable="false"
        size={18}
        strokeWidth={1.8}
      />
    </button>
  );
}
