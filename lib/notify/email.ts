import "server-only";

/*
  Varsel til Kai når en henvendelse kommer inn.

  Dette lå opprinnelig hos HubSpot. Problemet er avhengighetskjeden: for å
  få vite om en henvendelse måtte BÅDE videresendingen til HubSpot lykkes OG
  HubSpots varsling være riktig satt opp. Ryker ett av leddene, ligger
  henvendelsen i basen uten at noen vet om den. Å bli varslet om en ny kunde
  er det mest verdifulle skjemaet gjør, og det bør ikke henge på en
  tredjepart vi ikke styrer.

  Sendes derfor rett etter at raden er lagret, uavhengig av HubSpot.

  Ingen SDK; Resend er ett HTTP-kall. Kaster aldri, av samme grunn som
  HubSpot-videresendingen: en feil her skal noteres, ikke velte innsendingen
  for den besøkende.
*/

const TIMEOUT_MS = 5000;

export type NotifyResult = { ok: true } | { ok: false; error: string };

export type EnquiryNotice = {
  id: string;
  name: string;
  org: string | null;
  email: string;
  message: string;
  marketingConsent: boolean;
  locale: string;
  sourcePath: string | null;
  ip: string | null;
};

export function notifyConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.ENQUIRY_NOTIFY_TO?.trim();
  const from = process.env.ENQUIRY_NOTIFY_FROM?.trim();
  if (!apiKey || !to || !from) return null;
  return { apiKey, to, from };
}

/*
  Alt som skal inn i e-posten er tekst en fremmed har skrevet, så det må
  escapes før det settes inn i HTML. Uten dette kan en henvendelse med
  markup i seg endre hvordan varselet ser ut.
*/
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function notifyNewEnquiry(
  enquiry: EnquiryNotice
): Promise<NotifyResult> {
  const config = notifyConfig();
  if (!config) return { ok: false, error: "Varsling er ikke konfigurert." };

  const who = enquiry.org ? `${enquiry.name}, ${enquiry.org}` : enquiry.name;
  const site = process.env.NEXT_PUBLIC_SITE_URL?.trim() ?? "";

  const rows: [string, string][] = [
    ["Navn", enquiry.name],
    ["Firma", enquiry.org ?? "—"],
    ["E-post", enquiry.email],
    ["Språk", enquiry.locale],
    ["Sendt fra", enquiry.sourcePath ?? "—"],
    ["IP", enquiry.ip ?? "—"],
    ["Markedsføring", enquiry.marketingConsent ? "Ja, samtykket" : "Nei"],
  ];

  const html = `
<div style="font-family:system-ui,sans-serif;max-width:600px;color:#1a1a1a">
  <h2 style="margin:0 0 4px">Ny henvendelse</h2>
  <p style="margin:0 0 20px;color:#666">${escapeHtml(who)}</p>
  <div style="white-space:pre-wrap;border-left:3px solid #ddd;padding:4px 0 4px 14px;margin-bottom:22px">${escapeHtml(
    enquiry.message
  )}</div>
  <table style="border-collapse:collapse;font-size:14px">
    ${rows
      .map(
        ([label, value]) =>
          `<tr><td style="padding:3px 16px 3px 0;color:#666">${label}</td>` +
          `<td style="padding:3px 0">${escapeHtml(value)}</td></tr>`
      )
      .join("")}
  </table>
  <p style="margin:22px 0 0">
    <a href="mailto:${escapeHtml(enquiry.email)}">Svar direkte</a>
    ${site ? ` · <a href="${escapeHtml(site)}/admin/henvendelser">Åpne i admin</a>` : ""}
  </p>
</div>`.trim();

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        subject: `Ny henvendelse: ${who}`,
        html,
        /*
          Da kan Kai trykke svar og skrive rett til kunden, i stedet for å
          kopiere adressen ut av varselet.
        */
        reply_to: enquiry.email,
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });

    if (res.ok) return { ok: true };

    const detail = (await res.text().catch(() => "")).slice(0, 300);
    return {
      ok: false,
      error: `Resend svarte ${res.status}${detail ? `: ${detail}` : ""}`,
    };
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    return { ok: false, error: `Kunne ikke sende varsel: ${reason}` };
  }
}
