# -*- coding: utf-8 -*-
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from chrome import *
E2 = "Parte II · El sensor que la célula no fabrica"

conexon = f"""<svg viewBox="0 0 500 116" style="width: 500px; height: 116px;" aria-hidden="true">
  <g transform="translate(78,58)">
    <circle cx="0" cy="-30" r="12" fill="none" stroke="{TEAL}" stroke-width="2.6"></circle>
    <circle cx="26" cy="-15" r="12" fill="none" stroke="{TEAL}" stroke-width="2.6"></circle>
    <circle cx="26" cy="15" r="12" fill="none" stroke="{TEAL}" stroke-width="2.6"></circle>
    <circle cx="0" cy="30" r="12" fill="none" stroke="{TEAL}" stroke-width="2.6"></circle>
    <circle cx="-26" cy="15" r="12" fill="none" stroke="{TEAL}" stroke-width="2.6"></circle>
    <circle cx="-26" cy="-15" r="12" fill="none" stroke="{TEAL}" stroke-width="2.6"></circle>
  </g>
  <text x="78" y="112" text-anchor="middle" font-family="{ARI}" font-size="16" fill="{MUTED}">seis conexinas = un conexón</text>
  <g transform="translate(330,58)">
    <path d="M -70 -26 h 140 M -70 26 h 140" stroke="{MUTED}" stroke-width="2" opacity="0.5"></path>
    <path d="M -20 -34 h 40 v 12 h -8 v 14 h 8 v 12 h -40 v -12 h 8 v -14 h -8 z" fill="none" stroke="{TEAL}" stroke-width="2.6"></path>
    <path d="M -60 0 h 34 M 26 0 h 34" stroke="{TEAL}" stroke-width="2.4" stroke-dasharray="4 4"></path>
  </g>
  <text x="330" y="112" text-anchor="middle" font-family="{ARI}" font-size="16" fill="{MUTED}">dos conexones = un canal completo</text>
</svg>"""

# ── 38 ISLOTE CONECTADO ─────────────────────────────────────────────────────
cuerpo = (titulo("Islote conectado · las placas de conexina 36 en el borde entre células", 100, 1100, 32)
 + f'<div style="position: absolute; left: 64px; top: 162px; width: 620px; height: 413px; background: #000; border-radius: 3px; overflow: hidden;"><img src="lamina-a.jpg" alt="" style="width: 100%; height: 100%; object-fit: cover; display: block;"></div>'
 + f"""
  <div style="position: absolute; left: 716px; top: 162px; width: 500px;">
    <div style="color: {TEAL}; font: 17px {ARI}; letter-spacing: 2.2px; text-transform: uppercase;">Qué se ve</div>
    <div style="margin-top: 12px; font: 21px/1.42 {ARI}; color: {INK};">Los cúmulos verdes están exactamente en el límite entre dos células vecinas.</div>
    <div style="margin-top: 22px; color: {TEAL}; font: 17px {ARI}; letter-spacing: 2.2px; text-transform: uppercase;">Qué es la conexina 36</div>
    <div style="margin-top: 12px; font: 20px/1.4 {ARI}; color: {INK};">Es una proteína que se inserta en la membrana. <strong style="font-weight:400">Seis conexinas</strong> forman un <strong style="font-weight:400">conexón</strong>, que es medio canal. El conexón de una célula se acopla con el de la célula de al lado, y entre los dos hacen un canal que atraviesa las dos membranas. Por ahí pasan iones y mensajeros de un citoplasma al otro, sin salir al exterior.</div>
    <div style="margin-top: 12px; font: 20px/1.4 {ARI}; color: {BODY};">Muchos de esos canales juntos forman una <strong style="font-weight:400;color:#E8E6DE">placa</strong>: eso es cada cúmulo verde.</div>
    <div style="margin-top: 14px;">{conexon}</div>
  </div>
""")
escribe("S38_LaminaA.dc.html", slide(E2, cuerpo, source="Representación en el estilo de la inmunofluorescencia confocal"))

# ── 39 ISLOTE DESCONECTADO ──────────────────────────────────────────────────
cuerpo = (titulo("El mismo islote desconectado · las placas ya no están", 100, 1100, 32)
 + f'<div style="position: absolute; left: 64px; top: 162px; width: 620px; height: 413px; background: #000; border-radius: 3px; overflow: hidden;"><img src="lamina-b.jpg" alt="" style="width: 100%; height: 100%; object-fit: cover; display: block;"></div>'
 + f"""
  <div style="position: absolute; left: 716px; top: 162px; width: 500px;">
    <div style="color: {TEAL}; font: 17px {ARI}; letter-spacing: 2.2px; text-transform: uppercase;">Qué se ve</div>
    <div style="margin-top: 12px; font: 21px/1.42 {ARI}; color: {INK};">El verde desapareció de todos los bordes. Las células siguen ahí y se cuentan igual en la histología. Ya no tienen por dónde ponerse de acuerdo.</div>
    <div style="margin-top: 14px; font: 21px/1.42 {ARI}; color: {BODY};">Y el ámbar sigue con la misma intensidad: los gránulos de insulina están llenos. <strong style="font-weight:400;color:#E8E6DE">No les falta insulina. Les falta la conexión para soltarla a la vez.</strong></div>
    <div style="margin-top: 24px; border: 2px solid {LINE}; border-radius: 4px; padding: 18px 22px;">
      <div style="font: 26px/1.2 {GEO}; color: {TEAL}; text-align: center;">Σ<sub style="font-size:16px">int</sub> = K<sub style="font-size:16px">total</sub> − Σ K<sub style="font-size:16px">j</sub></div>
    </div>
    <div style="margin-top: 14px; font: 20px/1.4 {ARI}; color: {INK};"><strong style="font-weight:400;color:#5DCAA5">En la lámina anterior, Σ<sub>int</sub> &gt; 0</strong> — el islote conectado resuelve mejor que la suma de sus células.<br><strong style="font-weight:400;color:#E8734A">En esta, Σ<sub>int</sub> = 0</strong> — es exactamente la suma de sus células.</div>
  </div>
"""
 + banda("Y las células son las mismas en las dos imágenes. Lo único que cambió está entre ellas.", TEAL, bottom=84, size=22, width=620))
escribe("S39_LaminaB.dc.html", slide(E2, cuerpo, source="Representación en el estilo de la inmunofluorescencia confocal"))

# ── 42 EL CORTE ESQUEMÁTICO ─────────────────────────────────────────────────
cuerpo = (titulo("Hacen falta los dos medios canales, uno de cada célula", 100, 1100, 34)
 + f'<div style="position: absolute; left: 64px; top: 168px; width: 700px; height: 400px; background: #FFFFFF; border-radius: 4px; display: grid; place-items: center; padding: 16px;"><img src="lamina-c.jpg" alt="" style="max-width: 100%; max-height: 100%; display: block;"></div>'
 + f"""
  <div style="position: absolute; left: 804px; top: 168px; width: 412px;">
    <div style="color: {TEAL}; font: 17px {ARI}; letter-spacing: 2.2px; text-transform: uppercase;">Qué se ve</div>
    <div style="margin-top: 14px; font: 22px/1.44 {GEO}; color: {INK};">A la izquierda, los conexones de las dos células están acoplados y forman un canal que atraviesa las dos membranas: por ahí cruzan los iones. A la derecha, cada conexón se quedó anclado en su propia membrana, enfrentado al otro y sin tocarlo. <strong style="font-weight:400">No cruza nada.</strong></div>
    <div style="margin-top: 26px; border-left: 3px solid {AMBER}; padding-left: 18px; font: 20px/1.42 {ARI}; color: {INK};">Y los gránulos de insulina están igual de llenos en los dos paneles, pegados a la membrana y listos para salir. <strong style="font-weight:400">Lo que cambió no está dentro de las células.</strong></div>
  </div>
""")
escribe("S42_LaminaC.dc.html", slide(E2, cuerpo, source="Ilustración esquemática"))
print("parte II c · 3 láminas")
