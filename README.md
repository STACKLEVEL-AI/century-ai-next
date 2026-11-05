# Century — enterprise AI website

The English Century website for [century-ai.eu](https://century-ai.eu/), built with Next.js App Router and exported as static files for GitHub Pages.

The repository contains a **26-route adaptation of the main [Wonderful](https://www.wonderful.ai/) site**, covering the homepage, platform and delivery pages, seven industries, company pages and an original four-article blog. The design uses **the supplied black and white Century wordmarks, local typography, white and near-black sections, licensed stock video, generated photography and reference media recorded in the page-family inventories**. Century's name, founders and contact destinations are preserved. Page structure and visual composition follow the reference; the writing and product examples are adapted for Century.

The [design migration log](docs/design-migration-2026-11-04.md) records the earlier staged work, original reference-media provenance and validation checkpoints. The [application screenshot log](docs/application-screenshots-2026-11-04.md) documents the replacement of invented product visuals with six English-only details captured from the supplied Century recordings. The [generated photography notes](docs/generated-photography-2026-11-04.md) document **10 generated photographic masters delivered as 14 WebP files**, their derived media and the three original founder portraits preserved byte-for-byte from `main` at `cad5ff160878585c75ce78a075f06d7b14087a6a`.

The [stock-video implementation notes](docs/stock-video-2026-11-05.md) document the current homepage structure, eight licensed source clips, responsive media and playback behaviour. The [source manifest](docs/stock-video-manifest.json) records source URLs, edit points, licences and hashes.

The [internal-page refinement notes](docs/internal-pages-2026-11-05.md) describe the redesign of all 25 internal routes, the removal of the oversized footer wordmark, the preserved homepage and media, and the exact scope of local verification.

The [Platform migration notes](docs/platform-reference-2026-11-05.md) record the subsequent transfer of the six Wonderful Platform compositions to the corresponding Century routes: AI OS, Agents, Systems, AI Gateway, Deployment and AI transformation. Their local backgrounds and photography are tracked in the [Platform media inventory](docs/platform-assets-2026-11-05.json). These routes use a compact masthead and the existing local Favorit heading font alongside Inter.

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

The invented supplier answer, review queue and Gateway sample analytics have been removed. Application previews use **real, pre-cropped Century frames**; simple conceptual illustrations explain workflow and infrastructure relationships without presenting a fabricated product interface or usage figures. The selected visible fragments contain English interface text, technical identifiers or numbers; Russian messages and document contents are excluded. These six static interface screenshots are preserved unchanged in `public/media/app/` and are outside the photography inventories; they do not connect to a live account. Careers presents areas for a conversation without inventing open vacancies. Press provides company information and a local brand download without inventing coverage, investors or awards. The blog contains original practical Century guides.

All contact actions lead to [Vitali Bakhmat on Telegram](https://t.me/vitalibakhmat). The other external profile destinations are [Vadim Vladymtsev’s website](https://vadimohka.com/) and [Egor Krychev’s LinkedIn](https://www.linkedin.com/in/ekrychev/). The site has no contact form or embedded chat. The application adds no analytics, cookies or persistent browser storage.

Images, the background film, both wordmarks and real application captures are served locally. Inter is bundled by `next/font` during the build and served with the site. The homepage uses a 24-second silent montage of eight real stock clips from Pexels and Mixkit, with separate 1280 × 720 desktop and 540 × 960 mobile files. Only one file is selected per page load and plays automatically in a muted inline loop. A responsive poster remains visible without JavaScript; the film is not mounted when reduced motion or the browser's save-data preference is enabled. Stock footage illustrates enterprise work; the depicted people and locations are not presented as Century staff, offices or customers. Other pages retain their existing illustrative photography. The three founder photographs retain their original files, dimensions and paths; generated founder alternatives are excluded from the release. Main content is server rendered; native navigation and disclosures work without JavaScript, and interactive selectors provide static fallback content.

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

The workflow is [`.github/workflows/nextjs.yml`](.github/workflows/nextjs.yml), named **Deploy Century to GitHub Pages**. It runs on pushes to `main`, or manually with `main` selected. Pushes changing only `docs/`, `tests/`, `README.md`, `LICENSE`, `.idea/`, `playwright.config.ts` or `scripts/verify-export.mjs` do not start a deployment. Its only job checks out the repository, installs dependencies, builds the static site, uploads `out/` and deploys the Pages artifact.

**CI contains no test jobs or validation steps.** It does not run Playwright, `typecheck` or `check:export`, and it does not run a pull-request verification workflow. The workflow sets `DEPLOY_ONLY=true`, which also skips Next.js's built-in TypeScript validation and linting. The postbuild script only packages `CNAME` and `.nojekyll`. Compilation and static export remain necessary to produce the deployment artifact; compilation or rendering failures still stop deployment. Ordinary local builds keep Next.js validation unless the same flag is explicitly set.

Dependency installation uses `npm ci --no-audit --no-fund`, reuses the npm download cache, and does not install browser binaries. Next.js telemetry is disabled, and the job is limited to 10 minutes. A single `pages` concurrency group serializes deployments without interrupting a publication already in progress. The workflow does not publish a separate `gh-pages` branch or commit generated output.

A successful Actions deployment and the live Pages URL establish publication status; the presence of source files or these instructions does not establish that a release has deployed.

## Optional local inspection

These commands are available for deliberate local use and are not part of CI:

```bash
npm run typecheck
npm run check:export
```

`check:export` requires a completed `out/` build. It checks all 26 content pages, unique titles and descriptions, canonicals and Open Graph URLs, sitemap coverage, local links and anchors, referenced assets, contact destinations, real application captures and the social-image dimensions. It also checks that the oversized footer wordmark is absent and the new internal-page scope excludes the homepage. It accepts an alternative export directory with `npm run check:export -- /absolute/path/to/export`.

The optional `test:e2e` command and `tests/landing.spec.ts` cover route metadata, contacts and local resources, navigation without JavaScript, keyboard interactions, product tabs, real capture loading/full-size links and responsive layouts. The suite is not called by deployment; running it locally requires a completed export, Python 3 and Playwright's Chromium browser.

The photography branch passed `npm run typecheck`, `npm run build` and `npm run check:export` before the founder alternatives were excluded: 26 content routes and 2,364 local links/assets, including the application screenshot checks. The [photography verification notes](docs/generated-photography-2026-11-04.md#verification) distinguish that historical checkpoint from the release selection that preserves the original portraits. A successful static check does not establish live deployment or browser-test results.

The [historical migration log](docs/design-migration-2026-11-04.md) records the initial design's local checks, browser-installation limitation and successful production deployment in [Actions run 41842820065](https://github.com/STACKLEVEL-AI/century-ai-next/actions/runs/41842820065) for commit `1163e7c`. The [application screenshot log](docs/application-screenshots-2026-11-04.md) preserves the capture update's provenance and validation record. Those checkpoints describe their respective earlier revisions.

## Useful source files

| File | Purpose |
| --- | --- |
| `src/lib/site.ts` | Century name, domain and verified contact/profile links. |
| `src/lib/navigation.ts` | Platform, industry and company navigation. |
| `src/lib/routes.ts` | Public route registry used by the sitemap. |
| `src/lib/industries.ts` | Seven industry pages and related-sector links. |
| `src/lib/articles.ts` | Four original guides and article metadata. |
| `src/components/site/` | Shared inner-page shell, heroes, sections and related links. |
| `src/components/platform/` | Six reference-based Platform compositions, their scoped styles and accessible interactive sections. |
| `src/components/products/` | Infrastructure and deployment selectors. |
| `src/components/AppScreenshot.tsx`, `src/lib/app-captures.ts` | Accessible real-image figures and their English metadata. |
| `src/components/industries/` | Industry icons and retained historical artwork code. |
| `src/components/HeroFilm.tsx` | Local background film, responsive source selection and reduced-motion/save-data handling. |
| `src/app/globals.css`, `site.css`, `products.css`, `industries.css`, `company.css`, `design.css` | Shared styles, page-family layouts and the current neutral design system. |
| `src/app/inner.css`, `products-refined.css`, `industries-refined.css`, `company-refined.css` | Refined internal-page compositions, all scoped to `.inner-page`. |
| `public/brand/` | Supplied Century wordmarks and derived compact symbol. |
| `public/media/`, `public/images/` | Local photography, responsive stock-video posters and desktop/mobile background films. |
| `public/media/stock/` | Real frame extracts from the licensed clips used for homepage cards and the team background. |
| `src/app/home.css`, `src/components/Home*.tsx`, `src/components/Scenarios*` | Homepage structure, responsive carousel, industry tabs and company closer. |
| `docs/stock-video-manifest.json`, `docs/stock-video-2026-11-05.md` | Stock licences, source provenance, edit recipe, hashes and verification. |
| `public/founders/` | Three original founder photographs, preserved byte-for-byte from `main` at `cad5ff1`. |
| `public/media/app/` | Six real English application captures, preserved unchanged by the photography refresh. |
| `public/media/platform/`, `docs/platform-assets-2026-11-05.json` | Locally optimized reference photography/backgrounds for the six Platform pages, with provenance and hashes. |
| `docs/generated-photography-prompts.json` | Exact prompts for the ten selected generated assets, original portrait hashes, and separately recorded excluded founder generations. |
| `docs/application-screenshots-2026-11-04.md`, `docs/app-capture-provenance.json` | Source recordings, frame times, crops and hashes for the real application captures. |

Regenerate the committed 1200 × 630 social preview image with `npm run assets:og`; it combines the current hero poster with the supplied wordmark and existing text using Sharp. The optional `npm run assets:film` command uses FFmpeg/ffprobe to reproduce the licensed stock montage, both responsive versions, posters and scene frames from `docs/stock-video-manifest.json`. It downloads missing source clips into a local cache and verifies their SHA-256 hashes; no download or transcoding is part of the website build. Regenerated assets are staged and checked before replacing the current files. Rebuild the export after changing assets.

The [photography gallery](docs/previews/generated-photography-2026-11-04.jpg) is a historical branch-review comparison. Its generated founder alternatives were excluded and are not deployed as website portraits; the [preserved portrait inventory](docs/generated-photography-2026-11-04.md#preserved-founder-portraits) records the original files and Git blob hashes.

The [adaptation notes](docs/wonderful-adaptation.md) describe the implemented scope and behaviour. The [photography notes](docs/generated-photography-2026-11-04.md) describe the generated media, and the [application screenshot log](docs/application-screenshots-2026-11-04.md) describes the real captures. The [design migration log](docs/design-migration-2026-11-04.md) and [original single-page plan](docs/superpowers/plans/2026-10-26-century-ai-eu-upgrade.md) remain unchanged as historical context.

