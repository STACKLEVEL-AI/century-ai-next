// Optional maintenance: npm run assets:film. Never called by build or CI.
// Requires Node.js 20+, FFmpeg (libx264/libwebp) and ffprobe.
// Inputs, cuts and crop points come from docs/stock-video-manifest.json.
// Raw source clips stay in an ignored cache, outside the published assets.
// Source hashes are pinned; encoded hashes can vary with FFmpeg/libx264 versions.
import { spawnSync } from "node:child_process";
import { createHash, randomUUID } from "node:crypto";
import { createReadStream, createWriteStream } from "node:fs";
import { copyFile, mkdir, mkdtemp, readFile, rename, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const variants = [
  { file: "enterprise-film.mp4", width: 1280, height: 720, bitrate: 700, label: "desktop" },
  { file: "enterprise-film-mobile.mp4", width: 540, height: 960, bitrate: 410, label: "mobile" },
];
const websitePath = (name) => name.startsWith("scene-") ? path.join("stock", name) : name;

function optionsFrom(argv) {
  const options = {
    manifest: path.join(root, "docs/stock-video-manifest.json"),
    cache: path.join(root, "node_modules/.cache/century-stock-video"),
    output: path.join(root, "public/media"),
    offline: false,
    verifySources: false,
  };
  const flags = { "--manifest": "manifest", "--cache-dir": "cache", "--output-dir": "output" };
  for (let index = 0; index < argv.length; index++) {
    const argument = argv[index];
    if (argument === "--offline") options.offline = true;
    else if (argument === "--verify-sources") options.verifySources = true;
    else if (flags[argument] && argv[index + 1] && !argv[index + 1].startsWith("--")) {
      options[flags[argument]] = path.resolve(argv[++index]);
    } else {
      throw new Error("Unknown or incomplete option: " + argument + ". Use --help.");
    }
  }
  return options;
}

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

async function exists(file) {
  try { await stat(file); return true; }
  catch (error) { if (error.code === "ENOENT") return false; throw error; }
}

async function sha256(file) {
  const hash = createHash("sha256");
  for await (const chunk of createReadStream(file)) hash.update(chunk);
  return hash.digest("hex");
}

function run(program, args) {
  const result = spawnSync(program, args, { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 });
  if (result.error) throw new Error("Cannot run " + program + "; install the required media tools.", { cause: result.error });
  if (result.status !== 0) throw new Error(program + " failed:\n" + result.stderr.slice(-5000));
  return result.stdout;
}

function validateManifest(manifest) {
  const editing = manifest.editing;
  requireCondition(editing?.fps === 24 && editing.duration_seconds === 24
    && editing.transitions === "Straight cuts" && editing.audio_removed === true,
  "Expected the reviewed 24-second, 24fps silent straight-cut recipe.");
  requireCondition(Array.isArray(manifest.sources) && manifest.sources.length === 8,
    "Expected eight licensed source scenes.");
  const keys = new Set();
  let timeline = 0;
  const sources = manifest.sources.map((source) => {
    requireCondition(/^[a-z0-9]+(?:[_-][a-z0-9]+)*$/.test(source.key) && !keys.has(source.key),
      "Invalid or duplicate source key.");
    keys.add(source.key);
    requireCondition(/^[a-f0-9]{64}$/i.test(source.source_sha256), "Missing SHA-256 for " + source.key);
    const url = new URL(source.mp4_url);
    requireCondition(url.protocol === "https:" && !url.username && !url.password,
      "Source must have a canonical HTTPS URL: " + source.key);
    const duration = source.source_out_seconds - source.source_in_seconds;
    requireCondition(Number.isFinite(source.source_in_seconds) && source.source_in_seconds >= 0
      && Number.isFinite(duration) && Math.abs(duration - 3) < 0.000001
      && source.timeline_in_seconds === timeline && source.timeline_out_seconds === timeline + duration,
    "Invalid source range or timeline for " + source.key);
    requireCondition(Number.isFinite(source.mobile_focus_x) && source.mobile_focus_x >= 0
      && source.mobile_focus_x <= 1, "Invalid portrait focus for " + source.key);
    timeline += duration;
    return { ...source, duration, source_sha256: source.source_sha256.toLowerCase() };
  });
  requireCondition(timeline === editing.duration_seconds, "Scene durations do not match the film.");

  const stills = editing.stills;
  requireCondition(Array.isArray(stills) && stills.length === 12, "Expected four posters and eight scene stills.");
  const expectedStills = new Map([
    ["hero-poster.webp", [1280, 720]], ["hero-poster-960.webp", [960, 540]],
    ["hero-poster-640.webp", [640, 360]], ["hero-poster-mobile.webp", [540, 960]],
    ...sources.map((source) => ["scene-" + source.key.replaceAll("_", "-") + ".webp", [960, 540]]),
  ]);
  const used = new Set();
  for (const still of stills) {
    const dimensions = expectedStills.get(still.file);
    const source = sources.find((item) => item.key === still.source_key);
    requireCondition(dimensions && !used.has(still.file)
      && dimensions[0] === still.width && dimensions[1] === still.height
      && source && Number.isFinite(still.source_time_seconds)
      && still.source_time_seconds >= source.source_in_seconds
      && still.source_time_seconds < source.source_out_seconds,
    "Invalid still specification: " + still.file);
    used.add(still.file);
  }
  const encoding = editing.encoding;
  requireCondition(encoding?.video_codec === "libx264" && encoding.preset === "slow"
    && encoding.profile === "high" && encoding.level === "3.1" && encoding.pixel_format === "yuv420p"
    && encoding.desktop_bitrate_kbps === 700 && encoding.mobile_bitrate_kbps === 410
    && encoding.maxrate_multiplier === 1.6 && encoding.buffer_multiplier === 3
    && encoding.gop_frames === 48 && encoding.keyint_min_frames === 24
    && encoding.faststart === true && encoding.container_brand === "mp42" && encoding.audio_streams === 0,
  "The manifest encoding recipe changed; review this maintenance script before regenerating.");
  const webp = editing.stills_encoding;
  requireCondition(webp?.codec === "libwebp" && webp.quality === 78
    && webp.compression_level === 6 && webp.scale_filter === "lanczos", "Unexpected still encoding recipe.");
  const names = [...variants.map((variant) => variant.file), ...stills.map((still) => still.file)];
  requireCondition(Array.isArray(manifest.website_assets) && manifest.website_assets.length === names.length
    && names.every((name) => manifest.website_assets.includes(name)), "Website asset inventory does not match the recipe.");
  return { sources, stills, names };
}

async function cachedSource(source, options) {
  const target = path.join(options.cache, source.key + ".mp4");
  if (await exists(target) && await sha256(target) === source.source_sha256) {
    console.log("Verified cached source: " + source.key);
    return target;
  }
  requireCondition(!options.offline, "Offline cache is missing or has a different SHA-256: " + source.key);
  const partial = path.join(options.cache, "." + source.key + "-" + randomUUID() + ".download");
  console.log("Downloading canonical source: " + source.key);
  try {
    const response = await fetch(source.mp4_url, { signal: AbortSignal.timeout(180_000), redirect: "follow" });
    requireCondition(response.ok && response.body, "Download failed for " + source.key + ": HTTP " + response.status);
    await pipeline(Readable.fromWeb(response.body), createWriteStream(partial, { flags: "wx" }));
    requireCondition(await sha256(partial) === source.source_sha256,
      "Source SHA-256 changed for " + source.key + ". Review the source and manifest; no assets were installed.");
    await rename(partial, target);
    return target;
  } finally {
    await rm(partial, { force: true });
  }
}

function shapeFilter(source, width, height) {
  if (width < height) {
    return "crop=w='trunc(ih*9/16/2)*2':h=ih:x='max(0,min(iw-ow,iw*"
      + source.mobile_focus_x + "-ow/2))':y=0,scale=" + width + ":" + height + ":flags=lanczos,setsar=1";
  }
  return "scale=" + width + ":" + height + ":force_original_aspect_ratio=increase:flags=lanczos,crop="
    + width + ":" + height + ",setsar=1";
}

async function encodeFilm(variant, sources, stage) {
  const inputs = sources.flatMap((source) => [
    "-ss", String(source.source_in_seconds), "-t", String(source.duration), "-i", source.local,
  ]);
  const filters = sources.map((source, index) => "[" + index + ":v:0]setpts=PTS-STARTPTS,"
    + shapeFilter(source, variant.width, variant.height) + ",fps=24,trim=duration=" + source.duration
    + ",setpts=PTS-STARTPTS[v" + index + "]");
  filters.push(sources.map((_, index) => "[v" + index + "]").join("")
    + "concat=n=" + sources.length + ":v=1:a=0[out]");
  const filterFile = path.join(stage, "filter-" + variant.label + ".txt");
  await writeFile(filterFile, filters.join(";"));
  const common = [
    "-nostdin", "-y", "-loglevel", "warning", "-filter_complex_threads", "2", ...inputs,
    "-filter_complex_script", filterFile, "-map", "[out]", "-an", "-sn", "-dn", "-map_metadata", "-1",
    "-c:v", "libx264", "-preset", "slow", "-profile:v", "high", "-level:v", "3.1", "-pix_fmt", "yuv420p",
    "-b:v", variant.bitrate + "k", "-maxrate", Math.round(variant.bitrate * 1.6) + "k",
    "-bufsize", variant.bitrate * 3 + "k", "-g", "48", "-keyint_min", "24", "-threads", "4",
    "-passlogfile", path.join(stage, "x264-" + variant.label), "-t", "24",
  ];
  for (const pass of [1, 2]) {
    console.log("Encoding " + variant.label + ", pass " + pass + "/2");
    run("ffmpeg", [...common, "-pass", String(pass), ...(pass === 1
      ? ["-f", "null", "-"]
      : ["-movflags", "+faststart", "-brand", "mp42", path.join(stage, variant.file)])]);
  }
}

async function probe(file) {
  requireCondition((await stat(file)).size > 0, "Empty media output: " + path.basename(file));
  return JSON.parse(run("ffprobe", ["-v", "error", "-show_streams", "-show_format", "-of", "json", file]));
}

async function validateStill(file, still) {
  const data = await probe(file);
  const stream = data.streams.find((item) => item.codec_type === "video");
  requireCondition(stream?.codec_name === "webp" && stream.width === still.width && stream.height === still.height,
    "Unexpected still dimensions or format: " + still.file);
  run("ffmpeg", ["-nostdin", "-v", "error", "-xerror", "-i", file, "-frames:v", "1", "-f", "null", "-"]);
}

async function extractStill(still, source, stage) {
  const target = path.join(stage, still.file);
  // Output seeking avoids occasional empty WebP output from input seeking.
  const args = [
    "-nostdin", "-y", "-loglevel", "error", "-threads", "2", "-i", source.local,
    "-ss", String(still.source_time_seconds), "-map", "0:v:0", "-an", "-sn", "-dn", "-frames:v", "1",
    "-vf", shapeFilter(source, still.width, still.height),
    "-c:v", "libwebp", "-quality", "78", "-compression_level", "6", "-threads", "2", target,
  ];
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      run("ffmpeg", args);
      await validateStill(target, still);
      return;
    } catch (error) {
      await rm(target, { force: true });
      if (attempt) throw error;
      console.warn("Retrying still extraction after a failed decode: " + still.file);
    }
  }
}

async function validateFilm(variant, stage) {
  const file = path.join(stage, variant.file);
  const data = await probe(file);
  const stream = data.streams.find((item) => item.codec_type === "video");
  requireCondition(stream?.codec_name === "h264" && stream.pix_fmt === "yuv420p"
    && stream.width === variant.width && stream.height === variant.height
    && stream.r_frame_rate === "24/1" && Math.abs(Number(data.format.duration) - 24) < 0.042
    && !data.streams.some((item) => item.codec_type === "audio"), "Film format check failed: " + variant.file);
  const buffer = await readFile(file);
  const atoms = new Map();
  for (let offset = 0; offset + 8 <= buffer.length;) {
    const type = buffer.toString("ascii", offset + 4, offset + 8);
    let size = buffer.readUInt32BE(offset);
    if (size === 1 && offset + 16 <= buffer.length) size = Number(buffer.readBigUInt64BE(offset + 8));
    if (size === 0) size = buffer.length - offset;
    requireCondition(size >= 8 && offset + size <= buffer.length, "Invalid MP4 atom: " + variant.file);
    atoms.set(type, offset);
    offset += size;
  }
  requireCondition(atoms.has("moov") && atoms.has("mdat") && atoms.get("moov") < atoms.get("mdat"),
    "MP4 is missing faststart: " + variant.file);
}

async function installOutputs(names, stage, output) {
  // Every source download and media check finishes before production files change.
  await mkdir(output, { recursive: true });
  const transaction = await mkdtemp(path.join(output, ".stock-update-"));
  const original = new Set();
  const installed = [];
  let keepRecovery = false;
  try {
    for (const name of names) {
      const relative = websitePath(name);
      const prepared = path.join(transaction, "new", relative);
      const backup = path.join(transaction, "old", relative);
      await mkdir(path.dirname(prepared), { recursive: true });
      await copyFile(path.join(stage, name), prepared);
      if (await exists(path.join(output, relative))) {
        await mkdir(path.dirname(backup), { recursive: true });
        await copyFile(path.join(output, relative), backup);
        original.add(relative);
      }
    }
    for (const name of names) {
      const relative = websitePath(name);
      await mkdir(path.dirname(path.join(output, relative)), { recursive: true });
      await rename(path.join(transaction, "new", relative), path.join(output, relative));
      installed.push(relative);
    }
  } catch (error) {
    try {
      for (const relative of installed.reverse()) {
        if (original.has(relative)) await copyFile(path.join(transaction, "old", relative), path.join(output, relative));
        else await rm(path.join(output, relative), { force: true });
      }
    } catch (restoreError) {
      keepRecovery = true;
      throw new AggregateError([error, restoreError], "Could not restore every prior asset. Recovery copies: " + transaction);
    }
    throw error;
  } finally {
    if (!keepRecovery) await rm(transaction, { recursive: true, force: true });
  }
}

async function main() {
  if (process.argv.includes("--help")) {
    console.log("Usage: npm run assets:film -- [--manifest FILE] [--cache-dir DIR] [--output-dir DIR] [--offline] [--verify-sources]\n"
      + "Default manifest: docs/stock-video-manifest.json\n"
      + "Default cache: node_modules/.cache/century-stock-video (key.mp4 files; SHA-256 checked on every run)\n"
      + "Default output: public/media; scene stills go in its stock/ subdirectory.\n"
      + "Use --output-dir for a separate review build. --offline requires every pinned original in the cache.\n"
      + "--verify-sources checks the manifest, source hashes and source durations without encoding or installing assets.");
    return;
  }
  requireCondition(Number(process.versions.node.split(".")[0]) >= 20, "Use Node.js 20 or newer.");
  const options = optionsFrom(process.argv.slice(2));
  console.log(run("ffmpeg", ["-version"]).split("\n")[0]);
  console.log(run("ffprobe", ["-version"]).split("\n")[0]);
  const manifest = JSON.parse(await readFile(options.manifest, "utf8"));
  const { sources, stills, names } = validateManifest(manifest);
  await mkdir(options.cache, { recursive: true });
  // Finish every download and hash check before creating replacement assets.
  for (const source of sources) {
    source.local = await cachedSource(source, options);
    const data = await probe(source.local);
    requireCondition(Number(data.format.duration) + 0.042 >= source.source_out_seconds,
      "Source is shorter than its selected range: " + source.key);
  }
  if (options.verifySources) {
    console.log("Verified eight pinned sources and the complete 24-second / 14-asset recipe. No output assets changed.");
    return;
  }
  const stage = await mkdtemp(path.join(options.cache, "render-"));
  try {
    for (const variant of variants) {
      await encodeFilm(variant, sources, stage);
      await validateFilm(variant, stage);
    }
    for (const still of stills) {
      await extractStill(still, sources.find((source) => source.key === still.source_key), stage);
    }
    const outputs = [];
    for (const name of names) {
      const file = path.join(stage, name);
      outputs.push({ file: name, bytes: (await stat(file)).size, sha256: await sha256(file) });
    }
    await installOutputs(names, stage, options.output);
    const expected = new Map((manifest.outputs || []).map((item) => [item.file, item.sha256]));
    const comparable = outputs.filter((item) => expected.has(item.file));
    console.log(JSON.stringify({
      output: options.output, assets_installed: names.length, sources_verified: sources.length,
      duration_seconds: 24, fps: 24, videos: outputs.slice(0, 2), stills_decoded: stills.length,
      manifest_hashes_checked: comparable.length,
      manifest_hashes_matched: comparable.filter((item) => item.sha256 === expected.get(item.file)).length,
      differing_hashes: comparable.filter((item) => item.sha256 !== expected.get(item.file)).map((item) => item.file),
    }, null, 2));
  } finally {
    await rm(stage, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error("Stock media regeneration failed: " + error.message);
  process.exitCode = 1;
});
