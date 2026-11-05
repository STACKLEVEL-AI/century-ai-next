# Original imagery replacement — 6 November 2026

The image audit identified **87 directly borrowed Wonderful image files** in the current Platform and industry assets: photographs, responsive derivatives, abstract backgrounds and diagrams. This update removes those public files and replaces every active reference with original project photography, eight new generated scenes, licensed stock already present in the project, and six original Century SVG diagrams.

The [machine-readable audit and prompt manifest](image-replacement-2026-11-06.json) contains every retired path, its Git blob and documented Wonderful source, its replacement paths, dimensions, hashes, generation prompts and validation results. A WebP conversion or resize still counts as a directly borrowed image; this audit does not confuse a different encoding with a new photograph.

## Findings and scope

| Area | Borrowed files | Replacement |
| --- | ---: | --- |
| Six Platform pages | 37 | New workplace scenes, existing original project textures/architecture and two original data/security diagrams. |
| Seven industries and shared industry surfaces | 50 | 28 photographic files, 21 PNG diagrams and one common background replaced with original scenes, project photographs and four native diagrams. |
| Homepage and Company navigation card | Nine uses of files already counted above | Replace their shared borrowed images while keeping the latest layout and 18 distinct image slots. |
| Company, About, Careers and Blog | No additional copied files outside the shared inventory | Preserve project photographs, founder portraits, real application captures and native artwork. |

The initial audit was pinned to `778c725c798f9d8cc89430ed18dd126df0fadaf1`. During implementation, upstream `9dfa29faea019e83e3f18fa7b70e4f71b0e2ca8e` restored the homepage's vertical industry list, adjusted the hero height and removed the separate manifesto. The subsequent `96a8b44733d527e74822531b5eacd963ff874ac0` assigned a distinct photograph to each homepage slot, including nine uses of the borrowed files in this inventory. This update preserves the latest layout, interactions, original project photographs and new Employee assistance scene, and replaces those nine uses. Two additional scenes and the existing enterprise atrium keep all 18 homepage slots distinct. The [homepage photography manifest](homepage-photography-2026-11-06.json) records the final slot mapping.

Earlier dated source manifests remain historical provenance. Their listed Wonderful assets are not the current runtime inventory after this replacement. The nine independently generated project masters were distinguished from their old reference URLs by checking the later generation records and committed blob hashes.

## New photography

Eight new fictional-person scenes were produced with the built-in image-generation tool. Three private user-supplied photographs guided broad visible appearance and the approachable technical-team character. The scenes use new adult faces and new compositions; they are not identity-preserving edits of the supplied portraits. The private reference photographs are not included in the repository.

| Scene | Primary use |
| --- | --- |
| `team-workshop` | Deployment, collaborative delivery and workflow discussion. |
| `support-team` | Agents, Systems and Insurance service work. |
| `healthcare-team` | Healthcare administration and clinical workflow context. |
| `banking-advice` | Banking, document review and strategy consultation. |
| `energy-engineers` | Utilities field work and operational knowledge. |
| `retail-team` | Retail inventory and store operations. |
| `telecom-operations` | The homepage Telecommunications panel. |
| `team-collaboration` | The homepage Team background. |

The sixteen files in `public/media/century/photos/` provide a 1600 × 900 master and a 768 × 432 responsive version for every scene. All are locally served WebP files. Conversion changes only size, crop and encoding; it does not alter faces. The `support-team` 3:2 master is cropped from the top when preparing 16:9 derivatives so both subjects retain their full hairline.

These scenes illustrate work and do not establish the identity of Century employees, customer relationships or actual premises. The three named founders retain their original portraits and profile links. All six authentic Century application captures remain unchanged.

## Responsive composition and diagrams

The high industry hero uses a separate mobile focal point. Actual WebP crops were reviewed at 390 × 700: Banking 84%, Healthcare 28%, Utilities 37%, Retail 50%, Insurance 82%, Telecommunications 62% and Airlines 50%, with a vertical position of 50%. Desktop and directory images keep their central crop. The Agents portrait panel uses 25% horizontally; the wider Systems panel uses 45%.

Four new industry diagrams explain platform connections, a task-to-review flow, access and approval boundaries, and delivery stages. Two new Platform diagrams explain data connections and a controlled access boundary. They are original editable SVG source with no embedded copied raster image or external resource. Existing native Century vectors remain in the repository as original project assets.

New image URLs use `public/media/century/`; other replacements point to existing original project assets. No cache depends on replacing a borrowed file's bytes at its previous address. The old Wonderful image paths are removed from the public tree and from source, CSS and responsive branches.

## Verification and deployment

Validation results are recorded in the JSON manifest. A clean production build passed, including type validation and static generation. The existing export inspection passed for **26 content routes and 2,592 local links/assets**. The complete source and compiled output contain zero references to the 87 retired paths; none of those public files remain in the export. Every replacement path exists, and all 16 prepared GitHub photo blobs match their local bytes. The homepage inventory retains 18 distinct image hashes, while the original three founder portraits and six application captures are unchanged.

Actual responsive crops and the six rendered SVG diagrams were reviewed. The latest homepage layout/CSS, video component, navigation styling and deployment-only workflow were preserved. The local Chromium runtime is unavailable, so this update does not claim a local Playwright run. Live browser checks are performed after deployment and reported with the publication result.

The GitHub Pages workflow remains deployment-only. Image generation, visual review and validation run outside CI. No browser installation, tests, audit job or asset-generation step is added to the workflow. The published result is confirmed separately by the successful Pages run and a live browser review.

## Per-page photography follow-up

The initial replacement was published in commit `3fe9d877fc581e4d585c54c908a1dce110f22a97`. The subsequent [per-page photography inventory](photo-uniqueness-2026-11-06.json) records the user's additional requirement that a photograph appear in only one logical slot on each page. It covers shared navigation, photographic backgrounds, related cards, guide filters and industry selectors. Later slot assignments in that inventory supersede the initial replacement mapping above. This follow-up uses existing original assets and native CSS gradients; no new generated photograph is needed.
