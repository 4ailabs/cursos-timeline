# El Ojo que Construye su Propia Forma
## Del circuito retina–coroides–esclera al agente morfogenético: emetropización, cibernética y cognición basal en la miopía

**Dr. Miguel Ojeda Ríos**
**Artículo de hipótesis y marco teórico.**

---

## Resumen

El ojo regula su propio crecimiento a partir de la imagen que recibe: lee el desenfoque retiniano y ajusta su longitud axial hasta enfocar. Este proceso —la emetropización— está implementado por un **circuito neurobiológico** bien caracterizado (retina → EPR → coroides → esclera) y ha sido modelado, durante medio siglo, como un **sistema de control por retroalimentación con un punto de ajuste**. Sostenemos que ese consenso cibernético, llevado a su conclusión natural, conduce a una lectura que la oftalmología aún no ha incorporado: la del ojo como **agente morfogenético de cognición basal**, en el sentido del marco TAME de Michael Levin. Recorremos los tres niveles —el **circuito** que ejecuta el control, la **arquitectura cibernética** que lo describe, y el **marco agencial** que lo interpreta— y mostramos que convergen en una conclusión con consecuencias clínicas: la miopía no es un defecto, sino la **conducta competente de un sistema de control adaptativo ante un entorno visual novedoso**, y las terapias eficaces actúan **reescribiendo la señal de referencia del circuito**, no reparando el tejido. Dedicamos especial atención a explicar el marco de la cognición basal, poco conocido en oftalmología, con sus experimentos.

---

## 1. El enigma que la corrección no resuelve

La lente corrige la miopía desplazando el foco hasta la retina, pero deja intacta la pregunta de fondo: **¿por qué se alargó el ojo?** Un órgano no crece de más por azar, y sabemos desde hace décadas que el ojo no lo hace: decide cuánto crecer en función de lo que ve. Este artículo defiende una tesis:

> La miopía no es un ojo averiado, sino un ojo que **hizo correctamente su trabajo** —ajustar su forma a la demanda visual— en un entorno donde ese trabajo conduce a la elongación. El problema no está en el mecanismo, sino en el desencuentro entre un sistema de control antiguo y un mundo nuevo de visión cercana e interiores.

Construiremos el argumento en tres niveles. Primero, el **circuito** neurobiológico que ejecuta la regulación (sección 2). Segundo, la **cibernética** —la arquitectura de control que el propio campo ha usado para describirlo (sección 3)—. Tercero, el marco de la **cognición basal** (TAME), que nombra lo que ese circuito de control *es*: un agente que persigue una meta (secciones 4 y 5). De ahí se siguen la relectura de la miopía y de su tratamiento (secciones 6–8).

---

## 2. El circuito: cómo el ojo traduce la visión en crecimiento

La emetropización no es una abstracción: tiene un sustrato celular y molecular cada vez mejor definido. La retina **detecta el signo del desenfoque** —el ojo se alarga ante desenfoque hiperópico y frena ante desenfoque miópico, de manera bidireccional, local y sin requerir acomodación (Wallman & Winawer, 2004; Troilo et al., 2019)— y traduce ese error en una **cascada de señales que viaja retina → epitelio pigmentario (EPR) → coroides → esclera** (Brown et al., 2022).

Los nodos principales del circuito:

- **Dopamina retiniana.** Liberada por las células amacrinas dopaminérgicas, actúa como una señal de **freno** del crecimiento. Su liberación aumenta con la luz intensa y se asocia a la inhibición de la elongación; es uno de los mensajeros iniciales de la cascada (Feldkaemper & Schaeffel, 2013).
- **El gen de respuesta temprana EGR1/ZENK.** En las amacrinas, **baja** bajo condiciones que promueven el crecimiento (miopía) y **sube** bajo condiciones que lo frenan (recuperación). Es un conmutador transcripcional de la dirección del crecimiento.
- **Mensajeros distales: glucagón, ácido retinoico y óxido nítrico.** Modulan la señal hacia el EPR y la coroides. Glucagón, ácido retinoico y ZENK son los tres factores que cambian **bidireccionalmente** con el signo del desenfoque (Feldkaemper & Schaeffel, 2013).
- **Coroides.** No es un mero conducto vascular: **modula su grosor** (se engrosa ante desenfoque miópico/freno, se adelgaza ante hiperópico/crecimiento) y **produce reguladores del crecimiento escleral** que controlan la elongación (Brown et al., 2022).
- **Esclera.** Ejecuta la respuesta final: **remodela su matriz extracelular** (colágeno, metaloproteasas) y cambia su tasa de crecimiento, determinando la longitud axial.

A este circuito se suma el **brazo luminoso**, la base neurobiológica del efecto protector del aire libre. Las **células ganglionares retinianas intrínsecamente fotosensibles (ipRGC)**, que expresan **melanopsina** y responden a la luz azul (~480 nm), establecen sinapsis con las amacrinas dopaminérgicas y **modulan la liberación de dopamina** según la intensidad luminosa (Chakraborty et al., 2022; Science Advances). La deficiencia de señalización por melanopsina produce un **desplazamiento miópico**, y su activación, uno **hipermétrope**: el circuito ipRGC → dopamina es el mecanismo por el cual la luz brillante frena el crecimiento.

Las terapias de control actúan sobre **nodos identificables de este circuito**, lo cual es decisivo para el argumento posterior:

- **Luz exterior:** activa el brazo ipRGC → dopamina (freno).
- **Desenfoque periférico miópico (DIMS, HAL, orto-K):** invierte el signo del error que la retina periférica recibe.
- **Atropina (baja dosis):** antagonista muscarínico; en la retina (M1/M4) altera dopamina, GABA y óxido nítrico; en la coroides induce engrosamiento transiente y mejora el índice vascular (vía TGF-β, FGF-2); en la esclera (M1/M3/M4) reduce la remodelación de la matriz, con efectores como AKT1, HIF1A y β-catenina (revisado en *Front. Pharmacol.*, 2025; Carr & Stell, 2020).

El patrón es inequívoco: **ninguna intervención repara el tejido; todas intervienen la señal que recorre el circuito.** Esto no es casual, y la razón se vuelve clara al describir la arquitectura de control.

---

## 3. La arquitectura cibernética: la emetropización como sistema de control

Mucho antes de hablar de agencia, la propia ciencia de la visión describió la emetropización en términos de **teoría de control**. La estructura es la de un **lazo de retroalimentación negativa** clásico:

- **Variable controlada:** el estado refractivo (el foco en la retina).
- **Punto de ajuste (*set-point*):** la emetropía —desenfoque cero—.
- **Señal de error:** el desenfoque, **con signo** (hiperópico o miópico), que indica magnitud y dirección de la desviación.
- **Actuador:** el crecimiento escleral, que modifica la longitud axial para anular el error.

Esta lectura no es una metáfora importada: es un cuerpo de modelos publicados. Diversos autores han ajustado modelos de **control de primer orden** a la trayectoria refractiva del desarrollo (Medina & Fariza; Schaeffel & Howland; Greene), y Hung y Ciuffreda formalizaron la **teoría del desenfoque retiniano incremental** (IRDT) para el crecimiento miópico. La evidencia del desarrollo lo respalda: los neonatos, con dispersión refractiva amplia (miopía o hipermetropía), **convergen hacia la emetropía hacia los tres años** —exactamente lo que predice un sistema de retroalimentación que minimiza un error respecto a un punto de ajuste—.

Conviene subrayar lo que este consenso ya concede, porque es el puente de todo el artículo: **el ojo es, en el vocabulario del propio campo, un sistema cibernético que defiende un punto de ajuste.** Lo que sigue no contradice esto: lo completa. Pregunta qué clase de sistema es uno que "defiende un setpoint", y qué se sigue de tomarlo en serio.

---

## 4. De la cibernética a la agencia: la cognición basal (TAME)

Aquí pedimos al lector suspender por un momento la asociación entre "cognición" y "cerebro". El marco TAME (*Technological Approach to Mind Everywhere*), desarrollado por Michael Levin (2022), sostiene —con experimentos— que **la capacidad de perseguir metas no es exclusiva de los sistemas con neuronas**. Es la extensión natural de la cibernética: si un sistema defiende un punto de ajuste, ya es, en sentido técnico, un sistema **dirigido a una meta**; la pregunta es cuánta y qué tipo de competencia exhibe.

### 4.1 Qué significa "cognición" aquí

TAME usa una definición operativa y modesta: **cognición es el conjunto de operaciones entre percibir y actuar que permiten a un sistema responder abarcando un horizonte mayor que el instante presente**, mediante memoria y/o anticipación. No exige conciencia, ni lenguaje, ni neuronas. Una bacteria que sigue un gradiente la cumple en su forma mínima; un humano que planifica, en su forma máxima. La diferencia es **de grado**, no de tipo. No se afirma que un tejido "piense" como una persona, sino que existe un **continuo** de competencia para resolver problemas, y que conviene preguntar *cuánta* exhibe cada sistema en lugar de trazar una línea donde la mente "aparece".

### 4.2 La morfogénesis como resolución de problemas: homeostasis anatómica

El ejemplo más relevante para el ojo es la **morfogénesis**. Cuando se amputa la extremidad de una **salamandra** a cualquier altura, el muñón regenera exactamente lo que falta y **se detiene al completar una extremidad correcta**. El tejido no ejecuta una secuencia fija: persigue un **estado final** (la forma-objetivo), lo que implica que **almacena una representación de la forma correcta**, compara la actual con ella, y emite una señal de parada cuando la diferencia llega a cero. Levin denomina a esto **homeostasis anatómica**: como un termostato mantiene una temperatura-objetivo, el tejido mantiene y restaura una **forma-objetivo**.

#### El experimento de los renacuajos "Picasso": el ojo encuentra su lugar

Ningún experimento ilustra esto con más fuerza —ni más relevancia para el oftalmólogo— que el de los **renacuajos "Picasso"** (Vandenberg, Adams & Levin, 2012). En el desarrollo normal de *Xenopus*, el rostro del renacuajo se reorganiza durante la metamorfosis hasta convertirse en una cara de rana: los ojos, las fosas nasales y la boca se desplazan a sus posiciones definitivas. Para poner a prueba si ese proceso es un programa rígido o una búsqueda dirigida a una meta, los investigadores construyeron renacuajos con los **órganos craneofaciales colocados en posiciones radicalmente equivocadas** —ojos en sitios anómalos, boca y narinas desordenadas—, una disposición que recuerda a un retrato cubista, de ahí el nombre.

La predicción de un modelo de "programa genético fijo" era clara: deberían resultar ranas con caras monstruosamente deformes. Ocurrió lo contrario. **Los órganos se desplazaron hasta sus posiciones correctas y allí se detuvieron** —y lo hicieron por **trayectorias novedosas, que ningún renacuajo normal recorre jamás**, a veces sobrepasando la posición y corrigiendo de vuelta—. Cada **ojo mal colocado migró hasta su sitio adecuado** y la cara resultante fue, en gran medida, una cara de rana normal.

La conclusión es difícil de eludir: el tejido **no ejecuta una secuencia preprogramada de movimientos, sino que minimiza el error respecto a una forma-objetivo almacenada** (la cara correcta), improvisando los medios cuando los habituales no están disponibles. Es lo que William James llamó el criterio mínimo de lo mental: *"fines fijos con medios variables"*. Y es, en miniatura y de forma visible, exactamente la lógica de la emetropización: **un ojo que persigue un objetivo —el foco en la retina— y ajusta su forma, por la vía que haga falta, hasta alcanzarlo.** El renacuajo Picasso mueve el ojo en el espacio hasta su posición correcta; la emetropización ajusta la longitud del ojo hasta su objetivo refractivo. En ambos casos, el tejido sabe *adónde* debe llegar, aunque no sepa *cómo* sabe.

### 4.3 La herramienta clave: el eje de persuadabilidad

¿Cómo se cambia el comportamiento de un sistema? TAME lo ordena en cuatro clases según el tipo de intervención que admite:

| Clase | Sistema | Cómo se cambia su comportamiento |
|---|---|---|
| **A** | Reloj mecánico | Re-cableando el hardware |
| **B** | Termostato / circuito homeostático | **Reescribiendo su *set-point*** (sin tocar la mecánica interna) |
| **C** | Animal | Recompensa y castigo |
| **D** | Ser humano | Argumento racional |

A medida que se avanza de A a D, **disminuyen el esfuerzo y el conocimiento del mecanismo** necesarios para influir: a un reloj hay que conocerlo entero; a un termostato basta saber escribirle el número de referencia. El error más costoso es tratar a un sistema en la clase equivocada —argumentarle a un termostato, o intentar re-cablear lo que solo responde a un cambio de set-point—. La sección 5 desarrolla la consecuencia: **el ojo emetropizante es un sistema de clase B**, y por eso se le cambia el rumbo reescribiendo su señal de referencia, no reparándolo ni "ejercitándolo".

### 4.4 Cómo un tejido guarda y reescribe su forma-objetivo: bioelectricidad

Si los tejidos tienen formas-objetivo, ¿dónde se almacenan y cómo se reescriben? La respuesta es **bioeléctrica**, y conviene despejar un malentendido: no se trata de "energías" ni metáforas, sino de **voltaje transmembrana medible (Vmem)**, el mismo tipo de fenómeno físico del electrorretinograma, presente en **todas** las células. En las neuronas el voltaje cambia en milisegundos; en las células no neuronales cambia **lentamente** (minutos, horas) y esos cambios funcionan como **señales instructivas** de proliferación, migración, diferenciación y formación de patrones. Las células comparten estos estados por **uniones comunicantes (gap junctions)**, formando redes que computan patrones a escala de tejido. En **planarias**, un patrón estable de voltaje determina cuántas cabezas regenera el animal; manipulándolo —**sin tocar el ADN**— se obtienen gusanos de dos cabezas que, recortados de nuevo en agua normal, **siguen regenerando dos cabezas**: la forma-objetivo quedó reescrita de forma estable.

En el ojo, esto es **literal**: un prepatrón de Vmem (el "rostro eléctrico") dibuja la posición de ojos, boca y nariz **antes** de la anatomía (Vandenberg et al., 2012); imponer un estado bioeléctrico "tipo ojo" en células del **intestino** induce un **ojo completo y organizado** en ese sitio, a nivel de órgano y más potente que forzar el gen maestro Pax6 (Pai et al., 2012); y renacuajos con **ojos ectópicos en la cola** realizan aprendizaje visual (Blackiston & Levin, 2013). La forma del ojo es, pues, **información dirigida a una meta y reescribible**.

### 4.5 Competencia sin comprensión

Una pieza más resuelve la paradoja central de la miopía. Una célula hepática cumple su función con perfecta competencia **sin comprender** que forma parte de un hígado; la coherencia global emerge de millones de competencias locales. Dennett llamó a esto **competencia sin comprensión**. De ahí que un sistema pueda **funcionar perfectamente y producir un resultado indeseable**, porque su competencia opera en un nivel que no "sabe" lo que el contexto global requiere. Es exactamente lo que ocurre en la miopía.

---

## 5. El ojo a la luz de TAME

Con los tres niveles sobre la mesa —circuito, cibernética, agencia—, las piezas encajan.

**La emetropización es homeostasis anatómica.** El circuito retina–coroides–esclera implementa un lazo que almacena una forma-objetivo (la longitud axial que enfoca), mide su distancia a ella (el desenfoque con signo) y actúa (crece o frena) hasta alcanzarla, deteniéndose entonces. Es el mismo tipo de proceso que detiene a la salamandra. El ojo **persigue y defiende un punto de ajuste refractivo.**

**El ojo es un sistema de clase B.** No se le repara (A) ni se le argumenta (D): se le cambia el comportamiento **reescribiendo el set-point**, y la vía es su señal de referencia, el desenfoque. Esto **predice** lo que la clínica observa: las intervenciones que cambian la señal —desenfoque periférico miópico, luz (ipRGC → dopamina), atropina sobre la cascada— funcionan porque son intervenciones de clase B sobre un sistema de clase B; corregir solo el foco central (lente monofocal) no, porque no toca la señal periférica que impulsa la elongación.

**La miopía es competencia sin comprensión.** El ojo del niño en visión cercana e interiores hace *exactamente lo que su control le indica*: ajustar la longitud axial a la demanda óptica. No "sabe" que ese entorno —de visión próxima sostenida y poca luz, evolutivamente novedoso— no es el mundo para el que su regulación fue afinada. La miopía no es un fallo del ojo: es la **conducta competente de un agente adaptativo en un entorno que su punto de ajuste no anticipó**.

Conviene nombrar una convergencia que no es casual: la fisiología del peso describe un "set point" metabólico; la biología de la morfogénesis describe **setpoints anatómicos**; la emetropización describe un objetivo refractivo. Tres literaturas independientes, una misma estructura —un valor de referencia que un sistema vivo defiende y restaura activamente—. El término *adaptativo* recoge ambas caras: la forma es una solución adaptativa, y el punto de ajuste **se adapta** (se desplaza); no es fijo.

### 5.1 ¿Qué añade la lectura agencial a los modelos de control?

Un lector crítico planteará, con razón, la objeción decisiva: *si la emetropización ya está modelada como un lazo de control con un punto de ajuste, ¿qué se gana llamándola "cognición basal", más allá de un cambio de etiqueta?* La respuesta es que la lectura agencial **no reemplaza los modelos cibernéticos: los completa**, y aporta cinco cosas que un modelo de control, por sí solo, no entrega.

1. **Un principio de intervención accionable.** El eje de persuadabilidad no solo describe el lazo: dice *cómo* se le cambia el rumbo. Clasificar al ojo como sistema de **clase B** predice que la palanca correcta es **reescribir la señal de referencia** (desenfoque, luz), no reparar ni "ejercitar" el tejido —y explica por qué la corrección monofocal, que no toca esa señal, no frena la progresión—.
2. **Un sustrato de control nuevo y manipulable.** La bioelectricidad (sección 4.4) ofrece una capa de control —la información de forma codificada en voltaje, reescribible sin tocar el genoma— que la cibernética clásica del crecimiento ocular no contemplaba, y con ella una frontera de intervención inédita (sección 8).
3. **Economía conceptual entre escalas.** El mismo principio —defensa de un setpoint con competencia sin comprensión— ordena fenómenos hoy dispersos: el peso metabólico, la regeneración, la forma facial y el crecimiento ocular. Un solo marco en lugar de teorías inconexas para cada órgano.
4. **Un reencuadre de la patología.** La miopía deja de ser un defecto y se vuelve la conducta competente de un sistema sano en un entorno novedoso —con consecuencias clínicas y de comunicación con el paciente (sección 7)—.
5. **Un fundamento normativo.** La inferencia activa (sección 6) explica *por qué* el ojo minimiza el desenfoque, no solo *que* lo hace.

Y una precisión que el marco mismo impone, contra toda sobre-atribución: el ojo es un agente de **clase B, no de clase D**. Persigue y defiende un punto de ajuste; **no delibera, no decide ni siente**. Atribuirle "cognición" en este sentido técnico —competencia para alcanzar una meta— no es proyectar psicología sobre un órgano, sino reconocer la misma estructura de control dirigido a un fin que el propio campo ya admite, y extraer de ella sus consecuencias.

---

## 6. El ojo como máquina de predicción: el desenfoque como error de predicción

Hay un cuarto nivel de descripción que une a los tres anteriores y les da un sentido normativo. La neurociencia contemporánea describe al cerebro —y, en su forma basal, al organismo entero— no como un receptor pasivo de la realidad, sino como un **sistema que la predice**: genera continuamente hipótesis sobre la entrada sensorial y solo se corrige cuando aparece un desajuste, un **error de predicción**. Karl Friston formalizó este principio como **inferencia activa** (o minimización de energía libre), y TAME lo adopta como puente entre la cognición y la morfogénesis (Friston et al., 2015).

La inferencia activa señala que un sistema puede reducir su error de predicción de **dos maneras**: actualizando su modelo interno para que prediga mejor lo que percibe (percepción), o **actuando sobre el mundo —o sobre sí mismo— para que la realidad coincida con lo que predice** (acción). El ojo emetropizante hace lo segundo, y de forma literal.

**El desenfoque es un error de predicción.** La predicción por defecto del sistema visual —su expectativa basal, su *prior*— es una imagen **enfocada** sobre la retina. El desenfoque es exactamente la distancia entre esa imagen esperada (nítida) y la imagen recibida (borrosa). El ojo no puede "actualizar su modelo" para aceptar un mundo borroso como nítido; en cambio, **actúa sobre su propia forma** —crece o frena su crecimiento— hasta que la óptica vuelve a producir la imagen que predice. La emetropización es inferencia activa ejecutada en el sustrato morfogenético: el ojo **cambia su anatomía para minimizar su error de predicción**.

**Decodificar el signo del error es, en sí mismo, un problema de inferencia.** Para corregir, no basta detectar que hay desenfoque: hay que inferir su **dirección** (foco por delante o por detrás de la retina). La retina dispone de pistas para resolverlo —la **aberración cromática longitudinal** (el desenfoque difiere según la longitud de onda, de modo que el perfil espectral de la imagen informa el signo), gradientes de contraste y claves de acomodación (Schaeffel & Howland; Rucker)—. Inferir una causa oculta (la dirección del desenfoque) a partir de evidencia sensorial ambigua es, precisamente, lo que hace un sistema predictivo.

**La predicción tiene horizonte temporal.** El error no se procesa solo en el instante: el sistema lo **integra en el tiempo** —de ahí que se ajuste con modelos de control de primer orden (sección 3)—. Y en el fondo, lo que el ojo en desarrollo predice no es una imagen aislada, sino el **entorno visual que habitará**. Una infancia dominada por la visión cercana es evidencia de que el mundo será cercano; el sistema, racionalmente, sintoniza su óptica a esa predicción. **La miopía es esa predicción cumplida en la longitud del ojo.**

**La precisión modula el peso del error.** No todos los errores de predicción cuentan igual: el sistema pondera cada uno por su **precisión** —la confianza que le asigna—. Un desenfoque **sostenido y repetido** pesa más que uno transitorio, y por eso una demanda crónica de visión cercana **fija** la adaptación, mientras que un desenfoque breve es reversible. Esta noción ofrece un correlato preciso de la cronología clínica (reversibilidad temprana, consolidación tardía) y un punto de entrada conceptual: la **dopamina**, modulada por la luz y por la atropina, puede leerse como un regulador de la ganancia con que el sistema atiende su error de crecimiento.

**El "error competente": dónde se cierra el argumento.** Aquí converge todo lo anterior. El error de predicción que el ojo minimiza es **real**: hay desenfoque óptico genuino, y el sistema lo corrige de manera impecable. Pero el entorno que genera ese error es **evolutivamente novedoso**, de modo que minimizarlo localmente produce una **desadaptación global**: la elongación. El ojo resuelve a la perfección su problema de inferencia local y, al hacerlo, produce miopía. Es la *competencia sin comprensión* (sección 4.5) dicha en el lenguaje de la predicción: un sistema que predice y corrige correctamente, ciego al hecho de que el mundo para el que fue afinado ya no es el suyo.

**Y reordena la terapéutica.** Si la miopía es la respuesta del ojo a un error de predicción, controlarla es **gestionar ese error**, no reparar el órgano. El **desenfoque periférico miópico** (DIMS, orto-K) le entrega al sistema un error de predicción de **signo opuesto** —en efecto, la señal "te has pasado, frena el crecimiento"—. La **luz exterior** y la **atropina** ajustan la **ganancia/precisión** con que el sistema atiende su error (vía dopamina y la cascada muscarínica). Controlar la miopía es, en este marco, **administrarle al ojo el error de predicción correctivo** que detiene su elongación.

Con esto, los cuatro niveles se anudan: el error de predicción **es** la señal del circuito (sección 2), **procesada** por el lazo de control (sección 3), **al servicio** de la meta del agente (sección 5) y **fundamentada normativamente** por la inferencia activa (sección 6). El ojo crece porque crecer es la acción que minimiza su error de predicción sobre el mundo que espera ver.

---

## 7. Implicaciones clínicas

El marco no inventa terapias; **reordena** las existentes y cambia el relato.

- **Las terapias eficaces actúan sobre la señal (clase B), no sobre el hardware**, y sobre nodos identificables del circuito: la luz exterior activa el brazo ipRGC → dopamina; el desenfoque periférico invierte el signo del error en la retina periférica; la atropina modula la cascada muscarínica retina–coroides–esclera. Esto orienta la elección y combinación de intervenciones y explica por qué la corrección monofocal convencional no frena la progresión.
- **La prevención es ambiental:** tiempo al aire libre y gestión de la carga de visión cercana reducen la señal que empuja el punto de ajuste.
- **El mensaje al paciente cambia:** la miopía no es un defecto del niño ni una falla de su esfuerzo, sino la adaptación de un ojo que funciona. Esto retira culpa y dirige la intervención hacia la señal y el entorno, que es donde rinde.

---

## 8. Predicciones y direcciones de investigación

1. **Clase B:** las intervenciones que modifican la *señal* de desenfoque modulan la elongación de forma más fiable que las que solo corrigen el foco central —consistente con la ventaja de DIMS/orto-K sobre la lente monofocal—.
2. **Competencia local:** el control del crecimiento es regional (desenfoque periférico → respuesta periférica), como muestran los modelos animales.
3. **Set-point reversible antes de fijarse:** retirar la señal miopizante (más luz, menos visión próxima) debería frenar e incluso revertir parcialmente más en fases tempranas, antes de que la adaptación se consolide.
4. **Brazo ipRGC:** la manipulación selectiva de la vía melanopsina → dopamina (p. ej., con espectros o intensidades definidas) debería modular la elongación de manera predecible.
5. **Frontera bioeléctrica:** a partir del trabajo de Levin, cabe explorar si moduladores del estado bioeléctrico de coroides/esclera influyen el crecimiento axial sin alterar el genoma —una vía de control conceptualmente nueva—.

---

## 9. Conclusión

La emetropización puede describirse en tres niveles que no se contradicen, sino que se anidan. En el **circuito**, es una cascada retina → EPR → coroides → esclera, modulada por dopamina, ipRGC, EGR1, glucagón y ácido retinoico. En la **arquitectura**, es un lazo de retroalimentación que defiende un punto de ajuste —como el propio campo ha modelado durante décadas—. Y en su **naturaleza**, es la conducta de un **agente morfogenético de cognición basal** que persigue una meta con competencia sin comprensión. Desde esta lectura, la miopía deja de ser una avería y se vuelve inteligible como la conducta competente de ese agente ante un entorno novedoso; las terapias que funcionan se explican como intervenciones de **clase B** —reescritura de la señal de referencia del circuito—; y el "set point" del ojo se ancla en la misma estructura que la biología de la forma y la fisiología metabólica describen por separado. El ojo no es una máquina a la que se repara. Es un sistema que construye y mantiene su propia forma, y al que se le cambia el rumbo reescribiéndole la referencia.

---

## Referencias

1. Wallman J, Winawer J. Homeostasis of eye growth and the question of myopia. *Neuron*. 2004;43(4):447–468.
2. Troilo D, Smith EL, Nickla DL, et al. IMI – Report on Experimental Models of Emmetropization and Myopia. *Invest Ophthalmol Vis Sci*. 2019;60(3):M31–M88.
3. Brown DM, Mazade R, Clarkson-Townsend D, et al. Candidate pathways for retina to scleral signaling in refractive eye growth. *Exp Eye Res*. 2022;219:109071.
4. Feldkaemper M, Schaeffel F. An updated view on the role of dopamine in myopia. *Exp Eye Res*. 2013;114:106–119.
5. Chakraborty R, Ostrin LA, Benavente-Perez A, Verkicharla PK. Optical mechanisms regulating emmetropisation and the role of ipRGCs in ocular growth. (y) Liu AL, et al. The role of ipRGCs in ocular growth and myopia development. *Sci Adv*. 2022;8(23):eabm9027.
6. Carr BJ, Stell WK. The science behind myopia. / Biological mechanisms of atropine control of myopia. *Eye Contact Lens / Children (Basel)*. 2020.
7. Medina A. The cause of myopia development and progression: theory, mechanisms, and new approaches (control-theory models of emmetropization).
8. Hung GK, Ciuffreda KJ. Incremental retinal-defocus theory of myopia development. *Comput Biol Med*. 2007 (y obra relacionada).
9. Levin M. Technological Approach to Mind Everywhere (TAME): an experimentally-grounded framework for understanding diverse bodies and minds. *Front Syst Neurosci*. 2022;16:768201.
10. Vandenberg LN, Adams DS, Levin M. Normalized shape and location of perturbed craniofacial structures in the *Xenopus* tadpole. *Dev Dyn*. 2012;241(5):863–878.
11. Pai VP, Aw S, Shomrat T, Lemire JM, Levin M. Transmembrane voltage potential controls embryonic eye patterning in *Xenopus laevis*. *Development*. 2012;139(2):313–323.
12. Blackiston DJ, Levin M. Ectopic eyes outside the head in *Xenopus* tadpoles provide sensory data for light-mediated learning. *J Exp Biol*. 2013;216:1031–1040.
13. Friston K, Levin M, Sengupta B, Pezzulo G. Knowing one's place: a free-energy approach to pattern regulation. *J R Soc Interface*. 2015;12:20141383.
14. Rose KA, Morgan IG, Ip J, et al. Outdoor activity reduces the prevalence of myopia in children. *Ophthalmology*. 2008;115(8):1279–1285.
15. Lam CSY, Tang WC, Tse DY, et al. Defocus Incorporated Multiple Segments (DIMS) spectacle lenses slow myopia progression: a 2-year randomised clinical trial. *Br J Ophthalmol*. 2020;104(3):363–368.

*Las referencias 3–8 deben verificarse en su forma final (volumen, página) antes de la publicación; algunas combinan revisión y fuente primaria.*

---

*Borrador v4 (perfeccionado tras revisión por pares interna). Autoría única. Añade: sección 5.1 (qué aporta la lectura agencial frente a los modelos de control) y sección 6 ampliada (inferencia activa y error de predicción). Sobre la base del circuito neurobiológico (retina–EPR–coroides–esclera, ipRGC/dopamina, EGR1/glucagón/ácido retinoico, atropina) y la arquitectura cibernética. Siguiente paso: versión LaTeX de calidad de revista.*
