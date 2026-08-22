# -*- coding: utf-8 -*-
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from chrome import *
E1 = "Parte I · Los cinco lugares donde aparece la falla"

def lista(items, color):
    return "".join(f'<div style="display: grid; grid-template-columns: 22px minmax(0, 1fr); gap: 16px; padding: 9px 0; align-items: baseline;">'
                   f'<div style="width: 10px; height: 10px; border-radius: 50%; background: {color};"></div>'
                   f'<div style="font: 20px/1.34 {ARI}; color: {INK};">{t}</div></div>' for t in items)

def trinquete(sigla, etq, tit, bloques, porque, color, source=None):
    b = "".join(f'<div style="border-top: 3px solid {c}; padding-top: 18px;">'
                f'<div style="color: {c}; font: 17px {ARI}; letter-spacing: 2.2px; text-transform: uppercase; margin-bottom: 12px;">{k}</div>{h}</div>'
                for k, c, h in bloques)
    cuerpo = (etiqueta(etq, 100, sigla=sigla, siglacolor=color)
      + titulo(tit, 158, 1100, 38)
      + f'<div style="position: absolute; left: 64px; top: 252px; width: 1152px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 56px;">{b}</div>'
      + banda(porque, color, "Por qué no revierte", bottom=72, size=21))
    return slide(E1, cuerpo, source=source)

# ── 28 EL AMILOIDE ──────────────────────────────────────────────────────────
cuerpo = (etiqueta("trinquete 2 de 3 · el amiloide", 100, sigla="T1", siglacolor=PURPLE)
 + texto(158, 620, [T("Una proteína que sale junto con la insulina se deposita entre las células", 34),
   P("<strong style=\"font-weight:400;color:#E8E6DE\">Qué es el IAPP.</strong> El polipéptido amiloide del islote, también llamado <strong style=\"font-weight:400;color:#E8E6DE\">amilina</strong>. La célula beta lo fabrica y lo libera en el mismo gránulo que la insulina, en proporción fija. Tiene función propia: enlentece el vaciamiento del estómago, frena el glucagón y contribuye a la saciedad.", 20, mt=18),
   P("<strong style=\"font-weight:400;color:#E8E6DE\">El mecanismo.</strong> Al compensar la resistencia, el islote secreta más insulina y, con ella, más IAPP. Bajo sobrecarga sostenida esa proteína se pliega mal y forma agregados y fibras que no se disuelven.", 20, mt=14)])
 + f'<div style="position: absolute; right: 64px; top: 146px; width: 540px; height: 295px; background: #000; border-radius: 3px; overflow: hidden;"><img src="lamina-amiloide.jpg" alt="" style="width: 100%; height: 100%; object-fit: cover; display: block;"></div>'
 + f'''<div style="position: absolute; right: 64px; top: 458px; width: 540px;">
    <div style="color: {PURPLE}; font: 17px {ARI}; letter-spacing: 2.2px; text-transform: uppercase; margin-bottom: 10px;">Qué produce</div>
    {lista(["Destruye las uniones de conexina 36 que quedaban en pie.",
            "Aumenta la distancia capilar, y aísla a la célula de su suministro.",
            "Activa el inflamasoma de los macrófagos del islote."], PURPLE)}
  </div>'''
 + banda("La fibra insoluble ocupa el espacio físico entre las células. No hay forma de retirarla cambiando el contexto.", PURPLE, "Por qué no revierte", bottom=76, size=21, width=620))
escribe("S28_T1.dc.html", slide(E1, cuerpo,
  source="Como causa se nombra F3; como restricción que ya no cede, T1 · la imagen es ilustración, no microscopía"))

# ── 29 EL KARMA METABÓLICO ──────────────────────────────────────────────────
escribe("S29_T3.dc.html", trinquete("T3", "trinquete 3 de 3 · el karma metabólico",
  "Un rato de glucosa alta queda escrito sobre el ADN, y no se borra",
  [("Qué hay que saber antes · el mecanismo", AMBER,
    f'<div style="font: 20px/1.36 {GEO}; color: {BODY};">El ADN está enrollado sobre unas proteínas llamadas <strong style="font-weight:400">histonas</strong>. Poner una marca química sobre una histona cambia cuánto se lee el gen que tiene debajo. Esas marcas duran, y se copian cuando la célula se divide.</div>'
    f'<div style="margin-top: 12px; font: 20px/1.36 {GEO}; color: {INK};">Una exposición corta a glucosa alta lleva al núcleo una enzima llamada <strong style="font-weight:400">Set7</strong>, que deposita una marca —<strong style="font-weight:400">H3K4me1</strong>— sobre el <strong style="font-weight:400">promotor</strong> del gen <strong style="font-weight:400">p65</strong>, la zona desde la que se enciende su lectura. Ese gen fabrica una de las dos piezas de <strong style="font-weight:400">NF-κB</strong>, el factor que dispara la respuesta inflamatoria.</div>'),
   ("Qué produce", AMBER, lista([
     "Ese gen inflamatorio se sigue leyendo después.",
     "Pasa en macrófagos, en el endotelio del vaso y en células precursoras."], AMBER))],
  "Aunque se normalice del todo la glucemia, la marca sigue en su sitio y el gen se sigue leyendo. La célula sigue pagando una glucosa que ya pasó: es el <strong style=\"font-weight:400\">karma metabólico</strong>.",
  AMBER, source="[EVIDENCIA] El-Osta 2008 · en la literatura aparece como memoria metabólica"))

# ── 30 EL RECUENTO ──────────────────────────────────────────────────────────
LUG = [("Φ<sub style='font-size:17px'>flex</sub>", "cambiar de combustible", TEAL),
       ("H", "anticipar", TEAL),
       ("Λ · Σ<sub style='font-size:17px'>int</sub>", "conectarse con las vecinas", TEAL),
       ("E", "qué valor defiende", TEAL),
       ("C", "depósitos materiales", CORAL)]
cols = "".join(f'<div style="border-top: 4px solid {c}; padding-top: 16px;">'
               f'<div style="font: 400 30px/1 {GEO}; color: {c};">{s}</div>'
               f'<div style="margin-top: 12px; font: 19px/1.35 {ARI}; color: {BODY};">{t}</div>'
               f'<div style="margin-top: 10px; font: 17px {ARI}; color: {MUTED};">lugar {i+1}</div></div>'
               for i, (s, t, c) in enumerate(LUG))
cuerpo = (titulo("Los cinco lugares, y qué cambió en cada uno", 108, 1000, 44)
 + f'<div style="position: absolute; left: 64px; top: 192px; width: 1152px; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 26px;">{cols}</div>'
 + f"""
  <div style="position: absolute; left: 64px; top: 356px; width: 1152px; display: grid; grid-template-columns: 4fr 1fr; gap: 12px;">
    <div style="background: {TEAL}22; border-left: 4px solid {TEAL}; padding: 12px 18px; font: 19px {ARI}; letter-spacing: 1.6px; color: {TEAL}; text-transform: uppercase;">Todavía se puede intervenir</div>
    <div style="background: {CORAL}22; border-left: 4px solid {CORAL}; padding: 12px 18px; font: 19px {ARI}; letter-spacing: 1.6px; color: {CORAL}; text-transform: uppercase;">Solo frenar</div>
  </div>
  <div style="position: absolute; left: 64px; top: 446px; width: 1152px; border-top: 3px solid {LINE}; padding-top: 16px;">
    <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 56px;">
      <div style="font: 21px/1.38 {ARI}; color: {INK};"><strong style="font-weight:400">S</strong> · los estados que la célula puede alcanzar<br><strong style="font-weight:400">O</strong> · las acciones que sabe ejecutar</div>
      <div style="font: 21px/1.38 {ARI}; color: {BODY};">Hasta el cuarto lugar las dos están intactas: la célula sabe hacer lo que hacía y puede llegar adonde llegaba. Lo que cambió fue el precio, el permiso, la anticipación o el valor defendido.</div>
    </div>
  </div>
"""
 + banda("El orden de los cinco lugares es el de los grupos, no el de las personas.", MUTED, bottom=76, size=21))
escribe("S30_Recuento.dc.html", slide(E1, cuerpo))

# ── 31 EL LÍMITE ────────────────────────────────────────────────────────────
cuerpo = (titulo("En los cuatro primeros todavía se puede intervenir. En el quinto solo se puede frenar.", 116, 1120, 44)
 + plomo("En diabetes ya establecida hay pérdida real de células beta, muerte celular y atavismo. <strong style=\"font-weight:400;color:#E8E6DE\">Ahí S y O sí se pierden</strong>, y afirmar que la maquinaria está intacta es insostenible.", 226, 1100, 25)
 + f"""
  <div style="position: absolute; left: 64px; top: 348px; width: 1152px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 56px;">
    <div style="border-top: 3px solid {TEAL}; padding-top: 20px;">
      <div style="color: {TEAL}; font: 17px {ARI}; letter-spacing: 2.2px; text-transform: uppercase; margin-bottom: 14px;">Intervenir · lugares 1 a 4</div>
      <div style="font: 23px/1.42 {ARI}; color: {INK};">Devolver la demanda de cambiar de combustible. Devolver el contraste entre comer y ayunar. Bajar la inflamación que desconecta a las células.</div>
    </div>
    <div style="border-top: 3px solid {CORAL}; padding-top: 20px;">
      <div style="color: {CORAL}; font: 17px {ARI}; letter-spacing: 2.2px; text-transform: uppercase; margin-bottom: 14px;">Frenar · lugar 5</div>
      <div style="font: 23px/1.42 {ARI}; color: {INK};">Evitar que se depositen más productos de glicación, más amiloide y más marcas sobre el ADN. <strong style="font-weight:400">Lo ya depositado se queda.</strong></div>
    </div>
  </div>
""")
escribe("S31_Limite.dc.html", slide(E1, cuerpo,
  source="[EVIDENCIA] Butler 2003, PMID 12502499 · Cinti 2016, PMID 26713822"))
print("parte I e · 4 láminas · Parte I completa")
