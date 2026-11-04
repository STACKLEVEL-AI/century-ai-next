import { ArrowUpRight } from "lucide-react";

const scenarios = [
  {
    name: "Employee assistance", image: "knowledge", title: "Company knowledge.\nReady when you need it.",
    body: "Connect your people with answers grounded in the knowledge your business already has.",
    audience: "For operations, HR and internal service teams.",
    flow: ["Question", "Approved sources", "Referenced answer"],
    measure: "Time to find an answer, answer usefulness and source coverage.",
  },
  {
    name: "Business operations", image: "workflows", title: "Move the work.\nBeyond the paperwork.",
    body: "Turn documents and recurring tasks into connected workflows, with review where it matters.",
    audience: "For operations, procurement and document-heavy teams.",
    flow: ["Document", "Extraction", "Review", "Next step"],
    measure: "Processing time, correction rate and review effort.",
  },
  {
    name: "Customer experience", image: "support", title: "Every conversation.\nA useful next step.",
    body: "Bring context to customer requests and give your team a clearer path from question to resolution.",
    audience: "For service desks and customer support teams.",
    flow: ["Request", "Suggested answer", "Human handover"],
    measure: "Resolution time, repeat requests and handover quality.",
  },
];

export default function Scenarios() {
  return <section className="section scenarios-section" id="use-cases" aria-labelledby="use-cases-title"><div className="shell">
    <div className="section-heading section-heading-row"><div><p className="eyebrow">Where AI becomes useful</p><h2 id="use-cases-title">Real work.<br />Meaningful progress.</h2></div><p>Build around the problems that matter to your business. Start with a focused workflow, then connect what comes next.</p></div>
    <div className="scenario-grid">{scenarios.map(({ name, image, title, body, audience, flow, measure }, index) => <article className="scenario-card" key={name}>
      <a className={`scenario-cover scenario-cover-${image}`} href="/agents/" aria-label={`${name}: explore Century Agents`}>
        <img src={`/media/${image}.webp`} alt="" width={1200} height={675} loading="lazy" />
        <h3>{title.split("\n").map((line,i)=><span key={line}>{i>0&&<br />}{line}</span>)}</h3>
        <ArrowUpRight className="scenario-arrow" size={22} strokeWidth={1.5} aria-hidden="true" />
        <span className="scenario-cover-label"><span>0{index+1}</span>{name}</span>
      </a>
      <div className="scenario-content"><p className="scenario-description">{body}</p><details className="scenario-detail"><summary>Explore the workflow<ArrowUpRight size={17} aria-hidden="true" /></summary><div><p className="card-audience">{audience}</p><ol className="scenario-flow">{flow.map(step=><li key={step}>{step}</li>)}</ol><p className="card-measure"><strong>What to measure</strong>{measure}</p></div></details></div>
    </article>)}</div>
  </div></section>;
}
