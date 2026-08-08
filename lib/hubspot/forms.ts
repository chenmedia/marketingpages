import "server-only";

/*
  Videresending til HubSpot Forms.

  Vi bruker IKKE js.hsforms.net-snutten HubSpot tilbyr. Den tegner sitt eget
  skjema og ville byttet ut designet i components/ContactForm.tsx, i tillegg
  til å bryte både script-src og connect-src i next.config.ts. Serveren poster
  i stedet rett til innsendingsendepunktet.

  Endepunktet krever ingen API-nøkkel. Portal-ID og skjema-GUID er offentlige
  verdier, så det finnes ingen hemmelighet å rullere her.

  Kaster aldri. Henvendelsen ligger allerede trygt i vår egen base når denne
  kalles, og en feil her skal bare noteres på raden, ikke velte innsendingen
  for den besøkende.
*/

const TIMEOUT_MS = 5000;

export type ForwardResult =
  /* note settes når innsendingen gikk gjennom, men ikke slik den skulle. */
  | { ok: true; note?: string }
  | { ok: false; error: string };

export type EnquiryPayload = {
  name: string;
  email: string;
  message: string;
  org: string | null;
  marketingConsent: boolean;
  pageUri: string | null;
  ip: string | null;
  /* Ordlyden som faktisk sto i skjemaet. Sendes med samtykket til HubSpot. */
  consentText?: string | null;
  privacyText?: string | null;
};

export function hubspotConfig() {
  const portalId = process.env.HUBSPOT_PORTAL_ID?.trim();
  const formGuid = process.env.HUBSPOT_FORM_GUID?.trim();
  if (!portalId || !formGuid) return null;
  return { portalId, formGuid };
}

/*
  ID-en til abonnementstypen samtykket gjelder, fra Settings → Marketing →
  Email → Subscription Types i HubSpot.

  Uten den sendes ingen legalConsentOptions, og alt virker som før. Det er
  med vilje: et samtykke uten abonnementstype har ingen steder å havne i
  HubSpot, og da er det bedre å la være enn å sende noe som ser riktig ut.
*/
function subscriptionTypeId(): number | null {
  const raw = process.env.HUBSPOT_SUBSCRIPTION_TYPE_ID?.trim();
  if (!raw) return null;
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

/*
  HubSpot har ingen egen fornavn/etternavn i skjemaet vårt, bare ett navnefelt.
  Første ord blir firstname, resten lastname. Er det bare ett ord, lar vi
  lastname stå tomt heller enn å gjette.
*/
function splitName(full: string) {
  const parts = full.trim().split(/\s+/);
  if (parts.length < 2) return { firstname: full.trim(), lastname: "" };
  return {
    firstname: parts[0],
    lastname: parts.slice(1).join(" "),
  };
}

/*
  Grov formsjekk, ikke full validering. Poenget er kun å luke bort verdier
  som garantert gir 400 fra HubSpot; presis IP-validering er deres jobb.
*/
function isPlausibleIp(ip: string | null): boolean {
  if (!ip) return false;
  const v4 = /^(\d{1,3}\.){3}\d{1,3}$/;
  const v6 = /^[0-9a-fA-F:]+$/;
  if (v4.test(ip)) {
    return ip.split(".").every((part) => Number(part) <= 255);
  }
  return v6.test(ip) && ip.includes(":");
}

export async function forwardToHubspot(
  enquiry: EnquiryPayload
): Promise<ForwardResult> {
  const config = hubspotConfig();
  if (!config) return { ok: false, error: "HubSpot er ikke konfigurert." };

  const { firstname, lastname } = splitName(enquiry.name);

  const fields = [
    { objectTypeId: "0-1", name: "email", value: enquiry.email },
    { objectTypeId: "0-1", name: "firstname", value: firstname },
    { objectTypeId: "0-1", name: "lastname", value: lastname },
    { objectTypeId: "0-1", name: "company", value: enquiry.org ?? "" },
    { objectTypeId: "0-1", name: "message", value: enquiry.message },
  ].filter((f) => f.value !== "");

  /*
    context.ipAddress er HubSpots eget felt for avsenderens IP. HubSpot slår
    den opp mot geodata og fyller land og region på kontakten, noe et vanlig
    tekstfelt ikke ville gjort.

    Bare IP-er som ser gyldige ut sendes. HubSpot avviser hele innsendingen
    med 400 på en ugyldig verdi, og en henvendelse skal ikke gå tapt fordi en
    proxy sendte noe rart i x-forwarded-for.
  */
  const context = {
    pageUri: enquiry.pageUri ?? undefined,
    pageName: "Kontaktskjema · chenmedia.no",
    ipAddress: isPlausibleIp(enquiry.ip) ? enquiry.ip! : undefined,
  };

  /*
    Samtykket, slik HubSpot vil ha det.

    En egenskap på kontakten hadde ikke holdt: HubSpot avgjør hvem som lovlig
    kan motta markedsføring gjennom abonnementssystemet, ikke gjennom et
    felt. legalConsentOptions skriver dit, og rir på det samme kallet, så det
    trengs fortsatt ingen API-nøkkel.

    consentToProcess gjelder å behandle henvendelsen og følger av at skjemaet
    ble sendt inn. communications gjelder markedsføring senere og følger
    avkryssingsboksen, som står uhuket fra start. Teksten som lagres er den
    som faktisk sto i skjemaet.
  */
  const subscriptionId = subscriptionTypeId();
  const legalConsentOptions = subscriptionId
    ? {
        consent: {
          consentToProcess: true,
          text: enquiry.privacyText ?? "Samtykke til behandling av henvendelsen.",
          communications: [
            {
              value: enquiry.marketingConsent,
              subscriptionTypeId: subscriptionId,
              text: enquiry.consentText ?? "Markedsføring fra Chen Media.",
            },
          ],
        },
      }
    : undefined;

  // Region na1 gir api.hsforms.com. EU-regionen ville vært api-eu1.hsforms.com.
  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${config.portalId}/${config.formGuid}`;

  const send = (withConsent: boolean) =>
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields,
        context,
        ...(withConsent && legalConsentOptions ? { legalConsentOptions } : {}),
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });

  try {
    const res = await send(true);

    if (res.ok) return { ok: true };

    /*
      HubSpot svarer med 400 og en tom eller ordknapp kropp i de vanligste
      feiltilfellene. Statuskoden alene sier lite, så vi tar med det som
      måtte stå der; det er dette teksten i admin skal hjelpe med å tolke.
    */
    const detail = (await res.text().catch(() => "")).slice(0, 300);

    /*
      Krever skjemaet i HubSpot et annet consent-oppsett enn det vi sender,
      avvises hele innsendingen. Henvendelsen skal ikke gå tapt av den grunn,
      så vi prøver én gang til uten samtykket — og noterer at det skjedde.
      Uten notatet ville et feil oppsett stått og gjæret i stillhet.
    */
    if (legalConsentOptions) {
      const retry = await send(false);
      if (retry.ok) {
        return {
          ok: true,
          note:
            `Sendt, men UTEN samtykket. HubSpot avviste legalConsentOptions (${res.status}` +
            `${detail ? `: ${detail}` : ""}). Sjekk at consent er slått på for ` +
            "skjemaet, og at HUBSPOT_SUBSCRIPTION_TYPE_ID peker på riktig type.",
        };
      }
    }

    return {
      ok: false,
      error: `HubSpot svarte ${res.status}${detail ? `: ${detail}` : ""}`,
    };
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    return { ok: false, error: `Kunne ikke nå HubSpot: ${reason}` };
  }
}
