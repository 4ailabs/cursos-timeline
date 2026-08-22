# -*- coding: utf-8 -*-
"""Chrome de las laminas de la clase de diabetes multiescala.

Modo oscuro, escala de proyeccion. PISO TIPOGRAFICO: nada por debajo de 17px
en una lamina de 1280x720.
  portada 62 · titulo 40-52 · subtitulo 26-34 · cuerpo 24 · secundario 21
  cintillo, folio y fuente 17
"""
import io, os

TEAL   = "#5DCAA5"
TEAL2  = "#8FE0C0"
CREAM  = "#E8E6DE"
PAPER  = "#171816"
BLOCK  = "#0F6E56"
INK    = "#E8E6DE"
BODY   = "#B4B1A8"
MUTED  = "#8E8C85"
AMBER  = "#E0A24C"
CORAL  = "#E8734A"
PURPLE = "#8B82E8"
LINE   = "#43443E"
GOLD   = "#F0B45A"

GEO = "Georgia, 'Times New Roman', serif"
ARI = "Arial, Helvetica, sans-serif"

SALIDA = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

def dipolo(color):
    return (f'<svg viewBox="0 0 38 12" style="width: 46px; height: 15px; display: block;" aria-hidden="true">'
            f'<circle cx="6" cy="6" r="6" fill="{color}"></circle>'
            f'<rect x="12" y="5.5" width="14" height="1" fill="{color}"></rect>'
            f'<circle cx="32" cy="6" r="6" fill="{color}" opacity="0.35"></circle></svg>')

HEAD = """<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
  <style>
    body { margin: 0; background: %(bg)s; }
    a { color: %(link)s; } a:hover { color: #3f9d7c; }
  </style>
</helmet>
"""
TAIL = """</x-dc>
<script data-dc-script data-props='{}'>
class Component extends DCLogic {
  renderVals() { return {}; }
}
</script>
</body>
</html>
"""

def slide(eyebrow, cuerpo, dark=False, source=None, folio=""):
    bg   = BLOCK if dark else PAPER
    fg   = CREAM if dark else INK
    eyec = TEAL2 if dark else TEAL
    rule = "#E8E6DE33" if dark else LINE
    fol  = "#E8E6DEA0" if dark else MUTED
    dip  = CREAM if dark else TEAL
    link = TEAL2 if dark else TEAL
    src = ""
    if source:
        src = (f'<div style="position: absolute; left: 64px; bottom: 22px; max-width: 900px; '
               f'color: {fol}; font: 17px/1.35 {ARI};">{source}</div>')
    return (HEAD % {"bg": bg, "link": link}) + f"""
<div style="position: relative; width: 1280px; height: 720px; overflow: hidden; background: {bg}; color: {fg}; font-family: {ARI};">
  <div style="position: absolute; left: 64px; top: 44px;">{dipolo(dip)}</div>
  <div style="position: absolute; left: 128px; top: 46px; color: {eyec}; font: 17px {ARI}; letter-spacing: 2.4px; text-transform: uppercase;">{eyebrow}</div>
{cuerpo}
  <div style="position: absolute; left: 64px; right: 64px; bottom: 56px; height: 1px; background: {rule};"></div>
  {src}
  <div style="position: absolute; right: 64px; bottom: 22px; color: {fol}; font: 17px {ARI}; letter-spacing: 2px;">{folio}</div>
</div>
""" + TAIL

# ── bloques ─────────────────────────────────────────────────────────────────
def etiqueta(txt, top=104, color=None, sigla=None, siglacolor=None):
    c = color or MUTED
    if sigla:
        sc = siglacolor or TEAL
        return (f'<div style="position: absolute; left: 64px; top: {top}px; display: flex; align-items: baseline; gap: 18px;">'
                f'<div style="font: 400 46px/1 {GEO}; color: {sc};">{sigla}</div>'
                f'<div style="color: {c}; font: 17px {ARI}; letter-spacing: 2.4px; text-transform: uppercase;">{txt}</div></div>')
    return (f'<div style="position: absolute; left: 64px; top: {top}px; color: {c}; '
            f'font: 17px {ARI}; letter-spacing: 2.4px; text-transform: uppercase;">{txt}</div>')

def titulo(txt, top=112, width=1120, size=44, color=None, ls=-1.2):
    c = color or INK
    return (f'<div style="position: absolute; left: 64px; top: {top}px; width: {width}px;">'
            f'<h2 style="margin: 0; font: 400 {size}px/1.14 {GEO}; letter-spacing: {ls}px; color: {c};">{txt}</h2></div>')

def plomo(txt, top, width=1040, size=24, color=None, left=64):
    c = color or BODY
    return (f'<div style="position: absolute; left: {left}px; top: {top}px; width: {width}px; '
            f'font: {size}px/1.5 {ARI}; color: {c};">{txt}</div>')

def banda(txt, color=None, kicker=None, bottom=96, width=1152, size=25, left=64, ink=None):
    col = color or TEAL
    k = (f'<div style="color: {col}; font: 17px {ARI}; letter-spacing: 2.2px; '
         f'text-transform: uppercase; margin-bottom: 10px;">{kicker}</div>') if kicker else ""
    return (f'<div style="position: absolute; left: {left}px; bottom: {bottom}px; width: {width}px; '
            f'border-left: 3px solid {col}; padding-left: 22px;">{k}'
            f'<div style="font: {size}px/1.42 {GEO}; color: {ink or INK};">{txt}</div></div>')

def columnas(items, top, n=3, gap=48, left=64, width=1152):
    """items: lista de (kicker, color, html)"""
    c = "".join(f'<div style="border-top: 3px solid {col}; padding-top: 20px;">'
                f'<div style="color: {col}; font: 17px {ARI}; letter-spacing: 2.2px; text-transform: uppercase; margin-bottom: 14px;">{k}</div>'
                f'{h}</div>' for k, col, h in items)
    return (f'<div style="position: absolute; left: {left}px; top: {top}px; width: {width}px; '
            f'display: grid; grid-template-columns: repeat({n}, minmax(0, 1fr)); gap: {gap}px;">{c}</div>')

def pasos(items, top, ancho=1152, gap=26, pad=18, size=25, numcol=56, line=None, ink=None, left=64):
    """items: lista de (numero, texto, color)"""
    L = line or LINE; I = ink or INK
    f = "".join(f'<div style="display: grid; grid-template-columns: {numcol}px minmax(0, 1fr); gap: {gap}px; '
                f'padding: {pad}px 0; border-bottom: 1px solid {L}; align-items: baseline;">'
                f'<div style="font: 400 32px/1 {GEO}; color: {c};">{n}</div>'
                f'<div style="font: {size}px/1.35 {GEO}; color: {I};">{t}</div></div>'
                for n, t, c in items)
    return f'<div style="position: absolute; left: {left}px; top: {top}px; width: {ancho}px;">{f}</div>'

def tabla(cols_def, encabezados, filas, top, gap=30, pad=16, size=21, left=64, width=1152):
    """cols_def: str de grid-template-columns · filas: lista de listas de (texto, color)"""
    head = ""
    if encabezados:
        head = (f'<div style="display: grid; grid-template-columns: {cols_def}; gap: {gap}px; padding-bottom: 12px; '
                f'border-bottom: 1px solid {LINE}; color: {MUTED}; font: 17px {ARI}; letter-spacing: 2px; text-transform: uppercase;">'
                + "".join(f"<div>{h}</div>" for h in encabezados) + "</div>")
    cuerpo = "".join(
        f'<div style="display: grid; grid-template-columns: {cols_def}; gap: {gap}px; padding: {pad}px 0; '
        f'border-bottom: 1px solid {LINE}; align-items: baseline;">'
        + "".join(f'<div style="font: {size}px/1.36 {ARI}; color: {c};">{t}</div>' for t, c in fila)
        + "</div>" for fila in filas)
    return f'<div style="position: absolute; left: {left}px; top: {top}px; width: {width}px;">{head}{cuerpo}</div>'

def escribe(nombre, texto):
    ruta = os.path.join(SALIDA, nombre)
    with io.open(ruta, "w", encoding="utf-8") as f:
        f.write(texto)

# ── flujo vertical ──────────────────────────────────────────────────────────
# Apilar bloques con `top` fijo falla en cuanto un titulo ocupa un renglon mas
# de lo calculado. Estos tres los apilan por margen dentro de un solo
# contenedor: el texto ya no puede chocar consigo mismo.

def T(txt, size=44, color=None, mt=0, ls=-1.2, lh=1.14):
    c = color or INK
    return (f'<h2 style="margin: {mt}px 0 0; font: 400 {size}px/{lh} {GEO}; '
            f'letter-spacing: {ls}px; color: {c};">{txt}</h2>')

def P(txt, size=23, color=None, mt=20, lh=1.5, fam=None):
    c = color or BODY
    f = fam or ARI
    return f'<p style="margin: {mt}px 0 0; font: {size}px/{lh} {f}; color: {c};">{txt}</p>'

def K(txt, color=None, mt=24):
    c = color or MUTED
    return (f'<div style="margin: {mt}px 0 0; color: {c}; font: 17px {ARI}; '
            f'letter-spacing: 2.2px; text-transform: uppercase;">{txt}</div>')

def texto(top, width, partes, left=64):
    return (f'<div style="position: absolute; left: {left}px; top: {top}px; width: {width}px;">'
            + "".join(partes) + '</div>')
