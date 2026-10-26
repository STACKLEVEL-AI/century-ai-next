import assert from "node:assert/strict";
import { copyFile, readFile, stat, writeFile } from "node:fs/promises";

assert.equal(
  (await readFile("CNAME", "utf8")).trim(),
  "century-ai.eu",
  "CNAME must be century-ai.eu",
);
assert(
  (await stat("out/index.html")).isFile(),
  "Build must produce out/index.html",
);
await copyFile("CNAME", "out/CNAME");
await writeFile("out/.nojekyll", "");
console.log("Independent EU export packaged in out/");
