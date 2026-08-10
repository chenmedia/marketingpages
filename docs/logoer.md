# Kundelogoer

Logoveggen på forsiden viser merkene Kai har levert for. I motsetning til bildene i
`/admin/bilder` ligger logoene i repoet: de byttes sjelden, de skal se like ut hver gang,
og de er små nok til at de ikke hører hjemme i Supabase Storage.

Veggen står som eget bånd rett etter «Arbeidet vårt», ikke i heroen. Den sier ingenting før
man vet hva Kai leverer, og alt rett etter at man har sett arbeidet. Plassen under
CTA-knappene i heroen har i stedet `components/CrewLine.tsx`: tre sirkler og «alene, eller
med et komplett crew». Teksten der er `hero.clientsLabel`, etiketten over logoveggen er
`clients.label`.

## Slik legger du til en logo

1. Legg filen i `public/logos`. Filnavnet er kundens slug: `obos.svg`, `tine.png`.
2. Legg kunden inn i `CLIENT_LOGOS` i `lib/logos/clients.ts`, med `file` satt til det samme
   navnet **uten endelse**.

Ingen annen kode skal røres.

```
lib/logos/clients.ts   kundelisten: navn, filnavn, rekkefølge på veggen
lib/logos/files.ts     leser public/logos og finner filene som faktisk finnes
components/LogoWall.tsx  cellene, gråtonen og tekstfallbacken
```

## Endelsen er ikke med i listen

`file: "obos"` treffer `obos.svg`, `obos.webp`, `obos.png`, `obos.jpg` og `obos.jpeg`. Ligger
flere av dem der, vinner SVG-en. Da kan en midlertidig PNG byttes mot den ordentlige SVG-en
ved å slippe inn en fil, uten at kundelisten røres.

**Be alltid om SVG først.** En logo er strek og flate, ikke fotografi. SVG holder seg skarp på
alle skjermer og veier som regel mindre enn PNG-en. Next optimaliserer ikke SVG — den serveres
som den er — så filen bør være ryddet: ingen innebygde raster­bilder, ingen skript.

## Fallback er ikke midlertidig

Mangler filen, viser flaten kundenavnet i display-fonten i stedet. Det er samme grep som
standardbildene i `lib/images/defaults`: veggen kan fylles én logo av gangen, og forsiden ser
aldri ødelagt ut mens man venter på resten. En kunde kan derfor legges inn i listen før logoen
har kommet inn.

## Gråtone

Logoene vises i gråtone på 70 % og får farge og full dekkevne når musepekeren er over.
Paletten på nettsiden er monokrom, og ni logoer i hver sin merkevarefarge ville vært det
eneste fargesprakende på forsiden. Skal logoene stå i farge hele tiden, fjernes `grayscale` og
`opacity-70` i `components/LogoWall.tsx`.

## Størrelse og optisk balanse

Hver logo får en like høy celle, og legges inn med `object-contain`. Brede ordmerker (OBOS,
Bergans) begrenses av cellebredden, kvadratiske merker (DNT, Snapchat) av høyden. Derfor kan
filene ha helt ulike proporsjoner uten at noen av dem dverger de andre.

Lik høyde er likevel ikke lik visuell vekt. OBOS er 4,5 ganger så bredt som DNT på samme
høyde og tar over hele raden, mens en stablet logo med luft rundt teksten forsvinner. Derfor
har `CLIENT_LOGOS` et `scale`-felt: 1 er full cellehøyde, `0.82` krymper, `1.15` forstørrer.
Tallene er øyemål mot de faktiske filene, ikke en formel — legger du inn en ny logo som
stikker seg ut, er det den knappen du skrur på.

Be om filer der logoen fyller flaten. Tomme marger bakt inn i filen teller som en del av
bildet, og gjør logoen visuelt mindre enn naboene uten at `scale` er noe annet enn en
kompensasjon for det.
