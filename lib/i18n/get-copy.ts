import type { Locale } from "@/lib/i18n/locales";
import { MESSAGES } from "@/lib/i18n/messages";

export function getCopy(locale: Locale) {
  return MESSAGES[locale];
}
