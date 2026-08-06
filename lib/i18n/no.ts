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
  },
  nav: {
    photo: "Eventfoto",
    film: "Eventfilm",
    about: "Om oss",
    contact: "Kontakt",
    cta: "Be om tilbud",
  },
  hero: {
    kicker: "Foto & film — Oslo / hele Norge",
    title: "Vi fanger",
    titleAccent: "øyeblikkene.",
    lead: "Eventfoto og film for bedrifter. Vi dokumenterer konferanser, lanseringer og firmaevents — og leverer innhold som fortsatt jobber for dere lenge etter at lokalet er ryddet.",
    ctaPrimary: "Be om tilbud",
    ctaSecondary: "Se arbeidet",
    clientsLabel: "Utvalgte oppdragsgivere",
  },
  services: {
    label: "Hva vi gjør",
    heading: "Foto og film",
    photo: {
      title: "Eventfoto",
      body: [
        "Vi jobber dokumentarisk. Kjøreplanen din blir til en shot list før vi løfter kameraet, og under arrangementet står vi der øyeblikkene skjer — på scenen, i salen og i alt som utspiller seg i pausene.",
        "Dere får et ferdig redigert utvalg som speiler arrangementets tone og profil. Klart for nettsider, sosiale medier og internkommunikasjon.",
      ],
      link: "Mer om eventfoto",
    },
    film: {
      title: "Eventfilm",
      body: [
        "Vi fanger stemningen, energien og de viktigste øyeblikkene fra arrangementet ditt. Dynamiske klipp, engasjerende historiefortelling og høy produksjonskvalitet.",
        "Resultatet er en film som ikke bare dokumenterer, men forsterker budskapet — og skaper engasjement hos målgruppen.",
      ],
      link: "Mer om eventfilm",
    },
  },
  cases: {
    label: "Utvalgte oppdrag",
    heading: "Arbeid vi står for",
    lead: "Fra intime frokostmøter til store produksjoner. Et utvalg av arrangementene vi har dokumentert for kundene våre.",
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
    ],
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
    label: "Om oss",
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
  contact: {
    label: "Kontakt",
    heading: "Har dere et arrangement på kalenderen?",
    lead: "Dato og sted er nok til å starte. Fortell oss kort om arrangementet, så tar vi resten i en uforpliktende prat.",
    emailLabel: "E-post",
    cta: "Send en melding",
    reply: "Kai svarer personlig, vanligvis innen én virkedag.",
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
  ticker: { alt: "Utvalg fra arbeidet vårt" },
};
