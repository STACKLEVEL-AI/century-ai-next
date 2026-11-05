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

The publishable website is written to `out/`. The postbuild script adds `CNAME` and `.nojekyll`. Serve this directory with a static web server.

## Deployment

The [GitHub Pages workflow](.github/workflows/nextjs.yml) deploys `main` after application changes or a manual run. It installs dependencies, builds the static website and publishes `out/`. CI runs deployment only; it has no test jobs. Changes limited to documentation do not start a deployment.

In the repository's Pages settings, select **GitHub Actions** and keep the custom domain `century-ai.eu`.

## Pages and content

| Area | Routes |
| --- | --- |
| Platform | `/ai-os/`, `/agents/`, `/systems/`, `/ai-gateway/` |
| Delivery | `/deployment/`, `/ai-transformation/`, `/security/` |
| Industries | `/industries/` and seven sector pages |
| Company | `/about-us/`, `/careers/`, `/press/`, `/contact/` |
| Guides | `/blog/` and four articles |
| Website information | `/privacy/` |

Together with the homepage, these form 26 content routes. The route registry is [src/lib/routes.ts](src/lib/routes.ts). The export also includes a custom 404 page, sitemap and robots file.

Contact and profile destinations are defined in [src/lib/site.ts](src/lib/site.ts). Navigation, industry content and article content live in `src/lib/`.

## Project structure

| Directory | Contents |
| --- | --- |
| `src/app/` | Routes, metadata and shared styles |
| `src/components/` | Navigation, page sections and interactive elements |
| `src/lib/` | Content, site settings and media metadata |
| `public/` | Local images, video, brand assets and fonts |
| `scripts/` | Export packaging and optional asset maintenance |

## Documentation

- [Content style](docs/content-style.md)
- [Media maintenance](docs/media.md)
- [Stock-video credits and licenses](docs/stock-video-licenses.md)
