"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { saveEvent, deleteEvent, type FormState } from "../actions";
import {
  EVENT_KINDS,
  EVENT_STATUSES,
  KIND_LABELS,
  STATUS_LABELS,
  type Photographer,
} from "@/lib/agenda/types";
import type { AdminEvent } from "@/lib/agenda/admin-queries";

const field =
  "w-full rounded-lg border border-ink/15 bg-cream px-3 py-2.5 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ink";
const label = "mb-1.5 block text-sm font-medium";

export default function EventForm({
  event,
  client,
  notes,
  photographers,
  teamSize,
}: {
  event?: AdminEvent;
  client?: string;
  notes?: string;
  photographers: Photographer[];
  teamSize: number;
}) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveEvent, {});

  const [starts, setStarts] = useState(event?.starts_on ?? "");
  const [ends, setEnds] = useState(event?.ends_on ?? "");
  const [kind, setKind] = useState(event?.kind ?? "booking");
  const [picked, setPicked] = useState<string[]>(
    event?.event_photographers?.map((p) => p.photographer_id) ?? []
  );

  const counting = photographers.filter(
    (p) => p.is_active && p.counts_toward_capacity
  ).length;
  const effectiveTeam = Math.max(teamSize, counting);
  // Grovt anslag mens man fyller ut. Fasiten regnes i databasen ved lagring.
  const freePreview = effectiveTeam - picked.length;
  const err = state.errors ?? {};

  function toggle(id: string) {
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  }

  return (
    <form action={action} className="space-y-6">
      {event && <input type="hidden" name="id" value={event.id} />}

      {err._ && (
        <p role="alert" className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
          {err._}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="starts_on" className={label}>Startdato</label>
          <input
            id="starts_on" name="starts_on" type="date" required className={field}
            value={starts}
            onChange={(e) => {
              setStarts(e.target.value);
              // Endagsarrangement er normalen, så sluttdato følger etter
              if (!ends || ends < e.target.value) setEnds(e.target.value);
            }}
          />
          {err.starts_on && <p className="mt-1 text-xs text-red-700">{err.starts_on}</p>}
        </div>
        <div>
          <label htmlFor="ends_on" className={label}>
            Sluttdato <span className="font-normal text-smoke">(samme dag hvis tom)</span>
          </label>
          <input
            id="ends_on" name="ends_on" type="date" className={field}
            value={ends} min={starts} onChange={(e) => setEnds(e.target.value)}
          />
          {err.ends_on && <p className="mt-1 text-xs text-red-700">{err.ends_on}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="title_no" className={label}>Tittel (norsk)</label>
          <input id="title_no" name="title_no" required className={field}
                 defaultValue={event?.title_no} placeholder="Konferanse" />
          {err.title_no && <p className="mt-1 text-xs text-red-700">{err.title_no}</p>}
        </div>
        <div>
          <label htmlFor="title_en" className={label}>Tittel (engelsk)</label>
          <input id="title_en" name="title_en" required className={field}
                 defaultValue={event?.title_en} placeholder="Conference" />
          {err.title_en && <p className="mt-1 text-xs text-red-700">{err.title_en}</p>}
        </div>
        <div>
          <label htmlFor="location_no" className={label}>Sted (norsk)</label>
          <input id="location_no" name="location_no" required className={field}
                 defaultValue={event?.location_no} placeholder="Oslo" />
          {err.location_no && <p className="mt-1 text-xs text-red-700">{err.location_no}</p>}
        </div>
        <div>
          <label htmlFor="location_en" className={label}>
            Sted (engelsk) <span className="font-normal text-smoke">(valgfri)</span>
          </label>
          <input id="location_en" name="location_en" className={field}
                 defaultValue={event?.location_en ?? ""} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="kind" className={label}>Type</label>
          <select id="kind" name="kind" className={field} value={kind}
                  onChange={(e) => setKind(e.target.value)}>
            {EVENT_KINDS.map((k) => (
              <option key={k} value={k}>{KIND_LABELS[k]}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="status" className={label}>Status</label>
          <select id="status" name="status" className={field} defaultValue={event?.status ?? "confirmed"}>
            {EVENT_STATUSES.map((s) => (
              <option key={s} value={s}>{STATUS_LABELS[s]}</option>
            ))}
          </select>
        </div>
      </div>

      {kind === "internal" ? (
        <p className="rounded-lg border border-ink/10 bg-shell px-4 py-3 text-sm text-smoke">
          Interne arrangementer vises aldri på nettsiden, men legger beslag på
          fotografen og trekker fra ledig kapasitet. Bruk det til ferie og annet fravær.
        </p>
      ) : (
        <label className="flex items-center gap-2.5 text-sm">
          <input type="checkbox" name="is_published" defaultChecked={event?.is_published ?? true}
                 className="size-4 rounded border-ink/30" />
          Vis på nettsiden
        </label>
      )}

      <fieldset>
        <legend className={label}>Fotografer</legend>
        <div className="flex flex-wrap gap-2">
          {photographers.filter((p) => p.is_active).map((p) => {
            const on = picked.includes(p.id);
            return (
              <label key={p.id}
                     className={`flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors ${
                       on ? "border-ink bg-ink text-cream" : "border-ink/20 hover:border-ink/40"
                     }`}>
                <input type="checkbox" name="photographers" value={p.id} checked={on}
                       onChange={() => toggle(p.id)} className="sr-only" />
                <span className={`inline-flex size-5 items-center justify-center rounded-full text-[10px] font-bold ${
                  on ? "bg-cream text-ink" : "bg-ink/10"
                }`}>{p.initials}</span>
                {p.display_name}
              </label>
            );
          })}
          {photographers.filter((p) => p.is_active).length === 0 && (
            <p className="text-sm text-smoke">
              Ingen aktive fotografer ennå.{" "}
              <Link href="/admin/fotografer/ny" className="underline">Legg til en</Link>.
            </p>
          )}
        </div>
        <p className={`mt-3 text-sm ${freePreview < 0 ? "font-semibold text-red-700" : "text-smoke"}`}>
          {freePreview < 0
            ? `Overbooking: ${Math.abs(freePreview)} flere enn teamet har kapasitet til.`
            : `Dette gir omtrent ${freePreview} ledige av ${effectiveTeam} disse dagene.`}
        </p>
      </fieldset>

      <div className="rounded-lg border border-ink/10 bg-shell p-4">
        <p className="meta-label mb-3 text-smoke">Kun internt, vises aldri offentlig</p>
        <div className="space-y-4">
          <div>
            <label htmlFor="client" className={label}>Kunde</label>
            <input id="client" name="client" className={field} defaultValue={client ?? ""}
                   placeholder="Snapchat" />
          </div>
          <div>
            <label htmlFor="notes" className={label}>Notater</label>
            <textarea id="notes" name="notes" rows={3} className={field} defaultValue={notes ?? ""} />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-ink/10 pt-5">
        <button type="submit" disabled={pending}
                className="meta-label rounded-full bg-ink px-6 py-3 text-cream transition-colors hover:bg-smoke disabled:opacity-60">
          {pending ? "Lagrer …" : "Lagre"}
        </button>
        <Link href="/admin/arrangementer" className="meta-label text-smoke hover:text-ink">
          Avbryt
        </Link>
        {event && (
          <button type="submit" formAction={deleteEvent}
                  className="meta-label ml-auto text-red-700 hover:underline">
            Slett arrangementet
          </button>
        )}
      </div>
    </form>
  );
}
