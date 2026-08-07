import type { Dictionary } from "./types";
import { no } from "./no";

/*
  VARIANT A: «prikk lik» TON Media, oversatt til norsk.

  Dette er TON Medias egen tekst fra tonmedia.com/en, setning for setning,
  der bare navn og geografi er byttet (TON Media -> Chen Media,
  Michiel -> Kai, NL + EU -> NO + EU, nederlandske byer -> nordiske).

  ADVARSEL: Denne varianten er sammenligningsgrunnlag, ikke publisert tekst.
  To grunner:
    1. Teksten er TONs åndsverk. Ordrett på et kommersielt nettsted er det
       plagiat.
    2. Flere påstander gjelder TON, ikke Chen Media: «2000+ eventer siden
       2012», «14 år», «team på 9 fotografer», og hele AI-verktøyet under
       «Sosialt innhold». Chen Media har ikke dette.

  Undersidene (foto, film, prosjekter, nyheter) finnes ikke i TON-kilden,
  så de arves uendret fra variant B.
*/
export const noTon: Dictionary = {
  ...no,
  meta: {
    ...no.meta,
    siteName: "Chen Media",
    home: {
      title: "Chen Media · Eventfotografi og sosialt innhold",
      description:
        "Eventfotograf for messer, konferanser og festivaler. 2000+ eventer siden 2012. Bilder og innlegg klare innen 24 timer.",
    },
  },
  nav: {
    home: "Hjem",
    services: "Tjenester",
    photo: "Messer og utstillinger",
    photoSub: "Messer · Utstillinger",
    film: "Konferanser",
    filmSub: "Kongresser · Keynotes",
    projects: "Arbeidet vårt",
    news: "Nyheter",
    about: "Fotografen",
    contact: "Kontakt",
    cta: "Be om tilbud",
  },
  hero: {
    badge: "Ledig for eventer i NO + EU",
    title: "Arrangementet ditt, sett med øynene til en",
    titleAccent: "proff.",
    lead: "Eventfotograf for messer, konferanser og festivaler. 2000+ eventer siden 2012. Bilder og innlegg klare innen 24 timer.",
    ctaPrimary: "Be om et uforpliktende tilbud",
    ctaSecondary: "Se arbeidet",
    clientsLabel: "Alene eller med et komplett innholdsteam",
    polaroidBadge: "2000+ eventer siden 2012",
  },
  services: {
    label: "Det vi gjør",
    heading: "Det vi gjør",
    lead: "Tre tjenester, ett mål: å få arrangementet ditt til å nå så langt som mulig.",
    cards: [
      {
        title: "Eventfoto og video",
        body: "Skarpe, stemningsfulle bilder av hvert øyeblikk, keynotes, nettverking, workshops. Ingen høydepunkter går tapt.",
        points: ["Full dekning av arrangementet", "Rask redigering", "Levering samme dag"],
        linkLabel: "Mer info",
        slug: "eventfoto",
      },
      {
        title: "Innhold · Team · Koordinering",
        body: "Stort arrangement? Vi hjelper deg å sette opp en detaljert briefing for både foto og video, så ingen øyeblikk går tapt. Koordinert og konsistent i stilen.",
        points: [
          "Foto og video under samme tak",
          "Forberedelsene helt bort fra ditt bord",
          "Sømløst samarbeid",
        ],
        linkLabel: "Mer info",
        slug: "eventfilm",
      },
      {
        title: "Sosialt innhold",
        body: "Ikke bare bilder, men ferdig innhold for Instagram, LinkedIn og Facebook. Per tone, per plattform, klart til publisering.",
        points: [
          "Skreddersydde AI-tekster",
          "Flere toner og plattformer",
          "Personlig forhåndsvisningslenke",
        ],
        linkLabel: "Mer info",
        slug: "prosjekter",
      },
    ],
  },
  liveOn: {
    label: "Unikt i markedet",
    heading: "Arrangementet ditt lever videre, lenge etter siste bilde.",
    body: [
      "De fleste fotografer leverer en mappe med bilder. Vi leverer en komplett strategi for sosiale medier. Verktøyet vårt analyserer bildene, skriver fengende tekster og gjør dem klare per plattform.",
      "Du plukker innleggene du vil bruke, justerer teksten slik du vil ha den og laster ned alt med ett klikk. Ingen flere timer med skriving.",
    ],
    points: ["AI analyserer", "Skriver innlegg", "7 innlegg · 3 plattformer · 4 toner"],
    cta: "Les mer",
  },
  work: {
    label: "Arbeidet vårt",
    heading: "Arbeidet vårt",
    lead: "Fra internasjonale messer til intime firmafester, utforsk arbeidet etter type arrangement.",
    cards: [
      { title: "Messer og utstillinger", sub: "Messer · Utstillinger", slug: "eventfoto" },
      { title: "Konferanser", sub: "Kongresser · Keynotes", slug: "eventfilm" },
      { title: "Firmaarrangementer", sub: "Firmafester · Galla", slug: "prosjekter" },
      { title: "Festivaler", sub: "Tomorrowland · Defqon.1 · flere", slug: "prosjekter" },
    ],
    linkLabel: "Se arbeidet",
  },
  process: {
    label: "Slik fungerer det",
    heading: "Slik fungerer det",
    lead: "Løftet vårt: vi gjør hvert steg enklere for deg.",
    steps: [
      {
        number: "01",
        title: "Forespørsel",
        body: "Gi oss dato, sted og tidspunkt, så sender vi deg et uforpliktende tilbud.",
        promise: "Tilbud innen 24 timer",
      },
      {
        number: "02",
        title: "Planlegging",
        body: "Gi oss programmet og eventuelle spesielle ønsker, så hjelper vi deg å lage en gjennomtenkt briefing.",
        promise: "Vårt eget Chen-verktøy for store, komplekse briefinger",
      },
      {
        number: "03",
        title: "På stedet",
        body: "Vi er alltid på plass minst 30 minutter før start, klare til å skyte og fulle av positiv energi.",
        promise: "10 til 15 forhåndsbilder rett til dine sosiale kanaler",
      },
      {
        number: "04",
        title: "Levering",
        body: "Få bildene i et privat album, så du enkelt kan dele dem med gjestene dine.",
        promise: "Komplett album innen 24 til 48 timer",
      },
    ],
    note: "",
  },
  about: {
    label: "Fotografen",
    heading: "Hei, jeg er Kai",
    body: [
      "I mer enn 14 år har jeg fotografert arrangementer, fra små firmafester til internasjonale messer i København, Berlin og Amsterdam.",
      "Jeg mener et godt arrangement fortjener mer enn en mappe full av bilder. Derfor bygger jeg Chen Media: en kombinasjon av profesjonell fotografering og smarte innholdsverktøy som virkelig gir arrangementet ditt liv.",
      "Når arrangementet er på sitt travleste, er jeg allerede der. Når alle venter på høydepunktet, har jeg allerede fanget det.",
    ],
    facts: [
      { value: "2000+", caption: "Eventer" },
      { value: "14", caption: "Års erfaring" },
      { value: "NO + EU", caption: "Steder" },
    ],
  },
  audience: {
    label: "Hvem vi jobber for",
    heading: "Hvem er Chen Media for?",
    lead: "Vi jobber med organisasjoner som forstår at et godt arrangement også må kommuniseres godt.",
    groups: [
      {
        title: "Messe og utstilling",
        items: ["Messearrangører", "Festivalarrangører", "Hoteller og konferansesteder"],
      },
      {
        title: "Konferanse",
        items: [
          "Kongress- og konferansearrangører",
          "Foreninger og bransjeorganisasjoner",
          "Helse- og utdanningsinstitusjoner",
        ],
      },
      {
        title: "Galla og prisutdeling",
        items: ["Feiringer og galla", "Stiftelser og veldedighet", "PR- og eventbyråer"],
      },
      {
        title: "Firmaarrangement",
        items: [
          "Firmaarrangementer",
          "Markeds- og kommunikasjonsteam",
          "Teknologiselskaper og produktlanseringer",
        ],
      },
    ],
  },
  contact: {
    label: "Kontakt",
    heading: "Få et tilbud",
    headingAccent: "tilpasset arrangementet ditt",
    lead: "Dato, sted og tidspunkt er nok. Resten tar vi i etterkant.",
    photographerRole: "Eventfotograf · Chen Media",
    agenda: {
      label: "Vår kommende agenda",
      confirmedLabel: "bekreftet",
      pendingLabel: "avventer",
      freeLabel: "ledige",
      freeOneLabel: "ledig",
      fullLabel: "fullbooket",
      emptyLabel: "Ingen datoer publisert ennå.",
      note: "Det er fortsatt plass til arrangementet ditt på disse datoene også.",
      autoNote:
        "Alle offentlige arrangementer ut desember. Nye bekreftede bookinger dukker opp her automatisk.",
    },
    form: {
      name: "Navn",
      namePh: "Navnet ditt",
      org: "Organisasjon",
      orgPh: "Firmanavn",
      email: "E-postadresse",
      emailPh: "deg@firmaet.no",
      message: "Fortell om arrangementet ditt",
      messageHint: "(dato, sted og tidspunkt er nok)",
      messagePh: "dato, sted og tidspunkt er nok",
      points: ["Uforpliktende", "Svar vanligvis innen 4 timer", "Bilder + sosialt innhold"],
      submit: "Be om et uforpliktende tilbud",
    },
    direct: "Eller send e-post direkte:",
    reply: "Kai svarer personlig, vanligvis innen 4 timer.",
    emailLabel: "E-post",
  },
  sticky: {
    available: "Ledig for arrangementet ditt",
    cta: "Be om tilbud",
  },
  footer: {
    tagline: "Eventfotografi og sosialt innhold",
    rights: "Alle rettigheter forbeholdt.",
    orgLabel: "Chen Media AS",
  },
  ticker: { alt: "Alene eller med et komplett innholdsteam" },
};
