# Century — Wonderful design migration

## Goal and fixed requirements

Move the existing Century website towards the current visual language and product narrative of https://www.wonderful.ai/, preserving Century, its three founders, their photographs, roles and verified contact destinations. Use the two Century SVG wordmarks supplied for this task. Complete the work in small stages, validate it, merge to `main`, and verify the existing GitHub Pages deployment.

Baseline: `952d1562140eb9b5a93a7cd425c9cd2822b88d99` on `main`. Working branch: `design/wonderful-century-2026-11-04`.

## Reference audit — 4 November 2026

The current reference presents an enterprise AI operating layer, agents, systems, AI gateway, deployment and strategy. Its visual system uses full-bleed moving imagery, white and near-black sections, large light headings, restrained borders, round buttons and photographic editorial cards. The old Century purple and lavender treatment does not match this direction.

Observed reference typography: ABC Favorit Light for headings; Inter for body and buttons. Use Inter locally for the new Century system rather than introducing an unlicensed commercial font dependency. Keep text, layouts and code maintainable in the existing Next.js project.

Preserve the existing 26-route structure and functioning product examples. Adapt reference ideas into original Century copy. Wonderful's customer relationships, funding, certifications and performance figures do not establish equivalent facts about Century and are not transferred. Reference media used as design assets must be served locally and documented below.

## Small stages

- [x] Audit source, route inventory, reference design and existing deployment.
- [x] Create this progress file and isolated working branch.
- [ ] Apply supplied wordmarks and shared typography, colours, navigation and footer.
- [ ] Recompose the homepage: cinematic hero, use cases, platform, deployment, strategy, industries and founders.
- [ ] Carry the design through product, industry and company pages.
- [ ] Refresh metadata, social preview, press resources and project documentation.
- [ ] Build and inspect the static export; check desktop/mobile and key interactions.
- [ ] Review the diff, publish the branch, merge to `main`, verify deployment and present the result.

## Validation record

Pending implementation. Checks are recorded with actual results, not inferred from source changes.

## Asset provenance

- Century black and white wordmarks: SVG files attached by the user in this task.
- Founder portraits and profile URLs: preserved from the baseline repository.
- Reference media: to be recorded with exact source URLs and local output paths if used.

## Checkpoints

1. Source and reference audited; dependencies installed; existing 26 routes and their interactions retained as the baseline.
