# -*- coding: utf-8 -*-
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from chrome import *
E1 = "Parte I · Los cinco lugares donde aparece la falla"

# ── 07 CUANDO LA RESISTENCIA ES LO CORRECTO ─────────────────────────────────
cuerpo = (titulo("Hay cuatro situaciones donde bajar la sensibilidad a la insulina es lo que debe pasar", 122, 1100, 44)
 + plomo("<strong style=\"font-weight:400;color:#E8E6DE\">Cómo funciona.</strong> Un tejido que puede esperar —casi siempre el músculo— deja de captar glucosa. Esa glucosa se queda circulando, disponible para el tejido que en ese momento la necesita más: las células de defensa, el feto, el hueso que está creciendo.", 262, 1060, 26)
 + plomo("El músculo no perdió la capacidad de captarla. Recibió la orden de no hacerlo. Y cuando la necesidad termina, vuelve a captar como antes.", 400, 1060, 26)
 + banda("Allí el cambio se revierte solo, y los órganos siguen respondiendo coordinados.", TEAL, "Qué las separa de la diabetes", 100, size=26))
escribe("S07_RespuestaCorrecta.dc.html", slide(E1, cuerpo))

# ── 08 · 09 · 10 · 11 LOS CUATRO CONTEXTOS ──────────────────────────────────
def contexto(ico, tit, sub, bloques, tag, color, source=None):
    b = "".join(f'<div style="margin-top: 20px;"><div style="color: {color}; font: 17px {ARI}; letter-spacing: 2.2px; text-transform: uppercase; margin-bottom: 9px;">{k}</div>'
                f'<div style="font: 23px/1.45 {ARI}; color: {INK};">{t}</div></div>' for k, t in bloques)
    cuerpo = f"""
  <svg viewBox="0 0 200 140" style="position: absolute; right: 76px; top: 130px; width: 250px; height: 175px;" aria-hidden="true">{ico}</svg>
  <div style="position: absolute; left: 64px; top: 112px; width: 820px;">
    <h2 style="margin: 0; font: 400 44px/1.1 {GEO}; letter-spacing: -1.3px; color: {color};">{tit}</h2>
    <div style="margin-top: 14px; font: 25px/1.35 {GEO}; color: {INK};">{sub}</div>
    {b}
  </div>
  <div style="position: absolute; right: 64px; bottom: 90px; font: 17px {ARI}; letter-spacing: 2.2px; color: {color};">{tag}</div>
"""
    return slide(E1, cuerpo, source=source)

ic_inf = f"""<ellipse cx="140" cy="52" rx="34" ry="23" transform="rotate(-18 140 52)" fill="none" stroke="{CORAL}" stroke-width="3.4"></ellipse>
  <path d="M 170 66 c 14 8, 6 19, 19 22" fill="none" stroke="{CORAL}" stroke-width="3"></path>
  <rect x="6" y="34" width="52" height="40" rx="5" fill="none" stroke="{INK}" stroke-width="3.4"></rect>
  <path d="M 64 54 h 32" stroke="{TEAL}" stroke-width="3.8"></path><path d="M 100 54 l -15 -9 l 1 18 z" fill="{TEAL}"></path>"""
escribe("S08_Infeccion.dc.html", contexto(ic_inf, "Infección",
  "El combustible pasa del músculo a las células de defensa",
  [("Cómo", "Una avispa parásita infecta a la mosca. La vía de alarma inmunitaria —JAK/STAT— hace que el músculo fabrique una proteína llamada <strong style=\"font-weight:400\">ImpL2</strong>, que bloquea la señal de la insulina en ese mismo músculo. El músculo deja de captar glucosa, y esa glucosa queda para las células que están peleando la infección."),
   ("La prueba", "Cuando se impide que el músculo fabrique ImpL2 —es decir, se le quita la resistencia— la mosca se defiende peor y muere más. <strong style=\"font-weight:400\">La resistencia no acompaña a la defensa: hace falta para ella.</strong>")],
  "EVIDENCIA CAUSAL · SE PROBÓ QUITÁNDOLA", CORAL, source="McMullen 2024, PMID 38566182"))

ic_emb = f"""<circle cx="100" cy="70" r="52" fill="none" stroke="{INK}" stroke-width="3.4"></circle>
  <circle cx="116" cy="78" r="24" fill="none" stroke="{TEAL}" stroke-width="3.8"></circle>
  <path d="M 8 38 c 22 16, 38 16, 62 24" fill="none" stroke="{TEAL}" stroke-width="3.4"></path>
  <path d="M 72 64 l -18 -8 l 4 18 z" fill="{TEAL}"></path>"""
escribe("S09_Embarazo.dc.html", contexto(ic_emb, "Embarazo",
  "La glucosa de la madre pasa al feto y a la placenta",
  [("Cómo", "El feto crece con la glucosa de la madre y no la fabrica por su cuenta. En el último tercio del embarazo la madre capta bastante menos glucosa con la misma insulina, y la que no capta queda circulando y cruza la placenta."),
   ("Qué lo distingue de una diabetes", "Se revierte al terminar el embarazo, sin dejar rastro. Una madre que no desarrollara esa resistencia dejaría al feto con menos combustible.")],
  "ADAPTACIÓN NORMAL · SE REVIERTE AL PARTO", TEAL, source="Butte 2000, PMID 10799399"))

ic_pub = f"""<path d="M 10 122 h 180" stroke="{LINE}" stroke-width="3.4"></path>
  <path d="M 12 96 C 52 90, 70 44, 106 38 C 144 32, 168 22, 188 14" fill="none" stroke="{TEAL}" stroke-width="3.8"></path>
  <path d="M 12 68 C 52 74, 70 108, 106 104 C 144 98, 168 82, 188 66" fill="none" stroke="{CORAL}" stroke-width="3.8" stroke-dasharray="10 8"></path>
  <circle cx="106" cy="104" r="8" fill="{CORAL}"></circle>"""
escribe("S10_Pubertad.dc.html", contexto(ic_pub, "Pubertad",
  "El combustible se destina a crecer",
  [("Cómo", "Durante la pubertad sube la hormona de crecimiento, y con ella el IGF-1. La sensibilidad a la insulina cae: el músculo y el hígado captan menos glucosa, y esa glucosa queda disponible para construir hueso y masa muscular nueva."),
   ("La cifra, y el retorno", "La sensibilidad baja un <strong style=\"font-weight:400\">32 %</strong>, toca su punto más bajo a mitad de la pubertad y vuelve sola cuando la pubertad termina. Mientras dura, el páncreas lo compensa secretando más insulina.")],
  "TRANSITORIA · VUELVE AL TERMINAR LA PUBERTAD", TEAL,
  source="Goran y Gower 2001, PMID 11679420 · Cook 1993, PMID 7690363"))

ic_hib = f"""<path d="M 100 10 c 28 36, 42 54, 42 70 a 42 42 0 1 1 -84 0 c 0 -16, 14 -34, 42 -70 z" fill="none" stroke="{AMBER}" stroke-width="3.4"></path>
  <path d="M 10 126 h 180" stroke="{LINE}" stroke-width="3.4" stroke-dasharray="9 9"></path>"""
escribe("S11_Hibernacion.dc.html", contexto(ic_hib, "Hibernación",
  "El animal deja de usar azúcar y pasa a vivir de su grasa",
  [("Cómo", "El oso pardo entra al invierno con la resistencia a la insulina puesta. Deja de usar glucosa como combustible y consume la grasa que acumuló durante el otoño. Al salir de la hibernación, la sensibilidad vuelve."),
   ("Qué demuestra", "El cambio es estacional y programado: aparece y desaparece con la época del año, sin dejar daño. En el laboratorio, el suero del animal en temporada reproduce el mismo cambio sobre células en cultivo.")],
  "PROGRAMADA · CON LA ESTACIÓN", AMBER, source="Rigano 2017, PMID 27987017"))

# ── 12 LO QUE LA LITERATURA DEJA SIN RESOLVER ───────────────────────────────
cuerpo = (titulo("Qué dice la literatura reciente sobre esto, y qué deja sin resolver", 112, 1060, 42)
 + f"""
  <div style="position: absolute; left: 64px; top: 206px; width: 1152px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 56px;">
    <div style="border-top: 3px solid {AMBER}; padding-top: 20px;">
      <div style="color: {AMBER}; font: 17px {ARI}; letter-spacing: 2.2px; text-transform: uppercase; margin-bottom: 14px;">Lo que dice</div>
      <div style="font: 24px/1.4 {GEO}; color: {INK};">La resistencia a la insulina y la caída de la secreción son formas en que el cuerpo se defiende de un exceso sostenido de comida. Frenan la entrada de glucosa a los tejidos que la captan <strong style="font-weight:400">sin necesitar insulina</strong>, y que por eso se inundan cuando sobra.</div>
      <div style="margin-top: 16px; font: 19px/1.42 {ARI}; color: {MUTED};">A este tipo de respuesta —mover el punto de funcionamiento para aguantar una carga que no cede— se le llama <em>alostática</em>.<br>Prentki y col., <em>Cell Metab</em> 2026</div>
    </div>
    <div style="border-top: 3px solid {TEAL}; padding-top: 20px;">
      <div style="color: {TEAL}; font: 17px {ARI}; letter-spacing: 2.2px; text-transform: uppercase; margin-bottom: 14px;">Lo que no dice</div>
      <div style="font: 24px/1.4 {GEO}; color: {INK};">En qué momento esa defensa deja de proteger y empieza a enfermar.</div>
      <div style="margin-top: 16px; font: 21px/1.42 {ARI}; color: {BODY};">De ahí sale su recomendación: prudencia al insulinizar de forma intensiva, porque se puede estar anulando una defensa que todavía sirve. Para aplicarla hay que poder decir en qué paciente la resistencia sigue protegiendo. <strong style="font-weight:400;color:#E8E6DE">Hoy no hay forma de decirlo.</strong></div>
    </div>
  </div>
"""
 + banda("Los cinco lugares que siguen van ordenados por deterioro de la glucemia. Es el orden de los grupos, no el camino que recorre un paciente.", MUTED, bottom=92, size=23))
escribe("S12_Literatura.dc.html", slide(E1, cuerpo))
print("parte I a · 6 láminas")
