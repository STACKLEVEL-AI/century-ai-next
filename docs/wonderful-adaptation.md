# Wonderful-inspired Century website adaptation

This implementation expands the original Century landing into a **26-route website**. It adapts the main page families and editorial composition of [Wonderful](https://www.wonderful.ai/) while preserving the Century identity and existing business contacts. The earlier single-page implementation is historical context; the current scope includes product, industry, company and guide pages.

## Century identity

The primary brand colour is the original Century purple, **`#210DFF`**. The open C mark, Century wordmark, Manrope typography, white and lavender surfaces, and dark charcoal sections form the common design system. Every route shares the same navigation and footer.

Vitali Bakhmat, Vadim Vladymtsev and Egor Krychev retain their existing names, roles, local portraits and profile destinations. Contact links lead to `https://t.me/vitalibakhmat`; the other external profile links are `https://vadimohka.com/` and `https://www.linkedin.com/in/ekrychev/`.

The reference informs page structure, hierarchy and visual rhythm. Century’s pages use original adapted copy, native CSS/SVG illustrations and the repository’s local assets. Wonderful customer logos, testimonials, investors, statistics, certifications, press coverage and job vacancies are not attributed to Century.

## Complete route inventory

All 26 content routes use trailing slashes in the static export. The source registry is `src/lib/routes.ts`; the sitemap is generated from it. Industry and article detail routes have finite static parameters and reject unknown slugs.

| Route | Implemented content |
| --- | --- |
| `/` | Architectural hero; use cases; platform and product family; deployment and strategy; industry selector; sample answer; founders; guides; contact. |
| `/ai-os/` | Platform foundation, infrastructure layer explorer, reusable knowledge and workflow concepts, deployment boundaries and product links. |
| `/agents/` | Knowledge, document and support workflows; agent scope; native capability disclosures; source-linked supplier example; operating ownership. |
| `/systems/` | Requirements-led application design, illustrative review workspace, business functions, implementation and ownership. |
| `/ai-gateway/` | Interactive sample dashboard, reporting periods, team usage, CSV download, model-access and operational-control considerations. |
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
| `/press/` | Company introduction, founder profiles, local SVG wordmark download and media contact. |
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
| Large editorial heroes and alternating section treatments | Shared PageHero and section components, Century purple and typography, local architectural image and original illustrations. |
| Product family with deep supporting pages | AI OS, Agents, Systems and AI Gateway, plus deployment, transformation and security content. |
| Industry pages with outcomes and workflow groups | Seven distinct guides; each has three goals, four detailed workflows, a four-step example, three controls and two related sectors. |
| Company story, careers and media pages | Existing founder information, practical principles, an invitation to introduce yourself and a local brand resource. |
| News and editorial content | Four original practical guides with categories, reading-time labels, article contents and related links. |
| Prominent conversion sections | Existing Telegram contact destination throughout the site and a dedicated contact page. |

Each industry workflow explains its inputs, human review and prepared outcome. The examples support scoping discussions. They do not assert a completed integration, customer deployment or measured result. Clinical, credit, coverage, entitlement, payment and operational decisions stay with the appropriately authorised people in the described processes.

## Real interface behaviour and sample content

The AI Gateway demonstration has working local controls for overview, team usage and control examples, plus 7-, 30- and 90-day reporting periods. The chart, totals, usage rows and downloadable CSV change with the selected period. The data is fixed illustrative data, labelled on the page and in the CSV; there is no live model provider or customer account connection, and the amounts are not a pricing offer.

The infrastructure explorer, deployment phase selector, homepage industry selector and blog category filter change the displayed view locally. They do not send a request to an AI service. Their current selection is held in page memory and is not stored as a browser profile. Static fallback content remains available when JavaScript is disabled.

Workflow details, source excerpts, capability disclosures and mobile navigation use native `details` and `summary` where appropriate. The primary page content is server rendered. Skip links, visible focus styles, semantic headings, responsive layouts and reduced-motion styles are included. Browser-level validation of these behaviours is separate from inspecting the source or a static export.

The supplier-onboarding answer is labelled as sample data and includes inspectable source excerpts. The Systems workspace and industry diagrams are illustrations. Careers does not claim open roles, and Press does not invent media coverage or funding. Security content identifies decisions to agree for an implementation; it does not claim certifications or unconditional compliance.

## Contact, privacy and resources

External contact and founder links open separately with `noopener noreferrer`. The application has no contact form, file upload, embedded chat, analytics tags, advertising pixels, application cookies, local storage or session storage. Ordinary hosting requests and any provider logging are described separately on the privacy page.

Images, interface illustrations, styles, scripts and the brand download are served from the static site. `next/font` bundles Manrope during the build, so the visitor does not fetch the font from Google Fonts. The application does not need a runtime API or server to render the content pages. A user who follows a Telegram, LinkedIn or personal-site link leaves the website and uses that external service.

Each page has a unique title, description, canonical and Open Graph URL under `https://century-ai.eu/`. The shared 1200 × 630 social image is local. The homepage retains its website and webpage structured data; article metadata identifies the individual guide pages.

## Asset provenance

The architectural scene was generated for the earlier homepage adaptation without a reference photograph. It is fictional and does not portray Century’s premises. The original scene and responsive WebP variants remain local in `public/images/`:

| File | Dimensions |
| --- | --- |
| `enterprise-atrium.webp` | 1672 × 941 |
| `enterprise-atrium-960.webp` | 960 × 540 |
| `enterprise-atrium-640.webp` | 640 × 360 |

The scene uses warm architectural lighting. Century purple remains the interface and brand accent. The homepage selects an appropriate image through `picture`, `srcSet` and `sizes`; the contact page reuses the local scene. The three founder photographs remain in `public/founders/`.

Industry scenes, product compositions and article artwork are native code-based illustrations. They use no external photograph or remote image embed. The downloadable wordmark is `public/brand/century-logo.svg`.

The social image at `public/og/century-ai-eu.png` is composed from local assets with Sharp. Regenerate it with `npm run assets:og`, then rebuild to refresh `out/`. This command does not require Chromium or a running web server.

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

The export inspector requires a completed build. It verifies the 26 expected content routes; sitemap coverage; one H1 and English document language per page; unique titles and descriptions; canonical and Open Graph URLs; local links, fragments and asset references; approved external contact/profile destinations; no contact fields; the Gateway sample-data label; the brand-download file; and PNG social-image dimensions. It also scans text outputs for the legacy domain, tracking and bot-connection markers retained from the original site’s boundary checks. It does not claim to validate visual layout, interactive state changes or a live deployment.

The inspector can read an alternative export directory:

```bash
npm run check:export -- /absolute/path/to/export
```

The optional Playwright suite in `tests/landing.spec.ts` has been updated to eight focused cases for the current website: routes and metadata; approved contact destinations and local resources; navigation without JavaScript; keyboard menus, source disclosures and FAQs; product tabs; Gateway period selection and CSV export; and responsive layouts. The updated source passed TypeScript checking, but the browser suite was not executed in the implementation workspace. It remains outside CI. Local execution requires a completed export, Python 3 and Playwright’s Chromium browser.

### Implementation environment note — 4 November 2026

The initial production build in the implementation workspace was blocked by a host RSS-reporting error involving `uv_resident_set_memory`. The hosted preview daemon was also unavailable. These observations limit what could be confirmed in that environment; they do not constitute a successful static export, browser review or production publication. Deployment status must be established from an actual GitHub Actions run and the live Pages site.

## Deployment-only GitHub workflow

The workflow `.github/workflows/nextjs.yml` is named **Deploy Century to GitHub Pages**. It runs on pushes to `main` and manual dispatch with `main` selected. One deployment job performs checkout, Node setup, `npm ci`, `npm run build`, artifact upload from `out/` and GitHub Pages deployment.

There are **no CI test jobs or test steps**, no browser installation or Playwright execution, no standalone typecheck or export-inspection step, and no pull-request verification trigger. `npm ci` still installs the retained development dependencies. Compilation and static export remain part of producing the deployable artifact. The postbuild step packages the domain configuration; it is not a browser or regression suite.

Pages settings must use **GitHub Actions** as the source and retain the `century-ai.eu` custom domain. Generated output is not committed to `main` or published through a separate `gh-pages` branch. Source changes become a confirmed publication only after the deployment succeeds.

The [original implementation plan](superpowers/plans/2026-10-26-century-ai-eu-upgrade.md) remains unchanged as historical project context.
