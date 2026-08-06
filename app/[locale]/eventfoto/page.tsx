import type { Metadata } from "next";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import SectionLabel from "@/components/SectionLabel";
import PlaceholderImage from "@/components/PlaceholderImage";
import CaseList from "@/components/CaseList";
import Faq from "@/components/Faq";
import ContactCTA from "@/components/ContactCTA";
import Squiggle from "@/components/Squiggle";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/eventfoto">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: { absolute: dict.meta.photo.title },
    description: dict.meta.photo.description,
    alternates: {
      languages: { nb: "/no/eventfoto", en: "/en/eventfoto" },
    },
  };
}

export default async function EventPhotoPage({
  params,
}: PageProps<"/[locale]/eventfoto">) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const page = dict.photoPage;

  return (
    <>
      {/* Hero: tekst venstre, høyt foto høyre — annen komposisjon enn filmsiden */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
        <div className="grid items-start gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <SectionLabel number="01">{page.kicker}</SectionLabel>
            <h1 className="display mt-6 text-5xl sm:text-6xl lg:text-7xl">
              {page.title}
            </h1>
            <p className="mt-8 max-w-xl text-sm leading-relaxed text-smoke sm:text-base">
              {page.lead}
            </p>
          </div>
          <PlaceholderImage
            label="Eventfoto — fra salen"
            tone="bone"
            className="aspect-[4/5] w-full rounded-lg"
          />
        </div>
      </section>

      {/* Tilnærmingen */}
      <section className="bg-shell">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionLabel number="02">{page.approach.label}</SectionLabel>
          <h2 className="display mt-4 max-w-2xl text-4xl sm:text-5xl">
            {page.approach.heading}
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {page.approach.body.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-relaxed text-smoke">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Shot listen — det konkrete tillitssignalet */}
          <div className="mt-14 grid items-center gap-8 rounded-lg bg-ink p-8 text-cream md:grid-cols-[1fr_1.4fr] md:p-12">
            <div>
              <Squiggle className="w-20" />
              <h3 className="display mt-4 text-2xl sm:text-3xl">
                {page.shotlist.heading}
              </h3>
            </div>
            <div className="space-y-4">
              {page.shotlist.body.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-relaxed text-sand">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Arbeid */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionLabel number="03">{page.galleryLabel}</SectionLabel>
        <h2 className="display mt-4 text-4xl sm:text-5xl">
          {page.galleryHeading}
        </h2>
        <div className="mt-12">
          <CaseList items={page.caseHighlights} />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-shell">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionLabel number="04">{page.faq.label}</SectionLabel>
          <h2 className="display mb-10 mt-4 text-4xl sm:text-5xl">
            {page.faq.heading}
          </h2>
          <Faq items={page.faq.items} />
        </div>
      </section>

      <ContactCTA dict={dict} heading={page.cta.heading} lead={page.cta.lead} />
    </>
  );
}
