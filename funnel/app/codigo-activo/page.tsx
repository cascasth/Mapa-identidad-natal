"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const QUESTIONS = [
  {
    text: "En este momento, lo que más estás buscando es…",
    options: [
      { label: "Dirección para entender hacia dónde moverte.", code: "A" },
      { label: "Una forma más clara de nombrar quién eres.", code: "B" },
      { label: "Comprender de dónde vienen ciertos patrones.", code: "C" },
      { label: "Mirarte con más honestidad y menos juicio.", code: "D" },
      { label: "Unir muchas piezas internas que se sienten dispersas.", code: "E" },
    ],
  },
  {
    text: "Cuando piensas en tu identidad, sientes que necesitas…",
    options: [
      { label: "Ver el panorama completo desde una perspectiva más amplia.", code: "A" },
      { label: "Reconocer la fuerza simbólica de tu nombre, voz e historia.", code: "B" },
      { label: "Entender mejor tus raíces, ciclos y herencias emocionales.", code: "C" },
      { label: "Observar tus aprendizajes internos con más profundidad.", code: "D" },
      { label: "Ordenar todo lo que ya sabes de ti en una lectura coherente.", code: "E" },
    ],
  },
  {
    text: "¿Qué tipo de símbolo suele resonarte más?",
    options: [
      { label: "El cielo, los astros, la carta natal, los ciclos visibles.", code: "A" },
      { label: "Las palabras, los nombres, los números, las frases personales.", code: "B" },
      { label: "Las raíces, los linajes, las memorias, lo ancestral.", code: "C" },
      { label: "Los espejos, los arcanos, los sueños, las imágenes internas.", code: "D" },
      { label: "Los mapas, las conexiones, los sistemas que unen varias capas.", code: "E" },
    ],
  },
  {
    text: "Si tu momento actual pudiera pedirte algo, sería…",
    options: [
      { label: '"Mira más alto. Hay un patrón mayor."', code: "A" },
      { label: '"Escucha cómo te nombras y cómo te expresas."', code: "B" },
      { label: '"Reconoce de dónde vienes para elegir hacia dónde vas."', code: "C" },
      { label: '"Mírate con calma. No todo necesita resolverse de inmediato."', code: "D" },
      { label: '"Integra tus partes. No sigas leyéndote en fragmentos."', code: "E" },
    ],
  },
];

const RESULTS: Record<string, { title: string; body: string; cta: string }> = {
  A: {
    title: "Tu código activo es: El Cielo",
    body: "En este momento, parece que una parte de ti busca perspectiva. No solo respuestas rápidas, sino una forma más amplia de entender tu energía, tus decisiones y tu manera de moverte en el mundo.\n\nEl Código del Cielo puede mostrar una capa importante de tu identidad, pero no cuenta toda la historia. Para que esa lectura tenga más sentido, necesita dialogar con tu nombre, tu linaje, tu tiempo sagrado, tu raíz, tu espejo interno y tu arquetipo.",
    cta: "Ver cómo se une con mis otros códigos",
  },
  B: {
    title: "Tu código activo es: El Nombre",
    body: "Tu resultado sugiere que estás en una etapa donde la forma en que te nombras, te reconoces y te presentas al mundo tiene un peso especial. Tu nombre puede funcionar como una puerta simbólica hacia tu identidad.\n\nPero tu nombre no vive aislado. Su lectura se vuelve más rica cuando se cruza con tu fecha de nacimiento, tu cielo, tus ciclos simbólicos y tu arquetipo central.",
    cta: "Descubrir la lectura completa",
  },
  C: {
    title: "Tu código activo es: El Linaje",
    body: "Este resultado habla de raíces, pertenencia y memoria. Tal vez estás observando patrones que vienen de antes de ti, o buscando entender qué deseas conservar, transformar o soltar.\n\nEl linaje puede mostrar una capa profunda, pero necesita unirse a tus otros códigos para no quedarse solo en el pasado.",
    cta: "Ver mi mapa integrado",
  },
  D: {
    title: "Tu código activo es: El Espejo del Alma",
    body: "Este momento parece pedir una mirada más honesta y compasiva hacia ti. No desde la exigencia, sino desde la observación: qué estás aprendiendo, qué estás repitiendo y qué parte de ti quiere ser escuchada.\n\nEl Espejo del Alma puede ayudarte a observar tu proceso interno, pero el mapa completo le da contexto.",
    cta: "Continuar hacia mi lectura completa",
  },
  E: {
    title: "Tu código activo es: Integración",
    body: "Tu resultado muestra que probablemente ya tienes muchas piezas sobre ti: símbolos, ideas, intuiciones, lecturas o preguntas. Lo que parece faltar no es más información, sino una forma clara de unirla.\n\nEl Mapa de Identidad Natal existe justamente para eso: reunir los 7 códigos en una lectura personalizada, estética y fácil de volver a consultar.",
    cta: "Abrir la Ruta de los 7 Códigos",
  },
};

const LOADING_TEXTS = [
  "Preparando tus códigos…",
  "Integrando tus capas simbólicas…",
  "Organizando tu lectura…",
  "Creando tu ruta personalizada…",
  "Tu mapa está casi listo para abrirse…",
];

type Screen = "intro" | "quiz" | "loading" | "result";

function calcResult(answers: string[]): string {
  const count: Record<string, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  answers.forEach(a => count[a]++);
  const max = Math.max(...Object.values(count));
  const winners = Object.keys(count).filter(k => count[k] === max);
  return winners.length === 1 ? winners[0] : "E";
}

export default function CodigoActivoPage() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [loadingText, setLoadingText] = useState(0);
  const [result, setResult] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (screen !== "loading") return;
    if (loadingText >= LOADING_TEXTS.length) {
      setResult(calcResult(answers));
      setTimeout(() => setScreen("result"), 400);
      return;
    }
    const t = setTimeout(() => setLoadingText(i => i + 1), 700);
    return () => clearTimeout(t);
  }, [screen, loadingText, answers]);

  const selectOption = (code: string) => {
    const newAnswers = [...answers, code];
    setAnswers(newAnswers);
    if (qIdx + 1 < QUESTIONS.length) {
      setQIdx(i => i + 1);
    } else {
      setScreen("loading");
    }
  };

  const bg = "linear-gradient(160deg, #0a0c1a 0%, #0d1020 60%, #1a1408 100%)";

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10" style={{ background: bg }}>

      {screen === "intro" && (
        <div className="animate-fade-in w-full max-w-sm mx-auto">
          <div className="relative rounded-2xl overflow-hidden"
            style={{
              aspectRatio: "550/750",
              backgroundImage: "url('/bg-codigo-activo.png')",
              backgroundSize: "cover",
              backgroundPosition: "top center",
              boxShadow: "0 0 0 1px rgba(180,130,40,0.2), 0 20px 60px rgba(0,0,0,0.7)",
            }}>
            {/* Botón superpuesto en la parte inferior */}
            <div className="absolute bottom-[10%] left-[15%] right-[15%]">
              <button onClick={() => setScreen("quiz")}
                className="w-full py-3 rounded-xl text-sm tracking-wide active:scale-95 transition-all"
                style={{ background: "linear-gradient(135deg, rgba(180,130,40,0.4), rgba(180,130,40,0.2))", border: "1px solid rgba(180,130,40,0.5)", color: "#e8c87a", boxShadow: "0 0 20px rgba(180,130,40,0.15)" }}>
                ✦ Comenzar
              </button>
            </div>
          </div>
        </div>
      )}

      {screen === "quiz" && (
        <div className="animate-fade-in w-full max-w-sm mx-auto">
          <div className="rounded-2xl p-6 flex flex-col gap-4"
            style={{ background: "#080d1c", border: "1px solid rgba(180,130,40,0.18)", boxShadow: "0 0 0 1px rgba(180,130,40,0.06), 0 20px 60px rgba(0,0,0,0.6)" }}>

            {/* Progreso */}
            <div className="flex items-center gap-3">
              <div className="flex gap-1 flex-1">
                {QUESTIONS.map((_, i) => (
                  <div key={i} className="flex-1 h-0.5 rounded-full"
                    style={{ background: i < qIdx ? "rgba(180,130,40,0.7)" : i === qIdx ? "rgba(180,130,40,0.35)" : "rgba(255,255,255,0.08)" }} />
                ))}
              </div>
              <span className="text-xs flex-shrink-0" style={{ color: "rgba(207,201,189,0.35)" }}>{qIdx + 1} / {QUESTIONS.length}</span>
            </div>

            {/* Separador decorativo */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-px" style={{ background: "rgba(180,130,40,0.12)" }} />
              <span className="text-amber-400/30 text-xs">✦</span>
              <div className="flex-1 h-px" style={{ background: "rgba(180,130,40,0.12)" }} />
            </div>

            {/* Pregunta */}
            <p className="text-base font-light leading-relaxed" style={{ color: "#D8D3C8" }}>
              {QUESTIONS[qIdx].text}
            </p>

            {/* Opciones */}
            <div className="flex flex-col gap-2 mt-1">
              {QUESTIONS[qIdx].options.map(opt => (
                <button key={opt.code} onClick={() => selectOption(opt.code)}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm leading-snug active:scale-95 transition-all"
                  style={{ background: "rgba(180,130,40,0.05)", border: "1px solid rgba(180,130,40,0.18)", color: "#CFC9BD" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(180,130,40,0.12)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(180,130,40,0.4)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(180,130,40,0.05)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(180,130,40,0.18)"; }}>
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Volver */}
            {qIdx > 0 && (
              <button onClick={() => { setQIdx(i => i - 1); setAnswers(a => a.slice(0, -1)); }}
                className="text-xs text-center w-full pt-1 active:opacity-70 transition-opacity"
                style={{ color: "rgba(207,201,189,0.3)" }}>
                ← volver
              </button>
            )}
          </div>
        </div>
      )}

      {screen === "loading" && (
        <div className="animate-fade-in w-full max-w-sm mx-auto text-center">
          <div className="rounded-2xl p-8 flex flex-col gap-3"
            style={{ background: "#080d1c", border: "1px solid rgba(180,130,40,0.18)" }}>
            <span className="text-amber-400/40 text-lg animate-pulse">✦</span>
            {LOADING_TEXTS.slice(0, loadingText).map((t, i) => (
              <p key={i} className="text-xs animate-fade-in" style={{ color: "rgba(207,201,189,0.55)" }}>{t}</p>
            ))}
          </div>
        </div>
      )}

      {screen === "result" && result && (
        <div className="animate-fade-in w-full max-w-sm mx-auto">
          <div className="rounded-2xl p-6 flex flex-col gap-4"
            style={{ background: "#080d1c", border: "1px solid rgba(180,130,40,0.18)", boxShadow: "0 0 0 1px rgba(180,130,40,0.06), 0 20px 60px rgba(0,0,0,0.6)" }}>
            <div className="flex items-center gap-2 mb-1">
              <div className="flex-1 h-px" style={{ background: "rgba(180,130,40,0.15)" }} />
              <span className="text-amber-400/40 text-xs">✦</span>
              <div className="flex-1 h-px" style={{ background: "rgba(180,130,40,0.15)" }} />
            </div>
            <h2 className="text-base font-light" style={{ color: "#D8D3C8" }}>{RESULTS[result].title}</h2>
            {RESULTS[result].body.split("\n\n").map((para, i) => (
              <p key={i} className="text-sm leading-relaxed" style={{ color: "rgba(207,201,189,0.6)" }}>{para}</p>
            ))}
            <button onClick={() => router.push("/ruta-7-espejos")}
              className="mt-2 w-full py-3 rounded-xl text-sm tracking-wide active:scale-95 transition-all"
              style={{ background: "linear-gradient(135deg, rgba(180,130,40,0.35), rgba(180,130,40,0.15))", border: "1px solid rgba(180,130,40,0.4)", color: "#e8c87a" }}>
              {RESULTS[result].cta}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
