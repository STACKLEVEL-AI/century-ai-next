"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Activity, Boxes, Files, ArrowUpRight } from "lucide-react";
import AppScreenshot from "@/components/AppScreenshot";
import type { AppCaptureId } from "@/lib/app-captures";
import styles from "./Gateway.module.css";

const views: { id: string; title: string; description: string; capture: AppCaptureId; icon: typeof Boxes }[] = [
  { id: "models", title: "Models & controls", description: "Inspect the model controls available in the Century workspace.", capture: "models", icon: Boxes },
  { id: "files", title: "Files & context", description: "See how files and structured information appear alongside the work.", capture: "files", icon: Files },
  { id: "response", title: "Response details", description: "Look beyond the answer to the timing and token information attached to it.", capture: "response", icon: Activity },
];

export default function GatewayWorkspace() {
  const [selected, setSelected] = useState(0);
  const [orientation, setOrientation] = useState<"vertical" | "horizontal">("vertical");
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const mobileLayout = window.matchMedia("(max-width: 650px)");
    const syncOrientation = () => setOrientation(mobileLayout.matches ? "horizontal" : "vertical");
    syncOrientation();
    mobileLayout.addEventListener("change", syncOrientation);
    return () => mobileLayout.removeEventListener("change", syncOrientation);
  }, []);

  function handleKeys(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % views.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index + views.length - 1) % views.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = views.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    buttons.current[next]?.focus();
  }

  return <div className={styles.workspace} id="inside-century">
    <div className={styles.workspaceBar}><span>Inside Century</span><span>Application views</span></div>
    <div className={styles.workspaceLayout}>
      <aside className={styles.workspaceSidebar}>
        <img src="/brand/century-logo-white.svg" alt="Century" width={112} height={30} />
        <span className={styles.workspaceLabel}>Explore the workspace</span>
        <div className={styles.workspaceTabs} role="tablist" aria-label="Century application views" aria-orientation={orientation}>
          {views.map(({ id, title, icon: Icon }, index) => <button key={id} type="button" role="tab"
            id={"gateway-tab-" + id} aria-controls={"gateway-panel-" + id} aria-selected={selected === index}
            tabIndex={selected === index ? 0 : -1} ref={element => { buttons.current[index] = element; }}
            onClick={() => setSelected(index)} onKeyDown={event => handleKeys(event, index)}>
            <Icon size={16} strokeWidth={1.5} aria-hidden="true" /><span>{title}</span>
          </button>)}
        </div>
        <a className={styles.workspaceLink} href="/ai-os/">Explore the AI OS<ArrowUpRight size={14} aria-hidden="true" /></a>
      </aside>
      <div className={styles.workspaceContent}>
        {views.map(({ id, title, description, capture }, index) => <div key={id} role="tabpanel"
          id={"gateway-panel-" + id} aria-labelledby={"gateway-tab-" + id} hidden={selected !== index}
          tabIndex={0} className={styles.workspacePanel}>
          <h2>{title}</h2><p>{description}</p>
          <AppScreenshot capture={capture} priority={index === 0} className={styles.workspaceCapture} />
        </div>)}
        <p className={styles.workspaceNote}><span aria-hidden="true" />Actual views from the Century application</p>
      </div>
    </div>
    <noscript><div className={styles.workspaceFallback}>
      {views.slice(1).map(view => <section key={view.id}>
        <h3>{view.title}</h3><p>{view.description}</p><AppScreenshot capture={view.capture} className={styles.workspaceCapture} />
      </section>)}
    </div></noscript>
  </div>;
}
