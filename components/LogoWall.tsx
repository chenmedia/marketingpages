import Image from "next/image";
import { CLIENT_LOGOS } from "@/lib/logos/clients";
import { getLogoFiles } from "@/lib/logos/files";

/*
  Logoveggen — kundene Kai har levert for.

  Hver logo får en like høy celle og legges inn med object-contain. Det er
  grepet som gjør at en bred ordmerke-logo (OBOS, Bergans) og et kvadratisk
  merke (DNT, Snapchat) kan stå på samme rad uten at det ene dverger det
  andre: brede logoer begrenses av bredden, kvadratiske av høyden.

  Logoene vises i gråtone. Paletten på nettsiden er monokrom, og ni logoer i
  hver sin merkevarefarge ville vært det eneste fargesprakende på forsiden.
  Fargen kommer tilbake når man holder musepekeren over.

  Mangler filen, står kundenavnet i display-fonten i stedet. Se
  lib/logos/clients for hvordan en logo legges til.
*/
export default async function LogoWall({ label }: { label: string }) {
  const files = await getLogoFiles();

  return (
    <div className="border-t border-ink/10 pt-6">
      <p className="meta-label text-smoke">{label}</p>
      <ul className="mt-6 grid grid-cols-3 items-center gap-x-6 gap-y-8 sm:grid-cols-4 lg:grid-cols-5">
        {CLIENT_LOGOS.map((client) => {
          const src = files.get(client.file);

          return (
            <li key={client.file} className="relative h-9 w-full sm:h-10">
              {src ? (
                <Image
                  src={src}
                  alt={client.name}
                  fill
                  sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 210px"
                  className="object-contain opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                />
              ) : (
                <span className="display flex h-full items-center justify-center text-center text-sm text-smoke transition-colors hover:text-ink">
                  {client.name}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
