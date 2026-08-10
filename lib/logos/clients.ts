/*
  Kundene på logoveggen.

  Rekkefølgen her er rekkefølgen på forsiden.

  `file` er filnavnet UTEN endelse. Logoen legges i public/logos, og veggen
  finner den selv: obos.svg, obos.png eller obos.webp treffer alle på
  file: "obos". Endelsen er utelatt med vilje, så en logo kan byttes fra PNG
  til SVG uten at denne listen røres.

  Mangler filen, faller flaten tilbake til navnet satt i display-fonten.
  Samme grep som standardbildene i lib/images/defaults: veggen ser aldri tom
  ut, og logoene kan fylles én og én etter hvert som de kommer inn.

  Nye kunder legges til her, og filen slippes i public/logos. Ingen annen
  kode skal røres.
*/
export type ClientLogo = {
  /** Alt-tekst på logoen, og teksten som vises til filen er på plass */
  name: string;
  /** Filnavn uten endelse, i public/logos */
  file: string;
};

export const CLIENT_LOGOS: ClientLogo[] = [
  { name: "Snapchat", file: "snapchat" },
  { name: "OBOS", file: "obos" },
  { name: "DNT", file: "dnt" },
  { name: "Bergans of Norway", file: "bergans" },
  { name: "TINE", file: "tine" },
  { name: "Nordisk Film", file: "nordisk-film" },
  { name: "Oslo Business Forum", file: "oslo-business-forum" },
  { name: "Oslo Business Region", file: "oslo-business-region" },
  { name: "Kampsport", file: "kampsport" },
];
