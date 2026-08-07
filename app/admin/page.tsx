import Link from "next/link";
import {
  listEvents,
  listPhotographers,
  getTeamSize,
  capacityAhead,
} from "@/lib/agenda/admin-queries";
import { chipLabel, longDate, todayInOslo } from "@/lib/agenda/date";

export default async function AdminDashboard() {
  const [events, photographers, teamSize, capacity] = await Promise.all([
    listEvents("upcoming"),
    listPhotographers(),
    getTeamSize(),
    capacityAhead(30),
  ]);

  const effectiveTeam = Math.max(
    teamSize,
    photographers.filter((p) => p.is_active && p.counts_toward_capacity).length
  );
  const nextFree = capacity.find((d) => d.free > 0);
  const overbooked = capacity.filter((d) => d.free < 0);
  const withoutPhotographer = events.filter(
    (e) => e.event_photographers.length === 0 && e.kind !== "internal"
  );
  const today = todayInOslo();
  const soonTentative = events.filter(
    (e) => e.status === "tentative" && e.starts_on <= addDays(today, 14)
  );

  return (
    <>
      <h1 className="display mb-6 text-3xl">Oversikt</h1>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <Stat value={String(events.length)} caption="kommende arrangementer" />
        <Stat value={String(effectiveTeam)} caption="fotografer i teamet" />
        <Stat
          value={nextFree ? String(nextFree.free) : "0"}
          caption="ledige neste ledige dag"
        />
      </div>

      <section className="mb-8 rounded-xl border border-ink/10 bg-cream p-5">
        <h2 className="meta-label mb-1 text-smoke">Kapasitet neste 30 dager</h2>
        <p className="mb-4 text-sm">
          {nextFree ? (
            <>
              Neste ledige dato:{" "}
              <strong>{longDate(nextFree.day, "no")}</strong>{" "}
              <span className="text-smoke">({nextFree.free} av {effectiveTeam} ledige)</span>
            </>
          ) : (
            <span className="text-smoke">Ingen ledig kapasitet de neste 30 dagene.</span>
          )}
        </p>
        {/* Én kolonne per dag. Høyden viser hvor mye kapasitet som er igjen. */}
        <div className="flex items-end gap-[3px]" aria-hidden>
          {capacity.map((d) => {
            const ratio = Math.max(0, Math.min(1, d.free / Math.max(effectiveTeam, 1)));
            return (
              <div
                key={d.day}
                title={`${d.day}: ${d.free} ledige`}
                className={`flex-1 rounded-sm ${
                  d.free < 0 ? "bg-red-500" : d.free === 0 ? "bg-amber-500" : "bg-ink"
                }`}
                style={{ height: `${Math.max(4, ratio * 44)}px` }}
              />
            );
          })}
        </div>
        <p className="sr-only">
          {capacity.map((d) => `${d.day}: ${d.free} ledige.`).join(" ")}
        </p>
      </section>

      {(overbooked.length > 0 ||
        withoutPhotographer.length > 0 ||
        soonTentative.length > 0) && (
        <section className="mb-8 space-y-3">
          <h2 className="meta-label text-smoke">Trenger oppmerksomhet</h2>

          {overbooked.length > 0 && (
            <Alert tone="red">
              {overbooked.length} {overbooked.length === 1 ? "dag er" : "dager er"}{" "}
              overbooket: {overbooked.slice(0, 5).map((d) => d.day).join(", ")}
            </Alert>
          )}
          {withoutPhotographer.length > 0 && (
            <Alert tone="amber">
              {withoutPhotographer.length}{" "}
              {withoutPhotographer.length === 1 ? "arrangement" : "arrangementer"} mangler
              fotograf:{" "}
              {withoutPhotographer.slice(0, 3).map((e) => e.title_no).join(", ")}
            </Alert>
          )}
          {soonTentative.length > 0 && (
            <Alert tone="amber">
              {soonTentative.length}{" "}
              {soonTentative.length === 1 ? "tentativ booking" : "tentative bookinger"}{" "}
              starter innen to uker og bør bekreftes.
            </Alert>
          )}
        </section>
      )}

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="meta-label text-smoke">Neste ut</h2>
          <Link href="/admin/arrangementer" className="meta-label hover:underline">
            Se alle →
          </Link>
        </div>
        <ul className="divide-y divide-ink/10 overflow-hidden rounded-xl border border-ink/10 bg-cream">
          {events.slice(0, 5).map((e) => {
            const chip = chipLabel(e.starts_on, e.ends_on, "no");
            return (
              <li key={e.id}>
                <Link
                  href={`/admin/arrangementer/${e.id}`}
                  className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-shell"
                >
                  <span className="w-14 shrink-0 text-center">
                    <span className="block text-sm font-extrabold leading-none">{chip.day}</span>
                    <span className="mt-0.5 block text-[9px] uppercase tracking-wider text-smoke">
                      {chip.month}
                    </span>
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm">{e.title_no}</span>
                  <span className="shrink-0 text-xs text-smoke">{e.location_no}</span>
                </Link>
              </li>
            );
          })}
          {events.length === 0 && (
            <li className="px-4 py-8 text-center text-sm text-smoke">
              Ingen kommende arrangementer.{" "}
              <Link href="/admin/arrangementer/ny" className="underline">Legg inn det første</Link>.
            </li>
          )}
        </ul>
      </section>
    </>
  );
}

function Stat({ value, caption }: { value: string; caption: string }) {
  return (
    <div className="rounded-xl border border-ink/10 bg-cream px-4 py-5 text-center">
      <div className="display text-3xl">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-wide text-smoke">{caption}</div>
    </div>
  );
}

function Alert({ tone, children }: { tone: "red" | "amber"; children: React.ReactNode }) {
  const cls =
    tone === "red"
      ? "border-red-300 bg-red-50 text-red-900"
      : "border-amber-300 bg-amber-50 text-amber-900";
  return <p className={`rounded-lg border px-4 py-3 text-sm ${cls}`}>{children}</p>;
}

function addDays(iso: string, n: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + n));
  return dt.toISOString().slice(0, 10);
}
