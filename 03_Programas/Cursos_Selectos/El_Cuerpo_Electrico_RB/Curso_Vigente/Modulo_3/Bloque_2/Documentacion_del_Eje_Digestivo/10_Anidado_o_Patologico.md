# El tejido o el microbio: cuál entra primero

**Módulo 3 · Bloque 2** — y cómo se distingue un agente anidado de uno patológico
Instituto Centrobioenergetica · Dr. Miguel Ojeda Rios

> **La pregunta.** ¿El tejido en mal estado permite la infección, o la infección deteriora el
> tejido? Y una segunda, que es la que sirve en consulta: ¿cómo se distingue una bacteria que
> vive dentro del sistema de una que lo está rompiendo?
>
> **Estatuto.** Los dos mecanismos de las secciones 1 y 2 son datos publicados. El criterio de la
> sección 5 es propuesta, construida sobre esos datos. Cada afirmación lleva etiqueta.

---

# 0 · Por qué la pregunta se puede contestar

La discusión suele quedarse en opinión porque se plantea en general. Planteada sobre **una
variable concreta**, tiene respuesta con mecanismo publicado de los dos lados.

La variable es **el aceptor de electrones disponible en la luz del intestino**: si hay oxígeno o
nitrato ahí, crecen unas bacterias; si no los hay, crecen otras.

Y hay un trabajo que describe cómo el tejido la controla, y otro que describe cómo un microbio se
la fabrica.

---

# 1 · La entrada por el tejido

Ya está en [`01_Efectos_en_Salud.md`](01_Efectos_en_Salud.md), y aquí se usa como uno de los dos
lados de la pregunta.

**El circuito íntegro:** la microbiota fabrica butirato → el butirato orienta al colonocito hacia
consumir oxígeno → un colonocito que consume oxígeno **mantiene la luz sin oxígeno** → esa
condición sostiene a las bacterias anaerobias, que son las que fabrican el butirato.
`[EVIDENCIA]`

**Cuando se pierden los productores de butirato**, el colonocito cambia su metabolismo, el oxígeno
y el nitrato quedan disponibles en la luz, y las bacterias que toleran oxígeno se expanden.
`[EVIDENCIA en animal]`

> **Por este lado, el estado del tejido decide qué puede crecer.** El microbio que se expande no
> creó las condiciones: las encontró. `[DERIVADO]`

---

# 2 · La entrada por el microbio

Y hay un trabajo que describe lo contrario, con el mismo detalle.

*Salmonella* Typhimurium tiene que competir contra una microbiota mucho más numerosa que ella.
Lo que hace es esto:

| | Qué ocurre |
|---|---|
| **1** | Sus factores de virulencia **provocan inflamación en el intestino del huésped** |
| **2** | La inflamación genera especies reactivas de oxígeno |
| **3** | Esas especies reactivas reaccionan con compuestos de azufre que ya estaban en la luz, y forman **tetrationato** |
| **4** | El tetrationato es un aceptor de electrones nuevo, **y *Salmonella* tiene los genes para usarlo** |
| **5** | Con ese aceptor puede respirar mientras la microbiota residente solo puede fermentar, y la desplaza |

`[EVIDENCIA]` — Nature, 2010.

> **Por este lado, el microbio induce al huésped a fabricarle la condición que necesita.** No
> encontró un ambiente favorable: lo mandó construir. `[DERIVADO]`

---

# 3 · Las dos entradas tocan la misma variable

```
        LA VARIABLE: qué aceptor de electrones hay en la luz

  ENTRADA POR EL TEJIDO              ENTRADA POR EL MICROBIO
  Se pierden productores de          Los factores de virulencia
  butirato                           provocan inflamación
        ↓                                    ↓
  El colonocito deja de              La inflamación fabrica
  consumir oxígeno                   tetrationato
        ↓                                    ↓
  Queda oxígeno y nitrato            Queda un aceptor que solo
  en la luz                          ese microbio puede usar
        ↓                                    ↓
        └──────────► crece lo que tolera oxígeno ◄──────────┘
```

**La respuesta a la pregunta de la gallina y el huevo, en este eje:** las dos entradas existen,
las dos están documentadas, y **las dos terminan cambiando lo mismo.** `[DERIVADO]`

Por eso la pregunta útil en consulta no es cuál ocurrió primero en la historia del paciente, que
casi nunca se puede saber. Es esta:

> **¿Quién está controlando ahora el aceptor de electrones de la luz: el tejido o el microbio?**
> `[HIPÓTESIS]`

Esa sí se puede explorar, y la sección 6 dice cómo.

---

# 4 · Anidado o patológico: la categoría no es taxonómica

## El concepto que lo resuelve

Existe un término para las bacterias que viven normalmente en el intestino y **se vuelven
patológicas cuando cambian las condiciones del huésped**: se llaman **patobiontes**. `[EVIDENCIA]`

| | |
|---|---|
| **Qué son** | Organismos propios de la microbiota, que provocan enfermedad cuando cambian condiciones del huésped o del ambiente |
| **Cómo se comportan** | Silenciosos mientras las condiciones se sostienen; conductores de enfermedad cuando esas condiciones se levantan |
| **En qué se diferencian de un patógeno oportunista** | El oportunista viene de fuera. El patobionte ya estaba dentro |

`[EVIDENCIA]`

> **El mismo genoma puede estar anidado o ser patológico. Lo que cambia es la relación, no el
> organismo.** `[DERIVADO]`

Eso disuelve la pregunta planteada como taxonomía. **La lista de «bacterias buenas» y «bacterias
malas» no existe** para la mayor parte de la microbiota intestinal. Existe una relación, y la
relación depende de si la restricción del huésped está puesta.

---

# 5 · El criterio, en los términos del marco

De los dos mecanismos de las secciones 1 y 2 sale un criterio que se puede aplicar sin conocer la
especie:

> **Un agente está anidado cuando su éxito depende de que la restricción del huésped se
> mantenga. Es patológico cuando su éxito depende de que la restricción se levante.**
> `[HIPÓTESIS]`

| | **Agente anidado** | **Agente patológico** |
|---|---|---|
| **Qué necesita para crecer** | Que la condición del huésped siga puesta | Que la condición del huésped se levante |
| **Qué le hace a la restricción** | La sostiene, porque vive de ella | La destruye, y se fabrica una propia |
| **Ejemplo con mecanismo** | El productor de butirato necesita que no haya oxígeno; y la ausencia de oxígeno depende de que el colonocito respire con el butirato que él mismo fabrica | *Salmonella* provoca inflamación porque la inflamación le fabrica el aceptor de electrones que solo ella puede usar |
| **Cómo se comporta el conjunto** | Cada uno refuerza la condición del otro | El agente gana en la medida en que el conjunto pierde |

## Por qué este criterio sirve y una lista de especies no

**Porque el mismo organismo cambia de lado.** Con la restricción puesta, vive de ella y la
sostiene. Con la restricción levantada, el que mejor aprovecha el ambiente nuevo es el que
crece — y ese crecimiento levanta más la restricción. `[INTERPRETACIÓN]`

Y porque coincide con la regla que el marco ya trae para decidir si algo es un agente separado:
**linaje distinto y evaluación propia.** Lo que este documento agrega es el segundo escalón:
**una vez que es agente, si su evaluación se alinea con la del huésped o compite con ella.**
`[DERIVADO]`

---

# 6 · Cómo se explora en un paciente

En un paciente no se puede trasplantar la microbiota a otro para ver si transmite el cuadro. Lo
que sí se puede hacer es **mover una pieza y ver cuál corrige.**

| Lo que se hace | Lo que ocurre | Qué indica |
|---|---|---|
| **Reponer butirato tres semanas** | Los síntomas y la tolerancia cambian | La entrada fue por el tejido, y el agente está anidado. Recuperó la condición y lo demás siguió |
| | Nada cambia | El agente no depende de esa condición |
| **Retirar la intervención que sirvió** | La mejoría se sostiene semanas | El conjunto ya se sostiene solo |
| | Vuelve a lo mismo en pocos días | Hay algo fabricando su propia condición. Se comporta como agente patológico |
| **Corregir el horario sin cambiar el contenido** | Los síntomas se mueven con el horario | La entrada fue por el programa diario, no por el microbio |

`[HIPÓTESIS]` para las tres filas.

**El renglón que más informa es el segundo.** Una condición restituida que se sostiene sola indica
un agente que vive de esa condición. Una que se deshace en días indica un agente que está
construyendo la suya. `[HIPÓTESIS]`

Eso ya estaba en el protocolo de [`02_Aterrizaje_Clinico.md`](02_Aterrizaje_Clinico.md) como
prueba de retirada. Este documento dice qué distingue.

---

# 7 · Qué se puede afirmar, y qué no

Para establecer que una microbiota desplazada **causa** un cuadro existen versiones adaptadas de
los postulados de Koch, en dos direcciones: `[EVIDENCIA]`

| Dirección | Qué exige |
|---|---|
| **Hacia adelante** | Trasplantar esa microbiota a un huésped sano y ver si transmite el cuadro |
| **Hacia atrás** | Restablecer el equilibrio y ver si el cuadro cede |

**Ninguna de las dos se puede ejecutar en un consultorio.** Y sin ellas, lo que se observa en un
paciente **es compatible con la causalidad, y no la demuestra.** `[DERIVADO]`

> Lo que sí se puede afirmar después de la exploración de la sección 6: **por dónde responde este
> paciente.** Eso ordena qué hacer, sin necesidad de resolver qué ocurrió primero. `[DERIVADO]`

---

# 8 · Qué significa esto para el método

El imán actúa sobre restricciones. De ahí salen dos alcances distintos, y hay que decirlos
separados:

**Con un agente anidado.** Restituir la condición devuelve la relación: la microbiota sigue a la
condición, porque de eso vive. Es el caso que el método puede alcanzar. `[HIPÓTESIS]`

**Con un agente que fabrica su propia condición.** Restituir la restricción no alcanza, porque el
agente vuelve a fabricar la alternativa. Ahí el método por sí solo se queda corto, y el paciente
necesita otra cosa además. `[HIPÓTESIS]`

> **Y esa es la razón de fondo por la que la prueba de retirada está en el protocolo.** No mide
> cuánto mejoró: mide con qué clase de agente se está tratando. `[DERIVADO]`

---

# 9 · Qué de esto va a la clase

**Uno · la pregunta se contesta si se plantea sobre una variable.** En este eje la variable es
qué aceptor de electrones hay en la luz del intestino. Sobre esa variable hay mecanismo publicado
de los dos lados.

**Dos · el tejido decide qué puede crecer.** Sin productores de butirato, el colonocito deja de
consumir oxígeno, queda oxígeno en la luz, y crece lo que tolera oxígeno.

**Tres · y hay microbios que se fabrican la condición.** *Salmonella* provoca inflamación en el
huésped, la inflamación produce tetrationato, y *Salmonella* es la que tiene los genes para
respirarlo. Manda construir el ambiente que la favorece.

**Cuatro · por eso no hay lista de bacterias buenas y malas.** El mismo organismo está anidado o
es patológico según esté puesta o levantada la restricción del huésped. Hay un nombre para los
que cambian de lado: patobiontes.

**Cinco · y el criterio, que es lo que el alumno se lleva:**

> **Está anidado si su éxito depende de que la restricción se mantenga. Es patológico si su
> éxito depende de que la restricción se levante.**

**Seis · en consulta se explora moviendo una pieza y viendo cuál corrige.** Y el dato que más
informa es qué pasa al retirar lo que sirvió: si se sostiene, el agente vivía de esa condición;
si se deshace en días, algo está fabricando la suya.

---

## Fuentes

**La entrada por el tejido**
- [Microbiota-activated PPAR-γ signaling inhibits dysbiotic Enterobacteriaceae expansion · Science, 2017](https://www.science.org/doi/10.1126/science.aam9949)

**La entrada por el microbio**
- [Gut inflammation provides a respiratory electron acceptor for Salmonella · Nature, 2010](https://www.nature.com/articles/nature09415)
- [A breathtaking feat: to compete with the gut microbiota, Salmonella drives its host to provide a respiratory electron acceptor · Gut Microbes](https://pmc.ncbi.nlm.nih.gov/articles/PMC3225798/)
- [Gaining an edge in the gut · Nature Reviews Microbiology](https://www.nature.com/articles/nrmicro2464)

**Patobiontes**
- [Pathogens, commensal symbionts, and pathobionts: discovery and functional effects on the host · ILAR Journal](https://academic.oup.com/ilarjournal/article/56/2/159/650563)
- [Label or concept — what is a pathobiont? · Trends in Microbiology](https://www.sciencedirect.com/science/article/pii/S0966842X20301049)
- [Pathogenic functions of host microbiota · PMC](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6162913/)

**Causalidad en microbiota**
- [Commensal Koch's postulates: establishing causation in human microbiota research · Current Opinion in Microbiology](https://www.sciencedirect.com/science/article/pii/S1369527417301595)
- [Investigating dysbiosis and microbial treatment strategies in IBD based on two modified Koch's postulates · Frontiers in Medicine, 2022](https://www.frontiersin.org/journals/medicine/articles/10.3389/fmed.2022.1023896/full)
- [Thinking about the microbiome as a causal factor in human health and disease · Current Opinion in Microbiology](https://www.sciencedirect.com/science/article/abs/pii/S1369527420300230)

---

*Instituto Centrobioenergetica, 2026*
