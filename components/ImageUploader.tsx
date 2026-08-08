"use client";

import { useRef, useState } from "react";
import type { SlotDef } from "@/lib/images/slots";
import { uploadSiteImage } from "@/app/admin/actions";

/*
  Opplasting av ett bilde til én bildeflate.

  Bildet krympes i nettleseren før det sendes. En kamerafil på 8 MB blir noen
  hundre kilobyte, opplastingen går fort, og serveren slipper bildebehandling
  helt. Server Action validerer type og størrelse på nytt uansett; det
  klienten sier er aldri godt nok.

  Blur-forhåndsvisningen lages i samme slengen ved å tegne bildet til et 8px
  lerret. Da toner bildet inn i stedet for å poppe.
*/

const MAX_EDGE = 2400;
const QUALITY = 0.82;

type Prepared = {
  blob: Blob;
  width: number;
  height: number;
  blurDataUrl: string;
  previewUrl: string;
};

async function prepare(file: File): Promise<Prepared> {
  const bitmap = await createImageBitmap(file);

  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, width, height);

  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Klarte ikke å lese bildet."))),
      "image/webp",
      QUALITY
    )
  );

  // 8px langs lengste kant er nok til en uskarp antydning av fargene
  const tiny = document.createElement("canvas");
  const tinyScale = 8 / Math.max(width, height);
  tiny.width = Math.max(1, Math.round(width * tinyScale));
  tiny.height = Math.max(1, Math.round(height * tinyScale));
  tiny.getContext("2d")!.drawImage(bitmap, 0, 0, tiny.width, tiny.height);

  bitmap.close();

  return {
    blob,
    width,
    height,
    blurDataUrl: tiny.toDataURL("image/webp", 0.5),
    previewUrl: URL.createObjectURL(blob),
  };
}

function kb(bytes: number) {
  return `${Math.round(bytes / 1024)} kB`;
}

export default function ImageUploader({
  def,
  currentUrl,
  currentAltNo,
  currentAltEn,
  currentCaption,
  focal,
  isDefault,
}: {
  def: SlotDef;
  currentUrl: string;
  currentAltNo: string;
  currentAltEn: string;
  currentCaption: string | null;
  focal: { x: number; y: number };
  isDefault: boolean;
}) {
  const [prepared, setPrepared] = useState<Prepared | null>(null);
  const [point, setPoint] = useState(focal);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    try {
      setPrepared(await prepare(file));
    } catch {
      setError("Klarte ikke å lese bildefilen. Prøv JPEG eller PNG.");
    }
  }

  /** Fokuspunktet settes ved å klikke i bildet. */
  function onPickFocal(e: React.MouseEvent<HTMLDivElement>) {
    const box = e.currentTarget.getBoundingClientRect();
    setPoint({
      x: Math.min(1, Math.max(0, (e.clientX - box.left) / box.width)),
      y: Math.min(1, Math.max(0, (e.clientY - box.top) / box.height)),
    });
  }

  async function onSubmit(form: FormData) {
    setBusy(true);
    setError(null);
    form.set("slot", def.slot);
    form.set("focal_x", String(point.x));
    form.set("focal_y", String(point.y));
    if (prepared) {
      form.set("file", prepared.blob, `${def.slot}.webp`);
      form.set("width", String(prepared.width));
      form.set("height", String(prepared.height));
      form.set("blur_data_url", prepared.blurDataUrl);
    }
    const result = await uploadSiteImage(form);
    setBusy(false);
    if (result?.error) setError(result.error);
    else {
      setPrepared(null);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  const shown = prepared?.previewUrl ?? currentUrl;

  return (
    <form action={onSubmit} className="rounded-xl border border-ink/10 bg-cream p-4">
      <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="display text-base">{def.label}</h3>
        <span className="meta-label text-smoke">{def.ratio}</span>
        {isDefault && !prepared && (
          <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
            standardbilde
          </span>
        )}
        {prepared && (
          <span className="rounded-full bg-green-500/15 px-2 py-0.5 text-[10px] font-semibold text-green-800">
            klar, {kb(prepared.blob.size)} · {prepared.width}×{prepared.height}
          </span>
        )}
      </div>

      {/* Klikk i bildet for å sette fokuspunktet */}
      <div
        onClick={onPickFocal}
        title="Klikk der motivet er viktigst"
        className="relative mb-3 aspect-[3/2] w-full cursor-crosshair overflow-hidden rounded-lg bg-shell"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={shown}
          alt=""
          className="h-full w-full object-cover"
          style={{ objectPosition: `${point.x * 100}% ${point.y * 100}%` }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cream bg-ink/70 shadow"
          style={{ left: `${point.x * 100}%`, top: `${point.y * 100}%` }}
        />
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        onChange={onPick}
        className="mb-3 block w-full text-xs file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-3 file:py-1.5 file:text-cream"
      />

      <div className="grid gap-2 sm:grid-cols-2">
        <label className="block">
          <span className="meta-label text-smoke">Alt-tekst, norsk</span>
          <input
            name="alt_no"
            defaultValue={currentAltNo}
            required={!def.decorative}
            maxLength={300}
            placeholder="Hva viser bildet?"
            className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="meta-label text-smoke">Alt-tekst, engelsk</span>
          <input
            name="alt_en"
            defaultValue={currentAltEn}
            required={!def.decorative}
            maxLength={300}
            placeholder="What does the photo show?"
            className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-sm"
          />
        </label>
        {def.hasCaption && (
          <label className="block sm:col-span-2">
            <span className="meta-label text-smoke">Bildetekst</span>
            <input
              name="caption"
              defaultValue={currentCaption ?? ""}
              maxLength={120}
              className="mt-1 w-full rounded-lg border border-ink/15 px-3 py-2 text-sm"
            />
          </label>
        )}
      </div>

      {def.decorative && (
        <p className="mt-2 text-xs text-smoke">
          Dekorativ flate. Alt-teksten brukes ikke, bildet ligger bak et overlegg.
        </p>
      )}

      {error && (
        <p role="alert" className="mt-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="mt-3 flex items-center gap-2">
        <button
          type="submit"
          disabled={busy}
          className="meta-label rounded-full bg-ink px-4 py-2 text-cream disabled:opacity-60"
        >
          {busy ? "Lagrer …" : prepared ? "Last opp og lagre" : "Lagre"}
        </button>
        {!isDefault && (
          <button
            type="submit"
            name="reset"
            value="1"
            disabled={busy}
            className="meta-label rounded-full border border-ink/20 px-4 py-2 disabled:opacity-60"
          >
            Tilbakestill
          </button>
        )}
      </div>
    </form>
  );
}
