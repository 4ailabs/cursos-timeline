# -*- coding: utf-8 -*-
import sys, os, math
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from chrome import *
E2 = "Parte II · El sensor que la célula no fabrica"

# ── 40 EL DILEMA ────────────────────────────────────────────────────────────
cuerpo = (texto(108, 1100, [T("La célula se desconecta por una amenaza que ella misma está emitiendo", 42),
   P("La conexina 36 protege a la célula beta de morir por las citocinas —de la <strong style=\"font-weight:400;color:#E8E6DE\">apoptosis</strong>, la muerte celular programada—. Y las citocinas son precisamente lo que hace que esa conexina se retire. <strong style=\"font-weight:400;color:#E8E6DE\">La protección se retira sola justo cuando hace falta.</strong>", 23, mt=18)])
 + f"""
  <div style="position: absolute; left: 64px; top: 316px; width: 1152px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 56px;">
    <div style="border-top: 3px solid {TEAL}; padding-top: 20px;">
      <div style="color: {TEAL}; font: 17px {ARI}; letter-spacing: 2.2px; text-transform: uppercase; margin-bottom: 14px;">Quedarse conectada</div>
      <div style="font: 23px/1.42 {ARI}; color: {INK};">Conserva la protección de la conexina 36. Y sigue recibiendo todo lo que emiten sus vecinas.</div>
    </div>
    <div style="border-top: 3px solid {CORAL}; padding-top: 20px;">
      <div style="color: {CORAL}; font: 17px {ARI}; letter-spacing: 2.2px; text-transform: uppercase; margin-bottom: 14px;">Desconectarse</div>
      <div style="font: 23px/1.42 {ARI}; color: {INK};">Reduce lo que le llega de fuera. Para cada célula por separado es la decisión correcta. <strong style="font-weight:400">Pero si todas la toman, el islote pierde el pulso y deja de funcionar como conjunto.</strong></div>
    </div>
  </div>
"""
 + banda("Y esas citocinas, cuando no hay infección ni lipopolisacárido del intestino, salen de la propia célula. <strong style=\"font-weight:400\">Se está desconectando por una alarma que ella misma disparó.</strong>", AMBER, bottom=88, size=23))
escribe("S40_Dilema.dc.html", slide(E2, cuerpo))

# ── 41 EL ACTO DE AUTODEFENSA ───────────────────────────────────────────────
cuerpo = (texto(106, 1060, [T("Qué hace exactamente la célula para protegerse", 44, color=CREAM),
   P("Sin la alternancia de pulsos, la célula beta secreta sin descanso. Sus mitocondrias se rompen y sueltan su ADN dentro de la célula, y los sensores de infección lo leen como una infección activa. La célula termina inundando su propio entorno de citocinas.", 22, color="#E8E6DECC", mt=18)], left=88)
 + pasos([("1", "<strong style='font-weight:400'>Retira y destruye sus canales de conexina 36.</strong> Los conexones dejan de estar en la membrana.", GOLD),
          ("2", "Al cerrarse esas uniones —<strong style='font-weight:400'>las uniones en hendidura</strong>, o <em>gap junctions</em>— la célula queda <strong style='font-weight:400'>físicamente aislada</strong> de sus vecinas.", GOLD),
          ("3", "Sin esas uniones, la secreción pulsátil y sincronizada del islote se detiene. Cada célula secreta por su cuenta y en su propio tiempo.", GOLD)],
         300, ancho=1104, pad=16, size=22, line="#E8E6DE33", ink=CREAM, left=88)
 + banda("Es una decisión de supervivencia, y para la célula sola es la correcta. Lo que se pierde es el conjunto: cada músico se encerró en su camerino, y los sesenta siguen tocando bien.", GOLD, bottom=80, size=22, left=88, width=1104, ink=CREAM))
escribe("S41_Autodefensa.dc.html", slide(E2, cuerpo, dark=True))

# ── 43 LA INVERSIÓN DE SIGNO ────────────────────────────────────────────────
cuerpo = (texto(110, 1100, [T("El mismo sensor, ante el mismo estímulo, acaba produciendo lo contrario", 42),
   P("La mitocondria mide la glucosa. Con glucosa normal, ese dato hace que la célula <strong style=\"font-weight:400;color:#5DCAA5\">secrete</strong> insulina. Con glucosa alta y sostenida, el mismo dato termina haciendo que la célula <strong style=\"font-weight:400;color:#E8734A\">deje de secretar</strong> y se desconecte.", 23, mt=18)])
 + tabla("300px minmax(0, 1fr) minmax(0, 1fr)",
         ["Régimen", "Qué produce la mitocondria", "Qué hace la célula"],
         [[("Normal", TEAL), ("Sube el ATP", INK), ("Se despolariza y secreta insulina", TEAL)],
          [("Sobrecarga sostenida", CORAL), ("Se rompe y suelta su ADN, y con él llegan las citocinas", INK), ("Retira la conexina 36 y deja de secretar en conjunto", CORAL)]],
         318, gap=36, pad=22, size=22)
 + banda("Una señal débil se debilita; no se invierte. Aquí <strong style=\"font-weight:400\">el sensor se gasta con lo mismo que mide</strong>, y a partir de cierto punto empieza a decir lo contrario.", AMBER, bottom=88, size=24))
escribe("S43_Inversion.dc.html", slide(E2, cuerpo, source="[HIPÓTESIS]"))

# ── 44 EL ATRACTOR ──────────────────────────────────────────────────────────
def paisaje():
    p = []
    for i in range(0, 1001, 5):
        x = i*0.52
        y = 96 + 44*math.exp(-((x-100)/56.0)**2) + 138*math.exp(-((x-368)/68.0)**2) - 20*math.exp(-((x-232)/48.0)**2)
        p.append("%.1f,%.1f" % (x, y))
    return " ".join(p)
cuerpo = (titulo("Cada defensa que se instaló hizo más difícil salir del estado", 108, 1100, 42)
 + f"""
  <svg viewBox="0 0 520 268" style="position: absolute; right: 64px; top: 200px; width: 560px; height: 289px;" aria-hidden="true">
    <polyline points="{paisaje()}" fill="none" stroke="{INK}" stroke-width="3" stroke-linejoin="round"></polyline>
    <circle cx="368" cy="228" r="14" fill="{CORAL}"></circle>
    <circle cx="100" cy="134" r="14" fill="none" stroke="{MUTED}" stroke-width="2.4" stroke-dasharray="5 5"></circle>
    <path d="M 368 202 v -46" stroke="{CORAL}" stroke-width="2.2" stroke-dasharray="6 5"></path>
    <path d="M 368 156 l -6 12 M 368 156 l 6 12" stroke="{CORAL}" stroke-width="2.2" fill="none"></path>
    <text x="368" y="144" text-anchor="middle" font-family="{ARI}" font-size="17" fill="{CORAL}">sube y vuelve a caer</text>
    <text x="100" y="112" text-anchor="middle" font-family="{ARI}" font-size="17" fill="{MUTED}">regulación conservada</text>
    <text x="368" y="256" text-anchor="middle" font-family="{ARI}" font-size="17" fill="{INK}">estado crónico</text>
    <path d="M 12 264 h 496" stroke="{LINE}" stroke-width="1.5"></path>
    <text x="12" y="20" font-family="{ARI}" font-size="16" fill="{MUTED}">cuánto cuesta salir</text>
  </svg>
"""
 + plomo("<strong style=\"font-weight:400;color:#E8E6DE\">Cómo se lee el dibujo.</strong> El eje de abajo es el estado del cuerpo: a la izquierda con la regulación conservada, a la derecha la diabetes establecida. <strong style=\"font-weight:400;color:#E8E6DE\">La altura mide cuánto cuesta salir de ese estado.</strong> Cuanto más hondo el pozo, más fuerte hay que empujar y más rápido vuelve.", 206, 580, 21)
 + plomo("El pozo de la derecha no estaba ahí al principio. Lo fueron profundizando la glicación que rigidiza el tejido, el amiloide que ocupa el espacio entre las células, y las marcas sobre el ADN que mantienen encendida la inflamación.", 380, 580, 21)
 + banda("Dar más insulina es empujar la bola hacia arriba: sube y vuelve a caer, porque el pozo sigue igual de hondo. Lo que lo hace menos hondo es retirar esas razones una por una.", TEAL, bottom=84, size=22))
escribe("S44_Atractor.dc.html", slide(E2, cuerpo, source="[INTERPRETACIÓN]"))

# ── 45 LAS TRES RAZONES ─────────────────────────────────────────────────────
cuerpo = (titulo("Tres cosas empujan al cuerpo de regreso al estado enfermo", 116, 1100, 44)
 + plomo("El cuerpo vuelve ahí aunque se le corrija la glucosa, y estas son las razones:", 202, 1060, 25)
 + tabla("330px minmax(0, 1fr)", None,
         [[("La glicación", CORAL), ("rigidizó el tejido, y eso no se deshace", INK)],
          [("El amiloide", PURPLE), ("ocupa el espacio entre las células, y ahí se queda", INK)],
          [("Las marcas sobre el ADN", AMBER), ("mantienen encendida la inflamación aunque la glucosa esté normal", INK)]],
         282, gap=40, pad=24, size=24)
 + banda("Dar más insulina no retira ninguna de las tres. Por eso el efecto dura lo que dura el fármaco.", TEAL, bottom=100, size=26))
escribe("S45_TresRazones.dc.html", slide(E2, cuerpo))
print("parte II d · 5 láminas · Parte II completa")
