export type Locale = "no" | "en";

export const locales: Locale[] = ["no", "en"];
export const defaultLocale: Locale = "no";

export interface CaseItem {
  client: string;
  project: string;
  kind: string;
  context: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  body: string;
  promise: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface ServiceCard {
  title: string;
  body: string;
  points: string[];
  linkLabel: string;
  slug: "eventfoto" | "eventfilm" | "prosjekter";
}

export interface Dictionary {
  meta: {
    siteName: string;
    home: { title: string; description: string };
    photo: { title: string; description: string };
    film: { title: string; description: string };
    projects: { title: string; description: string };
    news: { title: string; description: string };
  };
  nav: {
    home: string;
    services: string;
    photo: string;
    photoSub: string;
    film: string;
    filmSub: string;
    projects: string;
    news: string;
    about: string;
    contact: string;
    cta: string;
  };
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    clientsLabel: string;
    polaroidBadge: string;
  };
  services: {
    label: string;
    heading: string;
    lead: string;
    cards: ServiceCard[];
  };
  liveOn: {
    label: string;
    heading: string;
    body: string[];
    points: string[];
    cta: string;
  };
  work: {
    label: string;
    heading: string;
    lead: string;
    cards: { title: string; sub: string; slug: "eventfoto" | "eventfilm" | "prosjekter" }[];
    linkLabel: string;
  };
  process: {
    label: string;
    heading: string;
    lead: string;
    steps: ProcessStep[];
    note: string;
  };
  about: {
    label: string;
    heading: string;
    body: string[];
    facts: { value: string; caption: string }[];
  };
  audience: {
    label: string;
    heading: string;
    lead: string;
    groups: { title: string; items: string[] }[];
  };
  contact: {
    label: string;
    heading: string;
    headingAccent: string;
    lead: string;
    photographerRole: string;
    stats: { value: string; caption: string }[];
    agenda: {
      label: string;
      confirmedLabel: string;
      openLabel: string;
      statusBooked: string;
      statusOpen: string;
      note: string;
    };
    form: {
      name: string;
      namePh: string;
      org: string;
      orgPh: string;
      email: string;
      emailPh: string;
      message: string;
      messageHint: string;
      messagePh: string;
      points: string[];
      submit: string;
    };
    direct: string;
    reply: string;
    emailLabel: string;
  };
  sticky: {
    available: string;
    cta: string;
  };
  footer: {
    tagline: string;
    rights: string;
    orgLabel: string;
  };
  photoPage: {
    kicker: string;
    title: string;
    lead: string;
    approach: { label: string; heading: string; body: string[] };
    shotlist: { heading: string; body: string[] };
    galleryLabel: string;
    galleryHeading: string;
    caseHighlights: CaseItem[];
    faq: { label: string; heading: string; items: FaqItem[] };
    cta: { heading: string; lead: string };
  };
  filmPage: {
    kicker: string;
    title: string;
    lead: string;
    craft: { label: string; heading: string; body: string[] };
    formats: { heading: string; items: { title: string; body: string }[] };
    galleryLabel: string;
    galleryHeading: string;
    caseHighlights: CaseItem[];
    faq: { label: string; heading: string; items: FaqItem[] };
    cta: { heading: string; lead: string };
  };
  projectsPage: {
    kicker: string;
    title: string;
    lead: string;
    filterAll: string;
    items: CaseItem[];
  };
  newsPage: {
    kicker: string;
    title: string;
    lead: string;
    readLabel: string;
    entries: { tag: string; title: string; body: string }[];
  };
  ticker: { alt: string };
}
