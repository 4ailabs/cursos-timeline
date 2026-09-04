import re, html, pathlib

src = pathlib.Path("/Users/miguelojedarios/Downloads/01_Parte_I_Fundamento_y_Rastreo.md").read_text(encoding="utf-8")
lineas = src.split("\n")
out, i, n = [], 0, len(lineas)

def inl(s):
    s = html.escape(s)
    s = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', s)
    s = re.sub(r'(?<!\*)\*([^*]+?)\*(?!\*)', r'<i>\1</i>', s)
    s = re.sub(r'`(.+?)`', r'<code>\1</code>', s)
    return s

REF = re.compile(r'^(?:[A-ZÁÉÍÓÚ][A-Za-zÀ-ÿ\-]+ [A-Z]{1,3}[,.]|Newell A|Grodzinsky AJ|Goldman DE)')

def tabla(j):
    filas = []
    while j < n and lineas[j].strip().startswith("|"):
        filas.append([c.strip() for c in lineas[j].strip().strip("|").split("|")])
        j += 1
    if len(filas) < 2: return j, ""
    cab, cuerpo = filas[0], filas[2:]
    primeras = [f[0].replace("*","").strip() for f in cuerpo if f]
    if all(len(x) <= 4 for x in primeras):      cls = "tnum"    # columna de numerales
    elif all(len(x) <= 22 for x in primeras):   cls = "tlbl"    # columna de rótulos cortos
    else:                                        cls = "ttxt"    # primera columna de texto
    h = [f"<div class='tw'><table class='{cls}'>"]
    if any(c for c in cab):
        h.append("<thead><tr>" + "".join(f"<th>{inl(c)}</th>" for c in cab) + "</tr></thead>")
    h.append("<tbody>")
    for f in cuerpo:
        h.append("<tr>" + "".join(f"<td>{inl(c)}</td>" for c in f) + "</tr>")
    h.append("</tbody></table></div>")
    return j, "".join(h)

while i < n:
    L = lineas[i]; s = L.strip()
    if not s or s == "---":
        i += 1; continue
    if s.startswith("# Bloque"):
        m = re.match(r'# (Bloque [IVX]+) · (.+)', s)
        sub = ""
        j = i + 1
        while j < n and not lineas[j].strip(): j += 1
        if j < n and lineas[j].strip().startswith("*") and lineas[j].strip().endswith("*"):
            sub = inl(lineas[j].strip().strip("*")); i = j
        out.append(f"<section class='bloq'><div class='kbar'></div><p class='eyebrow'>{m.group(1)}</p>"
                   f"<h2>{inl(m.group(2))}</h2>" + (f"<p class='sub'>{sub}</p>" if sub else "") + "</section>")
        i += 1; continue
    if s.startswith("# Referencias"):
        out.append("<section class='bloq refs'><div class='kbar'></div><h2>Referencias</h2></section>")
        i += 1; continue
    if s.startswith("# Parte I"):
        i += 1; continue
    if s.startswith("**Manual de Regulación Bioeléctrica** —"):
        i += 1; continue
    m = re.match(r'## (\d+) · (.+)', s)
    if m:
        out.append(f"<div class='caphead' id='c{m.group(1)}'><span class='capn'>{m.group(1)}</span><h3>{inl(m.group(2))}</h3></div>")
        j = i + 1
        while j < n and not lineas[j].strip(): j += 1
        if j < n and lineas[j].strip().startswith("*") and lineas[j].strip().endswith("*"):
            out.append(f"<p class='epi'>{inl(lineas[j].strip().strip('*'))}</p>"); i = j
        i += 1; continue
    if s.startswith("## "):
        out.append(f"<div class='caphead solo'><h3>{inl(s[3:])}</h3></div>")
        j = i + 1
        while j < n and not lineas[j].strip(): j += 1
        if j < n and lineas[j].strip().startswith("*") and lineas[j].strip().endswith("*"):
            out.append(f"<p class='epi'>{inl(lineas[j].strip().strip('*'))}</p>"); i = j
        i += 1; continue
    if s.startswith("### "):
        out.append(f"<h4 class='rot'>{inl(s[4:])}</h4>"); i += 1; continue
    if s.startswith("```"):
        j = i + 1; buf = []
        while j < n and not lineas[j].strip().startswith("```"):
            buf.append(html.escape(lineas[j])); j += 1
        out.append("<pre class='tree'>" + "\n".join(buf) + "</pre>"); i = j + 1; continue
    if s.startswith("|"):
        i, t = tabla(i); out.append(t); continue
    if s.startswith(">"):
        buf = []
        while i < n and lineas[i].strip().startswith(">"):
            c = lineas[i].strip().lstrip(">").strip()
            if c: buf.append(c)
            i += 1
        cuerpo = [b for b in buf if not b.startswith("—")]
        attr = [b for b in buf if b.startswith("—")]
        h = "<div class='pull'>" + "".join(f"<p class='cita'>{inl(b)}</p>" for b in cuerpo)
        if attr: h += f"<span class='attr'>{inl(attr[0].lstrip('—').strip())}</span>"
        out.append(h + "</div>"); continue
    if re.match(r'^\d+\. ', s):
        buf = []
        while i < n and (re.match(r'^\d+\. ', lineas[i].strip()) or not lineas[i].strip()):
            if not lineas[i].strip():
                if i + 1 < n and re.match(r'^\d+\. ', lineas[i+1].strip()): i += 1; continue
                break
            buf.append(re.sub(r'^\d+\. ', '', lineas[i].strip())); i += 1
        out.append("<ol class='proc'>" + "".join(f"<li>{inl(b)}</li>" for b in buf) + "</ol>"); continue
    if s.startswith("- "):
        buf = []
        while i < n and lineas[i].strip().startswith("- "):
            buf.append(lineas[i].strip()[2:]); i += 1
        cls = "refs" if REF.match(buf[0].replace("**","")) else "dash"
        out.append(f"<ul class='{cls}'>" + "".join(f"<li>{inl(b)}</li>" for b in buf) + "</ul>"); continue
    cls = " class='ref'" if REF.match(s) else ""
    out.append(f"<p{cls}>{inl(s)}</p>"); i += 1

pathlib.Path("cuerpo.html").write_text("\n".join(out), encoding="utf-8")
print("bloques:", len(out))
