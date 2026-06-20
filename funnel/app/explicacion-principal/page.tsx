"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Play, Pause, Moon } from "lucide-react";

type PlayerState = "cover" | "loading" | "playing" | "paused" | "done";

const DURATION = 180; // 3 min simulated
const LOADING_TEXTS = [
  "Preparando tus códigos…",
  "Integrando tus capas simbólicas…",
  "Organizando tu lectura…",
  "Creando tu ruta personalizada…",
  "Tu mapa está casi listo para abrirse…",
];

export default function ExplicacionPrincipalPage() {
  const [state, setState] = useState<PlayerState>("cover");
  const [progress, setProgress] = useState(0);
  const [loadingIdx, setLoadingIdx] = useState(0);
  const router = useRouter();

  // Loading animation
  useEffect(() => {
    if (state !== "loading") return;
    if (loadingIdx >= LOADING_TEXTS.length) {
      setState("playing");
      return;
    }
    const t = setTimeout(() => setLoadingIdx(i => i + 1), 600);
    return () => clearTimeout(t);
  }, [state, loadingIdx]);

  // Progress bar
  useEffect(() => {
    if (state !== "playing") return;
    if (progress >= 100) { setState("done"); return; }
    const t = setTimeout(() => setProgress(p => Math.min(p + 100 / DURATION, 100)), 1000);
    return () => clearTimeout(t);
  }, [state, progress]);

  const bg = "linear-gradient(160deg, #0a0c1a 0%, #0d1020 60%, #1a1408 100%)";
  const pct = `${progress.toFixed(1)}%`;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-10" style={{ background: bg }}>
      <div className="w-full max-w-sm mx-auto flex flex-col gap-4">

        <div className="animate-fade-in text-center">
          <p className="text-amber-400/60 text-xs tracking-widest uppercase mb-1">Mapa de Identidad Natal</p>
          <h1 className="text-white text-lg font-light">Ruta de los 7 Códigos</h1>
        </div>

        {/* Player container 9:16 ratio */}
        <div className="relative w-full rounded-3xl overflow-hidden border border-amber-400/20 bg-slate-900/80 shadow-2xl"
          style={{ aspectRatio: "9/16", maxHeight: "60vh" }}>

          {/* Cover */}
          {state === "cover" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 animate-fade-in">
              <div className="w-20 h-20 rounded-full border border-amber-400/30 flex items-center justify-center">
                <Moon className="w-8 h-8 text-amber-400/70" />
              </div>
              <button onClick={() => { setState("loading"); setLoadingIdx(0); }}
                className="w-16 h-16 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center active:scale-95 transition-transform">
                <Play className="w-7 h-7 text-amber-300 ml-1" />
              </button>
            </div>
          )}

          {/* Loading */}
          {state === "loading" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 animate-fade-in">
              <div className="font-mono text-xs text-emerald-400/80 space-y-1 text-left w-full">
                {LOADING_TEXTS.slice(0, loadingIdx).map((t, i) => (
                  <p key={i} className="animate-fade-in">{t}</p>
                ))}
              </div>
            </div>
          )}

          {/* Playing / Paused */}
          {(state === "playing" || state === "paused") && (
            <div className="absolute inset-0 flex flex-col items-center justify-between p-6 animate-fade-in">
              <div className="w-full flex justify-center pt-4">
                <Moon className="w-8 h-8 text-amber-400/40" />
              </div>
              <button onClick={() => setState(s => s === "playing" ? "paused" : "playing")}
                className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center active:scale-95 transition-transform">
                {state === "playing"
                  ? <Pause className="w-5 h-5 text-white" />
                  : <Play className="w-5 h-5 text-white ml-0.5" />}
              </button>
              <div className="w-full">
                <div className="h-1 rounded-full bg-slate-700 mb-2">
                  <div className="h-1 rounded-full bg-amber-400/70 transition-all" style={{ width: pct }} />
                </div>
                <p className="text-slate-500 text-xs text-center">Continuar con calma</p>
              </div>
            </div>
          )}

          {/* Done */}
          {state === "done" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-6 text-center animate-fade-in">
              <Moon className="w-10 h-10 text-amber-400/60" />
              <p className="text-white text-sm font-light">Ruta de los 7 Códigos</p>
              <div className="w-full h-1 rounded-full bg-amber-400/50" />
            </div>
          )}
        </div>

        {state === "done" && (
          <div className="animate-fade-in">
            <button onClick={() => router.push("/whatsapp-acceso")}
              className="w-full py-4 rounded-2xl text-sm tracking-wide active:scale-95 transition-all"
              style={{ background: "linear-gradient(135deg, rgba(180,130,40,0.4), rgba(180,130,40,0.2))", border: "1px solid rgba(180,130,40,0.3)", color: "#e8c87a" }}>
              Seguir mi recorrido
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
