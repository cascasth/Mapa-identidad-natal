# Esqueleto de funnel — guía de adaptación

Esta es la versión "pelada" del funnel de Archivo de Identidad: mismo código y
mecánica (pantallas, temporizadores, audio, tracking), sin ningún contenido
del tema original. Los archivos multimedia (`public/`) se quitaron a propósito
— casi todo el "contenido" real de este funnel vive en imágenes, video y audio,
no en texto plano, así que hay que producirlos de nuevo para cada tema.

## Cómo está armado

Es un state machine de pantallas en Next.js (App Router). Cada pantalla es una
ruta (`app/<ruta>/page.tsx`) y navega a la siguiente con `router.push(...)`.
No hay base de datos ni backend: todo vive en el navegador del usuario durante
esa sesión.

```
/                     Simulación de llamada de WhatsApp (splash → intro → 
                       llamada entrante → llamada activa → terminada → 
                       transición) → redirige a /verificacion-codigos
/verificacion-codigos Captura un dato del usuario (antes: signo zodiacal) y
                       revela un primer resultado → /codigo-activo
/codigo-activo        Mini quiz (preguntas A–E) → resultado personalizado
                       según la respuesta más repetida → /ruta-7-espejos
/ruta-7-espejos        Carrusel de 7 tarjetas temáticas → /explicacion-principal
/explicacion-principal Video de ventas (VSL) con reproductor custom →
                       /cierre-archivo
/cierre-archivo        Slides finales + oferta + botón de pago externo
                       (trackea Lead y InitiateCheckout)
```

Ruta alterna (no conectada desde la anterior — pensada para tráfico que llega
por otro lado, ej. link en bio o DM):

```
/whatsapp-acceso  Chat simulado de WhatsApp entregando un "acceso" →
/login-feed       Login falso (la contraseña vive hardcodeada en el código,
                   ver más abajo) →
/feed-privado     Feed vertical estilo TikTok con clips de texto →
/mapa-identidad-natal  Página de venta larga (qué incluye, cómo funciona,
                   para quién es, FAQ, CTA de pago)
```

Verifica si esta ruta alterna aplica a tu nuevo tema antes de invertir tiempo
adaptándola — bórrala si no la vas a usar.

## Piezas compartidas (no tocar la mecánica, solo los valores)

- `app/layout.tsx` — Meta Pixel + Microsoft Clarity, cargados una vez para
  todo el sitio. Metadata de Open Graph/Twitter.
- `app/meta-pixel.tsx` — `trackEvent(nombre, params?)` para eventos custom
  (ya se usa `Lead` e `InitiateCheckout` en `cierre-archivo`).
- `app/audio-store.ts` + `app/ambient-audio.tsx` — audio ambiente persistente
  que suena de fondo en varias pantallas, se sube/baja de volumen según la
  página, y se pausa/retoma solo. No necesitas tocar esto salvo para ajustar
  qué páginas llevan ambiente y a qué volumen (arrays al inicio de
  `ambient-audio.tsx`).

## Valores a configurar (buscar `[` en el código para encontrarlos todos)

| Marcador | Dónde | Qué poner |
|---|---|---|
| `[NOMBRE_DEL_NEGOCIO]` | `page.tsx`, `whatsapp-acceso/page.tsx` | Nombre que aparece como "contacto" en la simulación de llamada/chat |
| `[NOMBRE_DEL_PRODUCTO]` | `layout.tsx`, `login-feed/page.tsx`, `cierre-archivo/page.tsx` | Nombre del producto/lectura que se está vendiendo |
| `[TU-DOMINIO]` | `mapa-identidad-natal/page.tsx`, `cierre-archivo/page.tsx` | URL de pago a la que llevan los botones finales |
| `[TU-SUBDOMINIO-VERCEL]` | `layout.tsx` | El subdominio real donde quede publicado (para `metadataBase`, Open Graph) |
| `TU_PIXEL_ID` | `layout.tsx`, `meta-pixel.tsx` | ID del Meta Pixel de la cuenta de anuncios que vaya a correr este funnel |
| `TU_CLARITY_ID` | `layout.tsx` | ID de proyecto de Microsoft Clarity |

También hay una contraseña hardcodeada `"CODIGO7"` en `whatsapp-acceso/page.tsx`
y `login-feed/page.tsx` — cámbiala si usas esa ruta alterna (búscala con grep,
son las dos únicas ocurrencias).

## Dónde vive el contenido de cada tema (arrays de datos, no prosa suelta)

Buena noticia: las pantallas con más contenido ya tienen el texto separado en
arrays al inicio del archivo, no repartido por todo el JSX. Edita estos:

- `codigo-activo/page.tsx` → `QUESTIONS` (preguntas del quiz), `RESULTS`
  (título/cuerpo/CTA por resultado A–E), `RESULT_IMAGES`, `LOADING_TEXTS`.
- `ruta-7-espejos/page.tsx` → `MIRRORS` (7 objetos: nombre, descripción,
  ícono de lucide-react, imagen, cuerpo, pregunta reflexiva).
- `cierre-archivo/page.tsx` → `SLIDES` (secuencia de pantallas finales).
- `mapa-identidad-natal/page.tsx` → `CODES`, `INCLUDES`, `HOW`, `FOR_WHO` (y
  el resto de la página de venta larga).
- `whatsapp-acceso/page.tsx` → `MESSAGES` (guion del chat simulado).
- `verificacion-codigos/page.tsx` → la función que mapea la elección del
  usuario a un resultado (`getSignInfo` en el original — busca el mismo
  patrón, es donde vive la lógica de "dato de entrada → resultado").

El resto de las pantallas (`page.tsx`, `explicacion-principal/page.tsx`,
`login-feed/page.tsx`, `feed-privado/page.tsx`) tienen menos texto y está
directo en el JSX — revísalas pantalla por pantalla.

## Assets que hay que producir por tema

Ver `public/ASSETS.md` — lista cada archivo esperado, sus dimensiones y qué
debe transmitir. La mayoría de las pantallas usan una imagen de fondo vertical
(550×750) con el texto ya "horneado" en el diseño — el código solo agrega
el campo interactivo (input, botón) encima con padding.

## La técnica de posicionamiento sobre imagen de fondo

Varias tarjetas usan este patrón:

```tsx
<div style={{
  backgroundImage: "url('/tu-imagen.png')",
  backgroundSize: "cover",
  backgroundPosition: "top center",
  paddingTop: "58%",   // empuja el contenido hacia abajo, como % del ANCHO de la tarjeta
  paddingBottom: "50%", // ancla la altura total de la tarjeta a la imagen completa
}}>
  {/* campos/botones */}
</div>
```

Puntos clave que costó trabajo aprender la primera vez:
- Los porcentajes de `padding` son siempre relativos al **ancho** del elemento
  (regla CSS), nunca a su alto — así que puedes calcular la posición exacta
  como % del ancho de la imagen, conociendo sus dimensiones naturales.
- Con `backgroundSize: cover`, si la tarjeta queda más angosta que alta
  respecto a la imagen, la escala se fija por el ancho y el recorte ocurre
  por abajo. Si achicas mucho `paddingTop` para acercar el contenido al
  texto, la tarjeta se vuelve más corta y **recorta la imagen antes de
  mostrarla completa** — se ve "cortada" en vez de a pantalla completa. Por
  eso el patrón usa `paddingBottom` grande: no es para dejar espacio después
  del botón porque haga falta, es para que la tarjeta conserve la proporción
  natural de la imagen (ancho/alto) y se muestre completa.
- Como la tarjeta suele estar centrada verticalmente en el viewport
  (`min-h-screen flex items-center justify-center`), cambiar el padding total
  mueve la tarjeta completa en la pantalla, no solo el contenido dentro de
  ella — por eso conviene probar los valores visualmente (con capturas reales
  contra la imagen final) en vez de calcular a ciegas.

## Puesta en marcha

```bash
npm install
npm run dev
```

Para desplegar en un subdominio nuevo apuntando a Vercel, ver la explicación
genérica que ya quedó documentada en la conversación con Claude (DNS: CNAME
del subdominio → `cname.vercel-dns.com`, luego agregar el dominio en
Vercel → Settings → Domains del proyecto).
