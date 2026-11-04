# Generated photography — 4 November 2026

All **13 distinct photographic assets** from source commit [`9662939475ec9579841816ee8afd937bc5062b3c`](https://github.com/STACKLEVEL-AI/century-ai-next/commit/9662939475ec9579841816ee8afd937bc5062b3c) have newly generated counterparts. Delivery comprises **17 WebP files**: 13 primary photographs and four smaller responsive derivatives. The social preview and background film are rebuilt from the new photographs. Existing asset paths are retained.

The built-in `image_gen` tool used each original as a reference for its subject idea, composition, light, palette, texture and photographic style. Enterprise locations and scene participants are fictional. The three named founder portraits use their original photographs as identity references, retaining their expressions, clothing, poses and monochrome treatment; names, roles and contact destinations remain the same. The imagery does not document actual Century premises or customer relationships.

See the [before-and-after gallery](previews/generated-photography-2026-11-04.jpg) and [exact prompt manifest](generated-photography-prompts.json). The manifest pins every reference to the source commit and records the repository output paths and dimensions. Its prompt strings are the full requests used for generation; a new generation run can produce different images.

## Image inventory

Dimensions below describe the committed web assets. The 640- and 960-pixel variants are resized derivatives of their corresponding generated master.

| Primary asset | Output dimensions | Preserved visual idea |
| --- | --- | --- |
| `public/media/hero-poster.webp` | 1800 × 1013; `-960`: 960 × 540; `-640`: 640 × 360 | Wide aerial business campus, warm buildings, green trees and a pale blue sky. |
| `public/media/knowledge.webp` | 1200 × 675 | Warm operations room seen through glass, focused workers and softly glowing screens. |
| `public/media/workflows.webp` | 1200 × 675 | Oblique aerial logistics centre, loading docks, trailers and muted teal shadows. |
| `public/media/support.webp` | 1200 × 675 | Candid airport crowd, soft foreground and an indistinct amber departure display. |
| `public/media/deployment.webp` | 1200 × 670 | Central workshop leader in a blue shirt, with warm light and blurred movement around her. |
| `public/media/industry.webp` | 1200 × 670 | Overhead business concourse, sharp central person with a briefcase and blurred passersby. |
| `public/media/platform.webp` | 1800 × 1009 | Dark, grainy long-exposure texture with quiet space for white interface content. |
| `public/media/strategy.webp` | 1054 × 1451 | Vertical blue motion-blurred photographic texture, amber accent and dark lower area. |
| `public/media/closing.webp` | 1200 × 495 | Wide defocused green, amber and muted red texture with a near-black lower half. |
| `public/images/enterprise-atrium.webp` | 1672 × 941; `-960`: 960 × 540; `-640`: 640 × 360 | Curved pale-stone office courtyard, glass, planting and golden-hour light. |
| `public/founders/vitali-bakhmat.webp` | 960 × 1200 | Same founder, smile, glasses, dark crewneck and light studio background. |
| `public/founders/vadim-vladymtsev.webp` | 960 × 639 | Same founder, broad smile, hoodie and neutral studio background. |
| `public/founders/egor-krychev.webp` | 960 × 960 | Same founder, glasses, suit and softly blurred office background. |

The atrium remains unused by current pages, but all three atrium files are refreshed to cover the entire photographic inventory. Layout crops and overlays remain in the existing components and CSS. The central subjects in deployment and industry, and the central activity in the use-case images, are composed for the site's narrower cover crops.

## Derived media

- **Social preview:** `public/og/century-ai-eu.png`, 1200 × 630. `scripts/create-og.mjs` combines the generated hero with the supplied white wordmark and existing text. Regenerate it with `npm run assets:og`.
- **Background film:** `public/media/enterprise-film.mp4`, 13 seconds, 1280 × 720, 24 fps, silent. `scripts/create-enterprise-film.mjs` animates the generated hero, workflows, knowledge and support stills with slow zooms and crossfades. Regenerate it with `npm run assets:film`. This is an animation of generated still photographs; no full-motion video was generated.

The film's first scene uses the generated hero, so playback continues the new imagery after the poster loads. Existing pause/play, inline muted looping, reduced-motion and save-data handling remain in `HeroFilm`. Without JavaScript, the responsive generated poster remains visible.

## Provenance retained

The [earlier migration log](design-migration-2026-11-04.md#asset-provenance) preserves original reference URLs and the former film selection. That log and `docs/previews/century-home-live-2026-11-04.jpg` / `century-ai-os-live-2026-11-04.jpg` remain historical records; the screenshots are not website photo assets. This photography refresh retains the supplied wordmarks, compact symbol, favicon, editorial article artwork and feature icons.

The branch also incorporates the concurrent [application-capture update, PR #48](https://github.com/STACKLEVEL-AI/century-ai-next/pull/48), merged into `main` as `2663feebe46495f632145464b6074f3b037e832b`. Its six real application screenshots in `public/media/app/`, provenance records, components and updated export checks are preserved. These interface captures are not photographs and are not regenerated. The photographic references remain pinned to `9662939`, since the capture update did not change them.

## Verification

After changing the photographic masters or derived assets, regenerate the social image and film, then inspect the export:

```bash
npm run assets:og
npm run assets:film
npm run typecheck
npm run build
npm run check:export
```

Check the homepage at desktop and mobile widths, including the hero poster-to-film transition, all three use-case cards, industry selections and founder portraits. Check About and Contact for their reused images and cover crops. Verify that reduced-motion/save-data visitors and visitors without JavaScript retain the generated poster, and that pause/play still works. Browser interaction and deployment checks are separate from static-export inspection.


### Completed local checks for this refresh

- All 13 generated masters were visually compared with their references for composition, palette, photographic texture and subject continuity. Founder portraits were reviewed for resemblance; the expected cover crops were assessed against the existing CSS.
- All 17 WebP outputs decode successfully, match the inventory dimensions and have different SHA-256 hashes from the source assets. WebP quality is 86 for scene/background assets and 90 for portraits. The portraits have three times the original pixel width, retaining the original aspect ratios.
- The regenerated social image is 1200 × 630. FFprobe confirmed the background film is H.264, 1280 × 720, 24 fps, 312 frames and exactly 13 seconds, without audio. Sampled frames were visually inspected.
- `npm run typecheck`, `npm run build` and `npm run check:export` passed after the final assets were installed and the concurrent application-capture update was incorporated. The export inspector checked all 26 content routes and 2,364 local links/assets, alongside metadata, sitemap, contact destinations and application screenshots. The six application-capture files were compared byte-for-byte with the updated `main`.
- This workspace cannot read the operating-system RSS counter. Next.js's optional memory tracer raised `ENOENT` / `uv_resident_set_memory`; an ignored local dependency change skips only that exact diagnostic failure. Compilation, type checks, application source, dependency lock and deployment workflow were not weakened or changed for this workaround. A clean production build remains a separate GitHub Actions check after merge.
- Playwright's Chromium installation returned a truncated archive, so no browser automation assertions or new live-site review are claimed. The gallery and crop review are image/CSS inspections, not browser screenshots.

The refresh is prepared on a separate branch. This record does not claim a production deployment; the existing workflow publishes only after a change reaches `main` and deployment succeeds.
