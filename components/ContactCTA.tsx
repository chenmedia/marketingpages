import type { Dictionary } from "@/lib/i18n";
import SectionLabel from "./SectionLabel";
import Squiggle from "./Squiggle";

export default function ContactCTA({
  dict,
  heading,
  lead,
}: {
  dict: Dictionary;
  heading?: string;
  lead?: string;
}) {
  const { contact } = dict;
  return (
    <section id="kontakt" className="scroll-mt-24 bg-butter">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionLabel number="06">{contact.label}</SectionLabel>
        <div className="mt-6 grid items-start gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="display max-w-2xl text-4xl sm:text-5xl">
              {heading ?? contact.heading}
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-smoke">
              {lead ?? contact.lead}
            </p>
            <Squiggle className="mt-8 w-28" />
          </div>

          <div className="rounded-lg border border-ink/15 bg-cream p-6">
            <p className="meta-label text-smoke">{contact.emailLabel}</p>
            <a
              href="mailto:kai@chenmedia.no"
              className="mt-1 block break-all text-lg font-bold underline decoration-ember underline-offset-4 hover:text-ember"
            >
              kai@chenmedia.no
            </a>
            <a
              href="mailto:kai@chenmedia.no"
              className="meta-label mt-6 inline-block rounded-full bg-ember-deep px-5 py-3 text-cream transition-colors hover:bg-ink"
            >
              {contact.cta}
            </a>
            <p className="mt-4 text-xs leading-relaxed text-smoke">
              {contact.reply}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
