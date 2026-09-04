#!/usr/bin/env python3
"""
Comprueba en el navegador que ninguna página del manual desborde, que el folio
alterne recto y verso, y que ninguna cabeza de capítulo cierre página sola.

Uso:  python3 verifica.py Manual_RB_B5.html
"""
import subprocess, json, re, html, sys, pathlib

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
ARCH = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "Manual_RB_B5.html")

SONDA = '''<script>
var r=[];document.querySelectorAll("section.page").forEach(function(p,i){
  var cs=getComputedStyle(p), alto=p.clientHeight,
      pt=parseFloat(cs.paddingTop), pb=parseFloat(cs.paddingBottom),
      util=alto-pt-pb, usado=0;
  Array.prototype.forEach.call(p.children,function(c){
    if(c.classList.contains("foot")||c.classList.contains("folio")||
       c.classList.contains("endfoot")||c.classList.contains("wm")) return;
    var s=getComputedStyle(c);
    usado+=c.getBoundingClientRect().height+parseFloat(s.marginTop)+parseFloat(s.marginBottom);
  });
  var cab=p.querySelector(".caphead"), colaCab=null;
  if(cab){ var b=cab.getBoundingClientRect(),
           lim=p.getBoundingClientRect().bottom-pb;
           colaCab=lim-b.bottom; }
  r.push({n:i+1,cls:p.className,util:util,usado:usado,
          desborde:usado-util, tras:colaCab,
          folio:(p.querySelector(".folio")||{}).textContent||null});
});
document.title=JSON.stringify(r);
</script>'''

doc = ARCH.read_text().replace("</body>", SONDA + "</body>")
tmp = ARCH.with_suffix(".sonda.html"); tmp.write_text(doc)
dom = subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--virtual-time-budget=15000",
                      "--dump-dom", f"file://{tmp.resolve()}"], capture_output=True, text=True).stdout
tmp.unlink()
m = re.search(r"<title>(\[.*?\])</title>", dom, re.S)
if not m: raise SystemExit("no se pudo sondear")
pgs = json.loads(html.unescape(m.group(1)))
MM = lambda px: px / 96 * 25.4

desbordes = [p for p in pgs if p["desborde"] > 1.0]
huerfanas = [p for p in pgs if p["tras"] is not None and p["tras"] < 40 and "prem" in p["cls"]]

print(f"{ARCH.name} · {len(pgs)} páginas")
print(f"  altura útil     {MM(pgs[3]['util']):.1f} mm")
print(f"  página más llena {max(MM(p['usado']) for p in pgs if 'prem' in p['cls']):.1f} mm")
if desbordes:
    print(f"  ✗ {len(desbordes)} páginas desbordan:")
    for p in desbordes[:12]:
        print(f"      pág {p['n']:>3} folio {p['folio']}  +{MM(p['desborde']):.1f} mm")
else:
    print("  ✓ ninguna página desborda")

# folio: recto impar, verso par
mal = [p for p in pgs if p["folio"] and
       ((int(p["folio"]) % 2 == 1) != ("pg-recto" in p["cls"]))]
print("  ✓ folios en su lado" if not mal else f"  ✗ {len(mal)} folios del lado equivocado: "
      + ", ".join(p["folio"] for p in mal[:10]))

# cabeza de capítulo sin contenido detrás
if huerfanas:
    print(f"  ✗ {len(huerfanas)} cabezas de capítulo con menos de 10 mm detrás:")
    for p in huerfanas[:8]:
        print(f"      pág {p['n']:>3} folio {p['folio']}  {MM(p['tras']):.1f} mm")
else:
    print("  ✓ ninguna cabeza de capítulo cierra página sola")

vacias = [p for p in pgs if "prem" in p["cls"] and MM(p["usado"]) < 60]
if vacias:
    print(f"  · {len(vacias)} páginas por debajo de 60 mm de mancha: "
          + ", ".join(str(p["folio"]) for p in vacias[:14]))
