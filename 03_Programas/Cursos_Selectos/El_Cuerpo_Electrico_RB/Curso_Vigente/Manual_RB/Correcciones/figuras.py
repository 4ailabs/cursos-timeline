import pathlib, re
t = pathlib.Path("cuerpo.html").read_text(encoding="utf-8")

FLE = 'style="stroke:var(--teal)"'
FIG1 = '''<figure class='fig'><svg viewBox="0 0 644 164" role="img" aria-label="El circuito del estado bioeléctrico: el voltaje abre y cierra los canales, los canales dejan pasar el flujo de iones, el flujo determina las tres variables del medio, y las tres actúan de vuelta sobre el voltaje">
<defs><marker id="fa" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8z" fill="currentColor"/></marker>
<marker id="ft" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8z" style="fill:var(--teal)"/></marker></defs>
<g fill="none" stroke="currentColor" stroke-width="1.2">
<rect x="10" y="42" width="140" height="46" rx="3" style="stroke:var(--teal);stroke-width:1.8"/>
<rect x="210" y="42" width="112" height="46" rx="3"/>
<rect x="382" y="42" width="100" height="46" rx="3"/>
<rect x="534" y="34" width="100" height="62" rx="3"/>
</g>
<g font-size="12" fill="currentColor" text-anchor="middle">
<text x="80" y="61" style="fill:var(--teal);font-weight:600">Voltaje de</text>
<text x="80" y="77" style="fill:var(--teal);font-weight:600">membrana</text>
<text x="266" y="61">Canales</text><text x="266" y="77">iónicos</text>
<text x="432" y="61">Flujo de</text><text x="432" y="77">iones</text>
</g>
<g font-size="11" fill="currentColor" text-anchor="middle">
<text x="584" y="53">pH</text><text x="584" y="68">resistividad</text><text x="584" y="83">oxidación-red.</text>
</g>
<g stroke="currentColor" stroke-width="1.2">
<line x1="150" y1="65" x2="204" y2="65" marker-end="url(#fa)"/>
<line x1="322" y1="65" x2="376" y2="65" marker-end="url(#fa)"/>
<line x1="482" y1="65" x2="528" y2="65" marker-end="url(#fa)"/>
</g>
<g font-size="10" fill="currentColor" text-anchor="middle">
<text x="177" y="56">abre y cierra</text>
<text x="349" y="56">dejan pasar</text>
<text x="505" y="56">determina</text>
</g>
<path d="M 584 96 L 584 126 L 80 126 L 80 94" fill="none" stroke-dasharray="4 3" marker-end="url(#ft)" style="stroke:var(--teal);stroke-width:1.3"/>
<text x="332" y="142" font-size="10.5" text-anchor="middle" style="fill:var(--teal)">las tres actúan de vuelta sobre el voltaje</text>
</svg><figcaption class='figcap'>El circuito del estado bioeléctrico. Las tres variables del medio son lecturas, y el que organiza es el voltaje.</figcaption></figure>'''

FIG2 = '''<figure class='fig'><svg viewBox="0 0 560 226" role="img" aria-label="La rejilla vista desde arriba: cuatro imanes con las polaridades alternadas; en las fronteras internas entre polos opuestos el campo cambia de forma brusca">
<g fill="none" stroke="currentColor" stroke-width="1.2">
<rect x="40" y="26" width="84" height="84"/><rect x="124" y="26" width="84" height="84"/>
<rect x="40" y="110" width="84" height="84"/><rect x="124" y="110" width="84" height="84"/>
</g>
<g font-size="24" fill="currentColor" text-anchor="middle">
<text x="82" y="77">−</text><text x="166" y="77">+</text>
<text x="82" y="161">+</text><text x="166" y="161">−</text>
</g>
<g style="stroke:var(--teal)" stroke-width="3" stroke-linecap="round">
<line x1="124" y1="28" x2="124" y2="192"/><line x1="42" y1="110" x2="206" y2="110"/>
</g>
<line x1="210" y1="104" x2="268" y2="86" stroke-dasharray="3 3" style="stroke:var(--teal);stroke-width:1"/>
<g font-size="12" style="fill:var(--teal)">
<text x="276" y="80">fronteras entre polos opuestos:</text>
<text x="276" y="96" font-weight="600">ahí el gradiente es empinado</text>
</g>
<text x="276" y="130" font-size="11" fill="currentColor">cada imán queda opuesto a sus</text>
<text x="276" y="145" font-size="11" fill="currentColor">vecinos de lado y de arriba;</text>
<text x="276" y="160" font-size="11" fill="currentColor">las diagonales comparten polo</text>
</svg><figcaption class='figcap'>La rejilla vista desde arriba. Las polaridades alternan como tablero de ajedrez, y el gradiente empinado vive en las fronteras internas.</figcaption></figure>'''

FIG3 = '''<figure class='fig'><svg viewBox="0 0 560 256" role="img" aria-label="La cara activa del conjunto magnético: un anillo grueso rodea a la pieza polar pequeña del centro, con polaridades contrarias, y el gradiente vive en el entrehierro que queda entre los dos">
<g fill="none">
<circle cx="126" cy="128" r="92" stroke="currentColor" stroke-width="1.4"/>
<circle cx="126" cy="128" r="47" stroke="currentColor" stroke-width="1"/>
<circle cx="126" cy="128" r="38" stroke-width="17" style="stroke:var(--teal);opacity:.3"/>
<circle cx="126" cy="128" r="29" stroke="currentColor" stroke-width="1.3"/>
</g>
<text x="126" y="136" font-size="22" fill="currentColor" text-anchor="middle">−</text>
<text x="126" y="70" font-size="17" fill="currentColor" text-anchor="middle">+</text>
<g stroke-dasharray="3 3" stroke-width="1">
<line x1="188" y1="82" x2="254" y2="62" stroke="currentColor"/>
<line x1="156" y1="128" x2="254" y2="128" stroke="currentColor"/>
<line x1="152" y1="156" x2="254" y2="196" style="stroke:var(--teal)"/>
</g>
<g font-size="12" fill="currentColor">
<text x="260" y="56">el anillo que rodea al centro —</text>
<text x="260" y="72">polaridad contraria</text>
<text x="260" y="124">pieza polar, al centro —</text>
<text x="260" y="140">la polaridad que actúa</text>
</g>
<text x="260" y="192" font-size="12" style="fill:var(--teal);font-weight:600">entrehierro:</text>
<text x="260" y="208" font-size="12" style="fill:var(--teal)">aquí vive el gradiente</text>
</svg><figcaption class='figcap'>La cara activa del conjunto magnético. El anillo grueso y la pieza polar pequeña del centro llevan polaridades contrarias, y el gradiente empinado se forma en el entrehierro que los separa.</figcaption></figure>'''

# 1 · el circuito sustituye al ASCII del capítulo 3
pre1 = re.search(r"<pre class='tree'>[^<]*VOLTAJE DE MEMBRANA[^<]*</pre>", t)
assert pre1, "no encontré el circuito"
t = t[:pre1.start()] + FIG1 + t[pre1.end():]

# 2 · la rejilla sustituye a su ASCII del capítulo 17
pre2 = re.search(r"<pre class='tree'>[^<]*─┬─[^<]*polaridades alternadas\.[^<]*</pre>", t)
assert pre2, "no encontré la rejilla"
t = t[:pre2.start()] + FIG2 + t[pre2.end():]

# 3 · el conjunto magnético se agrega tras el párrafo del entrehierro
ancla = "generado dentro de una sola pieza, con unos 4 cm de alcance.</p>"
assert t.count(ancla) == 1
t = t.replace(ancla, ancla + FIG3)

pathlib.Path("cuerpo.html").write_text(t, encoding="utf-8")
print("tres figuras colocadas")
