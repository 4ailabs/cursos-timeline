# README — Curso grabado · El Cuerpo Eléctrico (Módulo 1)
### Empieza aquí. Directrices, estado y decisiones del proyecto.
**Dr. Miguel Ojeda Rios · Instituto Centrobioenergetica**

> Documento de arranque. Si retomas el proyecto (o se pierde el hilo), lee esto primero: qué es, cómo está, con qué reglas se produce, y qué falta. El blueprint completo vive en `00_Estructura_Maestra_Formacion.md`.

---

## 1. Qué es

El **curso de Regulación Bioeléctrica grabado**, para venta al público que no fue a la clase en vivo. El Dr. graba leyendo un **teleprompter** y monta sus propios slides. Cada lección tiene un **guion maestro** (para editar) y un **export de teleprompter** (para leer al aire). Es formación profesional, audiencia mixta.

---

## 2. Estado (tablero)

**MÓDULO 1: COMPLETO — 15 lecciones en 4 clases.** Todas fundamentadas, en el registro calibrado, con su export de teleprompter.

| Clase | Lecciones | Estado |
|---|---|---|
| **C1 · El Cuerpo Eléctrico** | 1.1 qué es · 1.2 linaje · 1.3 MEC · 1.4 Vmem | ✅ |
| **C2 · Instrumento y Sustrato** | 2.1 campo↔tejido · 2.2 el imán · 2.3 sustrato | ✅ |
| **C3 · El Agente y la Regulación** | 3.1 agente/TAME · 3.2 persuadibilidad/ojo · 3.3 macrófago/regular no es curar · 3.4 mantenimiento/punto trauma | ✅ |
| **C4 · El Rastreo y el Nodo de Lesión** | 4.1 rastreo · 4.2 acidosis temporal/latente · 4.3 nodo T1 local/T2 distante · 4.4 T3 rejilla+combinada/cierre | ✅ (alineada al manual B5) |

**Pendiente (tareas abiertas):**
- [ ] **Cápsula piloto "la salamandra"** en `.dc.html` (estilo del usuario, narración ElevenLabs) — *siguiente*.
- [ ] Más **cápsulas Remotion** (ver `Capsulas_Video_Remotion_Modulo1.md`).
- [ ] **Versión EN** de las 15 lecciones.
- [ ] **Seccionar C2–C4** en la biblioteca (C1 ya está en `Indice_Secciones_Clase1.md`).
- [ ] **Derivados** desde secciones: infografías, podcast, quizzes.
- [ ] **Pre-diseñar el Módulo 2** antes de la clase en vivo (25 jul 2026).

---

## 3. Directrices (las reglas — obligatorias)

**Registro / voz**
- Profesional y **accesible a audiencia mixta** (médicos, psicólogos, kinesiólogos, terapeutas, interesados). Sin jerga médico-exclusiva.
- **Nada de infomercial ni coaching:** prohibido "te voy a poner una escena", "seguramente ya viviste", "quédate con esto", "lo que vas a aprender hoy", cierres sentimentales. Abrir con el **hecho clínico en seco**, declarativo.
- Sin defensivas ni muletillas de IA; sin "no es X, es Y" como muletilla.

**Encuadre**
- La RB lee y regula un **estado**, no trata enfermedades: encuadrar en **salutogénesis y mantenimiento** tanto como en recuperación. Evitar el marco médico-céntrico (glucosa/HOMA/metformina) como marco principal.

**Vocabulario**
- **Nunca asumir:** glosar cada término técnico en su primera aparición, en lenguaje llano (tesla, homeostasis, Vmem, FCD, glicación, iliopsoas…).
- Términos fijos: "microambiente tisular" (no "terreno") · "nodo de lesión" · "acidosis temporal" (no "corrección renal") · **Vmem primario / pH derivado** · "Ojeda Rios" sin acento.

**Maniobras (Clase 4)**
- **No simplificar:** cada maniobra con rúbrica completa — polo, cara del imán, comprobación, orden, tiempo. Convenciones: negativo = Norte (rastreo) · positivo = Sur (complementario) · referencia = talón izquierdo.

**Producción**
- **NO diseñar slides** — el usuario las hace con su estilo. Solo marcar `[SLIDE X]` en el guion.
- Cada lección = **molde de 8 momentos** (recuperación · objetivo · gancho · concepto en trozos · imagen/analogía · fundamento · anclaje clínico · comprobación · cierre) + **"pausa y hazlo"** (mente y mano, MIT).
- Dos salidas por lección: **maestro `.md`** + **export teleprompter `.txt`**. El export se regenera con el script (no se edita a mano).

*(Detalle pedagógico en `Guia_Pedagogica_Estandar_Mundial.md`.)*

---

## 4. Fuentes de verdad (de dónde sale el contenido exacto)

| Para… | Fuente | Ubicación |
|---|---|---|
| **Técnicas del nodo de lesión (Clase 4)** | Manual **B5 "El nodo de lesión"** (p07–14) + Protocolo Clínico | `Referencia/Punto_Trauma/Manual/` y `.../Documentos_Fuente/Protocolo_Clinico_Tecnica_Trauma_RB.md` |
| **Fundamento científico + citas** | **Tratado RB** (22 caps.) | `Fundamentos_Cientificos/Regulacion-bioelectrica/Tratado_RB_Cap01..22` |
| **Contenido y voz del Dr.** | Transcripciones ordenadas + manual de trabajo | `Transcripciones_Ordenadas/` y `Manual_de_Trabajo/Modulo_1_Bloque_1..4` |
| **Marco del agente (TAME)** | Manual Bloque 3 + Tratado Cap. 3 | (idem) |

Mapeo módulo→Tratado: C1 = Cap 1–3 · C2 = Cap 4–6 · C3 = Cap 3/13/16 · C4 = manual B5 + Protocolo.

---

## 5. Decisiones tomadas (no re-litigar)

- **Estructura de técnicas = manual B5:** Apertura (acidosis temporal + latente) → Nodo de lesión (T1 local · T2 distante, orden fijo renal→suprarrenal→hígado→bulbo→cuerpo) → T3 rejilla (**la combinada es variante, no técnica aparte**).
- **Inducción de tono vagal → Módulo 2** (no se cubrió en el M1 en vivo).
- **Clase 3 ampliada a 4 lecciones** por densidad (los conceptos umbral).
- **Límites honestos** siempre presentes: Levin no usó imanes estáticos (extrapolación); BEV no validada por ensayos; la config. de 2 imanes no verificada; el riñón regula el **K⁺**, no "el pH".
- **Citas REM** de la técnica 5: pendientes de revisión (ver investigación punto trauma) — se resuelven al producir M2.

---

## 6. Mapa de documentos

**Diseño / dirección**
- `00_Estructura_Maestra_Formacion.md` — blueprint de toda la formación + máquina de producción de 7 pasos.
- `Guia_Pedagogica_Estandar_Mundial.md` — estándar (Harvard/MIT/ciencia del aprendizaje), molde de 8 momentos, conceptos umbral.
- `Roles_IA_y_Arquitectura_Modular.md` — los 10 roles de IA + la unidad "sección".
- `Programa_Modulo1_Evolucionado.md` · `Propuesta_Clases_Didacticas_Modulo1.md` — programa y método editorial.

**Producción**
- `Clases_Didacticas/Clase_1..4/` — **guiones maestros** (15 lecciones).
- `Guiones_Teleprompter/Clase_1..4/` — **exports `.txt`** para leer al aire.
- `Transcripciones_Ordenadas/` — mañana y tarde, sin perder información.
- `Indice_Secciones_Clase1.md` · `Secciones_Demo/` — biblioteca modular (secciones con ID + tags).
- `Capsulas_Video_Remotion_Modulo1.md` — qué conceptos hacer como micro-videos.

**Memoria persistente** (fuera del repo): notas del proyecto en la auto-memoria de Claude (`project_curso_video_modulo1`, `feedback_tono_profesional_sin_defensivas`, `project_protocolo_tecnica_rb`, etc.).

---

## 7. Cómo regenerar los exports de teleprompter

Los `.txt` se generan del maestro con el script en el scratchpad (`make_teleprompter.py` + fixup de números). Si se edita un guion maestro, se vuelve a correr para actualizar el `.txt`. No editar los `.txt` a mano.

---

*Instituto Centrobioenergetica, 2026 · Actualizar este README cuando cambie el estado o una directriz.*
