"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { PhoneOff, Phone, Moon } from "lucide-react";
import Image from "next/image";

type Screen = "incoming" | "active" | "ended";

function SymbolicAvatar() {
  return (
    <div className="relative flex items-center justify-center w-24 h-24">
      <div className="absolute w-24 h-24 rounded-full border border-amber-400/30 animate-pulse-ring" />
      <div className="absolute w-20 h-20 rounded-full border border-amber-400/20 animate-pulse-ring" style={{ animationDelay: "0.5s" }} />
      <div className="w-16 h-16 rounded-full overflow-hidden border border-amber-400/40">
        <Image src="/avatar-centro-ser.jpg.png" alt="Centro Ser Integral" width={64} height={64} className="object-cover w-full h-full" />
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

export default function IncomingCallPage() {
  const [screen, setScreen] = useState<Screen>("incoming");
  const [seconds, setSeconds] = useState(48);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const router = useRouter();

  // Iniciar audio y timer al aceptar
  const handleAccept = () => {
    setScreen("active");
    const audio = new Audio("/llamada.mp3");
    audioRef.current = audio;
    audio.play().catch(() => {});
    audio.onended = () => setScreen("ended");
  };

  // Timer de respaldo por si el audio tarda o falla
  useEffect(() => {
    if (screen !== "active") return;
    if (seconds <= 0) {
      audioRef.current?.pause();
      setScreen("ended");
      return;
    }
    const t = setTimeout(() => setSeconds(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [screen, seconds]);

  // Detener audio si cuelga
  const handleHangUp = () => {
    audioRef.current?.pause();
    setScreen("ended");
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{ background: "linear-gradient(160deg, #0a0c1a 0%, #0d1020 50%, #1a1408 100%)" }}>

      {screen === "incoming" && (
        <div className="animate-fade-in w-full max-w-sm mx-auto">
          <div className="rounded-3xl border border-amber-400/20 bg-slate-900/80 p-8 flex flex-col items-center gap-6 shadow-2xl">
            <div className="flex items-center gap-2 text-amber-400/60 text-xs tracking-widest uppercase">
              <Moon className="w-3 h-3" />
              <span>Archivo de Identidad</span>
            </div>
            <SymbolicAvatar />
            <div className="text-center">
              <p className="text-white text-xl font-light tracking-wide">Centro Ser Integral</p>
              <p className="text-amber-300/70 text-sm mt-1 animate-pulse">Llamada entrante</p>
            </div>
            <div className="flex gap-8 mt-2">
              <button onClick={() => setScreen("ended")} className="flex flex-col items-center gap-2 group">
                <div className="w-14 h-14 rounded-full bg-red-500/20 border border-red-400/40 flex items-center justify-center group-active:scale-95 transition-transform">
                  <PhoneOff className="w-6 h-6 text-red-400" />
                </div>
                <span className="text-red-400/70 text-xs">Rechazar</span>
              </button>
              <button onClick={handleAccept} className="flex flex-col items-center gap-2 group">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center group-active:scale-95 transition-transform">
                  <Phone className="w-6 h-6 text-emerald-400" />
                </div>
                <span className="text-emerald-400/70 text-xs">Aceptar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {screen === "active" && (
        <div className="animate-fade-in w-full max-w-sm mx-auto">
          <div className="rounded-3xl border border-amber-400/20 bg-slate-900/80 p-8 flex flex-col items-center gap-6 shadow-2xl">
            <p className="text-amber-400/60 text-xs tracking-widest uppercase">Llamada en curso</p>
            <SymbolicAvatar />
            <p className="text-white text-xl font-light">Centro Ser Integral</p>
            <p className="text-amber-300 text-2xl font-mono tracking-widest">00:{pad(seconds)}</p>
            <WaveformAnimation />
            <button onClick={handleHangUp}
              className="w-14 h-14 rounded-full bg-red-500/20 border border-red-400/40 flex items-center justify-center active:scale-95 transition-transform">
              <PhoneOff className="w-6 h-6 text-red-400" />
            </button>
          </div>
        </div>
      )}

      {screen === "ended" && (
        <div className="animate-fade-in w-full max-w-sm mx-auto">
          <div className="rounded-3xl border border-amber-400/20 bg-slate-900/80 p-8 flex flex-col items-center gap-6 shadow-2xl text-center">
            <Moon className="w-10 h-10 text-amber-400/60" />
            <p className="text-white text-xl font-light">Centro Ser Integral</p>
            <p className="text-slate-400 text-sm">Archivo de Identidad</p>
            <button onClick={() => router.push("/verificacion-codigos")}
              className="mt-4 w-full py-4 rounded-2xl bg-gradient-to-r from-amber-700/40 to-amber-500/40 border border-amber-400/30 text-amber-200 text-sm tracking-wide active:scale-95 transition-all hover:border-amber-400/60">
              Comenzar mi recorrido simbólico
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
