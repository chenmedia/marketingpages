import Link from "next/link";
import type { Dictionary } from "@/lib/i18n";
import SectionLabel from "./SectionLabel";

/*
  Prosessen svarer på det kunden lurer på før de tar kontakt: hva skjer, når
  skjer det, og hva kan jeg stole på?

  Derfor en ekte tidslinje (vannrett på desktop, loddrett på mobil) med
  tidspunkt per steg, og løftet rett under tittelen i lesbar størrelse.
  Løftene er det kunden faktisk kjøper, så de skal ikke stå i liten
  versalskrift nederst. Arrangementsdagen er markert som høydepunktet.

  Seksjonen ender med en knapp til steg 01, siden det er det naturlige neste
  steget etter å ha lest prosessen.
*/
export default function ProcessTimeline({
  dict,
  number,
  ctaHref,
}: {
  dict: Dictionary;
  /** Seksjonsnummeret der komponenten står, så nummereringen følger siden */
  number?: string;
  /** Lenken knappen går til, normalt kontaktskjemaet på samme side */
  ctaHref: string;
}) {
  const { process } = dict;
  return (
    <section className="bg-ink text-cream">
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-20 sm:px-6 lg:pt-24">
        <div className="grid gap-x-12 gap-y-4 lg:grid-cols-2 lg:items-end">
          <div>
            <SectionLabel tone="light" number={number}>
              {process.label}
            </SectionLabel>
            <h2 className="display mt-4 text-3xl text-balance sm:text-4xl">
              {process.heading}
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-pretty text-sand lg:justify-self-end">
            {process.lead}
          </p>
        </div>

        {/*
          Linjen er ::before på listen: loddrett langs prikkene på mobil,
          vannrett gjennom prikkene fra lg. Prikken er 15px, linjen ligger
          i midten av den (7px).
        */}
        <ol className="relative mt-16 grid gap-12 before:absolute before:bottom-3 before:left-[7px] before:top-3 before:w-px before:bg-cream/20 lg:grid-cols-4 lg:gap-8 lg:before:inset-x-0 lg:before:bottom-auto lg:before:left-0 lg:before:top-[7px] lg:before:h-px lg:before:w-auto">
          {process.steps.map((step) => (
            <li key={step.number} className="relative pl-10 lg:pl-0 lg:pt-12">
              <span
                aria-hidden
                className={`absolute left-0 top-1 size-[15px] rounded-full border lg:top-0 ${
                  step.highlight
                    ? "border-cream bg-cream ring-4 ring-cream/15"
                    : "border-cream/40 bg-ink"
                }`}
              />
              {step.when ? (
                <p className={`meta-label ${step.highlight ? "text-cream" : "text-sand"}`}>
                  {step.when}
                </p>
              ) : null}
              <h3 className="display mt-2 text-xl text-balance">
                <span className="mr-2 tabular-nums text-sand">{step.number}</span>
                {step.title}
              </h3>
              <p className="mt-3 flex items-start gap-2 text-base font-semibold leading-snug text-cream">
                <svg
                  viewBox="0 0 12 12"
                  className="mt-1 size-3 shrink-0"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M2 6.5L4.5 9L10 3.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {step.promise}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-pretty text-sand">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-cream/15 pt-8">
          <Link
            href={ctaHref}
            className="meta-label group inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-ink transition duration-200 hover:bg-sand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream active:scale-[0.98]"
          >
            {process.cta}
            <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
          {process.note ? (
            <p className="text-base text-pretty text-sand">{process.note}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
