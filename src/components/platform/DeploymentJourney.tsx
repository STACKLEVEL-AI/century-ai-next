"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import styles from "./DeploymentPage.module.css";

const phases = [
  {
    label: "Prepare",
    title: "Define what the workflow must do",
    description: "Document the task, representative examples and the result that will count as success with the process owner. Confirm the data, system connections and user permissions, then plan the architecture and resources needed to run it",
    outcome: "Ready to build",
    points: ["Workflow specification", "Representative examples", "Access & architecture"],
    detail: "The scope, test examples and technical requirements are documented before implementation begins",
  },
  {
    label: "Build & validate",
    title: "Measure the result on real work",
    description: "Configure Century and connect approved systems. Compare suitable models on the same examples, measuring accuracy, human corrections or processing time as the task requires. Test with permitted real data, then assess the platform and workflow against their separate acceptance criteria",
    outcome: "Ready for controlled use",
    points: ["Connected workflow", "Acceptance results", "Release decision"],
    detail: "The results show whether the workflow meets its criteria for controlled operational use",
  },
  {
    label: "Operate & improve",
    title: "Train the people who will keep it working",
    description: "Your developers learn to update knowledge, manage permissions, test changes and maintain agents through practical work. Transfer the requirements, tests and operating rules, then agree who maintains the workflow and where Century support is needed",
    outcome: "Ready for your team",
    points: ["Named maintainers", "Reusable tests", "Operating instructions"],
    detail: "Your team knows who maintains the workflow and how changes are tested",
  },
];

function PhaseOutcome({ phase }: { phase: (typeof phases)[number] }) {
  return <div className={styles.phaseOutcome}>
    <h4>{phase.outcome}</h4>
    <ol className={styles.deliverables}>
      {phase.points.map((deliverable, index) => <li key={deliverable}>
        <span className={styles.deliverableNumber} aria-hidden="true">0{index + 1}</span>
        <span>{deliverable}</span>
      </li>)}
    </ol>
    <p className={styles.phaseResult}>{phase.detail}</p>
  </div>;
}

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
      </div>
      <PhaseOutcome phase={phase} />
    </div>)}
    <p className={styles.journeyNote}>A scoped pilot can test the approach first, using synthetic examples when access to real data is restricted. Results on real data still need validation in the approved operating environment</p>
    <noscript><div className={styles.phaseFallback}>
      {phases.slice(1).map(phase => <section key={phase.label}>
        <p>{phase.label}</p>
        <h3>{phase.title}</h3>
        <p className={styles.phaseDescription}>{phase.description}</p>
        <PhaseOutcome phase={phase} />
      </section>)}
    </div></noscript>
  </div>;
}
