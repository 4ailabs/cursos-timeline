# Presentación · Módulo 2, Bloque 4 · El eje del estrés

Deck de 36 láminas construido a partir de [`GUION_Bloque_4.md`](../GUION_Bloque_4.md),
[`01_Valoracion_del_Eje_del_Estres.md`](../01_Valoracion_del_Eje_del_Estres.md),
[`02_Mapa_de_Sensaciones.md`](../02_Mapa_de_Sensaciones.md),
[`03_Hoja_de_Valoracion_Eje_del_Estres.md`](../03_Hoja_de_Valoracion_Eje_del_Estres.md) y
[`04_CSI_Sensibilizacion_Central.md`](../04_CSI_Sensibilizacion_Central.md), sin modificar los
archivos fuente.

## Dos páginas

| | |
|---|---|
| **`index.html`** | La presentación, para proyectar |
| **`guion-tarjetas.html`** | El guion docente, una tarjeta por lámina, con buscador |

`index.html` en el navegador. Flechas o clic para avanzar y revelar, `N` para las notas del
presentador, `F` para pantalla completa, `Inicio` y `Fin` para saltar a los extremos. Para PDF, se
imprime en apaisado de 13.333 × 7.5 pulgadas: cada lámina sale en su propia página.

## Cómo está repartido

| Láminas | Qué cubren |
|---|---|
| **1 – 10** | La formulación que se retira, las seis fases del ciclo defensivo, el frenazo, la alostasis, las cuatro predicciones y qué se mide |
| **11 – 26** | La hoja de valoración completa: mapa de sensaciones, signos de salida, conteo de nodos, prueba de respiración profunda, lectura conjunta y los dos anexos |
| **27 – 35** | Qué hace el rastreo del eje transversal, cómo se le dice al paciente, las tres observaciones y el límite con BV4 |
| **36** | Cierre del módulo y puente al Módulo 3 |

## Siete fichas operativas

Las láminas que llevan un instrumento muestran la ficha tal como se llena: las doce zonas del mapa
de sensaciones, la instrucción textual del recorrido, los cuatro signos y los seis dominios, la
ejecución y el registro de la prueba de respiración profunda, los trece ítems de la casilla de
hipoactivación en dos láminas, y la secuencia de la práctica.

## Once diagramas

Van en SVG dentro de `diagrams.js`: las seis fases con su perfil autonómico, el frenazo con y sin
terminación, el ciclo en tres lenguajes, las cuatro predicciones, las tres formulaciones, qué se
mide frente a qué no, los cuatro apartados de la hoja, los cortes de la prueba de respiración, los
cuatro perfiles de lectura, las cinco razones y la regla sobre la descarga.

## Las tres imágenes están por producir

Los encargos, con nombre de archivo y qué debe mostrar cada uno, están en
[`assets/IMAGENES_PENDIENTES.md`](assets/IMAGENES_PENDIENTES.md). Mientras el archivo no exista, la
lámina muestra un recuadro con el nombre y el encargo.

## El guion docente

`guion-tarjetas.html` muestra una tarjeta de 16 × 9 por lámina, con cinco apartados: el objetivo de
la lámina, lo que se dice, los datos que se mencionan, el límite de lo que se puede afirmar, y la
frase de transición a la siguiente. Lleva buscador, e imprime en apaisado con una tarjeta por
página.

## Qué archivo se edita para cada cosa

| Archivo | Qué contiene |
|---|---|
| `slides-data.js` | El contenido de las 36 láminas, con sus notas y su fuente |
| `diagrams.js` | Los once diagramas en SVG |
| `deck.css` · `compact.css` · `bloque4.css` | El sistema visual, compartido con los demás decks del curso |
| `guion-docente.js` | La guía docente de las 36 láminas: objetivo, lo que se dice, datos, límite y transición |
| `deck.js` | Navegación, notas y fragmentos |

---

*Instituto Centrobioenergetica, 2026*
