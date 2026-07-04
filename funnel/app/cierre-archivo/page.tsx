"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SLIDES = [
  {
    tag: "Archivo de Identidad",
    title: "Lo que viviste fue solo la puerta",
    body: [
      "Tu fecha abrió una primera tríada.",
      "Tu quiz mostró un código activo.",
      "Tu espejo reveló una pregunta interna.",
      "",
      "Pero una identidad no se comprende desde una sola pieza.",
    ],
    cta: "Continuar",
  },
  {
    tag: "Los 7 Códigos",
    title: "Los 7 sistemas se leen juntos",
    body: [
      "El Mapa de Identidad Natal reúne:",
      "",
      "Cielo · Nombre · Linaje · Tiempo Sagrado · Raíz Ancestral · Espejo del Alma · Personaje Interior",
      "",
      "No para etiquetarte.",
      "Sino para mirar tus símbolos en conjunto.",
    ],
    cta: "Continuar",
  },
  {
    tag: "Tu Mapa Completo",
    title: "Qué recibes en tu mapa completo",
    body: [
      "✦  Lectura integrada de tus 7 códigos",
      "✦  Arquetipo central",
      "✦  Mantra personal",
      "✦  Sello visual personalizado",
      "✦  Guía breve de integración",
      "✦  Entrega digital automática",
    ],
    cta: "Continuar",
  },
  {
    tag: "Antes de comenzar",
    title: "Antes de abrir tu mapa",
    body: [
      "No predice tu futuro.",
      "No diagnostica.",
      "No define todo lo que eres.",
      "",
      "Es una herramienta simbólica para observarte con más claridad.",
    ],
    cta: "Recibir mi Mapa de Identidad Natal",
    isFinal: true,
  },
];

const bg = "linear-gradient(160deg, #06080f 0%, #0a0c1a 60%, #0d0f1a 100%)";
const cardStyle = {
  background: "#080d1c",
  border: "1px solid rgba(180,130,40,0.18)",
  boxShadow: "0 0 0 1px rgba(180,130,40,0.06), 0 20px 60px rgba(0,0,0,0.6)",
};

function Divider() {
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex-1 h-px" style={{ background: "rgba(180,130,40,0.12)" }} />
      <span className="text-amber-400/30 text-xs">✦</span>
      <div className="flex-1 h-px" style={{ background: "rgba(180,130,40,0.12)" }} />
    </div>
  );
}

export default function CierreArchivoPage() {
  const [idx, setIdx] = useState(0);
  const router = useRouter();
  const slide = SLIDES[idx];

  const handleCta = () => {
    if (slide.isFinal) {
      router.push("/mapa-identidad-natal");
    } else {
      setIdx(i => i + 1);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10" style={{ background: bg }}>
      <div className="w-full max-w-sm mx-auto flex flex-col gap-4">

        {/* Indicadores de progreso */}
        <div className="flex gap-1.5 justify-center">
          {SLIDES.map((_, i) => (
            <div key={i} className="h-0.5 rounded-full transition-all duration-500"
              style={{
                width: i === idx ? "2rem" : "0.75rem",
                background: i <= idx ? "rgba(180,130,40,0.7)" : "rgba(255,255,255,0.1)",
              }} />
          ))}
        </div>

        {/* Tarjeta */}
        <div key={idx} className="animate-fade-in rounded-2xl p-7 flex flex-col gap-5" style={cardStyle}>

          {/* Tag */}
          <p className="text-xs tracking-[0.25em] uppercase text-center" style={{ color: "rgba(180,130,40,0.5)" }}>
            {slide.tag}
          </p>

          <Divider />

          {/* Título */}
          <h2 className="text-lg font-light text-center leading-snug" style={{ color: "#D8D3C8" }}>
            {slide.title}
          </h2>

          <Divider />

          {/* Cuerpo */}
          <div className="flex flex-col gap-1.5">
            {slide.body.map((line, i) =>
              line === "" ? (
                <div key={i} className="h-2" />
              ) : (
                <p key={i} className="text-sm leading-relaxed"
                  style={{ color: line.startsWith("✦") ? "#CFC9BD" : "rgba(207,201,189,0.6)" }}>
                  {line}
                </p>
              )
            )}
          </div>

          <Divider />

          {/* Botones */}
          <div className="flex flex-col gap-2">
            <button onClick={handleCta}
              className="btn-shimmer w-full py-3 rounded-xl text-sm tracking-wide active:scale-95 transition-all"
              style={{ background: "linear-gradient(135deg, rgba(180,130,40,0.4), rgba(180,130,40,0.2))", border: "1px solid rgba(180,130,40,0.5)", color: "#e8c87a" }}>
              {slide.cta}
            </button>
            {idx > 0 && (
              <button onClick={() => setIdx(i => i - 1)}
                className="w-full py-2 text-xs text-center active:opacity-70 transition-opacity"
                style={{ color: "rgba(207,201,189,0.3)" }}>
                ← Anterior
              </button>
            )}
          </div>
        </div>

        {/* Contador */}
        <p className="text-center text-xs" style={{ color: "rgba(207,201,189,0.2)" }}>
          {idx + 1} / {SLIDES.length}
        </p>

      </div>
    </main>
  );
}
