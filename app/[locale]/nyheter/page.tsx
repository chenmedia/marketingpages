import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import { alternatesFor } from "@/lib/site";
import SectionLabel from "@/components/SectionLabel";
import PlaceholderImage from "@/components/PlaceholderImage";
import ContactCTA from "@/components/ContactCTA";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/nyheter">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: { absolute: dict.meta.news.title },
    description: dict.meta.news.description,
    alternates: alternatesFor(locale, "/nyheter"),
  };
}

export default async function NewsPage({
  params,
}: PageProps<"/[locale]/nyheter">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const page = dict.newsPage;

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
        <SectionLabel number="01">{page.kicker}</SectionLabel>
        <h1 className="display mt-6 text-4xl sm:text-5xl lg:text-6xl">
          {page.title}
        </h1>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-smoke sm:text-lg">
          {page.lead}
        </p>
      </section>

      <section className="bg-shell">
        <div className="mx-auto max-w-6xl space-y-6 px-4 py-16 sm:px-6">
          {page.entries.map((entry, i) => (
            <article
              key={entry.title}
              className="grid gap-6 overflow-hidden rounded-lg border border-ink/10 bg-cream md:grid-cols-[1fr_2fr]"
            >
              <PlaceholderImage
                label={entry.tag}
                tone={(["bone", "ink", "olive"] as const)[i % 3]}
                className="aspect-[3/2] w-full md:h-full"
              />
              <div className="flex flex-col justify-center p-6 md:py-8 md:pr-8">
                <p className="meta-label text-smoke">{entry.tag}</p>
                <h2 className="display mt-2 text-2xl">{entry.title}</h2>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-smoke">
                  {entry.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ContactCTA dict={dict} locale={locale} />
    </>
  );
}
