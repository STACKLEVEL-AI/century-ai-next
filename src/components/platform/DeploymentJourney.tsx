"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import styles from "./DeploymentPage.module.css";

const phases = [
  {
    label: "Prepare",
    title: "Agree the environment and the work",
    description: "Confirm the selected workflow, its owner and acceptance criteria. Map data, systems and access, then agree the architecture, resource requirements and update path with your IT and security teams",
    output: "A delivery scope, an integration plan and an environment ready for configuration",
    tags: ["Agreed requirements", "Architecture", "Access & data rules"],
  },
  {
    label: "Build & validate",
    title: "Connect, test and accept the workflow",
    description: "Configure the platform and approved integrations. Compare suitable models on agreed control examples, then test the workflow on permitted real data. Accept the platform environment and the workflow against their separate criteria",
    output: "An accepted environment and a workflow ready for controlled operational use",
    tags: ["Integrations", "Model evaluation", "Acceptance testing"],
  },
  {
    label: "Operate & improve",
    title: "Equip the team that will keep it working",
    description: "Transfer requirements, design, testing and operating practices through practical work. Agree maintainers and support responsibilities so your team can update knowledge, manage access and review workflow quality",
    output: "Named maintainers, tested operating practices and the skills to improve the next version",
    tags: ["Developer training", "Operating practices", "Quality review"],
  },
];

export default function DeploymentJourney() {
  const [active, setActive] = useState(0);
  const id = useId();
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown": next = (index + 1) % phases.length; break;
      case "ArrowLeft":
      case "ArrowUp": next = (index + phases.length - 1) % phases.length; break;
      case "Home": next = 0; break;
      case "End": next = phases.length - 1; break;
      default: return;
    }
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return <div className={styles.journey}>
    <div className={styles.phaseTabs} role="tablist" aria-label="Deployment phases">
      {phases.map((phase, index) => <button
        type="button" role="tab" key={phase.label}
        id={`${id}-tab-${index}`} aria-controls={`${id}-panel-${index}`}
        aria-selected={active === index} tabIndex={active === index ? 0 : -1}
        ref={node => { tabs.current[index] = node; }}
        onClick={() => setActive(index)} onKeyDown={event => navigate(event, index)}
      >{phase.label}</button>)}
    </div>
    {phases.map((phase, index) => <div
      key={phase.label} id={`${id}-panel-${index}`} className={styles.phasePanel}
      role="tabpanel" aria-labelledby={`${id}-tab-${index}`} hidden={active !== index} tabIndex={0}
    >
      <div className={styles.phaseCopy}>
        <h3>{phase.title}</h3>
        <p className={styles.phaseDescription}>{phase.description}</p>
        <ul className={styles.phaseTags}>{phase.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
      </div>
      <div className={styles.phaseOutcome}>
        <span className={styles.phaseNumber} aria-hidden="true">0{index + 1}</span>
        <p>{phase.output}</p>
      </div>
    </div>)}
    <p className={styles.journeyNote}>A scoped pilot can help validate the approach when needed. Synthetic examples support early testing; results on real data still need validation in the approved environment</p>
    <noscript><div className={styles.phaseFallback}>
      {phases.slice(1).map(phase => <section key={phase.label}><p>{phase.label}</p><h3>{phase.title}</h3><p>{phase.description}</p><p>{phase.output}</p><ul className={styles.phaseTags}>{phase.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></section>)}
    </div></noscript>
  </div>;
}
