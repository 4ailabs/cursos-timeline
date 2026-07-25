const puppeteer=require('/Users/miguelojedarios/cursos-timeline/03_Programas/Cursos_Selectos/Taller_Actos_que_Mueven/02_Taller_Presencial/Materiales_Impresion/node_modules/puppeteer');
const path=require('path'),fs=require('fs');
(async()=>{
  const html=fs.readFileSync(path.resolve(__dirname,'artifact_manual_m1_b1b2.html'),'utf8');
  const b=await puppeteer.launch({headless:'new',args:['--no-sandbox','--disable-setuid-sandbox']});
  const p=await b.newPage();
  await p.setViewport({width:900,height:1200,deviceScaleFactor:1.4});
  await p.setContent('<!doctype html><html><head><meta charset="utf-8"></head><body>'+html+'</body></html>',{waitUntil:'networkidle0'});
  fs.mkdirSync(path.resolve(__dirname,'check_artifact_png'),{recursive:true});
  await p.screenshot({path:path.resolve(__dirname,'check_artifact_png','top.png')});
  // una figura: scroll a la primera figura
  await p.evaluate(()=>{const f=document.querySelector('figure.fig');f&&f.scrollIntoView({block:'center'})});
  await new Promise(r=>setTimeout(r,300));
  await p.screenshot({path:path.resolve(__dirname,'check_artifact_png','fig.png')});
  await b.close();console.log('ok');
})();
