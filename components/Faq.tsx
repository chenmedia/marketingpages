import type { FaqItem } from "@/lib/i18n/types";

// Uten JS: <details>-basert accordion.
export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((item) => (
        <details key={item.q} className="faq group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5">
            <span className="text-sm font-bold">{item.q}</span>
            <span
              aria-hidden
              className="faq-mark display shrink-0 text-xl text-ember"
            >
              +
            </span>
          </summary>
          <p className="max-w-2xl pb-6 text-base leading-relaxed text-smoke">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
