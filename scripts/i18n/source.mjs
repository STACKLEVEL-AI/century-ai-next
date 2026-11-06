/** Maintained-source inventory shared by extraction, validation and generation. */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import ts from "typescript";

export const sharedFiles = new Set([
  "src/components/Document.tsx", "src/components/LanguageSwitcher.tsx",
  "src/components/FooterBrand.tsx", "src/lib/i18n.ts", "src/lib/routes.ts",
]);
export const boundFiles = new Set(["src/lib/locale.ts", "src/lib/metadata.ts"]);
const textAttributes = new Set([
  "alt", "aria-label", "aria-description", "title", "placeholder", "label",
  "description", "eyebrow", "caption", "children", "text", "heading",
  "contactTitle", "operationLabel", "summary",
]);
const textProperties = new Set([
  "title", "seoTitle", "description", "label", "labels", "caption", "alt",
  "role", "profileLabel", "link", "text", "question", "answer", "headline",
  "eyebrow", "focus", "owner", "tags", "intro", "stages", "detail", "steps",
  "outcome", "work", "output", "decision", "short", "points", "category",
  "categories", "readingTime", "paragraphs", "location", "snippet",
  "goalsTitle", "summary", "inputs", "review", "processTitle", "processContext",
  "controlIntro", "reference", "workflowAlt", "operationLabel", "audience",
  "heroDescription", "whyIntro", "ctaLabel", "contactTitle", "PAGE_TITLE",
  "PAGE_DESCRIPTION", "name", "heading", "subtitle", "goals", "controls",
  "benefitsTitle", "whyTitle", "footerTagline",
]);
const codeProperties = new Set([
  "brandLabel", "slug", "id", "relatedSlugs", "icon", "cover", "capture",
  "current", "variant", "headerVariant", "backdrop", "tone", "illustration",
  "visual", "type", "kind", "symbol", "src", "image", "imageSrc", "href",
  "srcSet", "position", "media", "sizes", "className", "target", "rel",
  "download", "code", "hero", "heroSmall", "heroMobile", "workflow",
  "heroPosition", "heroMobilePosition", "workflowPosition", "fill", "stroke",
  "inLanguage", "canonical", "url", "width", "height", "fontFamily",
  "objectPosition", "display", "variable", "subsets", "style", "styles",
  "background", "backgroundImage", "color", "fontSize", "fontWeight",
  "textAlign", "alignItems", "justifyContent", "flexDirection", "overflow",
  "border", "borderRadius", "gridTemplateColumns", "gap", "padding", "margin",
  "behavior", "block", "inline", "method", "credentials", "headers", "version",
]);
const codeCalls = /(?:^|\.)(?:querySelector(?:All)?|closest|matches|matchMedia|addEventListener|removeEventListener|setProperty|removeProperty|getAttribute|setAttribute|createElement|padStart|padEnd|setOrientation)$/;
const comparisonKinds = new Set([
  ts.SyntaxKind.EqualsEqualsToken, ts.SyntaxKind.EqualsEqualsEqualsToken,
  ts.SyntaxKind.ExclamationEqualsToken, ts.SyntaxKind.ExclamationEqualsEqualsToken,
]);

export const slash = value => value.split(path.sep).join("/");
export const normalize = value => value.replace(/\s+/g, " ").trim();
export const nameOf = node => node && (ts.isIdentifier(node) || ts.isStringLiteral(node)) ? node.text : "";
export function decodeEntities(value) {
  const entities = { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " " };
  return value.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi, (match, entity) => {
    if (!entity.startsWith("#")) return entities[entity.toLowerCase()] ?? match;
    const hex = entity[1].toLowerCase() === "x";
    const codepoint = Number.parseInt(entity.slice(hex ? 2 : 1), hex ? 16 : 10);
    return codepoint <= 0x10ffff ? String.fromCodePoint(codepoint) : match;
  });
}
export const encodeXml = value => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const groups = await Promise.all(entries.sort((a, b) => a.name.localeCompare(b.name, "en")).map(entry => {
    const filename = path.join(directory, entry.name);
    return entry.isDirectory() ? filesIn(filename) : [filename];
  }));
  return groups.flat();
}

export async function sourceFiles(root) {
  return (await Promise.all(["src/app/(en)", "src/components", "src/lib"].map(folder => filesIn(path.join(root, folder)))))
    .flat().map(filename => slash(path.relative(root, filename)))
    .filter(filename => /\.tsx?$/.test(filename) && !sharedFiles.has(filename)).sort();
}

export function parseSource(filename, source) {
  return ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, filename.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
}

/** Code tokens must never depend on a translator preserving their spelling. */
export function semanticContext(node) {
  for (let current = node; current.parent; current = current.parent) {
    const parent = current.parent;
    if ((ts.isPropertyAssignment(parent) || ts.isPropertySignature(parent) || ts.isMethodDeclaration(parent)) && parent.name === current) return "code";
    if (ts.isCaseClause(parent) || ts.isImportDeclaration(parent) || ts.isExportDeclaration(parent) || ts.isImportTypeNode(parent)) return "code";
    if (ts.isElementAccessExpression(parent) && parent.argumentExpression === current || ts.isIndexedAccessTypeNode(parent)) return "code";
    if (ts.isLiteralTypeNode(parent)) {
      let type = parent;
      while (type && !ts.isTypeAliasDeclaration(type)) type = type.parent;
      return type?.name.text === "ArticleCategory" ? "text" : "code";
    }
    if (ts.isJsxAttribute(parent)) return textAttributes.has(nameOf(parent.name)) ? "text" : "code";
    if (ts.isBinaryExpression(parent) && comparisonKinds.has(parent.operatorToken.kind)) {
      return /\bcategory\b/.test(parent.getText()) ? "text" : "code";
    }
    if (ts.isCallExpression(parent)) {
      const call = parent.expression.getText();
      if (codeCalls.test(call) || parent.arguments.some(argument => /\.key$/.test(argument.getText()))) return "code";
      // Explicit literal unions represent state identifiers; their spelling
      // must continue matching the type and the corresponding event branches.
      if (/(?:^|\.)useState$/.test(call) && parent.typeArguments?.some(type => ts.isLiteralTypeNode(type) || ts.isUnionTypeNode(type) && type.types.every(ts.isLiteralTypeNode))) return "code";
      if (/(?:^|\.)(?:pageMetadata|homeMetadata)$/.test(call)) return parent.arguments.indexOf(current) < 2 ? "text" : "code";
    }
    if (ts.isPropertyAssignment(parent)) {
      const name = nameOf(parent.name);
      if (codeProperties.has(name) || /^(?:--|@)/.test(name) || /(?:Href|Src|ClassName|Position|Style)$/.test(name)) return "code";
      if (textProperties.has(name)) return "text";
    }
    if (ts.isBindingElement(parent) || ts.isParameter(parent) || ts.isVariableDeclaration(parent)) {
      const name = nameOf(parent.name);
      if (codeProperties.has(name) || /(?:className|styles|SourceSet|Id|Url|Path|ClassName|SITE_URL|SITE_LANGUAGE|LOCALE|TELEGRAM_URL|CONTACT_EMAIL)$/.test(name)) return "code";
      if (textProperties.has(name)) return "text";
    }
    if (ts.isJsxExpression(parent) && !ts.isJsxAttribute(parent.parent)) return "text";
  }
  return "unknown";
}

export function fieldOf(node) {
  for (let current = node; current.parent; current = current.parent) {
    const parent = current.parent;
    if (ts.isPropertyAssignment(parent) || ts.isJsxAttribute(parent)) return nameOf(parent.name);
    if (ts.isVariableDeclaration(parent) || ts.isStatement(parent)) return "";
  }
  return "";
}

export function templateMessage(node) {
  return node.head.text + node.templateSpans.map((span, index) => `{${index}}${span.literal.text}`).join("");
}

export function messageForNode(node, source) {
  const jsx = ts.isJsxText(node);
  if (!jsx && !ts.isStringLiteral(node) && !ts.isNoSubstitutionTemplateLiteral(node) && !ts.isTemplateExpression(node)) return null;
  const key = jsx ? normalize(decodeEntities(node.text))
    : ts.isTemplateExpression(node) ? templateMessage(node)
    : ts.isJsxAttribute(node.parent) ? decodeEntities(node.text) : node.text;
  if (!/\p{L}/u.test(key)) return null;
  const context = jsx ? "text" : semanticContext(node);
  if (context === "code" || /^(?:https?:|mailto:|tel:|\/|@\/|#|use client$|use server$)/.test(key)) return null;
  // Unclassified copy is required, including one-word, lowercase labels.
  // New data fields cannot silently opt themselves out of localization.
  if (context === "unknown" && (/[{}<>]|\.(?:png|webp|svg|jpe?g|woff2?|mp4|css)\b|(?:\d(?:px|vw|vh)|calc\()/.test(key))) return null;
  return { key, field: fieldOf(node), node, line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1 };
}

export function messagesInSource(filename, source) {
  if (boundFiles.has(filename)) return [];
  const tree = parseSource(filename, source);
  const result = [];
  function visit(node) {
    const message = messageForNode(node, tree);
    if (message) result.push(message);
    // Fragments are one message, but nested expressions may themselves contain
    // display text (e.g. a translated conditional inside a sentence).
    if (ts.isTemplateExpression(node)) {
      for (const span of node.templateSpans) visit(span.expression);
    } else ts.forEachChild(node, visit);
  }
  visit(tree);
  return result;
}

/** Translate text nodes, including nested tspans, without changing SVG markup. */
export function svgMessages(source) {
  const stack = [];
  const messages = [];
  const tokens = /<!--[\s\S]*?-->|<!\[CDATA\[[\s\S]*?\]\]>|<[^>]+>|[^<]+/g;
  for (const match of source.matchAll(tokens)) {
    const token = match[0];
    if (token.startsWith("<!--") || token.startsWith("<?") || token.startsWith("<!")) continue;
    if (token.startsWith("</")) { stack.pop(); continue; }
    if (token.startsWith("<")) {
      if (!token.endsWith("/>")) stack.push(token.match(/^<([\w:-]+)/)?.[1]);
      continue;
    }
    if (!stack.some(tag => ["text", "tspan", "title", "desc"].includes(tag))) continue;
    const key = normalize(decodeEntities(token));
    if (/\p{L}/u.test(key)) messages.push({ key, start: match.index, end: match.index + token.length, before: token.match(/^\s*/)[0], after: token.match(/\s*$/)[0] });
  }
  return messages;
}

export async function assetSources(root, localeCodes) {
  const generated = new Set(localeCodes);
  const result = new Map();
  for (const absolute of await filesIn(path.join(root, "public/media"))) {
    const filename = slash(path.relative(root, absolute));
    if (!filename.endsWith(".svg") || generated.has(filename.split("/")[2])) continue;
    const content = await readFile(absolute, "utf8");
    const messages = svgMessages(content);
    if (messages.length) result.set(filename, { content, messages });
  }
  return result;
}
