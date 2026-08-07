import Link from "next/link";
import PhotographerForm from "../../_components/PhotographerForm";

export default function NewPhotographerPage() {
  return (
    <>
      <Link href="/admin/fotografer" className="meta-label text-smoke hover:text-ink">
        ← Fotografer
      </Link>
      <h1 className="display mt-3 mb-8 text-3xl">Ny fotograf</h1>
      <PhotographerForm />
    </>
  );
}
