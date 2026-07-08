import type { Metadata } from "next";
import "./globals.css";
import AmbientAudio from "./ambient-audio";
import MetaPixel from "./meta-pixel";
import Script from "next/script";

const title = "Archivo de Identidad";
const description = "Abre tu Archivo de Identidad y descubre cómo tus primeros códigos simbólicos comienzan a revelar un mapa más profundo de ti.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ minWidth: "320px" }}>
        <Script id="clarity" strategy="afterInteractive">{`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "xjfjiflf3z");
        `}</Script>
        <MetaPixel />
        <AmbientAudio />
        {children}
      </body>
    </html>
  );
}
