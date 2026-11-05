"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import styles from "./DeploymentPage.module.css";

const phases = [
  {
    title: "Define the scope and test the approach",
    owner: "Century-led",
    description: "Choose a bounded workflow and agree success criteria. Test synthetic or approved data against a control set, compare suitable models and use the results to plan infrastructure",
    tags: ["Process audit", "Success criteria", "Model comparison"],
    fill: "75%",
  },
  {
    title: "Build and evaluate with your developers",
    owner: "Shared delivery",
    description: "Work through requirements, integrations and acceptance together. Measure extraction accuracy, draft quality or processing time, and prepare the operating practices your team will use",
    tags: ["Co-development", "Control datasets", "Acceptance testing"],
    fill: "50%",
  },
  {
    title: "Hand over the skills to run and improve",
    owner: "Team-led",
    description: "Your team maintains knowledge, access and workflows, supported by training and documented testing and operating practices. Check results on approved real data and use them to plan the next automation",
    tags: ["Training", "Operating practices", "Measured improvement"],
    fill: "20%",
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
    <div className={styles.phaseTabs} role="tablist" aria-label="Delivery ownership phases">
      {phases.map((phase, index) => <button
        type="button" role="tab" key={phase.owner}
        id={`${id}-tab-${index}`} aria-controls={`${id}-panel-${index}`}
        aria-selected={active === index} tabIndex={active === index ? 0 : -1}
        ref={node => { tabs.current[index] = node; }}
        onClick={() => setActive(index)} onKeyDown={event => navigate(event, index)}
      >Phase 0{index + 1}</button>)}
    </div>
    {phases.map((phase, index) => <div
      key={phase.owner} id={`${id}-panel-${index}`} className={styles.phasePanel}
      role="tabpanel" aria-labelledby={`${id}-tab-${index}`} hidden={active !== index} tabIndex={0}
    >
      <h3>{phase.title}</h3>
      <div className={styles.ownershipVisual}>
        <div className={styles.ownershipTrack} aria-hidden="true"><span style={{ width: phase.fill }} /></div>
        <p>{phase.owner}</p>
      </div>
      <p className={styles.phaseDescription}>{phase.description}</p>
      <ul className={styles.phaseTags}>{phase.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
    </div>)}
    <p className={styles.journeyNote}>Start with your developers or co-build the first workflows with Century; agree the handover and responsibilities around the readiness of your team</p>
    <noscript><div className={styles.phaseFallback}>
      {phases.slice(1).map((phase, index) => <section key={phase.owner}><p>Phase 0{index + 2} · {phase.owner}</p><h3>{phase.title}</h3><p>{phase.description}</p><ul className={styles.phaseTags}>{phase.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></section>)}
    </div></noscript>
  </div>;
}
