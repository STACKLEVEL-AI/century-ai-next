import { ArrowRight, Check, FileText, Layers, LockKeyhole, Search, UserRoundCheck } from "lucide-react";

export default function ArticleArtwork({ slug, compact = false }: { slug: string; compact?: boolean }) {
  const variant = slug === "answers-need-sources" ? "sources" : slug === "human-review" ? "review" : slug === "plan-ai-deployment" ? "deployment" : "workflow";
  return <div className={`article-art article-art-${variant}${compact ? " article-art-compact" : ""}`} aria-hidden="true">
    <span className="article-art-label">CENTURY / GUIDES</span>
    {variant === "workflow" && <div className="article-art-flow"><div><FileText size={25} /><span>Request</span></div><ArrowRight size={24} /><div className="article-art-flow-active"><Layers size={25} /><span>Prepare</span></div><ArrowRight size={24} /><div><UserRoundCheck size={25} /><span>Review</span></div></div>}
    {variant === "sources" && <div className="article-art-source-scene"><div className="article-art-source-doc"><FileText size={22} /><i /><i /><i /><span>Approved source</span></div><div className="article-art-source-answer"><Search size={23} /><strong>Every answer.<br />A way to check.</strong><span><Check size={14} /> Source attached</span></div></div>}
    {variant === "review" && <div className="article-art-review-scene"><div className="article-art-review-card"><span>PROPOSED ACTION</span><i /><i /><div><UserRoundCheck size={21} /><strong>Ready for review</strong></div></div><span className="article-art-review-seal"><Check size={24} /></span></div>}
    {variant === "deployment" && <div className="article-art-deploy-scene"><div className="article-art-boundary"><LockKeyhole size={30} /><strong>Your environment</strong><span>Data · Access · Ownership</span><div><i /><i /><i /></div></div></div>}
    <span className="article-art-corner">Ideas for useful AI</span>
  </div>;
}
