import { photo } from "@/lib/images/defaults";

/*
  Hver bildeflate på nettsiden har et navn. Navnet er kontrakten mellom
  markupen og databasen: kallstedet sier slot="hero-1", og site_images
  bestemmer hvilket bilde som havner der.

  Standardbildet er ikke en plassholder som skal fjernes. Det er sikkerhets-
  nettet: har en slot ingen rad i databasen, eller er databasen utilgjengelig,
  vises standardbildet. Da kan flatene fylles én og én, og nettsiden ser aldri
  tom ut. Samme grep som getAgenda og getSiteStats: aldri kast, fall tilbake.

  «ratio» er kun til admin-oversikten, så Kai ser hvilket format flaten
  faktisk beskjæres til før han velger bilde. Selve beskjæringen gjøres av
  CSS på kallstedet.
*/
export type SlotDef = {
  slot: string;
  /** Gruppe i admin-oversikten */
  group: string;
  /** Hva flaten er, med Kais ord */
  label: string;
  /** Formatet flaten beskjæres til */
  ratio: string;
  /** Vises til flaten får sitt eget bilde */
  fallback: string;
  /** Alt-tekst til fallback-bildet. Byttes med bildet. */
  fallbackAlt: string;
  /** Kun hero-polaroidene viser bildetekst */
  hasCaption?: boolean;
  /** Rent dekorativ flate: alt="" og aria-hidden */
  decorative?: boolean;
};

export const SLOTS: SlotDef[] = [
  // Forsiden, hero
  {
    slot: "hero-1",
    group: "Forsiden, hero",
    label: "Polaroid 1",
    ratio: "4:5",
    fallback: photo.meetCrowd,
    fallbackAlt: "Artist strekker hånden ut mot publikum under konsert",
    hasCaption: true,
  },
  {
    slot: "hero-2",
    group: "Forsiden, hero",
    label: "Polaroid 2",
    ratio: "4:5",
    fallback: photo.vocalist,
    fallbackAlt: "Vokalist i nærbilde på opplyst scene",
    hasCaption: true,
  },
  {
    slot: "hero-3",
    group: "Forsiden, hero",
    label: "Polaroid 3",
    ratio: "4:5",
    fallback: photo.redbull,
    fallbackAlt: "Merkevareaktivering med publikum rundt",
    hasCaption: true,
  },

  // Forsiden, tjenestekort
  {
    slot: "tjeneste-1",
    group: "Forsiden, tjenester",
    label: "Tjenestekort 1",
    ratio: "3:2",
    fallback: photo.festivalLife,
    fallbackAlt: "Gjester samlet på festivalområdet",
  },
  {
    slot: "tjeneste-2",
    group: "Forsiden, tjenester",
    label: "Tjenestekort 2",
    ratio: "3:2",
    fallback: photo.lightshow,
    fallbackAlt: "Publikum mot scenen mens lysstrålene står ut i salen",
  },
  {
    slot: "tjeneste-3",
    group: "Forsiden, tjenester",
    label: "Tjenestekort 3",
    ratio: "3:2",
    fallback: photo.ringnesImsdal,
    fallbackAlt: "Produkt holdt fram foran publikum under en aktivering",
  },

  // Forsiden, leveranse
  {
    slot: "leveranse-hoved",
    group: "Forsiden, leveranse",
    label: "Hovedbilde",
    ratio: "4:3",
    fallback: photo.epicStage,
    fallbackAlt: "Hele scenen og publikum i skumring",
  },
  {
    slot: "leveranse-some",
    group: "Forsiden, leveranse",
    label: "Utsnitt til sosiale medier",
    ratio: "9:16",
    fallback: photo.vocalist,
    fallbackAlt: "Stående utsnitt av vokalist på scenen",
  },
  {
    slot: "leveranse-web",
    group: "Forsiden, leveranse",
    label: "Utsnitt til web",
    ratio: "9:16",
    fallback: photo.ringnesImsdal,
    fallbackAlt: "Stående utsnitt fra merkevareaktivering",
  },
  {
    slot: "leveranse-trykk",
    group: "Forsiden, leveranse",
    label: "Utsnitt til trykk",
    ratio: "9:16",
    fallback: photo.lightshow,
    fallbackAlt: "Stående utsnitt av lysshow over publikum",
  },

  // Forsiden, arbeidet vårt
  ...[1, 2, 3, 4].map((n) => ({
    slot: `arbeid-${n}`,
    group: "Forsiden, arbeidet vårt",
    label: `Prosjektkort ${n}`,
    ratio: "4:3",
    fallback: [photo.meetCrowd, photo.epicStage, photo.redbull, photo.festivalLife][n - 1],
    fallbackAlt: [
      "Artist møter publikum foran scenen",
      "Scenen sett bakfra med fullt publikum",
      "Merkevareaktivering med kø av gjester",
      "Festivalområdet med folk ved bordene",
    ][n - 1],
  })),

  // Forsiden, om oss
  {
    slot: "om-portrett",
    group: "Forsiden, om oss",
    label: "Portrett av Kai",
    ratio: "4:5",
    fallback: photo.vocalist,
    fallbackAlt: "Kai Chen, portrett",
  },

  // Forsiden, publikum
  ...[1, 2, 3, 4].map((n) => ({
    slot: `publikum-${n}`,
    group: "Forsiden, publikum",
    label: `Målgruppe ${n}`,
    ratio: "4:3",
    fallback: [photo.vocalist, photo.festivalLife, photo.ringnesImsdal, photo.crewLogistics][n - 1],
    fallbackAlt: [
      "Foredragsholder på scenen",
      "Gjester i samtale under et arrangement",
      "Merkevareaktivering under et arrangement",
      "Crew og logistikk bak kulissene",
    ][n - 1],
  })),

  // Fotostripen
  ...[1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
    slot: `stripe-${n}`,
    group: "Fotostripen",
    label: `Ramme ${n}`,
    ratio: "liggende",
    fallback: [
      photo.epicStage,
      photo.ringnesImsdal,
      photo.vocalist,
      photo.festivalLife,
      photo.lightshow,
      photo.meetCrowd,
      photo.redbull,
      photo.crewLogistics,
    ][n - 1],
    fallbackAlt: [
      "Scenen og publikum i skumring",
      "Merkevareaktivering med produkt i hånd",
      "Vokalist på scenen",
      "Festivalområdet",
      "Lysshow over publikum",
      "Artist møter publikum",
      "Aktivering med skumbasseng",
      "Crew og produksjon i arbeid",
    ][n - 1],
  })),

  // Kontaktseksjonen, som ligger på alle fem sider
  {
    slot: "kontakt-bakgrunn",
    group: "Kontaktseksjonen",
    label: "Bakgrunn",
    ratio: "fri",
    fallback: photo.epicStage,
    fallbackAlt: "",
    decorative: true,
  },
  {
    slot: "kontakt-portrett",
    group: "Kontaktseksjonen",
    label: "Portrett",
    ratio: "fri",
    fallback: photo.meetCrowd,
    fallbackAlt: "Kai Chen bak kamera under et oppdrag",
  },

  // Tjenestesidene
  {
    slot: "eventfoto-hero",
    group: "Tjenestesider",
    label: "Eventfoto, toppbilde",
    ratio: "4:5",
    fallback: photo.lightshow,
    fallbackAlt: "Publikum og scene sett fra salen",
  },
  {
    slot: "eventfilm-hero",
    group: "Tjenestesider",
    label: "Eventfilm, toppbilde",
    ratio: "16:9",
    fallback: photo.epicStage,
    fallbackAlt: "Stillbilde fra eventfilm, scene og publikum",
  },
];

export const SLOT_BY_KEY = new Map(SLOTS.map((s) => [s.slot, s]));

/** Rekkefølgen gruppene vises i admin. */
export const SLOT_GROUPS = [...new Set(SLOTS.map((s) => s.group))];
