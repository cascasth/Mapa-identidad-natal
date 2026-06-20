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

export default function Ruta7EspejosPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [afterSelection, setAfterSelection] = useState(false);
  const router = useRouter();

  const bg = "linear-gradient(160deg, #0a0c1a 0%, #0d1020 60%, #1a1408 100%)";

  return (
    <main className="min-h-screen px-4 py-10" style={{ background: bg }}>
      <div className="w-full max-w-sm mx-auto flex flex-col gap-5">

        {!afterSelection ? (
          <>
            <div className="animate-fade-in text-center pt-4 pb-2">
              <h1 className="text-white text-xl font-light tracking-wide mb-2">La Ruta de los 7 Espejos</h1>
              <p className="text-slate-400 text-sm leading-relaxed">Cada espejo muestra una capa distinta. Elige el símbolo que más te llame hoy.</p>
              <p className="text-amber-400/50 text-xs mt-2">No estás eligiendo una respuesta definitiva. Solo una puerta de entrada.</p>
            </div>

            <div className="flex flex-col gap-3">
              {MIRRORS.map((m, i) => (
                <button key={i} onClick={() => setSelected(i)}
                  className={`w-full text-left rounded-2xl border p-4 flex items-start gap-3 transition-all active:scale-95 ${selected === i ? "border-amber-400/60 bg-amber-400/10" : "border-slate-700 bg-slate-900/60 hover:border-amber-400/30"}`}>
                  <div className={`mt-0.5 flex-shrink-0 ${selected === i ? "text-amber-300" : "text-slate-500"}`}>
                    <m.Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${selected === i ? "text-amber-200" : "text-white"}`}>{m.name}</p>
                    <p className="text-slate-400 text-xs mt-0.5 leading-snug">{m.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            <button disabled={selected === null} onClick={() => setAfterSelection(true)}
              className="w-full py-4 rounded-2xl text-sm tracking-wide transition-all active:scale-95 disabled:opacity-30"
              style={{ background: "linear-gradient(135deg, rgba(180,130,40,0.4), rgba(180,130,40,0.2))", border: "1px solid rgba(180,130,40,0.3)", color: "#e8c87a" }}>
              Abrir este espejo
            </button>
          </>
        ) : (
          <div className="animate-fade-in flex flex-col gap-6 pt-8 text-center">
            <div className="rounded-3xl border border-amber-400/20 bg-slate-900/80 p-8 flex flex-col gap-5 shadow-2xl">
              {selected !== null && (() => { const Icon = MIRRORS[selected].Icon; return <Icon className="w-10 h-10 text-amber-400/60 mx-auto" />; })()}
              <p className="text-slate-300 text-sm leading-relaxed">
                Este espejo puede revelar una parte importante de ti.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Pero una identidad no se comprende desde una sola capa.<br />
                Por eso el siguiente paso es ver cómo los 7 códigos pueden integrarse en un solo mapa.
              </p>
              <button onClick={() => router.push("/explicacion-principal")}
                className="w-full py-4 rounded-2xl text-sm tracking-wide active:scale-95 transition-all"
                style={{ background: "linear-gradient(135deg, rgba(180,130,40,0.4), rgba(180,130,40,0.2))", border: "1px solid rgba(180,130,40,0.3)", color: "#e8c87a" }}>
                Ver explicación principal
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
