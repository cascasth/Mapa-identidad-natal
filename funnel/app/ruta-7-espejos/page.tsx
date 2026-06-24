"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Sparkles, TreePine, Clock, Anchor, Eye, UserCircle } from "lucide-react";

const MIRRORS = [
  { name: "El Cielo", desc: "Tu energía natal y tu forma de habitar el mundo.", Icon: Star },
  { name: "El Nombre", desc: "La vibración simbólica de cómo eres llamada.", Icon: Sparkles },
  { name: "El Linaje", desc: "Las raíces, memorias y ciclos que acompañan tu historia.", Icon: TreePine },
  { name: "El Tiempo Sagrado", desc: "El ritmo simbólico del día en que naciste.", Icon: Clock },
  { name: "La Raíz Ancestral", desc: "La sensación de origen, pertenencia y sostén.", Icon: Anchor },
  { name: "El Espejo del Alma", desc: "Una imagen interna para observar tus aprendizajes.", Icon: Eye },
  { name: "El Personaje Interior", desc: "El arquetipo que acompaña tu manera de actuar y transformarte.", Icon: UserCircle },
];

const bg = "linear-gradient(160deg, #06080f 0%, #0a0c1a 60%, #0d0f1a 100%)";
const cardStyle = { background: "#080d1c", border: "1px solid rgba(180,130,40,0.18)", boxShadow: "0 0 0 1px rgba(180,130,40,0.06), 0 20px 60px rgba(0,0,0,0.6)" };

function Divider() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-px" style={{ background: "rgba(180,130,40,0.12)" }} />
      <span className="text-amber-400/30 text-xs">✦</span>
      <div className="flex-1 h-px" style={{ background: "rgba(180,130,40,0.12)" }} />
    </div>
  );
}

export default function Ruta7EspejosPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [afterSelection, setAfterSelection] = useState(false);
  const router = useRouter();

  return (
    <main className="min-h-screen px-4 py-10" style={{ background: bg }}>
      <div className="w-full max-w-sm mx-auto flex flex-col gap-4">

        {!afterSelection ? (
          <>
            {/* Encabezado */}
            <div className="animate-fade-in text-center pt-2 pb-1">
              <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "rgba(207,201,189,0.35)" }}>Ruta de los 7 Espejos</p>
              <h1 className="text-xl font-light mb-3" style={{ color: "#D8D3C8" }}>Elige el espejo que más te llame hoy</h1>
              <Divider />
              <p className="text-xs mt-3 leading-relaxed" style={{ color: "rgba(207,201,189,0.4)" }}>
                No estás eligiendo una respuesta definitiva.<br />Solo una puerta de entrada.
              </p>
            </div>

            {/* Lista de espejos */}
            <div className="flex flex-col gap-2">
              {MIRRORS.map((m, i) => {
                const isSelected = selected === i;
                return (
                  <button key={i} onClick={() => setSelected(i)}
                    className="w-full text-left rounded-xl p-3.5 flex items-start gap-3 transition-all active:scale-95"
                    style={{
                      background: isSelected ? "rgba(180,130,40,0.1)" : "rgba(180,130,40,0.03)",
                      border: isSelected ? "1px solid rgba(180,130,40,0.45)" : "1px solid rgba(180,130,40,0.14)",
                    }}>
                    <div className="flex-shrink-0 mt-0.5" style={{ color: isSelected ? "rgba(232,200,122,0.9)" : "rgba(180,130,40,0.35)" }}>
                      <m.Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-light" style={{ color: isSelected ? "#e8c87a" : "#CFC9BD" }}>{m.name}</p>
                      <p className="text-xs mt-0.5 leading-snug" style={{ color: "rgba(207,201,189,0.45)" }}>{m.desc}</p>
                    </div>
                    {isSelected && <span className="ml-auto flex-shrink-0 text-amber-400/60 text-xs mt-0.5">✦</span>}
                  </button>
                );
              })}
            </div>

            <button disabled={selected === null} onClick={() => setAfterSelection(true)}
              className="w-full py-3 rounded-xl text-sm tracking-wide transition-all active:scale-95 disabled:opacity-25 mt-1"
              style={{ background: "linear-gradient(135deg, rgba(180,130,40,0.35), rgba(180,130,40,0.15))", border: "1px solid rgba(180,130,40,0.4)", color: "#e8c87a" }}>
              Abrir este espejo
            </button>
          </>
        ) : (
          <div className="animate-fade-in flex flex-col gap-4 pt-4">
            <div className="rounded-2xl p-6 flex flex-col gap-4" style={cardStyle}>
              <Divider />

              {selected !== null && (() => {
                const Icon = MIRRORS[selected].Icon;
                return (
                  <div className="text-center py-2">
                    <Icon className="w-8 h-8 mx-auto mb-3" style={{ color: "rgba(180,130,40,0.5)" }} />
                    <p className="text-xs tracking-widest uppercase" style={{ color: "rgba(207,201,189,0.4)" }}>Espejo seleccionado</p>
                    <p className="text-base font-light mt-1" style={{ color: "#D8D3C8" }}>{MIRRORS[selected].name}</p>
                  </div>
                );
              })()}

              <Divider />

              <p className="text-sm leading-relaxed" style={{ color: "rgba(207,201,189,0.65)" }}>
                Este espejo puede revelar una parte importante de ti.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(207,201,189,0.5)" }}>
                Pero una identidad no se comprende desde una sola capa. Por eso el siguiente paso es ver cómo los 7 códigos pueden integrarse en un solo mapa.
              </p>

              <button onClick={() => router.push("/explicacion-principal")}
                className="w-full py-3 rounded-xl text-sm tracking-wide active:scale-95 transition-all mt-1"
                style={{ background: "linear-gradient(135deg, rgba(180,130,40,0.35), rgba(180,130,40,0.15))", border: "1px solid rgba(180,130,40,0.4)", color: "#e8c87a" }}>
                Ver explicación principal
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
