# Cómo se construye la edición carta de la Parte I

**La fuente única es `01_Parte_I_Fundamento_y_Rastreo.md`.** Todo lo demás se genera.

```bash
python3 conv.py        # markdown → cuerpo.html, con las clases del sistema visual
python3 figuras.py     # coloca las tres figuras SVG en cuerpo.html
python3 build2.py      # arma portada, portadilla, índice y hojas → hojas.html
cat cabeza_final.html hojas.html paginador.html > Manual_RB_Parte_I_Carta.html
printf '\n</div>\n' >> Manual_RB_Parte_I_Carta.html
```

Los scripts esperan `cuerpo.html` y `hojas.html` en su misma carpeta, y `conv.py` lee el
markdown de la ruta escrita en su primera línea — ajustarla si el archivo se mueve.

**El PDF**, desde el HTML ya armado:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new \
  --disable-gpu --no-pdf-header-footer --virtual-time-budget=10000 \
  --print-to-pdf="Manual_RB_Parte_I_Carta.pdf" "file://$PWD/Manual_RB_Parte_I_Carta.html"
```

**Qué hace cada pieza**

| Archivo | Qué es |
|---|---|
| `cabeza_final.html` | La hoja de estilos completa: paleta teal, escala de `estilo_letter.css`, tema claro y oscuro, impresión |
| `conv.py` | Convierte el markdown y clasifica cada tabla (rótulo, texto, numeral) para su reparto de columnas |
| `figuras.py` | Las tres figuras a línea: el circuito del voltaje, el conjunto magnético y la rejilla |
| `build2.py` | Portada, portadilla con los bloques, índice en dos hojas, y una hoja por capítulo |
| `paginador.html` | Al abrir, parte las hojas a 279 mm con las reglas editoriales —subtítulos, referencias y listas nunca huérfanos, ninguna continuación menor a 35 mm—, renumera folios y corrige el índice |

**El artifact publicado** vive en https://claude.ai/code/artifact/1824f58c-3d29-4242-9085-51f16e39d0b9
y se actualiza republicando el HTML desde la conversación que lo creó.

Cada corrección de texto se hace en el markdown y se reconstruye; el HTML y el PDF nunca se
editan a mano.
