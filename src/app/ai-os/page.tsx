import type { CSSProperties } from "react";
import { ArrowDown, ArrowUpRight, Boxes, CircleCheck, Database, Layers3, Network, ShieldCheck } from "lucide-react";
import PlatformFrame from "@/components/platform/PlatformFrame";
import OperatingLayerExplorer from "@/components/platform/OperatingLayerExplorer";
import OperatingLayerRelated from "@/components/platform/OperatingLayerRelated";
import { pageMetadata } from "@/lib/metadata";
import styles from "@/components/platform/OperatingLayer.module.css";

export const metadata = pageMetadata("Century AI OS", "One connected foundation for company knowledge, AI agents, business applications and human oversight.", "/ai-os");

const advantages = [
  { title: "Freedom to choose models", text: "Make model decisions around the task, the information involved and the outcomes your team needs.", icon: Boxes },
  { title: "A foundation to build on", text: "Reuse useful integrations, instructions and review patterns as the next business workflow takes shape.", icon: Layers3 },
  { title: "Knowledge in context", text: "Connect work to approved information, with clear sources and a deliberate approach to access.", icon: Database },
  { title: "Shared operating rules", text: "Bring ownership, data boundaries and human review into the same design as the application.", icon: ShieldCheck },
  { title: "Learning across workflows", text: "Use the feedback from everyday work to refine the next implementation and decide where to expand.", icon: Network },
];

const enterprise = [
  { title: "Deployment that fits", description: "Choose the environment with your infrastructure team. Agree where the application runs, who operates it and how it connects to existing systems.", href: "/deployment/", link: "Explore deployment", visual: "deployment" },
  { title: "Security by design", description: "Define access, operating responsibilities and escalation paths before extending a workflow into a new part of the business.", href: "/security/", link: "Our approach to security", visual: "security" },
  { title: "Clear data boundaries", description: "Review the information each process uses, its permitted destinations and the retention requirements that apply to your organization.", href: "/privacy/", link: "Privacy and data handling", visual: "data" },
  { title: "Requirements made explicit", description: "Document the controls and evidence your organization needs. Review the scope with the people responsible for compliance and procurement.", href: "/security/", link: "Discuss your requirements", visual: "requirements" },
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
  if (kind === "security" || kind === "data") return <img src={"/media/platform/ai-os/" + kind + ".webp"} alt="" width={640} height={404} loading="lazy" />;
  if (kind === "deployment") return <div className={styles.deploymentDiagram} aria-hidden="true">
    <div><span>Shared environment</span><span>Dedicated environment</span><span>Your infrastructure</span></div>
    <div className={styles.deploymentStem} />
    <strong><img src="/brand/century-logo-white.svg" alt="" width={142} height={37} /></strong>
  </div>;
  return <div className={styles.requirementsDiagram} aria-hidden="true">
    <div><span>Requirements</span><span>Controls</span><span>Evidence</span></div>
    <CircleCheck size={64} strokeWidth={.7} /><span>Document. Review. Agree.</span>
  </div>;
}

export default function AiOsPage() {
  return <PlatformFrame headerVariant="overlay"
    contactImage={{ src: "/media/platform/ai-os/enterprise.webp", width: 1800, height: 1009 }}
    contactTitle={<>Build a connected<br />way of working.</>}>
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="os-title">
        <picture className={styles.heroBackdrop}>
          <source media="(max-width: 700px)" srcSet="/media/platform/ai-os/hero-mobile.webp" />
          <img src="/media/platform/ai-os/hero.webp" alt="" width={1800} height={1009} fetchPriority="high" />
        </picture>
        <div className={styles.heroShade} />
        <div className={styles.heroTitle}>
          <p className={styles.heroLockup}><img src="/brand/century-logo-white.svg" alt="Century" width={155} height={41} /><span>AI OS</span></p>
          <h1 id="os-title">One connected operating layer for people, agents and applications.</h1>
        </div>
        <Lattice />
        <a className={styles.heroExplore} href="#operating-layer"><span>Explore the operating layer</span><ArrowDown size={17} aria-hidden="true" /></a>
      </section>
      <section className={styles.infrastructure} id="operating-layer" aria-label="AI operating infrastructure"><div className={styles.container}><OperatingLayerExplorer /></div></section>
      <OperatingLayerRelated current="ai-os" />
      <section className={styles.advantages} aria-labelledby="os-advantages">
        <div className={styles.container}>
          <div className={styles.sectionIntro}><h2 id="os-advantages">More connected work.<br />Less starting over.</h2><p>Consider knowledge, models, integrations and oversight together. Give the next workflow a useful foundation instead of another isolated tool.</p></div>
          <div className={styles.advantageGrid}>{advantages.map(({ title, text, icon: Icon }) => <article key={title}>
            <Icon size={29} strokeWidth={1.1} aria-hidden="true" /><h3>{title}</h3><p>{text}</p>
          </article>)}</div>
        </div>
      </section>
      <section className={styles.enterprise} aria-labelledby="os-enterprise">
        <div className={styles.container}>
          <h2 id="os-enterprise"><span>Built around enterprise requirements.</span><br />Your environment, your data and your responsibilities shape the implementation.</h2>
          <div className={styles.enterpriseRows}>{enterprise.map(item => <details key={item.title} className={styles.enterpriseRow} name="century-enterprise-requirements">
            <summary><h3>{item.title}</h3><p>{item.description}</p><span className={styles.disclosureIcon} aria-hidden="true" /></summary>
            <div className={styles.enterpriseDetail}><div className={styles.enterpriseArt}><EnterpriseVisual kind={item.visual} /></div><a href={item.href}>{item.link}<ArrowUpRight size={18} aria-hidden="true" /></a></div>
          </details>)}</div>
        </div>
      </section>
    </div>
  </PlatformFrame>;
}
