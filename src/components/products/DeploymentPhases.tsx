"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight, Check } from "lucide-react";

const phases = [
  {
    title: "Define the starting point", label: "Discover", owner: "A shared brief",
    description: "Choose one workflow with a clear owner. Map the inputs, existing effort and decisions involved, then agree what a useful result would look like",
    steps: ["Map the current process", "Review data and access", "Agree scope and evaluation"],
    outcome: "A bounded use case with an accountable owner and agreed success criteria",
  },
  {
    title: "Build with your team", label: "Implement", owner: "A working pilot",
    description: "Connect the required sources, introduce the review steps and evaluate realistic examples. Use feedback from the people doing the work to refine the workflow",
    steps: ["Connect approved sources", "Evaluate real scenarios", "Refine handovers and exceptions"],
    outcome: "Evidence about where the workflow is useful, where it needs review and what should change",
  },
  {
    title: "Make the next decision", label: "Operate", owner: "Clear operating ownership",
    description: "Review the evidence together. Agree the operating responsibilities, documentation and support arrangements before deciding whether to expand, refine or stop",
    steps: ["Review results against the baseline", "Agree ongoing responsibilities", "Prioritize the next workflow"],
    outcome: "An informed next step, with ownership and support defined for the agreed deployment",
  },
];

export default function DeploymentPhases() {
  const [active, setActive] = useState(0);
  const id = useId();
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % phases.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + phases.length) % phases.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = phases.length - 1;
    else return;
    event.preventDefault(); setActive(next); refs.current[next]?.focus();
  }

  return <div className="phase-selector">
    <div className="phase-tabs" role="tablist" aria-label="Deployment phases">
      {phases.map((phase, index) => <button type="button" role="tab" key={phase.label}
        id={`${id}-tab-${index}`} aria-controls={`${id}-panel-${index}`} aria-selected={active === index}
        tabIndex={active === index ? 0 : -1} ref={node => { refs.current[index] = node; }}
        onClick={() => setActive(index)} onKeyDown={event => navigate(event, index)}>
        <span>Phase 0{index + 1}</span><strong>{phase.label}</strong><ArrowRight size={20} aria-hidden="true" />
      </button>)}
    </div>
    {phases.map((phase, index) => <section className="phase-panel" key={phase.label} role="tabpanel"
      id={`${id}-panel-${index}`} aria-labelledby={`${id}-tab-${index}`} hidden={active !== index} tabIndex={0}>
      <div className="phase-main"><p className="prod-kicker">{phase.owner}</p><h3>{phase.title}</h3><p>{phase.description}</p>
        <ul>{phase.steps.map(step => <li key={step}><Check size={16} aria-hidden="true" />{step}</li>)}</ul>
      </div>
      <div className="phase-outcome"><div className="phase-track" aria-hidden="true">{phases.map((p, i) => <span key={p.label} className={i <= active ? "phase-track-active" : ""}>{String(i + 1).padStart(2, "0")}</span>)}</div>
        <p className="prod-kicker">What you take forward</p><p>{phase.outcome}</p>
      </div>
    </section>)}
    <noscript><div className="phase-fallback"><h3>The complete delivery path</h3>{phases.slice(1).map(phase => <section key={phase.label}><h4>{phase.title}</h4><p>{phase.description}</p><p>{phase.outcome}</p></section>)}</div></noscript>
  </div>;
}
