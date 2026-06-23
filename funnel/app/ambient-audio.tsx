"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const AMBIENT_PAGES = ["/verificacion-codigos", "/codigo-activo", "/ruta-7-espejos"];

export default function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pathname = usePathname();

  // Iniciar audio cuando llegamos a la pantalla ended (/) y continuar en verificacion
  useEffect(() => {
    if (pathname === "/" ) return; // la página raíz maneja su propio audio
    if (AMBIENT_PAGES.includes(pathname)) {
      if (!audioRef.current) {
        const audio = new Audio("/ended-audio.mp3");
        audio.loop = true;
        audioRef.current = audio;
      }
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current?.pause();
    }
    return () => {};
  }, [pathname]);

  return null;
}
