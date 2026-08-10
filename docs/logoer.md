# Kundelogoer

Logoveggen på forsiden viser merkene Kai har levert for. I motsetning til bildene i
`/admin/bilder` ligger logoene i repoet: de byttes sjelden, de skal se like ut hver gang,
og de er små nok til at de ikke hører hjemme i Supabase Storage.

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

Logoene vises i gråtone på 60 % og får farge og full dekkevne når musepekeren er over.
Paletten på nettsiden er monokrom, og ni logoer i hver sin merkevarefarge ville vært det
eneste fargesprakende på forsiden. Skal logoene stå i farge hele tiden, fjernes `grayscale` og
`opacity-60` i `components/LogoWall.tsx`.

## Størrelse

Hver logo får en like høy celle, og legges inn med `object-contain`. Brede ordmerker (OBOS,
Bergans) begrenses av cellebredden, kvadratiske merker (DNT, Snapchat) av høyden. Derfor kan
filene ha helt ulike proporsjoner uten at noen av dem dverger de andre — det eneste kravet er
at logoen ikke har store tomme marger bakt inn i filen, for de teller som en del av bildet og
gjør logoen visuelt mindre enn naboene.
