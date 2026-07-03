const path = require("path");
const sharp = require("/Users/miguelojedarios/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp");

const dir = __dirname;
const background = path.join(dir, "portada_webinar_fondo_bucle_vivo.png");
const logo = path.join(
  dir,
  "..",
  "Branding_RB_2026",
  "svg",
  "logo_principal_light.svg"
);
const output = path.join(
  dir,
  "portada_webinar_el_cuerpo_electrico_diagrama_16x9.png"
);

const width = 1920;
const height = 1080;

const typography = Buffer.from(`
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"
  xmlns="http://www.w3.org/2000/svg">
  <rect x="100" y="185" width="305" height="52" fill="#0F6E56"/>
  <text x="252.5" y="220"
    text-anchor="middle"
    font-family="Arial, Helvetica, sans-serif"
    font-size="23"
    font-weight="600"
    letter-spacing="2.8"
    fill="#FFFFFF">WEBINAR GRATUITO</text>

  <text x="100" y="390"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="100"
    font-weight="400"
    letter-spacing="-1.5"
    fill="#2C2C2A">EL CUERPO</text>
  <text x="100" y="500"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="100"
    font-weight="400"
    letter-spacing="-1.5"
    fill="#0F6E56">ELÉCTRICO</text>

  <text x="100" y="595"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="36"
    font-weight="400"
    fill="#2C2C2A">Cómo tu cuerpo se autorregula —</text>
  <text x="100" y="640"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="36"
    font-weight="400"
    fill="#2C2C2A">y cómo aprender a leerlo.</text>

  <line x1="100" y1="728" x2="690" y2="728" stroke="#BA7517" stroke-width="2"/>
  <text x="100" y="780"
    font-family="Arial, Helvetica, sans-serif"
    font-size="25"
    font-weight="600"
    letter-spacing="1.2"
    fill="#BA7517">3 DE JULIO · EN VIVO POR ZOOM</text>
  <line x1="100" y1="808" x2="690" y2="808" stroke="#BA7517" stroke-width="2"/>

  <text x="100" y="890"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="39"
    font-weight="400"
    fill="#2C2C2A">Dr. Miguel Ojeda Ríos</text>
  <text x="100" y="932"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="23"
    font-style="italic"
    font-weight="400"
    fill="#2C2C2A">Instituto Centrobioenergetica</text>

  <g font-family="Arial, Helvetica, sans-serif"
    font-size="20"
    font-weight="600"
    letter-spacing="3.2"
    fill="#2C2C2A">
    <text x="1300" y="372" text-anchor="middle">SEÑAL</text>
    <text x="1640" y="930" text-anchor="middle">RESPUESTA</text>
    <text x="955" y="930" text-anchor="middle">ADAPTACIÓN</text>
  </g>
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
      { input: logoBuffer, left: 100, top: 62 },
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
