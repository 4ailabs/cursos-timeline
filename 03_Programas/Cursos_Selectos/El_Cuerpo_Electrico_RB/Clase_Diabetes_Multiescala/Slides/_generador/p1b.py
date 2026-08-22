# -*- coding: utf-8 -*-
import sys, os, math
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from chrome import *
E1 = "Parte I · Los cinco lugares donde aparece la falla"
FLEX = 'Φ<sub style="font-size: 24px;">flex</sub>'

# ── 13 PRIMER LUGAR ─────────────────────────────────────────────────────────
def ruta(y, label, color, dash, op):
    return (f'<path d="M 60 120 C 110 120, 122 {y}, 178 {y} L 350 {y} C 406 {y}, 418 120, 468 120" '
            f'fill="none" stroke="{color}" stroke-width="4" opacity="{op}" {dash}></path>'
            f'<text x="264" y="{y-14}" text-anchor="middle" font-family="{ARI}" font-size="19" fill="{color}" opacity="{op}">{label}</text>')
svg = f"""<svg viewBox="0 0 540 258" style="width: 540px; height: 258px;" aria-hidden="true">
    <text x="0" y="16" font-family="{ARI}" font-size="17" letter-spacing="2" fill="{CORAL}">LA VÍA DE LOS ÁCIDOS GRASOS DEJA DE ABRIRSE</text>
    <g transform="translate(0,28)">
      <circle cx="34" cy="120" r="22" fill="none" stroke="{INK}" stroke-width="3"></circle>
      {ruta(56, "glucosa", TEAL, "", "1")}
      {ruta(190, "ácidos grasos", MUTED, 'stroke-dasharray="9 8"', "0.5")}
      <rect x="468" y="96" width="50" height="48" rx="4" fill="none" stroke="{INK}" stroke-width="3"></rect>
      <text x="493" y="127" text-anchor="middle" font-family="{GEO}" font-size="19" fill="{INK}">ATP</text>
      <g transform="translate(264,190)"><circle cx="0" cy="0" r="19" fill="{PAPER}" stroke="{CORAL}" stroke-width="3"></circle>
      <path d="M -7 -7 l 14 14 M 7 -7 l -14 14" stroke="{CORAL}" stroke-width="3"></path></g>
    </g></svg>"""
cuerpo = (etiqueta("primer lugar · la capacidad de cambiar de combustible", 100, sigla=FLEX)
 + titulo("El músculo pierde la capacidad de cambiar de combustible antes de que se altere ningún análisis", 158, 640, 36)
 + f'<div style="position: absolute; right: 64px; top: 246px; width: 540px;">{svg}</div>'
 + plomo("<strong style=\"font-weight:400;color:#E8E6DE\">Lo normal.</strong> Después de comer, el músculo quema glucosa. Pasadas unas horas sin comer, la deja y pasa a quemar ácidos grasos. Cambia de combustible según la hora y según el esfuerzo.", 328, 600, 22)
 + plomo("<strong style=\"font-weight:400;color:#E8E6DE\">Lo que se pierde.</strong> Ese cambio se vuelve lento y parcial. El músculo se queda en un combustible y ya no pasa al otro cuando toca.", 460, 600, 22)
 + banda("La célula sigue sabiendo quemar glucosa y sigue sabiendo quemar grasa. Lo que perdió es pasar de una a la otra cuando el momento lo pide.", TEAL, bottom=92, size=23))
escribe("S13_Phiflex.dc.html", slide(E1, cuerpo,
  source="Se detecta en jóvenes sanos, hijos de padre o madre con diabetes, con todos los análisis normales · [EVIDENCIA]"))

# ── 14 LAS TRES CAUSAS ──────────────────────────────────────────────────────
i_sed = f"""<rect x="6" y="60" width="120" height="4" fill="{LINE}"></rect>
  <circle cx="40" cy="30" r="12" fill="none" stroke="{INK}" stroke-width="3"></circle>
  <path d="M 40 42 v 18 M 40 50 l -15 10 M 40 50 l 15 10" stroke="{INK}" stroke-width="3" fill="none"></path>
  <path d="M 80 24 v 36 M 104 24 v 36 M 80 42 h 24" stroke="{MUTED}" stroke-width="3" opacity="0.45"></path>
  <path d="M 74 18 l 36 48" stroke="{CORAL}" stroke-width="3.4"></path>"""
i_her = f"""<g stroke="{INK}" stroke-width="3" fill="none">
  <path d="M 44 6 C 84 28, 44 40, 84 62 C 44 74, 84 86, 44 94"></path>
  <path d="M 104 6 C 64 28, 104 40, 64 62 C 104 74, 64 86, 104 94"></path></g>
  <g fill="{CORAL}"><circle cx="70" cy="24" r="6"></circle><circle cx="92" cy="50" r="6"></circle><circle cx="70" cy="76" r="6"></circle></g>"""
i_cont = f"""<circle cx="42" cy="44" r="28" fill="none" stroke="{INK}" stroke-width="3"></circle>
  <path d="M 42 24 v 20 h 13" stroke="{INK}" stroke-width="3" fill="none"></path>
  <path d="M 82 28 h 42 M 82 44 h 42 M 82 60 h 42 M 82 76 h 42" stroke="{AMBER}" stroke-width="4"></path>"""
CAUSAS = [
 (i_sed, "Sedentarismo", "Sin esfuerzo físico intenso y regular, el músculo nunca llega a necesitar la grasa como combustible. Las enzimas y los transportadores siguen ahí.",
  "Una vía que no se usa responde cada vez más lento.", "[DERIVADO]", CORAL),
 (i_her, "Antecedente familiar", "Los hijos de padre o madre con diabetes tipo 2 nacen con mitocondrias musculares que transportan y queman menos grasa que las de otra persona de su edad.",
  "No están enfermos. Parten con menos margen antes de que la vía se cierre.", "[EVIDENCIA]", TEAL),
 (i_cont, "Aporte continuo", "Comiendo cada pocas horas, la glucosa y la insulina nunca bajan del todo. El músculo se queda quemando azúcar y no alcanza a pasar a la grasa.",
  "El cambio de combustible necesita el contraste entre comer y no comer. Sin contraste, no se dispara.", "[DERIVADO]", AMBER),
]
cols = "".join(f"""
    <div style="border-top: 3px solid {c}; padding-top: 20px;">
      <svg viewBox="0 0 130 96" style="width: 118px; height: 87px;" aria-hidden="true">{ico}</svg>
      <div style="margin-top: 14px; font: 400 28px/1.16 {GEO}; color: {INK};">{t}</div>
      <div style="margin-top: 14px; font: 21px/1.42 {ARI}; color: {BODY};">{d}</div>
      <div style="margin-top: 14px; font: 21px/1.42 {ARI}; color: {INK};"><strong style="font-weight:400">{p}</strong></div>
      <div style="margin-top: 14px; font: 17px {ARI}; letter-spacing: 1.8px; color: {c};">{tag}</div>
    </div>""" for ico, t, d, p, tag, c in CAUSAS)
cuerpo = (texto(108, 1100, [T("Tres cosas hacen que el músculo deje de necesitar el cambio de combustible", 42),
                            P("Nada se daña. La capacidad se pierde porque deja de usarse.", 24, mt=18)])
 + f'<div style="position: absolute; left: 64px; top: 254px; width: 1152px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 46px;">{cols}</div>')
escribe("S14_Causas.dc.html", slide(E1, cuerpo))

# ── 15 LA GRASA ECTÓPICA ────────────────────────────────────────────────────
cuerpo = (texto(106, 620, [T("Los ácidos grasos que el músculo no quema se depositan en el hígado", 36),
   P("El tejido adiposo tiene un límite de almacenamiento. Cuando llegan más ácidos grasos de los que puede guardar, y además el músculo no los está quemando, esos ácidos grasos terminan dentro de células que no están hechas para almacenarlos: el hepatocito y la propia fibra muscular.", 21, mt=18),
   P("A la grasa depositada fuera del tejido adiposo se le llama <strong style=\"font-weight:400;color:#E8E6DE\">grasa ectópica</strong>. En el hígado ese depósito daña por sí mismo, y a eso se le llama <strong style=\"font-weight:400;color:#E8E6DE\">lipotoxicidad hepática</strong>.", 21, mt=16)])
 + f'<div style="position: absolute; right: 64px; top: 146px; width: 540px; height: 295px; background: #000; border-radius: 3px; overflow: hidden;"><img src="lamina-higado.jpg" alt="" style="width: 100%; height: 100%; object-fit: cover; display: block;"></div>'
 + f'<div style="position: absolute; right: 64px; top: 460px; width: 540px; font: 20px/1.4 {ARI}; color: {BODY};">A la izquierda, un hepatocito sano. Los demás tienen gotas de lípido de tamaños distintos, y algunas empujan el núcleo contra la membrana.</div>'
 + banda("Ese depósito es lo que despolariza al hepatocito. Y con eso el hígado deja de informar al cerebro.", TEAL, bottom=84, size=23, width=620))
escribe("S15_Ectopica.dc.html", slide(E1, cuerpo, source="Ilustración en el estilo de un corte histológico. No es una microscopía"))

# ── 16 QUÉ ES ANTICIPAR ─────────────────────────────────────────────────────
HITOS = [("Olor de la comida", TEAL), ("Masticación", TEAL), ("Paso por el tubo", TEAL),
         ("Primera fase de insulina", AMBER), ("La glucosa sube", MUTED)]
h = []
for k, (t, c) in enumerate(HITOS):
    x = k*222
    h.append(f'<circle cx="{x+16}" cy="34" r="10" fill="{c}"></circle>')
    if k < 4: h.append(f'<path d="M {x+30} 34 h 176" stroke="{LINE}" stroke-width="3"></path>')
    h.append(f'<text x="{x+16}" y="84" font-family="{ARI}" font-size="19" fill="{INK}">{t}</text>')
cuerpo = (titulo("Anticipar es soltar la insulina antes de que la glucosa suba", 106, 1100, 42)
 + f'<svg viewBox="0 0 1152 104" style="position: absolute; left: 64px; top: 208px; width: 1152px; height: 104px;" aria-hidden="true">{"".join(h)}</svg>'
 + texto(344, 1100, [P("El olor de la comida, la masticación y el paso de los alimentos por el tubo digestivo disparan reflejos nerviosos y hormonales que llegan al páncreas <strong style=\"font-weight:400;color:#E8E6DE\">antes que la comida</strong>. A esas señales que se adelantan se les llama <strong style=\"font-weight:400;color:#E8E6DE\">líneas de retardo</strong>.", 23, mt=0),
   P("<strong style=\"font-weight:400;color:#E8E6DE\">Para qué sirve.</strong> Si la insulina ya está circulando cuando la glucosa entra, la subida se amortigua y no hace falta un pico grande después. Si la insulina llega tarde, la glucosa sube primero y la corrección tiene que ser mayor.", 23, mt=16)])
 + banda("Ese adelanto se mide: es el pico de insulina de los primeros minutos, cuando la glucosa todavía no ha subido. Cuando desaparece, el cuerpo solo corrige tarde.", TEAL, bottom=88, size=23))
escribe("S16_Anticipar.dc.html", slide(E1, cuerpo))
print("parte I b1 · 4 láminas")
