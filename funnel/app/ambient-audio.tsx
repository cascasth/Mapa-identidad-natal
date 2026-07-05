"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getMainAudio } from "./audio-store";

const MAIN_AMBIENT = ["/verificacion-codigos", "/codigo-activo", "/ruta-7-espejos"];
const CIERRE_AMBIENT = ["/explicacion-principal", "/cierre-archivo"];
// Páginas donde hay audio explicativo — bajar el ambiente principal
const NARRATION_PAGES = ["/codigo-activo", "/ruta-7-espejos"];
// Primera triada: volumen reducido (50% del normal)
const HALF_VOLUME_PAGES = ["/verificacion-codigos"];

export default function AmbientAudio() {
  const cierreRef = useRef<HTMLAudioElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (MAIN_AMBIENT.includes(pathname)) {
      // Pausar cierre si estaba activo
      cierreRef.current?.pause();

      const audio = getMainAudio();
      if (audio.paused) audio.play().catch(() => {});
      audio.volume = NARRATION_PAGES.includes(pathname) ? 0.06
        : HALF_VOLUME_PAGES.includes(pathname) ? 0.25
        : 0.6;

    } else if (CIERRE_AMBIENT.includes(pathname)) {
      // Pausar main si estaba activo
      try { getMainAudio().pause(); } catch {}

      if (!cierreRef.current) {
        const audio = new Audio("/ambiente-cierre.mp3");
        audio.loop = true;
        cierreRef.current = audio;
      }
      if (cierreRef.current.paused) cierreRef.current.play().catch(() => {});
      cierreRef.current.volume = 0.4;

    } else {
      try { getMainAudio().pause(); } catch {}
      cierreRef.current?.pause();
    }
  }, [pathname]);

  return null;
}
