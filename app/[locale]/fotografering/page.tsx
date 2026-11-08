import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, localePath } from "@/lib/i18n";
import { alternatesFor } from "@/lib/site";
import { PHOTO_BASE_PATH, PHOTO_CATEGORIES, PHOTO_UI } from "@/lib/photography";
import SectionLabel from "@/components/SectionLabel";
import PlaceholderImage from "@/components/PlaceholderImage";
import PhotoCategoryGrid from "@/components/PhotoCategoryGrid";
import ContactCTA from "@/components/ContactCTA";

/*
  Oversikten over fotograferingstjenestene, bygget etter samme mønster som
  itsadapte.com/fotografering: toppbilde, mørkt ingressbånd, seks fliser
  som hver leder til sin kategoriside, og et bånd om foto og video samme dag.
*/
export async function generateMetadata({
  params,
}: PageProps<"/[locale]/fotografering">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: { absolute: PHOTO_UI.hubMeta.title[locale] },
    description: PHOTO_UI.hubMeta.description[locale],
    alternates: alternatesFor(locale, PHOTO_BASE_PATH),
  };
}

export default async function PhotographyPage({
  params,
}: PageProps<"/[locale]/fotografering">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const ui = PHOTO_UI.hub;

  return (
    <>
      {/* Toppbilde med tekst oppå */}
      <section className="relative isolate overflow-hidden bg-ink text-cream">
        <PlaceholderImage
          slot="fotografering-hero"
          locale={locale}
          label={ui.title[locale]}
          sizes="100vw"
          priority
          className="absolute inset-0 -z-10 h-full w-full"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/85 via-ink/50 to-ink/30" />
        <div className="mx-auto flex min-h-[70svh] max-w-6xl flex-col justify-end px-4 pb-16 pt-32 sm:px-6 sm:pb-20">
          <SectionLabel tone="light">{ui.kicker[locale]}</SectionLabel>
          <h1 className="display mt-6 max-w-3xl text-4xl sm:text-5xl lg:text-6xl">
            {ui.title[locale]}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-bone sm:text-lg">
            {ui.lead[locale]}
          </p>
          <div className="mt-8">
            <a
              href="#kontakt"
              className="meta-label inline-flex items-center rounded-full bg-cream px-6 py-3 text-ink transition-colors hover:bg-bone"
            >
              {ui.cta[locale]}
            </a>
          </div>
        </div>
      </section>

      {/* Ingressbåndet */}
      <section className="bg-ink text-cream">
        <div className="mx-auto grid max-w-6xl gap-8 border-t border-cream/15 px-4 py-16 sm:px-6 md:grid-cols-2 md:gap-16">
          <div>
            <SectionLabel tone="light" number="01">
              {ui.categoriesLabel[locale]}
            </SectionLabel>
            <h2 className="display mt-4 text-3xl sm:text-4xl">
              {ui.categoriesHeading[locale]}
            </h2>
          </div>
          <p className="self-end text-base leading-relaxed text-sand">
            {ui.categoriesBody[locale]}
          </p>
        </div>
      </section>

      {/* Kategoriene */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <PhotoCategoryGrid categories={PHOTO_CATEGORIES} locale={locale} />
      </section>

      {/* Foto og video samme dag */}
      <section className="bg-ink text-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2">
          <div>
            <SectionLabel tone="light" number="02">
              {ui.comboLabel[locale]}
            </SectionLabel>
            <h2 className="display mt-4 text-3xl sm:text-4xl">
              {ui.comboHeading[locale]}
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-sand">
              {ui.comboBody[locale]}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#kontakt"
                className="meta-label inline-flex items-center rounded-full bg-cream px-6 py-3 text-ink transition-colors hover:bg-bone"
              >
                {ui.comboCta[locale]}
              </a>
              <a
                href={localePath(locale, "/eventfilm")}
                className="meta-label inline-flex items-center rounded-full border border-cream px-6 py-3 transition-colors hover:bg-cream hover:text-ink"
              >
                {ui.comboFilm[locale]}
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 items-end gap-4">
            <PlaceholderImage
              slot="fotografering-kombi-1"
              locale={locale}
              label={ui.comboHeading[locale]}
              sizes="(max-width: 768px) 50vw, 25vw"
              className="aspect-[4/5] w-full rounded-lg"
            />
            <PlaceholderImage
              slot="fotografering-kombi-2"
              locale={locale}
              label={ui.comboHeading[locale]}
              sizes="(max-width: 768px) 50vw, 25vw"
              className="aspect-[4/5] w-full translate-y-8 rounded-lg"
            />
          </div>
        </div>
      </section>

      <ContactCTA
        dict={dict}
        locale={locale}
        heading={PHOTO_UI.category.cta.heading[locale]}
        lead={PHOTO_UI.category.cta.lead[locale]}
      />
    </>
  );
}
