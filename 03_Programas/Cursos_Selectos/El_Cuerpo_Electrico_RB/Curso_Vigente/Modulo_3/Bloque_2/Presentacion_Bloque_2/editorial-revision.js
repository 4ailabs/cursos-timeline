/* Revisión editorial: lenguaje causal, definiciones explícitas y separación entre dato y modelo. */
const EDITORIAL_REVISIONS={
1:{title:'Análisis del eje digestivo con el modelo quíntuple',lead:'Barrera eléctrica, motilidad, tolerancia inmunitaria y persistencia de los cambios.'},
2:{eyebrow:'Definiciones del modelo',title:'El quíntuple describe cinco propiedades del sistema',lead:'C identifica restricciones; E, el criterio regulado; H, el alcance de la información.',callout:'En la barrera intestinal, una parte de C puede medirse eléctricamente.'},
3:{eyebrow:'Medición de la barrera',title:'La resistencia transepitelial cuantifica la integridad de la barrera',lead:'Se aplica una corriente conocida y se calcula la resistencia de una monocapa de células vivas.',callout:'La TEER, expresada en Ω·cm², operacionaliza un componente de la restricción C.'},
4:{eyebrow:'Complejo de unión epitelial',title:'La unión estrecha regula permeabilidad; la unión comunicante coordina células',callout:'En el marco del curso, el imán se relaciona con el acoplamiento por uniones comunicantes.',question:'¿Cuál de estas dos uniones se propone modificar mediante el gradiente magnético?'},
5:{eyebrow:'Prueba lactulosa/manitol',title:'La razón lactulosa/manitol reduce el efecto del tiempo de recolección',lead:'La lactulosa estima paso paracelular; el manitol funciona como referencia de absorción.',callout:'La relación entre ambas mediciones es más estable que cada cantidad aislada.'},
6:{eyebrow:'Organización espacial',title:'Los gradientes regulan la especialización de cada región',callout:'Las células comparten repertorio de acciones; la posición regula cuáles ejecutan.'},
7:{eyebrow:'Interrupción de información posicional',title:'El desacoplamiento conserva células y acciones, pero elimina información de posición',lead:'Sin comunicación con las células vecinas, disminuye la coordinación con el tejido.',callout:'En términos del modelo: S y O se conservan; C disminuye y H se acorta.'},
8:{eyebrow:'Células intersticiales de Cajal',title:'Las células de Cajal generan ondas eléctricas que preceden a la contracción',callout:'La frecuencia disminuye entre duodeno e íleon y contribuye a la dirección del tránsito.'},
9:{eyebrow:'Secuencia de deterioro',title:'La conexina 43 disminuye antes de la pérdida de células y neuronas',lead:'Existe una fase de desacoplamiento funcional previa al daño anatómico.',callout:'La intervención propuesta se dirige al desacoplamiento funcional, no a la pérdida celular.'},
10:{eyebrow:'Control inhibitorio de esfínteres',title:'Los esfínteres se relajan cuando reciben una señal inhibitoria',lead:'El óxido nítrico y el VIP reducen el tono; las células de Cajal participan en la transmisión.',callout:'Si la señal de relajación falla, la restricción C permanece activa fuera de contexto.'},
11:{eyebrow:'Barrera de la unión esofagogástrica',title:'El esfínter liso y el diafragma crural forman una barrera conjunta',callout:'La respiración profunda modifica directamente el componente crural de esta barrera.'},
12:{eyebrow:'Gradiente ácido–base',title:'Los transportadores iónicos establecen la frontera entre ácido y bicarbonato',callout:'El estómago mantiene una diferencia de concentración de H⁺ superior a 10⁶.'},
13:{eyebrow:'Transporte iónico en cinco regiones',title:'Cinco transportadores generan gradientes químicos en el tubo digestivo',callout:'Interpretación del modelo: los flujos iónicos y Vmem preceden a los cambios de pH.'},
14:{eyebrow:'Funciones diferenciadas del epitelio',title:'El epitelio restringe el paso, toma muestras y envía señales',callout:'H depende de qué información llega al sistema nervioso y del retraso con que llega.'},
15:{eyebrow:'Tejido linfoide asociado al intestino',title:'La mucosa regula el umbral entre tolerancia y respuesta inmunitaria',callout:'En esta aplicación, E es un criterio de decisión y no una concentración.'},
16:{eyebrow:'Microbiota, colonocito e inmunidad',title:'El butirato conecta el metabolismo epitelial con la tolerancia inmunitaria',callout:'Añadir microorganismos sin restaurar la anaerobiosis luminal puede producir un efecto limitado.'},
17:{eyebrow:'Inicio y resolución inflamatoria',title:'La resolución de la inflamación requiere un programa molecular activo',callout:'El estímulo inicia la inflamación; una falla de resolución permite que persista.'},
18:{eyebrow:'Persistencia epigenética de la respuesta',title:'La remodelación de progenitores puede mantener una respuesta inflamatoria aumentada',callout:'Trinquete: el estado previo modifica restricciones futuras y el cambio deja de revertirse de forma espontánea.'},
19:{eyebrow:'Sistema nervioso entérico',title:'El sistema nervioso entérico genera patrones y conserva cambios plásticos',callout:'Se considera un agente porque genera actividad, la modifica y conserva parte del cambio.'},
20:{eyebrow:'Regulación circadiana digestiva',title:'Los valores regulados del tubo digestivo cambian según la hora',callout:'Una medición aislada no permite distinguir un valor anormal de un horario desplazado.'},
21:{eyebrow:'Regulación autonómica',title:'El estado autonómico habilita o inhibe los programas digestivos',callout:'Permiso contextual: una condición que permite o impide ejecutar funciones sin cambiar la capacidad del tejido.'},
22:{eyebrow:'Señalización hígado–vago',title:'La despolarización del hepatocito reduce la descarga vagal aferente',callout:'Mecanismo medido: lípido → despolarización → GABA → menor actividad vagal hepática.'},
23:{eyebrow:'Comparación de seis subsistemas',title:'Se conservan capacidades básicas, pero disminuye la coordinación',callout:'En el modelo, S y O permanecen disponibles; las alteraciones principales aparecen en C, E y H.'},
24:{eyebrow:'Instanciación digestiva del quíntuple',title:'Las cinco letras organizan variables distintas del eje digestivo',callout:'E puede representar una cantidad, un criterio de decisión, un horario o una meta compartida.'},
25:{eyebrow:'Persistencia y reversibilidad',title:'Las alteraciones funcionales reversibles se atienden antes del daño estructural',callout:'Una alteración reversible persistente puede contribuir a cambios menos reversibles.'},
26:{eyebrow:'Secuencia clínica de análisis',title:'Se evalúan motilidad, barrera y resolución inflamatoria en ese orden',callout:'Este orden sigue relaciones causales y reduce el riesgo de intervenir primero sobre consecuencias.'},
27:{eyebrow:'Pruebas secuenciales',title:'Primero se evalúa el horario, después el sustrato y al final el gradiente magnético',callout:'Hipótesis operativa del método: importa la distribución espacial del campo, no solo su intensidad local.'},
28:{eyebrow:'Áreas anatómicas de proyección',title:'El recorrido examina once zonas en el sentido del tránsito digestivo',callout:'Cada zona es un área de exploración; no se asume un punto anatómico único.'},
29:{eyebrow:'Procedimiento de exploración',title:'La prueba identifica una zona reactiva y mide la respuesta al dipolo',lead:'',callout:'La simetría es el dato observado; la reapertura de C es la interpretación del modelo.'},
30:{eyebrow:'Práctica por parejas',title:'Se registran cuatro pasos y se intercambian roles a los 17 minutos',callout:'Antes de evaluar nodos distantes, se prueban varias posiciones del dipolo local.'},
31:{eyebrow:'Resultados de la práctica',title:'Cada pareja reporta tres resultados comparables',callout:'Una zona reactiva sin síntomas constituye una medición basal; no establece un diagnóstico.'}
};
for(const slide of globalThis.SLIDES_DATA||[]){
  Object.assign(slide,EDITORIAL_REVISIONS[slide.n]||{});
  slide.notes=slide.notes.map(p=>p
    .replace('la maquinaria siga presente','las capacidades celulares básicas se conserven')
    .replace('C se postula','C se infiere a partir del comportamiento')
    .replace('La isla de despolarización vive en C hacia el colectivo','La zona despolarizada y desacoplada corresponde a una alteración de C hacia el colectivo')
    .replace('cae ZO-1','disminuye ZO-1')
    .replace('no hay nada que reabrir','no existe acoplamiento funcional que restaurar')
    .replace('El esfínter queda puesto porque nadie ordena abrir.','El esfínter permanece contraído porque no recibe la señal inhibitoria de relajación.')
    .replace('no puede saber que dejó de informar','no genera una señal que indique la pérdida de información')
    .replace('sin abrir la compuerta','sin restaurar la condición limitante')
    .replace('la primera aguas arriba','la primera más proximal en el sentido del tránsito')
    .replace('C tiene instrumento','un componente de C tiene una medición instrumental')
    .replace('la isla pierde C y H','una zona desacoplada reduce C y H')
    .replace('el imán es compuerta después de horario y sustrato','el gradiente magnético se evalúa después de descartar horario y sustrato'));
}
SLIDES_DATA[22].facts=[['Epitelio','acoplamiento entre células'],['Hígado','criterio regulado'],['Músculo','señal temporal'],['Inmunidad','transición entre programas'],['Esfínter','señal inhibitoria'],['Sistema entérico','modulación de excitabilidad']];
SLIDES_DATA[30].facts=[['Primera zona reactiva','posición más proximal'],['Zonas sin síntomas','información añadida por el recorrido'],['Respuesta al dipolo','local o en nodo distante']];
