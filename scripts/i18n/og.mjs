import { mkdir, readFile } from "node:fs/promises";
import sharp from "sharp";

const wordmark = (await readFile("public/brand/century-logo-white.svg")).toString("base64");
const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#071419" fill-opacity="0.62"/>
  <image href="data:image/svg+xml;base64,${wordmark}" x="72" y="42" width="190" height="50"/>
  <g fill="#fff" font-family="DejaVu Sans, Arial, sans-serif" text-anchor="middle">
    <text x="600" y="245" font-size="66" font-weight="300">Прискорюйте</text>
    <text x="600" y="328" font-size="66" font-weight="300">трансформацію зі ШІ</text>
    <text x="600" y="411" font-size="66" font-weight="300">у вашому бізнесі</text>
    <text x="600" y="480" font-size="23" fill="#e9eae6">Ваші знання. Ваші системи. Ваш новий етап.</text>
    <text x="600" y="580" font-size="18" fill="#e9eae6">century-ai.eu/uk</text>
  </g>
</svg>`);
await mkdir("public/uk/og", { recursive: true });
await sharp("public/media/hero-poster.webp").resize(1200, 630, { fit: "cover", position: "centre" })
  .composite([{ input: overlay }]).png({ compressionLevel: 9, palette: true, colours: 256, quality: 90, dither: 1 })
  .toFile("public/uk/og/century-ai-eu.png");
