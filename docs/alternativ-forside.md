# Alternativ forside: fire innganger i stedet for én

Et utkast til ny forside, lagt på sin egen URL så den kan åpnes side om side
med dagens. Den er ikke lenket fra menyen og er merket `noindex`.

| | Dagens forside | Utkastet |
|---|---|---|
| URL | `/` og `/en` | `/alternativ` og `/en/alternativ` |
| Fil | `app/[locale]/page.tsx` | `app/[locale]/alternativ/page.tsx` |
| Tekst | `lib/i18n/no.ts`, `en.ts` | `lib/i18n/alt-home.ts` |
| Premiss | Eventfoto og eventfilm | Foto, film, innhold, produksjon |
| Status | **Publisert** | Utkast |

```bash
npm run dev
# http://localhost:3000/alternativ
# http://localhost:3000/en/alternativ
```

## Hva utkastet prøver ut

Dagens forside selger én ting: at arrangementet ditt skal nå lenger enn
lokalet. Alt peker dit — heroen, de tre tjenestekortene, prosessen med shot
list og kjøreplan, målgruppene.

Utkastet flytter event fra premiss til punkt. Event er ett av fem punkter
under Foto og ett av åtte under Film, og fire ting står som likeverdige
innganger:

| | Kategori | Overskrift | Tjenester |
|---|---|---|---|
| 01 | Foto | Bilder som gjør en jobb | 5 |
| 02 | Film | Film folk ser ferdig | 8 |
| 03 | Innhold | Kanaler som aldri går tomme | 4 |
| 04 | Produksjon | Noen som holder i alle trådene | 5 |

Kategorinavnet og overskriften er delt med vilje, og ligger som `label` og
`title` på `AltArea`. `label` er ordet folk skanner og søker etter — «foto»,
«film» — og står i innholdsfortegnelsen og metaraden. `title` er
overskriften seksjonen bærer, og sier hva kunden sitter igjen med i stedet
for hva utstyret heter.

Hver kategori får en egen seksjon der hele tjenestelisten står synlig. Det
er hele poenget: bredden skal leses på forsiden, ikke først etter et klikk.

Den andre endringen er salgslogikken. Dagens forside har én måte å kjøpe på,
underforstått enkeltoppdraget. Utkastet setter opp tre — enkeltoppdrag,
prosjekt og fast avtale — med den faste avtalen framhevet, fordi månedlig
innholdsproduksjon er en abonnementsforretning og ikke et oppdrag som skal
selges én gang.

## Seksjonsrekkefølge

| | Seksjon | Bakgrunn |
|---|---|---|
| | Utkastbånd (forsvinner om siden publiseres) | shell |
| | Hero, med innholdsfortegnelse | cream |
| | Fotostripe | shell |
| | Oversikt: fire kort | cream |
| 01 | Foto | cream |
| 02 | Film | shell |
| 03 | Innhold | cream |
| 04 | Produksjon | shell |
| | Arbeidet vårt, fire navngitte oppdrag | **ink** |
| | Logovegg | cream |
| | Samarbeidet, tre måter å kjøpe på | shell |
| | Prosessen, fire steg | **ink** |
| | Om Kai | cream |
| | Hvem det er for | shell |
| | Ofte spurt | cream |
| | Kontakt | **ink** |

De tre mørke flatene ligger spredt utover med vilje: siden får aldri to mørke
seksjoner på rad, og aldri fire lyse.

Bare de fire kategoriseksjonene har nummer i etiketten. Numrene tilhører
settet, og en konkurrerende 01–14-nummerering over hele siden ville gjort
dem meningsløse.

## Hva som er gjenbrukt

`PhotoTicker`, `LogoWall`, `CrewLine`, `SectionLabel`, `CtaButton`,
`PlaceholderImage`, `CaseList`, `Faq`, `Underline` og `ContactCTA` — alle
uendret. Ingen komponent er rørt for utkastets skyld.

Prosess-seksjonen er skrevet ut i sidefilen i stedet for å bruke
`ProcessTimeline`. Den komponenten leser `dict.process`, altså den
event-spesifikke teksten om shot list og kjøreplan. Stegene her må gjelde
alle fire kategoriene.

Casene i «Arbeidet vårt» er de fire første fra `dict.projectsPage.items`,
altså faktiske oppdrag som allerede står på prosjektsiden. Ingen nye
kundenavn er funnet på.

## Det mockupen avdekker: rammen rundt sier fortsatt «event»

Siden ligger inni `app/[locale]/layout.tsx` og bruker `ContactCTA`, som
begge leser den publiserte `Dictionary`. Utkastet kan ikke overstyre dem
uten å endre den levende forsiden, så de står med event-teksten sin midt i
en side som lover fire ting. Det er ikke en feil i utkastet — det er listen
over hva som må skrives om samtidig, og den er lettest å se i mockupen:

| Hvor | Nøkkel | Står nå |
|---|---|---|
| Sticky-baren | `sticky.available` | «Ledig for arrangementet ditt» |
| Kontaktkortet | `contact.photographerRole` | «Eventfotograf · Chen Media» |
| Skjemafeltet | `contact.form.message` | «Fortell oss om arrangementet» |
| Hjelpeteksten | `contact.form.messageHint` | «(dato, sted og tidspunkt er nok)» |
| Plassholderen | `contact.form.messagePh` | «F.eks. årskonferanse 12. mars 2027 …» |
| Skjemapunktene | `contact.form.points` | «Foto og film samlet» |
| Kalenderen | `contact.agenda.*` | Bygget for datobooking av arrangementer |
| Bunnteksten | `footer.tagline` | «Eventfoto og film for bedrifter» |
| Menyen | `nav.photo`, `nav.film` | «Eventfoto», «Eventfilm» |

Skjemaet er det som haster mest. En besøkende som nettopp har lest at Chen
Media gjør bilfoto og månedlig innholdsproduksjon, får som første spørsmål
«fortell oss om arrangementet» — og det er da henvendelsen stopper.

## Bilder

Fem egne flater i gruppen «Alternativ forside» i `/admin/bilder`:
`alt-hero` og `alt-omrade-1` til `alt-omrade-4`. De fire siste brukes to
steder hver — stående i oversiktskortet, liggende i seksjonen under — så
fokuspunktet må settes så motivet tåler begge beskjæringene.

Fram til de fylles, viser de standardbildene fra KarpeWorld. Det er den
største svakheten ved utkastet: en forside som påstår fem fotodisipliner og
viser åtte bilder fra samme festival, beviser det motsatte av det den sier.
Minst ett ekte bilde per kategori bør på plass før siden vises til noen
utenfor.

## Tekst som må bekreftes

- **Tjenestepunktene under Produksjon** er et forslag, merket `NB:` i
  `lib/i18n/alt-home.ts`. Kai oppga kategorien som «produsent, koordinator
  etc. for den kreative produksjonen». De fem punktene er utledet av det,
  ikke oppgitt.
- **De tre samarbeidsformene** er også et forslag. Innholdet i hver av dem,
  og hvilken som skal være framhevet, er en forretningsbeslutning.
- **Løftene i prosess-stegene** («innen én virkedag», «levering til avtalt
  tid») er arvet fra dagens forside og har samme problem som der: de er ikke
  etterprøvbare. Se `docs/tekstvarianter.md`.
- **Svarene i FAQ** beskriver hvordan Chen Media jobber i dag slik det står
  ellers på nettstedet. Hurtiguttaket og reiselinjen i tilbudet må bekreftes.
- **Engelsk** er oversatt fra norsk uten gjennomgang.

Utkastet har med vilje ingen kundesitater. De finnes ikke, og et oppdiktet
sitat på en kommersiell side er verre enn ingen.

## Om utkastet skal publiseres

1. Flytt feltene fra `lib/i18n/alt-home.ts` inn i `Dictionary`
   (`lib/i18n/types.ts`) og fyll dem i alle fire tekstfilene, `no.ton.ts` og
   `en.ton.ts` inkludert. Da kan `app/[locale]/page.tsx` bytte innhold og
   `/alternativ` slettes.
2. `nav.services`-dropdownen har to oppføringer, eventfoto og eventfilm.
   Fire kategorier trenger fire dybdesider; to av dem finnes ikke.
   `ServiceCard["slug"]` i `lib/i18n/types.ts` er en union av de tre stiene
   som finnes i dag og må utvides sammen med sidene.
3. `meta.home` og `ProfessionalService`-schemaet i `app/[locale]/layout.tsx`
   sier begge «eventfoto og film». Begge må skrives om, ellers spriker
   søkeresultatet fra siden det peker på.
4. Alle nøklene i tabellen over, `footer.tagline` og kontaktskjemaet
   inkludert.
5. Prosjektsiden viser bare event-oppdrag. En forside som lover bilfoto,
   interiør og fashion trenger case som viser det.
6. Fjern utkastbåndet og `robots: { index: false }`.

Punkt 2 og 5 er de tunge. Utkastet lover fire innganger på forsiden, og to
av dem har ingen side å sende folk til — Innhold og Produksjon peker begge
rett på kontaktskjemaet.
