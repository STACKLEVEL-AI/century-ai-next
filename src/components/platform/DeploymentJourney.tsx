"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import styles from "./DeploymentPage.module.css";

const phases = [
  {
    title: "Find the first workflow worth building",
    owner: "Century-led",
    description: "Start with a focused business need. Understand the current process, connect the necessary sources and put a first workflow in front of the people who will use it",
    tags: ["Discovery", "Working sessions", "First deployment"],
    fill: "75%",
  },
  {
    title: "Build capability alongside the workflow",
    owner: "Shared delivery",
    description: "Work through real examples together. Refine the integrations and human handovers, document the decisions and help your team understand how the workflow operates",
    tags: ["Team enablement", "Reusable foundations", "Process rollout"],
    fill: "50%",
  },
  {
    title: "Put the operating knowledge in your hands",
    owner: "Team-led",
    description: "Agree who owns the process, how exceptions are handled and where support fits. Use the evidence from everyday work to decide what to improve and which workflow to take on next",
    tags: ["Operating playbooks", "Clear ownership", "Ongoing improvement"],
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
    <p className={styles.journeyNote}>The delivery path and operating responsibilities are agreed around your team and use case</p>
    <noscript><div className={styles.phaseFallback}>
      {phases.slice(1).map((phase, index) => <section key={phase.owner}><p>Phase 0{index + 2} · {phase.owner}</p><h3>{phase.title}</h3><p>{phase.description}</p><ul className={styles.phaseTags}>{phase.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></section>)}
    </div></noscript>
  </div>;
}
