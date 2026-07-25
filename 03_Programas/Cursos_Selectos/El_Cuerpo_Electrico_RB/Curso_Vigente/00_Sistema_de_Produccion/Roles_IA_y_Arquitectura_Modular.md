# Roles de IA y arquitectura modular del contenido
## Cómo trabajamos y cómo se secciona el material para reutilizarlo
### El Cuerpo Eléctrico · Formación en Regulación Bioeléctrica
**Dr. Miguel Ojeda Rios · Instituto Centrobioenergetica**

> Dos decisiones de producción: (1) los **roles** que la IA asume según la tarea, y (2) la **unidad de sección** que permite que cada bloque de contenido genere después slides, infografías, audio, quizzes y más material —y que se pueda abordar un tema o un módulo específico sin rehacer todo.

---

## 1. Los roles de IA (los "sombreros")

No es un solo rol: según lo que toca, asumo uno distinto. Cada uno produce algo específico y, cuando aplica, se apoya en una herramienta concreta que ya tengo disponible.

| Rol | Qué hace | Qué produce | Herramienta / skill |
|---|---|---|---|
| **1. Editor en jefe** *(activo)* | Visión del producto, coherencia global, decisiones editoriales, qué entra y qué no. | Programa, propuestas, criterios. | — |
| **2. Diseñador instruccional** | Aplica el estándar mundial: backward design, Bloom, umbrales, molde de 8 momentos, evaluación alineada. | Objetivos, secuencia, checkpoints, escalera de progresión. | Guía pedagógica |
| **3. Guionista (mente)** | Escribe el guion de teleprompter en tono clínico-docente, con las analogías del Dr. | Guiones de lección con marcas `[SLIDE]` y `[PAUSA Y HAZLO]`. | — |
| **4. Verificador científico** | Coteja cada afirmación contra el Tratado y las fuentes; cuida citas y **los límites**. | Bloques "Fundamento y referencias", correcciones. | Tratado RB (Cap. 1–22), WebSearch |
| **5. Terminólogo** | Mantiene la terminología única y el glosario; evita sinónimos sueltos. | Glosario, control de coherencia conceptual. | — |
| **6. Director de contenido visual** | De cada sección genera *briefs* y *prompts* para slides, infografías y diagramas. | Guiones de slide, prompts de imagen, diagramas. | `nano-banana-edu`, `visualize`, Figma |
| **7. Productor de audio** | Convierte secciones en cápsulas de audio, guiones de podcast o *audio overviews*. | Guiones TTS, podcast, resúmenes de audio. | `gemini-tts-script-builder`, `notebooklm` |
| **8. Diseñador de evaluación** | Crea preguntas de recuperación, quizzes, flashcards y autoevaluaciones. | Checkpoints, quizzes, flashcards. | `notebooklm` (quiz/flashcards) |
| **9. Localizador EN** | Versión en inglés con adaptación cultural de las analogías. | Lecciones EN alineadas 1:1. | — |
| **10. Arquitecto modular / bibliotecario** | Secciona y etiqueta el contenido para que sea direccionable y reutilizable. | Índice de secciones con tags. | — |

**Cómo pedirlos:** puedes decir *"ponte el sombrero de director visual y hazme los prompts de la Lección 1.3"*, o *"como diseñador de evaluación, arma el quiz de la Clase 1"*. Yo asumo el rol y produzco solo eso.

---

## 2. La unidad de trabajo: la SECCIÓN

Para que el curso no sea "una clase de corrido" sino material reutilizable, la unidad no es la lección: es la **sección**. Una sección = **una idea nuclear**. Cada lección se compone de varias secciones, y **cada sección es autónoma**: se puede convertir en un slide, una infografía, una cápsula de audio o una pregunta, por separado.

### 2.1 Identificador de sección

`M1·C1·L1.3·S04` = Módulo 1 · Clase 1 · Lección 1.3 · Sección 4.

Esto permite **abordar un tema específico** sin tocar el resto: *"regenérame S04"* o *"todas las secciones con tag `acidosis`"*.

### 2.2 Ficha de sección (lo que cada bloque lleva)

Cada sección se documenta con una ficha que es, a la vez, su **hoja de generación de contenido** (*content spawn sheet*):

- **ID + título** — p. ej. `M1·C1·L1.3·S04 — La densidad de carga fija`.
- **Idea nuclear** — una frase.
- **Nivel Bloom** y **¿umbral?** — para saber cuánto andamiaje merece.
- **Tags** — tema(s) para direccionar: `MEC`, `imán`, `rastreo`, `acidosis`, `Vmem`, `linaje`…
- **🎙️ Guion** — el segmento de teleprompter.
- **🖼️ Slide** — título en pantalla + contenido + frase-gatillo.
- **📊 Visual** — *prompt* de infografía/diagrama (para Nano Banana / Figma).
- **🔊 Audio** — cápsula de 30–60 s o aporte al podcast del módulo.
- **✅ Evaluación** — 1 pregunta de recuperación o flashcard.
- **📚 Fundamento** — la cita que la respalda.

Con esa ficha, **una sola sección alimenta cinco formatos** sin volver a pensar el contenido.

---

## 3. Cómo se aborda un tema o un módulo específico

Como cada sección está **etiquetada**, el material es direccionable de tres formas:

1. **Por lección/clase** — la ruta natural del estudiante (M1·C1·L1.3).
2. **Por tema (tag)** — reúno todas las secciones con `tag:acidosis` y armo una **cápsula temática** (video corto, carrusel, o audio) que cruza varias lecciones. Ideal para redes o para un repaso enfocado.
3. **Por formato** — extraigo todos los `📊 Visual` de la Clase 1 y genero un set de infografías; o todos los `🔊 Audio` y genero el podcast del módulo.

Así, del mismo backbone salen: el **curso** (ruta completa), **cápsulas temáticas** (por tag), **sets visuales**, **podcast**, **banco de preguntas** y la **versión EN**.

---

## 4. Del backbone a los materiales derivados

```
        SECCIÓN (idea nuclear + ficha)
                    │
   ┌──────┬─────────┼─────────┬──────────┐
 🎙️Guion 🖼️Slide  📊Infografía 🔊Audio  ✅Quiz
   │        │         │          │         │
 Video   Deck de   Carrusel/   Podcast/  Banco de
 clase   slides    posts       cápsula   preguntas
```

El video grabado es **uno** de los productos, no el único. El mismo contenido, ya seccionado, se despliega en visual, audio y evaluación.

---

## 5. Recomendación de flujo

1. **Terminar de sección­ar la Clase 1** (ya escrita) en fichas de sección con sus tags. Esto la vuelve la biblioteca base.
2. **Producir Clases 2–4** ya nativas en secciones (no hay que re-seccionar después).
3. A partir de la biblioteca, activar por demanda los roles 6–8 para generar **visual, audio y evaluación** de los temas que priorices.

---

*Instituto Centrobioenergetica, 2026 · Documento de producción*
