"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { PhoneOff, Phone, Moon } from "lucide-react";
import Image from "next/image";

type Screen = "incoming" | "active" | "ended";

// 7 puntos radiales alrededor del avatar
function RadialSeals() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {Array.from({ length: 7 }).map((_, i) => {
        const angle = (i * 360) / 7 - 90;
        const rad = (angle * Math.PI) / 180;
        const r = 68;
        const x = 50 + r * Math.cos(rad);
        const y = 50 + r * Math.sin(rad);
        return (
          <div key={i} className="absolute" style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)" }}>
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400/40 shadow-[0_0_4px_rgba(251,191,36,0.6)]" />
          </div>
        );
      })}
      {/* líneas conectoras — SVG overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100">
        {Array.from({ length: 7 }).map((_, i) => {
          const a1 = ((i * 360) / 7 - 90) * (Math.PI / 180);
          const a2 = (((i + 1) * 360) / 7 - 90) * (Math.PI / 180);
          const r = 68;
          return (
            <line key={i}
              x1={50 + r * Math.cos(a1)} y1={50 + r * Math.sin(a1)}
              x2={50 + r * Math.cos(a2)} y2={50 + r * Math.sin(a2)}
              stroke="#f59e0b" strokeWidth="0.3" />
          );
        })}
      </svg>
    </div>
  );
}

function SymbolicAvatar() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 160, height: 160 }}>
      <RadialSeals />
      {/* halo exterior */}
      <div className="absolute w-28 h-28 rounded-full border border-amber-400/20 animate-pulse-ring" />
      <div className="absolute w-24 h-24 rounded-full border border-amber-400/15 animate-pulse-ring" style={{ animationDelay: "0.7s" }} />
      {/* sello luminoso */}
      <div className="absolute w-20 h-20 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(180,130,40,0.15) 0%, transparent 70%)", boxShadow: "0 0 20px rgba(180,130,40,0.2)" }} />
      {/* borde doble del avatar */}
      <div className="absolute w-[72px] h-[72px] rounded-full border-2 border-amber-400/30" />
      <div className="absolute w-16 h-16 rounded-full border border-amber-400/50" />
      {/* imagen */}
      <div className="w-14 h-14 rounded-full overflow-hidden relative z-10">
        <Image src="/avatar-centro-ser.jpg.png" alt="Centro Ser Integral" width={56} height={56} className="object-cover w-full h-full" />
      </div>
    </div>
  );
}

function WaveformAnimation() {
  const delays = [3, 5, 8, 6, 4, 7, 9, 5, 3, 6, 8, 4];
  return (
    <div className="flex items-center justify-center gap-1 h-10">
      {delays.map((d, i) => (
        <div key={i} className="wave-bar w-1 rounded-full bg-amber-400/70"
          style={{ animationDelay: `${d * 0.08}s` }} />
      ))}
    </div>
  );
}

// Esquinas ceremoniales
function CornerDecor({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const base = "absolute w-4 h-4";
  const corners = {
    tl: "top-3 left-3 border-t border-l",
    tr: "top-3 right-3 border-t border-r",
    bl: "bottom-3 left-3 border-b border-l",
    br: "bottom-3 right-3 border-b border-r",
  };
  return <div className={`${base} ${corners[pos]} border-amber-400/50`} />;
}

export default function IncomingCallPage() {
  const [screen, setScreen] = useState<Screen>("incoming");
  const [seconds, setSeconds] = useState(48);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const router = useRouter();

  const handleAccept = () => {
    setScreen("active");
    const audio = new Audio("/llamada.mp3");
    audioRef.current = audio;
    audio.play().catch(() => {});
    audio.onended = () => setScreen("ended");
  };

  useEffect(() => {
    if (screen !== "active") return;
    if (seconds <= 0) { audioRef.current?.pause(); setScreen("ended"); return; }
    const t = setTimeout(() => setSeconds(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [screen, seconds]);

  const handleHangUp = () => { audioRef.current?.pause(); setScreen("ended"); };
  const pad = (n: number) => String(n).padStart(2, "0");

  const cardStyle = {
    background: "linear-gradient(160deg, rgba(10,12,30,0.97) 0%, rgba(20,16,10,0.97) 100%)",
    border: "1px solid rgba(180,130,40,0.25)",
    boxShadow: "0 0 0 1px rgba(180,130,40,0.08), 0 0 40px rgba(180,130,40,0.06), 0 20px 60px rgba(0,0,0,0.6)",
  };

  const bgStyle = {
    background: "radial-gradient(ellipse at 30% 20%, rgba(30,20,60,0.8) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(40,25,10,0.6) 0%, transparent 60%), linear-gradient(160deg, #06080f 0%, #0d0f1a 50%, #100c06 100%)",
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8" style={bgStyle}>

      {screen === "incoming" && (
        <div className="animate-fade-in w-full max-w-sm mx-auto relative z-10">
          <div className="rounded-2xl p-8 flex flex-col items-center gap-6 relative" style={cardStyle}>
            <CornerDecor pos="tl" /><CornerDecor pos="tr" /><CornerDecor pos="bl" /><CornerDecor pos="br" />

            {/* Encabezado tipo ficha sagrada */}
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full"
              style={{ border: "1px solid rgba(180,130,40,0.25)", background: "rgba(180,130,40,0.06)" }}>
              <Moon className="w-3 h-3 text-amber-400/70" />
              <span className="text-amber-400/80 text-xs tracking-[0.2em] uppercase font-light">Archivo de Identidad</span>
              <Moon className="w-3 h-3 text-amber-400/70 scale-x-[-1]" />
            </div>

            {/* línea decorativa */}
            <div className="flex items-center gap-2 w-full">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-amber-400/20" />
              <div className="w-1 h-1 rounded-full bg-amber-400/40" />
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-amber-400/20" />
            </div>

            <SymbolicAvatar />

            <div className="text-center">
              <p className="text-white text-xl font-light tracking-wide">Centro Ser Integral</p>
              <p className="text-amber-300/60 text-xs mt-1 animate-pulse tracking-widest uppercase">Llamada entrante</p>
            </div>

            <div className="flex items-center gap-2 w-full">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-amber-400/20" />
              <div className="w-1 h-1 rounded-full bg-amber-400/40" />
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-amber-400/20" />
            </div>

            <div className="flex gap-10 mt-1">
              <button onClick={() => setScreen("ended")} className="flex flex-col items-center gap-2 group">
                <div className="w-16 h-16 rounded-full flex items-center justify-center transition-all group-active:scale-95"
                  style={{ background: "rgba(220,50,50,0.12)", border: "1px solid rgba(220,80,80,0.3)", boxShadow: "0 0 0 4px rgba(220,50,50,0.06)" }}>
                  <PhoneOff className="w-6 h-6 text-red-400" />
                </div>
                <span className="text-red-400/60 text-xs tracking-wide">Rechazar</span>
              </button>
              <button onClick={handleAccept} className="flex flex-col items-center gap-2 group">
                <div className="w-16 h-16 rounded-full flex items-center justify-center transition-all group-active:scale-95"
                  style={{ background: "rgba(40,180,100,0.12)", border: "1px solid rgba(60,200,120,0.35)", boxShadow: "0 0 0 4px rgba(40,180,100,0.06), 0 0 20px rgba(40,180,100,0.1)" }}>
                  <Phone className="w-6 h-6 text-emerald-400" />
                </div>
                <span className="text-emerald-400/60 text-xs tracking-wide">Aceptar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {screen === "active" && (
        <div className="animate-fade-in w-full max-w-sm mx-auto relative z-10">
          <div className="rounded-2xl p-8 flex flex-col items-center gap-6 relative" style={cardStyle}>
            <CornerDecor pos="tl" /><CornerDecor pos="tr" /><CornerDecor pos="bl" /><CornerDecor pos="br" />
            <p className="text-amber-400/60 text-xs tracking-[0.2em] uppercase">Llamada en curso</p>
            <SymbolicAvatar />
            <p className="text-white text-xl font-light">Centro Ser Integral</p>
            <p className="text-amber-300 text-3xl font-mono tracking-widest"
              style={{ textShadow: "0 0 20px rgba(180,130,40,0.4)" }}>
              00:{pad(seconds)}
            </p>
            <WaveformAnimation />
            <button onClick={handleHangUp} className="w-16 h-16 rounded-full flex items-center justify-center active:scale-95 transition-all"
              style={{ background: "rgba(220,50,50,0.12)", border: "1px solid rgba(220,80,80,0.3)", boxShadow: "0 0 0 4px rgba(220,50,50,0.06)" }}>
              <PhoneOff className="w-6 h-6 text-red-400" />
            </button>
          </div>
        </div>
      )}

      {screen === "ended" && (
        <div className="animate-fade-in w-full max-w-sm mx-auto relative z-10">
          <div className="rounded-2xl overflow-hidden relative" style={{ boxShadow: "0 0 0 1px rgba(180,130,40,0.2), 0 20px 60px rgba(0,0,0,0.7)" }}>
            <CornerDecor pos="tl" /><CornerDecor pos="tr" /><CornerDecor pos="bl" /><CornerDecor pos="br" />
            {/* Video de fondo */}
            <video
              src="/pantalla-llamada-ended.mp4"
              autoPlay loop muted playsInline
              className="w-full block"
              style={{ aspectRatio: "550/750", objectFit: "cover" }}
            />
            {/* Botón superpuesto en la parte inferior */}
            <div className="absolute bottom-0 left-0 right-0 p-6"
              style={{ background: "linear-gradient(0deg, rgba(6,8,15,0.95) 0%, transparent 100%)" }}>
              <button onClick={() => router.push("/verificacion-codigos")}
                className="w-full py-4 rounded-xl text-amber-200 text-sm tracking-wide active:scale-95 transition-all animate-pulse"
                style={{ background: "linear-gradient(135deg, rgba(180,130,40,0.4), rgba(180,130,40,0.2))", border: "1px solid rgba(180,130,40,0.5)", boxShadow: "0 0 24px rgba(180,130,40,0.2)" }}>
                Comenzar mi recorrido simbólico
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
