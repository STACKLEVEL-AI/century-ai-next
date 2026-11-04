import type { AppCaptureId } from "@/lib/app-captures";
import type { IndustrySlug } from "@/lib/industries";

type IndustryVisual = {
  src: string;
  srcSet?: string;
  width: number;
  height: number;
  alt: string;
  position: string;
  capture: AppCaptureId;
  focus: string;
};

// Existing editorial settings, not customer premises. Application imagery uses
// only the unchanged genuine captures recorded in the asset provenance.
export const industryVisuals: Record<IndustrySlug, IndustryVisual> = {
  banking: {
    src: "/media/industry.webp", width: 1200, height: 670,
    alt: "A person with a briefcase walking through a busy stone-floored concourse",
    position: "50% 44%", capture: "files", focus: "Knowledge. Preparation. Review.",
  },
  telecommunication: {
    src: "/media/knowledge.webp", width: 1200, height: 675,
    alt: "An operations team working together in a warmly lit office",
    position: "64% 50%", capture: "models", focus: "Service. Context. Continuity.",
  },
  healthcare: {
    src: "/images/enterprise-atrium.webp", width: 1672, height: 941,
    srcSet: "/images/enterprise-atrium-640.webp 640w, /images/enterprise-atrium-960.webp 960w, /images/enterprise-atrium.webp 1672w",
    alt: "A quiet courtyard with pale stone, planting and curved glass architecture",
    position: "50% 52%", capture: "files", focus: "Information. Coordination. Care.",
  },
  utilities: {
    src: "/media/hero-poster.webp", width: 1800, height: 1013,
    srcSet: "/media/hero-poster-640.webp 640w, /media/hero-poster-960.webp 960w, /media/hero-poster.webp 1800w",
    alt: "An aerial view of buildings and infrastructure surrounded by trees",
    position: "53% 54%", capture: "models", focus: "Operations. Knowledge. Ownership.",
  },
  insurance: {
    src: "/media/deployment.webp", width: 1200, height: 670,
    alt: "A team member leading a discussion beside a whiteboard",
    position: "48% 43%", capture: "files", focus: "Evidence. Clarity. Judgement.",
  },
  retail: {
    src: "/media/workflows.webp", width: 1200, height: 675,
    alt: "An aerial view of a distribution centre with loading bays and trailers",
    position: "52% 50%", capture: "files", focus: "Service. Supply. Connection.",
  },
  airlines: {
    src: "/media/support.webp", width: 1200, height: 675,
    alt: "Travellers moving through a busy airport terminal",
    position: "53% 50%", capture: "models", focus: "Journeys. Context. Confidence.",
  },
};

export default function IndustryPhoto({ slug, className, priority = false, decorative = false }: {
  slug: IndustrySlug; className?: string; priority?: boolean; decorative?: boolean;
}) {
  const visual = industryVisuals[slug];
  return <img
    className={className}
    src={visual.src}
    srcSet={visual.srcSet}
    sizes={visual.srcSet ? (priority ? "100vw" : "(max-width: 700px) calc(100vw - 40px), (max-width: 1400px) calc(50vw - 52px), 648px") : undefined}
    alt={decorative ? "" : visual.alt}
    width={visual.width}
    height={visual.height}
    loading={priority ? "eager" : "lazy"}
    fetchPriority={priority ? "high" : undefined}
    decoding="async"
    style={{ objectPosition: visual.position }}
  />;
}
