# -*- coding: utf-8 -*-
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from chrome import *
E1 = "Parte I · Los cinco lugares donde aparece la falla"

# ── 23 MAFA Y PDX1 ──────────────────────────────────────────────────────────
cuerpo = (titulo("El atavismo tiene nombre molecular: MafA y Pdx1", 118, 1100, 46)
 + plomo("<strong style=\"font-weight:400;color:#E8E6DE\">Qué es el atavismo.</strong> Una célula especializada conserva su oficio porque expresa unos genes que la definen. Cuando deja de expresarlos no muere: retrocede a una forma más simple, parecida a la que tenía antes de especializarse. En la célula beta esos dos genes son <strong style=\"font-weight:400;color:#E8E6DE\">MafA</strong> y <strong style=\"font-weight:400;color:#E8E6DE\">Pdx1</strong>.", 210, 1100, 24)
 + f"""
  <div style="position: absolute; left: 64px; top: 366px; width: 1152px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 56px;">
    <div style="border-top: 3px solid {TEAL}; padding-top: 20px;">
      <div style="color: {TEAL}; font: 17px {ARI}; letter-spacing: 2.2px; text-transform: uppercase; margin-bottom: 14px;">Lo que sigue en pie</div>
      <div style="font: 24px/1.4 {GEO}; color: {INK};">Sigue viva y se cuenta igual en la histología. No hay pérdida de masa en esta etapa.</div>
    </div>
    <div style="border-top: 3px solid {CORAL}; padding-top: 20px;">
      <div style="color: {CORAL}; font: 17px {ARI}; letter-spacing: 2.2px; text-transform: uppercase; margin-bottom: 14px;">Lo que dejó de hacer</div>
      <div style="font: 24px/1.4 {GEO}; color: {INK};">Fabricar y secretar insulina.</div>
    </div>
  </div>
"""
 + banda("El conteo de células beta no distingue una cosa de la otra. Un páncreas puede tener la masa conservada y no estar produciendo.", AMBER, bottom=88, size=24))
escribe("S23_MafaPdx1.dc.html", slide(E1, cuerpo, source="[EVIDENCIA] Cinti 2016, PMID 26713822"))

# ── 24 LA CORRECCIÓN PASA AL SNC ────────────────────────────────────────────
cuerpo = (texto(160, 1060, [T("Sin pulsos eficientes, quien decide pasa a ser el sistema nervioso central", 48, color=CREAM),
   P("El páncreas ya no puede resolverlo repartiendo la insulina en el tiempo. Entonces el que manda pasa a ser el circuito del sistema nervioso central que fija <strong style=\"font-weight:400;color:#E8E6DE\">qué nivel de glucosa hay que defender</strong>.", 26, color="#E8E6DECC", mt=30)], left=88)
 + banda("Y ese circuito puede mover ese nivel hacia arriba.", GOLD, bottom=146, size=30, left=88, ink=CREAM))
escribe("S24_EscalaSNC.dc.html", slide(E1, cuerpo, dark=True))

# ── 25 CÓMO ENTRA LA AGRESIÓN ───────────────────────────────────────────────
cuerpo = (texto(104, 620, [T("Cómo entra la agresión al hipotálamo", 40),
   P("El circuito que fija qué nivel de glucosa defender está en el hipotálamo, en dos zonas: el <strong style=\"font-weight:400;color:#E8E6DE\">núcleo arcuato</strong> y el <strong style=\"font-weight:400;color:#E8E6DE\">hipotálamo basal lateral</strong>.", 21, mt=16)])
 + f'<div style="position: absolute; right: 64px; top: 132px; width: 540px; height: 295px; background: #000; border-radius: 3px; overflow: hidden;"><img src="lamina-microglia.jpg" alt="" style="width: 100%; height: 100%; object-fit: cover; display: block;"></div>'
 + f'<div style="position: absolute; right: 64px; top: 444px; width: 540px; font: 20px/1.4 {ARI}; color: {BODY};">A la izquierda, la microglía en reposo: muchas ramas finas y largas. A la derecha, activada: el cuerpo engrosado y las ramas cortas.</div>'
 + pasos([("1", "Los ácidos grasos saturados de la dieta cruzan la barrera hematoencefálica y llegan al hipotálamo.", AMBER),
          ("2", "Entre las <strong style=\"font-weight:400\">24 y las 72 horas</strong>, la microglía —las células de defensa del propio tejido nervioso— responde con inflamación en el núcleo arcuato.", CORAL),
          ("3", "Esa inflamación deshace las <strong style=\"font-weight:400\">redes perineuronales</strong>, las mallas que envuelven y sostienen a esas neuronas.", CORAL)],
         258, ancho=620, pad=12, size=20, numcol=44, gap=18)
 + banda("Ocurre antes de que haya ganancia de peso, y antes de que se dañe nada fuera del sistema nervioso.", TEAL, bottom=84, size=22, width=620))
escribe("S25_Hipotalamo.dc.html", slide(E1, cuerpo,
  source="[EVIDENCIA] Thaler 2012 · modelo animal · la imagen es ilustración, no microscopía"))

# ── 26 CUARTO LUGAR · E ─────────────────────────────────────────────────────
cuerpo = (etiqueta("cuarto lugar · qué valor defiende el cuerpo", 100, sigla="E")
 + titulo("El hipotálamo se inflama y sube el nivel de glucosa que defiende", 156, 600, 34)
 + f"""
  <svg viewBox="0 0 540 300" style="position: absolute; right: 64px; top: 158px; width: 540px; height: 300px;" aria-hidden="true">
    <g transform="translate(50,14)">
      <path d="M 0 0 v 244 h 470" fill="none" stroke="{LINE}" stroke-width="2"></path>
      <text x="4" y="-4" text-anchor="start" font-family="{ARI}" font-size="17" fill="{MUTED}">glucemia</text>
      <text x="470" y="270" text-anchor="end" font-family="{ARI}" font-size="17" fill="{MUTED}">años</text>
      <path d="M 0 188 h 470" stroke="{TEAL}" stroke-width="2.2" stroke-dasharray="8 7"></path>
      <text x="470" y="178" text-anchor="end" font-family="{ARI}" font-size="18" fill="{TEAL}">nivel original</text>
      <path d="M 0 88 h 470" stroke="{CORAL}" stroke-width="2.2" stroke-dasharray="8 7"></path>
      <text x="470" y="78" text-anchor="end" font-family="{ARI}" font-size="18" fill="{CORAL}">nivel que ahora defiende</text>
      <polyline points="0,192 46,186 92,190 138,162 184,116 230,92 276,98 320,90 364,96 410,88 470,92"
        fill="none" stroke="{INK}" stroke-width="3.4" stroke-linejoin="round"></polyline>
      <g stroke="{PURPLE}" stroke-width="3" fill="none">
        <path d="M 300 98 v 54"></path><path d="M 300 152 l -7 -13 M 300 152 l 7 -13"></path>
        <path d="M 340 152 v -54"></path><path d="M 340 98 l -7 13 M 340 98 l 7 13"></path>
      </g>
      <text x="320" y="218" text-anchor="middle" font-family="{ARI}" font-size="18" fill="{PURPLE}">se baja · se vuelve a subir</text>
    </g>
  </svg>
"""
 + texto(300, 600, [P("<strong style=\"font-weight:400;color:#E8E6DE\">Qué significa defender un valor.</strong> El cuerpo mantiene la glucosa dentro de un rango porque hay un circuito que sabe cuál es ese rango y corrige cuando se sale. Funciona como un termostato: si la glucosa baja de lo esperado, manda subirla.", 21, mt=0),
   P("<strong style=\"font-weight:400;color:#E8E6DE\">Lo que cambia.</strong> Después de la inflamación, ese circuito sube el nivel que considera correcto. Una glucosa normal empieza a leerse como demasiado baja, y el cuerpo la corrige hacia arriba.", 21, mt=16)])
 + banda("Cuando al bajar la glucosa el cuerpo la vuelve a subir siempre en la misma dirección, lo que se movió es el valor que defiende, y no la capacidad del páncreas de responder.", TEAL, bottom=88, size=23))
escribe("S26_E.dc.html", slide(E1, cuerpo,
  source="Que ese umbral se puede mover está demostrado en pacientes. Que la inflamación sea la causa, no · [HIPÓTESIS]"))
print("parte I d1 · 4 láminas")
