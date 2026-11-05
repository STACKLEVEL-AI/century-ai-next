import { copyFile, mkdir, writeFile } from "node:fs/promises";

await copyFile("CNAME", "out/CNAME");
await writeFile("out/.nojekyll", "");

// GitHub Pages needs exported compatibility documents for the previous URL.
// Both versions preserve incoming query parameters and section anchors.
for (const locale of ["en", "pl"]) {
  const polish = locale === "pl";
  const source = polish ? "pl/ai-os" : "ai-os";
  const target = polish ? "/pl/platform/" : "/platform/";
  const title = polish ? "Century AI Platform — platforma AI dla firm | Century" : "Century AI Platform | Century";
  await mkdir(`out/${source}`, { recursive: true });
  await writeFile(`out/${source}/index.html`, `<!doctype html>
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
    <p>${polish ? "Ta strona została przeniesiona do" : "This page has moved to"} <a href="${target}">${polish ? "platformy AI" : "AI Platform"}</a>.</p>
  </main>
</body>
</html>
`);
}
console.log("Independent EU export packaged in out/");
