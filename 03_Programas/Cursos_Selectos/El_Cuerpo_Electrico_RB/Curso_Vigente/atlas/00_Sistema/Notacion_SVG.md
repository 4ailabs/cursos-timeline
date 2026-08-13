# La notación de los puntos se monta en vector

**Instituto Centrobioenergetica · agosto 2026**

Las láminas generadas llevan cuerpo y hueso. Los cuarenta y un puntos, su polaridad, las
cuerdas del dipolo y la numeración van en una capa SVG encima.

**Por qué en vector.** El modelo no coloca un punto anatómico donde va: lo coloca donde
el dibujo le queda cómodo. Con cuarenta y un puntos en ochenta posiciones bilaterales, un
error de colocación por lámina arruina el atlas. En vector la colocación es exacta, se
corrige sin regenerar la imagen, y los mismos signos quedan idénticos en las quince
vistas.

---

## Los siete signos

La polaridad se marca **por forma, no por color**, para que la lámina sobreviva a una
fotocopia en gris y para que el teal siga significando una sola cosa.

| Signo | Qué es |
|---|---|
| Circunferencia fina gris `#9A9384`, 0.5 pt | Posición de rastreo disponible |
| **Disco teal macizo** `#0F6E56` | Polo negativo — el punto que marcó |
| **Anillo teal abierto**, mismo diámetro, 1 pt | Polo positivo — el homólogo contralateral |
| Cuerda teal 0.7 pt cruzando el eje | Dipolo transversal |
| Cuerda teal 0.7 pt punteada sobre el eje | Dipolo sagital de la cabeza — glabela con depresión suboccipital |
| Eje vertical 0.35 pt, trazo y punto | La línea media |
| Corchete gris al margen | Delimitación de zona |

Diámetro del disco y del anillo: el mismo en las quince láminas. Se fija una vez y se
reutiliza como componente.

---

## La numeración

Del 1 al 41, en **Avenir Next**, con el stack de la casa:
`"Avenir Next","Segoe UI",system-ui,"Helvetica Neue",Arial,sans-serif`.

Peso 400. Nunca dentro de la imagen generada: siempre en la capa SVG, con línea guía fina
gris cuando el número no cabe junto al punto.

---

## Lo que la geometría del método exige de la notación

Del registro del dictado, `Modulo_2/Bloque_3/08_Mapa_de_Nodos_Eje_Transversal.md`:

- **El dipolo cruza la línea media.** Negativo donde marca, positivo en el homólogo
  contralateral. La cuerda tiene que cruzar el eje, no quedarse de un lado.
- **Cuarenta puntos son bilaterales y uno es sagital.** El dipolo glabela – depresión
  suboccipital une dos puntos de línea media, uno anterior y otro posterior, y por eso
  lleva cuerda punteada y aparece repartido entre las láminas 02 y 01.
- **Las vértebras se rastrean una a una.** La lámina 06 necesita una posición de rastreo
  por nivel vertebral, más la paravertebral derecha e izquierda de cada nivel.
- **Se rastrea todo y se aplica solo donde marca.** Por eso la circunferencia gris —
  posición disponible — es el signo más frecuente de las láminas, y el disco macizo
  aparece solo en los ejemplos resueltos.

---

## Estructura del archivo

Un SVG por lámina, con la imagen PNG referenciada como capa de fondo y los signos como
grupos nombrados:

```
<g id="eje">          la línea media
<g id="posiciones">   circunferencias grises de rastreo
<g id="ejemplo">      disco, anillo y cuerda del caso resuelto
<g id="numeros">      la numeración
```

Así se puede exportar la misma lámina con la numeración encendida para el manual del
alumno y apagada para la lámina de pared.
