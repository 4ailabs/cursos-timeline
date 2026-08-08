# Estado del Módulo 3 y trabajo pendiente

**El Cuerpo Eléctrico · Formación en Regulación Bioeléctrica**
Instituto Centrobioenergetica · Dr. Miguel Ojeda Rios · 8 de agosto de 2026

Última actualización: 8 de agosto de 2026.

---

# 1 · Qué existe hoy

| Bloque | Estado |
|---|---|
| **1 · El quíntuple aplicado a la Regulación Bioeléctrica** | Programa, diseño didáctico, ejemplo del apagón, guion de clase y locución para audio. **Faltan las once láminas** |
| **2 · Barrera, microbiota e hígado** | 22 documentos de contenido, integración, diseño didáctico y **clase teórica de las tres horas, encadenada y leída con las cinco letras**. **Faltan treinta y dos láminas y las dos hojas impresas** |
| **3 · Metabólico-energético** | Sin empezar |
| **4 · Inflamatorio** | Sin empezar |
| **5 · Biotransformación** | Sin empezar |
| **6 · Redox** | Sin empezar |
| **7 · Criterio de jerarquía** | Sin empezar. Los tres argumentos que lo sostienen están construidos en el Bloque 2 |

---

# 2 · Dónde está cada cosa del Bloque 2

```
Modulo_3/Bloque_2/
├── GUION_Bloque_2.md             ← lo que se dice, de 11:00 a 14:00
├── PROTOCOLO_Eje_Digestivo_RB.md ← el razonamiento clínico, en 17 pasos
├── TECNICA_RB_Eje_Digestivo.md   ← la maniobra sobre la camilla, en 8 maniobras
├── 00_Como_Ensenarlo.md          ← el diseño de los 45 o 90 minutos
├── 12_Integracion_del_Bloque.md  ← los ocho patrones, el protocolo, los trinquetes
└── Documentacion_del_Eje_Digestivo/
    ├── 00 a 11   el eje descrito y el protocolo clínico
    ├── 13 a 16   el procedimiento en dos niveles, y las puertas
    ├── 17 a 19   células neurópodas, sistema entérico, píloro y náusea
    └── 20 a 22   Helicobacter, su instanciación en el quíntuple, y otras cinco bacterias
```

**Para retomar sin releer todo:** [`Bloque_2/12_Integracion_del_Bloque.md`](Bloque_2/12_Integracion_del_Bloque.md)
tiene los ocho patrones que se repiten, el protocolo consolidado, la tabla completa de trinquetes
y las dieciséis preguntas pendientes.

---

# 3 · Las dieciséis preguntas que solo el Dr. puede contestar

Ninguna se resuelve leyendo. Están completas, con su documento de origen, en la sección 11 de
[`Bloque_2/12_Integracion_del_Bloque.md`](Bloque_2/12_Integracion_del_Bloque.md).

**Siete son sobre los puntos anatómicos**, que están vacíos en las fichas de aplicación.

**Nueve son sobre el procedimiento**, y dos de ellas cambian lo demás:

> **La octava.** ¿Los puntos del retorno del tono vagal se colocan **antes** del recorrido de
> unidades, o después? Si el estado autonómico modifica lo que el rastreo marca, los dos órdenes
> no dan lo mismo.
>
> **La dieciséis.** ¿Está anotada la hora de aplicación en el registro de casos? Se contesta sin
> trabajo nuevo, y si la respuesta es sí, permite empezar a mirar si la hora cambia el resultado.

---

# 4 · Las tres decisiones abiertas

## Cuánto tiempo ocupa el eje digestivo · decidido el 8 de agosto de 2026

**El eje digestivo toma de 11:00 a 14:00**, con teoría y práctica: parte A de 11:00 a 11:45,
receso, parte B de 12:05 a 12:50, y recorrido completo por parejas de 12:50 a 14:00. El guion está
escrito sobre ese reparto en [`Bloque_2/GUION_Bloque_2.md`](Bloque_2/GUION_Bloque_2.md).

**Y queda una decisión que se abre de ahí:** el sistema metabólico se mueve a la tarde, y la tarde
ya estaba llena. Hay que decidir qué segmento se recorta o si el día se extiende.

## El nodo bioeléctrico del hígado

[`00_Programa_del_Dia.md`](00_Programa_del_Dia.md) declara que en el hígado **no hay nodo
bioeléctrico literal documentado**. Un trabajo publicado en *Cell Reports* en 2021 describe uno:
el hepatocito cargado de lípido se despolariza, libera GABA, y el GABA deprime la descarga del
aferente vagal hepático. **La variable controlada es el potencial de membrana.**

Queda decidir si se corrige el programa antes de impartir el módulo o después.

## *Helicobacter* y los agentes microbianos

Cuatro documentos —el 20, 21 y 22 del Bloque 2, más el 10— quedaron fuera del diseño de clase
porque ocupan veinte minutos y no cambian lo que el alumno hace en consulta la semana siguiente.

**Son candidatos a un Curso Selecto propio**, junto con el eje de los protones —estómago, duodeno
y páncreas—, que quedó fuera por la misma razón.

---

# 5 · Material por producir

| | Bloque | Qué |
|---|---|---|
| **1** | 2 | **Treinta y dos láminas.** La lista está al final de `GUION_Bloque_2.md` |
| **2** | 2 | **Hoja del recorrido para llenar en la práctica**, una por alumno. El contenido está en el paso 16 del protocolo |
| **3** | 2 | **Hoja de consulta, dos caras.** El contenido de las dos caras está en la sección 8 de `00_Como_Ensenarlo.md` |
| **4** | 1 | **Once láminas.** La lista está al final de `GUION_Bloque_1.md` |
| **5** | 3 a 7 | Programas y guiones. Sin empezar |

---

# 6 · Cómo se escribe en este repositorio

Las cuatro reglas de construcción de frase están en [`CLAUDE.md`](../../../../../CLAUDE.md), en la
raíz del repositorio, y se cargan en cada sesión.

Un hook sobre Write y Edit corre el linter de registro en cada archivo `.md` que se escribe, y
devuelve las marcas antes de la entrega:

```bash
python3 _Herramientas/revisa_registro.py <ruta> --nuevos
```

Detecta apodos, verbos que no dicen qué ocurre, encabezados que rotulan en vez de afirmar,
autorreferencia del documento, y frases que anuncian el hallazgo en vez de decirlo.
