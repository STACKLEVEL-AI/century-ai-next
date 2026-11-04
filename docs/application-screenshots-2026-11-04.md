# Century — real application screenshots

## Request

Replace invented workflow diagrams and product mockups with real screenshots from the application recordings supplied in this conversation. Minimise Russian text; prefer useful fragments with no Russian text at all. Keep Century's existing design, brand and founders. Continue in small stages, merge the finished change into `main`, and verify publication.

Baseline: `9662939475ec9579841816ee8afd937bc5062b3c`. Working branch: `design/real-century-screenshots-2026-11-04`.

## Stages

- [x] Inventory the supplied recordings and identify the current invented product visuals.
- [x] Review candidate frames, choose crops, and document their provenance and visible language.
- [x] Replace the product illustrations with real captures and accurate English captions.
- [ ] Verify the static export, image loading, responsive presentation and surviving interactions.
- [ ] Publish the branch, merge into `main`, verify the deployment and record the result.

## Selection rules

- Frames must come directly from the supplied recordings. Do not generate, redraw or translate the application's pixels.
- Prefer English-only functional views when the recordings contain them. If the useful interface is Russian, minimise short interface labels and exclude long Russian conversations, document contents and unrelated history.
- Crop screenshots before publication; do not rely on CSS to hide unwanted content from a full image that remains downloadable.
- Match captions to the feature actually visible. Do not present a model selector as usage analytics or an index configuration as a generated answer.
- Keep all new website copy, image descriptions and captions in English.

## Initial audit

Primary replacements: the homepage platform field; the invented supplier question/answer in `Brain`; the AI OS constellation; Agents and Systems hero diagrams; the supplier review table; and the decorative infrastructure layers. Deployment and strategy illustrations are also candidates where the recordings provide an appropriate real view.

The old Gateway dashboard contains invented sample metrics and CSV export. Its presentation must be reconsidered with the available recordings rather than relabelling an unrelated capture as that dashboard.

All 15 supplied files are available locally. The similarly named versions are not assumed to be identical. The recordings examined so far mostly use Russian interface labels, so language selection requires visual inspection of the actual pixels.

## Capture provenance

Six real interface fragments were selected. Every published crop was visually inspected and contains **no Cyrillic, Russian transliteration, Russian conversation, document body or credentials**. The Russian interface surrounding each fragment is excluded from the file itself, not merely hidden by the website's CSS. No screenshot text was translated or reconstructed.

The recordings do not contain a useful full application screen in English. To honour the requested language preference, the site presents accurate **interface details** rather than whole Russian-language screens. Captions describe those details; the cropped views are not represented as full application screenshots.

| Published asset | Supplied source | Frame / time (30 fps) | Crop: x, y, width, height |
| --- | --- | --- | --- |
| `models.webp` | `century-agent-search(1).mp4` | 0 / 0.000 s | 984, 542, 910, 342 |
| `files.webp` | `century-ocr-pdf(1).mp4` | 114 / 3.800 s | 636, 108, 962, 304 |
| `response.webp` | `century-chat-document(1).mp4` | 520 / 17.333 s | 181, 690, 650, 98 |
| `document.webp` | `century-ocr-pdf(1).mp4` | 6 / 0.200 s | 636, 360, 962, 54 |
| `audio.webp` | `century-transcription(1).mp4` | 204 / 6.800 s | 360, 380, 1514, 78 |
| `model-choice.webp` | `century-chat-reasoning(1).mp4` | 255 / 8.500 s | 176, 18, 296, 60 |

All sources are 1920 × 1080. The six local WebP assets total 108396 bytes. Exact source and output SHA-256 hashes are in [app-capture-provenance.json](app-capture-provenance.json). Original recordings and full frames are not published.

## Implementation checkpoint

- `AppScreenshot` and `app-captures.ts` provide shared accessible figures, English descriptions, intrinsic image dimensions and keyboard-accessible full-size links.
- Homepage platform visuals and the supplier-answer mockup now show the real application details.
- AI OS, Agents, Systems, Gateway, Deployment and the seven industry hero sections use the real captures. The transformation page's decorative diagram is removed.
- Invented Gateway spending/request charts, review queue and CSV sample output are removed. The page now shows real model assignments and response metadata with accurate surrounding copy.
- Infrastructure and deployment selectors retain their tab, focus, keyboard and no-script behaviour; decorative layered cards are removed from the infrastructure panels.
- Brand assets, founder information, contact destinations and the 26-route inventory are preserved.

## Validation and release

- `npm run typecheck`: passed after the component, page and test updates.
- Preview `npm run build`: completed; all 26 content routes generated. This workspace still uses the narrowly scoped, ignored local memory-diagnostic workaround documented in the original migration log. The production workflow has no such modification and will be checked separately.
- `npm run check:export`: passed for 26 routes, unique metadata, 2,364 local links/assets, sitemap, contact destinations and the new screenshot contract. The old mock interface classes are absent from the rendered pages.
- `git diff --check`: passed.
- Each of the six published images was visually reviewed for language and unwanted content. Their intrinsic sizes are recorded in the shared metadata and provenance manifest.
- The existing eight Playwright tests were updated to match real captures and full-size links. They were not executed in this phase; the earlier Chromium installation blocker in this workspace remains the known limit. Source checks and static inspection are not claimed as browser test results.
- Live image loading, full-size links, layout and retained controls will be checked after the authorised deployment.
