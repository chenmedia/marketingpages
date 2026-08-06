import { no } from "./no";
import { en } from "./en";
import type { Dictionary, Locale } from "./types";

export { locales, defaultLocale } from "./types";
export type { Dictionary, Locale } from "./types";

const dictionaries: Record<Locale, Dictionary> = { no, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function isLocale(value: string): value is Locale {
  return value === "no" || value === "en";
}
