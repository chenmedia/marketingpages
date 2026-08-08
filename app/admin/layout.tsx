import type { Metadata } from "next";
import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import { requireAdmin } from "@/lib/auth/dal";
import { signOut } from "../logg-inn/actions";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Administrasjon · Chen Media",
  robots: { index: false, follow: false },
};

/*
  Admin er per bruker og skal aldri prerendres. Uten dette forsøker Next å
  bygge sidene statisk, og de feiler på manglende session.
*/
export const dynamic = "force-dynamic";

/*
  Egen root layout. Repoet har ingen app/layout.tsx, så denne blir automatisk
  root for sin egen gren, ved siden av app/[locale]/layout.tsx. Ingen filer
  måtte flyttes og ingen route-grupper trengs.

  Admin lokaliseres ikke. To oversettelser av et internt verktøy er ren
  vedlikeholdsgjeld.
*/
const nav = [
  { href: "/admin", label: "Oversikt" },
  { href: "/admin/arrangementer", label: "Arrangementer" },
  { href: "/admin/fotografer", label: "Fotografer" },
  { href: "/admin/bilder", label: "Bilder" },
  { href: "/admin/statistikk", label: "Statistikk" },
  { href: "/admin/innstillinger", label: "Innstillinger" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Den egentlige tilgangskontrollen. Proxyen er bare en optimistisk sjekk.
  const profile = await requireAdmin();

  return (
    <html lang="nb" className={`${jakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-shell">
        <header className="border-b border-ink/10 bg-cream">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 sm:px-6">
            <Link href="/admin" className="display text-lg">
              Chen&nbsp;Media
            </Link>
            <nav className="flex flex-wrap items-center gap-x-5 gap-y-1">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="meta-label text-smoke transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <form action={signOut} className="ml-auto flex items-center gap-3">
              <span className="hidden text-xs text-smoke sm:inline">
                {profile.email}
              </span>
              <button
                type="submit"
                className="meta-label rounded-full border border-ink/20 px-3 py-1.5 transition-colors hover:bg-ink hover:text-cream"
              >
                Logg ut
              </button>
            </form>
          </div>
        </header>

        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6">
          {children}
        </main>

        <footer className="border-t border-ink/10 px-4 py-4 text-center text-xs text-smoke">
          Endringer her slår gjennom på nettsiden uten ny publisering.
        </footer>
      </body>
    </html>
  );
}
