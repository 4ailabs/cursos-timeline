# Clases impartidas · Módulo 4 — registro

Esta carpeta guarda el registro de la sesión **tal como se dio**, transcrito desde el video.

## Regla

**Nada de lo que hay aquí se edita, y los guiones de las sesiones ya impartidas tampoco.** Una vez dada la clase, el guion queda como el registro de lo que se preparó, y el documento de esta carpeta como el registro de lo que ocurrió. La diferencia entre ambos es información, no un error que corregir.

Lo que estos registros aportan se recoge solo en las sesiones que todavía no se dan.

## Los tres capítulos de la clase del 22 de agosto, y qué cubre cada uno

Clase del 22 de agosto de 2026, grabada con Wirecast.

| Capítulo | Origen | Duración | Inicio de grabación |
|---|---|---|---|
| 1 | `RB Mod 4 Cap. 1.mp4` | 2 h 30 | 16:03 |
| 2 | `RB Mod 4 Cap. 2.mp4` | 1 h 48 | 18:43 |
| 3 | `RB Mod 4 Cap. 3.mp4` | 2 h 41 | 22:20 |

El capítulo 1 tiene un tramo sin habla detectada de 00:03:52 a 00:09:14 (prueba de audio antes de empezar). El capítulo 3 tiene un tramo sin habla detectada de 01:18:28 a 01:32:39, que corresponde a un receso. Ninguno de los dos huecos está verificado contra el archivo de origen.

## Índice

| Documento | Qué es |
|---|---|
| [Clase_M4_Registro_Clase_Impartida.md](Clase_M4_Registro_Clase_Impartida.md) | El registro de la sesión, con sus nueve apartados |
| [Clase_M4_Cap1.md](Clase_M4_Cap1.md) | Transcripción legible del capítulo 1, con marcas de tiempo por bloque |
| [Clase_M4_Cap2.md](Clase_M4_Cap2.md) | Transcripción legible del capítulo 2, con marcas de tiempo por bloque |
| [Clase_M4_Cap3.md](Clase_M4_Cap3.md) | Transcripción legible del capítulo 3, con marcas de tiempo por bloque |
| `Transcripciones/` | El JSON crudo del servicio de transcripción, con segmentos y marcas de tiempo |

## Cómo se transcribió

Voxtral (`voxtral-mini-latest`, Mistral), con normalización de volumen previa (`dynaudnorm`) sobre el audio extraído de cada capítulo completo, en una sola llamada por capítulo. Las transcripciones están sin corregir: recogen lo que el servicio devolvió, incluidos los errores de reconocimiento de términos técnicos y de nombres propios.

La diarización devolvió entre 8 y 19 etiquetas de hablante por capítulo — muchas más que el número real de personas en la sesión — por lo que no son estables como identidad de orador y no se usan en los documentos legibles.

---

*Instituto Centrobioenergetica — Dr. Miguel Ojeda Rios*
