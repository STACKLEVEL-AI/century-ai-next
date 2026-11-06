import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { assetSources, messagesInSource, parseSource, svgMessages } from "./source.mjs";
import { compileSource, compileSvg, createResolver, generateLocales, validatePlaceholders } from "./generate.mjs";

const filename = "src/components/Example.tsx";
const catalog = (messages = {}, assets = {}, keep = {}) => ({ messages, assets, keep });
function compile(source, messages, options = {}) {
  const errors = [];
  const resolver = createResolver(options.locale || "de", catalog({ [filename]: messages }), errors);
  const result = compileSource({ filename, source, locale: options.locale || "de", resolve: resolver.resolve, ...options });
  assert.deepEqual(errors, []);
  assert.deepEqual(parseSource(filename, result).parseDiagnostics, [], "generated TSX must parse");
  return result;
}

test("extractor requires short UI copy while protecting keyboard commands, IDs, types and selectors", () => {
  const source = `
    import type { KeyboardEvent } from "react";
    type Tab = "Home" | "End";
    const rows = [{ id: "Ready", label: "Ready", newLabel: "pending" }];
    function onKeyDown(event: KeyboardEvent) {
      switch (event.key) { case "ArrowRight": return 1; case "Home": return 0; }
      if (event.key === "End") return 2;
      if (["ArrowDown", "ArrowUp"].includes(event.key)) return 3;
      document.querySelector("#Ready");
    }
    const category = "All guides";
    export const View = () => <button id="Ready" className="Ready" aria-controls="Ready" aria-label="Choose">{category === "All guides" ? "Start" : "Continue"}</button>;
  `;
  const keys = messagesInSource(filename, source).map(message => message.key);
  for (const key of ["Ready", "pending", "Choose", "Start", "Continue", "All guides"]) assert.ok(keys.includes(key), key);
  for (const key of ["ArrowRight", "ArrowDown", "ArrowUp", "Home", "End", "#Ready", "react"]) assert.ok(!keys.includes(key), key);
  assert.equal(keys.filter(key => key === "Ready").length, 1);
});

test("complete templates reorder placeholders and recursively translate nested display expressions", () => {
  const source = 'export const View = ({ ok, name }) => <p>{`Hello ${name}, ${ok ? "Ready" : "Later"}!`}</p>;';
  const result = compile(source, { "Hello {0}, {1}!": "{1}: Hallo {0}!", Ready: "Bereit", Later: "Später" });
  assert.ok(result.includes('`${ok ? "Bereit" : "Später"}: Hallo ${name}!`'));
  const german = compile('export const View = ({ active }) => <a>{`Explore ${active.title.toLowerCase()}`}</a>;', { "Explore {0}": "Mehr erfahren: {0}" });
  assert.ok(german.includes('`Mehr erfahren: ${active.title}`'));
});

test("placeholder validation rejects missing, duplicated and newly introduced expressions", () => {
  assert.doesNotThrow(() => validatePlaceholders("{0} then {1}", "{1}, danach {0}"));
  assert.throws(() => validatePlaceholders("{0} then {1}", "{0}"), /placeholders differ/);
  assert.throws(() => validatePlaceholders("{0} then {1}", "{0} {0} {1}"), /placeholders differ/);
  assert.throws(() => validatePlaceholders("{0}", "{2}"), /placeholders differ/);
});

test("context overrides and literal whitespace survive migration; JSX entities decode once", () => {
  const source = 'const data = { title: "Insurance", operationLabel: "Insurance" }; export const View = () => <p>Security &amp; control<br />{" A tested workflow\\nA team "}</p>;';
  const result = compile(source, {
    Insurance: "Ubezpieczenia", "@operationLabel:Insurance": "ubezpieczeniach",
    "Security & control": "Bezpieczeństwo i kontrola", " A tested workflow\nA team ": " Sprawdzony proces\nZespół ",
  }, { locale: "pl" });
  assert.ok(result.includes('title: "Ubezpieczenia", operationLabel: "ubezpieczeniach"'));
  assert.ok(result.includes('{"Bezpieczeństwo i kontrola"}'));
  assert.ok(result.includes('" Sprawdzony proces\\nZespół "'));
});

test("route templates prefix once and retain query/fragment suffixes, while imports and assets keep their roles", () => {
  const source = `
    import styles from "./Example.module.css";
    import FooterBrand from "@/components/FooterBrand";
    import Other from "./Other";
    const items = [{ href: "/platform/?mode=cloud#controls", label: "Platform" }];
    export const View = ({ slug, query }) => <a href={\`/blog/\${slug}/?q=\${query}#details\`}><img src="/media/diagram.svg" alt="" /><FooterBrand href="/" /></a>;
    const absolute = \`\${SITE_URL}/platform/\`;
  `;
  const result = compile(source, { Platform: "Plattform" }, {
    routeRoots: new Set(["blog", "platform"]),
    destinations: new Map([["src/components/Other.tsx", "src/generated/de/components/Other.tsx"]]),
    assetMap: new Map([["/media/diagram.svg", "/media/de/diagram.svg"]]),
  });
  assert.ok(result.includes('href: "/de/platform/?mode=cloud#controls"'));
  assert.ok(result.includes('`/de/blog/${slug}/?q=${query}#details`'));
  assert.ok(result.includes('`${SITE_URL}/de/platform/`'));
  assert.ok(result.includes('src={"/media/de/diagram.svg"}'));
  assert.ok(result.includes('from "@/components/Example.module.css"'));
  assert.ok(result.includes('from "@/components/FooterBrand"'));
  assert.ok(result.includes('from "@/generated/de/components/Other"'));
  assert.ok(!result.includes('${slug}/de/'));
});

test("SVG coverage includes title, description and nested tspans with named and numeric entities", () => {
  const source = '<svg xmlns="http://www.w3.org/2000/svg"><title>Team &amp; review</title><desc>Source &#x26; result</desc><text x="10" y="20">Human <tspan>review</tspan></text></svg>';
  const file = "public/media/example.svg";
  const messages = svgMessages(source);
  assert.deepEqual(messages.map(message => message.key), ["Team & review", "Source & result", "Human", "review"]);
  const errors = [];
  const resolver = createResolver("uk", catalog({}, { [file]: { "Team & review": "Команда й перевірка", "Source & result": "Джерело й результат", Human: "Людина", review: "перевіряє" } }), errors);
  const result = compileSvg({ source, messages, filename: file, locale: "uk", resolve: resolver.resolve });
  assert.ok(result.includes('xml:lang="uk"'));
  assert.ok(result.includes('Людина <tspan>перевіряє</tspan>'));
  assert.deepEqual(errors, []);
  const incomplete = createResolver("pl", catalog({}, { [file]: { Human: "Człowiek" } }), errors);
  compileSvg({ source, messages, filename: file, locale: "pl", resolve: incomplete.resolve });
  assert.equal(errors.filter(error => error.includes("missing")).length, 3);
});

test("all locales use the existing SVG slot fitting", () => {
  const source = '<svg xmlns="http://www.w3.org/2000/svg"><text x="640" y="419" font-size="28">Human review</text></svg>';
  for (const locale of ["de", "pl", "uk", "fr", "be", "it", "es", "sr", "nl", "ro", "cs"]) {
    const result = compileSvg({ source, messages: svgMessages(source), filename: "public/media/insurance/platform.svg", locale, resolve: () => "A deliberately very long translated diagram label that must stay inside the original slot" });
    assert.match(result, /textLength="478"/);
    assert.match(result, /lengthAdjust="spacingAndGlyphs"/);
    assert.match(result, new RegExp(`xml:lang="${locale}"`));
  }
});

async function fixture() {
  const temporary = path.join(process.cwd(), ".localizations");
  await mkdir(temporary, { recursive: true });
  const root = await mkdtemp(path.join(temporary, "i18n-fixture-"));
  const put = async (name, content) => {
    await mkdir(path.dirname(path.join(root, name)), { recursive: true });
    await writeFile(path.join(root, name), typeof content === "string" ? content : JSON.stringify(content));
  };
  await put("src/locales/config.json", { defaultLocale: "en", locales: { en: {}, de: {}, pl: {}, sr: {}, cs: {} } });
  await put("src/app/(en)/page.tsx", 'export default function Page() { return <h1>Welcome</h1>; }');
  await put("src/components/Example.tsx", 'export const View = () => <p>Ready</p>;');
  await put("src/lib/locale.ts", 'export const LOCALE = "en";');
  await put("public/media/original.svg", '<svg><text>Review</text></svg>');
  await put("public/media/pl/stale.svg", '<svg><text>Obsolete Polish text</text></svg>');
  await put("public/media/sr/stale.svg", '<svg><text>Obsolete Serbian text</text></svg>');
  await put("public/media/cs/stale.svg", '<svg><text>Obsolete Czech text</text></svg>');
  const phrases = {
    de: { welcome: "Willkommen", ready: "Bereit", review: "Prüfung" },
    pl: { welcome: "Witamy", ready: "Gotowe", review: "Weryfikacja" },
    sr: { welcome: "Dobro došli", ready: "Spremno", review: "Provera" },
    cs: { welcome: "Vítejte", ready: "Připraveno", review: "Kontrola" },
  };
  for (const [locale, copy] of Object.entries(phrases)) {
    await put(`src/locales/${locale}/messages.json`, { "src/app/(en)/page.tsx": { Welcome: copy.welcome }, "src/components/Example.tsx": { Ready: copy.ready } });
    await put(`src/locales/${locale}/assets.json`, { "public/media/original.svg": { Review: copy.review } });
    await put(`src/locales/${locale}/keep.json`, {});
    await put(`src/generated/${locale}/sentinel.txt`, "previous successful generation");
  }
  return { root, put };
}

async function snapshot(directory, prefix = "") {
  const entries = await readdir(path.join(directory, prefix), { withFileTypes: true });
  const result = {};
  for (const entry of entries) {
    const name = path.posix.join(prefix, entry.name);
    if (entry.isDirectory()) Object.assign(result, await snapshot(directory, name));
    else result[name] = (await readFile(path.join(directory, name))).toString("base64");
  }
  return result;
}

test("check is read-only and SVG discovery excludes every generated locale subtree", async () => {
  const { root } = await fixture();
  try {
    assert.deepEqual([...await assetSources(root, ["en", "de", "pl", "sr", "cs"])].map(([file]) => file), ["public/media/original.svg"]);
    const before = await snapshot(root);
    const result = await generateLocales({ root, check: true, socialImages: false });
    assert.equal(result.summaries.length, 4);
    assert.deepEqual(await snapshot(root), before);
    assert.ok(result.outputs.has("src/generated/pl/components/Example.tsx"));
    assert.ok(result.outputs.has("src/generated/sr/components/Example.tsx"));
    assert.ok(result.outputs.has("src/generated/cs/components/Example.tsx"));
    assert.ok(![...result.outputs.keys()].some(file => file.includes("media/de/pl/")));
    assert.ok(![...result.outputs.keys()].some(file => file.includes("media/de/sr/")));
    assert.ok(![...result.outputs.keys()].some(file => file.includes("media/de/cs/")));
    await generateLocales({ root, socialImages: false });
    const generated = await snapshot(root);
    assert.ok(!Object.hasOwn(generated, "public/media/pl/stale.svg"));
    assert.ok(!Object.hasOwn(generated, "public/media/sr/stale.svg"));
    assert.ok(!Object.hasOwn(generated, "public/media/cs/stale.svg"));
    assert.ok(!Object.hasOwn(generated, "src/generated/de/sentinel.txt"));
    assert.ok(Object.hasOwn(generated, "public/media/pl/original.svg"));
    assert.ok(Object.hasOwn(generated, "public/media/sr/original.svg"));
    assert.ok(Object.hasOwn(generated, "public/media/cs/original.svg"));
  } finally { await rm(root, { recursive: true, force: true }); }
});

test("missing copy or stale catalogs abort every locale before changing existing output", async () => {
  const { root, put } = await fixture();
  try {
    await put("src/locales/pl/messages.json", { "src/app/(en)/page.tsx": { Welcome: "Witamy", "Removed heading": "Usunięty nagłówek" } });
    const before = await snapshot(root);
    await assert.rejects(generateLocales({ root, socialImages: false }), error => /missing.*Ready/.test(error.message) && /stale.*Removed heading/.test(error.message));
    assert.deepEqual(await snapshot(root), before);
    await put("src/locales/pl/messages.json", { "src/app/(en)/page.tsx": { Welcome: "Witamy" }, "src/components/Example.tsx": { Ready: "Gotowe" } });
    await put("public/media/original.svg", '<svg><text>Review</text><text>New label</text></svg>');
    const withNewSvg = await snapshot(root);
    await assert.rejects(generateLocales({ root, socialImages: false }), /missing.*New label/);
    assert.deepEqual(await snapshot(root), withNewSvg);
  } finally { await rm(root, { recursive: true, force: true }); }
});

test("metadata wrappers and LOCALE are bound explicitly without copying shared metadata logic", () => {
  const resolve = () => { throw new Error("Shared metadata must not be cataloged"); };
  const output = compileSource({ filename: "src/lib/metadata.ts", source: "throw new Error('not copied');", locale: "uk", resolve });
  assert.ok(output.includes('from "@/lib/metadata"'));
  assert.ok(output.includes('page(title, description, path, "uk")'));
  assert.ok(output.includes('home(title, description, "uk")'));
  assert.ok(!output.includes("not copied"));
  const locale = compileSource({ filename: "src/lib/locale.ts", source: 'export const LOCALE = "en";', locale: "pl", resolve });
  assert.ok(locale.includes('LOCALE: Locale = "pl"'));
});
