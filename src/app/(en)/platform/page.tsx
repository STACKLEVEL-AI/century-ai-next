import type { CSSProperties } from "react";
import { ArrowDown, ArrowUpRight, Boxes, CircleCheck, Database, Layers3, Network, ShieldCheck } from "lucide-react";
import PlatformFrame from "@/components/platform/PlatformFrame";
import OperatingLayerExplorer from "@/components/platform/OperatingLayerExplorer";
import OperatingLayerRelated from "@/components/platform/OperatingLayerRelated";
import { pageMetadata } from "@/lib/metadata";
import styles from "@/components/platform/OperatingLayer.module.css";

export const metadata = pageMetadata("Century AI Platform", "Bring specification, development and governance into one operating environment for enterprise AI, with company knowledge, agents, access rules and quality controls", "/platform");

const advantages = [
  { title: "Model independence", text: "Choose models for each task and data policy, then compare quality on your own documents and questions", icon: Boxes },
  { title: "A shared automation backlog", text: "Collect requests through guided AI interviews and assess readiness across 27 blocks in seven categories before development", icon: Layers3 },
  { title: "Knowledge with evidence", text: "Recognise scanned documents and retrieve relevant passages with permissions, source links and document versions", icon: Database },
  { title: "Governance in daily work", text: "Review quality, versions and activity logs, with clear roles and rules for the data each model can use", icon: ShieldCheck },
  { title: "A cycle of improvement", text: "Feed findings from live workflows back into specifications, then let your team build and evaluate the next iteration", icon: Network },
];

const enterprise = [
  { title: "Deployment on your terms", description: "Run Century on your own or rented infrastructure, with models and capacity selected around the workload and your data requirements", href: "/deployment/", link: "Explore deployment", visual: "deployment" },
  { title: "Access that follows the role", description: "Set permissions for departments, knowledge sources and tools so assistants work with the information each user is allowed to access", href: "/security/", link: "Our approach to security", visual: "security" },
  { title: "Rules for model data", description: "Define which data may reach each model and record those decisions in logs, with cloud processing governed by your organisation's policies", href: "/privacy/", link: "Privacy and data handling", visual: "data" },
  { title: "Acceptance before expansion", description: "Agree success criteria and control questions with process owners, evaluate the first workflow and use the findings to decide what comes next", href: "/security/", link: "Discuss your requirements", visual: "requirements" },
];

function Lattice() {
  const labels = [
    { text: "Knowledge", left: 15, top: 44 }, { text: "Models", left: 32, top: 23 },
    { text: "Permissions", left: 54, top: 36 }, { text: "Workflows", left: 73, top: 28 },
    { text: "Agents", left: 84, top: 59 }, { text: "Context", left: 35, top: 65 },
    { text: "Integrations", left: 63, top: 78 }, { text: "Human review", left: 8, top: 76 },
  ];
  return <div className={styles.lattice} aria-hidden="true">
    <svg viewBox="0 0 1440 650" preserveAspectRatio="xMidYMid slice">
      <defs><linearGradient id="os-grid-fade" x1="0" y1="0" x2="0" y2="1"><stop stopColor="white" stopOpacity=".06" /><stop offset=".5" stopColor="white" stopOpacity=".36" /><stop offset="1" stopColor="white" stopOpacity=".04" /></linearGradient></defs>
      <g fill="none" stroke="url(#os-grid-fade)" strokeWidth=".75">
        {Array.from({ length: 25 }, (_, i) => {
          const x = 720 + (i - 12) * 64;
          return <path key={"v" + i} d={"M " + (720 + (i - 12) * 21) + " 40 C " + (x * .9 + 72) + " 210 " + (x * 1.1 - 72) + " 470 " + (720 + (i - 12) * 96) + " 690"} />;
        })}
        {Array.from({ length: 15 }, (_, i) => {
          const y = 105 + i * 33;
          return <path key={"h" + i} d={"M -120 " + (y + 125) + " C 320 " + (y - 100) + " 1120 " + (y - 100) + " 1560 " + (y + 125)} />;
        })}
      </g>
      <path className={styles.latticeBeam} d="M -120 430 C 320 205 1120 205 1560 430" fill="none" stroke="#e8ffff" strokeWidth="1.3" />
    </svg>
    {labels.map(label => <span key={label.text} className={styles.latticeLabel}
      style={{ "--chip-x": label.left + "%", "--chip-y": label.top + "%" } as CSSProperties}><i />{label.text}</span>)}
  </div>;
}

function EnterpriseVisual({ kind }: { kind: string }) {
  if (kind === "security" || kind === "data") return <img src={kind === "security" ? "/media/century/diagrams/platform-security.svg" : "/media/century/diagrams/platform-data.svg"} alt="" width={640} height={404} loading="lazy" />;
  if (kind === "deployment") return <div className={styles.deploymentDiagram} aria-hidden="true">
    <div><span>Own server</span><span>Rented infrastructure</span><span>Local or cloud models</span></div>
    <div className={styles.deploymentStem} />
    <strong><img src="/brand/century-logo-white.svg" alt="" width={142} height={37} /></strong>
  </div>;
  return <div className={styles.requirementsDiagram} aria-hidden="true">
    <div><span>Requirements</span><span>Test questions</span><span>Evidence</span></div>
    <CircleCheck size={64} strokeWidth={.7} /><span>Specify, test, review</span>
  </div>;
}

export default function PlatformPage() {
  return <PlatformFrame headerVariant="overlay"
    contactImage={{ src: "/media/closing.webp", width: 1200, height: 495 }}
    contactTitle={<>Build a connected<br />way of working</>}>
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="os-title">
        <picture className={styles.heroBackdrop}>
          <img src="/media/platform.webp" alt="" width={1800} height={1009} fetchPriority="high" />
        </picture>
        <div className={styles.heroShade} />
        <div className={styles.heroTitle}>
          <p className={styles.heroLockup}><img src="/brand/century-logo-white.svg" alt="Century" width={155} height={41} /><span>AI Platform</span></p>
          <h1 id="os-title">One operating environment from specification to governed AI</h1>
        </div>
        <Lattice />
        <a className={styles.heroExplore} href="#operating-layer"><span>Explore the operating layer</span><ArrowDown size={17} aria-hidden="true" /></a>
      </section>
      <section className={styles.infrastructure} id="operating-layer" aria-label="AI operating infrastructure"><div className={styles.container}><OperatingLayerExplorer /></div></section>
      <OperatingLayerRelated current="platform" />
      <section className={styles.advantages} aria-labelledby="os-advantages">
        <div className={styles.container}>
          <div className={styles.sectionIntro}><h2 id="os-advantages">Three stages<br />One continuous cycle</h2><p>Specification → Development → Governance connects business requests, working automations and evidence from daily use, with findings feeding into the next specification</p></div>
          <div className={styles.advantageGrid}>{advantages.map(({ title, text, icon: Icon }) => <article key={title}>
            <Icon size={29} strokeWidth={1.1} aria-hidden="true" /><h3>{title}</h3><p>{text}</p>
          </article>)}</div>
        </div>
      </section>
      <section className={styles.enterprise} aria-labelledby="os-enterprise">
        <div className={styles.container}>
          <h2 id="os-enterprise"><span>Built around enterprise requirements</span><br />Your infrastructure, access rules and acceptance criteria shape each deployment</h2>
          <div className={styles.enterpriseRows}>{enterprise.map(item => <details key={item.title} className={styles.enterpriseRow} name="century-enterprise-requirements">
            <summary><h3>{item.title}</h3><p>{item.description}</p><span className={styles.disclosureIcon} aria-hidden="true" /></summary>
            <div className={styles.enterpriseDetail}><div className={styles.enterpriseArt}><EnterpriseVisual kind={item.visual} /></div><a href={item.href}>{item.link}<ArrowUpRight size={18} aria-hidden="true" /></a></div>
          </details>)}</div>
        </div>
      </section>
    </div>
  </PlatformFrame>;
}
