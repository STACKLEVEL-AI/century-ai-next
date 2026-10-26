import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:4173",
    browserName: "chromium",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "python3 -m http.server 4173 --bind 127.0.0.1 --directory out",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: false,
    stdout: "ignore",
    stderr: "ignore",
  },
});
