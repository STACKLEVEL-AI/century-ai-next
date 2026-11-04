import { ArrowDown, ArrowRight, Check, Database, FileText, GitBranch, Layers3, LockKeyhole, Search, ShieldCheck, UserRound } from "lucide-react";

export function PlatformConstellation() {
  const labels = ["Knowledge", "Workflows", "Permissions", "Sources", "Assistants", "Oversight"];
  return <div className="prod-constellation" aria-hidden="true">
    <div className="prod-constellation-orbit prod-constellation-orbit-one" /><div className="prod-constellation-orbit prod-constellation-orbit-two" />
    <div className="prod-constellation-core"><span className="brand-mark" /><span>Century AI OS</span></div>
    {labels.map((label, index) => <span className={`prod-constellation-node prod-constellation-node-${index + 1}`} key={label}><i />{label}</span>)}
    {Array.from({ length: 12 }, (_, index) => <i className={`prod-constellation-star prod-constellation-star-${index + 1}`} key={index} />)}
  </div>;
}

export function AgentFlowVisual() {
  return <div className="prod-agent-visual" aria-hidden="true">
    <div className="prod-visual-caption"><span className="brand-mark" /><span>Century Agents</span><span className="prod-sample-label">Illustrative workflow</span></div>
    <div className="prod-agent-request"><UserRound size={18} /><p>What do I need to approve this supplier?</p></div>
    <div className="prod-agent-track"><span /><ArrowDown size={15} /><span /></div>
    <div className="prod-agent-answer"><span className="brand-mark" /><div><strong>Start with the approved checklist.</strong><p>Check the required documents, then route exceptions to the process owner.</p><span><FileText size={12} /> 2 source references</span></div></div>
    <div className="prod-agent-track"><span /><ArrowDown size={15} /><span /></div>
    <div className="prod-agent-review"><ShieldCheck size={17} /><span>Ready for human review</span><Check size={15} /></div>
  </div>;
}

export function SystemsVisual() {
  return <div className="prod-systems-visual" aria-hidden="true">
    <div className="prod-systems-orbit" />
    <div className="prod-system-node prod-system-node-data"><Database size={23} /><span>Your data</span></div>
    <div className="prod-system-node prod-system-node-process"><GitBranch size={23} /><span>Your process</span></div>
    <div className="prod-system-node prod-system-node-people"><UserRound size={23} /><span>Your people</span></div>
    <div className="prod-system-center"><Layers3 size={38} strokeWidth={1.1} /><strong>A workspace<br />that fits.</strong></div>
    <span className="prod-systems-note">Designed around your requirements</span>
  </div>;
}

export function SystemWorkspace() {
  const rows = [{ name: "Document completeness", status: "Ready to review", tone: "review" }, { name: "Policy exception", status: "Owner required", tone: "owner" }, { name: "Approval record", status: "Awaiting decision", tone: "waiting" }];
  return <div className="prod-workspace" aria-label="Illustrative supplier review workspace with sample tasks">
    <div className="prod-workspace-bar"><span className="brand-mark" /><strong>Century workspace</strong><span className="prod-sample-label">Sample data</span></div>
    <div className="prod-workspace-body"><div className="prod-workspace-heading"><div><p className="prod-kicker">Operations / review queue</p><h3>Supplier onboarding</h3></div><span className="prod-workspace-count">3 review steps</span></div>
      <table><caption className="prod-visually-hidden">Illustrative review steps and their current status</caption><thead><tr><th scope="col">Step</th><th scope="col">Status</th></tr></thead><tbody>{rows.map(row => <tr key={row.name}><td><FileText size={16} aria-hidden="true" />{row.name}</td><td><span className={`prod-workspace-status prod-workspace-status-${row.tone}`}>{row.status}</span></td></tr>)}</tbody></table>
      <p className="prod-workspace-note"><LockKeyhole size={14} aria-hidden="true" />Decisions stay with the designated reviewer.</p>
    </div>
  </div>;
}

export function DeliveryVisual() {
  return <div className="prod-delivery-visual" aria-hidden="true">
    <p className="prod-kicker">A shared way forward</p>
    <div className="prod-delivery-people"><div><span><UserRound size={27} /></span><strong>Your team</strong><small>Business context</small></div><div className="prod-delivery-join"><ArrowRight size={20} /><ArrowRight size={20} /></div><div><span className="prod-delivery-century"><i className="brand-mark" /></span><strong>Century</strong><small>AI implementation</small></div></div>
    <div className="prod-delivery-outcome"><Check size={17} /><span>One workflow. Agreed success criteria.</span></div>
    <div className="prod-delivery-line"><span>Discover</span><i /><span>Implement</span><i /><span>Operate</span></div>
  </div>;
}

export function StrategyVisual() {
  return <div className="prod-strategy-visual" aria-hidden="true">
    <div className="prod-strategy-line" />
    {[{ label: "Business need", Icon: Search }, { label: "Working evidence", Icon: FileText }, { label: "Informed next step", Icon: ArrowRight }].map(({ label, Icon }, index) => <div className={`prod-strategy-step prod-strategy-step-${index + 1}`} key={label}><span className="prod-strategy-step-number">0{index + 1}</span><Icon size={24} strokeWidth={1.3} /><strong>{label}</strong></div>)}
    <p>Let the workflow shape the roadmap.</p>
  </div>;
}
