# -*- coding: utf-8 -*-
"""Fija el orden de proyeccion, renumera folios y escribe canvas.json."""
import io, json, re, pathlib
SLD = pathlib.Path(__file__).parent.parent

FLUJO = [
 ("Main.dc.html","Portada"),("S02_Tesis.dc.html","La tesis"),
 ("S03_Coste.dc.html","El coste"),("S04_w.dc.html","w · subió el precio"),
 ("S05_C.dc.html","C · se cerró una vía"),("S06_Sigma.dc.html","Σ · se perdió el orden"),
 ("S07_RespuestaCorrecta.dc.html","Cuando la resistencia es lo correcto"),
 ("S08_Infeccion.dc.html","Infección"),("S09_Embarazo.dc.html","Embarazo"),
 ("S10_Pubertad.dc.html","Pubertad"),("S11_Hibernacion.dc.html","Hibernación"),
 ("S12_Literatura.dc.html","Lo que la literatura no resuelve"),
 ("S13_Phiflex.dc.html","Lugar 1 · cambiar de combustible"),("S14_Causas.dc.html","Las tres causas"),
 ("S15_Ectopica.dc.html","La grasa ectópica"),("S16_Anticipar.dc.html","Qué es anticipar"),
 ("S17_CircuitoHepatico.dc.html","El circuito hepático · GABA"),("S18_H.dc.html","Lugar 2 · anticipar"),
 ("S19_Objeciones.dc.html","Las dos objeciones"),("S20_SinPulsos.dc.html","Sin pulsos, sin pausas"),
 ("S21_Lambda.dc.html","Lugar 3 · el alcance"),("S22_Superaditividad.dc.html","Superaditividad"),
 ("S23_MafaPdx1.dc.html","MafA y Pdx1"),("S24_EscalaSNC.dc.html","La corrección pasa al SNC"),
 ("S25_Hipotalamo.dc.html","Cómo entra la agresión"),("S26_E.dc.html","Lugar 4 · el valor defendido"),
 ("S27_T2.dc.html","Lugar 5 · T2 · glicación"),("S28_T1.dc.html","T1 · amiloide"),
 ("S29_T3.dc.html","T3 · karma metabólico"),("S30_Recuento.dc.html","El recuento"),
 ("S31_Limite.dc.html","El límite"),
 ("S32_Sensor.dc.html","El sensor"),("S33_Coordenadas.dc.html","Las tres condiciones"),
 ("S34_Cadena.dc.html","La cadena T11"),("S35_Citas.dc.html","Las citas y el hueco"),
 ("S36_Atavismo.dc.html","El atavismo"),("S37_Disenos.dc.html","Los tres diseños"),
 ("S38_LaminaA.dc.html","Islote conectado"),("S39_LaminaB.dc.html","Islote desconectado"),
 ("S40_Dilema.dc.html","El dilema"),("S41_Autodefensa.dc.html","El acto de autodefensa"),
 ("S42_LaminaC.dc.html","El corte esquemático"),("S43_Inversion.dc.html","La inversión de signo"),
 ("S44_Atractor.dc.html","El atractor"),("S45_TresRazones.dc.html","Las tres razones"),
 ("S46_T8T11.dc.html","T8 y T11"),("S47_Isocalorico.dc.html","El estudio con las mismas calorías"),
 ("S48_DosCosas.dc.html","Las dos cosas que se pueden hacer"),("S49_Estudio.dc.html","El estudio que las separa"),
 ("S50_Regla.dc.html","La regla"),("S51_Ventana.dc.html","La ventana de ayuno"),
]
TOTAL = len(FLUJO)
FOLIO = re.compile(r'(letter-spacing: 2px;">)([^<]*)(</div>)')
for i, (f, _) in enumerate(FLUJO, 1):
    p = SLD / f
    t = p.read_text(encoding="utf-8")
    val = "" if i == 1 else "%d / %d" % (i, TOTAL)
    t2, k = FOLIO.subn(lambda m: m.group(1) + val + m.group(3), t)
    if k != 1: raise SystemExit("folio no encontrado o repetido en %s (%d)" % (f, k))
    p.write_text(t2, encoding="utf-8")

DX, DY, COLS = 1360, 840, 6
art = [{"file": f, "x": (i % COLS)*DX, "y": (i // COLS)*DY, "w": 1280, "h": 720,
        "title": "%02d · %s" % (i+1, t)} for i, (f, t) in enumerate(FLUJO)]
canvas = {
 "artboards": art,
 "annotations": [
  {"id":"piso-tipografico","x":0,"y":-240,"w":470,
   "text":"Escala de proyección: nada por debajo de 17 px en una lámina de 1280×720.\nTítulo 38–52 · cuerpo 21–26 · cintillo, folio y pie 17."},
  {"id":"criterio","x":1360,"y":-240,"w":470,
   "text":"Criterio de escritura: cada frase se entiende sin haber leído nada antes; ningún término del marco sin definir la primera vez; nada de referencias internas al catálogo; se nombra la cosa física."},
  {"id":"verificar-pmid","x":2720,"y":-240,"w":470,
   "text":"Seis citas por cotejar contra PubMed antes de que esto salga del Instituto: Hu 2022, Zhang 2023, O'Rahilly 1988, Thaler 2012, El-Osta 2008 y Talchai 2012."},
  {"id":"generador","x":4080,"y":-240,"w":470,
   "text":"El deck se genera con los scripts de _generador/. Para cambiar una lámina se edita ahí y se vuelve a correr, en vez de tocar el .dc.html a mano."},
 ],
 "launch":{"view":"canvas"},
}
with io.open(SLD/"canvas.json","w",encoding="utf-8") as fh:
    json.dump(canvas, fh, ensure_ascii=False, indent=2)
print("flujo · %d pantallas" % TOTAL)
