import Image from "next/image";

const covers: Record<string, { src: string; position: string }> = {
  "choose-first-ai-workflow": { src: "/media/workflows.webp", position: "center" },
  "answers-need-sources": { src: "/media/knowledge.webp", position: "center" },
  "human-review": { src: "/media/support.webp", position: "center" },
  "plan-ai-deployment": { src: "/images/enterprise-atrium.webp", position: "center" },
};

export default function ArticleArtwork({ slug, compact = false, priority = false }: {
  slug: string;
  compact?: boolean;
  priority?: boolean;
}) {
  const cover = covers[slug] ?? covers["choose-first-ai-workflow"];
  return <div className={`co-guide-cover${compact ? " co-guide-cover-compact" : ""}`}><Image src={cover.src} alt="" fill sizes={compact ? "(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 45vw" : "(max-width: 700px) 100vw, 90vw"} style={{ objectPosition: cover.position }} priority={priority} /></div>;
}
