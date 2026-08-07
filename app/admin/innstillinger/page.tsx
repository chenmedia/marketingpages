import { getTeamSize, listPhotographers } from "@/lib/agenda/admin-queries";
import { setTeamSize } from "../actions";

export default async function SettingsPage() {
  const [teamSize, people] = await Promise.all([getTeamSize(), listPhotographers()]);
  const counting = people.filter((p) => p.is_active && p.counts_toward_capacity).length;

  return (
    <>
      <h1 className="display mb-6 text-3xl">Innstillinger</h1>

      <form action={setTeamSize} className="max-w-lg rounded-xl border border-ink/10 bg-cream p-5">
        <label htmlFor="team_size" className="mb-1.5 block text-sm font-medium">
          Teamstørrelse
        </label>
        <p className="mb-3 text-sm text-smoke">
          Tallet kalenderen regner ledig kapasitet ut fra. Er det flere aktive
          fotografer registrert enn dette, brukes det høyeste tallet. Nå er {counting}{" "}
          registrert som tellende.
        </p>
        <div className="flex items-center gap-3">
          <input
            id="team_size"
            name="team_size"
            type="number"
            min={1}
            max={200}
            defaultValue={teamSize}
            className="w-24 rounded-lg border border-ink/15 bg-cream px-3 py-2.5 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ink"
          />
          <button
            type="submit"
            className="meta-label rounded-full bg-ink px-5 py-2.5 text-cream transition-colors hover:bg-smoke"
          >
            Lagre
          </button>
        </div>
      </form>

      <section className="mt-8 max-w-lg rounded-xl border border-ink/10 bg-cream p-5">
        <h2 className="meta-label mb-2 text-smoke">Nye brukere</h2>
        <p className="text-sm text-smoke">
          Brukere opprettes i Supabase-dashbordet under Authentication → Users →
          Invite user. Selvregistrering er slått av med vilje, så ingen kan lage
          konto selv. En ny bruker får rollen «viewer» og må settes til «admin» i
          profiles-tabellen før den får tilgang hit.
        </p>
      </section>
    </>
  );
}
