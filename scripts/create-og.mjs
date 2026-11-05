import assert from "node:assert/strict";
import { mkdir, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const width = 1200;
const height = 630;

export async function createOpenGraph(locale = "en") {
  const polish = locale === "pl";
  const source = fileURLToPath(new URL("../public/media/hero-poster.webp", import.meta.url));
  const filename = polish ? "century-ai-pl.png" : "century-ai-eu.png";
  const output = fileURLToPath(new URL(`../public/og/${filename}`, import.meta.url));
  const wordmark = (await readFile(new URL("../public/brand/century-logo-white.svg", import.meta.url))).toString("base64");
  const lines = polish ? ["Przyspiesz", "transformację AI", "w swojej firmie"] : ["Accelerate", "AI transformation", "across your business."];
  const subtitle = polish ? "Twoja wiedza. Twoje systemy. Twój nowy rozdział." : "Your knowledge. Your systems. Your next chapter.";
  const address = polish ? "century-ai.eu/pl/" : "century-ai.eu";

  // Both languages use the existing wordmark and local hero photograph.
  const overlay = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <rect width="1200" height="630" fill="#071419" fill-opacity="0.62" />
      <image href="data:image/svg+xml;base64,${wordmark}" x="72" y="42" width="190" height="50" />
      <g fill="#fff" font-family="Arial, Helvetica, sans-serif" text-anchor="middle">
        ${lines.map((line, index) => `<text x="600" y="${245 + index * 83}" font-size="76" font-weight="300" letter-spacing="-3">${line}</text>`).join("\n")}
        <text x="600" y="480" font-size="22" fill="#e9eae6">${subtitle}</text>
        <text x="600" y="580" font-size="18" fill="#e9eae6">${address}</text>
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
  console.log(`Created public/og/${filename} (1200×630)`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await createOpenGraph("en");
  await createOpenGraph("pl");
}
