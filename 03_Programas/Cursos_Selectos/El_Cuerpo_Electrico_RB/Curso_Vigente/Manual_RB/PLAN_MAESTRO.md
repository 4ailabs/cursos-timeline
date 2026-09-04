# Plan maestro · Manual de Regulación Bioeléctrica

**El Cuerpo Eléctrico** — Dr. Miguel Ojeda Rios · Instituto Centrobioenergetica

---

# 1 · Qué se va a producir

Un **cuadernillo impreso B5 de 176 × 250 mm** con la Parte I del manual: el fundamento común a todos los ejes.

**Es un objeto distinto de los Manuales de Trabajo de los Módulos 1, 2 y 3.** Aquellos son cuadernillos de ocho páginas para la jornada de clase, y se llenan durante la sesión. Este se consulta durante la práctica clínica, y las tres partes juntas forman el manual del método.

| | Manual de Trabajo | Manual del método |
|---|---|---|
| **Para qué** | Seguir la clase del día | Consultar durante la práctica |
| **Extensión** | 8 páginas | Alrededor de 24 páginas por parte |
| **Vida útil** | La jornada | Permanente, con revisiones |
| **Contenido** | El bloque que se imparte ese día | El procedimiento completo, sin depender de qué módulo lo enseñó |

---

# 2 · El sistema de diseño se hereda y no se vuelve a discutir

Se aplica el sistema ya resuelto en el manual del nodo de lesión y en los Manuales de los Módulos 2 y 3.

**Página y composición:** B5 de 176 × 250 mm, **columna única**, márgenes de trabajo, medida de línea cercana a 64 caracteres.

**Color:** teal `#0F6E56` como acento único. Coral `#D85A30` **solo para alertas y hallazgos**, nunca decorativo. Tinta `#2C2C2A`, papel `#FCFBF7`, línea `#DEDBD2`.

**Marca:** el dipolo —dos círculos y una línea, el segundo nodo al 35 % de opacidad— y la línea de endorsement del Instituto al pie de cada página.

**Jerarquía:** versalitas, espaciado y tamaño. No por negritas ni por color.

**Lo que no se hace:** cajas rellenas con barra lateral de color, emojis como marcadores, sombras, degradados, texto centrado, márgenes simétricos con texto a todo el ancho.

---

# 3 · Qué cambia en el contenido antes de maquetar

## 3.1 · Las etiquetas de estatuto salen del impreso

Las marcas de evidencia, procedimiento y derivación **no aparecen en la página impresa**.

**Se conservan en el markdown maestro y el constructor las retira al generar el HTML.** Así el equipo mantiene la distinción entre lo publicado y lo que es procedimiento propio, y la página queda limpia.

## 3.2 · Los siete diagramas en monoespaciada pasan a figura

Hoy son bloques de texto entre acentos graves. En el impreso se reparten en dos tipos:

| Diagrama | Capítulo | Qué será |
|---|---|---|
| La cascada del voltaje a las variables del medio | 3 | **Figura SVG** vertical, con el flujo de arriba abajo |
| La posición de medición | 12 | **Figura SVG**: silueta en decúbito supino, extremidades elevadas, línea de referencia |
| La formación de la isla bioeléctrica, en cuatro pasos | 13 | **Bloque de procedimiento** numerado |
| Los cinco pasos del rastreo | 14 | **Bloque de procedimiento** con las bifurcaciones marcadas |
| La rejilla de dos por dos | 16 | **Figura SVG** con las polaridades alternadas |
| La placa de gradiente, en corte | 9 | **Figura SVG** de sección, con las tres piezas rotuladas |
| La prueba de polaridad del imán de bocina | 9 | **Bloque de procedimiento** de tres pasos |

**Las figuras se dibujan en line-art plano**, contorno de tinta a 1.25 pt y reparos anatómicos en gris a 0.75 pt, según la norma de figuras del sistema.

## 3.3 · Las citas del Dr. quedan como cita destacada

Las cuatro citas textuales que sobrevivieron a la edición —el alcance en O, C y algo de E; el criterio de falsación; lo que hace un imán; y la explicación al paciente— se maquetan como cita con filete teal, y no como párrafo corrido.

---

# 4 · La estructura del cuadernillo, página por página

| Página | Contenido | Capítulos |
|---|---|---|
| **01** | Portada | — |
| **02** | Índice y ruta del manual | — |
| **03–05** | Qué evalúa el método, de dónde sale, el voltaje como variable que organiza | 1 a 3 |
| **06–07** | La matriz extracelular y el cuerpo como agente de clase B | 4 y 5 |
| **08–10** | El imán: qué hace, cuál se usa, el gradiente, la bocina y la placa | 6 a 9 |
| **11–12** | Nodo y dipolo, y el iliopsoas como indicador | 10 y 11 |
| **13–14** | La medición, con su figura | 12 |
| **15** | La isla bioeléctrica | 13 |
| **16–18** | La regla del rastreo y la lectura de cada nivel | 14 y 15 |
| **19** | La rejilla y los tiempos | 16 y 17 |
| **20–21** | Cribado, banderas rojas y cuadros que se derivan | 18 a 20 |
| **21–22** | La ficha, el mapa y las reglas para formular un rastreo | 21 a 23 |
| **23** | El quíntuple, el alcance y lo que hace un imán | 24 y 25 |
| **24** | Tarjeta de referencia: la regla del rastreo, el orden distante, los tiempos y las banderas rojas, en una sola cara |
| **25** | Colofón y créditos |

**Alrededor de veinticinco páginas.** El número exacto lo fija la paginación automática del constructor.

---

# 5 · El manual está compuesto en cuatro salidas

El manual completo, con las tres partes en un solo volumen. 107 páginas en B5 y 117 en Carta.

**Carta no es B5 ampliado.** La caja de texto de Carta mide 152 mm y la de B5, 124 mm. Con el mismo cuerpo de letra el párrafo ocupa los mismos 113 mm en las dos, y en Carta deja 39 mm de blanco muerto a un costado mientras las tablas sí llegan al borde de la caja. **El cuerpo de Carta se escala en 1.345, que es la razón entre las dos cajas**, de modo que el párrafo llena su medida y la línea sigue siendo de 74 caracteres en los dos formatos. El cuerpo queda en 8.6 puntos en B5 y en 11.6 en Carta.

| Pieza | Archivo |
|---|---|
| Constructor | `build_manual_rb.py`, con la paginación medida en el navegador |
| Verificador | `verifica.py`: desbordes, folios, cabezas de capítulo y huecos |
| Hojas de estilo | `estilo_b5.css` es la única que se edita a mano |
| Derivación | `genera_estilos.py` saca de ella las otras tres: Carta, y las dos de blanco y negro |
| Salidas | `Manual_RB_B5` · `Manual_RB_Letter` · `Manual_RB_B5_BN` · `Manual_RB_Letter_BN`, en HTML y PDF |

## Las reglas de composición que el constructor aplica

- **Medianil interior de 32 mm y margen exterior de 20 mm, en espejo.** El folio y la cornisa van al canto exterior: a la derecha en recto, a la izquierda en verso.
- **Cornisa de verso con el bloque, de recto con el capítulo en curso.** En portadilla de parte y en apertura de bloque no hay cornisa.
- **Cada parte abre en recto**, con portadilla, numeral romano al 22 % y la lista de sus bloques. El verso queda en blanco.
- **Cada bloque abre en página nueva**, con su apertura y su epígrafe en cursiva.
- **Título de capítulo y epígrafe viajan juntos** y arrastran al menos 22 mm de contenido: ninguna cabeza cierra página.
- **Un subtítulo o un rótulo de zona arrastra el bloque que rotula.** Si lo que sigue es partible, le basta con arrastrar su primer trozo.
- **Las tablas de más de 7 filas se parten entre páginas repitiendo el encabezado.** Las cortas no se parten.
- **Los árboles de decisión de más de 24 líneas se parten por sus pasos numerados**, y el trozo siguiente lleva la marca «continúa».
- **La medida de línea es de 74 caracteres en los dos formatos**, y el párrafo llena su caja. Cita, procedimiento y filete no se parten.
- **La altura de cada bloque se mide en el navegador**, y no se estima.

## Ninguna página se da por buena sin haberla medido

```bash
python3 genera_estilos.py                 # las tres hojas derivadas
python3 build_manual_rb.py b5             # y letter, bn-b5, bn-letter
python3 verifica.py Manual_RB_B5.html
```

El verificador da cuatro cosas: si alguna página desborda, si algún folio quedó del lado equivocado, si alguna cabeza de capítulo cierra página sola, y qué páginas quedan con poca mancha. **Ninguna página se da por buena sin haberla medido.** El hueco medio al pie es de 31 mm, y los mayores corresponden a la página que antecede a la apertura de un bloque.

---

# 6 · El constructor lee el markdown y saca cuatro formatos

Se copia el constructor del Módulo 3 a esta carpeta y se adapta a la fuente de la Parte I.

```
01_Parte_I_Fundamento_y_Rastreo.md      fuente única de contenido
            │
            ▼
build_manual_parte1.py                  parsea, retira las etiquetas de estatuto,
            │                           mide la altura de cada bloque y pagina
            ▼
estilo_b5.css · estilo_letter.css       hojas de estilo heredadas
estilo_bn_b5.css · estilo_bn_letter.css
            │
            ▼
cuatro salidas HTML  →  cuatro PDF
```

**Las cuatro salidas:** B5 a color, B5 en blanco y negro, Carta a color, Carta en blanco y negro. La versión en blanco y negro existe para que el alumno la imprima en casa.

---

# 7 · El orden de construcción

**Se construye por partes.** El manual del nodo de lesión se hizo así después de que hacerlo de un tirón produjera trabajo perdido.

1. **El sistema primero.** Se copia y adapta el constructor y las cuatro hojas de estilo. Se genera una salida de prueba con dos capítulos para verificar que la paginación funciona.
2. **La portada y el índice.** Se aprueban antes de seguir.
3. **Los capítulos, en bloques de tres o cuatro.** Cada bloque se genera, se mide y se revisa antes de pasar al siguiente.
4. **Las figuras**, una por una, sobre el bloque de texto que ya esté aprobado.
5. **La tarjeta de referencia y el colofón.**
6. **Las cuatro salidas finales**, con verificación de formato.

## La verificación de cada paso

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=salida.pdf "file://$PWD/PAGINA.html"

grep -a -o "/MediaBox \[[^]]*\]" salida.pdf | sort -u   # [0 0 498.96 708.96] = B5
grep -a -o "/Count [0-9]*" salida.pdf | head -1          # el número de páginas esperado
```

**Ninguna página se da por buena sin haberla medido.**

---

# 8 · Faltan las figuras, la tarjeta de referencia y tres decisiones

1. **La lectura de cada nivel del dipolo tiene dos versiones en el material** —la clínica y la mecánica— y el manual impreso necesita una sola. Es la decisión que bloquea el capítulo 15.

2. **La figura de la posición de medición** puede dibujarse en line-art vectorial o generarse como ilustración. El line-art vectorial se imprime nítido en blanco y negro y se corrige sin volver a generarlo.

3. **La tarjeta de referencia de la página 24**: si se imprime en la misma hoja o en cartulina aparte, para que se use junto a la camilla.

4. **Si la Parte I se encuaderna sola** o se espera a tener las tres partes para un volumen único. Encuadernarla sola pone la Parte I en manos del grupo desde ahora.

---

*Instituto Centrobioenergetica, 2026*
