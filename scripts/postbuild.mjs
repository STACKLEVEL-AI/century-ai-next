import { copyFile, mkdir, writeFile } from "node:fs/promises";

await copyFile("CNAME", "out/CNAME");
await writeFile("out/.nojekyll", "");

// GitHub Pages serves the static export, so keep incoming links to the previous
// platform URL working without relying on a server-side Next.js redirect.
await mkdir("out/ai-os", { recursive: true });
await writeFile("out/ai-os/index.html", `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Century AI Platform | Century</title>
  <meta name="robots" content="noindex,follow">
  <link rel="canonical" href="https://century-ai.eu/platform/">
  <script>window.location.replace("/platform/" + window.location.search + window.location.hash);</script>
  <noscript><meta http-equiv="refresh" content="0; url=/platform/"></noscript>
</head>
<body>
  <main>
    <h1>Century AI Platform</h1>
    <p>This page has moved to <a href="/platform/">AI Platform</a>.</p>
  </main>
</body>
</html>
`);
console.log("Independent EU export packaged in out/");
