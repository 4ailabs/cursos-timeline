# Prompts de imagen — Láminas del manual «El nodo de lesión»

### Regulación Bioeléctrica · Instituto Centrobioenergetica, 2026

Set de prompts listos para copiar y pegar en **Nano Banana 2 (Gemini)** y **GPT Image (OpenAI)** para las láminas raster del manual operativo (formato B5, 176 × 250 mm). Complementa `Sistema_Visual_SVG_Iconos_Prompts.md` (Parte C) y no lo sustituye: es su instancia ejecutable para este manual concreto.

> **Regla de división del trabajo (leer antes de generar).** La IA produce **solo la anatomía de superficie limpia, SIN imanes, SIN marcador de polos, SIN texto**. El marcador **dipolo S · N**, las etiquetas, las flechas y las cotas se superponen **después en SVG** sobre el raster (Parte A.4 del sistema visual). Por eso cada lámina debe dejar **espacio negativo limpio** exactamente donde irá el marcador. Si la IA dibuja un imán, un punto de color o una etiqueta, la lámina se descarta.

---

## 1 · Racional de dirección de arte

**Por qué registro editorial plano (BioRender / Elsevier / Kenhub) y no fotorrealismo.** Un manual clínico premium necesita que la anatomía se lea como *signo*, no como *escena*: contorno limpio, una sola estructura tintada, máximo espacio negativo. El line-art plano (a) imprime nítido a 300 dpi en offset y en B&N —sin degradados de piel que se ensucian—, (b) deja el campo visual despejado para que el marcador SVG sea el único elemento «fuerte» de la lámina, y (c) unifica todas las láminas como un atlas de una sola mano. El fotorrealismo compite con el marcador, envejece mal y rompe la línea editorial de la marca.

**Flujo «patrón cero» (obligatorio, sube la consistencia de ~50 % a ~90 %).** No se generan las seis láminas en paralelo desde cero. Se procede así:
1. Generar **primero la Lámina 1** (torso posterior con proyección renal) e iterarla hasta aprobarla: es el *patrón cero*. Fija el tipo de cuerpo, el grosor de trazo, el encuadre y el tinte teal.
2. Todas las demás láminas se generan **pasando la Lámina 1 aprobada como imagen de referencia** (reference image en Gemini; image input en GPT Image), con el **mismo bloque de estilo** y, en Gemini, la **misma semilla**.
3. La **Master silhouette (A)** se aprueba también temprano porque marca las proporciones del «modelo humano» reutilizado en todo el set.
4. Cada lámina aprobada se registra (nombre, prompt exacto, semilla, referencia, fecha, estado) según Parte C.6.

**Nota de alcance.** La *rejilla 2×2* (Lámina 5, p13) y el *marcador dipolo* ya son **SVG nativo** en el manual — no se piden a la IA. El *retrato del autor* (p19) es fotografía. Este documento cubre únicamente las seis láminas de anatomía de superficie.

---

## 2 · Bloque de estilo maestro (pegar IDÉNTICO en toda lámina)

> **STYLE (paste verbatim, do not alter a single word):**
> *Premium editorial biomedical illustration in a polished BioRender / scientific-atlas register. Clean vector look built with SOFT FLAT CELL-SHADING: model form using two or three flat warm-grey tones (light #EDEBE4, mid #D8D5CC, soft shadow #B9B6AC) as crisp tonal planes — no smooth photographic gradients, no cast shadows on the background, no ambient occlusion blur, no 3D render, no photorealism. Confident line hierarchy: a thicker warm near-black #2C2C2A outer contour at about 1.75pt, thinner internal anatomy lines at about 1.0pt, and delicate secondary landmarks in warm grey #888780 at about 0.6pt, all with rounded joins and caps and a subtle line-weight taper. RENDER the relevant anatomical system with real structural detail: organs modeled with believable three-dimensional form via flat shading, muscles as gently shaded planes, bony landmarks clearly defined. Exactly ONE key structure accented in the brand teal — pale teal #E1F5EE fill with a #0F6E56 outline and a slightly deeper teal core for depth; every other structure stays in the neutral grey-and-line palette. Gender-neutral, androgynous human model, same body type and proportions across the whole set, calm neutral pose, refined intentional head form with no facial features. Warm off-white #FCFBF7 background, flat and even. Uncluttered, generous clean negative space, museum-grade finish, neutral clinical accuracy. No magnets, no dipole markers, no colored dots, no text, no labels, no numbers, no arrows, no measurement lines, no UI, no props, no logos, no watermark. Keep the skin over the region of interest clean and unobstructed so a marker can be overlaid later.*

> **Excepción — Silueta maestra (A) y sus derivados (fichas p05/p15):** mantener el registro anterior pero **más ligero y marcable**: contorno con jerarquía de línea y cabeza refinada, interior esencialmente **vacío/blanco** (sin relleno tonal) para que el clínico dibuje encima; sombreado tonal mínimo o nulo. La riqueza plena (cell-shading + anatomía renderizada) se reserva para las láminas B–F.

**NEGATIVE (pegar siempre, ambos modelos):**
`photorealistic, stock photo, realistic skin texture, glossy, specular highlights, neon, saturated colors, teal-and-orange grading, drop shadow, bevel, emboss, glow, vignette, 3D render, clay render, skin gradient, muscle striations in color, tattoos, body hair detail, magnets, magnet devices, colored dots or discs on the body, S and N letters, poles marker, arrows, callout lines, measurement rulers, labels, text, captions, numbers, watermark, logo, UI overlay, cartoon, cute, chibi, anime, busy background, multiple color accents.`

**Parámetros técnicos comunes:** salida ≥ 2000 px en el lado largo (≈ 300 dpi al tamaño B5 de destino) · fondo plano #FCFBF7 (o transparente si el modelo lo permite) · encuadre centrado, proyección frontal plana, **sin perspectiva ni escorzo** · una sola figura por lámina salvo que se indique lo contrario.

---

## 3 · Prompts por lámina

Convención de vistas canónicas (no improvisar ángulos): **posterior** (espalda plana), **posterior-superior** (nuca + hombros + cabeza), **lateral** cuando cruza cuerpo. Reutilizar siempre el mismo modelo humano.

---

### ★ Character sheet — referencia maestra del modelo (generar y aprobar PRIMERO)

**ES · Qué es y por qué.** Un único lienzo horizontal con el **mismo modelo humano** en las vistas canónicas que usa el manual, a **una sola escala y en una sola pasada** → las proporciones quedan consistentes *por construcción*, no por suerte. Se aprueba una vez y se pasa como **imagen de referencia** en TODAS las láminas B–F (y en la silueta A). Neutro, sin tinte, sin texto: cada lámina posterior solo cambia el encuadre y qué estructura se tinta. Pasar como referencia las dos siluetas ya aprobadas (anterior + posterior) para heredar el trazo y el cuerpo. Salida horizontal, alta resolución.

**Nano Banana 2 (Gemini):**
```
[STYLE — bloque de estilo maestro §2]
Reference images: the two approved silhouettes (anterior and posterior). Lock the SAME androgynous human model: identical body type, proportions, head shape, hand style and line weight.

Create a single horizontal CHARACTER MODEL SHEET on one flat warm off-white #FCFBF7 canvas: the same gender-neutral, androgynous human model drawn as FOUR separate, non-overlapping figures, all at the SAME scale, same even 1.25pt warm near-black #2C2C2A outline with rounded joins, same faint warm grey #888780 0.75pt internal guide lines, evenly spaced with generous clean margins. Pure line art, no color fill anywhere, no shading, no perspective, flat frontal projection for every figure, plain featureless head on all.
Figure 1: FULL-BODY ANTERIOR (front) view, standing upright, neutral pose, arms slightly away from the torso; guides = body midline and clavicle.
Figure 2: FULL-BODY POSTERIOR (back) view, same model, same pose and height; guides = spinal midline, scapulae, iliac crests, gluteal cleft.
Figure 3: POSTERIOR-SUPERIOR view, upper body only from the crown of the head down to the mid-back — back of the head, occiput and nape, neck, both shoulders and the upper back; guides = occipital line, cervico-thoracic midline, both scapulae and the trapezius contour.
Figure 4: LUMBAR POSTERIOR close-up, the lower back only from the lowest ribs to the top of the pelvis; guides = lumbar midline, the last pair of ribs and the iliac crests.
All four figures are the identical person, clean and un-annotated: NO color, NO tint, NO magnets, NO dots, NO letters, NO numbers, NO labels, NO arrows — a neutral master reference. Horizontal canvas, aspect ratio 3:2, high resolution (≥2500 px wide).

[NEGATIVE — §2]
```

**GPT Image:**
```
[STYLE — bloque de estilo maestro §2]
(Use the two approved silhouettes as style/model reference images if the interface allows.)

A single horizontal character model sheet on one flat warm off-white #FCFBF7 canvas, showing the SAME androgynous, gender-neutral human model as four separate non-overlapping figures at the SAME scale and identical line style (even 1.25pt near-black #2C2C2A outline, rounded joins; faint grey #888780 0.75pt internal guides). Pure line art, no color, no shading, no perspective, plain featureless head on all figures.
Figure 1: full-body ANTERIOR view, upright neutral pose, arms slightly away (guides: body midline, clavicle).
Figure 2: full-body POSTERIOR view, same model and height (guides: spinal midline, scapulae, iliac crests, gluteal cleft).
Figure 3: POSTERIOR-SUPERIOR upper body, from the crown of the head to the mid-back — back of head, occiput, nape, neck, shoulders, upper back (guides: occipital line, upper spinal midline, scapulae, trapezius).
Figure 4: LUMBAR POSTERIOR close-up, lower back from the last ribs to the pelvis (guides: lumbar midline, last ribs, iliac crests).
Do NOT add any text, letters, numbers, labels, arrows, dots or magnets anywhere. All four figures are the identical person, clean and neutral, no tint. Horizontal 3:2 canvas, high resolution.

[NEGATIVE — §2]
```

> **Uso.** Aprobar este sheet PRIMERO. Luego, para cada lámina B–F: pasar el sheet como imagen de referencia, recortar/enfocar la vista indicada y **tintar en teal solo la estructura** que corresponda. La silueta A (anverso/reverso) sale directa de las Figuras 1–2 del sheet.

---

### A · Silueta corporal maestra — vista anterior + posterior

**ES · Qué es y dónde va.** Silueta limpia, andrógina, de cuerpo entero, pensada para que el clínico **dibuje encima** (marcar zonas y hallazgos). Se usa en la ficha de exploración (p05, mapa corporal O · dos vistas) y en la ficha de registro (p15, mapa de zonas). Dos vistas consistentes: anterior y posterior. *Nota de arte:* por su naturaleza esquemática puede finalizarse también como SVG (Parte A), pero se genera aquí como line-art para fijar las proporciones del modelo humano de todo el set. Aspecto muy vertical (silueta de cuerpo entero); generar cada vista por separado en ~**1:2** (o el par en ~**4:5**).

**Nano Banana 2 (Gemini):**
```
[STYLE — bloque de estilo maestro §2]

Draw a single full-body human silhouette, gender-neutral and androgynous, standing upright in a calm neutral anatomical position with arms slightly away from the torso and legs together, seen from a flat frontal viewpoint with no perspective. This is the ANTERIOR (front) view. Render it as a clean, closed outline in warm near-black #2C2C2A at even 1.25pt weight with rounded joins, plus only the most essential internal contour lines (midline of the sternum and abdomen, clavicle line, simple joint hints) in warm grey #888780 at 0.75pt. No facial features beyond a plain head outline, no fingers detail, no color fill anywhere — pure clean line art on a flat warm off-white #FCFBF7 background. The figure must be empty and un-annotated so a clinician can draw zones on it by hand. Keep the whole body inside the frame with even margins.
Then generate a SECOND matching image, identical model, proportions and line style, but the POSTERIOR (back) view: show the spine as a light grey #888780 midline, the scapulae and iliac crests as faint secondary contours, and the back of the head — same clean empty silhouette.
Aspect ratio 1:2 (tall portrait) for each view. Keep areas clean for later hand annotation. No magnets, no dots, no text, no labels.

[NEGATIVE — §2]
```

**GPT Image:**
```
[STYLE — bloque de estilo maestro §2]

A clean full-body human silhouette for a clinical body-map form, gender-neutral and androgynous, standing upright in a neutral anatomical pose, flat frontal view, no perspective. ANTERIOR (front) view. Closed outline in warm near-black #2C2C2A, even 1.25pt line weight, rounded joins; only essential internal guide lines (body midline, clavicle, simple joint hints) in warm grey #888780 at 0.75pt. Plain head outline with no facial features. No color fill, no shading — pure line art on a flat warm off-white #FCFBF7 (or transparent) background. The silhouette must stay completely empty and un-annotated so a clinician can draw on it. Do NOT add any text, letters, numbers, labels, dots or magnets of any kind. Portrait framing, tall 1:2 aspect, whole body inside the frame with even margins.
(Generate the POSTERIOR / back view as a separate matching image with the same model and line style: spine as a faint grey midline, scapulae and iliac crests as light secondary contours, back of head; same empty clean silhouette.)

[NEGATIVE — §2]
```

---

### B · Lámina 1 — Acidosis temporal (proyección renal posterior) · **PATRÓN CERO**

**ES · Qué es y dónde va.** p09. Vista **posterior** del tronco inferior mostrando la **proyección de superficie de los riñones** en la región lumbar. Es la lámina que se aprueba primero (patrón cero). El marcador SVG (polo positivo Sur) se superpondrá sobre el riñón del lado del acortamiento; por eso ambos riñones quedan **neutros, sin marcador**. Anatomía: riñones a nivel **T12–L2**, a unos 5 cm de la línea media, riñón derecho ligeramente más bajo que el izquierdo, ángulo costovertebral visible. Aspecto **5:6** vertical (caja phbox).

**Nano Banana 2 (Gemini):**
```
[STYLE — bloque de estilo maestro §2]

Posterior (back) view of the lower trunk of the gender-neutral human model, cropped from the mid-thoracic spine down to the upper pelvis, flat frontal projection, no perspective. RENDER the back with soft flat cell-shading: model the trunk, the paraspinal (erector spinae) muscle planes and the lower ribcage with two or three warm-grey tones so the torso reads with real three-dimensional form, NOT an empty outline. Draw the surface landmarks with line hierarchy: vertebral midline of the lower thoracic and lumbar spine, the lowest pair of ribs, and the top of the iliac crests in warm grey #888780. Show BOTH kidneys as anatomically modeled bean-shaped organs seen in projection over the back at the T12–L2 level, roughly 5 cm on each side of the spinal midline, right kidney slightly lower than the left, tucked under the lowest ribs at the costovertebral angle. Accent ONLY the two kidneys in the brand teal: pale teal #E1F5EE fill, #0F6E56 outline, with a slightly deeper teal core for depth; keep every other structure in the neutral grey-and-line palette. Keep the skin surface over both renal regions completely clean and unobstructed — no marker, no dot, no magnet — because a pole marker will be overlaid later in SVG. Flat warm off-white #FCFBF7 background, museum-grade finish, generous negative space. Aspect ratio 5:6 portrait.

[NEGATIVE — §2]
```

**GPT Image:**
```
[STYLE — bloque de estilo maestro §2]

Editorial anatomical plate, posterior (back) view of the lower trunk of an androgynous human model, cropped from the lower thoracic spine to the top of the pelvis, flat frontal view with no perspective. Draw the back-surface landmarks in warm grey #888780 at 0.75pt: lumbar vertebral midline, the lowest ribs, and the iliac crests. Show BOTH kidneys in surface projection from behind — bean-shaped, at the T12–L2 level, about 5 cm each side of the midline, right kidney slightly lower than the left, under the last ribs. Fill ONLY the two kidneys with pale teal #E1F5EE and a thin #0F6E56 outline; keep everything else as clean near-black #2C2C2A line art. The area of skin over each kidney must stay empty and clean — no magnet, no colored dot, no marker, no letters — because a marker is added later. Absolutely no text, numbers or labels anywhere. Flat warm off-white #FCFBF7 background, lots of negative space, portrait 5:6 framing.

[NEGATIVE — §2]
```

---

### C · Lámina 2 — Acidosis latente / dipolo distante (renal ↔ parietal contralateral)

**ES · Qué es y dónde va.** p10. Vista **posterior de cuerpo superior** (nuca, cabeza, espalda hasta la región lumbar) compuesta para que luego se trace un **dipolo que cruza el cuerpo**: polo positivo sobre la **zona renal** de un lado y polo negativo sobre el **área parietal contralateral** de la cabeza. La composición debe dejar visibles ambos extremos (una región renal lumbar y el lado parietal opuesto de la cabeza) con espacio limpio en ambos. Aspecto **5:6** vertical.

**Nano Banana 2 (Gemini):**
```
[STYLE — bloque de estilo maestro §2]
Reference image: Lámina 1 aprobada (patrón cero). Seed: <misma semilla del patrón cero>.

Posterior (back) view of the SAME gender-neutral human model, now showing the upper body from the back of the head down to the lumbar region, flat frontal projection, no perspective, so that a diagonal line could later connect the head to the lower back across the body. At the top, show the back of the head with the parietal region (upper side of the skull) clearly readable as a smooth grey #888780 contour on both sides. Down the back, show the vertebral midline and the lowest ribs, and show ONE kidney in surface projection in the lumbar region on one side, tinted pale teal #E1F5EE with a thin #0F6E56 outline. Compose the figure slightly off-center so both the lumbar renal region on one side and the opposite (contralateral) parietal side of the head are visible with clean, unobstructed skin at both ends — a distant dipole crossing the body will be drawn between them later in SVG. Everything except the single kidney stays as near-black #2C2C2A line only. Flat warm off-white #FCFBF7 background. Aspect ratio 5:6 portrait. Keep both endpoints clean, no marker, no dots, no text.

[NEGATIVE — §2]
```

**GPT Image:**
```
[STYLE — bloque de estilo maestro §2]
(Use the approved Lámina 1 as a style reference image if the interface allows.)

Posterior (back) view of the same androgynous human model, upper body from the back of the head down to the lumbar region, flat frontal view, no perspective. At the top, render the back of the head with the parietal area (upper side of the skull) clearly readable on both sides as a grey #888780 contour. Down the back, draw the spinal midline and lowest ribs; show ONE kidney in surface projection in the lumbar area on one side, filled pale teal #E1F5EE with a thin #0F6E56 outline. Position the figure so BOTH the lumbar renal region on one side and the OPPOSITE parietal side of the head are visible, each over clean empty skin, so a cross-body line can be overlaid later. All other structures are clean near-black #2C2C2A line art. No magnets, no dots, no letters S or N, no text or labels anywhere. Flat warm off-white #FCFBF7 background, portrait 5:6 framing, generous negative space.

[NEGATIVE — §2]
```

---

### D · Lámina 3 — Dipolo local sobre zona de dolor (dorso superior / trapecio)

**ES · Qué es y dónde va.** p11. Anatomía de superficie de una **zona sintomática representativa**. *Elección de arte:* el **dorso superior / región del trapecio y borde superior de la escápula** (posterior) es la zona musculoesquelética más genérica y clara, mantiene la vista posterior del set y ofrece una superficie plana y amplia para colocar luego el **negativo sobre la zona + positivo adyacente** (dipolo local). Debe quedar espacio limpio sobre la zona y a un lado. Aspecto **5:6** vertical.

**Nano Banana 2 (Gemini):**
```
[STYLE — bloque de estilo maestro §2]
Reference image: Lámina 1 aprobada. Seed: <misma semilla>.

Posterior (back) view of the upper back and shoulders of the SAME gender-neutral human model, cropped from the base of the neck to the mid-thoracic level, flat frontal projection, no perspective. Show the surface landmarks of the upper back in warm grey #888780 at 0.75pt: the cervico-thoracic spinal midline, the upper borders and spines of both scapulae, and the gentle contour of the trapezius over each shoulder. Tint ONLY the muscular zone of one upper trapezius / supra-scapular region (a representative symptomatic zone) in pale teal #E1F5EE with a soft #0F6E56 outline. Keep the surface of that zone and the skin immediately beside it completely clean and open — no marker, no dot, no magnet — so a local dipole (one pole over the zone, one pole adjacent) can be overlaid later in SVG. Everything else is near-black #2C2C2A line only. Flat warm off-white #FCFBF7 background, generous negative space. Aspect ratio 5:6 portrait.

[NEGATIVE — §2]
```

**GPT Image:**
```
[STYLE — bloque de estilo maestro §2]
(Use the approved Lámina 1 as a style reference image if possible.)

Editorial anatomical plate, posterior view of the upper back and shoulders of the androgynous human model, from the base of the neck to the mid-back, flat frontal view, no perspective. Draw the upper-back landmarks in warm grey #888780 at 0.75pt: the upper spinal midline, both scapulae (upper border and spine), and the trapezius contour over each shoulder. Fill ONLY one upper trapezius / supra-scapular zone with pale teal #E1F5EE and a soft #0F6E56 outline as a representative symptomatic area. The surface of that zone and the skin just beside it must stay clean and empty — no magnet, no colored dot, no marker, no letters — because two markers will be added later. No text, numbers or labels anywhere. All other structures are clean near-black #2C2C2A line art. Flat warm off-white #FCFBF7 background, portrait 5:6 framing, lots of negative space.

[NEGATIVE — §2]
```

---

### E · Lámina 4 — Dipolo a distancia (zona confirmada ↔ nodo regulador renal)

**ES · Qué es y dónde va.** p12. Relación entre una **zona confirmada** (periférica) y un **nodo regulador** distante. Vista **posterior de cuerpo casi entero** que muestre, a la vez, una zona sintomática en el **dorso superior** (donde irá el negativo) y la **zona renal lumbar** (donde irá el positivo del nodo regulador), de modo que luego se trace un dipolo a distancia entre ambas. Ambos extremos con espacio limpio. Aspecto **5:6** vertical.

**Nano Banana 2 (Gemini):**
```
[STYLE — bloque de estilo maestro §2]
Reference image: Lámina 1 aprobada. Seed: <misma semilla>.

Posterior (back) view of nearly the whole trunk of the SAME gender-neutral human model, from the shoulders down to the pelvis, flat frontal projection, no perspective, so a long line could connect the upper back to the lower back. Show the back landmarks in warm grey #888780 at 0.75pt: the full spinal midline, both scapulae, the lowest ribs and the iliac crests. Indicate a symptomatic zone on one upper-back / supra-scapular region and, lower down, ONE kidney in surface projection in the lumbar area on the same or opposite side. Tint ONLY the kidney (the regulatory node) in pale teal #E1F5EE with a thin #0F6E56 outline; leave the upper-back symptomatic zone as a subtle grey contour without teal so the two ends read as different roles. Keep both regions over clean, unobstructed skin — no markers, no dots — because a distant dipole line linking the confirmed zone to the regulatory node will be overlaid later in SVG. Everything else is near-black #2C2C2A line only. Flat warm off-white #FCFBF7 background. Aspect ratio 5:6 portrait.

[NEGATIVE — §2]
```

**GPT Image:**
```
[STYLE — bloque de estilo maestro §2]
(Use the approved Lámina 1 as a style reference image if possible.)

Posterior view of nearly the whole trunk of the androgynous human model, from the shoulders to the pelvis, flat frontal view, no perspective. Draw the back landmarks in warm grey #888780 at 0.75pt: the full spinal midline, both scapulae, the lowest ribs and the iliac crests. Show a symptomatic zone on one upper-back / supra-scapular region as a subtle grey contour, and lower down show ONE kidney in surface projection in the lumbar area. Fill ONLY the kidney (the regulatory node) with pale teal #E1F5EE and a thin #0F6E56 outline; leave the upper-back zone untinted so the two roles read differently. Both regions must sit over clean empty skin — no magnets, no dots, no markers, no letters — because a distant line linking them is added later. No text, numbers or labels anywhere. Everything else is clean near-black #2C2C2A line art. Flat warm off-white #FCFBF7 background, portrait 5:6 framing, generous negative space.

[NEGATIVE — §2]
```

---

### F · Mapa de nodos distantes (orden fijo) — vista posterior única

**ES · Qué es y dónde va.** p12 (acompaña a la tabla de nodos distantes). Una **única silueta posterior** que muestra, como **zonas levemente tintadas sin etiquetas**, las regiones de superficie de los nodos del orden fijo: **renal** (lumbar T12–L2, a cada lado), **suprarrenal** (justo sobre el polo superior de cada riñón), **hígado / zona hepática** (hipocondrio derecho, proyectado sobre las costillas inferiores derechas en vista posterior) y **bulbo raquídeo** (hueco suboccipital, nuca bajo el occipucio). Sin números ni rótulos: el SVG añadirá el orden y las etiquetas. Aspecto **5:6** o algo más alto (**4:5**) para incluir cabeza y tronco.

**Nano Banana 2 (Gemini):**
```
[STYLE — bloque de estilo maestro §2]
Reference image: Lámina 1 aprobada. Seed: <misma semilla>.

Single posterior (back) view of the SAME gender-neutral human model, from the back of the head down to the pelvis, flat frontal projection, no perspective. Draw the back landmarks in warm grey #888780 at 0.75pt: the spinal midline, the base of the skull and occiput, the lowest ribs and the iliac crests. Then gently tint, all in the SAME pale teal #E1F5EE with thin #0F6E56 outlines, the surface regions of the fixed-order regulatory nodes, WITHOUT any labels or numbers: (1) both KIDNEYS in the lumbar region at T12–L2, right slightly lower; (2) both ADRENAL zones as small caps just above the upper pole of each kidney; (3) the LIVER / hepatic region projected over the lower-right ribs on the back (right side); (4) the MEDULLA OBLONGATA zone as a small area in the suboccipital hollow, in the nape just below the occiput. All four node regions share the one teal tint; everything else stays near-black #2C2C2A line only. No markers, no dots, no order numbers, no text — these are added later in SVG. Flat warm off-white #FCFBF7 background, generous negative space. Aspect ratio 4:5 portrait.

[NEGATIVE — §2]
```

**GPT Image:**
```
[STYLE — bloque de estilo maestro §2]
(Use the approved Lámina 1 as a style reference image if possible.)

A single posterior (back) view of the androgynous human model, from the back of the head to the pelvis, flat frontal view, no perspective — a landmark map. Draw the back landmarks in warm grey #888780 at 0.75pt: spinal midline, base of the skull and occiput, lowest ribs, iliac crests. Gently tint, ALL in the same pale teal #E1F5EE with thin #0F6E56 outlines and NO labels or numbers, the surface regions of four regulatory nodes: (1) both KIDNEYS in the lumbar region at T12–L2, right slightly lower; (2) both ADRENAL zones as small caps just above the upper pole of each kidney; (3) the LIVER / hepatic region over the lower-right ribs on the back; (4) the MEDULLA OBLONGATA zone in the suboccipital hollow just below the occiput. Use only this one teal tint for all four; everything else is clean near-black #2C2C2A line art. Do NOT add any dots, magnets, order numbers, letters or text — labels are added later. Flat warm off-white #FCFBF7 background, portrait 4:5 framing, generous negative space.

[NEGATIVE — §2]
```

---

## 4 · Checklist de consistencia (validar cada lámina antes de aprobar)

- **Patrón cero.** ¿La Lámina 1 se aprobó primero y todas las demás se generaron pasándola como imagen de referencia? Sin esto, no continuar.
- **Semilla / referencia reutilizada.** En Gemini, misma semilla en todo el set; en ambos modelos, misma imagen de referencia de estilo. Registrar semilla y referencia por lámina (Parte C.6).
- **Mismo modelo humano.** Mismo tipo de cuerpo andrógino, mismas proporciones, mismo grosor de trazo en las seis láminas.
- **Vistas canónicas.** Solo posterior / posterior-superior; sin ángulos nuevos ni escorzo por lámina.
- **Un solo tinte.** Únicamente teal `#E1F5EE` (con contorno `#0F6E56` opcional) sobre **una** estructura relevante; nada de coral, nada de segundo acento. El coral se reserva para cotas SVG reales, no para la IA.
- **Limpio para overlay.** Piel sobre la(s) zona(s) de interés vacía y sin obstrucción: sin imanes, sin puntos, sin letras S/N. Este es el fallo más frecuente de GPT Image — verificar a lupa.
- **Cero texto.** Ninguna etiqueta, número, cifra ni rótulo generado por la IA (todo va en SVG). No inventar cifras (regla del proyecto).
- **Anatomía validada contra atlas real.** Riñones T12–L2, ~5 cm de la línea media, derecho más bajo; suprarrenal sobre el polo superior renal; hígado en hipocondrio derecho; bulbo en el hueco suboccipital; parietal en el lado superior del cráneo. El registro Kenhub/BioRender es referencia de *limpieza*, no de contenido.
- **Resolución.** ≥ 2000 px lado largo, ≈ 300 dpi al tamaño B5 de destino; fondo plano `#FCFBF7`.
- **Encuadre.** Láminas 5:6 (o 4:5 para el mapa de nodos); siluetas de cuerpo entero más altas (1:2 por vista, o 4:5 el par).
- **Edición EN.** Existe `Preview_Manual_RB_EN.html`: las mismas láminas sirven para ambas ediciones porque **no llevan texto** — un único set raster, etiquetas SVG bilingües encima.

---

*Instituto Centrobioenergetica, 2026 · Prompts derivados de `Sistema_Visual_SVG_Iconos_Prompts.md` (Parte C) y del `Protocolo_Clinico_Tecnica_Trauma_RB.md`. Actualizar el registro de prompts al aprobar cada lámina.*
