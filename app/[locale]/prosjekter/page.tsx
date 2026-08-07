import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import { alternatesFor } from "@/lib/site";
import SectionLabel from "@/components/SectionLabel";
import CaseList from "@/components/CaseList";
import ContactCTA from "@/components/ContactCTA";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/prosjekter">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: { absolute: dict.meta.projects.title },
    description: dict.meta.projects.description,
    alternates: alternatesFor(locale, "/prosjekter"),
  };
}

export default async function ProjectsPage({
  params,
}: PageProps<"/[locale]/prosjekter">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const page = dict.projectsPage;

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
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <CaseList items={page.items} />
        </div>
      </section>

      <ContactCTA dict={dict} locale={locale} />
    </>
  );
}
