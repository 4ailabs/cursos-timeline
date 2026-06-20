# Instituto Centrobioenergetica — Ficha Técnica de Logos V3

---

## 1. Inventario de archivos

### Archivos fuente (SVG vectorial — resolución infinita)

| Archivo | Dimensiones base | Peso | Uso principal |
|---------|-----------------|------|---------------|
| `logo_isotipo.svg` | 160 × 160 px | 1.1 KB | Símbolo solo. Apps, sellos, merch, favicon grande |
| `logo_apilado.svg` | 260 × 210 px | 1.4 KB | Versión principal. Web, docs, presentaciones |
| `logo_horizontal.svg` | 340 × 80 px | 1.4 KB | Headers, navegación, firma de email, facturas |
| `logo_horizontal_dark.svg` | 340 × 80 px | 1.4 KB | Sobre fondos oscuros (#2A1F1A o similar) |
| `logo_monocromatico.svg` | 340 × 80 px | 1.5 KB | Impresión B/N, grabado, sellos, fax |
| `logo_favicon.svg` | 32 × 32 px | 0.9 KB | Favicon del navegador, íconos de app |

### Exportaciones PNG (raster — resolución fija)

**Isotipo:**

| Archivo | Resolución | Peso | Para qué |
|---------|-----------|------|----------|
| `logo_isotipo_1x_160x160.png` | 160 × 160 | 3 KB | Web estándar, thumbnails |
| `logo_isotipo_2x_320x320.png` | 320 × 320 | 8 KB | Pantallas retina |
| `logo_isotipo_4x_640x640.png` | 640 × 640 | 17 KB | Redes sociales, íconos grandes |
| `logo_isotipo_8x_print_1024x1024.png` | 1024 × 1024 | 31 KB | Impresión estándar |
| `logo_isotipo_16x_hires_2048x2048.png` | 2048 × 2048 | 70 KB | Impresión grande, lonas, playeras |

**Apilado (versión principal):**

| Archivo | Resolución | Peso | Para qué |
|---------|-----------|------|----------|
| `logo_apilado_1x_260x210.png` | 260 × 210 | 7 KB | Web estándar |
| `logo_apilado_2x_520x420.png` | 520 × 420 | 15 KB | Pantallas retina |
| `logo_apilado_4x_1040x840.png` | 1040 × 840 | 34 KB | Presentaciones, docs impresos |
| `logo_apilado_8x_print_2080x1680.png` | 2080 × 1680 | 76 KB | Impresión grande |

**Horizontal:**

| Archivo | Resolución | Peso | Para qué |
|---------|-----------|------|----------|
| `logo_horizontal_1x_340x80.png` | 340 × 80 | 6 KB | Web estándar |
| `logo_horizontal_2x_680x160.png` | 680 × 160 | 13 KB | Pantallas retina |
| `logo_horizontal_4x_1360x320.png` | 1360 × 320 | 28 KB | Presentaciones |
| `logo_horizontal_8x_print_2720x640.png` | 2720 × 640 | 60 KB | Impresión, banners |

**Favicon (todos los tamaños necesarios):**

| Archivo | Resolución | Para qué |
|---------|-----------|----------|
| `logo_favicon_16px_16x16.png` | 16 × 16 | Favicon clásico del navegador |
| `logo_favicon_32px_32x32.png` | 32 × 32 | Favicon retina / pestañas |
| `logo_favicon_64px_64x64.png` | 64 × 64 | Favicon Windows |
| `logo_favicon_128px_128x128.png` | 128 × 128 | Chrome Web Store |
| `logo_favicon_apple_touch_180x180.png` | 180 × 180 | Apple Touch Icon (iPhone/iPad) |
| `logo_favicon_pwa_512x512.png` | 512 × 512 | PWA, Google Play, splash screen |

---

## 2. Especificaciones técnicas del símbolo

### Geometría

- **Estructura:** 12 círculos distribuidos a 30° de separación sobre una circunferencia
- **Radio de órbita:** 50 unidades (isotipo base 160px)
- **Radio de cada punto:** 8 unidades (todos iguales)
- **Punto central exterior:** r = 5 unidades, opacity 0.5
- **Punto central interior:** r = 3 unidades, opacity 1.0
- **Secuencia de color:** alternada empezando desde las 12 en punto, sentido horario:
  - Posiciones 1, 3, 5, 7, 9, 11 → Terracota (#B5604A)
  - Posiciones 2, 4, 6, 8, 10, 12 → Verde salvia (#8FA87A)

### Coordenadas exactas (sobre centro 0,0, radio 50)

| Posición | Ángulo | X | Y | Color |
|----------|--------|---|---|-------|
| 1 | 0° | 0 | -50 | #B5604A |
| 2 | 30° | 25 | -43.3 | #8FA87A |
| 3 | 60° | 43.3 | -25 | #B5604A |
| 4 | 90° | 50 | 0 | #8FA87A |
| 5 | 120° | 43.3 | 25 | #B5604A |
| 6 | 150° | 25 | 43.3 | #8FA87A |
| 7 | 180° | 0 | 50 | #B5604A |
| 8 | 210° | -25 | 43.3 | #8FA87A |
| 9 | 240° | -43.3 | 25 | #B5604A |
| 10 | 270° | -50 | 0 | #8FA87A |
| 11 | 300° | -43.3 | -25 | #B5604A |
| 12 | 330° | -25 | -43.3 | #8FA87A |

---

## 3. Paleta de color oficial

### Versión sobre fondo claro (principal)

| Nombre | HEX | RGB | Uso |
|--------|-----|-----|-----|
| Terracota | #B5604A | 181, 96, 74 | Primario. Puntos alternos, texto nombre |
| Verde salvia | #8FA87A | 143, 168, 122 | Secundario. Puntos alternos |
| Dorado | #E8A857 | 232, 168, 87 | Acento. Punto central |
| Gris texto | #888580 | 136, 133, 128 | Texto "INSTITUTO" |

### Versión sobre fondo oscuro

| Nombre | HEX | RGB | Uso |
|--------|-----|-----|-----|
| Terracota claro | #D4A07A | 212, 160, 122 | Puntos alternos, texto nombre |
| Verde salvia claro | #A8C8A0 | 168, 200, 160 | Puntos alternos |
| Dorado | #E8A857 | 232, 168, 87 | Punto central |
| Crema texto | #D4C4B0 | 212, 196, 176 | Texto "INSTITUTO" |
| Fondo recomendado | #2A1F1A | 42, 31, 26 | Fondo oscuro estándar |

### Versión monocromática

| Elemento | Color | Opacity |
|----------|-------|---------|
| Puntos terracota | #333333 | 0.7 |
| Puntos salvia | #333333 | 0.5 |
| Centro | #333333 | 0.9 |
| Texto "INSTITUTO" | #333333 | 0.6 |
| Texto nombre | #333333 | 1.0 |

---

## 4. Tipografía del logotipo

| Elemento | Fuente | Peso | Tamaño (apilado) | Letter-spacing | Color |
|----------|--------|------|-------------------|----------------|-------|
| "INSTITUTO" | Helvetica Neue* | 500 | 9px | 3.5px | #888580 |
| "CENTROBIOENERGETICA" | Helvetica Neue* | 500 | 13px | 1.5px | #B5604A |

*Helvetica Neue es un placeholder. Para producción final se recomienda seleccionar una fuente con licencia propia. Alternativas sugeridas: Montserrat (Google Fonts, gratuita), DM Sans (Google Fonts, gratuita), Neue Haas Grotesk (de paga, es la Helvetica original).

---

## 5. Reglas de uso

### Espacio mínimo de respeto
El espacio libre alrededor del logo debe ser al menos el diámetro de un punto (16 unidades en el isotipo base).

### Tamaños mínimos
- Isotipo solo: 32px de ancho mínimo
- Versión con texto: 120px de ancho mínimo
- Para impresión: 15mm de ancho mínimo (isotipo), 40mm (con texto)

### Fondos permitidos
- Blanco o crema claro → usar versión estándar
- Oscuro (#2A1F1A o similar) → usar versión dark
- Fotografía → usar versión estándar si el área es clara, dark si es oscura
- Un solo color sólido → usar monocromático si el color compite con la paleta

### Usos prohibidos
- No rotar el logo
- No distorsionar las proporciones
- No cambiar los colores fuera de las versiones oficiales
- No agregar sombras, bordes o efectos
- No colocar sobre fondos con patrones complejos
- No usar la versión estándar sobre fondos oscuros (usar la versión dark)

---

## 6. SVG vs PNG — Cuándo usar cuál

| Contexto | Formato | Por qué |
|----------|---------|---------|
| Web (HTML/CSS) | SVG | Escala perfecto a cualquier pantalla, pesa menos |
| Redes sociales (perfil, post) | PNG 4x o 8x | Las plataformas no aceptan SVG |
| Presentaciones (PowerPoint, Keynote) | PNG 4x | Mejor compatibilidad |
| Documentos (Word, PDF) | PNG 4x o SVG | Depende del software |
| Impresión (playeras, lonas, tarjetas) | SVG o PNG 16x | SVG es ideal; si piden raster, usar la máxima resolución |
| Email (firma) | PNG 2x | Los clientes de email no renderizan SVG |
| Favicon | PNG (varios tamaños) | Estándar del navegador |
| Apps móviles | PNG (varios tamaños) + SVG | Depende de la plataforma |

---

## 7. Cómo obtener resolución aún más alta

Los SVG son vectoriales — resolución infinita. Para obtener PNG a cualquier resolución:

### Opción A — Figma (gratuito)
1. Importar el SVG
2. Exportar como PNG a 1x, 2x, 3x, 4x... hasta el tamaño que necesites

### Opción B — Inkscape (gratuito, desktop)
1. Abrir el SVG
2. Archivo → Exportar imagen PNG
3. Definir el DPI que necesites (300 para impresión estándar, 600 para alta calidad)

### Opción C — Línea de comandos (para desarrolladores)
```bash
# Con cairosvg (Python)
pip install cairosvg
cairosvg logo_isotipo.svg -o logo_4000px.png -W 4000 -H 4000

# Con Inkscape CLI
inkscape logo_isotipo.svg --export-type=png --export-width=4000
```

### Opción D — Canva
1. Subir el SVG
2. Usarlo en cualquier diseño — Canva lo escala automáticamente
3. Al exportar el diseño, la resolución del logo se ajusta al output

---

*Instituto Centrobioenergetica — Sistema de Marca V3*
*Marzo 2026*
