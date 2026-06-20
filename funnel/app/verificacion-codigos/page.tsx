"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Phase = "loading" | "form" | "scanning" | "done";

const LOADING_LINES = [
  "Iniciando lectura simbólica...",
  "Preparando tus datos base...",
  "Los 7 códigos se construyen a partir de información personal.",
];

const SCAN_LINES = [
  "Datos recibidos.",
  "Preparando capas simbólicas...",
  "Cielo.",
  "Nombre.",
  "Linaje.",
  "Tiempo sagrado.",
  "Raíz.",
  "Espejo del alma.",
  "Personaje interior.",
  "Lectura inicial preparada.",
];

export default function VerificacionPage() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [loadingIdx, setLoadingIdx] = useState(0);
  const [scanIdx, setScanIdx] = useState(0);
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [noSabe, setNoSabe] = useState(false);
  const [ciudad, setCiudad] = useState("");
  const [idioma, setIdioma] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (phase !== "loading") return;
    if (loadingIdx >= LOADING_LINES.length) {
      setTimeout(() => setPhase("form"), 600);
      return;
    }
    const t = setTimeout(() => setLoadingIdx(i => i + 1), 900);
    return () => clearTimeout(t);
  }, [phase, loadingIdx]);

  useEffect(() => {
    if (phase !== "scanning") return;
    if (scanIdx >= SCAN_LINES.length) {
      setTimeout(() => setPhase("done"), 600);
      return;
    }
    const t = setTimeout(() => setScanIdx(i => i + 1), 500);
    return () => clearTimeout(t);
  }, [phase, scanIdx]);

  const canSubmit = nombre.trim() && fecha && ciudad.trim() && idioma && (hora || noSabe);

  const bg = "linear-gradient(160deg, #0a0c1a 0%, #0d1020 60%, #1a1408 100%)";

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{ background: bg }}>

      {(phase === "loading" || phase === "form") && (
        <div className="w-full max-w-sm mx-auto animate-fade-in">
          <div className="rounded-3xl border border-amber-400/20 bg-slate-900/80 p-8 flex flex-col gap-5 shadow-2xl">

            {/* Terminal loading lines */}
            <div className="font-mono text-xs text-emerald-400/80 space-y-1 min-h-[64px]">
              {LOADING_LINES.slice(0, loadingIdx).map((l, i) => (
                <p key={i} className="animate-fade-in">{l}</p>
              ))}
            </div>

            {phase === "form" && (
              <div className="animate-fade-in flex flex-col gap-4">
                <div>
                  <h1 className="text-white text-lg font-light tracking-wide">Verificación inicial</h1>
                  <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                    Ingresa tus datos para iniciar una lectura simbólica personalizada. Esta experiencia no predice tu futuro ni entrega una verdad absoluta: abre una forma más integrada de mirarte.
                  </p>
                </div>

                <input
                  type="text" placeholder="Nombre completo" value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-amber-400/50" />

                <input
                  type="date" value={fecha} onChange={e => setFecha(e.target.value)}
                  placeholder="Fecha de nacimiento"
                  className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-400/50" />

                <div>
                  <input
                    type="time" value={hora} onChange={e => setHora(e.target.value)}
                    disabled={noSabe}
                    placeholder="Hora de nacimiento"
                    className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-400/50 disabled:opacity-40" />
                  <p className="text-slate-500 text-xs mt-1">Si no conoces la hora exacta, escribe la más cercana o selecciona &apos;No la sé&apos;.</p>
                  <label className="flex items-center gap-2 mt-2 cursor-pointer">
                    <input type="checkbox" checked={noSabe} onChange={e => { setNoSabe(e.target.checked); if (e.target.checked) setHora(""); }}
                      className="accent-amber-400" />
                    <span className="text-slate-400 text-xs">No la sé</span>
                  </label>
                </div>

                <input
                  type="text" placeholder="Ciudad y país de nacimiento" value={ciudad}
                  onChange={e => setCiudad(e.target.value)}
                  className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-amber-400/50" />

                <div>
                  <p className="text-slate-400 text-xs mb-2">Idioma de entrega</p>
                  <div className="flex gap-3">
                    {["Español", "Inglés"].map(lang => (
                      <button key={lang} onClick={() => setIdioma(lang)}
                        className={`flex-1 py-2 rounded-xl text-sm border transition-all ${idioma === lang ? "border-amber-400/60 bg-amber-400/10 text-amber-200" : "border-slate-700 text-slate-400 bg-slate-800/40"}`}>
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  disabled={!canSubmit}
                  onClick={() => { setPhase("scanning"); setScanIdx(0); }}
                  className="w-full py-4 rounded-2xl text-sm tracking-wide transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{ background: canSubmit ? "linear-gradient(135deg, rgba(180,130,40,0.4), rgba(180,130,40,0.2))" : undefined, border: "1px solid rgba(180,130,40,0.3)", color: "#e8c87a" }}>
                  Verificar mis datos
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {(phase === "scanning" || phase === "done") && (
        <div className="animate-fade-in w-full max-w-sm mx-auto">
          <div className="rounded-3xl border border-amber-400/20 bg-slate-900/80 p-8 flex flex-col gap-3 shadow-2xl">
            <div className="font-mono text-xs text-emerald-400/80 space-y-1">
              {SCAN_LINES.slice(0, scanIdx).map((l, i) => (
                <p key={i} className="animate-fade-in">{l}</p>
              ))}
            </div>

            {phase === "done" && (
              <div className="animate-fade-in mt-4 flex flex-col gap-4">
                <p className="text-slate-300 text-sm leading-relaxed">Tus datos abren una parte del mapa.<br />Ahora falta una lectura breve sobre tu momento actual.</p>
                <button onClick={() => router.push("/codigo-activo")}
                  className="w-full py-4 rounded-2xl text-sm tracking-wide active:scale-95 transition-all"
                  style={{ background: "linear-gradient(135deg, rgba(180,130,40,0.4), rgba(180,130,40,0.2))", border: "1px solid rgba(180,130,40,0.3)", color: "#e8c87a" }}>
                  Responder quiz breve
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
