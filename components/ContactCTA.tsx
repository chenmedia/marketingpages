import type { Dictionary, Locale } from "@/lib/i18n";
import { agenda } from "@/lib/agenda";
import PlaceholderImage, { photo } from "./PlaceholderImage";
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
    <section id="kontakt" className="scroll-mt-24 relative overflow-hidden bg-ink text-cream">
      {/* Bakgrunnsfoto i opacity-20 med overlay, jf. TONs kontaktseksjon */}
      <div aria-hidden className="absolute inset-0 opacity-20">
        <PlaceholderImage label="" src={photo.epicStage} className="h-full w-full" />
      </div>
      <div aria-hidden className="absolute inset-0 bg-ink/80" />
      <div className="relative mx-auto max-w-5xl px-4 py-24 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl">
            {heading ?? (
              <>
                {contact.heading}{" "}
                <span className="text-sand">{contact.headingAccent}</span>
              </>
            )}
          </h2>
          <p className="text-xl text-sand">{lead ?? contact.lead}</p>
        </div>

        <div className="grid items-stretch gap-8 md:grid-cols-2">
          {/* Venstre: portrett, stats, agenda */}
          <div className="flex min-w-0 flex-col gap-4">
            <div className="relative h-52 overflow-hidden rounded-2xl sm:h-56">
              <PlaceholderImage
                label="Kai Chen bak kamera"
                src={photo.meetCrowd}
                className="h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <p className="text-lg font-bold leading-tight">Kai Chen</p>
                <p className="text-sm text-sand">{contact.photographerRole}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {contact.stats.map((stat) => (
                <div
                  key={stat.caption}
                  className="flex flex-col items-center justify-center rounded-xl border border-cream/15 bg-cream/5 px-2 py-3.5 text-center"
                >
                  {/* Korte tallverdier i TONs flisstil */}
                  <div className="whitespace-nowrap text-2xl font-extrabold leading-none">
                    {stat.value}
                  </div>
                  <div className="mt-1.5 text-[10px] uppercase leading-tight tracking-wide text-sand">
                    {stat.caption}
                  </div>
                </div>
              ))}
            </div>

            {/* Kommende kalender — prikk lik TONs agenda-widget; data i lib/agenda.ts */}
            <div className="rounded-2xl border border-cream/15 bg-cream/5 p-5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="relative flex size-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-green-500" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-bone">
                    {contact.agenda.label} · 2026
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-green-500/25 bg-green-500/15 px-2 py-0.5 text-[10px] font-semibold text-green-400">
                    ✓ {confirmed} {contact.agenda.confirmedLabel}
                  </span>
                  <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-amber-500/25 bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-400">
                    ◔ {open} {contact.agenda.openLabel}
                  </span>
                </div>
              </div>
              <div className="relative">
                <div className="max-h-[236px] divide-y divide-cream/5 overflow-y-auto pr-1.5 [scrollbar-width:thin]">
                  {agenda.map((entry) => (
                    <div
                      key={`${entry.day}-${entry.month.no}-${entry.title.no}`}
                      className="flex items-center gap-3 py-2"
                    >
                      <div className="w-11 shrink-0 rounded-lg border border-cream/10 bg-cream/10 py-1 text-center">
                        <div className="text-sm font-extrabold leading-none">
                          {entry.day}
                        </div>
                        <div className="mt-0.5 text-[9px] uppercase tracking-wider text-sand">
                          {entry.month[locale]}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold leading-tight">
                          {entry.title[locale]}
                        </p>
                        <p className="truncate text-xs text-sand">
                          {entry.location}
                        </p>
                      </div>
                      <span className="inline-flex shrink-0 items-center gap-1">
                        {entry.who.map((initial) => (
                          <span
                            key={initial}
                            className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-cream text-[9px] font-bold text-ink"
                          >
                            {initial}
                          </span>
                        ))}
                      </span>
                      <span
                        className={`inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-[11px] font-semibold ${
                          entry.status === "open" ? "text-green-400" : "text-amber-400"
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${
                            entry.status === "open" ? "bg-green-400" : "bg-amber-400"
                          }`}
                        />
                        {entry.status === "open"
                          ? contact.agenda.statusOpen
                          : contact.agenda.statusBooked}
                      </span>
                    </div>
                  ))}
                  <p className="py-2 text-center text-[10px] text-sand">
                    {contact.agenda.autoNote}
                  </p>
                </div>
                <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-1.5 h-8 rounded-b bg-gradient-to-t from-ink to-transparent" />
                <div aria-hidden className="pointer-events-none absolute bottom-1 right-3 text-[10px] text-sand">
                  scroll ▾
                </div>
              </div>
              <p className="mt-1 border-t border-cream/10 pt-3 text-[11px] leading-relaxed text-sand">
                {contact.agenda.note}
              </p>
            </div>
          </div>

          {/* Høyre: skjema */}
          <div className="h-full min-w-0">
            <ContactForm dict={dict} />
          </div>
        </div>
      </div>
    </section>
  );
}
