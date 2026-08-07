import type { Dictionary, Locale } from "@/lib/i18n";
import { getAgenda } from "@/lib/agenda/queries";
import { chipLabel, shortDate, yearOf } from "@/lib/agenda/date";
import LiveDot from "./LiveDot";

/*
  Kalenderwidgeten. Async Server Component som henter selv, slik at ingen av
  de fem sidene som bruker ContactCTA må tre data gjennom.

  I stedet for «Ledig / Booket» viser hver rad hvor mange fotografer som
  fortsatt er ledige den datoen. Det er TONs modell: hver rad ER en booking,
  og tallet forteller om det er plass til én til.
*/
export default async function AgendaWidget({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const rows = await getAgenda();
  const t = dict.contact.agenda;

  const year = rows[0] ? yearOf(rows[0].starts_on) : new Date().getFullYear();
  // Summen av de to badgene er antall rader i listen
  const confirmed = rows.filter((r) => r.status === "confirmed").length;
  const pending = rows.length - confirmed;

  return (
    <div className="rounded-2xl border border-cream/15 bg-cream/5 p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <LiveDot />
          <span className="text-[11px] font-bold uppercase tracking-widest text-bone">
            {t.label} · {year}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-green-500/25 bg-green-500/15 px-2 py-0.5 text-[10px] font-semibold text-green-400">
            ✓ {confirmed} {t.confirmedLabel}
          </span>
          {pending > 0 && (
            <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-amber-500/25 bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-400">
              ◔ {pending} {t.pendingLabel}
            </span>
          )}
        </div>
      </div>

      <div className="relative">
        <div className="max-h-[236px] divide-y divide-cream/5 overflow-y-auto pr-1.5 [scrollbar-width:thin]">
          {rows.length === 0 ? (
            <p className="py-10 text-center text-sm text-sand">{t.emptyLabel}</p>
          ) : (
            rows.map((row) => {
              const chip = chipLabel(row.starts_on, row.ends_on, locale);
              const free = Math.max(0, row.free_min);
              const title = locale === "no" ? row.title_no : row.title_en;
              const place =
                (locale === "no" ? row.location_no : row.location_en ?? row.location_no) ?? "";

              return (
                <div key={row.id} className="flex items-center gap-3 py-2">
                  <div
                    className="w-11 shrink-0 rounded-lg border border-cream/10 bg-cream/10 py-1 text-center"
                    aria-label={`${row.starts_on} til ${row.ends_on}`}
                  >
                    <div
                      className={`font-extrabold leading-none ${
                        chip.day.length > 2 ? "text-[13px]" : "text-sm"
                      }`}
                    >
                      {chip.day}
                    </div>
                    <div className="mt-0.5 text-[9px] uppercase tracking-wider text-sand">
                      {chip.month}
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold leading-tight">{title}</p>
                    <p className="truncate text-xs text-sand">
                      {place}
                      {/* Krysser spennet et månedsskifte, får chipen ikke plass til begge */}
                      {chip.spansMonths && ` · ${shortDate(row.ends_on, locale)}`}
                    </p>
                  </div>

                  <span className="inline-flex shrink-0 items-center gap-1">
                    {row.assigned.map((p) => (
                      <span
                        key={p.initials + p.name}
                        title={p.name}
                        className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-cream text-[9px] font-bold text-ink"
                      >
                        {p.initials}
                      </span>
                    ))}
                  </span>

                  <span
                    className={`inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-[11px] font-semibold ${
                      free >= 3 ? "text-green-400" : free >= 1 ? "text-amber-400" : "text-sand"
                    }`}
                  >
                    <span
                      className={`size-1.5 rounded-full ${
                        free >= 3 ? "bg-green-400" : free >= 1 ? "bg-amber-400" : "bg-sand"
                      }`}
                    />
                    {free === 0
                      ? t.fullLabel
                      : `${free} ${free === 1 ? t.freeOneLabel : t.freeLabel}`}
                  </span>
                </div>
              );
            })
          )}
          {rows.length > 0 && (
            <p className="py-2 text-center text-[10px] text-sand">{t.autoNote}</p>
          )}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 right-1.5 h-8 rounded-b bg-gradient-to-t from-ink to-transparent"
        />
        {/* Hintet peker på ingenting hvis alt får plass uten å scrolle */}
        {rows.length > 4 && (
          <div aria-hidden className="pointer-events-none absolute bottom-1 right-3 text-[10px] text-sand">
            scroll ▾
          </div>
        )}
      </div>

      <p className="mt-1 border-t border-cream/10 pt-3 text-[11px] leading-relaxed text-sand">
        {t.note}
      </p>
    </div>
  );
}

/** Samme høyde som listen, så det ikke hopper når dataen lander. */
export function AgendaSkeleton() {
  return (
    <div className="rounded-2xl border border-cream/15 bg-cream/5 p-5">
      <div className="mb-3 h-4 w-40 animate-pulse rounded bg-cream/10" />
      <div className="space-y-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="h-11 animate-pulse rounded-lg bg-cream/5" />
        ))}
      </div>
      <div className="mt-4 h-3 w-3/4 animate-pulse rounded bg-cream/10" />
    </div>
  );
}
