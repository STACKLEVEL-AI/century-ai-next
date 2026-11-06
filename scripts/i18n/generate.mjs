/** One static compiler for every non-default locale. Generated files are disposable. */
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { fitLocalizedSvg } from "../localized-svg.mjs";
import {
  assetSources, boundFiles, decodeEntities, encodeXml, messageForNode,
  nameOf, parseSource, sharedFiles, sourceFiles,
} from "./source.mjs";

const defaultRoot = fileURLToPath(new URL("../../", import.meta.url));
const templateEscape = value => value.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
const placeholders = value => [...value.matchAll(/\{(\d+)\}/g)].map(match => match[1]).sort((a, b) => Number(a) - Number(b));

export function validatePlaceholders(source, translation) {
  if (JSON.stringify(placeholders(source)) !== JSON.stringify(placeholders(translation))) {
    throw new Error(`Template placeholders differ: ${JSON.stringify(source)} → ${JSON.stringify(translation)}`);
  }
}

function applyEdits(source, edits, start = 0, end = source.length) {
  let result = source.slice(start, end);
  let previous = end;
  for (const edit of edits.sort((a, b) => b.start - a.start)) {
    if (edit.end > previous || edit.start < start || edit.end > end) throw new Error("Overlapping localization edits");
    result = result.slice(0, edit.start - start) + edit.value + result.slice(edit.end - start);
    previous = edit.start;
  }
  return result;
}

export function createResolver(locale, catalog, errors = []) {
  const used = { messages: new Map(), assets: new Map(), keep: new Map() };
  function record(kind, source, key) {
    if (!used[kind].has(source)) used[kind].set(source, new Set());
    used[kind].get(source).add(key);
  }
  function resolve(source, message, kind = "messages") {
    const dictionary = catalog[kind][source] || {};
    const fieldKey = message.field ? `@${message.field}:${message.key}` : "";
    const key = fieldKey && Object.hasOwn(dictionary, fieldKey) ? fieldKey : message.key;
    if (Object.hasOwn(dictionary, key)) {
      const value = dictionary[key];
      record(kind, source, key);
      try { validatePlaceholders(message.key, value); }
      catch (error) { errors.push(`${locale}: ${source}:${message.line || "SVG"}: ${error.message}`); }
      return value;
    }
    const kept = catalog.keep[source] || [];
    const keepKey = fieldKey && kept.includes(fieldKey) ? fieldKey : message.key;
    if (kept.includes(keepKey)) {
      record("keep", source, keepKey);
      return message.key;
    }
    errors.push(`${locale}: missing ${source}:${message.line || "SVG"}: ${JSON.stringify(message.key)}`);
    return message.key;
  }
  function validateUnused() {
    for (const kind of ["messages", "assets", "keep"]) {
      for (const [source, entries] of Object.entries(catalog[kind])) {
        for (const key of kind === "keep" ? entries : Object.keys(entries)) {
          if (!used[kind].get(source)?.has(key)) errors.push(`${locale}: stale ${kind} entry ${source}: ${JSON.stringify(key)}`);
        }
      }
    }
  }
  return { resolve, validateUnused, used };
}

function boundSource(filename, locale) {
  if (filename === "src/lib/locale.ts") return `import type { Locale } from "@/lib/i18n";\nexport const LOCALE: Locale = ${JSON.stringify(locale)};\n`;
  return `// Locale-bound wrappers keep canonical, alternates and social metadata in one module.\nimport { pageMetadata as page, homeMetadata as home } from "@/lib/metadata";\nexport const pageMetadata = (title: string, description: string, path: string) => page(title, description, path, ${JSON.stringify(locale)});\nexport const homeMetadata = (title: string, description: string) => home(title, description, ${JSON.stringify(locale)});\n`;
}

export function localizedUrl(value, locale, routeRoots) {
  if (!value.startsWith("/") || value.startsWith("//")) return value;
  const first = value.slice(1).split(/[/?#]/)[0];
  return !first || routeRoots.has(first) ? `/${locale}${value}` : value;
}

/** Pure source transform: no output is written until every locale validates. */
export function compileSource({ filename, source, locale, resolve, destinations = new Map(), assetMap = new Map(), routeRoots = new Set() }) {
  if (boundFiles.has(filename)) return boundSource(filename, locale);
  const tree = parseSource(filename, source);

  function remapImport(specifier) {
    if (!specifier.startsWith(".") && !specifier.startsWith("@/")) return specifier;
    const absolute = specifier.startsWith("@/") ? `src/${specifier.slice(2)}` : path.posix.normalize(path.posix.join(path.posix.dirname(filename), specifier));
    if (absolute.endsWith(".css")) return `@/${absolute.slice(4)}`;
    const resolved = [absolute, `${absolute}.ts`, `${absolute}.tsx`, `${absolute}/index.ts`, `${absolute}/index.tsx`]
      .find(candidate => destinations.has(candidate) || sharedFiles.has(candidate));
    if (!resolved) return specifier;
    return `@/${(destinations.get(resolved) || resolved).slice(4).replace(/\.tsx?$/, "")}`;
  }

  function isUrl(node) {
    for (let current = node; current.parent; current = current.parent) {
      const parent = current.parent;
      if (ts.isJsxAttribute(parent) || ts.isPropertyAssignment(parent)) return /href$/i.test(nameOf(parent.name));
      if (ts.isCallExpression(parent) && /(?:^|\.)pageMetadata$/.test(parent.expression.getText(tree))) return parent.arguments[2] === current;
      if (ts.isStatement(parent)) return false;
    }
    return false;
  }

  function transformAsset(value) {
    for (const [original, localized] of assetMap) value = value.split(original).join(localized);
    return value;
  }

  function render(node) {
    const edits = [];
    visit(node, edits);
    return applyEdits(source, edits, node.getStart(tree), node.end);
  }

  function visit(node, edits) {
    const edit = value => edits.push({ start: node.getStart(tree), end: node.end, value });
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
      edits.push({ start: node.moduleSpecifier.getStart(tree), end: node.moduleSpecifier.end, value: JSON.stringify(remapImport(node.moduleSpecifier.text)) });
      return;
    }
    // German nouns retain capitalization in interpolated labels.
    if (locale === "de" && ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression) && node.expression.name.text === "toLowerCase" && /^(?:category|active\.title|item\.title)$/.test(node.expression.expression.getText(tree))) {
      edit(render(node.expression.expression));
      return;
    }
    if (ts.isVariableDeclaration(node) && ["SITE_LANGUAGE", "LOCALE"].includes(nameOf(node.name)) && node.initializer && ts.isStringLiteral(node.initializer)) {
      edits.push({ start: node.initializer.getStart(tree), end: node.initializer.end, value: JSON.stringify(locale) });
      return;
    }
    const message = messageForNode(node, tree);
    if (message) {
      const translation = resolve(filename, message);
      if (ts.isTemplateExpression(node)) {
        const expressions = node.templateSpans.map(span => render(span.expression));
        const pieces = translation.split(/(\{\d+\})/g).map(piece => {
          const placeholder = piece.match(/^\{(\d+)\}$/);
          return placeholder ? "${" + expressions[Number(placeholder[1])] + "}" : templateEscape(piece);
        });
        edit("`" + pieces.join("") + "`");
      } else if (ts.isJsxText(node)) {
        // JSX indentation is not a space. Preserve deliberate inline boundary
        // spaces while preventing line-break indentation from changing copy.
        const before = /^[ \t]+\S/.test(node.text) ? " " : "";
        const after = /\S[ \t]+$/.test(node.text) ? " " : "";
        edits.push({ start: node.pos, end: node.end, value: `{${JSON.stringify(before + translation + after)}}` });
      } else edit(ts.isJsxAttribute(node.parent) ? `{${JSON.stringify(translation)}}` : JSON.stringify(translation));
      return;
    }
    if (ts.isTemplateExpression(node)) {
      // Localize the URL prefix once, never its trailing "/" suffix. An
      // absolute SITE_URL template localizes only its first route fragment.
      const url = isUrl(node);
      let head = transformAsset(node.head.text);
      if (url) head = localizedUrl(head, locale, routeRoots);
      let result = "`" + templateEscape(head);
      node.templateSpans.forEach((span, index) => {
        let tail = transformAsset(span.literal.text);
        if (index === 0 && span.expression.getText(tree) === "SITE_URL") tail = localizedUrl(tail, locale, routeRoots);
        result += "${" + render(span.expression) + "}" + templateEscape(tail);
      });
      edit(result + "`");
      return;
    }
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      let value = ts.isJsxAttribute(node.parent) ? decodeEntities(node.text) : node.text;
      value = transformAsset(value);
      if (isUrl(node)) {
        const suffix = ts.isBinaryExpression(node.parent) && node.parent.operatorToken.kind === ts.SyntaxKind.PlusToken && node.parent.right === node;
        if (!suffix) value = localizedUrl(value, locale, routeRoots);
      }
      if (value !== node.text) edit(ts.isJsxAttribute(node.parent) ? `{${JSON.stringify(value)}}` : JSON.stringify(value));
    }
    ts.forEachChild(node, child => visit(child, edits));
  }
  const edits = [];
  visit(tree, edits);
  return `// Generated by scripts/i18n/generate.mjs from ${filename}. Edit English sources or src/locales/${locale}.\n` + applyEdits(source, edits);
}

export function compileSvg({ source, messages, filename, locale, resolve }) {
  const edits = messages.map(message => ({ ...message, value: message.before + encodeXml(resolve(filename, message, "assets")) + message.after }));
  const translated = applyEdits(source, edits).replace(/<svg\b([^>]*)>/, (_, attributes) => {
    const clean = attributes.replace(/\sxml:lang=["'][^"']*["']/g, "");
    return `<svg${clean} xml:lang="${locale}">`;
  });
  return fitLocalizedSvg(translated, filename.replace(/^public/, ""));
}

async function loadCatalog(root, locale) {
  const catalog = {};
  for (const kind of ["messages", "assets", "keep"]) {
    const filename = `src/locales/${locale}/${kind}.json`;
    catalog[kind] = JSON.parse(await readFile(path.join(root, filename), "utf8"));
    if (!catalog[kind] || Array.isArray(catalog[kind]) || typeof catalog[kind] !== "object") throw new Error(`Invalid catalog: ${filename}`);
    for (const [scope, entries] of Object.entries(catalog[kind])) {
      if (kind === "keep") {
        if (!Array.isArray(entries) || entries.some(key => typeof key !== "string") || new Set(entries).size !== entries.length) throw new Error(`Invalid keep entries: ${filename}: ${scope}`);
      } else {
        if (!entries || Array.isArray(entries) || typeof entries !== "object") throw new Error(`Invalid message scope: ${filename}: ${scope}`);
        for (const [key, value] of Object.entries(entries)) {
          if (typeof value !== "string" || !value.trim()) throw new Error(`Empty or non-string translation: ${filename}: ${scope}: ${key}`);
        }
      }
    }
  }
  for (const kind of ["messages", "assets"]) {
    for (const [scope, entries] of Object.entries(catalog[kind])) {
      for (const key of Object.keys(entries)) {
        if (catalog.keep[scope]?.includes(key)) throw new Error(`Translation also marked as keep: ${locale}: ${scope}: ${key}`);
      }
    }
  }
  return catalog;
}

export async function prepareLocales({ root = defaultRoot, locales: selected } = {}) {
  const config = JSON.parse(await readFile(path.join(root, "src/locales/config.json"), "utf8"));
  const localeCodes = Object.keys(config.locales);
  const locales = selected || localeCodes.filter(locale => locale !== config.defaultLocale);
  if (!locales.length || locales.some(locale => !localeCodes.includes(locale) || locale === config.defaultLocale)) throw new Error("Select a configured non-default locale");
  const filenames = await sourceFiles(root);
  const sources = new Map(await Promise.all(filenames.map(async filename => [filename, await readFile(path.join(root, filename), "utf8")])));
  const assets = await assetSources(root, localeCodes);
  const routeRoots = new Set(filenames.filter(filename => filename.startsWith("src/app/(en)/")).map(filename => filename.slice("src/app/(en)/".length).split("/")[0]).filter(part => !part.includes(".") && !part.startsWith("[")));
  const outputs = new Map();
  const errors = [];
  const summaries = [];
  for (const locale of locales) {
    const catalog = await loadCatalog(root, locale);
    const resolver = createResolver(locale, catalog, errors);
    const destinations = new Map(filenames.map(filename => [filename, filename.startsWith("src/app/(en)/")
      ? filename.replace("src/app/(en)/", `src/app/(${locale})/${locale}/`)
      : filename.replace(/^src\//, `src/generated/${locale}/`)]));
    const assetMap = new Map([...assets.keys()].map(filename => [filename.slice("public".length), filename.replace(/^public\/media\//, `/media/${locale}/`)]));
    for (const [filename, source] of sources) outputs.set(destinations.get(filename), compileSource({ filename, source, locale, resolve: resolver.resolve, destinations, assetMap, routeRoots }));
    for (const [filename, asset] of assets) outputs.set(`public${assetMap.get(filename.slice("public".length))}`, compileSvg({ ...asset, source: asset.content, filename, locale, resolve: resolver.resolve }));
    resolver.validateUnused();
    const count = [...resolver.used.messages.values(), ...resolver.used.keep.values()].reduce((sum, keys) => sum + keys.size, 0);
    summaries.push({ locale, modules: sources.size, diagrams: assets.size, messages: count });
  }
  if (errors.length) throw new Error(`Localization validation failed (${new Set(errors).size} issues):\n${[...new Set(errors)].join("\n")}`);
  return { root, locales, outputs, summaries };
}

/** All catalog and source checks happen before the first generated path changes. */
export async function generateLocales(options = {}) {
  const prepared = await prepareLocales(options);
  if (options.check) return prepared;
  for (const locale of prepared.locales) {
    for (const folder of [`src/generated/${locale}`, `src/app/(${locale})/${locale}`, `public/media/${locale}`]) {
      await rm(path.join(prepared.root, folder), { recursive: true, force: true });
    }
    if (locale === "pl") await rm(path.join(prepared.root, "src/localized/pl"), { recursive: true, force: true });
    if (locale === "uk") await rm(path.join(prepared.root, "public/uk"), { recursive: true, force: true });
  }
  for (const [filename, content] of prepared.outputs) {
    const absolute = path.join(prepared.root, filename);
    await mkdir(path.dirname(absolute), { recursive: true });
    await writeFile(absolute, content);
  }
  if (options.socialImages !== false) {
    const { createOpenGraph } = await import("../create-og.mjs");
    for (const locale of prepared.locales) await createOpenGraph(locale);
  }
  return prepared;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const selected = process.argv.find(value => value.startsWith("--locale="))?.slice("--locale=".length);
  const check = process.argv.includes("--check") || process.argv.includes("--report");
  try {
    const result = await generateLocales({ locales: selected?.split(","), check });
    for (const summary of result.summaries) console.log(`${check ? "Checked" : "Generated"} ${summary.locale}: ${summary.modules} modules, ${summary.diagrams} SVG diagrams, ${summary.messages} source messages.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
