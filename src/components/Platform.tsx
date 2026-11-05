import { ArrowUpRight } from "lucide-react";
import AppScreenshot from "@/components/AppScreenshot";

export default function Platform() {
  return <section className="section platform-section" id="platform" aria-labelledby="platform-title">
    <div className="platform-grain" aria-hidden="true" />
    <div className="shell platform-layout">
      <div className="section-heading platform-heading"><p className="eyebrow">Century AI OS</p><h2 id="platform-title">Three stages<br />One connected platform</h2><p>Qualify business requests, build agents and workflows, then track quality, impact, versions and access. Findings from everyday use inform the next specification</p><a className="btn btn-light" href="/ai-os/">Explore the AI OS<ArrowUpRight size={17} aria-hidden="true" /></a></div>
      <div className="app-capture-grid app-platform-captures"><AppScreenshot capture="models" /><AppScreenshot capture="files" /></div>
    </div>
  </section>;
}

