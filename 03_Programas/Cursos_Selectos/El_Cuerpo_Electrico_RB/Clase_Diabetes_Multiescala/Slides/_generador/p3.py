# -*- coding: utf-8 -*-
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from chrome import *
E3 = "Parte III · Las dos que todavía se pueden revertir"

# ── 46 T8 Y T11 ─────────────────────────────────────────────────────────────
cuerpo = (texto(108, 1100, [T("Las dos fallas que todavía se pueden revertir comparten una sola causa", 42),
   P("<strong style=\"font-weight:400;color:#E8E6DE\">Qué es el permiso de después de comer.</strong> Tras una comida el hígado emite una señal que le avisa al músculo y al tejido adiposo que ya pueden captar glucosa. Esa señal se emite al comer y se retira con el ayuno: <strong style=\"font-weight:400;color:#E8E6DE\">tiene un ciclo</strong>. Cuando se come cada pocas horas el ciclo se aplana, y la señal deja de emitirse.", 22, mt=16)])
 + f"""
  <svg viewBox="0 0 1152 214" style="position: absolute; left: 64px; top: 322px; width: 1152px; height: 214px;" aria-hidden="true">
    <rect x="0" y="62" width="352" height="90" rx="5" fill="none" stroke="{CORAL}" stroke-width="3"></rect>
    <text x="176" y="98" text-anchor="middle" font-family="{GEO}" font-size="23" fill="{CORAL}">Se pierde la alternancia</text>
    <text x="176" y="128" text-anchor="middle" font-family="{GEO}" font-size="23" fill="{CORAL}">entre comer y ayunar</text>
    <path d="M 364 107 h 40" stroke="{MUTED}" stroke-width="2.6"></path>
    <path d="M 416 107 v -54 h 40 M 416 107 v 54 h 40" stroke="{MUTED}" stroke-width="2.6" fill="none"></path>
    <path d="M 404 107 l -12 -7 l 1 14 z" fill="{MUTED}"></path>
    <path d="M 458 53 l -13 -7 l 1 14 z" fill="{MUTED}"></path>
    <path d="M 458 161 l -13 -7 l 1 14 z" fill="{MUTED}"></path>
    <g transform="translate(470,18)">
      <rect x="0" y="0" width="600" height="70" rx="4" fill="none" stroke="{TEAL}" stroke-width="2.4"></rect>
      <text x="28" y="45" font-family="{GEO}" font-size="26" fill="{TEAL}">T8</text>
      <text x="86" y="45" font-family="{ARI}" font-size="21" fill="{INK}">el permiso de después de comer pierde su ciclo</text>
    </g>
    <g transform="translate(470,126)">
      <rect x="0" y="0" width="600" height="70" rx="4" fill="none" stroke="{TEAL}" stroke-width="2.4"></rect>
      <text x="28" y="45" font-family="{GEO}" font-size="26" fill="{TEAL}">T11</text>
      <text x="100" y="45" font-family="{ARI}" font-size="21" fill="{INK}">la limpieza de mitocondrias pierde su ventana</text>
    </g>
  </svg>
"""
 + banda("Ninguna causa la otra. Las dos vienen de haber perdido la misma alternancia, y devolverla es lo único que actúa sobre las dos a la vez.", TEAL, bottom=88, size=23))
escribe("S46_T8T11.dc.html", slide(E3, cuerpo, source="[HIPÓTESIS]"))

# ── 47 EL ESTUDIO CON LAS MISMAS CALORÍAS ───────────────────────────────────
cuerpo = (texto(116, 1100, [T("Un estudio con las mismas calorías decide si esta conexión existe", 44),
   P("<strong style=\"font-weight:400;color:#E8E6DE\">Por qué hace falta.</strong> Si se compara a quien come repartido contra quien come concentrado, el segundo grupo casi siempre come menos. Cualquier mejoría se podría explicar por las calorías y no por el horario. <strong style=\"font-weight:400;color:#E8E6DE\">Igualar las calorías es lo que separa una cosa de la otra.</strong>", 23, mt=18),
   P("<strong style=\"font-weight:400;color:#E8E6DE\">El diseño.</strong> Dos grupos con exactamente las mismas calorías y distinto reparto en el día. Se mide en los dos: cuánto ADN mitocondrial suelto hay dentro de la célula, y cómo responde el cuerpo a una comida.", 23, mt=16)])
 + f"""
  <div style="position: absolute; left: 64px; bottom: 92px; width: 1152px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 56px;">
    <div style="border-top: 3px solid {CORAL}; padding-top: 20px;">
      <div style="color: {CORAL}; font: 17px {ARI}; letter-spacing: 2.2px; text-transform: uppercase; margin-bottom: 14px;">Si con las mismas calorías no hay diferencia</div>
      <div style="font: 23px/1.4 {GEO}; color: {INK};">La conexión entre las dos cae entera, y con ella toda esta parte de la clase.</div>
    </div>
    <div style="border-top: 3px solid {AMBER}; padding-top: 20px;">
      <div style="color: {AMBER}; font: 17px {ARI}; letter-spacing: 2.2px; text-transform: uppercase; margin-bottom: 14px;">Cautela</div>
      <div style="font: 23px/1.4 {GEO}; color: {INK};">La <strong style="font-weight:400">hepatalina</strong> —la señal hepática de después de comer— es una hormona propuesta, no demostrada, y sus cifras vienen de estudios en rata.</div>
    </div>
  </div>
""")
escribe("S47_Isocalorico.dc.html", slide(E3, cuerpo))

# ── 48 LAS DOS COSAS QUE SE PUEDEN HACER ────────────────────────────────────
cuerpo = (etiqueta("la diana está en otro lado", 100)
 + titulo("Lo que hay que reparar es la mitocondria que gotea, no la alarma que suena", 142, 1100, 42)
 + f"""
  <div style="position: absolute; left: 64px; top: 244px; width: 1152px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 56px;">
    <div style="border-top: 3px solid {CORAL}; padding-top: 20px;">
      <div style="color: {CORAL}; font: 17px {ARI}; letter-spacing: 2.2px; text-transform: uppercase; margin-bottom: 14px;">Bloquear la alarma · lo que se hace hoy</div>
      <div style="font: 21px/1.42 {ARI}; color: {INK};">Hay fármacos que bloquean cGAS-STING; el inhibidor <strong style="font-weight:400">C-176</strong> es uno de ellos. La inflamación baja.</div>
      <div style="margin-top: 12px; font: 21px/1.42 {ARI}; color: {BODY};">Y el ADN mitocondrial sigue suelto dentro de la célula: <strong style="font-weight:400;color:#E8E6DE">la causa queda intacta.</strong> Además se retira una vigilancia que sirve para detectar infecciones de verdad.</div>
    </div>
    <div style="border-top: 3px solid {TEAL}; padding-top: 20px;">
      <div style="color: {TEAL}; font: 17px {ARI}; letter-spacing: 2.2px; text-transform: uppercase; margin-bottom: 14px;">Reparar la mitocondria · lo que propone el marco</div>
      <div style="font: 21px/1.42 {ARI}; color: {INK};">Devolver la limpieza que retira las mitocondrias dañadas antes de que se rompan — la mitofagia.</div>
      <div style="margin-top: 12px; font: 21px/1.42 {ARI}; color: {BODY};">Si la mitocondria no se rompe, no hay ADN suelto, y la alarma no tiene por qué sonar.</div>
    </div>
  </div>
"""
 + banda("<strong style=\"font-weight:400\">«Reparar la mitocondria» todavía no tiene una intervención estandarizada.</strong> Nadie sabe con qué hacerlo de forma reproducible. La ventana de ayuno es la candidata, y por eso es lo que se propone medir.", AMBER, "El límite, dicho completo", bottom=84, size=22))
escribe("S48_DosCosas.dc.html", slide(E3, cuerpo))

# ── 49 EL ESTUDIO QUE SEPARA LAS DOS ────────────────────────────────────────
cuerpo = (titulo("Cómo se decide cuál de las dos sirve", 108, 1000, 44)
 + plomo("Las dos bajan la inflamación. Para saber cuál resuelve y cuál tapa, hay que diseñar el estudio de forma que la diferencia tenga dónde aparecer.", 190, 1060, 23)
 + pasos([("1", "<strong style='font-weight:400'>Igualar la inflamación en los dos grupos.</strong> Uno repara la mitocondria, el otro bloquea la alarma, y los dos terminan con la misma cantidad de inflamación dentro del islote. Si no se iguala, gana el que más antiinflame, y eso no era la pregunta.", TEAL),
          ("2", "<strong style='font-weight:400'>Medir el pulso y la conexión, no la insulina total.</strong> Si se mide insulina total, los dos van a parecer iguales. La diferencia está en si el islote volvió a descargar coordinado.", TEAL),
          ("3", "<strong style='font-weight:400'>Retirar el tratamiento al final.</strong> Si al retirarlo el problema vuelve, ese grupo estaba tapando. Si no vuelve, reparó.", TEAL)],
         266, pad=16, size=22)
 + banda("Si los dos protegen igual y ninguno rebota al retirarlo, esta parte de la clase cae.", CORAL, bottom=88, size=24))
escribe("S49_Estudio.dc.html", slide(E3, cuerpo))

# ── 50 LA REGLA · bloque teal ───────────────────────────────────────────────
cuerpo = (texto(106, 1080, [T("Abrir lo que está cerrado produce más cambio que exigirle más a quien ya no puede", 42, color=CREAM),
   P("<strong style=\"font-weight:400;color:#E8E6DE\">El caso concreto.</strong> Una sulfonilurea empuja a la célula beta a secretar más. Pero si esa célula ya retiró la conexina que la une a sus vecinas, secretar no era lo que le faltaba: lo que le falta es con quién coordinarse. Se le exige más a una célula que ya está en su límite, y se acorta su vida.", 22, color="#E8E6DECC", mt=18)], left=88)
 + f"""
  <div style="position: absolute; left: 88px; top: 340px; width: 540px;">
    <div style="border: 2px solid #E8E6DE44; border-radius: 4px; padding: 16px 22px; text-align: center; font: 26px/1.2 {GEO}; color: {CREAM};">P = ⟨ S, &nbsp;O, &nbsp;w, &nbsp;C, &nbsp;E, &nbsp;H ⟩</div>
    <div style="margin-top: 14px;">
      <div style="display: grid; grid-template-columns: 38px minmax(0, 1fr); gap: 16px; padding: 7px 0; align-items: baseline;">
        <div style="font: 23px {GEO}; color: {TEAL2};">O</div><div style="font: 19px/1.34 {ARI}; color: {CREAM};">las acciones que sabe ejecutar — secretar insulina, <strong style="font-weight:400">conservada</strong></div></div>
      <div style="display: grid; grid-template-columns: 38px minmax(0, 1fr); gap: 16px; padding: 7px 0; align-items: baseline;">
        <div style="font: 23px {GEO}; color: {GOLD};">w</div><div style="font: 19px/1.34 {ARI}; color: {CREAM};">cuánta señal cuesta cada acción — <strong style="font-weight:400">la sulfonilurea actúa aquí</strong></div></div>
      <div style="display: grid; grid-template-columns: 38px minmax(0, 1fr); gap: 16px; padding: 7px 0; align-items: baseline;">
        <div style="font: 23px {GEO}; color: {GOLD};">C</div><div style="font: 19px/1.34 {ARI}; color: {CREAM};">qué acción está permitida — coordinarse con las vecinas, <strong style="font-weight:400">cerrada</strong></div></div>
    </div>
  </div>
  <div style="position: absolute; right: 88px; top: 340px; width: 520px;">
    <div style="font: 20px/1.42 {ARI}; color: #E8E6DECC;"><strong style="font-weight:400;color:{GOLD}">Forzar ganancia</strong> mueve <strong style="font-weight:400;color:{CREAM}">w</strong> — más señal para el mismo operador.<br><strong style="font-weight:400;color:{TEAL2}">Editar restricciones</strong> abre <strong style="font-weight:400;color:{CREAM}">C</strong> — vuelve a permitir la acción.</div>
    <div style="margin-top: 20px; font: 400 30px/1.2 {GEO}; color: {CREAM};">Si lo que falló es <span style="color: {GOLD};">C</span>, mover <span style="color: {GOLD};">w</span> no lo toca.</div>
    <div style="margin-top: 20px; border-left: 3px solid #E8E6DE55; padding-left: 18px; font: 21px/1.4 {GEO}; color: {CREAM};">Primero se retira la señal de amenaza. Después se reconecta. <strong style="font-weight:400">En ese orden.</strong></div>
  </div>
""")
escribe("S50_Regla.dc.html", slide(E3, cuerpo, dark=True,
  source="En el vocabulario del método: editar restricciones produce más cambio que forzar ganancia · [INTERPRETACIÓN]"))

# ── 51 LA VENTANA DE AYUNO ──────────────────────────────────────────────────
cuerpo = (titulo("La ventana de ayuno, paso por paso", 108, 1000, 44)
 + plomo("Es la candidata a reparar la mitocondria. Estos son los cuatro pasos, y hasta dónde llega la evidencia en cada uno.", 190, 1060, 23)
 + tabla("400px minmax(0, 1fr) 150px",
         ["Se reintroduce", "Qué ocurre", "Estatuto"],
         [[("El cuerpo pasa horas con poca energía disponible", INK), ("<strong style='font-weight:400'>AMPK</strong>, el sensor de escasez de la célula, da la orden de iniciar la limpieza de mitocondrias", BODY), ("EVIDENCIA", TEAL)],
          [("La limpieza vuelve a ocurrir seguido", INK), ("Se retiran las mitocondrias rotas <strong style='font-weight:400'>antes de que suelten su ADN</strong>", BODY), ("EVIDENCIA", TEAL)],
          [("Queda menos ADN mitocondrial suelto dentro de la célula", INK), ("Baja la alarma cGAS-STING", BODY), ("DERIVADO", AMBER)],
          [("Baja la inflamación dentro del islote", INK), ("Se recuperan las placas de conexina 36 y vuelve el pulso", BODY), ("HIPÓTESIS", CORAL)]],
         260, gap=32, pad=13, size=20)
 + banda("Le devuelve la alternancia entre comer y ayunar, que es la señal con la que abre esa vía. <strong style=\"font-weight:400\">Abre C, no sube w.</strong>", TEAL, bottom=70, size=21))
escribe("S51_Ventana.dc.html", slide(E3, cuerpo))
print("parte III · 6 láminas · deck completo")
