# Wonderful-inspired Century website adaptation

This **26-route website** adapts the main page families and visual composition of [Wonderful](https://www.wonderful.ai/) while preserving Century's name, founders and existing business contacts. The design covers the homepage and the shared product, industry, company and guide layouts. The [design migration log](design-migration-2026-11-04.md) records the earlier implementation, original media sources and validation evidence. The [application screenshot log](application-screenshots-2026-11-04.md) documents the real English interface captures. The [generated photography refresh](generated-photography-2026-11-04.md) replaces ten scene and background photographs while preserving their visual purpose; the three original founder portraits and six application captures remain unchanged.

The [stock-video update](stock-video-2026-11-05.md) brings the homepage section order into line with the current reference and replaces the previous still-photo animation with licensed real footage. It preserves the 26-route inventory and the original Century portraits and application captures.

## Century identity

The current design uses the **black and white Century SVG wordmarks supplied for this task**, Inter typography, white and near-black sections, large light-weight headings, restrained borders and rounded buttons. Photographic cards and a short background film carry the homepage imagery. A symbol derived from the supplied wordmark's first glyph is used where a compact mark is needed. Every route shares the same navigation and footer; `src/app/design.css` applies the current visual system across the existing page families.

Vitali Bakhmat, Vadim Vladymtsev and Egor Krychev retain their existing names, roles and profile destinations. Their original photographs are preserved byte-for-byte from `main` at `cad5ff160878585c75ce78a075f06d7b14087a6a`, with the same asset paths and dimensions. The generated founder alternatives were excluded from the release. Contact links lead to `https://t.me/vitalibakhmat`; the other external profile links are `https://vadimohka.com/` and `https://www.linkedin.com/in/ekrychev/`.

The reference informs page structure, hierarchy and visual rhythm. Century's pages use adapted copy, real application captures, licensed stock footage and locally served photography. The illustrative scenes do not establish customer relationships or identify Century premises; the named founders retain their identities. Wonderful customer logos, testimonials, investors, statistics, certifications, press coverage and job vacancies are not attributed to Century. Original media provenance remains in the design migration log, current generation prompts and source references are in the photography notes, and the [application screenshot log](application-screenshots-2026-11-04.md) documents the real interface captures.

## Complete route inventory

All 26 content routes use trailing slashes in the static export. The source registry is `src/lib/routes.ts`; the sitemap is generated from it. Industry and article detail routes have finite static parameters and reject unknown slugs.

| Route | Implemented content |
| --- | --- |
| `/` | Responsive stock-film hero; capabilities strip; horizontal use-case cards; manifesto; one AI OS section with real captures; deployment and strategy; horizontal industry tabs with one wide image; About/Careers closer; footer contact. |
| `/ai-os/` | Platform foundation, infrastructure layer explorer, reusable knowledge and workflow concepts, deployment boundaries and product links. |
| `/agents/` | Knowledge, document and support workflows; agent scope; native capability disclosures; real model and response-detail captures; operating ownership. |
| `/systems/` | Requirements-led application design, real file-library and document-input views, business functions, implementation and ownership. |
| `/ai-gateway/` | Real model-assignment and response-detail captures, model-access and operational-control considerations. |
| `/deployment/` | Technical and business responsibilities, delivery phase selector, deployment options and implementation scope. |
| `/ai-transformation/` | Business-led strategy, five working principles, an evidence-based roadmap and related delivery pages. |
| `/security/` | Data and access boundaries, six deployment decisions, review responsibilities and clear separation of website privacy from project arrangements. |
| `/industries/` | Seven sector guides and common principles for choosing a first workflow. |
| `/industries/banking/` | Application preparation, policy knowledge, service preparation and operations review. |
| `/industries/telecommunication/` | Fault triage, account requests, billing assistance and incident communication. |
| `/industries/healthcare/` | Administrative knowledge, referral and scheduling preparation, document organisation and internal service requests. |
| `/industries/utilities/` | Service requests, connection documents, field-team knowledge and billing support. |
| `/industries/insurance/` | Submission preparation, policy knowledge, claims documentation and exception routing. |
| `/industries/retail/` | Order and returns support, store knowledge, supplier documents and product-content preparation. |
| `/industries/airlines/` | Passenger service knowledge, disruption handovers, claims documents and internal operational knowledge. |
| `/about-us/` | Century’s approach, principles, founders and related company information. |
| `/careers/` | Working principles, disciplines and a direct introduction route; no invented advertised vacancies. |
| `/press/` | Company introduction, founder profiles, black and white SVG wordmark downloads and media contact. |
| `/contact/` | Vitali’s existing Telegram destination, portrait and prompts for a useful first conversation. |
| `/blog/` | Featured guide, category filtering and four original Century articles. |
| `/blog/choose-first-ai-workflow/` | Choosing a recurring task, defining its scope, naming an owner and setting evaluation criteria. |
| `/blog/answers-need-sources/` | Inspectable evidence, approved knowledge, access rules, uncertainty and source maintenance. |
| `/blog/human-review/` | Approval boundaries, reviewer context, authority, exceptions and practical feedback. |
| `/blog/plan-ai-deployment/` | A deployment brief covering data, interfaces, readiness and ongoing ownership. |
| `/privacy/` | Public website behaviour, hosting requests, browser storage, contact links and local downloads. |

The custom 404 page, `robots.txt`, `sitemap.xml`, `CNAME`, `.nojekyll`, icon and static assets are additional export files, not content routes. The industry path intentionally matches the reference’s singular `telecommunication` spelling.

## Adaptation decisions

| Reference pattern | Century implementation |
| --- | --- |
| Large editorial heroes and alternating section treatments | Full-width film opening, photographic cards, white and near-black sections, Inter typography and shared inner-page components. |
| Brand treatments on light and dark backgrounds | Supplied black and white Century wordmarks in the header, footer, press downloads and social preview. |
| Product family with deep supporting pages | AI OS, Agents, Systems and AI Gateway, plus deployment, transformation and security content. |
| Industry pages with outcomes and workflow groups | Seven distinct guides; each has three goals, four detailed workflows, a four-step example, three controls and two related sectors. |
| Company story, careers and media pages | Existing founder information, practical principles, an invitation to introduce yourself and a local brand resource. |
| News and editorial content | Four original practical guides with categories, reading-time labels, article contents and related links. |
| Prominent conversion sections | Existing Telegram contact destination throughout the site and a dedicated contact page. |

Each industry workflow explains its inputs, human review and prepared outcome. The examples support scoping discussions. They do not assert a completed integration, customer deployment or measured result. Clinical, credit, coverage, entitlement, payment and operational decisions stay with the appropriately authorised people in the described processes.

## Real application captures and interface behaviour

The product views use six frames extracted directly from the supplied Century recordings. Their crops are prepared before publication, so the full-size image contains the same selected content. English-only details of models, files, response telemetry, document import and audio playback replace the invented diagrams and mock interfaces. Captions describe the feature visible in each fragment. Source files, frame times and crop coordinates are recorded in the [application screenshot log](application-screenshots-2026-11-04.md). The screenshots are static images with full-size links; there is no live application or account connection.

The infrastructure explorer, deployment phase selector, homepage industry selector and blog category filter change the displayed view locally. They do not send a request to an AI service. Their current selection is held in page memory and is not stored as a browser profile. Static fallback content remains available when JavaScript is disabled.

Workflow details, capability disclosures and mobile navigation use native `details` and `summary` where appropriate. The primary page content is server rendered. Skip links, visible focus styles, semantic headings, responsive layouts and reduced-motion styles are included. Browser-level validation of these behaviours is separate from inspecting the source or a static export.

The decorative homepage film is a silent 24-second montage of eight licensed stock clips, edited with straight cuts. Desktop and mobile files use separate framing; only one is mounted per page load. It autoplays in a muted inline loop. `HeroFilm` checks reduced-motion and save-data preferences before mounting the video. When either preference is enabled, JavaScript is unavailable or the media fails, a responsive local poster remains visible. The film is decorative and hidden from assistive technology; all text and actions remain regular page content.

The earlier supplier-onboarding answer, review queue, Gateway sample analytics and decorative product diagrams have been removed. Industry hero artwork has also been replaced with real Century file-library captures; those captures do not claim an industry-specific customer deployment. Careers does not claim open roles, and Press does not invent media coverage or funding. Security content identifies decisions to agree for an implementation; it does not claim certifications or unconditional compliance.

## Contact, privacy and resources

External contact and founder links open separately with `noopener noreferrer`. The application has no contact form, file upload, embedded chat, analytics tags, advertising pixels, application cookies, local storage or session storage. Ordinary hosting requests and any provider logging are described separately on the privacy page.

Images, the film, application captures, styles, scripts and brand downloads are served from the static site. `next/font` bundles Inter during the build, so the visitor does not fetch the font from Google Fonts. The reference's commercial ABC Favorit font is not included. The application does not need a runtime API or server to render the content pages. A user who follows a Telegram, LinkedIn or personal-site link leaves the website and uses that external service.

Each page has a unique title, description, canonical and Open Graph URL under `https://century-ai.eu/`. The shared 1200 × 630 social image is local. The homepage retains its website and webpage structured data; article metadata identifies the individual guide pages.

## Asset provenance

The [migration log's asset-provenance section](design-migration-2026-11-04.md#asset-provenance) preserves the historical reference URLs and original film edit details. The [photography notes](generated-photography-2026-11-04.md) and [exact prompt manifest](generated-photography-prompts.json) document **10 generated photographic masters delivered as 14 WebP files**, including four responsive derivatives, plus a derived social image and background animation. The three original founder portraits are recorded separately with their preserved Git blob hashes. The six real application captures are documented in the [screenshot log](application-screenshots-2026-11-04.md).

| Asset | Local location and source |
| --- | --- |
| Black and white Century wordmarks | `public/brand/century-logo.svg` and `public/brand/century-logo-white.svg`; supplied by the user. |
| Compact Century symbol | `public/brand/century-symbol.svg`; derived from the supplied wordmark's first glyph. |
| Homepage film | `public/media/enterprise-film.mp4` and `enterprise-film-mobile.mp4`; a 24-second silent stock montage in 1280 × 720 and 540 × 960, H.264 / 24 fps. |
| Hero posters and use-case photographs | `public/media/hero-poster*.webp` and `public/media/stock/scene-*.webp`; real frames extracted from the licensed sources in the stock-video manifest. |
| Platform, deployment, strategy, industry and closing imagery | WebP files in `public/media/`; new reference-guided generated photographs retaining the existing visual purpose and palette. |
| Founder portraits | `public/founders/`; three original photographs preserved byte-for-byte from `main` at `cad5ff1`, with their original dimensions. |
| Atrium and responsive variants | `public/images/enterprise-atrium*.webp`; newly generated architecture, retained as unused assets. |
| Application captures | `public/media/app/`; six direct English-only crops of the supplied Century application recordings, with provenance in the screenshot log. |

The enterprise photographs illustrate the site's themes; they do not document Century's premises or customer relationships. The About and Contact pages reuse the generated deployment and industry images. All assets are loaded from Century's static export. The six real application captures are preserved unchanged and are outside the photographic replacement inventory. Product mockups and industry hero diagrams are no longer rendered; editorial article artwork and small navigation/feature icons remain native code-based visuals. The earlier design migration log and its two live-site screenshots remain unchanged as historical evidence; those historical screenshots are not photo assets used by the site.

The [photography comparison gallery](previews/generated-photography-2026-11-04.jpg) records the earlier branch review, including generated founder alternatives that were excluded and are not deployed as website portraits. The manifest separates those historical generation records from its ten selected assets. The [preserved founder inventory](generated-photography-2026-11-04.md#preserved-founder-portraits) identifies the exact original files used by the site.

The social image at `public/og/century-ai-eu.png` combines the current hero poster, supplied white wordmark and existing text with Sharp. Regenerate it with `npm run assets:og`. The optional `npm run assets:film` command runs `scripts/create-enterprise-film.mjs` to fetch hash-verified stock sources and reproduce the responsive films and posters from the committed manifest using FFmpeg/ffprobe. It is not run during builds or deployment. Rebuild to refresh `out/` after changing either derived asset.

## Build and optional inspection

Use Node.js 20, matching the deployment workflow:

```bash
npm ci
npm run dev
```

Create the static export:

```bash
npm run build
```

Next.js writes the pages to `out/`; the postbuild packaging step adds the custom-domain file and `.nojekyll`. The output can be served by a static web server.

Optional local checks are deliberately separate from deployment:

```bash
npm run typecheck
npm run check:export
```

The export inspector requires a completed build. It verifies the 26 expected content routes; sitemap coverage; one H1 and English document language per page; unique titles and descriptions; canonical and Open Graph URLs; local links, fragments and asset references; approved external contact/profile destinations; no contact fields; real application captures and their local full-size links; the brand-download file; and PNG social-image dimensions. It also scans text outputs for the legacy domain, tracking and bot-connection markers retained from the original site’s boundary checks. It does not claim to validate visual layout, interactive state changes or a live deployment.

The inspector can read an alternative export directory:

```bash
npm run check:export -- /absolute/path/to/export
```

The optional Playwright suite in `tests/landing.spec.ts` covers routes and metadata; approved contact destinations and local resources; navigation without JavaScript; keyboard menus, full-size capture links and FAQs; product tabs; real capture loading; and responsive layouts. It remains outside CI. Local execution requires a completed export, Python 3 and Playwright's Chromium browser. See the [photography verification notes](generated-photography-2026-11-04.md#verification) for the current checks, imagery and crops, and the [application screenshot log](application-screenshots-2026-11-04.md) for the capture-specific record.

### Historical design validation — 4 November 2026

The earlier design migration passed its local typecheck, static export and export inspection for 26 content routes and 2,302 local links/assets. Its preview used a local-only workaround for unavailable `/proc` RSS diagnostics; an attempted Playwright run stopped before assertions because Chromium could not be installed. The unmodified production build and Pages deployment subsequently succeeded in [Actions run 41842820065](https://github.com/STACKLEVEL-AI/century-ai-next/actions/runs/41842820065) for [PR #47](https://github.com/STACKLEVEL-AI/century-ai-next/pull/47), merge commit `1163e7c32c64efe17043ec8e85a60a6c60adf502`. The [migration log](design-migration-2026-11-04.md#validation-record) records the subsequent manual desktop review and screenshots. The [application screenshot log](application-screenshots-2026-11-04.md) preserves the later capture update's checks and provenance. These records describe their respective earlier revisions.

### Historical photography-branch validation

After integrating the generated photography with the six real application captures, and before excluding the generated founder alternatives, the branch passed `npm run typecheck`, `npm run build` and `npm run check:export` for all 26 content routes and 2,364 local links/assets. The release selection subsequently retained the original founder photographs from `cad5ff1`; the six application captures also remain unchanged. The [photography verification notes](generated-photography-2026-11-04.md#verification) record the earlier checkpoint's scope and limitations. These historical static checks do not establish validation or live publication of the final merged revision, or an executed Playwright result.

## Deployment-only GitHub workflow

The workflow `.github/workflows/nextjs.yml` is named **Deploy Century to GitHub Pages**. It runs on pushes to `main` and manual dispatch with `main` selected. One deployment job performs checkout, Node setup, `npm ci`, `npm run build`, artifact upload from `out/` and GitHub Pages deployment.

There are **no CI test jobs or test steps**, no browser installation or Playwright execution, no standalone typecheck or export-inspection step, and no pull-request verification trigger. `npm ci` still installs the retained development dependencies. Compilation and static export remain part of producing the deployable artifact. The postbuild step packages the domain configuration; it is not a browser or regression suite.

Pages settings must use **GitHub Actions** as the source and retain the `century-ai.eu` custom domain. Generated output is not committed to `main` or published through a separate `gh-pages` branch. Source changes become a confirmed publication only after the deployment succeeds.

The [photography notes](generated-photography-2026-11-04.md) and [application screenshot log](application-screenshots-2026-11-04.md) describe the generated imagery, real captures and verification records. The [design migration log](design-migration-2026-11-04.md) and [original implementation plan](superpowers/plans/2026-10-26-century-ai-eu-upgrade.md) remain unchanged as historical project context.

