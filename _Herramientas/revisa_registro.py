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

# ── 9 · Vocabulario controlado ──────────────────────────────────────────────
# El defecto que más se repite: acuñar un apodo corto para algo que ya tiene
# nombre. El apodo es nuevo cada vez, así que una lista negra nunca lo alcanza.
# Las dos listas siguientes salen de _Herramientas/GLOSARIO_RB.md, que el Dr.
# puede editar sin tocar este archivo.
GLOSARIO = pathlib.Path(__file__).parent / "GLOSARIO_RB.md"


def _lee_glosario():
    """Devuelve (apodos, verbos, permitidos) desde GLOSARIO_RB.md."""
    apodos, verbos, permitidos = [], [], set()
    if not GLOSARIO.exists():
        return apodos, verbos, permitidos
    seccion = None
    for linea in GLOSARIO.read_text(encoding="utf-8").splitlines():
        if linea.startswith("## "):
            t = linea.lower()
            seccion = ("apodos" if "apodos" in t else
                       "verbos" if "verbos" in t else
                       "permitidos" if "permitidos" in t else None)
            continue
        if seccion and linea.startswith("- "):
            item = linea[2:].strip()
            if seccion == "permitidos":
                permitidos.add(item.lower())
            elif "→" in item:
                mal, bien = (p.strip() for p in item.split("→", 1))
                (apodos if seccion == "apodos" else verbos).append((mal, bien))
    return apodos, verbos, permitidos


APODOS_RAW, VERBOS_RAW, PERMITIDOS = _lee_glosario()

APODOS = [(r"\b" + re.escape(mal) + r"\b", f"apodo — se escribe «{bien}»")
          for mal, bien in APODOS_RAW]
VERBOS_VAGOS = [(r"\b" + re.escape(mal) + r"\b", f"no dice qué ocurre — «{bien}»")
                for mal, bien in VERBOS_RAW]

# Candidatos a apodo nuevo: artículo definido + una o dos palabras, en negritas
# o como primera celda de una tabla. Es la forma que toman casi siempre.
CANDIDATO = re.compile(
    r"\*\*(el|la|los|las)\s+([a-záéíóúñ]+(?:\s+[a-záéíóúñ]+)?)\*\*", re.I)

# El documento no habla del documento.
AUTORREFERENCIA = [
    (r"\beste documento\b|\besta secci[óo]n\b|\beste bloque dice\b",
     "el documento habla de sí mismo — afirmar el contenido"),
    (r"\blo que se hace aqu[íi]\b|\baqu[íi] se propone\b|\baqu[íi] va\b",
     "narra la estructura en vez de afirmar"),
    (r"\bY de ah[íi] sale\b|\bY aqu[íi] est[áa] el dato\b|\bEsto es la\b",
     "conector que narra el documento"),
]



# ── 11 · Frases que anuncian lo que viene en vez de decirlo ─────────────────
# Un documento clínico afirma el hallazgo. No lo presenta.
ANUNCIO = [
    (r"\bY? ?(?:el|la|los|las) (?:dato|datos|detalle|detalles|frase|respuesta|hallazgo|"
     r"punto|pieza|piezas|cosa|cosas)\b[^.:;]{0,40}\bque\b[^.:;]{0,40}:",
     "anuncia el hallazgo en vez de decirlo"),
    (r"^\s*(?:>\s*)?\**Y aqu[íi] est[áa]\b|^\s*(?:>\s*)?\**Y ah[íi] est[áa]\b",
     "anuncia en vez de afirmar"),
    (r"^\s*(?:>\s*)?\**(?:Dos|Tres|Cuatro|Cinco|Seis) cosas\b",
     "anuncia un conteo en vez de decir la primera"),
    (r"\bY hay (?:un|una|algo|otro|otra)\b[^.:;]{0,30}:",
     "anuncia en vez de afirmar"),
    (r"\blo m[áa]s (?:aprovechable|interesante|importante|útil|fuerte)\b",
     "califica en vez de decir el contenido"),
    (r"\bconviene decir\b|\bhay que decir\b|\bvale decir\b",
     "anuncia que se va a decir algo"),
]


GRUPOS = [
    ("PROHIBIDA", PROHIBIDAS, False),
    ("MULETILLA", MULETILLAS, False),
    ("PROMESA", PROMESA, False),
    ("RELLENO", RELLENO, False),
    ("CONTACTO", CONTACTO, False),
    ("LEVANTAR", LEVANTAR, False),
    ("APODO", APODOS, False),
    ("AUTORREF", AUTORREFERENCIA, False),
    ("ANUNCIO", ANUNCIO, False),
    ("VERBO", VERBOS_VAGOS, False),
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
    r"variable (bioel[ée]ctrica|controlada|postulada|el[ée]ctrica|primaria|de comparaci[óo]n)",
    r"comunidad microbiana",                # término completo, no apodo
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



# ── 10 · Encabezados y frases que rotulan en vez de afirmar ─────────────────
# El defecto que más se repite y que ninguna lista de palabras alcanza: el
# encabezado se escribe ANTES que la sección, así que solo puede nombrar el
# papel del texto —«Lo que el bloque instala»— y no lo que la sección dice.
# Se marca la construcción; cada marca se reescribe desde el contenido.
ROTULO = re.compile(
    r"^\s*#{1,6}\s*(?:\d+\s*·\s*)?(?:"
    r"Lo que\b|Los que\b|Las que\b"
    r"|Qu[ée] es\b|Qu[ée] hace este\b|Qu[ée] se hace\b|Qu[ée] aporta\b"
    r"|C[óo]mo se usa\b|C[óo]mo se llama\b"
    r"|(?:El|La|Los|Las)\s+\w+\s*$"          # artículo + un sustantivo, y nada más
    r")", re.I)

def encabezados_rotulo(ruta: pathlib.Path):
    """Encabezados que nombran el papel del texto en vez de decir su hallazgo."""
    marcas = []
    try:
        texto = ruta.read_text(encoding="utf-8")
    except Exception:
        return marcas
    for n, linea in enumerate(texto.splitlines(), 1):
        if re.match(r"^\s*#{1,6}\s", linea) and ROTULO.match(linea):
            marcas.append((n, re.sub(r"^\s*#{1,6}\s*", "", linea).strip()))
    return marcas


def terminos_nuevos(ruta: pathlib.Path):
    """Términos en negritas con artículo definido que no están en el glosario.

    No son errores: son decisiones. O se agregan al glosario porque son el
    nombre correcto, o se sustituyen por el nombre completo de algo que ya está.
    """
    nuevos = {}
    try:
        texto = ruta.read_text(encoding="utf-8")
    except Exception:
        return nuevos
    for n, linea in enumerate(texto.splitlines(), 1):
        for m in CANDIDATO.finditer(linea):
            termino = m.group(2).lower().strip()
            if termino in PERMITIDOS:
                continue
            if any(termino.startswith(p) or p.startswith(termino) for p in PERMITIDOS):
                continue
            nuevos.setdefault(termino, n)
    return nuevos


def main():
    args = sys.argv[1:]
    ver_nuevos = "--nuevos" in args
    if ver_nuevos:
        args.remove("--nuevos")
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

    if ver_nuevos:
        rotulos = []
        for f in sorted(objetivos):
            for n, cuerpo in encabezados_rotulo(f):
                rotulos.append((f.name, n, cuerpo))
        if rotulos:
            print(f"\n── Encabezados que rotulan en vez de afirmar ({len(rotulos)})")
            print("   Cada uno dice algo comprobable, o se reescribe para que lo diga.")
            for nombre, n, cuerpo in rotulos:
                print(f"   {nombre}:{n:<4} {cuerpo}")

        acumulado = {}
        for f in sorted(objetivos):
            for t, n in terminos_nuevos(f).items():
                acumulado.setdefault(t, f"{f.name}:{n}")
        if acumulado:
            print(f"\n── Términos nuevos, fuera del glosario ({len(acumulado)})")
            print("   Cada uno se agrega a GLOSARIO_RB.md o se sustituye por el nombre completo.")
            for t, donde in sorted(acumulado.items()):
                print(f"   {t:<38} {donde}")

    if total:
        print(f"\n{total} marcas. Ninguna se entrega sin resolver.")
        return 1
    print(f"✓ {len(objetivos)} archivos, sin marcas de registro.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
