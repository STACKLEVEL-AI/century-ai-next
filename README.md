# Century — enterprise AI website

The English Century website for [century-ai.eu](https://century-ai.eu/), built with Next.js App Router and exported as static files for GitHub Pages.

The repository contains a **26-route adaptation of the main [Wonderful](https://www.wonderful.ai/) site**, covering the homepage, platform and delivery pages, seven industries, company pages and an original four-article blog. The current design uses **the supplied black and white Century wordmarks, Inter typography, white and near-black sections, and local photographic media**. Century's name, founders and contact destinations are preserved. Page structure and visual composition follow the reference; the writing and product examples are adapted for Century.

The [design migration log](docs/design-migration-2026-11-04.md) records the initial redesign. The [application screenshot log](docs/application-screenshots-2026-11-04.md) tracks the follow-up replacement of invented product visuals with English-only details captured from the supplied Century recordings.

## Pages

| Area | Routes |
| --- | --- |
| Home | `/` |
| Platform | `/ai-os/`, `/agents/`, `/systems/`, `/ai-gateway/` |
| Delivery and control | `/deployment/`, `/ai-transformation/`, `/security/` |
| Industries | `/industries/`, `/industries/banking/`, `/industries/telecommunication/`, `/industries/healthcare/`, `/industries/utilities/`, `/industries/insurance/`, `/industries/retail/`, `/industries/airlines/` |
| Company | `/about-us/`, `/careers/`, `/press/`, `/contact/` |
| Guides | `/blog/`, `/blog/choose-first-ai-workflow/`, `/blog/answers-need-sources/`, `/blog/human-review/`, `/blog/plan-ai-deployment/` |
| Website information | `/privacy/` |

The industry URL is deliberately singular: `/industries/telecommunication/`. The export also contains a custom `404.html`, sitemap, robots file, social image and downloadable Century SVG wordmark; these are not additional content routes.

## Content and interaction

Each industry page includes concrete workflow examples, the information they use, the person who reviews the result, an illustrative four-step process and implementation controls. Product pages include an infrastructure explorer, native disclosures, a deployment phase selector and real application captures. Each capture links to its full-size local image and remains available without JavaScript.

The invented supplier answer, review queue, product diagrams and Gateway sample analytics have been removed. Product visuals now use **real, pre-cropped application frames**. The selected visible fragments contain English interface text, technical identifiers or numbers; Russian messages and document contents are excluded. These are static screenshots, not a live account connection. Careers presents areas for a conversation without inventing open vacancies. Press provides company information and a local brand download without inventing coverage, investors or awards. The blog contains original practical Century guides.

All contact actions lead to [Vitali Bakhmat on Telegram](https://t.me/vitalibakhmat). The other external profile destinations are [Vadim Vladymtsev’s website](https://vadimohka.com/) and [Egor Krychev’s LinkedIn](https://www.linkedin.com/in/ekrychev/). The site has no contact form or embedded chat. The application adds no analytics, cookies or persistent browser storage.

Images, the background film, both wordmarks and application captures are served locally. Inter is bundled by `next/font` during the build and served with the site. The homepage uses a short, silent film selection from the reference with a pause/play control. A responsive poster remains visible without JavaScript; the film is not mounted when reduced motion or the browser's save-data preference is enabled. Reference media is illustrative and does not depict Century's premises or establish customer relationships. Main content is server rendered; native navigation and disclosures work without JavaScript, and interactive selectors provide static fallback content.

## Local development

Use Node.js 20, matching the GitHub Pages workflow.

```bash
npm ci
npm run dev
```

Build the publishable static files:

```bash
npm run build
```

The result is `out/`. The existing postbuild step adds `CNAME` and `.nojekyll`. Serve `out/` with a static web server; `next start` is not used for this export.

## GitHub Pages deployment

In **Settings → Pages → Build and deployment**, select **GitHub Actions**. Keep the custom domain `century-ai.eu` in Pages settings.

The workflow is [`.github/workflows/nextjs.yml`](.github/workflows/nextjs.yml), named **Deploy Century to GitHub Pages**. It runs on pushes to `main`, or manually with `main` selected. Its only job checks out the repository, installs dependencies, builds the static site, uploads `out/` and deploys the Pages artifact.

**CI contains no test jobs or test steps.** It does not run Playwright, `typecheck` or `check:export`, and it does not run a pull-request verification workflow. Compilation and export remain necessary to produce the deployment artifact. The workflow does not publish a separate `gh-pages` branch or commit generated output.

A successful Actions deployment and the live Pages URL establish publication status; the presence of source files or these instructions does not establish that a release has deployed.

## Optional local inspection

These commands are available for deliberate local use and are not part of CI:

```bash
npm run typecheck
npm run check:export
```

`check:export` requires a completed `out/` build. It checks all 26 content pages, unique titles and descriptions, canonicals and Open Graph URLs, sitemap coverage, local links and anchors, referenced assets, contact destinations, real application captures and the social-image dimensions. It accepts an alternative export directory with `npm run check:export -- /absolute/path/to/export`.

The optional `test:e2e` command and `tests/landing.spec.ts` cover route metadata, contacts and local resources, navigation without JavaScript, keyboard interactions, product tabs, real capture loading/full-size links and responsive layouts. The suite is not called by deployment; running it locally requires a completed export, Python 3 and Playwright's Chromium browser. The current workspace attempt stopped before assertions because Chromium was missing and its download was truncated. This is a browser-installation blocker, not a result for the application's test assertions. Further browser-review results are recorded in the [migration log](docs/design-migration-2026-11-04.md).

At the initial design migration's preview checkpoint, `npm run typecheck` passed, the local preview build generated all 26 content routes, and `npm run check:export` passed. This workspace lacks `/proc` RSS metrics: Next.js's optional `traceMemoryUsage` diagnostic throws an `ENOENT` error before compilation. For the preview only, the ignored local dependency tracer skipped that specific diagnostic. The workaround changes no application source, package lock or deployment workflow. The unmodified production build and GitHub Pages deployment subsequently passed in [Actions run 41842820065](https://github.com/STACKLEVEL-AI/century-ai-next/actions/runs/41842820065) for merge commit `1163e7c`. The updated site was verified at [century-ai.eu](https://century-ai.eu/). See the migration log for release evidence, screenshots and the exact scope of live-browser checks.

## Useful source files

| File | Purpose |
| --- | --- |
| `src/lib/site.ts` | Century name, domain and verified contact/profile links. |
| `src/lib/navigation.ts` | Platform, industry and company navigation. |
| `src/lib/routes.ts` | Public route registry used by the sitemap. |
| `src/lib/industries.ts` | Seven industry pages and related-sector links. |
| `src/lib/articles.ts` | Four original guides and article metadata. |
| `src/components/site/` | Shared inner-page shell, heroes, sections and related links. |
| `src/components/products/` | Infrastructure and deployment selectors. |
| `src/components/AppScreenshot.tsx`, `src/lib/app-captures.ts` | Accessible real-image figures and their English metadata. |
| `src/components/industries/` | Industry icons and retained historical artwork code. |
| `src/components/HeroFilm.tsx` | Local background film, playback control and reduced-motion/save-data handling. |
| `src/app/globals.css`, `site.css`, `products.css`, `industries.css`, `company.css`, `design.css` | Shared styles, page-family layouts and the current neutral design system. |
| `public/brand/`, `public/media/` | Supplied Century wordmarks, local reference media and application captures in `media/app/`. |

Regenerate the committed 1200 × 630 social preview image with `npm run assets:og`, then rebuild the export. The generator uses Sharp and local assets; it does not require a browser.

The [adaptation notes](docs/wonderful-adaptation.md) describe the implemented scope and behaviour. The [migration log](docs/design-migration-2026-11-04.md) tracks the current design work. The [original single-page plan](docs/superpowers/plans/2026-10-26-century-ai-eu-upgrade.md) remains unchanged as historical context.
