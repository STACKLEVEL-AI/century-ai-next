import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("out");
const required = [
  "index.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "CNAME",
  ".nojekyll",
  "og/century-ai-eu.png",
];
const forbidden = [
  "century-ai.by",
  "century-ai.ru",
  "hoster.by",
  "mc.yandex",
  "metrika",
  "googletagmanager",
  "google-analytics",
  "api.telegram.org",
  "next_public_telegram",
  "g-9lifouqi7bxnaufqzww-u_npp1rvshary-mu1dbvs",
  "/century-ai-next/",
];

async function inspect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await inspect(filename);
    } else if (/\.(html|js|json|txt|xml|css)$/.test(entry.name)) {
      const source = await readFile(filename, "utf8");
      const lower = source.toLowerCase();
      const relative = path.relative(root, filename);
      for (const marker of forbidden) {
        assert(
          !lower.includes(marker),
          `Legacy connection found in ${relative}`,
        );
      }
      if (entry.name.endsWith(".html")) {
        assert(
          !/<(?:form|input|textarea|select)(?:\s|>)/i.test(source),
          `Lead capture field found in ${relative}`,
        );
      }
    }
  }
}

try {
  for (const file of required)
    assert(
      (await stat(path.join(root, file))).isFile(),
      `Missing export file: ${file}`,
    );
  assert.equal(
    (await readFile(path.join(root, "CNAME"), "utf8")).trim(),
    "century-ai.eu",
    "Wrong export domain",
  );
  const sitemap = await readFile(path.join(root, "sitemap.xml"), "utf8");
  assert.deepEqual(
    [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]),
    ["https://century-ai.eu/"],
    "Sitemap must contain only the EU landing",
  );
  const robots = await readFile(path.join(root, "robots.txt"), "utf8");
  assert(
    robots.includes("Sitemap: https://century-ai.eu/sitemap.xml"),
    "Wrong sitemap in robots.txt",
  );
  const image = await readFile(path.join(root, "og/century-ai-eu.png"));
  assert.equal(
    image.subarray(0, 8).toString("hex"),
    "89504e470d0a1a0a",
    "OG asset is not a PNG",
  );
  assert.equal(image.readUInt32BE(16), 1200, "OG width must be 1200");
  assert.equal(image.readUInt32BE(20), 630, "OG height must be 630");
  await inspect(root);
  console.log("Export checks passed");
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
