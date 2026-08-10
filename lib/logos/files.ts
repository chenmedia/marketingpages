import "server-only";
import { cache } from "react";
import { readdir } from "node:fs/promises";
import path from "node:path";

/*
  Hvilke logofiler som faktisk ligger i public/logos.

  Oppslaget går mot filsystemet framfor en hardkodet liste med filnavn, og
  det er hele poenget med oppsettet: Kai slipper en fil i mappa, og logoen
  dukker opp. Ingen import å oppdatere, ingen død <Image> som peker på en fil
  som ikke finnes ennå.

  Forsiden er prerendret, så dette leses én gang under bygg. cache() fra
  React holder det til ett kall selv om veggen skulle rendres flere steder i
  samme forespørsel.

  Kaster aldri. Finnes ikke mappa — eller er public/ ikke med i et
  serverless-bygg — får hver kunde navnet sitt i tekst i stedet for at
  forsiden gir 500.
*/
const LOGO_DIR = path.join(process.cwd(), "public", "logos");

/*
  Rekkefølgen er prioritet, ikke bare et filter: ligger både obos.svg og
  obos.png der, vinner SVG-en. Uten en slik regel ville valget avhengt av
  hvilken rekkefølge filsystemet ramser opp filene i.
*/
const EXTENSIONS = [".svg", ".webp", ".png", ".jpg", ".jpeg"];

/** Filnavn uten endelse → URL under /logos, for filene som finnes. */
export const getLogoFiles = cache(async (): Promise<Map<string, string>> => {
  let entries: string[];
  try {
    entries = await readdir(LOGO_DIR);
  } catch {
    return new Map();
  }

  const found = new Map<string, { url: string; rank: number }>();

  for (const entry of entries) {
    const ext = path.extname(entry).toLowerCase();
    const rank = EXTENSIONS.indexOf(ext);
    if (rank === -1) continue;

    const base = path.basename(entry, path.extname(entry));
    const current = found.get(base);
    if (current && current.rank <= rank) continue;

    found.set(base, { url: `/logos/${entry}`, rank });
  }

  return new Map([...found].map(([base, { url }]) => [base, url]));
});
