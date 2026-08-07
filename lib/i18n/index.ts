import { no } from "./no";
import { en } from "./en";
import { noTon } from "./no.ton";
import { enTon } from "./en.ton";
import type { Dictionary, Locale } from "./types";

export { locales, defaultLocale } from "./types";
export type { Dictionary, Locale } from "./types";

/*
  To tekstvarianter av samme nettsted:

    "chen" (standard) — variasjonen. TON-teksten som utgangspunkt, men
                        Chen Medias stemme og Chen Medias faktiske forhold.
    "ton"             — TONs tekst ordrett, kun navn og geografi byttet.
                        Kun til sammenligning, se advarselen i no.ton.ts.

  Bytt ved å sette NEXT_PUBLIC_COPY_VARIANT=ton før build eller dev.
*/
const variant = process.env.NEXT_PUBLIC_COPY_VARIANT === "ton" ? "ton" : "chen";

const dictionaries: Record<"chen" | "ton", Record<Locale, Dictionary>> = {
  chen: { no, en },
  ton: { no: noTon, en: enTon },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[variant][locale];
}

export function isLocale(value: string): value is Locale {
  return value === "no" || value === "en";
}
