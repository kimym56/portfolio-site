"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n/locales";
import styles from "./language-toggle.module.css";

interface LanguageToggleProps {
  locale: Locale;
}

const LOCALE_OPTIONS: Locale[] = ["en", "ko"];

export function LanguageToggle({ locale }: LanguageToggleProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (nextLocale: Locale) => {
    if (nextLocale === locale) {
      return;
    }

    document.cookie = `site_lang=${nextLocale}; path=/; max-age=31536000; samesite=lax`;

    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div className={styles.wrap} role="group" aria-label="Language selector">
      {LOCALE_OPTIONS.map((option) => {
        const isActive = option === locale;

        return (
          <button
            key={option}
            className={styles.button}
            data-active={isActive}
            type="button"
            aria-pressed={isActive}
            disabled={isPending}
            onClick={() => handleLocaleChange(option)}
          >
            {option.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
