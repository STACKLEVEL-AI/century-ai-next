import assert from "node:assert/strict";
import { mkdir, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const width = 1200;
const height = 630;
const configuration = JSON.parse(await readFile(new URL("../src/locales/config.json", import.meta.url), "utf8"));
const escape = value => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

/** Keep social previews in the same language as their destination page. */
export async function createOpenGraph(locale = configuration.defaultLocale) {
  assert(Object.hasOwn(configuration.locales, locale), "Unsupported Open Graph locale");
  const settings = configuration.locales[locale];
  const copy = settings.socialPreview;
  const address = `century-ai.eu${locale === configuration.defaultLocale ? "" : `/${locale}/`}`;
  const source = fileURLToPath(new URL("../public/media/hero-poster.webp", import.meta.url));
  const output = fileURLToPath(new URL(`../public${settings.socialImage}`, import.meta.url));
  const wordmark = (await readFile(new URL("../public/brand/century-logo-white.svg", import.meta.url))).toString("base64");
  const overlay = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <rect width="1200" height="630" fill="#071419" fill-opacity="0.62" />
      <image href="data:image/svg+xml;base64,${wordmark}" x="72" y="42" width="190" height="50" />
      <g fill="#fff" font-family="Arial, Helvetica, sans-serif" text-anchor="middle">
        ${copy.lines.map((line, index) => `<text x="600" y="${copy.firstLine + index * copy.lineGap}" font-size="76" font-weight="300" letter-spacing="${copy.tracking}">${escape(line)}</text>`).join("\n")}
        <text x="600" y="${copy.subtitleY}" font-size="${copy.subtitleSize}" fill="#e9eae6">${escape(copy.subtitle)}</text>
        <text x="600" y="580" font-size="18" fill="#e9eae6">${escape(address)}</text>
      </g>
    </svg>
  `);
  await mkdir(dirname(output), { recursive: true });
  const result = await sharp(source).resize(width, height, { fit: "cover", position: "centre" })
    .composite([{ input: overlay }]).png({ compressionLevel: 9, palette: true, colours: 256, quality: 90, dither: 1 }).toFile(output);
  assert.equal(result.width, width);
  assert.equal(result.height, height);
  console.log(`Created public${settings.socialImage} (1200×630)`);
  return output;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const selected = process.argv.find(value => value.startsWith("--locale="))?.slice("--locale=".length);
  for (const locale of selected ? [selected] : Object.keys(configuration.locales)) await createOpenGraph(locale);
}
