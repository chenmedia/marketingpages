import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StickyBar from "@/components/StickyBar";

// Samme font som tonmedia.com: Plus Jakarta Sans, hele siden.
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: {
      default: dict.meta.home.title,
      template: `%s | ${dict.meta.siteName}`,
    },
    description: dict.meta.home.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <html
      lang={locale === "no" ? "nb" : "en"}
      className={`${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Strukturerte data for søkemotorer, jf. TONs ProfessionalService-schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "@id": "https://chenmedia.no/#organization",
              name: "Chen Media",
              legalName: "Chen Media AS",
              url: "https://chenmedia.no",
              email: "kai@chenmedia.no",
              founder: { "@type": "Person", name: "Kai Chen" },
              description:
                locale === "no"
                  ? "Eventfoto og film for bedrifter. Chen Media dokumenterer konferanser, lanseringer og firmaevents i Oslo og hele Norge."
                  : "Event photography and film for businesses. Chen Media documents conferences, launches and corporate events in Oslo and across Norway.",
              areaServed: [
                { "@type": "Country", name: "Norway" },
                { "@type": "City", name: "Oslo" },
              ],
              serviceType: [
                "Event photography",
                "Event film",
                "Brand photography",
                "Videography",
              ],
            }),
          }}
        />
        <Nav locale={locale} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} dict={dict} />
        <StickyBar locale={locale} dict={dict} />
      </body>
    </html>
  );
}
