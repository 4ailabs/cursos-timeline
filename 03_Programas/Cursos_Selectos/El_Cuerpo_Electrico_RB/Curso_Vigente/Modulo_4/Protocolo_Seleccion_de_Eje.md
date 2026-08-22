# Protocolo de selección de eje

**El Cuerpo Eléctrico · Módulo 4** — Dr. Miguel Ojeda Rios · Instituto Centrobioenergetica

> Secuencia fija de tres niveles, cada uno con umbral numérico o binario. Sin relato libre, sin pregunta abierta sin instrumento detrás. `[HIPÓTESIS]` — protocolo propio, no validado, sostenido por hallazgos que sí lo están y citados en cada paso.

---

# 0 · Por qué esta versión reemplaza a la anterior

**La versión previa hacía preguntas que sonaban al mecanismo de cada eje sin medirlo.** *«¿Los síntomas van y vienen?»* no aísla el ciclo de activación-resolución de ninguna otra causa de fluctuación. *«¿Cambian con la comida?»* le pedía al paciente reportar algo —la conmutación entre glucólisis y beta-oxidación— que no es consciente ni reportable: se mide con calorimetría, no con relato.

**Este protocolo corrige eso con una regla única:** cada paso usa un instrumento con umbral publicado, o se declara explícitamente que no hay instrumento de consulta y el paso se salta. **Ningún paso pregunta al paciente algo que el paciente no puede saber sobre sí mismo.**

---

# 1 · Los tres niveles, en orden fijo

```
NIVEL 1 · LO QUE SE MIDE EN CAMILLA, SIN LABORATORIO
    → un instrumento: la prueba de respiración profunda

NIVEL 2 · LO QUE SE MIDE CON UN ANÁLISIS DE SANGRE YA PEDIDO
    → cuatro marcadores, cada uno con su umbral

NIVEL 3 · LO QUE NO TIENE INSTRUMENTO DE CONSULTA
    → se declara, y se decide por la jerarquía de clase, no por cribado
```

**Se avanza de nivel solo si el anterior no decidió.** Si el Nivel 1 ya señala un eje con claridad, no hace falta pasar al 2.

---

# 2 · Nivel 1 — La prueba de respiración profunda

**Es el único instrumento de esta hoja que se ejecuta en la sesión, sin depender de laboratorio externo.**

```
PRUEBA DE RESPIRACIÓN PROFUNDA

Seis respiraciones por minuto, tres ciclos, con el paciente en reposo.

Frecuencia cardíaca antes:        _______
Frecuencia cardíaca al final:     _______
Diferencia:                       _______

  ≥ 15 latidos de diferencia   →  NORMAL
  ≤ 10 latidos de diferencia   →  ALTERADA
```

**Si sale alterada, el eje de biotransformación se rastrea primero, sin necesidad de esperar laboratorio.** `[EVIDENCIA]` — es la predicción explícita del eje: si lo que falla es el reporte vagal del hígado, esta prueba se altera antes que cualquier molestia digestiva.

**Si sale normal, no descarta el eje — solo no lo prioriza por esta vía.** Se sigue al Nivel 2.

---

# 3 · Nivel 2 — Los cuatro marcadores, con umbral

**Estos cuatro no se preguntan: se piden.** Si el paciente ya trae análisis recientes —menos de tres meses—, se usan directamente. Si no, se solicitan antes de decidir por esta vía, y mientras se espera el resultado se procede con el Nivel 1 y el rastreo del eje digestivo, que no depende de laboratorio.

```
MARCADOR 1 · HbA1c — hemoglobina glucosilada
    Eje que orienta: METABÓLICO
    Umbral: ≥ 5.7 %  →  sube el eje metabólico
    Fuente: estándar clínico de prediabetes/diabetes.


MARCADOR 2 · HOMA-IR — resistencia a la insulina en ayuno
    Eje que orienta: METABÓLICO
    Umbral: ≥ 2.5  →  sube el eje metabólico
    Se pide junto con glucosa e insulina en ayuno.


MARCADOR 3 · GGT — gamma-glutamil transferasa
    Eje que orienta: BIOTRANSFORMACIÓN
    Umbral: por encima del rango de referencia del laboratorio
            que la procesó  →  sube el eje de biotransformación
    Es indirecta y se dice así: `[EVIDENCIA]` de que no hay
    mejor marcador de rutina para esta vía.


MARCADOR 4 · Interleucina 6, si el paciente ya la tiene medida
    Eje que orienta: NINGUNO POR SÍ SOLO
    Una sola extracción no discrimina el eje inflamatorio,
    porque la variable de ese eje es el patrón temporal, no
    el nivel medio. Un valor único de IL-6 NO decide nada
    en este protocolo. Se anota si existe, y no se pide
    de forma expresa para esta hoja.
```

**Registro:**

```
                          Valor        Umbral        Sube el eje
HbA1c                     _____        ≥ 5.7 %       [ ] Metabólico
HOMA-IR                   _____        ≥ 2.5         [ ] Metabólico
GGT                       _____        fuera de rango[ ] Biotransformación
IL-6 (si existe)          _____        no aplica      no decide
```

---

# 4 · Nivel 3 — Lo que no tiene instrumento de consulta, declarado

**Dos ejes no tienen prueba de cribado hoy, y se dice sin rodeo en lugar de improvisar una pregunta que no mide nada.**

**El eje inflamatorio** necesita medir estructura temporal — amplitud, variabilidad a lo largo del día, conservación del ritmo de una citocina. Eso exige muestreo repetido intradía, que no existe como prueba de consultorio. `[HIPÓTESIS]` — es lo que el propio eje ya declara como el instrumento que haría falta y no hay.

**El eje redox** solo tiene un dato de consulta, y es demográfico, no una prueba: la edad. Antes de los 45 años, la deriva del par cisteína-cistina no se ha instalado; después, sí. `[EVIDENCIA]` — con PMID en el documento del eje. **Esto no es cribado clínico: es el criterio para decidir si el eje va a rescate en sesión o a mantenimiento de fondo**, y siempre va a mantenimiento — el redox no compite por entrar primero en una sesión.

**Regla para estos dos:** si ningún marcador del Nivel 1 o 2 dio positivo, y hay razón clínica para sospechar el eje inflamatorio o el redox, **se rastrean igual, sin cribado previo** — el rastreo mismo es el instrumento, porque no hay uno anterior mejor.

---

# 5 · El árbol de decisión completo

```
                    INICIO
                       │
          ┌────────────┴────────────┐
          │  NIVEL 1: prueba de     │
          │  respiración profunda   │
          └────────────┬────────────┘
                        │
              ¿Alterada? (≤10 lpm)
                 │              │
                SÍ              NO
                 │              │
     ┌───────────┘              └───────────┐
     │                                       │
BIOTRANSFORMACIÓN                    NIVEL 2: pedir/revisar
se rastrea primero                   HbA1c, HOMA-IR, GGT
                                              │
                              ┌───────────────┼───────────────┐
                              │               │               │
                        HbA1c≥5.7 o      GGT fuera        Ninguno
                        HOMA-IR≥2.5      de rango          alterado
                              │               │               │
                        METABÓLICO    BIOTRANSFORMACIÓN   NIVEL 3
                        se rastrea     se rastrea          declarado:
                        primero        primero             sin cribado,
                                                            se rastrea
                                                            por sospecha
                                                            clínica directa
```

**Si dos marcadores de niveles distintos coinciden** —por ejemplo respiración alterada y GGT fuera de rango, ambos señalando biotransformación— **ese eje queda confirmado por dos vías independientes**, y se rastrea con mayor certeza de partida.

**Si dos marcadores señalan ejes distintos** —por ejemplo HOMA-IR alto y GGT fuera de rango— **se rastrean los dos, empezando por el que tenga más marcadores a favor**, y si están empatados, por el orden de clase ya dictado: barrera e intestinal, inflamatorio, biotransformación y redox, con el estrés como sustrato.

---

# 6 · Tres cosas que este protocolo deja fuera a propósito

**No sustituye el rastreo con imán.** Decide con qué eje se empieza a rastrear, no decide el hallazgo — eso lo da la maniobra sobre el cuerpo, no el papel.

**No inventa una prueba donde no la hay.** Los dos ejes sin marcador de consulta se rastrean por sospecha clínica directa, sin fingir un cribado que no existe.

**No usa una extracción única de un marcador cuya variable es temporal.** La IL-6 medida una vez no entra en la decisión, porque el propio eje inflamatorio establece que un solo valor promedia la fase activa y la resuelta y borra la información.

---

# 7 · Qué predice, y qué la refutaría

**Predice** que el eje señalado por este protocolo —Nivel 1 o Nivel 2— coincide con el eje que después marca en el rastreo, con una frecuencia mayor a la que daría elegir el eje al azar entre los cuatro.

**La refutaría** que la coincidencia entre lo que el protocolo señala y lo que el rastreo confirma no sea distinguible del azar en el registro de casos acumulado.

**Se contesta con el registro de casos**, anotando en cada uno: qué nivel decidió, qué marcador exacto, y qué encontró el rastreo.

---

*Instituto Centrobioenergetica, 2026*
