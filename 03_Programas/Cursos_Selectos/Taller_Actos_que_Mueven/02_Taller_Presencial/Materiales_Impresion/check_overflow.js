const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const FILE = 'file:///Users/miguelojedarios/cursos-timeline/03_Programas/Cursos_Selectos/Taller_Actos_que_Mueven/03_Caja_7_Actos/Caja_7_Actos_BN.html';

const AW = 610;
const AH = 910;

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 8000, height: 6000, deviceScaleFactor: 1 });
  await page.goto(FILE, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.waitForFunction(() => document.readyState === 'complete');
  await new Promise(r => setTimeout(r, 5000));

  // Detectar artboards de la Caja (610x910)
  const results = await page.evaluate((pw, ph) => {
    const artboards = [];
    for (const el of document.querySelectorAll('div')) {
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      if (
        Math.abs(rect.width - pw) < 4 &&
        Math.abs(rect.height - ph) < 4 &&
        style.overflow === 'hidden' &&
        rect.top >= 0
      ) {
        artboards.push(el);
      }
    }

    const report = [];
    artboards.forEach((artboard, idx) => {
      const artRect = artboard.getBoundingClientRect();
      const overflowingEls = [];

      // Buscar todos los descendientes y ver si se salen del artboard
      const all = artboard.querySelectorAll('*');
      for (const child of all) {
        const childRect = child.getBoundingClientRect();
        const childStyle = window.getComputedStyle(child);
        // Solo nodos con texto visible
        if (child.children.length === 0 && child.textContent.trim().length > 0) {
          const bottom = childRect.bottom;
          const artBottom = artRect.bottom;
          if (bottom > artBottom + 2) {
            overflowingEls.push({
              tag: child.tagName,
              text: child.textContent.trim().slice(0, 80),
              childBottom: Math.round(bottom),
              artBottom: Math.round(artBottom),
              overflow: Math.round(bottom - artBottom),
            });
          }
        }
      }

      // Nombre del artboard (buscar el label encima)
      const label = artboard.closest('[data-dc-slot]');
      const labelEl = label ? label.querySelector('div[style*="margin-bottom"]') : null;
      const labelText = labelEl ? labelEl.textContent.trim() : `Página ${idx + 1}`;

      report.push({
        idx: idx + 1,
        label: labelText,
        hasOverflow: overflowingEls.length > 0,
        overflowing: overflowingEls,
      });
    });

    return report;
  }, AW, AH);

  console.log(`\nTotal artboards detectados: ${results.length}\n`);
  const withOverflow = results.filter(r => r.hasOverflow);
  console.log(`Con desbordamiento: ${withOverflow.length}\n`);
  
  results.forEach(r => {
    if (r.hasOverflow) {
      console.log(`❌ Pág. ${r.idx} — ${r.label}`);
      r.overflowing.forEach(o => {
        console.log(`   overflow: ${o.overflow}px | "${o.text}"`);
      });
    } else {
      console.log(`✅ Pág. ${r.idx} — ${r.label}`);
    }
  });

  await browser.close();
})();
