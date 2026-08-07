import { no } from "./no";
import { en } from "./en";
import { noTon } from "./no.ton";
import { enTon } from "./en.ton";
import { defaultLocale, type Dictionary, type Locale } from "./types";

export { locales, defaultLocale } from "./types";
export type { Dictionary, Locale } from "./types";

/*
  Norsk har ingen prefiks i URL-en, engelsk har /en. Filstrukturen bruker
  fortsatt app/[locale]/, så proxy.ts rewriter /eventfoto til /no/eventfoto.
  Alle interne lenker må bygges herfra, ellers lekker /no/ ut i markup.
*/
export function localeBase(locale: Locale): string {
  return locale === defaultLocale ? "" : `/${locale}`;
}

/** Bygger en intern sti for et gitt språk. localePath("no", "/eventfoto") -> "/eventfoto" */
export function localePath(locale: Locale, path = "/"): string {
  const base = localeBase(locale);
  if (path === "/") return base || "/";
  return `${base}${path}`;
}

/** Cookien som husker et manuelt språkvalg. Leses i proxy.ts, settes i LocaleSwitch. */
export const LOCALE_COOKIE = "chenmedia_locale";

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
