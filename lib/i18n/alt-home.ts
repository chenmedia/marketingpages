import type { Locale } from "./types";

/*
  Teksten til den alternative forsiden (app/[locale]/alternativ).

  Den ligger her og ikke i Dictionary med vilje. Dictionary fylles av fire
  filer — no, en, no.ton, en.ton — og en utforskning som kanskje aldri
  publiseres skal ikke tvinge fram tekst i TON-variantene også. Blir den
  alternative forsiden den faktiske forsiden, flyttes feltene herfra inn i
  Dictionary, og denne filen forsvinner.

  Se docs/alternativ-forside.md for hva utforskningen prøver ut og hva som
  gjenstår før den kan publiseres.
*/

/** Ett av de fire fagområdene. `href` peker på en eksisterende dybdeside, der en finnes. */
export interface AltArea {
  /** Ankeret seksjonen får på siden, «foto» -> #foto */
  id: string;
  number: string;
  title: string;
  /** Kort undertittel, står under nummeret i oversiktskortet */
  tagline: string;
  body: string;
  /** Tjenestene under fagområdet. Dette er listen forsiden finnes for. */
  points: string[];
  /** Lenke til dybdesiden som allerede finnes, om den gjør det */
  link?: { href: string; label: string };
}

export interface AltHome {
  meta: { title: string; description: string };
  /** Båndet på toppen som sier at siden er et utkast */
  draft: { label: string; note: string; back: string };
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    crewLabel: string;
    indexLabel: string;
  };
  areas: {
    label: string;
    heading: string;
    lead: string;
    /** «5 tjenester» — {n} byttes med antall punkter */
    countLabel: string;
    readLabel: string;
  };
  list: AltArea[];
  retainer: {
    label: string;
    heading: string;
    body: string[];
    points: string[];
    cta: string;
  };
  process: {
    label: string;
    heading: string;
    lead: string;
    steps: { number: string; title: string; body: string; promise: string }[];
    note: string;
  };
  audience: {
    label: string;
    heading: string;
    lead: string;
    groups: { title: string; items: string[] }[];
  };
  about: {
    label: string;
    heading: string;
    body: string[];
    facts: { value: string; caption: string }[];
  };
  contact: { heading: string; lead: string };
  clientsLabel: string;
  tickerAlt: string;
}

const no: AltHome = {
  meta: {
    title: "Alternativ forside (utkast) | Chen Media",
    description:
      "Utkast til ny forside: fotografering, videoproduksjon, merkevare og innhold, og kreativ produksjon som fire fagområder.",
  },
  draft: {
    label: "Utkast",
    note: "Alternativ forside. Ikke publisert, ikke indeksert.",
    back: "Se dagens forside",
  },
  hero: {
    badge: "Foto, film og innhold · Oslo og hele Norge",
    title: "Vi lager innholdet merkevaren din lever",
    titleAccent: "av.",
    lead:
      "Fire fagområder under samme tak: fotografering, videoproduksjon, merkevare og innhold, og kreativ produksjon.\nÉn partner fra første idé til ferdig publisert.",
    ctaPrimary: "Be om et uforpliktende tilbud",
    ctaSecondary: "Se fagområdene",
    crewLabel:
      "En fotograf/videograf, eller med et komplett team når produksjonen krever det.",
    indexLabel: "Fagområdene",
  },
  areas: {
    label: "Hva vi gjør",
    heading: "Fire fagområder, én leveranse",
    lead:
      "Du kan hente oss inn på ett av dem. De fleste oppdager etter hvert at de henger sammen.",
    countLabel: "{n} tjenester",
    readLabel: "Les mer",
  },
  list: [
    {
      id: "foto",
      number: "01",
      title: "Fotografering",
      tagline: "Studio og lokasjon",
      body:
        "Stillbilder som holder i alle flater — kampanje, katalog, sosiale medier og trykk. Vi rigger studio når motivet krever kontroll, og drar ut når det krever kontekst.",
      points: [
        "Kampanje- og studiofotografering",
        "Event- og arrangementsfotografering",
        "Fashion og lifestyle",
        "Næring og interiør",
        "Bilfoto og sport",
      ],
      link: { href: "/eventfoto", label: "Mer om event- og arrangementsfoto" },
    },
    {
      id: "video",
      number: "02",
      title: "Videoproduksjon",
      tagline: "Idé, opptak og klipp",
      body:
        "Film laget for kanalen den skal leve i. Vi tar hele veien fra konsept og regi til ferdig klippet materiale — eller går inn akkurat der dere trenger oss.",
      points: [
        "Kampanje- og merkevarefilm",
        "Event- og arrangementsfilm",
        "Idéutvikling og regi",
        "Sosiale medier (Instagram, TikTok og Snap)",
        "Annonsevideoer",
        "Postproduksjon",
        "Testimonials",
        "Talking heads",
      ],
      link: { href: "/eventfilm", label: "Mer om event- og arrangementsfilm" },
    },
    {
      id: "innhold",
      number: "03",
      title: "Merkevare og innhold",
      tagline: "Løpende, ikke bare én gang",
      body:
        "Innhold er sjelden ett oppdrag. Vi planlegger, produserer og distribuerer i faste sykluser, så kanalene deres har noe å publisere hver uke — ikke bare etter neste store event.",
      points: [
        "Månedlig innholdsproduksjon",
        "Innholdsplan og kanalstrategi",
        "Distribusjon av innhold",
        "Kreativer til annonser",
      ],
    },
    {
      id: "produksjon",
      number: "04",
      title: "Kreativ produksjon",
      tagline: "Produsent og koordinator",
      body:
        "Noen ganger er ikke kamera det dere trenger mest. Vi tar produsentrollen i kreative produksjoner: planen, folkene, budsjettet og alle leddene som må klaffe på opptaksdagen.",
      // NB: punktene under er et forslag. Kai må bekrefte hva han faktisk tar på seg.
      points: [
        "Produsentrolle og prosjektledelse",
        "Koordinering av crew og leverandører",
        "Casting, lokasjon og booking",
        "Produksjonsplan, budsjett og fremdrift",
        "Rettigheter, klarering og leveranseformater",
      ],
    },
  ],
  retainer: {
    label: "Måten å jobbe på",
    heading: "Fra enkeltoppdrag til fast innholdspartner.",
    body: [
      "Et oppdrag gir dere innhold til noen uker. Så er kanalene tomme igjen, og neste produksjon settes opp fra null: ny brief, nytt crew, ny tone.",
      "Den faste avtalen løser det. Vi legger en innholdsplan sammen, produserer i faste sykluser og leverer ferdige filer i formatene kanalene krever. Dere slipper å bestille innhold — det kommer.",
    ],
    points: [
      "Fast månedlig produksjonsdag",
      "Innholdsplan per kanal, avtalt på forhånd",
      "Samme visuelle uttrykk over tid",
      "Kjent pris, ingen tilbudsrunde per oppdrag",
    ],
    cta: "Slik jobber vi",
  },
  process: {
    label: "Prosessen",
    heading: "Slik jobber vi",
    // NB: løftene under er utgangspunkt. Kai justerer dem til det han faktisk lover.
    lead: "Fire steg, uansett hvilket fagområde du henter oss inn på.",
    steps: [
      {
        number: "01",
        title: "Kartlegging",
        body:
          "Vi går gjennom mål, kanaler og innholdet dere allerede har. Så sier vi hva som mangler, og hva som er verdt å lage først.",
        promise: "Kai svarer personlig innen én virkedag",
      },
      {
        number: "02",
        title: "Konsept og plan",
        body:
          "Idé, manus og en produksjonsplan som sier hva som lages, når det lages, og hvilken flate det er laget for.",
        promise: "Plan på plass før første opptaksdag",
      },
      {
        number: "03",
        title: "Produksjon",
        body:
          "Opptak i studio eller på lokasjon, med det crewet oppdraget krever. Vi produserer og koordinerer hele veien, så dere har ett kontaktpunkt.",
        promise: "Én kontakt gjennom hele produksjonen",
      },
      {
        number: "04",
        title: "Levering og distribusjon",
        body:
          "Ferdig materiale i formatene kanalene krever, klart til å publiseres. Ikke en mappe dere må rydde i først.",
        promise: "Levering til avtalt tid",
      },
    ],
    note: "Det er aldri farvel hos oss. Det er på gjensyn.",
  },
  audience: {
    label: "Hvem vi jobber for",
    heading: "Hvem er Chen Media for?",
    lead:
      "Vi jobber med folk som trenger innhold jevnlig, ikke bare når noe stort skjer.",
    groups: [
      {
        title: "Merkevarer og produkteiere",
        items: ["Kampanjer og lanseringer", "Katalog- og produktfoto", "Alltid-på-innhold"],
      },
      {
        title: "Arrangører og eventbyråer",
        items: ["Konferanser og fagdager", "Firmafester og jubileer", "Messer og aktiveringer"],
      },
      {
        title: "Byråer og produksjonsselskap",
        items: ["Foto- og filmcrew på oppdrag", "Produsent og koordinator", "Postproduksjon"],
      },
      {
        title: "Bil, sport og lifestyle",
        items: ["Bilfoto og forhandlerinnhold", "Sport og aktivitet", "Fashion og lifestyle"],
      },
    ],
  },
  about: {
    label: "Fotografen",
    heading: "Hei, jeg er Kai Chen.",
    body: [
      "Det er meg du møter bak kameraet. Bak meg står Chen Media AS, som gjør foto, film og innhold for bedrifter og merkevarer.",
      "Chen Media begynte med arrangementer, og det er fortsatt en stor del av jobben. Men kundene spurte etter det samme hver gang: hvem tar bildene mellom eventene? Hvem lager filmen til kampanjen? Hvem holder i produksjonen? Svaret ble fire fagområder i stedet for ett.",
      "Når det er som travlest, er jeg allerede på plass. Når alle venter på høydepunktet, har jeg det allerede.",
    ],
    facts: [
      { value: "Fire fagområder", caption: "Foto, film, innhold og kreativ produksjon" },
      { value: "Oslo", caption: "Base i Oslo, oppdrag i hele Norge" },
      { value: "AS", caption: "Ryddige avtaler og fakturering" },
    ],
  },
  contact: {
    heading: "Snakk med oss om neste produksjon",
    lead: "Fortell oss hva som skal lages, så sier vi hva vi ville gjort med det.",
  },
  clientsLabel: "Vi jobber med et bredt spekter av kunder",
  tickerAlt: "Utvalg fra arbeidet vårt",
};

const en: AltHome = {
  meta: {
    title: "Alternative home page (draft) | Chen Media",
    description:
      "Draft of a new home page: photography, video production, brand and content, and creative production as four practice areas.",
  },
  draft: {
    label: "Draft",
    note: "Alternative home page. Not published, not indexed.",
    back: "See the current home page",
  },
  hero: {
    badge: "Photo, film and content · Oslo and across Norway",
    title: "We make the content your brand runs",
    titleAccent: "on.",
    lead:
      "Four practice areas under one roof: photography, video production, brand and content, and creative production.\nOne partner from first idea to published.",
    ctaPrimary: "Request a no-obligation quote",
    ctaSecondary: "See the practice areas",
    crewLabel:
      "One photographer/videographer, or a full team when the production calls for it.",
    indexLabel: "Practice areas",
  },
  areas: {
    label: "What we do",
    heading: "Four practice areas, one delivery",
    lead:
      "You can bring us in on just one of them. Most clients discover they belong together.",
    countLabel: "{n} services",
    readLabel: "Read more",
  },
  list: [
    {
      id: "foto",
      number: "01",
      title: "Photography",
      tagline: "Studio and location",
      body:
        "Stills that hold up everywhere — campaign, catalogue, social and print. We build a studio when the subject needs control, and go on location when it needs context.",
      points: [
        "Campaign and studio photography",
        "Event photography",
        "Fashion and lifestyle",
        "Business and interiors",
        "Automotive and sport",
      ],
      link: { href: "/eventfoto", label: "More about event photography" },
    },
    {
      id: "video",
      number: "02",
      title: "Video production",
      tagline: "Idea, shoot and edit",
      body:
        "Film made for the channel it will live in. We take it all the way from concept and direction to finished edit — or step in exactly where you need us.",
      points: [
        "Campaign and brand film",
        "Event film",
        "Concept development and direction",
        "Social media (Instagram, TikTok and Snap)",
        "Ad creative in video",
        "Post-production",
        "Testimonials",
        "Talking heads",
      ],
      link: { href: "/eventfilm", label: "More about event film" },
    },
    {
      id: "innhold",
      number: "03",
      title: "Brand and content",
      tagline: "Ongoing, not one-off",
      body:
        "Content is rarely a single job. We plan, produce and distribute on a fixed cycle, so your channels have something to publish every week — not just after the next big event.",
      points: [
        "Monthly content production",
        "Content plan and channel strategy",
        "Content distribution",
        "Creative for paid ads",
      ],
    },
    {
      id: "produksjon",
      number: "04",
      title: "Creative production",
      tagline: "Producer and coordinator",
      body:
        "Sometimes a camera isn't what you need most. We take the producer role on creative productions: the plan, the people, the budget and every link that has to line up on the shoot day.",
      // NB: see the Norwegian copy — these bullets are a proposal, not confirmed scope.
      points: [
        "Producer role and project management",
        "Crew and vendor coordination",
        "Casting, location and booking",
        "Production plan, budget and schedule",
        "Rights, clearance and delivery formats",
      ],
    },
  ],
  retainer: {
    label: "How we work",
    heading: "From one-off jobs to a standing content partner.",
    body: [
      "A single job gives you content for a few weeks. Then the channels are empty again, and the next production starts from zero: new brief, new crew, new tone.",
      "A standing agreement fixes that. We build a content plan together, produce on a fixed cycle and deliver finished files in the formats your channels need. You don't order content — it arrives.",
    ],
    points: [
      "A fixed production day every month",
      "Content plan per channel, agreed up front",
      "The same visual voice over time",
      "A known price, no quote round per job",
    ],
    cta: "How we work",
  },
  process: {
    label: "The process",
    heading: "How we work",
    lead: "Four steps, whichever practice area you bring us in on.",
    steps: [
      {
        number: "01",
        title: "Mapping",
        body:
          "We go through your goals, your channels and the content you already have. Then we tell you what's missing, and what is worth making first.",
        promise: "Kai answers personally within one working day",
      },
      {
        number: "02",
        title: "Concept and plan",
        body:
          "Idea, script and a production plan that says what gets made, when it gets made, and which surface it is made for.",
        promise: "Plan in place before the first shoot day",
      },
      {
        number: "03",
        title: "Production",
        body:
          "Shooting in studio or on location, with the crew the job calls for. We produce and coordinate throughout, so you have one point of contact.",
        promise: "One contact through the whole production",
      },
      {
        number: "04",
        title: "Delivery and distribution",
        body:
          "Finished material in the formats your channels need, ready to publish. Not a folder you have to sort out first.",
        promise: "Delivered on the agreed date",
      },
    ],
    note: "It's never goodbye with us. It's see you next time.",
  },
  audience: {
    label: "Who we work for",
    heading: "Who is Chen Media for?",
    lead: "We work with people who need content regularly, not only when something big happens.",
    groups: [
      {
        title: "Brands and product owners",
        items: ["Campaigns and launches", "Catalogue and product photography", "Always-on content"],
      },
      {
        title: "Organisers and event agencies",
        items: ["Conferences and industry days", "Company parties and anniversaries", "Trade shows and activations"],
      },
      {
        title: "Agencies and production companies",
        items: ["Photo and film crew for hire", "Producer and coordinator", "Post-production"],
      },
      {
        title: "Automotive, sport and lifestyle",
        items: ["Automotive and dealer content", "Sport and activity", "Fashion and lifestyle"],
      },
    ],
  },
  about: {
    label: "The photographer",
    heading: "Hi, I'm Kai Chen.",
    body: [
      "I'm the one you meet behind the camera. Behind me is Chen Media AS, doing photo, film and content for businesses and brands.",
      "Chen Media started with events, and that is still a big part of the work. But clients kept asking the same thing: who shoots the pictures between the events? Who makes the campaign film? Who runs the production? The answer became four practice areas instead of one.",
      "When things are busiest, I'm already in place. When everyone is waiting for the highlight, I already have it.",
    ],
    facts: [
      { value: "Four areas", caption: "Photo, film, content and creative production" },
      { value: "Oslo", caption: "Based in Oslo, working across Norway" },
      { value: "AS", caption: "Clean contracts and invoicing" },
    ],
  },
  contact: {
    heading: "Let's talk about your next production",
    lead: "Tell us what needs making, and we'll tell you what we'd do with it.",
  },
  clientsLabel: "We work with a broad range of clients",
  tickerAlt: "A selection from our work",
};

const altHome: Record<Locale, AltHome> = { no, en };

export function getAltHome(locale: Locale): AltHome {
  return altHome[locale];
}
