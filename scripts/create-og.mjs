import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const width = 1200;
const height = 630;
const source = fileURLToPath(
  new URL("../public/images/enterprise-atrium.webp", import.meta.url),
);
const output = fileURLToPath(
  new URL("../public/og/century-ai-eu.png", import.meta.url),
);

// Keep the social preview in the same visual language as the landing page.
// All compositing is local and does not require Chromium or a web server.
const overlay = Buffer.from(`
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="1200" height="630" fill="#161227" fill-opacity="0.62" />
    <g fill="#ffffff" font-family="Arial, Helvetica, sans-serif">
      <path d="M102 64 A15 15 0 1 0 102 86" fill="none" stroke="#a99dff" stroke-width="5" />
      <text x="120" y="88" font-size="34" font-weight="600" letter-spacing="-1.3">Century</text>
      <text x="78" y="268" font-size="88" font-weight="400" letter-spacing="-4">Enterprise AI.</text>
      <text x="78" y="366" font-size="88" font-weight="400" letter-spacing="-4">Under your control.</text>
      <text x="82" y="422" font-size="24" fill="#e6e1f5">Knowledge. Workflows. Support.</text>
      <line x1="80" y1="541" x2="1120" y2="541" stroke="#ffffff" stroke-opacity="0.3" />
      <text x="82" y="580" font-size="20" fill="#e6e1f5">century-ai.eu</text>
    </g>
  </svg>
`);

await mkdir(dirname(output), { recursive: true });
const result = await sharp(source)
  .resize(width, height, { fit: "cover", position: "centre" })
  .composite([{ input: overlay }])
  .png({ compressionLevel: 9, palette: true, colours: 256, quality: 90, dither: 1 })
  .toFile(output);

assert.equal(result.width, width, "Unexpected social preview width");
assert.equal(result.height, height, "Unexpected social preview height");
console.log("Created public/og/century-ai-eu.png (1200×630)");
