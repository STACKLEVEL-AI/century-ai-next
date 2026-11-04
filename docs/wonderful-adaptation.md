# Wonderful-inspired Century website adaptation

This **26-route website** adapts the main page families and visual composition of [Wonderful](https://www.wonderful.ai/) while preserving Century's name, founders and existing business contacts. The current design migration covers the homepage and the shared product, industry, company and guide layouts. The [4 November 2026 migration log](design-migration-2026-11-04.md) records the small implementation stages, media sources and validation evidence; the earlier single-page plan is historical context.

## Century identity

The current design uses the **black and white Century SVG wordmarks supplied for this task**, Inter typography, white and near-black sections, large light-weight headings, restrained borders and rounded buttons. Photographic cards and a short background film carry the homepage imagery. A symbol derived from the supplied wordmark's first glyph is used where a compact mark is needed. Every route shares the same navigation and footer; `src/app/design.css` applies the current visual system across the existing page families.

Vitali Bakhmat, Vadim Vladymtsev and Egor Krychev retain their existing names, roles, local portraits and profile destinations. Contact links lead to `https://t.me/vitalibakhmat`; the other external profile links are `https://vadimohka.com/` and `https://www.linkedin.com/in/ekrychev/`.

The reference informs page structure, hierarchy and visual rhythm. Century's pages use adapted copy, real application captures and locally served reference-media derivatives. Wonderful customer logos, testimonials, investors, statistics, certifications, press coverage and job vacancies are not attributed to Century. Detailed media provenance is recorded in the migration log.

## Complete route inventory

All 26 content routes use trailing slashes in the static export. The source registry is `src/lib/routes.ts`; the sitemap is generated from it. Industry and article detail routes have finite static parameters and reject unknown slugs.

| Route | Implemented content |
| --- | --- |
| `/` | Film hero with poster fallback; photographic use cases; platform and product family; deployment and strategy; industry selector; application capture gallery; founders; guides; contact. |
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

The product views use frames extracted directly from the Century recordings supplied for the follow-up request. Their crops are prepared before publication, so the full-size image contains the same selected content. English-only details of models, files, response telemetry, document import and audio playback replace the invented diagrams and mock interfaces. Captions describe the feature visible in each fragment. Source files, frame times and crop coordinates are recorded in the [application screenshot log](application-screenshots-2026-11-04.md). The screenshots are static images with full-size links; there is no live application or account connection.

The infrastructure explorer, deployment phase selector, homepage industry selector and blog category filter change the displayed view locally. They do not send a request to an AI service. Their current selection is held in page memory and is not stored as a browser profile. Static fallback content remains available when JavaScript is disabled.

Workflow details, capability disclosures and mobile navigation use native `details` and `summary` where appropriate. The primary page content is server rendered. Skip links, visible focus styles, semantic headings, responsive layouts and reduced-motion styles are included. Browser-level validation of these behaviours is separate from inspecting the source or a static export.

The decorative homepage film is muted, loops inline and has a labelled pause/play button. `HeroFilm` checks the visitor's reduced-motion and save-data preferences before mounting the video. When either preference is enabled, or JavaScript is unavailable, the responsive local poster remains the hero background. The film is decorative and hidden from assistive technology; all hero text and actions remain regular page content.

The earlier supplier-onboarding answer, review queue, Gateway sample analytics and decorative product diagrams have been removed. Industry hero artwork has also been replaced with real Century file-library captures; those captures do not claim an industry-specific customer deployment. Careers does not claim open roles, and Press does not invent media coverage or funding. Security content identifies decisions to agree for an implementation; it does not claim certifications or unconditional compliance.

## Contact, privacy and resources

External contact and founder links open separately with `noopener noreferrer`. The application has no contact form, file upload, embedded chat, analytics tags, advertising pixels, application cookies, local storage or session storage. Ordinary hosting requests and any provider logging are described separately on the privacy page.

Images, the film, application captures, styles, scripts and brand downloads are served from the static site. `next/font` bundles Inter during the build, so the visitor does not fetch the font from Google Fonts. The reference's commercial ABC Favorit font is not included. The application does not need a runtime API or server to render the content pages. A user who follows a Telegram, LinkedIn or personal-site link leaves the website and uses that external service.

Each page has a unique title, description, canonical and Open Graph URL under `https://century-ai.eu/`. The shared 1200 × 630 social image is local. The homepage retains its website and webpage structured data; article metadata identifies the individual guide pages.

## Asset provenance

The [migration log's asset-provenance section](design-migration-2026-11-04.md#asset-provenance) contains the original reference URLs and the film edit details. The current assets are:

| Asset | Local location and source |
| --- | --- |
| Black and white Century wordmarks | `public/brand/century-logo.svg` and `public/brand/century-logo-white.svg`; supplied by the user. |
| Compact Century symbol | `public/brand/century-symbol.svg`; derived from the supplied wordmark's first glyph. |
| Homepage film | `public/media/enterprise-film.mp4`; a 13-second, silent, locally re-encoded selection from the reference film. |
| Hero posters and use-case stills | `public/media/hero-poster*.webp`, `knowledge.webp`, `workflows.webp` and `support.webp`; extracted from that film. |
| Platform, deployment, strategy, industry and closing imagery | WebP files in `public/media/`; locally served derivatives of the reference images listed in the migration log. |
| Founder portraits | Existing photographs preserved in `public/founders/`. |
| Application captures | `public/media/app/`; direct crops of the supplied Century application recordings, with provenance in the screenshot log. |

The reference film selection avoids visible customer-bank signage. These media files illustrate the site's themes; they do not depict Century's premises or demonstrate Century customer relationships. Visitors load them from Century's static export, not from Wonderful. The about and contact pages use local deployment and industry images from the same reference-media set. The earlier generated atrium files remain in `public/images/` as unused historical assets. The product mockups and industry hero diagrams are no longer rendered. Editorial article artwork and small navigation/feature icons remain native code-based visuals.

The social image at `public/og/century-ai-eu.png` combines the local hero poster and supplied white wordmark with Sharp. Regenerate it with `npm run assets:og`, then rebuild to refresh `out/`. This command does not require Chromium or a running web server.

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

The optional Playwright suite in `tests/landing.spec.ts` covers routes and metadata; approved contact destinations and local resources; navigation without JavaScript; keyboard menus, full-size capture links and FAQs; product tabs; real capture loading; and responsive layouts. It remains outside CI. Local execution requires a completed export, Python 3 and Playwright's Chromium browser. The current workspace attempt could not launch Chromium; the browser was missing and its attempted download was truncated. It stopped before test assertions, so it provides no passing or failing application-assertion result. Further browser-review results are recorded separately in the migration log rather than inferred from a successful typecheck or export inspection.

### Preview validation checkpoint — 4 November 2026

The initial design migration had a successful local preview export: all 26 content routes were generated, `npm run typecheck` passed, and `npm run check:export` passed for the route inventory, metadata, 2,302 local links/assets, sitemap, contact destinations and sample labels. Earlier blocked build attempts are historical context, not the current preview result.

The workspace lacks `/proc` RSS metrics, which causes Next.js 15.5.28's optional `traceMemoryUsage` diagnostic to throw an `ENOENT` error before compilation. For this preview only, the ignored local dependency tracer was temporarily changed to skip that exact diagnostic. No global process API, application source, package lock or deployment workflow was patched for this workaround.

This confirms the preview export and its static inspection. At that checkpoint, the unmodified production build was still awaiting GitHub Actions. Browser behaviour and publication need their own evidence; consult the [migration log](design-migration-2026-11-04.md#validation-record) for subsequent browser and deployment results. A live release is established by a successful Actions deployment and the live Pages site.

### Production release checkpoint — 4 November 2026

[PR #47](https://github.com/STACKLEVEL-AI/century-ai-next/pull/47) was merged into `main` as `1163e7c32c64efe17043ec8e85a60a6c60adf502`. The unmodified production build and Pages deployment succeeded in [Actions run 41842820065](https://github.com/STACKLEVEL-AI/century-ai-next/actions/runs/41842820065). The published design was then inspected at [century-ai.eu](https://century-ai.eu/): homepage film and navigation, AI OS mouse/keyboard tabs, Gateway period/view changes, industry selection, founder portraits and the Contact destination were verified. The migration log contains the exact checks, limitations and live screenshots. Mobile rendering and automated Playwright assertions are not claimed by this manual desktop review.

## Deployment-only GitHub workflow

The workflow `.github/workflows/nextjs.yml` is named **Deploy Century to GitHub Pages**. It runs on pushes to `main` and manual dispatch with `main` selected. One deployment job performs checkout, Node setup, `npm ci`, `npm run build`, artifact upload from `out/` and GitHub Pages deployment.

There are **no CI test jobs or test steps**, no browser installation or Playwright execution, no standalone typecheck or export-inspection step, and no pull-request verification trigger. `npm ci` still installs the retained development dependencies. Compilation and static export remain part of producing the deployable artifact. The postbuild step packages the domain configuration; it is not a browser or regression suite.

Pages settings must use **GitHub Actions** as the source and retain the `century-ai.eu` custom domain. Generated output is not committed to `main` or published through a separate `gh-pages` branch. Source changes become a confirmed publication only after the deployment succeeds.

The [migration log](design-migration-2026-11-04.md) tracks the current design work and release checks. The [original implementation plan](superpowers/plans/2026-10-26-century-ai-eu-upgrade.md) remains unchanged as historical project context.
