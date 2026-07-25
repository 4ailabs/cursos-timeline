#!/usr/bin/env python3
"""Comprueba que ninguna página del manual B5 desborde su caja de 250 mm."""
import re, pathlib, subprocess, tempfile, os, json, html as H, sys

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
ARCH = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "Manual_Modulo_2_B5.html")

doc = ARCH.read_text().replace("</head>",
  "<script>window.addEventListener('load',function(){var o=[];"
  "document.querySelectorAll('.page').forEach(function(p,i){"
  "var c=p.scrollHeight,v=p.clientHeight;if(c>v+2)o.push([i+1,Math.round((c-v)/96*25.4)]);});"
  "document.title=JSON.stringify(o);});</script></head>")

with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False, dir=".") as f:
    f.write(doc); ruta = f.name
dom = subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--virtual-time-budget=8000",
                      "--dump-dom", f"file://{os.path.abspath(ruta)}"],
                     capture_output=True, text=True).stdout
os.unlink(ruta)

m = re.search(r"<title>(\[.*?\])</title>", dom, re.S)
if not m:
    print("no se pudo medir"); sys.exit(2)
d = json.loads(H.unescape(m.group(1)))
if not d:
    print("✓ ninguna página desborda"); sys.exit(0)
print(f"⚠ {len(d)} páginas desbordan (máx +{max(x[1] for x in d)} mm):")
for pg, mm in d: print(f"   página {pg}: +{mm} mm")
sys.exit(1)
