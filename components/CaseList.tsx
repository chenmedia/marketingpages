import type { CaseItem } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n";
import PlaceholderImage from "./PlaceholderImage";

// Navngitte oppdrag med kontekst — tillitssignal, ikke logo-tapet.
export default function CaseList({
  items,
  imageSlots,
  locale = "no",
}: {
  items: CaseItem[];
  imageSlots?: readonly string[];
  locale?: Locale;
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {items.map((item, index) => (
        <article
          key={`${item.client}-${item.project}`}
          className="group min-w-0 overflow-hidden rounded-lg border border-ink/10 bg-cream"
        >
          <PlaceholderImage
            slot={imageSlots?.[index]}
            locale={locale}
            label={`${item.client}: ${item.project}`}
            sizes="(max-width: 640px) 100vw, 50vw"
            className="aspect-[3/2] w-full"
          />
          <div className="min-w-0 space-y-2 p-5">
            <p className="meta-label [overflow-wrap:anywhere] text-ember-deep">
              {item.kind}
            </p>
            <h3 className="display text-xl [overflow-wrap:anywhere]">
              {item.client}
              <span className="text-smoke"> · {item.project}</span>
            </h3>
            <p className="text-base leading-relaxed [overflow-wrap:anywhere] text-smoke">
              {item.context}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
