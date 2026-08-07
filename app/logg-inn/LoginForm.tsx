"use client";

import { useActionState } from "react";
import { signIn, type LoginState } from "./actions";

const field =
  "w-full rounded-lg border border-ink/15 bg-cream px-4 py-3 text-sm text-ink placeholder:text-smoke/70 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ink";

export default function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(signIn, {});

  return (
    // Vanlig <form action>, så innlogging virker også uten JS.
    <form action={action} className="space-y-4 rounded-2xl border border-ink/10 bg-cream p-8">
      <input type="hidden" name="neste" value={next} />

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          E-post
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          autoFocus
          placeholder="kai@chenmedia.no"
          className={field}
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
          Passord
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={field}
        />
      </div>

      {state.error && (
        <p role="alert" className="text-sm text-red-700">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="meta-label w-full rounded-lg bg-ink px-4 py-3.5 text-cream transition-colors hover:bg-smoke disabled:opacity-60"
      >
        {pending ? "Logger inn …" : "Logg inn"}
      </button>
    </form>
  );
}
