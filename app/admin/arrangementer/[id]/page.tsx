import Link from "next/link";
import { notFound } from "next/navigation";
import EventForm from "../../_components/EventForm";
import {
  getEvent,
  listPhotographers,
  getTeamSize,
} from "@/lib/agenda/admin-queries";

export default async function EditEventPage({
  params,
}: PageProps<"/admin/arrangementer/[id]">) {
  const { id } = await params;

  const [found, photographers, teamSize] = await Promise.all([
    getEvent(id),
    listPhotographers(),
    getTeamSize(),
  ]);
  if (!found) notFound();

  return (
    <>
      <Link href="/admin/arrangementer" className="meta-label text-smoke hover:text-ink">
        ← Arrangementer
      </Link>
      <h1 className="display mt-3 mb-8 text-3xl">{found.event.title_no}</h1>
      <EventForm
        event={found.event}
        client={found.client}
        notes={found.notes}
        photographers={photographers}
        teamSize={teamSize}
      />
    </>
  );
}
