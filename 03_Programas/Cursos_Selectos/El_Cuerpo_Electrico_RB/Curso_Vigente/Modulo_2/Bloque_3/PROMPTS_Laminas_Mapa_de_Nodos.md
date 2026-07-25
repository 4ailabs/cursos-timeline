# Prompts para las láminas del mapa de nodos
## Nano Banana Pro 2 — 11 láminas

**Instituto Centrobioenergetica · julio 2026 · Módulo 2, Bloque 3**
**Fuente:** `08_Mapa_de_Nodos_Eje_Transversal.md` — 41 puntos en 8 zonas

---

## Cómo usar este documento

**Modo:** Científico Editorial, estilo BioRender. Vector plano, fondo blanco puro, figura anatómica en gris translúcido, color selectivo solo en los nodos.

**Etiquetado:** cada nodo lleva **solo su número**. Los nombres van en la leyenda que se compone aparte, en el manual o en la slide. Nano Banana escribe números con fiabilidad alta y términos anatómicos largos en español con fiabilidad baja.

**Convención de color, la misma del método:**

| Elemento | HEX | Qué representa |
|---|---|---|
| Anatomía | `#E8E8E8` | Figura translúcida, sin protagonismo |
| Nodo neutro | `#0A4A3A` | Posición de rastreo |
| Polo negativo | `#0F6E56` | El lado que marcó |
| Polo positivo | `#D85A30` | El homólogo contralateral |
| Línea media | `#8B8A83` punteada | El plano de referencia |

**En cada lámina, un solo par aparece como dipolo activo** —negativo de un lado, positivo en su homólogo, con la línea cruzando la línea media—. El resto van como marcadores neutros. Así la lámina enseña ubicación y geometría a la vez.

**Formato.** Cada prompt termina en `Aspect ratio 3:4, 2K` para el manual impreso. Para la versión de slide, sustituye esa frase final por:

> `Aspect ratio 16:9, 2K. Horizontal editorial layout: anatomical figure on the left third, numbered annotation column on the right two-thirds.`

---

# 1 · Lámina maestra — el índice de zonas

> **Por qué esta lámina no lleva los 41 puntos.** Ningún modelo de imagen coloca cuarenta y un puntos anatómicos nombrados en su posición correcta: reparte marcas por región y las inventa. A escala de cuerpo entero, además, los números salen ilegibles.
>
> **La maestra con los 41 puntos se arma, no se genera.** Se componen las ocho láminas de zona sobre una silueta en Illustrator, Affinity o Canva, que es donde las posiciones quedan exactas y editables. Lo que sí se genera es esto: **el índice de zonas**, que es la lámina de apertura del capítulo y remite a las otras ocho.

**Muestra:** el cuerpo dividido en las ocho zonas, con el número de puntos de cada una. Sin puntos individuales.

Scientific illustration in BioRender style, pure white background, clean flat vector art, two full-body human figures side by side in neutral standing anatomical position, the left one seen from the front and the right one seen from the back, both drawn in translucent light grey (#E8E8E8) with simple clean outlines and no facial features. The body surface is divided into eight clearly delimited anatomical zones, each filled with a distinct flat pastel tone at low saturation and separated by thin white gaps: head, neck, anterior thorax, posterior trunk, abdomen, pelvis and hip, upper limbs, lower limbs. Each zone carries one large bold sans-serif number in dark teal placed directly on it, from 1 to 8, and nothing else. A thin dashed vertical grey line (#8B8A83) runs down the exact midline of each figure, drawn deliberately bolder and more visible than any other line in the image, extending slightly beyond the head and feet. A short horizontal double-headed arrow crosses the midline at chest level, with one end in deep green (#0F6E56) and the other in warm orange (#D85A30), indicating that the working dipole crosses the median plane. Composition balanced, the two figures occupying the central two thirds, generous white margins. Flat editorial scientific illustration, BioRender vector style, sans-serif typography. NO individual point markers, NO small dots scattered on the body, NO photorealistic rendering, NO 3D shading, NO muscles or organs, NO dark background, NO gradients, NO text labels, ONLY the eight zone numbers. Aspect ratio 3:4, 2K.

---

# 1.bis · Cómo se arma la maestra con los 41 puntos

*No es un prompt. Es el procedimiento de composición.*

1. Genera las ocho láminas de zona (prompts 2 a 9).
2. Genera **una silueta base limpia** con el prompt de abajo.
3. Sobre esa silueta, coloca los nodos en un programa vectorial, tomando las posiciones de cada lámina de zona. Ahí quedan exactas, alineadas en pares y editables cuando el mapa cambie.
4. Numera del 1 al 41 siguiendo el orden de las leyendas del final de este documento.

**Silueta base — para componer encima**

Scientific illustration in BioRender style, pure white background, clean flat vector art, two full-body human figures side by side in neutral standing anatomical position with arms slightly separated from the trunk and palms facing forward, the left one seen from the front and the right one seen from the back, both drawn as clean single-line outlines in light grey (#E8E8E8) with a very light flat grey fill, no facial features, no muscles, no organs. Faint thin grey contour indications only for the essential surface landmarks: clavicles, sternum with xiphoid process, costal margin, umbilicus, iliac crests, patellae, malleoli, and the full vertebral column drawn on the posterior figure as a segmented stack of individual vertebrae from cervical to sacral. A thin dashed vertical grey line (#8B8A83) runs down the exact midline of each figure. Both figures identical in height and perfectly aligned horizontally with each other. Composition centred with generous even white margins on all sides. Flat editorial scientific illustration, BioRender vector style. NO node markers, NO dots, NO numbers, NO text, NO annotation lines, NO photorealistic rendering, NO 3D shading, NO dark background, NO gradients. Aspect ratio 3:4, 2K.

---

# 2 · Zona 1 — Cabeza · 7 puntos

**Puntos:** 1 vértice · 2 occipital · 3 glabela · 4 depresión suboccipital · 5 fosa suboccipital · 6 fosa retromandibular · 7 área temporal sobre el masetero

Scientific illustration in BioRender style, pure white background, clean flat vector art, three views of a human head arranged in a row — frontal view on the left, lateral profile in the centre, posterior view on the right — each drawn in translucent light grey (#E8E8E8) with clean simple outlines, minimal facial features, skull and mandible contour subtly indicated. Small solid circular node markers in deep teal (#0A4A3A) placed at the crown of the head, over the occipital region, at the glabella between the eyebrows, in the depression immediately below the occiput, behind the mastoid process on both sides, in the retromandibular fossa, and over the masseter in the temporal area. Nodes appear in mirrored pairs on the lateral and posterior views. A thin dashed grey line (#8B8A83) marks the midline on the frontal and posterior views. One active dipole is highlighted on the posterior view: left mastoid node in deep green (#0F6E56) marked N, right mastoid node in warm orange (#D85A30) marked S, joined by a thin curved line crossing the dashed midline. Each node carries a small sans-serif number from 1 to 7 in dark grey placed beside it with a very thin black annotation line. Composition: three heads of equal size, evenly spaced, wide white margins. Flat editorial scientific illustration, BioRender vector style. NO photorealistic rendering, NO 3D shading, NO hair rendering, NO dark background, NO gradients, NO long text labels, ONLY numbers. Aspect ratio 3:4, 2K.

**Nota de precisión al iterar:** los puntos 4 y 5 son distintos y suelen confundirse. La *depresión suboccipital* está en la línea media, justo debajo del occipucio. La *fosa suboccipital* está detrás del mastoides, a los lados. Si el modelo las junta, usa el tip de iteración 2.

---

# 3 · Zona 2 — Cuello · 4 puntos

**Puntos:** 7 área paravertebral cervical · 8 piel sobre el esternocleidomastoideo · 9 fosa yugular · 10 fosa supraclavicular

Scientific illustration in BioRender style, pure white background, clean flat vector art, two views of a human neck and upper shoulders arranged side by side — anterior view on the left, posterior view on the right — drawn in translucent light grey (#E8E8E8) with clean outlines, the sternocleidomastoid muscle and the clavicles indicated as simple grey contour shapes, cervical vertebrae suggested as a stacked column on the posterior view. Small solid circular node markers in deep teal (#0A4A3A) placed in mirrored pairs at the paravertebral cervical region beside each cervical vertebra, over the belly of the sternocleidomastoid on each side, in the jugular notch at the base of the throat, and in the supraclavicular fossa above each clavicle. A thin dashed grey line (#8B8A83) marks the midline on both views. One active dipole is highlighted: the left supraclavicular node in deep green (#0F6E56) marked N and the right one in warm orange (#D85A30) marked S, joined by a thin curved line crossing the dashed midline. Each node carries a small sans-serif number in dark grey with a thin black annotation line. A circular zoom detail panel connected by a thin grey line shows the paravertebral cervical region enlarged, with the nodes sitting either side of the vertebral spinous processes. Composition centred with generous white margins. Flat editorial scientific illustration, BioRender vector style. NO photorealistic rendering, NO 3D shading, NO dark background, NO gradients, NO long text labels, ONLY numbers. Aspect ratio 3:4, 2K.

---

# 4 · Zona 3 — Tórax anterior · 3 puntos

**Puntos:** 11 área xifo-esternal · 12 triángulo deltopectoral (fosa de Mohrenheim) · 13 área precordial

Scientific illustration in BioRender style, pure white background, clean flat vector art, a single anterior view of a human thorax from clavicles to lower ribs, drawn in translucent light grey (#E8E8E8) with clean outlines, the sternum, the xiphoid process, the rib cage and the clavicles indicated as simple grey contour shapes. Small solid circular node markers in deep teal (#0A4A3A) placed at the junction of the sternal body with the xiphoid process on the midline, in the deltopectoral triangle below each clavicle between the deltoid and the pectoralis, and over the precordial area on the left chest. A thin dashed vertical grey line (#8B8A83) marks the midline. One active dipole is highlighted: the left deltopectoral node in deep green (#0F6E56) marked N and the right one in warm orange (#D85A30) marked S, joined by a thin curved line crossing the dashed midline. Each node carries a small sans-serif number in dark grey with a thin black annotation line. A circular zoom detail panel connected by a thin grey line shows the xiphosternal junction enlarged, making the exact border between sternal body and xiphoid process clearly visible. Composition centred, figure occupying the upper two thirds, generous white margins. Flat editorial scientific illustration, BioRender vector style. NO photorealistic rendering, NO 3D shading, NO breasts or nipples depicted, NO internal organs, NO dark background, NO gradients, NO long text labels, ONLY numbers. Aspect ratio 3:4, 2K.

---

# 5 · Zona 4 — Tronco posterior · 4 puntos

**Puntos:** 14 las vértebras, una a una · 15 región paravertebral · 16 borde superior del trapecio · 17 borde vertebral de la escápula

Scientific illustration in BioRender style, pure white background, clean flat vector art, a single posterior view of a human trunk from the base of the skull to the sacrum, drawn in translucent light grey (#E8E8E8) with clean outlines, the full vertebral column drawn as a clearly segmented stack of individual vertebrae from cervical through dorsal and lumbar to sacral, both scapulae and the upper trapezius border indicated as simple grey contour shapes. Small solid circular node markers in deep teal (#0A4A3A) placed one on each individual vertebral level along the midline, in mirrored pairs immediately either side of every vertebra in the paravertebral region, along the superior border of the trapezius on both sides, and along the vertebral border of each scapula. A thin dashed vertical grey line (#8B8A83) runs down the midline over the spinous processes. One active dipole is highlighted at mid-dorsal level: the left paravertebral node in deep green (#0F6E56) marked N and the right paravertebral node in warm orange (#D85A30) marked S, joined by a thin horizontal line crossing the dashed midline. Numbers 14 to 17 appear once each in dark grey with thin black annotation lines pointing to a representative node of each category. A circular zoom detail panel connected by a thin grey line shows three consecutive vertebrae enlarged, with one central node on the spinous process and one node either side in the paravertebral gutter. Composition centred, generous white margins. Flat editorial scientific illustration, BioRender vector style. NO photorealistic rendering, NO 3D shading, NO muscle fibre detail, NO dark background, NO gradients, NO long text labels, ONLY numbers. Aspect ratio 3:4, 2K.

**Nota:** esta lámina es la que más precisión pide. El punto clave es que **cada vértebra se rastrea por separado**, y que la región paravertebral es derecha e izquierda **de cada una**. Si el modelo dibuja un barrido continuo en lugar de niveles discretos, usa el tip de iteración 2.

---

# 6 · Zona 5 — Abdomen · 6 puntos

**Puntos:** 18 epigástrica · 19 mesogástrica · 20 hipogástrica · 21 ombligo · 22 fosa ilíaca · 23 región subcostal en los flancos

Scientific illustration in BioRender style, pure white background, clean flat vector art, a single anterior view of a human abdomen from the costal margin to the pubic region, drawn in translucent light grey (#E8E8E8) with clean outlines, the lower rib margin, the iliac crests and the umbilicus indicated as simple grey contour landmarks, and the classical nine-region abdominal grid suggested by very faint thin grey guide lines. Small solid circular node markers in deep teal (#0A4A3A) placed in the epigastric region above the umbilicus, in the mesogastric region around the umbilical level, in the hypogastric region below, on the umbilicus itself, in both iliac fossae, and in the subcostal region at the outermost part of each flank. Nodes appear in mirrored pairs except the midline ones. A thin dashed vertical grey line (#8B8A83) marks the midline. One active dipole is highlighted: the left iliac fossa node in deep green (#0F6E56) marked N and the right iliac fossa node in warm orange (#D85A30) marked S, joined by a thin curved line crossing the dashed midline. Each node carries a small sans-serif number in dark grey with a thin black annotation line. Composition centred, generous white margins. Flat editorial scientific illustration, BioRender vector style. NO photorealistic rendering, NO 3D shading, NO internal organs drawn, NO genitalia, NO dark background, NO gradients, NO long text labels, ONLY numbers. Aspect ratio 3:4, 2K.

---

# 7 · Zona 6 — Pelvis y cadera · 5 puntos

**Puntos:** 24 espina ilíaca póstero-superior · 25 espina ilíaca ántero-superior · 26 región inguinal · 27 fosa trocantérea · 28 periné

Scientific illustration in BioRender style, pure white background, clean flat vector art, two views of a human pelvis and hips arranged side by side — anterior view on the left, posterior view on the right — drawn in translucent light grey (#E8E8E8) with clean outlines, the iliac crests, both anterior superior and posterior superior iliac spines, the greater trochanters and the inguinal folds indicated as simple grey bony and surface landmarks, the figure shown in modest anatomical schematic form. Small solid circular node markers in deep teal (#0A4A3A) placed in mirrored pairs at the posterior superior iliac spine on each side, at the anterior superior iliac spine on each side, along each inguinal region, over each trochanteric fossa in the gluteal area, and at the perineum where a right and a left zone are marked as two separate adjacent nodes. A thin dashed vertical grey line (#8B8A83) marks the midline on both views. One active dipole is highlighted: the left posterior superior iliac spine node in deep green (#0F6E56) marked N and the right one in warm orange (#D85A30) marked S, joined by a thin horizontal line crossing the dashed midline. Each node carries a small sans-serif number in dark grey with a thin black annotation line. A circular zoom detail panel connected by a thin grey line shows the perineal area schematically, with its right and left zones distinguished as two separate node positions. Composition centred, generous white margins. Flat editorial scientific illustration, BioRender vector style, anatomically neutral and non-explicit. NO photorealistic rendering, NO 3D shading, NO nudity or genital detail, NO dark background, NO gradients, NO long text labels, ONLY numbers. Aspect ratio 3:4, 2K.

**Nota de material:** esta lámina requiere la nota de abordaje y consentimiento para el periné en el manual del alumno, según el §8 del mapa.

---

# 8 · Zona 7 — Miembro superior · 5 puntos

**Puntos:** 29 región supraolecraniana · 30 fosa antecubital · 31 tercio distal anterior del antebrazo · 32 área de las muñecas · 33 dorso de la mano

Scientific illustration in BioRender style, pure white background, clean flat vector art, two complete human upper limbs shown from shoulder to fingertips arranged side by side and mirrored — the left limb in anterior view showing the palm side, the right limb in posterior view showing the dorsal side — drawn in translucent light grey (#E8E8E8) with clean outlines, the olecranon, the antecubital fossa, the wrist creases and the metacarpal bones indicated as simple grey landmarks. Small solid circular node markers in deep teal (#0A4A3A) placed in the supraolecranon region just above the point of the elbow, in the antecubital fossa at the front of the elbow, over the distal third of the anterior forearm, across the wrist area, and over the dorsum of the hand between the metacarpals. A thin dashed vertical grey line (#8B8A83) runs between the two limbs marking the body midline. One active dipole is highlighted: the antecubital fossa node on the left limb in deep green (#0F6E56) marked N and its homologue on the right limb in warm orange (#D85A30) marked S, joined by a thin curved line crossing the dashed midline. Each node carries a small sans-serif number in dark grey with a thin black annotation line. A circular zoom detail panel connected by a thin grey line shows the dorsum of the hand enlarged with its node position. Composition: two limbs vertical and parallel, generous white margins. Flat editorial scientific illustration, BioRender vector style. NO photorealistic rendering, NO 3D shading, NO skin texture or nails detailed, NO dark background, NO gradients, NO long text labels, ONLY numbers. Aspect ratio 3:4, 2K.

---

# 9 · Zona 8 — Miembro inferior · 7 puntos

**Puntos:** 34 tensor de la fascia lata · 35 ojos de la rodilla · 36 hueco poplíteo · 37 tendón de Aquiles · 38 canal retromaleolar · 39 empeine · 40 planta del pie

Scientific illustration in BioRender style, pure white background, clean flat vector art, two complete human lower limbs shown from hip to foot arranged side by side and mirrored — the left limb in anterior view, the right limb in posterior view — plus one separate small plantar view of a foot sole placed at the bottom right, all drawn in translucent light grey (#E8E8E8) with clean outlines, the greater trochanter, the patella with its parapatellar recesses, the popliteal fossa, the Achilles tendon and the medial malleolus indicated as simple grey landmarks. Small solid circular node markers in deep teal (#0A4A3A) placed over the tensor fasciae latae at the upper outer thigh, in the parapatellar recesses either side of the kneecap, in the popliteal fossa behind the knee, along the Achilles tendon, in the retromalleolar channel between the Achilles tendon and the malleolus, over the dorsum of the foot, and on the sole of the foot. A thin dashed vertical grey line (#8B8A83) runs between the two limbs marking the body midline. One active dipole is highlighted: the popliteal node on the left limb in deep green (#0F6E56) marked N and its homologue on the right limb in warm orange (#D85A30) marked S, joined by a thin curved line crossing the dashed midline. Each node carries a small sans-serif number in dark grey with a thin black annotation line. A circular zoom detail panel connected by a thin grey line shows the retromalleolar channel enlarged, making clear that the node sits in the groove between the Achilles tendon and the malleolus. Composition: two limbs vertical and parallel, plantar view inset at lower right, generous white margins. Flat editorial scientific illustration, BioRender vector style. NO photorealistic rendering, NO 3D shading, NO skin texture or toenails detailed, NO dark background, NO gradients, NO long text labels, ONLY numbers. Aspect ratio 3:4, 2K.

---

# 10 · Las tres geometrías de dipolo

**Muestra:** dipolo local, dipolo distante y dipolo transversal, lado a lado. Es el concepto central del bloque y hoy solo existe como tabla.

Scientific illustration in BioRender style, pure white background, clean flat vector art, three equal vertical panels arranged in a row, each with a soft rounded very light cream background (#FAF8F2) and a simplified human torso figure in translucent light grey (#E8E8E8) with a thin dashed vertical grey midline (#8B8A83). In the first panel, two square magnet shapes sit immediately adjacent to each other on the same small area of the left shoulder, one deep green (#0F6E56) marked N and one warm orange (#D85A30) marked S, with a dense field-gradient band drawn as tight concentric arcs in the tissue between them. In the second panel, one deep green square marked N sits on the left shoulder while one warm orange square marked S sits far away over the lumbar kidney region on the same side, joined by a long thin dashed connecting line that stays on one side of the body without crossing the midline. In the third panel, one deep green square marked N sits on the left shoulder and one warm orange square marked S sits on the exactly mirrored right shoulder, joined by a bold thin line that visibly crosses the dashed midline at a right angle, with the crossing point emphasised by a small circular highlight. Above each panel a single short bold sans-serif word in dark teal: LOCAL, DISTANTE, TRANSVERSAL. Composition: three panels of identical width, evenly spaced, generous white margins. Flat editorial scientific illustration, BioRender vector style, sans-serif typography. NO photorealistic rendering, NO 3D shading, NO dark background, NO gradients in the background, NO long sentences, ONLY the three single words. Aspect ratio 16:9, 2K.

**Nota:** esta lámina se lee mejor en horizontal. Para el manual, cambia la frase final por `Aspect ratio 3:4, 2K. Three panels stacked vertically instead of in a row.`

---

# 11 · La excepción sagital

**Muestra:** el dipolo glabela ↔ depresión suboccipital. Es el único de los 41 que no cruza la línea media: la recorre.

Scientific illustration in BioRender style, pure white background, clean flat vector art, a single lateral profile view of a human head and upper neck facing left, drawn in translucent light grey (#E8E8E8) with clean simple outlines, the frontal bone, the nasal bridge, the occipital bone and the first cervical vertebrae indicated as faint grey contour landmarks, no facial features beyond a minimal profile line. One square magnet shape in deep green (#0F6E56) marked N sits on the glabella between the eyebrows, and one square magnet shape in warm orange (#D85A30) marked S sits in the depression immediately below the occiput at the back of the skull. A bold thin line runs horizontally straight through the head from the front marker to the back marker, drawn as a clear anterior-to-posterior axis with a small arrowhead, passing through the centre of the skull. A thin dashed grey line (#8B8A83) traces the sagittal midline plane of the head as a vertical shaded band, showing that both markers lie on that same plane rather than on either side of it. A small secondary inset at the top right shows the same head from the front, with a single dashed midline and both markers overlapping on it, making clear that from the front the two points coincide on the midline. Composition: profile head large and centred, inset small at top right, generous white margins. Flat editorial scientific illustration, BioRender vector style. NO photorealistic rendering, NO 3D shading, NO hair rendering, NO brain anatomy drawn, NO dark background, NO gradients, NO text labels, ONLY the letters N and S. Aspect ratio 3:4, 2K.

---

# Iteración — copiar y pegar en Nano Banana Pro 2

**Regla:** si el resultado está 80% correcto, no regeneres desde cero. Edita conversacionalmente.

**1 · Si sale fotorrealista o con sombras 3D:**
> "Mantén exactamente la misma composición y las mismas posiciones de los nodos, pero cambia el estilo a ilustración vectorial plana estilo BioRender: sin sombreado, sin volumen, sin textura de piel, contornos limpios de una sola línea sobre fondo blanco puro. No cambies nada más."

**2 · Si confunde dos puntos vecinos o dibuja un barrido en lugar de niveles discretos:**
> "Separa claramente [punto A] de [punto B]. [Punto A] va en [ubicación exacta] y [punto B] en [ubicación exacta]. Son dos nodos distintos, no uno. Mantén todo lo demás exactamente igual."

**3 · Si los nodos no quedan simétricos entre lado derecho e izquierdo:**
> "Los nodos deben estar en pares perfectamente espejeados a ambos lados de la línea media. Corrige la simetría manteniendo la misma figura, el mismo estilo y los mismos números."

**4 · Si escribe texto que no pediste, o lo escribe mal:**
> "Elimina todo el texto de la imagen excepto los números junto a cada nodo y las letras N y S del dipolo activo. Mantén la figura y la composición exactamente igual."

**5 · Si el dipolo activo no se distingue del resto:**
> "Haz que solo un par de nodos destaque como dipolo activo: uno en verde #0F6E56 con la letra N y su homólogo contralateral en naranja #D85A30 con la letra S, unidos por una línea que cruce visiblemente la línea media punteada. Todos los demás nodos en teal oscuro #0A4A3A, sin letras."

**6 · Si la figura queda demasiado detallada y compite con los nodos:**
> "Reduce el detalle anatómico de la figura: solo contorno limpio en gris claro #E8E8E8, sin músculos, sin órganos, sin huesos individuales salvo los puntos de referencia necesarios. Los nodos deben ser el elemento más visible de la imagen."

---

# Leyendas para componer aparte

*Se maquetan en el manual o en la slide, junto a cada lámina.*

**Cabeza** — 1 vértice · 2 occipital · 3 glabela · 4 depresión suboccipital · 5 fosa suboccipital (VB20, detrás del mastoides) · 6 fosa retromandibular · 7 área temporal, sobre el masetero

**Cuello** — 7 área paravertebral cervical · 8 piel sobre el esternocleidomastoideo · 9 fosa yugular · 10 fosa supraclavicular

**Tórax anterior** — 11 área xifo-esternal · 12 triángulo deltopectoral · 13 área precordial

**Tronco posterior** — 14 vértebras, una a una · 15 región paravertebral, derecha e izquierda de cada vértebra · 16 borde superior del trapecio · 17 borde vertebral de la escápula

**Abdomen** — 18 epigástrica · 19 mesogástrica · 20 hipogástrica · 21 ombligo · 22 fosa ilíaca · 23 región subcostal, en los flancos

**Pelvis y cadera** — 24 espina ilíaca póstero-superior · 25 espina ilíaca ántero-superior · 26 región inguinal · 27 fosa trocantérea · 28 periné, zona derecha e izquierda

**Miembro superior** — 29 región supraolecraniana · 30 fosa antecubital · 31 tercio distal anterior del antebrazo · 32 área de las muñecas · 33 dorso de la mano

**Miembro inferior** — 34 tensor de la fascia lata · 35 ojos de la rodilla · 36 hueco poplíteo · 37 tendón de Aquiles · 38 canal retromaleolar · 39 empeine · 40 planta del pie

---

*Instituto Centrobioenergetica, 2026 · Prompts generados a partir del dictado del Dr. Ojeda Rios, pendiente de validación del autor.*
