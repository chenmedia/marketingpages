import type { Dictionary, Locale } from "@/lib/i18n";
import { agenda } from "@/lib/agenda";
import PlaceholderImage from "./PlaceholderImage";
import ContactForm from "./ContactForm";

/*
  Booking-seksjonen à la TON: portrettkort + stats + kommende kalender til
  venstre, skjema til høyre. Mørk avslutning på alle sider (id="kontakt").
*/
export default function ContactCTA({
  dict,
  locale,
  heading,
  lead,
}: {
  dict: Dictionary;
  locale: Locale;
  heading?: string;
  lead?: string;
}) {
  const { contact } = dict;
  const confirmed = agenda.filter((entry) => entry.status === "booked").length;
  const open = agenda.length - confirmed;

  return (
    <section id="kontakt" className="scroll-mt-24 bg-ink text-cream">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <h2 className="display text-3xl sm:text-4xl">
            {heading ?? (
              <>
                {contact.heading}{" "}
                <span className="text-sand">{contact.headingAccent}</span>
              </>
            )}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-sand">
            {lead ?? contact.lead}
          </p>
        </div>

        <div className="mt-14 grid items-start gap-8 lg:grid-cols-2">
          {/* Venstre: portrett, stats, agenda */}
          <div className="space-y-6">
            <div className="overflow-hidden rounded-lg border border-cream/15">
              <PlaceholderImage
                label="Kai Chen — bak kamera"
                tone="olive"
                className="aspect-[16/9] w-full"
              />
              <div className="bg-cream/5 p-4">
                <p className="display text-lg">Kai Chen</p>
                <p className="meta-label mt-0.5 text-sand">
                  {contact.photographerRole}
                </p>
              </div>
            </div>

            <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-cream/15 bg-cream/15">
              {contact.stats.map((stat) => (
                <div key={stat.caption} className="bg-ink p-4 text-center">
                  <dt className="display text-base sm:text-lg">{stat.value}</dt>
                  <dd className="meta-label mt-1 text-sand">{stat.caption}</dd>
                </div>
              ))}
            </dl>

            {/* Kommende kalender — ekte knapphetssignal, data i lib/agenda.ts */}
            <div className="rounded-lg border border-cream/15 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="meta-label flex items-center gap-2 text-cream">
                  <span aria-hidden className="size-1.5 rounded-full bg-cream" />
                  {contact.agenda.label} · 2026
                </p>
                <p className="meta-label text-sand">
                  {confirmed} {contact.agenda.confirmedLabel} · {open}{" "}
                  {contact.agenda.openLabel}
                </p>
              </div>
              <div className="relative">
              <ul className="mt-4 max-h-60 divide-y divide-cream/10 overflow-y-auto pr-1.5 [scrollbar-width:thin]">
                {agenda.map((entry) => (
                  <li
                    key={`${entry.day}-${entry.month.no}-${entry.title.no}`}
                    className="flex items-center gap-4 py-3"
                  >
                    <span className="flex size-11 shrink-0 flex-col items-center justify-center rounded-lg bg-cream/10">
                      <span className="display text-sm leading-none">
                        {entry.day}
                      </span>
                      <span className="meta-label mt-0.5 leading-none text-sand">
                        {entry.month[locale]}
                      </span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold">
                        {entry.title[locale]}
                      </span>
                      <span className="meta-label text-sand">
                        {entry.location}
                      </span>
                    </span>
                    <span
                      className={`meta-label shrink-0 rounded-full px-3 py-1 ${
                        entry.status === "open"
                          ? "bg-cream text-ink"
                          : "border border-cream/25 text-sand"
                      }`}
                    >
                      {entry.status === "open"
                        ? contact.agenda.statusOpen
                        : contact.agenda.statusBooked}
                    </span>
                  </li>
                ))}
              </ul>
              {/* Fade + scroll-hint nederst, jf. TONs agenda-liste */}
              <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-8 rounded-b bg-gradient-to-t from-ink to-transparent" />
              <span aria-hidden className="pointer-events-none absolute bottom-1 right-3 text-[10px] text-sand">
                scroll ▾
              </span>
              </div>
              <p className="mt-3 border-t border-cream/10 pt-3 text-xs leading-relaxed text-sand">
                {contact.agenda.note}
              </p>
            </div>
          </div>

          {/* Høyre: skjema */}
          <div className="rounded-lg border border-cream/15 p-6 sm:p-8">
            <ContactForm dict={dict} />
          </div>
        </div>
      </div>
    </section>
  );
}
