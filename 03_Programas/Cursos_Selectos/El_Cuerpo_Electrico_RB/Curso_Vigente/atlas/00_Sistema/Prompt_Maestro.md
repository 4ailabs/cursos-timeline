# Prompt maestro del atlas de nodos

**Instituto Centrobioenergetica · agosto 2026 · Atlas del mapa de nodos del eje transversal**

Motor: **Nano Banana 2** · cuadrado 1:1 · **4K** · nivel de pensamiento **High**.

El nivel de pensamiento por defecto es Mínimo, y con él la lámina obedece las primeras
restricciones y descarta el resto. Hay que subirlo a High en cada generación.

---

## La lámina generada lleva cuerpo y hueso, y nada más

Puntos, polaridad, cuerdas del dipolo, numeración y cualquier estructura nerviosa se
montan después en la capa vectorial. La lámina es neutra: la misma sirve para cualquier
punto que se marque encima.

Con eso desaparecen los tres problemas que costaron diez generaciones: el relieve de
superficie convertido en diana o en agujero, el nervio colocado sobre el contorno, y la
notación fuera de sitio.

---

## Prompt maestro

```
Medical illustration in the style of Frank Netter's Atlas of Human Anatomy, pure
white background (#FFFFFF), posterior view of the head and neck of an adult figure
with natural proportions — not athletic, not muscular, average body composition —
cropped from the crown down to the upper slope of both shoulders, with generous
negative space around the figure. Body surface in very pale cool-neutral tone
(#E8EAEC), built with variable-weight ink brush lines and loose controlled
watercolor washes in cool blue-grey (#C8D0D8, #B8C4CC), the brushwork visible, the
surface smooth and continuous with full soft tissue coverage throughout. Skin
painted as a delicate cool-neutral translucent watercolor wash, through which only
the structures lying immediately beneath the visible back surface are faintly seen
— the back of the skull and the chain of the neck bones — and nothing from the far
side of the body: no jaw, no facial bones, no anterior structures. Those structures
are drawn beneath the skin, not on top of it, with a gradual painterly transition
and no incision line, no cutaway edge and no surgical section. The figure ends in a
clean gradual fade at the bottom, with no loose watercolor blob below the
shoulders. Single soft light from the upper left at 5000K, matte throughout, no
gloss, no specular highlight, no cast shadow. NO hair, NO warm tones, NO muscles,
NO muscle definition, NO bony prominences, NO surface landmarks, NO dimples, NO
depressions, NO nerves, NO vessels, NO teal, NO colour of any kind, NO anatomical
bodysuit, NO gloss, NO smooth 3D render, NO grid, NO background elements, NO
photorealistic rendering, NO CGI, NO text, NO numbers, NO labels, NO arrows, NO
dots, NO circles, NO rings, NO frame, NO watermark, NO sparkle.
```

Se corre **una sola vez**, para fundar la lámina 01. Las catorce vistas restantes salen
adjuntando esa imagen como referencia — ver `Instrucciones_Vistas.md`.

---

## La paleta

| Elemento | Valor |
|---|---|
| Fondo | `#FFFFFF` blanco puro |
| Superficie del cuerpo | `#E8EAEC` frío muy pálido |
| Lavadas de acuarela | `#C8D0D8` · `#B8C4CC` gris azulado frío |
| Acento | `#0F6E56` teal — **solo en la capa vectorial**, nunca en la lámina generada |

---

## Las cinco reglas de lámina

1. **Solo asoma lo que está bajo la cara visible.** En vista posterior se ve el occipital
   y la columna cervical. Nunca la mandíbula, la cara ni las clavículas, que quedan del
   lado opuesto del cuerpo.
2. **La estructura profunda va debajo de la piel, nunca encima.** Se pide como veladura:
   lavada translúcida con transición gradual y pictórica. Las palabras *cutaway*,
   *incision line* y *surgical section* producen cortes quirúrgicos y quedan prohibidas.
3. **Ningún hueso se nombra en la superficie.** Nombrar un hueso lo convierte en
   prominencia visible. Los nombres solo aparecen dentro de la frase de veladura.
4. **La lámina no lleva color.** El teal entra en vector.
5. **La figura termina en desvanecido limpio**, sin filo recto y sin mancha de acuarela
   suelta bajo los hombros.

---

## Correcciones por edición

Un solo cambio por mensaje, bloqueando primero lo que se conserva. Una edición con tres
asuntos aplica el primero y descarta los otros dos.

```
Keep the figure, the palette, the lighting and the composition exactly as they are.
Change only [un solo elemento] to [estado deseado].
Do not redraw, do not restyle, do not move anything else. No text.
```

Fallas frecuentes y su corrección:

| Sale | Se pide |
|---|---|
| Superficie lisa de render, sin pincelada | `visible variable-weight ink brushwork and watercolor washes, no smooth 3D render` |
| Brillos especulares | `remove every gloss and specular highlight, matte watercolor throughout` |
| Mandíbula o cara asomando en vista posterior | `only structures beneath the visible back surface, nothing from the far side of the body` |
| Mancha de acuarela flotando bajo los hombros | `clean gradual fade at the bottom, no loose watercolor blob` |
| Destello de cuatro puntas | `delete the four-pointed sparkle` |
| Brazo cortado con hueso en sección | `NO arms in frame`, o el brazo completo en el encuadre |
