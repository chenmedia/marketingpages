import "server-only";

/*
  Varsel til Slack når en henvendelse kommer inn.

  Dette lå opprinnelig hos HubSpot. Problemet var avhengighetskjeden: for å
  få vite om en henvendelse måtte BÅDE videresendingen til HubSpot lykkes OG
  HubSpots varsling være riktig satt opp. Ryker ett av leddene, ligger
  henvendelsen i basen uten at noen vet om den. To innsendinger nådde HubSpot
  uten at det kom noe varsel, og det er nettopp det som ikke må skje: å bli
  varslet om en ny kunde er det mest verdifulle skjemaet gjør.

  Sendes derfor rett etter at raden er lagret, uavhengig av HubSpot.

  En innkommende webhook, ikke Slack-appen med OAuth: det er ett HTTP-kall
  mot én URL, uten SDK, uten tokenfornyelse og uten scopes å vedlikeholde.

  Kaster aldri, av samme grunn som HubSpot-videresendingen: en feil her skal
  noteres på raden, ikke velte innsendingen for den besøkende.
*/

const TIMEOUT_MS = 5000;

export type NotifyResult = { ok: true } | { ok: false; error: string };

export type EnquiryNotice = {
  name: string;
  org: string | null;
  email: string;
  message: string;
  marketingConsent: boolean;
  locale: string;
  sourcePath: string | null;
  ip: string | null;
};

/*
  Webhook-URL-en er en hemmelighet: hvem som helst som har den kan poste i
  kanalen. Den skal være Sensitive i Vercel og aldri i klientbundelen.
*/
export function notifyConfig() {
  const url = process.env.SLACK_WEBHOOK_URL?.trim();
  if (!url || !url.startsWith("https://hooks.slack.com/")) return null;
  return { url };
}

/*
  Slack krever at disse tre escapes i tekst. Uten det kan en henvendelse med
  < eller > i seg brekke formateringen, eller se ut som en Slack-lenke den
  ikke er.
*/
function escapeSlack(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function notifyNewEnquiry(
  enquiry: EnquiryNotice
): Promise<NotifyResult> {
  const config = notifyConfig();
  if (!config) return { ok: false, error: "Slack-varsling er ikke konfigurert." };

  const who = enquiry.org
    ? `${enquiry.name} · ${enquiry.org}`
    : enquiry.name;

  const site = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  const facts = [
    `*E-post:* ${escapeSlack(enquiry.email)}`,
    `*Markedsføring:* ${enquiry.marketingConsent ? "samtykket" : "nei"}`,
    `*Språk:* ${escapeSlack(enquiry.locale)}`,
    enquiry.sourcePath ? `*Sendt fra:* ${escapeSlack(enquiry.sourcePath)}` : null,
    enquiry.ip ? `*IP:* ${escapeSlack(enquiry.ip)}` : null,
  ].filter(Boolean);

  const body = {
    /*
      text er det som vises i push-varselet på mobilen, ikke blokkene under.
      Den skal derfor si hvem det gjelder, ikke bare «ny henvendelse».
    */
    text: `Ny henvendelse: ${escapeSlack(who)}`,
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: "Ny henvendelse", emoji: false },
      },
      {
        type: "section",
        text: { type: "mrkdwn", text: `*${escapeSlack(who)}*` },
      },
      {
        type: "section",
        text: { type: "mrkdwn", text: `>${escapeSlack(enquiry.message)}` },
      },
      {
        type: "section",
        fields: facts.map((text) => ({ type: "mrkdwn", text: text as string })),
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: site
              ? `<mailto:${enquiry.email}|Svar på e-post> · <${site}/admin/henvendelser|Åpne i admin>`
              : `<mailto:${enquiry.email}|Svar på e-post>`,
          },
        ],
      },
    ],
  };

  try {
    const res = await fetch(config.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });

    if (res.ok) return { ok: true };

    // Slack svarer med klartekst, ikke JSON: «invalid_payload», «no_service».
    const detail = (await res.text().catch(() => "")).slice(0, 300);
    return {
      ok: false,
      error: `Slack svarte ${res.status}${detail ? `: ${detail}` : ""}`,
    };
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    return { ok: false, error: `Kunne ikke nå Slack: ${reason}` };
  }
}
