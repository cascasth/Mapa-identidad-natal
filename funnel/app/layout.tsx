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
      <head>
        {/* Meta Pixel — en <head> para capturar rebotes tempranos */}
        <Script id="meta-pixel" strategy="beforeInteractive">{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1389833309683131');
          fbq('track', 'PageView');
        `}</Script>
        <noscript>
          <img height="1" width="1" style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1389833309683131&ev=PageView&noscript=1"
            alt="" />
        </noscript>
      </head>
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
