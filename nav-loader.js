/* ===========================================================
   nav-loader.js
   Carga la barra de navegación compartida (nav.html) dentro
   de cualquier página que tenga: <div id="nav-placeholder"></div>

   Para usarlo en una página nueva, solo agrega:
   1) <div id="nav-placeholder"></div>  al inicio del <body>
   2) <script src="nav-loader.js"></script>  al final del body
   3) en el <body> tag, agrega data-page="nombre" (ej: data-page="tzolkin")
   =========================================================== */

// Distintas páginas del sitio usan nombres distintos para la variable
// de idioma actual (idiomaSeleccionado en index/tzolkin, currentLang
// en numerologia/chino). Esta función detecta la que exista.
function idiomaDeLaPagina() {
  if (typeof idiomaSeleccionado !== 'undefined') return idiomaSeleccionado;
  if (typeof currentLang !== 'undefined') return currentLang;
  return 'es';
}

(function () {
  fetch('nav.html')
    .then(function (res) { return res.text(); })
    .then(function (html) {
      var placeholder = document.getElementById('nav-placeholder');
      if (!placeholder) return;
      placeholder.innerHTML = html;

      // Marca como activo el link que corresponde a la página actual.
      // La página actual se identifica con: <body data-page="tzolkin">
      var paginaActual = document.body.getAttribute('data-page') || '';
      document.querySelectorAll('.top-nav-link').forEach(function (link) {
        if (link.getAttribute('data-page') === paginaActual) {
          link.classList.add('active');
        }
      });

      // Traduce la barra recién insertada al idioma actual de la página.
      // Si la página tiene su propia función setLang() (todas la tienen),
      // la reutilizamos para garantizar el mismo comportamiento exacto.
      var idiomaActual = idiomaDeLaPagina();
      if (typeof setLang === 'function') {
        setLang(idiomaActual);
      } else if (typeof i18n !== 'undefined' && i18n[idiomaActual]) {
        var t = i18n[idiomaActual];
        placeholder.querySelectorAll('[data-i18n]').forEach(function (el) {
          var key = el.getAttribute('data-i18n');
          if (t[key] !== undefined) el.innerHTML = t[key];
        });
      }

      // Restaura el estado "encendido" del botón de audio si el usuario
      // ya lo había activado antes de que la barra terminara de cargar
      // (caso raro, pero por si acaso el audio se controla desde otro lado).
      if (typeof window.audioActivo !== 'undefined' && window.audioActivo) {
        var btn = document.getElementById('audio-toggle');
        if (btn) btn.classList.add('activo');
      }

      // Avisa al resto de la página que la barra ya está lista,
      // por si algún script necesita esperarla.
      document.dispatchEvent(new Event('nav-loaded'));
    })
    .catch(function (err) {
      console.error('No se pudo cargar nav.html:', err);
    });
})();

/* ===========================================================
   Lógica del botón de audio (antes vivía solo en index.html,
   ahora es compartida porque el botón está en todas las páginas)
   =========================================================== */
let audioActivo = false;

// Textos del botón de audio en los dos idiomas del sitio.
// Viven aquí (y no en el i18n de cada página) porque no todas las
// páginas tienen estas claves definidas.
const AUDIO_TEXTOS = {
  es: { activar: '🜂 Activar experiencia sonora', silenciar: '🜂 Silenciar ambiente sonoro' },
  en: { activar: '🜂 Activate sonic experience', silenciar: '🜂 Mute ambient sound' }
};

function toggleAudio() {
  const audio = document.getElementById('bg-audio');
  const btn = document.getElementById('audio-toggle');
  const span = btn ? btn.querySelector('span') : null;
  if (!audio || !btn) return;

  const lang = idiomaDeLaPagina();
  const textos = AUDIO_TEXTOS[lang] || AUDIO_TEXTOS.es;

  if (!audioActivo) {
    audio.volume = 0.28;
    audio.play();
    audioActivo = true;
    btn.classList.add('activo');
    if (span) { span.setAttribute('data-i18n', 'audio-silenciar'); span.textContent = textos.silenciar; }
  } else {
    audio.pause();
    audioActivo = false;
    btn.classList.remove('activo');
    if (span) { span.setAttribute('data-i18n', 'audio-activar'); span.textContent = textos.activar; }
  }
}
