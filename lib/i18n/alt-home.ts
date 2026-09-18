import type { FaqItem, Locale } from "./types";

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

/**
 * Én av de fire tingene Chen Media gjør.
 *
 * `label` og `title` er delt med vilje. `label` er kategorien folk skanner
 * etter og søker på — «foto», «film» — og den står i innholdsfortegnelsen og
 * metaraden. `title` er overskriften seksjonen faktisk bærer, og sier hva
 * kunden sitter igjen med i stedet for hva utstyret heter.
 */
export interface AltArea {
  /** Ankeret seksjonen får på siden, «foto» -> #foto */
  id: string;
  number: string;
  /** Kategorinavnet, ett ord der det går */
  label: string;
  /** Overskriften, skrevet fra kundens side */
  title: string;
  body: string;
  /** Tjenestene under kategorien. Dette er listen forsiden finnes for. */
  points: string[];
  /** Lenke til dybdesiden som allerede finnes, om den gjør det */
  link?: { href: string; label: string };
}

/** Én måte å kjøpe på: enkeltoppdrag, prosjekt eller fast avtale. */
export interface AltWay {
  name: string;
  tagline: string;
  body: string;
  points: string[];
  /** Løftes fram visuelt. Kun én av gangen. */
  highlight?: boolean;
  /** Merkelappen på den framhevede, f.eks. «Vanligst» */
  badge?: string;
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
  overview: {
    label: string;
    heading: string;
    lead: string;
    /** «5 tjenester» — {n} byttes med antall punkter */
    countLabel: string;
  };
  areas: AltArea[];
  work: { label: string; heading: string; lead: string; linkLabel: string };
  ways: {
    label: string;
    heading: string;
    body: string[];
    models: AltWay[];
    note: string;
  };
  process: {
    label: string;
    heading: string;
    lead: string;
    steps: { number: string; title: string; body: string; promise: string }[];
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
  faq: { label: string; heading: string; items: FaqItem[] };
  contact: { heading: string; lead: string };
  clientsLabel: string;
  tickerAlt: string;
}

const no: AltHome = {
  meta: {
    title: "Alternativ forside (utkast) | Chen Media",
    description:
      "Utkast til ny forside: foto, film, innhold og produksjon som fire innganger i stedet for eventfoto og eventfilm alene.",
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
      "Foto, film, innhold og produksjon under samme tak.\nÉn partner fra første idé til ferdig publisert.",
    ctaPrimary: "Be om et uforpliktende tilbud",
    ctaSecondary: "Se hva vi gjør",
    crewLabel:
      "En fotograf/videograf, eller med et komplett team når produksjonen krever det.",
    indexLabel: "Hva vi gjør",
  },
  overview: {
    label: "Hva vi gjør",
    heading: "Fire ting vi gjør, én leveranse",
    lead:
      "Du kan hente oss inn på én av dem. De fleste oppdager etter hvert at de henger sammen.",
    countLabel: "{n} tjenester",
  },
  areas: [
    {
      id: "foto",
      number: "01",
      label: "Foto",
      title: "Bilder som gjør en jobb",
      body:
        "Et bilde skal gjøre noe: selge produktet, fylle kanalen, bære annonsen. Vi rigger studio når motivet krever kontroll, og drar ut når det krever kontekst.",
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
      id: "film",
      number: "02",
      label: "Film",
      title: "Film folk ser ferdig",
      body:
        "Vi lager filmen for kanalen den skal leve i, ikke for et lerret den aldri havner på. Hele veien fra idé og regi til ferdig klippet — eller inn akkurat der dere trenger oss.",
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
      label: "Innhold",
      title: "Kanaler som aldri går tomme",
      body:
        "Innhold er sjelden ett oppdrag. Vi legger planen, produserer i faste sykluser og leverer ferdige filer i formatene kanalene krever. Dere slipper å bestille innhold — det kommer.",
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
      label: "Produksjon",
      title: "Noen som holder i alle trådene",
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
  work: {
    label: "Arbeidet vårt",
    heading: "Noen av dem vi har gjort det for",
    lead:
      "Fra frokostmøter for Snapchat til pitchkvelder og butikkevents. Navn, format og hva oppdraget faktisk gikk ut på.",
    linkLabel: "Se alle prosjektene",
  },
  ways: {
    label: "Samarbeidet",
    heading: "Fra enkeltoppdrag til fast avtale.",
    body: [
      "Et enkeltoppdrag gir dere innhold til noen uker. Så er kanalene tomme igjen, og neste produksjon settes opp fra null: ny brief, nytt crew, ny tone.",
      "Derfor finnes tre måter å jobbe med oss på. De fleste begynner på den første og flytter seg nedover listen når de ser hvor mye innhold de faktisk trenger.",
    ],
    models: [
      {
        name: "Enkeltoppdrag",
        tagline: "Én dag, én leveranse",
        body:
          "Dere vet hva som skal lages, og trenger noen som lager det. Fast pris før vi begynner.",
        points: [
          "Fast pris per oppdrag",
          "Levering til avtalt dato",
          "Bruksrettigheter avklart i tilbudet",
        ],
      },
      {
        name: "Prosjekt",
        tagline: "Fra idé til publisert",
        body:
          "En lansering eller kampanje som trenger konsept, opptak og etterarbeid — og én som holder i det hele.",
        points: [
          "Idé, regi, opptak og etterarbeid",
          "Én produsent gjennom hele løpet",
          "Alle formater i samme leveranse",
        ],
      },
      {
        name: "Fast avtale",
        tagline: "Fast dag hver måned",
        body:
          "Innholdsplanen er lagt på forhånd, produksjonsdagen står i kalenderen, og prisen er den samme hver måned.",
        points: [
          "Innholdsplan per kanal",
          "Kjent månedspris, ingen tilbudsrunde",
          "Samme visuelle uttrykk over tid",
        ],
        highlight: true,
        badge: "Vanligst",
      },
    ],
    note: "Usikker på hvilken? Fortell oss hva dere skal publisere i året som kommer, så foreslår vi en.",
  },
  process: {
    label: "Prosessen",
    heading: "Slik jobber vi",
    // NB: løftene under er utgangspunkt. Kai justerer dem til det han faktisk lover.
    lead: "Fire steg, uansett hva du henter oss inn på.",
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
  about: {
    label: "Fotografen",
    heading: "Hei, jeg er Kai Chen.",
    body: [
      "Det er meg du møter bak kameraet. Bak meg står Chen Media AS, som gjør foto, film og innhold for bedrifter og merkevarer.",
      "Chen Media begynte med arrangementer, og det er fortsatt en stor del av jobben. Men kundene spurte etter det samme hver gang: hvem tar bildene mellom eventene? Hvem lager filmen til kampanjen? Hvem holder i produksjonen? Svaret ble fire ting i stedet for én.",
      "Når det er som travlest, er jeg allerede på plass. Når alle venter på høydepunktet, har jeg det allerede.",
    ],
    facts: [
      { value: "Én partner", caption: "Foto, film, innhold og produksjon" },
      { value: "Oslo", caption: "Base i Oslo, oppdrag i hele Norge" },
      { value: "AS", caption: "Ryddige avtaler og fakturering" },
    ],
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
  faq: {
    label: "Spørsmål vi ofte får",
    heading: "Før du spør",
    items: [
      {
        q: "Kan vi hente dere inn på bare én ting?",
        a: "Ja. De fleste begynner med ett oppdrag. At vi gjør foto, film, innhold og produksjon betyr at dere kan utvide uten å bytte leverandør — ikke at dere må kjøpe alt.",
      },
      {
        q: "Dekker dere hele Norge?",
        a: "Ja. Vi har base i Oslo og tar oppdrag i hele landet. Reise og opphold står som egen linje i tilbudet, så dere ser nøyaktig hva det utgjør.",
      },
      {
        q: "Hva koster det?",
        a: "Det avhenger av omfang, antall leveranser og hvor lenge dere skal bruke materialet. Dere får en fast pris i tilbudet, ikke en timepris som løper.",
      },
      {
        q: "Hvem eier materialet, og hva kan vi bruke det til?",
        a: "Bruksrettighetene står tydelig i tilbudet: kanaler, varighet og omfang. Trenger dere mer senere, utvider vi avtalen i stedet for å produsere på nytt.",
      },
      {
        q: "Kan vi få noe å publisere med én gang?",
        a: "Ja. Vi avtaler et hurtiguttak før produksjonen, så dere har bilder eller et kort klipp mens saken fortsatt er fersk. Resten kommer i den fulle leveransen.",
      },
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
      "Draft of a new home page: photo, film, content and production as four ways in, instead of event photography and event film alone.",
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
      "Photo, film, content and production under one roof.\nOne partner from first idea to published.",
    ctaPrimary: "Request a no-obligation quote",
    ctaSecondary: "See what we do",
    crewLabel:
      "One photographer/videographer, or a full team when the production calls for it.",
    indexLabel: "What we do",
  },
  overview: {
    label: "What we do",
    heading: "Four things we do, one delivery",
    lead:
      "You can bring us in on just one of them. Most clients discover they belong together.",
    countLabel: "{n} services",
  },
  areas: [
    {
      id: "foto",
      number: "01",
      label: "Photo",
      title: "Pictures that do a job",
      body:
        "A picture has to do something: sell the product, fill the channel, carry the ad. We build a studio when the subject needs control, and go on location when it needs context.",
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
      id: "film",
      number: "02",
      label: "Film",
      title: "Film people watch to the end",
      body:
        "We make the film for the channel it will live in, not for a screen it never reaches. All the way from idea and direction to finished edit — or in exactly where you need us.",
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
      label: "Content",
      title: "Channels that never run dry",
      body:
        "Content is rarely a single job. We build the plan, produce on a fixed cycle and deliver finished files in the formats your channels need. You don't order content — it arrives.",
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
      label: "Production",
      title: "Someone holding every thread",
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
  work: {
    label: "Our work",
    heading: "Some of the people we've done it for",
    lead:
      "From breakfast events for Snapchat to pitch nights and in-store launches. The name, the format, and what the job actually was.",
    linkLabel: "See all projects",
  },
  ways: {
    label: "Working together",
    heading: "From a single job to a standing agreement.",
    body: [
      "A single job gives you content for a few weeks. Then the channels are empty again, and the next production starts from zero: new brief, new crew, new tone.",
      "So there are three ways to work with us. Most clients start at the first and move down the list once they see how much content they actually need.",
    ],
    models: [
      {
        name: "Single job",
        tagline: "One day, one delivery",
        body:
          "You know what needs making, and need someone to make it. A fixed price before we start.",
        points: [
          "Fixed price per job",
          "Delivered on the agreed date",
          "Usage rights settled in the quote",
        ],
      },
      {
        name: "Project",
        tagline: "From idea to published",
        body:
          "A launch or campaign that needs concept, shooting and post — and one person holding all of it.",
        points: [
          "Idea, direction, shoot and post",
          "One producer through the whole run",
          "Every format in the same delivery",
        ],
      },
      {
        name: "Standing agreement",
        tagline: "A fixed day each month",
        body:
          "The content plan is set in advance, the production day is in the calendar, and the price is the same every month.",
        points: [
          "Content plan per channel",
          "A known monthly price, no quote round",
          "The same visual voice over time",
        ],
        highlight: true,
        badge: "Most common",
      },
    ],
    note: "Not sure which one? Tell us what you need to publish over the coming year, and we'll suggest one.",
  },
  process: {
    label: "The process",
    heading: "How we work",
    lead: "Four steps, whatever you bring us in on.",
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
  about: {
    label: "The photographer",
    heading: "Hi, I'm Kai Chen.",
    body: [
      "I'm the one you meet behind the camera. Behind me is Chen Media AS, doing photo, film and content for businesses and brands.",
      "Chen Media started with events, and that is still a big part of the work. But clients kept asking the same thing: who shoots the pictures between the events? Who makes the campaign film? Who runs the production? The answer became four things instead of one.",
      "When things are busiest, I'm already in place. When everyone is waiting for the highlight, I already have it.",
    ],
    facts: [
      { value: "One partner", caption: "Photo, film, content and production" },
      { value: "Oslo", caption: "Based in Oslo, working across Norway" },
      { value: "AS", caption: "Clean contracts and invoicing" },
    ],
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
  faq: {
    label: "Questions we get a lot",
    heading: "Before you ask",
    items: [
      {
        q: "Can we bring you in on just one thing?",
        a: "Yes. Most clients start with a single job. That we do photo, film, content and production means you can expand without changing supplier — not that you have to buy all of it.",
      },
      {
        q: "Do you work across Norway?",
        a: "Yes. We're based in Oslo and take jobs across the country. Travel and accommodation are a separate line in the quote, so you see exactly what it comes to.",
      },
      {
        q: "What does it cost?",
        a: "It depends on scope, how many deliverables, and how long you'll be using the material. You get a fixed price in the quote, not an hourly rate that keeps running.",
      },
      {
        q: "Who owns the material, and what can we use it for?",
        a: "Usage rights are stated clearly in the quote: channels, duration and scope. If you need more later, we extend the agreement rather than reshoot.",
      },
      {
        q: "Can we get something to publish straight away?",
        a: "Yes. We agree on a fast selection before the production, so you have stills or a short clip while it's still fresh. The rest follows in the full delivery.",
      },
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
