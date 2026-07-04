import type { Metadata } from "next";
import "./globals.css";
import AmbientAudio from "./ambient-audio";

export const metadata: Metadata = {
  title: "Mapa de Identidad Natal | Centro Ser Integral",
  description: "Una lectura simbólica personalizada que reúne tus 7 códigos de identidad.",
  openGraph: {
    title: "Mapa de Identidad Natal | Centro Ser Integral",
    description: "Una lectura simbólica personalizada que reúne tus 7 códigos de identidad.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mapa de Identidad Natal | Centro Ser Integral",
    description: "Una lectura simbólica personalizada que reúne tus 7 códigos de identidad.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ minWidth: "320px" }}>
        <AmbientAudio />
        {children}
      </body>
    </html>
  );
}
