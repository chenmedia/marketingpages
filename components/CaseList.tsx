import type { CaseItem } from "@/lib/i18n/types";
import PlaceholderImage from "./PlaceholderImage";

const tones = ["bone", "ink", "butter", "olive"] as const;

// Navngitte oppdrag med kontekst — tillitssignal, ikke logo-tapet.
export default function CaseList({ items }: { items: CaseItem[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {items.map((item, i) => (
        <article
          key={`${item.client}-${item.project}`}
          className="group overflow-hidden rounded-lg border border-ink/10 bg-cream"
        >
          <PlaceholderImage
            label={`${item.client}: ${item.project}`}
            tone={tones[i % tones.length]}
            className="aspect-[3/2] w-full"
          />
          <div className="space-y-2 p-5">
            <p className="meta-label text-ember-deep">{item.kind}</p>
            <h3 className="display text-xl">
              {item.client}
              <span className="text-smoke"> · {item.project}</span>
            </h3>
            <p className="text-base leading-relaxed text-smoke">{item.context}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
