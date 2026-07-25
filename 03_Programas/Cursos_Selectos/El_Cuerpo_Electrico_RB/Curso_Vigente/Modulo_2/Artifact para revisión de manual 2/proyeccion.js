/* ══ Controles de proyección · Regulación Bioeléctrica ══
 *
 * deck-stage.js ya trae navegación por teclado y una barra de control, pero
 * esa barra nace con opacity:0 —solo aparece al mover el ratón—, mide 12 px
 * y es una píldora negra. Proyectada no se ve ni se acierta.
 *
 * Esto añade encima controles grandes y siempre visibles. No modifica
 * deck-stage.js: los botones despachan las mismas teclas que él ya escucha
 * en window, así que la lógica de avance sigue siendo la suya.
 *
 * Se enlaza con  <script src="./proyeccion.js" defer></script>
 */
(function () {
  'use strict';

  var T = {
    tinta:  '#0A4A3A',
    claro:  '#8FD6C2',
    papel:  '#FCFBF7',
    borde:  'rgba(252,251,247,.28)'
  };

  function tecla(k) {
    ['keydown', 'keyup'].forEach(function (tipo) {
      window.dispatchEvent(new KeyboardEvent(tipo, {
        key: k, code: k, bubbles: true, cancelable: true
      }));
    });
  }

  /* Total de diapositivas: las secciones que el deck recibe como hijas. */
  function totalDiapositivas() {
    var n = document.querySelectorAll('x-import > section, deck-stage > section').length;
    return n || document.querySelectorAll('section[data-label]').length || 1;
  }

  var estilo = document.createElement('style');
  estilo.textContent = [
    '#rb-proy{position:fixed;inset:0;z-index:2147483000;pointer-events:none;',
    '  font-family:system-ui,"Segoe UI","Helvetica Neue",Arial,sans-serif}',
    '#rb-proy button{pointer-events:auto;-webkit-appearance:none;appearance:none;cursor:pointer;',
    '  font-family:inherit;border:1px solid ' + T.borde + ';background:rgba(10,74,58,.55);',
    '  color:' + T.papel + ';backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);',
    '  transition:opacity .18s ease,background .18s ease,transform .12s ease}',
    '#rb-proy button:hover{background:' + T.tinta + ';opacity:1}',
    '#rb-proy button:active{transform:scale(.94)}',
    '#rb-proy button:focus-visible{outline:3px solid ' + T.claro + ';outline-offset:3px}',

    /* flechas grandes, pegadas a los bordes y centradas en vertical */
    '#rb-proy .nav{position:absolute;top:50%;transform:translateY(-50%);',
    '  width:64px;height:64px;border-radius:50%;display:flex;align-items:center;',
    '  justify-content:center;opacity:.58}',
    '#rb-proy .nav.ant{left:22px}',
    '#rb-proy .nav.sig{right:22px}',
    '#rb-proy .nav svg{width:26px;height:26px}',

    /* pie: contador, pantalla completa y barra de avance */
    '#rb-proy .pie{position:absolute;left:0;right:0;bottom:0;display:flex;',
    '  align-items:center;justify-content:center;gap:14px;padding:0 0 18px}',
    '#rb-proy .cuenta{pointer-events:none;font-variant-numeric:tabular-nums;',
    '  font-size:15px;letter-spacing:.06em;color:' + T.papel + ';opacity:.5;',
    '  background:rgba(10,74,58,.5);border-radius:999px;padding:6px 16px;',
    '  backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}',
    '#rb-proy .cuenta b{font-weight:600;opacity:1}',
    '#rb-proy .full{width:38px;height:38px;border-radius:50%;display:flex;',
    '  align-items:center;justify-content:center;opacity:.32}',
    '#rb-proy .full svg{width:17px;height:17px}',
    '#rb-proy .barra{position:absolute;left:0;bottom:0;height:3px;',
    '  background:' + T.claro + ';opacity:.75;transition:width .22s ease}',

    /* al proyectar, el puntero quieto atenúa los controles pero no los oculta */
    '#rb-proy.quieto .nav{opacity:.30}',
    '#rb-proy.quieto .cuenta{opacity:.40}',
    '#rb-proy.quieto .full{opacity:.22}',

    '@media print{#rb-proy{display:none!important}}',
    '@media (prefers-reduced-motion:reduce){#rb-proy *{transition:none!important}}'
  ].join('\n');

  var ui = document.createElement('div');
  ui.id = 'rb-proy';
  ui.innerHTML = [
    '<button class="nav ant" type="button" aria-label="Diapositiva anterior" title="Anterior (←)">',
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" ',
    'stroke-linecap="round" stroke-linejoin="round"><path d="M10 3L5 8l5 5"/></svg></button>',
    '<button class="nav sig" type="button" aria-label="Diapositiva siguiente" title="Siguiente (→)">',
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" ',
    'stroke-linecap="round" stroke-linejoin="round"><path d="M6 3l5 5-5 5"/></svg></button>',
    '<div class="pie">',
    '<span class="cuenta"><b class="act">1</b> / <span class="tot">1</span></span>',
    '<button class="full" type="button" aria-label="Pantalla completa" title="Pantalla completa (F)">',
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7" ',
    'stroke-linecap="round" stroke-linejoin="round">',
    '<path d="M2 6V2h4M14 6V2h-4M2 10v4h4M14 10v4h-4"/></svg></button>',
    '</div>',
    '<div class="barra" style="width:0"></div>'
  ].join('');

  function arrancar() {
    document.head.appendChild(estilo);
    document.body.appendChild(ui);

    ui.querySelector('.ant').addEventListener('click', function () { tecla('ArrowLeft'); });
    ui.querySelector('.sig').addEventListener('click', function () { tecla('ArrowRight'); });

    ui.querySelector('.full').addEventListener('click', function () {
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen().catch(function () {});
    });
    window.addEventListener('keydown', function (e) {
      if (e.key === 'f' || e.key === 'F') ui.querySelector('.full').click();
    });

    /* atenuar cuando el puntero lleva rato quieto */
    var reloj;
    function despertar() {
      ui.classList.remove('quieto');
      clearTimeout(reloj);
      reloj = setTimeout(function () { ui.classList.add('quieto'); }, 2600);
    }
    ['mousemove', 'click', 'keydown', 'touchstart'].forEach(function (ev) {
      window.addEventListener(ev, despertar, { passive: true });
    });
    despertar();

    /* Contador propio. Se sigue el mismo teclado que escucha deck-stage,
       así que los botones de arriba también lo actualizan. */
    var act = ui.querySelector('.act'), tot = ui.querySelector('.tot'),
        barra = ui.querySelector('.barra'), i = 0, n = totalDiapositivas();

    function pintar() {
      act.textContent = i + 1;
      tot.textContent = n;
      barra.style.width = (n > 1 ? (i / (n - 1)) * 100 : 100) + '%';
    }

    window.addEventListener('keydown', function (e) {
      var k = e.key;
      if (k === 'ArrowRight' || k === 'PageDown' || k === ' ' || k === 'Spacebar') i = Math.min(i + 1, n - 1);
      else if (k === 'ArrowLeft' || k === 'PageUp') i = Math.max(i - 1, 0);
      else if (k === 'Home') i = 0;
      else if (k === 'End') i = n - 1;
      else return;
      pintar();
    });

    /* el deck puede tardar en recibir sus secciones */
    var reintentos = 0;
    var t = setInterval(function () {
      var m = totalDiapositivas();
      if (m !== n) { n = m; i = Math.min(i, n - 1); pintar(); }
      if (++reintentos > 20) clearInterval(t);
    }, 300);

    pintar();
  }

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', arrancar);
  else arrancar();
})();
