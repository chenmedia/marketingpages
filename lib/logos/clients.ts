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
  /**
   * Optisk justering, 1 er full cellehøyde.
   *
   * Lik høyde er ikke lik visuell vekt. Et bredt ordmerke som OBOS blir
   * 4,5 ganger så bredt som et kvadratisk merke på samme høyde og tar over
   * hele raden, mens en stablet logo med luft rundt teksten forsvinner.
   * Tallene under er øyemål mot de faktiske filene, ikke en formel.
   */
  scale?: number;
};

export const CLIENT_LOGOS: ClientLogo[] = [
  { name: "Snapchat", file: "snapchat" },
  { name: "OBOS", file: "obos", scale: 0.82 },
  { name: "DNT", file: "dnt", scale: 1.05 },
  { name: "Bergans of Norway", file: "bergans", scale: 0.92 },
  { name: "TINE", file: "tine" },
  { name: "Nordisk Film", file: "nordisk-film", scale: 1.15 },
  { name: "Oslo Business Forum", file: "oslo-business-forum", scale: 1.12 },
  { name: "Oslo Business Region", file: "oslo-business-region" },
  { name: "Kampsport", file: "kampsport" },
];
