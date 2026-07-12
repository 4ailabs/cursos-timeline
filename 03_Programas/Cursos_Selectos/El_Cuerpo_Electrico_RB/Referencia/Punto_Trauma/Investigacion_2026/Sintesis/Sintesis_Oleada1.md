# Síntesis — Oleada 1 (T1 · T2 · T3)

> Integra los tres dossiers del núcleo de la hipótesis del punto trauma. Postura crítica y balanceada.
> Fuente: `../Dossiers/`. Instituto Centrobioenergetica, julio 2026.

---

## 1. Veredicto global

La hipótesis del punto trauma tiene una **base fisiológica real pero un eslabón mecanístico no verificado**.

- **Lo que se sostiene:** la biofísica del vertido de K⁺ y la despolarización por Goldman; la física del gradiente del CME in vitro (Vanderbilt); el papel del riñón como regulador iónico dominante; el reflejo inflamatorio de Tracey; el efecto microvascular normalizador de Morris-Skalak.
- **Lo que se cae o se matiza:** la elevación de K⁺ "sostenida" (se normaliza en minutos); varios detalles mecanísticos (gap junctions, umbral canal L, M1/despolarización); la magnitud "10-15 mV/mM"; la ventana de intensidad; y **el mecanismo Fe-S está mal citado y en el régimen de campo equivocado**.
- **El eslabón crítico** — que un imán transcutáneo module el eje simpático renal y recalibre la excreción de K⁺ en un organismo intacto — **no tiene ni un solo estudio de respaldo**. Es el punto que toda la construcción necesita y el que menos evidencia tiene. Debe presentarse como hipótesis testeable, nunca como mecanismo establecido.
- **El consenso clínico** de la magnetoterapia estática para dolor es **negativo** (meta-análisis Pittler/Ernst 2007). La evidencia clínica positiva pertenece al PEMF pulsado, no a imanes estáticos.

**Implicación para el curso:** el marco es defendible *como hipótesis de investigación bien fundada y honesta sobre sus límites* — que es justo el encuadre que el corpus ya adopta ("línea de investigación, no técnica establecida"). No es defendible presentarlo como mecanismo probado. La postura honesta es una fortaleza, no una debilidad.

---

## 2. Correcciones al corpus — priorizadas

### 🔴 Prioridad alta (errores factuales / citas)

| # | Dónde | Problema | Corrección |
|---|---|---|---|
| 1 | `Mecanismo_Vmem...` Mec. 3; refs de varios docs | **Cita fabricada/errónea:** "Castello PR, et al. *Sci Rep*. 2023;13:13267" no existe con ese contenido. | El trabajo Fe-S/ROS real es **Usselman RJ, Castello PR, et al. *Sci Rep*. 2016;6:38543 (PMID 27995996)** — pero opera con campos débiles/oscilantes (nT–µT), **no** con CME estático de 100-500 mT. Corregir cita **y** matizar que no aplica al imán de neodimio. |
| 2 | Varios docs, portada | Aparece **"Ojeda Ríos"** con acento. | Debe ser **"Ojeda Rios"** sin acento (ver memoria del proyecto). |
| 3 | `Regulacion...` ref. 4, 15, 21 | "Deng 2013 *Clin Neurophysiol*" (es *Brain Stimul*); "Morris 2007 AJP-Heart" y "Wang 2019 Oxid Med Cell Longev" **no localizables** en PubMed. | Corregir Deng (journal); verificar o sustituir Morris 2007 y Wang 2019 por fuentes verificadas (ver dossier T2). |
| 4 | `Ingenieria_Reversa` §3.1; `Regulacion...` §4 | "1 mM de K⁺ cambia el Vmem ~10-15 mV". | Exagerado. Cerca del rango normal son **~5-6 mV** (relación logarítmica de Goldman). Corregir la cifra. |
| 5 | `Ingenieria_Reversa` §3.1; §11.2 | "El riñón **no** regula el pH". | Incorrecto: Milano 2024 (β3-AR en células intercaladas) muestra que regula H⁺-ATPasa/ácido-base. Reformular: el riñón regula pH **y** el entorno iónico; el argumento es que *para el trauma* la variable dominante es iónica, no que el riñón no toque el pH. |

### 🟡 Prioridad media (matices mecanísticos)

| # | Dónde | Problema | Corrección |
|---|---|---|---|
| 6 | `Ingenieria_Reversa` §2.2 | "La despolarización cierra las gap junctions". | Impreciso. El gating por voltaje responde al voltaje *transjuntural* (Vⱼ). Lo que cierra las uniones en el trauma es **Ca²⁺ᵢ/calmodulina** (Peracchia 2020/21; Wei 2019). Reformular. |
| 7 | `Ingenieria_Reversa` §2.2 | Canal L "se activa a ~-40 mV". | Optimista; activa más bien **-30/-20 mV**. El canal T (LVA, cerca del reposo) sí es correcto. |
| 8 | Varios | "K⁺ extracelular 20-40 mM sostenido". | El pico real puede superar 60 mM pero **se normaliza en ~3 min** salvo isquemia/falla de bomba (Nilsson 1993; Cascio/Kléber 1992). Reformular el "catch-22" como **hipótesis condicionada a isquemia/perfusión comprometida** — lo que además refuerza el argumento renal del propio documento. |
| 9 | `Ingenieria_Reversa` §2.2, §6 | "M1 = despolarizado = proinflamatorio" como regla. | Contexto-dependiente, con contraevidencia directa (Yu 2022, *Nat Commun*: despolarizado = menos inflamación). No enunciar como regla fija. |
| 10 | `Regulacion...` §23; `Mecanismo_Vmem...` | "Vmem primario, pH derivado" como jerarquía causal. | Defendible como **encuadre de modelo** (escuela Levin), no como causalidad demostrada: Vmem-pH-redox están acoplados bidireccionalmente (Salameh 2002). Marcar como marco, no como hecho. |
| 11 | `Regulacion...` §24; §12 | "Ventana 10-70 mT funciona, 400 mT no". | Morris 2005 solo probó **70 mT**. La "ventana" está sobre-extrapolada. Matizar. |
| 12 | `Ingenieria_Reversa` §3.1; `Regulacion...` | "El riñón es el ÚNICO órgano que regula K⁺". | Matizar: el balance **interno agudo** lo comparten Na⁺/K⁺-ATPasa, insulina y catecolaminas. El riñón domina el balance **externo** (excreción). |
| 13 | `Nodo_de_Lesion...` tabla; `Ingenieria_Reversa` §9.3 | Hígado "vagal T7-T10". | Mezcla niveles: T7-T10 es simpático esplácnico; la vía vagal hepática es aparte. Precisar. |
| 14 | `Ingenieria_Reversa` ref. 6; `Nodo...` | "Inervación renal — bioRxiv 2023" | Es **preprint** no revisado por pares. Marcarlo como tal o sustituir por fuente revisada. |

### 🟢 Lo que se confirma y se puede reforzar

- **Reflejo inflamatorio de Tracey:** sólido. Y **confirmado**: la FDA aprobó el estimulador vagal de SetPoint (ensayo RESET-RA, *Nat Med* 2025) para artritis reumatoide en agosto 2025. Útil como precedente de "medicina bioeléctrica" — **con la salvedad** de que es estimulación eléctrica de un nervio implantado, no un imán transcutáneo.
- **Gradiente > intensidad (Vanderbilt):** McLean/Cavopol 1995 (PMID 7748200, 7677796) — un cuadripolar de 11 mT bloquea 66% de potenciales de acción mientras 88 mT uniforme no hace nada. Respalda la rejilla 2×2 de la placa **in vitro** (neuronas DRG en cultivo; sin datos humanos).
- **Morris-Skalak 2005:** efecto microvascular local normalizador (70 mT, 15 min) — el mejor apoyo mecanístico local al imán.
- **β3-AR renal (Milano 2024):** verificado.

---

## 3. Elementos nuevos aportados (no estaban en el corpus)

- Nilsson 1993 y Cascio/Kléber 1992: mediciones reales de K⁺ extracelular post-lesión con microelectrodos.
- La **[Ca²⁺] extracelular CAE** en trauma agudo (1.1→0.1 mM) — matiz que conecta con el nodo paratiroides.
- Peracchia 2020/21; Wei 2019: gating real de conexinas por Ca²⁺/calmodulina.
- Yu 2022 (*Nat Commun*): contraevidencia sobre Vmem del macrófago.
- Usselman/Castello 2016 (la fuente Fe-S correcta).
- Pittler/Ernst 2007 (CMAJ): meta-análisis de referencia sobre magnetoterapia estática y dolor.
- Neuraltherapie germanófona (Fischer 2003; Engel/Barop 2022): marco conceptual "órgano-segmento-autonómico" afín (evidencia de bajo nivel; no valida el imán).

---

## 4. Recomendación

1. **Aplicar las correcciones 🔴 de inmediato** (son errores factuales; la cita fabricada es lo más urgente para la credibilidad del corpus).
2. **Reformular el "catch-22" y el eslabón autonómico** como hipótesis condicionadas y testeables — mantener el encuadre honesto que ya distingue establecido de hipotético.
3. **Lanzar la oleada 2 (T4-T6)** para cerrar el marco (Levin/TAME), la vía vagal/REM y los comparadores (magnetoterapia/PEMF/terapia neural/EMDR).
4. **Habilitar los conectores** (Exa, Scholar Gateway) para el barrido multiidioma real pendiente.

---

*Instituto Centrobioenergetica, 2026.*
