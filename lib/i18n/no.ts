import type { Dictionary } from "./types";

export const no: Dictionary = {
  meta: {
    siteName: "Chen Media",
    home: {
      title: "Chen Media | Eventfoto og film for bedrifter",
      description:
        "Chen Media tar bilder og film på konferanser, lanseringer og firmaevents. Du får innhold du faktisk får brukt.",
    },
    photo: {
      title: "Eventfoto | Chen Media",
      description:
        "Eventfotograf for bedrifter. Vi lager shot list av kjøreplanen din, jobber diskret og leverer et ferdig redigert utvalg.",
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
    lead: "Eventfotograf for konferanser, lanseringer og firmafester. Foto og film siden 2020. Et redigert førsteutvalg i hendene deres dagen etter.",
    ctaPrimary: "Be om et uforpliktende tilbud",
    ctaSecondary: "Se arbeidet",
    clientsLabel: "Alene, eller med et komplett crew når arrangementet krever det",
    polaroidBadge: "Foto + film siden 2020",
  },
  clients: {
    label: "Merkevarer og organisasjoner jeg har jobbet med",
  },
  services: {
    label: "Hva vi gjør",
    heading: "Tjenestene våre",
    lead: "Tre tjenester, ett mål: at arrangementet ditt skal nå lenger enn lokalet.",
    cards: [
      {
        title: "Eventfoto",
        body: "Skarpe, stemningsfulle bilder av hele arrangementet. Scenen, salen og alt som skjer i pausene. Ingen høydepunkter går tapt.",
        points: [
          "Shot list bygget på kjøreplanen din",
          "Diskret tilstedeværelse uten blits",
          "Redigert utvalg i høy oppløsning",
        ],
        linkLabel: "Mer om eventfoto",
        slug: "eventfoto",
      },
      {
        title: "Eventfilm",
        body: "En film som får frem stemningen og bærer budskapet. Dynamiske klipp, ordentlig lyd og produksjonskvalitet som tåler å bli vist frem.",
        points: [
          "Hovedfilm på ett til tre minutter",
          "Vertikale kutt til sosiale medier",
          "Lisensiert musikk, klarert for kanalene",
        ],
        linkLabel: "Mer om eventfilm",
        slug: "eventfilm",
      },
      {
        title: "Foto og film samlet",
        body: "Stort arrangement? Da tar vi foto og film i samme produksjon, med én briefing og én tidslinje. Forberedelsene går bort fra ditt bord.",
        points: [
          "Foto og film under samme tak",
          "Én kontakt, én avtale, én tidslinje",
          "Samme uttrykk i alt innhold",
        ],
        linkLabel: "Se prosjektene",
        slug: "prosjekter",
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
  },
  work: {
    label: "Arbeidet vårt",
    heading: "Fra store merkevarer til små frokostmøter",
    lead: "Bla gjennom arbeidet etter type arrangement, eller se alle prosjektene samlet.",
    cards: [
      { title: "Eventfoto", sub: "Snapchat · DNT · OBOS · JCP", slug: "eventfoto" },
      {
        title: "Eventfilm",
        sub: "Optiver · Varner x Levi's · Nordisk Film Kino",
        slug: "eventfilm",
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
  photoPage: {
    kicker: "Eventfoto",
    title: "Øyeblikkene, dokumentert.",
    lead: "Et arrangement varer noen timer. Bildene skal vare mye lenger og gjøre en jobb i markedsføring, rekruttering og internkommunikasjon.",
    approach: {
      label: "Tilnærmingen",
      heading: "Dokumentarisk, ikke oppstilt",
      body: [
        "Gode eventbilder handler sjelden om å be folk smile til kameraet. Vi jobber dokumentarisk, tett nok på til å fange det som faktisk skjer og diskret nok til at ingen legger merke til oss.",
        "Det betyr scenen og foredragsholderne, men like mye reaksjonene i salen, samtalene i pausene og detaljene som gjør arrangementet til deres.",
      ],
    },
    shotlist: {
      heading: "Shot listen er forsikringen vår mot tilfeldigheter",
      body: [
        "Før hvert oppdrag gjør vi kjøreplanen din om til en konkret shot list: hvilke øyeblikk, personer og detaljer som må sikres, minutt for minutt. Den lager vi sammen med deg cirka en måned før.",
        "Under arrangementet gir den oss ro til å improvisere. De planlagte bildene er sikret, så vi kan bruke resten av tiden på øyeblikkene ingen kunne planlagt.",
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
          "Frokostmøte for annonsører og byråer, fra første foredrag til siste kaffekopp.",
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
          a: "Vi fotograferer uten blits der det går, beveger oss langs kantene av rommet og timer bevegelsene etter programmet. Målet er at gjestene glemmer at vi er der. Det er da de beste bildene oppstår.",
        },
        {
          q: "Hva med ansatte som ikke vil bli fotografert?",
          a: "Det avklarer vi på forhånd. Vi blir enige om en praktisk løsning, for eksempel egne soner eller diskret markering, og respekterer den gjennom hele arrangementet.",
        },
        {
          q: "Hvilke formater leveres bildene i?",
          a: "Ferdig redigerte bilder i høy oppløsning for trykk og web, i de formatene dere trenger. Formater og leveringstid avtaler vi før arrangementet, ikke etterpå.",
        },
        {
          q: "Hvem eier bildene, og hva kan vi bruke dem til?",
          a: "Bruksrettighetene står tydelig i tilbudet: kanaler, varighet og omfang. Da vet dere nøyaktig hva bildene kan brukes til.",
        },
      ],
    },
    cta: {
      heading: "Planlegger dere et arrangement?",
      lead: "Fortell oss dato og sted, så tar vi en kort prat om hva bildene skal gjøre for dere.",
    },
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
    lead: "Alle oppdragene vi viser frem, på ett sted. Foto og film, fra små frokostmøter til store produksjoner.",
    filterAll: "Alle",
    items: [
      {
        client: "Snapchat",
        project: "Snap Session Frokostmøte",
        kind: "Eventfoto",
        context:
          "Frokostmøte i Oslo for annonsører og byråer, dokumentert fra første foredrag til siste kaffekopp.",
      },
      {
        client: "Optiver",
        project: "Pitch Event",
        kind: "Eventfilm",
        context:
          "Pitchkveld fanget på film, med energien i rommet og øyeblikkene som definerte kvelden.",
      },
      {
        client: "Aktiv Eiendomsmegling",
        project: "Pitch Event",
        kind: "Eventfilm",
        context: "Pitchkveld dokumentert med film til intern og ekstern bruk.",
      },
      {
        client: "Varner x Levi's",
        project: "Butikkevent",
        kind: "Eventfilm",
        context:
          "Merkevareevent for Levi's hos Varner, med film laget for sosiale medier og intern bruk.",
      },
      {
        client: "Ignite Procurement x Hurtigruten",
        project: "Kundearrangement",
        kind: "Eventfilm",
        context:
          "Kundearrangement dokumentert med film som løfter samarbeidet mellom to merkevarer.",
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
