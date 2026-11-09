"use client";

import { useEffect, useState } from "react";
import Underline from "@/components/Underline";

const HOLD_MS = 2600;
const FADE_MS = 300;

/*
  Aksentordet i heroen, med ord som byttes i fast rekkefølge.

  Serveren og brukere med redusert bevegelse ser bare første ord. Krusedullen
  følger ordets bredde, siden spennet er inline-block rundt ordet.
*/
export default function RotatingWord({ words }: { words: readonly string[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (words.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let swap: ReturnType<typeof setTimeout> | undefined;
    const tick = setInterval(() => {
      setVisible(false);
      swap = setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setVisible(true);
      }, FADE_MS);
    }, HOLD_MS + FADE_MS);

    return () => {
      clearInterval(tick);
      if (swap) clearTimeout(swap);
    };
  }, [words.length]);

  return (
    <span className="relative inline-block">
      <span
        className={`inline-block transition-[opacity,transform] duration-300 ease-out ${
          visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        {words[index]}
      </span>
      <Underline className="absolute -bottom-4 left-0 h-3.5 w-full text-ink opacity-60" />
    </span>
  );
}
