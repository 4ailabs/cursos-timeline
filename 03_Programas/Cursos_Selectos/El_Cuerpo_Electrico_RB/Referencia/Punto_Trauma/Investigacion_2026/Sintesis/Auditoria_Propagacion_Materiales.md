# Auditoría de propagación a materiales de entrega

> Verifica que las correcciones al corpus lleguen a lo que ve el público (slides, manuales, guiones,
> decks). Editor en jefe, julio 2026. Complementa `Sintesis_Oleada1.md` y `Sintesis_Oleada2.md`.

## Qué estaba contaminado y qué se hizo

| Material | Error | Estado |
|---|---|---|
| `Punto_Trauma/*.md` (5 docs del corpus) | 🔴 factuales + 🟡 matices | ✅ Corregido (fuente) |
| `Guion_Wellkitt_Punto_Trauma.md` | mV, pH | ✅ Corregido |
| `Slides_Wellkitt/slides_wellkitt_punto_trauma.html` | Castello 2023, "10-15 mV", "único órgano" | ✅ Corregido (fuente HTML) |
| `Manual_de_Trabajo/Modulo_1_Bloque_2_...md` (fuente) | Castello 2023 (prosa L84 + ref L307) | ✅ Corregido + salvedad Fe-S |
| `Manual_de_Trabajo/*.html` (9 compilados) | Castello 2023 (cita fabricada) | ✅ Stopgap: cita reemplazada por Usselman 2016. **Pendiente re-exportar** para heredar la salvedad de prosa. |
| `bloque2/3/4_deck.html` (decks fuente) | — | ✅ Limpios (sin errores) |
| `bloque4_deck_standalone.html` | (falso positivo REM en base64) | ✅ Limpio |

## Pendiente de REGENERACIÓN (derivados que no auto-actualizan)

1. **9 manuales HTML** (`Manual_de_Trabajo/*.html`): la cita ya está parchada, pero la prosa del mecanismo Fe-S sigue en su versión vieja. Re-exportar desde `Modulo_1_Bloque_2_El_Instrumento_y_el_Sustrato.md` corregido. No hay script de build → es re-exportación manual.
2. **Slides_Wellkitt exports**: `export_slides/*.png` y `Bases_RB_y_Punto_Trauma.key` (Keynote) son downstream del HTML corregido. Re-ejecutar `exportar_slides_wellkitt.js` y/o `exportar_a_keynote.applescript`.
3. **Decks standalone**: solo si se editan los decks fuente (ahora limpios) — `node build_bloque3_standalone.mjs` / `build_bloque4_standalone.mjs`.

## Fuera de alcance (señalado, no tocado)

"Ojeda Ríos" con acento persiste en materiales de OTROS proyectos: `Marca_Visual/Webinar/render_*.js` y `Referencia/Modelo_Ojo_Adaptativo/.../Paper_El_Ojo_Adaptativo.tex`. Corregir en su propia tarea.

---

*Instituto Centrobioenergetica, 2026.*
