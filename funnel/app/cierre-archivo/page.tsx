"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Slide = {
  tag: string;
  title: string;
  body: string[];
  isList?: boolean;
  cta: string;
  microcopy?: string;
  isFinal?: boolean;
};

const SLIDES: Slide[] = [
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
    tag: "El Mapa",
    title: "¿Qué es el Mapa de Identidad Natal?",
    body: [
      "Es una lectura simbólica personalizada que reúne distintos sistemas de identidad para observarte desde varias capas.",
      "",
      "No es una predicción.",
      "No es una etiqueta.",
      "Es un mapa para contemplar cómo dialogan tus símbolos personales.",
    ],
    cta: "Ver qué integra",
  },
  {
    tag: "Tu Mapa Integra",
    title: "Tu mapa integra",
    body: [
      "Zodiaco Occidental + Ascendente",
      "Horóscopo Chino: año, mes y hora",
      "Numerología Pitagórica: 4 números",
      "Tzolkin Maya: GMT tradicional + Dreamspell",
      "Tonalpohualli Azteca: correlación GMT",
      "Arcano Mayor del Tarot: carta del alma",
      "Arquetipo de Jung",
      "La Integración: el hilo que une todo",
      "Mantra personal",
      "Amuleto digital personalizado",
    ],
    isList: true,
    cta: "Continuar",
  },
  {
    tag: "Tu Mapa Completo",
    title: "Para crear tu mapa completo",
    body: [
      "Después de la compra se solicitan tus datos completos de nacimiento y nombre.",
      "",
      "Con ellos se genera una lectura personalizada para que puedas volver a ti desde distintos lenguajes simbólicos.",
    ],
    cta: "Recibir mi Mapa de Identidad Natal",
    microcopy: "Entrega digital automática. Incluye lectura + mantra + amuleto personalizado.",
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
          {slide.isList ? (
            <div className="flex flex-col gap-2">
              {slide.body.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="text-amber-400/40 text-xs mt-0.5 flex-shrink-0">✦</span>
                  <p className="text-sm leading-snug" style={{ color: "#CFC9BD" }}>{item}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              {slide.body.map((line, i) =>
                line === "" ? (
                  <div key={i} className="h-2" />
                ) : (
                  <p key={i} className="text-sm leading-relaxed"
                    style={{ color: "rgba(207,201,189,0.6)" }}>
                    {line}
                  </p>
                )
              )}
            </div>
          )}

          <Divider />

          {/* Botones */}
          <div className="flex flex-col gap-2">
            <button onClick={handleCta}
              className="btn-shimmer w-full py-3 rounded-xl text-sm tracking-wide active:scale-95 transition-all"
              style={{ background: "linear-gradient(135deg, rgba(180,130,40,0.4), rgba(180,130,40,0.2))", border: "1px solid rgba(180,130,40,0.5)", color: "#e8c87a" }}>
              {slide.cta}
            </button>
            {slide.microcopy && (
              <p className="text-center text-xs leading-relaxed" style={{ color: "rgba(207,201,189,0.3)" }}>
                {slide.microcopy}
              </p>
            )}
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
