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

export type ForwardResult = { ok: true } | { ok: false; error: string };

export type EnquiryPayload = {
  name: string;
  email: string;
  message: string;
  org: string | null;
  marketingConsent: boolean;
  pageUri: string | null;
};

export function hubspotConfig() {
  const portalId = process.env.HUBSPOT_PORTAL_ID?.trim();
  const formGuid = process.env.HUBSPOT_FORM_GUID?.trim();
  if (!portalId || !formGuid) return null;
  return { portalId, formGuid };
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
    Legal consent er skrudd av på skjemaet i HubSpot, så payloaden skal IKKE
    inneholde legalConsentOptions. Er det på der uten å sendes med her,
    avvises hver eneste innsending. Samtykket vårt lagres i enquiries.
  */
  const body = {
    fields,
    context: {
      pageUri: enquiry.pageUri ?? undefined,
      pageName: "Kontaktskjema · chenmedia.no",
    },
  };

  // Region na1 gir api.hsforms.com. EU-regionen ville vært api-eu1.hsforms.com.
  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${config.portalId}/${config.formGuid}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });

    if (res.ok) return { ok: true };

    /*
      HubSpot svarer med 400 og en tom eller ordknapp kropp i de vanligste
      feiltilfellene. Statuskoden alene sier lite, så vi tar med det som
      måtte stå der; det er dette teksten i admin skal hjelpe med å tolke.
    */
    const detail = (await res.text().catch(() => "")).slice(0, 500);
    return {
      ok: false,
      error: `HubSpot svarte ${res.status}${detail ? `: ${detail}` : ""}`,
    };
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    return { ok: false, error: `Kunne ikke nå HubSpot: ${reason}` };
  }
}
