# Licensed stock video and homepage structure — 5 November 2026

The homepage now follows the current Wonderful section sequence with Century content and licensed, locally served stock footage. This update replaces the earlier 13-second generated-photo animation. It builds on the existing 26-route site and the latest navigation work on `main`.

## Homepage composition

1. Full-width video hero, centred headline and two actions.
2. A capabilities strip occupying the reference's proof-strip position.
3. A horizontal rail of five square use-case cards, with scroll controls and native links.
4. One large statement explaining the platform, deployment and strategy approach.
5. One Century AI OS section with the existing real application captures.
6. Paired Deployment and AI Strategy image cards.
7. A centred industry introduction, seven horizontal pill tabs and one wide photographic panel.
8. A photographic team section with About Century and Careers cards, plus the three original founder portraits.
9. The shared footer and the existing Telegram contact action.

The separate home product-family, additional screenshot gallery, large founders grid, guide grid and repeated contact panel have been removed from the homepage composition. Their relevant product, company and editorial pages remain available through navigation. The complete founder profiles remain on `/about-us/`. The homepage keeps `#use-cases`, `#platform`, `#how-we-start` and `#contact`, and now includes `#industries` and `#team`.

Reference customer logos, customer outcomes and filmed testimonials are not evidence about Century, so the corresponding positions use Century capabilities and original copy. The main reference's Utilities customer story and proprietary product demos are not treated as interchangeable stock loops. All 26 existing content routes remain present.

## Film selection

The 24-second film follows a progression from enterprise infrastructure to people and then physical operations. Eight clips, three seconds each:

| Timeline | Subject | Source |
| --- | --- | --- |
| 0–3 s | Office campus | [Pexels 33491568](https://www.pexels.com/video/aerial-view-of-modern-office-buildings-33491568/) |
| 3–6 s | Traffic management control room | [Pexels 38779100](https://www.pexels.com/video/high-tech-traffic-management-control-room-38779100/) |
| 6–9 s | Passenger using a phone in an airport | [Pexels 12903813](https://www.pexels.com/video/woman-sitting-in-airport-terminal-12903813/) |
| 9–12 s | Occupied office windows | [Pexels 9674159](https://www.pexels.com/video/view-from-outside-of-people-working-in-offices-9674159/) |
| 12–15 s | Hands typing | [Pexels 6143901](https://www.pexels.com/video/hands-typing-on-a-keyboard-6143901/) |
| 15–18 s | Screen reflected in glasses | [Mixkit Free 221](https://mixkit.co/free-stock-video/reflection-of-a-screen-in-glasses-221/) |
| 18–21 s | Truck on a forest highway | [Pexels 32044530](https://www.pexels.com/video/aerial-view-of-truck-on-forest-highway-32044530/) |
| 21–24 s | Warehouse and trucks | [Pexels 20654633](https://www.pexels.com/video/an-aerial-view-of-a-large-warehouse-with-trucks-20654633/) |

The chosen licences permit free commercial website use and modification without mandatory attribution: [Pexels License](https://www.pexels.com/legal-pages/license/) and [Mixkit Stock Video Free License](https://mixkit.co/license/modal/videoFree/). Credits and source-specific provenance are retained in [stock-video-licenses.md](stock-video-licenses.md) and [stock-video-manifest.json](stock-video-manifest.json). These scenes illustrate the subject matter; they do not identify Century employees, premises or customer deployments.

## Delivery and accessibility

| Asset | Format | Bytes |
| --- | --- | ---: |
| `enterprise-film.mp4` | 1280 × 720, 24 s, H.264 | 2,080,708 |
| `enterprise-film-mobile.mp4` | 540 × 960, 24 s, H.264 | 1,231,864 |
| `hero-poster.webp` | 1280 × 720 WebP | 166,158 |
| `hero-poster-960.webp` | 960 × 540 WebP | 95,770 |
| `hero-poster-640.webp` | 640 × 360 WebP | 44,076 |
| `hero-poster-mobile.webp` | 540 × 960 WebP | 72,752 |

Both films use H.264/yuv420p, 24 fps, faststart and no audio. Mobile framing is adjusted by subject for each scene; it is not a single centre crop of the completed desktop film. Eight 960 × 540 frame extracts live in `public/media/stock/` and provide homepage card images. The posters are the first actual frame of the opening scene. The social image is regenerated from the new poster using the existing wordmark and copy.

`HeroFilm` chooses one media file at mount: mobile at widths up to 640 px, desktop above that. A resize does not download a second film. Reduced motion and Save-Data use the poster, as does a page without JavaScript. A media error restores the poster. Playback pauses when the hero leaves the viewport or the tab is hidden; a visitor's manual pause is retained. A blocked autoplay can be started with the labelled Play button. All files are served from the static export; no visitor request goes to a stock-media provider.

The use-case rail supports touch scrolling, keyboard-accessible links and previous/next controls. The industry tabs retain arrow/Home/End navigation, a single focusable active tab, correct panel labels and seven no-JavaScript fallback links. Each industry uses its corresponding existing photograph, including the separate Insurance asset directory.

## Maintenance

`npm run assets:film` is an optional maintenance command, never a build/deployment step. It requires FFmpeg and ffprobe, reads the committed source manifest, downloads missing source files into a cache, verifies SHA-256, stages the edited films/posters/frame extracts and checks them before replacing production assets. The manifest includes source URLs, authors, trim points, mobile crop centres and published-file hashes. After regenerating any hero asset, update the version in `src/lib/hero-media.ts` to invalidate returning visitors' cached media. `npm run assets:og` refreshes the local social preview after poster changes.

## Verification before publication

- TypeScript validation completed successfully.
- Next.js production compilation and static export completed successfully for the full route inventory.
- The existing optional export inspection passed: 26 content routes and 2,527 local links/assets, including metadata, contact destinations and the real application screenshots.
- Both MP4 files decoded completely: 576 frames each, no audio tracks, no decode errors and no black-frame gaps. Faststart metadata precedes media data.
- All 12 new WebP files decode and match the dimensions and hashes recorded in the manifest.
- The three original founder portraits and six application captures match the baseline Git blob hashes byte-for-byte.
- The latest upstream navigation changes were integrated before the final local build. Deployment workflow, dependency versions, route registry and contact destinations are unchanged.

The local container uses Node 24 and does not expose `/proc` RSS statistics. The local build used a temporary, uncommitted compatibility preload solely for Next.js memory diagnostics; compilation and type validation remained enabled. The published GitHub Pages build uses the repository's existing Node 20 workflow. Browser publication checks and the Actions run establish the live result separately from these local checks. The optional Playwright suite was updated for the new intentional homepage structure but was not run in this environment.
