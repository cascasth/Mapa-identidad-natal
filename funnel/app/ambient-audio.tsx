"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const MAIN_AMBIENT = ["/verificacion-codigos", "/codigo-activo", "/ruta-7-espejos"];
const CIERRE_AMBIENT = ["/explicacion-principal", "/cierre-archivo"];
// Páginas donde hay audio explicativo — bajar el ambiente principal
const NARRATION_PAGES = ["/codigo-activo", "/ruta-7-espejos"];
// Primera triada: volumen reducido (50% del normal)
const HALF_VOLUME_PAGES = ["/verificacion-codigos"];

export default function AmbientAudio() {
  const mainRef = useRef<HTMLAudioElement | null>(null);
  const cierreRef = useRef<HTMLAudioElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (MAIN_AMBIENT.includes(pathname)) {
      // Pausar cierre si estaba activo
      cierreRef.current?.pause();

      if (!mainRef.current) {
        const audio = new Audio("/ended-audio.mp3");
        audio.loop = true;
        mainRef.current = audio;
      }
      if (mainRef.current.paused) mainRef.current.play().catch(() => {});
      mainRef.current.volume = NARRATION_PAGES.includes(pathname) ? 0.15
        : HALF_VOLUME_PAGES.includes(pathname) ? 0.3
        : 0.6;

    } else if (CIERRE_AMBIENT.includes(pathname)) {
      // Pausar main si estaba activo
      mainRef.current?.pause();

      if (!cierreRef.current) {
        const audio = new Audio("/ambiente-cierre.mp3");
        audio.loop = true;
        cierreRef.current = audio;
      }
      if (cierreRef.current.paused) cierreRef.current.play().catch(() => {});
      cierreRef.current.volume = 0.4;

    } else {
      mainRef.current?.pause();
      cierreRef.current?.pause();
    }
  }, [pathname]);

  return null;
}
