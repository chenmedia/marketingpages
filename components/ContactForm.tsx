"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";

/*
  Skjemakort à la TONs kontaktseksjon: eget kort med skygge, TON-feltstil,
  grønne haker og fullbredde-knapp. Uten backend i v1: submit komponerer en
  ferdig utfylt e-post og åpner brukerens e-postklient — byttes enkelt mot
  Formspree/API-rute senere.
*/
export default function ContactForm({ dict }: { dict: Dictionary }) {
  const { form } = dict.contact;
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`${form.submit}: ${org || name}`.trim());
    const body = encodeURIComponent(
      `${form.name}: ${name}\n${form.org}: ${org}\n${form.email}: ${email}\n\n${message}`
    );
    window.location.href = `mailto:kai@chenmedia.no?subject=${subject}&body=${body}`;
  }

  const field =
    "w-full rounded-lg border border-cream/20 bg-cream/10 px-4 py-3 text-sm text-cream placeholder:text-sand focus:border-transparent focus:outline-none focus:ring-2 focus:ring-cream";

  return (
    <form
      onSubmit={submit}
      className="flex h-full flex-col gap-4 rounded-2xl border border-cream/15 bg-cream/5 p-8 shadow-2xl shadow-black/40"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-cream">
            {form.name}
          </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={form.namePh}
            className={field}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-cream">
            {form.org}
          </label>
          <input
            required
            value={org}
            onChange={(e) => setOrg(e.target.value)}
            placeholder={form.orgPh}
            className={field}
          />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-cream">
          {form.email}
        </label>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={form.emailPh}
          className={field}
        />
      </div>
      <div className="flex min-h-[120px] flex-1 flex-col">
        <label className="mb-1.5 block text-sm font-medium text-cream">
          {form.message}{" "}
          <span className="text-sand">{form.messageHint}</span>
        </label>
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={form.messagePh}
          className={`${field} flex-1 resize-none`}
        />
      </div>

      {/* Honeypot mot spam-boter — skjult for mennesker, jf. TONs skjema */}
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

      <button
        type="submit"
        className="w-full rounded-lg bg-cream py-4 text-base font-bold text-ink shadow-lg shadow-black/30 transition-colors hover:bg-bone"
      >
        {form.submit} →
      </button>

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
