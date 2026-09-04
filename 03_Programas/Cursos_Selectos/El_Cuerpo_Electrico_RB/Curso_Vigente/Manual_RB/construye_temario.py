#!/usr/bin/env python3
"""Genera 00_Temario.md a partir de las tres partes escritas del manual.

El manual es la fuente: el temario es su índice. Se regenera con
    python3 construye_temario.py
cada vez que se agreguen o renumeren capítulos.
"""
import pathlib, re

PARTES = [
    ("01_Parte_I_Fundamento_y_Rastreo.md",  "Parte I · El fundamento común a todos los ejes"),
    ("02_Parte_II_Los_Ejes.md",             "Parte II · Los ejes"),
    ("03_Parte_III_Conduccion.md",          "Parte III · Conducción y seguimiento"),
]

def indice(ruta):
    """Devuelve [(tipo, texto, epígrafe)] leyendo bloques y capítulos."""
    filas, lineas = [], pathlib.Path(ruta).read_text(encoding="utf-8").splitlines()
    for i, ln in enumerate(lineas):
        if ln.startswith("# Bloque"):
            sub = ""
            for j in range(i + 1, min(i + 4, len(lineas))):
                s = lineas[j].strip()
                if s.startswith("*") and s.endswith("*"):
                    sub = s.strip("*"); break
            filas.append(("bloque", ln[2:].strip(), sub))
        elif re.match(r"^## \d+ · ", ln):
            epi = ""
            for j in range(i + 1, min(i + 4, len(lineas))):
                s = lineas[j].strip()
                if s.startswith("*") and s.endswith("*"):
                    epi = s.strip("*"); break
            filas.append(("cap", ln[3:].strip(), epi))
    return filas

cab = """# Manual de Regulación Bioeléctrica · Temario

**El Cuerpo Eléctrico · Formación en Regulación Bioeléctrica** — Dr. Miguel Ojeda Rios · Instituto Centrobioenergetica

> **De dónde sale cada capítulo.** Solo de las cuatro clases impartidas: Módulo 1 (transcripción ordenada de mañana y tarde), Módulo 2 (pistas 1 y 3, más la reconstrucción del tramo de 10:00 a 12:00 que no quedó grabado), Módulo 3 (pistas 1 y 2) y Módulo 4 (capítulos 1, 2 y 3). Nada que no se haya dicho en clase entra al manual.
>
> **Qué se dejó fuera.** Farmacología, prescripción dietética, la narrativa larga de la diabetes, la bioquímica y la fisiología que no justifican una técnica, las comparaciones con otras técnicas de imanes salvo donde fijan el límite de este método, y las anécdotas.
>
> **La fisiología que justifica un rastreo se conserva, reducida a la afirmación que lo fundamenta.**

---
"""

partes_md = []
n_cap = n_blo = 0
for ruta, titulo in PARTES:
    out = [f"\n# {titulo}\n"]
    for tipo, texto, sub in indice(ruta):
        if tipo == "bloque":
            n_blo += 1
            out.append(f"\n## {texto}\n")
            if sub: out.append(f"*{sub}*\n")
        else:
            n_cap += 1
            out.append(f"- **{texto}**" + (f" — {sub}" if sub else ""))
    partes_md.append("\n".join(out))

pendientes = """
---

# Cuatro asuntos siguen abiertos

Los veredictos ya tomados están en `DECISIONES.md` y no se vuelven a discutir. Estos siguen sin fijarse.

1. **La banda de 6 a 8 nodos de inflexibilidad metabólica.** Los 9 marcados indican patrón heredado y menos de 6 indica patrón transitorio. Lo que significan 6, 7 u 8 queda sin clasificar, y se resuelve con el registro de casos.

2. **La grasa epicárdica y la de la médula ósea.** El mapa escrito las declara inaccesibles desde la piel; en clase se propuso rastrearlas por las tibias, el sacro y las alas pélvicas.

3. **El conteo de los nodos del eje del estrés.** Las designaciones anatómicas dictadas suman 40, y el 41 depende de si la depresión suboccipital se cuenta como entrada propia o como el complementario posterior de la glabela.

4. **El eje de biotransformación quedó sin impartir.** Estaba programado para el Módulo 4 y no se nombró una sola vez. El hígado se enseñó dentro del eje metabólico, y así quedó en el manual.

**Y falta producir la lámina de los nodos del eje del estrés.** Se pidió tres veces en el Módulo 3 y el Dr. la negó de forma deliberada, para que el grupo ubicara cada nodo sobre la anatomía. La lista completa quedó dictada en el Módulo 2 y la lámina se puede construir a partir de ahí.

---

*Instituto Centrobioenergetica, 2026*
"""

pathlib.Path("00_Temario.md").write_text(cab + "\n".join(partes_md) + pendientes, encoding="utf-8")
print(f"Temario generado: {n_cap} capítulos en {n_blo} bloques")
