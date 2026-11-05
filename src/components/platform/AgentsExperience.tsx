"use client";

import { useState } from "react";
import {
  ArrowDown, ArrowRight, ArrowUpRight, AudioLines, BookOpen, Boxes,
  Check, CheckCheck, FileText, GitBranch, Layers3,
  Mail, MessageSquare, Minus, Network, Plus, ShieldCheck, SlidersHorizontal,
  Users, Workflow,
} from "lucide-react";
import AppScreenshot from "@/components/AppScreenshot";
import { TELEGRAM_URL } from "@/lib/site";
import styles from "./AgentsExperience.module.css";

const capabilities = [
  { title: "Work with documents and conversations", description: "Use corporate chat, document recognition and transcription to turn files and conversations into inputs for knowledge search and business workflows", labels: ["Chat", "Documents", "Audio", "Knowledge"] },
  { title: "Build no-code and multi-agent workflows", description: "Combine agents and workflow steps with branches, saved state and employee confirmation where needed, while keeping process logic separate from the model", labels: ["No-code", "Agents", "Workflow", "Human review"] },
  { title: "Connect tools through APIs and MCP", description: "Connect business applications, databases and document systems through APIs and MCP, using your organisation's permissions for each source and action", labels: ["APIs", "MCP", "Data access", "Tools"] },
  { title: "Retrieve knowledge with sources", description: "Ground answers with retrieval-augmented generation (RAG), using relevant document passages, access permissions, and source and version links", labels: ["Documents", "Permissions", "Sources", "Versions"] },
  { title: "Evaluate before you expand", description: "Test on agreed questions, check answers and citations against retrieved sources, and review logs and feedback before widening the scope", labels: ["Test questions", "Sources", "Review", "Improve"] },
];

const operatingPrinciples = [
  { icon: Boxes, title: "A clear specification", text: "Define the process owner, inputs, expected result and acceptance criteria before building" },
  { icon: GitBranch, title: "A scope you can test", text: "Start with representative documents and questions, then expand when the evidence supports it" },
  { icon: BookOpen, title: "Knowledge with versions", text: "Retrieve relevant passages with links to their source documents and versions" },
  { icon: ShieldCheck, title: "Role-based access", text: "Keep answers within the knowledge and systems each user is allowed to access" },
  { icon: Workflow, title: "Workflow controls", text: "Use branches, saved state and retries to manage the steps around the model" },
  { icon: Users, title: "Human confirmation", text: "Add employee approval where the process calls for an accountable decision" },
  { icon: SlidersHorizontal, title: "Model independence", text: "Select models for the task and data policy, then compare quality on your own workload" },
  { icon: CheckCheck, title: "Ongoing governance", text: "Review quality, activity logs and user feedback to guide the next specification" },
];

const scenarios = [
  { name: "Customer support", title: "Prepare service answers with approved context", image: "/media/support.webp", width: 1200, height: 675, href: "/industries/telecommunication/", label: "Service conversations" },
  { name: "Document operations", title: "Recognise scans and extract document fields", image: "/media/workflows.webp", width: 1200, height: 675, href: "/systems/", label: "Documents & workflows" },
  { name: "Company knowledge", title: "Find policies with source and version links", image: "/media/employee-assistance-woman.webp?v=51966346", width: 1600, height: 900, href: "/ai-os/", label: "Employee assistance" },
  { name: "Business processes", title: "Move from a scoped task to a tested workflow", image: "/media/deployment.webp", width: 1200, height: 670, href: "/deployment/", label: "Specification to operation" },
];

function AgentSymbol({ small = false }: { small?: boolean }) {
  return <span className={`${styles.symbol} ${small ? styles.symbolSmall : ""}`} aria-hidden="true"><span /><span /><span /><span /></span>;
}

function WorkflowIllustration() {
  return <div className={styles.flowIllustration} role="group" aria-label="Illustrative workflow from a request to a reviewed action">
    <div className={styles.flowLabel}>An example workflow</div>
    <div className={styles.flowStart}><Mail size={17} /><span>A request arrives</span><span className={styles.flowDot} /></div>
    <div className={styles.flowConnector} />
    <div className={styles.flowStep}><AgentSymbol small /><div><strong>Retrieve approved context</strong><span>Sources · permissions · systems</span></div></div>
    <div className={styles.flowBranch}><span /><span /></div>
    <div className={styles.flowEnds}><span><Users size={14} />Review</span><span><Check size={14} />Next step</span></div>
  </div>;
}

function KnowledgeIllustration() {
  return <div className={styles.knowledgeIllustration} role="group" aria-label="Illustration of company knowledge supporting a conversation">
    <div className={styles.knowledgeFile}><FileText size={18} /><span>Approved documents</span><Check size={14} /></div>
    <div className={styles.knowledgeLine} />
    <div className={styles.knowledgeAnswer}><AgentSymbol small /><p>An answer you can check</p><span><BookOpen size={12} />Source and version included</span></div>
  </div>;
}

function CapabilityIllustration({ active }: { active: number }) {
  const icons = [MessageSquare, FileText, AudioLines, BookOpen];
  return <div className={styles.capabilityArt}>
    <img className={styles.capabilitySky} src="/media/platform.webp" alt="" width="1800" height="1009" loading="lazy" />
    <svg className={styles.orbitLines} viewBox="0 0 600 520" fill="none" aria-hidden="true"><ellipse cx="300" cy="260" rx="225" ry="138" transform="rotate(-28 300 260)" /><ellipse cx="300" cy="260" rx="225" ry="138" transform="rotate(33 300 260)" /><circle cx="300" cy="260" r="178" /></svg>
    <div className={styles.orb}><AgentSymbol /></div>
    {capabilities[active].labels.map((label, index) => { const Icon = icons[index]; return <span key={label} className={`${styles.orbitLabel} ${styles[`orbitLabel${index}`]}`}><Icon size={17} strokeWidth={1.4} />{label}</span>; })}
    <span className={styles.artCaption}>Knowledge, tools and permissions</span>
  </div>;
}

export default function AgentsExperience() {
  const [active, setActive] = useState(0);

  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="agents-title">
      <img className={styles.heroImage} src="/media/strategy.webp" width="1054" height="1451" alt="" fetchPriority="high" decoding="async" />
      <div className={styles.heroShade} />
      <div className={styles.heroContent}>
        <p className={styles.productName}><AgentSymbol />Century Agents</p>
        <h1 id="agents-title">Agents grounded in<br />your company knowledge</h1>
        <p className={styles.heroDescription}>Build assistants and multi-step workflows with the documents, systems and permissions behind your work</p>
      </div>
      <a href="#agent-work" className={styles.scrollLink}><span>Explore Agents</span><ArrowDown size={17} /></a>
    </section>

    <section className={styles.section} id="agent-work" aria-labelledby="agents-work-title">
      <div className={styles.shell}>
        <h2 id="agents-work-title">From a request to a reviewed result</h2>
        <div className={styles.useCases}>
          <a className={`${styles.useCard} ${styles.workCard}`} href="#agent-capabilities">
            <WorkflowIllustration />
            <div className={styles.useCopy}><h3>Build a working process</h3><p>Combine agents, tools and no-code workflow steps, with human confirmation where a decision needs an owner</p><ArrowUpRight size={21} aria-hidden="true" /></div>
          </a>
          <a className={`${styles.useCard} ${styles.customerCard}`} href="#agent-scenarios">
            <img src="/media/century/photos/support-team.webp" srcSet="/media/century/photos/support-team-768.webp 768w, /media/century/photos/support-team.webp 1600w" sizes="(max-width: 820px) 100vw, 33vw" alt="A support specialist wearing a headset and reviewing information at a computer" width="1600" height="900" loading="lazy" />
            <div className={styles.useCopy}><h3>Support service teams</h3><p>Help service teams find procedures and prepare answers from approved documents, with sources available for review</p><ArrowUpRight size={21} aria-hidden="true" /></div>
          </a>
          <a className={`${styles.useCard} ${styles.peopleCard}`} href="#agent-capabilities">
            <KnowledgeIllustration />
            <div className={styles.useCopy}><h3>Find the right document</h3><p>Search policies, manuals and scanned files while respecting access rights and retaining source and version references</p><ArrowUpRight size={21} aria-hidden="true" /></div>
          </a>
        </div>
      </div>
    </section>

    <section className={`${styles.section} ${styles.darkSection}`} id="agent-capabilities" aria-labelledby="agents-capabilities-title">
      <div className={`${styles.shell} ${styles.capabilityLayout}`}>
        <div className={styles.capabilityCopy}>
          <h2 id="agents-capabilities-title">Knowledge, tools<br />and workflow control</h2>
          <p className={styles.sectionIntro}>Bring retrieval, system access and process logic together, then evaluate the agent on the questions your team actually asks</p>
          <div className={styles.accordion}>
            {capabilities.map((capability, index) => <details key={capability.title} name="century-agent-capabilities" className={styles.accordionItem} open={index === 0} onToggle={event => { if (event.currentTarget.open) setActive(index); }}>
              <summary><h3>{capability.title}</h3><Plus className={styles.accordionPlus} size={18} /><Minus className={styles.accordionMinus} size={18} /></summary>
              <p>{capability.description}</p>
            </details>)}
          </div>
        </div>
        <CapabilityIllustration active={active} />
      </div>
    </section>

    <section className={`${styles.section} ${styles.scenariosSection}`} id="agent-scenarios" aria-labelledby="agents-scenarios-title">
      <div className={styles.shell}><div className={styles.headingRow}><h2 id="agents-scenarios-title">Start with work<br />that makes a difference</h2><p>Potential first workflows<br />Agree the outcome and test data with process owners</p></div></div>
      <div className={styles.scenarioTrack} role="region" aria-label="Explore agent use cases">
        {scenarios.map(scenario => <a className={styles.scenario} href={scenario.href} key={scenario.name}><div className={styles.scenarioPhoto}><img src={scenario.image} alt="" loading="lazy" width={scenario.width} height={scenario.height} /><span>{scenario.name}</span></div><div className={styles.scenarioContent}><span>{scenario.label}</span><h3>{scenario.title}</h3><ArrowUpRight size={24} aria-hidden="true" /></div></a>)}
      </div>
      <div className={styles.shell}><p className={styles.scenarioNote}>Illustrative workflows to scope with your team, with integrations and acceptance criteria agreed before implementation</p></div>
    </section>

    <section className={`${styles.section} ${styles.teamSection}`} aria-labelledby="agents-team-title">
      <div className={styles.shell}>
        <div className={styles.headingRow}><h2 id="agents-team-title">Build, evaluate<br />and maintain together</h2><p>Your team can manage documents, permissions and prompts, with training and shared practices for creating, checking and maintaining agents</p></div>
        <div className={styles.principles}>{operatingPrinciples.map(({ icon: Icon, title, text }) => <article key={title}><Icon size={29} strokeWidth={1.2} aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>)}</div>
        <div className={styles.productProof}>
          <div className={styles.proofHeading}><span>Inside Century</span><h3>Model controls and response evidence</h3><p>Inspect model selection and the response details your team can use when evaluating a workflow</p></div>
          <div className={styles.captureGrid}><AppScreenshot capture="model-choice" className={styles.capture} /><AppScreenshot capture="response" className={styles.capture} /></div>
        </div>
      </div>
    </section>

    <section className={`${styles.section} ${styles.connected}`} aria-labelledby="agents-connected-title"><div className={styles.shell}>
      <div className={styles.headingRow}><h2 id="agents-connected-title">Part of a connected platform</h2><a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className={styles.textLink}>Talk through your use case <ArrowUpRight size={18} /></a></div>
      <div className={styles.relatedGrid}>
        <a href="/ai-os/"><Layers3 size={28} strokeWidth={1.2} /><h3>Century AI Platform</h3><p>Specification, development and governance in one environment</p><span>Explore<ArrowRight size={18} /></span></a>
        <a href="/systems/"><Workflow size={28} strokeWidth={1.2} /><h3>Century Systems</h3><p>Connect knowledge and agents to business processes</p><span>Explore<ArrowRight size={18} /></span></a>
        <a href="/ai-gateway/"><Network size={28} strokeWidth={1.2} /><h3>Century AI Gateway</h3><p>Choose models and control which data they can use</p><span>Explore<ArrowRight size={18} /></span></a>
      </div>
    </div></section>
  </div>;
}
