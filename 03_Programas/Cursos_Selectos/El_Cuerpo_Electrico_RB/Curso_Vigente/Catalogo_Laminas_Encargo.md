# Las seis láminas del Catálogo de puntos y nodos

**El Cuerpo Eléctrico · Documento de producción** — Dr. Miguel Ojeda Rios · Instituto Centrobioenergetica

---

# 1 · Qué hace cada lámina

**Las láminas van sin puntos ni números. El alumno los ubica.** Un punto que el alumno rastrea en su propio cuerpo desde la referencia escrita queda aprendido; un punto impreso se mira y se pasa de largo. `[procedimiento del método]`

**La silueta y la tabla comparten página**, la silueta a un costado y la tabla al lado, para leer la referencia y marcar sin voltear la hoja.

| | Lámina | Qué resuelve |
|---|---|---|
| **A** | Silueta anterior, limpia | Base de los puntos de superficie que se ven de frente |
| **B** | Silueta posterior, limpia | Base de los puntos de superficie que se ven de espalda |
| **C** | Proyección del tubo digestivo | Las once unidades del eje digestivo |
| **D** | Proyección hepática | Las cinco zonas del recorrido hepático |
| **E** | Proyección pancreática | Las cuatro zonas del páncreas endocrino |
| **F** | Territorios de tejido adiposo | Las cinco zonas rastreables desde la piel |

**Las cuatro viscerales llevan el órgano por veladura, no puntos.** «Epigastrio derecho hacia la línea media» y «epigastrio cruzando la línea media» son dos zonas distintas que nadie separa sin ver el órgano debajo: ahí la lámina da el dato que hace posible ubicar, no la respuesta que se le quita al alumno.

---

# 2 · A qué página del catálogo va cada una

| Página | Técnica | Lámina |
|---|---|---|
| 03 | Nodo de lesión | B — el orden fijo cae en zona renal, suprarrenal, hígado y bulbo |
| 04 | Red de diez puntos del eje craneosacro | B — la red desciende por el eje posterior |
| 05–08 | Mapa de nodos del eje transversal | A y B, según la región de cada página |
| 09 | Eje digestivo | C |
| 10–11 | Mapa hepático y segmentos de Couinaud | D |
| 12 | Mapa pancreático endocrino | E |
| 13 | Tejido adiposo | F |
| 14 | Nodos de inflexibilidad metabólica | A — los nueve son de cara anterior, salvo suprarrenales |
| 15–16 | Órgano inflamado y placa arterial | Sin lámina: no tienen zonas fijas |

---

# 3 · El estilo, heredado del manual del nodo de lesión

**No se inventa un sistema visual nuevo.** El manual del nodo de lesión ya fijó el suyo, y las láminas lo heredan:

```
Contorno         tinta #2C2C2A
Superficie       #E8EAEC, lavado frío #C8D0D8
Reparos          gris #888780, trazo fino
Acento           teal #0F6E56, solo en las zonas de la lámina F
Fondo            blanco #FFFFFF
```

**Motor y ajustes:** Nano Banana 2, 4K, nivel de pensamiento `high` —el prompt pasa de cinco restricciones—. Proporción 2:3 para cuerpo entero, 3:4 y 4:3 para torso.

---

# 4 · El orden de generación, y por qué importa

**La silueta anterior se cierra primero, y nada sigue hasta que esté bien.** Es la referencia de las otras cinco: un fallo ahí se multiplica por seis. Se revisan tres cosas antes de continuar — que no haya musculatura marcada, que no asomen prominencias óseas, y que los brazos estén completos sin corte.

**Las cinco restantes se piden adjuntando la anterior, con el rol declarado:** *«Use the attached image for the art style, the palette, the body proportions and the figure's identity.»* La referencia adjunta reproduce el sistema con mucha más fidelidad que repetir el prompt escrito.

**Los prompts completos están en el hilo de trabajo del 22 de agosto de 2026.** Los seis llevan `NO markers, NO dots, NO numbers, NO annotation lines` — la lámina sale limpia por diseño.

---

# 5 · Tres correcciones que van a hacer falta

**Un solo cambio por mensaje**, nombrando primero lo que se conserva. Una edición con tres asuntos aplica el primero y descarta los otros dos.

> **Figura musculada.** «La figura está demasiado musculada. Elimina toda la definición muscular — sin sixpack, sin pectorales redondeados, sin líneas de músculo en brazos ni piernas. El cuerpo como superficie continua y lisa, not athletic, not muscular. Mismo estilo, mismo tono #E8EAEC, misma composición.»

> **Órgano encima de la piel.** «El órgano se ve dibujado encima de la piel. Necesito veladura: la piel como lavada de acuarela translúcida a través de la cual el órgano se ve apenas debajo, no encima. Sin línea de incisión, sin borde de corte. Misma composición y mismo tono.»

> **Zonas con contorno.** «Las zonas tienen contorno. Quítalo: cada región como wash difuso de bordes desvanecidos que se funden con la piel alrededor. Sin línea de contorno, sin borde duro. Mantén todo lo demás igual.»

---

*Instituto Centrobioenergetica, 2026*
