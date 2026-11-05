# Content style

Use clear English on the original routes and fluent formal German on `/de/` routes. Address German readers as **Sie** and use **KI** for generic artificial intelligence. Keep headings concise, describe concrete capabilities and match captions to the visible image or interface. Preserve the meaning and limits of the original claims.

## Display copy

Headings, slogans, hero leads, short card descriptions, photograph captions, application screenshot captions and calls to action omit terminal full stops. Apply the same rule at explicit line breaks within a slogan.

Use a comma or a line break between paired short phrases when a separator helps readability. Keep question marks where the copy asks a question.

Article prose, editorial paragraphs, legal explanations and FAQ answers retain ordinary sentence punctuation. Preserve sentence boundaries inside descriptions with more than one sentence. Do not change punctuation in URLs, email addresses, numbers or technical identifiers.

Update display text at its source, including labels inside SVG diagrams.

English copy and structure are maintained in the source components; German copy is maintained in `src/locales/de/`. The build generates the German modules, diagrams and social image. Keep German nouns capitalized in dynamic labels and use complete messages when sentence fragments would require different grammar. Run `npm run locales:check` after a content edit; do not add untranslated fallback text to pass the check.

## Names and links

Use the product names Century AI Platform, Century Agents, Century Systems and Century AI Gateway consistently. Keep contact and profile links aligned with [src/lib/site.ts](../src/lib/site.ts).

Navigation labels should identify their destinations. Alternative text should describe useful visual content without repeating the surrounding caption; decorative images use empty alternative text.

## Brand accents

Use the brand blue `#240CFF` for primary contact actions and selected interface states. Keep the existing neutral page surfaces, photography and typography. Use white text on blue fills; on dark surfaces, pair blue controls with a light boundary and a visible focus state.

The shared footer slogan is `WE LEAVE IN THE AI CENTURY`, with a line break before `AI CENTURY`. Preserve this supplied wording exactly.
