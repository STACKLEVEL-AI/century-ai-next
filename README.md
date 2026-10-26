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

The GitHub workflow validates and uploads a build artifact. It does not publish the website. Domain and hosting configuration are handled separately.

The implementation specification and completed checklist are in [the plan](docs/superpowers/plans/2026-10-26-century-ai-eu-upgrade.md).
