"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getMainAudio } from "../audio-store";

// ── ZODIACO OCCIDENTAL ─────────────────────────────────────────────────────────
interface SignInfo {
  sign: string;
  desc: string;
  element: string;
  elementDesc: string;
  planet: string;
  planetDesc: string;
}

const ELEMENT_DESCS: Record<string, string> = {
  "Fuego": "Energía de acción, pasión e impulso vital.",
  "Tierra": "Energía de estabilidad, cuerpo y materia.",
  "Aire": "Energía de pensamiento, comunicación y conexión.",
  "Agua": "Energía de emoción, intuición y profundidad.",
};

const PLANET_DESCS: Record<string, string> = {
  "Marte": "Impulso, deseo y acción decidida.",
  "Venus": "Placer, belleza y vínculos afectivos.",
  "Mercurio": "Comunicación, mente y aprendizaje.",
  "Luna": "Emociones, instinto y mundo interior.",
  "Sol": "Identidad, vitalidad y propósito.",
  "Plutón": "Transformación, poder e intensidad.",
  "Júpiter": "Expansión, fe y búsqueda de sentido.",
  "Saturno": "Estructura, disciplina y maduración.",
  "Urano": "Originalidad, cambio y ruptura.",
  "Neptuno": "Intuición, espiritualidad y disolución de límites.",
};

const ZODIAC_SIGNS: SignInfo[] = [
  { sign: "Aries",       desc: "Impulso, iniciativa y energía de comienzo.",         element: "Fuego",  planet: "Marte" },
  { sign: "Tauro",       desc: "Presencia, constancia y arraigo en lo material.",    element: "Tierra", planet: "Venus" },
  { sign: "Géminis",     desc: "Curiosidad, adaptabilidad y movimiento mental.",     element: "Aire",   planet: "Mercurio" },
  { sign: "Cáncer",      desc: "Memoria, cuidado y profundidad emocional.",          element: "Agua",   planet: "Luna" },
  { sign: "Leo",         desc: "Expresión, presencia y generosidad creativa.",       element: "Fuego",  planet: "Sol" },
  { sign: "Virgo",       desc: "Análisis, servicio y atención al detalle.",          element: "Tierra", planet: "Mercurio" },
  { sign: "Libra",       desc: "Equilibrio, belleza y búsqueda de armonía.",         element: "Aire",   planet: "Venus" },
  { sign: "Escorpio",    desc: "Profundidad, transformación y mirada interna.",      element: "Agua",   planet: "Plutón" },
  { sign: "Sagitario",   desc: "Expansión, búsqueda de sentido y libertad.",         element: "Fuego",  planet: "Júpiter" },
  { sign: "Capricornio", desc: "Disciplina, estructura y visión a largo plazo.",     element: "Tierra", planet: "Saturno" },
  { sign: "Acuario",     desc: "Originalidad, visión colectiva y pensamiento propio.", element: "Aire", planet: "Urano" },
  { sign: "Piscis",      desc: "Sensibilidad, intuición y conexión con lo sutil.",   element: "Agua",   planet: "Neptuno" },
].map(s => ({ ...s, elementDesc: ELEMENT_DESCS[s.element], planetDesc: PLANET_DESCS[s.planet] }));

function getSignInfo(sign: string): SignInfo | undefined {
  return ZODIAC_SIGNS.find(s => s.sign === sign);
}

// ── COMPONENTE ────────────────────────────────────────────────────────────────
type Phase = "form" | "loading" | "result";

export default function VerificacionPage() {
  const [phase, setPhase] = useState<Phase>("form");
  const [sign, setSign] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<SignInfo | null>(null);
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (phase !== "result") return;
    const t = setTimeout(() => {
      const audio = new Audio("/audio-triada.mp3");
      audioRef.current = audio;
      audio.play().catch(() => {});
      try { getMainAudio().volume = 0.06; } catch {}
    }, 2000);
    return () => { clearTimeout(t); audioRef.current?.pause(); };
  }, [phase]);

  const handleReveal = () => {
    setError("");
    if (!sign) { setError("Por favor elige tu signo zodiacal."); return; }
    const info = getSignInfo(sign);
    if (!info) { setError("Signo no reconocido."); return; }

    setPhase("loading");
    setTimeout(() => {
      setResult(info);
      setPhase("result");
    }, 1800);
  };

  const bg = "linear-gradient(160deg, #0a0c1a 0%, #0d1020 60%, #1a1408 100%)";

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10" style={{ background: bg }}>
      <div className="w-full max-w-sm mx-auto">

        {/* FORM — background-image con padding-top proporcional, altura libre */}
        {phase === "form" && (
          <div className="animate-fade-in rounded-2xl overflow-hidden"
            style={{
              backgroundImage: "url('/bg-verificacion.png')",
              backgroundSize: "cover",
              backgroundPosition: "top center",
              paddingTop: "95%",  /* altura de la imagen (550×750) hasta la posición del selector "mes" del layout anterior, expresado como % del ancho */
              paddingLeft: "15%",
              paddingRight: "15%",
              paddingBottom: "5%",
              boxShadow: "0 0 0 1px rgba(180,130,40,0.2), 0 20px 60px rgba(0,0,0,0.7)",
            }}>

            <div className="flex flex-col gap-2">
              <div>
                <p className="text-amber-400/70 text-xs tracking-widest uppercase mb-1 pl-1">Tu signo zodiacal</p>
                <select value={sign} onChange={e => setSign(e.target.value)}
                  className="w-full rounded-lg px-3 py-2 text-white text-sm focus:outline-none appearance-none cursor-pointer"
                  style={{ backgroundColor: "#040b17", border: "1px solid rgba(180,130,40,0.35)",
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23b8860b' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")",
                    backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" }}>
                  <option value="">—</option>
                  {ZODIAC_SIGNS.map(s => <option key={s.sign} value={s.sign}>{s.sign}</option>)}
                </select>
              </div>

              {error && <p className="text-red-400 text-xs text-center animate-fade-in">{error}</p>}

              <button onClick={handleReveal}
                className="w-full py-2 rounded-lg text-sm tracking-wide active:scale-95 transition-all mt-1"
                style={{ background: "linear-gradient(135deg, rgba(180,130,40,0.35), rgba(180,130,40,0.15))", border: "1px solid rgba(180,130,40,0.55)", color: "#e8c87a" }}>
                ✦ Revelar mi tríada inicial ✦
              </button>
            </div>
          </div>
        )}

        {/* LOADING */}
        {phase === "loading" && (
          <div className="animate-fade-in rounded-2xl p-8 text-center"
            style={{ background: "#080d1c", border: "1px solid rgba(180,130,40,0.12)" }}>
            <p className="text-sm animate-pulse" style={{ color: "#CFC9BD" }}>
              Trazando tus primeras coordenadas simbólicas…
            </p>
          </div>
        )}

        {/* RESULT */}
        {phase === "result" && result && (
          <div className="animate-fade-in rounded-2xl overflow-hidden"
            style={{
              backgroundImage: "url('/bg-triada-resultado.png')",
              backgroundSize: "cover",
              backgroundPosition: "top center",
              paddingTop: "49%",       /* subido 10% */
              paddingLeft: "15%",
              paddingRight: "15%",
              paddingBottom: "22%",    /* deja espacio al disclaimer de la imagen */
              boxShadow: "0 0 0 1px rgba(180,130,40,0.2), 0 20px 60px rgba(0,0,0,0.7)",
            }}>

            <div className="flex flex-col gap-2">
              {/* Tarjeta 1 — Signo */}
              <div className="rounded-xl p-3 flex gap-3"
                style={{ background: "rgba(4,11,23,0.85)", border: "1px solid rgba(180,130,40,0.2)" }}>
                <span className="text-amber-400/40 text-xs mt-0.5 flex-shrink-0">✦</span>
                <div>
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(207,201,189,0.45)" }}>Coordenada del Cielo</p>
                  <p className="text-sm font-light" style={{ color: "#D8D3C8" }}>{result.sign}</p>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: "rgba(207,201,189,0.55)" }}>{result.desc}</p>
                </div>
              </div>

              {/* Tarjeta 2 — Elemento */}
              <div className="rounded-xl p-3 flex gap-3"
                style={{ background: "rgba(4,11,23,0.85)", border: "1px solid rgba(180,130,40,0.2)" }}>
                <span className="text-amber-400/40 text-xs mt-0.5 flex-shrink-0">✦</span>
                <div>
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(207,201,189,0.45)" }}>Coordenada del Elemento</p>
                  <p className="text-sm font-light" style={{ color: "#D8D3C8" }}>{result.element}</p>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: "rgba(207,201,189,0.55)" }}>{result.elementDesc}</p>
                </div>
              </div>

              {/* Tarjeta 3 — Planeta regente */}
              <div className="rounded-xl p-3 flex gap-3"
                style={{ background: "rgba(4,11,23,0.85)", border: "1px solid rgba(180,130,40,0.2)" }}>
                <span className="text-amber-400/40 text-xs mt-0.5 flex-shrink-0">✦</span>
                <div>
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(207,201,189,0.45)" }}>Coordenada del Regente</p>
                  <p className="text-sm font-light" style={{ color: "#D8D3C8" }}>{result.planet}</p>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: "rgba(207,201,189,0.55)" }}>{result.planetDesc}</p>
                </div>
              </div>

              <button onClick={() => router.push("/codigo-activo")}
                className="btn-shimmer w-full py-2.5 rounded-xl text-sm tracking-wide active:scale-95 transition-all mt-1"
                style={{ background: "linear-gradient(135deg, rgba(180,130,40,0.4), rgba(180,130,40,0.2))", border: "1px solid rgba(180,130,40,0.55)", color: "#e8c87a" }}>
                Continuar al Código Activo del Momento
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
