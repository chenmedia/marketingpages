"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";

/*
  Uten backend i v1: skjemaet komponerer en ferdig utfylt e-post og åpner
  brukerens e-postklient. Byttes enkelt mot Formspree/API-rute senere.
*/
export default function ContactForm({ dict }: { dict: Dictionary }) {
  const { form } = dict.contact;
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(
      `${form.submit} — ${org || name}`.trim()
    );
    const body = encodeURIComponent(
      `${form.name}: ${name}\n${form.org}: ${org}\n${form.email}: ${email}\n\n${message}`
    );
    window.location.href = `mailto:kai@chenmedia.no?subject=${subject}&body=${body}`;
  }

  const field =
    "w-full rounded-lg border border-cream/25 bg-transparent px-4 py-3 text-sm text-cream placeholder:text-sand/60 focus:border-cream focus:outline-none";

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="meta-label mb-1.5 block text-sand">{form.name}</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={form.namePh}
            className={field}
          />
        </label>
        <label className="block">
          <span className="meta-label mb-1.5 block text-sand">{form.org}</span>
          <input
            value={org}
            onChange={(e) => setOrg(e.target.value)}
            placeholder={form.orgPh}
            className={field}
          />
        </label>
      </div>
      <label className="block">
        <span className="meta-label mb-1.5 block text-sand">{form.email}</span>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={form.emailPh}
          className={field}
        />
      </label>
      <label className="block">
        <span className="meta-label mb-1.5 block text-sand">
          {form.message} <span className="normal-case">{form.messageHint}</span>
        </span>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={form.messagePh}
          className={field}
        />
      </label>

      <ul className="flex flex-wrap gap-x-5 gap-y-1">
        {form.points.map((point) => (
          <li key={point} className="meta-label flex items-center gap-1.5 text-sand">
            <svg viewBox="0 0 12 12" className="size-3" fill="none" aria-hidden>
              <path
                d="M2 6.5L4.5 9L10 3.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {point}
          </li>
        ))}
      </ul>

      <button
        type="submit"
        className="meta-label group inline-flex w-full items-center justify-center gap-3 rounded-full bg-cream py-3 text-ink transition-colors hover:bg-bone"
      >
        {form.submit}
        <span aria-hidden className="transition-transform group-hover:translate-x-1">
          →
        </span>
      </button>

      <p className="text-center text-xs leading-relaxed text-sand">
        {dict.contact.reply} {dict.contact.direct}{" "}
        <a
          href="mailto:kai@chenmedia.no"
          className="underline decoration-sand underline-offset-4 hover:text-cream"
        >
          kai@chenmedia.no
        </a>
      </p>
    </form>
  );
}
