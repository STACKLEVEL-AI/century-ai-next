import assert from "node:assert/strict";
import { mkdir, readFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const width = 1200;
const height = 630;
const source = fileURLToPath(new URL("../public/media/hero-poster.webp", import.meta.url));
const output = fileURLToPath(new URL("../public/og/century-ai-eu.png", import.meta.url));
const wordmark = (await readFile(new URL("../public/brand/century-logo-white.svg", import.meta.url))).toString("base64");

// The public preview uses the supplied wordmark and the same local hero image.
const overlay = Buffer.from(`
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <rect width="1200" height="630" fill="#071419" fill-opacity="0.62" />
    <image href="data:image/svg+xml;base64,${wordmark}" x="72" y="42" width="190" height="50" />
    <g fill="#fff" font-family="Arial, Helvetica, sans-serif" text-anchor="middle">
      <text x="600" y="245" font-size="76" font-weight="300" letter-spacing="-3">Accelerate</text>
      <text x="600" y="328" font-size="76" font-weight="300" letter-spacing="-3">AI transformation</text>
      <text x="600" y="411" font-size="76" font-weight="300" letter-spacing="-3">across your business.</text>
      <text x="600" y="480" font-size="22" fill="#e9eae6">Your knowledge. Your systems. Your next chapter.</text>
      <text x="600" y="580" font-size="18" fill="#e9eae6">century-ai.eu</text>
    </g>
  </svg>
`);

await mkdir(dirname(output), { recursive: true });
const result = await sharp(source)
  .resize(width, height, { fit: "cover", position: "centre" })
  .composite([{ input: overlay }])
  .png({ compressionLevel: 9, palette: true, colours: 256, quality: 90, dither: 1 })
  .toFile(output);
assert.equal(result.width, width);
assert.equal(result.height, height);
console.log("Created public/og/century-ai-eu.png (1200×630)");
