# Plantilla de instanciación quíntuple para Regulación Bioeléctrica

## Ficha reusable para docencia, razonamiento y diseño de estudios

**Estatus:** herramienta de modelado; no emite diagnósticos ni indicaciones terapéuticas.  
**Regla:** completar antes del rastreo o de revisar el resultado de la aplicación.

---

# A. Identificación y alcance

```yaml
ficha:
  id: <>
  version: <>
  fecha: <>
  autor: <>
  uso: [docencia | investigacion | mantenimiento | caso_observacional]
  estatuto_global: [evidencia | derivado | interpretacion | hipotesis | especulacion]
  no_es_diagnostico: true
```

## A1. Pregunta

- Fenómeno que se intenta explicar:
- Sistema candidato:
- Función regulada:
- Población o contexto:
- Horizonte temporal:

## A2. Condición de aplicabilidad

Marcar antes de continuar:

```text
[ ] Existe una variable o relación defendida activamente.
[ ] Hay más de una escala relevante.
[ ] La respuesta puede medirse dinámicamente.
[ ] Es posible formular al menos una alternativa no agencial.
[ ] El caso no se explica mejor por lesión aguda, trauma, infección dominante
    o déficit único de producto.
```

Si no se cumplen los tres primeros puntos, declarar **no instanciable por ahora**.

---

# B. Estatuto de las afirmaciones

Cada entrada debe terminar en una etiqueta:

- `[EVIDENCIA]`: dato directo de una fuente o medición.
- `[DERIVADO]`: consecuencia lógica de datos declarados.
- `[INTERPRETACIÓN]`: lectura coherente, no única.
- `[HIPÓTESIS]`: afirmación contrastable pendiente.
- `[ESPECULACIÓN]`: posibilidad sin diseño de contraste suficiente.

No se permite convertir “mecanismo plausible” en “mecanismo de RB” sin un experimento de puente.

---

# C. Censo de sistemas, escalas y agentes

| Componente | Linaje | Meta postulada | Evidencia de meta | Escala o agente | Operadores compartidos |
|---|---|---|---|---|---|
| | | | | | |

## C1. Regla de decisión

- Mismo linaje y metas de fondo alineadas: tratar inicialmente como **escala**.
- Linaje distinto y evaluación propia: considerar **agente separado**.
- Si dos agentes disputan un operador: crear dos quíntuples con estados parcialmente solapados.

---

# D. Instanciación del problema

```yaml
quintuple:
  S:
    definicion: <estados fisicamente realizables relevantes>
    variables: []
    mediciones: []
    estatuto: <>

  O:
    definicion: <transiciones o acciones disponibles>
    operadores: []
    evidencia_de_conservacion: []
    estatuto: <>

  w:
    definicion: <costo de ejecutar cada operador>
    proxies: [ganancia, latencia, costo_metabolico, dosis_respuesta]
    estatuto: <>

  C:
    definicion: <operadores prohibidos o permitidos segun el estado>
    restricciones_funcionales: []
    restricciones_rigidificadas: []
    restricciones_debilitadas: []
    permisos_contextuales: []
    estatuto: <>

  E:
    definicion: <estado o relacion defendida>
    es_relacional: <true|false|desconocido>
    prueba_de_retorno: <>
    prueba_de_contrarregulacion: <>
    estatuto: <>

  H:
    definicion: <profundidad de anticipacion y lineas de retardo>
    respuesta_anticipatoria: <>
    ritmo_o_ventana: <>
    estatuto: <>
```

## D1. Discriminadores obligatorios

### $S$ frente a $E$

¿El valor solo está presente o el sistema regresa activamente a él después de una desviación?

### $w$ frente a $C$

¿Responde menos por unidad de estímulo o no responde aun cuando el operador parece intacto?

### $C(s)$ funcional frente a patológico

¿La vía se cierra correctamente en un contexto y deja de reabrirse cuando el contexto cambia?

### Magnitud frente a relación

¿El sistema defiende un número o una diferencia, razón, gradiente, fase o sincronía?

---

# E. Extensiones agenciales

```yaml
agencia:
  Lambda:
    definicion: <escala maxima cuyo desvio provoca correccion>
    perturbaciones_por_escala: []
    resultado: <>

  Phi_flex:
    ruta_dominante: <>
    bloqueo_propuesto: <>
    rutas_alternativas: []
    resultado: <>

  K:
    uso: <solo eficiencia; no evidencia de agencia>
    modelo_nulo: <>
    espacio_referencia: <>
```

No reportar $K$ si el modelo nulo no puede especificarse. No interpretar $K$ alto como agencia.

---

# F. Terreno como contexto

```yaml
terreno:
  eje_carga_alostatica: <bajo|medio|alto|no_medido>
  dominante: <inflamatorio|metabolico_energetico|biotransformacion|redox|barrera|ninguno>
  variables_contextuales: []
  modifica:
    S: []
    w: []
    C: []
    E: []
    H: []
  fuentes: []
```

La etiqueta de terreno no reemplaza la instanciación del agente.

---

# G. Flechas de estado a restricción

Recorrer todas antes de concluir irreversibilidad:

| Tipo | Pregunta | Presente | Evidencia | Reversible |
|---|---|---:|---|---:|
| T1 Depósito | ¿se acumuló material que ocupa o rigidiza? | | | |
| T2 Reticulación | ¿hay entrecruzamiento dependiente de concentración × tiempo? | | | |
| T3 Memoria epigenética | ¿el efecto persiste tras normalizar el estado? | | | |
| T4 Daño estructural | ¿se perdió una línea anatómica de información? | | | |
| T5 Inflamación autosostenida | ¿existe un bucle señal–desacoplamiento? | | | |
| T6 Sustracción de capacidad | ¿falta cofactor, sustrato o transportador? | | | |
| T7 Reversión de identidad | ¿se contrajo el alcance del agente? | | | |
| T8 Permiso no reactivado | ¿una restricción contextual quedó encendida? | | | |
| T9 Debilitamiento de restricción | ¿se perdió organización o selectividad? | | | |

Evaluar primero T6 y T8 por su reversibilidad potencial.

---

# H. Vector de fallo

```yaml
vector_fallo:
  delta_E: <0-3>
  delta_Lambda: <0-3>
  delta_H: <0-3>
  delta_C_positiva: <0-3>
  delta_C_negativa: <0-3>
  delta_Sigma: <0-3>
  delta_Phi: <0-3>
  componente_dominante: <>
  alternativa_principal: <>
  observacion_que_las_distingue: <>
```

Las puntuaciones organizan hipótesis; no son escalas clínicas validadas.

---

# I. Hipótesis específica de RB

Elegir una principal y conservar las demás como competidoras:

```yaml
aplicacion_RB:
  hipotesis_principal: [H_Cw | H_E | H_Sigma | H_regimen_Phi | H0]
  variable_primaria: <>
  prediccion_direccional: <>
  latencia_esperada: <>
  duracion_esperada: <>
  como_se_refuta: <>

  configuracion:
    puntos_anatomicos: []
    polaridad: []
    intensidad_superficie_mT: <>
    intensidad_estimada_en_diana_mT: <>
    gradiente: <>
    distancia: <>
    duracion_min: <>
```

## I1. Prohibiciones

- No usar “Vmem” como desenlace si no se mide Vmem o un proxy validado.
- No llamar “recalibración de $E$” a cualquier mejoría.
- No usar el mismo rastreo como criterio de inclusión, localización y único desenlace.
- No cambiar de H-C/w a H-E después de ver un resultado negativo.

---

# J. Diseño de perturbación y medición

```yaml
diseno:
  desafio_global: <>
  perturbacion_selectiva: <>
  comparador: <sham|otra_configuracion|sin_intervencion|estandar>
  cegamiento: <>
  aleatorizacion: <>
  medicion_primaria: <>
  mediciones_secundarias: []
  tiempo: [basal, durante, post_inmediato, seguimiento]
  factores_de_confusion: []
  criterio_no_contestable: <>
```

## J1. Jerarquía de desenlaces

1. Medición objetiva de la variable postulada.
2. Respuesta dinámica a un desafío estandarizado.
3. Capacidad endógena después de retirar el estímulo.
4. Síntomas y función reportada por la persona.
5. Rastreo, siempre con protocolo de fiabilidad y cegamiento cuando sea posible.

---

# K. Resultado y actualización

```yaml
resultado:
  confirma_prediccion_principal: <si|no|inconcluso>
  favorece_alternativa: <>
  hallazgos_discordantes: []
  limitaciones: []
  cambio_en_vector_fallo: <>
  decision:
    - mantener_hipotesis
    - degradar_estatuto
    - reformular_con_nuevo_estudio
    - abandonar
```

## Regla de cierre

Si el resultado puede explicarse igualmente por todas las letras, la ficha no discriminó nada. Debe rediseñarse, no presentarse como confirmación del marco.

