import {
  ArrowDown, ArrowRight, ArrowUpRight, BookOpen, Check, CircleDollarSign,
  ClipboardCheck, FileText, Layers3, Network, Plus, Minus, Route,
  Settings2, ShieldCheck, Sparkles, Users, Workflow,
} from "lucide-react";
import AppScreenshot from "@/components/AppScreenshot";
import { TELEGRAM_URL } from "@/lib/site";
import styles from "./SystemsExperience.module.css";

const businessSystems = [
  { title: "Customer relationship management", intro: "Put the customer context beside the work.", description: "Bring relevant records, requests and company knowledge into a focused process. Help your team prepare the next interaction, with ownership and approval kept clear.", stages: ["Customer context", "Prepare next steps", "Team review"], icon: Users, detail: "Connect the sources and permissions needed for the agreed customer workflow." },
  { title: "Customer value management", intro: "Make the next decision more informed.", description: "Help teams interpret the information behind customer needs. Prepare useful context for service and account decisions, with the criteria and final decision owned by your people.", stages: ["Relevant signals", "Understand the need", "Account decision"], icon: Route, detail: "Begin with a defined question and review the usefulness of the information it brings together." },
  { title: "Knowledge management", intro: "Make what your organisation knows easier to use.", description: "Connect policies, documents and working knowledge to the questions people ask. Keep references close to the answer so colleagues can check the source and continue their work.", stages: ["Approved sources", "Question & context", "Referenced answer"], icon: BookOpen, detail: "Choose authoritative sources, define access and name the people responsible for keeping them useful." },
  { title: "Human capital management", intro: "Support the people behind the process.", description: "Make internal requests, onboarding information and recurring employee questions easier to navigate. Give sensitive decisions and exceptions a clear route to the right person.", stages: ["Employee request", "Policy & process", "People team"], icon: ClipboardCheck, detail: "Keep personal information, permissions and human responsibility central to the design." },
];

function SystemsSymbol() {
  return <span className={styles.symbol} aria-hidden="true"><span /><span /><span /><span /></span>;
}

function SystemWorkflow({ index }: { index: number }) {
  const item = businessSystems[index];
  const Icon = item.icon;
  return <div className={styles.workflowVisual} role="group" aria-label={`Illustrative ${item.title.toLowerCase()} workflow`}>
    <div className={styles.visualHeader}><span><SystemsSymbol />Century Systems</span><span>Workflow concept</span></div>
    <div className={styles.visualContent}>
      <div className={styles.visualTitle}><Icon size={22} strokeWidth={1.25} /><span>{item.title}</span></div>
      <div className={styles.workflowSteps}>{item.stages.map((stage, stageIndex) => <div className={styles.workflowUnit} key={stage}><div className={styles.workflowNode}><span>{String(stageIndex + 1).padStart(2, "0")}</span>{stageIndex === 0 ? <FileText size={24} strokeWidth={1.2} /> : stageIndex === 1 ? <Sparkles size={24} strokeWidth={1.2} /> : <Check size={24} strokeWidth={1.2} />}<strong>{stage}</strong></div>{stageIndex < 2 && <ArrowRight className={styles.stageArrow} size={20} strokeWidth={1.2} aria-hidden="true" />}</div>)}</div>
      <div className={styles.workflowGuard}><ShieldCheck size={15} strokeWidth={1.3} /><span>Agreed sources</span><span>Defined access</span><span>Human responsibility</span></div>
    </div>
    <div className={styles.visualFooter}><span>Designed with your team</span><span>Scope agreed during discovery</span></div>
  </div>;
}

export default function SystemsExperience() {
  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="systems-title">
      <img className={styles.heroImage} src="/media/platform/systems/motion.webp" srcSet="/media/platform/systems/motion-720.webp 720w, /media/platform/systems/motion-1280.webp 1280w, /media/platform/systems/motion.webp 1800w" sizes="100vw" alt="" width="1800" height="974" fetchPriority="high" decoding="async" />
      <div className={styles.heroShade} />
      <div className={styles.heroContent}><p className={styles.productName}><SystemsSymbol />Century Systems</p><h1 id="systems-title">Business software shaped around the way you work.</h1><p className={styles.heroDescription}>AI-assisted systems designed around your people, processes and existing tools.</p></div>
      <a className={styles.scrollLink} href="#systems-design"><span>Explore Systems</span><ArrowDown size={17} /></a>
    </section>

    <section className={styles.section} id="systems-design" aria-labelledby="systems-design-title"><div className={`${styles.shell} ${styles.adaptLayout}`}>
      <div className={styles.adaptCopy}><h2 id="systems-design-title">Your work sets<br />the requirements.</h2><p className={styles.intro}>Bring the software closer to how your organisation actually works.</p>
        <div className={styles.requirements}>
          <article><span>01</span><div><h3>Start with the process.</h3><p>Map the information, people and decisions that move the work forward. Design the workspace around that process.</p></div></article>
          <article><span>02</span><div><h3>Build room for change.</h3><p>Begin with a useful scope. Refine the workflow as requirements evolve and your team learns what helps.</p></div></article>
          <article><span>03</span><div><h3>Consider every role.</h3><p>Requesters, operators and reviewers need different context. Give each a clear responsibility and the right view of the work.</p></div></article>
        </div>
      </div>
      <div className={styles.adaptVisual}><div className={styles.workPhoto}><img src="/media/platform/systems/working-team.webp" srcSet="/media/platform/systems/working-team-720.webp 720w, /media/platform/systems/working-team-1280.webp 1280w, /media/platform/systems/working-team.webp 1800w" sizes="(max-width: 820px) 100vw, 55vw" width="1800" height="1005" alt="A colleague working at a monitor in an office" loading="lazy" /><div className={styles.photoNote}><span>Designed around your team</span><p>People. Process. Context.</p></div></div><div className={styles.roleLine}><span><Users size={16} />Requester</span><span><Settings2 size={16} />Operator</span><span><ShieldCheck size={16} />Reviewer</span></div></div>
    </div></section>

    <section className={`${styles.section} ${styles.darkSection} ${styles.benefitsSection}`} aria-labelledby="systems-benefits-title"><div className={styles.shell}>
      <div className={styles.headingRow}><h2 id="systems-benefits-title">Make a useful change.<br />Then build on it.</h2><p>A focused starting point helps you understand the value, the operating needs and the work that comes next.</p></div>
      <div className={styles.benefits}>
        <article><Route size={32} strokeWidth={1.2} /><h3>Modernise one workflow<br />at a time.</h3><p>Start with a concrete business need and a clear owner. Connect to the existing process before considering a wider replacement.</p></article>
        <article><CircleDollarSign size={32} strokeWidth={1.2} /><h3>Understand the whole<br />operating cost.</h3><p>Consider integrations, model usage, human review and ongoing ownership alongside the initial implementation.</p></article>
        <article><Layers3 size={32} strokeWidth={1.2} /><h3>Bring the work<br />closer together.</h3><p>Reduce unnecessary handoffs by bringing the information and steps for a defined task into one coherent experience.</p></article>
      </div>
    </div></section>

    <section className={`${styles.section} ${styles.darkSection} ${styles.systemsSection}`} id="business-systems" aria-labelledby="business-systems-title"><div className={styles.shell}>
      <h2 id="business-systems-title">Build around your<br />core business processes.</h2>
      <div className={styles.systemsAccordion}>{businessSystems.map((item, index) => <details className={styles.systemItem} key={item.title} name="century-business-systems" open={index === 0}>
        <summary><h3>{item.title}</h3><Plus className={styles.accordionPlus} size={21} /><Minus className={styles.accordionMinus} size={21} /></summary>
        <div className={styles.systemPanel}><div className={styles.systemDescription}><h4>{item.intro}</h4><p>{item.description}</p><span>{item.detail}</span><a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">Discuss this workflow <ArrowUpRight size={16} /></a></div><SystemWorkflow index={index} /></div>
      </details>)}</div>
      <div className={styles.systemProof}>
        <div className={styles.proofHeading}><span>Inside Century</span><h3>Start with the information<br />your team already uses.</h3><p>These are direct captures of the Century file library and document import control. A broader business system is scoped around your requirements.</p></div>
        <div className={styles.captureStack}><AppScreenshot capture="files" className={styles.capture} /><AppScreenshot capture="document" className={`${styles.capture} ${styles.smallCapture}`} /></div>
      </div>
    </div></section>

    <section className={styles.section} aria-labelledby="systems-delivery-title"><div className={styles.shell}>
      <h2 id="systems-delivery-title">Built with your team.<br />Deployed around your needs.</h2>
      <div className={styles.deliveryCards}>
        <a className={styles.deliveryPhoto} href="/deployment/"><img src="/media/workflows.webp" width="1200" height="675" alt="People collaborating in a working environment" loading="lazy" /><div><span>From discovery to daily use</span><h3>A practical path<br />to rollout.</h3><p>Map the process, agree a useful first scope and involve the people who will operate and review the result.</p><ArrowUpRight size={23} aria-hidden="true" /></div></a>
        <a className={styles.deliveryArchitecture} href="/deployment/"><div className={styles.architectureGraphic} aria-hidden="true"><div className={styles.architectureTop}><Network size={29} strokeWidth={1} /><span>Your environment</span></div><div className={styles.architectureConnector} /><div className={styles.architectureNodes}><span><BookOpen size={21} strokeWidth={1.2} />Knowledge</span><span><SystemsSymbol />Century</span><span><ShieldCheck size={21} strokeWidth={1.2} />Access</span></div></div><div className={styles.architectureCopy}><span>Environment & ownership</span><h3>Keep your requirements<br />at the centre.</h3><p>Agree hosting, data access, integration ownership and operational responsibilities as part of the deployment.</p><ArrowUpRight size={23} aria-hidden="true" /></div></a>
      </div>
    </div></section>

    <section className={`${styles.section} ${styles.connected}`} aria-labelledby="systems-connected-title"><div className={styles.shell}>
      <h2 id="systems-connected-title">Built on a connected platform.</h2>
      <div className={styles.relatedGrid}>
        <a href="/ai-os/"><Layers3 size={28} strokeWidth={1.2} /><h3>Century AI OS</h3><p>A shared foundation for AI across your organisation.</p><span>Explore<ArrowRight size={18} /></span></a>
        <a href="/agents/"><Workflow size={28} strokeWidth={1.2} /><h3>Century Agents</h3><p>Help people find answers and move work forward.</p><span>Explore<ArrowRight size={18} /></span></a>
        <a href="/ai-gateway/"><Network size={28} strokeWidth={1.2} /><h3>Century AI Gateway</h3><p>Connect model choice with practical oversight.</p><span>Explore<ArrowRight size={18} /></span></a>
      </div>
    </div></section>
  </div>;
}
