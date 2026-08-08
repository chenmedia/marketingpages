# Bilder

Alle bildeflater på nettsiden styres fra `/admin/bilder`. Ingen deploy, ingen kodeendring.

## Slik henger det sammen

Hver flate har et **slot-navn**, definert i `lib/images/slots.ts`. Navnet er kontrakten:
markupen sier `slot="hero-1"`, og tabellen `site_images` bestemmer hvilket bilde som havner der.

```
lib/images/slots.ts     slotliste: navn, gruppe, format, standardbilde, alt-tekst
lib/images/defaults.ts  bildene i public/portfolio
lib/images/queries.ts   getSiteImages(), unstable_cache med tag "images"
components/PlaceholderImage.tsx   slår opp slot, faller tilbake, setter alt og fokuspunkt
components/ImageUploader.tsx      krymper i nettleseren, laster opp
app/admin/bilder/page.tsx         oversikten
```

## Fallback er ikke midlertidig

Har en slot ingen rad i `site_images`, vises standardbildet fra `public/portfolio`. Det gjelder
også når databasen er utilgjengelig. Derfor kan flatene fylles én og én, og nettsiden ser aldri
tom ut. Samme grep som `getAgenda` og `getSiteStats`: aldri kast, fall tilbake.

Standardbildene er alle fra ett oppdrag, KarpeWorld. Det er grunnen til at biblioteket finnes:
tekstene lover konferanser og firmaevents. Etter hvert som slotene fylles, blir de bare et
sikkerhetsnett, og de fleste kan da slettes fra repoet.

## Fokuspunkt

Det samme bildet beskjæres til seks ulike forhold. Uten fokuspunkt kutter 9:16-utsnittet hodet
av folk som ikke står midt i bildet. I admin klikker man i bildet der motivet er viktigst;
verdien lagres som `focal_x`/`focal_y` og blir til `object-position`.

## Bildet krympes i nettleseren

`ImageUploader` skalerer til maks 2400px lengste kant og koder til WebP før opplasting. En
kamerafil på 8 MB blir noen hundre kilobyte. Serveren gjør ingen bildebehandling, og
blur-forhåndsvisningen lages i samme slengen fra et 8px lerret.

Server Action-en validerer type og størrelse på nytt. Den er et POST-endepunkt som kan kalles med
hva som helst, så det klienten påstår teller ikke.

## Tre ting som er lette å bryte

**`unstable_cache` serialiserer svaret.** `fetchSiteImages` returnerer derfor en array, ikke en
`Map`. En `Map` kommer tilbake fra cachen som et tomt objekt uten `.get()`, og bygget faller med
«c.get is not a function». Oppslaget bygges utenfor, med React `cache()`.

**CSP-en tillater bare `img-src 'self'`.** Det holder fordi `next/image` serverer gjennom
`/_next/image` på vårt eget domene. Supabase-verten må derfor stå i `images.remotePatterns` i
`next.config.ts`. Settes `unoptimized`, går nettleseren rett til Supabase og bildet blokkeres.

**Offentlige lesninger må bruke anon-klienten.** `unstable_cache` kan ikke lese cookies. Brukes
den cookie-bundne klienten i `getSiteImages`, blir de fem offentlige sidene dynamiske.
`/admin/bilder` bruker derimot cookie-klienten med vilje, så oversikten alltid viser ferskeste
tilstand og ikke det cachede svaret forsiden har.

## Flater uten slot

Nyhetssaker og kundecase får bilde valgt deterministisk ut fra tittelen, via `fallbackFor()`.
Samme tittel gir alltid samme bilde, så siden ikke bytter utseende mellom to bygg. Skal de få
egne bilder, hører de hjemme som egne slots.
