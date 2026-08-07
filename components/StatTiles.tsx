import type { Locale } from "@/lib/i18n";
import { getSiteStats } from "@/lib/stats/queries";

/*
  De tre flisene over kalenderen. Egen async-komponent med Suspense i
  ContactCTA, samme grep som AgendaWidget, så de fem sidene som bruker
  ContactCTA slipper å røres.
*/
export default async function StatTiles({ locale }: { locale: Locale }) {
  const stats = await getSiteStats();
  if (stats.length === 0) return null;

  return (
    <div className="grid grid-cols-3 gap-2.5">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="flex flex-col items-center justify-center rounded-xl border border-cream/15 bg-cream/5 px-2 py-3.5 text-center"
        >
          <div className="whitespace-nowrap text-2xl font-extrabold leading-none">
            {stat.value}
          </div>
          <div className="mt-1.5 text-[10px] uppercase leading-tight tracking-wide text-sand">
            {locale === "no" ? stat.caption_no : stat.caption_en}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Holder høyden mens flisene lastes, så layouten ikke hopper. */
export function StatTilesSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-[70px] animate-pulse rounded-xl bg-cream/5" />
      ))}
    </div>
  );
}
