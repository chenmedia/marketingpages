/*
  Hvor en henvendelse kom fra, i lesbar form.

  «Sendt fra: /» sa ingenting i Slack. Her oversettes stien til et navn et
  menneske kan handle på, og attribusjonen samles til én linje.

  Ingen "server-only" her: ContactForm er en klientkomponent og trenger
  samme nøkler. Ingenting i fila er hemmelig.
*/

/** Skjemaet henvendelsen kom fra. Flere kan komme; nøkkelen lagres på raden. */
export const FORM_LABELS: Record<string, string> = {
  contact: "Kontaktskjema",
};

/*
  Stien er alltid den språkfrie, offentlige varianten fra publicPath(), så
  /en/eventfoto og /eventfoto peker på samme oppføring her.
*/
const PAGE_LABELS: Record<string, string> = {
  "/": "Forsiden",
  "/eventfoto": "Eventfoto",
  "/eventfilm": "Eventfilm",
  "/prosjekter": "Prosjekter",
  "/nyheter": "Nyheter",
};

export function pageLabel(path: string | null): string {
  if (!path) return "Ukjent side";
  return PAGE_LABELS[path] ?? path;
}

export function formLabel(key: string | null): string {
  if (!key) return FORM_LABELS.contact;
  return FORM_LABELS[key] ?? key;
}

/** «Kontaktskjema · Eventfoto» — det som vises i Slack og i admin. */
export function originLabel(formKey: string | null, path: string | null) {
  return `${formLabel(formKey)} · ${pageLabel(path)}`;
}

export type Attribution = {
  referrer: string | null;
  landingPath: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
};

export const EMPTY_ATTRIBUTION: Attribution = {
  referrer: null,
  landingPath: null,
  utmSource: null,
  utmMedium: null,
  utmCampaign: null,
};

/*
  Kampanjen i klartekst, eller hvor de kom fra hvis det ikke er noen kampanje.

  Rekkefølgen er ikke tilfeldig: en UTM-merket lenke er et bevisst valg fra
  Kais side og sier mer enn en referrer, som ofte bare er «google».
*/
export function campaignLabel(a: Attribution): string | null {
  if (a.utmSource) {
    const parts = [a.utmSource, a.utmMedium, a.utmCampaign].filter(Boolean);
    return parts.join(" / ");
  }
  if (!a.referrer) return null;
  try {
    const host = new URL(a.referrer).hostname.replace(/^www\./, "");
    return `henvist fra ${host}`;
  } catch {
    return null;
  }
}

/*
  Direktetrafikk er verdt å skille fra «vet ikke». Tom referrer på
  landingssiden betyr at de skrev adressen, brukte et bokmerke, eller kom fra
  en app som ikke sender referrer.
*/
export function arrivalLabel(a: Attribution): string {
  return campaignLabel(a) ?? "direkte";
}
