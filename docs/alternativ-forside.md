# Alternativ forside: fire fagområder

Et utkast til ny forside, lagt på sin egen URL så den kan åpnes side om side
med dagens. Den er ikke lenket fra menyen og er merket `noindex`.

| | Dagens forside | Utkastet |
|---|---|---|
| URL | `/` og `/en` | `/alternativ` og `/en/alternativ` |
| Fil | `app/[locale]/page.tsx` | `app/[locale]/alternativ/page.tsx` |
| Tekst | `lib/i18n/no.ts`, `en.ts` | `lib/i18n/alt-home.ts` |
| Premiss | Eventfoto og eventfilm | Fire fagområder |
| Status | **Publisert** | Utkast |

```bash
npm run dev
# http://localhost:3000/alternativ
# http://localhost:3000/en/alternativ
```

## Hva utkastet prøver ut

Dagens forside selger én ting: at arrangementet ditt skal nå lenger enn
lokalet. Alt på siden peker dit — heroen, de tre tjenestekortene, prosessen
med shot list og kjøreplan, målgruppene.

Utkastet flytter event fra premiss til punkt. Event er ett av fem punkter
under Fotografering og ett av åtte under Videoproduksjon, og fire fagområder
står som likeverdige innganger:

| | Fagområde | Tjenester |
|---|---|---|
| 01 | Fotografering | 5 |
| 02 | Videoproduksjon | 8 |
| 03 | Merkevare og innhold | 4 |
| 04 | Kreativ produksjon | 5 |

Hvert fagområde får en egen seksjon der hele tjenestelisten står synlig. Det
er hele poenget: bredden skal leses på forsiden, ikke først etter et klikk.

Den andre endringen er den mørke seksjonen. Dagens sier «arrangementet lever
videre etterpå». Utkastet sier «fra enkeltoppdrag til fast innholdspartner»,
fordi månedlig innholdsproduksjon er en abonnementsforretning og ikke et
oppdrag som skal selges én gang.

## Seksjonsrekkefølge

1. Utkastbånd (bare her, forsvinner om siden publiseres)
2. Hero, med innholdsfortegnelse over de fire fagområdene
3. Fotostripe
4. Oversikt: fire kort
5.–8. Én seksjon per fagområde, med hele tjenestelisten
9. Fast innholdspartner (mørk)
10. Logovegg
11. Prosess (mørk)
12. Om Kai
13. Hvem det er for
14. Kontakt

## Hva som er gjenbrukt

Siden bruker `PhotoTicker`, `LogoWall`, `CrewLine`, `SectionLabel`,
`CtaButton`, `PlaceholderImage`, `Underline` og `ContactCTA` uendret. Ingen
komponent er endret for utkastets skyld.

Prosess-seksjonen er skrevet ut i sidefilen i stedet for å bruke
`ProcessTimeline`. Den komponenten leser `dict.process`, altså den
event-spesifikke teksten om shot list og kjøreplan. Stegene her må gjelde
alle fire fagområdene.

## Bilder

Siden har seks egne flater i gruppen «Alternativ forside» i `/admin/bilder`:
`alt-hero`, `alt-omrade-1` til `alt-omrade-4` og `alt-abonnement`. Fram til
de fylles, viser de standardbildene fra KarpeWorld — som betyr at
Fotografering, Videoproduksjon og Kreativ produksjon alle illustreres med
bilder fra ett og samme musikkoppdrag.

Det er den største svakheten ved utkastet akkurat nå. En forside som påstår
fem fotodisipliner og viser åtte bilder fra samme festival, beviser det
motsatte av det den sier. Minst ett ekte bilde per fagområde bør på plass før
siden vises til noen utenfor.

## Tekst som må bekreftes

- **Tjenestepunktene under Kreativ produksjon** er et forslag, merket `NB:` i
  `lib/i18n/alt-home.ts`. Kai oppga fagområdet som «produsent, koordinator
  etc. for den kreative produksjonen». De fem punktene er utledet av det, ikke
  oppgitt.
- **Løftene i prosess-stegene** («innen én virkedag», «levering til avtalt
  tid») er arvet fra dagens forside og har samme problem som der: de er ikke
  etterprøvbare. Se `docs/tekstvarianter.md`.
- **Engelsk** er oversatt fra norsk uten gjennomgang.

## Om utkastet skal publiseres

1. Flytt feltene fra `lib/i18n/alt-home.ts` inn i `Dictionary`
   (`lib/i18n/types.ts`) og fyll dem i alle fire tekstfilene, `no.ton.ts` og
   `en.ton.ts` inkludert. Da kan `app/[locale]/page.tsx` bytte innhold og
   `/alternativ` slettes.
2. `nav.services`-dropdownen har to oppføringer, eventfoto og eventfilm. Fire
   fagområder trenger fire dybdesider; to av dem finnes ikke.
   `ServiceCard["slug"]` i `lib/i18n/types.ts` er en union av de tre stiene
   som finnes i dag og må utvides sammen med sidene.
3. `meta.home` og `ProfessionalService`-schemaet i `app/[locale]/layout.tsx`
   sier begge «eventfoto og film». Begge må skrives om, ellers spriker
   søkeresultatet fra siden det peker på.
4. `footer.tagline` sier det samme.
5. Fjern utkastbåndet og `robots: { index: false }`.

Punkt 2 er det tunge. Utkastet lover fire fagområder på forsiden, og to av
dem har ingen side å sende folk til — Merkevare og innhold og Kreativ
produksjon peker begge rett på kontaktskjemaet.
