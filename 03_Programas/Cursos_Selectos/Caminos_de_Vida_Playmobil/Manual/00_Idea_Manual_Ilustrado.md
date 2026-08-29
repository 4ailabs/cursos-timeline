# Manual ilustrado de Los Cuatro Caminos

*Documento de arranque, 29 de agosto de 2026. Fija el alcance y el reparto de producción para desarrollarlo después.*

---

## 1. Qué se entrega y a quién

Manual operativo B5 que el participante se lleva del taller y usa después en consulta, con la lectura proyectiva ilustrada paso a paso. Sustituye a las notas que cada quien toma en clase.

Va dirigido a terapeutas y profesionales de la salud con consulta activa, los mismos del curso. Se entrega impreso en los dos módulos, y sirve como material de mesa durante la práctica supervisada.

---

## 2. El contenido ya está escrito, en 2,101 líneas

Esta es la razón por la que el proyecto es viable: **el texto existe y está validado.** Lo que falta es maquetarlo e ilustrarlo.

| Fuente | Líneas | Qué aporta |
|---|---|---|
| `02_Base_Conocimiento/TerapiaMunecosCaminos/Documento_Base_TerapiaMunecosCaminos.md` | 934 | Los cuatro caminos completos: características, beneficios, riesgos, motivaciones, miedos, sucesos implicados, reacciones biológicas y del sistema nervioso |
| `02_Base_Conocimiento/TerapiaConMunecos/Documento_Base_TerapiaConMunecos.md` | 823 | Fundamentos de la técnica, tres aplicaciones, seis temas de trabajo, lo obvio contra lo interpretativo, las cinco dimensiones |
| `02_Base_Conocimiento/TerapiaMunecosCaminos/Los_Caminos_de_Vida_y_Eventos_Vitales.md` | 344 | Los dos catálogos de eventos |
| `../Programa_Taller_Dos_Clases.md` §1, §7, §8 | — | El problema que resuelve, los cuatro casos tipo, las cinco fichas de mesa |
| `../Programa_Los_Cuatro_Caminos.md` | — | Los siete pasos del protocolo, las seis preguntas, los cinco elementos de observación |
| `../Sesion_Comentada_Responsabilidad_Heredada.md` | — | Sesión completa comentada, anonimizada, para el capítulo de caso |
| `../Webinar/Guion_Teleprompter_Webinar3.md` | — | Los tres mecanismos con referencias experimentales, para el capítulo de fundamento |

El programa del taller ya lo dice en su §8: *«No hay que escribirlo: hay que maquetarlo. Es la única producción que este taller necesita.»*

---

## 3. La producción se reparte en tres carriles

### Carril A — Láminas ilustradas, con la skill `nano-banana-edu`

Modo **Fineline**: tinta fineline y acuarela controlada sobre fondo blanco, calidad de publicación científica. Es el modo que la skill marca como default para manuales.

Candidatas, una por concepto:

| Lámina | Concepto |
|---|---|
| La caída | La figura soltándose sobre la hoja con los dos ejes |
| Los cuatro caminos | La roseta con las cuatro direcciones rotuladas |
| La dirección de los pies | Detalle de la lectura: hacia dónde camina la figura |
| La postura | Lo que dice el cuerpo más allá de la dirección: de espaldas, encorvado, caído |
| Quién mira a quién | Dos figuras y la orientación de sus miradas |
| El camino bloqueado | Una figura atravesada en el paso de otra |
| La familia sobre la hoja | El sistema completo, siete figuras |
| El reposicionamiento | La figura movida a la posición elegida |

**Series con figura consistente.** La skill lo resuelve cerrando la primera lámina y adjuntándola como referencia en las siguientes, con instrucción corta: *«same style, same palette, same lighting as Image A — now [nueva vista]»*. Reproduce el sistema mejor que repetir el prompt. Si la escena necesita cinco figuras consistentes a la vez, el modelo es Nano Banana Pro.

**Resolución 4K**, que es lo que pide la impresión a 380 dpi del sistema B5.

### Carril B — Diagramas de proceso en SVG, escritos a mano

Los algoritmos del manual del nodo de lesión se dibujan en SVG, no se generan. La razón se sostiene aquí: el color tiene que coincidir exacto con el acento del manual, y un diagrama generado no se corrige después sin regenerarlo entero.

| Diagrama | Contenido |
|---|---|
| El protocolo | Los siete pasos, de la pregunta de trabajo al cierre |
| Los tres registros | Evento, patrón y dinámica familiar, apilados bajo la dirección |
| Los cuadrantes | Qué se lee cuando la caída queda entre dos direcciones |
| Los cinco elementos de observación | Dinámicas, comparación, intersecciones, interacciones, jerarquía |
| Criterios de exclusión | Árbol de decisión: cuándo se aplica y cuándo se deriva |

### Carril C — Renders 3D que ya existen

En `~/centrobioenergetica-videos/public/images/anuncio-cuatro-caminos/` hay doce renders del muñeco amarillo sobre fondo azul noche. Sirven para la **portada** y para las separatas de sección, donde el modo cinematográfico corresponde. No entran al interior del manual, que va sobre blanco.

---

## 4. El sistema de estilo se hereda del manual del nodo de lesión

Documentado en la memoria `reference_estilo_manuales_rb`, y aplicado ya en `El_Cuerpo_Electrico_RB/Referencia/Punto_Trauma/Manual/`. Lo que se toma tal cual:

- **B5, 176 × 250 mm.** Papel blanco puro `#FFFFFF`.
- **Una sola familia tipográfica**, sans humanista limpio, con jerarquía por peso. Sin serif en ninguna parte.
- **Sin negritas en el cuerpo.** La estructura carga el énfasis: pasos numerados, subtítulos, tablas, callouts.
- **Acento único teal `#0F6E56`.** Callouts en recuadro neutro con filete teal.
- **Figuras a todo el ancho o en su propia página.** Nunca figura alta flotada junto al texto.
- **Si no cabe, se añade página.** No se comprime.
- Export con Puppeteer 4x a ~380 dpi, canto de encuadernación +12 mm alternado, hoja en blanco tras la portada.

**Punto de fricción a resolver antes de generar la primera lámina:** los ejemplos Fineline de la skill usan acuarela ámbar (`#E8A33D`) como color de énfasis, y el sistema B5 del Instituto tiene el interior en teal y excluye el coral y el rojo. Las láminas de este manual llevan **el énfasis en teal**, y eso se escribe en el prompt base antes de cerrar la primera imagen — porque a partir de ahí las demás la copian por referencia.

---

## 5. Lo que queda por decidir

1. **Extensión y estructura de capítulos.** El manual del nodo de lesión terminó en 24 páginas. Aquí hay dos módulos y más contenido de catálogo.
2. **Qué hacer con las cinco fichas de mesa** del §8: capítulo dentro del manual, o cuadernillo suelto plastificado para usar sobre la mesa durante la sesión.
3. **Si el caso comentado entra completo** como capítulo, o resumido a los momentos que ilustran cada paso del protocolo.
4. **Si los dos catálogos de eventos van íntegros** —diez categorías de eventos vitales y setenta transgeneracionales— o en versión de consulta rápida.
5. **Idioma.** El manual del nodo de lesión tiene versión en inglés.

---

*Instituto Centrobioenergetica — Dr. Miguel Ojeda Rios*
