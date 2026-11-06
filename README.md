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

The publishable website is written to `out/`. The postbuild script adds `CNAME`, `.nojekyll` and compatibility redirects from `/ai-os/` to `/platform/` in English and under `/de/`, `/pl/`, `/uk/`, `/fr/`, `/be/` and `/it/`. Each redirect preserves query parameters and fragments. Serve this directory with a static web server.

## Deployment

The [GitHub Pages workflow](.github/workflows/nextjs.yml) publishes the commit at the tip of every push to `main`, regardless of which files changed, or runs manually. Several commits sent in one push produce one version from that push's final commit. Do not use CI-skip markers for commits intended for publication. Deployments share a queue (`queue: max`, up to 100 pending runs) and do not cancel an in-progress deployment or replace an earlier pending run. GitHub CI only installs dependencies, builds the static website and publishes `out/`. Do not add tests, Playwright, lint, type checking, export checks or validation jobs to GitHub CI; these are local-only commands. The deployment build uses `DEPLOY_ONLY=true` to skip Next.js lint and type checks.

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

Together with the homepage, these form 26 content routes per language. English keeps the original URLs; German, Polish, Ukrainian, French, Belarusian and Italian mirror them under `/de/`, `/pl/`, `/uk/`, `/fr/`, `/be/` and `/it/`, for **182 content pages** in total. The route registry is [src/lib/routes.ts](src/lib/routes.ts). The export also includes a global 404 page with English, German, Polish, Ukrainian, French, Belarusian and Italian recovery links, a sitemap and a robots file.

## Languages

The EN / DE / PL / UK / FR / BE / IT menu links to the equivalent page in each language. Native links work without JavaScript; with JavaScript, switching also retains the current query and fragment. The URL selects the language, with no preference stored in cookies or browser storage. Every version is rendered to static HTML, including its document language, canonical URL, reciprocal `en`, `de`, `pl`, `uk`, `fr`, `be`, `it` and `x-default` alternates, metadata and social preview. Product screenshots remain authentic; their captions and alternative text are localized.

Maintain structure and English content in `src/app/(en)/`, `src/components/` and `src/lib/`. All translations now use one compiler, `scripts/i18n/generate.mjs`, and the same catalog format in `src/locales/{de,pl,uk,fr,be,it}/`. Each language has `messages.json`, `assets.json` and `keep.json`. Keys identify the real source path and the complete English message; contextual field overrides handle grammar. Do not edit generated source or translate IDs, slugs, keyboard commands and official product names.

`src/locales/config.json` is the shared language registry for native labels, social previews, metadata locale codes, guide-count grammar, legacy redirects and error-page copy. `npm run localize` validates every catalog before generating routes, components and SVG diagrams for all six translations. Development, builds and type checks invoke it automatically. Missing translations, stale entries and mismatched template placeholders stop generation. `npm run locales:check` performs the same preflight without writing files.

Run checks locally:

```bash
npm run test:i18n       # compiler, URL, metadata and plural-rule regressions
npm run locales:check  # read-only validation of all catalogs
npm run typecheck
npm run build
npm run check:export   # inspect all 182 pages, metadata, links and assets
npm run test:e2e       # optional local browser suite for all seven languages
```

The seven route groups have independent root layouts so `lang` is correct before JavaScript runs. GitHub Pages serves one global `404.html` with recovery copy and homepage links for all seven languages. Inter includes Latin, Latin Extended and Cyrillic; Ukrainian and Belarusian headings use it consistently where the supplied Favorit font has no Cyrillic glyphs. The footer signature `WE LEAVE IN THE AI CENTURY` remains fixed English brand wording. See [Localization](docs/localization.md) for the catalog format and workflow.

Contact and profile destinations are defined in [src/lib/site.ts](src/lib/site.ts). Navigation, industry content and article content live in `src/lib/`.

## Project structure

| Directory | Contents |
| --- | --- |
| `src/app/(en)/` | Maintained page structure and English content |
| `src/app/` | Language root layouts, global error page, metadata routes and shared styles |
| `src/components/` | Navigation, page sections and interactive elements |
| `src/lib/` | Content, site settings and media metadata |
| `src/locales/config.json` | Shared locale registry |
| `src/locales/{de,pl,uk,fr,be,it}/` | Reviewed messages, diagrams and explicit preserved terms |
| `public/` | Local images, video, brand assets and fonts |
| `scripts/` | Localization generation, export packaging and asset maintenance |

## Documentation

- [Localization](docs/localization.md)
- [Content style](docs/content-style.md)
- [Media maintenance](docs/media.md)
- [Stock-video credits and licenses](docs/stock-video-licenses.md)
