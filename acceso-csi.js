/* ════════════════════════════════════════════════════════════════
   Acceso por correo · Calculadoras de Centro Ser Integral
   ────────────────────────────────────────────────────────────────
   Se carga en el <head> de cada calculadora:
     <script src="acceso-csi.js" data-calculadora="evolutiva"></script>
   (clave: "evolutiva" o "nombre"). Un solo acceso abre las dos.

   Flujo:
   1. Si la dirección trae ?acceso=TOKEN, se valida con Make y, si es
      válido, se guarda en este navegador y se desbloquea.
   2. Si ya hay un acceso guardado, se desbloquea directo.
   3. Si no, se muestra la tarjeta para pedir la llave por correo.
   ════════════════════════════════════════════════════════════════ */
(function () {
  var WEBHOOK_ENVIAR  = 'https://hook.us2.make.com/fkesf3o7d7hvx7hv1sk61evcefth522g';
  var WEBHOOK_VALIDAR = 'https://hook.us2.make.com/vz3wnjkypdqpqxk6x29ygssyoqmijora';
  var CLAVE = 'csi_acceso';
  var CORREO_CONTACTO = 'centro.ser.integral@gmail.com';

  var script = document.currentScript;
  var CALCULADORA = (script && script.getAttribute('data-calculadora')) || 'evolutiva';
  var raiz = document.documentElement;

  /* ── memoria del navegador (puede fallar en modo privado) ── */
  function leerAcceso() {
    try { var v = JSON.parse(localStorage.getItem(CLAVE) || 'null'); return v && v.token ? v : null; }
    catch (e) { return null; }
  }
  function guardarAcceso(token) {
    try { localStorage.setItem(CLAVE, JSON.stringify({ token: token, fecha: new Date().toISOString().slice(0, 10) })); }
    catch (e) { /* modo privado: queda abierta solo en esta visita */ }
  }
  function borrarAcceso() {
    try { localStorage.removeItem(CLAVE); } catch (e) {}
  }

  var params = new URLSearchParams(location.search);
  var tokenUrl = (params.get('acceso') || '').trim();

  /* Bloquear desde el principio para que no se vea la calculadora un instante */
  if (tokenUrl || !leerAcceso()) raiz.classList.add('csi-bloqueado');

  /* ── estilos de la tarjeta ── */
  var css = [
    'html.csi-bloqueado .app > :not(h1):not(.sub):not(#csi-acceso){display:none!important}',
    '#csi-acceso{display:none;max-width:520px;margin:6px auto 26px;padding:28px 26px 24px;background:#fffdf8;border:1px solid #e8dcc0;border-top:4px solid #c9a84c;border-radius:16px;box-shadow:0 8px 24px rgba(61,32,96,.10);text-align:center;color:#4a3e5a;font-family:Georgia,"Times New Roman",serif}',
    'html.csi-bloqueado #csi-acceso{display:block}',
    '#csi-acceso h2{font-family:"Cinzel",Georgia,serif;font-weight:500;font-size:20px;letter-spacing:.04em;color:#3d2060;margin:0 0 10px;text-transform:none}',
    '#csi-acceso p{font-size:15px;line-height:1.6;margin:0 0 14px}',
    '#csi-acceso .csi-aviso{background:#fdf1e6;border:1px solid #e9c6a3;color:#7a3e14;border-radius:10px;padding:10px 12px;font-size:14px;margin:0 0 16px;text-align:left}',
    '#csi-acceso input[type=email]{width:100%;box-sizing:border-box;padding:12px 14px;border:1.5px solid #d9c9ef;border-radius:10px;font-size:16px;font-family:Arial,Helvetica,sans-serif;background:#fff;color:#3d2060;margin:2px 0 12px}',
    '#csi-acceso input[type=email]:focus{outline:none;border-color:#c9a84c;box-shadow:0 0 0 3px rgba(201,168,76,.2)}',
    '#csi-acceso label.csi-check{display:flex;gap:10px;align-items:flex-start;text-align:left;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.5;color:#5a4a6a;margin:0 0 14px;cursor:pointer;text-transform:none;letter-spacing:normal;font-weight:400}',
    '#csi-acceso label.csi-check input{margin-top:3px;flex:0 0 auto;width:16px;height:16px;accent-color:#3d2060}',
    '#csi-acceso a{color:#a8842e}',
    '#csi-acceso .csi-btn{display:inline-block;padding:12px 30px;background:linear-gradient(135deg,#3d2060,#2a7f7f);border:1px solid rgba(201,168,76,.35);border-radius:26px;color:#f5f0e8;font-family:"Cinzel",Georgia,serif;font-size:.85rem;letter-spacing:.12em;cursor:pointer;transition:transform .15s,box-shadow .2s,opacity .2s}',
    '#csi-acceso .csi-btn:hover{transform:translateY(-1px);box-shadow:0 10px 30px rgba(61,32,96,.35)}',
    '#csi-acceso .csi-btn[disabled]{opacity:.6;cursor:wait;transform:none;box-shadow:none}',
    '#csi-acceso .csi-error{color:#a12c2c;font-family:Arial,Helvetica,sans-serif;font-size:13px;margin:-4px 0 12px;text-align:left;min-height:0}',
    '#csi-acceso .csi-nota{font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#8a7a9a;margin:14px 0 0}',
    '#csi-acceso .csi-ayuda{font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#6d5a78;background:#f6f0ff;border-radius:10px;padding:10px 12px;margin:4px 0 16px}',
    '#csi-acceso .csi-link{background:none;border:none;padding:0;color:#a8842e;text-decoration:underline;font-family:Arial,Helvetica,sans-serif;font-size:13px;cursor:pointer}',
    '#csi-acceso .csi-cargando{font-family:"Cinzel",Georgia,serif;color:#3d2060;letter-spacing:.06em;margin:8px 0}',
    '.csi-otra-compu{text-align:center;margin:18px auto 0;font-family:Arial,Helvetica,sans-serif;font-size:12px}',
    '.csi-otra-compu button{background:none;border:none;padding:0;color:#8a7a9a;text-decoration:underline;cursor:pointer;font-size:12px}',
    'html.csi-bloqueado .csi-otra-compu{display:none}',
    '@media (max-width:480px){#csi-acceso{padding:22px 16px 20px;border-radius:14px}#csi-acceso h2{font-size:18px}}',
    '@media print{#csi-acceso,.csi-otra-compu{display:none!important}}'
  ].join('\n');
  var estilo = document.createElement('style');
  estilo.textContent = css;
  (document.head || raiz).appendChild(estilo);

  /* ── la tarjeta ── */
  var caja;
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function pantallaFormulario(avisoInvalido, correoPrevio) {
    caja.innerHTML =
      '<h2>Tu calculadora gratuita te espera</h2>' +
      (avisoInvalido ? '<p class="csi-aviso" role="alert">Este enlace ya no funciona o está incompleto. Escribe tu correo y te enviamos uno nuevo.</p>' : '') +
      '<p>Escribe tu correo y te enviamos tu llave de acceso. Es gratis y es tuya para siempre: con ella abres también la Calculadora del Nombre.</p>' +
      '<form novalidate>' +
        '<input type="email" name="email" autocomplete="email" inputmode="email" placeholder="tucorreo@ejemplo.com" required value="' + esc(correoPrevio || '') + '">' +
        '<div class="csi-error" data-error="email" hidden></div>' +
        '<label class="csi-check"><input type="checkbox" name="consentimiento" required>' +
          '<span>Acepto recibir correos de Centro Ser Integral y he leído el <a href="privacidad.html" target="_blank" rel="noopener">aviso de privacidad</a>.</span></label>' +
        '<div class="csi-error" data-error="check" hidden></div>' +
        '<div class="csi-error" data-error="envio" hidden></div>' +
        '<button type="submit" class="csi-btn">Enviarme mi acceso ✦</button>' +
      '</form>' +
      '<p class="csi-nota">Sin spam. Puedes darte de baja cuando quieras.</p>';

    var form = caja.querySelector('form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = form.email.value.trim();
      var ok = true;
      mostrarError('email', '');
      mostrarError('check', '');
      mostrarError('envio', '');
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { mostrarError('email', 'Revisa tu correo, parece que le falta algo.'); ok = false; }
      if (!form.consentimiento.checked) { mostrarError('check', 'Para enviarte tu acceso necesitamos tu autorización.'); ok = false; }
      if (!ok) return;
      enviarCorreo(email, form.querySelector('button'));
    });
  }

  function mostrarError(cual, texto) {
    var el = caja.querySelector('[data-error="' + cual + '"]');
    if (!el) return;
    el.textContent = texto;
    el.hidden = !texto;
  }

  function enviarCorreo(email, boton) {
    var textoBoton = boton ? boton.textContent : '';
    if (boton) { boton.disabled = true; boton.textContent = 'Enviando tu llave…'; }
    fetch(WEBHOOK_ENVIAR, {
      method: 'POST',
      body: new URLSearchParams({ email: email, calculadora: CALCULADORA, consentimiento: 'si' })
    }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.text();
    }).then(function () {
      pantallaConfirmacion(email);
    }).catch(function () {
      if (boton) { boton.disabled = false; boton.textContent = textoBoton; }
      mostrarError('envio', 'No pudimos enviar tu correo en este momento. Intenta de nuevo en un minuto o escríbenos a ' + CORREO_CONTACTO + '.');
    });
  }

  function pantallaConfirmacion(email) {
    caja.innerHTML =
      '<h2>¡Listo! Revisa tu correo ✦</h2>' +
      '<p>Te enviamos tu llave a <strong>' + esc(email) + '</strong>. Abre el correo y da clic en «Abrir mi calculadora».</p>' +
      '<p class="csi-ayuda">¿No lo ves en unos minutos? Busca en Promociones o Spam y márcalo como «No es spam», así te llegarán bien los siguientes.</p>' +
      '<div class="csi-error" data-error="envio" hidden></div>' +
      '<p><button type="button" class="csi-btn" data-reenviar hidden>Reenviar correo</button></p>' +
      '<p><button type="button" class="csi-link" data-otro>Usar otro correo</button></p>';
    var reenviar = caja.querySelector('[data-reenviar]');
    setTimeout(function () { reenviar.hidden = false; }, 60000);
    reenviar.addEventListener('click', function () {
      enviarCorreo(email, reenviar);
    });
    caja.querySelector('[data-otro]').addEventListener('click', function () { pantallaFormulario(false, ''); });
  }

  function desbloquear() {
    raiz.classList.remove('csi-bloqueado');
  }

  function quitarTokenDeLaDireccion() {
    try {
      params.delete('acceso');
      var q = params.toString();
      history.replaceState(null, '', location.pathname + (q ? '?' + q : '') + location.hash);
    } catch (e) {}
  }

  function validar(token) {
    caja.innerHTML = '<p class="csi-cargando">Abriendo tu calculadora…</p>';
    fetch(WEBHOOK_VALIDAR, { method: 'POST', body: new URLSearchParams({ token: token }) })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        quitarTokenDeLaDireccion();
        if (d && (d.ok === true || d.ok === 'true')) { guardarAcceso(token); desbloquear(); }
        else { borrarAcceso(); pantallaFormulario(true, ''); }
      })
      .catch(function () {
        quitarTokenDeLaDireccion();
        /* Si ya había un acceso guardado, no se lo quitamos por una falla de red */
        if (leerAcceso()) { desbloquear(); return; }
        pantallaFormulario(true, '');
      });
  }

  function iniciar() {
    var app = document.querySelector('.app');
    if (!app) { desbloquear(); return; }

    caja = document.createElement('section');
    caja.id = 'csi-acceso';
    caja.setAttribute('aria-live', 'polite');
    var sub = app.querySelector('.sub') || app.querySelector('h1');
    if (sub && sub.nextSibling) app.insertBefore(caja, sub.nextSibling); else app.insertBefore(caja, app.firstChild);

    /* Link al pie: volver a pedir el acceso */
    var pie = document.createElement('p');
    pie.className = 'csi-otra-compu';
    pie.innerHTML = '<button type="button">¿Usas otra computadora? Pide tu acceso de nuevo</button>';
    app.parentNode.insertBefore(pie, app.nextSibling);
    pie.querySelector('button').addEventListener('click', function () {
      borrarAcceso();
      raiz.classList.add('csi-bloqueado');
      pantallaFormulario(false, '');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    if (tokenUrl) validar(tokenUrl);
    else if (leerAcceso()) desbloquear();
    else pantallaFormulario(false, '');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
