import Link from "next/link";
import { listPhotographers, getTeamSize } from "@/lib/agenda/admin-queries";

export default async function PhotographersPage() {
  const [people, teamSize] = await Promise.all([
    listPhotographers(),
    getTeamSize(),
  ]);
  const counting = people.filter((p) => p.is_active && p.counts_toward_capacity).length;

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="display text-3xl">Fotografer</h1>
        <Link
          href="/admin/fotografer/ny"
          className="meta-label rounded-full bg-ink px-5 py-2.5 text-cream transition-colors hover:bg-smoke"
        >
          Ny fotograf
        </Link>
      </div>

      <p className="mb-5 rounded-lg border border-ink/10 bg-cream px-4 py-3 text-sm text-smoke">
        {counting} av {people.length} teller mot kapasiteten. Teamstørrelsen er satt
        til {teamSize} under{" "}
        <Link href="/admin/innstillinger" className="underline">innstillinger</Link>, og
        det høyeste av de to tallene brukes.
      </p>

      <ul className="divide-y divide-ink/10 overflow-hidden rounded-xl border border-ink/10 bg-cream">
        {people.map((p) => (
          <li key={p.id}>
            <Link
              href={`/admin/fotografer/${p.id}`}
              className="flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-shell"
            >
              <span
                className={`inline-flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  p.is_active ? "bg-ink text-cream" : "bg-ink/10 text-smoke"
                }`}
              >
                {p.initials}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">
                  {p.display_name}
                </span>
                <span className="block truncate text-xs text-smoke">
                  {p.role_no ?? "Ingen rolle satt"}
                </span>
              </span>
              <span className="flex shrink-0 gap-2 text-[10px]">
                {!p.is_active && (
                  <span className="rounded-full bg-ink/10 px-2 py-0.5 text-smoke">
                    Deaktivert
                  </span>
                )}
                {!p.counts_toward_capacity && (
                  <span className="rounded-full bg-ink/10 px-2 py-0.5 text-smoke">
                    Utenfor kapasitet
                  </span>
                )}
              </span>
            </Link>
          </li>
        ))}
        {people.length === 0 && (
          <li className="px-4 py-8 text-center text-sm text-smoke">
            Ingen fotografer ennå.
          </li>
        )}
      </ul>
    </>
  );
}
