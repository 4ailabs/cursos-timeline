# -*- coding: utf-8 -*-
import sys, os, math
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from chrome import *
E1 = "Parte I · Los cinco lugares donde aparece la falla"

# ── 18 SEGUNDO LUGAR · H ────────────────────────────────────────────────────
cuerpo = (etiqueta("segundo lugar · cuánto alcanza a anticipar", 100, sigla="H")
 + titulo("El hígado deja de informar, y el páncreas deja de anticipar", 158, 1100, 42)
 + f"""
  <svg viewBox="0 0 1060 268" style="position: absolute; left: 64px; top: 240px; width: 1152px; height: 291px;" aria-hidden="true">
    <g transform="translate(70,10)">
      <path d="M 0 0 v 220 h 950" fill="none" stroke="{LINE}" stroke-width="2"></path>
      <text x="-14" y="14" text-anchor="end" font-family="{ARI}" font-size="18" fill="{MUTED}">insulina</text>
      <text x="950" y="246" text-anchor="end" font-family="{ARI}" font-size="18" fill="{MUTED}">minutos</text>
      <polyline points="0,204 56,204 80,198 96,30 116,20 136,50 160,134 198,150 260,140 356,126 500,110 660,94 830,82 950,78"
        fill="none" stroke="{TEAL}" stroke-width="4" stroke-linejoin="round"></polyline>
      <polyline points="0,204 56,204 94,202 148,194 222,186 336,172 500,156 660,142 830,130 950,124"
        fill="none" stroke="{CORAL}" stroke-width="4" stroke-dasharray="11 8" stroke-linejoin="round"></polyline>
      <circle cx="116" cy="20" r="6" fill="{TEAL}"></circle>
      <text x="140" y="18" font-family="{ARI}" font-size="20" fill="{TEAL}">con primera fase — se adelanta</text>
      <circle cx="222" cy="186" r="6" fill="{CORAL}"></circle>
      <text x="244" y="192" font-family="{ARI}" font-size="20" fill="{CORAL}">sin primera fase — solo corrige tarde</text>
    </g>
  </svg>
"""
 + banda("Sin ese adelanto el cuerpo deja de prepararse, y solo reacciona cuando la glucosa ya está alta.", TEAL, bottom=88, size=24))
escribe("S18_H.dc.html", slide(E1, cuerpo,
  source="[EVIDENCIA] la pérdida de primera fase · [HIPÓTESIS] el paso hepatocito–nervio vago"))

# ── 19 LAS DOS OBJECIONES ───────────────────────────────────────────────────
cuerpo = (texto(112, 1100, [T("Este hallazgo admite dos lecturas, y hoy no se pueden separar", 44),
   P("En hijos y hermanos de personas con diabetes, sanos y con azúcar normal, la insulina ya sale en pulsos irregulares.", 25, mt=18)])
 + f"""
  <div style="position: absolute; left: 64px; top: 300px; width: 1152px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 56px;">
    <div style="border-top: 3px solid {CORAL}; padding-top: 20px;">
      <div style="color: {CORAL}; font: 17px {ARI}; letter-spacing: 2.2px; text-transform: uppercase; margin-bottom: 14px;">Otra lectura · pudo ser así desde siempre</div>
      <div style="font: 24px/1.4 {GEO}; color: {INK};">El desajuste puede ser un rasgo con el que se nace, y no algo que se perdió por el camino. Para separar las dos hay que medir a la misma persona dos veces, con años de diferencia, y ver si empeoró. <strong style="font-weight:400">Nadie lo ha hecho.</strong></div>
    </div>
    <div style="border-top: 3px solid {CORAL}; padding-top: 20px;">
      <div style="color: {CORAL}; font: 17px {ARI}; letter-spacing: 2.2px; text-transform: uppercase; margin-bottom: 14px;">Otra lectura · el orden al revés</div>
      <div style="font: 24px/1.4 {GEO}; color: {INK};">Puede que primero venga el exceso de insulina, y la resistencia sea su consecuencia tras años de exposición. Se separa comparando personas que hayan recibido la misma cantidad de insulina a lo largo del tiempo.</div>
    </div>
  </div>
"""
 + banda("Mientras no se separen, no se puede afirmar que la coordinación se perdió. Solo que hoy no está.", MUTED, bottom=88, size=24))
escribe("S19_Objeciones.dc.html", slide(E1, cuerpo, source="[HIPÓTESIS] · las dos lecturas rivales"))

# ── 20 SIN PULSOS ───────────────────────────────────────────────────────────
def onda(pulsada):
    p = []
    for i in range(0, 461, 3):
        y = 56 - 40 * max(0.0, math.sin(i/36.0))**3 if pulsada else 32 + 3*math.sin(i/10.0)
        p.append("%.1f,%.1f" % (i, y))
    return " ".join(p)
cuerpo = (texto(110, 1100, [T("Cuando la insulina deja de salir en pulsos, la célula beta se queda sin pausas", 42),
   P("<strong style=\"font-weight:400;color:#E8E6DE\">Por qué importan los pulsos.</strong> El hígado responde al pulso, no al promedio. La misma cantidad de insulina, dada en pulsos cada 13 minutos, frena la producción hepática de glucosa más que dada de forma continua. Con pulsos cada 26 minutos el beneficio ya desaparece.", 23, mt=18)])
 + f"""
  <svg viewBox="0 0 1020 180" style="position: absolute; left: 64px; top: 342px; width: 1152px; height: 190px;" aria-hidden="true">
    <text x="0" y="16" font-family="{ARI}" font-size="18" letter-spacing="2" fill="{TEAL}">EN TANDAS COORDINADAS</text>
    <g transform="translate(0,32)"><polyline points="{onda(True)}" fill="none" stroke="{TEAL}" stroke-width="3.4"></polyline>
    <path d="M 0 60 h 462" stroke="{LINE}" stroke-width="2"></path></g>
    <text x="558" y="16" font-family="{ARI}" font-size="18" letter-spacing="2" fill="{CORAL}">SIN PARAR</text>
    <g transform="translate(558,32)"><polyline points="{onda(False)}" fill="none" stroke="{CORAL}" stroke-width="3.4"></polyline>
    <path d="M 0 60 h 462" stroke="{LINE}" stroke-width="2"></path></g>
  </svg>
"""
 + banda("La célula beta pasa de soltar insulina en tandas a soltarla sin parar. Se queda sin los intervalos de descanso entre una descarga y la siguiente, y el esfuerzo de secretar se vuelve permanente.", CORAL, bottom=88, size=23))
escribe("S20_SinPulsos.dc.html", slide(E1, cuerpo,
  source="[EVIDENCIA] el efecto de los pulsos sobre el hígado · la evidencia es mixta: un análisis reciente en personas sin diabetes no encontró asociación clara"))

# ── 22 SUPERADITIVIDAD ──────────────────────────────────────────────────────
cuerpo = (etiqueta("lo que tiene el conjunto y no tienen las partes", 100, sigla="Σ<sub style=\"font-size: 24px;\">int</sub>")
 + titulo("Un islote conectado resuelve mejor que la suma de sus células. Uno desconectado es exactamente esa suma.", 158, 1100, 38)
 + f"""
  <div style="position: absolute; left: 64px; top: 300px; width: 560px;">
    <div style="border: 2px solid {LINE}; border-radius: 4px; padding: 26px 32px;">
      <div style="font: 34px/1.2 {GEO}; color: {TEAL}; text-align: center;">Σ<sub style="font-size:20px">int</sub> &nbsp;=&nbsp; K<sub style="font-size:20px">total</sub> &nbsp;−&nbsp; Σ K<sub style="font-size:20px">j</sub></div>
    </div>
    <div style="margin-top: 20px; font: 21px/1.45 {ARI}; color: {BODY};"><strong style="font-weight:400;color:#E8E6DE">K</strong> mide cuánto le ahorra a un sistema resolver un problema, frente a buscarlo al azar. <strong style="font-weight:400;color:#E8E6DE">Σ<sub>int</sub></strong> es la parte de esa eficiencia que está en el conjunto y no está en ninguna de sus células por separado.</div>
  </div>
  <div style="position: absolute; right: 64px; top: 300px; width: 528px;">
    <div style="display: grid; grid-template-columns: 140px minmax(0, 1fr); gap: 22px; padding: 16px 0; border-bottom: 1px solid {LINE}; align-items: baseline;">
      <div style="font: 26px {GEO}; color: {TEAL};">Σ<sub style="font-size:16px">int</sub> &gt; 0</div>
      <div style="font: 21px/1.4 {ARI}; color: {INK};">El conjunto resuelve mejor que la suma de sus partes — <strong style="font-weight:400">superaditivo</strong></div>
    </div>
    <div style="display: grid; grid-template-columns: 140px minmax(0, 1fr); gap: 22px; padding: 16px 0; align-items: baseline;">
      <div style="font: 26px {GEO}; color: {CORAL};">Σ<sub style="font-size:16px">int</sub> = 0</div>
      <div style="font: 21px/1.4 {ARI}; color: {INK};">El conjunto es exactamente la suma de sus partes</div>
    </div>
    <div style="margin-top: 16px; font: 20px/1.4 {ARI}; color: {MUTED};">Sesenta músicos excelentes tocando bien, en la misma sala y al mismo tiempo, no son una orquesta. Lo que les falta es esto.</div>
  </div>
"""
 + banda("Un cuerpo sano es superaditivo. Un cuerpo diabético es exactamente la suma de sus partes. <strong style=\"font-weight:400\">Y eso se calcula: es una resta.</strong>", TEAL, bottom=74, size=22))
escribe("S22_Superaditividad.dc.html", slide(E1, cuerpo,
  source="La forma de medir Σint es propuesta del equipo docente, sin publicar"))
print("parte I c · 4 láminas")
