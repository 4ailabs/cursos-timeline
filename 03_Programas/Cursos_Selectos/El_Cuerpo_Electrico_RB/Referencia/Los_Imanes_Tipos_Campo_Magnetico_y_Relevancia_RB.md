# Los imanes: tipos, características del campo magnético y relevancia para Regulación Bioeléctrica

> Documento satélite basado en `Fundamentos_Cientificos/Regulacion-bioelectrica/Tratado_RB_Cap05_El_Instrumento.md` (Cap. 5, "El instrumento: el imán estático") y `Tratado_RB_Cap06_Sustrato_Continuo.md` (Cap. 6, para la sección 7 sobre la conexión a distancia entre dos puntos). Reorganizado como referencia autónoma.

---

## 1. Qué es un imán permanente

Un imán permanente genera un campo magnético estático sin necesitar corriente eléctrica externa. El campo se origina en la alineación de los momentos magnéticos de los electrones desapareados en la estructura cristalina del material. Una vez magnetizado, el material retiene su magnetización de forma estable durante años o décadas.

El campo es **estático** — no varía en el tiempo. Esto lo distingue de los campos electromagnéticos pulsados (PEMF), de radiofrecuencia, o de extremadamente baja frecuencia (ELF-EMF). Es una distinción importante: la literatura sobre efectos biológicos de campos alternantes no es directamente trasladable a campos estáticos, y viceversa — son estímulos físicos diferentes, con mecanismos de interacción diferentes.

**Relevancia para RB:** cuando se cita evidencia científica para sostener un mecanismo, hay que verificar que el estudio use campos estáticos (SMF) y no PEMF o ELF-EMF — mezclar ambos tipos de evidencia es un error común en la literatura de divulgación del biomagnetismo.

---

## 2. Tipos de imanes usados en biomagnetismo clínico

### 2.1 Ferrita (cerámica)

Óxidos de hierro combinados con bario o estroncio (BaFe₁₂O₁₉ o SrFe₁₂O₁₉). Material estándar de la práctica temprana del biomagnetismo, desde los años 50.

| Propiedad | Valor |
|---|---|
| Densidad de flujo en superficie | 0.1–0.3 T (1,000–3,000 G) |
| Producto de energía máximo (BHmax) | ~3.5 MGOe |
| Temperatura máxima de operación | hasta 300 °C |
| Coercitividad | moderada |
| Costo | bajo |
| Fragilidad | moderada (cerámico, se fractura con impactos) |

Ventajas: bajo costo, alta estabilidad térmica, menor peligrosidad por su menor fuerza de atracción. Limitación: menor intensidad por unidad de volumen — se necesita más tamaño para la misma intensidad que un neodimio.

Grados comerciales típicos de ferrita dura: **Y30 / C5** (Br ~0.37–0.40 T; Hcb 175–210 kA/m; BHmax 26–30 kJ/m³) y **C8 / Y30H-1** (Br ~0.385 T, con mayor coercitividad). Ambos tienen remanencia similar; el C8 resiste mejor la desmagnetización.

### 2.2 Neodimio (NdFeB)

Aleación de neodimio, hierro y boro (Nd₂Fe₁₄B). Desarrollado independientemente por General Motors y Sumitomo Special Metals en 1984. Es el imán permanente más potente disponible comercialmente, y el más usado en la práctica clínica actual.

| Propiedad | Valor |
|---|---|
| Densidad de flujo en superficie | 0.5–1.4 T (5,000–14,000 G), según grado |
| Producto de energía máximo (BHmax) | 28–55 MGOe — hasta 15× la ferrita |
| Remanencia (Br) | 1.0–1.45 T |
| Temperatura máxima de operación | 80 °C (grado N estándar) a 230 °C (grados TH especiales) |
| Coercitividad | alta |
| Fragilidad | alta — metálico pero quebradizo, susceptible a corrosión si se daña el recubrimiento |
| Densidad | 7.3–7.5 g/cm³ |

Grados comunes en clínica: **N35 a N52** (el número indica el BHmax en MGOe). N42 y N45 son los más frecuentes — buen balance entre intensidad, costo y estabilidad.

**Tabla grado por grado** (datos de K&J Magnetics, 2026):

| Grado | Remanencia Br | BHmax (MGOe) |
|---|---|---|
| N35 | 1.17–1.21 T | 33–35 |
| N38 | 1.22–1.26 T | 36–38 |
| N40 | 1.26–1.29 T | 38–40 |
| N42 | 1.30–1.32 T | 40–42 |
| N45 | 1.33–1.37 T | 43–45 |
| N48 | 1.38–1.42 T | 45–48 |
| N50 | 1.41–1.45 T | 48–50 |
| N52 | 1.45–1.48 T | 49.5–52 |

Datos comunes a todos los grados N estándar: coercitividad Hc > 11 kOe, coercitividad intrínseca Hci > 11–12 kOe (desciende ligeramente en los grados más altos), densidad 7.4–7.5 g/cm³, temperatura máxima de operación 80 °C, temperatura de Curie ~310 °C.

> **Precisión importante:** la remanencia (Br) es una propiedad del *material*. El campo real medido en la superficie de un imán concreto es algo menor que Br y depende de la geometría (diámetro, espesor). Por eso un N42 "de 1.3 T" mide en superficie del orden de 0.4–0.5 T, no 1.3 T.

### 2.3 Otros materiales

- **Samario-cobalto (SmCo):** más estable térmicamente que el neodimio (hasta 350 °C), más resistente a la corrosión, pero menos intenso y más caro. Poco usado en clínica.
- **Alnico (Al-Ni-Co):** buena estabilidad térmica pero baja coercitividad — se desmagnetiza fácilmente. Uso histórico, no relevante hoy.

**Relevancia para RB:** el grado y material del imán determina la intensidad real disponible en la superficie — es información que el terapeuta debería conocer de sus propios instrumentos, no asumir.

---

## 3. El campo magnético: geometría y atenuación

### 3.1 Geometría

Un imán genera un campo dipolar: las líneas de campo emergen del polo norte, se curvan por el espacio exterior, y regresan al polo sur. La densidad de líneas es máxima en la superficie (especialmente en los polos) y disminuye con la distancia.

La forma del imán determina la geometría del campo — disco, bloque, anillo, esfera. El **disco** es la forma más relevante en biomagnetismo clínico, porque se aplica directamente sobre la piel con una cara plana en contacto con el cuerpo.

### 3.2 Atenuación con la distancia — el dato más importante y menos discutido en la formación tradicional

Para un dipolo magnético, la intensidad decae con el **cubo inverso de la distancia** (∝ 1/d³), donde *d* es la distancia al centro del imán. Cerca de la superficie la atenuación es algo más lenta; converge a 1/d³ a distancias mayores que el diámetro del imán.

Valores estimados para un neodimio N42, disco de 25 × 10 mm (tamaño típico clínico):

| Distancia desde la superficie | Intensidad estimada |
|---|---|
| 0 mm (superficie) | ~400–500 mT |
| 5 mm (piel + subcutáneo) | ~150–250 mT |
| 10 mm (~1 cm) | ~50–100 mT |
| 20 mm (~2 cm) | ~15–30 mT |
| 30 mm (~3 cm) | ~5–10 mT |
| 50 mm (~5 cm) | ~1–3 mT |

Implicaciones directas:

1. Los tejidos superficiales reciben 100–500 mT — dentro del rango donde Wu et al. (2022) documentaron efectos sobre canales de Ca²⁺ tipo T (140 mT).
2. A 2–3 cm de profundidad, el tejido recibe 10–30 mT — dentro del rango revisado por Saletnik et al. (2024) como efectivo (2–80 mT).
3. Los órganos a más de 5 cm reciben menos de 3 mT — rango donde los efectos documentados son menores o inconsistentes, aunque la magnetita biogénica podría transducir campos de esa intensidad (Kirschvink, 1992).

**Relevancia para RB:** decir "estoy aplicando 500 militesla" describe la superficie del imán, no lo que recibe el tejido. A 2 cm de profundidad el tejido puede estar recibiendo 15–30 mT — casi 20 veces menos. Es una precisión de comunicación necesaria, no una objeción a la práctica: los efectos biológicos documentados sí caen dentro de ese rango atenuado.

---

## 4. Polaridad

### 4.1 Convención

Cada imán tiene dos polos: norte (N) y sur (S), siguiendo la convención física estándar — el polo norte es el que, suspendido libremente, apuntaría al norte geográfico. En el Par Biomagnético tradicional, el rastreo se hace con el **polo negativo** (que es el norte del imán) aplicado sobre el cuerpo; la impactación usa dos imanes de polaridad opuesta, uno en cada punto del dipolo.

### 4.2 ¿Importa realmente la polaridad?

La tradición del biomagnetismo le asigna gran importancia: negativo (norte) para un efecto, positivo (sur) para el opuesto. Aquí hay que ser precisos, porque es fácil mezclar dos fenómenos distintos:

- Becker documentó un efecto de **polaridad eléctrica** (la carga de un electrodo de plata en un circuito de corriente directa) sobre bacterias y regeneración ósea — no polaridad **magnética**. Son fenómenos físicos diferentes y no deben citarse como si fueran la misma evidencia.
- La evidencia publicada específicamente sobre efectos diferenciales de polaridad de un **campo magnético estático** es limitada e inconsistente — algunos estudios reportan diferencias entre norte y sur, otros no encuentran ninguna.
- El mecanismo con más peso explicativo, la anisotropía diamagnética de Rosen, **no predice ningún efecto diferencial de polaridad** — depende de la intensidad del campo, no de su dirección.
- El único mecanismo que podría producir un efecto direccional real es la **magnetita biogénica**: el torque sobre un cristal ferromagnético sí depende de la orientación relativa entre el campo externo y el momento magnético del cristal.

**Posición del Tratado:** la convención de polaridad se conserva como protocolo operativo — es útil como procedimiento estandarizado y reproducible entre terapeutas — pero no está establecido de forma concluyente que invertir los polos cambie el resultado biológico. Es un tema abierto que requiere investigación directa.

---

## 5. Degradación y mantenimiento

### 5.1 Factores de degradación

- **Temperatura** (el factor más importante): el neodimio grado N estándar empieza a perder magnetización de forma irreversible por encima de 80 °C. Un secador de pelo no lo daña; un auto cerrado en verano (60–80 °C) sí puede degradarlo; la esterilización por calor seco (170 °C) lo desmagnetiza por completo. Los grados especiales (SH, UH, EH, TH) toleran hasta 230 °C. La ferrita tolera hasta 300 °C sin degradación significativa.
- **Impactos mecánicos:** el neodimio es frágil — se fractura, lo que altera la geometría del campo aunque no siempre desmagnetice. Dos imanes grandes que colisionan por atracción pueden proyectar fragmentos — riesgo de seguridad real.
- **Corrosión:** el neodimio se oxida fácilmente; se recubre con níquel, zinc o epoxi. Si el recubrimiento se daña, el imán se corroe y pierde magnetización. La ferrita no tiene este problema.
- **Campos opuestos:** la exposición prolongada a campos opuestos de intensidad comparable puede desmagnetizar parcialmente, sobre todo con baja coercitividad. Guardar imanes de neodimio con polos iguales enfrentados (repulsión) puede degradarlos con el tiempo.

### 5.2 Vida útil

En uso clínico normal, el neodimio pierde ~1% de su magnetización en los primeros 10 años, y luego el ritmo de degradación disminuye. Bien cuidado, mantiene magnetización funcionalmente útil durante décadas.

### 5.3 Verificación

Un gaussímetro (teslámetro) portátil, de costo modesto y resolución de 1 mT, permite confirmar periódicamente que los imanes de uso clínico no han perdido intensidad significativa.

**Relevancia para RB:** verificar la intensidad real de los propios instrumentos con un gaussímetro es una práctica de responsabilidad clínica básica — no algo opcional para quien reporta intensidades específicas a sus pacientes.

---

## 6. Seguridad del instrumento

### 6.1 Riesgos mecánicos

Los imanes de neodimio grandes (>20 mm de diámetro, grado N42–N52) pueden generar fuerzas de atracción superiores a 10–20 kg — suficiente para pinzar tejido blando (piel, dedos) entre dos imanes y causar hematomas o aplastamiento. Manipular con cuidado, almacenar con separadores, nunca dejar que dos imanes grandes se atraigan libremente.

### 6.2 Contraindicaciones absolutas

- Marcapasos y dispositivos cardíacos implantables.
- Implantes ferromagnéticos (clips quirúrgicos, fragmentos metálicos, ciertas prótesis).
- Bombas de insulina y otros dispositivos electrónicos implantables.

### 6.3 Precauciones

- **Embarazo:** no hay evidencia de daño por campos estáticos de 0.1–0.5 T en superficie — la MRI clínica usa 1.5–3 T y se considera segura en embarazo cuando está indicada. Por precaución, la práctica tradicional evita la aplicación directa sobre el abdomen gestante.
- **Tarjetas magnéticas, dispositivos electrónicos, relojes:** pueden dañarse por exposición — deben retirarse antes de la sesión.

---

## 7. La configuración de dos imanes opuestos — y por qué "a distancia" no significa que los imanes se comuniquen entre sí

El protocolo central del biomagnetismo clínico: dos imanes de polaridad opuesta sobre los dos puntos anatómicos de un dipolo — polo negativo (norte) donde el rastreo fue positivo, polo positivo (sur) en el punto complementario.

### 7.1 Los dos imanes no interactúan magnéticamente entre sí

A las distancias típicas entre dos puntos de un dipolo clínico (10–40 cm), los campos de los dos imanes son esencialmente independientes — cada uno ha decaído a valores muy bajos a esa distancia (siguiendo la ley de 1/d³ de la sección 3), así que **no hay interacción magnética directa entre los dos imanes**. Esto hay que decirlo con la misma honestidad que todo lo demás: si existe una conexión funcional entre los dos puntos, esa conexión **no es un fenómeno del campo magnético** — es una propiedad del paciente. Cada imán actúa localmente, sobre su propio punto anatómico.

### 7.2 Entonces, ¿por qué "funciona a distancia"? — el sustrato continuo

Aquí es donde está la explicación completa, desarrollada en el Cap. 6 del Tratado ("El sustrato continuo"), y que no requiere postular ninguna resonancia magnética ni nada esotérico. La conexión entre dos puntos distantes del cuerpo existe — pero es **biológica, no magnética**, y está sostenida por cuatro líneas de evidencia independientes que convergen en describir el mismo sustrato anatómico:

| Sistema | Quién lo documentó | Qué aporta a la conexión a distancia |
|---|---|---|
| **Planos fasciales** | Langevin & Yandow, 2002; Heine, 1988 | La fascia es una red de nodos funcionales, no relleno — 190 de 238 puntos anatómicos estudiados caen sobre planos fasciales (P < 0.001), coincidiendo con puntos terapéuticos empíricos. |
| **Regulación básica (MEC)** | Pischinger; Ulm & Weiss, 2014 | La matriz extracelular es un medio electroquímico *continuo* — sin interrupciones anatómicas entre la MEC de un tejido y la del tejido adyacente. |
| **Redes bioeléctricas** | Levin, 2021; Busse et al., 2018 | Las células somáticas (no solo las neuronas) están conectadas por gap junctions y se señalizan a distancia — entre extremidades contralaterales, en ~30 segundos. Demasiado rápido para explicarse por difusión molecular clásica. |
| **MALT (inmunidad mucosa)** | Múltiples | Territorios inmunológicos regionales que dependen del estado de la MEC subyacente, organizados por región corporal. |

Estas cuatro tradiciones de investigación, trabajando de forma independiente, terminaron describiendo la **misma red anatómica**: continua, regionalmente diferenciada, electroquímicamente activa, y bioeléctricamente conectada a distancia por gap junctions y fascia — no por magnetismo.

### 7.3 El caso concreto: la fascia toracolumbar y el iliopsoas

Un ejemplo anatómico específico ilustra cómo se transmite la señal: la fascia toracolumbar corre desde la base del cráneo hasta el sacro, y en ella convergen la cadena simpática paravertebral completa, el músculo iliopsoas (fusionado fascialmente con esa cadena simpática a través del ligamento arcuato medial del diafragma), y gap junctions entre los fibroblastos de la fascia. El iliopsoas —que es, precisamente, el músculo cuya respuesta se observa en el rastreo— tiene inervación dual (somática y simpática), lo que lo posiciona como un **transductor somático-autonómico**: un punto donde una perturbación bioeléctrica en cualquier parte de esta red fascial puede traducirse en una respuesta neuromuscular observable.

> Esto es una hipótesis integrada, no un dato verificado directamente como conjunto — pero cada uno de sus componentes (la fusión fascial del iliopsoas con la cadena simpática, su inervación dual, las gap junctions fasciales, la señalización bioeléctrica a distancia) está documentado de forma independiente.

### 7.4 Lo que esto significa para la práctica

- El imán no "resuena" con el otro imán a 30 cm de distancia a través del cuerpo — eso no tiene mecanismo físico posible a esas distancias.
- Lo que sí existe es un sustrato biológico real —fascial, matricial, bioeléctrico e inmunológico— que ya conecta esos dos puntos antes de que se aplique ningún imán. El campo magnético estimula ese sustrato en dos puntos; la conexión entre ambos la hace el propio cuerpo del paciente, por vías ya documentadas (gap junctions en segundos, continuidad fascial, plexos autonómicos que inervan territorios amplios).
- Esto también explica por qué la Regla 22 de Goiz ("existe resonancia vibracional entre los dos puntos del par") no se sostiene como formulación: no porque la conexión no exista, sino porque el mecanismo real es fascial y bioeléctrico, no una "resonancia" sin definición biofísica operacional.

---

## 8. Comparación con otros campos magnéticos

| Fuente | Intensidad |
|---|---|
| Campo magnético terrestre | ~50 µT (0.00005 T) |
| Imán de refrigerador | ~5 mT |
| Imán de ferrita clínico (superficie) | 100–300 mT |
| Imán de neodimio clínico (superficie) | 300–500 mT |
| Imán de neodimio N52 grande (superficie) | 500–1,400 mT |
| Resonancia magnética clínica (MRI) | 1,500–3,000 mT (1.5–3 T) |
| MRI de investigación | 7,000–11,700 mT (7–11.7 T) |

Los imanes clínicos son 6,000–10,000 veces más intensos que el campo terrestre, pero 3–10 veces más débiles que una MRI clínica. Los millones de resonancias realizadas anualmente sin efectos adversos documentados por el campo estático (los riesgos de la MRI vienen del campo gradiente y la radiofrecuencia, no del campo estático) dan un perfil de seguridad amplio hasta 3 T.

---

## 9. Síntesis — qué necesita saber el terapeuta

1. Conocer el material y grado de sus imanes.
2. Entender que la intensidad que llega al tejido no es la de la superficie — decae con el cubo de la distancia.
3. Verificar periódicamente la magnetización con un gaussímetro.
4. Respetar las contraindicaciones absolutas.
5. No atribuir al imán propiedades que no tiene: no "emite energía", no "vibra", no "resuena" con otro imán a 30 cm de distancia a través del cuerpo. Genera un campo magnético estático que interactúa con el tejido por mecanismos biofísicos documentados — anisotropía diamagnética, canales de Ca²⁺ tipo T, magnetita biogénica, modulación de macrófagos (Tratado, Cap. 4).

---

## Referencias

1. Propiedades de imanes de neodimio: datos técnicos compilados de fabricantes (K&J Magnetics, Supermagnete) y especificaciones de producto, 2026.
2. Kirschvink JL, Kobayashi-Kirschvink A, Woodford BJ. Magnetite biomineralization in the human brain. *Proc Natl Acad Sci USA*. 1992;89(16):7683-7687.
3. Saletnik B, et al. Static magnetic fields as a factor in modification of tissue and cell structure: a review. *Int Agrophys*. 2024;38(1):43-75.
4. Wu H, Li C, Masood M, et al. Static magnetic fields regulate T-type calcium ion channels and mediate mesenchymal stem cells proliferation. *Cells*. 2022;11(15):2460.
5. Valores de atenuación: calculadoras de campo para imanes cilíndricos (K&J Magnetics, Supermagnete), aproximados para N42, disco 25×10 mm.
6. Busse SM, McMillen PT, Levin M. Cross-limb communication during *Xenopus* hindlimb regenerative response. *Development*. 2018;145(20):dev164210.
7. Langevin HM, Yandow JA. Relationship of acupuncture points and meridians to connective tissue planes. *Anat Rec*. 2002;269(6):257-265.
8. Pischinger A. *The Extracellular Matrix and Ground Regulation*. Berkeley: North Atlantic Books; 2007.
9. Walford G. Psoas major. StatPearls [Internet]. Treasure Island (FL): StatPearls Publishing; 2023.

---

*Instituto Centrobioenergetica, 2026 · Documento de referencia — satélite del Tratado de Regulación Bioeléctrica, Cap. 5*
