# English, German and Polish website

The public website has 26 English content pages at their existing URLs, 26 German counterparts under `/de/` and 26 Polish counterparts under `/pl/`: **78 content pages** in total. Article and industry slugs stay stable. The platform uses `/platform/`, `/de/platform/` and `/pl/platform/`; the corresponding legacy `/ai-os/` URLs redirect to these pages while preserving query parameters and fragments.

The language selector contains native links to the equivalent page in all three languages and identifies the current language. With JavaScript enabled, switching also preserves the current query and fragment. The links and translated content work without JavaScript. Language comes from the URL; the site does not store a preference in cookies or browser storage.

## Shared sources and generation

English route sources live in `src/app/(en)/`. Shared components and content remain in `src/components/` and `src/lib/`. German and Polish have separate maintained translation catalogs over those same sources. Changes to structure or behavior therefore apply to all three versions.

`npm run localize` runs the German generator, then the Polish generator. `npm run locales:generate` invokes the same task. Both generators translate text literals and JSX text using the TypeScript syntax tree, keep structural keys and IDs stable, and map internal links and SVG assets to their localized destinations. Both server and client components receive translated source before compilation; the static HTML already contains the requested language.

| Language | Maintained catalogs | Generated modules | Generated routes |
| --- | --- | --- | --- |
| German | `src/locales/de/` | `src/generated/de/` | `src/app/(de)/de/` |
| Polish | `translations/pl/` | `src/localized/pl/` | `src/app/(pl)/pl/` |

Generated directories, translated SVG output in `public/media/de/` and `public/media/pl/`, and localized social images are ignored by Git. Edit the source and catalogs, then regenerate. `npm run dev`, `npm run build` and `npm run typecheck` run generation automatically. If editing English copy while the development server is already running, run `npm run localize` again.

### German catalogs

The catalogs in `src/locales/de/` group complete English messages by subject:

| Catalog | Content |
| --- | --- |
| `site.json` | Shared interface and company-page copy |
| `articles.json` | Guides, categories and article interface |
| `industries.json` | Industry pages, labels and diagrams |
| `platform.json` | Platform, product and deployment copy |
| `contexts.json` | Translations that depend on the source file |

The generator chooses catalogs according to the source file and falls back across the other subject catalogs. `contexts.json` takes precedence for translations with a particular context; its file paths are relative to `src/`. Preserve intentional whitespace in template fragments and prefer complete messages where grammar permits. German uses formal **Sie**, **KI** for generic artificial intelligence, and capitalized nouns. Official Century product names remain unchanged.

### Polish catalogs

| Catalog | Content |
| --- | --- |
| `pages.json` | Page copy and shared interface components |
| `content.json` | Articles, industries, navigation and media descriptions |
| `components.json` | Product, platform and industry components |
| `assets.json` | Visible and accessible text inside SVG diagrams |
| `fields.json` | Translations that depend on the object field's grammatical context |
| `keep.json` | Explicitly preserved product names, proper names, technical labels and structural tokens |

Polish catalog keys use the original logical source path, such as `src/app/about-us/page.tsx`, without the `(en)` route group. JavaScript string and template-fragment keys are exact, including meaningful spaces. JSX text keys have whitespace collapsed. SVG keys contain decoded XML text. Empty translations are allowed when Polish grammar removes an English sentence fragment. A key such as `@ctaLabel:utilities` overrides the translation only for that field; this handles grammatical cases without changing a technical key or another use of the same word.

The Polish generator reports missing display strings in `.localizations/untranslated.json`. Add a translation, or deliberately preserve the term in `keep.json`. Check context when translating short labels, article categories and template fragments. Industry operation and CTA labels use the Polish locative after `w`; audience labels use the nominative plural. Blog result counts use Polish plural rules in the shared `guideCountLabel` helper.

### Updating content

Edit the English source and update the affected German and Polish catalogs. Run `npm run locales:check` to validate both catalogs without generating files. Missing display translations stop generation; resolve the reported strings or intentional invariants before building. Avoid editing generated output, which is replaced on the next generation run. Follow [Content style](content-style.md) for display punctuation, claims, names and alternative text.

## Metadata, design and error pages

Independent root layouts emit the correct document language during the static build. Shared metadata helpers provide language-specific canonical URLs, reciprocal `en`, `de`, `pl` and `x-default` alternates, matching Open Graph locales and both other locales as alternatives. The sitemap includes all 78 routes with the same reciprocal language links. Homepage structured data uses one shared `WebSite` identity with all three languages and a localized `WebPage` for each homepage.

Social previews use `og/century-ai-eu.png` for English, `og/century-ai-eu-de.png` for German and `og/century-ai-pl.png` for Polish. Local fonts support the required German and Polish characters. Existing product screenshots remain authentic; captions, full-size-link labels and alternative text are translated. SVG diagrams receive localized visible and accessible text. The supplied footer slogan `WE LEAVE IN THE AI CENTURY` is preserved exactly in all three languages and marked with `lang="en"`.

GitHub Pages serves one `404.html` for unknown URLs. `src/app/global-not-found.tsx` provides English, German and Polish messages and homepage links without depending on JavaScript. The document has `lang="en"`, one English primary heading and separately marked German and Polish sections. Localized route-level not-found boundaries are also generated. The Next.js `globalNotFound` option supports the multiple root layouts.

## Local checks

Run these commands locally against a production static export:

```bash
npm run locales:check
npm run typecheck
npm run build
npm run check:export
npm run test:e2e
```

The export inspector checks every content route, unique metadata within each language, reciprocal alternates, social images, native language links, local links/assets and fragments, screenshot accessibility, translated SVG descriptions and image alternative text. It also checks the sitemap, all three legacy platform redirects and the trilingual global 404.

The browser suites remain separate:

| Suite | Coverage |
| --- | --- |
| `tests/landing.spec.ts` | English navigation, content, interactions, responsive behavior and the global 404 |
| `tests/german-localization.spec.ts` | German navigation and guide filters, keyboard interaction, language switching, content without JavaScript and all German routes at narrow widths |
| `tests/localization.spec.ts` | Static HTML and metadata for all 78 pages; Polish navigation, filters, keyboard interactions and responsive pages at 320, 390 and 768 pixels; switching among all three languages |

The browser suites run locally against the production static export. English regression tests continue to use the existing public URLs.
