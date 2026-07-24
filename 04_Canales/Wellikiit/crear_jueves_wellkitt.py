from pathlib import Path
import math
from PIL import Image, ImageDraw, ImageFont

ROOT = Path('/Users/miguelojedarios/cursos-timeline')
OUT = ROOT / '04_Canales/Wellikiit/jueves-en-wellkitt-hormonas-dinamicas-16x9.png'
LOGO = Path('/Users/miguelojedarios/Notebooklm/logo wellkitt.png')

W, H = 1920, 1080
CREAM = '#F7F4EC'
INK = '#2C2C2A'
GREEN = '#0F6E56'
GREEN_LIGHT = '#5DCAA5'
GOLD = '#BA7517'
GRAY = '#77756F'

def font(path, size):
    return ImageFont.truetype(path, size)

SERIF = '/System/Library/Fonts/Supplemental/Georgia.ttf'
SANS = '/System/Library/Fonts/Helvetica.ttc'

canvas = Image.new('RGB', (W, H), CREAM)
draw = ImageDraw.Draw(canvas)

# Fine footer waves, matching the Remotion deck's restrained visual language.
for amp, y0, color, width in [(27, 995, '#7AAE9E', 4), (18, 1028, '#B4D0C7', 2)]:
    pts = []
    for x in range(-20, W + 20, 4):
        y = y0 + amp * math.sin((x / 260.0) + (0.35 if amp == 18 else 0.0))
        pts.append((x, y))
    draw.line(pts, fill=color, width=width)

# Official logo: remove its white field, preserve the supplied green mark and wordmark.
logo = Image.open(LOGO).convert('RGBA')
pix = logo.load()
for y in range(logo.height):
    for x in range(logo.width):
        r, g, b, a = pix[x, y]
        if r > 242 and g > 242 and b > 242:
            pix[x, y] = (r, g, b, 0)
bbox = logo.getbbox()
logo = logo.crop(bbox)
logo.thumbnail((190, 205), Image.Resampling.LANCZOS)
canvas.paste(logo, (92, 56), logo)

# Upper-right institutional signature used in the Remotion reference slides.
draw.text((1530, 77), 'INSTITUTO CENTROBIOENERGÉTICA', font=font(SANS, 16), fill=GRAY, anchor='ra', spacing=3)

# Event label and title. Georgia regular + teal is the Remotion/RB system.
draw.text((96, 355), 'JUEVES EN WELLKITT', font=font(SANS, 23), fill=GREEN, spacing=7)
draw.text((94, 420), 'Hormonas', font=font(SERIF, 116), fill=INK)
draw.text((94, 548), 'dinámicas', font=font(SERIF, 116), fill=GREEN)

# Thin gold rule under the title.
draw.line((98, 730, 565, 730), fill=GOLD, width=4)

# Event details; intentionally no link or QR.
draw.text((98, 775), 'Este jueves · 5:30 PM', font=font(SERIF, 36), fill=INK)
draw.text((98, 835), 'Presencial en clínica + Zoom en vivo', font=font(SERIF, 30), fill=INK)
draw.text((98, 888), 'Acapulco 36, Piso 8 · CDMX', font=font(SANS, 27), fill=GRAY)

canvas.save(OUT, format='PNG', optimize=True)
print(OUT)
