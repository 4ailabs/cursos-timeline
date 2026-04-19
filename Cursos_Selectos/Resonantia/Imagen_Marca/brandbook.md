# Resonantia — Brandbook
### Sistema de Identidad Visual · v1.0 · Abril 2026
**Instituto Centrobioenergetica · Dr. Miguel Ojeda Rios**

---

## 01 · Simbolo

### El diapason y el punto de contacto

El simbolo de Resonantia es un diapason unico, centrado, construido con proporciones aureas. Al final del tallo: un punto dorado — el momento exacto de contacto con el hueso.

**Tres variantes aprobadas:**

| Variante | Fondo | Uso |
|---|---|---|
| Principal | Oscuro `#1A1410` | Digital, presentaciones, redes |
| Secundaria | Claro `#F5F0E8` | Impresion, diplomas, manual |
| Terciaria | Terracota medio `#3A2A1A` | Materiales fisicos del Instituto |

---

### Construccion — Proporciones aureas (φ = 1.618)

```
Total = Ramas + Tallo
Ramas / Tallo = φ = 1.618

Total = 160px
Ramas = 160 × φ / (1+φ) = 99px   ← parte larga (vibran)
Tallo = 160 / (1+φ)    = 61px    ← parte corta (el mango)
Ancho interno           = 38px   ← ramas / φ²
Radio de curva          = 19px   ← ancho / 2
```

**Reglas del simbolo:**
- Las ramas son siempre mas largas que el tallo — como en el instrumento real
- El punto dorado nunca se omite — es el punto de contacto con el hueso
- El trazo es continuo: ramas + curva + tallo en un solo path, sin cortes
- Color del diapason: siempre Terracota Profundo `#8B3A1A`
- Color del punto: siempre Dorado Diferencial `#E8A857`

**Path SVG del simbolo:**
```svg
<path d="M81 18 L81 117 Q81 136 100 136 Q119 136 119 117 L119 18 M100 136 L100 178"
      fill="none" stroke="#8B3A1A" stroke-width="5"
      stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="100" cy="178" r="6" fill="none" stroke="#E8A857"
        stroke-width="1.5" opacity="0.7"/>
<circle cx="100" cy="178" r="3" fill="#E8A857"/>
```
ViewBox: `0 0 200 200`

---

### Espacio de proteccion

La zona libre minima alrededor del simbolo es igual al **ancho de las ramas** (38px en el viewBox original).

No colocar texto, graficos ni bordes dentro de esta zona.

---

### Tamaño minimo de uso

| Tamaño | Uso |
|---|---|
| 64px+ | Digital completo — con punto |
| 40px | Minimo recomendado — con punto |
| Menor de 40px | No usar — el punto y la curva pierden legibilidad |

---

## 02 · Tipografia

### Dos fuentes. Una voz.

**Tipografia principal — Cormorant Garamond**
- Rol: titulos, nombre del curso, portadas, citas destacadas
- Familia: Serif clasico, trazo fino
- Pesos en uso: Light 300, Regular 400, Light Italic 300, SemiBold 600
- Fuente: Google Fonts (gratuita)
- Alternativa offline: Georgia

**Tipografia secundaria — Jost**
- Rol: etiquetas, subtitulos, cuerpo de texto, wordmark en caja alta
- Familia: Sans-serif geometrica
- Pesos en uso: ExtraLight 200, Light 300, Regular 400
- Fuente: Google Fonts (gratuita)
- Alternativa offline: Gill Sans

---

### Jerarquia tipografica

| Nivel | Fuente | Tamano | Peso | Tracking | Caso | Color |
|---|---|---|---|---|---|---|
| Titulo principal | Cormorant Garamond | 48–64px | 300 | +2 | Titulo | `#D4C4B0` |
| Subtitulo | Jost | 11–13px | 200 | +4 | MAYUSCULAS | `#8B3A1A` |
| Cuerpo de texto | Jost | 14–16px | 300 | 0 | Normal | `#888580` |
| Cita destacada | Cormorant Garamond italic | 20–24px | 300 | 0 | Normal | `#D4C4B0` |
| Etiqueta / tag | Jost | 9–10px | 300 | +3 | MAYUSCULAS | `#555555` |

---

### Wordmark — variantes

**Logo completo** (simbolo + nombre + Instituto)
```
[Simbolo SVG]  Resonantia
               Instituto Centrobioenergetica
```
Fuente nombre: Cormorant Garamond 300, tracking +3
Fuente sub: Jost 200, tracking +3, mayusculas

**Compacto horizontal** (icono + barra vertical + nombre en caja alta)
```
[Icono 28px]  |  RESONANTIA
```
Nombre: Jost 300, tracking +4, mayusculas

**Solo texto**
```
Resonantia
Diapasones Terapeuticos
```

**Solo simbolo** — usar unicamente cuando el nombre ya es visible en el contexto (iconos, sellos, bordados).

---

## 03 · Color

### Cinco colores. Una temperatura.

| Nombre | HEX | RGB | CMYK | Rol |
|---|---|---|---|---|
| Terracota Profundo | `#8B3A1A` | 139 · 58 · 26 | 0 · 58 · 81 · 45 | Color primario. El diapason. |
| Siena Calido | `#C4956A` | 196 · 149 · 106 | 0 · 24 · 46 · 23 | Secundario. Piel, madera. |
| Dorado Diferencial | `#E8A857` | 232 · 168 · 87 | 0 · 28 · 63 · 9 | Acento. El 128 Hz. El punto. |
| Oscuro Base | `#1A1410` | 26 · 20 · 16 | 0 · 23 · 38 · 90 | Fondo principal. |
| Crema Texto | `#D4C4B0` | 212 · 196 · 176 | 0 · 8 · 17 · 17 | Texto sobre fondos oscuros. |

**Nota:** Nunca usar blanco puro `#FFFFFF` ni negro puro `#000000` como fondos de Resonantia.

---

### Combinaciones aprobadas

**Principal — digital y presentaciones**
- Fondo: `#1A1410`
- Nombre: `#D4C4B0` Cormorant Garamond
- Subtitulo: `#8B3A1A` Jost mayusculas
- Acento: `#E8A857`

**Secundaria — impresion y diplomas**
- Fondo: `#F5F0E8`
- Nombre: `#2A1810`
- Subtitulo: `#8B3A1A`

**Terciaria — materiales fisicos terracota**
- Fondo: `#3A2A1A`
- Nombre: `#D4C4B0`
- Subtitulo: `#C4956A`
- Acento: `#E8A857`

---

## 04 · Uso correcto

### Lo que protege la marca

**Correcto:**
- Usar el simbolo siempre con el punto dorado al final del tallo
- Usar Cormorant Garamond para el nombre "Resonantia"
- Mantener el espacio de proteccion libre de otros elementos
- Usar solo las combinaciones de color aprobadas
- El simbolo puede usarse solo en contextos donde la marca ya es reconocible
- Fondo oscuro como uso principal — fondo claro como uso secundario

**Incorrecto:**
- Rotar el simbolo — siempre vertical, ramas arriba
- Usar el simbolo sin el punto dorado
- Cambiar los colores del simbolo (nunca gris, azul ni negro)
- Usar blanco puro `#FFFFFF` ni negro puro `#000000` como fondo
- Estirar o deformar el simbolo
- Usar "Resonantia" en fuente diferente a Cormorant o su alternativa aprobada
- Aplicar efectos: sombra, resplandor, degradado sobre el simbolo

---

## 05 · Sub-marca — Relacion con el Instituto

Resonantia es una sub-marca del Instituto Centrobioenergetica. Tiene identidad visual propia pero comparte el paraguas institucional.

**Como aparece el Instituto:**
- Como credito en el pie de pagina: "Instituto Centrobioenergetica"
- En diplomas y certificados: co-firma institucional
- Nunca compite visualmente con Resonantia en el mismo elemento

**Colores del Instituto — solo en co-branding:**

| Color | HEX | Cuando usarlo |
|---|---|---|
| Terracota Instituto | `#B5604A` | Diplomas co-firmados, credenciales |
| Verde Salvia | `#8FA87A` | Mismo contexto anterior |
| Dorado compartido | `#E8A857` | Compartido con Resonantia |

Estos colores no aparecen en materiales propios de Resonantia — solo cuando Resonantia aparece como programa del Instituto.

---

## 06 · Archivos y entregables

| Archivo | Formato | Uso |
|---|---|---|
| `resonantia-logo.svg` | SVG | Master — editable en cualquier programa |
| `brandbook.html` | HTML | Referencia visual interactiva |
| `brandbook.md` | MD | Este documento — referencia de texto |

**Fuentes disponibles en Google Fonts:**
- Cormorant Garamond: `fonts.google.com/specimen/Cormorant+Garamond`
- Jost: `fonts.google.com/specimen/Jost`

---

*Dr. Miguel Ojeda Rios · Instituto Centrobioenergetica · Resonantia v1.0 · Abril 2026*
*Este documento es la referencia oficial de identidad visual de Resonantia.*
