const puppeteer = require('puppeteer');

const FILE = 'file:///Users/miguelojedarios/cursos-timeline/03_Programas/Cursos_Selectos/Taller_Actos_que_Mueven/03_Caja_7_Actos/Caja_7_Actos_BN.html';
const AW = 610, AH = 910;

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

  const results = await page.evaluate((pw, ph) => {
    // Encontrar todos los artboards (610x910)
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
      const problems = [];

      // 1) Buscar contenedores con overflow:hidden internos que tienen contenido cortado
      // El componente Ct es position:absolute con overflow:hidden
      const allDivs = artboard.querySelectorAll('div');
      for (const div of allDivs) {
        const style = window.getComputedStyle(div);
        if (style.overflow === 'hidden' || style.overflowY === 'hidden') {
          const scrollH = div.scrollHeight;
          const clientH = div.clientHeight;
          if (scrollH > clientH + 2) {
            // Hay contenido cortado
            // Obtener el último hijo visible para entender qué se corta
            const children = Array.from(div.children);
            const lastChild = children[children.length - 1];
            let lastText = '';
            if (lastChild) {
              lastText = lastChild.textContent.trim().slice(-120);
            }
            problems.push({
              type: 'content_clipped',
              scrollH,
              clientH,
              excess: scrollH - clientH,
              lastText,
            });
          }
        }

        // 2) Elementos cuyo bottom está más allá del artboard bottom
        const rect = div.getBoundingClientRect();
        if (rect.bottom > artRect.bottom + 2 && rect.top < artRect.bottom) {
          const txt = div.textContent.trim().slice(0, 100);
          if (txt) {
            problems.push({
              type: 'element_outside',
              excess: Math.round(rect.bottom - artRect.bottom),
              text: txt,
            });
          }
        }
      }

      // Obtener label del artboard
      const slot = artboard.closest('[data-dc-slot]');
      let label = `Pág. ${idx + 1}`;
      if (slot) {
        const labelEl = slot.querySelector('div[style*="bottom:100%"]') ||
                        slot.previousElementSibling;
        if (labelEl) label = labelEl.textContent.trim() || label;
      }

      report.push({ idx: idx + 1, label, problems });
    });

    return report;
  }, AW, AH);

  console.log(`\nTotal páginas: ${results.length}\n`);
  const withProblems = results.filter(r => r.problems.length > 0);
  console.log(`Con problemas: ${withProblems.length}\n`);
  console.log('─'.repeat(65));

  results.forEach(r => {
    if (r.problems.length > 0) {
      console.log(`\n❌ ${r.label}`);
      r.problems.forEach(p => {
        if (p.type === 'content_clipped') {
          console.log(`   📏 Contenido cortado: scrollH=${p.scrollH}px, visibleH=${p.clientH}px, excess=${p.excess}px`);
          console.log(`   📄 Último texto visible: "...${p.lastText}"`);
        } else {
          console.log(`   📐 Elemento fuera del artboard: +${p.excess}px`);
          console.log(`   📄 Texto: "${p.text}"`);
        }
      });
    } else {
      console.log(`✅ ${r.label}`);
    }
  });

  await browser.close();
})();
