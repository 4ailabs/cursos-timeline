# Storyboard de animación · Los Cuatro Caminos

## Concepto rector

**Una dirección que operaba sin ser vista se hace visible sobre la hoja.**

La pieza no representa a una persona escogiendo entre cuatro carreteras. Representa el procedimiento del curso: pregunta, centro, caída, observación y conciencia. Ningún camino se presenta como correcto o incorrecto.

## Uso y formato propuesto

- Pieza principal: apertura del curso y transición audiovisual.
- Duración: 15 segundos.
- Formato maestro: 1920 × 1080, 24 fps, relación 16:9.
- Versión secundaria: fondo transparente para encabezados y documentos digitales.
- Lenguaje visual: objeto físico sobre hoja, movimiento contenido, cámara precisa, sin gestos caricaturescos.

## Secuencia

### Plano 1 · La hoja todavía no habla · 0:00–0:02

Vista cenital de una hoja crema. No aparecen caminos ni textos. Una luz suave define la superficie y deja el centro óptico libre.

**Función narrativa:** establecer que la información aún no es visible.

### Plano 2 · Aparece el campo de lectura · 0:02–0:04

Los dos ejes se dibujan desde el centro hacia afuera. El eje horizontal corresponde a Norte–Sur; el vertical, a Este–Oeste. Las cuatro bandas tienen el mismo grosor y la misma jerarquía.

Orientación obligatoria en pantalla:

| Posición | Dirección | Camino |
|---|---|---|
| Derecha | Norte | Migrante |
| Izquierda | Sur | Sufrimiento |
| Arriba | Este | Placer |
| Abajo | Oeste | Deber |

**Función narrativa:** presentar la hoja como instrumento, no como paisaje.

### Plano 3 · La figura entra en el centro · 0:04–0:06

La figura auténtica del proyecto desciende verticalmente y se apoya de pie en el cruce de los ejes. La cámara conserva la vista cenital. No se alteran las proporciones del muñeco.

**Función narrativa:** representar selección y colocación sin introducir todavía interpretación.

### Plano 4 · Elevación y caída · 0:06–0:08.5

La figura se eleva unos centímetros, queda suspendida una fracción de segundo y cae con física contenida. Se asienta apuntando hacia un cuadrante, no hacia un camino puro. El impacto es seco y sobrio, sin rebotes cómicos.

**Función narrativa:** mostrar que la dirección aparece mediante el procedimiento.

### Plano 5 · La dirección se hace visible · 0:08.5–0:11

La cámara se aproxima a los pies. Una luz recorre desde el centro las dos bandas que delimitan el cuadrante observado. El resto de las bandas permanece visible con igual peso. Aparecen brevemente los nombres de los dos caminos implicados.

**Función narrativa:** mostrar complejidad e integración; la mayoría de las lecturas ocurre entre dos direcciones.

### Plano 6 · Cambiar el punto de observación · 0:11–0:13

La cámara abandona la vista cenital y baja a una perspectiva de mesa mientras el tablero gira lentamente. Al fondo aparecen, desenfocadas y con menor contraste, otras figuras que sugieren el sistema familiar. La figura principal permanece como sujeto de la lectura.

**Función narrativa:** anticipar la observación por ángulos y el contenido del Módulo 2 sin simular que se mueve a otras personas.

### Plano 7 · Firma · 0:13–0:15

La escena se simplifica hasta formar el símbolo de cuatro bandas convergentes. Entra la firma:

**LOS CUATRO CAMINOS**  
*Formación en terapia con muñecos*

**Función narrativa:** cerrar con la identidad del curso, no con una conclusión terapéutica prefabricada.

## Dirección de arte

- Fondo crema `#FFF3DA`.
- Azul institucional `#075577` como estructura.
- Cian `#079BC7` y naranja `#FF9F1C` como acentos de profundidad y atención.
- Las direcciones no reciben colores psicológicos permanentes.
- Luz de estudio suave, sombras cortas y legibles.
- Materiales mate o satinados; evitar plástico excesivamente brillante.
- Tipografía geométrica limpia, con espaciado amplio como en la firma v4.
- Movimiento con aceleración y desaceleración suaves, excepto el contacto físico de la caída.

## Sonido sugerido

- Trazo leve de papel al aparecer los ejes.
- Contacto físico pequeño al caer la figura.
- Pulso grave y discreto cuando la dirección se hace visible.
- Cierre musical breve, sin tono infantil.

## Condiciones de fidelidad al curso

1. Mantener el Norte a la derecha y el Sur a la izquierda.
2. Leer la dirección por los pies.
3. Mostrar un cuadrante como combinación, no como error.
4. No jerarquizar moralmente los caminos.
5. No hacer que una figura mueva o corrija a las demás.
6. No presentar la sesión como resolución inmediata: la pieza termina en observación consciente.

## Estado técnico de la escena revisada

- Archivo abierto: `layout_caminos/playmobill2/figura_trabajo.blend`.
- Blender: 5.2.1 LTS.
- Escena: 42 objetos, 10 materiales.
- Render actual: Blender Workbench, 640 × 640, 24 fps.
- No hay armature; el personaje está organizado por piezas con parentesco de objetos.
- Existen acciones de un solo fotograma en el frame 118, pero no una animación terminada.
- Para producción se requiere una copia nueva, cámara 16:9, materiales de marca y controles de animación por grupos/pivotes.

## Criterio para aprobar el animatic

Sin materiales finales ni render de alta calidad, el animatic debe permitir verificar:

- que la orientación de los ejes se entiende;
- que la figura conserva la silueta correcta;
- que la caída se percibe física y respetuosa;
- que el cuadrante se lee sin privilegiar un camino;
- que la transición final hacia la marca funciona en formato horizontal.

