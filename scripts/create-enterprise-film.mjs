// Optional asset maintenance. Requires FFmpeg; not part of the site build.
// The film contains only animated generated stills, with no source-video frames.
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const media = fileURLToPath(new URL("../public/media/", import.meta.url));
const shots = [
  { file: "hero-poster.webp", duration: 4, zoom: "1+0.03*on/95" },
  { file: "workflows.webp", duration: 4, zoom: "1.03-0.03*on/95" },
  { file: "knowledge.webp", duration: 4, zoom: "1+0.025*on/95" },
  { file: "support.webp", duration: 4, zoom: "1.025-0.025*on/95" },
  // Finish on the opening photograph for a quiet loop back to the first frame.
  { file: "hero-poster.webp", duration: 1, zoom: "1" },
];
const inputs = shots.flatMap(({ file, duration }) => [
  "-loop", "1", "-framerate", "24", "-t", String(duration), "-i", `${media}${file}`,
]);
const filters = shots.map(({ zoom }, index) =>
  `[${index}:v]scale=2560:1440:force_original_aspect_ratio=increase,crop=2560:1440,` +
  `zoompan=z='${zoom}':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=1:s=1280x720:fps=24,` +
  `setsar=1,settb=1/24,format=yuv420p[v${index}]`
);
filters.push(
  "[v0][v1]xfade=transition=fade:duration=1:offset=3[f1]",
  "[f1][v2]xfade=transition=fade:duration=1:offset=6[f2]",
  "[f2][v3]xfade=transition=fade:duration=1:offset=9[f3]",
  "[f3][v4]xfade=transition=fade:duration=1:offset=12,format=yuv420p[film]",
);

const result = spawnSync("ffmpeg", [
  "-hide_banner", "-loglevel", "error", "-y", "-filter_complex_threads", "1",
  ...inputs,
  "-filter_complex", filters.join(";"), "-map", "[film]",
  "-an", "-t", "13", "-r", "24", "-c:v", "libx264", "-preset", "slow",
  "-crf", "26", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-threads", "2",
  `${media}enterprise-film.mp4`,
], { stdio: "inherit" });

if (result.error) throw new Error("Install FFmpeg to regenerate the background film.", { cause: result.error });
if (result.status !== 0) process.exit(result.status || 1);
console.log("Created public/media/enterprise-film.mp4 (13s, 1280×720, 24fps, silent generated-still montage)");
