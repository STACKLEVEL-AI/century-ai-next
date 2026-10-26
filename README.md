# Century EU landing

Independent English landing for `https://century-ai.eu/`. The only contact destination is `https://t.me/vitalibakhmat`.

The compact founders section links to Vadim Vladymtsev's website, `https://vadimohka.com/`, and Egor Krychev's LinkedIn profile, `https://www.linkedin.com/in/ekrychev/`. All three portraits are served locally.

## Local development

Use Node.js 20 or later.

```bash
npm ci
npm run dev
```

## Static export and checks

```bash
npx playwright install chromium
npm run build
npm run typecheck
npm run check:export
npm run test:e2e
```

The browser checks use Python 3 to serve the exported files locally. Screenshots are saved under `test-results/`.

The export is in `out/`, including the domain configuration, sitemap, robots file and social preview image. Serve that directory with a static web server; `next start` is not used for a static export.

To regenerate the committed social preview image:

```bash
npm run assets:og
```

## GitHub Pages from main

In **Settings → Pages → Build and deployment**, set **Source** to **GitHub Actions**. Keep the custom domain `century-ai.eu` in the Pages settings. Do not select “Deploy from a branch”: the repository root contains Next.js source files, while the publishable site is generated in `out/`.

The workflow builds and checks the site, uploads `out/` as the Pages artifact, then deploys it when running from `main`. Pull requests run the checks without deploying. Publication no longer uses a separate `gh-pages` branch or committed build output.

Push to `main` to deploy, or run **Build and deploy EU landing** manually from the Actions tab with `main` selected. A failed check prevents publication.

The implementation specification and completed checklist are in [the plan](docs/superpowers/plans/2026-10-26-century-ai-eu-upgrade.md).
