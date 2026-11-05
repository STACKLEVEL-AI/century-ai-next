# Industry reference layouts

## Scope and sources

The remaining six industry detail pages now follow the corresponding Wonderful references supplied by the user:

| Century route | Reference |
| --- | --- |
| `/industries/banking/` | https://www.wonderful.ai/industries/banking |
| `/industries/telecommunication/` | https://www.wonderful.ai/industries/telecommunication |
| `/industries/healthcare/` | https://www.wonderful.ai/industries/healthcare |
| `/industries/utilities/` | https://www.wonderful.ai/industries/utilities |
| `/industries/retail/` | https://www.wonderful.ai/industries/retail |
| `/industries/airlines/` | https://www.wonderful.ai/industries/airlines |

References were inspected on 2026-11-05. Wonderful's `/industries/` endpoint returned a 404 page, so Century's overview is a coordinated directory of all seven industries, using the same photography, display font, compact header, contact section and footer.

## Implementation

- `src/components/industries/IndustryReferencePage.tsx` renders the seven detail pages and the shared frame/contact section.
- `src/components/industries/IndustryReferencePage.module.css` contains scoped styles; global styles and Header defaults remain unchanged.
- `src/components/industries/IndustryDirectory.tsx` renders the overview.
- `src/lib/industry-reference-pages.ts` supplies industry-specific copy, icons, image paths, dimensions, crop settings and mobile card order.
- The existing `src/lib/industries.ts` remains the source for route enumeration and detail metadata. Unknown slugs still resolve through `notFound()`; static generation covers the same seven slugs.

Each detail page has a photographic hero, three benefits, four workflows with a sector photograph, four illustrated reasons, and a contact section. The reference's 1400px and 880px layout transitions, light display typography, dark/white sections, hover/focus illustration behavior and mobile benefit order (2 → 3 → 1) are preserved. Touch devices show illustrations without requiring hover.

Healthcare's desktop heading is capped just below 200px near the 1400px breakpoint to keep it clear of the description. The reference's tablet workflow width of 200% remains corrected to 100%. Mobile title sizing also adapts below 376px. These adjustments avoid clipping without changing the section structure.

## Century branding and content

Century's existing SVG logos, navigation destinations, metadata, Telegram contact and legal pages are retained. Wonderful promotional banners and customer/partner strips are excluded. The Utilities customer video, testimonial and metrics are also excluded.

Marketing paragraphs describe the existing Century scope and review process. They do not attribute Wonderful's certifications, customers, financial performance, delivery promises or integrations to Century. Photos and neutral illustrations follow the supplied references. Incorrect reference alt descriptions mentioning airports on unrelated industry pages are replaced with descriptions of the actual scenes.

Banking, Telecom and Retail use the reference's neutral platform diagrams, which contain no partner or Wonderful branding. Healthcare and Utilities have new native Century SVG diagrams in place of branded originals. Airlines also has a Century SVG because its source platform image contains banking labels. All diagram labels describe generic workflow/system categories.

## Assets and preservation

All runtime assets are local. `industries-assets-2026-11-05.json` records source URLs, dimensions, SHA-256 hashes and processing for the 45 added files. Photos use WebP with separate mobile and desktop variants; small originals are not enlarged. Neutral diagram PNGs retain their original bytes. The existing Insurance font, gradient and identical deployment diagrams are reused.

Insurance was moved from its dedicated renderer into the common renderer. Its visible content, image paths, intrinsic sizes, crop, links, section order and mobile card order are preserved. The homepage, global styles, package versions and deployment workflow are unchanged.

## Validation before publication

- `npm run build`: successful production compilation and static export.
- `npm run typecheck`: passed.
- `npm run check:export`: passed for 26 content routes and 2408 local links/assets, including unique metadata, sitemap and contact destinations.
- All seven detail exports contain one H1, one main, five sections, three benefits, four workflows and four reason illustrations. All include footer navigation and omit announcement/customer blocks.
- Insurance's main/footer visible text, image attributes and destinations were compared against the prior export and are unchanged. The homepage's visible text, image/video attributes and destinations are unchanged.
- Image metadata and local file availability were checked for every referenced industry asset.

The managed local preview daemon is unavailable in this workspace. No local Playwright or mobile browser pass is claimed. Live browser observations and deployment status are recorded in the associated pull request. The ignored local Next memory diagnostic retains the previously documented workaround for the sandbox's missing `uv_resident_set_memory` syscall; no dependency or workflow changes are included.
