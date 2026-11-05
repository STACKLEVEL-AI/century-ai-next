"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Activity, Boxes, Braces, Database, GitBranch, Network, ShieldCheck } from "lucide-react";
import AppScreenshot from "@/components/AppScreenshot";
import styles from "./OperatingLayer.module.css";

const layers = [
  { id: "observability", title: "Observability", icon: Activity, description: "Keep the evidence close to the work. Inspect response details, review exceptions and give the people operating a workflow a shared picture of what happened.", capture: "response" as const },
  { id: "workflows", title: "Workflows", icon: GitBranch, description: "Connect a business request to the information, actions and people it needs. Make the handover to a human part of the workflow from the beginning." },
  { id: "building", title: "Building tools", icon: Braces, description: "Shape a focused application around a real process. Reuse the instructions, interfaces and review patterns that help your team get useful work done." },
  { id: "context", title: "Context", icon: Database, description: "Bring approved documents and structured information into the task. Establish authoritative sources and access boundaries before extending the scope.", capture: "files" as const },
  { id: "models", title: "Models", icon: Boxes, description: "Choose models around the work: the information involved, the quality required and the response time that is useful. See the actual model controls in Century.", capture: "models" as const },
  { id: "integrations", title: "Integrations", icon: Network, description: "Connect the systems involved in the agreed use case. Review their interfaces, permissions and operating owners so the next step is clear." },
  { id: "governance", title: "Security & governance", icon: ShieldCheck, description: "Define who can use which information, what the workflow can prepare and when it must ask a person. Carry those decisions through the implementation." },
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
      <h2>One foundation for<br />enterprise AI.</h2>
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
