"use client";

import { useActionState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { publicPath } from "@/lib/i18n";
import type { Dictionary, Locale } from "@/lib/i18n";
import { submitEnquiry, type EnquiryState } from "@/app/[locale]/actions";

/*
  Skjemakort à la TONs kontaktseksjon: eget kort med skygge, TON-feltstil,
  grønne haker og fullbredde-knapp.

  Innsendingen går til en Server Action, som lagrer henvendelsen i Supabase og
  videresender den til HubSpot. Vi bruker med vilje IKKE HubSpots egen
  embed-snutt: den tegner sitt eget skjema og ville byttet ut designet her, i
  tillegg til å bryte script-src og connect-src i next.config.ts.

  Vanlig <form action>, så skjemaet virker også uten JavaScript.
*/
export default function ContactForm({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const { form } = dict.contact;
  const [state, action, pending] = useActionState<EnquiryState, FormData>(
    submitEnquiry,
    {}
  );

  /*
    Tidsstempel for å avvise innsendinger som kommer for raskt til å være
    skrevet av et menneske.

    Settes på DOM-noden etter montering, ikke under render: serveren og
    klienten ville fått hvert sitt Date.now() og hydreringen hadde spriket.
    Via ref og ikke state, siden verdien aldri skal utløse en ny render.
    Uten JavaScript står feltet tomt, og sjekken hoppes over.
  */
  const renderedAt = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (renderedAt.current) renderedAt.current.value = String(Date.now());
  }, []);

  // Serveren ser den interne stien etter rewriten i proxy.ts, ikke den offentlige.
  const sourcePath = publicPath(usePathname());

  const card =
    "flex h-full flex-col gap-4 rounded-2xl border border-cream/15 bg-cream/5 p-8 shadow-2xl shadow-black/40";

  const field =
    "w-full rounded-lg border border-cream/20 bg-cream/10 px-4 py-3 text-sm text-cream placeholder:text-sand focus:border-transparent focus:outline-none focus:ring-2 focus:ring-cream";

  if (state.ok) {
    return (
      <div className={`${card} items-center justify-center text-center`}>
        <p className="text-2xl" aria-hidden="true">
          <span className="text-green-400">✓</span>
        </p>
        <p className="text-lg font-bold text-cream">{form.successTitle}</p>
        <p className="max-w-sm text-sm text-sand">{form.successBody}</p>
      </div>
    );
  }

  return (
    <form action={action} className={card}>
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="sourcePath" value={sourcePath} />
      <input type="hidden" name="renderedAt" ref={renderedAt} defaultValue="" />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-cream">
            {form.name}
          </label>
          <input
            id="contact-name"
            name="name"
            required
            autoComplete="name"
            maxLength={200}
            placeholder={form.namePh}
            className={field}
          />
        </div>
        <div>
          <label htmlFor="contact-org" className="mb-1.5 block text-sm font-medium text-cream">
            {form.org}
          </label>
          <input
            id="contact-org"
            name="org"
            required
            autoComplete="organization"
            maxLength={200}
            placeholder={form.orgPh}
            className={field}
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-cream">
          {form.email}
        </label>
        <input
          id="contact-email"
          name="email"
          required
          type="email"
          autoComplete="email"
          maxLength={320}
          placeholder={form.emailPh}
          className={field}
        />
      </div>
      <div className="flex min-h-[120px] flex-1 flex-col">
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-cream">
          {form.message}{" "}
          <span className="text-sand">{form.messageHint}</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          maxLength={5000}
          placeholder={form.messagePh}
          className={`${field} flex-1 resize-none`}
        />
      </div>

      {/*
        Honeypot mot spam-boter, skjult for mennesker. Utfylt felt gir en
        innsending som ser vellykket ut utenfra, men som ikke lagres. En
        feilmelding ville bare vært gratis opplæring for boten.
      */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="flex flex-wrap items-center justify-center gap-4 pt-1 text-xs text-sand">
        {form.points.map((point) => (
          <span key={point} className="flex items-center gap-1">
            <span className="text-green-400">✓</span> {point}
          </span>
        ))}
      </div>

      {/*
        Samtykke til markedsføring. Valgfritt og uhuket fra start, og aldri en
        betingelse for å sende inn: dette gjelder e-post vi sender senere,
        ikke svaret på henvendelsen.
      */}
      <label className="flex items-start gap-2.5 text-xs text-sand">
        <input
          type="checkbox"
          name="marketingConsent"
          /*
            colorScheme: dark får nettleseren til å tegne den native boksen
            mørk. Uten den blir den hvit og roper høyere enn knappen på et
            kort som ellers er cream-på-ink.
          */
          style={{ colorScheme: "dark" }}
          className="mt-0.5 h-4 w-4 shrink-0 accent-cream"
        />
        <span>{form.consent}</span>
      </label>

      {state.error && (
        <p role="alert" className="text-center text-xs text-red-300">
          {form.errors[state.error]}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-cream py-4 text-base font-bold text-ink shadow-lg shadow-black/30 transition-colors hover:bg-bone disabled:opacity-60"
      >
        {pending ? form.sending : `${form.submit} →`}
      </button>

      <p className="text-center text-xs text-sand">{form.privacy}</p>

      <p className="text-center text-xs text-sand">
        {dict.contact.reply} {dict.contact.direct}{" "}
        <a
          href="mailto:kai@chenmedia.no"
          className="underline transition-colors hover:text-cream"
        >
          kai@chenmedia.no
        </a>
      </p>
    </form>
  );
}
