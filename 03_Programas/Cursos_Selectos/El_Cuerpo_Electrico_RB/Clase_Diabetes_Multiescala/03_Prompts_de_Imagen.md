# Los prompts de las tres láminas

> **Las tres láminas ya están generadas y montadas.** Lo que sigue queda como registro de con
> qué se pidieron, y para volver a generarlas si hace falta.

| Lámina | Archivo original | En el deck |
|---|---|---|
| **A** · islote acoplado | `Imagenes/celbconect.png` | `Slides/lamina-a.jpg` — 1600 px, 235 KB |
| **B** · islote desacoplado | `Imagenes/celbdesc.png` | `Slides/lamina-b.jpg` — 1600 px, 170 KB |
| **C** · corte esquemático | `Imagenes/Gemini_Generated_Image_1pbvp51pbvp51pbv.jpg` | `Slides/lamina-c.jpg` — 1600 px, 175 KB |

**Descartadas, y por qué.** `conexina-histologia-islote.jpg` y `conexina-desconexion-histologica.jpg`
son un par correcto, con rótulos en inglés quemados en el pixel —«Gap Junctions», «Beta Cells
(Insulin)», «Nuclei (DAPI)»—. Quedan como reserva. `Gemini_Generated_Image_5k5tpo...jpg` es otra
variante de A, con bandas negras a los lados.


**Clase · La diabetes tipo 2 como falla de coordinación entre escalas**
Motor: **Nano Banana 2** (`gemini-3.1-flash-image`) · formato por componentes · nivel de pensamiento **high**

---

## La advertencia que va antes de los prompts

**Una imagen generada por modelo no es una microscopía.** Las láminas A y B se piden como
**representación en el estilo de la inmunofluorescencia confocal**, no como registro de un
preparado. El pie de cada lámina lo declara en la diapositiva, y se dice en voz alta al
proyectarlas.

Si la clase necesita microscopía real, la ruta es otra: conseguir la figura publicada con su cita
completa y su permiso de uso. No hay atajo.

---

## La pareja A + B se genera como serie, no por separado

El argumento de la Parte II es el **contraste** entre las dos láminas. Si cambian el encuadre, el
número de células, la paleta o la iluminación, el contraste deja de leerse.

**Procedimiento:**

1. Se genera la **lámina A** con el prompt completo.
2. Se cierra A: se itera hasta que quede.
3. La **lámina B** se pide **adjuntando A como referencia**, con la instrucción corta de la sección
   B. La referencia adjunta reproduce el sistema con mucha más fidelidad que repetir el prompt.

---

# Lámina A · Islote conservado

**Blueprint.** Un islote pancreático visto de frente, siete células redondeadas en racimo compacto
sobre fondo oscuro. En el límite entre cada par de células contiguas hay cúmulos brillantes
verde-teal: las placas de conexina 36. Dentro de cada célula, gránulos ámbar difusos. Un núcleo
índigo por célula. El islote ocupa el tercio central; el resto es fondo oscuro con la barra de
escala abajo a la derecha.

```
SUBJECT: A pancreatic islet of Langerhans seen en face, seven rounded beta cells
in a compact cluster, rendered as a scientific illustration in the visual language
of confocal immunofluorescence microscopy.

COMPOSITION: The islet centred, occupying the middle third of the frame. Generous
dark field around it. A thin white scale bar in the lower right corner.

CHANNELS: Bright discrete puncta and short plaques in teal-green (#5DCAA5) sitting
exactly at the membrane border between every pair of contiguous cells — the gap
junction plaques, the dominant signal of the image. Diffuse granular amber
(#BA7517) filling the cytoplasm of each cell — the insulin granules. One indigo
(#534AB7) nucleus per cell, soft-edged. Cell outlines only implied by the
juxtaposition of channels, never drawn as an ink line.

PLACE AND LIGHT: Deep near-black field (#0B0E0D), no vignette, no gradient
background. Signal glow is tight, with a short falloff — the look of a
high-numerical-aperture objective, not a bloom filter.

STYLE: Scientific figure quality, publication grade, the register of a Nature
Medicine or Cell Metabolism panel. Crisp, quantitative, restrained.

TEXT: none inside the image except the scale bar, unlabelled.

RESTRICTIONS: NO text, NO letters, NO arrows, NO annotation labels, NO watermark,
NO logos. NO photorealistic tissue photograph aesthetic. NO 3D shading, NO
volumetric rendering, NO lens flare, NO bokeh. NO rainbow or heatmap palette —
only the three declared channels. NO cell outlines drawn in ink. Exactly seven
cells, no more.
```

**Aspecto:** 4:3 · 2K · pensamiento: high

---

# Lámina B · Islote desacoplado

**Se pide adjuntando la lámina A como referencia.** Instrucción corta, un solo cambio:

```
Use Image A for the style, the palette, the lighting, the framing and the cell
arrangement — identical islet, identical seven cells, identical position in frame.

Change ONE thing only: remove every teal-green (#5DCAA5) plaque from the membrane
borders. The borders between contiguous cells carry no signal at all in that
channel. The amber (#BA7517) granular cytoplasm and the indigo (#534AB7) nuclei
stay exactly as they are, same intensity, same distribution — the cells are still
full.

Do not redraw, do not restyle, do not move anything, do not change the scale bar.
No text.
```

**El error probable y su corrección:** si el modelo aprovecha para reducir también los gránulos
ámbar, se repite la instrucción con la frase de bloqueo delante — *«the amber channel is unchanged
in intensity and distribution»* — y se verifica antes de seguir. Ese detalle es el argumento: **las
células siguen llenas.**

---

# Lámina C · El corte esquemático

Esta no imita microscopía. Es diagrama, y va en **modo BioRender**: fondo blanco, vector plano,
legible proyectada.

**Blueprint.** Tres células beta en corte, dibujadas en gris muy claro, alineadas horizontalmente
con un espacio visible entre ellas. Dentro de cada una, gránulos ámbar apretados contra la
membrana, listos para salir. En los límites entre células, donde iría el canal, hay un hueco
marcado: dos medios canales que no se encuentran. Fondo blanco puro.

```
SUBJECT: Three beta cells in cross-section, side by side, flat vector scientific
diagram.

COMPOSITION: The three cells aligned horizontally across the middle of the frame,
with a clear visible gap between each pair. Generous white space above and below.

DETAIL: Each cell drawn in translucent light grey (#E8E8E8) with a clean darker
grey membrane line. Inside each cell, dense round amber (#BA7517) granules crowded
against the inner face of the membrane — full, ready, undelivered. At each
cell-to-cell border, two half-channels facing each other across the gap and NOT
meeting: the connexon hemichannels drawn in teal (#0F6E56), clearly unpaired, with
the empty space between them left white.

PLACE AND LIGHT: Pure white background (#FFFFFF), flat even illumination, no
shadow, no gradient.

STYLE: BioRender style, clean flat vector art, publication figure for a training
manual, sans-serif register.

TEXT: none. Clean image for labelling in layout.

RESTRICTIONS: NO text, NO labels, NO arrows, NO watermark. NO photorealistic
rendering, NO 3D shading, NO dark background, NO gradients, NO decorative
textures. NO paired or open channels — every hemichannel must read as unmatched.
Exactly three cells.
```

**Aspecto:** 16:9 · 2K · pensamiento: high

---

## Las tres iteraciones que van a hacer falta

| Fallo probable | Instrucción de corrección |
|---|---|
| El islote de A sale con más de siete células, o con dos filas | `Keep the style, palette and lighting exactly. Change only the cell count to exactly seven in one compact cluster. Do not redraw anything else.` |
| Las placas de conexina de A quedan repartidas por el citoplasma y no en el borde | `Keep everything. Change only the teal-green channel: every punctum sits on the membrane border between two contiguous cells, none inside the cytoplasm. Nothing else changes.` |
| En C los medios canales se ven unidos | `Keep the composition, the palette and the three cells exactly. Change only the channels at the borders: the two halves face each other with white space between them and do not touch. Do not redraw anything else.` |

Una corrección por mensaje, verificando entre cada una.

---

## Lo que no necesita prompt

Los siete diagramas de las diapositivas 3, 4, 5, 6, 8, 9 y 10 están dibujados como SVG dentro de
las láminas: se editan con texto, escalan sin perder filo, y llevan la paleta y la tipografía del
curso. No se generan con modelo.

---

# Las tres láminas de tejido

Van dentro de las láminas 15, 25 y 28, donde el tejido **es** el contenido. Rompen el ritmo del
texto por añadidura, no por decoración.

**Motor:** Nano Banana 2 · formato por componentes · pensamiento **high** · 3:2 · 2K

**Y la misma advertencia de siempre:** ninguna de las tres es una microscopía. El pie de cada
lámina lo declara, igual que en las láminas A y B.

---

## Hígado graso · entra en la lámina 15

**Blueprint.** Un campo de hepatocitos vistos en corte, cada uno con su núcleo, y dentro del
citoplasma gotas redondas de lípido de tamaños distintos que desplazan al núcleo contra la
membrana. Al lado, un hepatocito sano para contraste.

```
SUBJECT: A field of hepatocytes in cross-section, rendered as a scientific
illustration in the visual language of a stained histological section.

COMPOSITION: Six to eight polygonal hepatocytes packed together, filling the
frame. One of them, at the left, is healthy and free of droplets — the contrast
case. Generous framing, no crop through a nucleus.

DETAIL: Inside each of the affected cells, round lipid droplets of clearly
different sizes — some large enough to push the nucleus flat against the cell
membrane, others small and scattered. Droplets in pale warm amber (#D9A441),
cytoplasm in a soft rose-taupe (#C08E86), nuclei in deep indigo (#3B3170), cell
borders as a thin darker line.

PLACE AND LIGHT: Flat even illumination, as a section under transmitted light.
No dramatic shadow, no volumetric glow.

STYLE: Histology plate quality, the register of a teaching atlas. Precise,
restrained, printable.

TEXT: none.

RESTRICTIONS: NO text, NO labels, NO arrows, NO watermark. NO photorealistic
photograph aesthetic, NO 3D rendering, NO gradients across the whole frame.
The droplets must read as round and INSIDE the cells, never between them. At
least one nucleus visibly flattened against its membrane by a large droplet.
```

---

## Depósito de amiloide en el islote · entra en la lámina 28

**Blueprint.** Un islote pancreático en corte. Entre las células, en el espacio que antes estaba
libre, hay masas fibrilares que las separan y las empujan. Algunas células quedan comprimidas
contra el borde.

```
SUBJECT: A pancreatic islet in cross-section with amyloid deposits occupying the
space between the cells, rendered as a scientific illustration in the visual
language of a stained histological section.

COMPOSITION: The islet centred, its rounded outline visible against surrounding
tissue. Inside it, cells displaced and compressed by the deposits.

DETAIL: Between the cells, dense fibrillar masses in a dull salmon-pink
(#C97B6E), with a fibrous striated texture, clearly extracellular — never inside
a cell. The beta cells in pale sage (#A9BFA4) with indigo nuclei, several of them
squeezed thin and pushed against the islet edge. A capillary visibly separated
from the nearest cells by a band of deposit.

PLACE AND LIGHT: Flat even illumination of a stained section.

STYLE: Histology plate quality, teaching atlas register.

TEXT: none.

RESTRICTIONS: NO text, NO labels, NO watermark. NO photorealistic photograph
aesthetic, NO 3D rendering. The deposits must be unmistakably BETWEEN cells and
must visibly deform the cells they touch. The islet must still read as an islet.
```

---

## Microglía activada en el núcleo arcuato · entra en la lámina 25

**Blueprint.** Dos células de microglía lado a lado: a la izquierda en reposo, con muchas ramas
finas y largas; a la derecha activada, con el cuerpo engrosado y las ramas cortas y gruesas. Al
fondo, siluetas de neuronas.

```
SUBJECT: Two microglial cells side by side, showing the resting and the activated
morphology, rendered as a scientific illustration in the visual language of an
immunostained brain section.

COMPOSITION: A diptych within one frame, no dividing line. Left: a resting
microglial cell with a small soma and many long, thin, highly branched
processes. Right: the same cell type activated — enlarged rounded soma, processes
short, thick and few. Same scale in both.

DETAIL: Microglia in warm amber (#D9913C) against a near-black field. Behind and
between them, faint indigo (#4A4090) neuronal silhouettes out of focus, giving
depth without competing.

PLACE AND LIGHT: Dark field, tight glow with short falloff, as a fluorescence
image at high magnification. No bloom.

STYLE: Neuroscience figure quality, the register of a Nature Neuroscience panel.

TEXT: none.

RESTRICTIONS: NO text, NO labels, NO arrows, NO watermark. NO photorealistic
photograph aesthetic, NO 3D rendering, NO rainbow palette. The morphological
difference between the two must be unmistakable at a glance: many thin branches
on the left, few thick ones on the right.
```

---

## Las tres ya están montadas

| Lámina | Archivo original | En el deck |
|---|---|---|
| **15** · hígado graso | `Gemini_Generated_Image_gwhg7e…jpg` | `Slides/lamina-higado.jpg` — 1500 px, 195 KB |
| **25** · microglía | `Gemini_Generated_Image_8ft7a2…jpg` | `Slides/lamina-microglia.jpg` — 1500 px, 113 KB |
| **28** · amiloide | `Gemini_Generated_Image_uve01i…jpg` | `Slides/lamina-amiloide.jpg` — 1500 px, 262 KB |

**Las seis imágenes del deck llevan pie que declara qué son.** Ninguna es una microscopía: A y B
son representación en el estilo de la inmunofluorescencia confocal, C es ilustración esquemática, y
las tres de tejido son ilustración en el estilo de un corte histológico.

**Lo que salió de la lámina 15 al montar la imagen:** la secuencia músculo → ácidos grasos →
hepatocito → lipotoxicidad, que decía lo mismo que el título. Si la quieres de vuelta, hay que
partir la lámina en dos.
