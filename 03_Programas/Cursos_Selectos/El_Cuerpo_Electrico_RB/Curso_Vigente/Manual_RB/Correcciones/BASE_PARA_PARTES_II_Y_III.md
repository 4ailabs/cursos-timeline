# Lo que la corrección de la Parte I dejó como base

**30 de agosto de 2026.** La Parte I quedó cerrada: 25 capítulos, cero marcas de linter. Este
documento recoge lo que se aprendió, ordenado por lo que va a volver a aparecer en las Partes II y III.
Se lee junto a `REGLAS.md`, que tiene las reglas; aquí está el método y el inventario.

---

# 1 · Los ocho defectos, por lo que costaron

## 1 · La referencia al documento

El más frecuente de todos. Aparecía en casi todos los capítulos.

**Lo que espera:** 65 en la Parte II, 22 en la Parte III.

| Nunca | Se escribe |
|---|---|
| El riñón encabeza la secuencia porque **el capítulo 4 estableció** que la movilización iónica… | El riñón encabeza la secuencia porque la movilización iónica es el mecanismo por el que un tejido pierde su voltaje |
| Ver **capítulo 18** *(dentro del recuadro de la maniobra)* | Veinte minutos de promedio. La medición decide el retiro |
| conforme al **capítulo 19** | *(se dice la condición)* |

**El arreglo es siempre el mismo: se dice lo que el otro capítulo decía.** Una remisión dentro de una
secuencia operativa es peor que en el cuerpo del texto, porque el operador la lee junto a la camilla.

Se conservan solo las que enlazan dos capítulos que hacen lo mismo con marcos distintos.

## 2 · El encabezado

Son **tres criterios distintos**, y se estaban aplicando al revés.

| | Qué hace | Ejemplo |
|---|---|---|
| **Título de bloque** | Nombra su materia en registro técnico | El campo magnético: mecanismos, intensidad y alcance |
| **Título de capítulo** | Sintagma técnico, sin metáfora | El conjunto magnético · La escala del proceso |
| **Encabezado de sección** | Afirma algo comprobable | El gradiente alcanza su valor máximo entre dos polos opuestos y adyacentes |

Rechazados por rotular: *El instrumento*, *El indicador*, *La medición*, *Disciplina del rastreo*.
Rechazado por metáfora: *La regla del imán* — un imán no tiene reglas.

**Lo que espera:** 84 encabezados de sección en la Parte II, 13 en la Parte III.

## 3 · La personificación

El defecto que más se repitió, y el que el corrector vuelve a cometer con verbos nuevos.

| Nunca | Se escribe |
|---|---|
| el voltaje **guarda** el estado | el estado de referencia **es** un voltaje |
| un imán **entrega** 300 mT | la densidad **en su superficie es** de 300 mT |
| una fractura **pide** hueso | en una fractura los extremos **quedan** separados |
| el rastreo **devuelve** tres datos | del rastreo **se anotan** tres datos |
| **lo que manda** es la medición | el criterio de cierre **son** los talones parejos |
| el reloj **no retira** el imán | cumplidos los 20 minutos **se ejecuta** la verificación |
| la lectura **pregunta** si la restricción fue correcta | *(se elimina)* |

El linter ya lo caza: sujeto inanimado + verbo de intención. **La prueba manual, para verbos nuevos:
si el sujeto es una cosa, el verbo dice lo que esa cosa hace físicamente.**

## 4 · La palabra del glosario que el linter no veía

Varias estaban prohibidas desde antes y el linter no las alcanzaba.

| Palabra | Por qué se escapaba | Estado |
|---|---|---|
| **sostiene** | El parser del glosario tomaba «sostiene · sostener · sostenido» como una sola cadena | Corregido en `revisa_registro.py` |
| **la maquinaria** | Estaba en el linter y nadie lo había corrido sobre el manual | 0 en la Parte I |
| **la firma** | Iba con posesivo: «su firma propia» | 0 en la Parte I |
| **recorre**, **hay ruido**, **la búsqueda** | Estaban y no se habían aplicado | 0 en la Parte I |

**Lo que espera:** 13 «sostiene» y 5 «maquinaria» en la Parte II.

## 5 · El vocabulario prestado al pasado

Ni **dipolo**, ni **nodo**, ni **par**, ni **punto** se le atribuyen a nadie anterior al método. De un
trabajo previo se describe lo que hizo.

> Broeringmeyer registró los primeros 150 **dipolos** → registró las primeras **150 zonas del cuerpo
> que producen esa respuesta**.

Sin el segundo polo, que llegó con Goiz, Broeringmeyer no podía registrar pares.

## 6 · El contenido importado de otro registro

Dos casos, y los dos costaron un capítulo.

**Un ejercicio de clase no es una regla clínica.** «Predecir en voz alta qué se espera» venía de una
pausa didáctica del Módulo 2, donde el grupo predice antes de una demostración. Trasladado a la
sesión, quedaba el operador anunciándole al paciente qué espera encontrarle.

**Una fisiología ajena compite con el marco propio.** Los cuatro niveles del dolor eran el único
capítulo con fisiología no bioeléctrica, y daban una segunda respuesta a «por qué no funcionó»,
que el manual ya responde con las cinco letras. Salió a la Parte II.

## 7 · La afirmación más fuerte que la fuente

| El manual decía | La fuente dice |
|---|---|
| «dos operadores obtienen el mismo hallazgo» | «la coincidencia entre operadores **no se ha medido formalmente**» — Lección 4.1 |
| riñón, suprarrenal, hígado y bulbo interpretados por igual | «riñón, **establecido**; los otros tres, **tríada propuesta, en investigación**» — ficha 4.3 |
| «un imán sobre un líquido deja el pH sin cambio» | La literatura dice lo contrario, y además compara una solución con un tejido |

**En su lugar se afirma lo que sí se sostiene**, y se declara lo que falta. El manual ya lo hace en el
capítulo 7 con la configuración de dos polos, sin que eso lo debilite.

## 8 · El dato que el manual perdió al condensar las clases

El más rentable de corregir, y solo aparece yendo a la fuente. Ejemplos de la Parte I:

- La ley de atenuación, que explica por qué un imán de 300–500 mT funciona con una ventana de 2–80
- La prueba del bloqueo farmacológico del canal de calcio tipo T
- La normokaliemia con deficiencia tisular
- Las cifras publicadas de la densidad de carga fija, con sus cuatro fuentes
- Las cuatro piezas del conjunto magnético y el entrehierro
- Tres contraindicaciones de seguridad

---

# 2 · Cómo se corrige

1. **Leer la fuente antes que el párrafo.** El manual es una condensación; corregir la condensación
   reproduce lo que perdió.
2. **Pasar el texto propuesto por el linter antes de mostrarlo**, no después de aplicarlo.
3. **Un tramo por vez, y esperar.** Un bloque entero impide corregir: el defecto de la primera frase
   se arrastra por todas las demás.
4. **Cuando una palabra se marca, se busca en todo el archivo el mismo día**, y si el linter no la
   tiene, se agrega.
5. **Escribir en el archivo antes de pasar al tramo siguiente**, y volver a correr el linter.
6. **Preguntar antes de inventar.** En esta pasada se guardaron tres cosas por no poder verificarlas:
   la orientación «en cruz» de la rejilla, el signo del valor perineuronal, y la atribución de Cinti.
7. **Cuando el Dr. dice «ambiguo» o «raro», el defecto casi siempre es estructural**, no léxico: el
   tramo está en el registro equivocado, en el lugar equivocado, o no tiene contenido propio. Cambiar
   palabras ahí pierde turnos.

---

# 3 · Dónde está cada fuente

| Para qué | Dónde |
|---|---|
| Lo que se dijo en clase, con las cifras y los ejemplos | `Modulo_1/Curso_Video/Transcripciones_Ordenadas/` |
| Estructura, objetivos y **referencias bibliográficas completas** | `Modulo_1/Curso_Video/Clases_Didacticas/` |
| Lo que ocurrió en la jornada, con lo que se corrigió en vivo | `Modulo_2..4/Clases_Impartidas/` |
| El formalismo: K, Σ, Λ, el cono cognitivo, TAME | `~/cognicion-diversa-2026` |
| Fisiología ya escrita **con sus fuentes** | `Sitio_RB/Paginas/` y `Sitio_RB/Articulos/` |
| Notas de verificación sobre el linaje | `02_Base_Conocimiento/Par_Biomagnetico/` |
| El modelo clínico avanzado | `~/tratado-bioenergetica-bv4` |

---

# 4 · Lo que ya sabemos que hay en las Partes II y III

**Del inventario, antes de abrirlas:**

| | Parte II | Parte III |
|---|---|---|
| Referencias a capítulos | 65 | 22 |
| «sostiene» | 13 | 0 |
| «interrogar» | 25 | 1 |
| «lectura» | 7 | 1 |
| «maquinaria» | 5 | 0 |
| «par» | 2 | 0 |
| «nivela» / «isometría» | 8 | 0 |
| Encabezados de sección | 84 | 13 |
| Marcas de linter | 12 entre las dos | |

**Decisiones de la Parte I que arrastran:**

1. **La renumeración.** Con el capítulo del dolor fuera, todo lo que esté por encima de 24 se corre.
   Son 138 referencias entre los cuatro documentos y 33 encabezados numerados. Se hace de una vez, al
   final, cuando se decida en qué lugar de la Parte II entra ese capítulo.
2. **La placa de gradiente salió.** El alcance máximo del método baja de 6 cm a 4. Hay que revisar los
   ejes que contaban con los 6 cm — páncreas, hígado profundo.
3. **«Imán de bocina» pasa a «conjunto magnético»**, y su polo activo es **la pieza polar**. Dos
   apariciones en la Parte II.
4. **«Dipolo transversal» pasa a «bilateral».** La Parte II ya usa bilateral 10 veces, y su línea 441
   —*«Un nodo unilateral interroga el lugar. Un dipolo bilateral interroga el estado del cuerpo»*— es
   la formulación canónica; queda pendiente si «interroga» se cambia también ahí.
5. **«Acortamiento» e «isometría»** quedaron definidos en el capítulo 13, y en el resto del manual se
   dicen como se ven: **un talón más corto**, **los talones parejos**.
6. **El estatuto epistémico.** Riñón establecido; suprarrenal, hígado y bulbo en investigación. Cada
   eje de la Parte II que se apoye en esos tres nodos hereda ese estatuto.
7. **El catálogo de Goiz no se usa.** Cualquier «respetar el catálogo» en la Parte II remite a algo
   que ya no existe.

**Pendientes de contenido, sin resolver:**

- La **Λ**, el alcance, que `cognicion-diversa-2026` tiene y el manual no
- Los **trece y veintiséis minutos** de la pulsatilidad, sin fuente primaria
- La **resonancia magnética funcional** del iliopsoas, sin cita
- La **ameba y la planaria**, sin cita primaria

---

*Instituto Centrobioenergetica, 2026*
