const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, PageBreak, PageNumber, LevelFormat, TabStopType, TabStopPosition
} = require("docx");

// ─── COLOR PALETTE ───
const C = {
  primary: "1B4F72",
  accent: "2E86C1",
  green: "1E8449",
  yellow: "F39C12",
  red: "C0392B",
  orange: "E67E22",
  purple: "7D3C98",
  light: "EBF5FB",
  lightGreen: "EAFAF1",
  lightYellow: "FEF9E7",
  lightRed: "FDEDEC",
  lightPurple: "F4ECF7",
  lightOrange: "FDF2E9",
  gray: "F2F3F4",
  darkGray: "566573",
  white: "FFFFFF",
  black: "1C2833",
};

// ─── BORDERS ───
const noBorder = { style: BorderStyle.NONE, size: 0 };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };
const thinBorder = { style: BorderStyle.SINGLE, size: 1, color: "D5D8DC" };
const thinBorders = { top: thinBorder, bottom: thinBorder, left: thinBorder, right: thinBorder };

// ─── HELPERS ───
const W = 9360;

function spacer(h = 200) {
  return new Paragraph({ spacing: { after: h }, children: [] });
}

function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

function p(t, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after || 120 },
    alignment: opts.align || AlignmentType.LEFT,
    children: [new TextRun({ text: t, font: "Arial", size: opts.size || 22, bold: opts.bold, color: opts.color || C.black, italics: opts.italics })]
  });
}

function multiP(runs, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after || 120 },
    alignment: opts.align || AlignmentType.LEFT,
    children: runs.map(r => new TextRun({ text: r.text, font: "Arial", size: r.size || 22, bold: r.bold, color: r.color || C.black, italics: r.italics }))
  });
}

function h1(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(text)] });
}

function h2(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(text)] });
}

function h3(text) {
  return new Paragraph({
    spacing: { before: 200, after: 120 },
    children: [new TextRun({ text, font: "Arial", size: 24, bold: true, color: C.accent })]
  });
}

function headerCell(txt, width, color = C.primary) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    borders: thinBorders,
    shading: { fill: color, type: ShadingType.CLEAR },
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    children: [new Paragraph({ children: [new TextRun({ text: txt, font: "Arial", size: 20, bold: true, color: C.white })] })]
  });
}

function cell(txt, width, opts = {}) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    borders: thinBorders,
    shading: opts.fill ? { fill: opts.fill, type: ShadingType.CLEAR } : undefined,
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    verticalAlign: "center",
    rowSpan: opts.rowSpan,
    children: [new Paragraph({
      alignment: opts.align || AlignmentType.LEFT,
      children: [new TextRun({ text: txt, font: "Arial", size: opts.size || 20, bold: opts.bold, color: opts.color || C.black, italics: opts.italics })]
    })]
  });
}

function multiCell(runs, width, opts = {}) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    borders: thinBorders,
    shading: opts.fill ? { fill: opts.fill, type: ShadingType.CLEAR } : undefined,
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    rowSpan: opts.rowSpan,
    verticalAlign: opts.vAlign || "center",
    children: [new Paragraph({
      alignment: opts.align || AlignmentType.LEFT,
      children: runs.map(r => new TextRun({ text: r.text, font: "Arial", size: r.size || 20, bold: r.bold, color: r.color || C.black, italics: r.italics }))
    })]
  });
}

function multiParaCell(paragraphs, width, opts = {}) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    borders: opts.noBorders ? noBorders : thinBorders,
    shading: opts.fill ? { fill: opts.fill, type: ShadingType.CLEAR } : undefined,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    rowSpan: opts.rowSpan,
    verticalAlign: opts.vAlign || "top",
    children: paragraphs
  });
}

function bulletItem(txt, ref = "bullets", level = 0) {
  return new Paragraph({
    numbering: { reference: ref, level },
    spacing: { after: 60 },
    children: [new TextRun({ text: txt, font: "Arial", size: 22 })]
  });
}

function boldBullet(boldPart, normalPart, ref = "bullets") {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    spacing: { after: 60 },
    children: [
      new TextRun({ text: boldPart, font: "Arial", size: 22, bold: true }),
      new TextRun({ text: normalPart, font: "Arial", size: 22 })
    ]
  });
}

function sectionDivider(title, color = C.primary) {
  return new Paragraph({
    spacing: { before: 300, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: color, space: 4 } },
    children: [new TextRun({ text: title.toUpperCase(), font: "Arial", size: 28, bold: true, color: color })]
  });
}

function accentBox(title, bodyLines, fillColor = C.light, borderColor = C.accent) {
  const children = [];
  if (title) {
    children.push(new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: title, font: "Arial", size: 24, bold: true, color: borderColor })] }));
  }
  if (typeof bodyLines === "string") {
    children.push(new Paragraph({ children: [new TextRun({ text: bodyLines, font: "Arial", size: 21, color: C.darkGray })] }));
  } else {
    bodyLines.forEach(line => {
      if (typeof line === "string") {
        children.push(new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: line, font: "Arial", size: 21, color: C.darkGray })] }));
      } else {
        children.push(new Paragraph({ spacing: { after: 60 }, children: line.map(r => new TextRun({ text: r.text, font: "Arial", size: r.size || 21, bold: r.bold, color: r.color || C.darkGray, italics: r.italics })) }));
      }
    });
  }
  return new Table({
    width: { size: W, type: WidthType.DXA },
    columnWidths: [W],
    rows: [new TableRow({
      children: [new TableCell({
        width: { size: W, type: WidthType.DXA },
        borders: { top: { style: BorderStyle.SINGLE, size: 8, color: borderColor }, bottom: thinBorder, left: thinBorder, right: thinBorder },
        shading: { fill: fillColor, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 200, right: 200 },
        children
      })]
    })]
  });
}

// Numbering
const numberingConfig = {
  config: [
    {
      reference: "bullets",
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: "\u2022",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } }
      }, {
        level: 1, format: LevelFormat.BULLET, text: "\u25E6",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 1440, hanging: 360 } } }
      }]
    },
    {
      reference: "numbers",
      levels: [{
        level: 0, format: LevelFormat.DECIMAL, text: "%1.",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } }
      }]
    }
  ]
};

// ═══════════════════════════════════════════
// BUILD DOCUMENT
// ═══════════════════════════════════════════
const children = [];

// ══════════ COVER PAGE ══════════
children.push(spacer(1800));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 200 },
  children: [new TextRun({ text: "INSTITUTO CENTROBIOENERGETICA", font: "Arial", size: 40, bold: true, color: C.primary })]
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 100 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: C.accent, space: 8 } },
  children: [new TextRun({ text: "Dr. Miguel Ojeda Rios", font: "Arial", size: 26, color: C.darkGray, italics: true })]
}));
children.push(spacer(300));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 100 },
  children: [new TextRun({ text: "PROPUESTA ESTRATEGICA 2026", font: "Arial", size: 56, bold: true, color: C.primary })]
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 200 },
  children: [new TextRun({ text: "Reestructuracion Integral del Catalogo de Cursos", font: "Arial", size: 32, color: C.accent })]
}));
children.push(spacer(200));

// Cover highlights
const coverHighlights = [
  ["Problema:", " 26 cursos independientes sin ruta de progresion + alumnos reciclados"],
  ["Solucion:", " 10 programas integrados x 3 niveles de profundidad"],
  ["Resultado:", " Escalera de valor desde $97 hasta $2,000 USD por programa"],
  ["Impacto:", " Nuevas audiencias masivas + retencion de veteranos + formacion profesional"],
];
coverHighlights.forEach(([bold, normal]) => {
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
    children: [
      new TextRun({ text: bold, font: "Arial", size: 24, bold: true, color: C.primary }),
      new TextRun({ text: normal, font: "Arial", size: 24, color: C.darkGray }),
    ]
  }));
});

children.push(spacer(1200));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "Documento de trabajo para el equipo | Marzo 2026", font: "Arial", size: 20, color: C.darkGray, italics: true })]
}));

// ══════════ PAGE 2: INDICE ══════════
children.push(pageBreak());
children.push(sectionDivider("Contenido del Documento"));
children.push(spacer(100));

const tocItems = [
  ["1.", "Resumen Ejecutivo"],
  ["2.", "Diagnostico: El Problema de los Alumnos Reciclados"],
  ["3.", "Soluciones al Problema de Reciclados"],
  ["4.", "Analisis de los 26 Cursos Actuales"],
  ["5.", "Pares Serializados: Cursos Encadenados (Parte 1 + Parte 2)"],
  ["6.", "Los 10 Programas Integrados (detalle completo)"],
  ["7.", "Los 3 Niveles de Profundidad"],
  ["8.", "Desglose Nivel por Nivel para Cada Programa"],
  ["9.", "Analisis de Potencial por Programa (5 dimensiones)"],
  ["10.", "Mapa Completo: Los 26 Cursos y Donde Vive Cada Uno"],
  ["11.", "Elementos Transversales: Par Biomagnetico y Electivos"],
  ["12.", "Plan de Lanzamiento por Fases"],
  ["13.", "Estrategia de Precios y Proyeccion de Ingresos"],
  ["14.", "Proximos Pasos"],
];

tocItems.forEach(([num, title]) => {
  children.push(new Paragraph({
    spacing: { after: 100 },
    children: [
      new TextRun({ text: `${num}  ${title}`, font: "Arial", size: 24, color: C.primary }),
    ]
  }));
});

// ══════════ SECTION 1: RESUMEN EJECUTIVO ══════════
children.push(pageBreak());
children.push(sectionDivider("1. Resumen Ejecutivo"));
children.push(spacer(80));

children.push(p("Este documento presenta la propuesta de reestructuracion estrategica del catalogo de cursos del Instituto Centrobioenergetica. Se basa en un analisis completo de los 26 cursos actuales, los desafios identificados por el Dr. Miguel Ojeda Rios, y las oportunidades de crecimiento del mercado."));
children.push(spacer(60));

children.push(h3("La situacion actual"));
children.push(p("El Instituto cuenta con 26 cursos independientes, impartidos principalmente por el Dr. Ojeda Rios, con 13 anos de trayectoria y mas de 2,800 terapeutas formados. Sin embargo, el catalogo actual enfrenta cuatro problemas criticos:"));
children.push(boldBullet("Sin ruta de progresion: ", "Los cursos son independientes. El alumno no sabe que tomar despues ni hacia donde va."));
children.push(boldBullet("Alumnos reciclados: ", "Veteranos que repiten cursos, ocupan lugares de nuevos y no avanzan en su formacion."));
children.push(boldBullet("Techo de precio: ", "Cada curso se vende individualmente. No hay escalera de valor que permita ingresos recurrentes por alumno."));
children.push(boldBullet("Dependencia del fundador: ", "Todo depende del Dr. Ojeda como unico docente. No hay modelo escalable."));
children.push(spacer(80));

children.push(h3("La solucion propuesta"));
children.push(p("Reorganizar los 26 cursos en 10 programas tematicos, cada uno con 3 niveles de profundidad, creando una escalera de valor clara desde el publico general hasta la formacion profesional."));
children.push(spacer(60));

const resumenTable = new Table({
  width: { size: W, type: WidthType.DXA },
  columnWidths: [3120, 3120, 3120],
  rows: [
    new TableRow({ children: [
      headerCell("ANTES", 3120, C.red),
      headerCell("", 3120, C.darkGray),
      headerCell("DESPUES", 3120, C.green),
    ]}),
    new TableRow({ children: [
      cell("26 cursos independientes", 3120, { fill: C.lightRed }),
      cell(">>>", 3120, { align: AlignmentType.CENTER, bold: true, color: C.accent }),
      cell("10 programas integrados", 3120, { fill: C.lightGreen, bold: true }),
    ]}),
    new TableRow({ children: [
      cell("Un solo nivel", 3120, { fill: C.lightRed }),
      cell(">>>", 3120, { align: AlignmentType.CENTER, bold: true, color: C.accent }),
      cell("3 niveles de profundidad", 3120, { fill: C.lightGreen, bold: true }),
    ]}),
    new TableRow({ children: [
      cell("Precio unico por curso", 3120, { fill: C.lightRed }),
      cell(">>>", 3120, { align: AlignmentType.CENTER, bold: true, color: C.accent }),
      cell("Escalera $97 a $2,000", 3120, { fill: C.lightGreen, bold: true }),
    ]}),
    new TableRow({ children: [
      cell("Alumnos reciclados sin ruta", 3120, { fill: C.lightRed }),
      cell(">>>", 3120, { align: AlignmentType.CENTER, bold: true, color: C.accent }),
      cell("Mentores y facilitadores", 3120, { fill: C.lightGreen, bold: true }),
    ]}),
    new TableRow({ children: [
      cell("Solo para terapeutas", 3120, { fill: C.lightRed }),
      cell(">>>", 3120, { align: AlignmentType.CENTER, bold: true, color: C.accent }),
      cell("Nivel 1 para todo publico", 3120, { fill: C.lightGreen, bold: true }),
    ]}),
    new TableRow({ children: [
      cell("Sin embudo de conversion", 3120, { fill: C.lightRed }),
      cell(">>>", 3120, { align: AlignmentType.CENTER, bold: true, color: C.accent }),
      cell("Funnel N1>N2>N3 automatico", 3120, { fill: C.lightGreen, bold: true }),
    ]}),
  ]
});
children.push(resumenTable);

children.push(spacer(100));
children.push(h3("Cifras clave de la propuesta"));
children.push(boldBullet("26 cursos ", "reorganizados (ningun curso queda fuera)"));
children.push(boldBullet("10 programas tematicos ", "con identidad propia y audiencia definida"));
children.push(boldBullet("3 niveles ", "de profundidad: Vida Consciente ($97-$197), Herramientas de Vida ($497-$797), Formacion Profesional ($1,200-$2,000)"));
children.push(boldBullet("10 pares serializados ", "de cursos encadenados (Parte 1 + Parte 2)"));
children.push(boldBullet("4 soluciones ", "al problema de alumnos reciclados"));
children.push(boldBullet("3 fases de lanzamiento ", "escalonadas en 6 meses"));

// ══════════ SECTION 2: DIAGNOSTICO ══════════
children.push(pageBreak());
children.push(sectionDivider("2. Diagnostico: El Problema de los Alumnos Reciclados"));
children.push(spacer(80));

children.push(p("El Instituto enfrenta un fenomeno comun en escuelas de formacion continua: los alumnos que ya tomaron un curso regresan a tomarlo nuevamente. Este fenomeno, que llamamos \"alumnos reciclados\", tiene implicaciones serias para el crecimiento del Instituto."));
children.push(spacer(80));

children.push(h3("2.1 Que esta pasando"));
children.push(p("Cuando un alumno veterano (que ya tomo el curso 1, 2 o hasta 3 veces) se inscribe nuevamente, ocurren varios problemas simultaneos:"));
children.push(spacer(40));

children.push(boldBullet("Saturacion del grupo: ", "Los veteranos dominan las dinamicas de clase. Conocen las respuestas, anticipan los ejercicios y, sin querer, intimidan a los alumnos nuevos que sienten que \"no estan a su nivel\"."));
children.push(boldBullet("Abandono de nuevos: ", "Los alumnos nuevos que se sienten fuera de nivel no regresan. El Instituto pierde alumnos que podrian haberse convertido en terapeutas formados, simplemente porque la experiencia inicial fue abrumadora."));
children.push(boldBullet("Estancamiento del veterano: ", "El alumno reciclado cree que repetir el curso lo hace \"mejor terapeuta\", pero en realidad esta en un ciclo de sobre-especializacion sin avance real. No explora nuevas tecnicas ni crece."));
children.push(boldBullet("Ingresos planos: ", "El mismo alumno paga el mismo precio por el mismo curso. No hay escalera de valor que lo lleve a invertir mas por su formacion."));
children.push(boldBullet("Dependencia del fundador: ", "Como todos los cursos dependen del Dr. Ojeda, no hay capacidad de escalar. Los veteranos podrian ser parte de la solucion como facilitadores."));
children.push(spacer(80));

children.push(h3("2.2 Por que sucede"));
children.push(p("La raiz del problema es estructural, no de calidad. Los alumnos regresan PORQUE los cursos son buenos, pero no hay un camino claro de progresion. Sin ruta, el alumno solo tiene dos opciones: repetir o irse. Muchos eligen repetir por lealtad y porque disfrutan la experiencia."));
children.push(spacer(40));
children.push(p("El catalogo actual tiene 26 cursos independientes. No hay niveles, no hay prerrequisitos, no hay \"siguiente paso\". Es como una biblioteca sin indice: el contenido es valioso pero el alumno no sabe que leer despues."));

// ══════════ SECTION 3: SOLUCIONES ══════════
children.push(pageBreak());
children.push(sectionDivider("3. Soluciones al Problema de Reciclados"));
children.push(spacer(80));

children.push(p("Proponemos cuatro soluciones complementarias que, implementadas juntas, resuelven el problema de raiz y convierten a los alumnos reciclados en un activo del Instituto."));
children.push(spacer(60));

children.push(accentBox(
  "Solucion 1: Veterano como Mentor",
  [
    [{ text: "Concepto: ", bold: true }, { text: "Convertir al alumno reciclado en co-facilitador del Dr. Ojeda. En lugar de repetir como alumno, participa con un rol definido dentro del grupo." }],
    [{ text: "Como funciona: ", bold: true }, { text: "El veterano recibe un briefing previo al curso con su rol especifico: apoyo en practicas de parejas, mentorias individuales durante los ejercicios, compartir testimonios vivenciales de sus casos." }],
    [{ text: "Beneficio para el Instituto: ", bold: true }, { text: "Libera al Dr. Ojeda de atender 100% de las practicas. Mejora la ratio instructor-alumno. El veterano se siente valorado y reconocido." }],
    [{ text: "Beneficio para el alumno nuevo: ", bold: true }, { text: "Tiene un \"hermano mayor\" que ya paso por lo mismo. Referente cercano que reduce la intimidacion del experto." }],
    [{ text: "Requisito: ", bold: true }, { text: "Haber completado el curso al menos una vez. Firmar acuerdo de mentor. Recibir guia de mentoria del Instituto." }],
  ]
));
children.push(spacer(100));

children.push(accentBox(
  "Solucion 2: Sistema Doble Linea (Base / Pro)",
  [
    [{ text: "Concepto: ", bold: true }, { text: "Cada curso tiene dos versiones simultaneas: Linea Base para alumnos nuevos y Linea Pro para avanzados. Se imparten en el mismo evento pero con dinamicas diferenciadas." }],
    [{ text: "Linea Base: ", bold: true }, { text: "50% teoria, 30% practica guiada paso a paso, 20% cierre y resolucion de dudas. Ritmo pausado, fundamentos solidos." }],
    [{ text: "Linea Pro: ", bold: true }, { text: "20% actualizacion de contenido nuevo, 60% analisis de casos complejos y practica entre pares, 20% discusion clinica abierta." }],
    [{ text: "Filtro de ingreso: ", bold: true }, { text: "Mini test + autoevaluacion antes de cada curso. El alumno se clasifica segun su experiencia real, no segun cuantas veces pago." }],
    [{ text: "Modelo economico: ", bold: true }, { text: "La Linea Pro tiene precio superior (20-40% mas) porque incluye contenido exclusivo y ratio mas baja de alumnos por instructor." }],
  ],
  C.lightGreen, C.green
));
children.push(spacer(100));

children.push(accentBox(
  "Solucion 3: Versionamiento de Cursos",
  [
    [{ text: "Concepto: ", bold: true }, { text: "En lugar de repetir el mismo curso, se lanza una version actualizada: Bioenergetica V4 con enfoque TAME, por ejemplo. Cada version incorpora los descubrimientos mas recientes del Dr. Ojeda." }],
    [{ text: "Como funciona: ", bold: true }, { text: "Se identifica que ha cambiado en la practica clinica del Dr. Ojeda desde la ultima vez que se impartio el curso. Esas actualizaciones se empaquetan como una nueva version." }],
    [{ text: "Beneficio: ", bold: true }, { text: "El veterano tiene una razon genuina para inscribirse: no es repetir, es ACTUALIZAR. El curso se mantiene fresco y relevante. La comunicacion es clara: esto NO es lo mismo que ya tomaste." }],
    [{ text: "Ejemplo: ", bold: true, color: C.yellow }, { text: "Bioenergetica V4 (con protocolo TAME), Conflictologia 2.0 (con arboles genealogicos energeticos), Par Biomagnetico 2026 (nuevos pares descubiertos).", italics: true }],
  ],
  C.lightYellow, C.yellow
));
children.push(spacer(100));

children.push(accentBox(
  "Solucion 4: Mapa de Formacion Visual",
  [
    [{ text: "Concepto: ", bold: true }, { text: "Una ruta visual (fisico y digital) donde el alumno ve DONDE esta y HACIA DONDE puede ir. Elimina la sensacion de 'ya tome todo' al mostrar caminos no explorados." }],
    [{ text: "Estructura del mapa: ", bold: true }, { text: "10 programas como caminos, cada uno con 3 niveles marcados como estaciones. El alumno marca su progreso y descubre que siempre hay algo nuevo por aprender." }],
    [{ text: "Implementacion: ", bold: true }, { text: "Formato poster para eventos presenciales + version digital interactiva en la pagina del Instituto. Al inscribirse, el alumno recibe su mapa con los cursos completados ya marcados." }],
    [{ text: "Efecto psicologico: ", bold: true }, { text: "Gamificacion natural. El alumno quiere \"completar\" su mapa. Ve rutas que no conocia. Descubre programas que nunca considero. El sentimiento de 'ya termine' desaparece." }],
  ],
  C.lightPurple, C.purple
));

// ══════════ SECTION 4: ANALISIS 26 CURSOS ══════════
children.push(pageBreak());
children.push(sectionDivider("4. Analisis de los 26 Cursos Actuales"));
children.push(p("Cada uno de los 26 cursos fue analizado individualmente para determinar su rol dentro de la nueva estructura. Se asigno una accion recomendada y un destino dentro de los 10 programas integrados."));
children.push(spacer(60));

children.push(h3("Leyenda de acciones"));
const legendTable = new Table({
  width: { size: W, type: WidthType.DXA },
  columnWidths: [1560, 1560, 1560, 1560, 1560, 1560],
  rows: [new TableRow({
    children: [
      cell("GATEWAY", 1560, { fill: "D6EAF8", bold: true, size: 16, align: AlignmentType.CENTER }),
      cell("TRONCAL", 1560, { fill: "FCF3CF", bold: true, size: 16, align: AlignmentType.CENTER }),
      cell("PRO TRACK", 1560, { fill: "F5CBA7", bold: true, size: 16, align: AlignmentType.CENTER }),
      cell("VERSION", 1560, { fill: "D4EFDF", bold: true, size: 16, align: AlignmentType.CENTER }),
      cell("MERGE", 1560, { fill: "E8DAEF", bold: true, size: 16, align: AlignmentType.CENTER }),
      cell("ELECTIVO", 1560, { fill: "F2F3F4", bold: true, size: 16, align: AlignmentType.CENTER }),
    ]
  }), new TableRow({
    children: [
      cell("Puerta de entrada al programa. Primer contacto. Nivel 1.", 1560, { size: 16, fill: "D6EAF8" }),
      cell("Curso que forma el nucleo del programa. Nivel 2-3.", 1560, { size: 16, fill: "FCF3CF" }),
      cell("Educacion continua para terapeutas avanzados.", 1560, { size: 16, fill: "F5CBA7" }),
      cell("Actualizar con nuevos hallazgos. Lanzar como version nueva.", 1560, { size: 16, fill: "D4EFDF" }),
      cell("Integrar dentro de un programa mas grande.", 1560, { size: 16, fill: "E8DAEF" }),
      cell("Curso independiente. Complemento opcional.", 1560, { size: 16, fill: "F2F3F4" }),
    ]
  })]
});
children.push(legendTable);
children.push(spacer(100));

const courses = [
  ["1", "Par Biomagnetico", "Troncal", "Curso insignia. Base de todo el Instituto. Transversal a multiples programas. Mantener, versionar y posicionar como prerequisito de Nivel 3.", "FCF3CF"],
  ["2", "Bioenergetica", "Version V4", "Lanzar como V4 con enfoque TAME. Es el segundo pilar del Instituto. Actualizar con los hallazgos mas recientes del Dr. Ojeda.", "D4EFDF"],
  ["3", "Bioenergetica Holografica", "Pro Track", "Extension avanzada de Bioenergetica. Solo para quienes dominan la base. Ubicar en Bioenergetica Avanzada Nivel 2.", "F5CBA7"],
  ["4", "Biomagnetismo Kids", "Gateway", "Puerta de entrada perfecta al programa Ninos en Equilibrio. Alto atractivo para mamas y educadores.", "D6EAF8"],
  ["5", "NIG y Campos Morficos", "Troncal", "Tecnica unica del Dr. Ojeda. Integrar en programa Casa y Cuerpo Sano como Nivel 2. Diferenciador absoluto.", "FCF3CF"],
  ["6", "LEGO Serious Play", "Merge", "Herramienta proyectiva potente. Integrar en Despertar y Proposito como Nivel 3 (taller avanzado de proposito vital).", "E8DAEF"],
  ["7", "Gestalting y Modelado Creativo", "Merge", "Tecnica de modelado terapeutico. Integrar en Terapia Creativa como Nivel 3. Complementa OH Cards y Playmobil.", "E8DAEF"],
  ["8", "Microbioenergetica", "Pro Track", "El codigo energetico de los microbios. Avanzado para terapeutas. Ubicar en Bioenergetica Avanzada Nivel 2.", "F5CBA7"],
  ["9", "Conflictologia Biologica", "Troncal", "Curso clave. Aparece en 3 programas (Decodificacion, Ninos, Animal). Es el Nivel 3 transversal mas importante.", "FCF3CF"],
  ["10", "Neuroaprendizaje", "Gateway", "Movimientos para el cerebro. Puerta de entrada a Ninos en Equilibrio y complemento de Anti-Estres. Atractivo universal.", "D6EAF8"],
  ["11", "Acupuntura Facial", "Troncal", "Centro del programa Belleza Regenerativa. Tecnica con resultados visibles inmediatos. Alto poder de marketing.", "FCF3CF"],
  ["12", "Fitoterapia Clinica", "Troncal", "Plantas medicinales con enfoque clinico. Integrar en Anti-Estres y Sueno como Nivel 3 profesional.", "FCF3CF"],
  ["13", "OH Cards", "Gateway", "Cartas proyectivas. Puerta de entrada a Terapia Creativa. Facil de comunicar, atractiva para publico no terapeutico.", "D6EAF8"],
  ["14", "Oligoterapia Catalitica", "Troncal", "Minerales cataliticos. Tecnica solida y diferenciada. Integrar en Casa y Cuerpo Sano como Nivel 3.", "FCF3CF"],
  ["15", "Nutricion con Aminoacidos", "Troncal", "Bioquimica terapeutica. Core del programa Reset Metabolico Nivel 2. Complementa Setpoint y Nutrigenomica.", "FCF3CF"],
  ["16", "Nutrigenomica y Genotipos", "Troncal", "Genetica nutricional personalizada. Reset Metabolico Nivel 3. Tambien Belleza Regenerativa Nivel 2. Doble uso.", "FCF3CF"],
  ["17", "Geobiologia y Radiestesia", "Gateway", "Energia del espacio donde vives. Puerta de entrada a Casa y Cuerpo Sano. Alto curiosidad del publico general.", "D6EAF8"],
  ["18", "Playmobil Pro", "Gateway", "Terapia con munequitos. Entrada a Terapia Creativa. Atractivo visual, facil de comunicar en redes sociales.", "D6EAF8"],
  ["19", "Inteligencia Energetica", "Pro Track", "Lectura del campo energetico. Avanzado. Belleza Regenerativa N3 y Bioenergetica Avanzada N3.", "F5CBA7"],
  ["20", "Sales de Schussler", "Troncal", "12 sales minerales bioquimicas. Anti-Estres y Sueno Nivel 2. Herramienta practica y accesible.", "FCF3CF"],
  ["21", "Acupuntura Munecas/Tobillos", "Electivo", "Tecnica monotematica muy especifica. No encaja en ningun programa como pieza central. Ofrecer como electivo complementario para dolor.", "F2F3F4"],
  ["22", "Despertar Intuitivo", "Troncal", "Reconexion con la intuicion. Despertar y Proposito Nivel 2. Trabajo profundo de autoconocimiento.", "FCF3CF"],
  ["23", "Morphic Field Therapy", "Troncal", "Terapia de campos morficos. Decodificacion Total Nivel 3. Tecnica avanzada con alta diferenciacion.", "FCF3CF"],
  ["24", "MFT para Animales", "Gateway", "Campos morficos aplicados a animales. Puerta de entrada a Sanacion Animal. Genera contenido viral en redes.", "D6EAF8"],
  ["25", "Setpoint (obesidad)", "Gateway", "Punto de ajuste metabolico. Entrada a Reset Metabolico. Tema de altisima demanda publica.", "D6EAF8"],
  ["26", "Los Caminos de la Vida", "Gateway", "Herramienta de proposito vital. Entrada a Despertar y Proposito. Atractiva para publico en transicion de vida.", "D6EAF8"],
];

const colWidths26 = [500, 2400, 1100, 4560, 800];
for (let g = 0; g < 2; g++) {
  const slice = courses.slice(g * 13, (g + 1) * 13);
  const rows = [
    new TableRow({ children: [
      headerCell("#", 500), headerCell("Curso", 2400), headerCell("Accion", 1100), headerCell("Analisis y destino", 4560), headerCell("", 800),
    ]})
  ];
  slice.forEach(([num, name, action, reason, color]) => {
    rows.push(new TableRow({ children: [
      cell(num, 500, { align: AlignmentType.CENTER, bold: true }),
      cell(name, 2400, { bold: true }),
      cell(action, 1100, { size: 18, bold: true }),
      cell(reason, 4560, { size: 18 }),
      cell("", 800, { fill: color }),
    ]}));
  });
  children.push(new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: colWidths26, rows }));
  if (g === 0) children.push(spacer(80));
}

children.push(spacer(100));
children.push(accentBox(
  "Resultado del analisis",
  [
    [{ text: "10 Gateways: ", bold: true }, { text: "Cursos que funcionan como puerta de entrada a un programa (Nivel 1 o inicio de Nivel 2)" }],
    [{ text: "10 Troncales: ", bold: true }, { text: "Cursos que forman el nucleo de un programa (Nivel 2 o 3)" }],
    [{ text: "3 Pro Track: ", bold: true }, { text: "Cursos de educacion continua para terapeutas avanzados" }],
    [{ text: "1 Version: ", bold: true }, { text: "Curso a actualizar y relanzar (Bioenergetica V4)" }],
    [{ text: "2 Merge: ", bold: true }, { text: "Cursos que se integran dentro de un programa mayor" }],
    [{ text: "1 Electivo: ", bold: true }, { text: "Curso independiente como complemento opcional" }],
    "Ningun curso queda fuera. Los 26 tienen un hogar dentro de la nueva estructura.",
  ],
  C.lightGreen, C.green
));

// ══════════ SECTION 5: PARES SERIALIZADOS ══════════
children.push(pageBreak());
children.push(sectionDivider("5. Pares Serializados: Cursos Encadenados"));
children.push(spacer(80));

children.push(p("Los pares serializados son combinaciones de 2 cursos en secuencia logica. La idea es simple: el alumno obtiene valor inmediato con la Parte 1, pero entiende que hay un siguiente nivel que completa la solucion."));
children.push(spacer(40));
children.push(p("Este formato es ideal para marketing: se vende la Parte 1 con un nombre atractivo orientado al resultado, y se ofrece la Parte 2 como la \"causa profunda\" que completa la transformacion.", { italics: true, color: C.darkGray }));
children.push(spacer(80));

children.push(h3("Logica del encadenamiento"));
children.push(boldBullet("Parte 1 = Sintoma/Resultado: ", "Lo que el alumno busca activamente. Alivio inmediato, herramienta practica, resultado visible."));
children.push(boldBullet("Parte 2 = Causa/Transformacion: ", "La raiz del problema. Cambio profundo, entendimiento completo, dominio de la tecnica."));
children.push(spacer(60));

const pairs = [
  ["Reset Hormonal", "Setpoint Metabolico", "Aminoacidos Terapeuticos", "Entender por que no bajo de peso", "Restaurar la bioquimica hormonal", "Mujeres 35-55 con resistencia metabolica", "$4,600 MXN"],
  ["Ninos en Equilibrio", "Neuroaprendizaje", "Biomagnetismo Kids", "Como aprende y se mueve el cerebro", "Como equilibrar al nino energeticamente", "Mamas, maestros, psicologos infantiles", "$197 ambos / $127 individual"],
  ["Tu Casa Sana", "Geobiologia y Radiestesia", "NIG / Campos Morficos", "Detectar geopatias y campos", "Limpiar y corregir el espacio", "Familias, arquitectos, terapeutas", "$197 ambos / $127 individual"],
  ["Por Que Enferme?", "Conflictologia Biologica", "Bioenergetica V4", "Descubrir el conflicto oculto", "Corregir el campo bioenergetico", "Personas con enfermedades cronicas", "$247 ambos / $157 individual"],
  ["Detox Energetico", "Inteligencia Energetica", "Morphic Field Therapy", "Evaluar la carga del campo", "Liberar la informacion morfogenica", "Terapeutas avanzados", "$247 ambos / $157 individual"],
  ["Dolor Cero", "Acupuntura Munecas/Tobillos", "Par Biomagnetico", "Alivio inmediato del dolor", "Correccion profunda del terreno", "Terapeutas de dolor, deportologos", "$197 ambos / $127 individual"],
  ["Rostro Vivo", "Acupuntura Facial", "Nutrigenomica", "Rejuvenecimiento facial visible", "Regeneracion interna con nutrientes", "Esteticistas, mujeres 30-55", "$247 ambos / $157 individual"],
  ["Sanacion Animal", "MFT Animales", "Conflictologia Biologica", "Tratar al animal directamente", "Decodificar el conflicto del dueno", "Veterinarios, amantes de animales", "$197 ambos / $127 individual"],
  ["Escudo Anti-Estres", "Neuroaprendizaje", "Oligoterapia Catalitica", "Reprogramar la respuesta al estres", "Restaurar el equilibrio mineral", "Profesionistas estresados, ejecutivos", "$197 ambos / $127 individual"],
  ["Sueno Profundo", "Geobiologia", "Sales de Schussler", "Optimizar el espacio donde duermes", "Regular el terreno bioquimico", "Personas con insomnio cronico", "$197 ambos / $127 individual"],
];

const pairColWidths = [1200, 1300, 1300, 1600, 1600, 1300, 1060];
const pairRows = [
  new TableRow({ children: [
    headerCell("Par", 1200), headerCell("Parte 1", 1300, C.accent), headerCell("Parte 2", 1300, C.green),
    headerCell("P1 resuelve", 1600, C.accent), headerCell("P2 resuelve", 1600, C.green),
    headerCell("Audiencia", 1300, C.purple), headerCell("Precio", 1060, C.yellow),
  ]})
];

pairs.forEach(([name, p1, p2, r1, r2, audience, price], i) => {
  const fill = i % 2 === 0 ? C.gray : C.white;
  pairRows.push(new TableRow({ children: [
    cell(name, 1200, { bold: true, fill, size: 17 }),
    cell(p1, 1300, { fill, size: 17 }),
    cell(p2, 1300, { fill, size: 17 }),
    cell(r1, 1600, { size: 16, italics: true, fill }),
    cell(r2, 1600, { size: 16, italics: true, fill }),
    cell(audience, 1300, { size: 16, fill }),
    cell(price, 1060, { size: 16, fill, bold: true }),
  ]}));
});

children.push(new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: pairColWidths, rows: pairRows }));

children.push(spacer(100));
children.push(accentBox(
  "Estrategia de venta de pares",
  [
    "El par se vende como un paquete con descuento (ahorro de ~30% vs comprar individual).",
    "La Parte 1 se puede tomar sola. La Parte 2 requiere haber tomado la Parte 1.",
    "El nombre del par es comercial y orientado al resultado, no al nombre tecnico del curso.",
    [{ text: "Ejemplo: ", bold: true }, { text: "No vendemos 'Setpoint + Aminoacidos'. Vendemos 'Reset Hormonal: el sistema de 2 pasos para resetear tu metabolismo'.", italics: true }],
  ],
  C.lightYellow, C.yellow
));

// ══════════ SECTION 6: PROGRAMAS INTEGRADOS ══════════
children.push(pageBreak());
children.push(sectionDivider("6. Los 10 Programas Integrados"));
children.push(spacer(60));

children.push(p("Cada programa integra 3 tecnicas complementarias que, juntas, abordan un problema de forma completa. Son sistemas de formacion, no cursos sueltos. Cada programa tiene identidad propia, audiencia definida y escalera de valor interna."));
children.push(spacer(60));

const programs = [
  { num: "1", name: "Ninos en Equilibrio", tech: "Neuroaprendizaje + Biomagnetismo Kids + Conflictologia Biologica",
    desc: "Sistema integral para ninos con problemas de aprendizaje, conducta o salud.",
    audience: "Mamas, papas, maestros, psicologos infantiles, terapeutas pediatricos",
    n1: "Entendiendo a mi Hijo: Como funciona el cerebro del nino, senales de alerta, ejercicios para hacer en casa. Un fin de semana que cambia la dinamica familiar.",
    n2: "Ninos en Equilibrio: Neuroaprendizaje aplicado + Biomagnetismo pediatrico basico. El alumno sale con herramientas reales para ayudar ninos.",
    n3: "Terapeuta Infantil Integrativo: Neuroaprendizaje + Bio Kids + Conflictologia infantil + practica con casos reales. Certificacion profesional.",
    why: "Mercado enorme (cada mama quiere entender a su hijo). Altisima diferenciacion (nadie ofrece esto integrado). Genera embajadores (las mamas recomiendan).",
    fill: C.lightGreen, color: C.green },
  { num: "2", name: "Decodificacion Total", tech: "Conflictologia Biologica + Bioenergetica + Morphic Field Therapy",
    desc: "Descubre el conflicto, corrige el campo bioenergetico, libera la informacion morfogenica.",
    audience: "Personas con enfermedades cronicas, terapeutas en activo, medicos que buscan vision integrativa",
    n1: "Por Que Enferme?: Taller de autoconocimiento donde descubres la conexion entre tus emociones y tu cuerpo. Sin jerga medica.",
    n2: "Decodificacion Bioenergietica: Conflictologia Biologica + Bioenergetica aplicada. El alumno aprende a leer conflictos y hacer correcciones.",
    n3: "Terapeuta en Decodificacion Total: Las 3 tecnicas integradas + Morphic Field Therapy + supervision de casos. Formacion profesional completa.",
    why: "Maquina de ingresos. Conversion altisima (quien descubre su conflicto quiere resolverlo). El Dr. Ojeda es referencia en esto.",
    fill: C.light, color: C.accent },
  { num: "3", name: "Reset Metabolico", tech: "Setpoint Metabolico + Aminoacidos Terapeuticos + Nutrigenomica",
    desc: "Resetea el punto de ajuste hormonal con bioquimica y genetica personalizada.",
    audience: "Mujeres 35-55 con resistencia metabolica, nutriologos, terapeutas que quieren integrar nutricion",
    n1: "Tu Metabolismo Importa: Entiende por que las dietas no funcionan. Descubre tu genotipo basico. Un fin de semana revelador.",
    n2: "Reset Bioquimico: Setpoint (reprogramar el punto de ajuste) + Aminoacidos (restaurar la bioquimica). Protocolo practico aplicable.",
    n3: "Nutricion Integrativa Profesional: Nutrigenomica avanzada + protocolos personalizados + practica clinica. Para quien quiere ejercer.",
    why: "Gran puerta de entrada. El tema obesidad/metabolismo atrae masivamente. Diferenciacion por enfoque cientifico (nutrigenomica).",
    fill: C.lightYellow, color: C.yellow },
  { num: "4", name: "Casa y Cuerpo Sano", tech: "Geobiologia y Radiestesia + NIG/Campos Morficos + Oligoterapia",
    desc: "Evalua y corrige el espacio donde vives, y restaura tu terreno mineral interno.",
    audience: "Familias preocupadas por su espacio, arquitectos, terapeutas, personas con enfermedades sin explicacion",
    n1: "Tu Casa Te Enferma?: Taller practico de geobiologia basica. Aprende a detectar geopatias en tu hogar. Herramientas para medir.",
    n2: "Espacio y Cuerpo: Geobiologia profesional + NIG y Campos Morficos para limpiar espacios. El alumno puede evaluar y corregir hogares.",
    n3: "Terapeuta de Espacios: Oligoterapia catalitica (restaurar terreno mineral) + certificacion para ofrecer consultorias de espacio.",
    why: "Nicho de oro. Cero competencia en Mexico. Nadie integra geobiologia + campos morficos + minerales. Genera curiosidad viral.",
    fill: C.lightPurple, color: C.purple },
  { num: "5", name: "Anti-Estres y Sueno", tech: "Neuroaprendizaje + Sales de Schussler + Fitoterapia Clinica",
    desc: "Reprograma la respuesta al estres, restaura minerales y usa plantas medicinales.",
    audience: "Ejecutivos estresados, madres agotadas, personas con insomnio, terapeutas naturistas",
    n1: "Escudo Anti-Estres: Ejercicios de neuroaprendizaje para regular el sistema nervioso. Un fin de semana para cambiar tu relacion con el estres.",
    n2: "Regulacion Natural: Sales de Schussler (12 minerales bioquimicos) + protocolos para sueno. Herramientas que se pueden usar en casa.",
    n3: "Fitoterapia Clinica Aplicada: Plantas medicinales con enfoque clinico. Para terapeutas que quieren integrar fitoterapia en su practica.",
    why: "Tema universal (todos tienen estres). Funciona mejor como modulo complementario de otros programas que como programa independiente.",
    fill: C.lightRed, color: C.red },
  { num: "6", name: "Belleza Regenerativa", tech: "Acupuntura Facial + Nutrigenomica + Inteligencia Energetica",
    desc: "Rejuvenecimiento desde el rostro, la genetica nutricional y el campo energetico.",
    audience: "Esteticistas, cosmetologas, mujeres 30-55 que buscan alternativas naturales, terapeutas de belleza",
    n1: "Rostro Vivo: Automasaje facial + principios de nutricion para la piel. Resultados visibles desde la primera sesion. Alto impacto visual.",
    n2: "Belleza desde Adentro: Acupuntura Facial profesional + Nutrigenomica aplicada a piel y cabello. El alumno puede ofrecer sesiones.",
    n3: "Terapeuta en Regeneracion Facial: Inteligencia Energetica del rostro + protocolos avanzados + practica clinica supervisada.",
    why: "Alta monetizacion. Las sesiones de acupuntura facial se cobran entre $80-$150 USD cada una. Resultados fotografiables para marketing.",
    fill: C.lightOrange, color: C.orange },
  { num: "7", name: "Sanacion Animal", tech: "MFT para Animales + Par Biomagnetico + Conflictologia Biologica",
    desc: "Trata al animal y decodifica su vinculo con el dueno.",
    audience: "Veterinarios, amantes de animales, terapeutas que quieren expandir su practica, rescatistas",
    n1: "Entendiendo a tu Mascota: El vinculo energetico entre tu y tu animal. Senales que tu mascota te da sobre TU salud. Taller revelador.",
    n2: "MFT Animal: Morphic Field Therapy aplicada a animales + Par Biomagnetico basico para mascotas. El alumno puede tratar animales.",
    n3: "Terapeuta Animal Integrativo: Conflictologia Biologica del vinculo dueno-mascota + casos complejos + certificacion.",
    why: "Joya escondida. Absolutamente incopiable. Genera contenido viral (la gente comparte fotos de sus mascotas). Comunidad leal.",
    fill: C.lightGreen, color: C.green },
  { num: "8", name: "Terapia Creativa", tech: "OH Cards + Playmobil Pro + Gestalting y Modelado Creativo",
    desc: "Tres herramientas proyectivas para desbloquear cuando las palabras no alcanzan.",
    audience: "Psicologos, coaches, educadores, terapeutas que quieren nuevas herramientas, facilitadores grupales",
    n1: "Desbloquea Tu Creatividad: Taller vivencial con OH Cards. Experiencia personal poderosa. El alumno se sorprende de lo que emerge.",
    n2: "Herramientas Proyectivas: OH Cards + Playmobil Pro. Dos tecnicas para trabajar con individuos y grupos. Practica intensiva.",
    n3: "Facilitador en Terapia Creativa: Gestalting y Modelado Creativo + diseno de sesiones + supervision. Certificacion como facilitador.",
    why: "Diferenciador unico. Nadie mas ofrece estas 3 herramientas juntas. Altisima conversion porque la experiencia vivencial vende sola.",
    fill: C.light, color: C.accent },
  { num: "9", name: "Bioenergetica Avanzada", tech: "Bioenergetica Holografica + Microbioenergetica + Inteligencia Energetica",
    desc: "Especializacion profunda para terapeutas que ya dominan la Bioenergetica base.",
    audience: "Terapeutas formados en Bioenergetica, alumnos avanzados del Instituto, profesionales en activo",
    n1: "No aplica nivel 1 masivo. Este programa empieza en Nivel 2 porque requiere base previa en Bioenergetica.",
    n2: "Bioenergetica Holografica + Microbioenergetica: Extension avanzada del campo bioenergetico y el codigo de los microbios.",
    n3: "Maestria Bioenergetica: Inteligencia Energetica avanzada + integracion de las 3 tecnicas + supervision de casos complejos.",
    why: "Premium. Retiene a los mejores alumnos. Genera ingresos recurrentes de terapeutas que ya invirtieron en la base.",
    fill: C.lightYellow, color: C.yellow },
  { num: "10", name: "Despertar y Proposito", tech: "Los Caminos de la Vida + Despertar Intuitivo + LEGO Serious Play",
    desc: "Para personas en transicion de vida que buscan reconectarse con su proposito.",
    audience: "Personas en crisis de mediana edad, profesionistas en burnout, coaches, buscadores espirituales",
    n1: "Los Caminos de la Vida: Taller vivencial de autoconocimiento. Mapa personal de proposito. Para cualquier persona en cualquier momento.",
    n2: "Despertar Intuitivo: Reconexion con la intuicion como brujula de vida. Herramientas practicas para tomar decisiones desde la sabiduria interior.",
    n3: "Facilitador de Proposito: LEGO Serious Play como herramienta de facilitacion + diseno de talleres de proposito + certificacion.",
    why: "Programa emocional. Genera historias poderosas que funcionan como testimonios de marketing. Atrae audiencia no terapeutica.",
    fill: C.lightPurple, color: C.purple },
];

programs.forEach(prog => {
  children.push(new Table({
    width: { size: W, type: WidthType.DXA },
    columnWidths: [W],
    rows: [new TableRow({ children: [new TableCell({
      width: { size: W, type: WidthType.DXA },
      borders: { top: { style: BorderStyle.SINGLE, size: 6, color: prog.color }, bottom: thinBorder, left: thinBorder, right: thinBorder },
      shading: { fill: prog.fill, type: ShadingType.CLEAR },
      margins: { top: 100, bottom: 100, left: 200, right: 200 },
      children: [
        new Paragraph({ spacing: { after: 60 }, children: [
          new TextRun({ text: `PROGRAMA ${prog.num}: `, font: "Arial", size: 24, bold: true, color: prog.color }),
          new TextRun({ text: prog.name.toUpperCase(), font: "Arial", size: 24, bold: true, color: C.black }),
        ]}),
        new Paragraph({ spacing: { after: 40 }, children: [
          new TextRun({ text: "Tecnicas: ", font: "Arial", size: 20, bold: true, color: C.darkGray }),
          new TextRun({ text: prog.tech, font: "Arial", size: 20, color: C.darkGray }),
        ]}),
        new Paragraph({ spacing: { after: 60 }, children: [
          new TextRun({ text: prog.desc, font: "Arial", size: 20, italics: true, color: C.darkGray }),
        ]}),
        new Paragraph({ spacing: { after: 40 }, children: [
          new TextRun({ text: "Audiencia: ", font: "Arial", size: 19, bold: true, color: prog.color }),
          new TextRun({ text: prog.audience, font: "Arial", size: 19, color: C.darkGray }),
        ]}),
        new Paragraph({ spacing: { after: 40 }, children: [
          new TextRun({ text: "N1: ", font: "Arial", size: 19, bold: true, color: C.green }),
          new TextRun({ text: prog.n1, font: "Arial", size: 19, color: C.darkGray }),
        ]}),
        new Paragraph({ spacing: { after: 40 }, children: [
          new TextRun({ text: "N2: ", font: "Arial", size: 19, bold: true, color: C.yellow }),
          new TextRun({ text: prog.n2, font: "Arial", size: 19, color: C.darkGray }),
        ]}),
        new Paragraph({ spacing: { after: 40 }, children: [
          new TextRun({ text: "N3: ", font: "Arial", size: 19, bold: true, color: C.red }),
          new TextRun({ text: prog.n3, font: "Arial", size: 19, color: C.darkGray }),
        ]}),
        new Paragraph({ children: [
          new TextRun({ text: "Por que este programa: ", font: "Arial", size: 19, bold: true, color: prog.color }),
          new TextRun({ text: prog.why, font: "Arial", size: 19, italics: true, color: C.darkGray }),
        ]}),
      ]
    })]
  })]
  }));
  children.push(spacer(80));
});

// ══════════ SECTION 7: LOS 3 NIVELES ══════════
children.push(pageBreak());
children.push(sectionDivider("7. Los 3 Niveles de Profundidad"));
children.push(spacer(60));

children.push(p("Esta es la innovacion central de la propuesta: cada programa se ofrece en 3 niveles de profundidad. El Nivel 1 NO forma terapeutas; es una herramienta de vida para cualquier persona. Esto abre el Instituto a un mercado masivo que antes no existia."));
children.push(spacer(60));

const levels = [
  { name: "NIVEL 1: VIDA CONSCIENTE", color: C.green, fill: C.lightGreen,
    tagline: "\"Entiende tu cuerpo, tu casa y tu familia sin necesitar ser terapeuta\"",
    who: "Cualquier persona: mamas, papas, profesionistas, maestros, curiosos, personas que buscan herramientas practicas para su vida cotidiana. No necesitan formacion previa ni interes en ser terapeutas.",
    what: "Taller vivencial de un fin de semana (2 dias). Contenido accesible, sin jerga tecnica. Experiencia personal directa con las tecnicas. El alumno sale con herramientas que puede usar en casa inmediatamente.",
    price: "$97 - $197 USD",
    cert: "Constancia de participacion (NO certificacion clinica). Sin valor curricular terapeutico.",
    capacity: "30-80 personas por evento (grupo grande, formato conferencia + ejercicios)",
    marketing: "Redes sociales, ads, testimonios de mamas/familias. Nombres comerciales orientados al resultado (no al nombre tecnico del curso).",
    conversion: "20-30% subira al Nivel 2 (compra por experiencia vivida, no por promesa).",
  },
  { name: "NIVEL 2: HERRAMIENTAS DE VIDA", color: C.yellow, fill: C.lightYellow,
    tagline: "\"Ten un sistema practico que puedas usar en cualquier situacion\"",
    who: "Quien ya probo el Nivel 1 y quiere herramientas reales. Profesionales que quieren integrar tecnicas complementarias a su practica (psicologos, medicos, educadores, coaches). No buscan certificacion clinica pero si competencia real.",
    what: "3 modulos de 2 dias cada uno (1 modulo por mes, total 3 meses). Practica estructurada, protocolos paso a paso, casuistica real. El alumno sale sabiendo aplicar las tecnicas con confianza.",
    price: "$497 - $797 USD (pago completo o en 3 mensualidades)",
    cert: "Certificado de competencia del Instituto. Valida que sabes usar las herramientas. No habilita para practica clinica independiente.",
    capacity: "15-25 personas por grupo (ratio baja para practica supervisada)",
    marketing: "Email a base de datos de Nivel 1. Testimonios de transformacion. Webinars de profundizacion.",
    conversion: "30-40% subira al Nivel 3 (ya invirtieron tiempo y dinero, quieren la certificacion completa).",
  },
  { name: "NIVEL 3: FORMACION PROFESIONAL", color: C.red, fill: C.lightRed,
    tagline: "\"Domina las tecnicas a nivel profesional con casos reales y supervisados\"",
    who: "Quien quiere ejercer como terapeuta, atender pacientes, abrir su consultorio, integrar las tecnicas a su practica medica/psicologica. Alumnos comprometidos con la formacion completa.",
    what: "6-9 meses con practica clinica supervisada. Incluye las 3 tecnicas del programa integradas. Casos reales con retroalimentacion del Dr. Ojeda. Proyecto final o examen de competencia.",
    price: "$1,200 - $2,000 USD (plan de pagos disponible)",
    cert: "Certificacion Profesional del Instituto Centrobioenergetica. Habilita para practica independiente con las tecnicas del programa.",
    capacity: "8-15 personas por grupo (atencion personalizada, supervision individual)",
    marketing: "Comunicacion directa con alumnos de Nivel 2. Casos de exito de egresados. El Dr. Ojeda como mentor personal.",
    conversion: "Egresados se convierten en embajadores y referidores. Muchos regresan para otro programa en Nivel 1.",
  },
];

levels.forEach(lv => {
  children.push(new Table({
    width: { size: W, type: WidthType.DXA },
    columnWidths: [W],
    rows: [new TableRow({ children: [new TableCell({
      width: { size: W, type: WidthType.DXA },
      borders: { top: { style: BorderStyle.SINGLE, size: 8, color: lv.color }, bottom: thinBorder, left: thinBorder, right: thinBorder },
      shading: { fill: lv.fill, type: ShadingType.CLEAR },
      margins: { top: 120, bottom: 120, left: 200, right: 200 },
      children: [
        new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: lv.name, font: "Arial", size: 26, bold: true, color: lv.color })] }),
        new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: lv.tagline, font: "Arial", size: 22, italics: true, color: C.darkGray })] }),
        new Paragraph({ spacing: { after: 60 }, children: [
          new TextRun({ text: "Para quien: ", font: "Arial", size: 20, bold: true, color: lv.color }),
          new TextRun({ text: lv.who, font: "Arial", size: 20, color: C.darkGray }),
        ]}),
        new Paragraph({ spacing: { after: 60 }, children: [
          new TextRun({ text: "Que incluye: ", font: "Arial", size: 20, bold: true, color: lv.color }),
          new TextRun({ text: lv.what, font: "Arial", size: 20, color: C.darkGray }),
        ]}),
        new Paragraph({ spacing: { after: 60 }, children: [
          new TextRun({ text: "Precio: ", font: "Arial", size: 20, bold: true, color: lv.color }),
          new TextRun({ text: lv.price, font: "Arial", size: 20, bold: true, color: C.black }),
        ]}),
        new Paragraph({ spacing: { after: 60 }, children: [
          new TextRun({ text: "Certificacion: ", font: "Arial", size: 20, bold: true, color: lv.color }),
          new TextRun({ text: lv.cert, font: "Arial", size: 20, color: C.darkGray }),
        ]}),
        new Paragraph({ spacing: { after: 60 }, children: [
          new TextRun({ text: "Capacidad: ", font: "Arial", size: 20, bold: true, color: lv.color }),
          new TextRun({ text: lv.capacity, font: "Arial", size: 20, color: C.darkGray }),
        ]}),
        new Paragraph({ spacing: { after: 60 }, children: [
          new TextRun({ text: "Marketing: ", font: "Arial", size: 20, bold: true, color: lv.color }),
          new TextRun({ text: lv.marketing, font: "Arial", size: 20, color: C.darkGray }),
        ]}),
        new Paragraph({ children: [
          new TextRun({ text: "Conversion esperada: ", font: "Arial", size: 20, bold: true, color: lv.color }),
          new TextRun({ text: lv.conversion, font: "Arial", size: 20, color: C.darkGray }),
        ]}),
      ]
    })]
  })]
  }));
  children.push(spacer(100));
});

// Funnel
children.push(accentBox(
  "Embudo Natural de Conversion",
  [
    [{ text: "Nivel 1 ($97-$197): ", bold: true, color: C.green }, { text: "Miles de personas por ano. Entrada masiva a traves de redes sociales y ads. Formato fin de semana, bajo compromiso." }],
    [{ text: "       |  20-30% sube al siguiente nivel  |", bold: true, color: C.accent }],
    [{ text: "Nivel 2 ($497-$797): ", bold: true, color: C.yellow }, { text: "Cientos de personas. 3 meses de formacion real. Compran porque ya vivieron la experiencia en Nivel 1." }],
    [{ text: "       |  30-40% sube al siguiente nivel  |", bold: true, color: C.accent }],
    [{ text: "Nivel 3 ($1,200-$2,000): ", bold: true, color: C.red }, { text: "Decenas de profesionales. Formacion completa de 6-9 meses. Certificacion del Instituto." }],
    "",
    [{ text: "El Nivel 1 es la nueva puerta de entrada masiva que antes no existia. ", bold: true }, { text: "Antes, el Instituto solo vendia a terapeutas o aspirantes. Ahora puede atraer al publico general." }],
  ],
  C.lightGreen, C.green
));

// ══════════ SECTION 8: DESGLOSE POR PROGRAMA ══════════
children.push(pageBreak());
children.push(sectionDivider("8. Desglose Nivel por Nivel para Cada Programa"));
children.push(p("Tabla detallada mostrando que cursos componen cada nivel de cada programa. Esta es la referencia operativa para armar la curricula."));
children.push(spacer(60));

const desglose = [
  ["Ninos en Equilibrio", "Neuroaprendizaje (basico)", "Neuroaprendizaje + Bio Kids", "Neuro + Bio Kids + Conflictologia Infantil"],
  ["Decodificacion Total", "Conflictologia (intro vivencial)", "Conflictologia + Bioenergetica", "Conflic + Bioener + Morphic Field Therapy"],
  ["Reset Metabolico", "Setpoint (intro metabolismo)", "Setpoint + Aminoacidos", "Setpoint + Amino + Nutrigenomica"],
  ["Casa y Cuerpo Sano", "Geobiologia (intro)", "Geobiologia + NIG/Campos Morficos", "Geobi + NIG + Oligoterapia Catalitica"],
  ["Anti-Estres y Sueno", "Neuroaprendizaje (anti-estres)", "Neuro + Sales de Schussler", "Neuro + Sales + Fitoterapia Clinica"],
  ["Belleza Regenerativa", "Automasaje facial (intro)", "Acupuntura Facial + Nutrigenomica", "Acu Facial + Nutrigen + Intelig Energetica"],
  ["Sanacion Animal", "MFT Animales (intro vivencial)", "MFT Animales + Par Biomagnetico", "MFT + Par Bio + Conflictologia del vinculo"],
  ["Terapia Creativa", "OH Cards (experiencia personal)", "OH Cards + Playmobil Pro", "OH + Playmobil + Gestalting y Modelado"],
  ["Bioenergetica Avanzada", "N/A (requiere base)", "Bioener Holografica + Microbioener", "Holografica + Micro + Intelig Energetica"],
  ["Despertar y Proposito", "Los Caminos de la Vida", "Caminos + Despertar Intuitivo", "Caminos + Despertar + LEGO Serious Play"],
];

const dgColWidths = [1800, 2300, 2600, 2660];
const dgRows = [
  new TableRow({ children: [
    headerCell("Programa", 1800),
    headerCell("Nivel 1 (Vida Consciente)", 2300, C.green),
    headerCell("Nivel 2 (Herramientas)", 2600, C.yellow),
    headerCell("Nivel 3 (Profesional)", 2660, C.red),
  ]})
];

desglose.forEach(([prog, n1, n2, n3], i) => {
  const fill = i % 2 === 0 ? C.gray : C.white;
  dgRows.push(new TableRow({ children: [
    cell(prog, 1800, { bold: true, fill, size: 18 }),
    cell(n1, 2300, { fill, size: 17 }),
    cell(n2, 2600, { fill, size: 17 }),
    cell(n3, 2660, { fill, size: 17 }),
  ]}));
});

children.push(new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: dgColWidths, rows: dgRows }));

// ══════════ SECTION 9: ANALISIS POTENCIAL ══════════
children.push(pageBreak());
children.push(sectionDivider("9. Analisis de Potencial por Programa"));
children.push(spacer(60));

children.push(p("Cada programa fue evaluado en 5 dimensiones estrategicas con escala de 1 a 5. La puntuacion maxima es 25. Esto determina el orden de lanzamiento y la asignacion de recursos."));
children.push(spacer(60));

children.push(h3("Las 5 dimensiones"));
children.push(boldBullet("Mercado (Mdo): ", "Tamano del mercado potencial. Cuanta gente tiene este problema o interes. 5 = mercado masivo, 1 = ultra-nicho."));
children.push(boldBullet("Monetizacion ($$$): ", "Capacidad de generar ingresos en los 3 niveles. 5 = escalera de valor clara con alto ticket, 1 = dificil de monetizar."));
children.push(boldBullet("Atraccion N1 (Atr): ", "Facilidad para atraer al publico general en Nivel 1. 5 = nombre comercial atractivo, tema de interes masivo, 1 = requiere explicacion larga."));
children.push(boldBullet("Conversion (Conv): ", "Probabilidad de que el alumno de N1 suba a N2 y N3. 5 = la experiencia vende sola, 1 = muchos se quedan solo en N1."));
children.push(boldBullet("Diferenciacion (Unic): ", "Que tan unico es este programa vs la competencia. 5 = nadie mas lo ofrece, 1 = hay muchos competidores."));
children.push(spacer(60));

const potential = [
  ["Ninos en Equilibrio", "5", "4", "5", "4", "5", "23", "PROGRAMA ESTRELLA. Lanzar primero. Cada mama es una embajadora.", C.lightGreen],
  ["Decodificacion Total", "5", "5", "5", "5", "3", "23", "MAQUINA DE INGRESOS. Mayor conversion de todos. El que entra no sale.", C.lightGreen],
  ["Terapia Creativa", "4", "4", "4", "5", "5", "22", "DIFERENCIADOR UNICO. Nadie ofrece estas 3 herramientas juntas.", C.lightGreen],
  ["Reset Metabolico", "5", "4", "5", "3", "4", "21", "GRAN PUERTA. Atrae masivamente por el tema peso/metabolismo.", C.light],
  ["Belleza Regenerativa", "4", "5", "4", "4", "4", "21", "ALTA MONETIZACION. Ticket alto y resultados fotografiables.", C.light],
  ["Sanacion Animal", "3", "4", "4", "4", "5", "20", "JOYA ESCONDIDA. Incopiable. Contenido viral en redes.", C.lightYellow],
  ["Bioenergetica Avanzada", "3", "5", "2", "5", "5", "20", "PREMIUM. Retiene mejores alumnos. Ingresos recurrentes.", C.lightYellow],
  ["Casa y Cuerpo Sano", "3", "4", "3", "4", "5", "19", "NICHO DE ORO. Cero competencia en Mexico.", C.lightYellow],
  ["Anti-Estres", "5", "3", "4", "3", "4", "19", "MEJOR COMO MODULO. Integrar en otros programas.", C.lightRed],
  ["Despertar y Proposito", "4", "3", "4", "3", "4", "18", "EMOCIONAL. Historias poderosas para testimonios.", C.lightRed],
];

const potColWidths = [1800, 600, 600, 600, 600, 600, 600, 3960];
const potRows = [
  new TableRow({ children: [
    headerCell("Programa", 1800), headerCell("Mdo", 600), headerCell("$$$", 600),
    headerCell("Atr", 600), headerCell("Conv", 600), headerCell("Unic", 600),
    headerCell("TOT", 600), headerCell("Veredicto estrategico", 3960),
  ]})
];

potential.forEach(([name, m, d, a, co, u, total, verdict, fill]) => {
  potRows.push(new TableRow({ children: [
    cell(name, 1800, { bold: true, fill }),
    cell(m, 600, { align: AlignmentType.CENTER, fill }),
    cell(d, 600, { align: AlignmentType.CENTER, fill }),
    cell(a, 600, { align: AlignmentType.CENTER, fill }),
    cell(co, 600, { align: AlignmentType.CENTER, fill }),
    cell(u, 600, { align: AlignmentType.CENTER, fill }),
    cell(total, 600, { align: AlignmentType.CENTER, bold: true, fill }),
    cell(verdict, 3960, { size: 18, italics: true, fill }),
  ]}));
});

children.push(new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: potColWidths, rows: potRows }));

// ══════════ SECTION 10: MAPA COMPLETO ══════════
children.push(pageBreak());
children.push(sectionDivider("10. Mapa Completo: Los 26 Cursos y Donde Vive Cada Uno"));
children.push(p("Referencia operativa. Ningun curso queda fuera. Los 26 tienen un hogar dentro de los 10 programas."));
children.push(spacer(60));

const mapData = [
  ["1", "Par Biomagnetico", "Transversal (Sanacion Animal, Decodificacion)", "N2-N3", "Prerequisito de Nivel 3 en multiples programas"],
  ["2", "Bioenergetica", "Decodificacion Total", "N2-N3", "Relanzar como V4 con enfoque TAME"],
  ["3", "Bioenergetica Holografica", "Bioenergetica Avanzada", "N2", "Extension avanzada de la base"],
  ["4", "Biomagnetismo Kids", "Ninos en Equilibrio", "N2", "Biomagnetismo adaptado a pediatria"],
  ["5", "NIG y Campos Morficos", "Casa y Cuerpo Sano", "N2", "Tecnica exclusiva del Dr. Ojeda"],
  ["6", "LEGO Serious Play", "Despertar y Proposito", "N3", "Herramienta de facilitacion avanzada"],
  ["7", "Gestalting y Modelado Creativo", "Terapia Creativa", "N3", "Modelado terapeutico avanzado"],
  ["8", "Microbioenergetica", "Bioenergetica Avanzada", "N2", "Codigo energetico de los microbios"],
  ["9", "Conflictologia Biologica", "Decodificacion / Ninos / Animal", "N3", "Transversal en 3 programas"],
  ["10", "Neuroaprendizaje", "Ninos / Anti-Estres", "N1-N2", "Movimientos para el cerebro"],
  ["11", "Acupuntura Facial", "Belleza Regenerativa", "N2", "Centro del programa Belleza"],
  ["12", "Fitoterapia Clinica", "Anti-Estres y Sueno", "N3", "Plantas medicinales con enfoque clinico"],
  ["13", "OH Cards", "Terapia Creativa", "N1-N2", "Cartas proyectivas. Gateway ideal."],
  ["14", "Oligoterapia Catalitica", "Casa y Cuerpo Sano", "N3", "Minerales cataliticos para terreno"],
  ["15", "Nutricion con Aminoacidos", "Reset Metabolico", "N2", "Bioquimica terapeutica aplicada"],
  ["16", "Nutrigenomica y Genotipos", "Reset Metab / Belleza", "N2-N3", "Genetica nutricional. Doble uso."],
  ["17", "Geobiologia y Radiestesia", "Casa y Cuerpo Sano", "N1-N2", "Energia del espacio. Gateway."],
  ["18", "Playmobil Pro", "Terapia Creativa", "N2", "Terapia con munequitos."],
  ["19", "Inteligencia Energetica", "Belleza / Bio Avanzada", "N3", "Lectura del campo energetico"],
  ["20", "Sales de Schussler", "Anti-Estres y Sueno", "N2", "12 minerales bioquimicos"],
  ["21", "Acupuntura Munecas/Tobillos", "Electivo transversal", "Indep.", "Complemento para dolor"],
  ["22", "Despertar Intuitivo", "Despertar y Proposito", "N2", "Reconexion con la intuicion"],
  ["23", "Morphic Field Therapy", "Decodificacion Total", "N3", "Campos morficos avanzados"],
  ["24", "MFT para Animales", "Sanacion Animal", "N1-N2", "MFT adaptado a animales"],
  ["25", "Setpoint (obesidad)", "Reset Metabolico", "N1-N2", "Punto de ajuste metabolico"],
  ["26", "Los Caminos de la Vida", "Despertar y Proposito", "N1", "Herramienta de proposito"],
];

const mapColWidths = [450, 2200, 2400, 800, 3510];
const mapRows = [
  new TableRow({ children: [
    headerCell("#", 450), headerCell("Curso", 2200), headerCell("Programa destino", 2400),
    headerCell("Nivel", 800), headerCell("Nota", 3510),
  ]})
];

mapData.forEach(([num, curso, programa, nivel, nota], i) => {
  const fill = i % 2 === 0 ? C.gray : C.white;
  mapRows.push(new TableRow({ children: [
    cell(num, 450, { align: AlignmentType.CENTER, fill, bold: true }),
    cell(curso, 2200, { bold: true, fill, size: 18 }),
    cell(programa, 2400, { fill, size: 18 }),
    cell(nivel, 800, { fill, align: AlignmentType.CENTER, size: 18 }),
    cell(nota, 3510, { fill, size: 16, italics: true }),
  ]}));
});

children.push(new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: mapColWidths, rows: mapRows }));

// ══════════ SECTION 11: TRANSVERSALES ══════════
children.push(pageBreak());
children.push(sectionDivider("11. Elementos Transversales"));
children.push(spacer(60));

children.push(accentBox(
  "Par Biomagnetico: El Pilar Transversal",
  [
    "El Par Biomagnetico no es el centro de un solo programa: es el pilar que alimenta a todos. Es el curso insignia del Instituto y la tecnica mas reconocida del Dr. Ojeda.",
    [{ text: "Rol en la nueva estructura: ", bold: true }, { text: "Prerequisito recomendado para el Nivel 3 de cualquier programa. Es la base tecnica que da solidez clinica a todas las demas herramientas." }],
    [{ text: "Programas donde aparece directamente: ", bold: true }, { text: "Sanacion Animal (N2), Decodificacion Total (complemento), y como electivo en cualquier programa." }],
    [{ text: "Estrategia: ", bold: true }, { text: "Mantener como curso propio (no fusionar). Lanzar como 'Par Biomagnetico 2026' con los nuevos pares descubiertos. Ofrecer version Gateway (1 dia, $97) y version Profesional (5 dias, $797+)." }],
  ]
));
children.push(spacer(80));

children.push(accentBox(
  "Acupuntura de Munecas y Tobillos: Electivo Monotematico",
  [
    "Este curso es demasiado especifico para ser parte central de un programa, pero muy valioso como complemento.",
    [{ text: "Formato: ", bold: true }, { text: "Taller de 1 dia, enfocado en dolor. Se ofrece como modulo electivo independiente." }],
    [{ text: "Precio: ", bold: true }, { text: "$97-$147 USD. Se puede ofrecer como add-on en cualquier evento presencial del Instituto." }],
    [{ text: "Audiencia ideal: ", bold: true }, { text: "Terapeutas que ya manejan otras tecnicas y quieren una herramienta rapida para dolor agudo." }],
  ],
  C.lightYellow, C.yellow
));

// ══════════ SECTION 12: PLAN DE LANZAMIENTO ══════════
children.push(pageBreak());
children.push(sectionDivider("12. Plan de Lanzamiento por Fases"));
children.push(spacer(60));

children.push(p("El lanzamiento se ejecuta en 3 fases durante 6 meses. Cada fase incluye programas especificos con audiencia definida y metricas de exito."));
children.push(spacer(60));

// FASE 1
children.push(accentBox(
  "FASE 1 — LANZAMIENTO INMEDIATO (Mes 1-2)",
  [
    [{ text: "Programas: ", bold: true, color: C.green }, { text: "Ninos en Equilibrio + Decodificacion Total" }],
    "",
    [{ text: "Por que estos primero: ", bold: true }, { text: "Los dos con mayor puntuacion (23/25 cada uno). Se complementan en audiencia: mamas/papas (Ninos) y personas con enfermedades cronicas (Decodificacion). Juntos demuestran la versatilidad del modelo de 3 niveles." }],
    "",
    [{ text: "Acciones de Fase 1:", bold: true }],
    "1. Disenar Nivel 1 de ambos programas (contenido, materiales, nombre comercial)",
    "2. Crear landing pages con nombre comercial: 'Entendiendo a mi Hijo' y 'Por Que Enferme?'",
    "3. Lanzar campana de ads en Facebook/Instagram (mamas para Ninos, personas con enfermedad para Decodificacion)",
    "4. Ejecutar primer evento Nivel 1 para cada programa (fin de semana)",
    "5. Medir conversion a Nivel 2 (meta: 20%+ de N1 se inscriben a N2)",
    "",
    [{ text: "Metricas de exito: ", bold: true }, { text: "50+ alumnos en N1 de cada programa. 10+ inscritos a N2. Testimonios grabados de al menos 5 participantes." }],
    [{ text: "Inversion estimada: ", bold: true }, { text: "Ads: $500-$1,000 USD/mes. Materiales: $300 USD. Total: ~$1,500 USD." }],
  ],
  C.lightGreen, C.green
));
children.push(spacer(80));

// FASE 2
children.push(accentBox(
  "FASE 2 — EXPANSION (Mes 3-4)",
  [
    [{ text: "Programas: ", bold: true, color: C.accent }, { text: "Reset Metabolico + Belleza Regenerativa + Terapia Creativa" }],
    "",
    [{ text: "Por que estos: ", bold: true }, { text: "Alta atraccion publica (metabolismo), alta monetizacion (belleza), y diferenciador unico (terapia creativa). Tres programas que abren tres mercados completamente distintos." }],
    "",
    [{ text: "Acciones de Fase 2:", bold: true }],
    "1. Lanzar los Nivel 1 de los 3 programas en paralelo (un fin de semana cada uno)",
    "2. Nombre comercial: 'Tu Metabolismo Importa', 'Rostro Vivo', 'Desbloquea Tu Creatividad'",
    "3. Ejecutar los Nivel 2 de Ninos y Decodificacion (de Fase 1)",
    "4. Implementar sistema de mentores con veteranos en los N1 de Fase 1",
    "5. Crear el Mapa de Formacion visual (fisico y digital)",
    "",
    [{ text: "Metricas: ", bold: true }, { text: "3 eventos N1 ejecutados. 15+ alumnos en N2 de Fase 1. Mapa de Formacion operativo." }],
  ],
  C.light, C.accent
));
children.push(spacer(80));

// FASE 3
children.push(accentBox(
  "FASE 3 — CONSOLIDACION (Mes 5-6)",
  [
    [{ text: "Programas: ", bold: true, color: C.yellow }, { text: "Sanacion Animal + Casa y Cuerpo Sano + Despertar y Proposito" }],
    "",
    [{ text: "Por que estos: ", bold: true }, { text: "Nichos unicos con cero competencia. Crecimiento organico a traves de comunidades leales. Generan contenido viral (especialmente animales). Completan el catalogo de 10 programas." }],
    "",
    [{ text: "Acciones de Fase 3:", bold: true }],
    "1. Lanzar los Nivel 1 de los 3 programas",
    "2. Ejecutar los primeros Nivel 3 de Ninos y Decodificacion (primera generacion de certificados)",
    "3. Iniciar Nivel 2 de los programas de Fase 2",
    "4. Lanzar Bioenergetica Avanzada como programa permanente para terapeutas avanzados",
    "5. Integrar modulos de Anti-Estres dentro de Decodificacion y Reset como complemento",
    "6. Evaluar resultados globales y ajustar estrategia para segundo semestre",
    "",
    [{ text: "Metricas: ", bold: true }, { text: "10 programas activos. Primera generacion de certificados N3. 200+ alumnos totales en el ecosistema." }],
  ],
  C.lightYellow, C.yellow
));
children.push(spacer(80));

children.push(accentBox(
  "PERMANENTE — Educacion Continua",
  [
    [{ text: "Bioenergetica Avanzada: ", bold: true }, { text: "Siempre disponible para terapeutas que quieren profundizar. No tiene Nivel 1 masivo; empieza en N2." }],
    [{ text: "Anti-Estres y Sueno: ", bold: true }, { text: "Mejor como modulo complementario dentro de Decodificacion y Reset Metabolico, no como programa independiente." }],
    [{ text: "Par Biomagnetico: ", bold: true }, { text: "Siempre disponible como curso insignia. Gateway de $97 + version profesional. Prerequisito de multiples N3." }],
    [{ text: "Electivos: ", bold: true }, { text: "Acupuntura Munecas/Tobillos como taller de 1 dia en eventos presenciales." }],
  ],
  C.lightPurple, C.purple
));

// ══════════ SECTION 13: PRECIOS Y PROYECCION ══════════
children.push(pageBreak());
children.push(sectionDivider("13. Estrategia de Precios y Proyeccion de Ingresos"));
children.push(spacer(60));

children.push(h3("Estructura de precios por nivel"));

const preciosColWidths = [2340, 2340, 2340, 2340];
const preciosRows = [
  new TableRow({ children: [
    headerCell("Concepto", 2340, C.darkGray),
    headerCell("Nivel 1", 2340, C.green),
    headerCell("Nivel 2", 2340, C.yellow),
    headerCell("Nivel 3", 2340, C.red),
  ]}),
  new TableRow({ children: [
    cell("Precio base", 2340, { bold: true, fill: C.gray }),
    cell("$97 - $197 USD", 2340, { bold: true }),
    cell("$497 - $797 USD", 2340, { bold: true }),
    cell("$1,200 - $2,000 USD", 2340, { bold: true }),
  ]}),
  new TableRow({ children: [
    cell("Duracion", 2340, { bold: true, fill: C.gray }),
    cell("1 fin de semana (2 dias)", 2340),
    cell("3 meses (3 modulos)", 2340),
    cell("6-9 meses + supervision", 2340),
  ]}),
  new TableRow({ children: [
    cell("Alumnos por grupo", 2340, { bold: true, fill: C.gray }),
    cell("30-80 personas", 2340),
    cell("15-25 personas", 2340),
    cell("8-15 personas", 2340),
  ]}),
  new TableRow({ children: [
    cell("Ingreso por grupo", 2340, { bold: true, fill: C.gray }),
    cell("$2,910 - $15,760", 2340),
    cell("$7,455 - $19,925", 2340),
    cell("$9,600 - $30,000", 2340),
  ]}),
  new TableRow({ children: [
    cell("Certificacion", 2340, { bold: true, fill: C.gray }),
    cell("Constancia", 2340),
    cell("Certificado competencia", 2340),
    cell("Certificacion profesional", 2340),
  ]}),
];

children.push(new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: preciosColWidths, rows: preciosRows }));
children.push(spacer(80));

children.push(h3("Proyeccion conservadora: Primer ano (con 4 programas activos)"));

children.push(p("Escenario basado en lanzar 4 programas con Nivel 1 en el primer ano, con conversion a N2 y N3:"));
children.push(spacer(40));

const projRows = [
  new TableRow({ children: [
    headerCell("Concepto", 3120, C.darkGray),
    headerCell("Cantidad", 2080),
    headerCell("Precio prom.", 2080),
    headerCell("Ingreso", 2080, C.green),
  ]}),
  new TableRow({ children: [
    cell("Eventos Nivel 1 (8 eventos x 40 alumnos)", 3120, { fill: C.lightGreen }),
    cell("320 alumnos", 2080, { fill: C.lightGreen }),
    cell("$147 USD", 2080, { fill: C.lightGreen }),
    cell("$47,040 USD", 2080, { fill: C.lightGreen, bold: true }),
  ]}),
  new TableRow({ children: [
    cell("Nivel 2 (20% de N1 = 64 alumnos, 4 grupos)", 3120, { fill: C.lightYellow }),
    cell("64 alumnos", 2080, { fill: C.lightYellow }),
    cell("$647 USD", 2080, { fill: C.lightYellow }),
    cell("$41,408 USD", 2080, { fill: C.lightYellow, bold: true }),
  ]}),
  new TableRow({ children: [
    cell("Nivel 3 (35% de N2 = 22 alumnos, 2 grupos)", 3120, { fill: C.lightRed }),
    cell("22 alumnos", 2080, { fill: C.lightRed }),
    cell("$1,600 USD", 2080, { fill: C.lightRed }),
    cell("$35,200 USD", 2080, { fill: C.lightRed, bold: true }),
  ]}),
  new TableRow({ children: [
    cell("TOTAL PROYECTADO ANo 1", 3120, { bold: true, fill: C.light }),
    cell("406 alumnos", 2080, { bold: true, fill: C.light }),
    cell("", 2080, { fill: C.light }),
    cell("$123,648 USD", 2080, { bold: true, fill: C.light, color: C.green }),
  ]}),
];

children.push(new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [3120, 2080, 2080, 2080], rows: projRows }));

children.push(spacer(80));
children.push(p("Nota: Esta proyeccion NO incluye ingresos de pares serializados, cursos de Par Biomagnetico, electivos ni eventos especiales como el Seminario Anual. El ingreso real sera superior.", { italics: true, color: C.darkGray }));

// ══════════ SECTION 14: PROXIMOS PASOS ══════════
children.push(pageBreak());
children.push(sectionDivider("14. Proximos Pasos"));
children.push(spacer(60));

children.push(p("Con la aprobacion del equipo, estos son los pasos inmediatos para implementar la propuesta:"));
children.push(spacer(40));

const pasos = [
  ["Semana 1-2", "Validar la propuesta con el Dr. Ojeda y el equipo. Definir cuales programas se lanzan primero. Confirmar precios y fechas."],
  ["Semana 3-4", "Disenar el contenido de Nivel 1 de los 2 primeros programas (Ninos + Decodificacion). Crear nombre comercial, landing page y materiales."],
  ["Semana 5-6", "Preparar campana de ads. Configurar sistema de inscripcion. Identificar y briefear a los primeros veteranos-mentores."],
  ["Semana 7-8", "Lanzar campana de ads. Abrir inscripciones. Ejecutar primer evento de Nivel 1."],
  ["Mes 3", "Evaluar resultados del primer evento. Medir conversion a N2. Lanzar Fase 2 (Reset + Belleza + Terapia Creativa)."],
  ["Mes 4-6", "Ejecutar Fase 2 y 3 progresivamente. Iniciar primeros N2 y N3. Crear Mapa de Formacion visual."],
];

const pasosRows = [
  new TableRow({ children: [
    headerCell("Cuando", 2000),
    headerCell("Que hacer", 7360),
  ]})
];

pasos.forEach(([cuando, que], i) => {
  const fill = i % 2 === 0 ? C.gray : C.white;
  pasosRows.push(new TableRow({ children: [
    cell(cuando, 2000, { bold: true, fill, color: C.primary }),
    cell(que, 7360, { fill, size: 19 }),
  ]}));
});

children.push(new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [2000, 7360], rows: pasosRows }));

children.push(spacer(100));

// Final box
children.push(new Table({
  width: { size: W, type: WidthType.DXA },
  columnWidths: [W],
  rows: [new TableRow({
    children: [new TableCell({
      width: { size: W, type: WidthType.DXA },
      borders: { top: { style: BorderStyle.SINGLE, size: 8, color: C.primary }, bottom: { style: BorderStyle.SINGLE, size: 8, color: C.primary }, left: noBorder, right: noBorder },
      shading: { fill: C.light, type: ShadingType.CLEAR },
      margins: { top: 200, bottom: 200, left: 300, right: 300 },
      children: [
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [
          new TextRun({ text: "RESUMEN EJECUTIVO", font: "Arial", size: 30, bold: true, color: C.primary })
        ]}),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: [
          new TextRun({ text: "26 cursos independientes  ", font: "Arial", size: 24, color: C.darkGray }),
          new TextRun({ text: ">>>  ", font: "Arial", size: 24, color: C.red, bold: true }),
          new TextRun({ text: "10 programas integrados", font: "Arial", size: 24, bold: true, color: C.green }),
        ]}),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: [
          new TextRun({ text: "Un solo nivel  ", font: "Arial", size: 24, color: C.darkGray }),
          new TextRun({ text: ">>>  ", font: "Arial", size: 24, color: C.red, bold: true }),
          new TextRun({ text: "3 niveles de profundidad", font: "Arial", size: 24, bold: true, color: C.green }),
        ]}),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: [
          new TextRun({ text: "Alumnos reciclados  ", font: "Arial", size: 24, color: C.darkGray }),
          new TextRun({ text: ">>>  ", font: "Arial", size: 24, color: C.red, bold: true }),
          new TextRun({ text: "Mentores y facilitadores", font: "Arial", size: 24, bold: true, color: C.green }),
        ]}),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: [
          new TextRun({ text: "Precio unico por curso  ", font: "Arial", size: 24, color: C.darkGray }),
          new TextRun({ text: ">>>  ", font: "Arial", size: 24, color: C.red, bold: true }),
          new TextRun({ text: "Escalera $97 a $2,000 USD", font: "Arial", size: 24, bold: true, color: C.green }),
        ]}),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: [
          new TextRun({ text: "Solo para terapeutas  ", font: "Arial", size: 24, color: C.darkGray }),
          new TextRun({ text: ">>>  ", font: "Arial", size: 24, color: C.red, bold: true }),
          new TextRun({ text: "Nivel 1 para todo publico", font: "Arial", size: 24, bold: true, color: C.green }),
        ]}),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: [
          new TextRun({ text: "Techo de crecimiento  ", font: "Arial", size: 24, color: C.darkGray }),
          new TextRun({ text: ">>>  ", font: "Arial", size: 24, color: C.red, bold: true }),
          new TextRun({ text: "Escalera de valor infinita", font: "Arial", size: 24, bold: true, color: C.green }),
        ]}),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 }, children: [
          new TextRun({ text: "Proyeccion conservadora Ano 1: $123,648 USD con solo 4 programas activos", font: "Arial", size: 22, bold: true, color: C.primary }),
        ]}),
      ]
    })]
  })]
}));

// ─── CREATE DOCUMENT ───
const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, font: "Arial", color: C.primary },
        paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Arial", color: C.accent },
        paragraph: { spacing: { before: 240, after: 160 }, outlineLevel: 1 } },
    ]
  },
  numbering: numberingConfig,
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: C.accent, space: 4 } },
          tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
          children: [
            new TextRun({ text: "Instituto Centrobioenergetica", font: "Arial", size: 16, color: C.accent, italics: true }),
            new TextRun({ text: "\tPropuesta Estrategica 2026", font: "Arial", size: 16, color: C.darkGray, italics: true }),
          ]
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "Pagina ", font: "Arial", size: 16, color: C.darkGray }),
            new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 16, color: C.darkGray }),
          ]
        })]
      })
    },
    children
  }]
});

const outPath = "/Users/miguel/Centrobioenergetica Instituto/Propuesta_Estrategica_Instituto_2026.docx";
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outPath, buffer);
  console.log("Document created: " + outPath);
});
