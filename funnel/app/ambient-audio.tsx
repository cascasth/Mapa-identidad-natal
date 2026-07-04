"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const AMBIENT_PAGES = ["/verificacion-codigos", "/codigo-activo", "/ruta-7-espejos"];

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
      // Solo reproduce si no estaba ya sonando (evita reinicio al cambiar de página)
      if (audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }
    } else {
      audioRef.current?.pause();
    }
  }, [pathname]);

  return null;
}
