import type { Locale } from "@/lib/i18n";

/*
  Eneste sted som konverterer ISO-datoer.

  `new Date("2026-10-04")` parses som UTC midnatt. I en negativ tidssone gir
  getDate() da 3. oktober. Vi splitter strengen manuelt i stedet.
*/
export function parseISODate(iso: string): { y: number; m: number; d: number } {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m, d };
}

/*
  Hardkodede månedsforkortelser, ikke Intl.

  `Intl.DateTimeFormat("nb-NO", { month: "short" })` gir «aug.» med punktum og
  liten forbokstav, og ICU-data varierer mellom Node-versjoner og mellom
  server og klient. Dagchipen er w-11 bred og tåler ikke at «mars» plutselig
  kommer uforkortet.
*/
const MONTHS: Record<Locale, readonly string[]> = {
  no: ["JAN", "FEB", "MAR", "APR", "MAI", "JUN", "JUL", "AUG", "SEP", "OKT", "NOV", "DES"],
  en: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
};

export function monthLabel(iso: string, locale: Locale): string {
  return MONTHS[locale][parseISODate(iso).m - 1] ?? "";
}

export function dayNumber(iso: string): number {
  return parseISODate(iso).d;
}

export function yearOf(iso: string): number {
  return parseISODate(iso).y;
}

/** Dagens dato i Oslo, som ISO. Databasen kjører i UTC. */
export function todayInOslo(): string {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Oslo" }).format(
    new Date()
  );
}

/*
  Dagchipen for en rad. Ett arrangement over flere dager i samme måned vises
  som «4–6»; går det over et månedsskifte, viser chipen starten og sluttdatoen
  legges på stedslinjen i stedet.
*/
export function chipLabel(
  startsOn: string,
  endsOn: string,
  locale: Locale
): { day: string; month: string; spansMonths: boolean } {
  const a = parseISODate(startsOn);
  const b = parseISODate(endsOn);

  if (startsOn === endsOn) {
    return { day: String(a.d), month: MONTHS[locale][a.m - 1], spansMonths: false };
  }
  if (a.m === b.m && a.y === b.y) {
    return { day: `${a.d}–${b.d}`, month: MONTHS[locale][a.m - 1], spansMonths: false };
  }
  return { day: String(a.d), month: MONTHS[locale][a.m - 1], spansMonths: true };
}

/** «2. okt» til stedslinjen når spennet krysser et månedsskifte. */
export function shortDate(iso: string, locale: Locale): string {
  const { d, m } = parseISODate(iso);
  return `${d}. ${MONTHS[locale][m - 1].toLowerCase()}`;
}

/** «fredag 9. oktober» til «neste ledige dato». */
export function longDate(iso: string, locale: Locale): string {
  const { y, m, d } = parseISODate(iso);
  return new Intl.DateTimeFormat(locale === "no" ? "nb-NO" : "en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, d)));
}
