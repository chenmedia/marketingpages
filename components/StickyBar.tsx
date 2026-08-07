import Link from "next/link";
import { localeBase, type Dictionary, type Locale } from "@/lib/i18n";

// Sticky bunnbar à la TON: tilgjengelighetssignal + CTA, nede til høyre.
export default function StickyBar({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <div className="fixed bottom-4 right-4 z-40 hidden items-center gap-3 rounded-full border border-ink/10 bg-ink py-2 pl-5 pr-2 text-cream shadow-lg md:flex">
      <span className="meta-label flex items-center gap-2">
        <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-cream" />
        {dict.sticky.available}
      </span>
      <Link
        href={`${localeBase(locale)}#kontakt`}
        className="meta-label rounded-full bg-cream px-4 py-2 text-ink transition-colors hover:bg-bone"
      >
        {dict.sticky.cta} →
      </Link>
    </div>
  );
}
