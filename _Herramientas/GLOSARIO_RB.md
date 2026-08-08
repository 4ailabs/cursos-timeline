# Glosario del material del Instituto

**Vocabulario controlado.** Este archivo lo lee `revisa_registro.py`. Cada término nuevo que
aparezca en negritas o en una celda de tabla y no esté aquí, se marca para revisión.

**Por qué existe.** Una lista de palabras prohibidas solo atrapa lo que ya salió mal una vez. El
defecto que se repite es distinto: **se acuña un apodo corto para algo que ya tiene nombre**, y
el apodo solo significa algo para quien vio cómo se construyó. Ese apodo es nuevo cada vez, así
que ninguna lista negra lo anticipa. Lo que sí lo atrapa es una lista de lo **permitido**.

**Las dos reglas que este archivo hace mecánicas:**

> **El nombre completo cada vez, aunque se repita.**
>
> **Cada verbo dice qué ocurre físicamente.**

---

## Apodos prohibidos

Formato: `apodo → nombre completo`. El linter los marca siempre.

- el barrido → el complejo motor migratorio
- barrido de limpieza → las contracciones que empujan hacia adelante lo que quedó en el tramo
- el sello → la unión estrecha
- el compás → la frecuencia de las ondas eléctricas
- la comunidad → la microbiota
- la firma → cómo se presenta · los datos que orientan
- el calibre → el alcance
- el eslabón → nombrar la vía concreta
- el discriminador → lo que separa un caso del otro
- sustracción de capacidad → que falte sustrato
- capacidad endógena → el cuerpo ya lo sostiene solo
- operador en disputa → nombrar quién se está quedando con qué
- el dato que ordena → nombrar el dato
- el principio → la regla, dicha completa
- la variable, sola → nombrar cuál (controlada, primaria, de comparación)
- qué se registra → qué se anota, y qué cosa

---

## Verbos que no dicen qué ocurre

Formato: `verbo → qué escribir en su lugar`.

- rinde más → produce más cambio
- rinde poco → produce poco cambio
- no arranca → no se inicia · nombrar qué célula no hace qué
- se cae → nombrar qué deja de ocurrir
- se apaga → deja de · termina · nombrar el proceso
- corre completo → completa el ciclo · llega a la fase que
- se activa → nombrar qué hace al activarse
- se compromete → nombrar qué función se pierde
- optimiza → nombrar qué cambia y en qué dirección

---

## Términos permitidos

Los que pueden ir en negritas o encabezado sin explicación previa.

### Método

- regulación bioeléctrica
- rastreo
- nodo de lesión
- isla de despolarización
- punto de ajuste
- gradiente
- dipolo
- polo
- imán
- campo
- acidosis temporal
- acidosis latente
- potencial de membrana
- Vmem
- acoplamiento
- unión comunicante
- unión estrecha
- conexina
- restricción
- horizonte

### Anatomía y unidades funcionales

- intestino
- intestino delgado
- barrera
- barrera intestinal

- esófago
- estómago
- glándula gástrica
- célula parietal
- duodeno
- glándulas de Brunner
- yeyuno
- íleon
- placas de Peyer
- válvula ileocecal
- colon
- cripta
- vellosidad
- cripta colónica
- recto
- esfínter
- hiato
- diafragma crural
- píloro
- ángulo esplénico
- nervio frénico
- nervio pudendo
- esplácnicos pélvicos
- páncreas exocrino
- acino
- conducto
- hígado
- lobulillo
- hepatocito
- vía biliar
- glándulas salivales
- mucosa
- epitelio
- enterocito
- colonocito
- capa de moco
- lámina propia
- GALT
- placa de Peyer
- folículo linfoide
- célula M
- ganglio mesentérico
- apéndice vermiforme

### Fisiología

- ritmo
- CFTR
- variable controlada
- variable primaria
- comunidad microbiana

- microbiota
- butirato
- ácidos biliares
- bicarbonato
- vía portal
- flujo esplácnico
- complejo motor migratorio
- células intersticiales de Cajal
- ondas lentas
- plexo mientérico
- plexo submucoso
- sistema nervioso entérico
- nervio vago
- nervio frénico
- nervios frénicos
- diafragma crural
- aferente vagal
- resistencia transepitelial
- permeabilidad
- claudina
- ocludina
- reloj circadiano
- estado autonómico
- predominio simpático
- predominio vagal
- fase cefálica
- fase gástrica
- fase intestinal
- permiso contextual
- mastocito
- susto
- inmovilidad tónica
- tono defensivo
- tono vagal
- variabilidad de la frecuencia cardiaca
- prueba de respiración profunda
- óxido nítrico
- vía nitrérgica
- núcleo motor dorsal del vago
- complejo vagal dorsal
- célula neurópoda
- células neurópodas
- célula enteroendocrina
- ganglio nodoso
- glutamato
- glía entérica
- desinhibición
- neurogénesis
- hiperexcitabilidad
- náusea
- taquigastria
- bradigastria
- disritmia gástrica
- área postrema
- núcleo del tracto solitario
- aferente vagal
- plexo mientérico
- IgA secretora
- exclusión inmune
- linfocito T regulador
- tolerancia
- célula dendrítica
- patobionte
- aceptor de electrones
- tetrationato
- factor de virulencia
- agente anidado
- agente patológico
- inmunidad entrenada
- linfocito Th17
- autoanticuerpo
- translocación
- progenitor de médula ósea
- lámina propria
- resolución de la inflamación
- lipoxina
- resolvina
- protectina
- cambio de clase de mediadores
- plasticidad
- polarización
- macrófago

### Marco de análisis

- estados
- operadores
- restricciones
- evaluación
- horizonte
- dipolo local
- punto distante
- isometría
- acortamiento
- polo negativo
- polo positivo
- rejilla
- trinquete
- índice de trinquete
- unidad funcional
- escala
- alcance
- flexibilidad
- vector de fallo
- rigidez frágil
- ureasa
- metaplasia
- atrofia
- espora
- germinación
- ácido biliar primario
- ácido biliar secundario
- taurocolato
- mucina
- célula caliciforme
- patobionte

---

## Cómo se usa

```bash
# revisión normal, con apodos y verbos vagos
python3 _Herramientas/revisa_registro.py carpeta/

# además, lista los términos nuevos que no están en este glosario
python3 _Herramientas/revisa_registro.py carpeta/ --nuevos
```

**Un término nuevo no es un error.** Es una decisión que hay que tomar a propósito: o se agrega
a este glosario porque es el nombre correcto, o se sustituye por el nombre completo de algo que
ya está aquí.

---

*Instituto Centrobioenergetica, 2026*
