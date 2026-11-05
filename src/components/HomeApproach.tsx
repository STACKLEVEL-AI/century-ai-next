import { ArrowUpRight } from "lucide-react";

export default function HomeApproach() {
  return <section className="section process-section" id="how-we-start" aria-label="Deployment and strategy"><div className="shell process-intro-grid">
    <article className="process-intro-card process-intro-deployment"><img src="/media/deployment.webp" alt="" width={1200} height={670} loading="lazy" /><div><p className="panel-label">Deployment</p><h3>Built with you<br />Ready for everyday work</h3><p>Audit a process, test a focused pilot and train your team to build, evaluate and maintain the next workflows</p><a className="btn btn-light" href="/deployment/">Explore deployment<ArrowUpRight size={17} aria-hidden="true" /></a></div></article>
    <article className="process-intro-card process-intro-strategy"><img src="/media/strategy.webp" alt="" width={1054} height={1451} loading="lazy" /><div><p className="panel-label">AI strategy</p><h3>The right approach<br />For every task</h3><p>Assess ownership, data readiness, effort and expected value. Choose agents, RPA, chat, process redesign or work that stays with people</p><a className="btn btn-light" href="/ai-transformation/">Explore the approach<ArrowUpRight size={17} aria-hidden="true" /></a></div></article>
  </div></section>;
}
