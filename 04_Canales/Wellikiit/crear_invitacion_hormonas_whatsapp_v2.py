from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path('/Users/miguelojedarios/cursos-timeline')
SOURCE = Path('/Users/miguelojedarios/centrobioenergetica-videos/public/images/hormonas/sofoco-nocturno.png')
LOGO = Path('/Users/miguelojedarios/Notebooklm/logo wellkitt.png')
OUT = ROOT / '04_Canales/Wellikiit/invitacion-hoy-jueves-wellkitt-hormonas-whatsapp-status-v2.png'
W, H = 1080, 1920
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

def tracking(draw, x, y, text, font, fill, spacing=3):
    widths = [draw.textlength(char, font=font) for char in text]
    for char, width in zip(text, widths):
        draw.text((x, y), char, font=font, fill=fill, anchor='la')
        x += width + spacing

canvas = Image.new('RGB', (W, H), FOREST).convert('RGBA')
hero = ImageOps.fit(Image.open(SOURCE).convert('RGB'), (W, 820), centering=(0.67, 0.46), method=Image.Resampling.LANCZOS).convert('RGBA')
canvas.alpha_composite(hero, (0, 0))

# Dark panel overlaps the hero and carries the copy.
panel = Image.new('RGBA', (W, 1270), (0, 0, 0, 0))
pd = ImageDraw.Draw(panel, 'RGBA')
pd.rectangle((0, 120, W, 1270), fill=(14, 31, 22, 255))
for y in range(120):
    pd.line((0, y, W, y), fill=(14, 31, 22, int(245 * y / 120)))
canvas.alpha_composite(panel, (0, 650))
draw = ImageDraw.Draw(canvas, 'RGBA')

# Supplied logo, cleaned from its white background.
logo = Image.open(LOGO).convert('RGBA')
lp = logo.load()
for y in range(logo.height):
    for x in range(logo.width):
        r, g, b, a = lp[x, y]
        if r > 242 and g > 242 and b > 242:
            lp[x, y] = (r, g, b, 0)
logo = logo.crop(logo.getbbox())
logo.thumbnail((100, 112), Image.Resampling.LANCZOS)
canvas.alpha_composite(logo, (68, 710))

# Copy hierarchy and safe lower margin for WhatsApp UI.
tracking(draw, 70, 850, 'HOY · JUEVES EN WELLKITT', ft(MONO, 20), LIME, spacing=2)
draw.text((68, 902), 'HORMONAS', font=ft(SERIF, 84), fill=CREAM)
draw.line((70, 1018, 290, 1018), fill=GOLD, width=4)
draw.text((70, 1055), 'Calor, sueño y piel que cambian:', font=ft(SANS, 32), fill=CORAL)
draw.text((70, 1101), 'lo que nadie te explica de esta etapa', font=ft(SANS, 32), fill=CORAL)
draw.text((70, 1215), 'HOY · 5:30 PM', font=ft(SERIF, 39), fill=CREAM)
draw.text((70, 1280), 'Acapulco 36 · Piso 8 · CDMX', font=ft(SANS, 29), fill=CREAM)
draw.text((70, 1334), 'Presencial  +  También por Zoom', font=ft(SANS, 29), fill=LIME)

# A compact gold-framed response cue keeps the action legible at a glance.
draw.rounded_rectangle((68, 1435, 760, 1542), radius=12, outline=GOLD, width=2, fill=(14, 31, 22, 190))
draw.text((94, 1465), 'Escribe HORMONAS por WhatsApp', font=ft(MONO, 22), fill=GOLD)

canvas.convert('RGB').save(OUT, format='PNG', optimize=True)
print(OUT)
