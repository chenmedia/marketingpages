# Tekstvarianter: TON-nær og variasjon

Nettstedet har to komplette tekstsett. Begge fyller samme `Dictionary`-type,
så de kan byttes uten at en eneste komponent endres.

| | Variant A | Variant B |
|---|---|---|
| Filer | `lib/i18n/no.ton.ts`, `en.ton.ts` | `lib/i18n/no.ts`, `en.ts` |
| Kilde | TON Medias tekst, ord for ord | TON-teksten som utgangspunkt, skrevet om |
| Status | Sammenligningsgrunnlag | **Aktiv** |

## Slik bytter du

Variant B er standard. For å se variant A:

```bash
NEXT_PUBLIC_COPY_VARIANT=ton npm run dev
```

Skal variant A publiseres, settes samme variabel i Vercel under
Project Settings → Environment Variables.

## Hvorfor variant B er den aktive

Variant A er TONs tekst med navn og geografi byttet. Den er nyttig for å se
nøyaktig hvordan TON bygger opp siden, men den egner seg ikke til publisering:

1. **Teksten er TONs åndsverk.** Ordrett på et kommersielt norsk nettsted er
   det plagiat, og markedsføringstekst er vernet på lik linje med annet
   skriftlig materiale.
2. **Påstandene gjelder TON, ikke Chen Media.** Variant A sier «2000+ eventer
   siden 2012», «14 års erfaring», «team på 9 fotografer og videografer», og
   beskriver et AI-verktøy som skriver innlegg per plattform. Ingenting av
   dette stemmer for Chen Media. Publisert ville det vært villedende
   markedsføring.

## Hva variant B beholder fra TON

Strukturen og rytmen, ikke ordene:

- **Hero**: hvem det er for, et bevis, et leveringsløfte. Tre setninger.
- **Tjenester**: «Tre tjenester, ett mål», tre kort med tre kulepunkter hver.
- **Mørk seksjon**: differensiatoren, at innholdet lever videre etterpå.
- **Prosess**: fire steg, hvert med et konkret løfte i bunnen av kortet.
- **Om**: tre avsnitt som avsluttes med en kort, rytmisk dobbeltsetning.
- **Målgrupper**: fire kategorier med tre eksempler hver.
- **Kontakt**: kalenderwidget, statistikkfliser og skjema side ved side.

## Hva som fortsatt er plassholdere

Merket med `// NB:` i kildefilene.

- **Statistikkflisene** i kontaktseksjonen (90 / 45+ / 6) er TONs tall.
- **Fristene i prosess-seksjonen** («innen én virkedag», «rigget før første
  gjest») er et utgangspunkt. De bør stemme med det Kai faktisk lover.
- **Kalenderoppføringene** i `lib/agenda.ts` er eksempeldata.

## Undersidene

TON-kilden dekker bare forsiden. Variant A arver derfor undersidene (eventfoto,
eventfilm, prosjekter, nyheter) uendret fra variant B.
