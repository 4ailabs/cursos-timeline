#!/usr/bin/env python3.11
"""
Generador de PDFs — Lo Que Tu Mascota Quiere Decirte · Módulo 1
Instituto Centrobioenergetica — Dr. Miguel Ojeda Rios
"""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import cm, mm
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, KeepTogether, PageBreak, KeepInFrame
)

# ─── Medidas A4 ──────────────────────────────────────────────────────────────
W, H   = A4                              # 595.3 x 841.9 pt
MAR    = 1.8 * cm                        # 51 pt
MW     = W - 2 * MAR                     # 493 pt  — ancho útil
MW2    = MW / 2 - 4                      # 242.6 pt — media columna (con gap)
MAR2   = 2.2 * cm                        # márgenes para documento largo

# ─── Paleta ──────────────────────────────────────────────────────────────────
C_HDR  = colors.HexColor('#0B5345')      # verde oscuro — header principal
C_MED  = colors.HexColor('#148F77')      # teal — header de tabla
C_CLR  = colors.HexColor('#A9DFBF')      # verde claro — líneas decorativas
C_BG   = colors.HexColor('#E8F8F5')      # fondo fila alterna
C_ALR  = colors.HexColor('#1A5276')      # azul — sección alerta
C_TXT  = colors.HexColor('#1C1C1C')      # texto principal
C_CAP  = colors.HexColor('#566573')      # caption / pie
C_LIN  = colors.HexColor('#D5D8DC')      # separadores
C_WHT  = colors.white

OUTPUT_DIR = os.path.join(os.path.dirname(__file__),
                          '..', 'Material_Alumnos', 'PDF_Imprimibles')
os.makedirs(OUTPUT_DIR, exist_ok=True)


# ─── Estilos ─────────────────────────────────────────────────────────────────
def _s(name, **kw):
    return ParagraphStyle(name, **kw)

S = {
    # Layout general
    'titulo':  _s('titulo',  fontName='Helvetica-Bold', fontSize=16,
                  textColor=C_HDR, leading=20, spaceAfter=2),
    'sub':     _s('sub',     fontName='Helvetica', fontSize=9,
                  textColor=C_CAP, leading=12, spaceAfter=6),
    'seccion': _s('seccion', fontName='Helvetica-Bold', fontSize=10.5,
                  textColor=C_HDR, spaceBefore=8, spaceAfter=4, leading=13),

    # Banner de sección (texto blanco sobre fondo color)
    'ban':     _s('ban',     fontName='Helvetica-Bold', fontSize=9,
                  textColor=C_WHT, leading=12),

    # Cuerpo
    'body':    _s('body',    fontName='Helvetica', fontSize=9,
                  textColor=C_TXT, leading=13, spaceAfter=4),
    'bodyb':   _s('bodyb',   fontName='Helvetica-Bold', fontSize=9,
                  textColor=C_TXT, leading=13, spaceAfter=4),
    'bul':     _s('bul',     fontName='Helvetica', fontSize=9,
                  textColor=C_TXT, leading=13, spaceAfter=3,
                  leftIndent=12, firstLineIndent=-8),

    # Tablas normales (9 col max 2)
    'th':      _s('th',      fontName='Helvetica-Bold', fontSize=8.5,
                  textColor=C_WHT, leading=11, alignment=TA_CENTER),
    'td':      _s('td',      fontName='Helvetica', fontSize=8.5,
                  textColor=C_TXT, leading=12, alignment=TA_LEFT),
    'tdb':     _s('tdb',     fontName='Helvetica-Bold', fontSize=8.5,
                  textColor=C_TXT, leading=12),
    'tdc':     _s('tdc',     fontName='Helvetica', fontSize=8.5,
                  textColor=C_TXT, leading=12, alignment=TA_CENTER),

    # Tablas densas (4-5 columnas)
    'thd':     _s('thd',     fontName='Helvetica-Bold', fontSize=7.5,
                  textColor=C_WHT, leading=10, alignment=TA_CENTER),
    'tdd':     _s('tdd',     fontName='Helvetica', fontSize=7.5,
                  textColor=C_TXT, leading=10.5, alignment=TA_LEFT),
    'tddb':    _s('tddb',    fontName='Helvetica-Bold', fontSize=7.5,
                  textColor=C_TXT, leading=10.5),
    'tddc':    _s('tddc',    fontName='Helvetica', fontSize=7.5,
                  textColor=C_TXT, leading=10.5, alignment=TA_CENTER),

    # Pie y notas
    'pie':     _s('pie',     fontName='Helvetica', fontSize=7.5,
                  textColor=C_CAP, alignment=TA_CENTER, leading=10),
    'nota':    _s('nota',    fontName='Helvetica-Oblique', fontSize=8,
                  textColor=C_CAP, leading=11),
    'aviso':   _s('aviso',   fontName='Helvetica-Bold', fontSize=9,
                  textColor=C_ALR, alignment=TA_CENTER),

    # Documento largo
    'cap':     _s('cap',     fontName='Helvetica-Bold', fontSize=14,
                  textColor=C_HDR, spaceBefore=12, spaceAfter=4, leading=18),
    'h3':      _s('h3',      fontName='Helvetica-Bold', fontSize=11,
                  textColor=C_MED, spaceBefore=10, spaceAfter=4, leading=14),
    'prose':   _s('prose',   fontName='Helvetica', fontSize=9.5,
                  textColor=C_TXT, leading=14, spaceAfter=6, alignment=TA_JUSTIFY),
    'pbul':    _s('pbul',    fontName='Helvetica', fontSize=9.5,
                  textColor=C_TXT, leading=14, spaceAfter=4,
                  leftIndent=14, firstLineIndent=-10),
    'quote':   _s('quote',   fontName='Helvetica-Oblique', fontSize=10,
                  textColor=C_HDR, spaceBefore=8, spaceAfter=8,
                  alignment=TA_CENTER, leading=14),
    'capnum':  _s('capnum',  fontName='Helvetica', fontSize=9,
                  textColor=C_CAP, spaceAfter=2),
}


# ─── Componentes ─────────────────────────────────────────────────────────────
def p(txt, style='body'):
    return Paragraph(txt, S[style])

def banner(txt, color=C_HDR):
    """Banda de color con texto blanco."""
    t = Table([[p(txt, 'ban')]], colWidths=[MW])
    t.setStyle(TableStyle([
        ('BACKGROUND',    (0,0), (-1,-1), color),
        ('TOPPADDING',    (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING',   (0,0), (-1,-1), 10),
        ('RIGHTPADDING',  (0,0), (-1,-1), 6),
    ]))
    return t

def hr(thick=1, color=C_CLR, after=6):
    return HRFlowable(width=MW, thickness=thick, color=color, spaceAfter=after)

def header(titulo, subtitulo):
    return [
        hr(3, C_HDR, 5),
        p(titulo, 'titulo'),
        p(subtitulo, 'sub'),
        hr(1, C_CLR, 8),
    ]

def pie(doc_titulo, fecha='27 marzo 2026', extra=''):
    txt = f'Instituto Centrobioenergetica · Dr. Miguel Ojeda Rios · {doc_titulo} · {fecha}'
    if extra:
        txt += f'  ·  {extra}'
    return p(txt, 'pie')


def _tabla_base(headers, rows, col_widths, dense=False, alt=C_BG):
    """Tabla interna reutilizable."""
    hs  = 'thd' if dense else 'th'
    cs  = 'tdd' if dense else 'td'
    pad = (3, 3) if dense else (5, 5)

    data = [[p(h, hs) for h in headers]]
    for row in rows:
        data.append([
            p(str(c), cs) if isinstance(c, str) else c
            for c in row
        ])

    t = Table(data, colWidths=col_widths, repeatRows=1, splitByRow=1)
    t.setStyle(TableStyle([
        ('BACKGROUND',    (0, 0), (-1, 0),  C_MED),
        ('ALIGN',         (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN',        (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING',    (0, 0), (-1, -1), pad[0]),
        ('BOTTOMPADDING', (0, 0), (-1, -1), pad[1]),
        ('LEFTPADDING',   (0, 0), (-1, -1), 6),
        ('RIGHTPADDING',  (0, 0), (-1, -1), 4),
        ('GRID',          (0, 0), (-1, -1), 0.3, C_LIN),
        ('ROWBACKGROUNDS',(0, 1), (-1, -1), [C_WHT, alt]),
    ]))
    return t

def tabla(headers, rows, col_widths, alt=C_BG):
    return _tabla_base(headers, rows, col_widths, dense=False, alt=alt)

def tabla_d(headers, rows, col_widths, alt=C_BG):
    """Tabla densa — fuente 7.5pt para 4-5 columnas."""
    return _tabla_base(headers, rows, col_widths, dense=True, alt=alt)

def caja(items, width=None):
    """Envuelve lista de flowables en una sola columna Table."""
    w = width or MW
    data = [[item] for item in items]
    t = Table(data, colWidths=[w])
    t.setStyle(TableStyle([
        ('TOPPADDING',    (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
        ('LEFTPADDING',   (0, 0), (-1, -1), 0),
        ('RIGHTPADDING',  (0, 0), (-1, -1), 0),
    ]))
    return t


# ════════════════════════════════════════════════════════════════════════════
#  1. REFRIGERATOR SHEET — full-width, sin KeepInFrame
# ════════════════════════════════════════════════════════════════════════════
def generar_refrigerator_sheet():
    path = os.path.join(OUTPUT_DIR, '01_Rutina_Diaria.pdf')
    doc = SimpleDocTemplate(path, pagesize=A4,
        leftMargin=MAR, rightMargin=MAR,
        topMargin=1.4*cm, bottomMargin=1.4*cm)

    story = []

    # Header
    story += header(
        'Tu Rutina con Tu Mascota',
        'Instituto Centrobioenergetica · Dr. Miguel Ojeda Rios · '
        'Lo Que Tu Mascota Quiere Decirte — Módulo 1')

    # ── SECCIÓN 1: TODOS LOS DÍAS ──────────────────────────────────────────
    story.append(banner('TODOS LOS DÍAS — 2 minutos'))
    story.append(Spacer(1, 5))

    data_obs = [
        [p('Mira a tu mascota en silencio al llegar a casa.', 'bodyb'),
         p('¿Está igual que ayer?', 'bodyb')],
        [p('Sin herramientas. Solo observar.', 'body'),
         p('→ Sí: bien.\n→ No: pregúntate — <i>¿qué cargo yo hoy?</i>', 'body')],
    ]
    t1 = Table(data_obs, colWidths=[MW * 0.55, MW * 0.45])
    t1.setStyle(TableStyle([
        ('BACKGROUND',    (1, 0), (1, -1), C_BG),
        ('TOPPADDING',    (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING',   (0, 0), (-1, -1), 8),
        ('RIGHTPADDING',  (0, 0), (-1, -1), 8),
        ('VALIGN',        (0, 0), (-1, -1), 'TOP'),
        ('BOX',           (0, 0), (-1, -1), 0.5, C_CLR),
        ('LINEAFTER',     (0, 0), (0, -1),  0.5, C_CLR),
    ]))
    story.append(t1)
    story.append(Spacer(1, 8))

    # ── SECCIÓN 2: FLORES DE BACH ─────────────────────────────────────────
    story.append(banner('CADA SEMANA — Flores de Bach'))
    story.append(Spacer(1, 5))

    flores_rows = [
        ['Lu–Vi:', '4 gotas de tu fórmula en el agua de beber'],
        ['Si hay cambio, estrés o visitas:', '+ Walnut ese día (protección de absorción del campo)'],
        ['Si hubo susto fuerte:', 'Rescue Remedy directo · cada 15 min · hasta que se calme'],
        ['Si rastreo = fuente es el dueño:', 'La misma fórmula también para el dueño — el sistema es uno'],
    ]
    tf = Table(
        [[p(r[0], 'tdb'), p(r[1], 'td')] for r in flores_rows],
        colWidths=[MW * 0.32, MW * 0.68])
    tf.setStyle(TableStyle([
        ('ROWBACKGROUNDS', (0, 0), (-1, -1), [C_WHT, C_BG]),
        ('TOPPADDING',    (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING',   (0, 0), (-1, -1), 8),
        ('RIGHTPADDING',  (0, 0), (-1, -1), 6),
        ('GRID',          (0, 0), (-1, -1), 0.3, C_LIN),
        ('VALIGN',        (0, 0), (-1, -1), 'TOP'),
    ]))
    story.append(tf)
    story.append(Spacer(1, 8))

    # ── SECCIÓN 3: RASTREO CON PÉNDULO ───────────────────────────────────
    story.append(banner('CADA SEMANA — Rastreo con Péndulo'))
    story.append(Spacer(1, 5))
    story.append(p('Foto de tu mascota · hoja de sensaciones básicas · 10 minutos', 'body'))
    story.append(Spacer(1, 4))

    rastreo_rows = [
        ['Paso 1', '¿Qué siente?',
         'Recorre las 12 sensaciones en 3 grupos · anota lo que confirma el péndulo'],
        ['Paso 2', '¿De dónde viene?',
         'Para cada sensación confirmada: ¿del animal? ¿del dueño? ¿del ambiente?'],
    ]
    tr = Table(
        [[p(r[0], 'tdb'), p(r[1], 'tdb'), p(r[2], 'td')] for r in rastreo_rows],
        colWidths=[1.2*cm, 2.6*cm, MW - 1.2*cm - 2.6*cm])
    tr.setStyle(TableStyle([
        ('ROWBACKGROUNDS', (0, 0), (-1, -1), [C_WHT, C_BG]),
        ('BACKGROUND',    (0, 0), (0, -1), C_BG),
        ('TOPPADDING',    (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING',   (0, 0), (-1, -1), 8),
        ('RIGHTPADDING',  (0, 0), (-1, -1), 6),
        ('GRID',          (0, 0), (-1, -1), 0.3, C_LIN),
        ('VALIGN',        (0, 0), (-1, -1), 'MIDDLE'),
    ]))
    story.append(tr)
    story.append(Spacer(1, 3))
    story.append(p('<i>Sin péndulo: usa las 3 preguntas del campo mórfico al reverso de la hoja de rastreo</i>', 'nota'))
    story.append(Spacer(1, 8))

    # ── SECCIÓN 4: SEÑALES DE ALERTA ─────────────────────────────────────
    story.append(banner('SEÑALES DE ALERTA', color=C_ALR))
    story.append(Spacer(1, 5))

    alertas = [
        ['Cambio de comportamiento súbito',
         '→ Revisa qué pasó en tu vida en 48 h\n→ Si persiste más de 2 días: veterinario'],
        ['Síntoma físico nuevo',
         '→ Veterinario primero · siempre\n→ Luego: hoja de rastreo para ver qué está activo'],
        ['Rechazo de alimento más de 2 días',
         '→ Veterinario ese día · no esperar\n→ Revisa si hay pérdida de propósito o duelo en el hogar'],
    ]
    ta = Table(
        [[p(f'<b>{a[0]}</b>', 'td'), p(a[1], 'td')] for a in alertas],
        colWidths=[MW * 0.38, MW * 0.62])
    ta.setStyle(TableStyle([
        ('ROWBACKGROUNDS', (0, 0), (-1, -1), [C_WHT, C_BG]),
        ('TOPPADDING',    (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING',   (0, 0), (-1, -1), 8),
        ('RIGHTPADDING',  (0, 0), (-1, -1), 6),
        ('GRID',          (0, 0), (-1, -1), 0.3, C_LIN),
        ('VALIGN',        (0, 0), (-1, -1), 'TOP'),
    ]))
    story.append(ta)
    story.append(Spacer(1, 10))

    # ── ÍNDICE DE HOJAS ──────────────────────────────────────────────────
    story.append(hr())
    story.append(p('LAS HOJAS QUE TIENES', 'seccion'))
    story.append(tabla(
        ['Hoja', 'Para qué'],
        [
            ['Sistemas y Patrones  (Bloque 2)',
             'Leer síntomas y patrones relacionales'],
            ['Flores de Bach  (Bloque 4)',
             '17 flores · 5 fórmulas · preparación'],
            ['Rastreo con Péndulo  (Bloque 5 — cara A)',
             '12 sensaciones · 3 grupos · fuente'],
            ['Instintos por Especie  (Bloque 5 — cara B)',
             'Instinto primario bloqueado por especie'],
            ['Esta hoja',
             'Rutina diaria y semanal — resumen de todo'],
        ],
        [MW * 0.44, MW * 0.56]
    ))
    story.append(Spacer(1, 8))
    story.append(hr())
    story.append(p('Veterinario primero · siempre · esto es complementario', 'aviso'))
    story.append(Spacer(1, 4))
    story.append(pie('Módulo 1', extra='Módulo 2: viernes 10 de abril · 3:00 pm'))

    doc.build(story)
    print('  ✓ 01_Rutina_Diaria.pdf')


# ════════════════════════════════════════════════════════════════════════════
#  2. SISTEMAS Y PATRONES
# ════════════════════════════════════════════════════════════════════════════
def generar_hoja_sistemas():
    path = os.path.join(OUTPUT_DIR, '02_Sistemas_y_Patrones.pdf')
    doc = SimpleDocTemplate(path, pagesize=A4,
        leftMargin=MAR, rightMargin=MAR,
        topMargin=1.4*cm, bottomMargin=1.4*cm)

    story = []
    story += header(
        'Cómo Leer Lo Que Muestra Tu Mascota',
        'Lo Que Tu Mascota Quiere Decirte · Módulo 1 · Bloque 2  —  '
        'Instituto Centrobioenergetica · Dr. Miguel Ojeda Rios')

    story.append(p(
        'Cuando el veterinario ya descartó todo y el síntoma persiste, hay dos preguntas clave: '
        '<b>¿Qué nivel de estrés crónico vive este animal?  ·  '
        '¿Alguno de sus instintos naturales está siendo bloqueado?</b>'))
    story.append(Spacer(1, 8))

    # PARTE 1 — Estrés en sistemas
    # Widths: sistema 2.6 + lo_que 5.2 + pregunta restante = MW
    W1 = [2.6*cm, MW/2 - 1.3*cm, MW - 2.6*cm - (MW/2 - 1.3*cm)]
    story.append(KeepTogether([
        banner('PARTE 1 — El Estrés Crónico en los Sistemas del Animal'),
        Spacer(1, 5),
        tabla(
            ['Sistema', 'Lo que muestra el animal', 'Pregunta para el entorno'],
            [
                ['Digestivo',
                 'Vómito recurrente · diarrea que no cede · pérdida de apetito sostenida',
                 '¿Qué nivel de tensión crónica hay en el entorno que no se resuelve?'],
                ['Piel',
                 'Dermatitis recurrente · rascado compulsivo · calvas por sobreaseo (gatos)',
                 '¿Hubo un cambio significativo en el sistema de convivencia cerca del inicio?'],
                ['Urinario (esp. gatos)',
                 'Cistitis sin causa estructural · marcaje fuera del arenero',
                 '¿Qué hay en el entorno que es inestable o impredecible de forma crónica?'],
                ['Conductual',
                 'Ansiedad de separación · agresividad reactiva · apatía sin causa médica',
                 '¿Qué activa el sistema nervioso de este animal de forma sostenida?'],
            ],
            W1),
        Spacer(1, 3),
        p('<i>Ref: Cistitis idiopática felina — reconocida como trastorno relacionado con estrés ambiental (AAFP).</i>',
          'nota'),
    ]))

    story.append(Spacer(1, 8))

    # PARTE 2 — Instintos
    W2 = [2.4*cm, (MW - 2.4*cm) * 0.46, (MW - 2.4*cm) * 0.54]
    story.append(KeepTogether([
        banner('PARTE 2 — Los Instintos Primarios: Lo Que el Animal Necesita Hacer'),
        Spacer(1, 5),
        tabla(
            ['Especie', 'Instintos más frecuentemente bloqueados', 'Se ve como'],
            [
                ['Perro',
                 'Exploración grupal · trabajo con propósito · comunicación de manada',
                 'Ansiedad de separación · conductas destructivas · ladrido compulsivo'],
                ['Gato',
                 'Territorialidad vertical · caza solitaria · autosuficiencia',
                 'Estrés crónico · hiperactividad nocturna · sobreaseo'],
                ['Ave',
                 'Vuelo / movimiento · vida de bandada · forrajeo',
                 'Conductas compulsivas · silencio excesivo · estereotipias'],
                ['Conejo',
                 'Excavación · alimentación selectiva · vigilancia',
                 'Problemas digestivos · dentales · hipervigilancia'],
                ['Caballo',
                 'Movimiento libre · vida de manada · pastoreo continuo',
                 'Estereotipias orales · estrés digestivo · reactividad'],
            ],
            W2),
        Spacer(1, 3),
        p('<i>Ver reverso de la Hoja de Rastreo para tabla completa de instintos por especie.</i>', 'nota'),
    ]))

    story.append(Spacer(1, 8))

    # PARTE 3 — 7 patrones
    W3 = [3.6*cm, (MW - 3.6*cm) * 0.44, (MW - 3.6*cm) * 0.56]
    story.append(banner('PARTE 3 — Los 7 Patrones Relacionales Dueño-Animal'))
    story.append(Spacer(1, 3))
    story.append(p(
        'El estado emocional sostenido del dueño crea un campo específico que el animal percibe y expresa. '
        '<i>No son diagnósticos — son patrones de observación. Una pista, no una conclusión.</i>'))
    story.append(Spacer(1, 5))
    story.append(tabla(
        ['Patrón', 'En el dueño', 'En el animal'],
        [
            ['Absorción de Trauma',
             'Trauma no resuelto · duelo complicado',
             'Enfermedades crónicas sin causa clara · bloqueo de instintos de supervivencia'],
            ['Reflejo de Ansiedad',
             'Ansiedad generalizada · hipervigilancia',
             'Hiperactivación de alerta · ladrido compulsivo · incapacidad de calmarse'],
            ['Sobreprotección',
             'Control excesivo · miedo a perder',
             'Bloqueo de exploración y autonomía · dependencia total'],
            ['Abandono Emocional',
             'Presencia física · ausencia afectiva',
             'Hiperactivación del apego · ansiedad de separación intensa'],
            ['Conflicto de Roles',
             'Humaniza al animal · proyecta roles humanos',
             'Bloqueo de TODOS los instintos naturales al mismo tiempo'],
            ['Energía Depresiva',
             'Depresión · apatía · pérdida de propósito',
             'Supresión de vitalidad · letargia · animal "apagado"'],
            ['Culpa del Dueño',
             'Culpa crónica · sobrecompensación',
             'Bloqueo de expresión natural · sumisión patológica'],
        ],
        W3))
    story.append(Spacer(1, 3))
    story.append(p('<i>"El animal no acusa. Señala."</i>', 'nota'))
    story.append(Spacer(1, 8))

    # PARTE 4 — Correlaciones clínicas
    W4 = [MW * 0.37, MW * 0.63]
    story.append(banner('PARTE 4 — Lo Que Observamos Clínicamente'))
    story.append(Spacer(1, 3))
    story.append(p(
        'Cuando el veterinario descartó todo y el estrés está confirmado, estas correlaciones ayudan '
        'a afinar la pregunta al dueño. <b>No es un diccionario.</b> Es una pista para hacerse una pregunta.'))
    story.append(Spacer(1, 5))
    story.append(tabla(
        ['Lo que muestra el animal', 'Lo que vale la pena preguntarle al dueño'],
        [
            ['Vómito recurrente sin causa médica',
             '¿Hay algo que llevas tiempo sin poder resolver — algo que no terminas de digerir?'],
            ['Diarrea crónica que no cede',
             '¿Hay algo que necesitas soltar pero no puedes o no sabes cómo?'],
            ['Pérdida de apetito / apatía sostenida',
             '¿Hay una pérdida de propósito o energía depresiva de fondo en el hogar?'],
            ['Dermatitis / problemas de piel recurrentes',
             '¿Hubo una separación significativa cerca del inicio — persona, lugar, proyecto?'],
            ['Rascado compulsivo / zonas calvas',
             '¿Hay tensión sostenida en el hogar que todos cargan pero nadie habla?'],
            ['Ansiedad de separación extrema',
             '¿Cómo es tu relación con el abandono — real o anticipado?'],
            ['Agresividad territorial desproporcionada',
             '¿Qué tan seguro se siente tu propio territorio — trabajo, casa, límites?'],
            ['Problemas urinarios idiopáticos (gatos)',
             '¿Hay algo donde sientes que no puedes poner límites — no puedes marcar tu espacio?'],
            ['Otitis recurrente sin causa estructural',
             '¿Hay algo que estás evitando escuchar — una conversación, una verdad que pospones?'],
            ['Tumor mamario (perra o gata)',
             '¿Hay una preocupación intensa y sostenida por alguien que quieres, que llevas en silencio?'],
        ],
        W4))

    story.append(Spacer(1, 8))
    story.append(hr())
    story.append(p('Las 3 Preguntas de Observación', 'seccion'))
    story.append(p('Úsalas con la foto de tu mascota. En silencio. Sin necesidad de compartir.'))
    story.append(Spacer(1, 4))

    preguntas = [
        ('1', '¿Cuál es el síntoma o conducta que más te llama la atención? ¿Es físico o conductual?'),
        ('2', '¿Cuándo apareció? ¿Qué más estaba cambiando en el entorno del animal en esas semanas?'),
        ('3', '¿Alguno de los instintos propios de su especie está bloqueado en el entorno que le has creado?'),
    ]
    tpreg = Table(
        [[p(f'<b>{n}</b>', 'tdc'), p(txt, 'td')] for n, txt in preguntas],
        colWidths=[0.8*cm, MW - 0.8*cm])
    tpreg.setStyle(TableStyle([
        ('ROWBACKGROUNDS', (0, 0), (-1, -1), [C_WHT, C_BG]),
        ('TOPPADDING',    (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING',   (0, 0), (-1, -1), 8),
        ('GRID',          (0, 0), (-1, -1), 0.3, C_LIN),
        ('VALIGN',        (0, 0), (-1, -1), 'MIDDLE'),
    ]))
    story.append(tpreg)

    story.append(Spacer(1, 8))
    story.append(hr())
    story.append(pie('Bloque 2'))
    doc.build(story)
    print('  ✓ 02_Sistemas_y_Patrones.pdf')


# ════════════════════════════════════════════════════════════════════════════
#  3. FLORES DE BACH
# ════════════════════════════════════════════════════════════════════════════
def generar_hoja_flores():
    path = os.path.join(OUTPUT_DIR, '03_Flores_de_Bach.pdf')
    doc = SimpleDocTemplate(path, pagesize=A4,
        leftMargin=MAR, rightMargin=MAR,
        topMargin=1.4*cm, bottomMargin=1.4*cm)

    story = []
    story += header(
        'Flores de Bach para Tu Mascota — Hoja de Referencia',
        'Lo Que Tu Mascota Quiere Decirte · Módulo 1 + Módulo 2  —  '
        'Instituto Centrobioenergetica · Dr. Miguel Ojeda Rios')

    # PREPARACIÓN
    story.append(banner('CÓMO PREPARAR EL FRASCO DE TRATAMIENTO'))
    story.append(Spacer(1, 5))

    prep = [
        ('Frasco',         'Vidrio color ámbar con gotero'),
        ('Base',           '5 ml de plata coloidal'),
        ('Esencias',       '2 gotas de cada flor · máximo 7 flores por fórmula'),
        ('Completar',      'Agua de manantial'),
        ('Administración', '4 gotas · 4 veces al día · boca, encías, orejas o agua de beber'),
        ('Duración',       '28 días aproximadamente por frasco'),
        ('Emergencia',     'Rescue Remedy directo · cada 15 minutos · hasta que el animal se calme'),
    ]
    tprep = Table(
        [[p(f'<b>{k}</b>', 'td'), p(v, 'td')] for k, v in prep],
        colWidths=[3.2*cm, MW - 3.2*cm])
    tprep.setStyle(TableStyle([
        ('BACKGROUND',    (0, 0), (0, -1), C_BG),
        ('ROWBACKGROUNDS',(1, 0), (1, -1), [C_WHT, C_BG]),
        ('TOPPADDING',    (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING',   (0, 0), (-1, -1), 8),
        ('GRID',          (0, 0), (-1, -1), 0.3, C_LIN),
        ('VALIGN',        (0, 0), (-1, -1), 'TOP'),
    ]))
    story.append(tprep)
    story.append(Spacer(1, 3))
    story.append(p('<i>Sin alcohol. Sin sobredosis posible. Compatibles con cualquier tratamiento veterinario.</i>',
                   'nota'))
    story.append(Spacer(1, 8))

    # Tabla densa 4 columnas — anchos precisos sumando a MW
    # Flor: 3.2cm · Para qué: 28% · Se ve como: 34% · Distinción: 38%
    FLOR = 3.2 * cm
    REST = MW - FLOR
    Wf = [FLOR, REST * 0.28, REST * 0.34, REST * 0.38]

    def flores_tabla(rows):
        return tabla_d(
            ['Flor', 'Para qué', 'Se ve como', 'Distinción clave'],
            rows, Wf)

    # 7 FLORES ESENCIALES
    story.append(banner('LAS 7 FLORES ESENCIALES  —  Módulo 1 · Bloque 4'))
    story.append(Spacer(1, 3))
    story.append(p('Cubren el 80% de las situaciones cotidianas.'))
    story.append(Spacer(1, 4))
    story.append(flores_tabla([
        ['Rescue Remedy',
         'Emergencias, shock, estrés agudo',
         'Visita al vet, tormentas, peleas, sustos',
         'No es una flor — mezcla de 5 flores de Bach'],
        ['Star of Bethlehem',
         'Trauma pasado o reciente, shock grabado',
         'Historia de maltrato, post-cirugía, pérdida de compañero',
         'Trabaja en cualquier trauma sin importar cuánto tiempo pasó'],
        ['Mimulus',
         'Miedo con causa conocida',
         'Miedo a la aspiradora, a visitas, a otros animales',
         'Miedo con objeto  ·  vs. Aspen: miedo sin objeto'],
        ['Walnut',
         'Cambios y transiciones · protección de absorción',
         'Mudanza, llegada de bebé, cambio de dueño',
         'Protege de absorber el campo emocional del entorno'],
        ['Chicory',
         'Apego posesivo, celos, dependencia',
         'Sigue al dueño a todas partes, no tolera atención a otro',
         'Quiere atención para sí  ·  vs. Red Chestnut: pendiente del otro'],
        ['Holly',
         'Agresividad, celos intensos, hostilidad',
         'Agresión reactiva, rivalidad territorial',
         'Agresividad reactiva  ·  vs. Vine: dominancia activa'],
        ['Aspen',
         'Ansiedad difusa sin causa aparente',
         'Tiembla sin razón, nervioso sin estímulo visible',
         'Miedo sin objeto  ·  vs. Mimulus: miedo con objeto'],
    ]))

    story.append(Spacer(1, 8))

    # 10 FLORES ADICIONALES
    story.append(banner('LAS 10 FLORES ADICIONALES  —  Módulo 2 · Bloque 4'))
    story.append(Spacer(1, 5))

    story.append(p('Grupo 1 — Las que viven dentro del Rescue Remedy', 'seccion'))
    story.append(flores_tabla([
        ['Rock Rose',
         'Pánico, terror que paraliza',
         'Congelamiento extremo, susto que dejó al animal bloqueado',
         'Terror paralizante  ·  vs. Mimulus: miedo cotidiano'],
        ['Cherry Plum',
         'Pérdida de control, conductas que no puede detener',
         'Ladrido incontrolable, rascado compulsivo, escalada súbita',
         'Pérdida de control  ·  vs. Holly: agresividad reactiva con causa'],
        ['Impatiens',
         'Impaciencia, irritabilidad de fondo',
         'No tolera esperar, mordisquea sin atención inmediata',
         'Irritabilidad de base  ·  vs. Holly: hostilidad con detonante'],
    ]))

    story.append(Spacer(1, 5))
    story.append(p('Grupo 2 — Agotamiento y duelo', 'seccion'))
    story.append(flores_tabla([
        ['Olive',
         'Agotamiento profundo, reservas bajas',
         'Sin brillo, sin interés — no es enfermedad, es campo vacío',
         'Restaura, no activa  ·  vs. Wild Rose: agotamiento vs. rendición'],
        ['Honeysuckle',
         'Duelo, añoranza, nostalgia',
         'No se instala en el presente, mira hacia otro lado',
         'Tristeza por lo que fue  ·  vs. Star of B: shock del trauma'],
        ['Sweet Chestnut',
         'Desesperanza extrema, sufrimiento profundo',
         'Parece haber rendido — existe pero no vive',
         'Casi siempre acompaña a Star of Bethlehem en trauma severo'],
        ['Wild Rose',
         'Resignación, pasividad, voluntad dormida',
         'No mueve la cola, no busca contacto, aceptación pasiva',
         'Resignación interna  ·  vs. Olive: rendición vs. agotamiento'],
    ]))

    story.append(Spacer(1, 5))
    story.append(p('Grupo 3 — Control, preocupación y limpieza', 'seccion'))
    story.append(flores_tabla([
        ['Vine',
         'Dominancia rígida, voluntad de controlar',
         'No acepta jerarquías, agresión ante cualquier límite',
         'Dominancia activa  ·  vs. Holly: agresividad reactiva'],
        ['Red Chestnut',
         'Preocupación excesiva por el dueño',
         'Vive monitoreando al dueño, no puede relajarse',
         'Pendiente del otro  ·  vs. Chicory: quiere atención para sí'],
        ['Crab Apple',
         'Limpieza y purificación del campo',
         'Rescatados de hacinamiento, post-parasitosis, post-tratamiento',
         'Limpia la huella física y energética  ·  vs. Star of B: trauma'],
    ]))

    story.append(Spacer(1, 8))

    # 5 FÓRMULAS
    story.append(banner('LAS 5 FÓRMULAS PREDISEÑADAS  —  Módulo 2 · Bloque 4'))
    story.append(Spacer(1, 5))

    formulas = [
        ('Fórmula 1\nAnsiedad de Separación',
         'Star of Bethlehem + Chicory + Red Chestnut + Aspen',
         'Raíz histórica + apego posesivo + monitoreo ansioso del dueño + ansiedad anticipatoria'),
        ('Fórmula 2\nAgresividad',
         'Holly + Cherry Plum + Vine + Impatiens',
         'Reactividad + pérdida de control + dominancia + irritabilidad  ·  ⚠ Descartar dolor físico antes de usar'),
        ('Fórmula 3\nAnimal Rescatado / Trauma',
         'Star of Bethlehem + Walnut + Crab Apple + Olive + Honeysuckle',
         'Trauma + protección + limpieza + restauración de energía + duelo  ·  Duración: 28–35 días'),
        ('Fórmula 4\nEnfermedad Crónica sin Causa',
         'Star of Bethlehem + Rock Rose + Olive + Crab Apple + Wild Rose',
         'Shock + terror grabado + agotamiento + limpieza del patrón + voluntad de sanar  ·  Uso prolongado, NO emergencia'),
        ('Fórmula 5\nDuelo',
         'Star of Bethlehem + Honeysuckle + Sweet Chestnut + Walnut',
         'Shock de la pérdida + añoranza activa + desesperanza profunda + protección en el cambio'),
    ]
    Wform = [3.4*cm, MW * 0.38, MW - 3.4*cm - MW * 0.38]
    tform = Table(
        [[p(f[0].replace('\n', '\n'), 'tdb'),
          p(f[1], 'td'),
          p(f[2], 'td')] for f in formulas],
        colWidths=Wform, splitByRow=1)
    tform.setStyle(TableStyle([
        ('ROWBACKGROUNDS', (0, 0), (-1, -1), [C_WHT, C_BG]),
        ('TOPPADDING',    (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING',   (0, 0), (-1, -1), 8),
        ('GRID',          (0, 0), (-1, -1), 0.3, C_LIN),
        ('VALIGN',        (0, 0), (-1, -1), 'TOP'),
    ]))
    story.append(tform)

    story.append(Spacer(1, 8))
    story.append(hr())
    story.append(p('Principios de Uso', 'seccion'))
    for txt in [
        '<b>Principio de capas:</b> la primera fórmula trabaja lo más urgente. La segunda va más adentro.',
        '<b>Máximo 7 flores por fórmula.</b> Si hay más necesidades, priorizar las más urgentes.',
        '<b>La fórmula cambia cuando el animal cambia.</b> Revisar y ajustar cada 28 días.',
        '<b>Flores para el dueño también.</b> Si el rastreo confirma que la fuente es el dueño, '
        'la misma fórmula (o una paralela) va para el dueño.',
        '<b>Veterinario primero.</b> Las flores trabajan en el campo emocional — no sustituyen el diagnóstico.',
    ]:
        story.append(p(f'· {txt}', 'bul'))

    story.append(Spacer(1, 5))
    story.append(p(
        'Sistema: Dr. Edward Bach · 38 remedios  ·  '
        'Fuente complementaria: Dra. Alicia Arrona Rivera · Sistema Bach según escuela Dr. Eduardo Greco',
        'nota'))
    story.append(Spacer(1, 3))
    story.append(hr())
    story.append(pie('Bloque 4'))
    doc.build(story)
    print('  ✓ 03_Flores_de_Bach.pdf')


# ════════════════════════════════════════════════════════════════════════════
#  4a. RASTREO — SENSACIONES (cara A)
# ════════════════════════════════════════════════════════════════════════════
def generar_hoja_rastreo_sensaciones():
    path = os.path.join(OUTPUT_DIR, '04a_Rastreo_Sensaciones.pdf')
    doc = SimpleDocTemplate(path, pagesize=A4,
        leftMargin=MAR, rightMargin=MAR,
        topMargin=1.4*cm, bottomMargin=1.4*cm)

    story = []
    story += header(
        'Rastreo con Péndulo — Sensaciones Básicas  (cara A)',
        'Lo Que Tu Mascota Quiere Decirte · Módulo 1 · Bloque 5  —  '
        'Instituto Centrobioenergetica · Dr. Miguel Ojeda Rios')

    # Instrucciones
    tinstr = Table(
        [[p(f'<b>{k}</b>', 'td'), p(v, 'td')] for k, v in [
            ('Material necesario', 'Foto de tu mascota · péndulo calibrado · esta hoja'),
            ('Frecuencia', 'Una vez por semana'),
            ('Tiempo', '10–15 minutos por rastreo'),
            ('Sin péndulo', 'Usa las 3 preguntas del campo mórfico (cara B)'),
        ]],
        colWidths=[4.0*cm, MW - 4.0*cm])
    tinstr.setStyle(TableStyle([
        ('BACKGROUND',    (0, 0), (0, -1), C_BG),
        ('TOPPADDING',    (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING',   (0, 0), (-1, -1), 8),
        ('GRID',          (0, 0), (-1, -1), 0.3, C_LIN),
        ('VALIGN',        (0, 0), (-1, -1), 'TOP'),
    ]))
    story.append(tinstr)
    story.append(Spacer(1, 8))

    # Columnas para tabla densa de sensaciones
    # Sensación + Pregunta + Flor + Se ve como + ✓✗
    # Total = MW = 493pt
    CS = 3.0*cm          # sensación
    CP = 4.8*cm          # pregunta
    CF = 3.2*cm          # flor
    CV = MW - CS - CP - CF - 0.9*cm   # se ve como (el resto)
    CX = 0.9*cm          # ✓/✗
    Ws = [CS, CP, CF, CV, CX]

    story.append(banner('PASO 1 — ¿QUÉ SIENTE EL ANIMAL?'))
    story.append(Spacer(1, 4))
    story.append(p(
        'Con el péndulo sobre la foto, recorre los tres grupos. '
        'Anota lo que confirma (✓) o descarta (✗).'))
    story.append(Spacer(1, 6))

    story.append(p('Grupo 1 — Estado Emocional', 'seccion'))
    story.append(tabla_d(
        ['Sensación', 'Pregunta al campo', 'Flor indicada', 'Se ve como', '✓ / ✗'],
        [
            ['Miedo con causa conocida',
             '¿Hay miedo activo con origen identificable?',
             'Mimulus',
             'Huye, tiembla, evita algo concreto', ''],
            ['Pánico / terror grabado',
             '¿Hay terror o pánico grabado en el campo?',
             'Rock Rose',
             'Congelamiento extremo ante estímulos', ''],
            ['Ansiedad difusa (sin objeto)',
             '¿Hay ansiedad sin origen identificable?',
             'Aspen',
             'Nervioso sin estímulo visible, sobresaltos', ''],
            ['Tristeza / duelo / añoranza',
             '¿Hay tristeza o añoranza por algo que ya no está?',
             'Honeysuckle',
             'Busca algo, no se instala en el presente', ''],
            ['Desesperanza / rendición',
             '¿El animal dejó de esperar — hay resignación?',
             'Wild Rose\nSweet Chestnut',
             'Acepta pasivamente, sin iniciativa', ''],
            ['Shock / trauma no resuelto',
             '¿Hay trauma no integrado activo en el campo?',
             'Star of Bethlehem',
             'Reacciones desproporcionadas, historia de maltrato', ''],
        ],
        Ws))

    story.append(Spacer(1, 5))
    story.append(p('Grupo 2 — Estado Relacional', 'seccion'))
    story.append(tabla_d(
        ['Sensación', 'Pregunta al campo', 'Flor indicada', 'Se ve como', '✓ / ✗'],
        [
            ['Apego excesivo / dependencia',
             '¿Hay apego de supervivencia — no se sostiene sin el dueño?',
             'Chicory',
             'Sigue al dueño a todas partes, no puede estar solo', ''],
            ['Absorción del campo del dueño',
             '¿El animal carga algo que no le pertenece?',
             'Walnut',
             'Síntoma correlaciona con estado emocional del dueño', ''],
            ['Hostilidad como defensa',
             '¿Hay hostilidad o agresividad como respuesta defensiva?',
             'Holly',
             'Gruñidos, mordidas, reactividad territorial', ''],
            ['Preocupación por el dueño',
             '¿El animal monitorea el campo del dueño ansiosamente?',
             'Red Chestnut',
             'Siempre vigilante, no puede relajarse', ''],
        ],
        Ws))

    story.append(Spacer(1, 5))
    story.append(p('Grupo 3 — Estado Energético', 'seccion'))
    story.append(tabla_d(
        ['Sensación', 'Pregunta al campo', 'Flor indicada', 'Se ve como', '✓ / ✗'],
        [
            ['Agotamiento del campo',
             '¿Hay agotamiento energético de base — sin reservas?',
             'Olive',
             'Sin brillo, sin interés, sin energía de base', ''],
            ['Instinto primario bloqueado',
             '¿Hay instintos naturales suprimidos en este animal?',
             '(ver cara B)',
             'Ver tabla de instintos por especie en la cara B', ''],
        ],
        Ws))

    story.append(Spacer(1, 8))

    # PASO 2 — FUENTE
    story.append(banner('PASO 2 — ¿DE DÓNDE VIENE LO QUE APARECIÓ?'))
    story.append(Spacer(1, 4))
    story.append(p(
        'Para cada sensación confirmada, pregunta la fuente. '
        '<b>El tratamiento cambia según la fuente.</b>'))
    story.append(Spacer(1, 5))

    WF2 = [3.0*cm, (MW - 3.0*cm) * 0.48, (MW - 3.0*cm) * 0.52]
    story.append(tabla(
        ['Fuente', 'Pregunta al campo', 'Qué hacer'],
        [
            ['Del propio animal',
             '¿Esta sensación viene del animal — de su historia, su experiencia directa?',
             'La fórmula de flores es para el animal.'],
            ['Del campo del dueño',
             '¿Viene del campo del dueño — el animal la absorbe o refleja?',
             'La misma fórmula también para el dueño. El sistema es uno.'],
            ['Del ambiente / lugar',
             '¿Viene del lugar donde vive?',
             'Rastrear tipo de memoria activa: ¿muerte, violencia, abandono, '
             'conflicto crónico, enfermedad, miedo?'],
        ],
        WF2))

    story.append(Spacer(1, 8))

    # PASO 3 — REGISTRO
    story.append(banner('PASO 3 — REGISTRO DE ESTA SESIÓN'))
    story.append(Spacer(1, 5))
    treg = Table(
        [[p('<b>Lo que encontré</b>', 'td'),
          p('<b>De dónde viene</b>', 'td'),
          p('<b>Qué hacer esta semana</b>', 'td')],
         ['', '', ''],
         ['', '', ''],
         ['', '', ''],
         ['', '', '']],
        colWidths=[MW * 0.35, MW * 0.22, MW * 0.43])
    treg.setStyle(TableStyle([
        ('BACKGROUND',    (0, 0), (-1, 0), C_MED),
        ('TEXTCOLOR',     (0, 0), (-1, 0), C_WHT),
        ('GRID',          (0, 0), (-1, -1), 0.5, C_LIN),
        ('TOPPADDING',    (0, 0), (-1, -1), 18),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 18),
        ('LEFTPADDING',   (0, 0), (-1, -1), 6),
        ('TOPPADDING',    (0, 0), (-1, 0), 5),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 5),
        ('VALIGN',        (0, 0), (-1, -1), 'TOP'),
    ]))
    story.append(treg)

    story.append(Spacer(1, 5))
    story.append(p('<i>Marco clínico: Morphic Field Therapy® — MFT Animales v4.0 · Instituto Centrobioenergetica</i>',
                   'nota'))
    story.append(Spacer(1, 3))
    story.append(hr())
    story.append(pie('Bloque 5 — cara A', extra='Ver cara B: Instintos por Especie'))
    doc.build(story)
    print('  ✓ 04a_Rastreo_Sensaciones.pdf')


# ════════════════════════════════════════════════════════════════════════════
#  4b. RASTREO — INSTINTOS (cara B)
# ════════════════════════════════════════════════════════════════════════════
def generar_hoja_instintos():
    path = os.path.join(OUTPUT_DIR, '04b_Rastreo_Instintos.pdf')
    doc = SimpleDocTemplate(path, pagesize=A4,
        leftMargin=MAR, rightMargin=MAR,
        topMargin=1.4*cm, bottomMargin=1.4*cm)

    story = []
    story += header(
        'Rastreo con Péndulo — Instintos Primarios por Especie  (cara B)',
        'Lo Que Tu Mascota Quiere Decirte · Módulo 1 · Bloque 5  —  '
        'Instituto Centrobioenergetica · Dr. Miguel Ojeda Rios')

    story.append(p(
        'Cuando el Paso 1 (cara A) confirma un <b>instinto primario bloqueado</b>, '
        'usa esta tabla para identificar cuál. '
        'Cada especie tiene conductas biológicamente necesarias — cuando no pueden expresarse, el animal enferma.'))
    story.append(Spacer(1, 8))

    # 4 columnas — anchos exactos
    WI = 3.0*cm
    REST_I = MW - WI - 2.0*cm
    Wi = [WI, REST_I * 0.48, REST_I * 0.52, 2.0*cm]

    def especie(nombre, rows):
        story.append(KeepTogether([
            banner(f'  {nombre}'),
            Spacer(1, 3),
            tabla_d(
                ['Instinto', 'Expresión sana', 'Expresión bloqueada', '¿Conf.?'],
                rows, Wi),
            Spacer(1, 7),
        ]))

    especie('PERRO', [
        ['Exploración grupal',
         'Paseos con olores nuevos, entornos variados',
         'Ansiedad de separación, destructividad', ''],
        ['Trabajo con propósito',
         'Tareas, juegos de búsqueda, obediencia activa',
         'Ladrido compulsivo, hiperactividad sin dirección', ''],
        ['Comunicación de manada',
         'Señales de apaciguamiento, jerarquía clara',
         'Tensión social, agresividad por confusión de roles', ''],
        ['Movimiento sostenido',
         'Caminatas largas, trote libre diario',
         'Obesidad, conductas repetitivas, frustración crónica', ''],
        ['Contacto social activo',
         'Interacción con otros perros y personas',
         'Miedo social, reactividad, sobreexcitación', ''],
        ['Mordida y masticación',
         'Juguetes adecuados, huesos, objetos para morder',
         'Destrucción de muebles, tensión mandibular', ''],
    ])

    especie('GATO', [
        ['Territorialidad vertical',
         'Superficies elevadas, zonas propias definidas',
         'Estrés crónico, problemas urinarios, conflictos', ''],
        ['Caza solitaria',
         'Juego de depredación con movimiento errático',
         'Hiperactividad nocturna, ataques al dueño', ''],
        ['Autosuficiencia',
         'Acceso a espacio propio sin intrusión',
         'Ansiedad, sobreaseo, ocultamiento prolongado', ''],
        ['Marcaje del territorio',
         'Rascado de superficies, glándulas faciales',
         'Marcaje urinario inapropiado, rascado destructivo', ''],
        ['Control del entorno',
         'Rutinas predecibles, cambios graduales',
         'Estrés ante imprevistos, rechazo de alimento', ''],
        ['Descanso seguro y oculto',
         'Espacios altos o protegidos para dormir',
         'Hipervigilancia, imposibilidad de relajarse', ''],
    ])

    especie('AVE', [
        ['Vuelo y movimiento',
         'Tiempo fuera de la jaula, espacio para volar',
         'Estereotipias, plumaje dañado, depresión', ''],
        ['Vida de bandada',
         'Compañía constante, vocalización social',
         'Silencio excesivo, gritos compulsivos, depresión', ''],
        ['Forrajeo activo',
         'Buscar comida, resolver puzzles, manipular objetos',
         'Picaje de plumas, movimientos repetitivos, apatía', ''],
        ['Vocalización y canto',
         'Expresión sonora libre, respuesta social',
         'Silencio patológico o vocalización compulsiva', ''],
        ['Exploración de objetos',
         'Manipulación con pico, curiosidad activa',
         'Apatía, desinterés total, retirada del entorno', ''],
        ['Jerarquía social',
         'Roles claros dentro de la bandada',
         'Agresividad, miedo, dominancia desproporcionada', ''],
    ])

    especie('CONEJO', [
        ['Excavación',
         'Material para cavar, suelos blandos',
         'Masticación compulsiva de jaula, frustración', ''],
        ['Alimentación selectiva',
         'Variedad de heno, hierbas, fibra natural',
         'Problemas dentales, digestivos, picazón sin causa', ''],
        ['Vigilancia activa',
         'Acceso a perspectivas elevadas, espacio abierto',
         'Hipervigilancia, golpes contra el suelo, agresividad', ''],
        ['Carrera libre',
         'Espacio para correr y saltar diariamente',
         'Obesidad, problemas óseos, apatía motriz', ''],
        ['Vínculo social',
         'Contacto con otro conejo o presencia humana regular',
         'Depresión, letargia, pérdida de apetito', ''],
    ])

    especie('CABALLO', [
        ['Movimiento continuo',
         'Pastoreo y movimiento libre varias horas al día',
         'Estereotipias: cribado, oscilación, golpear suelo', ''],
        ['Vida de manada',
         'Contacto social con otros caballos',
         'Ansiedad, reactividad, estrés crónico en aislamiento', ''],
        ['Pastoreo continuo',
         'Acceso a pasto o heno durante todo el día',
         'Úlceras gástricas, cólicos, frustración oral', ''],
        ['Descanso en grupo',
         'Turnarse la vigilancia con otros caballos',
         'Sueño fragmentado, hipervigilancia, cansancio', ''],
        ['Exploración del entorno',
         'Trabajo variado, rutas diferentes, estimulación nueva',
         'Aburrimiento, resistencia, dificultad para enfocarse', ''],
    ])

    # Instrucciones
    story.append(hr())
    story.append(p('Cómo Rastrear el Instinto Específico con Péndulo', 'seccion'))
    tpasos = Table(
        [[p(f'<b>{n}</b>', 'tdc'), p(txt, 'td')] for n, txt in [
            ('1', 'Confirma primero en cara A que hay un instinto primario bloqueado.'),
            ('2', 'Abre esta hoja en la especie correspondiente.'),
            ('3', 'Recorre los instintos de la tabla con el péndulo: ¿este instinto está bloqueado?'),
            ('4', 'Para cada confirmado: ¿puede ser satisfecho con un cambio en el entorno?'),
        ]],
        colWidths=[0.8*cm, MW - 0.8*cm])
    tpasos.setStyle(TableStyle([
        ('ROWBACKGROUNDS', (0, 0), (-1, -1), [C_WHT, C_BG]),
        ('TOPPADDING',    (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING',   (0, 0), (-1, -1), 8),
        ('GRID',          (0, 0), (-1, -1), 0.3, C_LIN),
        ('VALIGN',        (0, 0), (-1, -1), 'MIDDLE'),
    ]))
    story.append(tpasos)
    story.append(Spacer(1, 5))
    story.append(p('<b>3 preguntas al dueño cuando aparece un instinto bloqueado:</b>', 'bodyb'))
    for q in [
        '¿Qué de este instinto es posible satisfacer con los recursos que tienes ahora?',
        '¿Qué cambio en el entorno diario del animal podría liberar este bloqueo?',
        '¿Cuánto de este bloqueo viene del entorno físico y cuánto del campo emocional del hogar?',
    ]:
        story.append(p(f'· {q}', 'bul'))

    story.append(Spacer(1, 5))
    story.append(hr())
    story.append(pie('Bloque 5 — cara B', extra='Ver cara A: 12 Sensaciones Básicas'))
    doc.build(story)
    print('  ✓ 04b_Rastreo_Instintos.pdf')


# ════════════════════════════════════════════════════════════════════════════
#  5. MATERIAL PARA EL DUEÑO
# ════════════════════════════════════════════════════════════════════════════
def generar_material_duenos():
    path = os.path.join(OUTPUT_DIR, '05_Lo_Que_Tu_Mascota_Sabe_de_Ti.pdf')
    MW_DOC = W - 2 * MAR2  # 470pt

    doc = SimpleDocTemplate(path, pagesize=A4,
        leftMargin=MAR2, rightMargin=MAR2,
        topMargin=2*cm, bottomMargin=2*cm)

    story = []

    def pp(txt, style='prose'): return Paragraph(txt, S[style])
    def bp(txt): return Paragraph(f'· {txt}', S['pbul'])

    def cap_header(num, titulo):
        return [
            HRFlowable(width=MW_DOC, thickness=2, color=C_CLR, spaceAfter=6),
            pp(f'CAPÍTULO {num}', 'capnum'),
            pp(titulo, 'cap'),
            HRFlowable(width=MW_DOC, thickness=1, color=C_CLR, spaceAfter=8),
        ]

    # PORTADA
    story.append(Spacer(1, 0.8*cm))
    story.append(HRFlowable(width=MW_DOC, thickness=4, color=C_HDR, spaceAfter=12))
    story.append(pp('Lo Que Tu Mascota Sabe de Ti', 'titulo'))
    story.append(pp('Una guía para entender el vínculo que nadie te había explicado', 'sub'))
    story.append(HRFlowable(width=MW_DOC, thickness=1, color=C_CLR, spaceAfter=8))
    story.append(pp(
        'Instituto Centrobioenergetica · Dr. Miguel Ojeda Rios · '
        '"Lo Que Tu Mascota Quiere Decirte" — Módulo 1', 'sub'))
    story.append(Spacer(1, 6))
    story.append(pp(
        'Hay algo que tu mascota sabe de ti que tú todavía no sabes de ti mismo. '
        'No es intuición. No es magia. Es biología. Este documento es para que te lo lleves '
        'a casa. Para que lo leas con calma, quizás con tu animal al lado.'))

    # ── CAPÍTULO 1 ──────────────────────────────────────────────────────
    story += cap_header(1, 'El Cuerpo No Miente — Y el de Tu Mascota Tampoco')

    story.append(pp('<b>El experimento que lo cambió todo</b>', 'h3'))
    story.append(pp(
        'En 2019, un equipo de investigadores de la Universidad de Linköping (Suecia) '
        'tomaron muestras de pelo — no de sangre, de pelo — a 58 perros y a sus dueños al mismo tiempo. '
        'El pelo guarda la historia: el cortisol se deposita en él durante semanas y meses. '
        'Es una bitácora química de tu estado emocional crónico.'))
    story.append(pp(
        '<b>Los perros con dueños estresados tenían cortisol alto. '
        'Los perros con dueños tranquilos tenían cortisol bajo.</b>'))
    story.append(pp(
        'No al revés. Del dueño al perro. Siempre. El factor más determinante no fue la raza, '
        'ni el ejercicio. Fue el nivel de ansiedad sostenida del dueño. '
        'El estudio se repitió en verano y en invierno. El resultado fue el mismo.'))

    story.append(pp('<b>Lo que dice la ciencia sobre los gatos</b>', 'h3'))
    story.append(pp(
        'Investigadores japoneses descubrieron en 2025 que los gatos desarrollan '
        'tres patrones de apego distintos con su dueño:'))
    for item in [
        '<b>Seguro:</b> confía, se acerca, puede estar solo sin angustia. Es el patrón sano.',
        '<b>Ansioso:</b> está pegado, se altera cuando te vas, busca contacto de forma excesiva.',
        '<b>Evitativo:</b> se aleja, no busca contacto — frecuentemente es distancia emocional aprendida.',
    ]:
        story.append(bp(item))
    story.append(pp(
        'Dato poco conocido: el maullido del gato adulto no existe entre gatos. '
        'Los gatos lo desarrollaron específicamente para hablarle al humano. '
        'Es una adaptación. Tu gato inventó una forma de comunicarse contigo '
        'que no existe en su lenguaje natural.'))

    story.append(pp('<b>Lo que ocurre en el cuerpo durante la interacción</b>', 'h3'))
    story.append(pp('Cuando interactúas con tu mascota de forma genuina, esto miden los instrumentos:'))
    for item in [
        'Sube la <b>oxitocina</b> — la hormona del vínculo y la confianza',
        'Baja el <b>cortisol</b> — la hormona del estrés crónico',
        'Mejora la <b>variabilidad del ritmo cardíaco</b> — el indicador más preciso del sistema nervioso autónomo',
        'Bajan la <b>frecuencia cardíaca</b> y la <b>presión arterial</b>',
    ]:
        story.append(bp(item))
    story.append(pp('El vínculo no es una emoción. Es una química compartida.'))

    story.append(pp('<b>La sincronización en tiempo real</b>', 'h3'))
    story.append(pp(
        'En 2024, investigadores finlandeses colocaron wearables sincronizados en dueños y perros '
        'al mismo tiempo. El hallazgo: durante los momentos de descanso espontáneo — '
        'cuando simplemente estaban juntos sin hacer nada — el ritmo cardíaco del dueño '
        'y del perro se sincronizaban. Latían al mismo ritmo. '
        'El estado cardíaco del perro predecía el del dueño con mayor precisión que '
        'los propios factores fisiológicos del dueño.'))

    # ── CAPÍTULO 2 ──────────────────────────────────────────────────────
    story.append(PageBreak())
    story += cap_header(2, 'El Vínculo Que Nadie Te Contó')

    story.append(pp('<b>El mismo circuito que el de un hijo</b>', 'h3'))
    story.append(pp(
        'En 2015, el equipo del Dr. Miho Nagasawa midió la oxitocina en dueños y perros '
        'durante 30 minutos de interacción libre. Cuando el perro miraba a los ojos de su dueño, '
        'la oxitocina del dueño subía. Eso activaba en el dueño el impulso de acariciar al perro. '
        'La oxitocina del perro subía. El perro volvía a mirar. El ciclo se repetía solo.'))
    story.append(pp(
        'Este ciclo tiene un nombre: <b>bucle de oxitocina</b>. '
        'Y tiene un equivalente exacto en la biología humana: el vínculo madre-bebé. '
        'Lo que el estudio demostró es que durante miles de años de convivencia, '
        '<b>el perro aprendió a activar el mismo circuito biológico que activa un hijo.</b>'))

    story.append(pp('<b>El campo que no ves pero que tu mascota sí siente</b>', 'h3'))
    story.append(pp(
        'El corazón humano genera el campo electromagnético más potente del cuerpo — '
        '60 veces más fuerte que el del cerebro. Ese campo se extiende hasta 90 cm fuera de tu cuerpo. '
        'Tu mascota vive dentro de ese campo las 24 horas.'))
    story.append(pp(
        'El HeartMath Institute ha documentado: cuando el corazón está en coherencia — '
        'en paz, en apreciación — el campo que irradia es organizado. Cuando está en ansiedad o conflicto, '
        'el campo es irregular. Tu mascota no lo analiza, pero su sistema nervioso lo registra '
        'como si fuera la diferencia entre vivir en calma o en alta tensión.'))

    story.append(pp('<b>Por qué tu mascota y no otro miembro de la familia</b>', 'h3'))
    for item in [
        '<b>Porque no puede decirte que no.</b> Un hijo puede irse de la habitación. '
        'Tu mascota no tiene esa válvula de escape.',
        '<b>Porque está presente de forma constante.</b> No tiene descanso de tu campo emocional.',
        '<b>Porque para tu inconsciente biológico, es un hijo simbólico.</b> Y hacia los hijos, '
        'el sistema nervioso tiene canales de transferencia emocional que no existen con otros vínculos.',
    ]:
        story.append(bp(item))

    # ── CAPÍTULO 3 ──────────────────────────────────────────────────────
    story.append(PageBreak())
    story += cap_header(3, 'El Lenguaje Que Tu Animal Usa Para Hablarte')

    story.append(pp('<b>Los síntomas como mensajes</b>', 'h3'))
    story.append(pp(
        'Cuando tu mascota enferma sin causa orgánica clara, cuando el veterinario dice que '
        'los estudios están bien pero el animal sigue igual, cuando el problema vuelve una y otra vez — '
        'hay una capa que no se ha revisado. <b>No toda enfermedad tiene un origen emocional.</b> '
        'El veterinario es siempre el primer paso. Pero hay síntomas recurrentes sin causa identificada '
        'donde la pregunta más honesta es: <b>¿Qué estoy cargando yo?</b>'))

    story.append(pp('<b>La tabla que muchos dueños reconocen</b>', 'h3'))
    story.append(pp('No es un diagnóstico. Es una invitación a mirarte con honestidad.'))
    story.append(Spacer(1, 5))

    # Tabla de correlaciones — 2 columnas, usar MW_DOC
    W_COR = [MW_DOC * 0.37, MW_DOC * 0.63]
    tcor = Table(
        [[p('<b>Lo que muestra el animal</b>', 'th'),
          p('<b>Lo que puede estar pasando en ti</b>', 'th')]] +
        [[p(a, 'td'), p(b, 'td')] for a, b in [
            ('Vómito recurrente sin causa médica',
             '¿Hay algo que no terminas de digerir — una situación sin resolución?'),
            ('Problemas de piel / rascado sin causa dermatológica',
             '¿Hubo una separación — persona, lugar, proyecto — que no has terminado de soltar?'),
            ('Ansiedad de separación extrema',
             '¿Cómo es tu relación con el abandono — real o anticipado?'),
            ('Apatía, pérdida de apetito',
             '¿Hay pérdida de propósito o agotamiento que no reconoces como tal?'),
            ('Agresividad territorial sin causa',
             '¿Qué tan seguro se siente tu propio territorio — trabajo, casa, límites?'),
            ('Problemas urinarios (gatos)',
             '¿Hay algo donde no puedes poner límites — no puedes marcar tu espacio?'),
            ('Otitis recurrente',
             '¿Estás evitando escuchar algo — una conversación, una verdad que pospones?'),
            ('Tumor mamario en hembras',
             '¿Hay preocupación intensa y crónica por alguien que quieres, que llevas en silencio?'),
        ]],
        colWidths=W_COR, splitByRow=1)
    tcor.setStyle(TableStyle([
        ('BACKGROUND',    (0, 0), (-1, 0), C_MED),
        ('ROWBACKGROUNDS',(0, 1), (-1, -1), [C_WHT, C_BG]),
        ('TOPPADDING',    (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING',   (0, 0), (-1, -1), 8),
        ('GRID',          (0, 0), (-1, -1), 0.3, C_LIN),
        ('VALIGN',        (0, 0), (-1, -1), 'TOP'),
    ]))
    story.append(tcor)

    story.append(Spacer(1, 8))
    story.append(pp('<b>Las tres preguntas que lo revelan todo</b>', 'h3'))
    story.append(pp('No son preguntas para buscar culpables. Son preguntas para observar con honestidad.'))
    story.append(Spacer(1, 5))

    for n, preg, desc in [
        ('1', '¿Cuándo lo notaste por primera vez? ¿Qué más estaba cambiando en tu casa en esas semanas?',
         'No busques una respuesta dramática. Con frecuencia, el inicio del síntoma del animal coincide '
         'con un cambio en el hogar que en su momento parecía menor.'),
        ('2', '¿Cuándo está peor y cuándo mejora? ¿Hay situaciones o personas que lo tranquilizan o lo alteran?',
         'Observa el patrón, no solo el síntoma. Los patrones revelan más que los síntomas aislados.'),
        ('3', '¿Cómo era tu relación con él hace un año comparada con ahora? ¿Algo cambió entre los dos?',
         'A veces la respuesta muestra que el animal cambió. Otras veces muestra que tú cambiaste — '
         'y que él lo está registrando.'),
    ]:
        tq = Table(
            [[p(f'<b>{n}</b>', 'tdc'), p(f'<i>{preg}</i>', 'tdb')],
             [p('', 'td'), p(desc, 'td')]],
            colWidths=[0.8*cm, MW_DOC - 0.8*cm])
        tq.setStyle(TableStyle([
            ('BACKGROUND',    (0, 0), (-1, -1), C_BG),
            ('TOPPADDING',    (0, 0), (-1, -1), 5),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
            ('LEFTPADDING',   (0, 0), (-1, -1), 8),
            ('RIGHTPADDING',  (0, 0), (-1, -1), 8),
            ('BOX',           (0, 0), (-1, -1), 0.5, C_CLR),
            ('VALIGN',        (0, 0), (-1, -1), 'TOP'),
            ('SPAN',          (0, 0), (0, 1)),
            ('VALIGN',        (0, 0), (0, 1), 'MIDDLE'),
        ]))
        story.append(tq)
        story.append(Spacer(1, 5))

    # ── CAPÍTULO 4 ──────────────────────────────────────────────────────
    story.append(PageBreak())
    story += cap_header(4, 'Lo Que Puedes Hacer Hoy')

    story.append(pp('<b>Tu tarea para las próximas dos semanas</b>', 'h3'))
    tareas = [
        ('Registro de observación del animal',
         'Anota cada día aunque sea una línea: el comportamiento de tu mascota, cualquier cambio que notes, '
         'cómo come, cómo duerme, si busca contacto o se aleja.'),
        ('Diario personal',
         'Anota tu propio estado emocional. Solo: ¿cómo estuve hoy? ¿Hubo algún conflicto, tensión, algo que me pesó?'),
        ('Aplicar los remedios florales',
         'Elige la fórmula que identificaste hoy y aplícala todos los días. '
         'Documenta lo que observas — en tu animal y en ti mismo.'),
    ]
    ttareas = Table(
        [[p(f'<b>{t[0]}</b>', 'td'), p(t[1], 'td')] for t in tareas],
        colWidths=[4.2*cm, MW_DOC - 4.2*cm], splitByRow=1)
    ttareas.setStyle(TableStyle([
        ('ROWBACKGROUNDS', (0, 0), (-1, -1), [C_WHT, C_BG]),
        ('TOPPADDING',    (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING',   (0, 0), (-1, -1), 10),
        ('GRID',          (0, 0), (-1, -1), 0.3, C_LIN),
        ('VALIGN',        (0, 0), (-1, -1), 'TOP'),
    ]))
    story.append(ttareas)
    story.append(Spacer(1, 8))

    story.append(pp('<b>Lo que esto no es</b>', 'h3'))
    story.append(pp(
        'Esto no es culpa. Si tu mascota está enferma, si lleva meses sin mejorar — '
        'eso no significa que seas un mal dueño. Significa que eres humano. '
        'El campo emocional que compartes con tu mascota existe por la naturaleza misma del vínculo. '
        'No hay nadie a quien culpar. El primer paso no es castigarte. Es escuchar.'))

    story.append(Spacer(1, 0.6*cm))
    story.append(pp(
        '"Cuando la mascota enferma, mira al dueño.\n'
        'Cuando el dueño sana su conflicto, la mascota sana su cuerpo."', 'quote'))

    story.append(Spacer(1, 0.5*cm))
    story.append(HRFlowable(width=MW_DOC, thickness=2, color=C_CLR, spaceAfter=6))
    story.append(pp(
        '<b>Traer al Módulo 2:</b> tus registros de las dos semanas + lo que observaste + tus preguntas.',
        'bodyb'))
    story.append(Spacer(1, 6))
    story.append(pie('"Lo Que Tu Mascota Quiere Decirte" — Módulo 1',
                     extra='Módulo 2: viernes 10 de abril · 3:00 pm'))

    doc.build(story)
    print('  ✓ 05_Lo_Que_Tu_Mascota_Sabe_de_Ti.pdf')


# ════════════════════════════════════════════════════════════════════════════
#  MAIN
# ════════════════════════════════════════════════════════════════════════════
if __name__ == '__main__':
    print('\nGenerando PDFs — Lo Que Tu Mascota Quiere Decirte · Módulo 1')
    print('=' * 60)
    generar_refrigerator_sheet()
    generar_hoja_sistemas()
    generar_hoja_flores()
    generar_hoja_rastreo_sensaciones()
    generar_hoja_instintos()
    generar_material_duenos()
    print('=' * 60)
    print(f'PDFs guardados en: Material_Alumnos/PDF_Imprimibles/')
