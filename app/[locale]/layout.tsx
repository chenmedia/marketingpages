import type { Metadata } from "next";
import { Archivo, Space_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// Midlertidig stand-in for Garet til woff2-filene er på plass i public/fonts.
const display = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "700", "800", "900"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
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
      template: `%s — ${dict.meta.siteName}`,
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
      className={`${display.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Nav locale={locale} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} dict={dict} />
      </body>
    </html>
  );
}
