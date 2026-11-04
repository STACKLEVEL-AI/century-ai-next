# Generated photography — 4 November 2026

The selected refresh contains **10 generated photographic masters delivered as 14 WebP files**: ten scene/background photographs and four smaller responsive derivatives. Their references are pinned to source commit [`9662939475ec9579841816ee8afd937bc5062b3c`](https://github.com/STACKLEVEL-AI/century-ai-next/commit/9662939475ec9579841816ee8afd937bc5062b3c). The social preview and background film are rebuilt from the new photographs. The **three original founder portraits are preserved byte-for-byte** from `main` at [`cad5ff160878585c75ce78a075f06d7b14087a6a`](https://github.com/STACKLEVEL-AI/century-ai-next/commit/cad5ff160878585c75ce78a075f06d7b14087a6a). Existing asset paths are retained.

The built-in `image_gen` tool used each scene/background original as a reference for its subject idea, composition, light, palette, texture and photographic style. Enterprise locations and scene participants are fictional. Generated alternatives for the three named founders were considered during branch review, then excluded from the release; the website retains their original photographs, names, roles and contact destinations. The generated enterprise imagery does not document actual Century premises or customer relationships.

The [before-and-after gallery](previews/generated-photography-2026-11-04.jpg) is a **historical branch-review comparison**, not a picture of the final deployed asset selection. Its generated founder alternatives were excluded and are not deployed as website portraits. The [exact prompt manifest](generated-photography-prompts.json) retains the full generation requests and pinned references: `assets` lists only the ten selected generated masters, `excluded_historical_generations` records the three rejected founder alternatives with explicit not-shipped flags, and `preserved_founder_portraits` identifies the original files retained by the site. A new generation run can produce different images.

## Generated image inventory

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

The atrium remains unused by current pages, but all three atrium files are included in the scene/background refresh. Layout crops and overlays remain in the existing components and CSS. The central subjects in deployment and industry, and the central activity in the use-case images, are composed for the site's narrower cover crops.

## Preserved founder portraits

These files retain the exact bytes, dimensions and paths from `main` at `cad5ff160878585c75ce78a075f06d7b14087a6a`. They are not generated or re-encoded as part of this refresh. The identifiers below are Git blob SHA-1 values, not raw-file SHA-256 checksums.

| Original asset | Dimensions | Preserved Git blob SHA |
| --- | --- | --- |
| `public/founders/vitali-bakhmat.webp` | 320 × 400 | `9c959204a4765f4c3f1097db54f6b40901614372` |
| `public/founders/vadim-vladymtsev.webp` | 320 × 213 | `82f83026c5935f134e3ccc748246e65d341c6b6d` |
| `public/founders/egor-krychev.webp` | 320 × 320 | `33a891712d166322b05b0798600ee8fb5ef21966` |

The historical founder generation prompts and gallery are retained only as review provenance. Their generated outputs are excluded from the release and do not replace these files.

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


### Historical local checks before the founder exclusion

- The ten selected generated masters were included in the branch's visual comparison for composition, palette, photographic texture and subject continuity. The expected cover crops were assessed against the existing CSS. Founder alternatives were also reviewed at that checkpoint, but were subsequently excluded in favour of the original files listed above.
- The 14 selected generated WebP files were included in the branch's successful decode, dimension and source-hash checks. These scene/background assets use WebP quality 86. The retained original founder photographs are outside that generated-output check and keep their original dimensions and bytes.
- The regenerated social image is 1200 × 630. FFprobe confirmed the background film is H.264, 1280 × 720, 24 fps, 312 frames and exactly 13 seconds, without audio. Sampled frames were visually inspected.
- `npm run typecheck`, `npm run build` and `npm run check:export` passed after the branch's generated assets were installed and the concurrent application-capture update was incorporated, before the generated founder alternatives were excluded. The export inspector checked all 26 content routes and 2,364 local links/assets, alongside metadata, sitemap, contact destinations and application screenshots. The six application-capture files were compared byte-for-byte with the updated `main`. This checkpoint does not claim validation of the final merged revision.
- This workspace cannot read the operating-system RSS counter. Next.js's optional memory tracer raised `ENOENT` / `uv_resident_set_memory`; an ignored local dependency change skips only that exact diagnostic failure. Compilation, type checks, application source, dependency lock and deployment workflow were not weakened or changed for this workaround. A clean production build remains a separate GitHub Actions check after merge.
- Playwright's Chromium installation returned a truncated archive, so no browser automation assertions or new live-site review are claimed. The gallery and crop review are image/CSS inspections, not browser screenshots.

This document records the asset selection and historical branch-local checks. Publication evidence belongs in the release record: the merged commit, successful GitHub Actions deployment and live review establish which revision is published.
