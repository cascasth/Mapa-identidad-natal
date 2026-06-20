"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function LoginFeedPage() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    if (password === "CODIGO7") {
      setError(false);
      setSuccess(true);
    } else {
      setError(true);
    }
  };

  const bg = "linear-gradient(160deg, #0a0c1a 0%, #0d1020 60%, #1a1408 100%)";

  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ background: bg }}>
      <div className="animate-fade-in w-full max-w-xs mx-auto flex flex-col gap-6">

        <div className="text-center">
          <div className="w-16 h-16 rounded-full border border-amber-400/30 flex items-center justify-center mx-auto mb-4">
            <span className="text-amber-300 text-xl font-light">⬡</span>
          </div>
          <h1 className="text-white text-xl font-light">Archivo de Identidad</h1>
          <p className="text-slate-400 text-sm mt-1">Feed privado de los 7 códigos</p>
        </div>

        <div className="rounded-3xl border border-amber-400/20 bg-slate-900/80 p-6 flex flex-col gap-4 shadow-2xl">
          {!success ? (
            <>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Usuario</label>
                <input type="text" placeholder="Correo o nombre" value={usuario}
                  onChange={e => setUsuario(e.target.value)}
                  className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-amber-400/50" />
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Contraseña</label>
                <div className="relative">
                  <input type={showPass ? "text" : "password"} placeholder="Código de acceso"
                    value={password} onChange={e => { setPassword(e.target.value); setError(false); }}
                    className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 pr-12 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-amber-400/50" />
                  <button type="button" onClick={() => setShowPass(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-slate-500 text-xs mt-1">Usa el código que recibiste por WhatsApp.</p>
              </div>

              {error && (
                <p className="text-red-400 text-xs animate-fade-in">El código no coincide. Revisa el mensaje y vuelve a intentarlo.</p>
              )}

              <button onClick={handleLogin}
                className="w-full py-4 rounded-2xl text-sm tracking-wide active:scale-95 transition-all"
                style={{ background: "linear-gradient(135deg, rgba(180,130,40,0.4), rgba(180,130,40,0.2))", border: "1px solid rgba(180,130,40,0.3)", color: "#e8c87a" }}>
                Entrar al feed privado
              </button>
            </>
          ) : (
            <div className="animate-fade-in text-center flex flex-col gap-4">
              <p className="text-emerald-400 text-sm">Acceso confirmado.</p>
              <p className="text-slate-400 text-sm">Feed privado disponible.</p>
              <button onClick={() => router.push("/feed-privado")}
                className="w-full py-4 rounded-2xl text-sm tracking-wide active:scale-95 transition-all"
                style={{ background: "linear-gradient(135deg, rgba(180,130,40,0.4), rgba(180,130,40,0.2))", border: "1px solid rgba(180,130,40,0.3)", color: "#e8c87a" }}>
                Ver videos
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
