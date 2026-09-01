# Assets que debe llevar `public/` para este tema

Nombra los archivos exactamente así (o cambia el nombre en el código, pero
mantenlos consistentes). Todas las imágenes de fondo tipo "tarjeta" comparten
proporción 550×750 (aprox. 0.733 ancho/alto) — mantén esa proporción aunque
cambies la resolución, para no tener que retocar los porcentajes de padding
del código.

## Pantalla de llamada (`app/page.tsx`)

| Archivo | Tipo | Tamaño de referencia | Qué debe mostrar |
|---|---|---|---|
| `avatar-sabia.jpg` | foto/ilustración cuadrada | ~300×300+ | Rostro/avatar de quien "llama" |
| `splash-portada.png` | imagen vertical | 1023×1537 | Portada inicial con botón "Toca para iniciar" superpuesto abajo |
| `sabia-marcando.mp4` | video vertical 9:16 | — | Animación de "marcando" antes de que suene la llamada |
| `audio-llamada-entrante.mp3` | audio | — | Tono de llamada entrante |
| `llamada.mp3` | audio | duración = el contador en el código (31s por defecto, ajustable) | Audio de la llamada en sí |
| `pantalla-llamada-ended.mp4` | video vertical, loop | proporción 550:750 | Video de fondo tras colgar, con botón "Comenzar" superpuesto |
| `transicion-camara.mp4` | video | pantalla completa | Transición hacia la siguiente pantalla |
| `ended-audio.mp3` | audio, loop | — | Ambiente que sigue sonando de fondo en las siguientes pantallas |

## Verificación (`app/verificacion-codigos/page.tsx`)

| Archivo | Tamaño | Qué debe mostrar |
|---|---|---|
| `bg-verificacion.png` | 550×750 | Formulario: encabezado + espacio en blanco para el campo interactivo |
| `bg-triada-resultado.png` | 550×750 | Fondo de la pantalla de resultado |
| `audio-triada.mp3` | — | Narración del resultado revelado |

## Código activo / quiz (`app/codigo-activo/page.tsx`)

| Archivo | Tamaño | Qué debe mostrar |
|---|---|---|
| `bg-codigo-activo.png` | 550×750 | Fondo del quiz |
| `resultado-*.png` (uno por cada resultado posible, ver `RESULT_IMAGES`) | 1698×926 | Ilustración de cada resultado del quiz |
| `audio-codigo.mp3` | — | Narración de esta pantalla |

## Ruta de los 7 espejos (`app/ruta-7-espejos/page.tsx`)

| Archivo | Tamaño | Qué debe mostrar |
|---|---|---|
| `espejo-*.png` (uno por cada tarjeta en `MIRRORS`) | 1074×1464 | Ilustración de cada una de las 7 tarjetas del carrusel |
| `audio-espejos.mp3` | — | Narración de esta pantalla |

## Explicación principal (`app/explicacion-principal/page.tsx`)

| Archivo | Tipo | Qué debe mostrar |
|---|---|---|
| `vsl-principal.mp4` | video, con reproductor custom (play/pausa/progreso) | El video de ventas principal |

## Cierre / oferta (`app/cierre-archivo/page.tsx`)

| Archivo | Tipo | Qué debe mostrar |
|---|---|---|
| `ambiente-cierre.mp3` | audio, loop | Ambiente de esta pantalla (referenciado desde `ambient-audio.tsx`) |

## Metadata / compartidos

| Archivo | Tamaño | Qué debe mostrar |
|---|---|---|
| `og-image.jpg` | 1200×630 | Imagen de vista previa al compartir el link (WhatsApp, redes) |

## Ruta alterna: acceso por WhatsApp (si la usas)

Esta ruta (`whatsapp-acceso` → `login-feed` → `feed-privado` →
`mapa-identidad-natal`) es mayormente texto/código sin imágenes de fondo
propias — revisa cada archivo directamente. No requiere assets nuevos salvo
que quieras agregar imágenes al feed vertical de `feed-privado`.
