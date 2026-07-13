# Guía de construcción — Manual «El nodo de lesión»
### Handoff para continuar la maquetación (Regulación Bioeléctrica · Instituto Centrobioenergetica)

> **Para quién es este documento.** Para el agente (o persona) que continúe construyendo el manual operativo impreso de la técnica del **nodo de lesión**. Recoge las decisiones ya tomadas, las reglas de marca, el sistema de diseño, el flujo de trabajo «por partes» y el pipeline técnico. **Léelo entero antes de tocar nada** — evita repetir la larga iteración de diseño que ya se resolvió.

---

## 0. Qué estamos haciendo y en qué punto va

- **Producto:** manual operativo **impreso B5 (176 × 250 mm)** que enseña la técnica del **nodo de lesión** (rastreo de simetría de piernas + colocación de imanes N/S sobre el cuerpo: corrección renal, riñón-parietal, dipolos por zona, rejilla, cierre).
- **Fuente de contenido (verdad clínica):** `Protocolo_Clinico_Tecnica_Trauma_RB.md` (procedimiento confirmado por el autor) y `Documento_Fundacional_Punto_Trauma_2026.md`. La investigación crítica está en `Investigacion_2026/`.
- **Dos versiones en paralelo** (el autor las quiere ambas): **Monografía** (Georgia serif, libro) e **Instrumento** (Georgia + datos en mono, técnico).
- **Estado:** Portada (pág. 01) hecha y aprobada, a tamaño real en el Artifact de preview. Plantilla de maniobra resuelta (`Muestra_Brand_Monografia_v2.html`). Falta el resto de páginas (ver §11).

---

## 1. Marca y armonización institucional (CRÍTICO)

Hay **dos marcas deliberadamente distintas**. NO se fusionan. Fuente: `Marca_Visual/Branding_RB_2026/Manual_de_Marca_RB_2026.md` y `Marca_Visual/Relacion_con_Marca_Institucional.md`.

| | **Regulación Bioeléctrica** (el manual) | **Instituto Centrobioenergetica** (casa madre) |
|---|---|---|
| Símbolo | **Dipolo**: dos círculos + línea; 2º nodo al **35%** de opacidad | 12 círculos en órbita + punto dorado |
| Paleta | **Teal `#0F6E56`** | Terracota `#B5604A` · Salvia `#8FA87A` · Dorado `#E8A857` |
| Tipografía | **Georgia** (serif) | Helvetica Neue |
| Assets | `Marca_Visual/Branding_RB_2026/svg/` | `01_Instituto/Identidad/logo/` (referenciar, **no duplicar**) |

**Regla de armonización:** el manual es material de programa → **manda RB** (teal, dipolo, Georgia). El Instituto aparece SOLO por jerarquía: (a) **línea de endorsement al pie** `INSTITUTO CENTROBIOENERGETICA` (Georgia, gris `#888780`, versalita, tracking amplio) en cada página; (b) **colofón/créditos al final** con el logo real del Instituto como emisor. Co-branding pleno (dos logos) solo en el **certificado**, nunca en el cuerpo del manual. **Nunca** meter terracota/dorado/Helvetica en el manual.

### Paleta RB (hex exactos)
- Teal `#0F6E56` (acento único) · Teal profundo `#0B5644` · Teal claro `#E1F5EE` (fondos de badge)
- Tinta (negro cálido) `#2C2C2A` · Texto suave `#4A4643` · Gris terciario `#888780`
- Papel `#FCFBF7` · Línea `#DEDBD2` · Gris claro `#F1EFE8`
- **Coral `#D85A30`** = SOLO alertas/hallazgos. Nunca decorativo.
- Regla del logo: un solo color a la vez; la única variación es la opacidad 35% del 2º nodo.

---

## 2. El sistema de diseño (a qué se llegó tras mucha iteración)

Ambas versiones comparten:
- **B5, columna ÚNICA** (el autor rechazó explícitamente las dos columnas).
- Márgenes **usables**, NO el canon de Tschichold puro (era demasiado generoso: hacía desbordar a 2 páginas). Usar ~`16mm 20mm 14mm 20mm` (sup/der/inf/izq) y ajustar para que **quepa en 1 página** (ver §7 guardarraíl).
- Jerarquía por **versalitas + espaciado + tamaño**, no por negritas gritonas ni color.
- **Un solo tinte funcional** (teal). Coral solo alertas.
- **El marcador de polo ES el dipolo de la marca**: nodo denso teal (S, se coloca primero) + nodo tenue 35% (N), unidos por línea. Aparece SOLO en la figura, no repartido por el texto (el autor dijo que los «cuadritos» N/S en el texto confunden → en prosa se escribe «polo positivo (Sur)» con palabras).

**Monografía:** Georgia en todo; título serif grande; *abstract* en cursiva con filete teal; secciones `I · II · III`.
**Instrumento:** Georgia en cuerpo + **monoespaciada** para datos (`≥ 20 min`, `0.1–0.5 T`, `M-01`); doble regla teal bajo el título; `FIG.`/`Tabla` en mono; secciones `01 · 02 · 03`.

---

## 3. Reglas anti-«chafa» / anti-IA (no romper)

Lo que hacía ver el diseño amateur/genérico (aprendido a las malas):
- ❌ Márgenes simétricos + texto a todo el ancho + jerarquía por negrita/azul.
- ❌ Cajas rellenas con barrita de color lateral (el cliché más delator).
- ❌ Serif crema + terracota (el look «IA» por defecto).
- ❌ Emojis como marcadores de sección; todo centrado; `rounded-lg` por todos lados.
- ❌ Sombras, gradientes, 3D, «glow», stock médico, puntas de flecha abiertas estilo UI.
- ✅ Medida de línea ~64 caracteres; aire intencional; hairlines finas; un solo acento; line-art plano.

---

## 4. Especificaciones B5

- **Página:** `width:176mm; height:250mm; @page{size:176mm 250mm; margin:0}`.
- **Tamaño de imagen ideal (para el lector, a 300 dpi):**
  | Rol | Ancho | Alto | Proporción | px mínimos |
  |---|---|---|---|---|
  | Figura hero (colocación/escena) | 110–120 mm | 70–85 mm | 3:2 ó 4:3 | ≥ 1400 (ideal 2000+) |
  | Figura de paso / inset | 55–60 mm | 45–55 mm | 1:1 ó 4:3 | ≥ 700 (ideal 1200) |
  | Signo de concepto (SVG) | 22–26 mm | — | — | vector |
  | Apertura a sangre | 176 mm (+5 mm bleed) | var. | — | ≥ 2100 |
- **Vector vs raster:** logo, dipolo, marcador clínico, diagramas de concepto, árbol de decisión → **SVG** (nítido siempre, no pierde precisión). Escenas realistas (paciente en camilla, talones, torso) → **raster** (Nano Banana 2 / GPT Images) a ≥300 dpi, **estilo fijo** (una receta de prompt: ilustración editorial, tinta teal sobre papel cálido, plana, sin sombras) para que todas combinen. Generar la anatomía SIN imanes y superponer el dipolo SVG encima.

> **Sistema visual completo (norma única):** `Sistema_Visual_SVG_Iconos_Prompts.md` — directriz de SVG, set de iconos funcionales y sistema de prompts IA (línea editorial). Consultarlo antes de dibujar cualquier vector o generar cualquier imagen.

### Estilo de figuras (de la investigación de estilo)
- Silueta corporal: line-art, contorno tinta `#2C2C2A` a **1.25 pt**, relleno `#F1EFE8`; reparos (columna, riñones) en gris `#888780` a **0.75 pt**. `stroke-linejoin/linecap: round`. Vistas canónicas fijas (prono-superior, lateral, talones) reutilizadas.
- Marcador de imán = el **dipolo** apoyado sobre un reparo anatómico, con etiqueta corta al lado (convención WHO de acupuntos). Nunca flotando.
- Medición de talones: encuadre cerrado, línea de referencia gris discontinua, cota en **coral** solo si hay dato real (no inventar cifras).
- Número de paso: círculo teal Ø5 mm, dígito blanco. Flecha: punta triangular cerrada, teal 1 pt.

### Bloque de idea = «tríptico del mecanismo» (de la investigación de conceptos)
Banda abierta con **filete teal 0.5 pt arriba** (sin caja, sin barrita). Secuencia obligatoria:
1. **Eyebrow** versalitas teal («QUÉ ESTÁ PASANDO»).
2. **Titular-idea**: una frase **declarativa** (Georgia ~13 pt bold). Ej.: «El riñón fija el voltaje de referencia del cuerpo» — NO una etiqueta tipo «Fundamento fisiológico».
3. **Gráfico mínimo** (line-art teal ~24 mm) si el concepto lo pide (isla, set point, nodo regulador, dipolo). Léxico fijo: isla = nodo gris con líneas cortadas; nodo regulador = nodo teal grueso del que salen líneas; set point = línea + marca + flecha de retorno.
4. **3 líneas de por qué** (gris cálido). Nunca repiten el titular.

---

## 5. Terminología (rector)

- **«Nodo de lesión»**, NO «punto trauma» ni «técnica del trauma». El Tratado renombró el «punto trauma» → **nodo de lesión** (una sola zona despolarizada = un nodo/polo; al rastrearla forma un dipolo con su complementario, local o renal). Fuente: `Curso_Vigente/Manual_de_Trabajo/Modulo_1_Bloque_4_El_Rastreo_y_el_Nodo_de_Lesion.md` §6.
- Convenciones del proyecto (memoria): «microambiente tisular» (no «terreno»); Vmem primario / pH derivado; nombre del autor **«Ojeda Rios» sin acento**.
- **Polaridad confirmada por el autor:** negativo = **Norte**; positivo = **Sur**. Cara negativa a la piel en general; **excepción**: corrección renal empieza con el positivo (cara positiva a la piel).

---

## 6. Flujo de trabajo «por partes» (para no cometer errores de jalón)

El autor insistió: nada de hacer las 15 páginas de un tirón. Proceso:
1. **Sistema primero:** tokens y componentes en un CSS/plantilla compartida; cada página es un archivo chico que lo usa.
2. **Una página a la vez**, en orden: Portada → Índice → Montaje → Medición → Árbol de decisión → Maniobras 1–4 → Cierre → Ficha → Tarjeta de referencia → Colofón.
3. Para cada página: construir → renderizar (PNG) → **medir que cabe en 1 página B5** → aprobar → agregar al Artifact de preview (misma URL) → siguiente.
4. Se hace en **las dos versiones** (Monografía + Instrumento).

### GUARDARRAÍL: medir que cabe en 1 página (evita el «se ve muy largo»)
Generar PDF y contar páginas. Si `/Count` > 1, el contenido desborda → compactar (márgenes, figura, interlineado) hasta `/Count 1`.
```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=out.pdf "file://$PWD/PAGINA.html"
grep -a -o "/Count [0-9]*" out.pdf | head -1      # debe decir /Count 1
grep -a -o "/MediaBox \[[^]]*\]" out.pdf | sort -u # debe ser [0 0 498.96 708.96] = B5
```

### Render a PNG para revisión visual
```bash
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=2 \
  --window-size=720,1040 --screenshot=out.png "file://$PWD/PAGINA.html"
```
Luego `Read` el PNG para verlo. (El PNG que genera headless Chrome respeta la proporción B5.)

---

## 7. Pipeline de salida (impresión)

- **Preview a tamaño real** para el autor: **Artifact** (`Preview_Manual_RB.html`), cada hoja como bloque `176mm × 250mm`. Crece página por página; se redeploya a la MISMA URL (republicar el mismo file_path). *No usa Paged.js* (el CSP del Artifact bloquea scripts externos) — solo muestra páginas estáticas a escala real.
- **Justificado + sin viudas/huérfanas + flujo automático a la otra hoja + crop marks:** montar **Paged.js** en los archivos LOCALES (no en el Artifact). CSS: `widows:2; orphans:2; break-inside:avoid` (figuras/tablas/bloques de idea), `break-after` para forzar página, `@page{size:176mm 250mm; bleed:5mm; marks:crop cross}` para cortar B5 desde A4/A3. Running heads con `string-set`/`string()`, folio al margen exterior. Referencias: `pagedjs/pagedjs`, `electricbookworks/paged-design`, classicthesis (proporciones), tufte-css (marginalia).
- **Formato de salida final:** decisión pendiente del autor (Paged.js con crop marks vs PDF simple). Decidir al final.

---

## 8. Inventario de archivos (en `Referencia/Punto_Trauma/`)

- `Manual_Pagina_01_Portada.html` — Portada aprobada (1 pág B5).
- `Preview_Manual_RB.html` — Artifact de preview a tamaño real (crece por partes). URL: https://claude.ai/code/artifact/73bfe2c2-c7ae-4872-acb4-6dc2ab4b6239
- `Muestra_Brand_Monografia_v2.html` — plantilla de MANIOBRA (Monografía) con figura dipolo + tríptico, compactada a 1 pág. **Base para las 4 maniobras.**
- `Muestra_Brand_Instrumento.html` — versión Instrumento (falta aplicarle el tríptico + figura v2).
- Muestras de exploración (histórico, NO usar como base): `Muestra_Diseno_Manual*.html` v1–v8 (iteraciones descartadas), `Muestra_Brand_Monografia.html` (v1).
- Contenido/verdad clínica: `Protocolo_Clinico_Tecnica_Trauma_RB.md`, `Documento_Fundacional_Punto_Trauma_2026.md`, `Nodo_de_Lesion_Nodos_Reguladores.md`.

---

## 9. Investigación de referencia (dossiers de agentes, en `Investigacion_2026/`)

Los briefs de diseño (europeo, plantillas pro, estilo de figuras, diseño de conceptos) se generaron con agentes y sus conclusiones están resumidas arriba (§2–§4). Referencias clave: canons de página (Tschichold/Van de Graaf), classicthesis/Bringhurst, Isotype (Neurath), Netter (vistas canónicas), WHO acupoint locations, kinesiotape (secuencia), FDA IFU (numeración/verbo de acción), Tufte (marginalia), graphical abstracts de Cell (idea de un vistazo), Teenage Engineering/Braun (registro instrumento).

---

## 10. Pendientes (orden sugerido)

1. Colofón / créditos con logo del Instituto (cierra el tema branding).
2. Índice / ruta del manual.
3. Montaje + Medición (con slot de imagen de talones).
4. Árbol de decisión (SVG de flujo, on-brand).
5. Maniobras 1–4 (sobre la plantilla de maniobra) — aplicar también el tríptico + figuras.
6. Cierre e integración · Ficha de registro (formulario) · Tarjeta de referencia.
7. Aplicar todo a la **versión Instrumento** en paralelo.
8. Montar Paged.js para la salida de impresión final.
9. (Aparte) Alinear los documentos previos que aún dicen «punto trauma»/«técnica del trauma» → «nodo de lesión».

---

*Instituto Centrobioenergetica, 2026 · Documento de handoff — actualizar conforme avance el manual.*
