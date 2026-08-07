import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Logg inn · Chen Media",
  robots: { index: false, follow: false },
};

/*
  Egen root layout. Den ligger utenfor app/[locale]/, så innloggingssiden
  hverken lokaliseres eller arver Nav, Footer og StickyBar.

  Den kan heller ikke ligge under app/admin/, siden den layouten krever admin.
*/
export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nb" className={`${jakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full items-center justify-center bg-shell p-6">
        {children}
      </body>
    </html>
  );
}
