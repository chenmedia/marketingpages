import ImageUploader from "@/components/ImageUploader";
import { publicUrlFor } from "@/lib/images/queries";
import { SLOTS, SLOT_GROUPS } from "@/lib/images/slots";
import { createClient } from "@/lib/supabase/server";

/*
  Oversikt over alle bildeflatene på nettsiden.

  Admin leser med den cookie-bundne klienten, ikke getSiteImages, så listen
  alltid viser ferskeste tilstand og ikke det cachede svaret forsiden bruker.
*/
export const dynamic = "force-dynamic";

export default async function BilderPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_images")
    .select("slot, path, alt_no, alt_en, caption, focal_x, focal_y");

  const bySlot = new Map((data ?? []).map((row) => [row.slot, row]));
  const filled = SLOTS.filter((s) => bySlot.has(s.slot)).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="display text-2xl">Bilder</h1>
        <p className="mt-2 max-w-2xl text-sm text-smoke">
          Hver flate på nettsiden har sin egen plass her. Flater uten eget bilde
          viser et standardbilde, så nettsiden aldri står tom mens du fyller dem
          ut. Klikk i bildet for å sette hvor motivet er viktigst; det avgjør
          hvordan bildet beskjæres i de smale utsnittene.
        </p>
        <p className="mt-3 text-sm font-semibold">
          {filled} av {SLOTS.length} flater har eget bilde
        </p>
      </div>

      <div className="space-y-10">
        {SLOT_GROUPS.map((group) => (
          <section key={group}>
            <h2 className="meta-label mb-3 border-b border-ink/10 pb-2 text-smoke">
              {group}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {SLOTS.filter((s) => s.group === group).map((def) => {
                const row = bySlot.get(def.slot);
                return (
                  <ImageUploader
                    key={def.slot}
                    def={def}
                    currentUrl={row ? publicUrlFor(row.path) : def.fallback}
                    currentAltNo={row?.alt_no ?? def.fallbackAlt}
                    currentAltEn={row?.alt_en ?? def.fallbackAlt}
                    currentCaption={row?.caption ?? null}
                    focal={{ x: row?.focal_x ?? 0.5, y: row?.focal_y ?? 0.5 }}
                    isDefault={!row}
                  />
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
