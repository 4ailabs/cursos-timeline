# El ejemplo del bloque: el apagón de 2003

**Módulo 3 · Bloque 1** — comparación de ejemplos
Instituto Centrobioenergetica · Dr. Miguel Ojeda Rios

> **Qué decide este documento.** Con qué ejemplo se enseñan las cinco piezas. El material del
> marco usa el taxi. Aquí se propone sustituirlo por el apagón del noreste de Estados Unidos y
> Canadá del 14 de agosto de 2003, y se dan las razones y los datos.

---

## 1 · Por qué cambiar de ejemplo

El taxi funciona para cuatro de las cinco piezas. Falla en una cosa que este módulo necesita:
**no da imagen de por qué un sistema en falla cierra el paso a los demás.** Y ese es exactamente
el criterio que hay que enseñar en la tarde — cuál sistema se atiende primero cuando el paciente
trae tres a la vez.

El apagón de 2003 da esa imagen, y da además tres cosas que el taxi no tiene:

**Es real y está documentado.** Informe final de 238 páginas del grupo de trabajo conjunto
Estados Unidos–Canadá, publicado en abril de 2004. No hay que pedirle al grupo que imagine nada.

**El punto de ajuste es un número.** La red eléctrica trabaja para sostener **60 Hz**. No es una
analogía de un punto de ajuste: es uno.

**La pérdida de información está documentada como causa.** El sistema de alarmas de la operadora
dejó de funcionar sin avisar, y los operadores estuvieron **más de una hora sin saber que habían
dejado de recibir información**. Eso es literalmente lo que le pasa a una zona que cierra sus
uniones comunicantes.

**Y es un ejemplo eléctrico**, en un curso que se llama El Cuerpo Eléctrico. Una red que defiende
una frecuencia y pierde acoplamiento entre sus nodos.

---

## 2 · Los hechos

*14 de agosto de 2003. Ohio, y de ahí al noreste de Estados Unidos y Ontario.*

| Hora | Qué pasó |
|---|---|
| ~13:30 | Una planta generadora sale de servicio. La red redistribuye la carga |
| ~14:15 | **El procesador de alarmas de FirstEnergy deja de actualizarse.** Sin aviso sonoro ni visual. Los operadores no se enteran |
| 15:05 – 15:41 | **Tres líneas de 345 kV en Ohio** se calientan, se descuelgan, tocan árboles sin podar y se desconectan, una tras otra en menos de media hora. Los operadores no reciben ninguna alarma |
| 15:41 – 16:05 | La carga se redistribuye a las líneas que quedan. Esas se sobrecargan, se descuelgan más y también se desconectan |
| **16:06** | **Empieza la cascada** |
| **16:13** | **508 unidades generadoras en 265 centrales están fuera de servicio.** Siete minutos |
| — | **55 millones de personas** sin electricidad. Ocho estados y Ontario |
| — | Restablecimiento: hasta **dos días**, y una semana en algunas zonas |

**El dato que hay que subrayar:** las centrales no se destruyeron. Se desconectaron. La
capacidad de generar estuvo entera todo el tiempo, y por eso la luz volvió en dos días sin
reconstruir nada.

---

## 3 · Las cinco piezas, en la red

| | | En la red eléctrica |
|---|---|---|
| **S** | Los estados posibles | Todas las combinaciones de generación y carga |
| **O** | Las acciones disponibles | Encender generadores, desconectar carga, reconfigurar |
| **C** | **Las restricciones** | **Las líneas de transmisión disponibles** |
| **E** | **El criterio** | **60 Hz.** La red entera trabaja para sostenerlo |
| **H** | El horizonte | Lo que el operador alcanza a ver de la red y con cuánto retraso |

**Y el punto de ajuste tiene banda de defensa, con umbrales publicados:**

| Frecuencia | Qué pasa |
|---|---|
| 60 Hz | Normal |
| Por debajo de 59.5 | Quedan unos 30 segundos antes de que la situación se vuelva crítica |
| Por debajo de 58.0 | Quedan segundos |
| Por debajo de 56.5 | Los generadores se desconectan solos |

Eso responde en un dato la pregunta de qué es defender un punto de ajuste: hay un valor, hay un
margen, y fuera del margen el sistema toma medidas por su cuenta.

---

## 4 · Los cuatro momentos que el ejemplo enseña

**Primero · el punto de ajuste que se defiende.**
La red no persigue producir mucha electricidad. Persigue mantener 60 Hz. Sube generación cuando
la frecuencia baja y la baja cuando sube. Es un valor defendido activamente, igual que el hígado
del módulo pasado.

**Segundo · la conexión que se cierra.**
Tres líneas se desconectan. Ninguna central se dañó. Lo que desapareció son las rutas por donde
la electricidad podía pasar.

**Tercero · la pérdida de información.**
Las alarmas se murieron en silencio. Los operadores siguieron trabajando con una pantalla que
ya no les decía la verdad, **y no sabían que habían dejado de recibir información.** Durante más
de una hora tomaron decisiones con datos viejos.

> Esto es lo mismo que le pasa a una zona despolarizada que cerró sus uniones comunicantes. Deja
> de recibir información de alrededor, y no tiene manera de saber que dejó de recibirla.

**Cuarto · la cascada, que es el criterio de la tarde.**
Cuando una línea se desconecta, su carga pasa a las demás. Esas se sobrecargan y se desconectan.
Su carga pasa a las que quedan. En siete minutos, 508 unidades fuera de servicio.

> **Cada conexión que se cierra le cierra el paso a las siguientes.** Ese es el argumento
> completo de por qué en un paciente con tres sistemas marcados se atiende primero el que le
> cierra el paso a los otros dos.

---

## 5 · Dos cosas más que el ejemplo regala

**Los relés de protección.** Cada generador tiene un relé que lo desconecta de la red para que
no se dañe. Durante la cascada, esos relés dispararon **justo cuando la red necesitaba más
generación conectada, no menos.** Cada generador se protegió a sí mismo y con eso empeoró el
conjunto.

Es un programa de protección que, ejecutado en el momento equivocado, se vuelve el problema. Sirve
tal cual para el eje inflamatorio de la tarde.

**Más generación no habría servido.** Con las líneas caídas, encender más centrales no resuelve:
la electricidad no tiene por dónde pasar. Lo que resuelve es reconectar las líneas.

Ese es el argumento de por qué un imán más potente no sustituye al segundo polo, sin necesidad
de cambiar de ejemplo a mitad de la hora.

---

## 6 · Qué se pierde al dejar el taxi

Hay que decirlo, porque no todo mejora.

**El taxi explica mejor O**, el repertorio de acciones. «Avanzar, girar, frenar» es más concreto
que «reconfigurar la red». En el apagón, **O** queda como la pieza más débil.

**El taxi es más cercano.** El tráfico de la Ciudad de México es experiencia diaria y con
detalle. Un apagón en Ohio en 2003 hay que contarlo.

**Y el taxi permite un chiste.** El apagón no.

**Recomendación:** usar el apagón como ejemplo del bloque, y conservar el taxi **solo para el
momento del GPS mal tecleado**, que es donde sigue siendo mejor: un taxista que maneja bien
hacia el domicilio equivocado se entiende en una frase. Son treinta segundos, y no obliga a
sostener dos mapas mentales porque no se vuelve a usar.

---

## 7 · Cómo queda el reparto de la hora

| Min | Contenido | Ejemplo |
|---|---|---|
| 0 – 6 | El paciente que hace todo bien | — |
| 6 – 12 | El punto de ajuste que se defiende: los 60 Hz | Apagón |
| 12 – 16 | El taxi con el GPS mal tecleado | Taxi |
| 16 – 22 | El hígado del módulo pasado | Cuerpo |
| 22 – 32 | Las líneas que se caen, y las alarmas que se mueren en silencio | Apagón |
| 32 – 40 | La isla de despolarización, construida con el grupo | Cuerpo |
| 40 – 46 | La cascada de siete minutos | Apagón |
| 46 – 52 | Más generación no sirve; reconectar sí. Qué hace el imán | Apagón + cuerpo |
| 52 – 60 | Las cinco piezas, la notación, y los cinco sistemas del día | — |

---

## Fuentes

- [Informe final del grupo de trabajo Estados Unidos–Canadá, abril de 2004](https://www.energy.gov/oe/articles/blackout-2003-final-report-august-14-2003-blackout-united-states-and-canada-causes-and) — 238 páginas
- [Reconstrucción técnica de la secuencia · Practical Engineering](https://practical.engineering/blog/2022/2/9/what-really-happened-during-the-2003-blackout)
- [El fallo silencioso del procesador de alarmas](https://mikefisher.substack.com/p/the-alarm-that-went-silent)
- [Northeast blackout of 2003 · Wikipedia](https://en.wikipedia.org/wiki/Northeast_blackout_of_2003)
- [Umbrales de frecuencia de la red](https://clouglobal.com/power-grid-frequency-why-is-it-important/)

---

*Instituto Centrobioenergetica, 2026*
