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

The publishable website is written to `out/`. The postbuild script adds `CNAME`, `.nojekyll` and compatibility redirects from `/ai-os/` to `/platform/`, `/de/ai-os/` to `/de/platform/`, and `/pl/ai-os/` to `/pl/platform/`. Each redirect preserves query parameters and fragments. Serve this directory with a static web server.

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

Together with the homepage, these form 26 content routes per language. English keeps the original URLs; German mirrors them under `/de/` and Polish under `/pl/`, for **78 content pages** in total. The route registry is [src/lib/routes.ts](src/lib/routes.ts). The export also includes a global 404 page with English, German and Polish recovery links, a sitemap and a robots file.

## Languages

The EN / DE / PL menu links to the same page in each language. Native links work without JavaScript; browser navigation with JavaScript also retains the current query and fragment. Language is selected by the URL, with no preference stored in cookies or browser storage. All three versions are rendered to static HTML, including the correct document language, canonical URL, reciprocal `en`, `de`, `pl` and `x-default` alternates, metadata and social preview. Shared product screenshots remain authentic; their captions and alternative text are localized.

Maintain page structure and English content in `src/app/(en)/`, `src/components/` and `src/lib/`. German messages live in `src/locales/de/`; Polish messages live in `translations/pl/`. These are separate maintained catalogs over the same English sources. German catalogs group site, article, industry and platform text, with file-specific exceptions in `contexts.json`. Polish catalogs group page, component, content and SVG messages, with field-specific grammar overrides and an explicit keep list. Preserve technical IDs, slugs and official product names.

`npm run localize` generates German and Polish routes, components and assets in sequence. `npm run locales:generate` is an alias for the same task. Development, builds and type checks run generation automatically. Both generators use the TypeScript AST to distinguish display text from identifiers, share the existing CSS and map content links to their language. Generated modules, translated SVG diagrams and localized social images are ignored by Git. Edit the maintained sources and catalogs instead; missing display translations stop generation.

Run the following checks locally:

```bash
npm run locales:check   # validate both catalogs without generating files
npm run typecheck
npm run build
npm run check:export   # inspect all 78 pages, metadata, links and assets
npm run test:e2e       # full English, German and Polish browser suite
```

The three language route groups have independent root layouts so `lang` is correct before JavaScript runs. GitHub Pages serves one global `404.html`; it contains recovery messages and homepage links for all three languages. The Next.js `globalNotFound` option supports this multiple-root setup. See [Localization](docs/localization.md) for catalog formats, generated paths and local checks.

Contact and profile destinations are defined in [src/lib/site.ts](src/lib/site.ts). Navigation, industry content and article content live in `src/lib/`.

## Project structure

| Directory | Contents |
| --- | --- |
| `src/app/(en)/` | Maintained page structure and English content |
| `src/app/` | Language root layouts, global error page, metadata routes and shared styles |
| `src/components/` | Navigation, page sections and interactive elements |
| `src/lib/` | Content, site settings and media metadata |
| `src/locales/de/` | Reviewed German translations and contextual exceptions |
| `translations/pl/` | Reviewed Polish content, interface and SVG translations |
| `public/` | Local images, video, brand assets and fonts |
| `scripts/` | Localization generation, export packaging and asset maintenance |

## Documentation

- [Localization](docs/localization.md)
- [Content style](docs/content-style.md)
- [Media maintenance](docs/media.md)
- [Stock-video credits and licenses](docs/stock-video-licenses.md)
