#!/usr/bin/env python3
"""
Construye decks autónomos para proyectar en el aula.

Los .dc.html están hechos para correr dentro de la herramienta de diseño de
claude.ai: al abrirlos desde el disco, deck-stage.js no arranca y las
diapositivas quedan apiladas una debajo de otra.

Este script toma el contenido de cada deck —los <section> y los estilos del
<helmet>— y lo envuelve en un HTML de un solo archivo que:

  · muestra una diapositiva a la vez, escalada a la pantalla
  · navega con flechas grandes, teclado y mando de presentación
  · lleva contador, barra de avance y pantalla completa
  · incorpora las fuentes, así que funciona sin internet

No depende de deck-stage.js ni de support.js.

Uso:  python3 construir_proyeccion.py
Sale: Proyeccion/<nombre>.html
"""
import re, pathlib, html as H

AQUI   = pathlib.Path(__file__).parent
DESTINO = AQUI          # misma carpeta: las rutas relativas de las imágenes resuelven
FUENTES = AQUI / "rb-fonts.css"


def extraer(ruta):
    t = ruta.read_text()
    if "deck-stage" not in t:
        return None

    helmet = re.search(r"<helmet>(.*?)</helmet>", t, re.S)
    estilos = ""
    if helmet:
        estilos = "\n".join(m.group(1) for m in re.finditer(r"<style>(.*?)</style>", helmet.group(1), re.S))

    imp = re.search(r"<x-import[^>]*>(.*)</x-import>", t, re.S)
    cuerpo = imp.group(1) if imp else ""

    # partir por <section> de primer nivel
    secciones, prof, ini = [], 0, None
    for m in re.finditer(r"<(/?)section\b", cuerpo):
        if not m.group(1):
            if prof == 0: ini = m.start()
            prof += 1
        else:
            prof -= 1
            if prof == 0:
                fin = cuerpo.index(">", m.end()) + 1
                secciones.append(cuerpo[ini:fin])

    attrs = re.search(r"<x-import([^>]*)>", t)
    a = attrs.group(1) if attrs else ""
    ancho = int((re.search(r'width="(\d+)"', a) or [0, 1920])[1])
    alto  = int((re.search(r'height="(\d+)"', a) or [0, 1080])[1])

    titulo = re.search(r"<title>(.*?)</title>", t, re.S)
    return dict(estilos=estilos, secciones=secciones, ancho=ancho, alto=alto,
                titulo=H.unescape(titulo.group(1)).strip() if titulo else ruta.stem)


CHROME = """
/* ══ Proyección · Regulación Bioeléctrica ══ */
*{box-sizing:border-box}
html,body{margin:0;height:100%;background:#12100E;overflow:hidden;
  font-family:system-ui,"Segoe UI","Helvetica Neue",Arial,sans-serif}

#escenario{position:fixed;inset:0;overflow:hidden}
/* centrado por posición absoluta: con grid, un hijo más ancho que el
   contenedor se desborda por la derecha en vez de centrarse */
#lienzo{position:absolute;left:50%;top:50%;transform-origin:center center;
}
#lienzo>.slide{position:absolute;inset:0;opacity:0;visibility:hidden;
  transition:opacity .28s ease}
#lienzo>.slide.activa{opacity:1;visibility:visible}
@media (prefers-reduced-motion:reduce){#lienzo>.slide{transition:none}}

/* ── controles ── */
#mando{position:fixed;inset:0;z-index:99;pointer-events:none}
#mando button{pointer-events:auto;-webkit-appearance:none;appearance:none;cursor:pointer;
  font-family:inherit;border:1px solid rgba(252,251,247,.30);
  background:rgba(10,74,58,.62);color:#FCFBF7;
  backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);
  transition:opacity .18s ease,background .18s ease,transform .12s ease}
#mando button:hover{background:#0A4A3A;opacity:1}
#mando button:active{transform:scale(.93)}
#mando button:focus-visible{outline:3px solid #8FD6C2;outline-offset:3px}

#mando .nav{position:absolute;top:50%;transform:translateY(-50%);
  width:44px;height:44px;border-radius:50%;display:grid;place-items:center;opacity:.45}
#mando .ant{left:18px} #mando .sig{right:18px}
#mando .nav svg{width:18px;height:18px}
#mando .nav[disabled]{opacity:.12;cursor:default}

#mando .pie{position:absolute;left:0;right:0;bottom:0;
  display:flex;align-items:center;justify-content:center;gap:10px;padding:0 0 14px}
#mando .cuenta{pointer-events:none;font-variant-numeric:tabular-nums;font-size:12.5px;
  letter-spacing:.06em;color:#FCFBF7;opacity:.5;background:rgba(10,74,58,.5);
  border-radius:999px;padding:5px 13px;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
#mando .cuenta b{font-weight:600}
#mando .util{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;opacity:.34}
#mando .util svg{width:14px;height:14px}
#mando .barra{position:absolute;left:0;bottom:0;height:3px;background:#8FD6C2;
  opacity:.8;transition:width .24s ease}

#mando.quieto .nav{opacity:.20}
#mando.quieto .cuenta{opacity:.38}
#mando.quieto .util{opacity:.20}

/* ── índice de diapositivas (tecla G) ── */
#indice{position:fixed;inset:0;z-index:120;background:rgba(7,18,14,.96);
  display:none;overflow:auto;padding:40px}
#indice.abierto{display:block}
#indice .rejilla{display:grid;gap:14px;
  grid-template-columns:repeat(auto-fill,minmax(210px,1fr));max-width:1500px;margin:0 auto}
#indice .ficha{cursor:pointer;border:1px solid rgba(252,251,247,.16);border-radius:8px;
  padding:14px 16px;color:#CFE6DD;background:rgba(10,74,58,.35);text-align:left;
  font-family:inherit;font-size:13px;line-height:1.35;transition:background .15s ease}
#indice .ficha:hover,#indice .ficha:focus-visible{background:#0A4A3A;color:#fff;outline:none}
#indice .ficha b{display:block;font-size:11px;letter-spacing:.1em;text-transform:uppercase;
  color:#8FD6C2;margin-bottom:5px;font-weight:600}

/* ── notas del orador (tecla N) ── */
#notas{position:fixed;left:0;right:0;bottom:0;z-index:110;max-height:34vh;overflow:auto;
  background:rgba(7,18,14,.95);color:#CFE6DD;padding:18px 26px 22px;display:none;
  border-top:1px solid rgba(143,214,194,.35);font-size:16px;line-height:1.5}
#notas.abierto{display:block}
#notas b{display:block;font-size:11px;letter-spacing:.14em;text-transform:uppercase;
  color:#8FD6C2;margin-bottom:7px}

@media print{#mando,#indice,#notas{display:none!important}}
"""

GUION = """
(function(){
  var lienzo=document.getElementById('lienzo'),
      slides=[].slice.call(lienzo.children),
      n=slides.length, i=0,
      mando=document.getElementById('mando'),
      act=document.getElementById('act'), tot=document.getElementById('tot'),
      barra=document.getElementById('barra'),
      ant=document.getElementById('ant'), sig=document.getElementById('sig'),
      notas=document.getElementById('notas'), indice=document.getElementById('indice');

  tot.textContent=n;

  function escalar(){
    var e=Math.min(innerWidth/ANCHO, innerHeight/ALTO);
    lienzo.style.transform='translate(-50%,-50%) scale('+e+')';
  }
  addEventListener('resize',escalar); escalar();

  function ir(k){
    i=Math.max(0,Math.min(k,n-1));
    slides.forEach(function(s,j){s.classList.toggle('activa',j===i);});
    act.textContent=i+1;
    barra.style.width=(n>1?(i/(n-1))*100:100)+'%';
    ant.disabled=(i===0); sig.disabled=(i===n-1);
    var t=slides[i].getAttribute('data-notas')||'';
    notas.innerHTML='<b>Nota · diapositiva '+(i+1)+'</b>'+(t?t:'<i>Sin nota.</i>');
    location.hash=i+1;
  }

  sig.onclick=function(){ir(i+1)};
  ant.onclick=function(){ir(i-1)};
  document.getElementById('full').onclick=pantalla;
  document.getElementById('idx').onclick=function(){indice.classList.toggle('abierto')};

  function pantalla(){
    if(document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen().catch(function(){});
  }

  addEventListener('keydown',function(e){
    var k=e.key;
    if(indice.classList.contains('abierto') && k==='Escape'){indice.classList.remove('abierto');return;}
    if(k==='ArrowRight'||k==='PageDown'||k===' '||k==='Spacebar'||k==='Enter'){e.preventDefault();ir(i+1);}
    else if(k==='ArrowLeft'||k==='PageUp'||k==='Backspace'){e.preventDefault();ir(i-1);}
    else if(k==='Home'){ir(0);}
    else if(k==='End'){ir(n-1);}
    else if(k==='f'||k==='F'){pantalla();}
    else if(k==='n'||k==='N'){notas.classList.toggle('abierto');}
    else if(k==='g'||k==='G'){indice.classList.toggle('abierto');}
  });

  /* clic en la mitad derecha avanza, en la izquierda retrocede */
  lienzo.addEventListener('click',function(e){
    var r=lienzo.getBoundingClientRect();
    ir(e.clientX > r.left + r.width/2 ? i+1 : i-1);
  });

  /* deslizar en tableta */
  var x0=null;
  addEventListener('touchstart',function(e){x0=e.touches[0].clientX;},{passive:true});
  addEventListener('touchend',function(e){
    if(x0===null)return; var d=e.changedTouches[0].clientX-x0;
    if(Math.abs(d)>50) ir(d<0?i+1:i-1); x0=null;
  },{passive:true});

  /* atenuar el mando con el puntero quieto */
  var reloj;
  function despertar(){mando.classList.remove('quieto');clearTimeout(reloj);
    reloj=setTimeout(function(){mando.classList.add('quieto');},2600);}
  ['mousemove','click','keydown','touchstart'].forEach(function(ev){
    addEventListener(ev,despertar,{passive:true});});
  despertar();

  /* índice */
  indice.querySelector('.rejilla').addEventListener('click',function(e){
    var b=e.target.closest('.ficha'); if(!b)return;
    ir(+b.dataset.i); indice.classList.remove('abierto');
  });

  var inicial=parseInt((location.hash||'').replace('#',''),10);
  ir(isFinite(inicial)&&inicial>0?inicial-1:0);
})();
"""


def construir(datos, nombre):
    fuentes = FUENTES.read_text() if FUENTES.exists() else ""

    slides, fichas = [], []
    for k, s in enumerate(datos["secciones"]):
        etiqueta = (re.search(r'data-label="([^"]*)"', s) or ["", f"Diapositiva {k+1}"])[1]
        nota = (re.search(r'data-speaker-notes="([^"]*)"', s) or ["", ""])[1]
        slides.append(f'<div class="slide" data-notas="{nota}">{s}</div>')
        fichas.append(f'<button class="ficha" data-i="{k}"><b>{k+1}</b>{etiqueta}</button>')

    flecha = ('<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" '
              'stroke-linecap="round" stroke-linejoin="round"><path d="M{}"/></svg>')

    doc = f"""<!doctype html>
<html lang="es"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{H.escape(nombre)}</title>
<style>{fuentes}</style>
<style>{datos['estilos']}</style>
<style>{CHROME}</style>
</head>
<body>

<div id="escenario">
  <div id="lienzo" style="width:{datos['ancho']}px;height:{datos['alto']}px">
{chr(10).join(slides)}
  </div>
</div>

<div id="mando">
  <button class="nav ant" id="ant" type="button" aria-label="Diapositiva anterior" title="Anterior (←)">{flecha.format('10 3L5 8l5 5')}</button>
  <button class="nav sig" id="sig" type="button" aria-label="Diapositiva siguiente" title="Siguiente (→)">{flecha.format('6 3l5 5-5 5')}</button>
  <div class="pie">
    <button class="util" id="idx" type="button" aria-label="Ver todas las diapositivas" title="Índice (G)">
      <svg viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg></button>
    <span class="cuenta"><b id="act">1</b> / <span id="tot">1</span></span>
    <button class="util" id="full" type="button" aria-label="Pantalla completa" title="Pantalla completa (F)">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6V2h4M14 6V2h-4M2 10v4h4M14 10v4h-4"/></svg></button>
  </div>
  <div class="barra" id="barra" style="width:0"></div>
</div>

<div id="indice"><div class="rejilla">
{chr(10).join(fichas)}
</div></div>

<div id="notas"></div>

<script>var ANCHO={datos['ancho']},ALTO={datos['alto']};</script>
<script>{GUION}</script>
</body></html>
"""
    return doc


def main():
    hechos = 0
    for f in sorted(AQUI.glob("*.dc.html")):
        d = extraer(f)
        if not d or not d["secciones"]:
            print(f"—  {f.name}: no es un deck"); continue
        nombre = f.name.replace(".dc.html", "")
        salida = DESTINO / (nombre + " — proyectar.html")
        salida.write_text(construir(d, nombre))
        print(f"✓  {salida.name}  ·  {len(d['secciones'])} diapositivas")
        hechos += 1
    print(f"\n{hechos} decks · abrir los que terminan en «— proyectar»")


if __name__ == "__main__":
    main()
