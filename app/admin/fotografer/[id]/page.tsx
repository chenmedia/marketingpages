import Link from "next/link";
import { notFound } from "next/navigation";
import PhotographerForm from "../../_components/PhotographerForm";
import { listPhotographers } from "@/lib/agenda/admin-queries";

export default async function EditPhotographerPage({
  params,
}: PageProps<"/admin/fotografer/[id]">) {
  const { id } = await params;
  const person = (await listPhotographers()).find((p) => p.id === id);
  if (!person) notFound();

  return (
    <>
      <Link href="/admin/fotografer" className="meta-label text-smoke hover:text-ink">
        ← Fotografer
      </Link>
      <h1 className="display mt-3 mb-8 text-3xl">{person.display_name}</h1>
      <PhotographerForm person={person} />
    </>
  );
}
