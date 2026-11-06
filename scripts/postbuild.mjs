import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";

const configuration = JSON.parse(await readFile(new URL("../src/locales/config.json", import.meta.url), "utf8"));
const escape = value => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
await copyFile("CNAME", "out/CNAME");
await writeFile("out/.nojekyll", "");

// Native fallback links and script redirects preserve old platform URLs.
for (const [locale, settings] of Object.entries(configuration.locales)) {
  const prefix = locale === configuration.defaultLocale ? "" : `/${locale}`;
  const target = `${prefix}/platform/`;
  const title = `${settings.productTitles["Century AI Platform"] ?? "Century AI Platform"} | Century`;
  await mkdir(`out${prefix}/ai-os`, { recursive: true });
  await writeFile(`out${prefix}/ai-os/index.html`, `<!doctype html>
<html lang="${locale}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escape(title)}</title>
  <meta name="robots" content="noindex,follow">
  <link rel="canonical" href="https://century-ai.eu${target}">
  <script>window.location.replace(${JSON.stringify(target)} + window.location.search + window.location.hash);</script>
  <noscript><meta http-equiv="refresh" content="0; url=${target}"></noscript>
</head>
<body>
  <main>
    <h1>Century AI Platform</h1>
    <p>${escape(settings.redirect.message)} <a href="${target}">${escape(settings.redirect.linkLabel)}</a>.</p>
  </main>
</body>
</html>
`);
}
console.log(`Independent EU export packaged in out/ with ${Object.keys(configuration.locales).join(", ")} compatibility redirects`);
