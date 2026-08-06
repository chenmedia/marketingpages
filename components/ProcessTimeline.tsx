import type { Dictionary } from "@/lib/i18n";
import SectionLabel from "./SectionLabel";

/*
  Prosess-seksjonen bærer konverteringslogikken: hvert steg avslutter med et
  konkret løfte i fet som svarer på én kjøpsinnvending.
*/
export default function ProcessTimeline({ dict }: { dict: Dictionary }) {
  const { process } = dict;
  return (
    <section className="bg-ink text-cream">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionLabel tone="light" number="04">
          {process.label}
        </SectionLabel>
        <h2 className="display mt-4 max-w-xl text-4xl sm:text-5xl">
          {process.heading}
        </h2>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-sand">
          {process.lead}
        </p>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-lg bg-cream/15 sm:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((step) => (
            <li key={step.number} className="flex flex-col bg-ink p-6">
              <span className="display text-3xl text-ember">{step.number}</span>
              <h3 className="display mt-4 text-lg">{step.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-sand">
                {step.body}
              </p>
              <p className="meta-label mt-5 border-t border-cream/15 pt-4 font-bold text-cream">
                {step.promise}
              </p>
            </li>
          ))}
        </ol>

        <p className="meta-label mt-8 text-sand">{process.note}</p>
      </div>
    </section>
  );
}
