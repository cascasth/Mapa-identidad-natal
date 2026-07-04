"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { PhoneOff, Phone, Moon } from "lucide-react";
import Image from "next/image";

type Screen = "splash" | "intro" | "incoming" | "active" | "ended" | "transition";

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
        <Image src="/avatar-sabia.jpg" alt="Centro Ser Integral" width={56} height={56} className="object-cover w-full h-full" />
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

function EndedAudio() {
  const ref = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    const audio = new Audio("/ended-audio.mp3");
    audio.loop = true;
    ref.current = audio;
    audio.play().catch(() => {});
    return () => { audio.pause(); };
  }, []);
  return null;
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
  const [screen, setScreen] = useState<Screen>("splash");
  const [seconds, setSeconds] = useState(49);
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

      {screen === "splash" && (
        <div className="animate-fade-in w-full max-w-sm mx-auto relative z-10">
          <div className="rounded-2xl flex flex-col items-center py-16 px-8 text-center relative" style={cardStyle}>
            <CornerDecor pos="tl" /><CornerDecor pos="tr" /><CornerDecor pos="bl" /><CornerDecor pos="br" />

            {/* Logo / avatar */}
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-amber-400/30 mb-6">
              <Image src="/avatar-sabia.jpg" alt="" width={80} height={80} className="object-cover w-full h-full" />
            </div>

            <p className="text-xs tracking-[0.25em] uppercase mb-2" style={{ color: "rgba(180,130,40,0.5)" }}>Centro Ser Integral</p>
            <h1 className="text-xl font-light mb-2" style={{ color: "#D8D3C8" }}>Mapa de Identidad Natal</h1>

            <div className="flex items-center gap-2 w-full my-5">
              <div className="flex-1 h-px" style={{ background: "rgba(180,130,40,0.15)" }} />
              <span className="text-amber-400/30 text-xs">✦</span>
              <div className="flex-1 h-px" style={{ background: "rgba(180,130,40,0.15)" }} />
            </div>

            <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(207,201,189,0.5)" }}>
              Tienes una llamada esperando.<br />Toca para recibirla.
            </p>

            <button onClick={() => setScreen("intro")}
              className="btn-shimmer w-full py-4 rounded-xl text-sm tracking-wide active:scale-95 transition-all"
              style={{ background: "linear-gradient(135deg, rgba(180,130,40,0.4), rgba(180,130,40,0.2))", border: "1px solid rgba(180,130,40,0.5)", color: "#e8c87a" }}>
              ✦ Toca para iniciar ✦
            </button>
          </div>
        </div>
      )}

      {screen === "intro" && (
        <div className="animate-fade-in w-full max-w-sm mx-auto relative z-10">
          <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 0 0 1px rgba(180,130,40,0.2), 0 20px 60px rgba(0,0,0,0.7)" }}>
            <video
              src="/sabia-marcando.mp4"
              autoPlay playsInline
              className="w-full block"
              style={{ aspectRatio: "9/16", objectFit: "cover" }}
              onEnded={() => setScreen("incoming")}
            />
          </div>
        </div>
      )}

      {screen === "incoming" && (
        <div className="animate-fade-in w-full max-w-sm mx-auto relative z-10">
          <div className="rounded-2xl flex flex-col items-center relative overflow-hidden py-10 px-6" style={cardStyle}>

            {/* Etiqueta WhatsApp */}
            <div className="flex items-center gap-1.5 mb-3">
              <Phone className="w-3.5 h-3.5" style={{ color: "rgba(180,130,40,0.6)" }} />
              <span className="text-xs tracking-[0.2em] uppercase" style={{ color: "rgba(207,201,189,0.45)" }}>Llamada de WhatsApp</span>
            </div>

            {/* Nombre */}
            <h1 className="text-white text-2xl font-light tracking-wide mb-1">Centro Ser Integral</h1>

            {/* Subtítulo */}
            <p className="text-sm mb-8" style={{ color: "rgba(180,130,40,0.55)" }}>✦ Archivo de Identidad ✦</p>

            {/* Avatar */}
            <div className="relative flex items-center justify-center mb-10" style={{ width: 180, height: 180 }}>
              <div className="absolute w-40 h-40 rounded-full border border-amber-400/15 animate-pulse-ring" />
              <div className="absolute w-32 h-32 rounded-full border border-amber-400/20 animate-pulse-ring" style={{ animationDelay: "0.7s" }} />
              <div className="absolute w-28 h-28 rounded-full" style={{ background: "radial-gradient(circle, rgba(180,130,40,0.1) 0%, transparent 70%)" }} />
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-amber-400/30 relative z-10">
                <Image src="/avatar-sabia.jpg" alt="Centro Ser Integral" width={96} height={96} className="object-cover w-full h-full" />
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-around items-end w-full">
              <button onClick={() => setScreen("ended")} className="flex flex-col items-center gap-2 group">
                <div className="w-14 h-14 rounded-full flex items-center justify-center transition-all group-active:scale-95"
                  style={{ background: "rgba(220,50,50,0.85)", boxShadow: "0 4px 20px rgba(220,50,50,0.35)" }}>
                  <PhoneOff className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/70 text-sm">Rechazar</span>
              </button>

              <button onClick={handleAccept} className="flex flex-col items-center gap-2 group">
                <div className="w-14 h-14 rounded-full flex items-center justify-center transition-all group-active:scale-95"
                  style={{ background: "rgba(37,190,100,0.9)", boxShadow: "0 4px 20px rgba(37,190,100,0.35)" }}>
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/70 text-sm">Aceptar</span>
              </button>

              <div className="flex flex-col items-center gap-2 opacity-50">
                <div className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.12)" }}>
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <span className="text-white/70 text-sm">Mensaje</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {screen === "active" && (
        <div className="animate-fade-in w-full max-w-sm mx-auto relative z-10">
          <div className="rounded-2xl flex flex-col items-center relative overflow-hidden" style={{ ...cardStyle, paddingTop: "2rem", paddingBottom: "2rem" }}>
            <CornerDecor pos="tl" /><CornerDecor pos="tr" /><CornerDecor pos="bl" /><CornerDecor pos="br" />

            {/* Etiqueta tipo WhatsApp */}
            <div className="flex items-center gap-1.5 mb-1">
              <Phone className="w-3 h-3 text-amber-400/50" />
              <p className="text-xs tracking-[0.2em] uppercase" style={{ color: "rgba(207,201,189,0.45)" }}>Llamada de WhatsApp</p>
            </div>

            {/* Nombre */}
            <p className="text-white text-2xl font-light tracking-wide mb-1">Centro Ser Integral</p>

            {/* Timer */}
            <p className="font-mono text-sm mb-6" style={{ color: "rgba(207,201,189,0.5)" }}>
              00:{pad(seconds)}
            </p>

            {/* Avatar */}
            <SymbolicAvatar />

            {/* Waveform */}
            <div className="mt-5 mb-2">
              <WaveformAnimation />
            </div>

            {/* Frase mística */}
            <div className="flex items-center gap-2 mb-6 px-6">
              <div className="flex-1 h-px" style={{ background: "rgba(180,130,40,0.2)" }} />
              <p className="text-xs tracking-[0.18em] uppercase text-center" style={{ color: "rgba(180,130,40,0.6)" }}>
                ✦ Señal desde el centro del universo ✦
              </p>
              <div className="flex-1 h-px" style={{ background: "rgba(180,130,40,0.2)" }} />
            </div>

            {/* Controles inferiores */}
            <div className="flex items-end justify-center gap-10 w-full px-8">
              {/* Altavoz (decorativo) */}
              <div className="flex flex-col items-center gap-1.5 opacity-40">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H2v6h4l5 4V5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.54 8.46a5 5 0 010 7.07" />
                  </svg>
                </div>
                <span className="text-xs" style={{ color: "rgba(207,201,189,0.4)" }}>altavoz</span>
              </div>

              {/* Colgar */}
              <div className="flex flex-col items-center gap-1.5">
                <button onClick={handleHangUp} className="w-16 h-16 rounded-full flex items-center justify-center active:scale-95 transition-all"
                  style={{ background: "rgba(220,50,50,0.18)", border: "1px solid rgba(220,80,80,0.4)", boxShadow: "0 0 0 4px rgba(220,50,50,0.08)" }}>
                  <PhoneOff className="w-6 h-6 text-red-400" />
                </button>
                <span className="text-xs" style={{ color: "rgba(207,201,189,0.4)" }}>colgar</span>
              </div>

              {/* Silenciar (decorativo) */}
              <div className="flex flex-col items-center gap-1.5 opacity-40">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 1a3 3 0 013 3v8a3 3 0 01-6 0V4a3 3 0 013-3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 10a7 7 0 01-14 0M12 19v4M8 23h8" />
                  </svg>
                </div>
                <span className="text-xs" style={{ color: "rgba(207,201,189,0.4)" }}>silenciar</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {screen === "ended" && (
        <div className="animate-fade-in w-full max-w-sm mx-auto relative z-10">
          <div className="rounded-2xl overflow-hidden relative" style={{ boxShadow: "0 0 0 1px rgba(180,130,40,0.2), 0 20px 60px rgba(0,0,0,0.7)" }}>
            <CornerDecor pos="tl" /><CornerDecor pos="tr" /><CornerDecor pos="bl" /><CornerDecor pos="br" />
            <video
              src="/pantalla-llamada-ended.mp4"
              autoPlay loop playsInline
              className="w-full block"
              style={{ aspectRatio: "550/750", objectFit: "cover" }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6"
              style={{ background: "linear-gradient(0deg, rgba(6,8,15,0.95) 0%, transparent 100%)" }}>
              <button onClick={() => setScreen("transition")}
                className="w-full py-4 rounded-xl text-amber-200 text-sm tracking-wide active:scale-95 transition-all animate-pulse"
                style={{ background: "linear-gradient(135deg, rgba(180,130,40,0.4), rgba(180,130,40,0.2))", border: "1px solid rgba(180,130,40,0.5)", boxShadow: "0 0 24px rgba(180,130,40,0.2)" }}>
                Comenzar
              </button>
            </div>
          </div>
        </div>
      )}

      {screen === "transition" && (
        <div className="fixed inset-0 z-50 bg-black">
          <video
            src="/transicion-camara.mp4"
            autoPlay playsInline
            className="w-full h-full object-cover"
            onEnded={() => router.push("/verificacion-codigos")}
          />
        </div>
      )}
    </main>
  );
}
