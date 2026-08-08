# Presentación · Protocolo clínico del eje digestivo

Deck de 33 láminas construido a partir de
[`PROTOCOLO_Eje_Digestivo_RB.md`](../PROTOCOLO_Eje_Digestivo_RB.md) y
[`TECNICA_RB_Eje_Digestivo.md`](../TECNICA_RB_Eje_Digestivo.md), sin modificar los archivos fuente.

## Se abre así

`index.html` en el navegador. Flechas o clic para avanzar y revelar, `N` para las notas del
presentador, `F` para pantalla completa, `Inicio` y `Fin` para saltar a los extremos. Para PDF, se
imprime en apaisado de 13.333 × 7.5 pulgadas: cada lámina sale en su propia página.

## Cómo está repartido

| Láminas | Qué cubre |
|---|---|
| **1 – 8** | Derivación, exclusiones, interrogatorio dirigido, estado autonómico y medición basal |
| **9 – 11** | Horario, sustrato, campo y retiro, con el calendario de diez semanas |
| **12 – 26** | Posición, polaridad, las cuatro maniobras, las once zonas, el orden fijo y el registro |
| **27 – 30** | Plazos de revisión, jerarquía de las comprobaciones, náusea y resultados |
| **31 – 33** | El hiato, los diez puntos abiertos y la regla del rastreo |

## Las ocho imágenes están por producir

Los encargos, con nombre de archivo y qué debe mostrar cada uno, están en
[`assets/IMAGENES_PENDIENTES.md`](assets/IMAGENES_PENDIENTES.md).

**Mientras el archivo no exista, la lámina muestra un recuadro con el nombre y el encargo.** En
cuanto se guarda el PNG con ese nombre exacto en `assets/`, la lámina lo toma sola, sin modificar el
código.

## Los doce diagramas ya están hechos

Van en SVG dentro de `diagrams.js`, con el mismo lenguaje visual del deck de la clase: los diecisiete
pasos, los datos de derivación, los siete bloques del interrogatorio, la secuencia de cuatro pasos,
el calendario de diez semanas, los cinco pasos del rastreo, el orden fijo de nodos, los plazos de
revisión, la náusea con sus tres vías, los cuatro resultados, la cara del imán y los diez puntos
abiertos.

## Qué archivo se edita para cada cosa

| Archivo | Qué contiene |
|---|---|
| `slides-data.js` | El contenido de las 33 láminas, con sus notas y su fuente |
| `diagrams.js` | Los doce diagramas en SVG |
| `deck.css` · `compact.css` · `protocolo.css` | El sistema visual, heredado del deck de la clase |
| `deck.js` | Navegación, notas y fragmentos |

---

*Instituto Centrobioenergetica, 2026*
