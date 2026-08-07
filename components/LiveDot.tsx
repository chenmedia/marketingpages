/*
  Den lille statusprikken. Grønn og pulserende når noe er aktivt, ellers en
  dempet prikk uten bevegelse.

  Ligger her fordi den brukes to steder, i footer-kalenderen og i sticky-baren,
  og de to skal se like ut. Med markupen inline begge steder ville de før eller
  siden drevet fra hverandre.

  animate-ping er bak motion-safe: en pulserende prikk er akkurat den slags
  bevegelse folk skrur av når de ber om mindre av den.
*/
export default function LiveDot({ live = true }: { live?: boolean }) {
  // Samme størrelse i begge tilstander, ellers krymper prikken synlig kl. 16
  if (!live) {
    return <span aria-hidden className="size-2 shrink-0 rounded-full bg-sand" />;
  }

  return (
    <span aria-hidden className="relative flex size-2 shrink-0">
      <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 motion-safe:animate-ping" />
      <span className="relative inline-flex size-2 rounded-full bg-green-500" />
    </span>
  );
}
