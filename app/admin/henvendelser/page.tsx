import Link from "next/link";
import { listEnquiries, type Enquiry } from "@/lib/enquiries/queries";
import { hubspotConfig } from "@/lib/hubspot/forms";
import { notifyConfig } from "@/lib/notify/slack";
import { arrivalLabel, originLabel } from "@/lib/enquiries/sources";
import { setEnquiryStatus, retryHubspotForward } from "../actions";

/*
  Innboksen for kontaktskjemaet.

  Nyeste øverst. Arkiverte ligger bak ?vis=arkiv i stedet for å skjules helt,
  så ingenting forsvinner uten at man kan finne det igjen.
*/
export default async function EnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ vis?: string }>;
}) {
  const { vis } = await searchParams;
  const scope = vis === "arkiv" ? "archived" : "open";
  const enquiries = await listEnquiries(scope);
  const configured = hubspotConfig() !== null;
  const notifies = notifyConfig() !== null;

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="display text-3xl">Henvendelser</h1>
        <div className="flex gap-2">
          <Tab href="/admin/henvendelser" active={scope === "open"}>
            Innboks
          </Tab>
          <Tab href="/admin/henvendelser?vis=arkiv" active={scope === "archived"}>
            Arkiv
          </Tab>
        </div>
      </div>

      {!configured && (
        <p className="mb-5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-smoke">
          <strong className="font-semibold text-ink">
            HubSpot er ikke koblet på.
          </strong>{" "}
          Henvendelser lagres og vises her som normalt, men blir stående som
          ventende til <code className="text-xs">HUBSPOT_PORTAL_ID</code> og{" "}
          <code className="text-xs">HUBSPOT_FORM_GUID</code> er satt. Da kan de
          sendes videre med knappen på hver rad.
        </p>
      )}

      {!notifies && (
        <p className="mb-5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-smoke">
          <strong className="font-semibold text-ink">
            Ingen varsling er satt opp.
          </strong>{" "}
          Henvendelser lagres og vises her, men du får ingen beskjed når de
          kommer inn — du må selv huske å se etter. Sett{" "}
          <code className="text-xs">SLACK_WEBHOOK_URL</code> for å få varsel i
          Slack.
        </p>
      )}

      <ul className="space-y-3">
        {enquiries.map((e) => (
          <EnquiryCard key={e.id} enquiry={e} />
        ))}
        {enquiries.length === 0 && (
          <li className="rounded-xl border border-ink/10 bg-cream px-4 py-8 text-center text-sm text-smoke">
            {scope === "archived"
              ? "Ingenting i arkivet."
              : "Ingen henvendelser ennå."}
          </li>
        )}
      </ul>
    </>
  );
}

function Tab({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`meta-label rounded-full px-4 py-2 transition-colors ${
        active ? "bg-ink text-cream" : "border border-ink/20 hover:bg-shell"
      }`}
    >
      {children}
    </Link>
  );
}

function EnquiryCard({ enquiry: e }: { enquiry: Enquiry }) {
  const isNew = e.status === "new";

  return (
    <li
      className={`overflow-hidden rounded-xl border bg-cream ${
        isNew ? "border-ink/25" : "border-ink/10"
      }`}
    >
      <div className="flex flex-wrap items-start gap-x-4 gap-y-2 px-4 pt-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">
            {e.name}
            {e.org && <span className="text-smoke"> · {e.org}</span>}
          </p>
          <a
            href={`mailto:${e.email}`}
            className="text-xs text-smoke underline underline-offset-2"
          >
            {e.email}
          </a>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2 text-[10px]">
          {isNew && (
            <span className="rounded-full bg-ink px-2 py-0.5 text-cream">Ny</span>
          )}
          {e.marketing_consent && (
            <span
              className="rounded-full bg-green-600/15 px-2 py-0.5 text-green-800"
              title={e.consent_text ?? undefined}
            >
              Samtykke til e-post
            </span>
          )}
          {/*
            Uteblitt varsel er verdt en egen markering. Da vet Kai at han fant
            henvendelsen selv, og at han ikke kan stole på at neste dukker opp
            i innboksen.
          */}
          {!e.notified_at && (
            <span
              className="rounded-full bg-amber-500/20 px-2 py-0.5 text-amber-900"
              title="Varsel på e-post ble ikke sendt for denne henvendelsen."
            >
              Ikke varslet
            </span>
          )}
          <HubspotBadge state={e.hubspot_state} />
          <time
            dateTime={e.created_at}
            className="text-smoke"
            title={e.created_at}
          >
            {formatDate(e.created_at)}
          </time>
        </div>
      </div>

      <p className="whitespace-pre-wrap px-4 py-3 text-sm">{e.message}</p>

      {/*
        Teksten vises også når tilstanden er «sent». Da er den en advarsel om
        at innsendingen gikk gjennom uten samtykket, og det er nettopp det
        som ikke må gå upåaktet hen.
      */}
      {e.hubspot_error && (
        <p
          className={`mx-4 mb-3 rounded-lg px-3 py-2 text-xs ${
            e.hubspot_state === "sent"
              ? "bg-amber-500/10 text-amber-900"
              : "bg-red-500/10 text-red-800"
          }`}
        >
          {e.hubspot_error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-2 border-t border-ink/10 bg-shell px-4 py-2.5">
        {isNew && (
          <StatusButton id={e.id} status="read">
            Marker som lest
          </StatusButton>
        )}
        {e.status !== "archived" ? (
          <StatusButton id={e.id} status="archived">
            Arkiver
          </StatusButton>
        ) : (
          <StatusButton id={e.id} status="read">
            Hent ut av arkivet
          </StatusButton>
        )}

        {e.hubspot_state !== "sent" && (
          <form action={retryHubspotForward} className="contents">
            <input type="hidden" name="id" value={e.id} />
            <button
              type="submit"
              className="meta-label rounded-full border border-ink/20 px-3 py-1.5 transition-colors hover:bg-ink hover:text-cream"
            >
              Send til HubSpot på nytt
            </button>
          </form>
        )}

        <span className="ml-auto text-right text-[10px] text-smoke">
          {originLabel(e.form_key, e.source_path)} · {e.locale}
          {" · "}
          <span title={e.referrer ?? undefined}>
            {arrivalLabel({
              referrer: e.referrer,
              landingPath: e.landing_path,
              utmSource: e.utm_source,
              utmMedium: e.utm_medium,
              utmCampaign: e.utm_campaign,
            })}
          </span>
          {e.ip && (
            <>
              {" · "}
              <code title="Sendt til HubSpot som context.ipAddress. Slettes etter 30 dager.">
                {e.ip}
              </code>
            </>
          )}
        </span>
      </div>
    </li>
  );
}

function StatusButton({
  id,
  status,
  children,
}: {
  id: string;
  status: string;
  children: React.ReactNode;
}) {
  return (
    <form action={setEnquiryStatus} className="contents">
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={status} />
      <button
        type="submit"
        className="meta-label rounded-full border border-ink/20 px-3 py-1.5 transition-colors hover:bg-ink hover:text-cream"
      >
        {children}
      </button>
    </form>
  );
}

function HubspotBadge({ state }: { state: string }) {
  const look =
    state === "sent"
      ? "bg-green-600/15 text-green-800"
      : state === "failed"
        ? "bg-red-500/15 text-red-800"
        : "bg-ink/10 text-smoke";

  const label =
    state === "sent"
      ? "I HubSpot"
      : state === "failed"
        ? "HubSpot feilet"
        : "Venter på HubSpot";

  return <span className={`rounded-full px-2 py-0.5 ${look}`}>{label}</span>;
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("nb-NO", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Oslo",
  }).format(new Date(iso));
}
