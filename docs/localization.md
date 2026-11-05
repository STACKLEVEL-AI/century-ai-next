# English and Polish website

The public website has 26 English content pages at their existing URLs and 26 Polish counterparts under `/pl/`. Article and industry slugs stay stable. The platform uses `/platform/` and `/pl/platform/`; legacy `/ai-os/` and `/pl/ai-os/` URLs redirect to the corresponding page, preserving query parameters and fragments. The language selector links to the corresponding page in either language. It does not store a preference in cookies or browser storage.

## Source and generation

English route sources live in `src/app/(en)/`. Shared components and content remain in `src/components/` and `src/lib/`. Polish copy lives in `translations/pl/`:

| Catalog | Content |
| --- | --- |
| `pages.json` | Page copy and shared interface components |
| `content.json` | Articles, industries, navigation and media descriptions |
| `components.json` | Product, platform and industry components |
| `assets.json` | Visible and accessible text inside SVG diagrams |
| `fields.json` | Translations that depend on the object field's grammatical context |
| `keep.json` | Explicitly preserved product names, proper names, technical labels and structural tokens |

`npm run localize` uses the TypeScript syntax tree to produce Polish components in `src/localized/pl/` and routes in `src/app/(pl)/pl/`. The generator translates text literals and JSX text, keeps structural keys and IDs stable, and maps internal links and localized SVG assets to their Polish destinations. Both server and client components receive translated source before compilation; the browser never replaces an English page with Polish text after loading.

Generated directories, translated SVG output and the Polish social image are ignored by Git. Edit the source and catalogs, then regenerate. `npm run dev`, `npm run build` and `npm run typecheck` run generation automatically. If editing English copy while the development server is already running, run `npm run localize` again.

Catalog keys use the original logical source path, such as `src/app/about-us/page.tsx`, without the `(en)` route group. JavaScript string and template-fragment keys are exact, including meaningful spaces. JSX text keys have whitespace collapsed. SVG keys contain decoded XML text. Empty translations are allowed when Polish grammar removes an English sentence fragment. A key such as `@ctaLabel:utilities` overrides the translation only for that field; this handles grammatical cases without changing a technical key or another use of the same word.

The generator stops when it detects display copy without a translation or an explicit keep entry, and writes the missing strings to `.localizations/untranslated.json`. Add a translation, or deliberately preserve the term in `keep.json`. Check context when translating short labels, article categories and template fragments. In particular, industry operation and CTA labels use the Polish locative after `w`; audience labels use the nominative plural. Blog result counts use Polish plural rules in the shared `guideCountLabel` helper.

## Metadata, design and error pages

Independent root layouts emit the correct document language during the static build. Shared metadata helpers provide language-specific canonical URLs, reciprocal `en`, `pl` and `x-default` alternates, Open Graph locales and local social images. The sitemap includes both languages with the same alternates. Fonts support Polish diacritics. Existing product screenshots remain authentic; their captions and alternative text are translated. The supplied brand slogan `WE LEAVE IN THE AI CENTURY` is preserved exactly in both languages and marked with `lang="en"`.

GitHub Pages serves one `404.html` for unknown URLs. `src/app/global-not-found.tsx` therefore provides both Polish and English messages and homepage links, without depending on JavaScript. Localized route-level not-found boundaries are also generated. The Next.js `globalNotFound` option supports the multiple root layouts.

## Validation

```bash
npm run typecheck
npm run build
npm run check:export
npm run test:e2e
```

The export inspector checks all 52 routes, metadata, language alternates, the language selector, local links/assets and anchors, screenshot labels and the bilingual 404. Browser tests cover Polish navigation and language switching without JavaScript, responsive layouts, blog filters and interactive platform sections. English regression tests continue to use the existing public URLs.
