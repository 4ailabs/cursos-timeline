import re, pathlib, html as H

MARCA = ('<svg viewBox="0 0 58 24" aria-hidden="true"><circle cx="8" cy="12" r="6" fill="currentColor"/>'
         '<line x1="16" y1="12" x2="28" y2="12" stroke="currentColor" stroke-width="1"/>'
         '<circle cx="36" cy="12" r="6" fill="currentColor" opacity="0.35"/></svg>')

cuerpo = pathlib.Path("cuerpo.html").read_text(encoding="utf-8").split("\n")

hojas, actual, toc = [], [], []
bloque, folio = "Parte I", 5        # 1 portada · 2 portadilla · 3 índice

def cornisa(rh):
    return (f"<div class='cornisa'><span class='mk'>{MARCA}</span>"
            f"<span class='wm2'>regulación <b>bioeléctrica</b></span>"
            f"<span class='sp'></span><span class='rh'>{H.escape(rh)}</span></div>")

def cerrar():
    global actual, folio
    if not actual: return
    hojas.append(f"<section class='hoja prem'>{cornisa(bloque)}<div class='cuerpo'>"
                 + "\n".join(actual) + f"</div><span class='folio'>{folio}</span></section>")
    folio += 1; actual = []

for L in cuerpo:
    if "class='bloq refs'" in L:
        cerrar(); bloque = "Referencias"
        toc.append(("grp", "Referencias", folio))
        actual.append("<div class='caphead solo'><h3>Referencias</h3></div>")
        continue
    if "class='bloq'" in L:
        cerrar()
        m = re.search(r"<h2>(.*?)</h2>", L); e = re.search(r"class='eyebrow'>(.*?)</p>", L)
        bloque = re.sub(r"<[^>]+>", "", m.group(1))
        rot = re.sub(r"<[^>]+>", "", e.group(1)) if e else ""
        toc.append(("grp", f"{rot} · {bloque}", folio + 1))
        hojas.append(f"<section class='hoja parteb'>{L}<span class='folio'>{folio}</span></section>")
        folio += 1
        continue
    if "class='caphead'" in L and "capn" in L:
        cerrar()
        n = re.search(r"class='capn'>(\d+)</span>", L); t = re.search(r"<h3>(.*?)</h3>", L)
        toc.append(("cap", (n.group(1), re.sub(r"<[^>]+>", "", t.group(1))), folio))
    actual.append(L)
cerrar()

# ── índice clásico, partido en dos hojas ──
grupos, actual_grp, filas_grp = [], None, []
def vuelca():
    global filas_grp
    if actual_grp and filas_grp:
        grupos.append(f"<p class='grp'>{H.escape(actual_grp)}</p><ul class='toc'>{''.join(filas_grp)}</ul>")
    filas_grp = []
for tipo, dato, pg in toc:
    if tipo == "grp":
        vuelca(); actual_grp = dato
    else:
        n, t = dato
        filas_grp.append(f"<li><a href='#c{n}'><span class='pg'>{pg}</span><span class='t'><span class='num'>{n}</span>{H.escape(t)}</span></a></li>")
vuelca()
def hoja_ix(gs, primera, fol):
    ab = ("<div class='opener'><div class='kbar'></div><p class='eyebrow'>Contenido</p><h2>Índice</h2></div>"
          "<p class='prt'>Parte I · El fundamento común a todos los ejes</p>") if primera else ""
    return ("<section class='hoja indice'>" + cornisa("Manual del método") + ab +
            "".join(gs) + f"<span class='folio'>{fol}</span></section>")
indice = hoja_ix(grupos[:3], True, 3) + hoja_ix(grupos[3:], False, 4)

bloques = [d for t, d, _ in toc if t == "grp" and d != "Referencias"]
lista = "".join(f"<li><i>{H.escape(b.split(' · ')[0])}</i><span>{H.escape(b.split(' · ',1)[1])}</span></li>"
                for b in bloques)

portada = f"""<section class='hoja cover'>
<span class='wm'>{MARCA}</span>
<div class='logo'><span class='mk'>{MARCA}</span><span class='wordmark'>regulación <b>bioeléctrica</b></span></div>
<div class='gap-t'></div>
<div class='titular'>
<p class='kicker'>El Cuerpo Eléctrico</p>
<h1>Manual de Regulación Bioeléctrica</h1>
<p class='sub'>Parte I · El fundamento común a todos los ejes</p>
</div>
<div class='gap-b'></div>
<div class='meta'><div class='who'>Dr. Miguel Ojeda Rios<br><b>Instituto Centrobioenergetica</b></div>
<div class='ed'>Manual del método<br>Edición 2026</div></div>
<span class='endfoot'>Instituto Centrobioenergetica</span></section>"""

parte = f"""<section class='hoja parte'>
<span class='wm'>{MARCA}</span>
<div class='gap-t'></div>
<div class='titular'>
<p class='rom'>I</p>
<p class='kicker'>Parte I</p>
<h1>El fundamento común a todos los ejes</h1>
<p class='sub'>Qué evalúa el método, con qué instrumento, con qué vocabulario se mide, con qué regla se rastrea y dentro de qué límite se aplica.</p>
<div class='conten'><ul>{lista}</ul></div>
</div>
<div class='gap-b'></div>
<span class='endfoot'>Instituto Centrobioenergetica</span>
<span class='folio'>2</span></section>"""

pathlib.Path("hojas.html").write_text(portada + parte + indice + "".join(hojas), encoding="utf-8")
print("hojas:", 3 + len(hojas), "· índice:", sum(1 for t,_,_ in toc if t == "cap"), "capítulos ·", len(bloques), "bloques")
