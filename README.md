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

The publishable website is written to `out/`. The postbuild script adds `CNAME`, `.nojekyll` and compatibility redirects from `/ai-os/` to `/platform/` and `/de/ai-os/` to `/de/platform/`. Serve this directory with a static web server.

## Deployment

The [GitHub Pages workflow](.github/workflows/nextjs.yml) deploys `main` after application changes or a manual run. It installs dependencies, builds the static website and publishes `out/`. The separate validation workflow checks both languages and browser behavior before release. Changes limited to documentation do not start a deployment.

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

Together with the homepage, these form 26 content routes per language. English keeps the original URLs; the complete German version is available under `/de/`, for 52 content routes in total. The route registry is [src/lib/routes.ts](src/lib/routes.ts). The export also includes a bilingual global 404 page, sitemap and robots file.

## Languages

The EN/DE menu links to the same page in the other language and retains its query and fragment during normal browser navigation. Language is selected by the URL; no cookies or browser storage are used. Both versions are rendered to static HTML, including the correct document language, canonical URL, reciprocal language alternates, metadata and social preview. Shared product screenshots remain authentic; their captions and alternative text are localized.

Maintain the structure and English content in `src/app/(en)/`, `src/components/` and `src/lib/`. German messages live in `src/locales/de/`, grouped into site, article, industry and platform catalogs. `contexts.json` holds the few translations that depend on a particular component. Translate complete display messages where possible, and preserve technical IDs, slugs and product names.

`npm run dev`, `npm run build` and `npm run typecheck` generate the German route and component tree automatically. The generator uses the TypeScript AST to distinguish text from identifiers, shares the existing CSS, rewrites content links and creates localized SVG diagrams and a German Open Graph image. Generated paths are ignored by Git; edit the maintained sources and catalogs instead. Missing display translations stop generation.

```bash
npm run locales:check   # validate catalog coverage without generating files
npm run typecheck
npm run build
npm run check:export   # inspect all 52 pages, metadata, links and assets
npm run test:e2e       # browser behavior, including both languages
```

The two language route groups have independent root layouts so `lang` is correct before JavaScript runs. GitHub Pages serves one global `404.html`; it contains German and English recovery links. The Next.js `globalNotFound` option supports this multiple-root setup.

Contact and profile destinations are defined in [src/lib/site.ts](src/lib/site.ts). Navigation, industry content and article content live in `src/lib/`.

## Project structure

| Directory | Contents |
| --- | --- |
| `src/app/(en)/` | Maintained page structure and English content |
| `src/app/` | Global error page, metadata routes and shared styles |
| `src/components/` | Navigation, page sections and interactive elements |
| `src/lib/` | Content, site settings and media metadata |
| `src/locales/de/` | Reviewed German translations and contextual exceptions |
| `public/` | Local images, video, brand assets and fonts |
| `scripts/` | Export packaging and optional asset maintenance |

## Documentation

- [Content style](docs/content-style.md)
- [Media maintenance](docs/media.md)
- [Stock-video credits and licenses](docs/stock-video-licenses.md)
