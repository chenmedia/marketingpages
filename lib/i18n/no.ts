import type { Dictionary } from "./types";

export const no: Dictionary = {
  meta: {
    siteName: "Chen Media",
    home: {
      title: "Chen Media | Eventfoto og film for bedrifter",
      description:
        "Chen Media tar bilder og film på konferanser, lanseringer og firmaevents. Du får innhold du faktisk får brukt.",
    },
    film: {
      title: "Eventfilm | Chen Media",
      description:
        "Eventfilm med høy produksjonskvalitet. Fra pitchkvelder til lanseringer, klippet for å engasjere.",
    },
    projects: {
      title: "Prosjekter | Chen Media",
      description:
        "Et utvalg av oppdragene våre innen eventfoto og eventfilm, fra Snap Session for Snapchat til lanseringer og kundearrangementer.",
    },
    news: {
      title: "Nyheter | Chen Media",
      description:
        "Nytt fra Chen Media. Prosjekter, erfaringer og ting vi har lært underveis.",
    },
  },
  nav: {
    home: "Hjem",
    services: "Våre tjenester",
    photo: "Eventfoto",
    photoSub: "Konferanser, lanseringer og firmaevents",
    film: "Eventfilm",
    filmSub: "Hovedfilm og korte klipp til sosiale medier",
    projects: "Prosjekter",
    news: "Nyheter",
    about: "Om oss",
    contact: "Kontakt",
    cta: "Be om tilbud",
  },
  hero: {
    badge: "Ledig for arrangementer i Oslo og resten av Norge",
    title: "Arrangementet ditt, sett gjennom fotografens",
    titleAccent: "øyne.",
    lead: "Profesjonell foto og film for konferanser, messer og firmaevents.\nFå redigerte bilder klare til bruk allerede dagen etter",
    ctaPrimary: "Be om et uforpliktende tilbud",
    ctaSecondary: "Se arbeidet",
    clientsLabel: "En fotograf/videograf, eller med et komplett team når arrangementet ditt krever det.",
    polaroidBadge: "10+ års erfaring",
  },
  clients: {
    label: "Vi jobber med et bredt spekter av kunder",
  },
  services: {
    label: "Hva vi gjør",
    heading: "Tjenestene våre",
    lead: "Foto, video og digital markedsføring. Innhold som får merkevaren din sett, og kanalene som når ut med det.",
    cards: [
      {
        title: "Fotografering",
        body: "Bilder som løfter merkevaren din, fra studio og kampanje til event, eiendom, bil og sport.",
        points: [
          "Kampanje- og studiofotografering",
          "Eventfotografering",
          "Fashion og eCommerce",
          "Interiør- og eiendomsfotografering",
          "Bilfotografering",
          "Sportsfotografering",
        ],
        linkLabel: "Mer om fotografering",
        slug: "fotografering",
      },
      {
        title: "Videoproduksjon",
        body: "Film som forteller historien din, fra idé og regi til ferdig klipp med farger og lyd.",
        points: [
          "Kampanje- og merkevarefilm",
          "Eventfilm",
          "Intervjuer",
          "Idéutvikling og regi",
          "Sosiale medier (Instagram og TikTok)",
          "Annonsevideoer",
          "Klipp, color grading og lyd",
        ],
        linkLabel: "Mer om videoproduksjon",
        slug: "videoproduksjon",
      },
      {
        title: "Digital markedsføring",
        body: "Innhold og kanaler som jobber sammen, fra nettside og nyhetsbrev til CRM og strategi.",
        points: [
          "Sosiale medier og innholdsstrategi",
          "Nettside",
          "Nyhetsbrev og CRM",
          "Strategi og rådgivning",
        ],
        linkLabel: "Ta en prat",
        slug: "#kontakt",
      },
    ],
  },
  liveOn: {
    label: "Verdien etterpå",
    heading: "Arrangementet lever videre lenge etter at siste bilde er tatt.",
    body: [
      "De fleste leverer en mappe med bilder og sier takk for seg. Vi leverer innhold som allerede er klart til bruk, sortert etter høydepunkter og tilpasset kanalene dere faktisk publiserer i.",
      "Dere plukker det dere vil ha ut. Alt ligger klart for nettsider, sosiale medier og internkommunikasjon, uten timer med etterarbeid.",
    ],
    points: [
      "Redigert utvalg, sortert etter høydepunkter",
      "Formater for web, sosiale medier og trykk",
      "Levering til avtalt tid",
    ],
    cta: "Slik jobber vi",
    formatMain: "Redigert utvalg",
    formats: [
      { name: "Sosiale medier", ratio: "9:16" },
      { name: "Web", ratio: "16:9" },
      { name: "Trykk", ratio: "A4" },
    ],
  },
  work: {
    label: "Arbeidet vårt",
    heading: "Fra store merkevarer til små frokostmøter",
    lead: "Bla gjennom arbeidet etter type arrangement, eller se alle prosjektene samlet.",
    cards: [
      { title: "Eventfoto", sub: "Snapchat · DNT · OBOS · JCP", slug: "fotografering" },
      {
        title: "Eventfilm",
        sub: "Optiver · Varner x Levi's · Nordisk Film Kino",
        slug: "videoproduksjon",
      },
      { title: "Alle prosjekter", sub: "Foto og film på ett sted", slug: "prosjekter" },
    ],
    linkLabel: "Se arbeidet",
  },
  process: {
    label: "Prosessen",
    heading: "Slik jobber vi",
    // NB: fristene under er utgangspunkt. Kai justerer dem til det han faktisk lover.
    lead: "Løftet vårt er enkelt: hvert steg skal være lettere for deg enn det forrige.",
    steps: [
      {
        number: "01",
        title: "Forespørsel",
        body: "Gi oss dato, sted og tidspunkt. Så sier vi hva vi ville gjort med det, og hva det koster.",
        promise: "Kai svarer personlig innen én virkedag",
      },
      {
        number: "02",
        title: "Planlegging",
        body: "Cirka en måned før går vi gjennom kjøreplanen og lager en shot list over øyeblikkene, personene og detaljene som må sikres.",
        promise: "Shot list på plass før arrangementet",
      },
      {
        number: "03",
        title: "På stedet",
        body: "Vi er på plass i god tid, ferdig rigget før dørene åpner. Så dokumenterer vi arrangementet mens det skjer, uten å komme i veien for det.",
        promise: "Rigget og klar før første gjest",
      },
      {
        number: "04",
        title: "Levering og evaluering",
        body: "Vi velger ut og redigerer det beste, leverer i et privat album dere enkelt kan dele videre, og tar en evaluering uken etter.",
        promise: "Levering til avtalt tid, hver gang",
      },
    ],
    note: "Det er aldri farvel hos oss. Det er på gjensyn.",
  },
  about: {
    label: "Fotografen",
    heading: "Hei, jeg er Kai Chen.",
    body: [
      "Det er meg du møter bak kameraet. Bak meg står Chen Media AS, som gjør eventfoto og merkevarefoto for bedrifter og arrangører.",
      "Jeg mener et godt arrangement fortjener mer enn en mappe full av bilder. Derfor bygger jeg Chen Media rundt to ting samtidig: håndverket foran kamera, og innholdet dere sitter igjen med etterpå.",
      "Når det er som travlest, er jeg allerede på plass. Når alle venter på høydepunktet, har jeg det allerede.",
    ],
    facts: [
      { value: "Foto + film", caption: "Én partner for hele leveransen" },
      { value: "Oslo", caption: "Base i Oslo, oppdrag i hele Norge" },
      { value: "AS", caption: "Ryddige avtaler og fakturering" },
    ],
  },
  audience: {
    label: "Hvem vi jobber for",
    heading: "Hvem er Chen Media for?",
    lead: "Vi jobber med folk som vet at et godt arrangement også må fortelles godt videre.",
    groups: [
      {
        title: "Konferanser og fagdager",
        items: ["Konferansearrangører", "Bransjeforeninger", "Kurs og seminarer"],
      },
      {
        title: "Firmaevents og fester",
        items: ["Firmafester og jubileer", "Interne samlinger", "Teamdager og kulturarrangementer"],
      },
      {
        title: "Lanseringer og merkevarer",
        items: ["Produktlanseringer", "Merkevareevents i butikk", "PR og presseeventer"],
      },
      {
        title: "Byråer og organisasjoner",
        items: ["Eventbyråer og produksjonsselskap", "Organisasjoner og foreninger", "Kulturaktører"],
      },
    ],
  },
  contact: {
    label: "Kontakt",
    heading: "Få et tilbud tilpasset",
    headingAccent: "arrangementet ditt",
    lead: "Dato, sted og tidspunkt holder. Resten tar vi i en prat.",
    photographerRole: "Eventfotograf · Chen Media",
    agenda: {
      label: "Kommende kalender",
      confirmedLabel: "bekreftet",
      pendingLabel: "avventer",
      freeLabel: "ledige",
      freeOneLabel: "ledig",
      fullLabel: "fullbooket",
      emptyLabel: "Ingen datoer publisert ennå.",
      note: "Tallet til høyre viser hvor mange av oss som fortsatt er ledige den datoen.",
      autoNote: "Offentlige datoer framover. Nye bookinger dukker opp her automatisk.",
    },
    form: {
      name: "Navn",
      namePh: "Navnet ditt",
      org: "Organisasjon",
      orgPh: "Firmanavn",
      email: "E-postadresse",
      emailPh: "deg@firma.no",
      message: "Fortell oss om arrangementet",
      messageHint: "(dato, sted og tidspunkt er nok)",
      messagePh: "F.eks. årskonferanse 12. mars 2027, Oslo kongressenter, kl. 09 til 17",
      points: ["Uforpliktende", "Svar innen én virkedag", "Foto og film samlet"],
      submit: "Be om et uforpliktende tilbud",
      sending: "Sender …",
      consent:
        "Jeg vil gjerne motta e-post fra Chen Media om tjenester og relevant innhold. Du kan melde deg av når som helst.",
      privacy:
        "Når du sender inn, lagrer vi opplysningene dine for å kunne svare på henvendelsen.",
      successTitle: "Takk, vi har fått henvendelsen din.",
      successBody:
        "Kai ser på den og svarer deg som regel innen én virkedag. Haster det, ring gjerne.",
      errors: {
        invalid: "Sjekk at navn, e-post og melding er fylt ut riktig.",
        rate: "Du har sendt inn flere henvendelser nå nettopp. Prøv igjen om noen minutter.",
        server:
          "Noe gikk galt hos oss, og henvendelsen ble ikke sendt. Prøv igjen, eller send en e-post direkte.",
      },
    },
    direct: "Eller send e-post direkte:",
    reply: "Kai svarer personlig, som regel innen én virkedag.",
    emailLabel: "E-post",
  },
  sticky: {
    available: "Ledig for arrangementet ditt",
    cta: "Be om tilbud",
    openNow: "Vi er på kontoret nå",
    closedNow: "Utenfor kontortid, vi svarer neste virkedag",
  },
  footer: {
    tagline: "Eventfoto og film for bedrifter",
    rights: "Alle rettigheter forbeholdt.",
    orgLabel: "Chen Media AS",
  },
  filmPage: {
    kicker: "Eventfilm",
    title: "Skap minneverdige opplevelser med video.",
    lead: "Vi fanger stemningen, energien og de viktigste øyeblikkene fra arrangementet ditt, og klipper det til en film som forsterker budskapet.",
    craft: {
      label: "Håndverket",
      heading: "Mer enn dokumentasjon",
      body: [
        "En eventfilm skal gjøre mer enn å bevise at arrangementet fant sted. Vi kombinerer dynamiske klipp, god historiefortelling og høy produksjonskvalitet, så filmen får frem atmosfæren og energien i rommet.",
        "Resultatet er en film folk faktisk ser ferdig. Internt som et bevis på kulturen deres, eksternt som en grunn til å være med neste gang.",
      ],
    },
    formats: {
      heading: "Én produksjon, flere flater",
      items: [
        {
          title: "Hovedfilm",
          body: "Historien om arrangementet fortalt i én film, til nettsider, presentasjoner og neste års invitasjon.",
        },
        {
          title: "Korte klipp til sosiale medier",
          body: "Vertikale kutt fra samme produksjon, klare for Instagram, TikTok og LinkedIn mens arrangementet fortsatt er ferskt.",
        },
        {
          title: "Råmateriale etter avtale",
          body: "Trenger dere klipp til eget bruk, avtaler vi omfang og rettigheter tydelig i tilbudet.",
        },
      ],
    },
    galleryLabel: "Arbeid",
    galleryHeading: "Fra produksjonene",
    caseHighlights: [
      {
        client: "Optiver",
        project: "Pitch Event",
        kind: "Eventfilm",
        context: "Pitchkveld fanget på film, med energien i rommet og øyeblikkene som definerte kvelden.",
      },
      {
        client: "Aktiv Eiendomsmegling",
        project: "Pitch Event",
        kind: "Eventfilm",
        context: "Pitchkveld dokumentert med film til intern og ekstern bruk.",
      },
      {
        client: "Nordisk Film Kino",
        project: "Eventfilm",
        kind: "Eventfilm",
        context: "Filmproduksjon for Nordisk Film Kino.",
      },
      {
        client: "Av-og-til",
        project: "Kampanjearrangement",
        kind: "Eventfilm",
        context: "Film for alkovettorganisasjonen Av-og-til.",
      },
    ],
    faq: {
      label: "Spørsmål vi ofte får",
      heading: "Før du spør",
      items: [
        {
          q: "Hvor lang blir filmen?",
          a: "Det kommer an på hva filmen skal gjøre. En hovedfilm lander som regel på ett til tre minutter. Lang nok til å fortelle historien, kort nok til at folk ser den ferdig.",
        },
        {
          q: "Hva med musikk og rettigheter?",
          a: "Vi bruker lisensiert musikk som er klarert for kanalene filmen skal brukes i. Bruksrettighetene for selve filmen står tydelig i tilbudet.",
        },
        {
          q: "Kan vi få korte klipp til sosiale medier raskt?",
          a: "Ja. Vertikale kutt kan prioriteres i leveransen, så dere har innhold å publisere mens arrangementet fortsatt er ferskt.",
        },
        {
          q: "Trenger dere mye utstyr og plass?",
          a: "Mindre enn du tror. Vi planlegger kamerapunkter på forhånd ut fra lokalet og programmet, og jobber diskret. Arrangementet er hovedpersonen, ikke produksjonen.",
        },
      ],
    },
    cta: {
      heading: "Har dere en produksjon i tankene?",
      lead: "Fortell oss om arrangementet, så foreslår vi et opplegg som passer formatet og budsjettet.",
    },
  },
  projectsPage: {
    kicker: "Prosjekter",
    title: "Arbeidet, samlet.",
    lead: "Et utvalg av oppdragene våre, sortert etter type fotografering. Fra studio og runway til konferanser, biler og sport.",
    filterAll: "Alle",
    items: [
      {
        client: "Oslo Business Forum",
        project: "Oslo Business Forum 2026",
        kind: "Eventfoto",
        context:
          "Konferansen dokumentert fra hovedscenen til nettverksområdene og møtene mellom deltakerne.",
      },
      {
        client: "Startuplab",
        project: "CEO Lunch Roundtable",
        kind: "Eventfoto",
        context:
          "En tett ledersamling dokumentert med samtalene, menneskene og miljøet rundt bordet.",
      },
      {
        client: "Snapchat",
        project: "Snap Session Frokostmøte",
        kind: "Eventfoto",
        context:
          "Frokostmøte i Oslo for annonsører og byråer, dokumentert fra første foredrag til siste kaffekopp.",
      },
      {
        client: "Slottsfjell",
        project: "Slottsfjell 2026",
        kind: "Festivalfoto",
        context:
          "Festivaldagene dokumentert med artistene, publikum, lysene og stemningen foran scenen.",
      },
      {
        client: "Startuplab",
        project: "Summer Pitch Party",
        kind: "Eventfoto",
        context:
          "Pitchene og sommerfesten fanget i en serie som viser både presentasjonene og livet mellom dem.",
      },
      {
        client: "Oslo Business Forum",
        project: "Partner kick-off 2026",
        kind: "Eventfoto",
        context:
          "Partnerarrangement dokumentert med foredrag, relasjoner og stemningen i rommet.",
      },
      {
        client: "Nordisk Film Kino",
        project: "Colosseum og Gimle kino",
        kind: "Interiørfoto",
        context:
          "Kinoenes særpreg dokumentert gjennom arkitektur, saler og detaljer fra Colosseum og Gimle.",
      },
    ],
  },
  newsPage: {
    kicker: "Nyheter",
    title: "Notater fra arbeidet.",
    lead: "Nytt fra Chen Media: prosjekter, erfaringer og ting vi har lært underveis.",
    readLabel: "Fra oppdraget",
    entries: [
      {
        tag: "Eventfoto",
        title: "Snap Session: slik dokumenterer du et frokostmøte uten å forstyrre det",
        body: "Under frokostmøtet til Snapchat i Oslo jobbet vi langs kantene av rommet, uten blits og timet etter programmet. Resultatet ble bilder der ingen poserer og stemningen er ekte.",
      },
      {
        tag: "Eventfilm",
        title: "Pitchkvelder på film: energien er poenget",
        body: "To pitchkvelder, for Optiver og Aktiv Eiendomsmegling, lærte oss det samme. Filmen skal ikke gjenfortelle programmet, den skal gjenskape følelsen av å være i rommet.",
      },
      {
        tag: "Bak kamera",
        title: "Derfor lager vi alltid shot list",
        body: "Kjøreplanen din blir til en konkret liste over øyeblikk som må sikres. Det gir oss ro til å improvisere, for de planlagte bildene er allerede i boks.",
      },
    ],
  },
  ticker: { alt: "Utvalg fra arbeidet vårt" },
};
