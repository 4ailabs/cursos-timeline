const path = require("path");
const sharp = require("/Users/miguelojedarios/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp");

const dir = __dirname;
const artwork = path.join(
  dir,
  process.argv[2] || "webinar_v8_arte_cicatrizacion.png"
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
  process.argv[3] ||
    "webinar_el_cuerpo_electrico_3_julio_v8_adaptacion.png"
);
const showCharges = process.argv.includes("--charges");

const width = 1080;
const height = 1350;

const chargeMarks = showCharges
  ? `
  <g font-family="Arial, Helvetica, sans-serif" font-size="19" font-weight="700">
    <text x="666" y="596" fill="#0F6E56">−</text>
    <text x="690" y="617" fill="#BA7517">+</text>
    <text x="788" y="620" fill="#0F6E56">−</text>
    <text x="812" y="643" fill="#BA7517">+</text>
    <text x="658" y="755" fill="#BA7517">+</text>
    <text x="683" y="779" fill="#0F6E56">−</text>
    <text x="790" y="758" fill="#BA7517">+</text>
    <text x="767" y="784" fill="#0F6E56">−</text>
  </g>`
  : "";

const typography = Buffer.from(`
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"
  xmlns="http://www.w3.org/2000/svg">
  <rect x="60" y="170" width="270" height="48" rx="0" fill="#0F6E56"/>
  <text x="195" y="203"
    text-anchor="middle"
    font-family="Arial, Helvetica, sans-serif"
    font-size="22"
    font-weight="600"
    letter-spacing="2.4"
    fill="#FFFFFF">WEBINAR GRATUITO</text>

  <text x="60" y="338"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="84"
    font-weight="400"
    letter-spacing="-1.5"
    fill="#0F6E56">EL CUERPO</text>
  <text x="60" y="432"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="84"
    font-weight="400"
    letter-spacing="-1.5"
    fill="#0F6E56">ELÉCTRICO</text>

  <text x="60" y="532"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="36"
    font-weight="400"
    fill="#2C2C2A">La adaptación empieza</text>
  <text x="60" y="578"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="36"
    font-weight="400"
    fill="#2C2C2A">en una señal eléctrica.</text>

  <line x1="60" y1="650" x2="410" y2="650" stroke="#BA7517" stroke-width="1.5"/>
  <text x="60" y="703"
    font-family="Arial, Helvetica, sans-serif"
    font-size="20"
    font-weight="600"
    letter-spacing="0.8"
    fill="#BA7517">3 DE JULIO · EN VIVO POR ZOOM</text>
  <line x1="60" y1="730" x2="410" y2="730" stroke="#BA7517" stroke-width="1.5"/>

  <text x="60" y="817"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="37"
    font-weight="400"
    fill="#2C2C2A">Dr. Miguel Ojeda Ríos</text>
  <text x="60" y="857"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="22"
    font-style="italic"
    font-weight="400"
    fill="#2C2C2A">Instituto Centrobioenergetica</text>
  ${chargeMarks}
</svg>
`);

async function render() {
  const base = await sharp(artwork)
    .resize(width, height, { fit: "fill" })
    .png()
    .toBuffer();

  const logoBuffer = await sharp(logo)
    .trim()
    .resize({ width: 255 })
    .png()
    .toBuffer();

  await sharp(base)
    .composite([
      { input: logoBuffer, left: 60, top: 55 },
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
