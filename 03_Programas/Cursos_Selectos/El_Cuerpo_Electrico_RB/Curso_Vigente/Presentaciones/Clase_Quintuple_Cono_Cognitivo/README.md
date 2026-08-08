# El quíntuple y el cono cognitivo

Deck HTML de 30 diapositivas construido a partir de `clase-quintuple-cono-cognitivo-guion.md`.

## Abrir

Abre `index.html` en un navegador moderno. El deck no necesita conexión a internet ni dependencias externas.

Abre `guion-tarjetas.html` para consultar las 30 tarjetas de conducción con el texto literal del guion, capa experta, interacción y transición. Incluye buscador, vista compacta y formato de impresión.

## Controles

- `→`, `↓`, `Espacio` o clic en la mitad derecha: avanzar.
- `←`, `↑` o clic en la mitad izquierda: retroceder.
- `N`: mostrar u ocultar notas del presentador.
- `G`: mostrar u ocultar la guía para público general.
- `D`: abrir o cerrar la pizarra explicativa disponible en la slide.
- `F`: entrar o salir de pantalla completa.
- `Inicio` / `Fin`: primera o última diapositiva.

Algunas diapositivas revelan sus elementos progresivamente antes de avanzar. Al abrir el deck, la guía para público general está activa en 25 slides. Cada franja añade una traducción sencilla, un ejemplo y una pista observable; puede ocultarse con `G` para recuperar la composición limpia.

Las slides 2, 7, 12, 13, 14, 21 y 25 incluyen una pizarra SVG adicional. Se abre con `D`; las flechas revelan sus pasos y el último avance cierra la pizarra. Las imágenes originales permanecen en las slides.

## Archivos

- `index.html`: contenido y diagramas SVG.
- `deck.css`: sistema visual, composición y animaciones semánticas.
- `deck.js`: navegación, fragmentos, notas y progreso.
- `beginner-guides.js`: capa didáctica adicional para audiencia no experta.
- `teaching-diagrams.js`: siete pizarras explicativas con revelado progresivo.
- `guion-tarjetas.html`: tarjetas con el guion exacto de cada slide.
- `generar-tarjetas.mjs`: regenerador que extrae las tarjetas del guion fuente.
- `assets/`: ilustraciones originales, logo oficial y referencia del cono de Michael Levin.
- `preview.png`: vista previa de la portada.
- `preview-guion-tarjetas.png`: vista previa de las tarjetas.

## Movimiento y accesibilidad

El deck usa transiciones direccionales y familias de movimiento específicas para rutas, campos, restricciones, contracción y reconexión. Si el sistema operativo tiene activada la preferencia de reducir movimiento, las animaciones se deshabilitan sin ocultar contenido.

La geometría de las slides 17 y 18 retoma el doble cono centrado en el aquí-ahora de Michael Levin, adaptado a los ejes `H` y `Λ` del curso. La atribución completa está en las notas de la slide 17.

## Alcance científico

La presentación distingue explícitamente entre observaciones, hipótesis operativas y predicciones falsables. No presenta el marco como medicina establecida.

El guion fuente no fue modificado.
