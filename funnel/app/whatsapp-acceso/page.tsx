"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const MESSAGES = [
  { text: "Hola ✨", delay: 800 },
  { text: "Te comparto el acceso para continuar tu recorrido simbólico.", delay: 1800 },
  { text: "Es una plataforma breve con videos privados sobre los 7 códigos.", delay: 2900 },
  { text: "Puedes verla a tu ritmo.", delay: 3900 },
  { text: "Usuario: el correo o nombre que usaste al comenzar.\nContraseña: CODIGO7", delay: 5000 },
  { text: "LINK", delay: 6200 }, // special: link
  { text: "Te recomiendo ver los videos en orden.\nEl último aclara qué es y qué no es el Mapa de Identidad Natal.", delay: 7400 },
  { text: "Cuando sientas que es tu momento, ahí mismo podrás solicitar tu mapa completo. 🌙", delay: 8600 },
];

export default function WhatsappAccesoPage() {
  const [shown, setShown] = useState<number[]>([]);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    MESSAGES.forEach((msg, i) => {
      setTimeout(() => {
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
          setShown(prev => [...prev, i]);
        }, 700);
      }, msg.delay);
    });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [shown, typing]);

  return (
    <main className="min-h-screen flex flex-col" style={{ background: "#ece5dd" }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 sticky top-0 z-10"
        style={{ background: "#075e54" }}>
        <div className="w-10 h-10 rounded-full bg-teal-700 flex items-center justify-center text-white text-sm font-semibold">
          CS
        </div>
        <div>
          <p className="text-white text-sm font-medium">Centro Ser Integral</p>
          <p className="text-teal-200 text-xs">en línea</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-2">
        {MESSAGES.map((msg, i) => {
          if (!shown.includes(i)) return null;
          if (msg.text === "LINK") {
            return (
              <div key={i} className="animate-fade-in max-w-[80%] bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                <p className="text-xs text-gray-500 mb-1">Acceso:</p>
                <button onClick={() => router.push("/login-feed")}
                  className="text-teal-700 text-sm underline font-medium">
                  Acceder al Feed Privado →
                </button>
              </div>
            );
          }
          return (
            <div key={i} className="animate-fade-in max-w-[80%] bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
              <p className="text-gray-800 text-sm whitespace-pre-line">{msg.text}</p>
            </div>
          );
        })}
        {typing && (
          <div className="max-w-[60px] bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex gap-1 items-center">
            {[0, 1, 2].map(i => (
              <div key={i} className="typing-dot w-2 h-2 rounded-full bg-gray-400"
                style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </main>
  );
}
