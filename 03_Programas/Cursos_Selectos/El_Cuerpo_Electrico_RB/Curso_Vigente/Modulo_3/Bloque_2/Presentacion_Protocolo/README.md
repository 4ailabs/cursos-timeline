# Presentación · Protocolo clínico del eje digestivo

Deck de 37 láminas construido a partir de
[`PROTOCOLO_Eje_Digestivo_RB.md`](../PROTOCOLO_Eje_Digestivo_RB.md) y
[`TECNICA_RB_Eje_Digestivo.md`](../TECNICA_RB_Eje_Digestivo.md), sin modificar los archivos fuente.

## Se abre así

`index.html` en el navegador. Flechas o clic para avanzar y revelar, `N` para las notas del
presentador, `F` para pantalla completa, `Inicio` y `Fin` para saltar a los extremos. Para PDF, se
imprime en apaisado de 13.333 × 7.5 pulgadas: cada lámina sale en su propia página.

## Cómo está repartido

| Láminas | Qué cubre |
|---|---|
| **1 – 12** | Derivación, exclusiones, interrogatorio dirigido, estado autonómico y medición basal |
| **13 – 15** | Horario, sustrato, campo y retiro, con el calendario de diez semanas |
| **16 – 30** | Posición, polaridad, maniobras, once zonas, orden fijo y registro |
| **31 – 34** | Plazos de revisión, comprobaciones, recorrido y resultados |
| **35 – 37** | Hiato, puntos abiertos y regla de comprobación |

## Figuras científicas y atlas anatómico

La presentación integra siete figuras científicas originales: portada anatómica, atlas de las once
zonas, posición en camilla, dipolo local, nodos distantes, rejilla magnética y hiato diafragmático.
Se generaron con ImageGen y se guardaron dentro de `assets/`.

Las figuras que requieren exactitud operativa llevan una capa SVG adicional con números, orientación,
polaridad o referencias anatómicas. Esta capa está en `atlas-overlays.js` y evita depender de texto
dibujado dentro de la imagen.

## Diagramas SVG animados

Van en SVG dentro de `diagrams.js`, con el mismo lenguaje visual del deck de la clase: los diecisiete
pasos, los datos de derivación, los siete bloques del interrogatorio, la secuencia de cuatro pasos,
el calendario de diez semanas, los cinco pasos del rastreo, el orden fijo de nodos, los plazos de
revisión, la náusea con sus tres vías, los cuatro resultados, la cara del imán y los diez puntos
abiertos.

## Qué archivo se edita para cada cosa

| Archivo | Qué contiene |
|---|---|
| `slides-data.js` | El contenido de las 33 láminas, con sus notas y su fuente |
| `diagrams.js` | Diagramas de secuencia, decisión, calendario, polaridad y comprobación |
| `atlas-overlays.js` · `atlas-overlays.css` | Rótulos y marcadores precisos sobre las figuras anatómicas |
| `deck.css` · `compact.css` · `protocolo.css` | El sistema visual, heredado del deck de la clase |
| `deck.js` | Navegación, notas y fragmentos |

---

*Instituto Centrobioenergetica, 2026*
