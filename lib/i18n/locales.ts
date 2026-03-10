export const SUPPORTED_LOCALES = ["en", "ko"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];
