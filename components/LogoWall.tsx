import Image from "next/image";
import { CLIENT_LOGOS } from "@/lib/logos/clients";
import { getLogoFiles } from "@/lib/logos/files";

/*
  Logoveggen — kundene Kai har levert for, som en rullende stripe.

  Samme grep som PhotoTicker: innholdet ligger to ganger etter hverandre, og
  sporet flyttes 50% til venstre. Da er kopi to kommet nøyaktig dit kopi én
  startet når animasjonen looper, og skjøten er usynlig. Kopi to er
  aria-hidden med tom alt-tekst, ellers ville en skjermleser lest opp hele
  kundelisten to ganger.

  Hver logo får en like høy celle og legges inn med object-contain. Det er
  grepet som gjør at et bredt ordmerke (OBOS, Bergans) og et kvadratisk
  merke (DNT, Snapchat) kan stå i samme stripe uten at det ene dverger det
  andre. Cellebredden er fast, så avstanden mellom logoene er jevn uansett
  hvor brede filene er.

  Logoene vises i gråtone. Paletten på nettsiden er monokrom, og ni logoer i
  hver sin merkevarefarge ville vært det eneste fargesprakende på forsiden.

  Mangler filen, står kundenavnet i display-fonten i stedet. Se
  lib/logos/clients for hvordan en logo legges til.
*/
export default async function LogoWall({ label }: { label: string }) {
  const files = await getLogoFiles();

  return (
    <div className="border-t border-ink/10 pt-6">
      <p className="meta-label mx-auto max-w-6xl px-4 text-smoke sm:px-6">
        {label}
      </p>

      {/*
        Stripen går fra kant til kant, ikke i tekstspalten, så logoene ruller
        inn fra utsiden av skjermen i stedet for å dukke opp.

        py-2 er ikke pynt. overflow-hidden klipper i padding-kanten, og en
        logo med scale over 1 er høyere enn cellen sin — uten luften her ble
        Nordisk Film og Oslo Business Forum kappet på topp og bunn.
      */}
      <div className="mt-4 overflow-hidden py-2">
        <div className="logo-ticker flex w-max">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex">
              {CLIENT_LOGOS.map((client) => {
                const src = files.get(client.file);

                return (
                  <li
                    key={client.file}
                    className="flex h-9 w-40 shrink-0 items-center justify-center sm:h-10 sm:w-48"
                  >
                    {src ? (
                      /*
                        Skalaen settes på boksen, ikke på bildet.
                        object-contain legger logoen inn i boksen den får, så
                        en lavere boks gir en mindre logo — uten transform,
                        som ville flyttet den ut av linje med naboene.
                      */
                      <div
                        className="relative h-full w-full"
                        style={
                          client.scale
                            ? { height: `${client.scale * 100}%` }
                            : undefined
                        }
                      >
                        <Image
                          src={src}
                          alt={copy === 1 ? "" : client.name}
                          fill
                          sizes="192px"
                          className="object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                        />
                      </div>
                    ) : (
                      <span className="display text-center text-sm text-smoke transition-colors hover:text-ink">
                        {client.name}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
