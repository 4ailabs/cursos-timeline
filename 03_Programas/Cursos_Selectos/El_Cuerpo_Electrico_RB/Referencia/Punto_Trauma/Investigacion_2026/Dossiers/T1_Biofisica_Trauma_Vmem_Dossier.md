# T1 — Biofísica del trauma y Vmem — Dossier de investigación

> Instituto Centrobioenergetica · Investigación crítica 2026
> Tópico T1: Biofísica del trauma y el potencial de membrana (Vmem)
> Fuente evaluada: `Punto_Trauma_Ingenieria_Reversa_2026.md` (§2, 5, 6, 12) y `Mecanismo_Vmem_es_Primario_pH_es_Derivado.md`
> Toda la evidencia primaria proviene de PubMed. Los enlaces DOI están incluidos por requisito de atribución.

---

## Resumen ejecutivo

La cadena biofísica central de la hipótesis —trauma → vertido de K⁺ → despolarización por Goldman → apertura de canales de Ca²⁺ de bajo umbral → cierre de gap junctions → isla eléctrica— está **bien fundamentada en literatura primaria indexada**, pero con **tres correcciones cuantitativas importantes** y **un supuesto frágil** que el corpus debe matizar.

1. **La elevación de K⁺ extracelular postraumático está medida y es real**, pero el rango del corpus ("20–40 mM sostenido") es impreciso. En contusión mecánica aguda el pico real es **>60 mM** (Nilsson 1993), pero es **transitorio y se normaliza en ~3 min**. En isquemia el plateau es **más bajo (~9–15 mM)** (Cascio 1992). No hay evidencia de un K⁺ elevado "sostenido" en 20–40 mM: la Na⁺/K⁺-ATPasa y la difusión lo depuran rápido.
2. **El cálculo de Goldman es válido** y la despolarización a −30/−40 mV con K⁺ ~30–40 mM es matemáticamente correcta.
3. **Los canales de Ca²⁺ tipo T (LVA) y su ventana de corriente cerca del reposo están sólidamente documentados** (Perez-Reyes 2003; El Ghaleb 2021). El umbral del tipo L que da el corpus (−40 mV) es ligeramente optimista (activa más bien −30/−20 mV).
4. **El gating de gap junctions por Ca²⁺/calmodulina está muy sólido** (Peracchia 2020/2021; Wei 2019). PERO: el gating por voltaje de las conexinas responde al voltaje **transjuntural (Vj, diferencia entre células)**, no al valor absoluto de despolarización. La frase "la despolarización cierra las gap junctions" es imprecisa.
5. **La correlación Vmem–polarización de macrófagos existe, pero el signo es contexto-dependiente y hay evidencia contradictoria**: Hong 2025 apoya "M1 despolarizado"; Yu 2022 (Nat Commun) muestra lo contrario (macrófago despolarizado = MENOS inflamación). No se sostiene una regla simple "despolarizado = M1 = proinflamatorio".
6. **El "catch-22 bioeléctrico" (K⁺ elevado sostenido que impide repolarización) es el eslabón más débil**: la evidencia empírica muestra normalización iónica rápida tras trauma agudo, no un bloqueo sostenido. Es un modelo plausible pero no demostrado.
7. **La tesis "Vmem primario, pH derivado" es defendible en el marco morfogenético de Levin, pero no como jerarquía causal universal**: Vmem, pH y redox están acoplados bidireccionalmente. La primacía estricta del Vmem no está establecida por evidencia; es una elección de modelo.

**Veredicto global:** el esqueleto biofísico es correcto y citable; lo que requiere corrección es (a) la magnitud/duración del K⁺, (b) la afirmación de "sostenido", (c) la imprecisión connexina-voltaje, y (d) el signo del Vmem del macrófago.

---

## Hallazgo por afirmación

### Afirmación 1 — El trauma vierte K⁺ y eleva [K⁺]ₒ de ~4 a 20–40 mM
**Estado: SÓLIDO en lo cualitativo — PARCIAL/A CORREGIR en lo cuantitativo.**

Evidencia a favor (mediciones reales):
- **Nilsson et al. 1993** (microelectrodos ion-selectivos, contusión cortical por compresión en rata): [K⁺]ₑ sube de **3 mM a >60 mM** de inmediato, con caída simultánea de [Ca²⁺]ₑ de 1.1 a 0.3–0.1 mM. Clave: **[K⁺] y el potencial DC se normalizan en ~3 min.** PMID 8436609 — [DOI](https://doi.org/10.1038/jcbfm.1993.22)
- **Katayama et al. 1990** (microdiálisis, concusión por fluid-percussion): aumento de [K⁺]ₒ de **4.28–5.90 veces** el basal (≈17–25 mM desde ~4 mM) en lesión severa, con liberación masiva de glutamato. PMID 1977896 — [DOI](https://doi.org/10.3171/jns.1990.73.6.0889)
- **Cascio, Yan & Kléber 1992** (isquemia miocárdica, microelectrodos K⁺): acumulación de K⁺ dependiente de geometría/difusión, **~2.5 mM a ~14 mM tras 10 min**; plateau isquémico típico ~9–15 mM. PMID 1735138 — [DOI](https://doi.org/10.1161/01.res.70.2.409)

Evidencia en contra / límites:
- El rango del corpus (20–40 mM) cae por debajo del pico de contusión mecánica (>60 mM) pero por encima del plateau isquémico (~10–15 mM). **No existe un valor único "20–40 mM": depende del tipo de lesión.**
- El adjetivo **"sostenido" no está respaldado**: los sistemas de transporte activo (Na⁺/K⁺-ATPasa) y la difusión revierten la elevación aguda en minutos (Nilsson: 3 min). Un K⁺ elevado persistente solo ocurre si hay isquemia mantenida o falla energética (Clausen 2001, PMID 11457429 — [DOI](https://doi.org/10.1016/s0006-8993(01)02566-5)).

**Veredicto:** El vertido de K⁺ y la despolarización local son hechos medidos. Corregir a: "el trauma eleva transitoriamente [K⁺]ₒ (de ~4 mM a decenas de mM, hasta >60 mM en contusión), con normalización en minutos salvo isquemia persistente". Nota adicional útil para el corpus: **[Ca²⁺]ₑ CAE** durante la lesión aguda (entra a las células), matiz que refina la sección §2.

---

### Afirmación 2 — Por Goldman-Hodgkin-Katz, ese K⁺ despolariza el Vmem de −70 a −30/−40 mV
**Estado: SÓLIDO.**

- La ecuación de Goldman es el marco correcto (Goldman 1943; Hodgkin & Katz 1949, ya citados en el corpus, correctos).
- Verificación numérica: con [K⁺]ₒ = 40 mM, [K⁺]ᵢ = 140 mM, el potencial de Nernst de K⁺ = 61·log(40/140) ≈ **−33 mV**. Como el Vmem de reposo está dominado por P_K, la predicción del corpus (−30/−40 mV) es **cuantitativamente correcta**.
- Confirmación experimental directa: Nilsson 1993 registró el "negative shift in DC potential" concomitante — es decir, la despolarización real acompañó al alza de K⁺.

Límites/supuestos: el cálculo asume permeabilidades relativas constantes; en la práctica la despolarización activa conductancias adicionales (canales de Ca²⁺, cierre de Kir) que la refuerzan. El supuesto es conservador, no exagerado.

**Veredicto:** Válido. Mantener. (La frase del corpus "no es hipótesis, es la consecuencia matemática" es defendible.)

---

### Afirmación 3 — La despolarización abre Ca²⁺ tipo T (−60) y tipo L (−40) → Ca²⁺ → calpaínas/NF-κB/citoquinas
**Estado: SÓLIDO para la biofísica de canales — PARCIAL para la cascada bioquímica río abajo.**

Evidencia a favor:
- **Perez-Reyes 2003** (*Physiol Rev*, revisión definitiva): los canales tipo T (Cav3) son **low-voltage-activated**, se activan con pequeñas despolarizaciones cerca del reposo y generan "low-threshold spikes"; regulan directamente [Ca²⁺]ᵢ como segundo mensajero. PMID 12506128 — [DOI](https://doi.org/10.1152/physrev.00018.2002)
- **El Ghaleb et al. 2021** (*Brain*): mutaciones gain-of-function en Cav3.3 aumentan la "window current" y producen **influjo de Ca²⁺ incluso a potenciales de reposo**, con toxicidad por calcio — evidencia mecanística de que la despolarización sostenida vía canales T genera carga de Ca²⁺ patológica. PMID 33704440 — [DOI](https://doi.org/10.1093/brain/awab101)

Límites / correcciones:
- El **umbral del tipo L (Cav1.2) que da el corpus (−40 mV) es optimista**: los canales L son high-voltage-activated, con activación típica ~−30 a −20 mV (umbral cerca de −40). Con Vmem despolarizado a −30 mV sí se reclutan, así que la conclusión se mantiene, pero el número exacto debe matizarse.
- La cadena **Ca²⁺ → calpaínas → proteasas → NF-κB → citoquinas es textbook plausible pero NO está demostrada en los papers de canales aquí citados**; es una inferencia. El corpus debería marcarla como cascada aceptada en general, no derivada de una fuente única de trauma bioeléctrico.

**Veredicto:** La parte biofísica (canales de bajo umbral activados por despolarización → entrada de Ca²⁺) es sólida y bien citable. Ajustar el umbral del tipo L y señalar que la cascada inflamatoria es inferencia estándar.

---

### Afirmación 4 — Despolarización + Ca²⁺ᵢ cierra gap junctions (conexinas) → isla eléctrica
**Estado: SÓLIDO para Ca²⁺/CaM — A CORREGIR la parte "por despolarización/voltaje".**

Evidencia a favor (gating químico por Ca²⁺):
- **Peracchia 2020** (*Int J Mol Sci*, "Calmodulin-Mediated Regulation of Gap Junction Channels"): el cierre (chemical gating) de gap junctions está mediado por [Ca²⁺]ᵢ en el rango **nanomolar alto vía calmodulina** (modelo "Cork"). PMID 31940951 — [DOI](https://doi.org/10.3390/ijms21020485)
- **Peracchia & Leverone Peracchia 2021** (modelo Ca-CaM-Cork ampliado). PMID 34884859 — [DOI](https://doi.org/10.3390/ijms222313055)
- **Wei et al. 2019** (*Biochem J*): Ca²⁺/CaM cierra Cx43 incluso en una isoforma insensible a pH → confirma que **el Ca²⁺ es un gate independiente y suficiente**. PMID 30910801 — [DOI](https://doi.org/10.1042/BCJ20180912)

Corrección importante:
- El "voltage gating" de las conexinas responde al **voltaje transjuntural (Vⱼ = diferencia de potencial entre las dos células acopladas)**, no al valor absoluto de despolarización de la membrana no-juntural. Una despolarización uniforme de todo el parche traumatizado NO genera Vⱼ y por sí sola NO dispararía el gating por voltaje. **Lo que cierra las uniones en el trauma es el Ca²⁺ᵢ elevado (y la acidificación), no la despolarización per se.** El corpus debe reformular "las conexinas se cierran cuando el Vmem se despolariza" → "cuando sube [Ca²⁺]ᵢ y baja el pHᵢ".

**Veredicto:** El cierre de gap junctions en la zona de trauma está bien fundamentado por la vía Ca²⁺/CaM. Corregir la atribución al voltaje absoluto. El concepto de "isla eléctrica desacoplada" es sostenible por la vía correcta.

---

### Afirmación 5 — El Vmem del macrófago correlaciona con M1 (despolarizado) vs M2
**Estado: PARCIAL — correlación real pero SIGNO CONTEXTO-DEPENDIENTE y con contraevidencia.**

Evidencia a favor de "M1 = despolarizado":
- **Hong et al. 2025** (*Front Immunol*): la estimulación eléctrica promueve repolarización M1→M2, asociada a **descenso de Kir2.1/TRPV2, y la despolarización se asocia al fenotipo proinflamatorio**; agonistas de Kir2.1 revierten la repolarización. PMID 41624842 — [DOI](https://doi.org/10.3389/fimmu.2025.1683500)
- **De Simone et al. 2015** (*J Neurochem*): el potencial de membrana **mitocondrial** (no plasmático) se despolariza en la activación M1 de microglía vía UCP2. Nota: es Vmem mitocondrial, no de membrana plasmática — no confundir. PMID 26173855 — [DOI](https://doi.org/10.1111/jnc.13244)

Evidencia EN CONTRA (signo opuesto):
- **Yu et al. 2022** (*Nat Commun*): el Vmem plasmático mantenido por **Kir2.1 promueve la inflamación**; cuando el macrófago **se despolariza (pierde Kir2.1) → restricción calórica → MENOS transcripción de genes inflamatorios**. Es decir, aquí **despolarización = anti-inflamatorio**, lo opuesto a la afirmación del corpus. PMID 35729093 — [DOI](https://doi.org/10.1038/s41467-022-31149-y)

**Veredicto:** Existe acoplamiento robusto entre Vmem y estado del macrófago, pero **la dirección no es universal**: depende del canal, tejido y estímulo. El corpus NO debe afirmar como hecho establecido "M1 = despolarizado, proinflamatorio". Debe decir: "el Vmem del macrófago es un regulador de su estado inflamatorio; la relación exacta de signo es contexto-dependiente".

---

### Afirmación 6 — "Catch-22 bioeléctrico": K⁺ elevado + gap junctions cerradas impiden la reparación
**Estado: DÉBIL como afirmación empírica — PLAUSIBLE como modelo conceptual.**

- La premisa mecánica de cada eslabón es defendible (K⁺ despolariza; Ca²⁺ cierra uniones). Pero la premisa de que estos estados son **sostenidos** —el corazón del "catch-22"— **está contradicha** por las mediciones: Nilsson 1993 muestra normalización de K⁺ y DC en ~3 min; la Na⁺/K⁺-ATPasa restaura activamente el gradiente. El bloqueo persistente solo aparece con isquemia/falla energética mantenida.
- No hay estudio que demuestre un "lock" bioeléctrico sostenido reversible por intervención externa en trauma agudo. El marco (Levin 2021) apoya que el desacople gap-juncional altera la información de patrón, pero **no ha sido medido en el escenario de trauma agudo del corpus**.

**Veredicto:** Presentar como **hipótesis de trabajo**, no como hecho. Añadir la condición explícita: el "catch-22" solo aplica si la depuración de K⁺ está comprometida (hipoperfusión, isquemia, falla de bomba) — que es justamente donde el argumento renal del documento cobra sentido. Esto en realidad *refuerza* la coherencia interna del documento si se enuncia con la condición.

---

### Afirmación 7 — "Vmem primario, pH derivado": el Vmem jerarquiza como organizador
**Estado: PARCIAL — defendible en marco morfogenético, NO como jerarquía causal universal.**

Evidencia a favor de Vmem como variable instructiva:
- **Levin 2021** (*Cell*): los patrones de Vmem, producidos por canales y gap junctions, **procesan información morfogenética que controla expresión génica** y decisiones de crecimiento/forma. PMID 33826908 — [DOI](https://doi.org/10.1016/j.cell.2021.02.034)
- **Srivastava, Levin et al. 2021** (*Bioelectricity*): metaanálisis que identifica firmas de Vmem específicas en cáncer/regeneración/desarrollo. PMID 34476377 — [DOI](https://doi.org/10.1089/bioe.2019.0034)

Evidencia de acoplamiento bidireccional (contra la primacía estricta):
- **Salameh, Dhein & Beuckelmann 2002** (*Pharmacol Res*): la **acidificación intracelular modifica el manejo de Na⁺/Ca²⁺** vía intercambiador Na⁺/H⁺ — es decir, el pH actúa río arriba de iones que fijan el Vmem, no solo río abajo. PMID 11820859 — [DOI](https://doi.org/10.1006/phrs.2001.0908)
- El documento satélite cita un "modelo matemático PLOS ONE 2014" de acoplamiento pH–Vmem, pero **el sistema es explícitamente bidireccional** (Na⁺/H⁺ y Cl⁻/HCO₃⁻ acoplan en ambos sentidos). Un modelo de acoplamiento mutuo **no jerarquiza** una variable sobre la otra por sí mismo.

**Veredicto:** La afirmación "Vmem es el organizador, pH es readout" es una **postura de modelo legítima y bien alineada con la escuela de Levin**, pero no es una verdad establecida por la biofísica: Vmem, pH y redox forman un sistema de retroalimentación mutua. Recomendación: enunciarla como **elección de encuadre** ("tratamos el Vmem como variable de control primaria porque es la más manipulable e instructiva morfogenéticamente"), no como hecho demostrado de causalidad. Esto es más honesto y menos atacable.

---

## Elementos nuevos que apoyan o refinan la hipótesis

1. **Kir2.1 como nodo Vmem–inflamación (Yu 2022, Nat Commun; Hong 2025, Front Immunol).** El canal rectificador entrante Kir2.1 emerge como el eslabón molecular concreto entre potencial de membrana e inflamación en macrófagos. Refina §6 del corpus: da un blanco molecular medible (Kir2.1) en lugar de "polarización M1/M2" genérica. Recomendado incorporar.
2. **La caída de [Ca²⁺]ₑ en el trauma agudo (Nilsson 1993).** El corpus enfatiza entrada de Ca²⁺ intracelular pero omite que la [Ca²⁺] *extracelular* cae abruptamente (1.1→0.1 mM). Esto conecta directamente con el rol de paratiroides/[Ca²⁺] que el documento propone en §9.6 — un refuerzo no explotado.
3. **El "window current" de Cav3 (Perez-Reyes 2003; El Ghaleb 2021)** da el mecanismo cuantitativo exacto de por qué una despolarización parcial sostenida (no un spike) produce carga tónica de Ca²⁺: la ventana entre activación e inactivación. Es el argumento biofísico más fuerte para la afirmación 3 y conviene citarlo explícitamente.
4. **Diffusión geometría-dependiente del K⁺ (Cascio/Kléber 1992):** el K⁺ acumulado depende del radio del tejido y de la difusión de CO₂ — apoya la lógica del corpus de que la **depuración por difusión hacia el lecho vascular** (y por tanto la perfusión) gobierna la resolución. Sustento cuantitativo para el argumento renal/perfusión.

---

## Evidencia contradictoria o límites importantes

1. **Normalización iónica rápida (Nilsson 1993):** el hallazgo más incómodo para el modelo. El K⁺ y el Vmem se recuperan en minutos tras contusión aguda. El modelo del "estado despolarizado atrapado" necesita un mecanismo de mantenimiento (isquemia, edema, falla de bomba) — que debe declararse.
2. **Signo invertido del Vmem del macrófago (Yu 2022):** contradice directamente "despolarizado = proinflamatorio".
3. **Gating de conexinas por Vⱼ, no por despolarización absoluta:** error conceptual repetido en el corpus.
4. **Acoplamiento pH↔Vmem bidireccional (Salameh 2002):** debilita la jerarquía estricta "Vmem primario".
5. **Umbral del canal L:** el número −40 mV es el borde inferior; la activación robusta es ~−30/−20 mV.

---

## Hallazgos multiidioma (alemán / ruso / japonés / chino)

Nota metodológica honesta: PubMed indexa mayoritariamente títulos en inglés y las búsquedas con términos en alemán/ruso/japonés/chino **devolvieron resultados nulos** (la base traduce los títulos al inglés). No obstante, varias piezas clave provienen de **grupos no anglófonos**, publicadas en inglés:

- **Alemán/suizo (electrofisiología del K⁺):** Cascio, Yan & **Kléber** (Universidad de Berna, Suiza), *Circ Res* 1992 — escuela germano-suiza clásica de acumulación de K⁺ en isquemia. PMID 1735138 — [DOI](https://doi.org/10.1161/01.res.70.2.409). También **Salameh/Dhein** (Universität Leipzig), *Pharmacol Res* 2002, sobre pH↔Na⁺/Ca²⁺. PMID 11820859 — [DOI](https://doi.org/10.1006/phrs.2001.0908)
- **Sueco (microelectrodos ion-selectivos en trauma):** **Nilsson, Hillered, Olsson & Hansen** (Uppsala University Hospital), *J Cereb Blood Flow Metab* 1993 — la medición directa [K⁺]ₑ/[Ca²⁺]ₑ más relevante del dossier. PMID 8436609 — [DOI](https://doi.org/10.1038/jcbfm.1993.22)
- **Japonés (concusión y K⁺/glutamato):** **Katayama** (autor japonés; trabajo UCLA), *J Neurosurg* 1990. PMID 1977896 — [DOI](https://doi.org/10.3171/jns.1990.73.6.0889). **Obata T.** (Ohu University, Japón), *J Neural Transm* 2006, sobre despolarización por K⁺ y radicales. PMID 16463115 — [DOI](https://doi.org/10.1007/s00702-005-0415-0)
- **Chino (Vmem–inflamación macrofágica):** **Yu et al.** (Zhejiang University), *Nat Commun* 2022 (Kir2.1). PMID 35729093 — [DOI](https://doi.org/10.1038/s41467-022-31149-y). **Hong et al.** (Shantou Central Hospital), *Front Immunol* 2025 (TENS/Kir2.1/M1-M2). PMID 41624842 — [DOI](https://doi.org/10.3389/fimmu.2025.1683500)

Recomendación: no afirmar "búsqueda multiidioma exhaustiva". La literatura primaria relevante está en inglés; los clásicos en ruso (escuela de Bureš/Vyskočil sobre spreading depression) y alemán existen pero se acceden vía traducciones/reviews inglesas. Reportado con transparencia.

---

## Correcciones a las citas del corpus original

| Cita del corpus | Estado | Corrección |
|---|---|---|
| §2.1 "[K⁺]ₒ sube a 20–40 mM o más" | Impreciso | Verificado que sube, pero pico real >60 mM (contusión, Nilsson 1993) o ~10–15 mM (isquemia, Cascio 1992). No hay un "20–40 mM" canónico. Añadir estas dos citas primarias, que el corpus NO tiene. |
| §2.1 "Vmem de −70 a −30/−40 mV" | Correcto | Sostener. Confirmado por Nilsson (DC shift) y por Nernst. |
| §2.2 "canales tipo L a −40 mV" | Ligeramente optimista | Umbral L más bien −30/−20 mV. Citar Perez-Reyes 2003 (PMID 12506128) para el tipo T (correcto, −60/LVA). |
| §2.2 "las conexinas se cierran cuando el Vmem se despolariza" | Incorrecto mecanísticamente | El gating por voltaje es transjuntural (Vⱼ); el cierre en trauma es por Ca²⁺ᵢ/CaM y acidificación. Citar Peracchia 2020/2021 y Wei 2019. |
| §2.3 / §6 "catch-22 sostenido" | No demostrado | Reformular como hipótesis condicionada a depuración de K⁺ comprometida. Nilsson muestra normalización en 3 min. |
| §2.2 y §6 "M1 proinflamatorio = despolarizado" (Vergallo 2013; Wang 2019 citados) | Contexto-dependiente | Añadir contraevidencia Yu 2022 (despolarización = anti-inflamatoria). No enunciar como regla fija. Sustituir/complementar con Yu 2022 y Hong 2025, citas primarias fuertes ausentes en el corpus. |
| Documento satélite: jerarquía "Vmem primario, pH derivado" | Elección de modelo, no hecho | Enunciar como encuadre. Añadir Salameh 2002 (pH→Na⁺/Ca²⁺, acoplamiento bidireccional). |
| Documento satélite: "Kaneda et al. 2025 PC12 Kv" (ref. 2) | Verificar aparte (fuera de T1) | No verificado en este barrido; corresponde al tópico de campos magnéticos, no a T1. Marcado para T-magnetismo. |

---

## Bibliografía verificada

*(Todas confirmadas en PubMed: autores, año, journal y contenido revisados contra el abstract.)*

1. Nilsson P, Hillered L, Olsson Y, Sheardown MJ, Hansen AJ. Regional changes in interstitial K⁺ and Ca²⁺ levels following cortical compression contusion trauma in rats. *J Cereb Blood Flow Metab*. 1993;13(2):183-92. PMID 8436609 — [DOI](https://doi.org/10.1038/jcbfm.1993.22). — Medición directa con microelectrodos: [K⁺]ₑ 3→>60 mM, [Ca²⁺]ₑ 1.1→0.1 mM, normalización en 3 min. Cita central de T1; corrige magnitud y duración.
2. Katayama Y, Becker DP, Tamura T, Hovda DA. Massive increases in extracellular potassium and the indiscriminate release of glutamate following concussive brain injury. *J Neurosurg*. 1990;73(6):889-900. PMID 1977896 — [DOI](https://doi.org/10.3171/jns.1990.73.6.0889). — Microdiálisis; K⁺ hasta ~4.3–5.9× basal, ligado a glutamato.
3. Cascio WE, Yan GX, Kléber AG. Early changes in extracellular potassium in ischemic rabbit myocardium: role of extracellular CO₂ accumulation and diffusion. *Circ Res*. 1992;70(2):409-22. PMID 1735138 — [DOI](https://doi.org/10.1161/01.res.70.2.409). — Plateau isquémico de K⁺ (~2.5–14 mM), dependiente de difusión y geometría.
4. Clausen T, Zauner A, Levasseur JE, Rice AC, Bullock R. Induced mitochondrial failure in the feline brain. *Brain Res*. 2001;908(1):35-48. PMID 11457429 — [DOI](https://doi.org/10.1016/s0006-8993(01)02566-5). — Falla mitocondrial → lactato/acidosis; apoya que la acidosis es consecuencia metabólica.
5. Perez-Reyes E. Molecular physiology of low-voltage-activated T-type calcium channels. *Physiol Rev*. 2003;83(1):117-61. PMID 12506128 — [DOI](https://doi.org/10.1152/physrev.00018.2002). — Revisión canónica: canales T (Cav3) LVA, low-threshold spikes, window current cerca del reposo.
6. El Ghaleb Y, et al. CACNA1I gain-of-function mutations differentially affect channel gating and cause neurodevelopmental disorders. *Brain*. 2021;144(7):2092-2106. PMID 33704440 — [DOI](https://doi.org/10.1093/brain/awab101). — Aumento de window current → influjo de Ca²⁺ a potenciales de reposo → toxicidad por calcio.
7. Peracchia C. Calmodulin-Mediated Regulation of Gap Junction Channels. *Int J Mol Sci*. 2020;21(2):485. PMID 31940951 — [DOI](https://doi.org/10.3390/ijms21020485). — Gating químico de gap junctions por Ca²⁺ nanomolar vía CaM (modelo Cork).
8. Peracchia C, Leverone Peracchia LM. Calmodulin-Connexin Partnership in Gap Junction Channel Regulation — Calmodulin-Cork Gating Model. *Int J Mol Sci*. 2021;22(23):13055. PMID 34884859 — [DOI](https://doi.org/10.3390/ijms222313055). — Modelo Ca-CaM-Cork; incluye gating por voltaje transjuntural.
9. Wei S, Cassara C, Lin X, Veenstra RD. Calcium-calmodulin gating of a pH-insensitive isoform of connexin43 gap junctions. *Biochem J*. 2019;476(7):1137-1148. PMID 30910801 — [DOI](https://doi.org/10.1042/BCJ20180912). — Ca²⁺/CaM cierra Cx43 independientemente del pH: el Ca²⁺ es gate suficiente.
10. Yu W, Wang Z, et al. Kir2.1-mediated membrane potential promotes nutrient acquisition and inflammation through regulation of nutrient transporters. *Nat Commun*. 2022;13(1):3544. PMID 35729093 — [DOI](https://doi.org/10.1038/s41467-022-31149-y). — Vmem (Kir2.1) regula inflamación del macrófago; contraevidencia al signo asumido (despolarización = anti-inflamatoria aquí).
11. Hong T, Liu X, et al. TENS alleviates CP/CPPS-related inflammation and pain by modulating Kir2.1-dependent macrophage polarization. *Front Immunol*. 2026;16:1683500 (epub 2026-01-12). PMID 41624842 — [DOI](https://doi.org/10.3389/fimmu.2025.1683500). — ES/TENS induce repolarización M1→M2 vía Kir2.1/TRPV2; apoya "M1 despolarizado".
12. De Simone R, et al. The mitochondrial uncoupling protein-2 is a master regulator of both M1 and M2 microglial responses. *J Neurochem*. 2015;135(1):147-56. PMID 26173855 — [DOI](https://doi.org/10.1111/jnc.13244). — Potencial de membrana mitocondrial (no plasmático) en polarización M1/M2. Precaución: no confundir Vmem mitocondrial con plasmático.
13. Levin M. Bioelectric signaling: reprogrammable circuits underlying embryogenesis, regeneration, and cancer. *Cell*. 2021;184(8):1971-1989. PMID 33826908 — [DOI](https://doi.org/10.1016/j.cell.2021.02.034). — Marco de Vmem como variable instructiva morfogenética (base de la tesis "Vmem organizador").
14. Srivastava P, Kane A, Harrison C, Levin M. A Meta-Analysis of Bioelectric Data in Cancer, Embryogenesis, and Regeneration. *Bioelectricity*. 2021;3(1):42-67. PMID 34476377 — [DOI](https://doi.org/10.1089/bioe.2019.0034). — Firmas de Vmem en distintos estados; apoyo cuantitativo al rol de Vmem.
15. Salameh A, Dhein S, Beuckelmann DJ. Role of the cardiac Na⁺/H⁺ exchanger in [Ca²⁺]ᵢ and [Na⁺]ᵢ handling during intracellular acidosis. *Pharmacol Res*. 2002;45(1):35-41. PMID 11820859 — [DOI](https://doi.org/10.1006/phrs.2001.0908). — pH intracelular modula Na⁺/Ca²⁺: acoplamiento bidireccional, matiza la jerarquía "Vmem primario".
16. Obata T. Nitric oxide and MPP⁺-induced hydroxyl radical generation. *J Neural Transm (Vienna)*. 2006;113(9):1131-44. PMID 16463115 — [DOI](https://doi.org/10.1007/s00702-005-0415-0). — Despolarización por K⁺ acopla a generación de radicales; nexo Vmem–redox.

---

*Dossier T1 — Instituto Centrobioenergetica, 2026. Búsqueda vía PubMed (search_articles / get_article_metadata). Postura crítica y balanceada: se reportan tanto los apoyos como los límites y contraevidencias de cada afirmación.*
