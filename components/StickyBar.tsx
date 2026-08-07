"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n";
import { isOfficeHours } from "@/lib/office-hours";
import LiveDot from "./LiveDot";

/*
  Sticky bunnbar à la TON: tilgjengelighetssignal + CTA, nede til høyre.

  Klientkomponent av to grunner, som trekker i samme retning:

    - Den skal først komme til syne når man har begynt å scrolle.
    - Prikken skal lyse grønt i kontortid, og kontortid må regnes ut i
      nettleseren. Sidene er statiske, så et serversvar ville frosset på
      byggetidspunktet.

  Rekkefølgen redder oss fra hydreringssprik: baren er skjult til man
  scroller, og da har effekten for lengst satt riktig tilstand.
*/

/** Hvor langt man må ha scrollet før baren dukker opp. */
const REVEAL_AT = 240;

/* Ingen locale-prop: lenken er et rent fragment, så språket spiller ingen rolle. */
export default function StickyBar({ dict }: { dict: Dictionary }) {
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Sett bare state når verdien faktisk endrer seg, ikke per scroll-event
    const onScroll = () => setShown(window.scrollY > REVEAL_AT);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Hvert minutt, så en fane som står åpen ikke lyser grønt etter 16.00
    const tick = () => setOpen(isOfficeHours(new Date()));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={`fixed bottom-4 right-4 z-40 hidden items-center gap-3 rounded-full border border-ink/10 bg-ink py-2 pl-5 pr-2 text-cream shadow-lg transition-all duration-300 md:flex ${
        shown
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <span className="meta-label flex items-center gap-2">
        <LiveDot live={open} />
        {/*
          Fargen alene kan ikke bære informasjonen, jf. WCAG 1.4.1. Prikken er
          aria-hidden, så tilstanden står som tekst for skjermlesere.
        */}
        <span className="sr-only">
          {open ? dict.sticky.openNow : dict.sticky.closedNow}
        </span>
        {dict.sticky.available}
      </span>
      {/*
        Rent fragment med vilje: ContactCTA ligger på alle fem sider, og
        lenken skal peke på sidens egen kontaktseksjon.
      */}
      <Link
        href="#kontakt"
        tabIndex={shown ? undefined : -1}
        className="meta-label rounded-full bg-cream px-4 py-2 text-ink transition-colors hover:bg-bone"
      >
        {dict.sticky.cta} →
      </Link>
    </div>
  );
}
