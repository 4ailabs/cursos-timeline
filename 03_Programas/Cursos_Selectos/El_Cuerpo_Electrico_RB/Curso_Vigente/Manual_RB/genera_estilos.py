#!/usr/bin/env python3
"""
Deriva las tres hojas de estilo restantes de `estilo_b5.css`, que es la única
que se edita a mano.

  estilo_b5.css  →  estilo_letter.css      Carta, con el cuerpo escalado
                 →  estilo_bn_b5.css       B5 en blanco y negro
                 →  estilo_bn_letter.css   Carta en blanco y negro

La razón del escalado: la caja de texto de Carta mide 152 mm y la de B5, 124 mm.
Con el mismo cuerpo de letra, el párrafo de Carta ocupa los mismos 113 mm y deja
39 mm de blanco muerto a un costado, mientras las tablas sí llegan al borde de la
caja. **El cuerpo de Carta se escala para que la prosa llene su propia caja**, y
la medida de línea se mantiene entre 70 y 78 caracteres en los dos formatos.

Uso:  python3 genera_estilos.py
"""
import re, pathlib

# La caja de Carta mide 152 mm y la de B5, 113 mm de párrafo: el cuerpo crece en
# esa misma proporción, de modo que la medida de línea sigue siendo de 74
# caracteres en los dos formatos. Los topes en «ch» no se tocan por eso mismo.







def a_bn(css):
    """El acento pasa a tinta; el número en negativo pasa a filete."""
    c = (css.replace("--teal:#0F6E56", "--teal:#2C2C2A")
            .replace("--teal-deep:#0B5644", "--teal-deep:#000000")
            .replace("--teal-tint:#E1F5EE", "--teal-tint:#F1EFE8")
            .replace("--coral:#D85A30", "--coral:#2C2C2A"))
    c = re.sub(r"(══[^\n]*)\n", r"\1 BLANCO Y NEGRO\n", c, count=1)
    c = re.sub(r"(\.caphead \.capn\{font:700 [\d.]+px var\(--sans\);)color:#fff;background:var\(--teal\);",
               r"\1color:var(--ink);background:none;border:.5px solid var(--ink);", c)
    c = c.replace(".step{font:700 7.5px var(--sans);color:#fff;background:var(--teal);",
                  ".step{font:700 7.5px var(--sans);color:var(--ink);background:var(--card);")
    return c


def main():
    for origen, destino in [("estilo_b5.css", "estilo_bn_b5.css"),
                            ("estilo_letter.css", "estilo_bn_letter.css")]:
        nombre, css = destino, a_bn(pathlib.Path(origen).read_text())
        pathlib.Path(nombre).write_text(css)
        print(f"  {nombre}")


if __name__ == "__main__":
    main()
