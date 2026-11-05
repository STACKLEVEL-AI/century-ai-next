"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Activity, Boxes, Braces, Database, GitBranch, Network, ShieldCheck } from "lucide-react";
import AppScreenshot from "@/components/AppScreenshot";
import styles from "./OperatingLayer.module.css";

const layers = [
  { id: "observability", title: "Quality & activity", icon: Activity, description: "Review answer and retrieval quality, response details, tool activity and request cost, then bring the findings back into the next specification", capture: "response" as const },
  { id: "workflows", title: "Workflows & agents", icon: GitBranch, description: "Build no-code agent and multi-agent workflows with branches, saved state and retries, adding employee confirmation where the process requires it" },
  { id: "building", title: "Specification & development", icon: Braces, description: "Collect requests from business teams, assess readiness and agree acceptance criteria, then give developers the models, knowledge and tools to build and test the workflow" },
  { id: "context", title: "Knowledge", icon: Database, description: "Recognise scanned documents and prepare knowledge for retrieval with metadata and indexes, keeping role-based access, source links and document versions", capture: "files" as const },
  { id: "models", title: "Models", icon: Boxes, description: "Connect models independently of the platform, choose them for each task and data policy, and evaluate quality on your own documents and questions", capture: "models" as const },
  { id: "integrations", title: "Integrations", icon: Network, description: "Connect existing applications, databases and document systems through APIs and MCP, with permissions for the sources and actions each workflow needs" },
  { id: "governance", title: "Security & governance", icon: ShieldCheck, description: "Apply access rules and data policies, review versions and activity logs, and keep quality checks and release decisions connected to the people responsible" },
];

export default function OperatingLayerExplorer() {
  const [selected, setSelected] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  function move(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % layers.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index + layers.length - 1) % layers.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = layers.length - 1;
    else return;
    event.preventDefault(); setSelected(next); buttons.current[next]?.focus();
  }
  return <><div className={styles.explorer}>
    <div className={styles.architecture}>
      <img className={styles.architectureBackdrop} src="/media/strategy.webp" alt="" width={1054} height={1451} loading="lazy" />
      <div className={styles.architecturePanel}>
        <span className={styles.architectureCaption}>CENTURY / OPERATING LAYER</span>
        <div className={styles.layerTabs} role="tablist" aria-label="Explore AI OS infrastructure">
          {layers.map(({ id, title, icon: Icon }, index) => <button type="button" role="tab"
            key={id} id={"os-tab-" + id} aria-selected={selected === index}
            aria-controls={"os-panel-" + id} tabIndex={selected === index ? 0 : -1}
            className={styles.layerTab + " " + (index < 3 || index === 6 ? styles.layerWide : "")}
            ref={element => { buttons.current[index] = element; }}
            onClick={() => setSelected(index)} onKeyDown={event => move(event, index)}>
            <Icon size={17} strokeWidth={1.4} aria-hidden="true" /><span>{title}</span><i aria-hidden="true" />
          </button>)}
        </div>
        <p className={styles.architectureHint}>Select a layer to explore</p>
      </div>
    </div>
    <div className={styles.explorerCopy}>
      <h2>Specification, development<br />and governance</h2>
      <div className={styles.layerDescriptions}>{layers.map((layer, index) => <div key={layer.id}
        role="tabpanel" id={"os-panel-" + layer.id} aria-labelledby={"os-tab-" + layer.id}
        hidden={selected !== index} tabIndex={0} className={styles.layerDescription}>
        <h3>{layer.title}</h3><p>{layer.description}</p>
        {layer.capture && <AppScreenshot capture={layer.capture} className={styles.layerCapture} />}
      </div>)}</div>
    </div>
  </div>
    <noscript><div className={styles.layerFallback}>
      {layers.slice(1).map(layer => <section key={layer.id}>
        <h3>{layer.title}</h3><p>{layer.description}</p>
        {layer.capture && <AppScreenshot capture={layer.capture} className={styles.layerCapture} />}
      </section>)}
    </div></noscript>
  </>;
}
