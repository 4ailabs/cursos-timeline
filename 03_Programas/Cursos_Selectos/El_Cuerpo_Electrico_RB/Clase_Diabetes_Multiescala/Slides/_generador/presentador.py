# -*- coding: utf-8 -*-
"""Arma el archivo de presentacion desde los .dc.html y canvas.json."""
import io, json, os, base64, pathlib
SLD = pathlib.Path(__file__).parent.parent
BASE = SLD.parent
canvas = json.loads((SLD/"canvas.json").read_text(encoding="utf-8"))
IMGS = {n: "data:image/jpeg;base64," + base64.b64encode((SLD/n).read_bytes()).decode("ascii")
        for n in os.listdir(SLD) if n.endswith(".jpg")}

def cuerpo(nombre):
    t = (SLD/nombre).read_text(encoding="utf-8")
    s = t[t.index("</helmet>")+9 : t.index("</x-dc>")].strip()
    for n, u in IMGS.items():
        s = s.replace('src="%s"' % n, 'src="%s"' % u)
    return s

DIAS = "\n".join(f'<section class="dia" data-t="{a.get("title","")}">\n{cuerpo(a["file"])}\n</section>'
                 for a in canvas["artboards"])

HTML = """<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>La diabetes tipo 2 como falla de coordinación entre escalas</title>
<style>
  :root { --tinta: #E8E6DE; --teal: #5DCAA5; --fondo: #0B0C0B; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; height: 100%%; background: var(--fondo); overflow: hidden;
               font-family: Arial, Helvetica, sans-serif; -webkit-font-smoothing: antialiased; }
  #escenario { position: fixed; inset: 0; overflow: hidden; }
  /* centrado exacto: la alineacion de grid cae en 'safe start' cuando la
     ventana es mas angosta que 1280 y desplaza la lamina */
  #pista { position: absolute; left: 50%%; top: 50%%; width: 1280px; height: 720px;
           margin-left: -640px; margin-top: -360px; transform-origin: center center; }
  .dia { position: absolute; inset: 0; opacity: 0; visibility: hidden; transition: opacity .18s linear; }
  .dia.viva { opacity: 1; visibility: visible; }
  .dia > div { width: 1280px !important; height: 720px !important; }
  #avance { position: fixed; left: 0; bottom: 0; height: 3px; background: var(--teal); width: 0;
            transition: width .18s linear; z-index: 40; }
  /* el folio lo pinta cada lamina; el del presentador se duplicaba encima */
  #folio { display: none; }
  .zona { position: fixed; top: 0; bottom: 0; width: 22%%; z-index: 30; cursor: pointer; }
  #zi { left: 0; } #zd { right: 0; width: 78%%; }
  body.rejilla .zona { display: none; }
  #rejilla { position: fixed; inset: 0; background: #0B0C0B; z-index: 60; overflow-y: auto; padding: 28px;
             display: none; grid-template-columns: repeat(auto-fill, minmax(232px, 1fr)); gap: 20px; }
  body.rejilla #rejilla { display: grid; }
  .mini { position: relative; cursor: pointer; border: 1px solid #43443E; border-radius: 3px;
          overflow: hidden; aspect-ratio: 16 / 9; background: #171816; }
  .mini.aqui { border-color: var(--teal); box-shadow: 0 0 0 2px var(--teal); }
  .mini .lienzo { position: absolute; top: 0; left: 0; width: 1280px; height: 720px;
                  transform-origin: top left; pointer-events: none; }
  .mini .rot { position: absolute; left: 0; right: 0; bottom: 0; background: #0B0C0BE0; color: #E8E6DE;
               font-size: 11px; padding: 5px 7px; letter-spacing: .4px; }
  #ayuda { position: fixed; inset: 0; background: #0B0C0BF2; z-index: 70; display: none;
           place-items: center; color: var(--tinta); }
  body.ayuda #ayuda { display: grid; }
  #ayuda table { border-collapse: collapse; font-size: 17px; }
  #ayuda td { padding: 9px 22px; border-bottom: 1px solid #43443E; }
  #ayuda td:first-child { color: var(--teal); font-family: ui-monospace, monospace; white-space: nowrap; }
  @media print {
    html, body { overflow: visible; background: #fff; }
    #escenario { position: static; }
    #pista { position: static; width: auto; height: auto; margin: 0; transform: none !important; }
    .dia { position: static; opacity: 1 !important; visibility: visible !important;
           page-break-after: always; break-after: page; }
    #avance, #folio, .zona, #rejilla, #ayuda { display: none !important; }
  }
</style>
</head>
<body>
<div id="escenario"><div id="pista">
%(DIAS)s
</div></div>
<div class="zona" id="zi"></div>
<div class="zona" id="zd"></div>
<div id="avance"></div>
<div id="folio"></div>
<div id="rejilla"></div>
<div id="ayuda"><table>
  <tr><td>→ · espacio · ↓ · clic</td><td>Lámina siguiente</td></tr>
  <tr><td>← · ↑ · clic a la izquierda</td><td>Lámina anterior</td></tr>
  <tr><td>Inicio · Fin</td><td>Primera y última</td></tr>
  <tr><td>1…9 y Enter</td><td>Ir al número que se escriba</td></tr>
  <tr><td>G · Esc</td><td>Rejilla de todas las láminas</td></tr>
  <tr><td>F</td><td>Pantalla completa</td></tr>
  <tr><td>N</td><td>Negro, para hablar sin lámina</td></tr>
  <tr><td>H</td><td>Esta ayuda</td></tr>
  <tr><td>Ctrl/Cmd + P</td><td>Exportar a PDF, una lámina por página</td></tr>
</table></div>
<script>
(function () {
  var dias = [].slice.call(document.querySelectorAll('.dia'));
  var TOT = dias.length, i = 0, tecleado = '';
  var pista = document.getElementById('pista'), avance = document.getElementById('avance');
  var folio = document.getElementById('folio'), rejilla = document.getElementById('rejilla');
  function encaja() {
    var k = Math.min(innerWidth / 1280, innerHeight / 720);
    pista.style.transform = 'scale(' + k + ')';
    [].forEach.call(rejilla.querySelectorAll('.lienzo'), function (l) {
      l.style.transform = 'scale(' + (l.parentNode.clientWidth / 1280) + ')';
    });
  }
  function pinta() {
    dias.forEach(function (d, n) { d.classList.toggle('viva', n === i); });
    avance.style.width = ((i + 1) / TOT * 100) + '%%';
    folio.textContent = (i + 1) + ' / ' + TOT;
    [].forEach.call(rejilla.children, function (m, n) { m.classList.toggle('aqui', n === i); });
    try { location.replace('#' + (i + 1)); } catch (e) {}
  }
  function ir(n) { i = Math.max(0, Math.min(TOT - 1, n)); pinta(); }
  dias.forEach(function (d, n) {
    var m = document.createElement('div'); m.className = 'mini';
    var l = document.createElement('div'); l.className = 'lienzo'; l.innerHTML = d.innerHTML;
    m.appendChild(l);
    var r = document.createElement('div'); r.className = 'rot';
    r.textContent = (n + 1) + ' · ' + (d.dataset.t || ''); m.appendChild(r);
    m.addEventListener('click', function () { document.body.classList.remove('rejilla'); ir(n); });
    rejilla.appendChild(m);
  });
  document.getElementById('zd').addEventListener('click', function () { ir(i + 1); });
  document.getElementById('zi').addEventListener('click', function () { ir(i - 1); });
  addEventListener('keydown', function (e) {
    var k = e.key;
    if (k === 'Escape') { document.body.classList.remove('ayuda'); document.body.classList.toggle('rejilla'); return; }
    if (document.body.classList.contains('ayuda')) { document.body.classList.remove('ayuda'); return; }
    if (k === 'ArrowRight' || k === ' ' || k === 'ArrowDown' || k === 'PageDown') { e.preventDefault(); ir(i + 1); }
    else if (k === 'ArrowLeft' || k === 'ArrowUp' || k === 'PageUp') { e.preventDefault(); ir(i - 1); }
    else if (k === 'Home') ir(0);
    else if (k === 'End') ir(TOT - 1);
    else if (k === 'g' || k === 'G') document.body.classList.toggle('rejilla');
    else if (k === 'h' || k === 'H' || k === '?') document.body.classList.toggle('ayuda');
    else if (k === 'n' || k === 'N') document.body.style.visibility = document.body.style.visibility === 'hidden' ? '' : 'hidden';
    else if (k === 'f' || k === 'F') {
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen && document.documentElement.requestFullscreen();
    }
    else if (/^[0-9]$/.test(k)) { tecleado += k; return; }
    else if (k === 'Enter' && tecleado) { ir(parseInt(tecleado, 10) - 1); }
    tecleado = '';
  });
  var x0 = null;
  addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 46) ir(i + (dx < 0 ? 1 : -1));
    x0 = null;
  }, { passive: true });
  addEventListener('resize', encaja);
  var h = parseInt((location.hash || '').slice(1), 10);
  if (h > 0 && h <= TOT) i = h - 1;
  encaja(); pinta();
})();
</script>
</body>
</html>
"""
salida = BASE / "Presentacion_Diabetes_Multiescala.html"
with io.open(salida, "w", encoding="utf-8") as f:
    f.write(HTML % {"DIAS": DIAS})
print("presentación · %d láminas · %.1f MB" % (len(canvas["artboards"]), salida.stat().st_size/1048576))
