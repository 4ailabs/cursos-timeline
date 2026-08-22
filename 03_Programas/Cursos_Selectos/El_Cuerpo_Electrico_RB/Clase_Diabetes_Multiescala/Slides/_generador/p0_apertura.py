# -*- coding: utf-8 -*-
import sys, os, math
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from chrome import *

E0 = "Apertura"

def rueda(R, r, n, color, op):
    p = []; step = 2*math.pi/n
    for i in range(n):
        a = i*step; b = a + step*0.62
        p.append((R*math.cos(a), R*math.sin(a))); p.append((r*math.cos(b), r*math.sin(b)))
    return f'<polygon points="{" ".join("%.1f,%.1f" % q for q in p)}" fill="none" stroke="{color}" stroke-width="2.4" opacity="{op}"></polygon>'

# ── 01 PORTADA ──────────────────────────────────────────────────────────────
cuerpo = f"""
  <svg viewBox="-300 -300 600 600" style="position: absolute; right: -140px; top: 128px; width: 560px; height: 560px;" aria-hidden="true">
    {rueda(250, 205, 20, TEAL, "0.22")}{rueda(178, 146, 16, TEAL, "0.14")}
    <circle cx="0" cy="0" r="104" fill="none" stroke="{TEAL}" stroke-width="1.8" opacity="0.14"></circle>
    <circle cx="0" cy="0" r="14" fill="{TEAL}" opacity="0.6"></circle>
    <rect x="14" y="-1.8" width="48" height="3.6" fill="{TEAL}" opacity="0.45"></rect>
    <circle cx="76" cy="0" r="14" fill="{TEAL}" opacity="0.22"></circle>
  </svg>
  <div style="position: absolute; left: 64px; top: 158px; width: 720px;">
    <h1 style="margin: 0; font: 400 62px/1.04 {GEO}; letter-spacing: -1.9px; color: {INK};">La diabetes tipo&nbsp;2<br><span style="color: {TEAL};">como falla de coordinación<br>entre escalas</span></h1>
    <p style="margin: 34px 0 0; width: 580px; font: 25px/1.42 {GEO}; color: {BODY};">Dos personas con la misma resistencia a la insulina pueden tener pronósticos opuestos. Lo que las separa no aparece en ningún análisis de rutina: es si sus órganos siguen respondiendo coordinados en el tiempo.</p>
  </div>
  <div style="position: absolute; left: 64px; bottom: 84px; color: {MUTED}; font: 18px {ARI}; letter-spacing: 1px;">Dr. Miguel Ojeda Rios · Instituto Centrobioenergetica</div>
"""
escribe("Main.dc.html", slide("El Cuerpo Eléctrico · Regulación Bioeléctrica", cuerpo))

# ── 02 LA TESIS ─────────────────────────────────────────────────────────────
trinq = f"""
  <svg viewBox="0 0 420 140" style="width: 420px; height: 140px;" aria-hidden="true">
    <text x="0" y="34" font-family="{GEO}" font-size="32" fill="{TEAL2}">S</text>
    <text x="388" y="34" font-family="{GEO}" font-size="32" fill="{TEAL2}">C</text>
    <path d="M 30 24 C 128 -6, 300 -6, 380 24" fill="none" stroke="{TEAL2}" stroke-width="2.4"></path>
    <path d="M 380 24 l -14 -11 l 2 13 z" fill="{TEAL2}"></path>
    <path d="M 8 76 h 404" stroke="#E8E6DE77" stroke-width="1.8"></path>
    <g stroke="#E8E6DE77" stroke-width="2.2" fill="none">
      <path d="M 8 76 l 0 -24 l 50 24 M 58 76 l 0 -24 l 50 24 M 108 76 l 0 -24 l 50 24 M 158 76 l 0 -24 l 50 24 M 208 76 l 0 -24 l 50 24 M 258 76 l 0 -24 l 50 24 M 308 76 l 0 -24 l 50 24"></path>
    </g>
    <path d="M 240 122 l 0 -34 l 34 24" fill="none" stroke="{TEAL2}" stroke-width="3.4" stroke-linejoin="round"></path>
    <circle cx="240" cy="126" r="6" fill="{TEAL2}"></circle>
  </svg>"""
cuerpo = f"""
  <div style="position: absolute; left: 88px; top: 118px; width: 660px;">
    <div style="color: {TEAL2}; font: 17px {ARI}; letter-spacing: 2.8px; text-transform: uppercase;">La tesis</div>
    <h2 style="margin: 24px 0 0; font: 400 42px/1.14 {GEO}; letter-spacing: -1.2px; color: {CREAM};">Lo que decide el pronóstico es si los órganos siguen respondiendo a la vez</h2>
    <p style="margin: 26px 0 0; color: #E8E6DECC; font: 22px/1.45 {ARI};">Páncreas, hígado, músculo, tejido adiposo e intestino responden a una comida en un orden y con un ritmo. Cuando ese orden se conserva, la resistencia a la insulina puede quedarse compensada durante décadas. Cuando se pierde, el cuadro progresa.</p>
    <p style="margin: 20px 0 0; color: #E8E6DE99; font: 21px/1.45 {ARI};">La mayoría de las personas con resistencia a la insulina nunca desarrolla diabetes. Quienes llevan décadas resistentes y siguen compensados son el grupo que puede decir qué los separa de quienes sí progresan.</p>
  </div>
  <div style="position: absolute; right: 60px; top: 214px; width: 420px;">
    {trinq}
    <div style="margin-top: 18px; color: #E8E6DECC; font: 21px/1.45 {ARI};"><strong style="color: {CREAM}; font-weight: 400;">Trinquete:</strong> el sistema se defiende cerrando una vía. Pasa la amenaza y la vía sigue cerrada. Avanza en un solo sentido.</div>
  </div>
"""
escribe("S02_Tesis.dc.html", slide(E0, cuerpo, dark=True))

# ── 03 EL COSTE ─────────────────────────────────────────────────────────────
EJES = [("Quemar glucosa", "glucólisis"), ("Liberar grasa", "lipólisis"),
        ("Degradar proteína", "proteólisis"), ("Producir cuerpos cetónicos", "cetogénesis")]
ejes = "".join(f'<div style="border-top: 3px solid {TEAL}; padding-top: 14px;">'
               f'<div style="font: 24px/1.2 {GEO}; color: {INK};">{a}</div>'
               f'<div style="margin-top: 8px; font: 18px {ARI}; color: {MUTED};">{b}</div></div>' for a, b in EJES)
cuerpo = (titulo("Resistencia a la insulina significa que hace falta más insulina para el mismo efecto", 106, 1080, 40)
 + f"""
  <div style="position: absolute; left: 64px; top: 214px; width: 1152px; border: 2px solid {LINE}; border-radius: 4px; padding: 28px 36px;">
    <div style="font: 30px/1.3 {GEO}; color: {INK};">Resistencia a la insulina&nbsp; = &nbsp;aumento de <em style="color: {TEAL};">w</em> en los operadores dependientes de insulina</div>
    <div style="margin-top: 14px; font: 22px/1.42 {ARI}; color: {INK};">Es decir: subió el precio —<em>w</em>— de cada acción que la insulina ordena —los operadores—.</div>
    <div style="margin-top: 12px; font: 21px/1.42 {ARI}; color: {BODY};">La célula sigue sabiendo hacer lo que hacía. Necesita más señal para conseguir el mismo resultado. Clamp, HOMA y Matsuda miden ese precio, cada uno en un órgano distinto.</div>
  </div>
  <div style="position: absolute; left: 64px; top: 468px; width: 1152px;">
    <div style="color: {MUTED}; font: 17px {ARI}; letter-spacing: 2.2px; text-transform: uppercase; margin-bottom: 16px;">Y no es un solo número: la insulina ordena cuatro cosas, y alguien puede ser resistente en una y normal en las otras tres</div>
    <div style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 30px;">{ejes}</div>
  </div>
""")
escribe("S03_Coste.dc.html", slide(E0, cuerpo, source="[EVIDENCIA] Shaham 2008, PMID 18682704"))

# ── 04 · 05 · 06 LAS TRES RESISTENCIAS ──────────────────────────────────────
def resistencia(sigla, etq, tit, svg, distingue, conducta, color, cierre=None, source=None):
    bot = 214 if cierre else 96
    cuerpo = (etiqueta(etq, 100, sigla=sigla, siglacolor=color)
      + titulo(tit, 178, 640, 40)
      + f'<div style="position: absolute; right: 64px; top: 150px; width: 420px;">{svg}</div>'
      + f"""
  <div style="position: absolute; left: 64px; bottom: {bot}px; width: 1152px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 56px;">
    <div style="border-top: 3px solid {LINE}; padding-top: 18px;">
      <div style="color: {MUTED}; font: 17px {ARI}; letter-spacing: 2.2px; text-transform: uppercase; margin-bottom: 12px;">Cómo se distingue</div>
      <div style="font: 23px/1.42 {ARI}; color: {INK};">{distingue}</div>
    </div>
    <div style="border-top: 3px solid {color}; padding-top: 18px;">
      <div style="color: {color}; font: 17px {ARI}; letter-spacing: 2.2px; text-transform: uppercase; margin-bottom: 12px;">Qué conducta pide</div>
      <div style="font: 23px/1.42 {ARI}; color: {INK};">{conducta}</div>
    </div>
  </div>""")
    if cierre: cuerpo += banda(cierre, TEAL, bottom=92, size=24)
    return slide(E0, cuerpo, source=source)

svg_w = f"""<svg viewBox="0 0 420 208" style="width: 420px; height: 208px;" aria-hidden="true">
    <path d="M 24 180 h 380 M 24 180 v -160" stroke="{LINE}" stroke-width="2"></path>
    <text x="14" y="22" text-anchor="end" font-family="{ARI}" font-size="17" fill="{MUTED}">respuesta</text>
    <text x="404" y="204" text-anchor="end" font-family="{ARI}" font-size="17" fill="{MUTED}">insulina</text>
    <path d="M 28 174 C 96 168, 122 44, 186 34" fill="none" stroke="{TEAL}" stroke-width="3.4"></path>
    <path d="M 28 177 C 150 173, 210 60, 380 42" fill="none" stroke="{CORAL}" stroke-width="3.4" stroke-dasharray="9 6"></path>
    <path d="M 194 112 h 118" stroke="{CORAL}" stroke-width="2.4"></path>
    <path d="M 312 112 l -12 -6 l 1 12 z" fill="{CORAL}"></path>
    <text x="253" y="102" text-anchor="middle" font-family="{ARI}" font-size="18" fill="{CORAL}">hace falta más</text>
  </svg>"""
escribe("S04_w.dc.html", resistencia("w", "primera de tres · subió el precio de la insulina",
  "El tejido sigue respondiendo, y ahora necesita más insulina para lo mismo", svg_w,
  "Con suficiente insulina la respuesta aparece completa. Solo hace falta más insulina que antes para conseguirla. En la curva, la respuesta es la misma y se corre hacia la derecha.",
  "Dar más señal, o bajarle la demanda al sistema.", TEAL))

svg_c = f"""<svg viewBox="0 0 420 208" style="width: 420px; height: 208px;" aria-hidden="true">
    <path d="M 16 104 h 116" stroke="{INK}" stroke-width="3.4" fill="none"></path>
    <path d="M 132 104 C 214 104, 214 44, 320 44" stroke="{TEAL}" stroke-width="3.4" fill="none"></path>
    <path d="M 132 104 C 214 104, 214 164, 320 164" stroke="{MUTED}" stroke-width="3.4" fill="none" stroke-dasharray="8 7" opacity="0.6"></path>
    <path d="M 326 44 l -13 -6 l 1 13 z" fill="{TEAL}"></path>
    <text x="342" y="50" font-family="{ARI}" font-size="18" fill="{TEAL}">abierta</text>
    <g transform="translate(320,164)"><circle cx="0" cy="0" r="17" fill="{PAPER}" stroke="{CORAL}" stroke-width="3"></circle>
    <path d="M -6 -6 l 12 12 M 6 -6 l -12 12" stroke="{CORAL}" stroke-width="3"></path></g>
    <text x="346" y="170" font-family="{ARI}" font-size="18" fill="{CORAL}">cerrada</text>
  </svg>"""
escribe("S05_C.dc.html", resistencia("C", "segunda de tres · se cerró una vía de respuesta",
  "El tejido dejó de responder por una vía, y esa no se abre con más insulina", svg_c,
  "Se da insulina suficiente y esa vía no responde. Otra vía del mismo tejido sí responde con esa misma insulina. Hay que probar las dos por separado para verlo.",
  "Trabajar por la vía que sigue abierta. Insistir en la cerrada produce poco cambio.", AMBER))

svg_s = f"""<svg viewBox="0 0 420 208" style="width: 420px; height: 208px;" aria-hidden="true">
    <circle cx="92" cy="104" r="46" fill="none" stroke="{INK}" stroke-width="3"></circle>
    <circle cx="328" cy="104" r="46" fill="none" stroke="{INK}" stroke-width="3"></circle>
    <path d="M 144 96 h 32 M 190 96 h 32 M 236 96 h 32 M 144 112 h 32 M 190 112 h 32 M 236 112 h 32" stroke="{MUTED}" stroke-width="3.2" opacity="0.4"></path>
    <path d="M 172 62 l 70 84" stroke="{CORAL}" stroke-width="3.6"></path>
    <text x="210" y="192" text-anchor="middle" font-family="{ARI}" font-size="18" fill="{CORAL}">ya no juntos</text>
  </svg>"""
escribe("S06_Sigma.dc.html", resistencia("Σ", "tercera de tres · se perdió el orden entre órganos",
  "Cada órgano responde bien por su cuenta, y dejaron de responder en el mismo orden", svg_s,
  "Se iguala la insulina que recibe cada órgano y la fuerza con la que responde. Aun así, sus respuestas dejan de ocurrir en el orden esperado y con el retraso esperado entre una y otra.",
  "Devolverles el ritmo. Subir la insulina aquí puede empeorar el desorden.", CORAL,
  cierre="Dos personas con el mismo índice de resistencia pueden estar en cualquiera de las tres situaciones. La diferencia se mide con datos que ya se recogen en consulta."))
print("apertura · 6 láminas")
