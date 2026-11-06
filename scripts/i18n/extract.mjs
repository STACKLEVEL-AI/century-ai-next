import { mkdir, writeFile } from "node:fs/promises";
import { collectMessages } from "./source.mjs";

await mkdir("localization-audit", { recursive: true });
for (const [domain, messages] of Object.entries(await collectMessages())) {
  await writeFile(`localization-audit/${domain}.json`, JSON.stringify(Object.fromEntries(messages), null, 2) + "\n");
  console.log(`${domain}: ${messages.size} messages`);
}
