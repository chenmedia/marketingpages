/*
  Logovegg — tekstmerker i display-fonten til de faktiske logo-SVG-ene
  leveres (byttes da mot <Image> per kunde i samme grid).
*/
const clients = [
  "Snapchat",
  "OBOS",
  "DNT",
  "JCP",
  "Nordisk Film Kino",
  "Hurtigruten",
  "Av-og-til",
  "Levi's",
];

export default function LogoWall({ label }: { label: string }) {
  return (
    <div className="border-t border-ink/10 pt-6">
      <p className="meta-label text-smoke">{label}</p>
      <ul className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3">
        {clients.map((client) => (
          <li
            key={client}
            className="display text-base text-sand transition-colors hover:text-ink"
          >
            {client}
          </li>
        ))}
      </ul>
    </div>
  );
}
