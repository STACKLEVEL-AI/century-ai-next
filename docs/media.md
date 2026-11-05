# Media maintenance

Website media is served locally from `public/`.

| Location | Contents |
| --- | --- |
| `public/brand/` | Century wordmarks and symbol |
| `public/founders/` | Founder photographs |
| `public/media/app/` | Application captures |
| `public/media/century/photos/` | Page photography and responsive variants |
| `public/media/century/diagrams/` | SVG diagrams |
| `public/media/stock/` | Stock-video scene frames |
| `public/media/`, `public/images/` | Additional page imagery, video and posters |
| `public/og/` | Social preview |

## Images and captures

Keep image dimensions, responsive sources and crop positions aligned with their component settings. Use descriptive alternative text for meaningful images and empty alternative text for decorative images. Each photograph should occupy at most one content slot on a page; responsive variants belong to the same slot.

Application capture dimensions and captions are defined in [src/lib/app-captures.ts](../src/lib/app-captures.ts). The [capture inventory](app-capture-provenance.json) records the files and their checksums. Preserve their aspect ratios and keep full-size links available.

## Homepage video

[HeroFilm](../src/components/HeroFilm.tsx) selects one desktop or mobile file on page load. The silent film plays inline in a loop. A local poster remains visible when JavaScript is unavailable, playback fails, reduced motion is enabled or the browser requests data saving.

The stock montage contains eight scenes and runs for 24 seconds. Its sources, cuts, crop points and file details are recorded in [stock-video-manifest.json](stock-video-manifest.json). Keep the [source credits and licenses](stock-video-licenses.md) with this manifest.

To rebuild the video, posters and scene frames, install FFmpeg and ffprobe, then run:

```bash
npm run assets:film
```

The command reads the stock manifest and caches source clips locally. Use `npm run assets:film -- --help` for options. Update the media version in [src/lib/hero-media.ts](../src/lib/hero-media.ts) when replacing the hero files.

## Social preview

To update the 1200 × 630 social preview from the current hero poster and Century wordmark:

```bash
npm run assets:og
```

Both asset commands are optional maintenance operations outside the build and deployment workflow. Review updated files and rebuild the static export before publishing them.
