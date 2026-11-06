/**
 * Generate statically rendered German routes from the maintained English UI.
 * The TypeScript AST distinguishes display copy from IDs, classes and slugs.
 * Translation catalogs are reviewed source files; generated files are disposable.
 */
import { readFile, writeFile, readdir, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import ts from "typescript";
import { createOpenGraph } from "./create-og.mjs";
import { fitLocalizedSvg } from "./localized-svg.mjs";

const root = process.cwd();
const sourceRoot = path.join(root, "src");
const englishRoot = path.join(sourceRoot, "app/(en)");
const germanRoot = path.join(sourceRoot, "app/(de)/de");
const generatedRoot = path.join(sourceRoot, "generated/de");
const checkOnly = process.argv.includes("--check");
const reportOnly = process.argv.includes("--report");
// FooterBrand contains fixed English brand wording; its callers supply the localized home URL.
const shared = new Set(["components/Document.tsx", "components/LanguageSwitcher.tsx", "components/FooterBrand.tsx", "lib/i18n.ts", "lib/routes.ts"]);

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const groups = await Promise.all(entries.sort((a, b) => a.name.localeCompare(b.name, "en")).map(entry => {
    const filename = path.join(directory, entry.name);
    return entry.isDirectory() ? filesIn(filename) : [filename];
  }));
  return groups.flat();
}

const catalogs = {};
const contexts = JSON.parse(await readFile(path.join(sourceRoot, "locales/de/contexts.json"), "utf8"));
for (const name of ["site", "articles", "industries", "platform"]) {
  catalogs[name] = JSON.parse(await readFile(path.join(sourceRoot, `locales/de/${name}.json`), "utf8"));
  for (const [key, value] of Object.entries(catalogs[name])) {
    if (typeof value !== "string") throw new Error(`Invalid German translation: ${name}: ${key}`);
  }
}

function catalogOrder(file) {
  if (/lib\/articles\.ts|app\/\(en\)\/blog\/|company\/(?:GuideLibrary|ArticleArtwork)\.tsx/.test(file)) return ["articles", "site", "platform", "industries"];
  if (/lib\/industr|components\/industries\/|HomeIndustries\.tsx|public\/media\/(?:industries|insurance)\//.test(file)) return ["industries", "site", "platform", "articles"];
  if (/components\/(?:platform|products)\/|lib\/app-captures\.ts|app\/\(en\)\/(?:platform|agents|systems|ai-gateway|deployment|ai-transformation|security)\/|public\/media\/century\/diagrams\//.test(file)) return ["platform", "site", "industries", "articles"];
  return ["site", "articles", "industries", "platform"];
}

function decodeEntities(value) {
  const entities = { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " " };
  return value.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi, (match, entity) => {
    if (entity[0] !== "#") return entities[entity.toLowerCase()] ?? match;
    return String.fromCodePoint(Number.parseInt(entity.slice(entity[1].toLowerCase() === "x" ? 2 : 1), entity[1].toLowerCase() === "x" ? 16 : 10));
  });
}
const normalize = value => value.replace(/\s+/g, " ").trim();

// Names and technical abbreviations intentionally remain the same in both locales.
const invariant = /^(?:Century(?: AI Platform| Agents| Systems| AI Gateway)?|AI Platform|AI Gateway|Agents|Systems|Vitali Bakhmat|Vadim Vladymtsev|Egor Krychev|Vitali|Vadim|Egor|Telegram|LinkedIn|SVG|RPA|API|IT|CEO|CTO|CAIO|EU|EN|DE|AI|KI|Workflows|Governance|Chat|Audio|ERP|CRM|SDK|LLM|LLMs|MCP|n8n|OpenAI|Anthropic|Google|Meta|Mistral|Claude|Gemini|GPT[- \w.]*|Llama[- \w.]*|Token|Tokens|Cent(?:ury)?|Orbit|Stream|Cortex|\d+(?:[ .,/–—-]\d+)*(?:\s*(?:px|%|ms|s))?)$/;
const missing = [];
const translated = new Set();

function lookup(value, file, required = false) {
  const normalized = normalize(value);
  if (Object.hasOwn(contexts[file] || {}, normalized)) {
    const translation = contexts[file][normalized];
    return translation === "" ? "" : `${/^\s/.test(value) ? " " : ""}${translation}${/\s$/.test(value) ? " " : ""}`;
  }
  for (const name of catalogOrder(file)) {
    const catalog = catalogs[name];
    if (Object.hasOwn(catalog, value)) {
      translated.add(`${name}:${value}`);
      return catalog[value];
    }
    if (Object.hasOwn(catalog, normalized)) {
      translated.add(`${name}:${normalized}`);
      const translation = catalog[normalized];
      return translation === "" ? "" : `${/^\s/.test(value) ? " " : ""}${translation}${/\s$/.test(value) ? " " : ""}`;
    }
  }
  if (required && /[a-zA-Z]/.test(normalized) && !invariant.test(normalized) && !/^(?:https?:|\/|#|\w+\.\w{2,}(?:\/|$))/.test(normalized)) {
    missing.push({ file, text: value });
  }
  return value;
}

const contentFields = new Set([
  "title", "seoTitle", "description", "label", "labels", "caption", "alt", "role", "profileLabel", "link",
  "text", "question", "answer", "headline", "eyebrow", "focus", "owner", "tags", "intro", "stages",
  "detail", "steps", "outcome", "work", "output", "decision", "short", "points", "category", "categories", "readingTime", "paragraphs",
  "location", "snippet", "goalsTitle", "summary", "inputs", "review", "processTitle", "processContext",
  "controlIntro", "reference", "workflowAlt", "operationLabel", "audience", "heroDescription", "whyIntro",
  "ctaLabel", "contactTitle", "PAGE_TITLE", "PAGE_DESCRIPTION",
]);
const displayAttributes = new Set(["alt", "aria-label", "aria-description", "title", "description", "eyebrow", "label", "caption", "text", "heading", "contactTitle", "operationLabel", "placeholder"]);
const technicalFields = new Set([
  "slug", "id", "relatedSlugs", "icon", "cover", "capture", "current", "variant", "headerVariant", "backdrop", "tone",
  "illustration", "visual", "type", "src", "image", "imageSrc", "href", "srcSet", "position", "media", "sizes", "className",
  "target", "rel", "download", "code", "hero", "heroSmall", "heroMobile", "workflow", "heroPosition", "heroMobilePosition", "workflowPosition",
]);
const nameOf = node => node && (ts.isIdentifier(node) || ts.isStringLiteral(node)) ? node.text : "";

function context(node) {
  for (let current = node; current.parent; current = current.parent) {
    const parent = current.parent;
    if ((ts.isPropertyAssignment(parent) || ts.isPropertySignature(parent)) && parent.name === current) return "technical";
    if (ts.isCaseClause(parent) || ts.isElementAccessExpression(parent) || ts.isIndexedAccessTypeNode(parent)) return "technical";
    if (ts.isLiteralTypeNode(parent)) {
      let type = parent;
      while (type && !ts.isTypeAliasDeclaration(type)) type = type.parent;
      return type?.name.text === "ArticleCategory" ? "display" : "technical";
    }
    if (ts.isJsxAttribute(parent)) return displayAttributes.has(nameOf(parent.name)) ? "display" : "technical";
    if (ts.isPropertyAssignment(parent)) {
      const name = nameOf(parent.name);
      if (contentFields.has(name)) return "display";
      if (technicalFields.has(name) || name.startsWith("--") || name.startsWith("@")) return "technical";
    }
    if (ts.isBindingElement(parent) || ts.isParameter(parent) || ts.isVariableDeclaration(parent)) {
      if (contentFields.has(nameOf(parent.name))) return "display";
    }
    if (ts.isCallExpression(parent) && parent.expression.getText() === "pageMetadata") {
      return parent.arguments.indexOf(current) < 2 ? "display" : "technical";
    }
    if (ts.isBinaryExpression(parent) && [ts.SyntaxKind.EqualsEqualsToken, ts.SyntaxKind.EqualsEqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsToken, ts.SyntaxKind.ExclamationEqualsEqualsToken].includes(parent.operatorToken.kind)) {
      // Category names are display values used by the guide filter; other
      // comparisons select implementation branches (group IDs, variants, etc.).
      return /\bcategory\b/.test(parent.getText()) ? "display" : "technical";
    }
    if (ts.isJsxExpression(parent) && !ts.isJsxAttribute(parent.parent)) return "display";
    if (ts.isImportDeclaration(parent) || ts.isExportDeclaration(parent)) return "technical";
  }
  return "unknown";
}

const sources = (await Promise.all([englishRoot, path.join(sourceRoot, "components"), path.join(sourceRoot, "lib")].map(filesIn))).flat()
  .filter(file => /\.tsx?$/.test(file) && !shared.has(path.relative(sourceRoot, file)));
const destinations = new Map(sources.map(file => [file, file.startsWith(englishRoot + path.sep)
  ? path.join(germanRoot, path.relative(englishRoot, file))
  : path.join(generatedRoot, path.relative(sourceRoot, file))]));
const assets = (await filesIn(path.join(root, "public/media"))).filter(file => file.endsWith(".svg") && !/\/media\/(?:de|pl)\//.test(file));
const localizedAssets = new Map();
for (const filename of assets) {
  const source = await readFile(filename, "utf8");
  if (/<(?:text|title|desc)\b/.test(source)) {
    const originalUrl = "/" + path.relative(path.join(root, "public"), filename);
    localizedAssets.set(originalUrl, originalUrl.replace("/media/", "/media/de/"));
  }
}

function remapImport(specifier, filename) {
  if (!specifier.startsWith(".") && !specifier.startsWith("@/")) return specifier;
  const absolute = specifier.startsWith("@/") ? path.join(sourceRoot, specifier.slice(2)) : path.resolve(path.dirname(filename), specifier);
  if (absolute.endsWith(".css")) return "@/" + path.relative(sourceRoot, absolute);
  const resolved = [absolute, absolute + ".ts", absolute + ".tsx", path.join(absolute, "index.ts"), path.join(absolute, "index.tsx")].find(candidate => destinations.has(candidate) || shared.has(path.relative(sourceRoot, candidate)));
  if (!resolved) return specifier;
  return "@/" + path.relative(sourceRoot, destinations.get(resolved) || resolved).replace(/\.tsx?$/, "");
}

function inHref(node) {
  for (let parent = node.parent; parent; parent = parent.parent) {
    if (ts.isJsxAttribute(parent) || ts.isPropertyAssignment(parent)) return nameOf(parent.name) === "href";
  }
  return false;
}
const pagePrefixes = (await readdir(englishRoot, { withFileTypes: true })).filter(entry => entry.isDirectory()).map(entry => entry.name);
function routeUrl(value) {
  const pathname = value.split(/[?#]/, 1)[0];
  if (pathname === "/") return `/de${value}`;
  return pagePrefixes.some(prefix => pathname === `/${prefix}` || pathname.startsWith(`/${prefix}/`)) ? `/de${value}` : value;
}
const escapeTemplate = value => value.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");

function localizeSource(source, filename) {
  const file = path.relative(sourceRoot, filename);
  if (file === "lib/locale.ts") return 'import type { Locale } from "@/lib/i18n";\nexport const LOCALE: Locale = "de";\n';
  if (file === "lib/metadata.ts") return '// Generated locale-bound metadata helpers.\nimport { pageMetadata as page, homeMetadata as home } from "@/lib/metadata";\nexport const pageMetadata = (title: string, description: string, path: string) => page(title, description, path, "de");\nexport const homeMetadata = (title: string, description: string) => home(title, description, "de");\n';
  const tree = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true);
  const edits = [];
  const edit = (node, value) => edits.push({ start: node.getStart(tree), end: node.end, value });
  function visit(node) {
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
      edit(node.moduleSpecifier, JSON.stringify(remapImport(node.moduleSpecifier.text, filename)));
      return;
    }
    // German nouns keep their capitalization in dynamic UI labels.
    if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression) && node.expression.name.text === "toLowerCase" && /^(?:category|active\.title|item\.title)$/.test(node.expression.expression.getText(tree))) {
      edit(node, node.expression.expression.getText(tree));
      return;
    }
    if (ts.isJsxText(node)) {
      const value = normalize(decodeEntities(node.text));
      if (value) {
        const translation = lookup(value, file, true);
        const before = /^[ \t]+\S/.test(node.text) ? " " : "";
        const after = /\S[ \t]+$/.test(node.text) ? " " : "";
        edits.push({ start: node.pos, end: node.end, value: `{${JSON.stringify(translation === "" ? "" : before + translation + after)}}` });
      }
      return;
    }
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
      const classification = context(node);
      const isJsxAttribute = ts.isJsxAttribute(node.parent);
      let value = isJsxAttribute ? decodeEntities(node.text) : node.text;
      if (file === "lib/site.ts" && ts.isVariableDeclaration(node.parent) && nameOf(node.parent.name) === "SITE_LANGUAGE") value = "de";
      else if (localizedAssets.has(value)) value = localizedAssets.get(value);
      else if (inHref(node)) {
        // A template tail (or the right side of string concatenation) is a
        // suffix, even when its value is "/". Prefix only the URL's start.
        const suffix = ts.isTemplateMiddle(node) || ts.isTemplateTail(node) ||
          (ts.isBinaryExpression(node.parent) && node.parent.operatorToken.kind === ts.SyntaxKind.PlusToken && node.parent.right === node);
        if (!suffix) value = routeUrl(value);
      }
      else if (classification !== "technical") value = lookup(value, file, classification === "display");
      if (value !== node.text) {
        if (ts.isTemplateHead(node)) edit(node, "`" + escapeTemplate(value) + "${");
        else if (ts.isTemplateMiddle(node)) edit(node, "}" + escapeTemplate(value) + "${");
        else if (ts.isTemplateTail(node)) edit(node, "}" + escapeTemplate(value) + "`");
        else if (isJsxAttribute) edit(node, `{${JSON.stringify(value)}}`);
        else edit(node, JSON.stringify(value));
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(tree);
  let result = source;
  for (const item of edits.sort((a, b) => b.start - a.start)) result = result.slice(0, item.start) + item.value + result.slice(item.end);
  return "// Generated by scripts/generate-locales.mjs. Edit English sources or src/locales/de instead.\n" + result;
}

const outputs = new Map();
for (const [source, destination] of destinations) outputs.set(destination, localizeSource(await readFile(source, "utf8"), source));
const encodeXml = value => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
for (const [originalUrl, localizedUrl] of localizedAssets) {
  const filename = path.join(root, "public", originalUrl);
  const source = await readFile(filename, "utf8");
  const result = source.replace(/<(text|title|desc)(\s[^>]*|)>([^<]*)<\/\1>/g, (_, tag, attributes, text) => {
    const original = decodeEntities(text);
    const translation = lookup(original, "public" + originalUrl, true);
    return `<${tag}${attributes}>${encodeXml(translation)}</${tag}>`;
  }).replace("<svg ", '<svg xml:lang="de" ');
  outputs.set(path.join(root, "public", localizedUrl), fitLocalizedSvg(result, originalUrl));
}

if (missing.length) {
  const unique = [...new Map(missing.map(item => [`${item.file}:${item.text}`, item])).values()];
  console.error(JSON.stringify(unique, null, 2));
  console.error(`German localization is incomplete: ${unique.length} source messages need a translation.`);
  process.exitCode = 1;
} else if (reportOnly || checkOnly) {
  console.log(`German catalog covers ${translated.size} messages across ${sources.length} source modules and ${localizedAssets.size} SVG diagrams.`);
} else {
  // Only generated paths are removed. English sources and shared assets stay intact.
  await rm(germanRoot, { recursive: true, force: true });
  await rm(generatedRoot, { recursive: true, force: true });
  await rm(path.join(root, "public/media/de"), { recursive: true, force: true });
  for (const [filename, content] of outputs) {
    await mkdir(path.dirname(filename), { recursive: true });
    await writeFile(filename, content);
  }
  await createOpenGraph("de");
  console.log(`Generated German site: ${sources.length} modules, ${localizedAssets.size} SVG diagrams, ${translated.size} translated messages.`);
}
