"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const AMBIENT_PAGES = ["/verificacion-codigos", "/codigo-activo", "/ruta-7-espejos"];
// Páginas donde hay audio explicativo — bajar el ambiente
const NARRATION_PAGES = ["/codigo-activo", "/ruta-7-espejos", "/explicacion-principal"];

export default function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (AMBIENT_PAGES.includes(pathname)) {
      if (!audioRef.current) {
        const audio = new Audio("/ended-audio.mp3");
        audio.loop = true;
        audioRef.current = audio;
      }
      if (audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }
      // Bajar volumen si hay narración en esta página
      audioRef.current.volume = NARRATION_PAGES.includes(pathname) ? 0.15 : 0.6;
    } else {
      audioRef.current?.pause();
    }
  }, [pathname]);

  return null;
}
