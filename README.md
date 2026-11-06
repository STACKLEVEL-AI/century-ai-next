# Century — enterprise AI website

Website for [century-ai.eu](https://century-ai.eu/), built with Next.js App Router and published as a static export on GitHub Pages.

## Local development

Use Node.js 20.

```bash
npm ci
npm run dev
```

## Build

```bash
npm run build
```

The publishable website is written to `out/`. The postbuild script adds `CNAME`, `.nojekyll` and compatibility redirects from `/ai-os/` to `/platform/`, including the corresponding `/de/` and `/uk/` routes. Redirects preserve query strings and anchors when JavaScript is enabled. Serve this directory with a static web server.

## Deployment

The [GitHub Pages workflow](.github/workflows/nextjs.yml) deploys `main` after application changes or a manual run. GitHub CI only installs dependencies, builds the static website and publishes `out/`. Do not add tests, Playwright, lint, type checking, export checks or validation jobs to GitHub CI; these are local-only commands. The deployment build uses `DEPLOY_ONLY=true` to skip Next.js lint and type checks. Changes limited to documentation do not start a deployment.

In the repository's Pages settings, select **GitHub Actions** and keep the custom domain `century-ai.eu`.

## Pages and content

| Area | Routes |
| --- | --- |
| Platform | `/platform/`, `/agents/`, `/systems/`, `/ai-gateway/` |
| Delivery | `/deployment/`, `/ai-transformation/`, `/security/` |
| Industries | `/industries/` and seven sector pages |
| Company | `/about-us/`, `/careers/`, `/press/`, `/contact/` |
| Guides | `/blog/` and four articles |
| Website information | `/privacy/` |

Together with the homepage, these form 26 content routes per language. English keeps the original URLs; German is available under `/de/` and Ukrainian under `/uk/`, for 78 content routes in total. The route registry is [src/lib/routes.ts](src/lib/routes.ts). The export also includes a global 404 page with recovery links in all three languages, a sitemap and a robots file.

## Languages

The EN/DE/UK menu links to the same page in another language and retains its query and fragment during normal browser navigation. Language is selected by the URL; no cookies or browser storage are used. All versions are rendered to static HTML, including the correct document language, canonical URL, reciprocal `en`, `de`, `uk` and `x-default` alternates, metadata and social preview. Shared product screenshots remain authentic; their captions and alternative text are localized.

Maintain the structure and English content in `src/app/(en)/`, `src/components/` and `src/lib/`. German messages live in `src/locales/de/`, grouped into site, article, industry and platform catalogs. `contexts.json` holds the few German translations that depend on a particular component. Reviewed Ukrainian messages live in `src/i18n/uk/`, grouped into shared, company, industry, platform and diagram catalogs. Translate complete display messages where possible, and preserve technical IDs, slugs and product names.

`npm run dev`, `npm run build` and `npm run typecheck` generate the German and Ukrainian route and component trees automatically. Both generators use the TypeScript AST to distinguish text from identifiers, share the existing CSS, rewrite content links and create localized SVG diagrams and social previews. Generated paths are ignored by Git; edit the maintained sources and catalogs instead. Missing display translations stop generation. The Ukrainian generator also rejects stale entries and changed template placeholders.

The shared `src/lib/i18n.ts` owns language paths, alternate URLs, social metadata and guide-count grammar. `Document` and `LanguageSwitcher` are shared by all generated trees. Ukrainian layouts use Cyrillic font subsets. After editing content while the development server is already running, run `npm run locales:generate` to refresh both translated trees. `npm run i18n:extract` writes the Ukrainian source-message inventory to `localization-audit/`.

```bash
npm run locales:check   # validate catalog coverage without generating files
npm run typecheck
npm run build
npm run check:export   # inspect all 78 pages, metadata, links and assets
npx playwright install chromium
npm run test:e2e       # browser behavior in English, German and Ukrainian
```

The three language route groups have independent root layouts so `lang` is correct before JavaScript runs. GitHub Pages serves one global `404.html`; it contains English, German and Ukrainian recovery links. The Next.js `globalNotFound` option supports this multiple-root setup. The deployment page renders all four delivery stages in static HTML and uses a native disclosure for installation requirements, so its content is available without JavaScript.

Contact and profile destinations are defined in [src/lib/site.ts](src/lib/site.ts). Navigation, industry content and article content live in `src/lib/`.

## Project structure

| Directory | Contents |
| --- | --- |
| `src/app/(en)/` | Maintained page structure and English content |
| `src/app/` | Global error page, metadata routes and shared styles |
| `src/components/` | Navigation, page sections and interactive elements |
| `src/lib/` | Content, site settings and media metadata |
| `src/locales/de/` | Reviewed German translations and contextual exceptions |
| `src/i18n/uk/` | Reviewed Ukrainian text and diagram translations |
| `public/` | Local images, video, brand assets and fonts |
| `scripts/` | Localization generation, export validation and asset maintenance |

## Documentation

- [Content style](docs/content-style.md)
- [Media maintenance](docs/media.md)
- [Stock-video credits and licenses](docs/stock-video-licenses.md)
