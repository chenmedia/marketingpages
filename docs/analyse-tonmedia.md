# Analyse: tonmedia.com → Chen Media

Beslutningsgrunnlag for chenmedia.no. Basert på fullside-screenshots av
tonmedia.com/en (forside, fire kategorisider, nav-dropdown, prosess-seksjon),
august 2026. Selve domenet var utilgjengelig fra byggemiljøet
(nettverkspolicy), så analysen er gjort mot screenshots.

## Hva TON Media er

Én-persons eventfotograf (Michiel TON) pakket som byrå. Nisje: messer,
konferanser, firmaevents og festivaler i NL + EU. Salgspoenget er ikke
«fotograf», men komplett innholdsleveranse innen 24 timer — bilder pluss
ferdige social-poster med caption per plattform.

## Sidearkitektur

Forside (salgsside) + fire kategorisider på nesten identisk mal
(Trade Shows, Conferences, Corporate Events, Festivals) som krysslenker.
Én mal, fire søkeord — SEO-struktur der hver side føles skreddersydd fordi
bilder og copy byttes.

### Forsidens seksjonsrekkefølge

1. Sticky nav — logo, 4 lenker, «Our work»-dropdown med ikon + søkeord-
   undertekst per kategori (navngir Tomorrowland/Defqon.1 i selve menyen),
   NL/EN-toggle, blå «Request a quote»-pill
2. Mørk hero — badge «Available for events across NL + EU», H1 «Your event,
   seen through the eyes of a pro.» (sisteord i aksentfarge), to CTA-er,
   sosialt bevis med avatarer, spredte polaroid-kort med «2000+ events
   since 2012»
3. Full-bredde rullende bildeticker
4. «What we do» — 3 tjenestekort med checkmark-lister
5. Mørk differensiator-seksjon: «Your event lives on, long after the last
   photo» — social-post-mockups; leveransen utover bildene
6. «Our work» — 4 kategorikort
7. «Hi, I'm Michiel TON» — ansikt, historie, 3 nøkkeltall
8. «How it works» — 4 steg med konkret løfte i fet under hvert steg:
   Quote within 24 hours / eget briefing-verktøy / 10–15 preview-bilder
   rett til sosiale kanaler / fullt album innen 24–48 timer
9. «Who is TON Media for?» — 4 bildekort + målgruppelister
10. Booking-CTA — kontaktskjema ved siden av widget med faktiske datoer og
    ledig/opptatt-status (knapphet), «Michiel replies personally, usually
    within a day»
11. Footer + sticky bunnbar med WhatsApp

### Kategorisidemalen

Fullbredde hero m/ badge → ticker → intro m/ 3 stats → logovegg →
masonry-galleri → «What you get» (3 kort m/ emoji-ikon) → testimonials m/
stjerner → video → FAQ-accordion → mørk CTA → krysslenker.

## Konverteringslogikken (overført til Chen Media)

1. **Innvendingsdrepende prosess** — hvert prosessteg avsluttes med et
   konkret løfte i fet som dreper én kjøpsinnvending. Chen Medias ekte
   6-stegsprosess (onboarding → pre-produksjon → produksjon → post →
   levering → evaluering, med shot lists) gir dette substans.
2. **Personlig svar-løfte** ved hver CTA — én person som svarer er en
   styrke, ikke en begrensning. Overført som Kai.
3. **Ingen priser på siden** — kun «be om tilbud». Matcher Chen Medias
   prisrammeverk (pakkepris, aldri synlige enhetspriser).
4. **Kategoridybde for SEO** — egne sider per tjeneste.
5. **Fotografiet er layouten** — hero, ticker og gallerier gjør porteføljen
   til selve siden.

## Bevisst IKKE overført

- Fire kategorisider som identisk utstansingsmal → fragmenterte, repetitive
  chunks. Chen Media har to tjenestesider (eventfoto/eventfilm) med genuint
  eget innhold og ulik komposisjon.
- «What you get»-kort med emoji, stjerne-testimonials, generisk FAQ på hver
  side → serviceized. Erstattet med case-drevet innhold: navngitte oppdrag
  med kontekst (Snap Session/Snapchat, Pitch Event x Optiver, Varner x
  Levi's, Nordisk Film Kino, Ignite Procurement x Hurtigruten, Av-og-til,
  DNT, OBOS, JCP), prosess-transparens (shot lists, pre-produksjon ~1 mnd
  før, evaluering uken etter), og AS-strukturen som seriøsitetssignal.
- Generiske fraser («make your event reach as far as possible») → all copy
  konkret og forankret i faktisk prosess og faktiske oppdrag.

## Chen Media-uttrykket (fra ChenMedia_Brand_Guideline_V1)

- **Farger:** ink `#111111`, varm grå `#55534A`, krem `#F6F5EC`, bone
  `#E4E2D4`, smørgul `#FBF8D0`, oliven `#8A8875`, sand `#B9B6A0`, shell
  `#EFEDE0`, aksent brent oransje `#C25A2E`. TONs marineblå seksjoner →
  ink; blå CTA-er → oransje; seksjonsrytme hvit/krem/mørk beholdt.
- **Typografi:** Garet (display, versaler, tett kernet — self-hostes når
  woff2-filene er klare; Archivo er midlertidig fallback) + Space Mono
  (brødtekst/labels). Deckens mono-toppmeta gjenbrukes som
  seksjonsetiketter med nummer.
- **Formspråk:** redaksjonelt/magasin, ikke SaaS — store versaloverskrifter
  som visuelle elementer, hjørneprikker, «Krusedullen» som aksentdetalj
  (SVG-placeholder til original leveres).
- **Tagline:** «Vi fanger øyeblikkene» / Eventfoto og film for bedrifter.

## Åpne punkter

- Prosess-løftene («svar innen én virkedag», «på plass i god tid») må
  bekreftes/justeres av Kai før lansering.
- Alle bildeflater er placeholders med label — byttes mot faktiske foto.
- Garet woff2-filer legges i `public/fonts/` og kobles i
  `app/[locale]/layout.tsx`.
- Kontaktskjema er mailto i v1 — kan oppgraderes til skjematjeneste.
