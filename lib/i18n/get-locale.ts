import type { Locale } from "@/lib/i18n/locales";

export function normalizeLocale(value?: string): Locale {
  return value === "ko" ? "ko" : "en";
}
