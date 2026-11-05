import { Activity, ArrowRight, Bot, Boxes, Check, Database, FileText, Fingerprint, Layers3, LockKeyhole, Network, Settings2, ShieldCheck, Users } from "lucide-react";
import styles from "./Gateway.module.css";

export function GatewayMap() {
  return <div className={styles.connectionMap} aria-hidden="true">
    <div className={styles.mapEyebrow}>Models, knowledge and tools under shared rules</div>
    <div className={styles.mapGrid}>
      <svg className={styles.mapLines} viewBox="0 0 1000 330" preserveAspectRatio="none" fill="none">
        <path d="M 190 58 H 310 Q 340 58 340 88 V 135 Q 340 165 370 165 H 420 M 190 165 H 420 M 190 272 H 310 Q 340 272 340 242 V 195 Q 340 165 370 165 H 420" />
        <path d="M 580 165 H 630 Q 660 165 660 135 V 88 Q 660 58 690 58 H 810 M 580 165 H 810 M 580 165 H 630 Q 660 165 660 195 V 242 Q 660 272 690 272 H 810" />
      </svg>
      <div className={styles.mapStack}>
        <span><Users size={19} strokeWidth={1.1} />People</span>
        <span><Layers3 size={19} strokeWidth={1.1} />Applications</span>
        <span><Bot size={19} strokeWidth={1.1} />Agents</span>
      </div>
      <div className={styles.mapCenter}><img src="/brand/century-logo-white.svg" alt="" width={146} height={39} /><span>AI Gateway</span></div>
      <div className={styles.mapStack}>
        <span><Boxes size={19} strokeWidth={1.1} />Models</span>
        <span><Database size={19} strokeWidth={1.1} />Context</span>
        <span><Settings2 size={19} strokeWidth={1.1} />Tools</span>
      </div>
    </div>
    <div className={styles.mapPrinciples}><span>Permissions</span><span>Data rules</span><span>Activity logs</span></div>
  </div>;
}

export type GatewayIllustrationKind = "connect" | "usage" | "access" | "routing" | "privacy" | "observe";

export default function GatewayIllustration({ kind }: { kind: GatewayIllustrationKind }) {
  if (kind === "connect") return <div className={`${styles.featureArt} ${styles.connectArt}`} aria-hidden="true">
    <div className={styles.connectionOrbit}><span><Layers3 size={23} /></span><span><Bot size={23} /></span><span><Database size={23} /></span><span><Boxes size={23} /></span></div>
    <div className={styles.artHub}><Network size={35} strokeWidth={1} /><span>Connections</span></div>
    <div className={styles.artLabel}>Applications · Agents · Models</div>
  </div>;
  if (kind === "usage") return <div className={`${styles.featureArt} ${styles.usageArt}`} aria-hidden="true">
    <div className={styles.signalTable}>
      <div><span>Inspect</span><span>Understand</span></div>
      <div><Activity size={16} /><span>Response details</span><span>Timing</span></div>
      <div><Boxes size={16} /><span>Model choice</span><span>Suitability</span></div>
      <div><Layers3 size={16} /><span>Workflow</span><span>Useful outcomes</span></div>
    </div>
    <div className={styles.artLabel}>Review usage beside quality</div>
  </div>;
  if (kind === "access") return <div className={`${styles.featureArt} ${styles.accessArt}`} aria-hidden="true">
    <div className={styles.accessIdentity}><Fingerprint size={38} strokeWidth={1} /><span>Team & role</span></div>
    <div className={styles.accessLine} />
    <div className={styles.accessRules}><span><Check size={15} />Approved knowledge</span><span><Check size={15} />Model permissions</span><span><LockKeyhole size={15} />Data boundaries</span></div>
  </div>;
  if (kind === "routing") return <div className={`${styles.featureArt} ${styles.routeArt}`} aria-hidden="true">
    <span className={styles.requestNode}>The task</span><ArrowRight className={styles.routeArrow} size={23} strokeWidth={1} />
    <div className={styles.routingDecision}><Settings2 size={27} strokeWidth={1.1} /><span>Model choice</span></div>
    <div className={styles.routingBranches}><span>Quality</span><span>Response time</span><span>Cost</span></div>
    <div className={styles.artLabel}>Compare on your own tasks</div>
  </div>;
  if (kind === "privacy") return <div className={`${styles.featureArt} ${styles.privacyArt}`} aria-hidden="true">
    <div className={styles.dataBoundary}><span>Approved context</span><div><FileText size={29} strokeWidth={1} /><Database size={29} strokeWidth={1} /><FileText size={29} strokeWidth={1} /></div><ShieldCheck size={49} strokeWidth={.9} /></div>
    <div className={styles.artLabel}>Source · Model · Data rules</div>
  </div>;
  return <div className={`${styles.featureArt} ${styles.observeArt}`} aria-hidden="true">
    <div className={styles.observationRing}><Activity size={42} strokeWidth={.9} /><span>Response details</span></div>
    <span className={styles.observationTag}>Tokens</span><span className={styles.observationTag}>Timing</span><span className={styles.observationTag}>Model</span>
  </div>;
}
