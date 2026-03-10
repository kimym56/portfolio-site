import type { Locale } from "@/lib/i18n/locales";

export function setLocaleCookie(locale: Locale) {
  window.document.cookie = `site_lang=${locale}; path=/; max-age=31536000; samesite=lax`;
}
