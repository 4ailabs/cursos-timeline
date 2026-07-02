# Traspaso de contexto — Desarrollo del modelo de Agente Biológico

## Para quién es este documento

Este documento es para continuar el trabajo en otro modelo (Fable) después de un cambio de sesión en Claude Code. Contiene todo el contexto necesario. Antes de escribir nada, **lee los archivos del repositorio listados abajo** — no partas solo de este resumen, el detalle importa.

---

## El objetivo del proyecto

El Dr. Miguel Ojeda Ríos (Instituto Centrobioenergetica) está reformulando el curso **"El Cuerpo Eléctrico" / Regulación Bioeléctrica (RB)**. La instrucción explícita, en sus propias palabras (transcripción de audio, 2 julio 2026):

> "La idea de este curso ya no es hacerlo como antes, que era el par biomagnético: rastreo punto por punto, encontrar un punto, encontrar su resonancia. Hacer un rastreo así sin tener antes una idea de cómo funciona — solo la palabra clave de 'equilibrar' — clínicamente es muy débil. La idea ahora es establecer un concepto primero de los órganos como un **agente biológico** que tiene capacidades de adaptación... quiero replantear la forma de dar el curso para que no sea otra vez el par biomagnético evolucionado con conceptos nuevos, sino una forma diferente de hacer este trabajo."

Y la corrección más reciente, también explícita: **no enfocarse solo en el hígado o en tres perfiles aislados — el modelo debe cubrir el cuerpo completo.** Los tres perfiles ya trabajados (intoxicado/inflamado/anérgico) son **ejemplos** del modelo, no el límite del modelo.

**Orden de trabajo pedido por el Dr. Ojeda:** primero desarrollar **el modelo/la estructura general** (la plantilla conceptual reutilizable), y solo después profundizar aplicándola a más órganos/sistemas del cuerpo.

---

## Archivos del repositorio que hay que leer (en este orden)

Ruta dentro de la estructura de carpetas:

1. **`../../Referencia/reunion-puntos-clave.md`** — contexto estratégico completo del Instituto (la sección 10 originó este rediseño).
2. **`concepto-agente-biologico.md`** — el documento fundacional. Define qué es un agente biológico (meta, capacidad de agencia, set point), introduce TAME de Michael Levin, y desarrolla ejemplos (hígado, ojo, mitocondria, intestino, tiroides, sistema inmune) con los 3 perfiles clínicos (inflamado, intoxicado, anérgico).
3. **`../../Referencia/Modelo_Ojo_Adaptativo/Manuscrito/Paper_El_Ojo_Adaptativo_v4.md`** — **el documento más importante y el modelo a imitar en rigor**. Es un paper de hipótesis ya maduro que aplica el marco completo al ojo/miopía en **4 niveles encadenados**:
   1. **El circuito** — sustrato neurobiológico/molecular real con nodos identificables (dopamina, EGR1/ZENK, glucagón, ácido retinoico, ipRGC/melanopsina, coroides, esclera).
   2. **La arquitectura cibernética** — el circuito descrito como lazo de control: variable controlada, set-point, señal de error con signo, actuador. Y la clasificación TAME por "eje de persuadabilidad": clase A (reloj, se re-cablea), clase B (termostato, se reescribe el set-point), clase C (animal, recompensa/castigo), clase D (humano, argumento racional). El ojo es clase B.
   3. **La agencia (TAME)** — evidencia experimental de meta con "fines fijos, medios variables" (renacuajos "Picasso" de Levin), y el sustrato bioeléctrico literal: voltaje transmembrana (Vmem) como señal instructiva que codifica y reescribe la forma-objetivo de un tejido.
   4. **Inferencia activa / error de predicción** (Karl Friston) — el desenfoque como distancia entre lo predicho (imagen enfocada) y lo percibido; el sistema actúa sobre su propia forma para minimizar ese error; la dopamina modula la "precisión"/ganancia con la que el sistema atiende su error.
4. **`../Programa_El_Cuerpo_Electrico_RB.md`** — el programa del curso reformulado: módulos 1-4 con sistema nuevo (agentes + terrenos, desde cero).

---

## Lo que ya se investigó (parcial, con huecos honestos)

Se hizo una primera investigación (con fuentes primarias vía PubMed/web) para encontrar, en cada uno de los 3 perfiles, el equivalente al circuito del ojo (nodos moleculares reales + clasificación TAME + el elemento bioeléctrico literal más fuerte posible). Resultado, resumido:

| Perfil / órgano-agente | Conmutador transcripcional (análogo a EGR1/ZENK) | Nodo bioeléctrico literal | Fuerza de la evidencia |
|---|---|---|---|
| Hígado (Intoxicado) | Keap1-Nrf2 | **No encontrado** — hay que decirlo así, no inventar uno | Débil/ausente en este punto |
| Sistema inmune (Inflamado) | NF-κB (activación) / mediadores pro-resolución — lipoxinas, resolvinas, protectinas (Serhan) como el "freno" activo | Voltaje de membrana (canales KATP) en macrófagos controla polarización M1/M2 — Li, Levin & Kaplan (2016), *Sci Rep* 6:21044 | Fuerte — del propio laboratorio de Levin |
| Mitocondria (Anérgico) | PGC-1α (biogénesis) / WASF3 (desarma complejos bajo estrés) | Potencial de membrana mitocondrial (ΔΨm) — voltaje transmembrana real, misma categoría física que el Vmem del ojo, no analogía | **La más fuerte de las tres** |

Referencias completas de esta investigación quedaron en la conversación anterior (no en un archivo todavía) — si hace falta el detalle completo con DOIs, hay que rehacer la búsqueda o pedir el registro de la sesión anterior. Las citas más importantes a verificar/reusar:
- Wu KC, Cui JY, Klaassen CD (2012). *PLoS One* 7(7):e39006. (Nrf2/Keap1, fase II hepática)
- Serhan CN (2014). "Pro-resolving lipid mediators are leads for resolution physiology." *Nature* 510:92-101.
- Li C, Levin M, Kaplan DL (2016). *Sci Rep* 6:21044. (Vmem y polarización de macrófagos)
- Wang PY, Ma J, Kim YC, et al. (2023). *PNAS* 120(34):e2302738120. (WASF3 y fatiga crónica)

**Esto era un primer ensayo por perfil, no el objetivo final.** El Dr. Ojeda pidió generalizar antes de seguir profundizando por órgano.

---

## La tarea inmediata: desarrollar EL MODELO (no más ejemplos todavía)

Antes de seguir buscando nodos órgano por órgano, hay que construir **la estructura/plantilla general** que cualquier órgano o sistema del cuerpo debe poder llenar. Es decir, una metodología explícita y reutilizable — el "molde" que el paper del ojo ya instancia una vez, pero que hay que extraer como **método**, independiente del ojo, para poder aplicarlo a:

- Cualquiera de los 3 perfiles ya iniciados (hígado, sistema inmune, mitocondria) — profundizando donde falte.
- **Otros órganos/sistemas del cuerpo que no se han tocado todavía**: intestino, tiroides, sistema nervioso autónomo, riñón, piel, sistema musculoesquelético, ejes hormonales (ver la tabla de la sección "Conexión con el resto del sistema Wellbive" en `concepto-agente-biologico.md`, que ya lista 8 sistemas con su meta y set point alterado — esa tabla es un buen punto de partida para decidir qué órganos cubrir).

**Preguntas que el modelo general debe responder, para cualquier órgano-agente:**
1. ¿Cómo se identifica el circuito real (los nodos moleculares/celulares) de un órgano dado, con el mismo estándar de rigor y de fuentes primarias que el paper del ojo?
2. ¿Cómo se mapea sistemáticamente ese circuito a la arquitectura cibernética (variable controlada, set-point, señal de error, actuador)?
3. ¿Cómo se decide la clase TAME (A/B/C/D) de un órgano dado, y qué se hace cuando el sistema no es puramente clase B (como pasó con la mitocondria, que tiene componentes de clase A cuando hay daño estructural)?
4. ¿Cómo se busca honestamente el nodo bioeléctrico literal, y qué se hace cuando no existe (como con el hígado) — se documenta la ausencia, o se busca más, o se reformula el argumento sin depender de un nodo bioeléctrico exclusivo?
5. ¿Cómo se aplica la inferencia activa/error de predicción de forma que no se vuelva una metáfora forzada en cada órgano?

El resultado de esta fase debería ser un documento tipo "metodología" o "plantilla" (ej. `metodologia-agente-biologico-4-niveles.md`) que sirva como checklist/receta para investigar y redactar cada órgano-agente adicional con consistencia, ANTES de seguir generando más perfiles.

---

## Instrucciones de trabajo para Fable

1. Lee los 4 archivos listados arriba en el repositorio (rutas dadas) para tener el contexto completo — no asumas nada de este resumen sin verificarlo en la fuente.
2. Prioridad 1: desarrollar el modelo/metodología general (ver sección anterior), en diálogo con el Dr. Ojeda — no lanzarse a producir contenido de más órganos todavía.
3. Prioridad 2 (después de validar el modelo): profundizar en más órganos/sistemas del cuerpo completo, no solo hígado — usando el modelo ya validado.
4. Regla del proyecto (ya establecida en memoria de Claude, aplica igual aquí): **no inventar contenido**. Si no hay fuente o no se encontró un nodo/dato, decirlo explícitamente en vez de rellenar el hueco. El usuario puede pedir "fuente" para verificar.
5. El curso ya tiene un programa reformulado (`Programa_El_Cuerpo_Electrico_RB.md`) con estructura de 4 módulos (1 marco + 3 perfiles). Esa estructura puede cambiar si el modelo general revela que conviene otra organización — está abierto a ajuste, no es definitivo.

---

*Documento de traspaso creado el 2 de julio de 2026 durante sesión de Claude Code, para continuidad en Fable.*
