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

export interface Dictionary {
  meta: {
    siteName: string;
    home: { title: string; description: string };
    photo: { title: string; description: string };
    film: { title: string; description: string };
  };
  nav: {
    photo: string;
    film: string;
    about: string;
    contact: string;
    cta: string;
  };
  hero: {
    kicker: string;
    title: string;
    titleAccent: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    clientsLabel: string;
  };
  services: {
    label: string;
    heading: string;
    photo: {
      title: string;
      body: string[];
      link: string;
    };
    film: {
      title: string;
      body: string[];
      link: string;
    };
  };
  cases: {
    label: string;
    heading: string;
    lead: string;
    items: CaseItem[];
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
  contact: {
    label: string;
    heading: string;
    lead: string;
    emailLabel: string;
    cta: string;
    reply: string;
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
    approach: {
      label: string;
      heading: string;
      body: string[];
    };
    shotlist: {
      heading: string;
      body: string[];
    };
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
    craft: {
      label: string;
      heading: string;
      body: string[];
    };
    formats: {
      heading: string;
      items: { title: string; body: string }[];
    };
    galleryLabel: string;
    galleryHeading: string;
    caseHighlights: CaseItem[];
    faq: { label: string; heading: string; items: FaqItem[] };
    cta: { heading: string; lead: string };
  };
  ticker: { alt: string };
}
