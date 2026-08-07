import Link from "next/link";
import EventForm from "../../_components/EventForm";
import { listPhotographers, getTeamSize } from "@/lib/agenda/admin-queries";

export default async function NewEventPage() {
  const [photographers, teamSize] = await Promise.all([
    listPhotographers(),
    getTeamSize(),
  ]);

  return (
    <>
      <Link href="/admin/arrangementer" className="meta-label text-smoke hover:text-ink">
        ← Arrangementer
      </Link>
      <h1 className="display mt-3 mb-8 text-3xl">Nytt arrangement</h1>
      <EventForm photographers={photographers} teamSize={teamSize} />
    </>
  );
}
