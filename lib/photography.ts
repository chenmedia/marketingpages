import { localePath, type Locale } from "@/lib/i18n";
import { PROJECT_IMAGES, type ProjectImage } from "@/lib/photography-images";

/*
  Fotograferingstjenestene og prosjektene som viser dem frem.

  Én kilde for /fotografering, /fotografering/[kategori] og /prosjekter.
  Tekst på begge språk står side om side her, i stedet for i de fire
  ordbøkene. Da trenger ikke TON-varianten (no.ton.ts) sin egen kopi av
  hvert prosjekt, og et prosjekt legges til ett sted.

  Bildene til hvert prosjekt ligger i public/portfolio/<kategori>/ og er
  beskrevet i lib/photography-images.ts (alt-tekst, fokuspunkt, format).
  Hvert bilde har sin egen slot, så det kan byttes i /admin/bilder.
*/

type Text = Record<Locale, string>;

export type CategoryKey =
  | "studio"
  | "event"
  | "fashion"
  | "interior"
  | "bil"
  | "sport";

export interface PhotoCategory {
  key: CategoryKey;
  /** URL-delen under /fotografering. Lik på begge språk. */
  slug: string;
  title: Text;
  /** Én linje under flisen på oversiktssiden */
  teaser: Text;
  /** Ingress på kategorisiden */
  lead: Text;
  /** Tre korte punkter om hva vi leverer */
  points: Record<Locale, string[]>;
}

export interface PhotoProject {
  id: string;
  category: CategoryKey;
  client: string;
  project: Text;
  context: Text;
}

export const PHOTO_CATEGORIES: PhotoCategory[] = [
  {
    key: "studio",
    slug: "kampanje-og-studio",
    title: {
      no: "Kampanje- og studiofotografering",
      en: "Campaign & studio photography",
    },
    teaser: {
      no: "Pressebilder, kampanjer og personlig merkevare. Kontrollert lys, tydelig uttrykk.",
      en: "Press images, campaigns and personal branding. Controlled light, a clear look.",
    },
    lead: {
      no: "Når bildet skal bære en kampanje, en lansering eller en person, tar vi kontroll over lyset. Vi planlegger uttrykket sammen med dere, rigger studio der det passer, og leverer en serie som fungerer på nett, i presse og på trykk.",
      en: "When an image has to carry a campaign, a launch or a person, we take control of the light. We plan the look with you, set up a studio where it suits, and deliver a series that works online, in the press and in print.",
    },
    points: {
      no: ["Planlegging av uttrykk og bildeliste", "Mobilt studio eller på lokasjon", "Retusjerte bilder klare til bruk"],
      en: ["Planning the look and shot list", "Mobile studio or on location", "Retouched images, ready to use"],
    },
  },
  {
    key: "event",
    slug: "event",
    title: { no: "Eventfotografering", en: "Event photography" },
    teaser: {
      no: "Konferanser, messer, kick-offs og festivaler. Øyeblikkene som forteller hvordan det var.",
      en: "Conferences, trade shows, kick-offs and festivals. The moments that show what it was like.",
    },
    lead: {
      no: "Fra frokostmøter til de største scenene i Oslo. Vi jobber etter en bildeliste vi har avtalt på forhånd, beveger oss uten å forstyrre, og leverer til tiden vi har avtalt.",
      en: "From breakfast meetings to the biggest stages in Oslo. We work from a shot list agreed in advance, move without getting in the way, and deliver at the time we agreed.",
    },
    points: {
      no: ["Avtalt bildeliste før dagen", "Levering til avtalt tid", "Scene, publikum, partnere og detaljer"],
      en: ["Shot list agreed before the day", "Delivery at the agreed time", "Stage, audience, partners and details"],
    },
  },
  {
    key: "fashion",
    slug: "fashion-og-ecommerce",
    title: { no: "Fashion og eCommerce", en: "Fashion & eCommerce" },
    teaser: {
      no: "Lookbook, kampanje, runway og produktbilder for nettbutikk.",
      en: "Lookbooks, campaigns, runway and product images for online stores.",
    },
    lead: {
      no: "Klær skal se ut som de kjennes. Vi fotograferer kolleksjoner, kampanjer og visninger med blikk for snitt, stoff og bevegelse, og leverer bilder som passer både sosiale medier og nettbutikken.",
      en: "Clothes should look the way they feel. We photograph collections, campaigns and shows with an eye for cut, fabric and movement, and deliver images that suit both social media and the online store.",
    },
    points: {
      no: ["Lookbook og kampanje", "Runway og visninger", "Formater for nettbutikk og SoMe"],
      en: ["Lookbook and campaign", "Runway and shows", "Formats for online store and social"],
    },
  },
  {
    key: "interior",
    slug: "interior-og-eiendom",
    title: { no: "Interiør og eiendom", en: "Interiors & real estate" },
    teaser: {
      no: "Rom, materialer og atmosfære. For hotell, restaurant, eiendom og interiør.",
      en: "Space, materials and atmosphere. For hotels, restaurants, property and interiors.",
    },
    lead: {
      no: "Et rom skal se like godt ut på bildet som når du står i det. Vi jobber med rette linjer, naturlig lys og detaljene som gir stedet karakter, for hotell, restauranter, eiendom og interiørleverandører.",
      en: "A room should look as good in the picture as it does in person. We work with straight lines, natural light and the details that give a place its character, for hotels, restaurants, property and interior suppliers.",
    },
    points: {
      no: ["Rette linjer og riktige farger", "Oversikt og detaljer", "Til nettside, prospekt og SoMe"],
      en: ["Straight lines, true colours", "Overview and details", "For website, brochure and social"],
    },
  },
  {
    key: "bil",
    slug: "bil",
    title: { no: "Bilfotografering", en: "Automotive photography" },
    teaser: {
      no: "Bilen i miljø, i detalj og i bruk. For importører, forhandlere og lanseringer.",
      en: "The car in context, in detail and in use. For importers, dealers and launches.",
    },
    lead: {
      no: "Bilbilder handler om linjer, refleksjoner og stemning. Vi fotograferer biler på lokasjon og på lanseringer, med bilder som viser både design og hvordan bilen passer inn i livet til kjøperen.",
      en: "Car photography is about lines, reflections and mood. We photograph cars on location and at launches, with images that show both the design and how the car fits into the buyer's life.",
    },
    points: {
      no: ["Lokasjon og miljøbilder", "Detaljer og interiør", "Innhold til SoMe og annonser"],
      en: ["Location and lifestyle shots", "Details and interior", "Content for social and ads"],
    },
  },
  {
    key: "sport",
    slug: "sport",
    title: { no: "Sportsfotografering", en: "Sports photography" },
    teaser: {
      no: "Kamp, trening og utøvere. Fart og intensitet, fanget i riktig øyeblikk.",
      en: "Games, training and athletes. Speed and intensity, caught at the right moment.",
    },
    lead: {
      no: "Sport skjer fort, og det beste bildet varer et brøkdels sekund. Vi fotograferer kamper, treninger og utøvere for forbund, ligaer og merkevarer, og leverer bilder som får frem intensiteten.",
      en: "Sport happens fast, and the best image lasts a fraction of a second. We photograph games, training and athletes for federations, leagues and brands, and deliver images that bring out the intensity.",
    },
    points: {
      no: ["Kamp og turnering", "Trening og utøverportretter", "Formater for presse og SoMe"],
      en: ["Games and tournaments", "Training and athlete portraits", "Formats for press and social"],
    },
  },
];

export const PHOTO_PROJECTS: PhotoProject[] = [
  // Kampanje og studio
  {
    id: "nkf-studio",
    category: "studio",
    client: "Norges Kampsportforbund",
    project: { no: "Pressebilder i studio", en: "Studio press images" },
    context: {
      no: "Pressebilder av utøvere fra flere kampsporter, med spark, kast og rød stoffbakgrunn i studio.",
      en: "Press images of athletes from several martial arts, with kicks, throws and a red fabric backdrop in the studio.",
    },
  },
  {
    id: "ellen-aabol",
    category: "studio",
    client: "Ellen Aabol",
    project: { no: "Personlig merkevare", en: "Personal branding" },
    context: {
      no: "En bildeserie til nettside og sosiale medier, laget for å bygge en personlig merkevare.",
      en: "A series of images for website and social media, made to build a personal brand.",
    },
  },
  // Event
  {
    id: "obf",
    category: "event",
    client: "Oslo Business Forum",
    project: { no: "Konferanse og expo", en: "Conference and expo" },
    context: {
      no: "En av Nordens største lederkonferanser. Scene, sal, expo og partnere gjennom hele dagen.",
      en: "One of the largest leadership conferences in the Nordics. Stage, hall, expo and partners all day.",
    },
  },
  {
    id: "snap-focus",
    category: "event",
    client: "Snapchat",
    project: { no: "Snap Focus, Oslo og Stockholm", en: "Snap Focus, Oslo and Stockholm" },
    context: {
      no: "Snapchats konferanse for annonsører og skapere, med scene, workshops og spørsmål fra salen.",
      en: "Snapchat's conference for advertisers and creators, with stage, workshops and questions from the floor.",
    },
  },
  {
    id: "slottsfjell",
    category: "event",
    client: "Slottsfjell",
    project: { no: "Festival", en: "Festival" },
    context: {
      no: "Konserter, publikum og festivalstemning på en av Norges største musikkfestivaler.",
      en: "Concerts, crowds and festival atmosphere at one of Norway's biggest music festivals.",
    },
  },
  // Fashion og eCommerce
  {
    id: "handmadedresses",
    category: "fashion",
    client: "Handmade Dresses Oslo",
    project: { no: "Kolleksjon", en: "Collection" },
    context: {
      no: "Brudekjoler og selskapskjoler fotografert ute i byen, i blonder, tyll, perler og sateng.",
      en: "Bridal and evening dresses photographed around the city, in lace, tulle, pearls and satin.",
    },
  },
  {
    id: "awan",
    category: "fashion",
    client: "AWAN",
    project: { no: "Runway-visning", en: "Runway show" },
    context: {
      no: "Modeller og antrekk fra visningen, fotografert i en rå industrihall.",
      en: "Models and outfits from the show, photographed in a raw industrial hall.",
    },
  },
  {
    id: "shaping-new-tomorrow",
    category: "fashion",
    client: "Shaping New Tomorrow",
    project: { no: "Kampanje med David", en: "Campaign with David" },
    context: {
      no: "Kampanjebilder for klesmerket, med fokus på passform og hverdagsbruk.",
      en: "Campaign images for the clothing brand, focused on fit and everyday wear.",
    },
  },
  // Interiør og eiendom
  {
    id: "wineandbarrels",
    category: "interior",
    client: "Wine and Barrels",
    project: { no: "Vinvegger og vinrom", en: "Wine walls and wine rooms" },
    context: {
      no: "Vinvegger og vinrom fotografert der de står, blant annet på Sommerro og Hotel Continental.",
      en: "Wine walls and wine rooms photographed where they stand, including at Sommerro and Hotel Continental.",
    },
  },
  {
    id: "via-vika",
    category: "interior",
    client: "Via Village",
    project: { no: "Mathall og bar", en: "Food hall and bar" },
    context: {
      no: "Baren, de lange bordene under lysslyngene og stemningen når mathallen er full.",
      en: "The bar, the long tables under the string lights and the buzz when the food hall is full.",
    },
  },
  // Bil
  {
    id: "hongqi",
    category: "bil",
    client: "Hongqi",
    project: { no: "Innhold til sosiale medier", en: "Social media content" },
    context: {
      no: "Hongqi EHS7 fotografert på lokasjon i Oslo, med helhet, linjer og detaljer til sosiale medier.",
      en: "The Hongqi EHS7 photographed on location in Oslo, with the full car, its lines and details for social media.",
    },
  },
  {
    id: "nio-foma",
    category: "bil",
    client: "NIO",
    project: { no: "Partnerkveld med FOMA", en: "Partner evening with FOMA" },
    context: {
      no: "Bilene og gjestene i NIO House på Karl Johan, under partnerkvelden sammen med FOMA.",
      en: "The cars and guests at NIO House on Karl Johan, during the partner evening with FOMA.",
    },
  },
  // Sport
  {
    id: "obos-3x3",
    category: "sport",
    client: "OBOS",
    project: { no: "Summer League Finals 3x3", en: "Summer League Finals 3x3" },
    context: {
      no: "Finalene i 3x3-basket, med drivs mot kurven, returkamper og jubel på banen.",
      en: "The 3x3 basketball finals, with drives to the basket, rebounds and celebrations on court.",
    },
  },
  {
    id: "nkf-talent",
    category: "sport",
    client: "Norges Kampsportforbund",
    project: { no: "Talentsamlinger", en: "Talent camps" },
    context: {
      no: "Unge utøvere på matta, med sparring, drill og trenere på forbundets talentsamlinger.",
      en: "Young athletes on the mats, with sparring, drills and coaches at the federation's talent camps.",
    },
  },
  {
    id: "vpt",
    category: "sport",
    client: "VPT",
    project: { no: "Padelturnering", en: "Padel tournament" },
    context: {
      no: "Kamper, jubel og lagbilde fra en innendørs padelturnering.",
      en: "Matches, celebrations and a group photo from an indoor padel tournament.",
    },
  },
];

/* ---------- Oppslag ---------- */

export const PHOTO_BASE_PATH = "/fotografering";

export function categoryPath(category: PhotoCategory): string {
  return `${PHOTO_BASE_PATH}/${category.slug}`;
}

export function categoryBySlug(slug: string): PhotoCategory | undefined {
  return PHOTO_CATEGORIES.find((c) => c.slug === slug);
}

export function categoryByKey(key: CategoryKey): PhotoCategory {
  const category = PHOTO_CATEGORIES.find((c) => c.key === key);
  if (!category) throw new Error(`Ukjent fotokategori: ${key}`);
  return category;
}

export function projectsIn(key: CategoryKey): PhotoProject[] {
  return PHOTO_PROJECTS.filter((p) => p.category === key);
}

/** Bildene til et prosjekt, med første bilde som cover. */
export function projectImages(project: PhotoProject): ProjectImage[] {
  return PROJECT_IMAGES[project.id] ?? [];
}

/** Slot-navnet til bilde nummer n (1 = cover) i et prosjekt. */
export function projectSlot(project: PhotoProject, n: number): string {
  return `foto-${project.id}-${n}`;
}

/** Ett bestemt bilde i et prosjekt. n = 1 er cover. */
export function imageRef(projectId: string, n: number): ProjectImage | undefined {
  return PROJECT_IMAGES[projectId]?.[n - 1];
}

/*
  Hvilke prosjektbilder oversiktssiden låner som standard. Byttes i
  /admin/bilder uten kodeendring.
*/
export const HUB_IMAGES = {
  hero: ["obf", 1],
  combo: [
    ["slottsfjell", 2],
    ["snap-focus", 3],
  ],
} as const satisfies {
  hero: readonly [string, number];
  combo: readonly (readonly [string, number])[];
};

/** Flisen på oversiktssiden. */
export function categorySlot(category: PhotoCategory): string {
  return `foto-kategori-${category.key}`;
}

/** Det høye toppbildet på kategorisiden. */
export function categoryHeroSlot(category: PhotoCategory): string {
  return `foto-kategori-${category.key}-topp`;
}

/*
  Standardbildet til toppen av kategorisiden. Første stående bilde som ikke
  er et cover, så toppen ikke viser det samme bildet som første prosjekt
  rett under. Finnes ikke det, tas første stående bilde, ellers bilde to.
*/
export function categoryHeroImage(key: CategoryKey): ProjectImage | undefined {
  const all = projectsIn(key).flatMap((p) =>
    projectImages(p).map((image, i) => ({ image, isCover: i === 0 }))
  );
  const portrait = (x: { image: ProjectImage }) => x.image.height > x.image.width;
  return (
    all.find((x) => portrait(x) && !x.isCover) ??
    all.find(portrait) ??
    all.find((x) => !x.isCover) ??
    all[0]
  )?.image;
}

/** Kategoriene som fliser, klare for CategoryGrid. */
export function photoTiles(locale: Locale, categories = PHOTO_CATEGORIES) {
  return categories.map((c) => ({
    key: c.key,
    title: c.title[locale],
    teaser: c.teaser[locale],
    href: localePath(locale, categoryPath(c)),
    slot: categorySlot(c),
  }));
}

/** Overskrifter og knapper som går igjen på fotosidene. */
export const PHOTO_UI = {
  nav: { no: "Fotografering", en: "Photography" },
  navSub: {
    no: "Kampanje, event, fashion, interiør, bil og sport",
    en: "Campaign, event, fashion, interiors, cars and sport",
  },
  hubMeta: {
    title: {
      no: "Fotografering for merkevarer og bedrifter | Chen Media",
      en: "Photography for brands and companies | Chen Media",
    },
    description: {
      no: "Kampanje- og studiofoto, event, fashion og eCommerce, interiør, bil og sport. Fotograf i Oslo, med levering til avtalt tid.",
      en: "Campaign and studio, events, fashion and eCommerce, interiors, cars and sport. Photographer in Oslo, delivering at the agreed time.",
    },
  },
  hub: {
    kicker: { no: "Fotograf i Oslo", en: "Photographer in Oslo" },
    title: {
      no: "Fotografering for merkevarer og bedrifter",
      en: "Photography for brands and companies",
    },
    lead: {
      no: "Enten dere trenger kampanjebilder, bilder fra et arrangement eller en ny bildebank til nettsiden, planlegger vi, fotograferer og leverer ferdig redigerte bilder klare til bruk.",
      en: "Whether you need campaign images, photos from an event or a new image bank for your website, we plan, shoot and deliver fully edited images, ready to use.",
    },
    cta: { no: "Få tilbud på foto", en: "Get a photo quote" },
    categoriesLabel: { no: "Kategorier", en: "Categories" },
    categoriesHeading: {
      no: "Våre tjenester innen fotografering",
      en: "Our photography services",
    },
    categoriesBody: {
      no: "Hvert oppdrag planlegges etter hva dere skal bruke bildene til, enten det er en halv dag med portretter eller en kampanje over flere dager. Velg kategorien som passer, og se eksempler fra oppdrag vi har gjort.",
      en: "Every job is planned around what you will use the images for, whether that is half a day of portraits or a campaign over several days. Pick the category that fits and see examples from jobs we have done.",
    },
    seeMore: { no: "Se mer", en: "See more" },
    comboLabel: { no: "Foto og video samme dag", en: "Photo and video on the same day" },
    comboHeading: {
      no: "Ett produksjonsteam, to leveranser",
      en: "One production team, two deliveries",
    },
    comboBody: {
      no: "Trenger dere både bilder og film, leverer vi begge fra samme produksjonsdag. Det gir et bilde- og videobibliotek som henger sammen visuelt, uten at dere må koordinere to separate produksjoner.",
      en: "If you need both photos and film, we deliver both from the same production day. You get a photo and video library that hangs together visually, without coordinating two separate productions.",
    },
    comboCta: { no: "Be om kombinert tilbud", en: "Ask for a combined quote" },
    comboFilm: { no: "Se videoproduksjon", en: "See video production" },
  },
  category: {
    breadcrumb: { no: "Fotografering", en: "Photography" },
    deliver: { no: "Dette leverer vi", en: "What we deliver" },
    projects: { no: "Utvalgte prosjekter", en: "Selected projects" },
    more: { no: "Andre kategorier", en: "Other categories" },
    cta: {
      heading: {
        no: "Fortell oss om prosjektet deres",
        en: "Tell us about your project",
      },
      lead: {
        no: "Ta kontakt for en uforpliktende prat. Kai svarer personlig, som regel innen én virkedag, med et konkret forslag.",
        en: "Get in touch for a no-obligation chat. Kai replies personally, usually within one working day, with a concrete proposal.",
      },
    },
  },
} as const;
