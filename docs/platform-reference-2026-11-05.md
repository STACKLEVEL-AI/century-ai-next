# Platform page migration — 2026-11-05

## Scope

The six pages in Wonderful's Platform menu were inspected and their individual compositions transferred to the same routes on Century's existing Next.js website. This is an update to the existing GitHub Pages deployment, not a separate site. Work began at `ba158e3df7b942c91310c3f2c3a27dbd44c07554` and was integrated onto `db042bc8310745ca1a3e021595736e3c0d51a56f`, preserving the newer homepage, stock film and shared navigation.

| Reference | Century route | Composition |
| --- | --- | --- |
| [AI OS](https://www.wonderful.ai/ai-os) | `/ai-os/` | Motion background and architecture hero, seven infrastructure layers, related products, shared-layer benefits, enterprise disclosures and photographic closing section. |
| [Agents](https://www.wonderful.ai/agents) | `/agents/` | Photographic hero, three workflow areas, capabilities explorer, use-case cards, eight operating principles and related products. |
| [Systems](https://www.wonderful.ai/systems) | `/systems/` | Abstract photographic hero, software-fit principles, business benefits, four system types, deployment story and related products. |
| [AI Gateway](https://www.wonderful.ai/ai-gateway) | `/ai-gateway/` | Blue/amber hero, application stage, connection overview, six feature rows, four outcomes and related products. |
| [Deployment](https://www.wonderful.ai/deployment) | `/deployment/` | Workshop hero, engineering and strategy cards, three ownership phases, four environment options and photographic closing section. |
| [AI transformation](https://www.wonderful.ai/ai-transformation) | `/ai-transformation/` | Motion hero, editorial introduction, five numbered principles, related photo cards and photographic closing section. |

## Century adaptation

The visual hierarchy, section order, photographic backgrounds, spacing and responsive compositions follow the reference pages. Copy is adapted for Century. Century's supplied wordmarks, real application captures and existing contact destination are retained. Wonderful's product interface, customer claims, business statistics, certification badges and team counts are not presented as Century facts.

`PlatformFrame` uses the current shared Header without its announcement strip, the existing local Favorit heading font, footer treatment and optional closing photo section on these six routes. Its CSS is scoped to the Platform wrapper and does not override the new Header module. The footer navigation label now says **AI transformation**; the existing header's Strategy item continues to reach that same route. The homepage, industry and company compositions remain in their existing page families.

Application figures continue to use the six files in `public/media/app/` through `AppScreenshot`. Their pixels and provenance are unchanged. Conceptual artwork illustrates relationships rather than inventing application screens or account activity. All images are served locally; no reference-site runtime, tracking scripts or remote image dependencies are imported.

The [media inventory](platform-assets-2026-11-05.json) records reference URLs, source hashes and optimized output paths, dimensions and hashes for all **37 WebP files (4,701,080 bytes)**. The existing font asset is reused. Original image downloads are not shipped alongside their optimized derivatives.

## Interaction and accessibility

Navigation uses the existing native disclosure menus. Infrastructure, application and deployment selectors use named tabs with synchronized selection and keyboard focus. Static fallback content keeps their information available without JavaScript. Content disclosures support ordinary keyboard operation. Images include dimensions, decorative images have empty alternative text, and product figures link to the original local capture. The styles include mobile layouts, visible focus and reduced-motion handling.

## Deployment

The sole GitHub Actions workflow remains the existing deploy-only workflow. This migration adds no test jobs, validation gates, browser installation or pull-request workflow. The workflow builds the static export and deploys GitHub Pages from `main`.

## Verification

The integrated source based on `db042bc8310745ca1a3e021595736e3c0d51a56f` passed:

- `npm run typecheck` locally.
- `DEPLOY_ONLY=true NEXT_TELEMETRY_DISABLED=1 npm run build`: successful production compilation and all 32 generated static outputs, including the 26 content routes.
- `npm run check:export`: 26 routes, unique metadata, 2,608 local links/assets, sitemap coverage, contact destinations and real application screenshot contracts.
- `git diff --check` and verification of the dimensions and SHA-256 of all 37 new WebP files.
- Source comparison against the integration base: the deployment workflow, Next config, postbuild packaging, dependencies, shared Header, homepage, real application images and founder portraits are unchanged by this migration.

The optional local Playwright assertions were updated for the new tab labels, active screenshots and contact placement. They remain outside CI and were not run. A browser rendering pass was unavailable because the connected browser did not respond; static inspection must not be represented as desktop/mobile browser verification.

The managed local environment initially failed Next's optional RSS tracing with `ENOENT: uv_resident_set_memory`. A guard in the ignored local `node_modules/next/dist/lib/memory/trace.js` skipped only that unavailable diagnostic call so the production export could be checked. This environment workaround is not part of the repository or deployment; GitHub Actions uses a clean dependency installation.
