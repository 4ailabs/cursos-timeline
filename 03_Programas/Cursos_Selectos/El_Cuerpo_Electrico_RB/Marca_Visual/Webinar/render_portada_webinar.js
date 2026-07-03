const path = require("path");
const sharp = require("/Users/miguelojedarios/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp");

const dir = __dirname;
const background = path.join(
  dir,
  process.argv[2] || "portada_webinar_fondo_camilla.png"
);
const logo = path.join(
  dir,
  "..",
  "Branding_RB_2026",
  "svg",
  "logo_principal_light.svg"
);
const output = path.join(
  dir,
  process.argv[3] || "portada_webinar_el_cuerpo_electrico_16x9.png"
);

const width = 1920;
const height = 1080;

const typography = Buffer.from(`
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"
  xmlns="http://www.w3.org/2000/svg">
  <rect x="100" y="190" width="305" height="52" fill="#0F6E56"/>
  <text x="252.5" y="225"
    text-anchor="middle"
    font-family="Arial, Helvetica, sans-serif"
    font-size="23"
    font-weight="600"
    letter-spacing="2.8"
    fill="#FFFFFF">WEBINAR GRATUITO</text>

  <text x="100" y="405"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="108"
    font-weight="400"
    letter-spacing="-1.5"
    fill="#2C2C2A">EL CUERPO</text>
  <text x="100" y="520"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="108"
    font-weight="400"
    letter-spacing="-1.5"
    fill="#0F6E56">ELÉCTRICO</text>

  <text x="100" y="623"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="38"
    font-weight="400"
    fill="#2C2C2A">Cómo tu cuerpo se autorregula —</text>
  <text x="100" y="672"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="38"
    font-weight="400"
    fill="#2C2C2A">y cómo aprender a leerlo.</text>

  <line x1="100" y1="748" x2="685" y2="748" stroke="#BA7517" stroke-width="2"/>
  <text x="100" y="802"
    font-family="Arial, Helvetica, sans-serif"
    font-size="26"
    font-weight="600"
    letter-spacing="1.4"
    fill="#BA7517">3 DE JULIO · EN VIVO POR ZOOM</text>
  <line x1="100" y1="830" x2="685" y2="830" stroke="#BA7517" stroke-width="2"/>

  <text x="100" y="910"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="40"
    font-weight="400"
    fill="#2C2C2A">Dr. Miguel Ojeda Ríos</text>
  <text x="100" y="952"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="23"
    font-style="italic"
    font-weight="400"
    fill="#2C2C2A">Instituto Centrobioenergetica</text>
</svg>
`);

async function render() {
  const base = await sharp(background)
    .resize(width, height, { fit: "fill" })
    .png()
    .toBuffer();

  const logoBuffer = await sharp(logo)
    .trim()
    .resize({ width: 350 })
    .png()
    .toBuffer();

  await sharp(base)
    .composite([
      { input: logoBuffer, left: 100, top: 68 },
      { input: typography, left: 0, top: 0 },
    ])
    .png()
    .toFile(output);

  console.log(output);
}

render().catch((error) => {
  console.error(error);
  process.exit(1);
});
