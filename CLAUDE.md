# Instrucciones para Claude — Centro Ser Integral

Sitio: **centroserintegral.org** (GitHub Pages, este repositorio). Dueña: **Teresa** (Centro Ser Integral).

## Antes de hacer cualquier cosa
1. **Lee `PENDIENTES.md`**. Ahí está lo que ya se hizo, lo que falta y en qué quedó cada tema.
   Puede haber otras conversaciones trabajando en paralelo: revisa también los últimos
   commits de `main` (`git log origin/main`) para no repetir trabajo.
2. **Al terminar un tema, actualiza `PENDIENTES.md`** (mueve lo hecho a "Hecho", agrega lo nuevo)
   y publícalo junto con tu cambio.

## Cómo hablarle a Teresa
- No es programadora: lenguaje **sencillo, casual y claro**, en español.
- Cuando ella tenga que hacer algo (Make, PayPal, GitHub), dale **el paso a paso**:
  dónde hacer clic, qué pegar y cómo comprobar que funcionó.

## Reglas de trabajo
- **Reporte antes de cambios grandes**: si ella lo pide, muestra qué vas a cambiar y espera su "sí".
- **Publicar** = Pull Request a `main` + unirlo (merge). Solo con su permiso.
  GitHub Pages tarda 1–2 min; la caché hasta ~10 min (probar con `?v=N` o Ctrl+Shift+R).
- **No toques el código de pagos (PayPal), formularios, cálculos ni los webhooks de Make**
  salvo que ella lo pida explícitamente para ese cambio.
- **Make**: antes de cambiar un escenario que está en uso, trabaja en una **copia** (staging),
  pruébala y solo después cámbiala en producción.
- **Secretos** (Secret de PayPal, contraseñas, claves de API): **nunca** en el chat, en una página
  ni en GitHub. Solo ella los guarda dentro de Make. El Client ID de PayPal sí es público.
- Si ella sube archivos a mano en GitHub, trabaja **encima de la versión de GitHub**, no de una copia vieja.
- No pongas nombres de modelos de IA en commits ni en las páginas.

## El producto: Mapa de Identidad Natal
- Siempre se nombra completo: **"Mapa de Identidad Natal"**.
- Es una **lectura escrita y personalizada** de autoconocimiento que llega por correo en **PDF**. $36 USD.
- **NO** es un mapa gráfico, **NO** es una carta natal astrológica (la rueda con planetas y casas),
  **NO** es un mapa del tesoro. "Mapa" es en sentido figurado: una guía para conocerse.
- Cruza 7 sistemas: astrología occidental (signo y ascendente), horóscopo chino, numerología evolutiva,
  Dreamspell, calendario sagrado del Anáhuac, Arcano Mayor del Tarot y ángel kabalístico.
- Converge en: arquetipo central, misión de vida y un símbolo visual único (el sello).
- El precio del Árbol Pro ($23 USD) se eligió por ajuste numerológico: no cambiarlo.

## Regla de oro de los cálculos
Los cálculos precisos los hace **JavaScript** (módulo 11 en Make y las calculadoras del sitio).
La IA **no calcula, solo interpreta**. Si un dato parece raro, se revisa el código, nunca se "corrige" de memoria.
- Dreamspell verificado: Teresa = **Kin 187 Mano Azul Entonada**.
- Calendario Anáhuac: correlación **JD 584237** (46 días antes que GMT), verificada con el 5 Tecpatl de Teresa.
- Numerología evolutiva: Camino de Vida = Misión + Base (no la suma total de la fecha).
  Los Periodos se leen como tríada (verbo · medio · motivo), nunca como resta.
  Números ausentes: "ausente" o "enfermo", no "tecla rota".
- Para el Tzolkin, la fuente oficial es `tzolkin.html` de este sitio, no tablas externas.
- Ascendente: freeastrologyapi, con coordenadas de la API de Google Maps.

## Flujo en Make.com — escenario "Integration Webhooks" (ID 5119514)
1  Webhook: recibe los datos del formulario de `mapa-natal.html`.
2  HTTP: freeastrologyapi calcula el ascendente.
11 JavaScript: todos los cálculos.
3  Set Variables.
7  IA intérprete: genera **solo JSON**, nada de HTML.
13 IA correctora.
17 JavaScript: lee y valida el JSON; si falta un campo, detiene el escenario con error en vez de mandar un PDF incompleto.
18 Router:
   → 6  Gmail: mapa completo (todo el HTML vive aquí).
   → 20 JavaScript: prompt del sello → 21 generación de imagen del sello → 22 Gmail: envía el sello.
Hay versión en español y en inglés.

Detalles de Make:
- `parseJSON()` no existe en Tools ni Set Variables: el JSON se lee con un módulo de JavaScript.
- El módulo nativo de la IA en Make maneja mejor el JSON que un módulo HTTP.
- Protocolo del blueprint: exportar de Make → cambiar en una carpeta aparte → verificar que estén
  todos los campos → importar como escenario de prueba → reemplazar producción solo cuando funcione.

## Reglas de diseño y texto
- Colores de marca: `#1E1035` y `#C9A030`. Títulos en Cinzel Decorative.
- Texto siempre con **buen contraste** (Teresa lee mal con poco contraste).
- En el blog: lenguaje neutro (no femenino).
- En textos de resultados no se menciona a ninguna autora o fuente de los métodos; la información va interpretada.
- El Tarot es herramienta de autoconocimiento, nunca adivinación.
- Usar con mucho cuidado la palabra "karma".

## Mapa rápido del sitio
- `index.html` — Biblioteca del Ser (librero: libritos = calculadoras gratis; tomos = Obras Magnas de pago).
- `mapa-natal.html` — página de venta del **Mapa de Identidad Natal** ($36 USD, PayPal + formulario → Make).
- `arbol_num_basico.html` (gratis) · `arbol_num_pro.html` (de pago, $23 USD, oculto a buscadores) ·
  `arbol_numerologico.html` (redirige al Pro).
- `Calculadora_numerologia_evolutiva.html` — gratis con **acceso por correo** (`acceso-csi.js`).
- `calculadora_nombre.html`, `calculadora_palabras.html`, `numerologia.html`, `tzolkin.html`,
  `chino.html`, `ascendente.html` — calculadoras gratis.
- `acceso-csi.js` — candado por correo (gratis) y modo de pago (`data-precio`) para el Árbol Pro.
- `historias/` — Sala de lectura ("Las páginas que faltaban"). `blog/` — entradas por tema (astrología, tarot).
- `funnel/` → identidad.centroserintegral.org (Archivo de Identidad) · `Funnel-anuncio/` → experiencia.centroserintegral.org
  (Vercel los publica solos al unir a `main`).
- `privacidad.html` — aviso de privacidad.
- `sitemap.xml`, `robots.txt`, `llms.txt` — mantenerlos al día cuando se agregue o quite una página.
