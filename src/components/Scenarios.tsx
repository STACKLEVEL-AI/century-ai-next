import { ArrowUpRight, Check, FileCheck2, FileText, MessagesSquare, Search, UserRound } from "lucide-react";

const scenarios = [
  {
    name: "Company knowledge",
    tone: "knowledge",
    hook: ["The right answer.", "With the source to back it."],
    body: "Help your teams find answers across approved policies, procedures and internal documents — with references they can inspect.",
    audience: "For operations, HR and internal service teams.",
    flow: ["Question", "Approved sources", "Referenced answer"],
    measure: "Time to find an answer, answer usefulness and source coverage.",
  },
  {
    name: "Document workflows",
    tone: "documents",
    hook: ["Less processing.", "More progress."],
    body: "Extract information, check it against your rules and prepare the next step for a reviewer before an action is taken.",
    audience: "For operations, procurement and document-heavy teams.",
    flow: ["Document", "Extraction", "Review", "Next step"],
    measure: "Processing time, correction rate and review effort.",
  },
  {
    name: "Support assistance",
    tone: "support",
    hook: ["Every request.", "A clearer next step."],
    body: "Answer recurring questions from approved knowledge and pass exceptions to a person with the context they need.",
    audience: "For internal service desks and customer support teams.",
    flow: ["Request", "Suggested answer", "Human handover"],
    measure: "Resolution time, repeat requests and handover quality.",
  },
];

function ScenarioVisual({ kind }: { kind: string }) {
  if (kind === "knowledge") {
    return (
      <div className="scenario-visual visual-knowledge" aria-hidden="true">
        <div className="document-stack"><div /><div /><div><FileText size={25} /><span /><span /><span /></div></div>
        <div className="search-preview"><Search size={17} /><span>Ask your company knowledge</span><span className="preview-key">↵</span></div>
        <div className="source-preview"><Check size={13} /> Connected to your sources</div>
      </div>
    );
  }
  if (kind === "documents") {
    return (
      <div className="scenario-visual visual-documents" aria-hidden="true">
        <div className="flow-preview">
          <div><FileText size={17} /><span>Document received</span><Check size={14} /></div>
          <div><FileCheck2 size={17} /><span>Information extracted</span><Check size={14} /></div>
          <div className="flow-review"><UserRound size={17} /><span>Ready for your review</span><span className="review-dot" /></div>
        </div>
      </div>
    );
  }
  return (
    <div className="scenario-visual visual-support" aria-hidden="true">
      <div className="support-preview">
        <div className="support-question"><MessagesSquare size={17} /><span>How can I update my details?</span></div>
        <div className="support-answer"><span className="brand-mark" /><div><span /><span /><span /><small>Answer with references <Check size={11} /></small></div></div>
        <div className="handover-preview"><UserRound size={13} /> Human handover when needed <ArrowUpRight size={12} /></div>
      </div>
    </div>
  );
}

export default function Scenarios() {
  return (
    <section className="section scenarios-section" id="use-cases" aria-labelledby="use-cases-title">
      <div className="shell">
        <div className="section-heading section-heading-row">
          <div><p className="eyebrow"><span className="section-number">01 /</span> Real work. Practical AI.</p>
            <h2 id="use-cases-title">Make room for<br />the work that matters.</h2></div>
          <p>Start with a focused use case, clear inputs and an outcome you can measure. Build from there.</p>
        </div>
        <div className="scenario-grid">
          {scenarios.map(({ name, tone, hook, body, audience, flow, measure }, index) => (
            <article className={`scenario-card scenario-${tone}`} key={name}>
              <ScenarioVisual kind={tone} />
              <div className="scenario-content">
                <p className="card-category"><span>0{index + 1}</span>{name}</p>
                <h3>{hook.map((line, i) => <span key={line}>{i > 0 && <br />}{line}</span>)}</h3>
                <p className="scenario-description">{body}</p>
                <details className="scenario-detail">
                  <summary>Explore the workflow <ArrowUpRight size={17} aria-hidden="true" /></summary>
                  <div>
                    <p className="card-audience">{audience}</p>
                    <ol className="scenario-flow">{flow.map(step => <li key={step}>{step}</li>)}</ol>
                    <p className="card-measure"><strong>What to measure</strong>{measure}</p>
                  </div>
                </details>
              </div>
            </article>
          ))}
        </div>
        <p className="section-footnote">Illustrative workflows. Scope and evaluation criteria are agreed around your business.</p>
      </div>
    </section>
  );
}
