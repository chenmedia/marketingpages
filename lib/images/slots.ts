import { photo } from "@/lib/images/defaults";
import {
  HUB_IMAGES,
  PHOTO_CATEGORIES,
  PHOTO_PROJECTS,
  categoryHeroImage,
  categoryHeroSlot,
  categorySlot,
  imageRef,
  projectImages,
  projectSlot,
  projectsIn,
} from "@/lib/photography";
import {
  VIDEO_CATEGORIES,
  VIDEO_PROJECTS,
  videoCategorySlot,
  videoPosterFallback,
  videoPosterSlot,
  videoProjectsIn,
} from "@/lib/video";

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
  /** Fokuspunkt [x, y] for standardbildet, til databasen har sitt eget */
  fallbackFocal?: readonly [number, number];
};

/*
  Fotograferingssidene. Hvert prosjektbilde får sin egen slot, med bildet
  fra Dropbox-utvalget som standard. Kategoriflisene og toppbildene låner
  standardbildet fra et prosjekt, men er egne flater, så de kan byttes
  uten at prosjektet endrer seg.
*/
function fromImage(ref: ReturnType<typeof imageRef>) {
  return ref
    ? { fallback: ref.src, fallbackAlt: ref.alt.no, fallbackFocal: ref.focal }
    : { fallback: photo.lightshow, fallbackAlt: "Bilde fra et oppdrag" };
}

/*
  Plakatene til filmene. Standardbildet er lånt fra et fotooppdrag, derfor
  «midlertidig» i etiketten, til et ekte stillbilde fra filmen er lastet opp.
*/
const VIDEO_SLOTS: SlotDef[] = [
  ...VIDEO_CATEGORIES.map((category) => {
    const first = videoProjectsIn(category.key)[0];
    return {
      slot: videoCategorySlot(category),
      group: "Videoproduksjon, kategorier",
      label: category.title.no,
      ratio: "3:2",
      ...fromImage(first ? videoPosterFallback(first) : undefined),
    };
  }),
  ...VIDEO_PROJECTS.map((project) => ({
    slot: videoPosterSlot(project),
    group: "Videoproduksjon, filmplakater",
    label: `${project.client}, ${project.project.no} (midlertidig bilde)`,
    ratio: "16:9",
    ...fromImage(videoPosterFallback(project)),
  })),
];

const PHOTO_SLOTS: SlotDef[] = [
  {
    slot: "fotografering-hero",
    group: "Fotografering, oversikt",
    label: "Toppbilde",
    ratio: "bred",
    ...fromImage(imageRef(HUB_IMAGES.hero[0], HUB_IMAGES.hero[1])),
  },
  ...HUB_IMAGES.combo.map((ref, i) => ({
    slot: `fotografering-kombi-${i + 1}`,
    group: "Fotografering, oversikt",
    label: `Foto og video, bilde ${i + 1}`,
    ratio: "4:5",
    ...fromImage(imageRef(ref[0], ref[1])),
  })),
  ...PHOTO_CATEGORIES.map((category) => {
    const first = projectsIn(category.key)[0];
    return {
      slot: categorySlot(category),
      group: "Fotografering, kategorier",
      label: category.title.no,
      ratio: "3:2",
      ...fromImage(first ? imageRef(first.id, 1) : undefined),
    };
  }),
  ...PHOTO_CATEGORIES.map((category) => ({
    slot: categoryHeroSlot(category),
    group: "Fotografering, kategorier",
    label: `${category.title.no}, toppbilde`,
    ratio: "4:5",
    ...fromImage(categoryHeroImage(category.key)),
  })),
  ...PHOTO_PROJECTS.flatMap((project) =>
    projectImages(project).map((image, i) => ({
      slot: projectSlot(project, i + 1),
      group: `Prosjekter, ${PHOTO_CATEGORIES.find((c) => c.key === project.category)?.title.no}`,
      label: `${project.client}, ${project.project.no}${i === 0 ? " (cover)" : `, bilde ${i + 1}`}`,
      ratio: i === 0 ? "3:2" : "fri",
      fallback: image.src,
      fallbackAlt: image.alt.no,
      fallbackFocal: image.focal,
    }))
  ),
];

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
    ratio: "4:3",
    // Oslo Proptech Summit, Glasshallen sett ovenfra
    fallback: "/portfolio/event/ops-hero.webp",
    fallbackAlt: "Fullsatt Glasshallen under Oslo Proptech Summit, sett ovenfra mot scenen",
    fallbackFocal: [0.5, 0.55],
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

  /*
    De tre små sirklene ved «alene eller med et komplett crew» i heroen.

    Dekorative med vilje: teksten ved siden av sier hva de viser, og tre
    alt-tekster til på rad ville bare vært støy for en skjermleser. De er
    også bittesmå — velg bilder der motivet er stort nok til å bære en
    beskjæring til 44 piksler.
  */
  {
    slot: "crew-1",
    group: "Forsiden, crew",
    label: "Crew-sirkel 1",
    ratio: "1:1",
    fallback: photo.crewLogistics,
    fallbackAlt: "",
    decorative: true,
  },
  {
    slot: "crew-2",
    group: "Forsiden, crew",
    label: "Crew-sirkel 2",
    ratio: "1:1",
    fallback: photo.festivalLife,
    fallbackAlt: "",
    decorative: true,
  },
  {
    slot: "crew-3",
    group: "Forsiden, crew",
    label: "Crew-sirkel 3",
    ratio: "1:1",
    fallback: photo.epicStage,
    fallbackAlt: "",
    decorative: true,
  },

  // Forsiden, tjenestekort
  {
    slot: "tjeneste-1",
    group: "Forsiden, tjenester",
    label: "Tjenestekort 1, Fotografering",
    ratio: "3:2",
    // Snap Focus i Vulkan Arena: scene, lys og publikum i ett bilde
    ...fromImage(imageRef("snap-focus", 1)),
  },
  {
    slot: "tjeneste-2",
    group: "Forsiden, tjenester",
    label: "Tjenestekort 2, Videoproduksjon",
    ratio: "3:2",
    // Bak kamera under et intervjuopptak: viser crewet i arbeid
    fallback: "/portfolio/video/intervju-opptak.webp",
    fallbackAlt: "Videokamera på stativ foran et intervju med tre personer i et opplyst studio",
    fallbackFocal: [0.55, 0.6],
  },
  {
    slot: "tjeneste-3",
    group: "Forsiden, tjenester",
    label: "Tjenestekort 3, Digital markedsføring",
    ratio: "3:2",
    // Via Vika, bentoboks ovenfra: matinnhold i reklamestil
    fallback: "/portfolio/hospitality/via-vika-bento.webp",
    fallbackAlt: "Bentoboks med sushi, laks, edamame og soyasaus sett ovenfra",
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

  /*
    Videoproduksjon. Slot-navnet eventfilm-hero er beholdt fra den gamle
    eventfilmsiden, så et bilde som allerede er lastet opp blir stående.
  */
  {
    slot: "eventfilm-hero",
    group: "Videoproduksjon, oversikt",
    label: "Toppbilde",
    ratio: "bred",
    fallback: photo.epicStage,
    fallbackAlt: "Stillbilde fra eventfilm, scene og publikum",
  },

  ...PHOTO_SLOTS,
  ...VIDEO_SLOTS,
];

export const SLOT_BY_KEY = new Map(SLOTS.map((s) => [s.slot, s]));

/** Rekkefølgen gruppene vises i admin. */
export const SLOT_GROUPS = [...new Set(SLOTS.map((s) => s.group))];
