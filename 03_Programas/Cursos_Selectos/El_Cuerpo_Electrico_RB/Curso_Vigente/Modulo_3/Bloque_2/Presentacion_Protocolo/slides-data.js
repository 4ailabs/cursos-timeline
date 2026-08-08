globalThis.SLIDES_DATA = [

{n:1,section:'Apertura',eyebrow:'Módulo 3 · Bloque 2',title:'Protocolo del eje digestivo',subtitle:'Regulación Bioeléctrica',lead:'Diecisiete pasos: qué se pregunta, qué se descarta, dónde se coloca el imán y con qué se comprueba.',theme:'dark',kind:'cover',image:'assets/01-portada-protocolo.png',
brief:'Torso con el tubo digestivo esquemático y las once zonas de proyección marcadas en ámbar sobre fondo azul profundo. Sin rostro.',
notes:[`Este es el orden de trabajo en consulta.`,`Pasos 1 a 6: razonamiento clínico. Pasos 7 a 12: la maniobra sobre la camilla. Pasos 13 a 17: comprobación y registro.`],source:'PROTOCOLO_Eje_Digestivo_RB.md'},

{n:2,section:'Estructura',eyebrow:'Índice del protocolo',title:'Diecisiete pasos, por momento de la atención',diagram:'pasos',
callout:'Los pasos 7 a 12 se ejecutan sobre la camilla. Los seis anteriores deciden a quién se le aplican.',
notes:[`Los seis primeros pasos deciden si esta persona entra al protocolo y con qué se va a comparar después.`,`Sin los números de la primera consulta, la sesión de aplicación no tiene contra qué compararse.`],source:'PROTOCOLO · tabla de pasos.'},

{n:3,section:'Primera consulta',eyebrow:'Paso 1',title:'Criterios de derivación inmediata',lead:'Se preguntan al inicio de la primera consulta y ocupan dos minutos.',diagram:'derivacion',
callout:'Estos seis datos no se interpretan ni se ponderan. Aparece uno y se deriva.',
notes:[`Estos seis datos no se interpretan ni se ponderan: aparece uno y la persona sale del protocolo hacia estudio.`,`Se preguntan siempre, en la primera consulta, antes de cualquier otra cosa.`],source:'PROTOCOLO · paso 1 · doc 02 §2.'},

{n:4,section:'Primera consulta',eyebrow:'Paso 2',title:'Criterios de exclusión del protocolo',
facts:[['Intestino','Atrofia de la mucosa, resección quirúrgica previa, o enfermedad intestinal ya diagnosticada'],['Hígado','Fibrosis avanzada o cirrosis establecida'],['Otro diagnóstico','Infección activa, lesión reciente, o un diagnóstico que explica el cuadro completo'],['Razón de la exclusión','El tejido ya se perdió: la restricción es anatómica y no funcional']],
callout:'Una restricción anatómica no responde a una intervención sobre restricciones.',
notes:[`La gradación hepática ubica el borde: esteatosis reversible al retirar la causa, fibrosis de grados uno a tres con regresión documentada, cirrosis cerrada en la práctica.`],source:'PROTOCOLO · paso 2 · docs 01 §5 y 02 §2.'},

{n:5,section:'Primera consulta',eyebrow:'Paso 3.1',title:'Interrogatorio · fecha de instalación',
block:`¿Desde cuándo le pasa?         ______ meses / años

¿Qué pasó justo antes?
  ______________________________________
  Si no lo ubica, se pregunta por el susto

¿Empezó de un día para otro,
 o fue bajando poco a poco?    brusco / gradual`,
facts:[['Inicio brusco, con acontecimiento','Estado autonómico desplazado con fecha, o respuesta aumentada instalada ese día'],['Inicio gradual de años','Problema de ritmo, horario corrido, o desplazamiento de la microbiota']],
notes:[`El susto tiene definición en el DSM-5 como explicación cultural del malestar, y trae la fecha puesta. Preguntado con otra palabra, el paciente no lo relaciona.`,`La fecha de instalación es el dato que ordena todo el interrogatorio posterior.`],source:'PROTOCOLO · paso 3.1 · doc 15 §1.'},

{n:6,section:'Primera consulta',eyebrow:'Paso 3.2',title:'Interrogatorio · relación con la comida',
block:`¿Cuántos minutos entre comer
 y que aparezca la molestia?        ______ min

¿Cuántas horas hasta que
 deja de sentirla?                  ______ h

¿Con qué alimento concreto?  ___________________

¿Al comer mejora o empeora?    mejora / empeora`,
callout:'Las horas de la segunda pregunta son las que se comparan en la revisión.',
notes:[`Lo que informa no es cuánto le molestó, sino cuánto tardó en dejar de sentirlo. Ese es el número que se compara.`,`La intensidad se anota aparte, como leve, media o fuerte, y no se usa para comparar.`],source:'PROTOCOLO · paso 3.2 · doc 02 §4.'},

{n:7,section:'Primera consulta',eyebrow:'Paso 3.2',title:'A qué unidad corresponde cada respuesta',
facts:[['Se llena antes de terminar el plato','Estómago, problema de ritmo'],['Ardor de una a tres horas después de comer','Duodeno, neutralización insuficiente'],['Ardor que mejora al comer y regresa','Estómago, capa de moco con bicarbonato'],['Hinchazón a los 30 o 60 minutos, con gas','Válvula ileocecal o páncreas exocrino'],['Grasa que no se digiere, excremento que flota','Páncreas exocrino'],['Pesadez con la grasa que dura horas','Hígado']],
notes:[`Esta correspondencia entre relato y unidad es hipótesis de trabajo, y se contrasta con lo que el rastreo encuentre después.`,`El relato ordena las unidades. El rastreo encuentra el nodo dentro de la unidad.`],source:'PROTOCOLO · paso 3.2 · docs 05 §6 y 12 §4.'},

{n:8,section:'Primera consulta',eyebrow:'Paso 3.3',title:'Interrogatorio · ritmo',
block:`¿Cada cuántos días evacúa?          ______ días
¿Desde cuándo es así?               ______
¿A qué hora evacúa?                 ______
¿Cambia según lo que come?           sí / no
¿Se llena antes de terminar
 el plato?                           sí / no`,
facts:[['Frecuencia estable de años, sin relación con lo que come','Colon, problema de ritmo'],['La frecuencia sigue a lo que come','Barrera o microbiota, y no ritmo']],
notes:[`La evacuación de la mañana que llega tarde o no llega apunta a horario corrido del colon: al despertar la presión sube de dos a tres veces.`,`El llenado temprano apunta al ritmo del estómago, que late a tres ondas por minuto.`],source:'PROTOCOLO · paso 3.3 · docs 07 §7 y 08 §4.'},

{n:9,section:'Primera consulta',eyebrow:'Paso 3.4 y 3.5',title:'Interrogatorio · puertas y lista de alimentos',
block:`PUERTAS
¿Se le atora la comida en el pecho?    sí / no
¿Regurgita comida sin ácido, de noche? sí / no
¿Ardor que sube al acostarse?          sí / no
¿Puja y no sale, o no termina?         sí / no

LISTA DE ALIMENTOS
¿Cuántos le caen mal hoy?              ______
¿Cuántos hace un año?                  ______
¿Son los mismos de entonces?           sí / no
¿Cuánto tarda en cerrar una raspada?   ______ días`,
callout:'Las dos primeras señalan una puerta que no se abre. La tercera, una que no cierra.',
notes:[`Dificultad para pasar la comida que va en aumento, con pérdida de peso: se estudia antes de hacer cualquier otra cosa.`,`Una lista que creció con alimentos distintos apunta a rigidez de la respuesta, y se revisa en meses. Una lista fija apunta a una causa fija.`],source:'PROTOCOLO · pasos 3.4 y 3.5 · docs 06 y 11 §8.'},

{n:10,section:'Primera consulta',eyebrow:'Paso 3.6',title:'Interrogatorio · horario del día completo',
block:`Se despierta a las                  ______
Desayuna a las      ______  ¿Desayuna? sí / no
Comida fuerte a las                 ______
Cena a las                          ______
Se acuesta a las                    ______

Horas entre la cena y el primer
alimento del día siguiente          ______

Aparece la molestia a las           ______
Tiene más hambre a las              ______
Veces que come al día, con lo que pica  ______`,
callout:'Las horas de ayuno son el tiempo del que dispone el complejo motor migratorio.',
notes:[`El ciclo del complejo motor migratorio dura de 90 a 120 minutos y se detiene en cuanto entra comida al estómago. En seis horas de ayuno caben tres o cuatro ciclos.`,`El hambre a deshora es la manera más directa de ver un horario corrido, porque es la señal que el propio sistema emite sobre cuándo cree que toca comer.`],source:'PROTOCOLO · paso 3.6 · doc 08 §6.'},

{n:11,section:'Primera consulta',eyebrow:'Paso 3.7',title:'Interrogatorio · antecedentes farmacológicos',
block:`[ ] Inhibidor de la bomba de protones,
    desde hace más de un año
       ácido gástrico bajo, y cuenta
       en el razonamiento

[ ] Antiinflamatorio con el que mejora,
    y al dejarlo regresa igual
       el programa de resolución no se inicia

[ ] Antibiótico en los últimos meses
       microbiota afectada, con recuperación
       descrita en meses`,
notes:[`El primero es dato de la historia, no interpretación: si el ácido está bajo, la frontera entre el ambiente ácido y el alcalino se corrió hacia arriba y las bacterias llegan más lejos.`,`El segundo es el discriminador de rigidez que más rinde en consulta.`],source:'PROTOCOLO · paso 3.7 · docs 05 §6 y 11 §8.'},

{n:12,section:'Primera consulta',eyebrow:'Paso 4',title:'Registro del estado autonómico',
facts:[['Con qué se mide','Prueba de respiración profunda de la hoja del Módulo 2, sin cambiarle nada'],['Qué dato entrega','Diferencia entre latidos, comparable entre una visita y la siguiente'],['Si está compensado','Se rastrea, y lo que aparezca corresponde a la unidad'],['Si está desplazado','Se trabaja primero el estado autonómico, y después las unidades']],
callout:'El rastreo mide ese tramo en el estado autonómico del momento.',
notes:[`El predominio simpático inhibe las neuronas marcapasos del sistema nervioso entérico, baja la secreción de bicarbonato y reduce el flujo esplácnico. Toca ritmo, secreción y aporte a la vez.`,`Dos rastreos que se comparan se hacen en estados comparables.`],source:'PROTOCOLO · paso 4 · docs 14 §7 y 15 §5.'},

{n:13,section:'Secuencia',eyebrow:'Paso 6',title:'Secuencia de intervención',lead:'Cuatro pasos en fila, cada uno más caro que el anterior.',diagram:'secuencia',
callout:'Sin las tres semanas de sustrato sin imán, la mejoría posterior no se puede atribuir.',
notes:[`Mover la hora no cuesta nada; reponer sustrato cuesta poco; aplicar cuesta la sesión. Se prueban en ese orden.`,`El retiro final distingue con qué clase de agente se está tratando: una recaída en días apunta a que algo sigue sosteniendo el estado anterior.`],source:'PROTOCOLO · paso 6 · docs 02 §3 y 08 §6.'},

{n:14,section:'Secuencia',eyebrow:'Paso 6',title:'Calendario de consultas',diagram:'calendario',
callout:'En las cuatro consultas se repiten las mismas preguntas. Lo que cambia es lo que la persona toma en medio.',
notes:[`La segunda consulta decide si faltaba material o si hay algo cerrado. La cuarta decide si el cuerpo lo sostiene solo.`,`Se anota lo que el paciente cambió por su cuenta: dieta, sueño, trabajo, medicamentos.`],source:'PROTOCOLO · paso 6 · doc 02 §7.'},

{n:15,section:'Secuencia',eyebrow:'Paso 6',title:'Justificación del plazo de tres semanas',
facts:[['El epitelio intestinal se renueva completo','Cada tres a cinco días'],['Dos renovaciones completas','De seis a diez días'],['Primera revisión con valor informativo','A las tres semanas'],['Respuesta inmune','Meses: su instrucción queda escrita en los progenitores de la médula ósea']],
callout:'Un cambio en la primera semana lo explica la renovación del epitelio, y no lo que se hizo.',
notes:[`Este es el argumento que sostiene el calendario entero y el que evita conclusiones tempranas.`,`Un calendario construido sobre el reloj del epitelio se queda corto para la pieza inmune.`],source:'PROTOCOLO · paso 6 · docs 02 §7 y 11 §9.'},

{n:16,section:'Sesión de aplicación',eyebrow:'Maniobra 0',title:'Preparación y rastreo basal',
block:`1  Decúbito supino, cabeza en posición neutra
2  Tracción suave de las dos extremidades
   inferiores, y movilización hacia los lados
3  Manta encima
4  Prueba de respiración profunda      ______
5  Levantar las dos extremidades 30° y medir
6  Comparar talones, referencia la izquierda

   Parejos       rastreo por unidad funcional
   Acortamiento  acidosis temporal primero`,
notes:[`La tracción y la manta retiran el tono de defensa muscular, que es una de las fuentes de variabilidad de la medición.`,`El registro del estado autonómico del paso 4 es propio de este eje y no está en el punto trauma.`],source:'TECNICA_RB_Eje_Digestivo.md · maniobra 0.'},

{n:17,section:'Sesión de aplicación',eyebrow:'Maniobra 0',title:'Comparación directa de los talones',lead:'La referencia visual es siempre el talón izquierdo; se compara antes y después de cada colocación.',kind:'image',image:'assets/03-medicion-comparacion.jpg',
caption:'Izquierda: acortamiento observado · derecha: isometría después de la corrección',
brief:'Comparación frontal de los talones: primero con diferencia de altura y después al mismo nivel.',
callout:'El acortamiento de una extremidad señala nodo activo. La isometría señala resolución.',
notes:[`Se levantan las dos extremidades unos treinta grados y se mide. Solo levantar y medir.`,`La comparación se hace de frente y con el mismo talón como referencia en todas las mediciones.`],source:'TECNICA · maniobra 0 · referencia visual medicion_comparacion.jpg.'},

{n:18,section:'Sesión de aplicación',eyebrow:'Convenciones',title:'Polaridad, cara del imán e intensidad',diagram:'polos',
facts:[['Intensidad en superficie','De 0.1 a 0.5 tesla'],['Tamaño del imán','Según la zona y el tamaño de la persona'],['Tiempo base','20 minutos por configuración'],['Rejilla','Cuatro imanes iguales']],
notes:[`Confirmado por el autor y se conserva sin cambio respecto del punto trauma.`,`Lo que cambia en este eje es el mapa de entrada, no la maniobra.`],source:'TECNICA · convenciones.'},

{n:19,section:'Sesión de aplicación',eyebrow:'Maniobra 1',title:'Acidosis temporal',
block:`1  Positivo (Sur) sobre el riñón del lado
   acortado. CARA POSITIVA hacia la piel
2  Medir: tienen que quedar isométricas
      si no, se usa el riñón contralateral
3  Sin retirar el positivo, negativo (Norte)
   adyacente, a un lado
4  Dejar 20 minutos
5  Retirar el positivo y comprobar
      sigue acortada  recolocar y más tiempo
      isométricas     seguir con las unidades`,
callout:'El riñón del mismo lado responde en cerca del ochenta por ciento de los casos.',
notes:[`Es la única maniobra que empieza con el positivo, y la única donde la cara positiva va hacia la piel.`,`Si después de quedar isométrica la extremidad vuelve a acortarse, se pasa a la maniobra 2.`],source:'TECNICA · maniobra 1.'},

{n:20,section:'Sesión de aplicación',eyebrow:'Maniobra 2',title:'Riñón y parietal contralateral',
block:`Indicación: la extremidad vuelve a acortarse
después de la acidosis temporal

1  Positivo (Sur) en el riñón del lado afectado
2  Negativo (Norte) en el parietal contralateral
      riñón derecho    parietal izquierdo
      riñón izquierdo  parietal derecho
3  Dejar 20 minutos
      o dejarla puesta y continuar con
      el rastreo de unidades en paralelo`,
notes:[`Es un dipolo distante que cruza el neuroeje, y corresponde a una desregulación más sostenida que la de la maniobra anterior.`,`El nombre tradicional es fenómeno Goiz o acidosis latente.`],source:'TECNICA · maniobra 2.'},

{n:21,section:'Sesión de aplicación',eyebrow:'Paso 7',title:'Zonas de proyección de las once unidades',
block:` 1 Esófago     línea media del tórax
 2 Estómago    epigastrio e hipocondrio izq.
 3 Duodeno     epigastrio derecho
 4 Yeyuno      periumbilical
 5 Íleon       cuadrante inferior derecho
 6 Válvula     cuadrante inferior derecho
 7 Colon       marco cólico
 8 Recto       región sacra y perineal
 9 Salivales   parotídea y submandibular
10 Páncreas    epigastrio profundo
11 Hígado      toda la zona hepática`,
callout:'Son áreas, no puntos. Dentro de cada una se mueve el imán hasta encontrar el sitio que acorta.',
notes:[`El recorrido va en el sentido del flujo, de esófago a ano, y se hace completo aunque no haya síntoma.`,`Si salen tres tramos marcados, se empieza por el primero de la lista, porque está aguas arriba de los otros dos.`],source:'PROTOCOLO · paso 7 · doc 13 §3.'},

{n:22,section:'Sesión de aplicación',eyebrow:'Paso 7',title:'Anatomía de referencia del tubo digestivo',lead:'Primero se reconoce la posición relativa de los órganos; después se traducen a áreas amplias de proyección sobre la pared corporal.',kind:'image',image:'assets/02-sistema-digestivo-atlas.svg',
caption:'Lámina anatómica de referencia · vista lateral y anterior · dominio público',
brief:'Lámina anatómica vectorial del aparato digestivo, sin deformaciones generativas. Se usa como referencia de relaciones anatómicas, no como mapa de puntos terapéuticos.',
callout:'Hay islas de este eje que no producen molestia propia, y por eso el recorrido se hace completo.',
notes:[`La isla de la base de la cripta se presenta lenta, de meses, y la persona no la relaciona con nada.`,`La red de células de Cajal no tiene zona propia: se busca en la unidad cuyo ritmo está alterado. El tejido inmune se concentra en el íleon.`],source:'PROTOCOLO · paso 7 · doc 13 §3.'},

{n:23,section:'Sesión de aplicación',eyebrow:'Paso 8',title:'Secuencia de rastreo en cada unidad',diagram:'cincoPasos',
callout:'El paso que más se salta es el cuarto: probar varias posiciones del positivo antes de subir al orden fijo.',
notes:[`Si en toda la zona no aparece acortamiento, se pasa a la unidad siguiente sin insistir.`,`El tiempo lo marca el rastreo: se retira el positivo y, si vuelve a acortar, se deja más tiempo.`],source:'PROTOCOLO · paso 8 · TECNICA · maniobra 3.'},

{n:24,section:'Sesión de aplicación',eyebrow:'Paso 8',title:'Dipolo local sobre la zona confirmada',lead:'Negativo fijo sobre el sitio que acortó, y positivo al lado, probando posiciones.',kind:'image',image:'assets/05-dipolo-local.png',
caption:'Dipolo local sobre una zona de proyección',
brief:'Detalle a escala de piel, con las capas de la pared abdominal en corte: el imán negativo apoyado sobre el punto que acortó y el positivo colocado al lado, con las líneas de campo formando el gradiente entre los dos.',
callout:'Lo que actúa sobre el acoplamiento es el gradiente entre los dos polos, y no la potencia de uno.',
notes:[`El positivo se prueba al lado opuesto, a la izquierda o arriba, midiendo la simetría en cada posición.`,`Si ninguna posición consigue la isometría, se sube al orden fijo de nodos distantes.`],source:'TECNICA · maniobra 3.'},

{n:25,section:'Sesión de aplicación',eyebrow:'Paso 9',title:'Orden fijo de nodos distantes',diagram:'ordenFijo',
callout:'Orden confirmado por el autor, con la suprarrenal antes que el hígado.',
notes:[`No se salta ninguno y no se elige por corazonada. El hígado se rastrea sobre la piel en toda la zona hepática; el bulbo raquídeo, en el hueco debajo del occipucio.`,`El hígado entra como unidad cuando el relato lleva ahí, y como nodo cinco cuando una isla de otro tramo no cerró. Se anota cuál de los dos fue.`],source:'PROTOCOLO · paso 9 · doc 13 §4.'},

{n:26,section:'Sesión de aplicación',eyebrow:'Paso 9',title:'Localización de los seis nodos',lead:'Zona renal, suprarrenal, hígado y bulbo raquídeo, en su orden de exploración.',kind:'image',image:'assets/06-orden-fijo-nodos.png',
caption:'Los seis nodos distantes y su orden',
brief:'Silueta de cuerpo entero de frente y de espalda, con los seis nodos numerados en orden: renal derecha 1, renal izquierda 2, suprarrenal derecha 3, suprarrenal izquierda 4, hígado 5 como área completa, bulbo raquídeo 6 en el hueco bajo el occipucio.',
notes:[`En el bulbo están el núcleo motor dorsal del vago, el núcleo del tracto solitario y el área postrema.`,`En rata se demostró que la parte rostral del núcleo motor dorsal contrae el píloro y la caudal lo relaja.`],source:'PROTOCOLO · paso 9 · docs 13 §4 y 16 §5.'},

{n:27,section:'Sesión de aplicación',eyebrow:'Paso 10',title:'Lectura del nodo de cierre',
facts:[['Dipolo local','Acoplamiento dentro de esa unidad'],['Zona renal','Efector iónico'],['Suprarrenal','Efector neuroendocrino, que lleva al eje del estrés del Módulo 2'],['Hígado','Efector metabólico, y pieza que recibe por vía portal'],['Bulbo raquídeo','Control central. Se comprueba con la prueba de respiración profunda'],['Cuerpo entero','Ninguno enganchó. Se registra y se revisa el planteamiento']],
notes:[`El cierre en bulbo es el que más informa en este eje: es compatible con que la pieza que falta sea la vía vagal.`,`En ese caso la comprobación se busca en la prueba de respiración profunda antes que en los síntomas digestivos.`],source:'PROTOCOLO · paso 10 · docs 13 §6 y 16 §5.'},

{n:28,section:'Sesión de aplicación',eyebrow:'Maniobras 5 y 6',title:'Rejilla de gradiente',lead:'Cuatro imanes en 2 × 2 alrededor del par ya colocado, con las polaridades alternadas.',kind:'image',image:'assets/07-rejilla-ajedrez.png',
caption:'Rejilla 2 × 2 sobre un dipolo confirmado',
brief:'Vista cenital sobre la piel: el par ya colocado en el centro y cuatro imanes iguales alrededor en cuadrícula 2 × 2, con polaridades alternadas Norte-Sur y Sur-Norte, y las fronteras de gradiente marcadas en ámbar.',
callout:'En el punto trauma la indicación es dolor con contractura. En el eje digestivo falta definirla.',
notes:[`La alternancia de polos crea gradientes empinados en cada frontera entre polos opuestos.`,`El candidato para este eje son los problemas de ritmo, porque lo que hay que restituir es el paso de la onda eléctrica entre células vecinas. Queda a criterio del autor.`],source:'TECNICA · maniobras 5 y 6 · doc 07 §6.'},

{n:29,section:'Sesión de aplicación',eyebrow:'Paso 11',title:'Condiciones de colocación',
facts:[['Gradiente','Lo forma el segundo polo colocado al lado, y no un imán más potente en el mismo sitio'],['Alcance','Se trabaja el eje completo: intestino, microbiota e hígado se sostienen entre sí'],['Dirección','Se va del intestino hacia el hígado, porque ahí llega todo lo que atraviesa la barrera'],['Calendario','Lo pone el epitelio, que se renueva completo cada tres a cinco días']],
callout:'Trabajar una sola pieza se revierte, porque las otras dos siguen sosteniendo el estado anterior.',
notes:[`Las tres piezas se sostienen entre sí por seis vías documentadas.`,`Estas cuatro condiciones se cumplen con independencia de dónde estén los puntos, que es lo que falta definir.`],source:'PROTOCOLO · paso 11 · docs 01 §4 y 02 §5.'},

{n:30,section:'Sesión de aplicación',eyebrow:'Paso 12',title:'Registro de la aplicación',
block:`Puntos            _____________________________
Polaridad         _____________________________
Distancia entre polos              ______ cm
Orden de colocación _____________________________
Minutos por configuración          ______

HORA DE APLICACIÓN                 ______

Qué se midió antes  ____________________________
Qué se midió después ___________________________
Días transcurridos                 ______`,
callout:'La hora de aplicación se anota siempre. Cada unidad tiene su programa de veinticuatro horas.',
notes:[`Sin ese dato no se puede mirar después si aplicar en la fase activa de la unidad produce distinto resultado que aplicar en su fase de reposo.`,`Es el dato más barato de anotar y el que hoy falta en la mayoría de los registros.`],source:'PROTOCOLO · paso 12 · doc 08 §7.'},

{n:31,section:'Revisión',eyebrow:'Paso 13',title:'Variables y plazos de revisión',diagram:'plazos',
callout:'El plazo lo pone el reloj del tejido que se trató.',
notes:[`Tres semanas donde manda el epitelio; de tres a seis donde mandan el ritmo o la pieza hepática; meses donde manda la instrucción escrita en los progenitores.`,`Revisar la rigidez a las tres semanas lleva a concluir que no funcionó cuando todavía no había tiempo de que funcionara.`],source:'PROTOCOLO · paso 13 · docs 02, 08, 11 y 13.'},

{n:32,section:'Revisión',eyebrow:'Paso 13',title:'Jerarquía de las comprobaciones',
facts:[['Primera','Horas que tarda en dejar de sentir la molestia, al inicio y ahora'],['Segunda','Cuánto dura la mejoría cuando se retira todo'],['Tercera','Prueba de respiración profunda, con la hoja del Módulo 2'],['Cuarta y quinta','Lo que la persona reporta, y el rastreo, que nunca va solo']],
callout:'El rastreo no puede decidir quién entra, dónde se coloca y si funcionó, las tres cosas a la vez.',
notes:[`El orden esperado del cambio: primero se acorta el tiempo hasta que deja de sentir la molestia, después mejora cómo se siente en un día cualquiera.`,`Si la persona reporta que está mejor y ese tiempo sigue igual, la mejoría vino por otro lado.`],source:'PROTOCOLO · paso 13 · doc 02 §6.'},

{n:33,section:'Revisión',eyebrow:'Paso 16',title:'Hoja del recorrido, una por sesión',
block:`                   acorta  dipolo  nodo distante
 1 Esófago           [ ]     [ ]    ____________
 2 Estómago          [ ]     [ ]    ____________
 3 Duodeno           [ ]     [ ]    ____________
 4 Yeyuno            [ ]     [ ]    ____________
 5 Íleon             [ ]     [ ]    ____________
 6 Válvula ileocecal [ ]     [ ]    ____________
 7 Colon             [ ]     [ ]    ____________
 8 Recto             [ ]     [ ]    ____________
 9 Salivales         [ ]     [ ]    ____________
10 Páncreas          [ ]     [ ]    ____________
11 Hígado            [ ]     [ ]    ____________`,
callout:'Se llena aunque no se trate nada esa sesión: es el dato de base para comparar en la siguiente.',
notes:[`Al pie se anotan la primera unidad marcada de la lista y las unidades marcadas sin síntoma reportado.`,`También se anota si el hígado se rastreó como unidad o como nodo distante.`],source:'PROTOCOLO · paso 16 · doc 13 §5.'},

{n:34,section:'Revisión',eyebrow:'Paso 15',title:'Clasificación del resultado en la semana diez',diagram:'resultados',
notes:[`El tercer caso es el más informativo: si la mejoría regresa a los pocos días, se revisan microbiota e hígado antes de repetir la misma aplicación.`,`El cuarto manda de vuelta a la lectura por sistemas.`],source:'PROTOCOLO · paso 15 · doc 02 §9.'},

{n:35,section:'Pendientes',eyebrow:'Particularidad del eje',title:'Colocación en la unión esofagogástrica',lead:'En esta región participan dos componentes distintos: el esfínter esofágico inferior y el diafragma crural.',diagram:'hiatoAnatomico',
callout:'La zona se desplaza mientras se rastrea, y falta definir con qué respiración se coloca.',
notes:[`Aclare que la figura es un esquema funcional, no una vista quirúrgica. El esfínter esofágico inferior corresponde al componente de músculo liso de la unión; el diafragma crural aporta un componente externo de músculo esquelético.`,`El nervio vago acompaña al esófago y participa en la regulación digestiva; el nervio frénico activa el diafragma. Durante la respiración cambian la posición de la unión y la contribución mecánica del hiato.`,`El punto que sigue pendiente no es la anatomía, sino la maniobra: hace falta definir en qué fase respiratoria se localiza y se coloca el imán.`],source:'TECNICA · particularidad 1 · doc 16 §1.'},

{n:36,section:'Pendientes',eyebrow:'Paso 17',title:'Diez puntos pendientes de definición',lead:'Ninguno se resuelve leyendo. Los diez salen del registro de casos.',diagram:'pendientes',
callout:'Dos cambian la maniobra. Los otros ocho cambian dónde se coloca.',
notes:[`Y dos datos se obtienen sin trabajo nuevo: cuántos minutos toma el recorrido completo de las once unidades, y si la hora de aplicación está anotada en los casos existentes.`],source:'PROTOCOLO · paso 17 · TECNICA.'},

{n:37,section:'Cierre',eyebrow:'Regla de comprobación',title:'Cada decisión tiene su propio instrumento',theme:'dark',
facts:[['Quién entra','Criterios de derivación, criterios de exclusión e interrogatorio'],['Dónde se coloca','El rastreo'],['Si funcionó','Horas tras la comida, días de cierre de una herida, y respiración profunda']],
callout:'Un rastreo que hace los tres trabajos a la vez confirma siempre, pase lo que pase.',
notes:[`Con esto el protocolo queda refutable: si las mejorías aparecen igual con sustrato y sin él, con gradiente y sin él, y en el mismo plazo en que el intestino se renueva por su cuenta, entonces no separó nada.`],source:'PROTOCOLO · pasos 13 y 17 · doc 02 §10.'}

];
