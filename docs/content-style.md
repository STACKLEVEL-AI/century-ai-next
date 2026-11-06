# Content style

Use clear English on the original routes, fluent formal German on `/de/` routes, natural Polish on `/pl/` routes, idiomatic Ukrainian on `/uk/` routes, fluent formal French on `/fr/` routes, standard Belarusian on `/be/` routes, natural Italian on `/it/` routes, natural European Spanish on `/es/` routes, professional Serbian in Latin script and ekavica on `/sr/` routes and natural professional Dutch on `/nl/` routes. Address German readers as **Sie** and use **KI** for generic artificial intelligence. Address Polish readers directly and keep forms such as **Twój** consistent with the existing copy. Use **ШІ** for generic artificial intelligence in Ukrainian and Belarusian, with consistent direct address. Address French readers as **vous**, use **IA** for generic artificial intelligence and **processus** for workflows, and retain French accents and typographic apostrophes. Translate complete phrases to handle articles and prepositions naturally. Belarusian uses standard orthography, plural imperatives and lowercase **вы/ваш**; prefer **даныя**, **працоўны працэс**, **разгортванне**, **кіраванне** and **дапаможнік**. For Belarusian, keep full personal names in their official source spelling. In Italian, use **IA** for generic artificial intelligence, **flusso di lavoro** for workflow and consistent direct address. Address Spanish readers consistently as **tú/tu**, use **IA** in ordinary prose, **flujos de trabajo** for workflows, **gobernanza** for governance and **responsabilidad** for ownership. Use **Implantación** for the delivery page and **despliegue** for technical installation and the deployment guide category. Keep Spanish accents and opening question marks; retain official product and personal names. Address Dutch readers consistently as lowercase **u/uw** and use **AI**, with the terminology below. Preserve official Century product names in every language. Keep headings concise, describe concrete capabilities and match captions to the visible image or interface. Preserve the meaning and limits of the original claims.

## Display copy

Headings, slogans, hero leads, short card descriptions, photograph captions, application screenshot captions and calls to action omit terminal full stops. Apply the same rule at explicit line breaks within a slogan.

Use a comma or a line break between paired short phrases when a separator helps readability. Keep question marks where the copy asks a question.

Article prose, editorial paragraphs, legal explanations and FAQ answers retain ordinary sentence punctuation. Preserve sentence boundaries inside descriptions with more than one sentence. Do not change punctuation in URLs, email addresses, numbers or technical identifiers.

Update display text at its source, including labels inside SVG diagrams.

English copy and structure are maintained in the source components. German, Polish, Ukrainian, French, Belarusian, Italian, Spanish, Serbian and Dutch use the same `messages.json`, `assets.json` and `keep.json` format under `src/locales/{de,pl,uk,fr,be,it,es,sr,nl}/`. The shared compiler generates translated routes, components and SVG diagrams. Keep German nouns capitalized and use the required Polish, Ukrainian, Belarusian and Serbian grammatical cases for industry names. Translate full dynamic sentences with numbered placeholders rather than joining translated fragments; use field overrides where a name needs different forms. The shared guide-count helper uses each language's plural rules. Run `npm run locales:check` after content edits and update all nine catalogs. Do not add untranslated fallback copy or broad keep lists to bypass validation. See [Localization](localization.md) for exact formats and generated paths.

## Names and links

Use the product names Century AI Platform, Century Agents, Century Systems and Century AI Gateway consistently. Keep contact and profile links aligned with [src/lib/site.ts](../src/lib/site.ts).

Navigation labels should identify their destinations. Alternative text should describe useful visual content without repeating the surrounding caption; decorative images use empty alternative text.

## Ukrainian terminology

Use **Впровадження** for the Deployment page, its navigation links and the full delivery process. Reserve **розгортання** for technical installation and infrastructure, including the deployment-planning guide category. Keep the governance stage of the platform cycle consistent as **управління й контроль**; the short **Безпека й управління** section label may stay concise.

Translate answer citations as **посилання на джерела**, not **цитати**, unless the text specifically describes quoted passages. Keeping people in control means that control remains with people. In insurance, distinguish claims for payment from requirements, and insurance policies from internal rules. Check industry names in their complete rendered sentence; use field overrides when audience and sector labels need different wording.

## Serbian terminology

Use natural professional Serbian in Latin script and ekavica, with consistent plural imperatives and lowercase **vi/vaš**. Preserve Serbian diacritics. Use **AI** for generic artificial intelligence, **radni tok** for workflow, **upravljanje i nadzor** for governance, **odgovornost** for process ownership and **vodič** for guide. Keep official Century product names and personal names unchanged; restructure phrases where needed to avoid an unnatural grammatical case.

Use **Uvođenje** for the Deployment delivery page and **Postavljanje** for technical installation and the deployment guide category. Distinguish internal **pravila** from insurance **polise**, insurance **odštetni zahtevi** from airline **zahtevi za naknadu**, and staff review from AI-agent activity. Keep professional responsibility and the original limits of permissions and human review explicit. Industry names must fit the complete rendered sentence, using field overrides where needed.

## Dutch terminology

Use professional Dutch with consistent lowercase **u/uw** address. Translate complete phrases and read split headings as one sentence. Keep official Century product names, personal names and technical abbreviations intact.

| Concept | Dutch wording |
| --- | --- |
| Artificial intelligence | **AI** |
| Workflow / workflows | **werkproces / werkprocessen** |
| Governance | **governance** |
| Ownership or accountability | **verantwoordelijkheid** |
| Deployment page and navigation | **Implementatie** |
| Technical deployment and deployment guide category | **uitrol / Uitrol** |
| AI Transformation | **AI-transformatie** |
| Guides | **Gidsen** |
| Answer citations | **bronverwijzingen** |
| Permissions | **toegangsrechten** |
| Business case | **businesscase** |

Guide categories are **Eerste stappen**, **Kennis**, **Werkprocessen** and **Uitrol**. Use **1 gids** and **0/2+ gidsen**, preserving the category label and curly single quotes in phrases such as **1 gids in de categorie ‘Kennis’**. Check articles and number in full industry sentences, using contextual field overrides for sector and audience labels. Distinguish insurance **polis** from internal **beleid** and preserve every limit on human decisions, access and deployment.

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
