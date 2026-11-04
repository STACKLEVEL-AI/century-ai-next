import { ArrowUpRight } from "lucide-react";
export default function HomeApproach() {
  return <section className="section process-section" id="how-we-start"><div className="shell">
    <div className="section-heading process-heading"><p className="eyebrow">Deployment & strategy</p><h2>From the first workflow<br />to everyday use.</h2><p>Bring the technical decisions and the business decisions together, with a clear owner at every step.</p></div>
    <div className="process-intro-grid">
      <article className="process-intro-card process-intro-deployment"><p className="panel-label">Deployment</p><h3>Built around your environment.</h3><p>Connect the sources you need. Agree where information is processed, who reviews exceptions and how the team takes ownership.</p><a className="text-link" href="/deployment/">Explore deployment<ArrowUpRight size={18} aria-hidden="true" /></a></article>
      <article className="process-intro-card process-intro-strategy"><p className="panel-label">AI strategy</p><h3>The right problem comes first.</h3><p>Choose a workflow worth improving. Set a baseline, define a useful outcome and use the evidence to decide what follows.</p><a className="text-link" href="/ai-transformation/">Explore the approach<ArrowUpRight size={18} aria-hidden="true" /></a></article>
    </div>
  </div></section>;
}
