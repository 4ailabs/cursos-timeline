# Documento Base de Conocimiento

## Nutrigenomica y Genotipos

### Instituto Centrobioenergetica — Dr. Miguel Ojeda Rios

---

## 1. Descripcion General del Curso

| Campo | Detalle |
|-------|---------|
| Nombre | Nutrigenomica y Genotipos |
| Creador | Dr. Miguel Ojeda Rios |
| Institucion | Instituto Centrobioenergetica |
| Enfoque | Sistema de determinacion de genotipos mediante antropometria, dactiloscopia y hemotipos para generar pautas nutricionales personalizadas |
| Fundamento | La nutricion optima no es universal; depende del perfil genetico individual expresado a traves de proporciones fisicas, grupo sanguineo, estado secretor y marcadores biometricos |
| Resultado | Clasificacion del individuo en 1 de 6 genotipos con plan alimentario personalizado basado en superalimentos, alimentos neutros y toxinas especificas |
| Stack tecnologico | React 18.2, TypeScript 5, Vite 4.4, Tailwind CSS 3.3, Google Gemini API |

---

## 2. Algoritmo de Determinacion: Las 12 Lineas

El sistema utiliza tres variables fisicas para clasificar al individuo en una de 12 lineas de calculo basicas.

### 2.1 Formulas de Segmentacion Corporal

| Medicion | Formula |
|----------|---------|
| Longitud del Torso (T) | Altura Sentado - Altura de la Silla |
| Longitud de las Piernas (L) | Altura de Pie - Longitud del Torso |
| Segmento Superior de Pierna | Longitud del muslo (femur) |
| Segmento Inferior de Pierna | Longitud de la pantorrilla (tibia) |
| Relacion de Dedos (2D:4D) | Comparacion entre dedo indice y dedo anular |

### 2.2 Mediciones Biometricas Requeridas

| ID | Medicion | Tipo |
|----|----------|------|
| 1 | heightStanding | Altura de pie (cm) |
| 2 | heightSitting | Altura sentado (cm) |
| 3 | chairHeight | Altura de la silla (cm) |
| 4 | upperLegLength | Longitud del muslo (cm) |
| 5 | lowerLegLength | Longitud de la pantorrilla (cm) |
| 6 | indexFingerLeft | Dedo indice mano izquierda (cm) |
| 7 | ringFingerLeft | Dedo anular mano izquierda (cm) |
| 8 | indexFingerRight | Dedo indice mano derecha (cm) |
| 9 | ringFingerRight | Dedo anular mano derecha (cm) |

### 2.3 Matriz de Clasificacion (Lineas 1-12)

| Linea | Proporcion Torso/Piernas | Segmento de Pierna Largo | Relacion de Dedos (2D:4D) |
|-------|--------------------------|--------------------------|---------------------------|
| 1 | Torso >= Piernas | Superior (Muslo) | Indice > Anular |
| 2 | Torso >= Piernas | Superior (Muslo) | Anular > Indice |
| 3 | Torso >= Piernas | Superior (Muslo) | Diferentes / Iguales |
| 4 | Torso >= Piernas | Inferior (Tibia) | Indice > Anular |
| 5 | Torso >= Piernas | Inferior (Tibia) | Anular > Indice |
| 6 | Torso >= Piernas | Inferior (Tibia) | Diferentes / Iguales |
| 7 | Piernas > Torso | Superior (Muslo) | Indice > Anular |
| 8 | Piernas > Torso | Superior (Muslo) | Anular > Indice |
| 9 | Piernas > Torso | Superior (Muslo) | Diferentes / Iguales |
| 10 | Piernas > Torso | Inferior (Tibia) | Indice > Anular |
| 11 | Piernas > Torso | Inferior (Tibia) | Anular > Indice |
| 12 | Piernas > Torso | Inferior (Tibia) | Diferentes / Iguales |

---

## 3. Refinamiento por Hemotipo y Estado Secretor

Una vez determinada la linea, el genotipo final se decide mediante grupo sanguineo, factor Rh, estado de secrecion y sexo.

### 3.1 Definiciones

| Concepto | Descripcion | Prevalencia |
|----------|-------------|-------------|
| Secretor | Expresa antigenos de grupo sanguineo (ABO) en fluidos corporales (saliva, secreciones) | 80% de la poblacion |
| No Secretor | No expresa antigenos en fluidos; altera la respuesta inmune intestinal y sensibilidad a lectinas | 20% de la poblacion |

### 3.2 Tabla Completa de Mapeo Linea-Hemotipo-Genotipo

La tabla DATOS_GENOTIPOS contiene todas las combinaciones posibles de las 12 lineas x 8 grupos sanguineos (A+, A-, AB+, AB-, B+, B-, O+, O-) x estado secretor x sexo, mapeando a uno de los 6 genotipos.

**Ejemplos de mapeo:**

| Linea | Grupo Sanguineo | Secretor | Sexo | Genotipo Resultante |
|-------|-----------------|----------|------|---------------------|
| 1 | O+ | Secretor | Ambos | 2 (Gatherer) |
| 2 | O+ | Secretor | Ambos | 1 (Hunter) |
| 4 | AB+ | Secretor | Hombre | 5 (Warrior) |
| 4 | AB+ | Secretor | Mujer | 6 (Nomad) |
| 11 | A+ | Secretor | Hombre | 3 (Master) |
| 11 | A+ | Secretor | Mujer | 5 (Warrior) |
| 8 | O+ | Secretor | Ambos | 1 (Hunter) |
| 12 | B+ | Secretor | Ambos | 6 (Nomad) |

**Nota**: En muchos casos el resultado depende del sexo del paciente; en otros es igual para ambos sexos. La tabla completa con las 192 combinaciones esta codificada en constants.ts.

---

## 4. Los 6 Genotipos: Perfiles Completos

### 4.1 GT1 — Hunter (Cazador)

| Aspecto | Descripcion |
|---------|-------------|
| Esencia | "La caza perfecta" — Metabolismo rapido y preciso, optimizado para respuestas inmediatas |
| Sistema inmune | Hiper-reactivo con respuesta adrenergica constante |
| Tipo corporal | Ectomorfo, larguirucho, piernas mas largas que el torso |
| Grupo sanguineo tipico | O o B |
| Temperamento | Sanguineo, magnetico, extrovertido, atletico |
| Mandibula | Cuadrada, angulo gonial cerrado |
| Cabeza | Dolicocefala (alargada) |

**Vulnerabilidades**: Inflamacion sistemica, colitis, problemas de tiroides, enfermedades autoinmunes (lupus, artritis reumatoide, esclerosis multiple), tendencia a colesterol elevado.

**Nutricion**: Entorno "paleolitico" purificado. Sensible a carbohidratos refinados y lectinas de legumbres. Dieta alta en proteinas animales de calidad. Carnes super: res, cordero, higado de res. Carnes toxinas: cerdo, tocino, jamon. Lacteos: casi todos son toxina.

### 4.2 GT2 — Gatherer (Recolector)

| Aspecto | Descripcion |
|---------|-------------|
| Esencia | "Acumular para sobrevivir" — Gen ahorrador que almacena cada caloria como grasa |
| Sistema metabolico | Extremadamente eficiente, programa ancestral de supervivencia |
| Tipo corporal | Endomorfo, redondeado, proporcion cintura-caderas alta |
| Grupo sanguineo tipico | O o B |
| Temperamento | Mente algoritmica, planificador natural |
| Mandibula | Forma de almendra, angulo gonial abierto |
| Piel | Aspecto acolchado incluso en zonas sin tejido graso |

**Vulnerabilidades**: Sindrome metabolico, hipertension, diabetes tipo 2, obesidad, resistencia a la insulina. Historial familiar de diabetes, ataques al corazon, presion alta.

**Nutricion**: Control estricto de carbohidratos. Proteinas magras para "enganar" al metabolismo. Dieta alta en proteinas, baja en indice glucemico. Evitar alimentos hiperglucemicos y carbohidratos refinados.

### 4.3 GT3 — Master (Maestro)

| Aspecto | Descripcion |
|---------|-------------|
| Esencia | "El equilibrio entre fuerzas opuestas" — Metabolismo versatil pero lento |
| Sistema inmune | Tolerante, activacion lenta |
| Tipo corporal | Meso-ectomorfo, esbelto y musculoso |
| Grupo sanguineo tipico | A o AB |
| Temperamento | Creativo, artistico, nervioso y flexible |
| Mandibula | Cuadrada, angulo gonial cerrado |
| Marcador fisico | Se ven los tendones bajo la piel de la muneca |

**Vulnerabilidades**: Envejecimiento vascular prematuro con exceso de grasas saturadas, cancer (historial familiar frecuente), activacion inmune lenta.

**Nutricion**: Rica en fitonutrientes. Equilibrio entre carnes blancas, pescados y cereales antiguos. Dieta basada en vegetales con nutrientes metilantes. Evitar exceso de proteina animal y grasas saturadas.

### 4.4 GT4 — Explorer (Explorador)

| Aspecto | Descripcion |
|---------|-------------|
| Esencia | "Solucionar lo inesperado" — Camaleon genetico |
| Sistema clave | Desintoxicacion hepatica, acetilador lento (fase II) |
| Tipo corporal | Mesomorfo, musculoso |
| Grupo sanguineo | Cualquiera posible |
| Temperamento | Pensamiento lateral, resolucion creativa de problemas |
| Mandibula | Cuadrada, angulo gonial cerrado |
| Cabeza | Braquicefala (ancha y corta) |
| Lateralidad | Mayor frecuencia de zurdos o ambidextros |

**Vulnerabilidades**: Sensibilidad quimica, desequilibrios hormonales, anemia, diabetes tipo 1, sensibilidad a cafeina extrema.

**Nutricion**: Evitar aditivos, conservantes y cafeina. Dieta limpia con soporte hepatico. Alimentos de desintoxicacion y nutricion sanguinea. Evitar mohos, toxinas y carcinogenos.

### 4.5 GT5 — Warrior (Guerrero)

| Aspecto | Descripcion |
|---------|-------------|
| Esencia | "Perseverar hasta dominar" — Eficiente en juventud, se bloquea con estres cronico |
| Sistema clave | Circulatorio activo, metabolismo cambiante con la edad |
| Tipo corporal | Mesoendomorfo, esbelto de joven con tendencia a ensancharse |
| Grupo sanguineo tipico | A o AB |
| Temperamento | Colerico, carismatico, mente rapida y agil |
| Mandibula | Ovalada y suave |
| Cabeza | Dolicocefala (alargada) |
| Piel | Tendencia a ruborizarse |

**Vulnerabilidades**: Estres oxidativo, hipertension, problemas de memoria, resistencia a insulina en mediana edad, enfermedades cardiovasculares, envejecimiento prematuro, problemas digestivos cronicos, desequilibrio hormonal.

**Nutricion**: Dieta mediterranea modificada. Alta en antioxidantes (vegetales verdes, frutos rojos). Pescados, aceites saludables, granos especificos. Evitar carnes rojas pesadas, alimentos de alto indice glucemico, grasas trans.

### 4.6 GT6 — Nomad (Nomada)

| Aspecto | Descripcion |
|---------|-------------|
| Esencia | "Capear el temporal con ingenio" — Adaptabilidad y resiliencia |
| Sistema nervioso | Sensible, conexion mente-cuerpo excepcional |
| Tipo corporal | Simetrico, piernas mas largas que torso, estaturas extremas (muy alto o muy bajo) |
| Grupo sanguineo tipico | A o AB |
| Temperamento | Flematico, silencioso, optimista, oculta emociones |
| Mandibula | Forma de almendra, angulo gonial abierto |
| Cabeza | Braquicefala (ancha y corta) |
| Marcadores fisicos | Incisivos en forma de pala, mayor frecuencia de pelirrojos y ojos verdes, lineas blancas en huellas dactilares |

**Vulnerabilidades**: Fatiga cronica, problemas neuromusculares, tracto digestivo sensible, intolerancia al gluten, enfermedades neurodegenerativas, enfermedades autoinmunes (lupus, esclerosis multiple), problemas hepaticos.

**Nutricion**: Unico genotipo que tolera bien los lacteos fermentados. Dieta omnivora, baja en lectinas y gluten. Optimizar produccion de oxido nitrico. Regenerar mucosa intestinal. Soporte neurologico y hepatico. Evitar gluten, irritantes intestinales, carbohidratos refinados.

---

## 5. Sistema de Medidor de Fuerza del Genotipo (Strength Meter)

Cada genotipo tiene 8 mediciones biometricas confirmatorias con un maximo de 37 puntos. El porcentaje de coincidencia confirma o cuestiona el genotipo calculado.

### 5.1 Categorias de Medicion

| Categoria | Codigo | Ejemplos |
|-----------|--------|----------|
| Huellas dactilares | fingerprints | Lineas blancas, patrones coincidentes, espirales, arcos, lazos |
| Gusto PROP | taste | Supergustador, gustador, no gustador |
| Fisico | physical | Rodillas separadas, piel acolchada, tendones visibles |
| Dental | dental | Incisivos en pala, cuspide adicional en molar, forma de mandibula |
| Historia familiar | family_history | Autoinmune, diabetes/cardio, cancer, depresion/alzheimer |
| Sensibilidad cafeina | caffeine_sensitivity | Sensible o insensible |
| Tipo corporal | body_type | Ectomorfo, endomorfo, mesomorfo, meso-ectomorfo, mesoendomorfo |
| Forma de cabeza | head_shape | Dolicocefala (alargada), braquicefala (ancha y corta) |

### 5.2 Mediciones por Genotipo

**GT1 Hunter**: Lineas blancas en huellas (5pts), supergustador PROP (5pts), 4+ huellas coincidentes (5pts), incisivos en pala (3pts), ectomorfo (3pts), rodillas separadas (3pts), mandibula cuadrada (3pts), historial autoinmune familiar (3pts).

**GT2 Gatherer**: 3+ huellas no coincidentes (5pts), no gustador PROP (5pts), piel acolchada (5pts), cuspide extra molar (3pts), cara almendra (3pts), endomorfo (3pts), rodillas juntas (3pts), historial diabetes/cardio familiar (3pts).

**GT3 Master**: 5+ espirales en huellas (5pts), tendones visibles muneca (5pts), gustador PROP (5pts), cuspide extra molar (3pts), cara cuadrada (3pts), meso-ectomorfo (3pts), rodillas separadas (3pts), historial cancer familiar (3pts).

**GT4 Explorer**: Rh negativo (5pts), supergustador PROP (5pts), sensible a cafeina (5pts), zurdo/ambidextro (3pts), cara cuadrada (3pts), mesomorfo (3pts), cabeza braquicefala (3pts), huellas indices diferentes (3pts).

**GT5 Warrior**: Cabeza dolicocefala (5pts), no gustador PROP (5pts), 2+ huellas arco (5pts), mesoendomorfo (3pts), cara almendra (3pts), cuspide extra molar (3pts), insensible cafeina (3pts), historial diabetes/cardio familiar (3pts).

**GT6 Nomad**: Lineas blancas en huellas (5pts), 8+ lazos en huellas (5pts), gustador PROP (5pts), 4+ huellas coincidentes (3pts), cabeza braquicefala (3pts), incisivos en pala (3pts), cara almendra (3pts), historial depresion/alzheimer familiar (3pts).

---

## 6. Clasificacion de Alimentos

### 6.1 Jerarquia de Alimentos

| Nivel | Nombre | Funcion | Proporcion en Dieta |
|-------|--------|---------|---------------------|
| 1 | Superalimentos (Medicinales) | Curan y revierten enfermedades especificas del genotipo | 70-80% |
| 2 | Neutros (Combustible) | No danan pero no curan especificamente | 15-25% |
| 3 | Toxinas (Evitar) | Contienen lectinas que aglutinan eritrocitos del genotipo | 0% |

### 6.2 Marcadores Especiales

| Simbolo | Nombre | Significado |
|---------|--------|-------------|
| ◊ | Activador Metabolico | Incrementa la tasa metabolica basal (TMB). Ejemplo: salmon para Hunter |
| • | Punto de Lavado (60 Dias) | Bloquea receptor de insulina o causa inflamacion severa inmediata. Requiere 2 meses de abstinencia total para limpiar receptores celulares |

### 6.3 Regla de Neutros

Todo alimento que NO aparece en las listas de superalimentos ni de toxinas se considera NEUTRO (combustible). No requiere listado explicito.

### 6.4 Categorias de Alimentos Evaluadas

| Categoria | Ejemplos de Evaluacion |
|-----------|----------------------|
| Carnes Rojas | Res, cordero, cerdo, higado, corazon |
| Aves | Pollo, pavo, pato, codorniz |
| Pescados y Mariscos | Salmon, atun, bacalao, camaron, pulpo |
| Huevos | Gallina, codorniz, pato |
| Lacteos | Leche, quesos, yogur, mantequilla, kefir |
| Proteinas Vegetales | Semillas, nueces, legumbres, soja |
| Grasas y Aceites | Oliva, coco, linaza, girasol, canola |
| Carbohidratos | Cereales, panes, pastas, arroz, avena |
| Vegetales | Verduras de hoja, cruciferas, raices, solanaceas |
| Frutas | Tropicales, citricas, berries, frutas de hueso |
| Condimentos y Especias | Hierbas aromaticas, especias, salsas |
| Bebidas | Tes, cafes, jugos, infusiones |

---

## 7. Sistema de Asistente de IA Integrado

### 7.1 Datos del Paciente para IA

| Seccion | Campos |
|---------|--------|
| Datos basicos | Edad, sexo |
| Datos fisicos | Altura, peso, nivel de actividad (sedentario/ligero/moderado/activo/muy activo) |
| Datos clinicos | Condiciones de salud, alergias, medicamentos, grupo sanguineo, factor Rh |
| Historial medico | Historial familiar, cirugias previas, condiciones cronicas |
| Objetivos y preferencias | Metas, restricciones dieteticas, preferencias alimentarias |
| Estilo de vida | Horas de sueno, nivel de estres (bajo/moderado/alto/muy alto), frecuencia de ejercicio |

### 7.2 Generador de Prompts de Investigacion

El sistema genera prompts especializados para plataformas de IA (Gemini Deep Research, Claude) basados en casos de pacientes, incluyendo datos biometricos, genotipo, historial medico, dieta actual, resultados de laboratorio y area de investigacion especifica.

---

## 8. Flujo Algoritmico Completo

```
PASO 1: Mediciones Corporales
    → Calcular Longitud Torso = Altura Sentado - Altura Silla
    → Calcular Longitud Piernas = Altura Pie - Longitud Torso
    → Determinar: Torso >= Piernas? o Piernas > Torso?

PASO 2: Segmentos de Pierna
    → Comparar muslo vs pantorrilla
    → Determinar: Superior (muslo) mas largo? o Inferior (tibia) mas largo?

PASO 3: Relacion de Dedos (2D:4D)
    → Comparar indice vs anular en ambas manos
    → Determinar: Indice > Anular? Anular > Indice? Diferentes/Iguales?

PASO 4: Determinar Linea (1-12)
    → Cruzar las 3 variables anteriores en la matriz

PASO 5: Datos Sanguineos
    → Grupo sanguineo (A, B, AB, O)
    → Factor Rh (+, -)
    → Estado secretor (secretor, no secretor)
    → Sexo (hombre, mujer)

PASO 6: Mapeo Final
    → Cruzar Linea + Grupo+Rh + Secretor + Sexo en tabla DATOS_GENOTIPOS
    → Resultado: Genotipo (1-6)

PASO 7: Confirmacion con Strength Meter
    → Evaluar 8 mediciones biometricas del genotipo resultante
    → Calcular porcentaje de coincidencia sobre 37 puntos
    → Alto porcentaje confirma; bajo porcentaje sugiere reevaluacion
```

---

## 9. Conceptos Clave del Sistema

| Concepto | Definicion |
|----------|-----------|
| Lectinas | Proteinas vegetales que pueden aglutinar eritrocitos de genotipos especificos, causando reacciones adversas |
| Relacion 2D:4D | Proporcion entre dedo indice (2D) y dedo anular (4D), indicador de exposicion hormonal prenatal |
| Test PROP | Prueba de sensibilidad gustativa al propiltiouracilo; clasifica en supergustador, gustador o no gustador |
| Angulo gonial | Angulo de la mandibula; cerrado = cuadrada, abierto = almendrada |
| Dolicocefalo | Craneo alargado antero-posteriormente |
| Braquicefalo | Craneo ancho y corto |
| Acetilador lento | Fase II de desintoxicacion hepatica lenta (tipico del Explorer) |
| Gen ahorrador | Programa genetico ancestral que maximiza almacenamiento de calorias (tipico del Gatherer) |
| Oxido nitrico | Molecula clave para salud cardiovascular y neurologica (critico para el Nomad) |
| Epigenetica nutricional | Como los alimentos regulan la expresion genica sin alterar el ADN |
| Nutrientes metilantes | Compuestos que afectan la metilacion del ADN (importantes para el Master) |

---

## 10. Tabla Comparativa de los 6 Genotipos

| Caracteristica | Hunter (1) | Gatherer (2) | Master (3) | Explorer (4) | Warrior (5) | Nomad (6) |
|----------------|------------|--------------|------------|---------------|-------------|-----------|
| Somatotipo | Ectomorfo | Endomorfo | Meso-ecto | Mesomorfo | Mesoendo | Simetrico |
| Sangre tipica | O, B | O, B | A, AB | Cualquiera | A, AB | A, AB |
| Temperamento | Sanguineo | Algoritmica | Creativo | Lateral | Colerico | Flematico |
| Cabeza | Dolicocefala | — | — | Braquicefala | Dolicocefala | Braquicefala |
| Mandibula | Cuadrada | Almendra | Cuadrada | Cuadrada | Ovalada | Almendra |
| PROP | Supergustador | No gustador | Gustador | Supergustador | No gustador | Gustador |
| Riesgo principal | Autoinmune | Metabolico | Cancer | Quimico | Cardiovascular | Neurodegenerativo |
| Dieta base | Paleolitica | Alta proteina, baja glucemica | Fitonutrientes equilibrada | Limpia, hepatica | Mediterranea modificada | Omnivora sin gluten |
| Cafeina | Variable | Variable | Variable | Muy sensible | Insensible | Variable |

---

*Documento generado como base de conocimiento para el Instituto Centrobioenergetica. Fuente: aplicacion Nutrigenomica y Genotipos del Dr. Miguel Ojeda Rios.*
