"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Play, Pause } from "lucide-react";

export default function ExplicacionPrincipalPage() {
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const introAudioRef = useRef<HTMLAudioElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => {
      const audio = new Audio("/audio-espejos.mp3");
      introAudioRef.current = audio;
      audio.play().catch(() => {});
    }, 2000);
    return () => { clearTimeout(t); introAudioRef.current?.pause(); };
  }, []);

  const handleStart = () => {
    setStarted(true);
    setTimeout(() => {
      videoRef.current?.play().catch(() => {});
      setPlaying(true);
    }, 100);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) { videoRef.current.pause(); setPlaying(false); }
    else { videoRef.current.play().catch(() => {}); setPlaying(true); }
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
  };

  const handleEnded = () => { setPlaying(false); setDone(true); };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const rect = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - rect.left) / rect.width) * v.duration;
  };

  const bg = "linear-gradient(160deg, #06080f 0%, #0a0c1a 60%, #0d0f1a 100%)";

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-10" style={{ background: bg }}>
      <div className="w-full max-w-sm mx-auto flex flex-col gap-4">

        {/* Encabezado */}
        <div className="animate-fade-in text-center">
          <p className="text-xs tracking-[0.25em] uppercase mb-1" style={{ color: "rgba(207,201,189,0.35)" }}>Mapa de Identidad Natal</p>
          <h1 className="text-lg font-light" style={{ color: "#D8D3C8" }}>Ruta de los 7 Códigos</h1>
        </div>

        {/* Contenedor del video */}
        <div className="relative w-full rounded-2xl overflow-hidden"
          style={{ aspectRatio: "9/16", background: "#040810", border: "1px solid rgba(180,130,40,0.2)", boxShadow: "0 0 0 1px rgba(180,130,40,0.06), 0 20px 60px rgba(0,0,0,0.7)" }}>

          {/* Video real */}
          <video
            ref={videoRef}
            src="/vsl-principal.mp4"
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
          />

          {/* Cover — antes de iniciar */}
          {!started && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 animate-fade-in"
              style={{ background: "rgba(4,8,16,0.7)" }}>
              <p className="text-xs tracking-widest uppercase" style={{ color: "rgba(207,201,189,0.4)" }}>Toca para comenzar</p>
              <button onClick={handleStart}
                className="w-16 h-16 rounded-full flex items-center justify-center active:scale-95 transition-all"
                style={{ background: "rgba(180,130,40,0.15)", border: "1px solid rgba(180,130,40,0.45)", boxShadow: "0 0 24px rgba(180,130,40,0.2)" }}>
                <Play className="w-7 h-7 ml-1" style={{ color: "#e8c87a" }} />
              </button>
            </div>
          )}

          {/* Controles durante reproducción */}
          {started && !done && (
            <div className="absolute bottom-0 left-0 right-0 p-4"
              style={{ background: "linear-gradient(0deg, rgba(4,8,16,0.9) 0%, transparent 100%)" }}>
              {/* Barra de progreso */}
              <div className="h-1 rounded-full mb-3 cursor-pointer" style={{ background: "rgba(255,255,255,0.1)" }} onClick={handleSeek}>
                <div className="h-1 rounded-full transition-all" style={{ width: `${progress}%`, background: "rgba(180,130,40,0.7)" }} />
              </div>
              <div className="flex justify-center">
                <button onClick={togglePlay}
                  className="w-10 h-10 rounded-full flex items-center justify-center active:scale-95 transition-all"
                  style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}>
                  {playing
                    ? <Pause className="w-4 h-4 text-white" />
                    : <Play className="w-4 h-4 text-white ml-0.5" />}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* CTA al terminar el video */}
        {done && (
          <div className="animate-fade-in">
            <button onClick={() => router.push("/feed-privado")}
              className="btn-shimmer w-full py-3 rounded-xl text-sm tracking-wide active:scale-95 transition-all"
              style={{ background: "linear-gradient(135deg, rgba(180,130,40,0.4), rgba(180,130,40,0.2))", border: "1px solid rgba(180,130,40,0.5)", color: "#e8c87a" }}>
              Seguir mi recorrido
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
