"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Star, Sparkles, TreePine, Clock, Anchor, Eye, UserCircle } from "lucide-react";

const MIRRORS = [
  {
    name: "El Cielo",
    desc: "Tu energía natal y tu forma de habitar el mundo.",
    Icon: Star,
    img: "/espejo-cielo.png",
    body: "Este espejo habla de tu forma de orientarte, de buscar sentido y de mirar tu vida desde una perspectiva más amplia. Puede mostrarte qué parte de ti necesita recordar su dirección, su visión y aquello que la inspira a seguir.\n\nNo se trata de predecir tu destino, sino de observar qué símbolos pueden ayudarte a reconocer mejor tu forma de avanzar.",
    question: "¿En qué área de tu vida necesitas volver a confiar en tu propia dirección?",
  },
  {
    name: "El Nombre",
    desc: "La vibración simbólica de cómo eres llamada.",
    Icon: Sparkles,
    img: "/espejo-nombre.png",
    body: "Este espejo habla de tu voz, tu expresión y la huella simbólica que portas cuando dices 'yo soy'. Puede mostrarte qué parte de ti necesita nombrarse con más claridad, recuperar presencia y dejar de esconder su propia energía.\n\nTu nombre no es solo una etiqueta: también puede funcionar como una puerta para mirar talentos, deseos internos y formas de mostrarte ante el mundo.",
    question: "¿Qué parte de ti pide ser expresada con más verdad?",
  },
  {
    name: "El Linaje",
    desc: "Las raíces, memorias y ciclos que acompañan tu historia.",
    Icon: TreePine,
    img: "/espejo-linaje.png",
    body: "Este espejo habla de raíces, memorias, herencias emocionales y formas de pertenecer que pueden haber influido en tu manera de amar, protegerte, decidir o sostener a otros.\n\nNo viene a señalar culpas ni a definir tu historia. Viene a mostrar que algunas partes de ti no nacieron aisladas: también se formaron dentro de un tejido familiar, cultural y simbólico.",
    question: "¿Qué herencia emocional estás lista para comprender de otra manera?",
  },
  {
    name: "El Tiempo Sagrado",
    desc: "El ritmo simbólico del día en que naciste.",
    Icon: Clock,
    img: "/espejo-tiempo.png",
    body: "Este espejo habla de ciclos, ritmos internos, etapas de cambio y momentos que no siempre pueden acelerarse. Puede mostrarte qué parte de ti necesita dejar de forzar respuestas y empezar a escuchar el ritmo profundo de su propio proceso.\n\nA veces no estás detenida: estás madurando. A veces no estás perdida: estás entre una versión de ti y otra.",
    question: "¿Qué ciclo de tu vida necesita ser entendido antes de ser apresurado?",
  },
  {
    name: "La Raíz Ancestral",
    desc: "La sensación de origen, pertenencia y sostén.",
    Icon: Anchor,
    img: "/espejo-raiz.png",
    body: "Este espejo habla de pertenencia profunda, memoria simbólica y conexión con aquello que viene de antes de ti. Puede mostrarte qué parte de tu fuerza nace de raíces antiguas, incluso si todavía no sabes nombrarlas.",
    question: "¿Qué raíz interior necesita ser reconocida para sostener mejor tu presente?",
  },
  {
    name: "El Espejo del Alma",
    desc: "Una imagen interna para observar tus aprendizajes.",
    Icon: Eye,
    img: "/espejo-alma.png",
    body: "Este espejo habla de tu mundo interior, de tus deseos profundos, tus contradicciones y las preguntas que vuelven una y otra vez. Puede mostrarte qué parte de ti necesita ser escuchada sin juicio y contemplada con más ternura.",
    question: "¿Qué verdad interior has sentido, pero todavía no has terminado de mirar?",
  },
  {
    name: "El Personaje Interior",
    desc: "El arquetipo que acompaña tu manera de actuar y transformarte.",
    Icon: UserCircle,
    img: "/espejo-personaje.png",
    body: "Este espejo habla del arquetipo que actúa dentro de ti: la forma en que enfrentas retos, tomas decisiones, te proteges, creas o acompañas a otros. Puede mostrarte qué papel has estado representando y cuál podrías elegir con más conciencia.",
    question: "¿Qué personaje interior ha guiado tus decisiones últimamente?",
  },
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
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      const audio = new Audio("/audio-codigo.mp3");
      audioRef.current = audio;
      audio.play().catch(() => {});
    }, 2000);
    return () => { clearTimeout(t); audioRef.current?.pause(); };
  }, []);

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
            {selected !== null && (
              <div className="rounded-2xl overflow-hidden flex flex-col" style={cardStyle}>

                {/* Imagen del espejo — reducida */}
                <div style={{ aspectRatio: "550/180", background: "rgba(180,130,40,0.06)" }}>
                  <img
                    src={MIRRORS[selected].img}
                    alt=""
                    className="w-full h-full object-cover"
                    onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                </div>

                <div className="p-6 flex flex-col gap-4">
                  <Divider />

                  {(() => {
                    const Icon = MIRRORS[selected].Icon;
                    return (
                      <div className="text-center">
                        <Icon className="w-7 h-7 mx-auto mb-2" style={{ color: "rgba(180,130,40,0.5)" }} />
                        <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(207,201,189,0.4)" }}>Espejo seleccionado</p>
                        <p className="text-base font-light" style={{ color: "#D8D3C8" }}>{MIRRORS[selected].name}</p>
                      </div>
                    );
                  })()}

                  <Divider />

                  {/* Cuerpo del espejo */}
                  {MIRRORS[selected].body.split("\n\n").map((para, i) => (
                    <p key={i} className="text-sm leading-relaxed" style={{ color: "rgba(207,201,189,0.65)" }}>{para}</p>
                  ))}

                  {/* Pregunta de reflexión */}
                  <div className="rounded-xl px-4 py-3" style={{ background: "rgba(180,130,40,0.07)", border: "1px solid rgba(180,130,40,0.2)" }}>
                    <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(180,130,40,0.5)" }}>Pregunta para ti</p>
                    <p className="text-sm leading-relaxed font-light italic" style={{ color: "#CFC9BD" }}>{MIRRORS[selected].question}</p>
                  </div>

                  <Divider />

                  <p className="text-xs leading-relaxed text-center" style={{ color: "rgba(207,201,189,0.4)" }}>
                    Una identidad no se comprende desde una sola capa. El siguiente paso es ver cómo los 7 códigos se integran en un solo mapa.
                  </p>

                  <button onClick={() => router.push("/explicacion-principal")}
                    className="btn-shimmer w-full py-3 rounded-xl text-sm tracking-wide active:scale-95 transition-all mt-1"
                    style={{ background: "linear-gradient(135deg, rgba(180,130,40,0.35), rgba(180,130,40,0.15))", border: "1px solid rgba(180,130,40,0.4)", color: "#e8c87a" }}>
                    Descubrir qué incluye el Mapa completo
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
