import type { Locale } from "@/lib/i18n";
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
  /** URL-delen under /fotografering. Lik på begge språk, som /eventfoto. */
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
      no: "Pressebilder av forbundets utøvere, fotografert i studio med kontrollert lys.",
      en: "Press images of the federation's athletes, photographed in a studio with controlled light.",
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
      no: "Snapchats konferanse for annonsører, fotografert på Vulkan i Oslo og i Stockholm.",
      en: "Snapchat's conference for advertisers, photographed at Vulkan in Oslo and in Stockholm.",
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
      no: "Kjoler fotografert for nettbutikk og sosiale medier.",
      en: "Dresses photographed for the online store and social media.",
    },
  },
  {
    id: "awan",
    category: "fashion",
    client: "AWAN",
    project: { no: "Runway-visning", en: "Runway show" },
    context: {
      no: "Visningen fra catwalken, med modeller, antrekk og stemningen rundt.",
      en: "The show from the catwalk, with models, outfits and the atmosphere around it.",
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
    project: { no: "Vinskap på Sommerro og Hotel Continental", en: "Wine cabinets at Sommerro and Hotel Continental" },
    context: {
      no: "Vinskapene fotografert der de står, i to av Oslos mest kjente hotell.",
      en: "The wine cabinets photographed where they stand, in two of Oslo's best-known hotels.",
    },
  },
  {
    id: "via-vika",
    category: "interior",
    client: "Via Vika",
    project: { no: "Mathall og restaurant", en: "Food hall and restaurant" },
    context: {
      no: "Lokalet, servering og atmosfære i Via Vika.",
      en: "The space, the food and the atmosphere at Via Vika.",
    },
  },
  // Bil
  {
    id: "hongqi",
    category: "bil",
    client: "Hongqi",
    project: { no: "Innhold til sosiale medier", en: "Social media content" },
    context: {
      no: "Bilbilder på lokasjon for Hongqi i Norge, laget for sosiale medier.",
      en: "Cars on location for Hongqi in Norway, made for social media.",
    },
  },
  {
    id: "nio-foma",
    category: "bil",
    client: "NIO",
    project: { no: "Partnerkveld med FOMA", en: "Partner evening with FOMA" },
    context: {
      no: "Bilene og gjestene på NIOs partnerkveld sammen med FOMA.",
      en: "The cars and guests at NIO's partner evening with FOMA.",
    },
  },
  // Sport
  {
    id: "obos-3x3",
    category: "sport",
    client: "OBOS",
    project: { no: "Summer League Finals 3x3", en: "Summer League Finals 3x3" },
    context: {
      no: "Finalene i 3x3-basket, med kamp, publikum og premieutdeling.",
      en: "The 3x3 basketball finals, with games, crowd and the prize ceremony.",
    },
  },
  {
    id: "nkf-talent",
    category: "sport",
    client: "Norges Kampsportforbund",
    project: { no: "Talentsamlinger", en: "Talent camps" },
    context: {
      no: "Trening og utøvere på forbundets samlinger for unge talenter.",
      en: "Training and athletes at the federation's camps for young talents.",
    },
  },
  {
    id: "vpt",
    category: "sport",
    client: "VPT",
    project: { no: "Trening", en: "Training" },
    context: {
      no: "Trening og bevegelse, fotografert for bruk i sosiale medier og på nett.",
      en: "Training and movement, photographed for social media and the web.",
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
    ["snap-focus", 2],
  ],
} as const satisfies {
  hero: readonly [string, number];
  combo: readonly (readonly [string, number])[];
};

/** Flisen på oversiktssiden og toppbildet på kategorisiden. */
export function categorySlot(category: PhotoCategory): string {
  return `foto-kategori-${category.key}`;
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
    comboFilm: { no: "Se eventfilm", en: "See event film" },
  },
  category: {
    breadcrumb: { no: "Fotografering", en: "Photography" },
    deliver: { no: "Dette leverer vi", en: "What we deliver" },
    projects: { no: "Utvalgte prosjekter", en: "Selected projects" },
    more: { no: "Andre kategorier", en: "Other categories" },
    eventLink: {
      no: "Les mer om hvordan vi jobber med eventfoto",
      en: "Read more about how we work with event photography",
    },
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
