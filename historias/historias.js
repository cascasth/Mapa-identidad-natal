/* Sala de lectura · barra de progreso y medición de hasta dónde lee la gente.
   Manda eventos a Microsoft Clarity y al Pixel de Meta:
     - lectura_25 / lectura_50 / lectura_75  (porcentaje del texto leído)
     - lectura_fin                             (llegó a "Fin de la Parte")
     - clic_mapa                               (clic en el botón del Mapa)
   En Clarity se filtran por "Custom events"; en Meta aparecen como "LecturaHistoria". */
(function () {
    var cuerpo = document.querySelector('.historia');
    var fin = document.querySelector('.fin');
    var barra = document.querySelector('.progreso');
    var parte = document.body.getAttribute('data-parte') || '';
    var enviados = {};

    function avisar(nombre) {
        if (enviados[nombre]) return;
        enviados[nombre] = true;
        try { if (window.clarity) clarity('event', nombre); } catch (e) {}
        try { if (window.fbq) fbq('trackCustom', 'LecturaHistoria', { parte: parte, paso: nombre }); } catch (e) {}
    }

    try { if (window.clarity) clarity('set', 'historia', parte); } catch (e) {}

    function revisar() {
        if (!cuerpo) return;
        var caja = cuerpo.getBoundingClientRect();
        var leido = (window.innerHeight - caja.top) / caja.height;
        leido = Math.max(0, Math.min(1, leido));
        if (barra) barra.style.width = (leido * 100) + '%';
        if (leido >= 0.25) avisar('lectura_25');
        if (leido >= 0.50) avisar('lectura_50');
        if (leido >= 0.75) avisar('lectura_75');
        if (fin && fin.getBoundingClientRect().top < window.innerHeight) avisar('lectura_fin');
    }

    window.addEventListener('scroll', revisar, { passive: true });
    window.addEventListener('resize', revisar);
    revisar();

    document.querySelectorAll('.btn-mapa').forEach(function (b) {
        b.addEventListener('click', function () { avisar('clic_mapa'); });
    });
})();
