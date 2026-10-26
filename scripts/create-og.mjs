import { mkdir } from "node:fs/promises";
import { chromium } from "@playwright/test";

const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.setContent(`<!doctype html><html lang="en"><head><meta charset="utf-8"><style>
    *{box-sizing:border-box}body{margin:0;width:1200px;height:630px;background:#fff;color:#10101b;font-family:Arial,sans-serif;padding:60px 68px;position:relative}
    .brand{font-size:30px;font-weight:700;display:flex;align-items:center;gap:12px}.mark{width:24px;height:24px;border:6px solid #210dff;border-right-color:transparent;border-radius:50%}
    h1{font-size:80px;line-height:1.06;letter-spacing:-4px;font-weight:600;margin:62px 0 24px}h1 span{color:#210dff}
    p{font-size:25px;color:#555567;margin:0}footer{position:absolute;left:68px;right:68px;bottom:45px;border-top:1px solid #dcdce8;padding-top:20px;font-size:19px;color:#666674}
    .corner{position:absolute;right:68px;top:60px;width:48px;height:48px;background:#210dff;border-radius:13px;color:#fff;display:grid;place-items:center;font-size:30px}
  </style></head><body><div class="brand"><span class="mark"></span>Century</div><div class="corner">↗</div><h1>Enterprise AI.<br><span>Under your control.</span></h1><p>Knowledge. Workflows. Support.</p><footer>century-ai.eu</footer></body></html>`);
  await mkdir("public/og", { recursive: true });
  await page.screenshot({ path: "public/og/century-ai-eu.png" });
  console.log("Created public/og/century-ai-eu.png (1200×630)");
} finally {
  await browser.close();
}
