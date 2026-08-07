/*
  Er det kontortid i Oslo akkurat nå?

  Brukes av sticky-baren til å avgjøre om prikken skal lyse grønt. To ting
  styrer utformingen:

    - Den kan ikke regnes ut på serveren. De offentlige sidene er statiske,
      så et serversvar ville frosset på byggetidspunktet.
    - Den må gjelde Oslo-tid, ikke besøkendes tid. En kunde i København eller
      Shanghai skal se samme prikk som en i Oslo.

  Derfor leses alt ut av ett Intl-kall med timeZone: "Europe/Oslo". Det gir
  Oslos veggklokke og Oslos dato fra hvilken som helst maskin, og håndterer
  overgangen mellom CET og CEST av seg selv.
*/

export const OFFICE_TIME_ZONE = "Europe/Oslo";
/** Åpent fra og med denne timen, til men ikke med sluttimen. */
export const OFFICE_START_HOUR = 7;
export const OFFICE_END_HOUR = 16;

/*
  Faste røde dager, som "måned-dag".

  1. og 17. mai er strengt tatt offentlige høytidsdager og ikke helligdager i
  lovens forstand, men begge er røde dager og fri, så de hører med.

  Søndager fanges allerede av ukedagsregelen, så første påskedag og første
  pinsedag trenger ingen egen oppføring.
*/
const FIXED_RED_DAYS = [
  "1-1", // første nyttårsdag
  "5-1", // arbeidernes dag
  "5-17", // grunnlovsdagen
  "12-25", // første juledag
  "12-26", // andre juledag
];

/*
  Julaften og nyttårsaften er ikke røde dager, selv om de fleste norske
  bedrifter er stengt. Legg inn "12-24" og "12-31" her hvis de skal telle.
*/
const EXTRA_CLOSED: string[] = [];

/** Forskyvning i dager fra første påskedag. */
const EASTER_OFFSETS = [
  -3, // skjærtorsdag
  -2, // langfredag
  1, // andre påskedag
  39, // Kristi himmelfartsdag
  50, // andre pinsedag
];

const osloFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: OFFICE_TIME_ZONE,
  weekday: "short",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  // Ikke hour12: false. Den kan gi "24" ved midnatt i enkelte motorer.
  hourCycle: "h23",
});

function osloNow(at: Date) {
  const part: Record<string, string> = {};
  for (const p of osloFormat.formatToParts(at)) part[p.type] = p.value;
  return {
    weekday: part.weekday,
    year: Number(part.year),
    month: Number(part.month),
    day: Number(part.day),
    hour: Number(part.hour),
  };
}

/*
  Første påskedag med den anonyme gregorianske algoritmen
  (Meeus/Jones/Butcher). Ti linjer heltallsaritmetikk er billigere og lettere
  å etterprøve enn et helligdagsbibliotek for elleve datoer.

  Returnerer måned 3 eller 4, og dag i måneden.
*/
export function easterSunday(year: number): { month: number; day: number } {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const n = h + l - 7 * m + 114;
  return { month: Math.floor(n / 31), day: (n % 31) + 1 };
}

const DAY_MS = 86_400_000;
const redDaysByYear = new Map<number, Set<string>>();

/*
  Settet med røde dager for et år. Memoisert, siden sjekken kjører hvert
  minutt så lenge fanen står åpen.

  Forskyvningene fra påsken regnes i UTC-midnatt, altså ren kalender-
  aritmetikk uten tidssone inne i bildet. Samme grep som parseISODate i
  lib/agenda/date.ts.
*/
function redDays(year: number): Set<string> {
  const cached = redDaysByYear.get(year);
  if (cached) return cached;

  const days = new Set([...FIXED_RED_DAYS, ...EXTRA_CLOSED]);
  const easter = easterSunday(year);
  const easterUtc = Date.UTC(year, easter.month - 1, easter.day);
  for (const offset of EASTER_OFFSETS) {
    const d = new Date(easterUtc + offset * DAY_MS);
    days.add(`${d.getUTCMonth() + 1}-${d.getUTCDate()}`);
  }

  redDaysByYear.set(year, days);
  return days;
}

/** Er datoen en norsk rød dag? Måned er 1-indeksert. */
export function isRedDay(year: number, month: number, day: number): boolean {
  return redDays(year).has(`${month}-${day}`);
}

export function isOfficeHours(at: Date = new Date()): boolean {
  const { weekday, year, month, day, hour } = osloNow(at);

  // Sat og Sun er de eneste ukedagene som begynner på S, uansett ICU-versjon
  if (weekday.startsWith("S")) return false;
  if (hour < OFFICE_START_HOUR || hour >= OFFICE_END_HOUR) return false;
  return !isRedDay(year, month, day);
}
