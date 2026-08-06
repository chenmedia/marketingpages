import Link from "next/link";

/*
  Pilleknapp med pil-i-sirkel, jf. referansedesignet:
  primær = svart pille, hvit tekst, hvit sirkel med svart pil.
*/
export default function CtaButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
}) {
  if (variant === "outline") {
    return (
      <Link
        href={href}
        className="meta-label inline-flex items-center rounded-full border border-ink px-6 py-3 transition-colors hover:bg-ink hover:text-cream"
      >
        {children}
      </Link>
    );
  }
  return (
    <Link
      href={href}
      className="meta-label group inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-6 pr-2 text-cream transition-colors hover:bg-smoke"
    >
      {children}
      <span
        aria-hidden
        className="flex size-7 items-center justify-center rounded-full bg-cream text-ink transition-transform group-hover:rotate-45"
      >
        <svg viewBox="0 0 16 16" fill="none" className="size-3">
          <path
            d="M4 12L12 4M12 4H6M12 4V10"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
