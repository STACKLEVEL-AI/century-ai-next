// Compile-time localization for the static export. English React modules and
// reviewed Ukrainian catalogs are the only sources; generated modules are ignored.
import ts from "typescript";
import assert from "node:assert/strict";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { collectMessages, domainFor, messageForNode, normalize, parse, sharedFiles, sourceFiles, walk } from "./source.mjs";

const root = process.cwd();
const checkOnly = process.argv.includes("--check");
const englishRoot = path.join(root, "src/app/(en)");
const ukRoot = path.join(root, "src/app/(uk)/uk");
const generatedRoot = path.join(root, "src/generated/uk");
const catalogs = Object.fromEntries(await Promise.all(["shared", "platform", "company", "industries", "diagrams"].map(async domain => [domain, JSON.parse(await readFile(`src/i18n/uk/${domain}.json`, "utf8"))])));
const messages = await collectMessages();
let messageCount = 0;
for (const [domain, entries] of Object.entries(messages)) {
  const missing = [...entries.keys()].filter(key => typeof catalogs[domain][key] !== "string" || !catalogs[domain][key].trim());
  const stale = Object.keys(catalogs[domain]).filter(key => !entries.has(key));
  assert(!missing.length, `${domain}: missing translations:\n${missing.join("\n")}`);
  assert(!stale.length, `${domain}: stale translations; remove or update:\n${stale.join("\n")}`);
  for (const [key] of entries) {
    const placeholders = text => [...text.matchAll(/\{\d+\}/g)].map(match => match[0]).sort();
    assert.deepEqual(placeholders(catalogs[domain][key]), placeholders(key), `${domain}: placeholders changed in ${key}`);
  }
  messageCount += entries.size;
}

const files = (await sourceFiles()).filter(filename => filename.startsWith(englishRoot + path.sep) || /[\\/]src[\\/](components|lib)[\\/]/.test(filename));
const pages = files.filter(filename => filename.startsWith(englishRoot) && filename.endsWith("/page.tsx"));
const routes = new Set(pages.filter(filename => !filename.includes("[")).map(filename => "/" + path.relative(englishRoot, path.dirname(filename)).split(path.sep).filter(Boolean).join("/") + "/"));
routes.delete("//");
routes.add("/");
for (const [file, prefix] of [["articles", "/blog/"], ["industries", "/industries/"]]) {
  const source = parse(file + ".ts", await readFile(`src/lib/${file}.ts`, "utf8"));
  const visit = node => {
    if (ts.isPropertyAssignment(node) && node.name.getText(source) === "slug" && ts.isStringLiteral(node.initializer)) routes.add(`${prefix}${node.initializer.text}/`);
    ts.forEachChild(node, visit);
  };
  visit(source);
}

const diagramFiles = (await walk(path.join(root, "public/media"))).filter(filename => filename.endsWith(".svg") && !filename.includes(`${path.sep}media${path.sep}de${path.sep}`));
const assets = new Map(diagramFiles.map(filename => {
  const url = "/" + path.relative(path.join(root, "public"), filename).split(path.sep).join("/");
  return [url, "/uk" + url];
}));
assets.set("/og/century-ai-eu.png", "/uk/og/century-ai-eu.png");

function destination(filename) {
  if (filename.startsWith(englishRoot + path.sep)) return path.join(ukRoot, path.relative(englishRoot, filename));
  return path.join(generatedRoot, path.relative(path.join(root, "src"), filename));
}

function localizedUrl(value) {
  if (!value.startsWith("/") || value.startsWith("//")) return value;
  const [pathname] = value.split(/[?#]/);
  const normalized = pathname.replace(/\/?$/, "/");
  return routes.has(normalized) ? `/uk${value}` : value;
}

function templateCode(node, source, transform = text => text) {
  const escape = (text, index) => transform(text, index).replaceAll("\\", "\\\\").replaceAll("`", "\\`").replaceAll("${", "\\${");
  return "`" + escape(node.head.text, 0) + node.templateSpans.map((span, index) => "${" + span.expression.getText(source) + "}" + escape(span.literal.text, index + 1)).join("") + "`";
}

function translatedTemplate(node, value, source) {
  const escape = text => text.replaceAll("\\", "\\\\").replaceAll("`", "\\`").replaceAll("${", "\\${");
  return "`" + value.split(/(\{\d+\})/).map(part => /^\{\d+\}$/.test(part) ? "${" + node.templateSpans[Number(part.slice(1, -1))].expression.getText(source) + "}" : escape(part)).join("") + "`";
}

function rewriteImport(value, filename) {
  if (!value.startsWith(".") && !value.startsWith("@/")) return value;
  const sourceRoot = path.join(root, "src");
  const absolute = value.startsWith("@/") ? path.join(sourceRoot, value.slice(2)) : path.resolve(path.dirname(filename), value);
  if (absolute.endsWith(".css")) return "@/" + path.relative(sourceRoot, absolute).split(path.sep).join("/");
  const resolved = [absolute, absolute + ".ts", absolute + ".tsx", path.join(absolute, "index.ts"), path.join(absolute, "index.tsx")].find(candidate => files.includes(candidate) || sharedFiles.has(path.relative(sourceRoot, candidate).split(path.sep).join("/")));
  if (!resolved) return value;
  const target = sharedFiles.has(path.relative(sourceRoot, resolved).split(path.sep).join("/")) ? resolved : destination(resolved);
  return "@/" + path.relative(sourceRoot, target).split(path.sep).join("/").replace(/\.tsx?$/, "");
}

if (!checkOnly) {
  await rm(ukRoot, { recursive: true, force: true });
  // Remove the earlier disposable route layout when upgrading an existing checkout.
  await rm(path.join(root, "src/app/uk"), { recursive: true, force: true });
  await rm(generatedRoot, { recursive: true, force: true });
  await rm(path.join(root, "public/uk"), { recursive: true, force: true });
}

for (const filename of files) {
  const content = await readFile(filename, "utf8");
  const source = parse(filename, content);
  const domain = domainFor(filename);
  const edits = [];
  const replace = (node, text) => edits.push({ start: node.getStart(source), end: node.end, text });

  // Only href values are route-localized. In particular, do not change suffix
  // slashes, asset URLs, metadata URL helpers, CSS strings or source identifiers.
  function localizeHref(node) {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const next = localizedUrl(node.text);
      if (next === node.text) return;
      replace(node, ts.isJsxAttribute(node.parent) ? `{${JSON.stringify(next)}}` : JSON.stringify(next));
    } else if (ts.isTemplateExpression(node)) {
      if (["/blog/", "/industries/"].some(prefix => node.head.text.startsWith(prefix)) || (node.head.text === "/" && node.templateSpans.length === 1 && node.templateSpans[0].literal.text === "/")) {
        replace(node, templateCode(node, source, (text, index) => index === 0 ? "/uk" + text : text));
      }
    } else if (ts.isJsxExpression(node) && node.expression) {
      localizeHref(node.expression);
    } else if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
      localizeHref(node.left);
    } else if (ts.isConditionalExpression(node)) {
      localizeHref(node.whenTrue);
      localizeHref(node.whenFalse);
    }
  }

  const visit = node => {
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
      if (node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
        const next = rewriteImport(node.moduleSpecifier.text, filename);
        if (next !== node.moduleSpecifier.text) replace(node.moduleSpecifier, JSON.stringify(next));
      }
      return;
    }
    if (ts.isVariableDeclaration(node) && node.name.getText(source) === "LOCALE") {
      replace(node.initializer, '"uk"');
      return;
    }
    if (ts.isJsxAttribute(node) && node.name.getText(source) === "href" && node.initializer) {
      localizeHref(node.initializer);
      return;
    }
    if (ts.isPropertyAssignment(node) && node.name.getText(source).replaceAll('"', "") === "href") {
      localizeHref(node.initializer);
      return;
    }
    const message = messageForNode(node);
    if (message) {
      const value = catalogs[domain][message];
      assert(typeof value === "string", `${filename}: untranslated ${message}`);
      if (ts.isJsxText(node)) {
        // Preserve inline spaces around adjacent elements; indentation/newlines
        // retain the normal JSX whitespace semantics.
        const leading = node.text.match(/^\s*/)[0];
        const trailing = node.text.match(/\s*$/)[0];
        edits.push({ start: node.pos, end: node.end, text: `${leading}{${JSON.stringify(value)}}${trailing}` });
      } else if (ts.isTemplateExpression(node)) {
        replace(node, translatedTemplate(node, value, source));
      } else {
        replace(node, ts.isJsxAttribute(node.parent) ? `{${JSON.stringify(value)}}` : JSON.stringify(value));
      }
      return;
    }
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const asset = assets.get(node.text);
      if (asset) replace(node, ts.isJsxAttribute(node.parent) ? `{${JSON.stringify(asset)}}` : JSON.stringify(asset));
    } else if (ts.isTemplateExpression(node) && [node.head.text, ...node.templateSpans.map(span => span.literal.text)].some(text => assets.has(text))) {
      replace(node, templateCode(node, source, text => assets.get(text) ?? text));
      return;
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  let output = content;
  let boundary = content.length;
  for (const edit of edits.sort((a, b) => b.start - a.start)) {
    assert(edit.end <= boundary, `Overlapping localization edits: ${filename}`);
    output = output.slice(0, edit.start) + edit.text + output.slice(edit.end);
    boundary = edit.start;
  }
  const target = destination(filename);
  if (!checkOnly) {
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, `// Generated by scripts/i18n/generate.mjs; edit the English source or Ukrainian catalog.\n${output}`);
  }
}

const diagramKeys = new Set();
const xmlEscape = text => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
for (const filename of diagramFiles) {
  const svg = await readFile(filename, "utf8");
  let output = svg.replace(/(<(text|tspan|title|desc)\b[^>]*>)([^<]*)(<\/\2>)/g, (match, open, tag, text, close) => {
    const key = normalize(text);
    if (!key) return match;
    diagramKeys.add(key);
    assert(typeof catalogs.diagrams[key] === "string", `Missing SVG translation: ${key}`);
    // This caption's Ukrainian equivalent needs a slightly smaller font to
    // remain inside its original card. The diagram geometry stays shared.
    if (key === "Human review" && filename.endsWith("industry-frontier.svg")) open = open.replace('font-size="29"', 'font-size="27"');
    return open + xmlEscape(catalogs.diagrams[key]) + close;
  });
  const target = path.join(root, "public/uk", path.relative(path.join(root, "public"), filename));
  if (!checkOnly) {
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, output);
  }
}
assert.deepEqual(Object.keys(catalogs.diagrams).sort(), [...diagramKeys].sort(), "Stale SVG translation keys");
if (!checkOnly) await import("./og.mjs");
console.log(`Ukrainian localization ${checkOnly ? "checked" : "generated"}: ${messageCount} messages, ${files.length} modules, ${diagramFiles.length} diagrams, ${routes.size} content routes.`);
