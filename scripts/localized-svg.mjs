/**
 * Keep translated text inside the existing diagram slots without truncation.
 *
 * These budgets describe the ten maintained Century diagrams, in viewBox units.
 * Latin Helvetica metrics (or fixed-width metrics for monospace) make fitting
 * deterministic on developer machines and CI, without browser/font downloads.
 * A small margin allows for the Arial/Helvetica fallback used by the artwork.
 * Short labels retain their original typography. Longer labels are scaled
 * modestly first; SVG textLength bounds any remaining horizontal overflow.
 */
const latinWidths = {
  A: 667, B: 667, C: 722, D: 722, E: 667, F: 611, G: 778, H: 722,
  I: 278, J: 500, K: 667, L: 556, M: 833, N: 722, O: 778, P: 667,
  Q: 778, R: 722, S: 667, T: 611, U: 722, V: 667, W: 944, X: 667,
  Y: 667, Z: 611,
  a: 556, b: 556, c: 500, d: 556, e: 556, f: 278, g: 556, h: 556,
  i: 222, j: 222, k: 500, l: 222, m: 833, n: 556, o: 556, p: 556,
  q: 556, r: 333, s: 500, t: 278, u: 556, v: 500, w: 722, x: 500,
  y: 500, z: 500, "ß": 556,
  " ": 278, ".": 278, ",": 278, ":": 278, ";": 278, "!": 278,
  "?": 556, "-": 333, "–": 556, "—": 1000, "·": 278, "/": 278,
  "&": 667, "(": 333, ")": 333, "'": 191, "’": 222, "\"": 355,
};

const platformDiagrams = new Set([
  "/media/industries/airlines/platform.svg",
  "/media/industries/healthcare/platform.svg",
  "/media/industries/utilities/platform.svg",
  "/media/insurance/platform.svg",
]);

function slotFor(url, x, y) {
  if (platformDiagrams.has(url)) {
    if (y === 212 && [240, 640, 1040].includes(x)) return { width: 352, size: 22, mono: true };
    if (y === 676 && [208, 640, 1072].includes(x)) return { width: x === 640 ? 352 : 320, size: 22, mono: true };
    if (x === 640 && y === 419) return { width: 478, size: 28, mono: true };
    return null;
  }
  const diagram = url.match(/^\/media\/century\/diagrams\/industry-(deployment|frontier|governance|platform)\.svg$/)?.[1];
  if (!diagram) return null; // platform-data/security contain no visible text.
  if (x === 88 && y === 92) return { width: 1104, size: 19, spacing: 3 };
  if (x === 88 && y === 151) return { width: 1104, size: 38 };
  if (diagram === "deployment") {
    if ([116, 404, 692, 980].includes(x)) {
      if (y === 449) return { width: 184, size: 30 };
      if (y === 495 || y === 525) return { width: 184, size: 18 };
    }
    if (x === 88 && y === 699) return { width: 1104, size: 24 };
  }
  if (diagram === "frontier") {
    if ([126, 528, 930].includes(x)) {
      if (y === 346) return { width: 224, size: 25 };
      if (y === 397) return { width: 224, size: 29 };
      if (y === 436 || y === 465) return { width: 224, size: 20 };
    }
    if ([236, 566, 896].includes(x) && y === 656) return { width: 186, size: 21 };
  }
  if (diagram === "governance") {
    if (x === 518 && y === 257) return { width: 300, size: 28 };
    if (x === 173 && y === 667) return { width: 313, size: 28 };
    if (x === 861 && y === 667) return { width: 299, size: 28 };
    if (x === 640 && y === 414) return { width: 396, size: 35 };
    if (x === 640 && y === 455) return { width: 396, size: 21 };
  }
  if (diagram === "platform") {
    if ([138, 974].includes(x) && [293, 469, 645].includes(y)) return { width: 190, size: 23 };
    if (x === 640 && y === 444) return { width: 292, size: 46 };
    if (x === 640 && y === 486) return { width: 292, size: 20 };
  }
  return null;
}

function decoded(value) {
  const entities = { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " " };
  return value.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi, (match, entity) => {
    if (entity[0] !== "#") return entities[entity.toLowerCase()] ?? match;
    const hex = entity[1].toLowerCase() === "x";
    return String.fromCodePoint(Number.parseInt(entity.slice(hex ? 2 : 1), hex ? 16 : 10));
  });
}

function estimatedWidth(text, size, spacing, mono) {
  const characters = Array.from(text.normalize("NFD").replace(/\p{M}/gu, ""));
  const units = characters.reduce((sum, character) => sum + (mono ? 602 : latinWidths[character] ?? (/\d/.test(character) ? 556 : 600)), 0);
  return units * size / 1000 + Math.max(0, characters.length - 1) * spacing;
}

function attribute(attributes, name) {
  return attributes.match(new RegExp(`(?:^|\\s)${name}="([^"]*)"`))?.[1];
}

function setAttribute(attributes, name, value) {
  const expression = new RegExp(`\\s${name}="[^"]*"`);
  const replacement = ` ${name}="${value}"`;
  return expression.test(attributes) ? attributes.replace(expression, replacement) : attributes + replacement;
}

export function fitLocalizedSvg(source, originalUrl) {
  return source.replace(/<text\b([^>]*)>([^<]*)<\/text>/g, (element, attributes, content) => {
    const slot = slotFor(originalUrl, Number(attribute(attributes, "x")), Number(attribute(attributes, "y")));
    if (!slot) return element;
    const text = decoded(content);
    const originalSize = Number(attribute(attributes, "font-size") ?? slot.size);
    const spacing = Number(attribute(attributes, "letter-spacing") ?? slot.spacing ?? 0);
    const estimated = estimatedWidth(text, originalSize, spacing, slot.mono);
    const safeWidth = estimated * 1.03;
    if (!Number.isFinite(safeWidth) || safeWidth <= slot.width) return element;

    let size = originalSize;
    const ratio = slot.width / safeWidth;
    // Avoid visibly narrow glyphs for material expansion; cap font reduction at
    // 18% so the hierarchy and legibility of the existing diagrams stay intact.
    if (ratio < 0.92) {
      size = Math.max(originalSize * 0.82, Math.floor(originalSize * ratio * 10) / 10);
      attributes = setAttribute(attributes, "font-size", Number(size.toFixed(2)));
    }
    if (estimatedWidth(text, size, spacing, slot.mono) * 1.03 > slot.width) {
      attributes = setAttribute(attributes, "textLength", slot.width);
      attributes = setAttribute(attributes, "lengthAdjust", "spacingAndGlyphs");
    }
    return `<text${attributes}>${content}</text>`;
  });
}
