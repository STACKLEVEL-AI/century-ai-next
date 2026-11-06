# Website localization

Century has **26 content routes in each of five languages: 130 pages**. English retains the original URLs. German, Polish, Ukrainian and French use `/de/`, `/pl/`, `/uk/` and `/fr/`, with identical page structure and stable article and industry slugs. All five versions are exported as static HTML.

The URL selects the language. The native language menu links to the same page in every locale and works without JavaScript. With JavaScript enabled, switching also preserves the query and fragment. No language preference is stored in cookies or browser storage.

## One source, one compiler, one catalog format

Maintain English pages in `src/app/(en)/`, shared components in `src/components/` and content in `src/lib/`. All non-default locales use `scripts/i18n/generate.mjs`. The compiler reads TypeScript syntax trees so user-visible messages are translated while routes, IDs, keyboard commands, CSS, object keys and other code remain stable.

`src/locales/config.json` is the shared registry. It defines native language labels, accessible menu labels, Open Graph locale codes, social-image paths and copy, product SEO titles where needed, guide-count noun forms, legacy-redirect messages and global error-page copy. Runtime helpers, metadata, social-image generation, packaging and export validation read this registry.

| Language | Maintained catalogs | Generated modules | Generated routes | Generated diagrams |
| --- | --- | --- | --- | --- |
| German | `src/locales/de/` | `src/generated/de/` | `src/app/(de)/de/` | `public/media/de/` |
| Polish | `src/locales/pl/` | `src/generated/pl/` | `src/app/(pl)/pl/` | `public/media/pl/` |
| Ukrainian | `src/locales/uk/` | `src/generated/uk/` | `src/app/(uk)/uk/` | `public/media/uk/` |
| French | `src/locales/fr/` | `src/generated/fr/` | `src/app/(fr)/fr/` | `public/media/fr/` |

Generated files are ignored by Git and replaced during generation. Edit maintained sources and catalogs instead. Source discovery excludes every generated locale directory, so translated SVG output can never become the input for another translation. Shared CSS and photographs are reused; locale-specific typography adjustments live in the shared stylesheet.

### Messages

Each `messages.json` groups complete English messages by their real maintained source path, including `(en)` for page sources:

```json
{
  "src/components/HomeIndustries.tsx": {
    "Explore {0}": "Poznaj {0}"
  }
}
```

JSX whitespace is normalized for lookup while intentional spaces between inline elements are preserved in output. String literals retain meaningful whitespace. Dynamic messages use `{0}`, `{1}` and subsequent numbered placeholders for their original expressions. A translation may reorder placeholders but must preserve their complete multiset; missing, duplicated or invented placeholders fail validation. Translate the whole sentence rather than separately translating prefixes and suffixes.

An `@field:English message` entry overrides the ordinary translation only when that message appears in the named object field or JSX attribute. Use it for grammatical context, such as the case of an industry name in a call to action. The compiler keeps technical slugs separate from display labels. German noun capitalization is preserved in dynamic industry labels.

### Diagrams and preserved names

`assets.json` follows the same per-source structure, using paths such as `public/media/century/diagrams/industry-platform.svg`. Keys are decoded visible or accessible SVG text, including nested `tspan` content, titles and descriptions. The same translation validation and SVG fitting logic applies to every locale. Every generated diagram declares its language.

`keep.json` contains explicit per-source arrays of terms deliberately preserved, such as Century product names and technical abbreviations. Do not use it to silence missing ordinary translations. A term cannot be both translated and marked as preserved. Unused catalog entries are rejected so removed or changed source copy cannot silently leave stale translations behind.

Product lockups retain official names. The shared `FooterBrand` component is excluded from translation and always reads **WE LEAVE IN THE AI CENTURY**, with the prefix before the logo. Preserve `LEAVE` exactly and keep `translate="no"`, `notranslate`, `lang="en"` and `dir="ltr"`. Localize its home destination, never its wording.

### Updating content

1. Edit the English source and update the corresponding messages in all four locale catalogs.
2. For grammar-dependent text, use a complete template or a field override. Add deliberate invariants to the relevant source's keep list.
3. Run `npm run locales:check`. Resolve missing or stale entries and placeholder errors.
4. Run `npm run test:i18n`, then build and inspect the export.

All selected locales are fully prepared and validated before generated paths are removed or written. `--check` and `--report` are read-only: they do not create routes, assets, social images or diagnostic files. Normal generation also removes obsolete output from the former Polish and Ukrainian generators.

```bash
npm run localize
npm run locales:check
node scripts/i18n/generate.mjs --locale=uk --check
node scripts/i18n/generate.mjs --report
```

`npm run locales:generate` aliases `localize`. Development, builds and type checks generate all locales automatically. After changing source text while the development server is already running, regenerate translations before inspecting them.

## Metadata, fonts and recovery

Each language has its own root layout, emitting the correct HTML `lang` before hydration. Small generated metadata wrappers bind the shared helper to their locale. Canonicals, Open Graph and Twitter images, and reciprocal `en`, `de`, `pl`, `uk`, `fr` and `x-default` alternates therefore follow one implementation. The sitemap contains all 130 routes with matching language links. Homepage structured data uses the shared WebSite identity and a locale-specific WebPage.

| Language | Social preview |
| --- | --- |
| English | `/og/century-ai-eu.png` |
| German | `/og/century-ai-eu-de.png` |
| Polish | `/og/century-ai-pl.png` |
| Ukrainian | `/og/century-ai-uk.png` |
| French | `/og/century-ai-fr.png` |

Inter includes Latin, Latin Extended, Cyrillic and Cyrillic Extended subsets. The supplied Favorit font does not contain Cyrillic glyphs; Ukrainian platform and industry headings explicitly use Inter at the existing light weight. All translated versions share natural wrapping rules. Keep the established page composition, neutral actions, compact footer and original Century photographs.

Application screenshots remain unmodified and are checked against `docs/app-capture-provenance.json`. Their captions, full-size-link labels and alternative text are localized; screenshot pixels are not redrawn or translated.

Legacy `/ai-os/` routes redirect to `/platform/` in all five languages, preserving query parameters and fragments. Each redirect also has a native destination link. GitHub Pages serves one global `404.html`; it contains separately marked English, German, Polish, Ukrainian and French sections with native homepage links and no JavaScript dependency. The document has one primary heading and `lang="en"`. Local route-level not-found boundaries are also generated.

## Local verification

```bash
npm run test:i18n
npm run locales:check
npm run typecheck
npm run build
npm run check:export
npm run test:e2e
```

The focused Node tests cover compiler regressions, preservation of code tokens, template handling, catalog preflight, URL switching across every locale pair, query and fragment preservation, asset exclusions, metadata, Polish/Ukrainian plural forms and the French singular for zero and one. The export inspector checks every content page, unique metadata within each locale, reciprocal alternates, native language links, local links and fragments, images, screenshot integrity, fixed brand wording, localized diagrams, the sitemap, all five legacy redirects and the global 404.

Browser suites in `tests/landing.spec.ts`, `tests/german-localization.spec.ts` and `tests/localization.spec.ts` cover navigation, guide filters, keyboard-controlled tabs, language switching, pages without JavaScript and narrow layouts. Run these only in a permitted local browser environment.

**CI remains deployment-only.** Validation and browser tests are local tasks; do not add them as GitHub CI jobs or to the deployment build. The existing workflow installs dependencies, generates/builds the static site and publishes it in one deployment job.
