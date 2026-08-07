import type { Dictionary, Locale } from "@/lib/i18n";
import PlaceholderImage, { photo } from "./PlaceholderImage";
import ContactForm from "./ContactForm";
import { Suspense } from "react";
import AgendaWidget, { AgendaSkeleton } from "./AgendaWidget";

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

            <Suspense fallback={<AgendaSkeleton />}>
              <AgendaWidget dict={dict} locale={locale} />
            </Suspense>
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
