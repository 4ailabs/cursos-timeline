# Instanciación del quíntuple: dos agentes sobre el ácido

**Módulo 3 · Bloque 2** — *Helicobacter pylori* y la glándula gástrica, con sus trinquetes
Instituto Centrobioenergetica · Dr. Miguel Ojeda Rios

> **Por qué son dos.** La regla del marco es explícita: *n* agentes producen *n* quíntuples con
> estados parcialmente solapados, porque **un solo quíntuple no puede representar la disputa por
> un operador compartido.** Aquí los dos agentes actúan sobre el mismo operador: el ácido de la luz gástrica.
>
> **Fuente del formalismo:** `~/quintuple-multiescala/capa1-dominio-v2.md`, secciones 1.3 a 1.6.
> Contenido del caso: [`20_Helicobacter_como_Agente.md`](20_Helicobacter_como_Agente.md).
>
> **Estatuto.** La instanciación es propuesta. Los datos que la sostienen están en el documento 20
> con su etiqueta.
>
> **Y una reserva sobre la sección 7:** la primera de las dos adiciones al catálogo se enunció al
> principio como flecha del caso y **no se sostiene con los datos disponibles**. Ahí queda como
> pregunta abierta, con la razón del error escrita.

---

# 1 · Censo de agentes

| Componente | Linaje | Meta postulada | Evidencia de meta | Alcance Λ | Operadores compartidos |
|---|---|---|---|---|---|
| **Glándula gástrica** | Huésped | Sostener el pH de la luz en su valor y en su horario | Regresa a él tras una desviación; lo defiende gastando energía | **El organismo** | **El pH de la luz** |
| ***Helicobacter pylori*** | Otro linaje | Sostener un pH cercano a 6 en su vecindad inmediata | Activa la ureasa cuando el pH baja, con un canal que se abre con el ácido | **Micrómetros** | **El pH de la luz** |

**Por la regla del marco:** linaje distinto y evaluación propia, con un operador compartido en
disputa. **Dos quíntuples.** `[DERIVADO]`

---

# 2 · Los dos quíntuples

| | **Glándula gástrica** | ***Helicobacter pylori*** |
|---|---|---|
| **S** · estados | pH de la luz; densidad de células parietales y de células D; gastrina; patrón de gastritis por zona | Posición dentro del gradiente de pH del moco; antro o cuerpo; densidad de colonización |
| **O** · operadores | Secretar ácido; secretar somatostatina; secretar gastrina; secretar moco con bicarbonato; renovar el epitelio | Nadar por quimiotaxis; hidrolizar urea; inyectar CagA por el aparato de secreción; inducir linfocitos reguladores por las células dendríticas |
| **w** · costo | Sostener más de un millón de veces de diferencia de protones, sin parar | **El 10 % de sus proteínas es ureasa.** Costo declarado en el propio genoma |
| **C** · restricciones | La capa de moco con bicarbonato; la inhibición por somatostatina; **y la nube de amonio del otro agente** | El pH de la luz; el espesor del moco; los ácidos biliares, que la repelen en el antro distal |
| **E** · evaluación | El pH de la luz, con su valor y su horario | **Un pH cercano a 6 en su vecindad** |
| **H** · horizonte | La fase cefálica: prepara la secreción **antes** de que llegue la comida | La taxis de pH: mide el gradiente con TlpB y se desplaza dentro de él |

`[HIPÓTESIS]` para la instanciación · `[EVIDENCIA]` para cada dato, en el documento 20

## Los estados se solapan en una sola variable

```
        pH DE LA LUZ GÁSTRICA
        ─────────────────────
   El huésped lo fija con la glándula          La bacteria lo sube en el antro
   y con la capa de moco                        y lo baja en el cuerpo
                      ╲                        ╱
                       ╲                      ╱
                        ▼                    ▼
                    UN SOLO VALOR, DOS CRITERIOS
                             │
                  y localmente, una excepción
                  de amonio del tamaño de la bacteria
```

---

# 3 · Los discriminadores obligatorios

## S frente a E, para la bacteria

**La pregunta:** ¿el pH de 6 en su vecindad solo está presente, o regresa activamente después de
una desviación?

**Regresa.** La ureasa empieza a hidrolizar urea a pH 6.5, alcanza su máximo a 5.5, y el canal de
urea **se abre cuando el pH baja**. `[EVIDENCIA]`

> **Es E, no S.** Y es de las demostraciones más limpias de la distinción que hay en todo el
> bloque: un valor que se restaura por acción, con un canal que responde a la desviación.
> `[DERIVADO]`

## Magnitud frente a relación

**Lo que la bacteria sostiene es la diferencia entre el pH de su vecindad y el de la luz**, y no
una cifra absoluta.
Si el huésped baja el ácido, la bacteria no necesita mantener la misma actividad de ureasa. **Lo
defendido es la diferencia.** `[DERIVADO]`

Y coincide con la afirmación que ordena el módulo: lo relacional antes que lo cuantitativo.

## w frente a C, para la bacteria

**Dedicar el diez por ciento de las proteínas a una sola enzima es costo, no restricción.** El
operador está disponible; lo que pesa es lo que cuesta ejecutarlo. `[DERIVADO]`

---

# 4 · El alcance, y lo que resuelve

Aquí el formalismo da algo que el documento 20 planteaba peor.

| | Λ · hasta qué escala responde |
|---|---|
| **Glándula gástrica** | El organismo. Su valor de pH sirve a la digestión y a la barrera que impide que las bacterias suban al intestino delgado |
| ***Helicobacter*** | **Su vecindad inmediata**, del orden de micrómetros |

> **Los dos actúan sobre la misma variable, con alcances de escalas distintas.** `[DERIVADO]`

## Y con eso, la tercera posición del criterio se puede decir mejor

En [`20_Helicobacter_como_Agente.md`](20_Helicobacter_como_Agente.md) propuse una tercera
categoría de agente: el que se fabrica una excepción local. **Con Λ no hace falta una categoría
nueva.**

| | Qué hace con la restricción del huésped | Λ del agente |
|---|---|---|
| **Anidado** | La sostiene | A la escala del huésped |
| **Patológico** | La levanta | A la escala del huésped |
| **De excepción local** | La deja en pie **y opera por debajo de ella** | **Menor que la del huésped** |

> **La excepción local es una diferencia de alcance, y no una tercera intención.** El agente no
> disputa el valor global: opera en una escala en la que ese valor no lo alcanza. `[HIPÓTESIS]`

**Y de ahí sale cuándo deja de ser local:** cuando la densidad de colonización crece, o cuando el
huésped pierde células parietales, **las dos escalas empiezan a superponerse.** Ahí el mismo
agente pasa a disputar el valor global. `[HIPÓTESIS]`

---

# 5 · Flexibilidad, en los dos

| | Φ_flex · rutas alternativas |
|---|---|
| **Glándula gástrica** | Rutas para manejar la carga: moco con bicarbonato, renovación del epitelio, ajuste de gastrina y somatostatina |
| ***Helicobacter*** | Reubicarse dentro del gradiente; presencia o ausencia de la isla cag; ajustar la actividad de ureasa |

**Y el perfil que el marco predice que aparece primero —rigidez frágil, con eficiencia
conservada— aplica al huésped en este caso:** la glándula sigue secretando, y lo que pierde es la
capacidad de conmutar entre rutas cuando la respuesta inflamatoria deja de modularse.
`[HIPÓTESIS]` · [`11_El_GALT_que_no_se_desactiva.md`](11_El_GALT_que_no_se_desactiva.md)

---

# 6 · Las flechas de estado a restricción

| | Flecha | Tipo | Trinquete | Ventana |
|---|---|:-:|:-:|---|
| **H1** | Caída de células D y de somatostatina, con aumento de gastrina y de ácido | — | no | Reversible con la erradicación |
| **H2** | Atrofia del cuerpo con pérdida de células parietales | T4 | **parcial** | Meses a años. Regresa tras erradicar, **y regresa menos si se administran inhibidores de la secreción ácida** |
| **H3** | Metaplasia intestinal | **T7** reversión de identidad | **sí** | Años |
| **H4** | Respuesta Th1 y Th17 que deja de modularse | T5 | parcial | Meses |
| **H5** | Desplazamiento del nicho del antro al cuerpo por inhibidor de bomba | **T8** permiso | parcial | Mientras dure el fármaco, **y acelera H2** |
| **H6** | Reducción de linfocitos reguladores en quienes **nunca fueron colonizados** | — | por determinar | Ver sección 7, con su reserva |

`[HIPÓTESIS]` para la asignación · `[EVIDENCIA]` para cada dato, en el documento 20

**El índice de trinquete de este caso lo fijan H2 y H3.** Mientras no haya metaplasia, la mayor
parte de las flechas conserva ventana. `[DERIVADO]`

---

# 7 · Lo que este caso agrega al catálogo

Dos cosas que las nueve flechas del marco no contemplan, y las dos salen de las figuras de
Atherton y Blaser.

## Uno · una corrección también puede ser una flecha

**El catálogo describe flechas que produce el estado. La pregunta es si una intervención puede
producir una.** En el marco, cualquier operador que cambie una restricción de manera duradera
califica, y por eso merece su propia línea en la tabla. `[DERIVADO]`

**Como principio, se sostiene. Aplicado a la erradicación de esta bacteria, no.** Y conviene
decir por qué, porque el error es de nivel y es fácil de repetir.

| | |
|---|---|
| **Lo que muestran las figuras** | Una **población que nunca fue colonizada** —personas que se desarrollaron sin la bacteria— tiene linfocitos reguladores muy reducidos y Th1 reducido |
| **Lo que no muestran** | Qué le pasa a **una persona que la tuvo durante décadas y fue erradicada** |
| **Por qué no es lo mismo** | En el primer caso el sistema inmune se formó sin ese estímulo. En el segundo se formó con él y después se retiró. **El momento del desarrollo no es intercambiable con la edad adulta** |

> **La afirmación de que erradicar deja una marca duradera sobre las restricciones del huésped
> queda como pregunta abierta, y no como flecha del caso.** `[ESPECULACIÓN]`

**Lo que sí se puede afirmar, y es distinto:** que la erradicación es un operador con efectos que
conviene registrar, y que uno de ellos está medido — **la regresión de la atrofia después de
erradicar es menor cuando se administran inhibidores de la secreción ácida.** `[EVIDENCIA]`

**Y lo que este documento no plantea, dicho sin rodeo:** ninguna reserva sobre erradicar cuando
está indicado. Las indicaciones de erradicación tienen beneficio establecido y son del
gastroenterólogo. `[DERIVADO]`

## Dos · el cambio de signo por horizonte

La curva de beneficio y costo cruza el cero con la edad. **Y en el vector de fallo no hay
componente para esto:** δ_H mide colapso del horizonte, no que el horizonte se acorte por vivir.

> **El signo de E depende de H.** Una configuración que rinde beneficio con horizonte largo puede
> resultar costosa cuando el horizonte se acorta, **sin que ninguna otra letra haya cambiado.**
> `[HIPÓTESIS]`

| | |
|---|---|
| **Con horizonte largo** | El beneficio está del lado de las infecciones, el asma y el metabolismo |
| **Con horizonte corto** | El costo está del lado de la úlcera, la anemia y el cáncer gástrico |
| **Qué cambió del sistema** | **Nada. Cambió cuánto queda por delante** |

`[EVIDENCIA]` para la curva · `[HIPÓTESIS]` para la formulación

**Consecuencia clínica directa:** la misma relación no se evalúa igual a los veinte años que a
los sesenta. **Es la letra H entrando en la evaluación**, y no una convención de las guías.
`[DERIVADO]`

---

# 8 · Vector de fallo

```yaml
vector_fallo_glandula_gastrica:
  delta_E: 2          # el valor de pH se desplaza según dónde predomine la colonización
  delta_C: 2          # rigidificación por atrofia; 3 si hay metaplasia
  delta_Phi_flex: 2   # la respuesta deja de conmutar entre rutas
  delta_Lambda: 1
  delta_H: 1
  delta_Sigma: 1
  componente_dominante: delta_E con delta_Phi_flex
  perfil: rigidez frágil, con la secreción conservada
  indice_de_trinquete: 0 sin atrofia · 1 con atrofia · 2 con metaplasia
```

`[HIPÓTESIS]` — las puntuaciones organizan el razonamiento y no son una escala clínica.

---

# 9 · Qué se sigue para el método

**H-Q1 · Lo que este eje puede alcanzar es Φ_flex del huésped**, es decir, que la respuesta vuelva
a conmutar entre rutas. No el otro agente. `[HIPÓTESIS]`

**H-Q2 · El desenlace es el mismo del documento 11:** que la respuesta termine, no que el
organismo desaparezca. `[HIPÓTESIS]`

**H-Q3 · Y antes de mover el ácido hay que saber en qué dirección.** Es un valor con dos dueños y
dos consecuencias opuestas: subirlo protege el intestino delgado y expone el esófago.
`[HIPÓTESIS]` · [`05_Eje_de_los_Protones.md`](05_Eje_de_los_Protones.md)

---

# 10 · Qué de esto va a la clase

**Uno · hay valores del cuerpo que tienen más de un dueño.** El pH del estómago lo sostienen dos
agentes con criterios distintos, y las intervenciones sobre él son intervenciones sobre la
relación.

**Dos · la bacteria defiende su valor, y no solamente lo tiene.** Su enzima empieza a hidrolizar
urea cuando el pH baja, y tiene un canal que se abre con el ácido para dejar entrar más urea. Es la demostración más limpia del bloque de la
diferencia entre estar en un estado y defenderlo.

**Tres · y lo que defiende es una diferencia, no una cifra.** Otra vez lo relacional.

**Cuatro · la excepción local es una diferencia de alcance.** No disputa el valor global del
estómago: **opera en una escala en la que ese valor no la alcanza.** Y deja de ser local cuando
las dos escalas se superponen.

**Cinco · lo que se mide en una población no se traslada a una persona.** Que quienes nunca
fueron colonizados tengan menos linfocitos reguladores **no dice qué le pasa a alguien que la
tuvo y fue tratado.** Es un error de nivel, y conviene enseñarlo como error.

**Seis · y el signo depende del horizonte.** La misma configuración rinde beneficio con muchos
años por delante y costo con pocos, **sin que nada del sistema haya cambiado.**

---

*Instituto Centrobioenergetica, 2026*
