from pathlib import Path
import math
import random
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path('/Users/miguelojedarios/cursos-timeline')
OUT = ROOT / '04_Canales/Wellikiit/invitacion-jueves-wellkitt-hormonas-dinamicas-16x9.png'
LOGO = Path('/Users/miguelojedarios/Notebooklm/logo wellkitt.png')
W, H = 1920, 1080
FOREST = (14, 31, 22)
FOREST_DEEP = (12, 26, 18)
CREAM = '#FAFAF7'
MUTED = '#9DB0A4'
LIME = '#8BC34A'
GOLD = '#E0B24C'
SERIF = '/System/Library/Fonts/Supplemental/Georgia Bold.ttf'
SANS = '/System/Library/Fonts/Helvetica.ttc'
MONO = '/System/Library/Fonts/Menlo.ttc'

def f(path, size):
    return ImageFont.truetype(path, size)

def tracked(draw, xy, text, font, fill, tracking=3, anchor='la'):
    x, y = xy
    widths = [draw.textlength(ch, font=font) for ch in text]
    total = sum(widths) + max(0, len(text) - 1) * tracking
    if anchor == 'ma':
        x -= total / 2
    elif anchor == 'ra':
        x -= total
    for ch, width in zip(text, widths):
        draw.text((x, y), ch, font=font, fill=fill, anchor='la')
        x += width + tracking

# WkAtmosphere-style deep forest gradient with a restrained glow.
img = Image.new('RGB', (W, H))
px = img.load()
for y in range(H):
    t = y / (H - 1)
    for x in range(W):
        radial = max(0.0, 1.0 - math.hypot((x - W * .52) / (W * .90), (y - H * .08) / (H * .70)))
        mix = min(1.0, t * .45 + (1 - radial) * .25)
        r = int(FOREST[0] * (1 - mix) + FOREST_DEEP[0] * mix)
        g = int(FOREST[1] * (1 - mix) + FOREST_DEEP[1] * mix) + int(radial * 8)
        b = int(FOREST[2] * (1 - mix) + FOREST_DEEP[2] * mix) + int(radial * 4)
        px[x, y] = (min(255, r), min(255, g), min(255, b))

glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow, 'RGBA')
gd.ellipse((1210, -160, 2220, 800), fill=(76, 175, 80, 24))
gd.ellipse((-360, 680, 650, 1350), fill=(139, 195, 74, 12))
img = Image.alpha_composite(img.convert('RGBA'), glow.filter(ImageFilter.GaussianBlur(90)))
draw = ImageDraw.Draw(img, 'RGBA')

# Supplied official logo: remove its white source background, preserve the mark.
logo = Image.open(LOGO).convert('RGBA')
lp = logo.load()
for y in range(logo.height):
    for x in range(logo.width):
        r, g, b, a = lp[x, y]
        if r > 242 and g > 242 and b > 242:
            lp[x, y] = (r, g, b, 0)
logo = logo.crop(logo.getbbox())
logo.thumbnail((150, 170), Image.Resampling.LANCZOS)
img.alpha_composite(logo, (72, 52))

# Exact invitation copy supplied by the user; no link or QR.
tracked(draw, (W / 2, 246), 'JUEVES EN WELLKITT', f(MONO, 32), LIME, tracking=5, anchor='ma')
draw.text((W / 2, 338), 'Hormonas', font=f(SERIF, 116), fill=CREAM, anchor='ma')
draw.text((W / 2, 472), 'dinámicas', font=f(SERIF, 116), fill=LIME, anchor='ma')
draw.line((W / 2 - 115, 640, W / 2 + 115, 640), fill=GOLD, width=4)
draw.text((W / 2, 700), 'Este jueves · 5:30 PM', font=f(SANS, 46), fill=CREAM, anchor='ma')
draw.text((W / 2, 770), 'Presencial · Acapulco 36, Piso 8, CDMX', font=f(SANS, 38), fill=MUTED, anchor='ma')
draw.text((W / 2, 830), 'También por Zoom', font=f(SANS, 38), fill=GOLD, anchor='ma')

# Low-opacity film grain.
rng = random.Random(17)
grain = Image.new('RGBA', (W, H), (0, 0, 0, 0))
gp = grain.load()
for _ in range(24000):
    x, y = rng.randrange(W), rng.randrange(H)
    gp[x, y] = (220, 240, 220, rng.randrange(3, 12))
img = Image.alpha_composite(img, grain)
img.convert('RGB').save(OUT, format='PNG', optimize=True)
print(OUT)
