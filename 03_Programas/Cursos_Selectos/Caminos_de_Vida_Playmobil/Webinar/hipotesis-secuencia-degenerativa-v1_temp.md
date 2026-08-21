# Hipótesis de secuencia degenerativa

## No una flecha nueva: un orden entre flechas que este repositorio ya tenía sueltas

**Versión:** 1.0 — 21 de agosto de 2026
**Autor:** Dr. Miguel Ojeda Rios
**Estatuto general:** `[HIPÓTESIS]` — propuesta falsable. No es medicina establecida ni recomendación diagnóstica o terapéutica.
**Para quién:** lector con formación biomédica. No supone haber leído otros documentos; los términos del formalismo se definen al usarlos.
**Procedencia:** el borrador llegó de fuera, generado por otro sistema. **Se corrigen aquí un error de mecanismo y dos de asignación**, y se recorta la reclamación a lo que queda en pie.

---

## Lo primero, porque decide cómo leer el resto

**Esto no propone ningún mecanismo nuevo.** Propone que cinco mecanismos ya descritos **están ordenados**, y que el primero habilita al segundo y así sucesivamente. La reclamación es el orden, no las piezas.

Y hay que decir de entrada lo que las piezas son:

| Fase | Mecanismo | Dónde está ya |
|---|---|---|
| 1 | Pérdida de la ventana de escasez → se apaga el permiso de la limpieza mitocondrial | **T8** de la tipología |
| 2 | Agotamiento de cofactor → **el operador se invierte** y produce el propio agente de daño | **HPR-01**, catálogo de permisos restaurables |
| 3 | Fuga del compartimento mitocondrial → inflamación sin infección | **T11**; instanciado como F9 en diabetes |
| 4 | Desacoplamiento del colectivo | contracción de $\Lambda$ |
| 5 | Marca epigenética que sobrevive a la normalización | **T3**; instanciado como F5 |

> **Cuatro de las cinco fases ya existen en este repositorio, y la tercera, cuarta y quinta juntas son una cascada publicada con nombre propio en biología del envejecimiento.** Ver el apartado de novedad. Lo que aquí se añade es la afirmación de que **la fase 1 es la que abre la puerta**, y una predicción sobre la fase 4.

---

## 1. El objeto

**Objeto:** la secuencia por la que un tejido sometido a estrés oxidativo crónico pierde función, y el orden en que sus restricciones se reescriben.

**No es** el daño oxidativo molecular, que es el sustrato.
**No es** ninguna enfermedad concreta; es un patrón que se instancia en varias.

**El caso que tiene que explicar:** el tejido que ha perdido función **con el suministro energético intacto.**

---

## 2. La corrección de mecanismo, que cambia la historia

El borrador afirmaba que en la fase 3 el sensor citosólico de ADN **reconoce el ADN mitocondrial «por su origen ancestral», por estar hipometilado**, y lo trata como una bacteria invasora. **Eso es falso.**

> **cGAS detecta ADN de doble cadena de forma dependiente de la longitud pero independiente de la secuencia, «meaning it cannot discriminate self-DNA from foreign DNA»** — Zheng et al., *Int J Mol Sci* 2023;24(19):14738, [PMID 37834184](https://pubmed.ncbi.nlm.nih.gov/37834184/). El receptor que lee CpG no metilado es TLR9, que es otro.

**Lo que dispara la respuesta no es la identidad del ADN: es su localización.** El sensor funciona correctamente y no sabe qué está leyendo.

> **La corrección aprieta la tesis en vez de aflojarla.** Si el reconocimiento fuese por firma ancestral, esto sería un relato sobre un conflicto evolutivo que resurge, y no habría cómo contrastarlo. Al ser solo por compartimento, **es exactamente ruptura de frontera**: una restricción organizacional —el ADN va dentro de un compartimento— que deja de sostenerse. Y eso predice algo que el relato ancestral no predice: **restaurar el compartimento debe bastar, sin tocar el sensor.**

---

## 3. Las dos correcciones de asignación

**$\Lambda$ no es una molécula.** $\Lambda$ es *la escala máxima cuyo desvío hace actuar al controlador*. El borrador ponía ahí el acoplamiento por conexinas. Lo correcto:

| | Asignación |
|---|---|
| $\Lambda$ | **el tejido** — la escala a la que la célula todavía computa un problema |
| Conexina 36 | **lo que sostiene la pertenencia a esa escala.** Es operador, no escala |
| Su pérdida | **$\delta_\Lambda$** — el efecto, no la definición |

**$H$ no son las reservas.** El borrador asignaba a $H$ el glutatión reducido y la fosfocreatina. **Un depósito no ve hacia delante: absorbe.** La firma de $\delta_H$ es **pérdida de respuesta anticipatoria**, y si $H$ se define como reserva, $\delta_H$ deja de distinguirse de quedarse sin algo.

- **Se queda en $H$:** la oscilación circadiana, que sí es estructura anticipatoria.
- **Se mueve a $S$:** las reservas tamponantes, que son estado.

---

## 4. La secuencia, corregida

**Fase 1 — se apaga el permiso.** El estímulo continuo anula el contraste prandial y circadiano. Sin ventana de escasez, la señal permisiva que autoriza la limpieza mitocondrial no se emite. **No hay daño todavía: hay un permiso apagado**, que es lo que hace de esta fase la única barata de revertir.

**Fase 2 — el operador se invierte.** Al agotarse el cofactor de acoplamiento, la enzima **no deja de funcionar: funciona al revés** y produce el agente oxidante en lugar del producto útil. El estresor fabrica su propio daño a través de una restricción vacía.

**Fase 3 — gotea el compartimento.** Sin limpieza (fase 1) y con producción aumentada de oxidante (fase 2), el material mitocondrial alcanza el citosol y activa un sensor que **no puede saber de dónde viene**. Inflamación estéril.

**Fase 4 — la célula se desacopla.** Reduce su conexión con el colectivo. **Aquí está la única reclamación propia de este documento**; ver la predicción P4.

**Fase 5 — se fija.** La inflamación sostenida deja marca de histona que **sobrevive a la normalización del medio**. `[EVIDENCIA]` en modelo: estímulo transitorio de glucosa alta produce secreción inflamatoria persistente tras volver a glucosa normal, con monometilación de H3K4 y set7/9 — Yunlei D et al., *Cell Physiol Biochem* 2018;49(5):1747–54, [PMID 30231246](https://pubmed.ncbi.nlm.nih.gov/30231246/). **Células mesangiales de rata, in vitro:** no se extrapole a tejido humano.

---

## 5. Lo único que este documento reclama

### P4 — El desacoplamiento es una optimización local, no una avería `[HIPÓTESIS]`

La lectura habitual es que la célula pierde el acoplamiento porque está dañada. **La lectura del marco es la contraria:** desacoplarse la protege de las citocinas del vecindario, y al hacerlo **su propio estado energético se estabiliza**. El agente sigue siendo competente — **su problema se hizo pequeño.**

**Predicción, que es lo que la separa de la lectura habitual:**

> **La célula desacoplada debe estar individualmente mejor que la acoplada del mismo tejido**, medido en su propia variable defendida, **mientras la función del tejido cae.** Si el desacoplamiento fuese avería, la célula desacoplada debería estar igual o peor.

**Qué la refutaría:** que las células con acoplamiento reducido muestren peor estado energético individual que sus vecinas acopladas en el mismo tejido.
**Coste:** medio. Requiere medida por célula con marcaje de acoplamiento, no promedio de tejido — **y el promedio de tejido es precisamente lo que no puede distinguir las dos lecturas.**

### P2 — Umbral estequiométrico, no dosis-respuesta `[DEL FORMALISMO]`

La inversión del operador de la fase 2 **no debe seguir una curva dosis-respuesta con la concentración del cofactor, sino un escalón gobernado por la razón cofactor/enzima.** Es la distinción entre un operador caro y un operador prohibido: por encima del umbral responde, por debajo **se invierte**.

**Consecuencia práctica:** medir concentraciones absolutas del cofactor da falsos negativos. Hay que medir la razón.
**Qué la refutaría:** que el daño escale linealmente con la concentración absoluta.

---

## 6. Novedad `[SIN DECLARAR PARA LA SECUENCIA COMPLETA]`

**Las fases 3, 4 y 5 juntas son una cascada publicada.** La consulta *«mitochondrial DNA AND cGAS AND STING AND (senescence OR SASP)»* devuelve **125 resultados**. Es el eje central de la biología del envejecimiento de la última década, y tiene nombre propio en ese campo. **Para ese tramo, N0.**

**Lo que no he buscado, y por tanto no puedo declarar:**
- si la **fase 1 como iniciadora** —que la pérdida de ventana de escasez es lo que abre la secuencia— está publicada como tal;
- si **P4** está formulada en algún sitio. Es lo que más me interesaría comprobar y **no está hecho.**

**Estimación de partida, como siempre aquí: N0 salvo prueba en contra.**

---

## 7. Discordancias

**D1 — La asignación de $E$ está en disputa y este documento la hereda sin resolverla.** El borrador asigna $E$ al potencial de fosforilación. La instanciación de redox de este repositorio lo asigna al potencial redox por compartimento. La instanciación bioenergética asigna lo primero y **declara la segunda como rival no discriminado.** Tres documentos, dos asignaciones, ningún experimento. Registrado aparte en [`disputa-asignacion-E-v1.md`](../disputa-asignacion-E-v1.md).

**D2 — El orden es más débil que las piezas.** Cada fase tiene apoyo propio; **que ocurran en este orden y que cada una habilite a la siguiente no está demostrado en ningún sistema.** Es coherente, y coherente no es evidencia.

**D3 — La fase 4 está descrita con verbos de decisión.** El borrador decía que la célula «decide» aislarse. Lo he reescrito, pero **el problema de fondo sigue**: no hay un mecanismo propuesto para el desacoplamiento, solo una función que cumpliría. Una ventaja no es una causa.

**D4 — La secuencia explica demasiado bien.** Con cinco fases encadenadas y este vocabulario, casi cualquier degeneración tisular encaja después de conocerla. **Por eso P4 tiene que llevar el peso**: es la única que puede salir mal.

---

## 8. Condiciones de refutación

1. Que el desacoplamiento intercelular resulte **desventajoso para la célula individual** — cae P4, que es lo único propio.
2. Que restaurar el compartimento mitocondrial **no baste** para revertir la inflamación estéril, y haga falta intervenir sobre el sensor — caería la corrección de la fase 3 y con ella la lectura de ruptura de frontera.
3. Que la secuencia se observe **empezando por la fase 3 sin fase 1 previa** en un número apreciable de casos — caería la afirmación de orden, que es la reclamación central.

> **La condición que el borrador traía y se retira:** proponía abandonar la hipótesis si los antioxidantes de amplio espectro detuvieran la degeneración sin restaurar la compartimentación. **Eso ya está satisfecho en la dirección que protege la hipótesis**, porque esos antioxidantes no la detienen. Una condición de refutación que ya se cumple a tu favor no refuta nada.

---

## 9. Límites

- **Búsqueda parcial.** Se verificaron el mecanismo del sensor y la marca epigenética, y se comprobó que el tramo 3–5 está publicado. **No se buscó la fase 1 como iniciadora ni P4.**
- **La fase 5 se apoya en un único modelo**, células de rata in vitro.
- **La fase 2 no está instanciada aquí con su cofactor**: se enuncia en general y el caso concreto vive en el catálogo de permisos restaurables.
- **No hay tabla de instanciación ni vector de fallo propios.** No es una instanciación: es una hipótesis de orden sobre flechas ya instanciadas en otros documentos. **Si algún día reclama ser instanciación, le faltan las dos cosas.**
