import { copyFile, mkdir, writeFile } from "node:fs/promises";

await copyFile("CNAME", "out/CNAME");
await writeFile("out/.nojekyll", "");

// Preserve old platform links in every language on static GitHub Pages hosting.
const messages = {
  en: "This page has moved:",
  de: "Diese Seite wurde verschoben:",
  uk: "Цю сторінку переміщено:",
};
for (const locale of ["en", "de", "uk"]) {
  const prefix = locale === "en" ? "" : `/${locale}`;
  const destination = `${prefix}/platform/`;
  const directory = `out${prefix}/ai-os`;
  const message = messages[locale];
  await mkdir(directory, { recursive: true });
  await writeFile(`${directory}/index.html`, `<!doctype html>
<html lang="${locale}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Century AI Platform | Century</title>
  <meta name="robots" content="noindex,follow">
  <link rel="canonical" href="https://century-ai.eu${destination}">
  <script>window.location.replace("${destination}" + window.location.search + window.location.hash);</script>
  <noscript><meta http-equiv="refresh" content="0; url=${destination}"></noscript>
</head>
<body>
  <main>
    <h1>Century AI Platform</h1>
    <p>${message} <a href="${destination}">AI Platform</a></p>
  </main>
</body>
</html>
`);
}
console.log("Independent EU export packaged in out/ with English, German and Ukrainian compatibility redirects");
