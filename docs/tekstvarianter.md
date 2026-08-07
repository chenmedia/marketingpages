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

## Variant B sin svakhet, og hvordan den lukkes

Variant A har åtte etterprøvbare påstander i brødteksten. Variant B har to.
Resten av tallene i B er plassholdere eller eksempler i et skjemafelt.

Det er den ene målestokken der A faktisk slår B, og den er viktig, for
konkrete tall er nettopp det som skiller en troverdig side fra en generisk
en. B blir bedre enn A på alle punkter så snart tallene under er fylt inn.

### Tall som må fylles inn

| Hvor | Står nå | Trengs |
|---|---|---|
| `hero.lead` | «Foto og film siden 2020» | Antall arrangementer, eller antall år |
| `contact.stats` | 90 / 45+ / 6 | Faktiske tall, eller andre nøkkeltall |
| `about.facts` | Foto + film / Oslo / AS | Minst ett tall blant de tre |
| `process.steps[0].promise` | «innen én virkedag» | Reell svartid |
| `process.steps[3].promise` | «til avtalt tid, hver gang» | Reell leveringsfrist, i timer eller dager |

De to nederste er de viktigste. «Levering til avtalt tid, hver gang» er
strengt tatt ikke et løfte, det er bare å gjøre jobben. TONs tilsvarende
linje, «komplett album innen 24 til 48 timer», er et løfte fordi den kan
brytes.

### Andre plassholdere

Merket med `// NB:` i kildefilene.

- **Kalenderoppføringene** i `lib/agenda.ts` er eksempeldata.

## Undersidene

TON-kilden dekker bare forsiden. Variant A arver derfor undersidene (eventfoto,
eventfilm, prosjekter, nyheter) uendret fra variant B.
