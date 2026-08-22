# Cómo se trabaja en esta carpeta

Material escrito del sitio público de Regulación Bioeléctrica. Rige además `cursos-timeline/CLAUDE.md`,
que está un nivel arriba y define el registro de todo el repositorio.

---

## El entregable es el documento, y nadie toca Framer

El sitio vive en un proyecto de Framer llamado **Instituto**, en las rutas bajo
`/regulacion-bioelectrica`. En ese proyecto no se crea, no se edita y no se publica nada. Quien
carga es el Dr. Ojeda Rios.

Leer el proyecto para analizar una página sí está permitido, con la skill `framer`:

```bash
npx @framer/agent@latest session new "<url del proyecto>"
```

y después consultas de lectura con `framer.agent.getNodesOfTypes` y `serializeNodes`. Nunca
`applyChanges` ni `publish`.

---

## El lector es público general, no el alumno del curso

Quien lee estas páginas no tomó el curso y no va a tomarlo necesariamente. Eso deja fuera el
iliopsoas, la lectura del perfil bioeléctrico, las cuatro vías del campo y cualquier detalle de
maniobra. Todo eso pertenece a Método, a Formación o al manual.

Lo que entra: el hecho, el experimento que lo respalda, la cifra y su fuente.

---

## El texto afirma; no se justifica ni se enuncia en negación

No se escribe ningún texto que justifique el método, que esté construido en negación, ni que
argumente en su contra. Quedan fuera del sitio público:

- Los apartados de tipo «qué no hace», «hasta dónde llega lo establecido» o «esto todavía es
  hipótesis».
- Las etiquetas que califican las propias afirmaciones: `EVIDENCIA`, `DERIVADO`, `INTERPRETACIÓN`.
- Las comparaciones polémicas con otras técnicas.

Los criterios de derivación, las contraindicaciones y los límites de alcance existen y se enseñan:
viven en el Manual del Módulo 2, Bloque 1, y en la formación, como parte del procedimiento.

El chip de metadatos de cada tarjeta lleva la fuente, y nada más: `Levin & Stevenson 2012`.

---

## Un principio afirma algo comprobable; una regla dice qué hace el operador

Confundir las dos cosas fue el defecto de la primera versión de la página de Principios.

**Principio:** «Cada órgano persigue una meta y defiende un punto de ajuste.» Se afirma sobre el
cuerpo o sobre la acción del método, y se puede comprobar.

**Regla del procedimiento:** «Solo se aplica donde el rastreo responde.» Dice qué hace el operador
en la camilla, y va en Método o en Formación.

**Definición:** «Potencial de membrana: diferencia de voltaje entre…» Va en Conceptos, dentro de
Biblioteca.

---

## El registro: divulgación clínica

Se le explica a un lector inteligente que no es del gremio, con la misma precisión con que se le
explicaría a un colega. Las reglas completas están en `00_Guia_de_Estilo.md`. Las cuatro que más se
incumplen:

**Abre con el hecho**, no con la definición. Un experimento, una cifra, un paciente que dice algo.

**La cifra y la fuente van dentro de la frase** que hace la afirmación. Al final, la lista de
fuentes con autor, revista y año.

**Cada verbo dice qué ocurre físicamente.** Las uniones comunicantes se cierran. El potasio sube a
20 milimolar.

**Cierra afirmando.** Sin resumen, sin invitación, sin pregunta al lector, sin frase de remate.

Nada de metáforas, de aforismos de cierre, de lenguaje poético ni de muletillas de inteligencia
artificial. La lista de palabras marcadas vive en `_Herramientas/GLOSARIO_RB.md`, y el revisor las
señala una por una con el reemplazo que les toca.

---

## Antes de entregar cualquier archivo

```bash
python3 _Herramientas/revisa_registro.py <ruta> --nuevos
```

Ninguna marca se entrega sin resolver. Y después de cada corrección se pega en el chat el texto
completo resultante, limpio y de corrido, nunca solo el fragmento cambiado.

---

## Ninguna afirmación se escribe sin fuente

Todo sale de los manuales del curso, en
`El_Cuerpo_Electrico_RB/Curso_Vigente/Modulo_*/Manual_de_Trabajo/`, y del Tratado, en
`El_Cuerpo_Electrico_RB/Fundamentos_Cientificos/Regulacion-bioelectrica/`.

Las citas se copian de la sección «Referencias del bloque» del manual correspondiente, o se
verifican en la web con `WebSearch`. Nunca se completan de memoria: revista, volumen y páginas
inventados ya ocurrieron una vez y hubo que corregirlos.

---

## Qué hay en cada subcarpeta

```
Sitio_RB/
  CLAUDE.md                 este archivo
  00_Guia_de_Estilo.md      registro, extensión y construcción de cada pieza
  00_Mapa_del_Sitio.md      qué existe, en qué estado y a qué ruta de Framer corresponde
  Paginas/
    Portada/                un archivo por bloque, más el estado de lo publicado
    Principios_del_Metodo.md
  Articulos/                los ocho artículos y su plan editorial
    Retirados/              lo que salió del sitio y no se publica
  Figuras/                  las figuras hechas y las que faltan, con su dato y su fuente
```

`00_Mapa_del_Sitio.md` se actualiza cada vez que una pieza cambia de estado.

---

## La página de Método es el único hueco del sitio

Está sin redactar. Ahí caen el instrumento, el
procedimiento y la sesión que salen de la portada, más lo que hoy no está en ninguna parte: para qué
problemas se usa, qué se siente, cuántas sesiones hacen falta, qué es la medición de las piernas y
la comparación de intensidad con una resonancia magnética.
