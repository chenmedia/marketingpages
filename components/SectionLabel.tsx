// Mono-metaetikett à la deckens toppmeta «CHEN MEDIA — FOTO & FILM — 02»
export default function SectionLabel({
  children,
  number,
  tone = "dark",
}: {
  children: React.ReactNode;
  number?: string;
  tone?: "dark" | "light";
}) {
  const color = tone === "dark" ? "text-smoke" : "text-sand";
  return (
    <p className={`meta-label flex items-center gap-3 ${color}`}>
      <span aria-hidden className="inline-block size-1.5 rounded-full bg-ember" />
      <span>{children}</span>
      {number && (
        <>
          <span aria-hidden className="h-px w-8 bg-current opacity-40" />
          <span>{number}</span>
        </>
      )}
    </p>
  );
}
