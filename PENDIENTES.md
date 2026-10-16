# Pendientes — Centro Ser Integral

_Última actualización: 16-oct-2026_

Cada conversación de Claude lee este archivo al empezar y lo actualiza al terminar.

---

## 🔴 Pendiente ahora

### 🗺️ Mapa natal
- [ ] **Confirmar la primera venta real** con el Portero nuevo: que llegue el mapa a la persona
      y que la orden quede anotada en Make (Data store "CSI · Pagos verificados").
      Cuando llegue, Teresa avisa y se revisa la ejecución en Make.

### 🌳 Árbol Pro
- [ ] **Confirmar la primera venta real** ($23 USD): que la persona reciba su acceso por correo
      y pueda abrir `arbol_num_pro.html`.

### 📚 Página principal (index) — conversación "Página principal"
- [ ] **Blog**: la repisa ya se llama "Blog" pero todavía es decorativa. Falta crear la página del blog
      y los primeros artículos (signos y ascendentes, cada día del Tzolkin, artículos informativos).
      Idea: cada post de redes lleva a su artículo con "lee más en el blog".
- [ ] **Sala de lectura = historias cortas de ficción** (para atraer desde Facebook/Instagram e invitar al Mapa).
      Primera serie: **"Las páginas que faltaban"**, 3 partes, **una por semana**.
      Plan: un libro por serie en la repisa → página de la serie con portada (foto de libro, ya la tiene Teresa)
      y sus partes; cada parte con su propia página (link directo para redes), imágenes de IA,
      botón "Sigue leyendo" y al final invitación al Mapa (más fuerte en la Parte 3).
      Las partes que no han salido dicen "Próximamente". Falta: texto, portada e imágenes de la Parte 1.
- [ ] Idea segunda etapa: "Avísame cuando salga la siguiente parte" (correo, con Make).
- [ ] Más adelante: archivos para miembros.

### 🧹 Orden general
- [ ] **Teresa borra a mano** (Claude no tiene permiso) estas ramas viejas en GitHub → pestaña
      *Branches* → ícono de basura: `backup-mayo26-v1`, `new-faeture`, `claude/zealous-planck-rvb0r6`,
      `claude/funnel-copy-changes-sa71vm`, `claude/paypal-mapa` (botón de PayPal que ya no se usa).
      Ya aprobó borrarlas el 16-oct. No afectan la página publicada.
- [ ] Escenarios viejos apagados en Make (respaldos de mayo y septiembre, "sin img"). Decidir si se borran.

---

## 💡 Ideas para después
- Pedir a quienes dan testimonio permiso para usar nombre + inicial (ya se hizo con los 5 actuales).

---

## ✅ Hecho (lo más reciente arriba)

**16-oct**
- Página principal: la Numerología Evolutiva Personal pasó al **Estante abierto** (la Sala de lectura queda
  libre para las historias); el Árbol Pro se agregó al catálogo de texto.
- Página principal: repisa "Archivo Antiguo" → **Blog**; tomo sellado ahora dice solo **"Próximamente"**;
  en la Sala de lectura la Numerología Evolutiva Personal dice **"Gratis con tu correo"**.
- Mapa: testimonio nuevo de **Lucila O.** (tarjeta destacada) y nombres en todos los testimonios
  (Ángeles H., María G., María O., Lucila O.).
- Porteros de Make: ya no mandan aviso por pedidos vacíos de robots; solo avisan si el pedido trae correo.
- "Validar link" de Make: arreglado un error que impedía abrir enlaces de acceso (desde el 14-oct).

**13–14 oct**
- **Portero del Mapa** (Make): revisa con PayPal que la orden esté cobrada y no usada antes,
  y solo entonces pasa el pedido al escenario que genera el mapa. La página del Mapa ya le manda
  el número de orden.
- **Árbol Pro de pago** ($23 USD): tarjeta de compra con PayPal, Portero en Make que verifica el pago
  y manda la llave de acceso; ejemplos de un árbol en la tarjeta; tomo en el librero.

**9 oct**
- Acceso por correo solo en la **Numerología Evolutiva Personal** (la del Nombre quedó libre).
- Árbol Básico (gratis) publicado y al día con el Pro; leyenda de (K), (D) y maestros en la del Nombre.

**8 oct**
- Biblioteca reorganizada, nombres oficiales, menús, botones al Mapa, SEO y sitemap.
- Mapa: el formulario solo se abre con el pago confirmado por PayPal (se quitó el atajo `?pagado=si`).

---

## 📌 Datos de referencia (sin secretos)

**Make** (zona us2) — escenarios activos:
| Escenario | Para qué |
|---|---|
| Mapa Natal · Portero (verifica pago PayPal) | Recibe el pedido de la página del Mapa, verifica el pago y lo pasa al generador |
| Integration Webhooks Mapa Natal | Genera el mapa (Claude, imagen, PDF) y lo manda por correo |
| Árbol Pro · Portero (verifica pago y da acceso) | Verifica el pago del Árbol Pro y manda la llave |
| CSI · Acceso · Enviar link | Manda por correo el enlace de acceso a calculadoras |
| CSI · Acceso · Validar link | Revisa que la llave del enlace sea válida |

Data stores: **CSI · Accesos calculadoras** (llaves de acceso) · **CSI · Pagos verificados**
(órdenes de PayPal ya usadas, para que no se repitan).

**Precios**: Mapa $36 USD · Árbol Pro $23 USD.
