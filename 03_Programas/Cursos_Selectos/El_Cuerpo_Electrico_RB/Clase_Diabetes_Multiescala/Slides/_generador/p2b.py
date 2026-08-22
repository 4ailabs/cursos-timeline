# -*- coding: utf-8 -*-
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from chrome import *
E2 = "Parte II · El sensor que la célula no fabrica"

# ── 35 LAS CITAS Y EL HUECO ─────────────────────────────────────────────────
cuerpo = (titulo("La cadena está publicada, y con controles", 110, 1000, 44)
 + f"""
  <div style="position: absolute; left: 64px; top: 198px; width: 1152px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 56px;">
    <div style="border-top: 3px solid {TEAL}; padding-top: 20px;">
      <div style="color: {TEAL}; font: 17px {ARI}; letter-spacing: 2.2px; text-transform: uppercase; margin-bottom: 14px;">Hu H y col. 2022 · FASEB J</div>
      <div style="font: 21px/1.42 {ARI}; color: {INK};">En células beta y en ratones obesos, el <strong style="font-weight:400">palmitato</strong> —un ácido graso saturado— y el peróxido de hidrógeno aumentan la cantidad de ADN mitocondrial suelto dentro de la célula.</div>
      <div style="margin-top: 14px; font: 21px/1.42 {ARI}; color: {BODY};"><strong style="font-weight:400;color:#E8E6DE">Los controles:</strong> al retirarle a la célula ese ADN mitocondrial, la alarma cGAS-STING baja. Al silenciar cGAS o STING, o al bloquear STING con el inhibidor <strong style="font-weight:400">C-176</strong>, bajan las citocinas y los marcadores de envejecimiento celular.</div>
    </div>
    <div style="border-top: 3px solid {TEAL}; padding-top: 20px;">
      <div style="color: {TEAL}; font: 17px {ARI}; letter-spacing: 2.2px; text-transform: uppercase; margin-bottom: 14px;">Zhang X y col. 2023 · Sci China Life Sci</div>
      <div style="font: 21px/1.42 {ARI}; color: {INK};">El mismo palmitato provoca la fuga de ADN mitocondrial y enciende STING, pero <strong style="font-weight:400;color:#E8734A">en el macrófago que vive dentro del islote</strong>, no en la célula beta.</div>
      <div style="margin-top: 14px; font: 21px/1.42 {ARI}; color: {BODY};"><strong style="font-weight:400;color:#E8E6DE">El control:</strong> ratones criados sin el gen de STING tienen menos inflamación en el islote y secretan insulina mejor.</div>
    </div>
  </div>
"""
 + banda("Zhang midió la fuga en el macrófago. <strong style=\"font-weight:400\">Que sea la célula beta la que emite sigue sin demostrarse</strong>, y la hipótesis lo necesita. Los propios autores lo declaran abierto.", CORAL, "El hueco", bottom=88, size=23))
escribe("S35_Citas.dc.html", slide(E2, cuerpo))

# ── 36 EL ATAVISMO ──────────────────────────────────────────────────────────
APAGA = ["<strong style='font-weight:400'>MafA</strong> — mantiene la identidad de célula beta adulta",
         "<strong style='font-weight:400'>Pdx1</strong> — el gen maestro del linaje pancreático",
         "<strong style='font-weight:400'>Nkx6.1</strong> — lo que la distingue de una célula alfa",
         "<strong style='font-weight:400'>NeuroD1</strong>",
         "<strong style='font-weight:400'>FoxO1</strong> — sale del núcleo",
         "<strong style='font-weight:400'>La insulina</strong>"]
PRENDE = ["<strong style='font-weight:400'>Neurogenina 3</strong> — el marcador del progenitor endocrino del embrión",
          "<strong style='font-weight:400'>ALDH1A3</strong> — el que se usa para detectarlo en islote humano",
          "<strong style='font-weight:400'>Sox9</strong> — progenitor del conducto pancreático",
          "<strong style='font-weight:400'>Oct4, Nanog, L-Myc</strong> — genes de pluripotencia"]
def lst(items, color):
    return "".join(f'<div style="display: grid; grid-template-columns: 20px minmax(0, 1fr); gap: 14px; padding: 6px 0; align-items: baseline;">'
                   f'<div style="width: 9px; height: 9px; border-radius: 50%; background: {color};"></div>'
                   f'<div style="font: 19px/1.32 {ARI}; color: {INK};">{t}</div></div>' for t in items)
cuerpo = (etiqueta("el atavismo de la célula beta", 100)
 + titulo("La célula no muere: vuelve al programa con el que empezó", 142, 1100, 42)
 + plomo("El atavismo no es apagarse. Es dejar de leer los genes que la hacen célula beta madura, y volver a leer los que usó cuando era una célula progenitora en el páncreas del embrión.", 216, 1100, 22)
 + f"""
  <div style="position: absolute; left: 64px; top: 292px; width: 1152px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 56px;">
    <div style="border-top: 3px solid {CORAL}; padding-top: 16px;">
      <div style="color: {CORAL}; font: 17px {ARI}; letter-spacing: 2.2px; text-transform: uppercase; margin-bottom: 10px;">Deja de expresar · el programa maduro</div>
      {lst(APAGA, CORAL)}
    </div>
    <div style="border-top: 3px solid {TEAL}; padding-top: 16px;">
      <div style="color: {TEAL}; font: 17px {ARI}; letter-spacing: 2.2px; text-transform: uppercase; margin-bottom: 10px;">Vuelve a expresar · el programa progenitor</div>
      {lst(PRENDE, TEAL)}
    </div>
  </div>
"""
 + banda("No vuelve a un ancestro evolutivo: vuelve a la célula que ella misma fue en el páncreas embrionario. Y desde ahí puede convertirse en <strong style=\"font-weight:400\">célula alfa y producir glucagón</strong> — lo que explica por qué en la diabetes tipo 2 el glucagón está alto teniendo la glucosa alta.", AMBER, bottom=70, size=20))
escribe("S36_Atavismo.dc.html", slide(E2, cuerpo,
  source="Talchai 2012, en ratón · Cinti 2016, en islote humano. Los genes de pluripotencia se demostraron en ratón; extenderlos al islote humano es inferencia · [HIPÓTESIS] para esa parte"))

# ── 37 LOS TRES DISEÑOS ─────────────────────────────────────────────────────
DIS = [("1", "El desenlace",
        "que la fuga de ADN mitocondrial se relacione antes con la pérdida de coordinación —el pulso, la conexión entre células— que con la cantidad de insulina",
        "ningún trabajo usa esa medida. Todos miden secreción y envejecimiento celular", CORAL),
       ("2", "La conexión con el permiso de después de comer",
        "que la ventana de ayuno actúe a la vez sobre ese permiso y sobre la limpieza de mitocondrias",
        "cada pieza por separado. La conexión entre las dos, no", AMBER),
       ("3", "La diana",
        "reparar el compartimento que gotea, en lugar de suprimir la inflamación",
        "todos bloquean STING. Nadie ha comparado las dos cosas", CORAL)]
filas = "".join(f"""
      <div style="display: grid; grid-template-columns: 44px 250px minmax(0, 1fr) minmax(0, 1fr); gap: 28px; padding: 12px 0; border-bottom: 1px solid {LINE}; align-items: baseline;">
        <div style="font: 400 26px/1 {GEO}; color: {c};">{n}</div>
        <div style="font: 400 23px/1.16 {GEO}; color: {INK};">{t}</div>
        <div style="font: 19px/1.32 {ARI}; color: {BODY};">{p}</div>
        <div style="font: 19px/1.32 {ARI}; color: {c};">{q}</div>
      </div>""" for n, t, p, q, c in DIS)
cuerpo = (titulo("Lo que este modelo aporta son tres diseños de estudio, no tres mecanismos nuevos", 108, 1100, 40)
 + plomo("La cadena de la lámina anterior ya está publicada. Lo que sigue sin hacerse es medirla contra las cosas correctas.", 194, 1060, 22)
 + f"""
  <div style="position: absolute; left: 64px; top: 262px; width: 1152px;">
    <div style="display: grid; grid-template-columns: 44px 250px minmax(0, 1fr) minmax(0, 1fr); gap: 28px; padding-bottom: 10px; border-bottom: 1px solid {LINE}; color: {MUTED}; font: 17px {ARI}; letter-spacing: 2px; text-transform: uppercase;">
      <div></div><div></div><div>Qué propone</div><div>Qué hay publicado</div>
    </div>
{filas}
  </div>
"""
 + banda("Lo primero que se pierde es la relación entre los órganos, no la cantidad que producen. Y eso se puede medir con datos que ya se recogen.", TEAL, bottom=70, size=21))
escribe("S37_Disenos.dc.html", slide(E2, cuerpo))
print("parte II b · 3 láminas")
