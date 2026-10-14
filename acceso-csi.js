/* ════════════════════════════════════════════════════════════════
   Acceso por correo · Calculadoras de Centro Ser Integral
   ────────────────────────────────────────────────────────────────
   Se carga en el <head> de la calculadora protegida:
     <script src="acceso-csi.js" data-calculadora="evolutiva"></script>
   Gratis con correo: Numerología Evolutiva Personal.
   De pago (PayPal):  Árbol Familiar Pro
     <script src="acceso-csi.js" data-calculadora="arbol_pro"
             data-contenedor="main" data-precio="23"></script>

   Flujo:
   1. Si la dirección trae ?acceso=TOKEN, se valida con Make y, si es
      válido, se guarda en este navegador y se desbloquea.
   2. Si ya hay un acceso guardado, se desbloquea directo
      (en las de pago se vuelve a validar con Make en cada visita).
   3. Si no, se muestra la tarjeta para pedir la llave por correo
      o, en las de pago, para comprar el acceso con PayPal.
   ════════════════════════════════════════════════════════════════ */
(function () {
  var WEBHOOK_ENVIAR  = 'https://hook.us2.make.com/fkesf3o7d7hvx7hv1sk61evcefth522g';
  var WEBHOOK_VALIDAR = 'https://hook.us2.make.com/vz3wnjkypdqpqxk6x29ygssyoqmijora';
  /* Make "Árbol Pro · Portero": revisa el pago con PayPal y da el acceso */
  var WEBHOOK_PAGO    = 'https://hook.us2.make.com/tau5ce36ko4ofyo6oyl91map4j3h0asy';
  /* Client ID público de la app de PayPal (el Secret vive solo en Make) */
  var PAYPAL_CLIENT_ID = 'BAAPfwGc_cJM74NGV9DiaOVsTMVN8Ymzv87o-0JT8SUdZIIHmQ6RsTufVm-HXgkVo-BDJ3sMLqAxmR6OyI';
  var CORREO_CONTACTO = 'centro.ser.integral@gmail.com';

  var script = document.currentScript;
  function atributo(nombre, porDefecto) { return (script && script.getAttribute(nombre)) || porDefecto; }
  var CALCULADORA = atributo('data-calculadora', 'evolutiva');
  var CONTENEDOR  = atributo('data-contenedor', '.app');
  var PRECIO      = atributo('data-precio', '');          // vacío = gratis con correo
  var DE_PAGO     = !!PRECIO;
  var NOMBRES = { evolutiva: 'Numerología Evolutiva Personal', arbol_pro: 'Árbol Numerológico Familiar · Pro' };
  var NOMBRE  = NOMBRES[CALCULADORA] || 'calculadora';
  /* Cada calculadora guarda su propio acceso (la Evolutiva conserva la clave original) */
  var CLAVE = CALCULADORA === 'evolutiva' ? 'csi_acceso' : 'csi_acceso_' + CALCULADORA;
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
  if (tokenUrl || !leerAcceso() || DE_PAGO) raiz.classList.add('csi-bloqueado');

  /* ── estilos de la tarjeta ── */
  var css = [
    'html.csi-bloqueado ' + CONTENEDOR + ' > :not(h1):not(.sub):not(#csi-acceso){display:none!important}',
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
    '#csi-acceso .csi-precio{font-family:"Cinzel",Georgia,serif;font-size:30px;color:#3d2060;margin:4px 0 2px}',
    '#csi-acceso .csi-precio small{display:block;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#8a7a9a;letter-spacing:normal;margin-top:2px}',
    '#csi-acceso ul.csi-incluye{text-align:left;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.7;color:#4a3e5a;margin:6px auto 18px;padding-left:20px;max-width:400px}',
    '#csi-acceso.csi-con-muestra{max-width:760px}',
    '#csi-acceso .csi-muestra-titulo{font-family:"Cinzel",Georgia,serif;font-size:15px;color:#3d2060;letter-spacing:.04em;margin:4px 0 10px}',
    '#csi-acceso .csi-galeria{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:0 0 6px}',
    '#csi-acceso .csi-galeria figure{margin:0;cursor:zoom-in}',
    '#csi-acceso .csi-galeria img{display:block;width:100%;height:120px;object-fit:cover;object-position:left top;border-radius:10px;border:1px solid #e0d2f5;box-shadow:0 3px 10px rgba(61,32,96,.10);background:#fff;transition:transform .15s}',
    '#csi-acceso .csi-galeria figure:hover img{transform:translateY(-2px)}',
    '#csi-acceso .csi-galeria figcaption{font-family:Arial,Helvetica,sans-serif;font-size:11.5px;line-height:1.35;color:#6d5a78;margin-top:6px}',
    '#csi-acceso .csi-muestra-nota{font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#9a8aa8;margin:2px 0 20px}',
    '@media (max-width:640px){#csi-acceso .csi-galeria{grid-template-columns:repeat(2,1fr)}#csi-acceso .csi-galeria img{height:110px}}',
    '.csi-visor{position:fixed;inset:0;z-index:9999;background:rgba(13,11,20,.88);display:flex;align-items:center;justify-content:center;padding:16px;cursor:zoom-out}',
    '.csi-visor img{max-width:100%;max-height:100%;border-radius:10px;box-shadow:0 10px 40px rgba(0,0,0,.5);background:#fff}',
    '.csi-visor button{position:absolute;top:12px;right:14px;background:rgba(255,255,255,.15);color:#fff;border:none;border-radius:50%;width:40px;height:40px;font-size:22px;cursor:pointer}',
    '#csi-acceso .csi-paypal{margin:8px auto 4px;max-width:340px;min-height:50px}',
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
      '<p>Escribe tu correo y te enviamos tu llave de acceso. Es gratis y es tuya para siempre.</p>' +
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

  /* ── Compra con PayPal (calculadoras de pago) ── */
  function pantallaCompra(avisoInvalido) {
    caja.innerHTML =
      '<h2>' + esc(NOMBRE) + '</h2>' +
      (avisoInvalido ? '<p class="csi-aviso" role="alert">Este enlace de acceso no es válido para esta calculadora. Si ya compraste, abre el enlace de tu correo de compra o escríbenos a ' + esc(CORREO_CONTACTO) + '.</p>' : '') +
      '<div class="csi-precio">$' + esc(PRECIO) + ' USD<small>Pago único · acceso para siempre</small></div>' +
      '<ul class="csi-incluye">' +
        '<li>Tu árbol hasta bisabuelos, por el lado de papá y de mamá</li>' +
        '<li>Misión, mente, corazón, base, sombra, camino, fases y periodos de cada persona</li>' +
        '<li>Resumen de los números que se repiten en tu linaje</li>' +
        '<li>Guarda tu árbol en Excel y descárgalo en PDF</li>' +
      '</ul>' +
      '<div data-muestra></div>' +
      '<p>Escribe tu correo: ahí te llega tu enlace de acceso.</p>' +
      '<form novalidate>' +
        '<input type="email" name="email" autocomplete="email" inputmode="email" placeholder="tucorreo@ejemplo.com" required>' +
        '<div class="csi-error" data-error="email" hidden></div>' +
        '<label class="csi-check"><input type="checkbox" name="consentimiento" required>' +
          '<span>Acepto recibir correos de Centro Ser Integral y he leído el <a href="privacidad.html" target="_blank" rel="noopener">aviso de privacidad</a>.</span></label>' +
        '<div class="csi-error" data-error="check" hidden></div>' +
      '</form>' +
      '<div class="csi-paypal" id="csi-paypal"><p class="csi-cargando">Cargando PayPal…</p></div>' +
      '<div class="csi-error" data-error="envio" hidden></div>' +
      '<p class="csi-nota">Botón amarillo: paga con tu cuenta de PayPal · Botón negro: paga con tarjeta, sin cuenta.<br>' +
      '¿Ya compraste? Abre el enlace de tu correo de compra o escríbenos a <a href="mailto:' + esc(CORREO_CONTACTO) + '">' + esc(CORREO_CONTACTO) + '</a>.</p>';
    ponerMuestra();
    cargarPaypal(function (ok) {
      var cont = caja.querySelector('#csi-paypal');
      if (!cont) return;
      if (!ok) {
        cont.innerHTML = '<p class="csi-aviso" role="alert">No pudimos cargar PayPal. Recarga la página o desactiva tu bloqueador de anuncios. Si sigue, escríbenos a ' + esc(CORREO_CONTACTO) + '.</p>';
        return;
      }
      cont.innerHTML = '';
      window.paypal.Buttons({
        style: { layout: 'vertical', shape: 'pill', label: 'pay' },
        onClick: function (data, actions) {
          return datosCompraValidos() ? actions.resolve() : actions.reject();
        },
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [{ description: NOMBRE, amount: { currency_code: 'USD', value: Number(PRECIO).toFixed(2) } }],
            application_context: { shipping_preference: 'NO_SHIPPING' }
          });
        },
        onApprove: function (data, actions) {
          caja.querySelector('#csi-paypal').innerHTML = '<p class="csi-cargando">Confirmando tu pago…</p>';
          return actions.order.capture().then(function () {
            activarCompra(data.orderID);
          });
        },
        onError: function () {
          mostrarError('envio', 'PayPal no pudo completar el pago. No se hizo ningún cargo. Intenta de nuevo o escríbenos a ' + CORREO_CONTACTO + '.');
        }
      }).render('#csi-paypal');
    });
  }

  /* Ejemplos para que se antoje: vienen de <template id="csi-muestra"> en la página */
  function ponerMuestra() {
    var tpl = document.getElementById('csi-muestra');
    var lugar = caja.querySelector('[data-muestra]');
    if (!tpl || !lugar || !tpl.content) return;
    lugar.appendChild(tpl.content.cloneNode(true));
    caja.classList.add('csi-con-muestra');
    Array.prototype.forEach.call(lugar.querySelectorAll('figure'), function (fig) {
      fig.addEventListener('click', function () { abrirVisor(fig.querySelector('img')); });
    });
  }

  function abrirVisor(img) {
    if (!img) return;
    var visor = document.createElement('div');
    visor.className = 'csi-visor';
    visor.setAttribute('role', 'dialog');
    visor.setAttribute('aria-label', img.alt || 'Ejemplo');
    visor.innerHTML = '<img src="' + esc(img.getAttribute('src')) + '" alt="' + esc(img.alt || '') + '"><button type="button" aria-label="Cerrar">×</button>';
    function cerrar() { visor.remove(); document.removeEventListener('keydown', tecla); }
    function tecla(e) { if (e.key === 'Escape') cerrar(); }
    visor.addEventListener('click', cerrar);
    document.addEventListener('keydown', tecla);
    document.body.appendChild(visor);
  }

  function correoCompra() {
    var form = caja && caja.querySelector('form');
    return form ? form.email.value.trim() : '';
  }

  function datosCompraValidos() {
    var form = caja.querySelector('form');
    var ok = true;
    mostrarError('email', ''); mostrarError('check', ''); mostrarError('envio', '');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.value.trim())) { mostrarError('email', 'Escribe tu correo para enviarte tu acceso.'); ok = false; }
    if (!form.consentimiento.checked) { mostrarError('check', 'Para enviarte tu acceso necesitamos tu autorización.'); ok = false; }
    if (!ok) form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return ok;
  }

  var paypalCargando = null;
  function cargarPaypal(listo) {
    if (window.paypal && window.paypal.Buttons) { listo(true); return; }
    if (!paypalCargando) {
      paypalCargando = [];
      var sdk = document.createElement('script');
      sdk.src = 'https://www.paypal.com/sdk/js?client-id=' + encodeURIComponent(PAYPAL_CLIENT_ID) +
        '&currency=USD&intent=capture&components=buttons&disable-funding=venmo,paylater';
      sdk.onload = function () { paypalCargando.forEach(function (f) { f(!!(window.paypal && window.paypal.Buttons)); }); };
      sdk.onerror = function () { paypalCargando.forEach(function (f) { f(false); }); };
      document.head.appendChild(sdk);
    }
    paypalCargando.push(listo);
  }

  /* Después del pago (o con una clave de prueba): Make revisa con PayPal y da el acceso */
  function activarCompra(orden, correo) {
    var email = correo || correoCompra();
    fetch(WEBHOOK_PAGO, {
      method: 'POST',
      body: new URLSearchParams({ email: email, orden: orden || '', calculadora: CALCULADORA })
    }).then(function (r) { return r.json(); })
      .then(function (d) {
        if (d && (d.ok === true || d.ok === 'true') && d.token) {
          guardarAcceso(String(d.token));
          caja.innerHTML =
            '<h2>¡Gracias! Tu acceso está listo ✦</h2>' +
            '<p>También te enviamos tu enlace de acceso a <strong>' + esc(email) + '</strong>. Guarda ese correo: con él abres tu ' + esc(NOMBRE) + ' en cualquier computadora o celular.</p>' +
            '<p><button type="button" class="csi-btn" data-abrir>Abrir mi árbol ✦</button></p>';
          caja.querySelector('[data-abrir]').addEventListener('click', function () { desbloquear(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
        } else {
          pagoSinConfirmar(email);
        }
      })
      .catch(function () { pagoSinConfirmar(email); });
  }

  function pagoSinConfirmar(email) {
    caja.innerHTML =
      '<h2>Recibimos tu pago</h2>' +
      '<p class="csi-aviso" role="alert">No pudimos activar tu acceso automáticamente. No te preocupes: ya nos llegó el aviso y te enviaremos tu enlace a <strong>' + esc(email || 'tu correo') + '</strong> lo antes posible.</p>' +
      '<p class="csi-nota">Si tienes dudas, escríbenos a <a href="mailto:' + esc(CORREO_CONTACTO) + '">' + esc(CORREO_CONTACTO) + '</a> con tu comprobante de PayPal.</p>';
  }

  /* Solo para pruebas desde la consola: csiPruebaAcceso('PRUEBA-tuclave', 'tucorreo@ejemplo.com') */
  if (DE_PAGO) {
    window.csiPruebaAcceso = function (clave, correo) {
      if (!caja) return 'La página aún no termina de cargar.';
      caja.innerHTML = '<p class="csi-cargando">Probando acceso…</p>';
      activarCompra(clave, correo || CORREO_CONTACTO);
      return 'Enviado. Revisa la tarjeta en la página.';
    };
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
    fetch(WEBHOOK_VALIDAR, { method: 'POST', body: new URLSearchParams({ token: token, calculadora: CALCULADORA }) })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        quitarTokenDeLaDireccion();
        if (d && (d.ok === true || d.ok === 'true')) { guardarAcceso(token); desbloquear(); }
        else { borrarAcceso(); pantallaInicial(true); }
      })
      .catch(function () {
        quitarTokenDeLaDireccion();
        /* Si ya había un acceso guardado, no se lo quitamos por una falla de red */
        if (leerAcceso()) { desbloquear(); return; }
        pantallaInicial(true);
      });
  }

  function pantallaInicial(avisoInvalido) {
    if (DE_PAGO) pantallaCompra(avisoInvalido);
    else pantallaFormulario(avisoInvalido, '');
  }

  function iniciar() {
    var app = document.querySelector(CONTENEDOR);
    if (!app) { desbloquear(); return; }

    caja = document.createElement('section');
    caja.id = 'csi-acceso';
    caja.setAttribute('aria-live', 'polite');
    var sub = app.querySelector('.sub') || app.querySelector('h1');
    if (sub && sub.nextSibling) app.insertBefore(caja, sub.nextSibling); else app.insertBefore(caja, app.firstChild);

    /* Link al pie: volver a pedir el acceso */
    var pie = document.createElement('p');
    pie.className = 'csi-otra-compu';
    pie.innerHTML = DE_PAGO
      ? '<button type="button">Cerrar mi acceso en esta computadora</button>'
      : '<button type="button">¿Usas otra computadora? Pide tu acceso de nuevo</button>';
    app.parentNode.insertBefore(pie, app.nextSibling);
    pie.querySelector('button').addEventListener('click', function () {
      borrarAcceso();
      raiz.classList.add('csi-bloqueado');
      pantallaInicial(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    var guardado = leerAcceso();
    if (tokenUrl) validar(tokenUrl);
    else if (guardado && DE_PAGO) validar(guardado.token);   // de pago: se revisa en cada visita
    else if (guardado) desbloquear();
    else pantallaInicial(false);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
