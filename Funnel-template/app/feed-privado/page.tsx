"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heart, Bookmark, Share2, ChevronUp, ChevronDown } from "lucide-react";

const VIDEOS = [
  {
    id: 1,
    text: "Signo. Número. Carta. Arquetipo.\n¿Y si faltaba unirlo?",
    sub: "Una lectura aislada puede resonar. Una lectura integrada puede ayudarte a ver conexiones.",
  },
  {
    id: 2,
    text: "7 códigos.\n1 mapa integrado.",
    sub: "Ruta de los 7 Códigos",
  },
  {
    id: 3,
    text: "Ruta de los 7 Códigos",
    sub: "Cielo · Nombre · Linaje · Tiempo · Raíz · Espejo · Personaje",
  },
  {
    id: 4,
    text: "Journaling. Meditación.\nReflexión. Regalo simbólico.",
    sub: "Formas de usar tu mapa a tu ritmo",
  },
  {
    id: 5,
    text: "No predice.\nNo diagnostica.\nNo define todo lo que eres.",
    sub: null,
    isFinal: true,
  },
];

export default function FeedPrivadoPage() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setProgress(0);
    const t = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(t);
          if (current < VIDEOS.length - 1) {
            setTimeout(() => setCurrent(c => c + 1), 300);
          }
          return 100;
        }
        return p + 2;
      });
    }, 100);
    return () => clearInterval(t);
  }, [current]);

  const goNext = () => { if (current < VIDEOS.length - 1) setCurrent(c => c + 1); };
  const goPrev = () => { if (current > 0) setCurrent(c => c - 1); };

  const video = VIDEOS[current];

  return (
    <main className="h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ background: "#000" }}>

      <div className="relative w-full max-w-sm h-full flex flex-col"
        style={{ maxHeight: "100dvh" }}>

        {/* Video area */}
        <div className="flex-1 relative flex flex-col items-center justify-end pb-16 px-4"
          style={{ background: "linear-gradient(180deg, #0a0c1a 0%, #1a1020 100%)" }}>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/50 text-xs">
            {current + 1}/{VIDEOS.length}
          </div>

          {/* Progress bars */}
          <div className="absolute top-10 left-4 right-4 flex gap-1">
            {VIDEOS.map((_, i) => (
              <div key={i} className="flex-1 h-0.5 rounded-full bg-white/20">
                <div className="h-full rounded-full bg-white/80 transition-none"
                  style={{ width: i < current ? "100%" : i === current ? `${progress}%` : "0%" }} />
              </div>
            ))}
          </div>

          {/* Profile */}
          <div className="absolute top-16 left-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-700/40 border border-amber-400/30 flex items-center justify-center text-xs text-amber-300">A</div>
            <span className="text-white/80 text-xs">@archivo.identidad</span>
          </div>

          {/* Right actions */}
          <div className="absolute right-4 bottom-20 flex flex-col gap-5 items-center">
            {[{ Icon: Heart }, { Icon: Bookmark }, { Icon: Share2 }].map(({ Icon }, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
            ))}
            <button onClick={goPrev} disabled={current === 0}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center disabled:opacity-30 active:scale-90 transition-transform">
              <ChevronUp className="w-5 h-5 text-white" />
            </button>
            <button onClick={goNext} disabled={current === VIDEOS.length - 1 && !video.isFinal}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center disabled:opacity-30 active:scale-90 transition-transform">
              <ChevronDown className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Text content */}
          <div className="w-full pr-14 animate-fade-in" key={current}>
            <p className="text-white text-xl font-light whitespace-pre-line leading-snug mb-2">{video.text}</p>
            {video.sub && <p className="text-white/50 text-sm">{video.sub}</p>}
            {video.isFinal && (
              <button onClick={() => router.push("/mapa-identidad-natal")}
                className="mt-4 py-3 px-6 rounded-2xl text-sm tracking-wide active:scale-95 transition-all"
                style={{ background: "linear-gradient(135deg, rgba(180,130,40,0.5), rgba(180,130,40,0.3))", border: "1px solid rgba(180,130,40,0.4)", color: "#e8c87a" }}>
                Recibir mi mapa
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
