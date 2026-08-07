# Kalender-backend

Kalenderen i booking-seksjonen leser fra Supabase i stedet for en hardkodet liste.
Kai redigerer bookinger på `/admin`, og endringene slår gjennom uten ny publisering.

## Supabase

Prosjekt `zxehvkfamzlqdnwdkqhw` (eu-central-1), koblet via Vercel-integrasjonen.
Migrasjonene er kjørt via Supabase MCP og ligger versjonert i Supabase, ikke i repoet.
Kjør `supabase db pull` hvis du vil materialisere dem lokalt.

| Migrasjon | Hva den gjør |
|---|---|
| `calendar_schema` | Tabellene, triggere for `updated_at`, `handle_new_user` |
| `calendar_rls` | RLS-policyer og `is_admin()` |
| `agenda_functions` | `agenda_public()` og `next_free_days()` |
| `seed_agenda` | Kai som fotograf, fem bookinger, `team_size = 8` |
| `harden_function_grants` | Fjerner RPC-tilgang til `handle_new_user` |
| `tune_rls_policies` | Slår sammen doble SELECT-policyer, `(select auth.uid())` |

## Hvordan kapasitet regnes

```
ledige(dato) = teamstørrelse − antall DISTINCT fotografer på et
               ikke-avlyst arrangement som dekker datoen
```

Et flerdagsarrangement viser **minimum** over spennet, ikke gjennomsnitt. Widgeten
svarer på «kan dere ta oppdraget mitt disse dagene», og svaret begrenses av den
travleste dagen.

Teamstørrelsen er `greatest(app_settings.team_size, antall aktive tellende fotografer)`.
Den lagres framfor å utledes, ellers ville teamet vært 1 så lenge Kai er alene, og
hver rad hadde vist «0 ledige» fra dag én.

## Tre ting som er lette å bryte

**`agenda_public()` er `security definer`, og det er tilsiktet.** Et internt eller
upublisert arrangement legger beslag på en fotograf og må telle mot kapasiteten, men
anon skal ikke kunne lese raden. Funksjonen teller derfor med utvidede rettigheter og
returnerer kun offentlige rader. Databaselinteren flagger dette; ikke «fiks» det.

**Interne felter ligger i `event_internal`, ikke som kolonner på `events`.** RLS er
radnivå, ikke kolonnenivå. Lå kundenavn og notater på `events`, ville den offentlige
SELECT-policyen eksponert dem via PostgREST. `event_internal` har ingen anon-policy.

**Offentlige lesninger må bruke `lib/supabase/anon.ts`, aldri `server.ts`.**
`unstable_cache` kan ikke lese cookies. Bruker du den cookie-bundne klienten inne i
`getAgenda`, knekker enten build-en eller de fem offentlige sidene blir dynamiske.

## Brukere

Selvregistrering er slått av i Supabase-dashbordet. Nye brukere opprettes under
Authentication → Users → Invite user, får rollen `viewer` av triggeren, og må settes
til `admin` i `profiles` før de får tilgang til `/admin`.

## Testdata som må erstattes

- **De fem bookingene** er plassholdere fra en TON-inspirert demo. De må bekreftes
  eller slettes før lansering, ellers publiserer nettstedet oppdiktede oppdrag.
- **Fotografen «Ola Nordmann»** og **messa 15.–18. september** er testdata jeg la inn
  for å verifisere flerdagsspenn og kapasitet. Slett dem i admin.
- **Ferien 17. september** er et internt arrangement, også testdata.
- **Statistikkflisene** (90 / 45+ / 6) i `lib/i18n/*.ts` er fortsatt TONs tall.

## Neste steg

1. **Fravær.** `kind = 'internal'` gjør at ferie allerede kan registreres uten
   skjemaendring. Uten det teller kapasiteten bare bookinger, og lyver.
2. **ICS-feed** så Kai abonnerer på kalenderen i Google Calendar.
3. **Kontaktskjema til database.** `ContactForm.tsx` åpner fortsatt bare en `mailto`.
4. **Fotografrolle**, så andre kan se egen plan uten å redigere.
