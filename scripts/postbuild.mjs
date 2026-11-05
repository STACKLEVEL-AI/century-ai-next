import { copyFile, writeFile } from "node:fs/promises";

await copyFile("CNAME", "out/CNAME");
await writeFile("out/.nojekyll", "");
console.log("Independent EU export packaged in out/");
