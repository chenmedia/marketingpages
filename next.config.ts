import type { NextConfig } from "next";

/*
  Content-Security-Policy.

  script-src tillater 'unsafe-inline' med vilje. Next legger inn egne
  bootstrap-skript i hver side, og den eneste måten å slippe unna på er en
  nonce per forespørsel. En nonce kan ikke bakes inn i en statisk side, så det
  ville tvunget alle fem offentlige sidene fra prerendret til server-rendret
  ved hvert treff. Valgt bort: siden rendrer ingen brukergenerert tekst, så
  det finnes ingen vei inn for et injisert skript i utgangspunktet.

  Resten håndheves fullt ut, og det er der verdien ligger:
    frame-ancestors  hindrer at siden legges i en iframe og klikkes for deg
    base-uri         hindrer at en injisert <base> flytter alle relative URL-er
    form-action      hindrer at et skjema postes til et fremmed domene
    connect-src      låser fetch/XHR til vårt eget og Supabase
    object-src       stenger <object> og <embed> helt

  blob: og data: på img-src trengs av next/image.
*/
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline'",
  "connect-src 'self' https://*.supabase.co",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Overflødig ved siden av frame-ancestors, men gratis for gamle nettlesere
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

/*
  Bildene fra Supabase Storage må godkjennes eksplisitt, ellers nekter
  next/image å ta URL-en.

  Merk samspillet med CSP-en over: img-src er 'self', og det holder kun fordi
  next/image serverer gjennom /_next/image på vårt eget domene. Settes
  `unoptimized`, går nettleseren rett til Supabase og CSP-en blokkerer bildet.
*/
const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : "*.supabase.co";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: supabaseHost,
        pathname: "/storage/v1/object/public/site-images/**",
      },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
