# Técnicas candidatas derivadas de la hipótesis del punto trauma

> Deriva, de forma sistemática, el abanico de técnicas que la hipótesis del punto trauma *predice*
> que podrían funcionar. Cada técnica se ancla a un **mecanismo (palanca)** del documento fundacional
> y, donde existe, a evidencia indexada. No es un catálogo cerrado ni una recomendación clínica: es el
> mapa de lo posible, para situar sobre él la técnica que efectivamente se usa y priorizar su validación.
>
> Base: `../Documento_Fundacional_Punto_Trauma_2026.md` y dossiers T1–T6. Instituto Centrobioenergetica, 2026.
> Fuentes de literatura vía PubMed (DOIs enlazados en cada caso).

---

## Las cinco palancas del modelo

Toda técnica derivable actúa sobre una o varias de estas palancas:

| # | Palanca | Efecto buscado | Estatus del mecanismo |
|---|---|---|---|
| **P1** | Gradiente de campo (dB/dx) sobre fibras nerviosas | Bloqueo nociceptivo reversible | Establecido in vitro (Vanderbilt) |
| **P2** | Modulación de canales iónicos (diamagnetismo, Ca-T) → Vmem | Normalizar el microambiente despolarizado | Establecido in vitro/animal |
| **P3** | Normalización del tono arteriolar (microcirculación) | Perfusión, depuración de K⁺, edema | Establecido en animal (Morris-Skalak) |
| **P4** | Eje autonómico segmental (nodo regulador a distancia) | Recalibrar la variable sistémica desregulada | Fisiología establecida; modulación por imán en investigación |
| **P5** | Reflejo antiinflamatorio vagal / tono parasimpático | Bajar inflamación sistémica, reorganización | Establecido para estimulación eléctrica del vago |

---

## Familia A — Técnicas de campo local (P1 · P2 · P3)

Actúan sobre la zona de lesión sin nodo distante. Objetivo: dolor inmediato + microambiente local.

### A1 · Gradiente bipolar de contacto
**Principio (P1).** Dos polos opuestos adyacentes crean un gradiente empinado en su frontera → bloqueo reversible de potenciales de acción en fibras C y A-δ.
**Aplicación.** Frontera orientada perpendicular a la dirección estimada de las fibras; 15–30 min.
**Evidencia.** Bloqueo demostrado in vitro en neuronas de ganglio dorsal (McLean/Cavopol). Sin datos humanos.
**Marcador / test.** EVA a 5–15 min; umbral de dolor por presión pre/post.

### A2 · Placa magnética híbrida (gradiente + penetración)
**Principio (P1+P3).** Rejilla 2×2 (N-S/S-N) para gradiente + imán base N52 para campo profundo y normalización arteriolar + flux plate para redirigir flujo.
**Aplicación.** Epicentro de la rejilla sobre el punto de máximo dolor; 20–30 min.
**Evidencia.** Combina el efecto Vanderbilt (gradiente) con Morris-Skalak (tono). Prototipo descrito; sin ensayo.
**Marcador / test.** EVA, edema (circunferencia), termografía.

### A3 · Matriz de gradiente optimizada (mejora de ingeniería)
**Principio (P1).** Maximizar dB/dx y unilateralidad del campo. Un **arreglo tipo Halbach** concentra el campo en la cara del paciente y anula la posterior; multiplicar fronteras N-S densifica las zonas de gradiente activo.
**Aplicación.** Sustituye la rejilla 2×2 por una matriz Halbach de mayor densidad de polos.
**Evidencia.** Principio físico establecido; aplicación clínica no probada. Es la línea de iteración del dispositivo (simulación FEM antes de fabricar).
**Marcador / test.** Mapa de gradiente medido (magnetómetro/limadura) vs bloqueo nociceptivo.

### A4 · Secuenciación de polaridad (marcapaso de repolarización)
**Principio (P2).** Aplicar primero polo que favorezca la salida de K⁺/entrada controlada, luego revertir, siguiendo la cinética lenta (minutos) de reorientación diamagnética.
**Aplicación.** Protocolo temporizado de cambio de polaridad dentro de la sesión.
**Evidencia.** Hipótesis; la cinética de minutos está documentada (recuperación 400–600 s, McLean). No hay protocolo validado.
**Marcador / test.** Requiere sonda de Vmem/EMG; hoy es idea de laboratorio.

---

## Familia B — Técnicas segmentales a distancia (P4)

Conectan la lesión con el nodo autonómico que gobierna la variable desregulada.

### B1 · Trauma–riñón (nodo del potasio) — la canónica
**Principio (P4).** Complementario en el riñón, el regulador maestro del microambiente iónico; el gradiente cruza el eje simpático T10–L2.
**Aplicación.** Rastreo estándar → imán en riñón hasta nivelación → 20–30 min.
**Evidencia.** Riñón = complementario recurrente del trauma (Tratado). El *eslabón* imán→simpático renal está en investigación.
**Marcador / test.** Ionograma pre/post, HRV, Doppler renal.

### B2 · Trauma–nodo variable (selección por variable dominante)
**Principio (P4).** El complementario cambia según lo más desregulado: **suprarrenal** (K⁺/estrés/cortisol), **hígado** (lactato/fase aguda), **bulbo raquídeo** (tono autonómico central).
**Aplicación.** El rastreo decide el nodo; no se fuerza el riñón.
**Evidencia.** Jerarquía autonómica coherente (hipótesis fundada). Predicción falsable: distintos traumas → distintos nodos.
**Marcador / test.** Registro prospectivo ciego de qué nodo aparece por tipo de trauma.

### B3 · Lógica segmental (dermatoma–viscerotoma)
**Principio (P4).** Emparejar la lesión con el segmento medular que comparte inervación con el órgano regulador (lógica de zonas de Head / terapia neural segmental).
**Aplicación.** Elegir el nodo por solapamiento segmental, no solo por rastreo.
**Evidencia.** Marco segmental respetable (Neuraltherapie germanófona), evidencia de bajo nivel. Útil como heurística de dónde buscar.
**Marcador / test.** Concordancia entre nodo hallado por rastreo y predicción segmental.

---

## Familia C — Adyuvantes neuromoduladores sistémicos (P5)

Bajan la inflamación sistémica y el tono de alerta. Aquí la evidencia es más fuerte y **externa al imán**, por lo que sirven de comparador y de posible complemento.

### C1 · Inducción de tono vagal (red parasimpática) — Técnica de reorganización
**Principio (P5).** La red de puntos parasimpáticos eleva el tono vagal (HRV) y favorece un estado de reorganización asociado a sueño profundo.
**Aplicación.** Rastreo y aplicación conjunta de la red; 20–30 min.
**Evidencia.** Cadena vago→PGO en animal; que esta técnica induzca un estado tipo REM está en investigación (pendiente EOG/HRV/EEG).
**Marcador / test.** HRV (RMSSD), EOG, EEG pre/post.

### C2 · tVNS auricular como adyuvante o comparador — **el ancla de evidencia**
**Principio (P5).** Estimulación transcutánea de la rama auricular del vago activa el reflejo antiinflamatorio de Tracey.
**Evidencia (fuerte, según PubMed).** En cirugía, la tVNS reduce IL-6, CRP y HMGB1 y mejora desenlaces: menos complicaciones tras lobectomía pulmonar (Salama 2020, [DOI](https://doi.org/10.1007/s00268-020-05543-w)) y menor deterioro cognitivo postoperatorio con caída de IL-6/HMGB1 (Zhou 2022, [DOI](https://doi.org/10.1007/s40520-022-02177-x)); en modelo animal, el efecto se **abole con vagotomía**, probando el mecanismo (Hong 2018, [DOI](https://doi.org/10.1111/nmo.13501)).
**Rol en la RB.** Es la versión con evidencia del mismo principio que la Técnica C1. Puede usarse como **comparador activo** en un ensayo, o integrarse como adyuvante en el componente inflamatorio.
**Marcador / test.** IL-6, PCR-us, HRV.

### C3 · Pauta perioperatoria (ventana temporal)
**Principio (P5, timing).** Aplicar antes y después de la cirugía, cuando el microambiente de despolarización y la cascada inflamatoria son máximos.
**Evidencia análoga.** Las tVNS eficaces se aplicaron desde 24 h antes hasta días después (Salama 2020). Sugiere que la ventana de aplicación importa tanto como la técnica.
**Marcador / test.** Consumo de analgésicos, PCR/IL-6, días de estancia.

---

## Familia D — Híbridos y puente a modalidades con evidencia (P2 · P3)

### D1 · PEMF local — el puente con la medicina basada en evidencia
**Principio (P2+P3).** El campo pulsado, a diferencia del imán estático, tiene evidencia clínica y un dispositivo **FDA-cleared** cuyo mecanismo declarado es —textualmente— *"modular el potencial de membrana en reposo permitiendo el retorno al potencial fisiológico"*: exactamente la variable Vmem del modelo RB.
**Evidencia (según PubMed).** RCT doble ciego post-cesárea: el PEMF redujo dolor (EVA), consumo de analgésicos (1.9×) y edema/exudado de herida (Khooshideh 2017, [DOI](https://doi.org/10.1097/AJP.0000000000000376)). Resultado más discreto en blefaroplastia, con reducción significativa solo de eritema (Czyz 2011, [DOI](https://doi.org/10.1111/j.1524-4725.2011.02215.x)) — la eficacia es real pero heterogénea.
**Rol en la RB.** El PEMF es la **modalidad prima con evidencia**: si el mecanismo Vmem es correcto, el PEMF debería igualar o superar al imán estático. Comparador obligado y posible complemento.
**Marcador / test.** EVA, analgésicos, edema.

### D2 · Secuencia estático → pulsado
**Principio.** Imán estático para el gradiente/bloqueo local (P1) seguido de PEMF para el componente de membrana/microcirculación con respaldo clínico (P2/P3).
**Evidencia.** Combinación no probada; racional mecanístico.
**Marcador / test.** Comparar contra cada modalidad sola.

### D3 · CME + neuromodulación (TENS o tVNS)
**Principio.** Campo local (P1/P2) + adyuvante sistémico con evidencia (P5).
**Evidencia.** Cada componente por separado tiene respaldo; la suma no está estudiada.
**Marcador / test.** Diseño factorial.

---

## Familia E — Técnicas de medición (para guiar y para validar)

No tratan; hacen medible el modelo y convierten el método en algo defendible.

### E1 · Objetivar el rastreo
Instrumentar la nivelación / respuesta muscular con goniometría o EMG de superficie, para transformar una heurística de baja fiabilidad en una señal registrable y estudiar su reproducibilidad inter-operador.

### E2 · Panel de microambiente
Ionograma (K⁺), HRV (tono autonómico), PCR-us / IL-6 (inflamación), Doppler (perfusión) como **guía de selección de nodo** y como **desenlace** — el peso probatorio que hoy recae en el rastreo se traslada aquí.

---

## Matriz comparativa

| Técnica | Palanca | Diana | Evidencia propia | Invasividad | Dónde encaja |
|---|---|---|---|---|---|
| A1 Gradiente bipolar | P1 | dolor local | in vitro | nula | dolor agudo |
| A2 Placa híbrida | P1+P3 | dolor+edema local | prototipo | nula | músculo-esquelético |
| A3 Matriz Halbach | P1 | dolor local | física establecida | nula | iteración de dispositivo |
| B1 Trauma-riñón | P4 | inflamación sistémica | tradición RB | nula | trauma inflamatorio |
| B2 Nodo variable | P4 | variable dominante | hipótesis fundada | nula | criterio clínico |
| C1 Tono vagal | P5 | alerta/reorganización | en investigación | nula | fondo de estrés |
| C2 tVNS auricular | P5 | inflamación sistémica | **RCT positivos** | mínima | adyuvante/comparador |
| D1 PEMF local | P2+P3 | dolor+edema+Vmem | **RCT positivos** | nula | comparador prima |
| E1/E2 Medición | — | validación | — | mínima | todo el programa |

---

## Lectura de conjunto (priorización)

1. **La evidencia externa más fuerte apunta a P5 (vagal/antiinflamatorio) y a P2/P3 vía PEMF** — no al imán estático como analgésico aislado. Esto orienta hacia dónde llevar el peso clínico del método.
2. **El imán estático es más defendible en su papel local de gradiente (P1) y microcirculación (P3)** que en el eslabón autonómico a distancia (P4), que es el más especulativo.
3. **La ruta seria de validación** es comparar la técnica de la RB contra dos comparadores activos con evidencia (PEMF local y tVNS auricular) sobre desenlaces medidos, en un modelo limpio (p. ej. post-cirugía electiva).

---

## Siguiente paso

Este mapa cubre lo que la hipótesis hace *posible*. **Cuando indiques cuál es la técnica que efectivamente se usa**, la sitúo sobre estas palancas, identifico qué evidencia la respalda directamente, qué comparador le corresponde, y diseño la ruta concreta de validación y de refinamiento (parámetros, marcadores, protocolo de registro).

---

*Instituto Centrobioenergetica, 2026 · Literatura vía PubMed. Documento de investigación — no constituye recomendación clínica.*
