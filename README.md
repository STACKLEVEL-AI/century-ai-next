# Century — enterprise AI website

The English Century website for [century-ai.eu](https://century-ai.eu/), built with Next.js App Router and exported as static files for GitHub Pages.

The repository contains a **26-route adaptation of the main [Wonderful](https://www.wonderful.ai/) site**, covering the homepage, platform and delivery pages, seven industries, company pages and an original four-article blog. Century retains its own identity: **purple `#210DFF`, the open C mark, Manrope typography, founders and contact destinations**. Page structure and editorial composition follow the reference; the writing, illustrations and examples are adapted for Century.

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

Each industry page includes concrete workflow examples, the information they use, the person who reviews the result, an illustrative four-step process and implementation controls. Product pages include a layered infrastructure explorer, native disclosures, a deployment phase selector and a local AI Gateway demonstration with period selection, usage views and CSV export.

The Gateway numbers, review queues, source excerpts and workflow visuals are **labelled examples**. They are not live accounts, prices, customer results or claims about a completed deployment. Careers presents areas for a conversation without inventing open vacancies. Press provides company information and a local brand download without inventing coverage, investors or awards. The blog contains original practical Century guides.

All contact actions lead to [Vitali Bakhmat on Telegram](https://t.me/vitalibakhmat). The other external profile destinations are [Vadim Vladymtsev’s website](https://vadimohka.com/) and [Egor Krychev’s LinkedIn](https://www.linkedin.com/in/ekrychev/). The site has no contact form or embedded chat. The application adds no analytics, cookies or persistent browser storage.

Images, the wordmark and interface illustrations are local. Manrope is bundled by `next/font` during the build and served with the site. The architectural image is a generated fictional scene. It does not represent Century’s premises. Main content is server rendered; native navigation and disclosures work without JavaScript, and interactive examples provide static fallback content.

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

`check:export` requires a completed `out/` build. It checks all 26 content pages, unique titles and descriptions, canonicals and Open Graph URLs, sitemap coverage, local links and anchors, referenced assets, contact destinations, sample labelling and the social-image dimensions. It accepts an alternative export directory with `npm run check:export -- /absolute/path/to/export`.

The optional `test:e2e` command and `tests/landing.spec.ts` contain eight focused cases for the current multipage site: route metadata, contacts and local resources, navigation without JavaScript, keyboard interactions, product tabs, Gateway CSV export and responsive layouts. The suite was updated and passed TypeScript checking, but was not executed in the implementation workspace. It is not called by deployment; running it locally requires a completed export, Python 3 and Playwright’s Chromium browser.

The initial implementation environment could not complete a production build because of a host RSS-reporting error (`uv_resident_set_memory`), and its hosted preview daemon was unavailable. This is recorded as an environment limitation, not as a successful export or browser review. See [adaptation notes](docs/wonderful-adaptation.md) for scope and provenance.

## Useful source files

| File | Purpose |
| --- | --- |
| `src/lib/site.ts` | Century name, domain and verified contact/profile links. |
| `src/lib/navigation.ts` | Platform, industry and company navigation. |
| `src/lib/routes.ts` | Public route registry used by the sitemap. |
| `src/lib/industries.ts` | Seven industry pages and related-sector links. |
| `src/lib/articles.ts` | Four original guides and article metadata. |
| `src/components/site/` | Shared inner-page shell, heroes, sections and related links. |
| `src/components/products/` | Product illustrations and interactive examples. |
| `src/components/industries/` | Native SVG industry illustrations. |
| `src/app/globals.css`, `site.css`, `products.css`, `industries.css`, `company.css` | Century styling and responsive layouts. |

Regenerate the committed 1200 × 630 social preview image with `npm run assets:og`, then rebuild the export. The generator uses Sharp and local assets; it does not require a browser.

The [adaptation notes](docs/wonderful-adaptation.md) describe the implemented scope. The [original single-page plan](docs/superpowers/plans/2026-10-26-century-ai-eu-upgrade.md) remains unchanged as historical context.
