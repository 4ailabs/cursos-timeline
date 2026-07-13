# Sistema visual del manual — SVG, iconos y prompts
### Directriz y línea editorial (Regulación Bioeléctrica · «El nodo de lesión»)

> **Qué es.** La norma única para producir todo lo visual del manual: gráficos vectoriales (SVG), el sistema de iconos, y el sistema de prompts para imágenes IA. El objetivo es una **línea editorial consistente**: que dos piezas hechas en momentos distintos (o por agentes distintos) se vean de la misma familia. Complementa `Manual_Nodo_Lesion_GUIA_CONSTRUCCION.md` (marca, formato B5, flujo por partes).
>
> **Regla de oro:** *cada pieza debe verse diseñada para este manual, nunca insertada de un banco.* La consistencia no es opcional — es lo que distingue un manual premium de uno amateur.

**Tokens de marca (fijos, no negociables):** teal `#0F6E56` · teal profundo `#0B5644` · teal claro `#E1F5EE` · tinta `#2C2C2A` · gris `#888780` · gris claro `#F1EFE8` · papel `#FCFBF7` · coral `#D85A30` (SOLO alertas/hallazgos). Símbolo = **dipolo** (nodo denso + nodo al 35% + línea). Tipografía en figuras: Georgia (etiquetas de contenido) / sans de sistema (rótulos técnicos).

---

# PARTE A — Directriz de SVG

## A.0 · Cuándo va SVG (y cuándo raster)

| Va en **SVG (vector)** | Va en **raster (imagen IA)** |
|---|---|
| Marcador dipolo, logo, marca de agua | Anatomía de superficie / escenas realistas |
| Signos de concepto (isla, nodo regulador, set point) | Paciente en camilla, colocación en contexto |
| Diagramas: graphical abstract, árbol de decisión, flujo de pasos | Torso/riñones a color «tipo atlas» |
| Iconos funcionales | Fotografía de técnica |
| Mapa corporal maestro (siluetas esquemáticas) | — |

Criterio: **si la pieza es un signo, un diagrama o una silueta esquemática → SVG.** Si es una escena/anatomía realista → raster (Parte C). El dipolo y los signos **siempre** se superponen en SVG encima del raster (nunca se piden a la IA).

## A.1 · Rejilla, viewBox y tokens (estándar premium)

*Derivado de IBM Carbon (malla + padding), Phosphor (keyshapes), Material (optical sizing), Quanta (diagramas). La causa nº1 de que un set «se vea desigual» es mezclar viewBox y grosores arbitrarios — se elimina con tokens fijos.*

**viewBox normalizados (no mezclar):**
- **Iconos:** `0 0 24 24`, con **2 px de padding** (área viva 20 px).
- **Signos de concepto / diagramas:** `0 0 24 24` o `0 0 60 44` según densidad, mismo grid.
- **Siluetas / ilustración:** viewBox de proporción fija (p. ej. `0 0 96 120`), reutilizada siempre.

**Tokens de trazo (fijos, en unidades del viewBox canónico):**
| Token | Valor | Uso |
|---|---|---|
| `--stroke-icon` | **1.75** | iconos ≤24 |
| `--stroke-illustration` | **1.5** | contorno de silueta (lienzo 96) |
| `--stroke-detail` | **1** | estructura interna |
| `--stroke-leader` | **0.5–0.75** | líneas guía de etiqueta |
| `--radius` | **2** (múltiplos de 2) | esquinas |
| `--grid` | **8** | todo separa en múltiplos 8/16/24 |
| color | teal `#0F6E56` a 3 valores: **100% / 40% / 12%**; coral `#D85A30` solo alerta |

**Optical sizing (regla Material):** no usar el mismo grosor absoluto en pieza grande y pequeña — icono 1.75, silueta 1.5/1. Escalar proporcional al viewBox, nunca cambiar el número base.

**Pixel-snapping (nitidez invisible, decisiva en offset y B&N):** ejes de trazo de grosor **par** en coordenada **entera** (x=8); grosor **impar** en **medio píxel** (x=8.5). Un 1 px centrado en entero se renderiza borroso a 2 px grises. Añadir `shape-rendering="geometricPrecision"` a curvas, `crispEdges` a ejes horizontales/verticales, y `vector-effect="non-scaling-stroke"` si el SVG se escala en maqueta.

## A.2 · Tabla maestra de trazo y color

| Elemento | Color | Grosor (@100% impresión) | Notas |
|---|---|---|---|
| Contorno de cuerpo/silueta | `#2C2C2A` | **1.25 pt** | `stroke-linejoin:round; stroke-linecap:round` |
| Reparos anatómicos secundarios | `#888780` | **0.75 pt** | jerarquía de segundo nivel |
| Diagramas y signos de concepto | `#0F6E56` | **1 pt** uniforme | relleno solo gris `#E8E4DF` para «lo inactivo/aislado» |
| Dipolo / marcador de imán | `#0F6E56` (2º nodo al 35%) | círculos r≈2.2 mm, línea 1 pt | símbolo de marca = marcador clínico |
| Flecha de dirección | `#0F6E56` | 1 pt fuste | **punta triangular cerrada** (no abierta estilo UI) |
| Número de paso | teal sólido, dígito blanco | círculo Ø 5 mm | Georgia bold |
| Línea de referencia (medición) | `#888780` | 0.75 pt, `dash 3 2` | horizontal |
| Cota de hallazgo/alerta | `#D85A30` | 1 pt | **único** uso de coral en figuras |
| Etiquetas / códigos | `#2C2C2A` | Georgia 7–8 pt | fuera de los círculos |

**Reglas globales:** grosores por tokens (A.1), no valores sueltos. `round` en todas las terminaciones (armoniza con Georgia, serif humanista). Esquinas radio `--radius` (múltiplos de 2). **Prohibido:** sombras, gradientes, 3D/isométrico, glow, degradados de piel, puntas de flecha abiertas.

### A.2bis · Reglas de nivel editorial (lo que sube de amateur a premium)

- **Jerarquía de trazo, no uniforme** (marca del line-art editorial — New Yorker, Nobrow). Contorno = **1.5×** el detalle interno: silueta `1.5` contorno / `1` estructura / `0.75` detalle. Un solo peso plano se ve «clip-art»; la jerarquía se ve dibujada a mano profesional.
- **Sombreado sin degradados:** el volumen se da con **teal plano al 12%** (fill de zona) o **trama de puntos regular** — nunca gradiente. Imprime limpio en offset y B&N.
- **Sin grises decorativos:** usar los **3 valores del teal** (100/40/12) en vez de introducir un gris neutro. Eso da cohesión «de sistema».
- **Gramática de flechas única** (regla Quanta): una sola flecha en todo el manual — fuste `1.25`, punta triangular **4×3**. El tipo de relación se distingue por estilo de línea, no por 5 puntas: **sólida = causal**, **punteada 2-2 = moduladora**. Etiquetar con **líneas guía finas (leader `0.5`)**, no flechas gruesas.
- **Keyshapes + compensación óptica** (Carbon/Phosphor): cada icono se inscribe en 1 de 4 plantillas (círculo Ø20, cuadrado 18, rect. 20×15 / 15×20) con padding fijo de 2. **Círculos +8–10%** sobre la caja del cuadrado; triángulos sobresalen ~1 px arriba. Centrado **óptico a ojo**, no por bounding box.
- **Máx. 3 tamaños tipográficos por figura** (título ~11–12 pt / etiqueta ~8–9 / micro-nota ~7). Todo alinea a una base común.
- **Color = señal, no decoración:** en un diagrama, ~90% teal; **coral solo en el nodo de lesión / punto de alerta**.
- **El dipolo es el «logo del sistema»:** se define con estos tokens (nodos = keyshape círculo, conector = `--stroke-icon`) y todo lo demás deriva visualmente de él.

## A.3 · Léxico de conceptos (signos canónicos)

Cada abstracción recurrente tiene **UN signo fijo** que se dibuja siempre igual. La primera aparición lleva su micro-definición al lado; las siguientes, el signo solo evoca la idea. Esto convierte el manual en un lenguaje, no en ilustraciones sueltas.

**Ejemplar de referencia (el estándar a igualar):** `Curso_Vigente/Imagenes Codex/Isla_Bioelectrica_Reconexion/isla_bioelectrica_reconexion.svg` (y sus dos iconos). Todo diagrama conceptual nuevo debe verse de esa familia.

**Código de color del concepto (fijo):**
- **Teal `#0F6E56` = red sana / tejido conectado** (células con contorno teal, núcleo teal tenue, uniones teal).
- **Ámbar `#BA7517` = la isla / zona despolarizada** (células rellenas ámbar, borde punteado ámbar). El ámbar es el color de la desregulación (secundario de marca), no el gris.
- **Rojo/coral = unión cerrada** (una **X** sobre la gap junction interrumpida).
- **Ámbar (trazo) = señal compartida** que reaparece al reconectar.

| Concepto | Signo |
|---|---|
| **Red / tejido conectado** | Malla de células (círculos contorno teal) unidas por uniones teal; núcleo teal tenue |
| **Isla despolarizada** | Grupo de células **rellenas ámbar** dentro de un **contorno punteado ámbar**, con **X rojas** sobre las uniones cerradas — la interrupción se ve |
| **Reconexión** | La misma red con las uniones **reabiertas** (traza ámbar de señal compartida); la zona antes aislada vuelve a ser teal |
| **Set point / equilibrio** | Línea horizontal teal + marca de referencia; desviación = punto fuera con flecha de retorno |
| **Nodo regulador** | Nodo teal **más grueso** del que **salen** líneas hacia otros nodos |

Formato del graphical abstract (del ejemplar): eyebrow sans en versalitas teal + titular serif (una frase-idea) + dos estados **antes → después** unidos por una flecha rotulada (p. ej. «REPOLARIZACIÓN · se reabren las uniones») + leyenda al pie. Umbral: **si es un signo simple (≤4 trazos) va inline; si es el mecanismo, es una lámina de diagrama con este formato.**

## A.4 · El marcador clínico = el dipolo

El punto donde va un imán se marca **siempre** con el dipolo, apoyado en un reparo anatómico dibujado (borde renal, sutura, línea de lesión) y con etiqueta corta al lado (convención WHO de acupuntos). Nunca flotando sobre piel lisa. Nodo **S** (denso, teal 100%, se coloca primero) + nodo **N** (35%) + línea. La orientación del dipolo indica polaridad y dirección.

## A.5 · Reutilización, nombres, accesibilidad

- **Dibujar una vez, instanciar muchas:** las 3 siluetas canónicas (prono-superior, lateral, talones) y los componentes (dipolo, flecha, número de paso) se definen una vez y se reusan idénticos.
- Todo SVG lleva `role="img"` + `aria-label` descriptivo.
- Nombrar los componentes de forma estable (`rb-dipolo`, `rb-flecha`, `rb-paso`, `rb-silueta-prono`).

---

# PARTE B — ¿Necesitamos iconos?

## B.0 · Análisis y criterio

**Sí, pero un set mínimo y funcional — no decorativo.** Un icono se gana su lugar solo si **(1)** se repite como señalización a lo largo del manual y **(2)** se reconoce más rápido que una palabra. Todo lo demás va como palabra/rótulo. El cliché a evitar es el «icon soup» (un pictograma bonito por sección) y los emojis. Los signos de concepto (Parte A.3) **no son iconos** — son diagramas; no se cuentan aquí.

## B.1 · Set funcional mínimo (máx. 6)

| Icono | Uso | Forma (line-art teal 1 pt, ~5 mm) |
|---|---|---|
| **Aviso / precaución** | Contraindicaciones, excepción crítica | Triángulo con signo `!` (en **coral** cuando es seguridad real) |
| **Tiempo** | Duración de impactación | Reloj minimal (círculo + dos manecillas) |
| **Punto de colocación** | Dónde va el imán | *No lleva icono propio* → usa el **dipolo** (A.4) |
| **Medición** | Paso de rastreo/simetría | Dos marcas + línea base horizontal |
| **Clave / recuerda** | Idea a retener | El **nodo denso** del dipolo (coherencia: «punto teal = clave») |
| **Nota de honestidad** | Límite/en investigación | Pequeño círculo con `i` (info), gris |

## B.2 · Estilo de icono

Mismo sistema que los diagramas: line-art, **teal 1 pt**, `round`, lienzo ~5–6 mm, sin relleno (salvo el nodo-clave). Un icono nunca lleva color propio distinto del sistema; la **única** excepción es el triángulo de seguridad en coral.

## B.3 · Lo que NO va

Iconos decorativos por sección, emojis, pictogramas duotono, estilos de librería genérica (Font Awesome, Material) tal cual, iconos rellenos con sombra. Si dudas: **quítalo y pon la palabra.**

---

# PARTE C — Sistema de prompts (línea editorial para imágenes IA)

Para las escenas/anatomía en raster (Nano Banana 2 / GPT Images). El riesgo es la **deriva de estilo** entre láminas; se controla con un protocolo rígido.

## C.1 · Protocolo de 4 capas (obligatorio para toda lámina)

1. **Patrón cero primero.** Generar y **aprobar UNA** lámina maestra (p. ej. torso prono con polos renales). Todas las demás se generan **pasándola como imagen de referencia** (sube la consistencia de ~50% a ~90%). No generar la 2ª lámina «desde cero».
2. **Bloque de estilo fijo** (C.2) — pegar idéntico, sin variar una palabra.
3. **Descripción específica** (C.3) — lo único que cambia por lámina.
4. **Semilla fija + negativos** (C.4) — guardar la semilla de la aprobada y reusarla.

## C.2 · Bloque de estilo fijo (pegar idéntico en TODA lámina)

> *Editorial anatomical illustration, clean educational style (Kenhub-like), flat 2D, no shading, no gradients, no cast shadows, no 3D render. Warm off-white background #FCFBF7. Line art only: warm near-black contours #2C2C2A at even 1.25pt weight, secondary landmarks in warm grey #888780 at 0.75pt, rounded line joins and caps. Relevant structure filled with pale teal #E1F5EE, everything else uncolored. No text, no labels, no arrows, no magnets, no props, no logos. Single anatomical system, uncluttered, generous negative space. Muted, restrained, European minimalist medical didactic register. Neutral clinical accuracy.*

## C.3 · Plantilla de prompt (solo esto cambia por lámina)

```
[BLOQUE DE ESTILO FIJO — C.2]

Subject: <vista canónica exacta> of <región>, posterior/lateral/heels view.
Show: <reparos visibles: p.ej. spine midline, T12–L2 kidney poles, iliac crests>.
Framing: <encuadre: full back / cropped lower back / close-up of heels>, centered, flat frontal, no perspective.
Palette: only #2C2C2A line, #888780 secondary, #E1F5EE fill on <estructura relevante>.

[NEGATIVOS — C.4]
Reference image: <lámina patrón cero aprobada>   ·   Seed: <semilla fija>
```

**Vistas canónicas fijas** (no improvisar ángulos): prono-superior, lateral, talones. Reutilizar siempre las mismas.

## C.4 · Negativos duros (pegar siempre)

`photorealistic, stock photo, glossy, neon, saturated colors, drop shadow, bevel, glow, teal-and-orange grading, watermark, UI arrows, cartoon, cute, 3D render, skin gradient, labels, text, magnets, logos.`

## C.5 · Reglas de composición no negociables

- **Generar SIEMPRE sin imanes** → el dipolo se superpone en SVG (A.4).
- Un solo tinte funcional (teal); coral solo en cotas de hallazgo **reales** — **no inventar cifras** (regla del proyecto).
- Vistas canónicas fijas y reutilizadas; no un ángulo nuevo por lámina.
- Exportar **≥300 dpi** al tamaño B5 de destino (hero ≥2000 px).
- **Validar la anatomía crítica** (posición de polos renales, trayectos) contra un atlas real; el registro Kenhub es referencia de *limpieza*, no de contenido.

## C.6 · Registro de prompts (lo que mantiene la línea editorial)

Llevar un **registro versionado** de cada lámina: nombre, prompt exacto usado, semilla, lámina de referencia, fecha, estado (aprobada/descartada). Guardar en `Investigacion_2026/` o junto al manual. Sin este registro, la consistencia se pierde entre sesiones. **Toda lámina nueva parte de una aprobada, nunca de cero.**

---

# PARTE D — La línea editorial en una frase

**Un solo tinte (teal), un solo símbolo (el dipolo), dos pesos de trazo, terminaciones redondas, cero decoración.** Los diagramas se dibujan en un léxico fijo; los iconos son seis y funcionales; las imágenes IA salen todas de un patrón cero con un bloque de estilo idéntico. Si una pieza no cumple esto, no entra.

---

*Instituto Centrobioenergetica, 2026 · Directriz del sistema visual — actualizar conforme se añadan signos o láminas. Ver `Manual_Nodo_Lesion_GUIA_CONSTRUCCION.md`.*
