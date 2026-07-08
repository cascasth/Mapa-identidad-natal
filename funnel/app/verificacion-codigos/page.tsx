"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Star, TreePine, Hash } from "lucide-react";
import { getMainAudio } from "../audio-store";

// ── ZODIAC OCCIDENTAL ─────────────────────────────────────────────────────────
const ZODIAC_RANGES: { sign: string; desc: string; start: [number, number]; end: [number, number] }[] = [
  { sign: "Capricornio", desc: "Disciplina, estructura y visión a largo plazo.", start: [12, 22], end: [1, 19] },
  { sign: "Acuario",     desc: "Originalidad, visión colectiva y pensamiento propio.", start: [1, 20], end: [2, 18] },
  { sign: "Piscis",      desc: "Sensibilidad, intuición y conexión con lo sutil.", start: [2, 19], end: [3, 20] },
  { sign: "Aries",       desc: "Impulso, iniciativa y energía de comienzo.", start: [3, 21], end: [4, 19] },
  { sign: "Tauro",       desc: "Presencia, constancia y arraigo en lo material.", start: [4, 20], end: [5, 20] },
  { sign: "Géminis",     desc: "Curiosidad, adaptabilidad y movimiento mental.", start: [5, 21], end: [6, 20] },
  { sign: "Cáncer",      desc: "Memoria, cuidado y profundidad emocional.", start: [6, 21], end: [7, 22] },
  { sign: "Leo",         desc: "Expresión, presencia y generosidad creativa.", start: [7, 23], end: [8, 22] },
  { sign: "Virgo",       desc: "Análisis, servicio y atención al detalle.", start: [8, 23], end: [9, 22] },
  { sign: "Libra",       desc: "Equilibrio, belleza y búsqueda de armonía.", start: [9, 23], end: [10, 22] },
  { sign: "Escorpio",    desc: "Profundidad, transformación y mirada interna.", start: [10, 23], end: [11, 21] },
  { sign: "Sagitario",   desc: "Expansión, búsqueda de sentido y libertad.", start: [11, 22], end: [12, 21] },
];

function getSolarSign(day: number, month: number): { sign: string; desc: string } {
  for (const z of ZODIAC_RANGES) {
    const [sm, sd] = z.start;
    const [em, ed] = z.end;
    if (sm === em) {
      if (month === sm && day >= sd && day <= ed) return z;
    } else if (sm > em) {
      // crosses year boundary (Capricornio)
      if ((month === sm && day >= sd) || (month === em && day <= ed)) return z;
    } else {
      if ((month === sm && day >= sd) || (month === em && day <= ed) ||
          (month > sm && month < em)) return z;
    }
  }
  return { sign: "Capricornio", desc: "Disciplina, estructura y visión a largo plazo." };
}

// ── SIGNO CHINO ───────────────────────────────────────────────────────────────
// Tabla de fechas de Año Nuevo Lunar (año gregoriano → [mes, día])
const LUNAR_NEW_YEAR: Record<number, [number, number]> = {
  1900:[1,31],1901:[2,19],1902:[2,8],1903:[1,29],1904:[2,16],1905:[2,4],
  1906:[1,25],1907:[2,13],1908:[2,2],1909:[1,22],1910:[2,10],1911:[1,30],
  1912:[2,18],1913:[2,6],1914:[1,26],1915:[2,14],1916:[2,3],1917:[1,23],
  1918:[2,11],1919:[2,1],1920:[2,20],1921:[2,8],1922:[1,28],1923:[2,16],
  1924:[2,5],1925:[1,24],1926:[2,13],1927:[2,2],1928:[1,23],1929:[2,10],
  1930:[1,30],1931:[2,17],1932:[2,6],1933:[1,26],1934:[2,14],1935:[2,4],
  1936:[1,24],1937:[2,11],1938:[1,31],1939:[2,19],1940:[2,8],1941:[1,27],
  1942:[2,15],1943:[2,5],1944:[1,25],1945:[2,13],1946:[2,2],1947:[1,22],
  1948:[2,10],1949:[1,29],1950:[2,17],1951:[2,6],1952:[1,27],1953:[2,14],
  1954:[2,3],1955:[1,24],1956:[2,12],1957:[1,31],1958:[2,18],1959:[2,8],
  1960:[1,28],1961:[2,15],1962:[2,5],1963:[1,25],1964:[2,13],1965:[2,2],
  1966:[1,21],1967:[2,9],1968:[1,30],1969:[2,17],1970:[2,6],1971:[1,27],
  1972:[2,15],1973:[2,3],1974:[1,23],1975:[2,11],1976:[1,31],1977:[2,18],
  1978:[2,7],1979:[1,28],1980:[2,16],1981:[2,5],1982:[1,25],1983:[2,13],
  1984:[2,2],1985:[2,20],1986:[2,9],1987:[1,29],1988:[2,17],1989:[2,6],
  1990:[1,27],1991:[2,15],1992:[2,4],1993:[1,23],1994:[2,10],1995:[1,31],
  1996:[2,19],1997:[2,7],1998:[1,28],1999:[2,16],2000:[2,5],2001:[1,24],
  2002:[2,12],2003:[2,1],2004:[1,22],2005:[2,9],2006:[1,29],2007:[2,18],
  2008:[2,7],2009:[1,26],2010:[2,14],2011:[2,3],2012:[1,23],2013:[2,10],
  2014:[1,31],2015:[2,19],2016:[2,8],2017:[1,28],2018:[2,16],2019:[2,5],
  2020:[1,25],2021:[2,12],2022:[2,1],2023:[1,22],2024:[2,10],2025:[1,29],
  2026:[2,17],2027:[2,6],2028:[1,26],2029:[2,13],2030:[2,3],2031:[1,23],
};

const CHINESE_ANIMALS = ["Rata","Buey","Tigre","Conejo","Dragón","Serpiente","Caballo","Cabra","Mono","Gallo","Perro","Cerdo"];
const CHINESE_DESCS: Record<string, string> = {
  "Rata":     "Inteligencia, adaptabilidad y recursos internos.",
  "Buey":     "Perseverancia, solidez y confianza en el proceso.",
  "Tigre":    "Valentía, magnetismo y impulso transformador.",
  "Conejo":   "Sensibilidad, diplomacia y refugio interno.",
  "Dragón":   "Fuerza, visión y presencia simbólica potente.",
  "Serpiente":"Intuición profunda, misterio y sabiduría silenciosa.",
  "Caballo":  "Libertad, movimiento y energía expansiva.",
  "Cabra":    "Creatividad, cuidado y sensibilidad estética.",
  "Mono":     "Ingenio, versatilidad y pensamiento ágil.",
  "Gallo":    "Precisión, orgullo y claridad en la expresión.",
  "Perro":    "Lealtad, justicia y búsqueda de lo verdadero.",
  "Cerdo":    "Generosidad, abundancia y apertura sincera.",
};

// Año base: 1900 es Rata (índice 0)
const BASE_YEAR = 1900;

function getChineseSign(day: number, month: number, year: number): { sign: string; desc: string } {
  let chineseYear = year;
  const lny = LUNAR_NEW_YEAR[year];
  if (lny) {
    const [lnyMonth, lnyDay] = lny;
    const beforeLNY = month < lnyMonth || (month === lnyMonth && day < lnyDay);
    if (beforeLNY) chineseYear = year - 1;
  }
  const idx = ((chineseYear - BASE_YEAR) % 12 + 12) % 12;
  const sign = CHINESE_ANIMALS[idx];
  return { sign, desc: CHINESE_DESCS[sign] };
}

// ── NUMEROLOGÍA ───────────────────────────────────────────────────────────────
const MASTER = new Set([11, 22, 33]);
const LIFE_PATH_DESCS: Record<number, string> = {
  1:  "Liderazgo, autonomía y apertura de caminos.",
  2:  "Cooperación, intuición y equilibrio relacional.",
  3:  "Expresión creativa, comunicación y alegría.",
  4:  "Estructura, trabajo profundo y construcción sólida.",
  5:  "Libertad, cambio y experiencia como maestra.",
  6:  "Responsabilidad, belleza y amor como vocación.",
  7:  "Investigación, espiritualidad y búsqueda de verdad.",
  8:  "Poder, abundancia y dominio de lo material.",
  9:  "Humanidad, cierre de ciclos y sabiduría universal.",
  11: "Número maestro: inspiración, sensibilidad elevada.",
  22: "Número maestro: construcción en gran escala.",
  33: "Número maestro: servicio y amor incondicional.",
};

function reduce(n: number): number {
  if (n <= 9 || MASTER.has(n)) return n;
  return reduce(String(n).split("").reduce((a, d) => a + Number(d), 0));
}

function getLifePath(day: number, month: number, year: number): { number: number; desc: string } {
  const digits = `${String(day).padStart(2,"0")}${String(month).padStart(2,"0")}${year}`;
  const sum = digits.split("").reduce((a, d) => a + Number(d), 0);
  const number = reduce(sum);
  return { number, desc: LIFE_PATH_DESCS[number] ?? "" };
}

// ── VALIDACIÓN DE FECHA ───────────────────────────────────────────────────────
function isValidDate(day: number, month: number, year: number): boolean {
  const d = new Date(year, month - 1, day);
  return d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === day;
}

// ── COMPONENTE ────────────────────────────────────────────────────────────────
type Phase = "form" | "loading" | "result";

interface Result {
  solar: { sign: string; desc: string };
  chinese: { sign: string; desc: string };
  lifePath: { number: number; desc: string };
}

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const MONTHS = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
];
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i);

export default function VerificacionPage() {
  const [phase, setPhase] = useState<Phase>("form");
  const [day, setDay]   = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear]   = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);
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
    if (!day || !month || !year) { setError("Por favor elige día, mes y año."); return; }
    const d = Number(day), m = Number(month), y = Number(year);
    if (!isValidDate(d, m, y)) { setError("Esa fecha no existe. Revisa el día y el mes."); return; }
    if (new Date(y, m - 1, d) > new Date()) { setError("La fecha no puede ser futura."); return; }

    setPhase("loading");
    setTimeout(() => {
      setResult({
        solar: getSolarSign(d, m),
        chinese: getChineseSign(d, m, y),
        lifePath: getLifePath(d, m, y),
      });
      setPhase("result");
    }, 1800);
  };

  const bg = "linear-gradient(160deg, #0a0c1a 0%, #0d1020 60%, #1a1408 100%)";
  const selectClass = "w-full bg-transparent border border-amber-400/25 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-400/60 appearance-none cursor-pointer";
  const selectStyle = { backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23b8860b' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", backgroundColor: "#040b17" };
  const btnStyle = { background: "transparent", border: "1px solid rgba(180,130,40,0.5)", color: "#e8c87a", boxShadow: "0 0 12px rgba(180,130,40,0.1)" };

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
              paddingTop: "77.7%",  /* 57% de la altura de la imagen (550×750) expresado como % del ancho */
              paddingLeft: "15%",
              paddingRight: "15%",
              paddingBottom: "5%",
              boxShadow: "0 0 0 1px rgba(180,130,40,0.2), 0 20px 60px rgba(0,0,0,0.7)",
            }}>

            <div className="flex flex-col gap-2">
              <div>
                <p className="text-amber-400/70 text-xs tracking-widest uppercase mb-1 pl-1">Día</p>
                <select value={day} onChange={e => setDay(e.target.value)}
                  className="w-full rounded-lg px-3 py-2 text-white text-sm focus:outline-none appearance-none cursor-pointer"
                  style={{ backgroundColor: "#040b17", border: "1px solid rgba(180,130,40,0.35)",
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23b8860b' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")",
                    backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" }}>
                  <option value="">—</option>
                  {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div>
                <p className="text-amber-400/70 text-xs tracking-widest uppercase mb-1 pl-1">Mes</p>
                <select value={month} onChange={e => setMonth(e.target.value)}
                  className="w-full rounded-lg px-3 py-2 text-white text-sm focus:outline-none appearance-none cursor-pointer"
                  style={{ backgroundColor: "#040b17", border: "1px solid rgba(180,130,40,0.35)",
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23b8860b' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")",
                    backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" }}>
                  <option value="">—</option>
                  {MONTHS.map((m, i) => <option key={i+1} value={i+1}>{m}</option>)}
                </select>
              </div>

              <div>
                <p className="text-amber-400/70 text-xs tracking-widest uppercase mb-1 pl-1">Año</p>
                <select value={year} onChange={e => setYear(e.target.value)}
                  className="w-full rounded-lg px-3 py-2 text-white text-sm focus:outline-none appearance-none cursor-pointer"
                  style={{ backgroundColor: "#040b17", border: "1px solid rgba(180,130,40,0.35)",
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23b8860b' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")",
                    backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" }}>
                  <option value="">—</option>
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
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
              {/* Tarjeta 1 — Solar */}
              <div className="rounded-xl p-3 flex gap-3"
                style={{ background: "rgba(4,11,23,0.85)", border: "1px solid rgba(180,130,40,0.2)" }}>
                <span className="text-amber-400/40 text-xs mt-0.5 flex-shrink-0">✦</span>
                <div>
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(207,201,189,0.45)" }}>Coordenada del Cielo</p>
                  <p className="text-sm font-light" style={{ color: "#D8D3C8" }}>{result.solar.sign}</p>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: "rgba(207,201,189,0.55)" }}>{result.solar.desc}</p>
                </div>
              </div>

              {/* Tarjeta 2 — Chino */}
              <div className="rounded-xl p-3 flex gap-3"
                style={{ background: "rgba(4,11,23,0.85)", border: "1px solid rgba(180,130,40,0.2)" }}>
                <span className="text-amber-400/40 text-xs mt-0.5 flex-shrink-0">✦</span>
                <div>
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(207,201,189,0.45)" }}>Coordenada del Linaje</p>
                  <p className="text-sm font-light" style={{ color: "#D8D3C8" }}>{result.chinese.sign}</p>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: "rgba(207,201,189,0.55)" }}>{result.chinese.desc}</p>
                </div>
              </div>

              {/* Tarjeta 3 — Numerología */}
              <div className="rounded-xl p-3 flex gap-3"
                style={{ background: "rgba(4,11,23,0.85)", border: "1px solid rgba(180,130,40,0.2)" }}>
                <span className="text-amber-400/40 text-xs mt-0.5 flex-shrink-0">✦</span>
                <div>
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(207,201,189,0.45)" }}>Coordenada de Fecha</p>
                  <p className="text-sm font-light" style={{ color: "#D8D3C8" }}>Camino de vida {result.lifePath.number}</p>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: "rgba(207,201,189,0.55)" }}>{result.lifePath.desc}</p>
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
