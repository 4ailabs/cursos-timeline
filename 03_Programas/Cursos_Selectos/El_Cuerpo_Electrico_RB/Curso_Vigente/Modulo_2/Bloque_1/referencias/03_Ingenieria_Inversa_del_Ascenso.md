# Ingeniería inversa del ascenso del dolor
## Por qué sube, qué agente lo carga en cada nivel, qué tipo de control falla — y qué mecanismos no habíamos visto

**Instituto Centrobioenergetica · julio 2026 · insumo para el Módulo 2, Bloque 1**

> Encargo: desarmar el ascenso del dolor por ingeniería inversa. No *qué pasa* en cada etapa —eso ya lo describe la cascada— sino **por qué el sistema entrega la meta hacia arriba**, qué tipo de control falla en cada nivel, y qué mecanismos implicados no hemos incorporado todavía.
> **Marcado:** las referencias con PMID/DOI están verificadas. Lo marcado como *(pendiente)* se localizó sin confirmar ficha completa.

---

## El hallazgo principal, por adelantado

**El termostato es la imagen correcta abajo y se queda corta arriba.** Cada nivel del eje falla con **un tipo de control distinto**, y por eso cada uno necesita una clase de instrucción distinta:

| Nivel | Tipo de control | Cómo falla |
|---|---|---|
| **Tejido** | **Set point** — un termostato | El punto se desplaza |
| **Segmento** | **Ganancia** — un amplificador | La ganancia sube |
| **Descendente** | **El sentido del freno** | **El freno se vuelve acelerador** |
| **Red** | **Un modelo del mundo** | El modelo deja de actualizarse |

> El tercero es el que rompe la metáfora. Ahí **no se movió el valor de referencia: se invirtió el signo de la retroalimentación.** Un lazo negativo que se vuelve positivo no es un termostato mal puesto — es **un sistema en fuga**. Y eso explica por qué, cuando el dolor alcanza ese nivel, se cronifica tan rápido.

---

# Parte A · El método

Para cada nivel se preguntan seis cosas. Las cuatro primeras describen al agente; **las dos últimas son las que hacen la ingeniería inversa**, porque explican el movimiento.

1. **¿Qué agente opera aquí?**
2. **¿Cuál es su meta?**
3. **¿Qué variable controla?**
4. **¿Qué señal de error lee?**
5. **¿Qué lo hace entregar la meta hacia arriba?** — la condición de escalada
6. **¿Qué lo haría recibirla de vuelta?** — la condición de retorno

> La pregunta 5 es la que falta en toda descripción convencional de la cascada. Se describe que el dolor sube; **no se dice qué lo hace subir.** Y la 6 es la que convierte todo esto en clínica.

---

# Parte B · La escalera, nivel por nivel

## Nivel 1 · El tejido — la isla

| | |
|---|---|
| **Agente** | El parche de tejido y sus células inmunes locales |
| **Meta** | Contener el daño, retirar lo dañado, reparar |
| **Variable** | El estado del microambiente — Vmem, potasio, mediadores |
| **Señal de error** | Daño detectado en su territorio |
| **Escala cuando…** | **El programa no resuelve dentro de su ventana.** La señal persiste, y la persistencia misma es la que informa al nivel de arriba de que aquí no se pudo |
| **Vuelve cuando…** | El microambiente se recalibra y **la señal deja de emitirse** |

**Lo observable:** el rastreo marca en la zona. Cierra con dipolo local o renal.

## Nivel 2 · El segmento — el asta dorsal

| | |
|---|---|
| **Agente** | El circuito espinal del segmento, con su glía |
| **Meta** | Proteger el territorio segmentario, no solo el punto |
| **Variable** | **La ganancia** con que se transmite la señal ascendente |
| **Señal de error** | Input nociceptivo repetido desde abajo |
| **Escala cuando…** | El input persiste. El circuito **sube la ganancia** —potenciación, pérdida de inhibición, sumación temporal— y **amplía el territorio protegido**. Es una decisión correcta: si abajo no resuelve, conviene proteger más y con más margen |
| **Vuelve cuando…** | La ganancia baja. Requiere **que cese el input y que el freno inhibitorio se restituya** |

**Lo observable:** el dolor se extiende más allá de la zona; hipersensibilidad regional; **sumación temporal** medible.

> **Aquí ocurre la primera pérdida estructural**: la microglía **poda sinapsis inhibitorias**. El freno no se debilita — se retira.

## Nivel 3 · El control descendente — la RVM

| | |
|---|---|
| **Agente** | El sistema de modulación descendente |
| **Meta** | Decidir cuánta protección conviene **al organismo entero**, no al segmento |
| **Variable** | **El signo y la magnitud** de lo que baja: inhibir o facilitar |
| **Señal de error** | Discrepancia entre la amenaza estimada globalmente y la protección aplicada |
| **Escala cuando…** | La amenaza estimada es alta y sostenida. **El sistema pasa de inhibir a facilitar** — menos freno y más acelerador a la vez |
| **Vuelve cuando…** | Baja la estimación global de amenaza. **Es el nivel más sensible a todo lo que no es el tejido**: sueño, carga, contexto |

**Lo observable:** dolor con tono simpático que aumenta la sensibilidad; poca relación con la carga mecánica; **inhibición condicionada disminuida** (ver Parte D).

> **Y aquí está la ruptura conceptual.** En los niveles 1 y 2 se desplaza un valor o una ganancia. Aquí **se invierte el sentido del freno**. Lo que existía para amortiguar empieza a amplificar. Es un cambio de **tipo**, no de grado — y es la razón mecanicista de por qué a partir de aquí el cuadro se sostiene solo.

## Nivel 4 · La red — corteza y sistema límbico

| | |
|---|---|
| **Agente** | El colectivo entero |
| **Meta** | Anticipar la amenaza antes de que ocurra |
| **Variable** | **El modelo** — lo que el sistema espera que pase |
| **Señal de error** | Discrepancia entre lo predicho y lo recibido |
| **Escala cuando…** | La experiencia se repite lo bastante como para volverse **predicción por defecto**. El dolor se incrusta en memoria y emoción |
| **Vuelve cuando…** | **Llega evidencia que contradice la predicción** — y el sistema está en condiciones de ponderarla |

**Lo observable:** dolor con mínimo input periférico; ganancia global subida; cambios de conectividad y de volumen, **parcialmente reversibles con tratamiento efectivo**.

> Aquí lo que se defiende ya **no es un valor: es una creencia sobre el mundo.** Por eso en este nivel una instrucción que solo cambie el estado no basta — hace falta **una experiencia que la contradiga**.

---

# Parte C · La respuesta a "¿termostatos o más?"

**Más.** Cuatro tipos de control, y cada uno necesita una clase distinta de instrucción:

| Nivel | Control | Falla | Qué instrucción lo mueve |
|---|---|---|---|
| **Tejido** | Set point | El punto se desplaza | **Restaurar condiciones** para que el agente recalibre |
| **Segmento** | Ganancia | La ganancia sube y el territorio se amplía | **Retirar el input y devolver feedback fiable** |
| **Descendente** | Sentido del freno | **El freno se invierte** | **Restituir el signo** — bajar la estimación global de amenaza |
| **Red** | Modelo predictivo | El modelo deja de actualizarse | **Evidencia que contradiga la predicción** |

**Tres consecuencias que valen para la clínica:**

1. **Una instrucción del tipo equivocado no funciona, aunque llegue al nivel correcto.** Restaurar condiciones sirve en el tejido; en la red hace falta contradicción, no condiciones.
2. **El nivel descendente es el punto de no retorno funcional.** Mientras el lazo conserva su signo, el sistema tiende a volver solo. Una vez invertido, ya no.
3. **Y explica la ventana.** En el nivel 1 hay una ventana biológica —el programa tiene que resolver a tiempo—; en el nivel 4, la ventana es de otra clase: **la que abre una experiencia contradictoria**.

> **Reformulado en el eje de persuadibilidad:** los cuatro niveles siguen siendo clase B —ninguno se recablea—, pero **lo que se reescribe cambia**: abajo se reescribe un valor, en medio una ganancia, luego un signo, y arriba un modelo.

---

# Parte D · Los mecanismos que no habíamos visto

Ordenados por el nivel donde actúan, y leídos en clave de agencia.

## D.1 · El sueño — el que más falta nos hacía

**Lo que está medido.** Tras una noche sin dormir:

- La actividad de la corteza somatosensorial primaria ante estímulo doloroso **aumentó un 126%**.
- El umbral térmico para clasificar un estímulo como desagradable **cayó más de 1 °C**.
- Y —esto es lo interesante— **se embotó la respuesta en las regiones de valoración y decisión** (estriado, ínsula).

> **El sistema amplificó la señal y a la vez perdió la capacidad de ponderarla.** Sube el volumen y se rompe la perilla.

**Y hay más:** la privación total de sueño **deteriora la inhibición condicionada y facilita la sumación temporal**. Es decir: **toca el freno descendente y el acelerador segmentario a la vez.**

**Lectura agencial — y es la que lo vuelve importante:**

> **El sueño es la ventana de mantenimiento del agente.** Es cuando recalibra. Un organismo que no duerme no es solo uno cansado: **es uno que perdió su periodo de recalibración**, y por eso queda con la ganancia arriba y sin criterio para bajarla.

Esto **reclasifica el sueño** dentro de nuestro material: hoy aparece como una *comorbilidad* del fenotipo nociplástico. **Es un mecanismo**, y actúa sobre los niveles 2, 3 y 4 simultáneamente.

*Krause AJ, Prather AA, Wager TD, Lindquist MA, Walker MP. The pain of sleep loss: a brain characterization in humans. J Neurosci. 2019;39(12):2291-2300.*

## D.2 · El freno y el acelerador, medibles sin imán

Dos pruebas conductuales que leen **vías distintas** del eje, y que un terapeuta puede aprender:

**Inhibición condicionada del dolor (CPM) — "el dolor inhibe al dolor".** Un estímulo doloroso aplicado en otra región **reduce** el dolor de un estímulo de prueba. Es el correlato conductual de la **inhibición descendente**. Está **disminuida** en dolor lumbar crónico, fibromialgia y artrosis severa, y su deterioro se asocia a empeoramiento del dolor.

**Sumación temporal.** Estímulos idénticos repetidos producen dolor creciente. Es el correlato conductual del **wind-up** — el proceso **facilitador ascendente** del nivel 2.

> **Son dos preguntas al sistema: una sobre su freno, otra sobre su acelerador.** Y miden cosas distintas — su concordancia es limitada, así que no se sustituyen.

**Por qué importa tanto para nosotros:** son **dos preguntas más en el repertorio del rastreo, y no necesitan imán.** El Bloque 1 sostiene que la pericia está en la calidad de la pregunta; aquí hay dos preguntas nuevas, con respaldo publicado, dirigidas a un nivel que hoy solo inferimos.

*(Literatura amplia y consolidada; fichas concretas pendientes de verificar antes de material del alumno.)*

## D.3 · El desuso — cómo el agente se queda sin evidencia

El bucle del **miedo-evitación**: dolor → miedo al movimiento → evitación → **desuso** → menos entrada propioceptiva y más discapacidad → **el prior domina porque no hay evidencia que lo contradiga**.

**Lectura agencial:**

> **El agente deja de recibir la información que le permitiría actualizar su modelo.** No es que se equivoque: es que **dejó de mirar**. Es una ceguera autoinducida por protección.

**Y encaja exactamente con las tres vías de recalibración** que vimos en el Bloque 2: la primera es **amplificar la retroalimentación sensorial**. El desuso hace justo lo contrario — por eso es tan eficaz manteniendo el cuadro.

**Consecuencia clínica que conviene decir:** el reposo prolongado no es neutro. **Es una instrucción**, y dice *"aquí sigue habiendo peligro"*.

*(Modelo de miedo-evitación, Vlaeyen & Linton 2000 y revisiones posteriores — fichas pendientes de verificar.)*

## D.4 · El mapa del cuerpo pierde resolución

En dolor crónico —sobre todo en dolor regional complejo y miembro fantasma— se han descrito **cambios en la representación cortical** de la parte afectada, y **menor activación sensoriomotora** de esa región.

**Lectura agencial:** el agente **pierde resolución sobre su propio mapa**. Deja de saber con precisión dónde está la parte. Es degradación **del modelo de sí mismo**, no del territorio.

**Y aquí una precisión que hay que mantener**, porque es tentador exagerar el dato: la **imaginería motora graduada** —reconocimiento de lateralidad, imaginería, terapia de espejo— tiene **evidencia de resultado** en dolor regional complejo tipo 1 y miembro fantasma. Pero **la tesis causal de que el "difuminado" del mapa produce el dolor ha sido cuestionada** en la literatura reciente. Se enseña como **fenómeno descrito y terapia con evidencia de resultado**, no como mecanismo establecido.

## D.5 · Lo que la propia cascada nombra y no hemos desarrollado

Están en la figura del eje inflamatorio, se mencionan y no se trabajan. Quedan como pendientes explícitos:

- **Eje intestino-inmune-dolor** — disbiosis y transferencia de hipersensibilidad.
- **Dimorfismo sexual** — vías microgliales frente a vías de células T.
- **Epigenética inducida por el entorno.**
- **Autoinmunidad** — autoanticuerpos en algunos cuadros.

---

## D.6 · Lo que de todo esto se puede medir en consulta

Esto es lo que convierte la ingeniería inversa en algo operable:

| Qué se pregunta | Qué nivel informa | Cómo |
|---|---|---|
| **Sueño** — continuidad y reparación | 2, 3 y 4 a la vez | Anamnesis dirigida |
| **Inhibición condicionada** | 3 · el freno descendente | Prueba conductual |
| **Sumación temporal** | 2 · el acelerador segmentario | Prueba conductual |
| **Uso y movimiento** | 4 · si el modelo recibe evidencia | Historia de actividad y evitación |
| **HRV / tono autonómico** | 3 y moduladores | Ya en el corpus |
| **El mapa corporal del paciente** | 4 · resolución del modelo de sí | Ya lo levantamos |

> Cinco de las seis **no requieren imán**. Son preguntas al agente por otras vías — y encajan sin fricción con la hoja de valoración previa.

---

# Parte E · Qué cambia esto en el Bloque 1

**Cuatro ajustes concretos:**

1. **El sueño pasa de comorbilidad a mecanismo.** Hoy aparece en la lista de acompañantes del fenotipo nociplástico. Debería estar además en la escalera, señalando los niveles 2, 3 y 4.
2. **Entran dos preguntas nuevas al repertorio** —inhibición condicionada y sumación temporal—, que leen freno y acelerador por separado y no necesitan imán.
3. **El desuso entra como el bucle que impide la actualización**, y con él la frase: *el reposo prolongado es una instrucción, y dice que aquí sigue habiendo peligro*.
4. **La tabla de los cuatro tipos de control** cierra conceptualmente la parte del dolor adaptativo: no basta con saber a qué nivel preguntar — **hay que saber qué clase de instrucción admite ese nivel**.

**Y una consecuencia de fondo, que responde a la pregunta del encargo:**

> El dolor no sube porque el daño se extienda. **Sube porque cada nivel, al no poder cumplir su meta, entrega la protección al siguiente — y el siguiente la acepta.** La cascada es una secuencia de decisiones correctas tomadas con información insuficiente.
>
> Y por eso regular no es detener el ascenso: es **devolverle a cada nivel las condiciones para retomar lo que entregó.**

---

# Parte F · Lo que sigue faltando

- **La condición de retorno del nivel 3 no está caracterizada.** Sabemos qué lo hace invertirse; no sabemos con precisión qué lo restituye. Es, probablemente, la pregunta de investigación más valiosa de todo este marco.
- **No hay evidencia de cómo se comporta el rastreo en cada nivel.** Toda la columna nuestra sigue siendo hipótesis, y por eso existe el registro de la hoja de valoración previa.
- **Los cuatro pendientes de D.5** —intestino, dimorfismo sexual, epigenética, autoinmunidad— están nombrados en la cascada y sin desarrollar.
- **Y una pregunta abierta que vale la pena dejar planteada:** si el sueño es la ventana de recalibración, **¿la sesión de RB —veinte minutos acostado, cubierto, con el sistema en reposo— está operando en esa misma ventana?** Es una hipótesis atractiva y por ahora nada más que eso.

---

## Referencias verificadas

- Krause AJ, Prather AA, Wager TD, Lindquist MA, Walker MP. The pain of sleep loss: a brain characterization in humans. *J Neurosci.* 2019;39(12):2291-2300.
- Godwin JW, Pinto AR, Rosenthal NA. Macrophages are required for adult salamander limb regeneration. *PNAS.* 2013;110(23):9415-9420. PMID 23690624 *(citada en el Bloque 2, se enlaza aquí por la ventana)*
- Lyndon S. Precision dynamics of predictive coding in functional neurological disorder. *Brain.* 2026. DOI 10.1093/brain/awag101 *(las tres vías de recalibración)*

**Pendientes de verificar antes de material del alumno:** fichas de inhibición condicionada y sumación temporal; Vlaeyen & Linton 2000; literatura de representación cortical e imaginería motora graduada, **incluida la crítica a la tesis del difuminado**.

---

*Memo de investigación — Instituto Centrobioenergetica, 2026. Ningún identificador fue inventado; lo no verificado está marcado.*
