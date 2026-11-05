import assert from "node:assert/strict";
import { mkdir, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

/** Keep social previews in the same language as their destination page. */
export async function createOpenGraph(locale = "en") {
  assert(["en", "de"].includes(locale), "Unsupported Open Graph locale");
  const width = 1200;
  const height = 630;
  const source = fileURLToPath(new URL("../public/media/hero-poster.webp", import.meta.url));
  const output = fileURLToPath(new URL(`../public/og/century-ai-eu${locale === "de" ? "-de" : ""}.png`, import.meta.url));
  const wordmark = (await readFile(new URL("../public/brand/century-logo-white.svg", import.meta.url))).toString("base64");
  const copy = locale === "de"
    ? `<text x="600" y="277" font-size="76" font-weight="300" letter-spacing="-2">Von der Idee</text>
       <text x="600" y="368" font-size="76" font-weight="300" letter-spacing="-2">in den Arbeitsalltag</text>
       <text x="600" y="470" font-size="24" fill="#e9eae6">Spezifikation · Entwicklung · Governance</text>`
    : `<text x="600" y="245" font-size="76" font-weight="300" letter-spacing="-3">Accelerate</text>
       <text x="600" y="328" font-size="76" font-weight="300" letter-spacing="-3">AI transformation</text>
       <text x="600" y="411" font-size="76" font-weight="300" letter-spacing="-3">across your business.</text>
       <text x="600" y="480" font-size="22" fill="#e9eae6">Your knowledge. Your systems. Your next chapter.</text>`;
  const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <rect width="1200" height="630" fill="#071419" fill-opacity="0.62" />
    <image href="data:image/svg+xml;base64,${wordmark}" x="72" y="42" width="190" height="50" />
    <g fill="#fff" font-family="Arial, Helvetica, sans-serif" text-anchor="middle">
      ${copy}
      <text x="600" y="580" font-size="18" fill="#e9eae6">century-ai.eu${locale === "de" ? "/de/" : ""}</text>
    </g>
  </svg>`);
  await mkdir(dirname(output), { recursive: true });
  const result = await sharp(source).resize(width, height, { fit: "cover", position: "centre" })
    .composite([{ input: overlay }]).png({ compressionLevel: 9, palette: true, colours: 256, quality: 90, dither: 1 }).toFile(output);
  assert.equal(result.width, width);
  assert.equal(result.height, height);
  return output;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const locale = process.argv.includes("--locale=de") ? "de" : "en";
  console.log(`Created ${await createOpenGraph(locale)} (1200×630)`);
}
