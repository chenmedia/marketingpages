import "server-only";

/*
  Validering av kontaktskjemaet.

  En Server Action er et POST-endepunkt som kan kalles direkte med hva som
  helst, så ingenting klienten påstår teller. Nettleserens `required` er en
  bekvemmelighet for mennesker, ikke en kontroll.

  Feilkoder, ikke ferdige setninger: teksten hentes fra ordbøkene i
  komponenten, så skjemaet svarer på samme språk som resten av siden.
*/

export type EnquiryError = "invalid" | "rate" | "server";

/*
  Under tre sekunder fra siden ble tegnet til innsending er ikke et menneske
  som har lest fire felter og skrevet en melding.

  Tidsstempelet settes av klienten i en useEffect, så uten JavaScript er det
  tomt. Da hoppes sjekken over i stedet for å avvise: skjemaet skal virke uten
  JavaScript, og honeypot pluss rate limit står igjen uansett.
*/
const MIN_ELAPSED_MS = 3000;

export type ParsedEnquiry = {
  name: string;
  email: string;
  message: string;
  org: string | null;
  marketingConsent: boolean;
};

export type ParseResult =
  | { ok: true; value: ParsedEnquiry }
  | { ok: false; error: EnquiryError }
  /*
    Boten skal ikke få vite at den ble tatt. En feilmelding er gratis
    opplæring i hva som må endres for å slippe gjennom neste gang, så
    honeypot og for rask innsending ser vellykket ut utenfra.
  */
  | { ok: false; silent: true };

export function parseEnquiryForm(form: FormData): ParseResult {
  if (String(form.get("website") ?? "").trim() !== "") {
    return { ok: false, silent: true };
  }

  const renderedAt = Number(String(form.get("renderedAt") ?? ""));
  if (Number.isFinite(renderedAt) && renderedAt > 0) {
    if (Date.now() - renderedAt < MIN_ELAPSED_MS) {
      return { ok: false, silent: true };
    }
  }

  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const message = String(form.get("message") ?? "").trim();
  const org = String(form.get("org") ?? "").trim();

  if (!name || !email || !message) return { ok: false, error: "invalid" };
  if (name.length > 200 || org.length > 200 || message.length > 5000) {
    return { ok: false, error: "invalid" };
  }
  if (email.length > 320 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { ok: false, error: "invalid" };
  }

  return {
    ok: true,
    value: {
      name,
      email,
      message,
      org: org || null,
      marketingConsent: form.get("marketingConsent") === "on",
    },
  };
}
