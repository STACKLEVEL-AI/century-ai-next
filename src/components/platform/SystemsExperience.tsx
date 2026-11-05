import {
  ArrowDown, ArrowRight, ArrowUpRight, BookOpen, Check, CircleDollarSign,
  ClipboardCheck, FileText, Layers3, Network, Plus, Minus, Route,
  Settings2, ShieldCheck, Sparkles, Users, Workflow,
} from "lucide-react";
import AppScreenshot from "@/components/AppScreenshot";
import { TELEGRAM_URL } from "@/lib/site";
import styles from "./SystemsExperience.module.css";

const businessSystems = [
  { title: "Document operations", intro: "Turn incoming files into reviewable work", description: "Explore OCR and field extraction for incoming documents, then apply agreed checks and prepare a draft for review by the person responsible", stages: ["Source documents", "Extract & check", "Human review"], icon: Users, detail: "Define the fields, validation rules and acceptance criteria on representative documents" },
  { title: "Operational reporting", intro: "Ask questions of approved business data", description: "Use natural-language queries and connected data to prepare operational reports, with access rules and a review step before the results inform a decision", stages: ["Business question", "Approved data", "Team review"], icon: Route, detail: "Scope the data sources, calculations and checks with the team that owns the process" },
  { title: "Knowledge management", intro: "Find the right source and document version", description: "Combine document recognition and knowledge retrieval to answer questions about policies, procedures and equipment, using only the sources a person is allowed to access", stages: ["Permitted sources", "Retrieve context", "Source & version"], icon: BookOpen, detail: "Organise knowledge by product or document version and keep ownership of each source clear" },
  { title: "Employee assistance", intro: "Help colleagues use internal knowledge", description: "Give employees a corporate assistant for internal policies, quality documents and recurring questions, while keeping expert judgement and accountable decisions with people", stages: ["Employee question", "Policy & context", "Employee decision"], icon: ClipboardCheck, detail: "Agree the knowledge scope and test questions with the people responsible for the documents" },
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
      <img className={styles.heroImage} src="/media/closing.webp" alt="" width="1200" height="495" fetchPriority="high" decoding="async" />
      <div className={styles.heroShade} />
      <div className={styles.heroContent}><p className={styles.productName}><SystemsSymbol />Century Systems</p><h1 id="systems-title">Turn company knowledge into working business processes</h1><p className={styles.heroDescription}>Connect agents, documents and existing systems through workflows your team can build, evaluate and maintain</p></div>
      <a className={styles.scrollLink} href="#systems-design"><span>Explore Systems</span><ArrowDown size={17} /></a>
    </section>

    <section className={styles.section} id="systems-design" aria-labelledby="systems-design-title"><div className={`${styles.shell} ${styles.adaptLayout}`}>
      <div className={styles.adaptCopy}><h2 id="systems-design-title">One lifecycle<br />for every automation</h2><p className={styles.intro}>Specification → Development → Governance, with process owners and developers involved throughout</p>
        <div className={styles.requirements}>
          <article><span>01</span><div><h3>Specification</h3><p>Capture requests from business teams, clarify the process, data and owner, then agree value, readiness and acceptance criteria</p></div></article>
          <article><span>02</span><div><h3>Development</h3><p>Build with agents, RAG, integrations and workflow tools, then test the result on representative documents and questions</p></div></article>
          <article><span>03</span><div><h3>Governance</h3><p>Review quality, impact, versions and access, with activity logs and findings feeding into the next specification</p></div></article>
        </div>
      </div>
      <div className={styles.adaptVisual}><div className={styles.workPhoto}><img src="/media/century/photos/support-team.webp" srcSet="/media/century/photos/support-team-768.webp 768w, /media/century/photos/support-team.webp 1600w" sizes="(max-width: 820px) 100vw, 55vw" width="1600" height="900" alt="Support colleagues reviewing information at a computer" loading="lazy" /><div className={styles.photoNote}><span>Designed around your team</span><p>People, process, evidence</p></div></div><div className={styles.roleLine}><span><Users size={16} />Requester</span><span><Settings2 size={16} />Operator</span><span><ShieldCheck size={16} />Reviewer</span></div></div>
    </div></section>

    <section className={`${styles.section} ${styles.darkSection} ${styles.benefitsSection}`} aria-labelledby="systems-benefits-title"><div className={styles.shell}>
      <div className={styles.headingRow}><h2 id="systems-benefits-title">Choose the right method<br />Measure the result</h2><p>Some tasks need an agent, others need a deterministic integration or expert assistance, so choose the approach around the work</p></div>
      <div className={styles.benefits}>
        <article><Route size={32} strokeWidth={1.2} /><h3>Choose the right<br />automation mode</h3><p>Use agents for repeatable workflows, RPA for defined data transfers and corporate chat for expert work, with accountable decisions kept with people</p></article>
        <article><CircleDollarSign size={32} strokeWidth={1.2} /><h3>Measure value<br />against a baseline</h3><p>Agree measures with process owners, including time, quality and operating cost, then compare the results after launch with the original expectations</p></article>
        <article><Layers3 size={32} strokeWidth={1.2} /><h3>Keep your systems<br />Connect the workflow</h3><p>Connect existing applications, databases and document systems through APIs and MCP, using permissions issued by your organisation</p></article>
      </div>
    </div></section>

    <section className={`${styles.section} ${styles.darkSection} ${styles.systemsSection}`} id="business-systems" aria-labelledby="business-systems-title"><div className={styles.shell}>
      <h2 id="business-systems-title">Explore workflows for<br />everyday operations</h2>
      <div className={styles.systemsAccordion}>{businessSystems.map((item, index) => <details className={styles.systemItem} key={item.title} name="century-business-systems" open={index === 0}>
        <summary><h3>{item.title}</h3><Plus className={styles.accordionPlus} size={21} /><Minus className={styles.accordionMinus} size={21} /></summary>
        <div className={styles.systemPanel}><div className={styles.systemDescription}><h4>{item.intro}</h4><p>{item.description}</p><span>{item.detail}</span><a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">Discuss this workflow <ArrowUpRight size={16} /></a></div><SystemWorkflow index={index} /></div>
      </details>)}</div>
      <div className={styles.systemProof}>
        <div className={styles.proofHeading}><span>Inside Century</span><h3>Build on the documents<br />your team already uses</h3><p>The Century file library and document import controls provide a starting point for knowledge workflows, with sources and access agreed for each implementation</p></div>
        <div className={styles.captureStack}><AppScreenshot capture="files" className={styles.capture} /><AppScreenshot capture="document" className={`${styles.capture} ${styles.smallCapture}`} /></div>
      </div>
    </div></section>

    <section className={styles.section} aria-labelledby="systems-delivery-title"><div className={styles.shell}>
      <h2 id="systems-delivery-title">Build the first workflows<br />with your team</h2>
      <div className={styles.deliveryCards}>
        <a className={styles.deliveryPhoto} href="/deployment/"><img src="/media/workflows.webp" width="1200" height="675" alt="An aerial view of a logistics centre and loading docks" loading="lazy" /><div><span>From specification to operation</span><h3>A practical path<br />to rollout</h3><p>Co-build the first workflows, establish evaluation practices and train your developers to maintain and extend what comes next</p><ArrowUpRight size={23} aria-hidden="true" /></div></a>
        <a className={styles.deliveryArchitecture} href="/deployment/"><div className={styles.architectureGraphic} aria-hidden="true"><div className={styles.architectureTop}><Network size={29} strokeWidth={1} /><span>Your environment</span></div><div className={styles.architectureConnector} /><div className={styles.architectureNodes}><span><BookOpen size={21} strokeWidth={1.2} />Knowledge</span><span><SystemsSymbol />Century</span><span><ShieldCheck size={21} strokeWidth={1.2} />Access</span></div></div><div className={styles.architectureCopy}><span>Environment & ownership</span><h3>Keep your requirements<br />at the centre</h3><p>Run the platform on your infrastructure, with knowledge, agents, access rules and logs together and model connections governed by your data policy</p><ArrowUpRight size={23} aria-hidden="true" /></div></a>
      </div>
    </div></section>

    <section className={`${styles.section} ${styles.connected}`} aria-labelledby="systems-connected-title"><div className={styles.shell}>
      <h2 id="systems-connected-title">Built on a connected platform</h2>
      <div className={styles.relatedGrid}>
        <a href="/ai-os/"><Layers3 size={28} strokeWidth={1.2} /><h3>Century AI Platform</h3><p>Specification, development and governance in one environment</p><span>Explore<ArrowRight size={18} /></span></a>
        <a href="/agents/"><Workflow size={28} strokeWidth={1.2} /><h3>Century Agents</h3><p>Build assistants grounded in permitted knowledge</p><span>Explore<ArrowRight size={18} /></span></a>
        <a href="/ai-gateway/"><Network size={28} strokeWidth={1.2} /><h3>Century AI Gateway</h3><p>Choose models and control which data they can use</p><span>Explore<ArrowRight size={18} /></span></a>
      </div>
    </div></section>
  </div>;
}
