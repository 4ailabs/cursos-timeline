#!/usr/bin/env python3
"""
Genera el manual B5 imprimible del Módulo 3 (Bloques 1 y 2) a partir del markdown.

Sistema de diseño: el mismo de `manual_nodo_lesion.html` y del Manual del Módulo 2
(B5 176×250 mm, Avenir Next, teal #0F6E56, columna única, coral solo para alertas).
Reglas de marca: Manual_Nodo_Lesion_GUIA_CONSTRUCCION.md

Uso:  python3 build_manual_b5.py [b5|letter|bn-b5|bn-letter]
Sale: Manual_Modulo_3_B5.html (u otro formato)
"""
import re, html, pathlib, sys

SRC = pathlib.Path("Manual_Modulo_3_Preguntar_y_Rastrear.md")

# ── formatos ──────────────────────────────────────────────────
#   alto útil = alto de página − padding sup − padding inf − cabecera
FORMATOS = {
    "b5":     dict(css="estilo_b5.css",     out="Manual_Modulo_3_B5.html",     util=208.0, entradas=17),
    "letter": dict(css="estilo_letter.css", out="Manual_Modulo_3_Letter.html", util=236.0, entradas=20),
    "bn-b5":     dict(css="estilo_bn_b5.css",     out="Manual_Modulo_3_B5_BN.html",     util=208.0, entradas=17, logo="#000000"),
    "bn-letter": dict(css="estilo_bn_letter.css", out="Manual_Modulo_3_Letter_BN.html", util=236.0, entradas=20, logo="#000000"),
}
FMT = sys.argv[1] if len(sys.argv) > 1 else "b5"
if FMT not in FORMATOS: raise SystemExit(f"formato: {' | '.join(FORMATOS)}")
CFG = FORMATOS[FMT]
OUT = pathlib.Path(CFG["out"])

DIPOLO = ('<svg viewBox="0 0 58 24"><circle cx="8" cy="12" r="6" fill="#0F6E56"/>'
          '<line x1="16" y1="12" x2="28" y2="12" stroke="#0F6E56" stroke-width="1"/>'
          '<circle cx="36" cy="12" r="6" fill="#0F6E56" opacity="0.35"/></svg>')

BLOQUES = [
    ("Las cinco letras y las dos preguntas",                     "Bloque 1 · El quíntuple aplicado a la Regulación Bioeléctrica"),
    ("Las tres preguntas y las once unidades del tubo digestivo", "Bloque 2 · Barrera, microbiota e hígado"),
]

# ─────────────────────────── inline ───────────────────────────
def inline(s):
    s = html.escape(s, quote=False)
    s = re.sub(r"`([^`]+)`", r'<span class="data">\1</span>', s)
    s = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", s)
    s = re.sub(r"(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)", r"<i>\1</i>", s)
    s = s.replace("—", "—").replace("⟨", "&lang;").replace("⟩", "&rang;")
    return s

def es_referencia(p):
    """Línea de cita bibliográfica: cursiva completa con año o PMID."""
    t = p.strip()
    return (t.startswith("*") and t.endswith("*") and not t.startswith("**")
            and re.search(r"\b(19|20)\d{2}\b|PMID|ficha por confirmar", t))

# ─────────────────────────── bloques de markdown ───────────────────────────
def parse(md):
    """Devuelve lista de (tipo, dato)."""
    out, i = [], 0
    L = md.split("\n")
    while i < len(L):
        ln = L[i]
        if ln.startswith("```"):
            j = i + 1
            buf = []
            while j < len(L) and not L[j].startswith("```"):
                buf.append(L[j]); j += 1
            out.append(("pre", "\n".join(buf))); i = j + 1; continue
        if ln.startswith("|"):
            j = i; rows = []
            while j < len(L) and L[j].startswith("|"):
                rows.append(L[j]); j += 1
            out.append(("tabla", rows)); i = j; continue
        if ln.startswith(">"):
            j = i; buf = []
            while j < len(L) and (L[j].startswith(">") or (buf and L[j].strip() == "" and
                                   j + 1 < len(L) and L[j+1].startswith(">"))):
                buf.append(re.sub(r"^>\s?", "", L[j])); j += 1
            out.append(("cita", "\n".join(buf).strip())); i = j; continue
        m = re.match(r"^(\d+)\.\s+(.*)$", ln)
        if m:
            j = i; items = []
            while j < len(L):
                mm = re.match(r"^(\d+)\.\s+(.*)$", L[j])
                if not mm: break
                items.append(mm.group(2)); j += 1
            out.append(("ol", items)); i = j; continue
        if ln.startswith("- "):
            j = i; items = []
            while j < len(L) and L[j].startswith("- "):
                items.append(L[j][2:]); j += 1
            out.append(("ul", items)); i = j; continue
        if ln.startswith("#"):
            n = len(ln) - len(ln.lstrip("#"))
            out.append((f"h{n}", ln.lstrip("# ").strip())); i += 1; continue
        if ln.strip() in ("---", "***"):
            out.append(("hr", "")); i += 1; continue
        if ln.strip():
            j = i; buf = []
            while j < len(L) and L[j].strip() and not re.match(r"^(#|\||>|-\s|\d+\.\s|```|---)", L[j]):
                buf.append(L[j]); j += 1
            out.append(("p", " ".join(buf))); i = j; continue
        i += 1
    return out

# ─────────────────────────── render ───────────────────────────
def tabla_html(rows):
    celdas = [[c.strip() for c in r.strip().strip("|").split("|")] for r in rows]
    if len(celdas) > 1 and set(celdas[1][0]) <= set("-: "):
        cab, cuerpo = celdas[0], celdas[2:]
    else:
        cab, cuerpo = None, celdas
    ncol = max(len(r) for r in celdas)
    corto = cuerpo and all(len(r[0]) <= 34 for r in cuerpo if r)
    cls = "spec" if (ncol == 2 and corto and not (cab and any(cab))) else "nodos"
    h = [f'<table class="{cls}">']
    if cab and any(c for c in cab):
        h.append("<thead><tr>" + "".join(f"<th>{inline(c)}</th>" for c in cab) + "</tr></thead>")
    h.append("<tbody>")
    for r in cuerpo:
        r = r + [""] * (ncol - len(r))
        if cls == "spec":
            h.append(f"<tr><th>{inline(r[0])}</th><td>{inline(r[1])}</td></tr>")
        else:
            h.append("<tr>" + "".join(f"<td>{inline(c)}</td>" for c in r) + "</tr>")
    h.append("</tbody></table>")
    return "".join(h)

def cita_html(txt):
    m = re.match(r"^\*\*(.+?)[.:]?\*\*\s*(.*)$", txt, re.S)
    if m and len(m.group(1)) <= 46 and m.group(2).strip():
        return (f'<div class="callout"><span class="w">{inline(m.group(1))}</span>'
                f'<p>{inline(m.group(2).strip())}</p></div>')
    return f'<div class="pull"><p>{inline(txt)}</p></div>'

def render(bloques):
    h = []
    for t, d in bloques:
        if t == "h3":
            h.append(f'<div class="sub">{inline(d)}</div>')
        elif t == "h4":
            h.append(f'<div class="shead">{inline(d)}</div>')
        elif t == "p":
            if es_referencia(d):
                h.append(f'<p class="ref">{inline(d.strip("*"))}</p>')
            else:
                h.append(f"<p>{inline(d)}</p>")
        elif t == "tabla":
            h.append(tabla_html(d))
        elif t == "cita":
            h.append(cita_html(d))
        elif t == "ol":
            h.append('<ol class="proc">' + "".join(f"<li>{inline(x)}</li>" for x in d) + "</ol>")
        elif t == "ul":
            h.append('<ul class="dash">' + "".join(f"<li>{inline(x)}</li>" for x in d) + "</ul>")
        elif t == "pre":
            h.append(f'<pre class="tree">{html.escape(d)}</pre>')
    return "\n".join(h)

# ─────────────────────────── medición real en el navegador ───────────────────────────
import subprocess, json, tempfile, os

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
ALTO_UTIL   = CFG["util"]
HOLGURA     = 4.0     # mm de reserva; se sube si alguna página desborda

def medir(items, css):
    """items: [(clave, html)] → {clave: alto en mm}"""
    piezas = "".join(f'<div data-k="{k}" style="display:flow-root">{h}</div>' for k, h in items)
    doc = (f'<!doctype html><meta charset="utf-8"><style>{css}\n'
           f'.b5 .page{{height:auto;box-shadow:none;margin:0}}</style>'
           f'<body class="b5"><section class="page pg-recto prem"><div class="body" id="M">{piezas}</div></section>'
           '<script>var o={};document.querySelectorAll("#M>[data-k]").forEach(function(e){'
           'var s=getComputedStyle(e);o[e.dataset.k]=e.getBoundingClientRect().height;});'
           'document.title=JSON.stringify(o);</script>')
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False) as f:
        f.write(doc); ruta = f.name
    dom = subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--virtual-time-budget=4000",
                          "--dump-dom", f"file://{ruta}"], capture_output=True, text=True).stdout
    os.unlink(ruta)
    m = re.search(r"<title>(\{.*?\})</title>", dom, re.S)
    if not m: raise SystemExit("no se pudo medir: revisa la ruta de Chrome")
    px = json.loads(html.unescape(m.group(1)))
    return {k: v / 96 * 25.4 for k, v in px.items()}      # px CSS → mm

def paginar(secciones, css, nombre="", holgura=0.0):
    """Pagina midiendo cada bloque y cada encabezado en el navegador."""
    items = []
    for si, (titulo, bl) in enumerate(secciones):
        m = re.match(r"^(\d+)\.\s*(.*)$", titulo or "")
        tit = m.group(2) if m else (titulo or "")
        items.append((f"T{si}", f'<p class="eyebrow">{html.escape(nombre)}</p><h1>{inline(tit)}</h1>'))
        for bi, b in enumerate(bl):
            items.append((f"{si}_{bi}", render([b])))
    alturas = medir(items, css)
    util = ALTO_UTIL - holgura

    paginas, actual, usado = [], [], 0.0
    for si, (titulo, bl) in enumerate(secciones):
        primero = True
        i = 0
        while i < len(bl):
            coste_cab = (alturas[f"T{si}"] + (6.0 if actual else 0.0)) if primero else 3.0
            if usado + coste_cab + alturas[f"{si}_{i}"] > util and actual:
                paginas.append(actual); actual, usado = [], 0.0
                continue
            cabe, u = [], coste_cab
            while i < len(bl) and usado + u + alturas[f"{si}_{i}"] <= util:
                u += alturas[f"{si}_{i}"]; cabe.append(bl[i]); i += 1
            if not cabe:
                cabe = [bl[i]]; u += alturas[f"{si}_{i}"]; i += 1
            actual.append((titulo if primero else None, cabe))
            usado += u; primero = False
            if i < len(bl):
                paginas.append(actual); actual, usado = [], 0.0
    if actual: paginas.append(actual)
    return paginas

# ─────────────────────────── montaje ───────────────────────────
def main():
    md = SRC.read_text()
    cuerpo = md[md.index("---", md.index("## Índice")) + 3:]

    # cortar por bloque
    idx = [(cuerpo.index("### " + m), n) for m, n in BLOQUES]
    tramos = []
    for k, (pos, nombre) in enumerate(idx):
        fin = idx[k + 1][0] if k + 1 < len(idx) else len(cuerpo)
        tramos.append((nombre, cuerpo[pos:fin]))

    css = pathlib.Path(CFG["css"]).read_text()
    paginas_html, folio, toc = [], 1, []

    for nombre, tramo in tramos:
        subt = re.match(r"### (.+)", tramo).group(1)
        bl = parse(tramo)
        # agrupar por H2
        secciones, actual, titulo = [], [], None
        for t, d in bl:
            if t == "h2":
                if titulo or actual: secciones.append((titulo, actual))
                titulo, actual = d, []
            elif t in ("h3_ignora", "hr"):
                continue
            elif t == "h3" and d == subt:
                continue
            else:
                actual.append((t, d))
        if titulo or actual: secciones.append((titulo, actual))
        secciones = [s for s in secciones if s[0]]

        folios = {}

        for pag in paginar(secciones, css, nombre, HOLGURA):
            partes = []
            for titulo, bloques in pag:
                if titulo:
                    folios.setdefault(titulo, folio)
                    m = re.match(r"^(\d+)\.\s*(.*)$", titulo)
                    num, tit = (m.group(1), m.group(2)) if m else ("", titulo)
                    partes.append(f'<p class="eyebrow">{html.escape(nombre)}</p>'
                                  f'<h1>{inline(tit)}</h1>')
                partes.append('<div class="body">' + render(bloques) + "</div>")
            lado = "pg-recto" if folio % 2 == 1 else "pg-verso"
            paginas_html.append(f'''<section class="page {lado} prem">
<div class="brand">{DIPOLO}<span class="wm2">regulación <b>bioeléctrica</b></span><span class="sp"></span><span class="rh">{html.escape(nombre)}</span></div>
{"".join(partes)}
<div class="foot">INSTITUTO CENTROBIOENERGETICA</div><div class="folio">{folio}</div>
</section>''')
            folio += 1
        toc.append((nombre, [(t, folios.get(t, 1)) for t, _ in secciones]))

    # índice — repartido en las hojas que haga falta (2 bloques por hoja)
    def grupo_html(nombre, sec):
        h = [f'<div class="grp mt">{html.escape(nombre)}</div><ul class="toc">']
        for x, pg in sec:
            m = re.match(r"^(\d+)\.\s*(.*)$", x)
            n, tt = (m.group(1), m.group(2)) if m else ("", x)
            h.append(f'<li><span class="pg">{pg}</span><div class="body"><div class="t">'
                     f'{("<span class=step>" + n + "</span>") if n else ""}{inline(tt)}</div></div></li>')
        h.append("</ul>")
        return "".join(h)

    # reparte por número de entradas, no por número de bloques
    hojas_toc, hoja, n_ent = [], [], 0
    for g in toc:
        coste = len(g[1]) + 2          # entradas + el encabezado del grupo
        if hoja and n_ent + coste > CFG["entradas"]:
            hojas_toc.append(hoja); hoja, n_ent = [], 0
        hoja.append(g); n_ent += coste
    if hoja: hojas_toc.append(hoja)
    paginas_toc = []
    for k, hoja in enumerate(hojas_toc):
        lado = "pg-recto" if k % 2 == 0 else "pg-verso"
        cab = (f'<div class="opener"><div class="kbar"></div>'
               f'<p class="eyebrow">Contenido</p><h1>Índice</h1></div>') if k == 0 else ""
        paginas_toc.append(f'''<section class="page {lado} indice">
<div class="brand">{DIPOLO}<span class="wordmark">regulación <b>bioeléctrica</b></span><span class="sp"></span><span class="rh">Módulo 3 · Preguntar y rastrear</span></div>
{cab}
{"".join(grupo_html(n, se) for n, se in hoja)}
<div class="foot">INSTITUTO CENTROBIOENERGETICA</div>
</section>''')
    if len(paginas_toc) % 2:
        paginas_toc.append('<section class="page blank pg-verso"></section>')

    portada = f'''<section class="page pg-recto cover">
<svg class="wm" viewBox="0 0 58 24"><circle cx="8" cy="12" r="6" fill="#0F6E56"/><line x1="16" y1="12" x2="28" y2="12" stroke="#0F6E56" stroke-width="1"/><circle cx="36" cy="12" r="6" fill="#0F6E56" opacity="0.35"/></svg>
<div class="logo">{DIPOLO}<span class="wordmark">regulación <b>bioeléctrica</b></span></div>
<div class="gap-t"></div>
<div><p class="kicker">Manual de trabajo · Módulo 3</p><h1>Preguntar y rastrear</h1>
<p class="sub">El quíntuple aplicado a la Regulación Bioeléctrica, y el eje digestivo: barrera, microbiota e hígado.</p></div>
<div class="gap-b"></div>
<div class="meta"><div class="who"><b>Dr. Miguel Ojeda Rios</b><br>Instituto Centrobioenergetica</div>
<div class="ed">Programa<br>El Cuerpo Eléctrico<br>Edición 2026</div></div>
<div class="endfoot">INSTITUTO CENTROBIOENERGETICA</div>
</section>
<section class="page blank pg-verso"></section>
{"".join(paginas_toc)}'''

    colofon = f'''<section class="page pg-recto cover colofon">
<div class="gap-t"></div>
<div><p class="kicker">Colofón</p>
<p class="sub">Manual de trabajo del Módulo 3 del programa El Cuerpo Eléctrico, formación en Regulación Bioeléctrica.</p>
<p class="sub" style="margin-top:6mm">Redacción y dirección clínica: Dr. Miguel Ojeda Rios.<br>Edición 2026.</p></div>
<div class="gap-b"></div>
<div class="meta"><div class="who">{DIPOLO}</div><div class="ed">Instituto<br>Centrobioenergetica</div></div>
<div class="endfoot">INSTITUTO CENTROBIOENERGETICA</div>
</section>'''

    if CFG.get("logo"):
        doc_dipolo = CFG["logo"]
    else:
        doc_dipolo = "#0F6E56"
    portada = portada.replace("#0F6E56", doc_dipolo)
    paginas_html = [p.replace("#0F6E56", doc_dipolo) for p in paginas_html]
    colofon = colofon.replace("#0F6E56", doc_dipolo)
    doc = (f'<!doctype html><html lang="es"><head><meta charset="utf-8">'
           f'<title>Manual Módulo 3 — Preguntar y rastrear</title>\n<style>\n{css}\n</style></head>\n'
           f'<body class="b5">\n{portada}\n' + "\n".join(paginas_html) + f"\n{colofon}\n</body></html>\n")
    OUT.write_text(doc)
    print(f'{OUT}  ·  {doc.count(chr(60) + "section")} páginas {FMT.upper()}')

if __name__ == "__main__":
    main()
