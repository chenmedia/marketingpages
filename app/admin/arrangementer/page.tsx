import Link from "next/link";
import { listEvents, listPhotographers } from "@/lib/agenda/admin-queries";
import { chipLabel, shortDate } from "@/lib/agenda/date";
import { KIND_LABELS, STATUS_LABELS, type EventKind, type EventStatus } from "@/lib/agenda/types";

const SCOPES = [
  { key: "upcoming", label: "Kommende" },
  { key: "past", label: "Tidligere" },
  { key: "all", label: "Alle" },
] as const;

export default async function EventsPage({
  searchParams,
}: PageProps<"/admin/arrangementer">) {
  const sp = await searchParams;
  const raw = typeof sp.periode === "string" ? sp.periode : "upcoming";
  const scope = (SCOPES.find((s) => s.key === raw)?.key ?? "upcoming") as
    | "upcoming"
    | "past"
    | "all";

  const [events, photographers] = await Promise.all([
    listEvents(scope),
    listPhotographers(),
  ]);
  const byId = new Map(photographers.map((p) => [p.id, p]));

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="display text-3xl">Arrangementer</h1>
        <Link
          href="/admin/arrangementer/ny"
          className="meta-label rounded-full bg-ink px-5 py-2.5 text-cream transition-colors hover:bg-smoke"
        >
          Nytt arrangement
        </Link>
      </div>

      <div className="mb-5 flex gap-1 rounded-full border border-ink/15 p-1 text-sm sm:w-fit">
        {SCOPES.map((s) => (
          <Link
            key={s.key}
            href={`/admin/arrangementer?periode=${s.key}`}
            aria-current={s.key === scope ? "page" : undefined}
            className={`meta-label rounded-full px-4 py-1.5 transition-colors ${
              s.key === scope ? "bg-ink text-cream" : "text-smoke hover:text-ink"
            }`}
          >
            {s.label}
          </Link>
        ))}
      </div>

      {events.length === 0 ? (
        <p className="rounded-xl border border-ink/10 bg-cream px-5 py-8 text-center text-sm text-smoke">
          Ingen arrangementer her ennå.
        </p>
      ) : (
        <ul className="divide-y divide-ink/10 overflow-hidden rounded-xl border border-ink/10 bg-cream">
          {events.map((e) => {
            const chip = chipLabel(e.starts_on, e.ends_on, "no");
            const people = e.event_photographers
              .map((ep) => byId.get(ep.photographer_id))
              .filter(Boolean);
            return (
              <li key={e.id}>
                <Link
                  href={`/admin/arrangementer/${e.id}`}
                  className="flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-shell"
                >
                  <div className="w-14 shrink-0 rounded-lg border border-ink/10 bg-shell py-1.5 text-center">
                    <div className="text-sm font-extrabold leading-none">{chip.day}</div>
                    <div className="mt-0.5 text-[9px] uppercase tracking-wider text-smoke">
                      {chip.month}
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{e.title_no}</p>
                    <p className="truncate text-xs text-smoke">
                      {e.location_no}
                      {chip.spansMonths && ` · til ${shortDate(e.ends_on, "no")}`}
                    </p>
                  </div>

                  <span className="hidden shrink-0 items-center gap-1 sm:inline-flex">
                    {people.map((p) => (
                      <span
                        key={p!.id}
                        title={p!.display_name}
                        className="inline-flex size-6 items-center justify-center rounded-full bg-ink text-[10px] font-bold text-cream"
                      >
                        {p!.initials}
                      </span>
                    ))}
                    {people.length === 0 && (
                      <span className="text-[11px] font-semibold text-amber-700">
                        Ingen fotograf
                      </span>
                    )}
                  </span>

                  <span className="flex shrink-0 flex-col items-end gap-1 text-[11px]">
                    <span className="font-semibold text-smoke">
                      {STATUS_LABELS[e.status as EventStatus]}
                    </span>
                    {(!e.is_published || e.kind !== "booking") && (
                      <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] text-smoke">
                        {e.kind !== "booking"
                          ? KIND_LABELS[e.kind as EventKind]
                          : "Skjult"}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
