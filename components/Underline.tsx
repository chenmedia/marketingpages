/*
  Dekorativ understrek. Dette er IKKE logoen.

  Den strekkes med preserveAspectRatio="none" under aksentordet i heroen, og
  brand-guidelinen forbyr uttrykkelig å strekke logoen. Derfor er de to skilt.
  Logoen ligger i components/Logo.tsx.
*/
export default function Underline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 28"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M3 22C14 6 22 4 28 12C34 20 40 24 48 14C56 4 62 4 70 13C78 22 86 23 94 12C100 4 108 6 117 16"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
