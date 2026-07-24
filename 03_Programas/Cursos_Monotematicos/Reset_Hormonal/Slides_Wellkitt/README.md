# Slides · Tu Mapa Hormonal

Deck HTML 16:9 para la sesión dinámica de jueves en Wellkitt.

## Presentar

Abre `Slides_Tu_Mapa_Hormonal.html` en un navegador. Usa las flechas del teclado, la barra espaciadora o los botones laterales para avanzar.

## Exportar a PNG

Requiere Puppeteer disponible en el entorno de Node:

```bash
node exportar_slides.js
```

Las imágenes se generan en `export_png/` a 1920×1080.

## Llevar a Keynote

Con las PNG exportadas, ejecuta:

```bash
osascript armar_keynote.applescript
```

El archivo `Reset_Hormonal_Tu_Mapa_Hormonal.key` se guarda en esta misma carpeta, con una imagen a pantalla completa por diapositiva.

## Estructura

- 14 slides individuales, con retícula fija de 1280×720.
- Identidad cromática Wellkitt y codificación de las zonas A/B/C.
- Material médico presentado como orientación, no como diagnóstico o tratamiento.
- Recursos locales en `assets/` para que el deck no dependa de rutas externas.
