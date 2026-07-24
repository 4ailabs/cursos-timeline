from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path('/Users/miguelojedarios/cursos-timeline')
SOURCE = Path('/Users/miguelojedarios/centrobioenergetica-videos/public/images/hormonas/sofoco-nocturno.png')
LOGO = Path('/Users/miguelojedarios/Notebooklm/logo wellkitt.png')
OUT = ROOT / '04_Canales/Wellikiit/invitacion-hoy-jueves-wellkitt-hormonas-16x9.png'
W, H = 1920, 1080

FOREST = '#0E1F16'
CREAM = '#FAFAF7'
MUTED = '#9DB0A4'
LIME = '#8BC34A'
GOLD = '#E0B24C'
CORAL = '#E07A5F'
SERIF = '/System/Library/Fonts/Supplemental/Georgia Bold.ttf'
SANS = '/System/Library/Fonts/Helvetica.ttc'
MONO = '/System/Library/Fonts/Menlo.ttc'

def ft(path, size):
    return ImageFont.truetype(path, size)

def tracking(draw, x, y, text, font, fill, spacing=4):
    widths = [draw.textlength(char, font=font) for char in text]
    total = sum(widths) + spacing * max(0, len(text) - 1)
    x -= total / 2
    for char, width in zip(text, widths):
        draw.text((x, y), char, font=font, fill=fill, anchor='la')
        x += width + spacing

# Use the existing Hormonas editorial image as the visual source.
canvas = Image.open(SOURCE).convert('RGB').resize((W, H), Image.Resampling.LANCZOS).convert('RGBA')
draw = ImageDraw.Draw(canvas, 'RGBA')

# Ensure the left copy zone is deep and legible without altering the woman.
overlay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
od = ImageDraw.Draw(overlay, 'RGBA')
od.rectangle((0, 0, 1060, H), fill=(14, 31, 22, 52))
canvas = Image.alpha_composite(canvas, overlay)
draw = ImageDraw.Draw(canvas, 'RGBA')

# Clean and place the supplied Wellkitt logo.
logo = Image.open(LOGO).convert('RGBA')
lp = logo.load()
for y in range(logo.height):
    for x in range(logo.width):
        r, g, b, a = lp[x, y]
        if r > 242 and g > 242 and b > 242:
            lp[x, y] = (r, g, b, 0)
logo = logo.crop(logo.getbbox())
logo.thumbnail((145, 165), Image.Resampling.LANCZOS)
canvas.alpha_composite(logo, (72, 48))

# Copy follows the HormonasVideo visual hierarchy: mono kicker, serif title,
# sans-serif logistics, coral topic line, and gold CTA accent.
tracking(draw, W // 2 - 300, 232, 'HOY EN JUEVES EN WELLKITT', ft(MONO, 28), LIME, spacing=4)
draw.text((92, 300), 'HORMONAS', font=ft(SERIF, 118), fill=CREAM)
draw.line((96, 455, 536, 455), fill=GOLD, width=4)
draw.text((96, 486), 'Calor, sueño y piel que cambian:', font=ft(SANS, 39), fill=CORAL)
draw.text((96, 540), 'lo que nadie te explica de esta etapa', font=ft(SANS, 39), fill=CORAL)
draw.text((96, 668), 'HOY · 5:30 PM', font=ft(SERIF, 42), fill=CREAM)
draw.text((96, 735), 'Presencial · Acapulco 36, Piso 8, CDMX', font=ft(SANS, 31), fill=CREAM)
draw.text((96, 792), 'También por Zoom', font=ft(SANS, 34), fill=LIME)
draw.text((96, 900), 'Escribe HORMONAS por WhatsApp', font=ft(MONO, 24), fill=GOLD)

canvas.convert('RGB').save(OUT, format='PNG', optimize=True)
print(OUT)
