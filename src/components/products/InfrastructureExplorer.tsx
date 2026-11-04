"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Activity, Blocks, Database, GitBranch, Network, ShieldCheck, Sparkles } from "lucide-react";

const layers = [
  {
    title: "Security & governance", icon: ShieldCheck, short: "Clear boundaries",
    description: "Start with the people, sources and actions a workflow is allowed to use. Define review points before connecting AI to a business process.",
    points: ["Resource access", "Review responsibilities", "Permitted actions"],
  },
  {
    title: "Observability", icon: Activity, short: "A visible operating picture",
    description: "Agree what to record and how to review outputs, usage and exceptions. Give each workflow an owner who can investigate and improve it.",
    points: ["Activity records", "Usage review", "Evaluation criteria"],
  },
  {
    title: "Workflows", icon: GitBranch, short: "A useful next step",
    description: "Connect an incoming request to the information, checks and decisions it needs. Keep the route to a human clear when an exception appears.",
    points: ["Process steps", "Human handover", "Defined outcomes"],
  },
  {
    title: "Building blocks", icon: Blocks, short: "A foundation to build on",
    description: "Break a use case into focused assistants, reusable instructions and business actions. Scope each part before combining it into a larger workflow.",
    points: ["Focused assistants", "Reusable instructions", "Business actions"],
  },
  {
    title: "Knowledge & context", icon: Database, short: "Your knowledge, in context",
    description: "Identify authoritative documents and data, establish who may use them, and make source references part of the answer wherever the workflow requires them.",
    points: ["Approved sources", "Source references", "Access boundaries"],
  },
  {
    title: "Models", icon: Sparkles, short: "Fit the model to the task",
    description: "Evaluate model choices against the work: answer quality, response time, data requirements and cost. Make those trade-offs explicit before implementation.",
    points: ["Task suitability", "Data requirements", "Cost and quality"],
  },
  {
    title: "Integrations", icon: Network, short: "Work with your existing systems",
    description: "Review available interfaces and access rules with your team. Connect only the systems needed for the agreed workflow, with a clear owner for each integration.",
    points: ["Available interfaces", "Scoped access", "Integration ownership"],
  },
];

export default function InfrastructureExplorer() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const id = useId();

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % layers.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + layers.length) % layers.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = layers.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="infra-explorer">
      <div className="infra-tabs" role="tablist" aria-label="Infrastructure layers" aria-orientation="vertical">
        {layers.map(({ title, icon: Icon }, index) => (
          <button
            type="button" role="tab" key={title} id={`${id}-tab-${index}`}
            aria-selected={active === index} aria-controls={`${id}-panel-${index}`}
            tabIndex={active === index ? 0 : -1}
            ref={node => { tabRefs.current[index] = node; }}
            onClick={() => setActive(index)} onKeyDown={event => navigate(event, index)}
          >
            <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
            <span>{title}</span><span className="infra-tab-arrow" aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      <div className="infra-panels">
        {layers.map(({ title, icon: Icon, short, description, points }, index) => (
          <section
            className="infra-panel" role="tabpanel" key={title} id={`${id}-panel-${index}`}
            aria-labelledby={`${id}-tab-${index}`} hidden={active !== index} tabIndex={0}
          >
            <div className="infra-layer-visual" aria-hidden="true">
              <div className="infra-layer-back" /><div className="infra-layer-middle" />
              <div className="infra-layer-front"><Icon size={46} strokeWidth={1.1} /></div>
              <span className="infra-layer-caption">CENTURY / {String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="infra-panel-copy"><p className="prod-kicker">{title}</p><h3>{short}</h3><p>{description}</p>
              <ul>{points.map(point => <li key={point}>{point}</li>)}</ul>
            </div>
          </section>
        ))}
      </div>
      <noscript><div className="infra-fallback"><h3>All infrastructure layers</h3>{layers.slice(1).map(layer => <section key={layer.title}><h4>{layer.title}</h4><p>{layer.description}</p></section>)}</div></noscript>
    </div>
  );
}
