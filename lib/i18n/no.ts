import type { Dictionary } from "./types";

export const no: Dictionary = {
  meta: {
    siteName: "Chen Media",
    home: {
      title: "Chen Media — Eventfoto og film for bedrifter",
      description:
        "Vi fanger øyeblikkene. Chen Media dokumenterer konferanser, lanseringer og firmaevents med foto og film — innhold dere faktisk får brukt.",
    },
    photo: {
      title: "Eventfoto — Chen Media",
      description:
        "Dokumentarisk eventfotografering for bedrifter. Shot list av kjøreplanen, diskret tilstedeværelse og et redigert utvalg som speiler arrangementets profil.",
    },
    film: {
      title: "Eventfilm — Chen Media",
      description:
        "Eventfilm som forsterker budskapet. Dynamiske klipp, engasjerende historiefortelling og høy produksjonskvalitet — fra pitch-eventer til lanseringer.",
    },
    projects: {
      title: "Prosjekter — Chen Media",
      description:
        "Utvalgte oppdrag innen eventfoto og eventfilm — fra Snap Session for Snapchat til pitch-eventer, butikkevents og kundearrangementer.",
    },
    news: {
      title: "Nyheter — Chen Media",
      description:
        "Notater fra arbeidet: prosjekter, erfaringer og det som skjer hos Chen Media.",
    },
  },
  nav: {
    home: "Hjem",
    services: "Våre tjenester",
    photo: "Eventfoto",
    photoSub: "Konferanser, lanseringer og firmaevents",
    film: "Eventfilm",
    filmSub: "Hovedfilm og korte klipp for sosiale medier",
    projects: "Prosjekter",
    news: "Nyheter",
    about: "Om oss",
    contact: "Kontakt",
    cta: "Be om tilbud",
  },
  hero: {
    badge: "Ledig for oppdrag — Oslo / hele Norge",
    title: "Arrangementet ditt, sett med øynene til en",
    titleAccent: "fotograf.",
    lead: "Eventfoto og film for bedrifter. Vi dokumenterer konferanser, lanseringer og firmaevents — og leverer innhold som fortsatt jobber for dere lenge etter at lokalet er ryddet.",
    ctaPrimary: "Be om et uforpliktende tilbud",
    ctaSecondary: "Se arbeidet",
    clientsLabel: "Utvalgte oppdragsgivere",
    polaroidBadge: "Foto + film siden 2020",
  },
  services: {
    label: "Hva vi gjør",
    heading: "Tjenestene våre",
    lead: "Tre leveranser, ett mål: at arrangementet ditt når lenger enn lokalet.",
    cards: [
      {
        title: "Eventfoto",
        body: "Dokumentarisk fotografering av hele arrangementet — scenen, salen og alt som skjer i pausene.",
        points: [
          "Shot list av kjøreplanen din",
          "Diskret tilstedeværelse uten blits",
          "Redigert utvalg i høy oppløsning",
        ],
        linkLabel: "Mer om eventfoto",
        slug: "eventfoto",
      },
      {
        title: "Eventfilm",
        body: "Dynamiske klipp, engasjerende historiefortelling og høy produksjonskvalitet — en film som forsterker budskapet.",
        points: [
          "Hovedfilm på ett til tre minutter",
          "Vertikale kutt for sosiale medier",
          "Lisensiert musikk, klarert for kanalene",
        ],
        linkLabel: "Mer om eventfilm",
        slug: "eventfilm",
      },
      {
        title: "Foto + film-pakke",
        body: "Én partner for hele leveransen. Vi koordinerer foto og film i samme produksjon, konsistent i stil og tone.",
        points: [
          "Én kontakt, én avtale, én tidslinje",
          "Konsistent visuelt uttrykk",
          "Innhold klart for alle flater",
        ],
        linkLabel: "Se prosjektene",
        slug: "prosjekter",
      },
    ],
  },
  liveOn: {
    label: "Verdien etterpå",
    heading: "Arrangementet lever videre, lenge etter siste bilde.",
    body: [
      "De fleste leverer en mappe med bilder. Vi leverer innhold som er klart til å brukes: redigert, sortert og tilpasset flatene dere faktisk publiserer på.",
      "Dere velger det dere vil bruke, og alt er klart for nettsider, sosiale medier og internkommunikasjon — uten timer med etterarbeid.",
    ],
    points: [
      "Redigert utvalg, sortert etter høydepunkter",
      "Formater tilpasset web, SoMe og trykk",
      "Levering etter avtalt tidslinje",
    ],
    cta: "Slik jobber vi",
  },
  work: {
    label: "Arbeidet vårt",
    heading: "Fra internasjonale merkevarer til intime frokostmøter",
    lead: "Utforsk arbeidet etter tjeneste, eller se alle prosjektene samlet.",
    cards: [
      { title: "Eventfoto", sub: "Snapchat · DNT · OBOS · JCP", slug: "eventfoto" },
      {
        title: "Eventfilm",
        sub: "Optiver · Varner x Levi's · Nordisk Film Kino",
        slug: "eventfilm",
      },
      { title: "Alle prosjekter", sub: "Foto og film, samlet på ett sted", slug: "prosjekter" },
    ],
    linkLabel: "Se arbeidet",
  },
  process: {
    label: "Prosessen",
    heading: "Slik jobber vi",
    lead: "Vi forbereder oss alltid grundig — inkludert detaljerte shot lists — slik at du kan være trygg på at alt vesentlig ved arrangementet ditt blir fanget.",
    steps: [
      {
        number: "01",
        title: "Onboarding",
        body: "Fortell oss om arrangementet: dato, sted og hva det skal oppnå. Vi setter rammene sammen, kort tid etter at avtalen er signert.",
        promise: "Kai svarer personlig, innen én virkedag",
      },
      {
        number: "02",
        title: "Pre-produksjon",
        body: "Cirka én måned før går vi gjennom kjøreplanen i detalj og lager en shot list over nøkkeløyeblikk, detaljer og bilder som må sikres.",
        promise: "Shot list på plass før arrangementet",
      },
      {
        number: "03",
        title: "Produksjon",
        body: "Vi dokumenterer arrangementet mens det utfolder seg — planlagte høydepunkter, publikums reaksjoner og de spontane øyeblikkene imellom.",
        promise: "På plass i god tid før dørene åpner",
      },
      {
        number: "04",
        title: "Levering og evaluering",
        body: "Vi velger ut og redigerer de sterkeste bildene og klippene, leverer etter avtalt tidslinje — og møtes til evaluering uken etter.",
        promise: "Levering etter avtalt tidslinje, alltid",
      },
    ],
    note: "Det er aldri «farvel» — det er alltid «på gjensyn».",
  },
  about: {
    label: "Fotografen",
    heading: "Hei, jeg er Kai Chen.",
    body: [
      "Jeg møter deg som fotograf — bak står Chen Media AS, et fotografi-ledet innholdsbyrå spesialisert på event- og merkevarefotografering for bedrifter og arrangører.",
      "Vi jobber i skjæringspunktet mellom dokumentarfoto og merkevarestrategi: arrangementet ditt blir til visuelt innhold som fortsetter å gjøre en jobb lenge etter at det er over — i markedsføring, kommunikasjon og historiefortelling.",
    ],
    facts: [
      { value: "Foto + film", caption: "Én partner for hele leveransen" },
      { value: "Oslo", caption: "Base — oppdrag i hele Norge" },
      { value: "AS", caption: "Ryddige avtaler og fakturering" },
    ],
  },
  audience: {
    label: "Hvem vi jobber for",
    heading: "Hvem er Chen Media for?",
    lead: "Vi jobber med organisasjoner som forstår at et godt arrangement også må kommuniseres godt.",
    groups: [
      {
        title: "Konferanser og fagdager",
        items: ["Konferansearrangører", "Bransjeforeninger", "Kurs- og seminarmiljøer"],
      },
      {
        title: "Firmaevents og fester",
        items: ["Firmafester og jubileer", "Interne samlinger", "Team- og kulturarrangementer"],
      },
      {
        title: "Lanseringer og merkevarer",
        items: ["Produktlanseringer", "Butikk- og merkevareevents", "PR- og presseeventer"],
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
    lead: "Dato, sted og tidspunkt er nok. Resten tar vi i en prat etterpå.",
    photographerRole: "Eventfotograf · Chen Media",
    // NB: plassholdertall (TONs verdier) — Kai bytter til egne tall
    stats: [
      { value: "90", caption: "eventer i år" },
      { value: "45+", caption: "glade kunder" },
      { value: "6", caption: "land" },
    ],
    agenda: {
      label: "Kommende kalender",
      confirmedLabel: "bekreftet",
      openLabel: "ledige datoer",
      statusBooked: "Booket",
      statusOpen: "Ledig",
      note: "Det er fortsatt plass til arrangementet ditt på de ledige datoene — og flere enn dem.",
      autoNote: "Offentlige datoer ut året — nye bekreftede bookinger dukker opp her.",
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
      messagePh: "F.eks. årskonferanse 12. mars 2027, Oslo kongressenter, 09:00–17:00",
      points: ["Uforpliktende", "Svar innen én virkedag", "Foto + innhold for SoMe"],
      submit: "Be om et uforpliktende tilbud",
    },
    direct: "Eller send e-post direkte:",
    reply: "Kai svarer personlig, vanligvis innen én virkedag.",
    emailLabel: "E-post",
  },
  sticky: {
    available: "Ledig for arrangementet ditt",
    cta: "Be om tilbud",
  },
  footer: {
    tagline: "Eventfoto og film for bedrifter",
    rights: "Alle rettigheter forbeholdt.",
    orgLabel: "Chen Media AS",
  },
  photoPage: {
    kicker: "Eventfoto",
    title: "Øyeblikkene, dokumentert.",
    lead: "Et arrangement varer noen timer. Bildene skal vare mye lenger — og gjøre en jobb i markedsføring, rekruttering og internkommunikasjon.",
    approach: {
      label: "Tilnærmingen",
      heading: "Dokumentarisk, ikke oppstilt",
      body: [
        "Gode eventbilder handler sjelden om å be folk smile mot kameraet. Vi jobber dokumentarisk: tett nok på til å fange det som faktisk skjer, diskret nok til at ingen endrer adferd fordi vi er der.",
        "Det betyr scenen og foredragsholderne — men like mye reaksjonene i salen, samtalene i pausene og detaljene som gjør arrangementet til deres: scenografien, materiellet, stemningen i rommet.",
      ],
    },
    shotlist: {
      heading: "Shot listen — vår forsikring mot tilfeldigheter",
      body: [
        "Før hvert oppdrag gjør vi kjøreplanen din om til en konkret shot list: hvilke øyeblikk, personer og detaljer som må sikres, minutt for minutt. Den lages sammen med deg i pre-produksjonen, cirka én måned før.",
        "Under arrangementet gir den oss ro til å improvisere — de planlagte bildene er sikret, så vi kan bruke resten av tiden på øyeblikkene ingen kunne planlagt.",
      ],
    },
    galleryLabel: "Arbeid",
    galleryHeading: "Fra oppdragene",
    caseHighlights: [
      {
        client: "Snapchat",
        project: "Snap Session Frokostmøte",
        kind: "Eventfoto",
        context:
          "Frokostmøte for annonsører og byråer — fra første foredrag til siste samtale.",
      },
      {
        client: "DNT",
        project: "Arrangementer",
        kind: "Eventfoto",
        context: "Dokumentasjon for Den Norske Turistforening.",
      },
      {
        client: "OBOS",
        project: "Arrangementer",
        kind: "Eventfoto",
        context: "Eventdokumentasjon for OBOS.",
      },
      {
        client: "JCP",
        project: "Eventproduksjoner",
        kind: "Eventfoto",
        context: "Foto for arrangementer produsert av eventbyrået JCP.",
      },
    ],
    faq: {
      label: "Spørsmål vi ofte får",
      heading: "Før du spør",
      items: [
        {
          q: "Hvor diskret jobber dere under middager og taler?",
          a: "Vi fotograferer uten blits der det er mulig, beveger oss langs kantene av rommet og time-er bevegelsene våre etter programmet. Målet er at gjestene glemmer at vi er der — det er da de beste bildene oppstår.",
        },
        {
          q: "Hva med ansatte som ikke vil bli fotografert?",
          a: "Det avklarer vi i pre-produksjonen. Vi avtaler en praktisk løsning — for eksempel diskret markering eller soner — og respekterer det konsekvent gjennom hele arrangementet.",
        },
        {
          q: "Hvilke formater leveres bildene i?",
          a: "Ferdig redigerte bilder i høy oppløsning for trykk og web, eksportert i de formatene dere trenger. Format og leveringstidslinje avtales før arrangementet, ikke etterpå.",
        },
        {
          q: "Hvem eier bildene, og hva kan vi bruke dem til?",
          a: "Bruksrettighetene defineres tydelig i tilbudet — kanaler, varighet og omfang — slik at dere vet nøyaktig hva dere kan bruke bildene til, uten overraskelser i etterkant.",
        },
      ],
    },
    cta: {
      heading: "Planlegger dere et arrangement?",
      lead: "Fortell oss dato og sted, så setter vi opp en kort prat om hva bildene skal gjøre for dere.",
    },
  },
  filmPage: {
    kicker: "Eventfilm",
    title: "Skap minneverdige opplevelser med video.",
    lead: "Vi fanger stemningen, energien og de viktigste øyeblikkene fra arrangementet ditt — og klipper det til en film som forsterker budskapet.",
    craft: {
      label: "Håndverket",
      heading: "Mer enn dokumentasjon",
      body: [
        "En eventfilm skal gjøre mer enn å bevise at arrangementet fant sted. Vi kombinerer dynamiske klipp, engasjerende historiefortelling og høy produksjonskvalitet — slik at filmen kommuniserer arrangementets atmosfære, betydning og energi.",
        "Resultatet er en film som skaper engasjement hos målgruppen: internt som et bevis på kulturen deres, eksternt som en grunn til å være med neste gang.",
      ],
    },
    formats: {
      heading: "Én produksjon, flere flater",
      items: [
        {
          title: "Hovedfilm",
          body: "Arrangementets historie fortalt i én film — til nettsider, presentasjoner og neste års invitasjon.",
        },
        {
          title: "Korte klipp for sosiale medier",
          body: "Vertikale kutt fra samme produksjon, klare for Instagram, TikTok og LinkedIn mens arrangementet fortsatt er ferskt.",
        },
        {
          title: "Råmateriale etter avtale",
          body: "Trenger dere klipp til eget bruk, avtales omfang og rettigheter tydelig i tilbudet.",
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
        context: "Energien i rommet, deltakerne og øyeblikkene som definerte kvelden.",
      },
      {
        client: "Aktiv Eiendomsmegling",
        project: "Pitch Event",
        kind: "Eventfilm",
        context: "Pitch-event dokumentert med film for intern og ekstern bruk.",
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
          a: "Det avhenger av hva filmen skal gjøre. En hovedfilm lander typisk på ett til tre minutter — lang nok til å fortelle historien, kort nok til at folk ser den ferdig. Lengde og antall versjoner avtales i tilbudet.",
        },
        {
          q: "Hva med musikk og rettigheter?",
          a: "Vi bruker lisensiert musikk som er klarert for kanalene filmen skal brukes i, og bruksrettighetene for selve filmen defineres tydelig i tilbudet — kanaler, varighet og omfang.",
        },
        {
          q: "Kan vi få korte klipp til sosiale medier raskt?",
          a: "Ja — vertikale kutt for sosiale medier kan prioriteres i leveransen slik at dere har innhold å publisere mens arrangementet fortsatt er ferskt. Tidslinjen avtales før arrangementet.",
        },
        {
          q: "Trenger dere mye utstyr og plass?",
          a: "Mindre enn du tror. Vi planlegger kamerapunkter i pre-produksjonen ut fra lokalet og programmet, og jobber diskret — arrangementet er hovedpersonen, ikke produksjonen.",
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
    lead: "Alle oppdragene vi viser frem, på ett sted — foto og film, fra intime frokostmøter til store produksjoner.",
    filterAll: "Alle",
    items: [
      {
        client: "Snapchat",
        project: "Snap Session Frokostmøte",
        kind: "Eventfoto",
        context:
          "Frokostmøte i Oslo for annonsører og byråer — dokumentert fra første foredrag til siste samtale over kaffen.",
      },
      {
        client: "Optiver",
        project: "Pitch Event",
        kind: "Eventfilm",
        context:
          "Pitch-event fanget på film — energien i rommet, deltakerne og øyeblikkene som definerte kvelden.",
      },
      {
        client: "Aktiv Eiendomsmegling",
        project: "Pitch Event",
        kind: "Eventfilm",
        context: "Pitch-event dokumentert med film for intern og ekstern bruk.",
      },
      {
        client: "Varner x Levi's",
        project: "Butikkevent",
        kind: "Eventfilm",
        context:
          "Merkevareevent for Levi's i Varner-systemet — film bygget for sosiale medier og intern bruk.",
      },
      {
        client: "Ignite Procurement x Hurtigruten",
        project: "Kundearrangement",
        kind: "Eventfilm",
        context:
          "Kundearrangement dokumentert med film — historiefortelling som løfter samarbeidet mellom to merkevarer.",
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
      {
        client: "DNT",
        project: "Arrangementer",
        kind: "Eventfoto",
        context: "Dokumentasjon for Den Norske Turistforening.",
      },
      {
        client: "OBOS",
        project: "Arrangementer",
        kind: "Eventfoto",
        context: "Eventdokumentasjon for OBOS.",
      },
      {
        client: "JCP",
        project: "Eventproduksjoner",
        kind: "Eventfoto",
        context: "Foto for arrangementer produsert av eventbyrået JCP.",
      },
    ],
  },
  newsPage: {
    kicker: "Nyheter",
    title: "Notater fra arbeidet.",
    lead: "Det som skjer hos Chen Media: nye prosjekter, erfaringer fra oppdrag og ting vi har lært underveis.",
    readLabel: "Fra oppdraget",
    entries: [
      {
        tag: "Eventfoto",
        title: "Snap Session: å dokumentere et frokostmøte uten å forstyrre det",
        body: "For Snapchats frokostmøte i Oslo jobbet vi langs kantene av rommet — uten blits, timet etter programmet. Resultatet: bilder der ingen poserer, og stemningen er ekte.",
      },
      {
        tag: "Eventfilm",
        title: "Pitch-eventer på film: energien er poenget",
        body: "To pitch-eventer — Optiver og Aktiv Eiendomsmegling — lærte oss det samme: filmen skal ikke referere programmet, den skal gjenskape følelsen av å være i rommet.",
      },
      {
        tag: "Bak kamera",
        title: "Hvorfor vi alltid lager shot list",
        body: "Kjøreplanen din blir til en konkret liste over øyeblikk som må sikres, minutt for minutt. Det gir ro til å improvisere — de planlagte bildene er allerede i boks.",
      },
    ],
  },
  ticker: { alt: "Utvalg fra arbeidet vårt" },
};
