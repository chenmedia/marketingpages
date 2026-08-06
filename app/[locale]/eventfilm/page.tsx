import type { Metadata } from "next";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import SectionLabel from "@/components/SectionLabel";
import PlaceholderImage from "@/components/PlaceholderImage";
import CaseList from "@/components/CaseList";
import Faq from "@/components/Faq";
import ContactCTA from "@/components/ContactCTA";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/eventfilm">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: { absolute: dict.meta.film.title },
    description: dict.meta.film.description,
    alternates: {
      languages: { nb: "/no/eventfilm", en: "/en/eventfilm" },
    },
  };
}

export default async function EventFilmPage({
  params,
}: PageProps<"/[locale]/eventfilm">) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const page = dict.filmPage;

  return (
    <>
      {/* Hero: mørk og filmatisk med bredt «stillbilde» — annen komposisjon enn fotosiden */}
      <section className="bg-ink text-cream">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
          <SectionLabel tone="light" number="01">
            {page.kicker}
          </SectionLabel>
          <h1 className="display mt-6 max-w-3xl text-5xl sm:text-6xl lg:text-7xl">
            {page.title}
          </h1>
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-sand sm:text-base">
            {page.lead}
          </p>
          <PlaceholderImage
            label="Eventfilm — stillbilde 16:9"
            tone="olive"
            className="mt-12 aspect-video w-full rounded-lg"
          />
        </div>
      </section>

      {/* Håndverket */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionLabel number="02">{page.craft.label}</SectionLabel>
        <h2 className="display mt-4 max-w-2xl text-4xl sm:text-5xl">
          {page.craft.heading}
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {page.craft.body.map((paragraph) => (
            <p key={paragraph} className="text-sm leading-relaxed text-smoke">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Én produksjon, flere flater */}
        <div className="mt-14">
          <h3 className="display text-2xl sm:text-3xl">
            {page.formats.heading}
          </h3>
          <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 md:grid-cols-3">
            {page.formats.items.map((item, i) => (
              <div key={item.title} className="bg-cream p-6">
                <p className="display text-2xl text-ember">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h4 className="display mt-3 text-lg">{item.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-smoke">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Arbeid */}
      <section className="bg-shell">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionLabel number="03">{page.galleryLabel}</SectionLabel>
          <h2 className="display mt-4 text-4xl sm:text-5xl">
            {page.galleryHeading}
          </h2>
          <div className="mt-12">
            <CaseList items={page.caseHighlights} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionLabel number="04">{page.faq.label}</SectionLabel>
        <h2 className="display mb-10 mt-4 text-4xl sm:text-5xl">
          {page.faq.heading}
        </h2>
        <Faq items={page.faq.items} />
      </section>

      <ContactCTA dict={dict} locale={locale as Locale} heading={page.cta.heading} lead={page.cta.lead} />
    </>
  );
}
