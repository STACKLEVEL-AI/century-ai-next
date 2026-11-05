# Insurance reference layout

The insurance route now has a dedicated component and CSS module based on the visual reference supplied for this change:

- Destination: https://century-ai.eu/industries/insurance/
- Reference inspected on 2026-11-05: https://www.wonderful.ai/industries/insurance
- Component: `src/components/industries/InsurancePage.tsx`
- Styles: `src/components/industries/InsurancePage.module.css`

## Scope

The full-bleed photographic hero, light display typography, dark benefits and workflow sections, white feature rows with hover illustrations, gradient contact section and dark footer follow the reference's geometry. The major layout breakpoints are 1400px and 880px. Tablet feature images become full-width; large-screen illustrations are revealed on hover or keyboard focus. Touch devices show the illustrations without requiring hover.

The announcement and enterprise/customer-logo sections are omitted. Century's existing SVG logos, local navigation, metadata and Telegram contact destination are retained. The shared Header gains an optional `showAnnouncement` prop that defaults to its previous behavior. All other industry routes still render the existing template.

The copy describes Century's existing scope and review process; it does not transfer another company's certifications, customer relationships or deployment claims. The platform illustration is a local SVG with Century and generic system labels. The footer uses Century's available destinations and retains the compact brand treatment already used by this repository.

The reference's tablet workflow container is 200% wide and clips the second column. This implementation keeps the container at 100%, with two columns on tablet and one column on mobile.

## Assets

All runtime resources are local; the page does not call Framer, Wonderful, analytics or external font services.

| Local asset | Source |
| --- | --- |
| `public/media/insurance/hero.webp`, `hero-1600.webp` | `https://framerusercontent.com/images/NQUtNQPJbCeeC92AlGEiZSe1hk.jpg` |
| `public/media/insurance/hero-mobile.webp` | `https://framerusercontent.com/images/ojYDpwmv1NSVu4TJLJyJAaL3Rs4.jpg` |
| `public/media/insurance/workflows.webp` | `https://framerusercontent.com/images/oZXLtxgrzCeEkFV4tFzqQ984Ws.jpg` |
| `public/media/insurance/dark-gradient.webp` | `https://framerusercontent.com/images/93SjXd7ceCNvJA26xK3NXv1Nw2I.jpg` |
| `public/media/insurance/frontier-ai.png` | `https://framerusercontent.com/images/eZqLuOS8wrBA76wZ3yocvgOMbc.png` |
| `public/media/insurance/audit-ready.png` | `https://framerusercontent.com/images/sjdGl9GgQDXltDKzEQCUIe9Nrc.png` |
| `public/media/insurance/deployment-partner.png` | `https://framerusercontent.com/images/r73exevuIawKa2YybBdS1hJNrZ8.png` |
| `public/fonts/insurance-favorit-light.woff2` | `https://framerusercontent.com/assets/2O2V4KBfbMelLnYAtnns4e43LI.woff2` |
| `public/media/insurance/platform.svg` | Native vector illustration created for Century; no embedded third-party branding. |

Photographs are encoded as WebP with a dedicated mobile hero and desktop source set. Diagram PNGs retain their original bytes. Photo alt text describes the actual insurance scenes, correcting stale airline descriptions in the reference.

## Validation

- `npm run build` compiles and statically exports the site.
- `npm run typecheck` checks the TypeScript sources.
- `npm run check:export` checks all 26 content routes, unique metadata, local destinations/assets, sitemap, contact destinations and existing application screenshots.
- The managed preview daemon is unavailable in this workspace, so local browser QA is unavailable. Deployment and live browser observations are recorded in the associated change report.

The local build environment lacks Node's `uv_resident_set_memory` syscall. Only the ignored local Next diagnostic was guarded for that specific error, as documented in the earlier internal-pages work. Dependency files and the deployment workflow are unchanged; GitHub Actions builds with the normal dependencies.
