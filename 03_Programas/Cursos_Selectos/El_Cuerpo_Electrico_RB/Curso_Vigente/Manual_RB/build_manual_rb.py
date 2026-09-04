#!/usr/bin/env python3
"""
Compone el Manual de Regulación Bioeléctrica a partir de los tres markdown maestros.

Fuentes:  01_Parte_I_Fundamento_y_Rastreo.md
          02_Parte_II_Los_Ejes.md
          03_Parte_III_Conduccion.md

Reglas de composición que aplica:
  · Medianil interior en espejo; folio y cornisa al canto exterior.
  · Cornisa de verso con el bloque, de recto con el capítulo en curso.
  · Cada parte abre en recto, con portadilla y verso en blanco.
  · Cada bloque abre en página nueva, con su apertura y su epígrafe.
  · Título de capítulo y epígrafe viajan juntos, y nunca cierran página:
    la cabeza arrastra consigo al menos 22 mm de contenido.
  · Tabla, procedimiento, cita y árbol de decisión no se parten.
  · La altura de cada bloque se mide en el navegador, no se estima.

Uso:  python3 build_manual_rb.py [b5|letter|bn-b5|bn-letter]
"""
import re, html, pathlib, sys, subprocess, json, tempfile, os

FUENTES = [
    ("I",   "El fundamento común a todos los ejes",
     "Qué evalúa el método, con qué campo magnético, con qué nomenclatura y "
     "procedimiento de medición, con qué regla se rastrea y dentro de qué límite se aplica.",
     "01_Parte_I_Fundamento_y_Rastreo.md"),
    ("II",  "Los ejes",
     "Los siete ejes de trabajo: qué zona rastrea cada uno, en qué orden, "
     "y qué indica el nodo donde el hallazgo cierra.",
     "02_Parte_II_Los_Ejes.md"),
    ("III", "Conducción y seguimiento",
     "Con qué eje se empieza, qué se hace cuando el rastreo no da hallazgos, "
     "cómo se conduce la serie y hasta dónde llega el método.",
     "03_Parte_III_Conduccion.md"),
]

FORMATOS = {
    "b5":        dict(css="estilo_b5.css",        out="Manual_RB_B5.html",        util=207.0, entradas=30),
    "letter":    dict(css="estilo_letter.css",    out="Manual_RB_Letter.html",    util=232.0, entradas=34),
    "bn-b5":     dict(css="estilo_bn_b5.css",     out="Manual_RB_B5_BN.html",     util=207.0, entradas=30, logo="#000000"),
    "bn-letter": dict(css="estilo_bn_letter.css", out="Manual_RB_Letter_BN.html", util=232.0, entradas=34, logo="#000000"),
}
FMT = sys.argv[1] if len(sys.argv) > 1 else "b5"
if FMT not in FORMATOS: raise SystemExit(f"formato: {' | '.join(FORMATOS)}")
CFG = dict(FORMATOS[FMT])

# Segundo argumento: I, II o III compone esa parte sola, con su propia portada.
PARTE = sys.argv[2].upper() if len(sys.argv) > 2 else None
if PARTE:
    if PARTE not in {r for r, *_ in FUENTES}:
        raise SystemExit("parte: I | II | III")
    FUENTES = [f for f in FUENTES if f[0] == PARTE]
    CFG["out"] = CFG["out"].replace("Manual_RB_", f"Manual_RB_Parte_{PARTE}_")
OUT = pathlib.Path(CFG["out"])

CHROME  = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
ARRASTRE = 22.0   # mm que una cabeza de capítulo tiene que arrastrar consigo
MIN_FILAS = 3     # una tabla no se parte dejando menos filas que esto
TABLA_LARGA = 7   # a partir de aquí una tabla puede partirse entre páginas
MERMA = 2.5       # mm que se reservan al partir: medir fila a fila pierde los filetes

DIPOLO = ('<svg viewBox="0 0 58 24"><circle cx="8" cy="12" r="6" fill="#0F6E56"/>'
          '<line x1="16" y1="12" x2="28" y2="12" stroke="#0F6E56" stroke-width="1"/>'
          '<circle cx="36" cy="12" r="6" fill="#0F6E56" opacity="0.35"/></svg>')

# ─────────────────────────── inline ───────────────────────────
def inline(s):
    s = html.escape(s, quote=False)
    s = re.sub(r"\$\$(.+?)\$\$", r"\1", s)
    s = re.sub(r"\$(.+?)\$", r"\1", s)
    s = s.replace(r"\langle", "⟨").replace(r"\rangle", "⟩")
    s = re.sub(r"\\text\{([^}]*)\}", r"\1", s)
    s = re.sub(r"_\{?([A-Za-zñáéíóú]+)\}?", r"<sub>\1</sub>", s)
    s = re.sub(r"`([^`]+)`", r'<span class="data">\1</span>', s)
    s = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", s)
    s = re.sub(r"(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)", r"<i>\1</i>", s)
    return s

def es_epigrafe(t, d):
    return t == "p" and re.match(r"^\*[^*].*[^*]\*$", d.strip()) is not None

def es_formula(t, d):
    return t == "p" and d.strip().startswith("$$")

def es_rotulo(t, d):
    """Párrafo que es solo un nombre en negritas: rotula el bloque que le sigue."""
    if t != "p" or not isinstance(d, str): return False
    s = d.strip()
    return (re.fullmatch(r"\*\*[^*]{1,34}\*\*", s) is not None
            and not s.rstrip("*").endswith((".", ":", ";")))

# ─────────────────────────── parse ───────────────────────────
def parse(md):
    out, i = [], 0
    L = md.split("\n")
    while i < len(L):
        ln = L[i]
        if ln.startswith("```"):
            j, buf = i + 1, []
            while j < len(L) and not L[j].startswith("```"):
                buf.append(L[j]); j += 1
            out.append(("pre", "\n".join(buf))); i = j + 1; continue
        if ln.startswith("|"):
            j, rows = i, []
            while j < len(L) and L[j].startswith("|"):
                rows.append(L[j]); j += 1
            out.append(("tabla", rows)); i = j; continue
        if ln.startswith(">"):
            j, buf = i, []
            while j < len(L) and (L[j].startswith(">") or (buf and L[j].strip() == "" and
                                   j + 1 < len(L) and L[j+1].startswith(">"))):
                buf.append(re.sub(r"^>\s?", "", L[j])); j += 1
            out.append(("cita", "\n".join(buf).strip())); i = j; continue
        if re.match(r"^\d+\.\s+", ln):
            j, items = i, []
            while j < len(L):
                mm = re.match(r"^(\d+)\.\s+(.*)$", L[j])
                if not mm: break
                items.append(mm.group(2)); j += 1
            out.append(("ol", items)); i = j; continue
        if ln.startswith("- "):
            j, items = i, []
            while j < len(L) and L[j].startswith("- "):
                items.append(L[j][2:]); j += 1
            out.append(("ul", items)); i = j; continue
        if ln.startswith("#"):
            n = len(ln) - len(ln.lstrip("#"))
            out.append((f"h{n}", ln.lstrip("# ").strip())); i += 1; continue
        if ln.strip() in ("---", "***"):
            i += 1; continue
        if ln.strip():
            j, buf = i, []
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
    numerada = ncol == 3 and cuerpo and all(re.fullmatch(r"\*\*\d+\*\*", r[0].strip()) for r in cuerpo if r and r[0])
    corto = cuerpo and all(len(r[0]) <= 34 for r in cuerpo if r)
    cls = "idx" if numerada else ("spec" if (ncol == 2 and corto and not (cab and any(cab))) else "nodos")
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
    lineas = [l for l in txt.split("\n") if l.strip()]
    attr = ""
    if lineas and lineas[-1].strip().startswith("—"):
        attr = f'<span class="attr">{inline(lineas.pop().strip().lstrip("— "))}</span>'
        txt = "\n".join(lineas).strip()
    m = re.match(r"^\*\*(.+?)[.:]?\*\*\s*(.*)$", txt, re.S)
    if m and len(m.group(1)) <= 46 and m.group(2).strip() and not attr:
        return (f'<div class="callout"><span class="w">{inline(m.group(1))}</span>'
                f'<p>{inline(m.group(2).strip())}</p></div>')
    cls = "cita" if txt.strip().startswith("*") else ""
    return f'<div class="pull"><p class="{cls}">{inline(txt)}{attr}</p></div>'

def render(bloques):
    h = []
    for t, d in bloques:
        if t == "cap":
            n, tit, epi = d
            h.append(f'<div class="caphead"><span class="capn">{n}</span><h1>{inline(tit)}</h1></div>')
            if epi: h.append(f'<p class="epi">{inline(epi.strip("*"))}</p>')
        elif t == "bloq":
            rom, tit, sub = d
            h.append(f'<div class="bloq"><div class="kbar"></div><p class="eyebrow">Bloque {rom}</p>'
                     f'<h1>{inline(tit)}</h1><p class="sub">{inline(sub.strip("*"))}</p></div>')
        elif t == "h3":  h.append(f'<div class="sub">{inline(d)}</div>')
        elif t == "h4":  h.append(f'<div class="shead">{inline(d)}</div>')
        elif t == "p":
            if es_rotulo("p", d):
                h.append(f'<div class="rot">{inline(d.strip("* "))}</div>')
            elif es_formula("p", d):
                h.append(f'<div class="formula">{inline(d.strip("$ "))}</div>')
            else:
                h.append(f"<p>{inline(d)}</p>")
        elif t == "tabla": h.append(tabla_html(d))
        elif t == "tabla_pieza":
            cab, filas = d
            h.append(tabla_html(([cab, "|---|"] if cab else []) + filas))
        elif t == "pre_pieza":
            sigue, segs = d
            cont = ' class="tree sigue"' if sigue else ' class="tree"'
            h.append(f'<pre{cont}>{html.escape(chr(10).join(segs))}</pre>')
        elif t == "cita":  h.append(cita_html(d))
        elif t == "ol":    h.append('<ol class="proc">' + "".join(f"<li>{inline(x)}</li>" for x in d) + "</ol>")
        elif t == "ul":    h.append('<ul class="dash">' + "".join(f"<li>{inline(x)}</li>" for x in d) + "</ul>")
        elif t == "pre":   h.append(f'<pre class="tree">{html.escape(d)}</pre>')
    return "\n".join(h)

def descompon(rows):
    """→ (linea_cabecera|None, [filas de cuerpo]) tal como vienen del markdown."""
    celdas = [r for r in rows]
    if len(celdas) > 1 and set(celdas[1].strip().strip("|").split("|")[0].strip()) <= set("-: "):
        return celdas[0], celdas[2:]
    return None, celdas

# ─────────────────────────── medición ───────────────────────────
def medir(items, css):
    piezas = "".join(f'<div data-k="{k}" style="display:flow-root;position:relative">{h}</div>'
                     for k, h in items)
    doc = (f'<!doctype html><meta charset="utf-8"><style>{css}\n'
           f'.b5 .page{{height:auto;box-shadow:none;margin:0}}</style>'
           f'<body class="b5"><section class="page pg-recto prem"><div class="body" id="M">{piezas}</div></section>'
           '<script>var o={},g={};document.querySelectorAll("#M>[data-k]").forEach(function(e){'
           'o[e.dataset.k]=e.getBoundingClientRect().height;var m=0;'
           'Array.prototype.forEach.call(e.children,function(c){'
           'if(getComputedStyle(c).position==="absolute"){var h=c.getBoundingClientRect().height;'
           'if(h>m)m=h;}});g[e.dataset.k]=m;});'
           'document.title=JSON.stringify({f:o,m:g});</script>')
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False) as f:
        f.write(doc); ruta = f.name
    dom = subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--virtual-time-budget=8000",
                          "--dump-dom", f"file://{ruta}"], capture_output=True, text=True).stdout
    os.unlink(ruta)
    m = re.search(r"<title>(\{.*\})</title>", dom, re.S)
    if not m: raise SystemExit("no se pudo medir: revisa la ruta de Chrome")
    d = json.loads(html.unescape(m.group(1)))
    mm = lambda o: {k: v / 96 * 25.4 for k, v in o.items()}
    return mm(d["f"]), mm(d["m"])

def desborde(doc):
    """Mide en el navegador cuánto se pasa cada página, en mm. → el máximo."""
    sonda = '''<script>var m=0,w="";document.querySelectorAll("section.page.prem").forEach(function(p){
      var cs=getComputedStyle(p),pt=parseFloat(cs.paddingTop),pb=parseFloat(cs.paddingBottom),
          util=p.clientHeight-pt-pb,usado=0;
      Array.prototype.forEach.call(p.children,function(c){
        if(c.classList.contains("foot")||c.classList.contains("folio")||
           c.classList.contains("endfoot")||c.classList.contains("wm")) return;
        var s=getComputedStyle(c);
        usado+=c.getBoundingClientRect().height+parseFloat(s.marginTop)+parseFloat(s.marginBottom);});
      if(usado-util>m){m=usado-util;w=(p.textContent||"").replace(/\s+/g," ").slice(0,110);}});
    document.title=String(m)+"|"+(w||"");</script>'''
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False) as f:
        f.write(doc.replace("</body>", sonda + "</body>")); ruta = f.name
    dom = subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--virtual-time-budget=20000",
                          "--dump-dom", f"file://{ruta}"], capture_output=True, text=True).stdout
    os.unlink(ruta)
    m = re.search(r"<title>(-?[\d.]+)\|(.*?)</title>", dom, re.S)
    if not m: return 0.0
    mm = float(m.group(1)) / 96 * 25.4
    if mm > 0.2: print(f"      la peor: {html.unescape(m.group(2))[:100]}")
    return mm

# ─────────────────────────── troceo de la fuente ───────────────────────────
ROMANOS = dict(I=1, II=2, III=3, IV=4, V=5, VI=6, VII=7, VIII=8, IX=9, X=10,
               XI=11, XII=12, XIII=13)

def trocear(md):
    """→ [(rom, titulo_bloque, subtitulo, [(num, titulo_cap, epigrafe, [bloques])])]"""
    bl = parse(md)
    bloques, cur_b, cur_c = [], None, None
    razonamiento = []
    for k, (t, d) in enumerate(bl):
        if t == "h1" and d.startswith("Parte"):
            continue
        if t == "h1" and d.startswith("Bloque"):
            m = re.match(r"Bloque ([IVX]+) · (.+)", d)
            sub = bl[k+1][1] if k + 1 < len(bl) and es_epigrafe(*bl[k+1]) else ""
            cur_b = (m.group(1), m.group(2), sub, []); bloques.append(cur_b); cur_c = None
            continue
        if t == "h2":
            m = re.match(r"(\d+) · (.+)", d)
            epi = bl[k+1][1] if k + 1 < len(bl) and es_epigrafe(*bl[k+1]) else ""
            if m:
                cur_c = (m.group(1), m.group(2), epi, [])
                cur_b[3].append(cur_c)
            else:                                    # «El razonamiento del método»
                cur_c = (None, d, epi, []); razonamiento.append(cur_c)
            continue
        if cur_c is not None and es_epigrafe(t, d) and not cur_c[3]:
            continue                                 # el epígrafe ya está en la cabeza
        if cur_b is not None and cur_c is None and es_epigrafe(t, d):
            continue                                 # el subtítulo del bloque, ya colocado
        if t == "p" and d.strip() == "*Instituto Centrobioenergetica, 2026*":
            continue
        if cur_c is not None:
            cur_c[3].append((t, d))
    return razonamiento, bloques

# ─────────────────────────── paginación ───────────────────────────
def paginar(unidades, alturas, util, partible, margen=None):
    margen = margen or {}
    """unidades: [(clave_cabeza, html_cabeza, [(clave, bloque)], corta_pagina)]
       → [[(html_cabeza|None, [bloques])]]"""
    paginas, actual, usado = [], [], 0.0
    for kc, cab, cuerpo, corta in unidades:
        if corta and actual:
            paginas.append(actual); actual, usado = [], 0.0
        i, primero = 0, True
        while i < len(cuerpo) or (primero and cab):
            coste_cab = alturas[kc] if primero and cab else 0.0
            # la cabeza arrastra contenido: no cierra página sola
            arrastre = 0.0
            if primero and cab:
                j, a = i, 0.0
                while j < len(cuerpo) and a < ARRASTRE:
                    a += alturas[cuerpo[j][0]]; j += 1
                arrastre = min(a, ARRASTRE)
            if actual and usado + coste_cab + arrastre > util:
                paginas.append(actual); actual, usado = [], 0.0
                continue
            cabe, u = [], coste_cab
            while i < len(cuerpo):
                k, b = cuerpo[i]
                paso = alturas[k]
                if (b[0] in ("h3", "h4") or es_rotulo(*b)) and i + 1 < len(cuerpo):
                    # el subtítulo arrastra lo que le sigue; si eso es partible,
                    # le basta con arrastrar su primer trozo
                    ks = cuerpo[i + 1][0]
                    if ks in partible:
                        cabecera = alturas.get(ks + "#c", 0.0)
                        paso += cabecera + alturas.get(ks + "#0", 0.0)
                    else:
                        paso += alturas[ks]
                if usado + u + margen.get(k, 0.0) > util or usado + u + paso > util:
                    # una tabla larga se parte, y el encabezado se repite en la página siguiente
                    if k in partible and partible[k][0] == "pre":
                        _t, segs = partible[k]
                        libre = util - usado - u - MERMA
                        n, acum = 0, 0.0
                        while n < len(segs) and acum + alturas[k + f"#{n}"] <= libre:
                            acum += alturas[k + f"#{n}"]; n += 1
                        if 1 <= n <= len(segs) - 1:
                            cabe.append(("pre_pieza", (False, segs[:n])))
                            u += acum + MERMA
                            resto = segs[n:]; kr = k + "~"
                            partible[kr] = ("pre", resto)
                            alturas[kr] = sum(alturas[k + f"#{j}"] for j in range(n, len(segs)))
                            for j in range(len(resto)):
                                alturas[kr + f"#{j}"] = alturas[k + f"#{n + j}"]
                            cuerpo = cuerpo[:i] + [(kr, ("pre_pieza", (True, resto)))] + cuerpo[i+1:]
                        break
                    if k in partible:
                        _t, tcab, filas = partible[k]
                        libre = util - usado - u - alturas[k + "#c"] - MERMA
                        n, acum = 0, 0.0
                        while n < len(filas) and acum + alturas[k + f"#{n}"] <= libre:
                            acum += alturas[k + f"#{n}"]; n += 1
                        if MIN_FILAS <= n <= len(filas) - MIN_FILAS:
                            cabe.append(("tabla_pieza", (tcab, filas[:n])))
                            u += alturas[k + "#c"] + acum + MERMA
                            resto = filas[n:]
                            kr = k + "~"
                            partible[kr] = (tcab, resto)
                            alturas[kr] = alturas[k + "#c"] + sum(alturas[k + f"#{j}"] for j in range(n, len(filas)))
                            alturas[kr + "#c"] = alturas[k + "#c"]
                            for j, _f in enumerate(resto):
                                alturas[kr + f"#{j}"] = alturas[k + f"#{n + j}"]
                            cuerpo = cuerpo[:i] + [(kr, ("tabla_pieza", (tcab, resto)))] + cuerpo[i+1:]
                    break
                u += alturas[k]; cabe.append(b); i += 1
            if not cabe and i < len(cuerpo):          # bloque más alto que la página
                cabe = [cuerpo[i][1]]; u += alturas[cuerpo[i][0]]; i += 1
            actual.append((cab if primero else None, cabe))
            usado += u; primero = False
            if i < len(cuerpo):
                paginas.append(actual); actual, usado = [], 0.0
    if actual: paginas.append(actual)
    return paginas

# ─────────────────────────── montaje ───────────────────────────
def compone(util, css, medidas=None):

    partes = []
    for rom, titulo, sub, fuente in FUENTES:
        raz, bloques = trocear(pathlib.Path(fuente).read_text())
        partes.append(dict(rom=rom, titulo=titulo, sub=sub, raz=raz, bloques=bloques))

    # ── medir todo de una sola vez ──
    items, unidades_por_parte, partible = [], [], {}

    def mide_filas(items, partible, k, b):
        """Una tabla de más de TABLA_LARGA filas se mide fila a fila, para poder partirla."""
        if b[0] == "pre":
            segs = re.split(r"\n(?=\s*\d+ ·)", b[1])
            if len(segs) < 3 or len(b[1].split(chr(10))) < 24: return
            items.append((k + "#c", render([("pre_pieza", (False, []))])))
            for j, s in enumerate(segs):
                items.append((k + f"#{j}", render([("pre_pieza", (False, [s]))])))
            partible[k] = ("pre", segs)
            return
        if b[0] != "tabla": return
        cab, filas = descompon(b[1])
        if len(filas) <= TABLA_LARGA: return
        items.append((k + "#c", render([("tabla_pieza", (cab, []))])))
        for j, f in enumerate(filas):
            items.append((k + f"#{j}", render([("tabla_pieza", (None, [f]))])))
        partible[k] = ("tabla", cab, filas)

    for pi, P in enumerate(partes):
        unis = []
        for ci, (num, tit, epi, cuerpo) in enumerate(P["raz"]):
            kc = f"{pi}r{ci}c"
            items.append((kc, render([("cap", ("·", tit, epi))])))
            cu = []
            for bi, b in enumerate(cuerpo):
                k = f"{pi}r{ci}_{bi}"; items.append((k, render([b]))); cu.append((k, b))
                mide_filas(items, partible, k, b)
            unis.append((kc, [("cap", ("·", tit, epi))], cu, True, None))
        for bi_, (brom, btit, bsub, caps) in enumerate(P["bloques"]):
            kb = f"{pi}b{bi_}"
            items.append((kb, render([("bloq", (brom, btit, bsub))])))
            primero = True
            for ci, (num, tit, epi, cuerpo) in enumerate(caps):
                kc = f"{pi}b{bi_}c{ci}"
                cab = [("bloq", (brom, btit, bsub))] if primero else []
                cab.append(("cap", (num, tit, epi)))
                items.append((kc, render(cab)))
                cu = []
                for bj, b in enumerate(cuerpo):
                    k = f"{pi}b{bi_}c{ci}_{bj}"; items.append((k, render([b]))); cu.append((k, b))
                    mide_filas(items, partible, k, b)
                unis.append((kc, cab, cu, primero, (brom, btit, num, tit)))
                primero = False
        unidades_por_parte.append(unis)

    if medidas is None:
        print(f"midiendo {len(items)} bloques…")
        medidas = medir(items, css)
    alturas = dict(medidas[0])       # el troceo de tablas y árboles añade claves
    margen = medidas[1]

    # ── paginar parte por parte, llevando el folio y la cornisa ──
    paginas_html, toc, folio = [], [], 1
    folio += 2                                        # portada y su verso
    n_toc_estimado = 0                                # se recalcula abajo

    cuerpo_paginas = []                               # (lado_libre, html_sin_folio, cornisa)
    for pi, P in enumerate(partes):
        cuerpo_paginas.append(("PARTE", P))
        unis = unidades_por_parte[pi]
        pags = paginar([(k, c, cu, corta) for k, c, cu, corta, _ in unis], alturas, util, partible, margen)
        # a cada página se le anotan TODAS las cabezas que abren en ella:
        # la cornisa toma la primera, y el índice toma todas.
        por_cab = {id(c): m for _, c, _, _, m in unis}
        rh_bloque, rh_cap = f"Parte {P['rom']}", P["titulo"]
        for pag in pags:
            metas = [por_cab.get(id(cab)) for cab, _ in pag if cab]
            for m in metas:
                if m:
                    rh_bloque = f"Bloque {m[0]} · {m[1]}"
                    rh_cap = f"{m[2]} · {m[3]}"
                    break
            partes_html = []
            for cab, bloques in pag:
                if cab: partes_html.append(render(cab))
                partes_html.append('<div class="body">' + render(bloques) + "</div>")
            cuerpo_paginas.append(("TEXTO", ("".join(partes_html), rh_bloque, rh_cap, pi,
                                             [m for m in metas if m])))

    # ── índice: se compone una vez para saber cuántas hojas ocupa ──
    def indice_hojas(offset):
        """offset = folio de la primera página de texto"""
        f = offset
        pagina_de = {}
        for tipo, dato in cuerpo_paginas:
            if tipo == "PARTE":
                if PARTE: continue
                if f % 2 == 0: f += 1                 # la parte abre en recto
                pagina_de[("P", dato["rom"])] = f
                f += 2                                # portadilla + verso en blanco
            else:
                _, _rhb, _rhc, pi, metas = dato
                for m in metas:
                    pagina_de.setdefault(("C", pi, f"{m[2]} · {m[3]}"), f)
                    pagina_de.setdefault(("B", pi, f"Bloque {m[0]} · {m[1]}"), f)
                f += 1
        return pagina_de, f

    # dos pasadas: la longitud del índice desplaza los folios
    n_hojas = 4
    for _ in range(6):
        offset = 3 + n_hojas + (n_hojas % 2)
        pagina_de, _fin = indice_hojas(offset)
        entradas = []
        for pi, P in enumerate(partes):
            entradas.append(("P", f"Parte {P['rom']} · {P['titulo']}", pagina_de.get(("P", P["rom"]), 1)))
            visto = set()
            for brom, btit, bsub, caps in P["bloques"]:
                rhb = f"Bloque {brom} · {btit}"
                if rhb not in visto:
                    entradas.append(("B", rhb, pagina_de.get(("B", pi, rhb), 1))); visto.add(rhb)
                for num, tit, epi, _c in caps:
                    entradas.append(("C", (num, tit), pagina_de.get(("C", pi, f"{num} · {tit}"), 1)))
        coste = sum(2 if t == "P" else (2 if t == "B" else 1) for t, _, _ in entradas) + 4
        nuevo = max(2, -(-coste // CFG["entradas"]))
        if nuevo == n_hojas: break
        n_hojas = nuevo

    # ── repartir el índice en hojas ──
    # Se llena cada hoja hasta su capacidad: repartir parejo dejaba media
    # página en blanco en las dos.
    coste_e = lambda e: 2 if e[0] in ("P", "B") else 1
    cupo = CFG["entradas"]
    hojas, hoja, n = [], [], 0
    for e in entradas:
        c = coste_e(e)
        if hoja and n + c > cupo:
            hojas.append(hoja); hoja, n = [], 0
        hoja.append(e); n += c
    if hoja: hojas.append(hoja)
    # un encabezado de bloque o de parte no cierra hoja: pasa a la siguiente
    for i in range(len(hojas) - 1):
        while hojas[i] and hojas[i][-1][0] in ("P", "B"):
            hojas[i + 1].insert(0, hojas[i].pop())

    paginas_toc = []
    for k, hj in enumerate(hojas):
        lado = "pg-recto" if (3 + k) % 2 == 1 else "pg-verso"
        cab = ('<div class="opener"><div class="kbar"></div>'
               '<p class="eyebrow">Contenido</p><h1>Índice</h1></div>') if k == 0 else ""
        cuerpo, abierta = [], False
        for tipo, dato, pg in hj:
            if tipo == "P":
                if abierta: cuerpo.append("</ul>"); abierta = False
                cuerpo.append(f'<div class="prt">{html.escape(dato)}</div>')
            elif tipo == "B":
                if abierta: cuerpo.append("</ul>"); abierta = False
                cuerpo.append(f'<div class="grp">{html.escape(dato)}</div>')
            else:
                if not abierta: cuerpo.append('<ul class="toc">'); abierta = True
                num, tit = dato
                cuerpo.append(f'<li><span class="pg">{pg}</span><div class="body"><div class="t">'
                              f'<span class="step">{num}</span>{inline(tit)}</div></div></li>')
        if abierta: cuerpo.append("</ul>")
        paginas_toc.append(f'''<section class="page {lado} indice">
<div class="brand">{DIPOLO}<span class="wordmark">regulación <b>bioeléctrica</b></span><span class="sp"></span><span class="rh">Manual del método</span></div>
{cab}
{"".join(cuerpo)}
<div class="foot">INSTITUTO CENTROBIOENERGETICA</div>
</section>''')
    if len(paginas_toc) % 2: paginas_toc.append('<section class="page blank pg-verso"></section>')

    # ── recorrer las páginas de cuerpo asignando folio, lado y portadillas ──
    folio = 3 + len(paginas_toc)
    salida = []
    for tipo, dato in cuerpo_paginas:
        if tipo == "PARTE":
            if PARTE:
                continue          # la portada del volumen ya nombra la parte
            if folio % 2 == 0:
                salida.append('<section class="page blank pg-verso"></section>'); folio += 1
            P = dato
            lista = "".join(f'<li><i>Bloque {b[0]}</i>{html.escape(b[1])}</li>' for b in P["bloques"])
            salida.append(f'''<section class="page pg-recto parte">
<svg class="wm" viewBox="0 0 58 24"><circle cx="8" cy="12" r="6" fill="#0F6E56"/><line x1="16" y1="12" x2="28" y2="12" stroke="#0F6E56" stroke-width="1"/><circle cx="36" cy="12" r="6" fill="#0F6E56" opacity="0.35"/></svg>
<div class="gap-t"></div>
<div><div class="rom">{P["rom"]}</div><p class="kicker">Parte {P["rom"]}</p>
<h1>{inline(P["titulo"])}</h1><p class="sub">{inline(P["sub"])}</p>
<div class="conten"><ul>{lista}</ul></div></div>
<div class="gap-b"></div>
<div class="endfoot">INSTITUTO CENTROBIOENERGETICA</div>
</section>
<section class="page blank pg-verso"></section>''')
            folio += 2
        else:
            cuerpo, rhb, rhc, pi, _metas = dato
            recto = folio % 2 == 1
            lado = "pg-recto" if recto else "pg-verso"
            rh = html.escape(rhc if recto else rhb)
            salida.append(f'''<section class="page {lado} prem">
<div class="brand">{DIPOLO}<span class="wm2">regulación <b>bioeléctrica</b></span><span class="sp"></span><span class="rh">{rh}</span></div>
{cuerpo}
<div class="foot">INSTITUTO CENTROBIOENERGETICA</div><div class="folio">{folio}</div>
</section>''')
            folio += 1

    if PARTE:
        P0 = partes[0]
        kicker = f"El Cuerpo Eléctrico · Parte {P0['rom']}"
        titulo_portada = inline(P0["titulo"])
        sub_portada = inline(P0["sub"])
        pie_ed = f"Parte {P0['rom']} del manual<br>Edición 2026"
    else:
        kicker = "El Cuerpo Eléctrico"
        titulo_portada = "Manual de Regulación Bioeléctrica"
        sub_portada = "El fundamento, los siete ejes de trabajo y la conducción de la serie de sesiones."
        pie_ed = "Manual del método<br>Edición 2026"

    portada = f'''<section class="page pg-recto cover">
<svg class="wm" viewBox="0 0 58 24"><circle cx="8" cy="12" r="6" fill="#0F6E56"/><line x1="16" y1="12" x2="28" y2="12" stroke="#0F6E56" stroke-width="1"/><circle cx="36" cy="12" r="6" fill="#0F6E56" opacity="0.35"/></svg>
<div class="logo">{DIPOLO}<span class="wordmark">regulación <b>bioeléctrica</b></span></div>
<div class="gap-t"></div>
<div><p class="kicker">{kicker}</p><h1>{titulo_portada}</h1>
<p class="sub">{sub_portada}</p></div>
<div class="gap-b"></div>
<div class="meta"><div class="who"><b>Dr. Miguel Ojeda Rios</b><br>Instituto Centrobioenergetica</div>
<div class="ed">{pie_ed}</div></div>
<div class="endfoot">INSTITUTO CENTROBIOENERGETICA</div>
</section>
<section class="page blank pg-verso"></section>'''

    colofon = f'''<section class="page pg-recto cover colofon">
<div class="gap-t"></div>
<div><p class="kicker">Colofón</p>
<p class="sub">Manual de Regulación Bioeléctrica del programa El Cuerpo Eléctrico. Se compuso a partir de las cuatro clases impartidas del programa, y recoge únicamente el procedimiento de Regulación Bioeléctrica.</p>
<p class="sub" style="margin-top:6mm">Redacción y dirección clínica: Dr. Miguel Ojeda Rios.<br>Instituto Centrobioenergetica. Edición 2026.</p></div>
<div class="gap-b"></div>
<div class="meta"><div class="who">{DIPOLO}</div><div class="ed">Instituto<br>Centrobioenergetica</div></div>
<div class="endfoot">INSTITUTO CENTROBIOENERGETICA</div>
</section>'''

    tinta = CFG.get("logo") or "#0F6E56"
    doc_pags = [portada] + paginas_toc + salida + [colofon]
    if tinta != "#0F6E56":
        doc_pags = [p.replace("#0F6E56", tinta) for p in doc_pags]
    doc = (f'<!doctype html><html lang="es"><head><meta charset="utf-8">'
           f'<title>Manual de Regulación Bioeléctrica</title>\n<style>\n{css}\n</style></head>\n'
           f'<body class="b5">\n' + "\n".join(doc_pags) + "\n</body></html>\n")
    return doc, medidas, len(paginas_toc), len(salida)


def main():
    """Compone, mide el resultado y baja la caja hasta que ninguna página desborde."""
    css = pathlib.Path(CFG["css"]).read_text()
    util = CFG["util"]
    medidas = None
    for intento in range(12):
        doc, medidas, n_toc, n_txt = compone(util, css, medidas)
        exceso = desborde(doc)
        lleno = doc.count('class="page pg-recto indice"') + doc.count('class="page pg-verso indice"')
        if exceso <= 0.2:
            OUT.write_text(doc)
            print(f'{OUT}  ·  {doc.count(chr(60) + "section")} páginas {FMT.upper()}'
                  f'  ·  índice {n_toc}  ·  texto {n_txt}  ·  caja {util:.1f} mm')
            return
        util -= max(1.0, min(exceso + 0.3, 3.0))
        print(f"   desborde de {exceso:.1f} mm · se recompone con la caja en {util:.1f} mm")
    raise SystemExit("no se pudo ajustar la caja en ocho intentos")


if __name__ == "__main__":
    main()
