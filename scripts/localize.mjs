/**
 * Generate the static Polish site from the same components as the English site.
 * Only AST text nodes and explicitly recognized URL/import nodes are rewritten;
 * element IDs, state keys, property names, assets and external URLs stay stable.
 * Translation catalogs, not generated TSX, are the editable source of truth.
 */
import fs from "node:fs/promises";
import path from "node:path";
import ts from "typescript";
import { createOpenGraph } from "./create-og.mjs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
process.chdir(root);
const generatedSource = "src/localized/pl";
const generatedRoutes = "src/app/(pl)/pl";
const catalogDirectory = "translations/pl";
const sharedModules = new Set(["src/lib/i18n", "src/lib/routes", "src/components/LanguageSwitcher", "src/components/site/SiteDocument"]);
const specialLibraries = new Set(["src/lib/metadata.ts", "src/lib/i18n.ts", "src/lib/routes.ts"]);
const routeRoots = new Set(["platform", "agents", "systems", "ai-gateway", "deployment", "ai-transformation", "security", "industries", "about-us", "careers", "press", "contact", "blog", "privacy"]);

async function filesIn(directory) {
  return (await Promise.all((await fs.readdir(directory, { withFileTypes: true })).map(entry => {
    const filename = path.posix.join(directory, entry.name);
    return entry.isDirectory() ? filesIn(filename) : [filename];
  }))).flat().sort();
}
const catalogs = {};
for (const filename of (await filesIn(catalogDirectory)).filter(name => name.endsWith(".json") && !name.endsWith("/keep.json"))) {
  const data = JSON.parse(await fs.readFile(filename, "utf8"));
  for (const [source, strings] of Object.entries(data)) {
    catalogs[source] ??= {};
    for (const [english, polish] of Object.entries(strings)) {
      if (typeof polish !== "string") throw new Error(`Translation must be a string: ${source}: ${english}`);
      if (Object.hasOwn(catalogs[source], english) && catalogs[source][english] !== polish) throw new Error(`Conflicting translation: ${source}: ${english}`);
      catalogs[source][english] = polish;
    }
  }
}
const kept = JSON.parse(await fs.readFile(`${catalogDirectory}/keep.json`, "utf8"));
const assetPaths = Object.keys(catalogs).filter(name => name.startsWith("public/") && name.endsWith(".svg"));
const assetMap = Object.fromEntries(assetPaths.map(name => [name.slice("public".length), name.replace(/^public\/media\//, "/media/pl/")]));
const xmlDecode = value => value.replace(/&(amp|lt|gt|quot|apos);/g, (_, entity) => ({ amp: "&", lt: "<", gt: ">", quot: '\"', apos: "'" })[entity]);
const xmlEscape = value => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const templateEscape = value => value.replaceAll("\\", "\\\\").replaceAll("`", "\\`").replaceAll("${", "\\${");
const untranslated = {};
let translatedCount = 0;

function localizeUrl(value) {
  if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/pl/")) return value;
  const firstSegment = value.slice(1).split(/[/?#]/)[0];
  return !firstSegment || routeRoots.has(firstSegment) ? `/pl${value}` : value;
}
function localizeAsset(value) {
  for (const [english, polish] of Object.entries(assetMap)) value = value.replaceAll(english, polish);
  return value;
}
function importPath(value, source) {
  if (!value.startsWith("@/") && !value.startsWith(".")) return value;
  const absolute = value.startsWith("@/") ? `src/${value.slice(2)}` : path.posix.normalize(path.posix.join(path.posix.dirname(source), value));
  if (absolute.endsWith(".css") || sharedModules.has(absolute)) return `@/${absolute.slice(4)}`;
  if (absolute.startsWith("src/components/") || absolute.startsWith("src/lib/")) return `@/localized/pl/${absolute.slice(4)}`;
  return value;
}
function propertyName(node) {
  return ts.isIdentifier(node) || ts.isStringLiteral(node) ? node.text : node.getText();
}
function isStructural(node) {
  const parent = node.parent;
  if ((ts.isPropertyAssignment(parent) || ts.isPropertySignature(parent) || ts.isMethodDeclaration(parent)) && parent.name === node) return true;
  if (ts.isElementAccessExpression(parent) && parent.argumentExpression === node) return true;
  if (ts.isPropertyAssignment(parent) && ["id", "slug", "className", "tone", "variant", "icon", "type", "kind", "symbol"].includes(propertyName(parent.name))) return true;
  if (ts.isJsxAttribute(parent) && /^(id|className|role|type|target|rel|key|name|data-.+|aria-(controls|labelledby|describedby))$/.test(propertyName(parent.name))) return true;
  return false;
}
function inUrl(node) {
  let current = node;
  while (current.parent && !ts.isStatement(current.parent)) {
    const parent = current.parent;
    if (ts.isJsxAttribute(parent)) return /href$/i.test(propertyName(parent.name));
    if (ts.isPropertyAssignment(parent)) return /href$/i.test(propertyName(parent.name));
    if (ts.isCallExpression(parent)) return parent.expression.getText().endsWith("pageMetadata") && parent.arguments[2] === current;
    current = parent;
  }
  return false;
}
function firstInUrl(node) {
  if (node.kind === ts.SyntaxKind.TemplateMiddle || node.kind === ts.SyntaxKind.TemplateTail) return false;
  if (ts.isBinaryExpression(node.parent) && node.parent.right === node) return false;
  return inUrl(node);
}
function siteUrlSuffix(node) {
  return node.kind === ts.SyntaxKind.TemplateTail && ts.isTemplateSpan(node.parent) && node.parent.expression.getText() === "SITE_URL";
}
function isLiteral(node) {
  return ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isJsxText(node) || [ts.SyntaxKind.TemplateHead, ts.SyntaxKind.TemplateMiddle, ts.SyntaxKind.TemplateTail].includes(node.kind);
}
function displayCandidate(node, value) {
  if (!/[A-Za-z]/.test(value) || isStructural(node)) return false;
  if (ts.isJsxText(node)) return true;
  if (ts.isJsxAttribute(node.parent) && /^(alt|title|aria-label|placeholder)$/.test(propertyName(node.parent.name))) return true;
  const displayFields = new Set(["title", "name", "label", "description", "text", "caption", "alt", "heading", "subtitle", "summary", "question", "answer", "role", "operationLabel", "audience", "ctaLabel", "category", "readingTime", "paragraphs", "points", "labels"]);
  let field = node.parent;
  if (ts.isArrayLiteralExpression(field)) field = field.parent;
  if (ts.isPropertyAssignment(field) && displayFields.has(propertyName(field.name))) return true;
  return /[a-z][ ,:;!?][a-zA-Z]/.test(value) && !/^(use client|use server)$/.test(value) && !/[{}<>]|https?:|@\/|^\.|^\/|px|vw|calc\(/.test(value);
}
function transform(source, text) {
  const dictionary = catalogs[source] || {};
  const ast = ts.createSourceFile(source, text, ts.ScriptTarget.Latest, true, source.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const edits = [];
  function visit(node) {
    if (isLiteral(node)) {
      const jsx = ts.isJsxText(node);
      const start = jsx ? node.pos : node.getStart(ast);
      const original = text.slice(start, node.end);
      const value = jsx ? original.replace(/\s+/g, " ").trim() : node.text;
      let translated = value;
      const isImport = ts.isStringLiteral(node) && (ts.isImportDeclaration(node.parent) || ts.isExportDeclaration(node.parent));
      if (isImport) translated = importPath(value, source);
      else if (!isStructural(node)) {
        const fieldKey = ts.isPropertyAssignment(node.parent) ? `@${propertyName(node.parent.name)}:${value}` : "";
        if (fieldKey && Object.hasOwn(dictionary, fieldKey)) {
          translated = dictionary[fieldKey];
          translatedCount++;
        } else if (Object.hasOwn(dictionary, value)) {
          translated = dictionary[value];
          translatedCount++;
        } else if (displayCandidate(node, value) && !kept[source]?.includes(value)) {
          untranslated[source] ??= [];
          if (!untranslated[source].includes(value)) untranslated[source].push(value);
        }
        translated = localizeAsset(translated);
        if (firstInUrl(node) || siteUrlSuffix(node)) translated = localizeUrl(translated);
        if (source === "src/lib/site.ts" && ts.isVariableDeclaration(node.parent) && propertyName(node.parent.name) === "SITE_LANGUAGE") translated = "pl";
      }
      if (translated !== value) {
        let replacement;
        if (jsx) {
          replacement = `${original.match(/^\s*/)[0]}${xmlEscape(translated)}${original.match(/\s*$/)[0]}`;
        } else if ([ts.SyntaxKind.TemplateHead, ts.SyntaxKind.TemplateMiddle, ts.SyntaxKind.TemplateTail].includes(node.kind)) {
          replacement = `${node.kind === ts.SyntaxKind.TemplateHead ? "`" : "}"}${templateEscape(translated)}${node.kind === ts.SyntaxKind.TemplateTail ? "`" : "${"}`;
        } else {
          replacement = JSON.stringify(translated);
          if (ts.isJsxAttribute(node.parent)) replacement = `{${replacement}}`;
        }
        edits.push({ start, end: node.end, replacement });
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
  for (const edit of edits.sort((a, b) => b.start - a.start)) text = text.slice(0, edit.start) + edit.replacement + text.slice(edit.end);
  return `// Generated by scripts/localize.mjs from ${source}. Edit translations/pl instead.\n${text}`;
}

// These directories contain generated files only. Clear stale routes on regeneration.
await fs.rm(generatedSource, { recursive: true, force: true });
await fs.rm(generatedRoutes, { recursive: true, force: true });
const sources = [...await filesIn("src/components"), ...await filesIn("src/lib"), ...await filesIn("src/app/(en)")].filter(name => /\.tsx?$/.test(name));
let generated = 0;
for (const filename of sources) {
  if (filename === "src/app/(en)/layout.tsx" || specialLibraries.has(filename) || sharedModules.has(filename.replace(/\.tsx?$/, ""))) continue;
  const source = filename.replace("src/app/(en)/", "src/app/");
  const output = filename.startsWith("src/app/(en)/") ? filename.replace("src/app/(en)", generatedRoutes) : filename.replace(/^src/, generatedSource);
  const content = transform(source, await fs.readFile(filename, "utf8"));
  await fs.mkdir(path.dirname(output), { recursive: true });
  await fs.writeFile(output, content);
  generated++;
}
await fs.mkdir(`${generatedSource}/lib`, { recursive: true });
await fs.writeFile(`${generatedSource}/lib/metadata.ts`, `// Generated locale-bound metadata helpers.\nimport { pageMetadata as page, homeMetadata as home } from "@/lib/metadata";\nexport const pageMetadata = (title: string, description: string, path: string) => page(title, description, path, "pl");\nexport const homeMetadata = (title: string, description: string) => home(title, description, "pl");\n`);
for (const filename of assetPaths) {
  const dictionary = catalogs[filename];
  const source = await fs.readFile(filename, "utf8");
  const localized = source.replace(/>([^<>]+)</g, (match, value) => {
    const key = xmlDecode(value.trim());
    return Object.hasOwn(dictionary, key) ? `>${value.match(/^\s*/)[0]}${xmlEscape(dictionary[key])}${value.match(/\s*$/)[0]}<` : match;
  });
  const output = `public${assetMap[filename.slice("public".length)]}`;
  await fs.mkdir(path.dirname(output), { recursive: true });
  await fs.writeFile(output, localized);
}
await fs.mkdir(".localizations", { recursive: true });
await fs.writeFile(".localizations/untranslated.json", JSON.stringify(untranslated, null, 2) + "\n");
if (Object.keys(untranslated).length) {
  throw new Error("Polish translations are missing. Review .localizations/untranslated.json, then update the catalog or the explicit keep list.");
}
console.log(`Generated ${generated} Polish source files and ${assetPaths.length} diagrams; translated ${translatedCount} text nodes.`);

await createOpenGraph("pl");
