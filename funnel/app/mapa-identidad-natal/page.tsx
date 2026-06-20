"use client";
import { useState, useEffect } from "react";
import { Star, Sparkles, TreePine, Clock, Anchor, Eye, UserCircle, ChevronDown, Check, X } from "lucide-react";

const CODES = [
  { name: "Código del Cielo", Icon: Star },
  { name: "Código del Nombre", Icon: Sparkles },
  { name: "Código del Linaje", Icon: TreePine },
  { name: "Código del Tiempo Sagrado", Icon: Clock },
  { name: "Código de la Raíz Ancestral", Icon: Anchor },
  { name: "Código del Espejo del Alma", Icon: Eye },
  { name: "Código del Personaje Interior", Icon: UserCircle },
];

const INCLUDES = [
  "Mapa completo personalizado.",
  "Lectura integrada de tus 7 códigos.",
  "Arquetipo central.",
  "Misión simbólica de vida.",
  "Mantra personal.",
  "Reflexión simbólica.",
  "Sello visual exclusivo.",
  "Guía breve de integración.",
  "Entrega digital automática.",
  "Opción en español o inglés.",
];

const HOW = [
  { step: "Ingresas tus datos", desc: "Nombre completo, fecha, hora y lugar de nacimiento, más idioma de entrega." },
  { step: "Se genera tu lectura", desc: "Tus datos se cruzan para crear una lectura simbólica personalizada." },
  { step: "Recibes dos correos", desc: "Uno con tu mapa completo. Otro con tu sello visual personalizado." },
  { step: "Lo usas a tu ritmo", desc: "Puedes leerlo, imprimirlo, usarlo para journaling, meditación, ritual personal o como regalo simbólico." },
];

const FOR_WHO = [
  "Te interesa la espiritualidad práctica.",
  "Te gustan la astrología, numerología, tarot o arquetipos.",
  "Quieres una lectura estética, clara y personalizada.",
  "Buscas una herramienta para reflexionar sobre tu identidad.",
  "Quieres un regalo simbólico para ti o para alguien especial.",
  "Prefieres profundidad sin promesas exageradas.",
];

const NOT_FOR = [
  "Buscas una predicción exacta del futuro.",
  "Quieres un diagnóstico psicológico, médico o profesional.",
  "Esperas que una lectura te diga qué hacer con tu vida.",
  "No te interesa ningún lenguaje simbólico.",
  "Buscas una verdad absoluta sobre quién eres.",
];

const FAQS = [
  { q: "¿Predice el futuro?", a: "No. Es una lectura simbólica de autoconocimiento." },
  { q: "¿Es terapia o diagnóstico?", a: "No. No reemplaza terapia, diagnóstico médico ni acompañamiento profesional." },
  { q: "¿Qué datos necesito?", a: "Nombre completo, fecha, hora y lugar de nacimiento, más idioma de entrega." },
  { q: "¿Y si no sé mi hora exacta?", a: "Puedes usar la hora más cercana o indicarlo al completar tus datos." },
  { q: "¿Cuánto tarda en llegar?", a: "La entrega es digital y automática en minutos." },
  { q: "¿En qué formato llega?", a: "Recibirás tu mapa y tu sello visual por correo electrónico." },
  { q: "¿Puedo imprimirlo?", a: "Sí. Puedes imprimirlo o guardarlo digitalmente." },
  { q: "¿Puedo regalarlo?", a: "Sí. Solo necesitas los datos de nacimiento de la persona." },
  { q: "¿Está disponible en inglés?", a: "Sí. Puedes elegir español o inglés." },
  { q: "¿Es igual que un horóscopo gratuito?", a: "No. Un horóscopo suele ser general. Este mapa cruza varios códigos simbólicos con tus datos personales." },
];

function Section({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="py-10 border-b border-slate-800/60">
      {title && <h2 className="text-amber-300/90 text-lg font-light mb-5 tracking-wide">{title}</h2>}
      {children}
    </section>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-800 last:border-0">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-4 text-left gap-2">
        <span className="text-white/90 text-sm">{q}</span>
        <ChevronDown className={`w-4 h-4 text-amber-400/60 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="pb-4 text-slate-400 text-sm leading-relaxed animate-fade-in">{a}</p>}
    </div>
  );
}

export default function MapaIdentidadNatalPage() {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handler = () => setShowSticky(window.scrollY > 300);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const bg = "linear-gradient(180deg, #0d0f1a 0%, #10121e 100%)";
  const ctaStyle = {
    background: "linear-gradient(135deg, rgba(180,130,40,0.5), rgba(180,130,40,0.25))",
    border: "1px solid rgba(180,130,40,0.4)",
    color: "#e8c87a",
  };

  return (
    <main style={{ background: bg, color: "#f5f0e8" }} className="min-h-screen">
      <div className="w-full max-w-sm mx-auto px-5 pb-24">

        {/* HERO */}
        <section className="pt-14 pb-10 text-center flex flex-col gap-5 border-b border-slate-800/60">
          <div className="w-16 h-16 rounded-full border border-amber-400/30 flex items-center justify-center mx-auto">
            <span className="text-amber-300 text-2xl">⬡</span>
          </div>
          <h1 className="text-white text-2xl font-light leading-snug">
            Recibe tu Mapa de Identidad Natal y mira tus 7 códigos simbólicos en una sola lectura personalizada
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Una lectura digital que integra astrología, numerología, calendarios simbólicos, tarot, arquetipos, mantra personal y sello visual para ayudarte a observar tu identidad con más claridad.
          </p>
          <a href="https://centroserintegral.org/#payment-step" target="_blank" rel="noopener noreferrer" style={ctaStyle} className="w-full py-4 rounded-2xl text-sm tracking-wide active:scale-95 transition-all text-center block">
            Quiero recibir mi mapa
          </a>
          <p className="text-slate-500 text-xs">Entrega digital en minutos. Disponible en español o inglés.</p>
        </section>

        {/* PROBLEMA */}
        <Section title="Tal vez ya conoces partes de ti, pero no las has visto integradas">
          <div className="text-slate-400 text-sm leading-relaxed space-y-3">
            <p>Quizá sabes tu signo.<br />Quizá has calculado tu número.<br />Quizá alguna carta del tarot te resonó.</p>
            <p>Pero cuando todo aparece separado, algo puede sentirse incompleto.</p>
            <p className="text-white/70">El problema no es que no hayas buscado suficiente.<br />El problema es la fragmentación.</p>
          </div>
        </Section>

        {/* REVELACIÓN */}
        <Section title="El valor está en unir los símbolos">
          <div className="text-slate-400 text-sm leading-relaxed space-y-2">
            <p>Cada sistema simbólico mira una capa distinta.</p>
            {["La astrología puede hablar de tu energía.", "La numerología puede mostrar una vibración de camino.", "El tarot puede funcionar como espejo interno.", "Los calendarios simbólicos pueden abrir una lectura del tiempo.", "Los arquetipos pueden mostrar personajes interiores."].map((l, i) => (
              <p key={i} className="pl-3 border-l border-amber-400/20">{l}</p>
            ))}
            <p className="text-white/70 pt-2">Cuando esas capas se integran, aparece una lectura más rica, clara y personal.</p>
          </div>
        </Section>

        {/* MECANISMO */}
        <Section title="La Ruta de los 7 Códigos">
          <p className="text-slate-400 text-sm mb-4">El Mapa de Identidad Natal se construye desde la Ruta de los 7 Códigos, un sistema de integración simbólica que reúne:</p>
          <div className="grid grid-cols-1 gap-2">
            {CODES.map(({ name, Icon }) => (
              <div key={name} className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3">
                <Icon className="w-4 h-4 text-amber-400/60 flex-shrink-0" />
                <span className="text-sm text-slate-300">{name}</span>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-xs mt-4 leading-relaxed">No busca definirte por completo. Busca darte un mapa para observarte desde varios espejos.</p>
        </Section>

        {/* QUÉ RECIBES */}
        <Section title="Tu Mapa de Identidad Natal incluye:">
          <div className="flex flex-col gap-2">
            {INCLUDES.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-amber-400/70 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
          <a href="https://centroserintegral.org/#payment-step" target="_blank" rel="noopener noreferrer" style={ctaStyle} className="w-full py-4 rounded-2xl text-sm tracking-wide active:scale-95 transition-all mt-5 text-center block">
            Solicitar mi mapa personalizado
          </a>
        </Section>

        {/* CÓMO FUNCIONA */}
        <Section title="Cómo funciona">
          <div className="flex flex-col gap-4">
            {HOW.map((h, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-6 h-6 rounded-full border border-amber-400/40 flex items-center justify-center text-amber-400/80 text-xs flex-shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div>
                  <p className="text-white/90 text-sm font-medium">{h.step}</p>
                  <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* PARA QUIÉN */}
        <Section title="Este mapa es para ti si:">
          <div className="flex flex-col gap-2">
            {FOR_WHO.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400/70 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* PARA QUIÉN NO */}
        <Section title="Este mapa no es para ti si:">
          <div className="flex flex-col gap-2">
            {NOT_FOR.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <X className="w-4 h-4 text-red-400/60 flex-shrink-0 mt-0.5" />
                <span className="text-slate-400 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* EJEMPLO */}
        <Section title="Lo que puedes explorar con tu mapa">
          <div className="text-slate-400 text-sm leading-relaxed space-y-2">
            {[
              "Qué códigos simbólicos parecen repetirse en tu lectura.",
              "Cómo se relaciona tu nombre con tu fecha de nacimiento.",
              "Qué arquetipo central acompaña tu proceso.",
              "Qué mantra puede ayudarte a integrar tu energía.",
              "Qué símbolos pueden servirte para journaling o meditación.",
              "Cómo se traduce tu identidad simbólica en un sello visual.",
            ].map((l, i) => (
              <p key={i} className="pl-3 border-l border-amber-400/20">{l}</p>
            ))}
          </div>
          <p className="text-slate-500 text-xs mt-4">Este ejemplo no promete resultados específicos. Solo muestra el tipo de exploración que el mapa puede abrir.</p>
        </Section>

        {/* FAQ */}
        <Section title="Preguntas frecuentes">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 px-4 divide-y divide-slate-800">
            {FAQS.map((faq, i) => <FaqItem key={i} {...faq} />)}
          </div>
        </Section>

        {/* CTA FINAL */}
        <section className="py-10 text-center flex flex-col gap-4">
          <p className="text-slate-400 text-sm leading-relaxed">
            Tus símbolos pueden leerse por separado.<br />O pueden reunirse en un mapa.
          </p>
          <p className="text-slate-500 text-sm leading-relaxed">
            Recibe una lectura personalizada de tus 7 códigos simbólicos y úsala como herramienta de reflexión, journaling, meditación o regalo personal.
          </p>
          <a href="https://centroserintegral.org/#payment-step" target="_blank" rel="noopener noreferrer" style={ctaStyle} className="w-full py-4 rounded-2xl text-sm tracking-wide active:scale-95 transition-all text-center block">
            Recibir mi Mapa de Identidad Natal
          </a>
          <p className="text-slate-500 text-xs">Entrega digital automática. Incluye mapa completo + sello visual personalizado.</p>
        </section>
      </div>

      {/* STICKY CTA */}
      {showSticky && (
        <div className="fixed bottom-0 left-0 right-0 p-4 z-50 animate-fade-in"
          style={{ background: "linear-gradient(0deg, #0d0f1a 60%, transparent)" }}>
          <div className="max-w-sm mx-auto">
            <a href="https://centroserintegral.org/#payment-step" target="_blank" rel="noopener noreferrer" style={ctaStyle} className="w-full py-4 rounded-2xl text-sm tracking-wide active:scale-95 transition-all shadow-2xl text-center block">
              Recibir mi Mapa de Identidad Natal
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
