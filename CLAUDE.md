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
- Cuando ella tenga que hacer algo (Make, PayPal, GitHub), dale **el paso a paso**.

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

## Mapa rápido del sitio
- `index.html` — Biblioteca del Ser (librero: libritos = calculadoras gratis; tomos = Obras Magnas de pago).
- `mapa-natal.html` — página de venta del **Mapa de Identidad Natal** ($36 USD, PayPal + formulario → Make).
- `arbol_num_basico.html` (gratis) · `arbol_num_pro.html` (de pago, $23 USD, oculto a buscadores) ·
  `arbol_numerologico.html` (redirige al Pro).
- `Calculadora_numerologia_evolutiva.html` — gratis con **acceso por correo** (`acceso-csi.js`).
- `calculadora_nombre.html`, `calculadora_palabras.html`, `numerologia.html`, `tzolkin.html`,
  `chino.html`, `ascendente.html` — calculadoras gratis.
- `acceso-csi.js` — candado por correo (gratis) y modo de pago (`data-precio`) para el Árbol Pro.
- `funnel/` → identidad.centroserintegral.org · `Funnel-anuncio/` → experiencia.centroserintegral.org
  (Vercel los publica solos al unir a `main`).
- `sitemap.xml`, `robots.txt`, `llms.txt` — mantenerlos al día cuando se agregue o quite una página.
