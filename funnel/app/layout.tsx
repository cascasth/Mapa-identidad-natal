import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Archivo de Identidad | Centro Ser Integral",
  description: "Mapa de Identidad Natal — Ruta de los 7 Códigos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ minWidth: "320px" }}>{children}</body>
    </html>
  );
}
