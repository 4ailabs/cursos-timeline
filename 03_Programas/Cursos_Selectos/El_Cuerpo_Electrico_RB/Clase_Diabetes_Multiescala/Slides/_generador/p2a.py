# -*- coding: utf-8 -*-
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from chrome import *
E2 = "Parte II · El sensor que la célula no fabrica"

# ── 32 EL SENSOR ────────────────────────────────────────────────────────────
PASOS = [("1", "La glucosa entra a la célula, y una enzima llamada <strong style=\"font-weight:400\">glucocinasa</strong> marca el ritmo al que se procesa."),
         ("2", "La mitocondria la quema y produce <strong style=\"font-weight:400\">ATP</strong>, la moneda de energía de la célula."),
         ("3", "Ese ATP cierra un canal de potasio de la membrana. Al cerrarse, la membrana se despolariza y entra calcio."),
         ("4", "El calcio hace que los gránulos de insulina se vacíen hacia afuera.")]
cajas = "".join(f'<div style="border-top: 3px solid {TEAL if n=="2" else LINE}; padding-top: 18px;">'
                f'<div style="font: 400 28px/1 {GEO}; color: {TEAL if n=="2" else MUTED};">{n}</div>'
                f'<div style="margin-top: 12px; font: 21px/1.4 {ARI}; color: {TEAL if n=="2" else INK};">{t}</div></div>' for n, t in PASOS)
cuerpo = (titulo("La célula beta no tiene un sensor de glucosa propio", 112, 1060, 44)
 + plomo("No mide la glucosa directamente. Mide <strong style=\"font-weight:400;color:#E8E6DE\">cuánta energía le está entregando su mitocondria</strong> —el cociente ATP/ADP—, y de ahí deduce cuánta glucosa hay afuera.", 196, 1060, 24)
 + f'<div style="position: absolute; left: 64px; top: 306px; width: 1152px; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 36px;">{cajas}</div>'
 + banda("El dato con el que la célula beta decide no lo produce ella. Lo fabrica un organismo de otro linaje que vive dentro.", TEAL, bottom=100, size=26))
escribe("S32_Sensor.dc.html", slide(E2, cuerpo))

# ── 33 LAS TRES CONDICIONES ─────────────────────────────────────────────────
mito = f"""<svg viewBox="0 0 460 300" style="width: 460px; height: 300px;" aria-hidden="true">
  <circle cx="234" cy="150" r="128" fill="none" stroke="{LINE}" stroke-width="2"></circle>
  <text x="234" y="296" text-anchor="middle" font-family="{ARI}" font-size="16" letter-spacing="2" fill="{MUTED}">CÉLULA BETA</text>
  <circle cx="128" cy="76" r="26" fill="none" stroke="{MUTED}" stroke-width="2"></circle>
  <text x="128" y="82" text-anchor="middle" font-family="{ARI}" font-size="15" fill="{MUTED}">núcleo</text>
  <g transform="translate(248,164)">
    <path d="M -86 -38 h 124 a 38 38 0 0 1 0 76 h -124 a 38 38 0 0 1 0 -76 z" fill="none" stroke="{TEAL}" stroke-width="3"></path>
    <g stroke="{TEAL}" stroke-width="2" opacity="0.6"><path d="M -60 -26 c 15 12, 15 18, 0 28 M -30 -26 c 15 12, 15 18, 0 28 M 0 -26 c 15 12, 15 18, 0 28"></path></g>
    <circle cx="28" cy="2" r="14" fill="none" stroke="{AMBER}" stroke-width="3"></circle>
  </g>
  <text x="330" y="118" font-family="{ARI}" font-size="16" fill="{AMBER}">ADN propio</text>
  <path d="M 176 140 C 156 116, 146 100, 148 92" stroke="{TEAL}" stroke-width="2" stroke-dasharray="6 5" fill="none"></path>
  <path d="M 148 92 l 8 8 l -12 3 z" fill="{TEAL}"></path>
  <text x="30" y="126" font-family="{ARI}" font-size="16" fill="{TEAL}">genes al núcleo</text>
  <path d="M 244 206 l -8 20 M 260 208 l 4 20" stroke="{CORAL}" stroke-width="3"></path>
  <g fill="{CORAL}"><circle cx="226" cy="242" r="5"></circle><circle cx="264" cy="248" r="5"></circle><circle cx="244" cy="266" r="5"></circle></g>
  <text x="292" y="252" font-family="{ARI}" font-size="16" fill="{CORAL}">al romperse gotea</text>
</svg>"""
COND = [("¿Puede irse?", "No, y en los dos sentidos", "Su genoma se pasó al núcleo de la célula. Ni ella puede vivir fuera ni la célula puede vivir sin ella.", TEAL),
        ("¿Queda conflicto?", "Sí, todavía", "Su ADN sigue evolucionando por su cuenta. Dentro de una misma célula conviven copias sanas y copias dañadas —heteroplasmia—, y las dañadas se multiplican.", AMBER),
        ("¿La vigila el inmune?", "Sí, todavía", "Cuando se rompe, suelta piezas que el cuerpo lee como señal de infección. Las reconocen sensores antiguos: cGAS-STING, TLR9, NLRP3, RIG-I/MAVS.", CORAL)]
cols = "".join(f'<div style="border-top: 3px solid {c}; padding-top: 18px;">'
               f'<div style="color: {MUTED}; font: 17px {ARI}; letter-spacing: 2px; text-transform: uppercase;">{k}</div>'
               f'<div style="margin-top: 10px; font: 400 26px/1.15 {GEO}; color: {c};">{v}</div>'
               f'<div style="margin-top: 12px; font: 20px/1.4 {ARI}; color: {INK};">{d}</div></div>' for k, v, d, c in COND)
cuerpo = (titulo("La célula beta le encargó su sentido de la glucosa a un inquilino del que ya no puede separarse", 104, 620, 32)
 + plomo("La mitocondria viene de una bacteria que hace miles de millones de años entró a vivir dentro de otra célula y se quedó ahí. Conserva partes de aquella bacteria, y el sistema inmune las sigue reconociendo. <strong style=\"font-weight:400;color:#E8E6DE\">No se confunde: la reconoce correctamente como lo que fue.</strong>", 254, 600, 21)
 + f'<div style="position: absolute; right: 64px; top: 116px; width: 460px;">{mito}</div>'
 + f'<div style="position: absolute; left: 64px; bottom: 84px; width: 1152px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 44px;">{cols}</div>')
escribe("S33_Coordenadas.dc.html", slide(E2, cuerpo,
  source="No puede echarla, y sigue reconociéndola como ajena. Esa combinación es la de mayor riesgo"))

# ── 34 LA CADENA ────────────────────────────────────────────────────────────
CAD = [("1", "Sobrecarga sostenida de glucosa, sin ventanas de ayuno", INK),
       ("2", "Se acumulan mitocondrias dañadas, porque falla la limpieza que las retira — la <strong style='font-weight:400'>mitofagia</strong>", INK),
       ("3", "Esas mitocondrias se rompen y sueltan su ADN dentro de la célula", INK),
       ("4", "Los sensores de infección lo detectan: <strong style='font-weight:400'>cGAS-STING</strong>, y también NLRP3 y TLR9", INK),
       ("5", "La célula produce citocinas inflamatorias", INK),
       ("6", "<strong style='font-weight:400'>Baja la conexina 36</strong> &nbsp;←&nbsp; <span style='color:%s;font-size:19px'>aquí llegan también la glicación, el amiloide y el lipopolisacárido del intestino</span>" % AMBER, BODY),
       ("7", "El islote pierde el pulso y la respuesta conjunta", BODY),
       ("8", "La célula se desconecta y deja de comportarse como célula beta", BODY)]
f = "".join(f'<div style="display: grid; grid-template-columns: 46px minmax(0, 1fr); gap: 22px; padding: 11px 0; border-bottom: 1px solid {LINE}; align-items: baseline;">'
            f'<div style="font: 400 24px/1 {GEO}; color: {TEAL if int(n)<6 else MUTED};">{n}</div>'
            f'<div style="font: 22px/1.32 {GEO}; color: {c};">{t}</div></div>' for n, t, c in CAD)
cuerpo = (etiqueta("el trinquete de la fuga mitocondrial", 100, sigla="T11")
 + titulo("La célula beta emite una señal de infección con material suyo", 158, 1100, 40)
 + f'<div style="position: absolute; left: 64px; top: 240px; width: 940px;">{f}</div>'
 + f"""
  <div style="position: absolute; right: 64px; top: 250px; width: 168px;">
    <div style="border-left: 3px solid {TEAL}; padding-left: 16px; height: 196px; display: flex; align-items: center;">
      <div style="color: {TEAL}; font: 17px {ARI}; letter-spacing: 1.8px; text-transform: uppercase;">Publicado con controles</div>
    </div>
    <div style="margin-top: 18px; border-left: 3px solid {MUTED}; padding-left: 16px; height: 130px; display: flex; align-items: center;">
      <div style="color: {MUTED}; font: 17px {ARI}; letter-spacing: 1.8px; text-transform: uppercase;">Lectura de este curso</div>
    </div>
  </div>
""")
escribe("S34_Cadena.dc.html", slide(E2, cuerpo))
print("parte II a · 3 láminas")
