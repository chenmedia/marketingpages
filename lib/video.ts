import { localePath, type Locale } from "@/lib/i18n";
import { imageRef } from "@/lib/photography";
import type { ProjectImage } from "@/lib/photography-images";

/*
  Videoproduksjon: kategoriene og filmene som viser dem frem.

  Samme oppbygning som lib/photography.ts. Én kilde for /videoproduksjon,
  /videoproduksjon/[kategori] og lenkene rundt omkring på siden.

  SLIK LEGGER DU INN EN FILM
  Lim inn Vimeo-lenken i feltet `vimeo` på prosjektet, for eksempel
    vimeo: "https://vimeo.com/123456789"
  eller for en ulistet video, med koden etter siste skråstrek:
    vimeo: "https://vimeo.com/123456789/abcdef1234"
  Uten lenke vises bare stillbildet, uten play-knapp.

  Stillbildet (plakaten) har sin egen slot, video-<id>, og byttes i
  /admin/bilder. Standardbildet er lånt fra et fotooppdrag til et ekte
  stillbilde fra filmen er lastet opp.
*/

type Text = Record<Locale, string>;

export type VideoCategoryKey = "event" | "innhold" | "mat";

export interface VideoCategory {
  key: VideoCategoryKey;
  /** URL-delen under /videoproduksjon. Lik på begge språk. */
  slug: string;
  title: Text;
  teaser: Text;
  lead: Text;
  points: Record<Locale, string[]>;
}

export interface VideoProject {
  id: string;
  category: VideoCategoryKey;
  client: string;
  project: Text;
  context: Text;
  /** Vimeo-lenken. Tom til filmen er lagt inn. */
  vimeo?: string;
  /** Lånt standardbilde til plakaten: [prosjekt-id, bildenummer] i fotoutvalget */
  posterFallback: readonly [string, number];
}

export const VIDEO_CATEGORIES: VideoCategory[] = [
  {
    key: "event",
    slug: "event",
    title: { no: "Eventfilm", en: "Event film" },
    teaser: {
      no: "Konferanser, kick-offs og prisutdelinger. Filmer som får frem stemningen og budskapet.",
      en: "Conferences, kick-offs and award shows. Films that carry the atmosphere and the message.",
    },
    lead: {
      no: "En eventfilm skal gjøre mer enn å bevise at arrangementet fant sted. Vi fanger energien i rommet, intervjuer de rette folkene og klipper en film dere kan bruke lenge etter at lyset er slått av.",
      en: "An event film should do more than prove the event happened. We capture the energy in the room, interview the right people and cut a film you can use long after the lights go down.",
    },
    points: {
      no: ["Hovedfilm og korte klipp til SoMe", "Intervjuer og talking heads", "Lisensiert musikk, klarert for kanalene"],
      en: ["Main film and short cuts for social", "Interviews and talking heads", "Licensed music, cleared for your channels"],
    },
  },
  {
    key: "innhold",
    slug: "innholdsproduksjon",
    title: { no: "Innholdsproduksjon", en: "Content production" },
    teaser: {
      no: "Merkevare- og produktinnhold til nett, butikk og sosiale medier.",
      en: "Brand and product content for web, retail and social media.",
    },
    lead: {
      no: "Vi lager innhold som viser frem merkevaren der kundene faktisk ser den, fra skjermene i butikken til feeden på mobilen. Vi planlegger formatene på forhånd, så ett opptak gir mange flater.",
      en: "We make content that shows your brand where customers actually see it, from the screens in the store to the feed on their phone. We plan the formats up front, so one shoot covers many surfaces.",
    },
    points: {
      no: ["Idé, manus og regi", "Opptak og klipp i flere formater", "Bruk av eksisterende materiell"],
      en: ["Concept, script and direction", "Filming and editing in several formats", "Making the most of existing footage"],
    },
  },
  {
    key: "mat",
    slug: "mat-og-drikke",
    title: { no: "Mat og drikke", en: "Food & drink" },
    teaser: {
      no: "Promofilmer for restauranter, barer og mathaller.",
      en: "Promo films for restaurants, bars and food halls.",
    },
    lead: {
      no: "Mat og drikke skal se like godt ut på skjermen som på bordet. Vi filmer retter, folk og stemning, og klipper korte filmer som får folk til å ville komme innom.",
      en: "Food and drink should look as good on screen as on the table. We film dishes, people and atmosphere, and cut short films that make people want to drop by.",
    },
    points: {
      no: ["Retter og detaljer", "Stemning og folk", "Korte formater til SoMe og annonser"],
      en: ["Dishes and details", "Atmosphere and people", "Short formats for social and ads"],
    },
  },
];

export const VIDEO_PROJECTS: VideoProject[] = [
  // Event
  {
    id: "norway-unlocked",
    category: "event",
    client: "Norway Unlocked",
    project: { no: "Eventfilm", en: "Event film" },
    context: {
      no: "Film fra arrangementet, med stemning, scene og folkene som var der.",
      en: "A film from the event, with the atmosphere, the stage and the people who were there.",
    },
    vimeo: "",
    posterFallback: ["obf", 3],
  },
  {
    id: "aktiv-kickoff",
    category: "event",
    client: "Aktiv Eiendomsmegling",
    project: { no: "Kick-off", en: "Kick-off" },
    context: {
      no: "Kick-off-film som samler energien fra dagen i én film til hele organisasjonen.",
      en: "A kick-off film that gathers the energy of the day into one film for the whole organisation.",
    },
    vimeo: "",
    posterFallback: ["obf", 2],
  },
  {
    id: "av-og-til",
    category: "event",
    client: "Av-og-til",
    project: { no: "Konferansefilm", en: "Conference film" },
    context: {
      no: "Film fra konferansen, med innlegg, salen og budskapet i sentrum.",
      en: "A film from the conference, with the talks, the hall and the message at the centre.",
    },
    vimeo: "",
    posterFallback: ["snap-focus", 3],
  },
  {
    id: "ignite-procurement",
    category: "event",
    client: "Ignite Procurement",
    project: { no: "Talking heads", en: "Talking heads" },
    context: {
      no: "Intervjufilmer der folkene forteller med egne ord.",
      en: "Interview films where people tell the story in their own words.",
    },
    vimeo: "",
    posterFallback: ["snap-focus", 4],
  },
  {
    id: "oda-partner",
    category: "event",
    client: "ODA-nettverket",
    project: { no: "Partnerfilm", en: "Partner film" },
    context: {
      no: "Film som viser frem partnerne i ODA-nettverket.",
      en: "A film showcasing the partners in the ODA network.",
    },
    vimeo: "",
    posterFallback: ["obf", 4],
  },
  {
    id: "oda-awards",
    category: "event",
    client: "ODA Awards",
    project: { no: "Vinnerfilm", en: "Winner film" },
    context: {
      no: "Film om vinneren, laget for å vises under prisutdelingen.",
      en: "A film about the winner, made to be shown at the award ceremony.",
    },
    vimeo: "",
    posterFallback: ["snap-focus", 1],
  },
  // Innholdsproduksjon
  {
    id: "bergans",
    category: "innhold",
    client: "Bergans",
    project: { no: "Shop-in-shop", en: "Shop-in-shop" },
    context: {
      no: "Innhold til Bergans' shop-in-shop-flater i butikk.",
      en: "Content for Bergans' shop-in-shop displays in stores.",
    },
    vimeo: "",
    posterFallback: ["awan", 1],
  },
  // Mat og drikke
  {
    id: "via-village",
    category: "mat",
    client: "Via Village",
    project: { no: "Promofilm", en: "Promo film" },
    context: {
      no: "Promofilm for mathallen, med retter, baren og folk rundt bordene.",
      en: "A promo film for the food hall, with dishes, the bar and people around the tables.",
    },
    vimeo: "",
    posterFallback: ["via-vika", 2],
  },
];

/* ---------- Oppslag ---------- */

export const VIDEO_BASE_PATH = "/videoproduksjon";

export function videoCategoryPath(category: VideoCategory): string {
  return `${VIDEO_BASE_PATH}/${category.slug}`;
}

export function videoCategoryBySlug(slug: string): VideoCategory | undefined {
  return VIDEO_CATEGORIES.find((c) => c.slug === slug);
}

export function videoProjectsIn(key: VideoCategoryKey): VideoProject[] {
  return VIDEO_PROJECTS.filter((p) => p.category === key);
}

/** Plakaten til en film. */
export function videoPosterSlot(project: VideoProject): string {
  return `video-${project.id}`;
}

/** Flisen på oversiktssiden. */
export function videoCategorySlot(category: VideoCategory): string {
  return `video-kategori-${category.key}`;
}

export function videoPosterFallback(project: VideoProject): ProjectImage | undefined {
  return imageRef(project.posterFallback[0], project.posterFallback[1]);
}

/*
  Leser en Vimeo-lenke. Godtar vimeo.com/123, vimeo.com/123/hash,
  player.vimeo.com/video/123?h=hash og varianter med /showcase eller
  /channels foran. Gir undefined for alt annet, så en feilskrevet lenke
  bare betyr «ingen play-knapp» i stedet for en ødelagt side.
*/
export function parseVimeo(url: string | undefined): { id: string; hash?: string } | undefined {
  if (!url) return undefined;
  let parsed: URL;
  try {
    parsed = new URL(url.trim());
  } catch {
    return undefined;
  }
  if (!/(^|\.)vimeo\.com$/.test(parsed.hostname)) return undefined;
  const parts = parsed.pathname.split("/").filter(Boolean);
  const index = parts.findIndex((p) => /^\d+$/.test(p));
  if (index === -1) return undefined;
  const id = parts[index];
  const next = parts[index + 1];
  const hash = parsed.searchParams.get("h") ?? (next && /^[a-f0-9]+$/i.test(next) ? next : undefined);
  return { id, hash: hash ?? undefined };
}

/** Kategoriene som fliser, klare for CategoryGrid. */
export function videoTiles(locale: Locale, categories = VIDEO_CATEGORIES) {
  return categories.map((c) => ({
    key: c.key,
    title: c.title[locale],
    teaser: c.teaser[locale],
    href: localePath(locale, videoCategoryPath(c)),
    slot: videoCategorySlot(c),
  }));
}

export const VIDEO_UI = {
  nav: { no: "Videoproduksjon", en: "Video production" },
  navSub: {
    no: "Eventfilm, innholdsproduksjon og mat og drikke",
    en: "Event film, content production and food & drink",
  },
  meta: {
    title: {
      no: "Videoproduksjon for merkevarer og bedrifter | Chen Media",
      en: "Video production for brands and companies | Chen Media",
    },
    description: {
      no: "Eventfilm, innholdsproduksjon og promofilm for mat og drikke. Idé, opptak og klipp fra ett team i Oslo.",
      en: "Event films, content production and promo films for food and drink. Concept, filming and editing from one team in Oslo.",
    },
  },
  hub: {
    kicker: { no: "Videoproduksjon i Oslo", en: "Video production in Oslo" },
    title: {
      no: "Video som får frem stemningen og budskapet",
      en: "Video that carries the atmosphere and the message",
    },
    lead: {
      no: "Fra konferansefilm og intervjuer til innhold for butikk og sosiale medier. Vi planlegger, filmer og klipper, og leverer filmer klare til bruk i kanalene dere faktisk publiserer i.",
      en: "From conference films and interviews to content for retail and social media. We plan, film and edit, and deliver films ready for the channels you actually publish in.",
    },
    cta: { no: "Få tilbud på video", en: "Get a video quote" },
    categoriesLabel: { no: "Kategorier", en: "Categories" },
    categoriesHeading: {
      no: "Våre tjenester innen videoproduksjon",
      en: "Our video production services",
    },
    categoriesBody: {
      no: "Hver film planlegges etter hvor den skal vises og hva den skal oppnå. Velg kategorien som passer, og se filmer vi har laget.",
      en: "Every film is planned around where it will be shown and what it needs to achieve. Pick the category that fits and see films we have made.",
    },
    seeMore: { no: "Se mer", en: "See more" },
    comboLabel: { no: "Foto og video samme dag", en: "Photo and video on the same day" },
    comboHeading: {
      no: "Ett produksjonsteam, to leveranser",
      en: "One production team, two deliveries",
    },
    comboBody: {
      no: "Trenger dere også bilder, tar vi foto og video fra samme produksjonsdag. Det gir et bilde- og videobibliotek som henger sammen visuelt, uten at dere må koordinere to separate produksjoner.",
      en: "If you also need photos, we shoot photo and video on the same production day. You get a photo and video library that hangs together visually, without coordinating two separate productions.",
    },
    comboCta: { no: "Be om kombinert tilbud", en: "Ask for a combined quote" },
    comboPhoto: { no: "Se fotografering", en: "See photography" },
  },
  category: {
    breadcrumb: { no: "Videoproduksjon", en: "Video production" },
    deliver: { no: "Dette leverer vi", en: "What we deliver" },
    projects: { no: "Utvalgte filmer", en: "Selected films" },
    more: { no: "Andre kategorier", en: "Other categories" },
    play: { no: "Spill av film", en: "Play film" },
    cta: {
      heading: { no: "Fortell oss om filmen dere trenger", en: "Tell us about the film you need" },
      lead: {
        no: "Ta kontakt for en uforpliktende prat. Kai svarer personlig, som regel innen én virkedag, med et konkret forslag.",
        en: "Get in touch for a no-obligation chat. Kai replies personally, usually within one working day, with a concrete proposal.",
      },
    },
  },
} as const;
