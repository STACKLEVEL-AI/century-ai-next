# Century — Wonderful design migration

## Goal and fixed requirements

Move the existing Century website towards the current visual language and product narrative of https://www.wonderful.ai/, preserving Century, its three founders, their photographs, roles and verified contact destinations. Use the two Century SVG wordmarks supplied for this task. Complete the work in small stages, validate it, merge to `main`, and verify the existing GitHub Pages deployment.

Baseline: `952d1562140eb9b5a93a7cd425c9cd2822b88d99` on `main`. Working branch: `design/wonderful-century-2026-11-04`.

## Reference audit — 4 November 2026

The current reference presents an enterprise AI operating layer, agents, systems, AI gateway, deployment and strategy. Its visual system uses full-bleed moving imagery, white and near-black sections, large light headings, restrained borders, round buttons and photographic editorial cards. The old Century purple and lavender treatment does not match this direction.

Observed reference typography: ABC Favorit Light for headings; Inter for body and buttons. Use Inter locally for the new Century system rather than introducing an unlicensed commercial font dependency. Keep text, layouts and code maintainable in the existing Next.js project.

Preserve the existing 26-route structure and functioning product examples. Adapt reference ideas into original Century copy. Wonderful's customer relationships, funding, certifications and performance figures do not establish equivalent facts about Century and are not transferred. Reference media used as design assets must be served locally and documented below.

## Small stages

- [x] Audit source, route inventory, reference design and existing deployment.
- [x] Create this progress file and isolated working branch.
- [x] Apply supplied wordmarks and shared typography, colours, navigation and footer.
- [x] Recompose the homepage: cinematic hero, use cases, platform, deployment, strategy, industries and founders.
- [x] Carry the design through product, industry and company pages.
- [x] Refresh metadata, social preview, press resources and project documentation.
- [ ] Build and inspect the static export; check desktop/mobile and key interactions.
- [ ] Review the diff, publish the branch, merge to `main`, verify deployment and present the result.

## Validation record

- `npm run typecheck`: passed.
- Local preview build: all routes generated. The workspace lacks `/proc` RSS metrics, so Next 15.5.28's optional `traceMemoryUsage` diagnostic throws before compilation. Only the ignored local dependency tracer was temporarily changed to skip that exact `ENOENT` diagnostic. No global process API, application source, package lock or deployment workflow is patched. This is a preview-only build; the unmodified production build must still pass on GitHub Actions.
- `npm run check:export`: passed for all 26 content routes, unique metadata, 2,302 local links/assets, sitemap, contact destinations and sample labels.
- Local Playwright suite could not reach assertions because Chromium is absent. Its standard browser download returned a truncated archive. The Cloud Browser is separate from the localhost preview server. Live-browser validation follows the authorised production deployment; no browser test success is claimed at this checkpoint.

## Asset provenance

- Century black and white wordmarks: SVG files attached by the user in this task.
- Founder portraits and profile URLs: preserved from the baseline repository.
- Reference film: https://cdn.wonderful.ai/videos/HP%20-%20Video_Final_16x9.mp4. `public/media/enterprise-film.mp4` is a locally re-encoded 13-second selection (0–5, 24–28, 40–44 seconds) at 1280 px / 24 fps, without audio. The selection avoids the visible customer-bank signage in the original. Hero poster and knowledge/workflow/support card stills are extracted from this film.
- Deployment photograph: https://framerusercontent.com/images/GE2ff9hpxjunCs3VZvJODYW4IoQ.jpg → `public/media/deployment.webp`.
- Strategy image: https://framerusercontent.com/images/aa4tkKpVkqnWNLuv9cZYR9CEP5o.png → `public/media/strategy.webp`.
- Platform background: https://framerusercontent.com/images/PbxeRt98ocw3ESBEOGvSkFl16OM.jpg → `public/media/platform.webp`.
- Industry image: https://framerusercontent.com/images/Z6ITE2va5GBIFUhQaiHnfePJmaY.jpg → `public/media/industry.webp`.
- Closing image: https://framerusercontent.com/images/z2gffofvCT8lr3s0y08hDCe9MZ4.jpg → `public/media/closing.webp`.
- These publicly delivered reference assets are used for the requested design migration. They are illustrative media, not photographs of Century's premises or evidence of Century customer relationships. All files are served locally; visitors do not request media from Wonderful.
- Inter is bundled by `next/font`; the reference's commercial ABC Favorit font is not redistributed.

## Checkpoints

1. Source and reference audited; dependencies installed; existing 26 routes and their interactions retained as the baseline.

2. Shared design and homepage implemented; internal product, industry and company styles neutralised. User-provided SVGs are used in the header, footer, press downloads and social preview. The brand monogram is derived from the supplied first glyph.

3. Internal page families, neutral illustrations, About/Contact media, both brand downloads, favicon and social metadata updated. Supplied SVG files verified byte-for-byte identical. CSS compatibility warnings corrected; final preview export rerun before publication.

4. Independent source review found and fixed the 760–900 px mobile menu breakpoint. The full mobile panel structure now applies at 900 px. The header is absolute before JavaScript upgrades it to fixed on scroll, preserving readable top navigation without JavaScript. No further material source-review blockers found.
