import { copyFile, mkdir, writeFile } from "node:fs/promises";

await copyFile("CNAME", "out/CNAME");
await writeFile("out/.nojekyll", "");

// Static compatibility documents preserve old platform URLs in every language,
// including their query parameters and section anchors.
for (const locale of ["en", "de", "pl"]) {
  const prefix = locale === "en" ? "" : `/${locale}`;
  const target = `${prefix}/platform/`;
  const title = locale === "pl" ? "Century AI Platform — platforma AI dla firm | Century" : "Century AI Platform | Century";
  const message = { en: "This page has moved to", de: "Diese Seite wurde verschoben:", pl: "Ta strona została przeniesiona do" }[locale];
  await mkdir(`out${prefix}/ai-os`, { recursive: true });
  await writeFile(`out${prefix}/ai-os/index.html`, `<!doctype html>
<html lang="${locale}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="robots" content="noindex,follow">
  <link rel="canonical" href="https://century-ai.eu${target}">
  <script>window.location.replace(${JSON.stringify(target)} + window.location.search + window.location.hash);</script>
  <noscript><meta http-equiv="refresh" content="0; url=${target}"></noscript>
</head>
<body>
  <main>
    <h1>Century AI Platform</h1>
    <p>${message} <a href="${target}">${locale === "pl" ? "platformy AI" : "AI Platform"}</a>.</p>
  </main>
</body>
</html>
`);
}
console.log("Independent EU export packaged in out/ with English, German and Polish compatibility redirects");
