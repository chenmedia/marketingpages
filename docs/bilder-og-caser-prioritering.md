# Hva skal vises først

`bilder.md` beskriver hvordan en bildeflate fylles. Dette dokumentet handler bare om
**hvilke** — hvilke flater, hvilke caser, i hvilken rekkefølge.

Grunnen til at det trengs: nettsiden har 34 bildeflater, 32 av dem på forsiden, og
`/admin/bilder` viser dem som 34 like bokser. Da blir ingen av dem fylt. Alle 34 står
fortsatt på standardbildene fra KarpeWorld, mens tekstene lover konferanser og
firmaevents. En liste uten rangering er en liste ingen jobber seg gjennom.

## Testen

Tre spørsmål per bilde. Nei på ett av dem, og bildet er ute.

1. **Ser dette ut som arrangementet kunden min skal holde?** Kjøperen er en markedssjef
   som skal ha årskonferanse. Scenelys og publikumshav svarer nei, uansett hvor bra
   bildet er.
2. **Er det ett tydelig motiv som tåler beskjæring?** Samme bilde kuttes til alt fra 4:5
   til 9:16 til en sirkel på 44 piksler. Et bilde med motivet spredt utover overlever ikke
   turen.
3. **Har jeg lov å publisere det?** Avklares før opplasting, ikke etter.

Samme test på en case, med ett tillegg: *kan jeg si noe konkret om oppdraget, eller har
jeg bare navnet?*

## Bildeflatene, i tre nivåer

Rekkefølgen følger hva en besøkende faktisk ser, ikke rekkefølgen i `SLOTS`. Forsiden
scroller slik: hero → fotostripe → tjenester → leveranse → arbeidet → logovegg → om →
prosess → publikum → kontakt.

### Nivå 1 — de åtte som avgjør

| Flate | Format | Hvorfor først |
| --- | --- | --- |
| `hero-1` | 4:3 * | Det aller første som ses, og de eneste med synlig bildetekst. Se under. |
| `hero-2` | 4:3 * | |
| `hero-3` | 4:3 * | |
| `stripe-1` | liggende | Fotostripen er seksjon nummer to. Disse tre er synlige når den starter. |
| `stripe-2` | liggende | |
| `stripe-3` | liggende | |
| `om-portrett` | 4:5 | Gjør Chen Media til en person. |
| `kontakt-portrett` | fri | Samme, og går igjen på alle fem sidene. |

Er bare disse åtte fylt, har forsiden allerede sluttet å se ut som en festivalside.

**Bildeteksten under polaroidene er den mest synlige plassholderen på hele siden.** Den
står ikke i et bilde, den står i klartekst: «KarpeWorld · Oslo», «KarpeWorld · scenen»,
«Red Bull · aktivering». Teksten hentes fra `caption` i `site_images` og faller tilbake på
de tre strengene i `app/[locale]/page.tsx`. Skriv bildetekst i admin når du laster opp
hero-bildene, så forsvinner de av seg selv — dette er den ene endringen som gir mest
tilbake for minst arbeid.

### Nivå 2 — de elleve som selger tjenesten

| Flate | Format | Hva den skal vise |
| --- | --- | --- |
| `tjeneste-1` `tjeneste-2` `tjeneste-3` | 3:2 | Ett bilde per tjeneste, tydelig forskjellige fra hverandre. |
| `leveranse-hoved` | 4:3 | Hele bildet. |
| `leveranse-some` `leveranse-web` `leveranse-trykk` | 9:16 | Tre utsnitt av **samme** bilde som `leveranse-hoved`. Det er hele poenget i seksjonen: ett øyeblikk, tre formater. Brukes ulike bilder, faller argumentet. |
| `arbeid-1` `arbeid-2` `arbeid-3` | 4:5 * | Tre ulike arrangementstyper, ikke tre bilder fra samme jobb. Stående, ikke liggende. |
| ~~`arbeid-4`~~ | — | Rendres aldri. Se under. |

### Nivå 3 — de femten som kan vente

`stripe-4` … `stripe-8`, `publikum-1` … `publikum-4`, `crew-1` … `crew-3`,
`eventfoto-hero`, `eventfilm-hero`, `kontakt-bakgrunn`.

Crew-sirklene er 44 piksler og dekorative — velg motiver som er store nok til å tåle det,
eller la dem stå. `eventfoto-hero` og `eventfilm-hero` flyttes opp til nivå 2 den dagen
tjenestesidene får trafikk fra annonser.

## Tre feller i admin

Stjernene over. Alle tre koster deg tid hvis du ikke vet om dem.

**Formatet admin viser stemmer ikke for hero og arbeid.** `ratio` i `lib/images/slots.ts`
skal si hvilket format flaten faktisk beskjæres til, men to grupper er feil, og for arbeid
er den snudd på hodet:

| Flate | Admin sier | Beskjæres faktisk til |
| --- | --- | --- |
| `hero-1` `hero-2` `hero-3` | 4:5 | **4:3** |
| `arbeid-1` … `arbeid-4` | 4:3 | **4:5** |

Velger du et liggende bilde til `arbeid-1` fordi admin sa 4:3, blir det kuttet til stående.
Resten av flatene stemmer. Verdt å rette i `slots.ts` ved anledning, men inntil da: bruk
tabellen her.

**`arbeid-4` rendres aldri.** Kortene bygges fra `work.cards`, som har tre kort, og
kallstedet gjør `arbeid-${(i % 4) + 1}`. Med tre kort brukes bare `arbeid-1` til
`arbeid-3`. Flaten står i admin og ser ut som en oppgave, men ingenting viser den. Av 34
flater er 33 i bruk.

**`kontakt-bakgrunn` og crew-sirklene er dekorative.** De får `alt=""` med vilje. Du
trenger ikke skrive alt-tekst der, og admin krever den ikke.

## Du trenger ikke 34 bilder

Samme bilde kan fylle flere flater, og gjør det allerede. Nivå 1 og 2 er 19 flater, hvorav 18 faktisk
rendres, og de dekkes av rundt tolv bilder:

- **4 stående (4:5)** — de tre polaroidene og portrettet av Kai
- **1 portrett til** — `kontakt-portrett`, gjerne Kai bak kamera under et oppdrag
- **3 liggende** — de første rammene i fotostripen
- **3 liggende (3:2)** — tjenestekortene
- **1 bilde med god luft** — `leveranse-hoved` pluss de tre 9:16-utsnittene
- **resten** — `arbeid-1` til `arbeid-3` kan gjenbruke stående bilder fra listen over, så
  lenge de tre viser forskjellige typer arrangement

Det er én god jobb, ikke et helt arkiv. Sett fokuspunkt på hvert bilde med en gang — uten
det kutter 9:16-utsnittet hodet av folk.

## Casene

Casene ligger i `lib/i18n/no.ts` og `en.ts`, fordelt på **tre** arrayer:

| Array | Vises på | Innhold |
| --- | --- | --- |
| `projectsPage.items` | `/prosjekter` | alle ti |
| `photoPage.caseHighlights` | `/eventfoto` | Snapchat, DNT, OBOS, JCP |
| `filmPage.caseHighlights` | `/eventfilm` | Optiver, Aktiv Eiendomsmegling, Nordisk Film Kino, Av-og-til |

`CaseList` rendrer hvert array slik det står, så **rekkefølgen i arrayet er
prioriteringen.** Å flytte en case opp er hele jobben. Men den samme casen finnes to
steder — flytter du Snapchat øverst i `projectsPage.items`, skjer det ingenting på
`/eventfoto`. Begge må endres.

Poeng 0–2 på hvert punkt. «Bevis» er kolonnen du fyller selv.

| Case | Gjenkjennelse | Relevans | Substans | Sum | Bevis? |
| --- | --- | --- | --- | --- | --- |
| Snapchat — Snap Session | 2 | 2 | 2 | **6** | |
| Optiver — Pitch Event | 1 | 2 | 2 | **5** | |
| Aktiv Eiendomsmegling — Pitch Event | 2 | 2 | 1 | **5** | |
| Ignite Procurement x Hurtigruten | 2 | 2 | 1 | **5** | |
| Varner x Levi's — Butikkevent | 2 | 1 | 1 | **4** | |
| Nordisk Film Kino | 2 | 1 | 0 | **3** | |
| DNT — Arrangementer | 2 | 1 | 0 | **3** | |
| OBOS — Arrangementer | 2 | 1 | 0 | **3** | |
| Av-og-til — Kampanjearrangement | 1 | 1 | 0 | **2** | |
| JCP — Eventproduksjoner | 1 | 1 | 0 | **2** | |

**Gjenkjennelse:** sier navnet noe til en norsk markedssjef?
**Relevans:** er det arrangementet vi selger — konferanse, frokostmøte, firmaevent — eller
noe annet? Butikkevent og kampanje scorer lavere fordi de peker et annet sted enn teksten.
**Substans:** står det noe konkret i `context`, eller bare navnet om igjen?

### Det som følger av tabellen

**Anbefalt topp fem:** Snapchat, Optiver, Aktiv Eiendomsmegling, Ignite x Hurtigruten,
Varner x Levi's. Snapchat scorer fullt på alt og hører øverst.

**Den billigste jobben er de tre nederst med kjent navn.** Nordisk Film Kino, DNT og OBOS
har full gjenkjennelse og null substans — «Filmproduksjon for Nordisk Film Kino.» sier
ingenting. To setninger om hva oppdraget faktisk var, og de går fra 3 til 5. Det er mer
verdt enn å legge til en ellevte case.

**De to sterkeste filmcasene er begravd.** Varner x Levi's og Ignite x Hurtigruten står
bare i `projectsPage.items`. De er ikke med i `filmPage.caseHighlights` og vises altså
ikke på `/eventfilm`, mens Av-og-til (2 poeng) gjør det. Bytt.

**Forsiden lover noe annet enn siden den lenker til.** `work.cards[].sub` er faste
strenger:

```
Eventfoto:  "Snapchat · DNT · OBOS · JCP"     ← stemmer med photoPage.caseHighlights
Eventfilm:  "Optiver · Varner x Levi's · Nordisk Film Kino"
```

Fotolinjen står bra. Filmlinjen nevner Varner, men klikker du deg inn på `/eventfilm`
finnes ikke Varner der. Enten legg Varner inn i `filmPage.caseHighlights`, eller endre
linjen. Sterkest ville vært å få inn Hurtigruten-oppdraget begge steder — men kunden der
er Ignite Procurement, ikke Hurtigruten, så skriv «Ignite x Hurtigruten», ikke bare
«Hurtigruten».

Alt dette er ren tekstredigering, men må gjøres i **både** `no.ts` og `en.ts`; de deler
`Dictionary`-typen og bygget faller hvis bare den ene endres. `no.ton.ts` og `en.ton.ts`
er en egen tekstvariant og trenger samme grep bare hvis den skal brukes, se
`tekstvarianter.md`.

## Rettigheter

Fyll denne før noe lastes opp, ikke etter.

| Kunde | Har bilder | Lov å publisere | Avklart med | Dato |
| --- | --- | --- | --- | --- |
| Snapchat | | | | |
| Optiver | | | | |
| Aktiv Eiendomsmegling | | | | |
| Ignite Procurement | | | | |
| Varner | | | | |
| Nordisk Film Kino | | | | |
| DNT | | | | |
| OBOS | | | | |
| Av-og-til | | | | |
| JCP | | | | |

Gjelder også gjenkjennelige gjester i bildet, ikke bare kundens merkevare.

## En arbeidsøkt

1. Åpne `/admin/bilder`. Toppen sier hvor mange flater som har eget bilde.
2. Ta nivå 1-tabellen ved siden av og fyll de åtte flatene. Klikk i hvert bilde for å sette
   fokuspunktet.
3. Se over forsiden. Er nivå 1 fylt, er den verste jobben gjort.
4. Nivå 2 neste økt. Nivå 3 når det passer.

## Når casene skal ha egne bilder

`CaseList` kaller `PlaceholderImage` uten `slot`, så hver case får i dag et bilde valgt av
en hash på kundenavnet — altså tilfeldig, bare stabilt mellom bygg. Skal Snapchat-casen
vise Snapchat-bildet, trenger hver case enten en egen slot i `lib/images/slots.ts` eller et
bildefelt på `CaseItem` i `lib/i18n/types.ts`. Ikke gjort ennå. Ta det når topp fem er
avklart og bildene er klarert — det er den rekkefølgen som gir minst arbeid.
