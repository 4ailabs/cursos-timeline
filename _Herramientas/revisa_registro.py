#!/usr/bin/env python3
"""
Revisa el registro de cualquier material del Instituto antes de entregarlo.

Uso:
    python3 _Herramientas/revisa_registro.py archivo.md [otro.md ...]
    python3 _Herramientas/revisa_registro.py carpeta/

Sale con código 1 si encuentra algo. Las reglas salen de las correcciones
acumuladas del Dr. Ojeda Rios; cada patrón lleva el motivo por el que se marca.
"""
import re
import sys
import pathlib

# ── 1 · Prohibidas en todo el material ──────────────────────────────────────
PROHIBIDAS = [
    (r"\bhonest\w*", "«honestidad» está prohibida en todo el material"),
    (r"\bguardarra\w*", "calco de España — se dice «límite»"),
    (r"\broto\b|\brota\b", "«roto» está prohibida, incluso en negativo"),
    (r"\baver[ií]a\w*", "«avería» está prohibida"),
]

# ── 2 · Muletilla «no es X, es Y» ───────────────────────────────────────────
MULETILLAS = [
    (r"no es (?:un |una |el |la )?[^.,;:]{3,40}[,:] (?:es|sino)\b",
     "construcción «no es X, es Y» — afirmar directo"),
    (r"no son [^.,;:]{3,40}[,:] (?:son|sino)\b",
     "construcción «no son X, son Y» — afirmar directo"),
]

# ── 3 · Registro de coaching / promesa de resultado ─────────────────────────
PROMESA = [
    (r"van a poder\b|vas a poder\b", "promesa de resultado — enunciar el alcance"),
    (r"quiero que (?:se |te )?(?:lleven|lleves|quedes|quede)\b", "coaching"),
    (r"qu[ée]date con\b|te vas a llevar\b", "coaching"),
    (r"lo que vas a aprender\b|hoy vas a\b", "coaching"),
    (r"imagina que\b|imagínate\b", "artificio narrativo"),
]

# ── 4 · Muletillas de IA / relleno ──────────────────────────────────────────
RELLENO = [
    (r"vale la pena\b", "relleno"),
    (r"conviene detenerse\b|aqu[íi] conviene detenerse\b", "relleno"),
    (r"en el fondo\b", "impreciso"),
    (r"f[íi]jense en\b", "muletilla de conducción"),
    (r"cabe (?:mencionar|destacar|señalar)\b", "muletilla de IA"),
    (r"es importante (?:destacar|mencionar|señalar|notar)\b", "muletilla de IA"),
    (r"en resumen\b|en conclusión\b", "muletilla de IA"),
    (r"merece detenimiento\b|merece la pena\b", "relleno"),
]

# ── 5 · Títulos: nombran el concepto clínico, no la escena ──────────────────
TITULOS = [
    (r"\ben la camilla\b|\ben el consultorio\b", "el título describe el lugar, no el concepto"),
    (r"\bhace (?:dos|tres|cuatro|cinco) cosas\b", "el título cuenta elementos, no nombra"),
    (r"\beste punto\b|\besta parte\b|\blo que sigue\b|\blo que viene\b",
     "el título ubica en el discurso, no nombra el concepto"),
    (r"^#+\s*(?:Y )?(?:aqu[íi]|ahora|luego|después)\b", "el título es deíctico"),
    (r"\blo que hay\b|\blo que no hay\b", "rótulo vago"),
    (r"\bel punto de\b.*\bparte\b", "el título ubica en el discurso"),
]

# ── 6 · Lenguaje de contacto: en RB no se toca al paciente ──────────────────
CONTACTO = [
    (r"\bse toca\b|\btocar\b|\btocamos\b|\btocarle\b", "en RB no se toca: se coloca, se rastrea, se mide"),
    (r"poner las manos|con las manos|manos encima|la mano sobre", "lenguaje de imposición de manos"),
    (r"\bpalpar\b|\bpalpando\b", "no es terapia manual"),
]

# ── 7 · «Levantar» solo se usa para elevar algo físico ──────────────────────
# «levantar y medir» (las extremidades) es correcto y es vocabulario del Dr.
# Lo que no se dice: levantar un mapa, un perfil, una ficha, una historia.
LEVANTAR = [
    (r"\blevant\w*\s+(?:el|la|un|una|los|las|su|mi)?\s*"
     r"(?:mapa|perfil|ficha|historia|registro|silueta|anamnesis)\b",
     "«levantar» no se aplica a un documento: se registra, se marca, se traza"),
    (r"\b(?:mapa|perfil|ficha|silueta)\b[^.;]{0,30}\bse levant\w*",
     "«levantar» no se aplica a un documento: se registra, se marca, se traza"),
    (r"\blevantamiento del (?:perfil|mapa|caso)\b",
     "«levantamiento» no se aplica a un documento: registro, elaboración"),
    (r"\blevantad[oa]s?\s+por\b",
     "«levantado por» no se aplica a un documento: marcado por, registrado por"),
    (r"qui[ée]n lo levanta\b", "«levantar» no se aplica a un documento"),
]

# ── 8 · Narración de la dinámica del aula (solo con --locucion) ─────────────
# En un guion de locución se expone contenido; no se cuenta lo que pasa en clase
# ni se anuncia lo que el alumno va a saber al terminar.
AULA = [
    (r"\bhoy se hace\b|\bhoy lo ejecutan\b|\bhoy se trabaja\b", "narra la dinámica de la clase"),
    (r"al terminar el d[íi]a\b|al final de la jornada\b|al terminar la jornada\b",
     "anuncia un resultado del día"),
    (r"\bsalieron sabiendo\b|\bustedes salieron\b|\bvan a salir\b",
     "afirma lo que el alumno aprendió o va a aprender"),
    (r"toda la (?:mañana|jornada|tarde)\b|\bla jornada entera\b|\bdurante la exposici[óo]n\b",
     "narra la logística de la clase"),
    (r"la mayor parte del tiempo\b|\bel resto del d[íi]a\b", "logística de la clase"),
    (r"tengan .{0,30}\babiert[oa]\b|\babran el manual\b|\bpasen a la\b|\bpasen al\b",
     "instrucción de aula, no contenido"),
    (r"m[áa]s adelante van a\b|\bdentro de un rato\b|\bal cerrar el bloque\b|"
     r"\bvolvemos sobre esto\b|\ben la segunda parte\b",
     "narra el calendario de la clase"),
    (r"\bvamos rama por rama\b|\blo recorremos\b|\blas planteo como\b",
     "narra el procedimiento de la exposición"),
    (r"\bconcepto umbral\b", "jerga pedagógica interna: no se dice en voz alta"),
]

GRUPOS = [
    ("PROHIBIDA", PROHIBIDAS, False),
    ("MULETILLA", MULETILLAS, False),
    ("PROMESA", PROMESA, False),
    ("RELLENO", RELLENO, False),
    ("CONTACTO", CONTACTO, False),
    ("LEVANTAR", LEVANTAR, False),
    ("TÍTULO", TITULOS, True),   # solo se aplica a encabezados
]

EXT = {".md", ".html", ".tsx", ".ts", ".txt"}

# Formulaciones canónicas del corpus: son del Dr. y se respetan tal cual.
# Si una línea las contiene, no se marca.
EXCEPCIONES = [
    r"no es que ceda un rato",              # formulación al paciente, serie de sesiones
    r"le quitó el dolor|te quitó el dolor",  # la pregunta de seguimiento
    r"regular no es curar",                 # criterio del método
    r"la inflamación no se apaga",          # frase del Bloque 2
]


def revisa(ruta: pathlib.Path):
    hallazgos = []
    try:
        texto = ruta.read_text(encoding="utf-8")
    except Exception:
        return hallazgos
    for n, linea in enumerate(texto.splitlines(), 1):
        if any(re.search(e, linea, re.I) for e in EXCEPCIONES):
            continue
        es_titulo = bool(re.match(r"^\s*#{1,6}\s", linea)) or "titulo=" in linea or "kicker=" in linea
        for etiqueta, reglas, solo_titulo in GRUPOS:
            if solo_titulo and not es_titulo:
                continue
            for patron, motivo in reglas:
                if re.search(patron, linea, re.I):
                    hallazgos.append((n, etiqueta, motivo, linea.strip()[:110]))
    return hallazgos


def main():
    args = sys.argv[1:]
    if "--locucion" in args:
        args.remove("--locucion")
        GRUPOS.append(("AULA", AULA, False))

    objetivos = []
    for arg in args:
        p = pathlib.Path(arg)
        if p.is_dir():
            objetivos += [f for f in p.rglob("*") if f.suffix in EXT]
        elif p.is_file():
            objetivos.append(p)
    if not objetivos:
        print("Uso: revisa_registro.py <archivo|carpeta> ...")
        return 2

    total = 0
    for f in sorted(objetivos):
        h = revisa(f)
        if h:
            print(f"\n── {f}")
            for n, etiqueta, motivo, linea in h:
                print(f"  {n:>5}  {etiqueta:<9} {motivo}")
                print(f"         {linea}")
            total += len(h)

    if total:
        print(f"\n{total} marcas. Ninguna se entrega sin resolver.")
        return 1
    print(f"✓ {len(objetivos)} archivos, sin marcas de registro.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
