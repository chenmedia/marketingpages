import { listSiteStats } from "@/lib/agenda/admin-queries";
import { saveSiteStat } from "../actions";

const field =
  "rounded-lg border border-ink/15 bg-cream px-3 py-2.5 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ink";

export default async function StatsPage() {
  const stats = await listSiteStats();

  return (
    <>
      <h1 className="display mb-2 text-3xl">Statistikk</h1>
      <p className="mb-6 max-w-lg text-sm text-smoke">
        De tre flisene over kalenderen på forsiden. Tallene settes manuelt, siden
        kalenderen bare inneholder framtidige oppdrag og ville undervurdert året.
      </p>

      <div className="space-y-4">
        {stats.map((stat) => (
          <form
            key={stat.id}
            action={saveSiteStat}
            className="rounded-xl border border-ink/10 bg-cream p-5"
          >
            <input type="hidden" name="id" value={stat.id} />
            <div className="grid gap-3 sm:grid-cols-[7rem_1fr_1fr_auto] sm:items-end">
              <div>
                <label htmlFor={`v${stat.id}`} className="mb-1.5 block text-sm font-medium">
                  Tall
                </label>
                <input id={`v${stat.id}`} name="value" required defaultValue={stat.value}
                       className={`${field} w-full`} />
              </div>
              <div>
                <label htmlFor={`n${stat.id}`} className="mb-1.5 block text-sm font-medium">
                  Tekst (norsk)
                </label>
                <input id={`n${stat.id}`} name="caption_no" required defaultValue={stat.caption_no}
                       className={`${field} w-full`} />
              </div>
              <div>
                <label htmlFor={`e${stat.id}`} className="mb-1.5 block text-sm font-medium">
                  Tekst (engelsk)
                </label>
                <input id={`e${stat.id}`} name="caption_en" required defaultValue={stat.caption_en}
                       className={`${field} w-full`} />
              </div>
              <button
                type="submit"
                className="meta-label h-[42px] rounded-full bg-ink px-5 text-cream transition-colors hover:bg-smoke"
              >
                Lagre
              </button>
            </div>
            <label className="mt-3 flex items-center gap-2.5 text-sm">
              <input type="checkbox" name="is_visible" defaultChecked={stat.is_visible}
                     className="size-4 rounded border-ink/30" />
              Vis på forsiden
            </label>
          </form>
        ))}
      </div>
    </>
  );
}
