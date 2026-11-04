# Internal-page refinement — 5 November 2026

## Scope

This revision responds to the request to remove the oversized footer wordmark and bring every page except the homepage closer to the visual quality of [Wonderful](https://www.wonderful.ai/). It starts from `main` at `55ed82dec58eba5a4b381ad6df78a3ab47aaf42b`.

The homepage content, component source, photography, film and application captures are unchanged. The shared footer retains its compact Century logo, navigation and legal information; the large bottom wordmark and its CSS are removed everywhere.

All **25 internal content routes** receive the new compositions. The custom 404 also uses the internal-page shell. The route registry, metadata, article content and industry data remain intact.

| Family | Scope | Changes |
| --- | --- | --- |
| Product and delivery | AI OS, Agents, Systems, AI Gateway, Deployment, AI Transformation | Distinct light, dark and photographic introductions; larger real application captures; open editorial rows; refined infrastructure and deployment selectors. |
| Industries | Directory and all seven sector pages | Photographic directory cards; immersive sector introductions; local navigation; native scenario disclosures; workflow, review and control sections; related sectors. |
| Company and information | About, Careers, Press, Security, Contact, Privacy | Editorial layouts, original founder portraits, working brand downloads, a clear Telegram contact path, security disclosures and a readable privacy document with contents. |
| Journal | Blog and all four guides | Photographic covers, featured-story layout, functioning category filters, readable article columns, contents and related guides. |

## Design and implementation

The reference informed the hierarchy, generous spacing, light typography, full-width photography and editorial rhythm. Century keeps its existing Inter font, supplied wordmarks, original copy, real application captures and established contact destinations. No reference font or external media is redistributed.

`PageFrame` scopes internal content with `.inner-page`. Four stylesheet layers (`inner.css`, `products-refined.css`, `industries-refined.css`, `company-refined.css`) use only selectors beginning with that scope. They do not style homepage content. A separate `PageContact` provides the closing invitation on internal pages without changing the homepage contact component.

Layout rules cover desktop, tablet and narrow screens. Long industry names receive fluid sizing; grids collapse into a single column; article contents stop sticking on small screens. Deployment tabs use smaller labels and hide decorative arrows below 480px. Keyboard navigation, selected-tab state, native disclosures, reduced-motion rules and static fallbacks are preserved.

All 28 files under `public/` were compared with their original Git blob hashes and are unchanged, including the three founder portraits, six application captures and background film. No new product mockups, customer metrics, vacancies, press claims, contact forms, analytics or external connections are introduced.

## Verification before publication

- TypeScript checking completed successfully.
- Production compilation and static export completed for the whole site.
- `npm run check:export` passed for **26 content routes and 2,498 local links/assets**. It verifies unique metadata, canonical and Open Graph URLs, sitemap coverage, local anchors, approved contact destinations and real application captures. The check also now requires the oversized footer wordmark to be absent and the homepage to remain outside the internal-page scope.
- PostCSS parsed all four new stylesheets; all 1,185 selectors are scoped to `.inner-page`, including the live-review focus correction below.
- Baseline comparison confirmed the homepage source and its components, content libraries, dependencies and deployment workflow are unchanged.
- The optional Playwright suite is discoverable: 12 tests, including new checks across all internal routes at 360px, 768px and 1440px and category-filter interactions. **It was not executed locally:** the Chromium download was truncated and the installer could not extract it.

The local sandbox does not implement Node's `uv_resident_set_memory` syscall. The first build stopped in Next's optional memory diagnostic; the successful local build used a guard for that specific error in the ignored `node_modules` copy of Next. No dependency, lockfile, workflow or repository source was changed for that workaround. The GitHub Actions build must run with its normal dependencies.

These checks establish source and export integrity. They do not establish publication or successful browser testing. The associated pull request records the subsequent GitHub Actions result and observations from the deployed site.

## Publication and live review

[PR #50](https://github.com/STACKLEVEL-AI/century-ai-next/pull/50) was merged as `f8c3422d859945d862d970087435daae3d6af7ac`. [GitHub Actions run 41917942391](https://github.com/STACKLEVEL-AI/century-ai-next/actions/runs/41917942391) completed successfully with the normal dependency installation, static build and Pages deployment.

Desktop browser review confirmed the new layouts at 1363 × 936, with a 1348px document area. The homepage remains outside the new design scope; the oversized footer logo is absent; the 404 displays correctly, retains `noindex` and links back to the homepage. The six product routes have no horizontal page overflow or failed image loads after viewing lazy-loaded sections. AI OS and Deployment tabs respond to arrow and End keys with matching focus, selection and visible panels.

The review found a small keyboard-focus issue: the outer outline of the last Deployment tab was clipped by the selector's rounded container. A follow-up sets the outline inside the focused tab. The associated pull request records the follow-up deployment and final browser review. Mobile viewport browser testing remains unverified in this environment.

## Optional inspection

```bash
npm ci
npm run typecheck
npm run build
npm run check:export
npx playwright install chromium
npm run test:e2e
```

The existing GitHub Pages workflow remains unchanged and performs installation, build and deployment on `main`. It does not run the optional inspection scripts or browser tests.
