# Content style

Use clear English on the original routes, fluent formal German on `/de/` routes, natural Polish on `/pl/` routes, idiomatic Ukrainian on `/uk/` routes and fluent formal French on `/fr/` routes. Address German readers as **Sie** and use **KI** for generic artificial intelligence. Address Polish readers directly and keep forms such as **Twój** consistent with the existing copy. Use **ШІ** for generic artificial intelligence in Ukrainian, with consistent direct address. Address French readers as **vous**, use **IA** for generic artificial intelligence and **processus** for workflows, and retain French accents and typographic apostrophes. Translate complete phrases to handle articles and prepositions naturally. Preserve official Century product names in every language. Keep headings concise, describe concrete capabilities and match captions to the visible image or interface. Preserve the meaning and limits of the original claims.

## Display copy

Headings, slogans, hero leads, short card descriptions, photograph captions, application screenshot captions and calls to action omit terminal full stops. Apply the same rule at explicit line breaks within a slogan.

Use a comma or a line break between paired short phrases when a separator helps readability. Keep question marks where the copy asks a question.

Article prose, editorial paragraphs, legal explanations and FAQ answers retain ordinary sentence punctuation. Preserve sentence boundaries inside descriptions with more than one sentence. Do not change punctuation in URLs, email addresses, numbers or technical identifiers.

Update display text at its source, including labels inside SVG diagrams.

English copy and structure are maintained in the source components. German, Polish, Ukrainian and French use the same `messages.json`, `assets.json` and `keep.json` format under `src/locales/{de,pl,uk,fr}/`. The shared compiler generates translated routes, components and SVG diagrams. Keep German nouns capitalized and use the required Polish and Ukrainian grammatical cases for industry names. Translate full dynamic sentences with numbered placeholders rather than joining translated fragments; use field overrides where a name needs different forms. The shared guide-count helper uses each language's plural rules. Run `npm run locales:check` after content edits and update all four catalogs. Do not add untranslated fallback copy or broad keep lists to bypass validation. See [Localization](localization.md) for exact formats and generated paths.

## Names and links

Use the product names Century AI Platform, Century Agents, Century Systems and Century AI Gateway consistently. Keep contact and profile links aligned with [src/lib/site.ts](../src/lib/site.ts).

Navigation labels should identify their destinations. Alternative text should describe useful visual content without repeating the surrounding caption; decorative images use empty alternative text.

## Deployment and AI Transformation

Keep the two pages complementary. AI Transformation explains the shared register, readiness assessment, choice of approach, business case, internal capability and feedback from operation. Deployment starts with an agreed workflow and covers practical delivery, integrations, environment and workflow acceptance, infrastructure and transfer to maintainers. Link between the pages rather than repeating the full method on both.

The five approaches are Agentic, RPA, Chat, Redesign and Human-only. The assessment uses 27 blocks in seven categories; do not invent category names, scoring formulas, readiness percentages or promised returns. Distinguish current capabilities from future plans, and exclude private proposal terms and fundraising material.

Preserve the Wonderful reference composition: full-width photographic heroes, light typography, generous spacing, large photographic cards and numbered disclosure rows. Deployment uses a dark section with three delivery phases. Do not replace these with dashboard panels, dense matrices or a split editorial hero. Use Century's own assets and supported delivery descriptions, not the reference company's team claims, metrics or photographs.

## Brand accents

Keep contact actions neutral: dark text on a white button over dark surfaces or photography, and white text on a dark button over light surfaces. Use outline or text links for secondary actions. Preserve the existing page surfaces, photography and typography.

Use the brand blue `#240CFF` sparingly for focus rings and small functional indicators. A selected state must also be identifiable through a visible border, text or shape; avoid large blue fills.

Closing contact sections are compact rows, with a concise heading and useful context beside a single action. Stack the content naturally on small screens. Do not use a full-height promotional banner, a decorative photograph or a gradient before the footer.

The shared footer brand signature reads `WE LEAVE IN THE AI CENTURY`. Use the `FooterBrand` component: the literal text `WE LEAVE IN THE AI` precedes the CENTURY logo, which supplies the final word. Keep them together as one compact block, with the prefix above the logo on every screen. Do not repeat CENTURY as separate slogan text.

This signature is fixed English brand wording in every locale. Preserve `LEAVE` exactly; do not translate, rephrase or substitute localized content. Keep `translate="no"`, the `notranslate` class, `lang="en"` and `dir="ltr"` on the complete signature. Its accessible name must read the full phrase once, in the same order.

Keep `FooterBrand.tsx` in the locale generator's shared component set, outside translation catalogs. Each footer supplies its localized home URL through the `href` prop; language generation may change this URL but must not change the signature itself.
