from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path('/Users/miguelojedarios/cursos-timeline')
SOURCE = Path('/Users/miguelojedarios/centrobioenergetica-videos/public/images/hormonas/sofoco-nocturno.png')
LOGO = Path('/Users/miguelojedarios/Notebooklm/logo wellkitt.png')
OUT = ROOT / '04_Canales/Wellikiit/invitacion-hoy-jueves-wellkitt-hormonas-whatsapp-status.png'
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
    x -= (sum(widths) + spacing * max(0, len(text) - 1)) / 2
    for char, width in zip(text, widths):
        draw.text((x, y), char, font=font, fill=fill, anchor='la')
        x += width + spacing

canvas = Image.new('RGB', (W, H), FOREST).convert('RGBA')
draw = ImageDraw.Draw(canvas, 'RGBA')

# Subtle green glow at the top, matching WkAtmosphere.
glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow, 'RGBA')
gd.ellipse((-260, -220, 1340, 850), fill=(76, 175, 80, 22))
canvas = Image.alpha_composite(canvas, glow)
draw = ImageDraw.Draw(canvas, 'RGBA')

# Official logo, cleaned from its white source background.
logo = Image.open(LOGO).convert('RGBA')
lp = logo.load()
for y in range(logo.height):
    for x in range(logo.width):
        r, g, b, a = lp[x, y]
        if r > 242 and g > 242 and b > 242:
            lp[x, y] = (r, g, b, 0)
logo = logo.crop(logo.getbbox())
logo.thumbnail((125, 142), Image.Resampling.LANCZOS)
canvas.alpha_composite(logo, (68, 78))

# Safe-zone copy for WhatsApp Status.
tracking(draw, W // 2, 300, 'HOY EN JUEVES EN WELLKITT', ft(MONO, 30), LIME, spacing=3)
draw.text((W // 2, 408), 'HORMONAS', font=ft(SERIF, 96), fill=CREAM, anchor='ma')
draw.line((W // 2 - 110, 548, W // 2 + 110, 548), fill=GOLD, width=4)
draw.text((W // 2, 610), 'Calor, sueño y piel que cambian:', font=ft(SANS, 38), fill=CORAL, anchor='ma')
draw.text((W // 2, 672), 'lo que nadie te explica de esta etapa', font=ft(SANS, 38), fill=CORAL, anchor='ma')
draw.text((W // 2, 815), 'HOY · 5:30 PM', font=ft(SERIF, 44), fill=CREAM, anchor='ma')
draw.text((W // 2, 885), 'Presencial · Acapulco 36, Piso 8, CDMX', font=ft(SANS, 29), fill=CREAM, anchor='ma')
draw.text((W // 2, 940), 'También por Zoom', font=ft(SANS, 34), fill=LIME, anchor='ma')

# Existing editorial image from the HormonasVideo project, as the lower visual anchor.
photo = Image.open(SOURCE).convert('RGB').resize((W, 608), Image.Resampling.LANCZOS).convert('RGBA')
canvas.alpha_composite(photo, (0, 1115))
# Dark gradient at top edge of the photo, integrating it into the forest background.
shade = Image.new('RGBA', (W, 150), (0, 0, 0, 0))
sd = ImageDraw.Draw(shade, 'RGBA')
for y in range(150):
    sd.line((0, y, W, y), fill=(14, 31, 22, int(230 * (1 - y / 150))))
canvas.alpha_composite(shade, (0, 1115))

draw = ImageDraw.Draw(canvas, 'RGBA')
draw.text((W // 2, 1030), 'Escribe HORMONAS por WhatsApp', font=ft(MONO, 24), fill=GOLD, anchor='ma')
canvas.convert('RGB').save(OUT, format='PNG', optimize=True)
print(OUT)
