import ts from "typescript";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

export const sourceRoot = path.resolve("src");
export const sharedFiles = new Set(["components/Document.tsx", "components/LanguageSwitcher.tsx", "components/FooterBrand.tsx", "lib/i18n.ts", "lib/routes.ts"]);
export const textAttributes = new Set(["alt", "aria-label", "aria-description", "title", "placeholder", "label", "description", "eyebrow", "caption", "children"]);
const textProperties = new Set(["title", "seoTitle", "description", "name", "text", "label", "eyebrow", "headline", "summary", "outcome", "work", "output", "decision", "inputs", "review", "paragraphs", "points", "intro", "steps", "goalsTitle", "goals", "processTitle", "processContext", "controlIntro", "controls", "workflowAlt", "operationLabel", "audience", "heroDescription", "whyIntro", "focus", "short", "caption", "owner", "labels", "category", "readingTime", "detail", "question", "answer", "tags", "profileLabel", "location", "snippet", "ctaLabel", "alt", "role", "link", "benefitsTitle", "whyTitle", "contactTitle", "footerTagline", "reference"]);
const codeProperties = new Set(["brandLabel", "id", "slug", "href", "src", "srcSet", "image", "hero", "heroSmall", "heroMobile", "workflow", "position", "heroPosition", "heroMobilePosition", "workflowPosition", "icon", "capture", "relatedSlugs", "tone", "illustration", "visual", "fill", "type", "inLanguage", "canonical", "url", "width", "height", "fontFamily", "objectPosition", "display", "variable", "subsets"]);

export function normalize(value) {
  return value.replace(/\s+/g, " ").trim();
}

export function domainFor(filename) {
  const file = filename.replaceAll("\\", "/").replace("/(en)/", "/");
  if (/\/industries\/|\/industries\.ts$|\/industry-reference/.test(file)) return "industries";
  if (/\/company\/|\/articles\.ts$|\/Founders\.tsx$|\/app\/(about-us|careers|press|contact|privacy|blog)\//.test(file)) return "company";
  if (/\/platform\/|\/products\/|\/app-captures\.ts$|\/app\/(ai-os|platform|agents|systems|ai-gateway|deployment|ai-transformation|security)\//.test(file)) return "platform";
  return "shared";
}

export async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : path.join(dir, entry.name)))).flat();
}

export async function sourceFiles() {
  const files = (await Promise.all(["app/(en)", "components", "lib"].map(directory => walk(path.join(sourceRoot, directory))))).flat();
  return files.filter(file => /\.(ts|tsx)$/.test(file) && !sharedFiles.has(path.relative(sourceRoot, file).replaceAll("\\", "/")));
}

export function parse(filename, content) {
  return ts.createSourceFile(filename, content, ts.ScriptTarget.Latest, true, filename.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
}

function propertyName(node) {
  return node.name && (ts.isIdentifier(node.name) || ts.isStringLiteral(node.name)) ? node.name.text : "";
}

function semanticContext(node) {
  let current = node;
  while (current.parent && !ts.isSourceFile(current.parent)) {
    const parent = current.parent;
    if (ts.isJsxAttribute(parent)) return textAttributes.has(propertyName(parent)) ? "text" : "code";
    if (ts.isLiteralTypeNode(parent)) {
      let declaration = parent;
      while (declaration.parent && !ts.isTypeAliasDeclaration(declaration)) declaration = declaration.parent;
      return ts.isTypeAliasDeclaration(declaration) && declaration.name.text === "ArticleCategory" ? "text" : "code";
    }
    if (ts.isImportDeclaration(parent) || ts.isExportDeclaration(parent) || ts.isImportTypeNode(parent)) return "code";
    if (ts.isPropertyAssignment(parent)) {
      if (parent.name === current) return "code";
      const name = propertyName(parent);
      if (textProperties.has(name)) return "text";
      if (codeProperties.has(name) || name.startsWith("@")) return "code";
      return "unknown";
    }
    if (ts.isBindingElement(parent)) return parent.name === current ? "code" : textProperties.has(parent.name.getText()) ? "text" : "unknown";
    if (ts.isElementAccessExpression(parent)) return "code";
    if (ts.isBinaryExpression(parent) && /\.key$/.test(parent.left.getText())) return "code";
    if (ts.isCallExpression(parent) && parent.arguments.some(argument => /\.key$/.test(argument.getText()))) return "code";
    if (ts.isCallExpression(parent) && /querySelector|closest|matchMedia|addEventListener|removeEventListener|setProperty|padStart/.test(parent.expression.getText())) return "code";
    if (ts.isVariableDeclaration(parent) && /className|styles|SITE_URL|TELEGRAM_URL|PROFILE_URL|SITE_LOCALE/.test(parent.name.getText())) return "code";
    current = parent;
  }
  return "unknown";
}

export function messageForNode(node) {
  if (ts.isJsxText(node)) {
    const value = normalize(node.text);
    return /[A-Za-z]/.test(value) ? value : null;
  }
  if (!ts.isStringLiteral(node) && !ts.isNoSubstitutionTemplateLiteral(node) && !ts.isTemplateExpression(node)) return null;
  const context = semanticContext(node);
  if (context === "code") return null;
  const value = ts.isTemplateExpression(node)
    ? node.head.text + node.templateSpans.map((span, i) => `{${i}}${span.literal.text}`).join("")
    : node.text;
  if (!/[A-Za-z]/.test(value) || /^(?:https?:|\/|\.\.?\/|@\/|#|use client|use server)/.test(value)) return null;
  if (context === "text") return value;
  // Human-readable literals outside data objects include button children,
  // filter labels, metadata arguments, default props and article categories.
  if (/^(?:[A-Z][A-Za-z]+(?:[ &-][A-Za-z]+)*|[A-Z0-9][\s\S]*\s[\s\S]+)$/.test(value) && !/\b(?:px|vw|vh)\b|\.webp|\.svg|\.css/.test(value)) return value;
  return null;
}

export async function collectMessages() {
  const result = Object.fromEntries(["industries", "company", "platform", "shared"].map(key => [key, new Map()]));
  for (const filename of await sourceFiles()) {
    const source = parse(filename, await readFile(filename, "utf8"));
    const domain = domainFor(filename);
    const visit = node => {
      const message = messageForNode(node);
      if (message) {
        const locations = result[domain].get(message) ?? [];
        locations.push(path.relative(process.cwd(), filename));
        result[domain].set(message, locations);
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
  }
  return result;
}
