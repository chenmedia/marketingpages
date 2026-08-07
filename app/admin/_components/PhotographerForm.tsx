"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { savePhotographer, type FormState } from "../actions";
import type { Photographer } from "@/lib/agenda/types";

const field =
  "w-full rounded-lg border border-ink/15 bg-cream px-3 py-2.5 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ink";
const label = "mb-1.5 block text-sm font-medium";

export default function PhotographerForm({ person }: { person?: Photographer }) {
  const [state, action, pending] = useActionState<FormState, FormData>(
    savePhotographer,
    {}
  );
  const [initials, setInitials] = useState(person?.initials ?? "");
  const err = state.errors ?? {};

  return (
    <form action={action} className="max-w-lg space-y-5">
      {person && <input type="hidden" name="id" value={person.id} />}

      {(err._ || err.title_no) && (
        <p role="alert" className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
          {err._ ?? err.title_no}
        </p>
      )}

      <div>
        <label htmlFor="display_name" className={label}>Navn</label>
        <input id="display_name" name="display_name" required className={field}
               defaultValue={person?.display_name} placeholder="Kai Chen" />
      </div>

      <div>
        <label htmlFor="initials" className={label}>
          Initialer <span className="font-normal text-smoke">(1 til 3 tegn)</span>
        </label>
        <div className="flex items-center gap-3">
          <input id="initials" name="initials" required maxLength={3}
                 className={`${field} w-24 uppercase`} value={initials}
                 onChange={(e) => setInitials(e.target.value.toUpperCase())} />
          {/* Samme sirkel som i kalenderwidgeten, så man ser hva det blir */}
          <span className="inline-flex size-8 items-center justify-center rounded-full bg-ink text-xs font-bold text-cream">
            {initials || "?"}
          </span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="role_no" className={label}>Rolle (norsk)</label>
          <input id="role_no" name="role_no" className={field}
                 defaultValue={person?.role_no ?? ""} placeholder="Eventfotograf" />
        </div>
        <div>
          <label htmlFor="role_en" className={label}>Rolle (engelsk)</label>
          <input id="role_en" name="role_en" className={field}
                 defaultValue={person?.role_en ?? ""} placeholder="Event photographer" />
        </div>
      </div>

      <div>
        <label htmlFor="sort_order" className={label}>Rekkefølge</label>
        <input id="sort_order" name="sort_order" type="number" className={`${field} w-24`}
               defaultValue={person?.sort_order ?? 0} />
      </div>

      <label className="flex items-center gap-2.5 text-sm">
        <input type="checkbox" name="is_active" defaultChecked={person?.is_active ?? true}
               className="size-4 rounded border-ink/30" />
        Aktiv
      </label>

      <label className="flex items-start gap-2.5 text-sm">
        <input type="checkbox" name="counts_toward_capacity"
               defaultChecked={person?.counts_toward_capacity ?? true}
               className="mt-0.5 size-4 rounded border-ink/30" />
        <span>
          Teller mot kapasiteten
          <span className="block text-xs text-smoke">
            Skru av for assistenter og andre som ikke kan dekke et oppdrag alene.
          </span>
        </span>
      </label>

      <div className="flex items-center gap-3 border-t border-ink/10 pt-5">
        <button type="submit" disabled={pending}
                className="meta-label rounded-full bg-ink px-6 py-3 text-cream transition-colors hover:bg-smoke disabled:opacity-60">
          {pending ? "Lagrer …" : "Lagre"}
        </button>
        <Link href="/admin/fotografer" className="meta-label text-smoke hover:text-ink">
          Avbryt
        </Link>
      </div>
    </form>
  );
}
