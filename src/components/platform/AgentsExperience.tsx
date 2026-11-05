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
  { title: "Meet the work where it happens", description: "Start with the conversations, documents and requests your people already handle. Define the right channels for each use case and keep the context together.", labels: ["Conversation", "Documents", "Audio", "Knowledge"] },
  { title: "Move through a complete workflow", description: "Break a task into useful steps, connect the information each step needs and give exceptions a clear route to a person. An answer can become the beginning of a process.", labels: ["Understand", "Find context", "Prepare", "Human review"] },
  { title: "Connect the systems behind the work", description: "Identify the interfaces and permissions needed for your workflow. Connect the relevant sources and actions, with an owner for every integration.", labels: ["Company data", "Business tools", "Access rules", "Actions"] },
  { title: "Ground answers in company knowledge", description: "Use the documents, policies and procedures your organisation trusts. Source references help people inspect the context behind an answer before they act.", labels: ["Policies", "Procedures", "Documents", "Sources"] },
  { title: "Make review part of the process", description: "Agree what useful work looks like, review representative requests and define when an agent should hand over. Refine the scope as the team learns from everyday use.", labels: ["Scope", "Review", "Feedback", "Improve"] },
];

const operatingPrinciples = [
  { icon: Boxes, title: "A clear workspace", text: "Organise the knowledge, people and tasks around a defined business purpose." },
  { icon: GitBranch, title: "A manageable scope", text: "Begin with a bounded workflow and expand when the result supports it." },
  { icon: BookOpen, title: "Useful knowledge", text: "Bring approved documents and source context into everyday questions." },
  { icon: ShieldCheck, title: "Defined access", text: "Agree who can use each source, approve a step and own a connection." },
  { icon: Workflow, title: "Repeatable procedures", text: "Turn useful ways of working into patterns your team can build on." },
  { icon: Users, title: "Human handovers", text: "Give exceptions an owner and pass the context needed to continue." },
  { icon: SlidersHorizontal, title: "Model choices", text: "Consider the model, response quality and operating cost for the task." },
  { icon: CheckCheck, title: "A feedback loop", text: "Review corrections and user experience to guide the next improvement." },
];

const scenarios = [
  { name: "Customer support", title: "Give every request a useful next step.", image: "/media/support.webp", href: "/industries/telecommunication/", label: "Service conversations" },
  { name: "Document operations", title: "Turn scattered information into usable context.", image: "/media/workflows.webp", href: "/systems/", label: "Documents & workflows" },
  { name: "Company knowledge", title: "Bring the right knowledge closer to your people.", image: "/media/knowledge.webp", href: "/ai-os/", label: "Employee assistance" },
  { name: "Business processes", title: "Build around the work your team knows best.", image: "/media/deployment.webp", href: "/deployment/", label: "From scope to operation" },
];

function AgentSymbol({ small = false }: { small?: boolean }) {
  return <span className={`${styles.symbol} ${small ? styles.symbolSmall : ""}`} aria-hidden="true"><span /><span /><span /><span /></span>;
}

function WorkflowIllustration() {
  return <div className={styles.flowIllustration} role="group" aria-label="Illustrative workflow from a request to a reviewed action">
    <div className={styles.flowLabel}>An example workflow</div>
    <div className={styles.flowStart}><Mail size={17} /><span>A request arrives</span><span className={styles.flowDot} /></div>
    <div className={styles.flowConnector} />
    <div className={styles.flowStep}><AgentSymbol small /><div><strong>Bring in the context</strong><span>Knowledge · documents · systems</span></div></div>
    <div className={styles.flowBranch}><span /><span /></div>
    <div className={styles.flowEnds}><span><Users size={14} />Review</span><span><Check size={14} />Next step</span></div>
  </div>;
}

function KnowledgeIllustration() {
  return <div className={styles.knowledgeIllustration} role="group" aria-label="Illustration of company knowledge supporting a conversation">
    <div className={styles.knowledgeFile}><FileText size={18} /><span>Company knowledge</span><Check size={14} /></div>
    <div className={styles.knowledgeLine} />
    <div className={styles.knowledgeAnswer}><AgentSymbol small /><p>The context for a better answer.</p><span><BookOpen size={12} />Grounded in your sources</span></div>
  </div>;
}

function CapabilityIllustration({ active }: { active: number }) {
  const icons = [MessageSquare, FileText, AudioLines, BookOpen];
  return <div className={styles.capabilityArt}>
    <img className={styles.capabilitySky} src="/media/platform.webp" alt="" width="1800" height="1009" loading="lazy" />
    <svg className={styles.orbitLines} viewBox="0 0 600 520" fill="none" aria-hidden="true"><ellipse cx="300" cy="260" rx="225" ry="138" transform="rotate(-28 300 260)" /><ellipse cx="300" cy="260" rx="225" ry="138" transform="rotate(33 300 260)" /><circle cx="300" cy="260" r="178" /></svg>
    <div className={styles.orb}><AgentSymbol /></div>
    {capabilities[active].labels.map((label, index) => { const Icon = icons[index]; return <span key={label} className={`${styles.orbitLabel} ${styles[`orbitLabel${index}`]}`}><Icon size={17} strokeWidth={1.4} />{label}</span>; })}
    <span className={styles.artCaption}>Connected around your work</span>
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
        <h1 id="agents-title">Put AI to work,<br />wherever work happens.</h1>
        <p className={styles.heroDescription}>Support customers, help colleagues and move work forward with AI grounded in your business.</p>
      </div>
      <a href="#agent-work" className={styles.scrollLink}><span>Explore Agents</span><ArrowDown size={17} /></a>
    </section>

    <section className={styles.section} id="agent-work" aria-labelledby="agents-work-title">
      <div className={styles.shell}>
        <h2 id="agents-work-title">A new way to move work forward.</h2>
        <div className={styles.useCases}>
          <a className={`${styles.useCard} ${styles.workCard}`} href="#agent-capabilities">
            <WorkflowIllustration />
            <div className={styles.useCopy}><h3>Make everyday work flow.</h3><p>Bring information, decisions and next steps into a focused process, with people involved where their judgement matters.</p><ArrowUpRight size={21} aria-hidden="true" /></div>
          </a>
          <a className={`${styles.useCard} ${styles.customerCard}`} href="#agent-scenarios">
            <img src="/media/century/photos/support-team.webp" srcSet="/media/century/photos/support-team-768.webp 768w, /media/century/photos/support-team.webp 1600w" sizes="(max-width: 820px) 100vw, 33vw" alt="A support specialist wearing a headset and reviewing information at a computer" width="1600" height="900" loading="lazy" />
            <div className={styles.useCopy}><h3>Help the people you serve.</h3><p>Give service teams useful context, prepare relevant answers and keep a clear path from assistance to a human handover.</p><ArrowUpRight size={21} aria-hidden="true" /></div>
          </a>
          <a className={`${styles.useCard} ${styles.peopleCard}`} href="#agent-capabilities">
            <KnowledgeIllustration />
            <div className={styles.useCopy}><h3>Put knowledge within reach.</h3><p>Help colleagues find the policy, document or expertise they need to understand a situation and take the next step.</p><ArrowUpRight size={21} aria-hidden="true" /></div>
          </a>
        </div>
      </div>
    </section>

    <section className={`${styles.section} ${styles.darkSection}`} id="agent-capabilities" aria-labelledby="agents-capabilities-title">
      <div className={`${styles.shell} ${styles.capabilityLayout}`}>
        <div className={styles.capabilityCopy}>
          <h2 id="agents-capabilities-title">Designed for the reality<br />of enterprise work.</h2>
          <p className={styles.sectionIntro}>Work crosses teams, channels and systems. Design the agent around that reality, with clear context and clear responsibility.</p>
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
      <div className={styles.shell}><div className={styles.headingRow}><h2 id="agents-scenarios-title">Start with work<br />that makes a difference.</h2><p>Practical places to begin.<br />Define the outcome with the team doing the work.</p></div></div>
      <div className={styles.scenarioTrack} role="region" aria-label="Explore agent use cases">
        {scenarios.map(scenario => <a className={styles.scenario} href={scenario.href} key={scenario.name}><div className={styles.scenarioPhoto}><img src={scenario.image} alt="" loading="lazy" width="1200" height="675" /><span>{scenario.name}</span></div><div className={styles.scenarioContent}><span>{scenario.label}</span><h3>{scenario.title}</h3><ArrowUpRight size={24} aria-hidden="true" /></div></a>)}
      </div>
      <div className={styles.shell}><p className={styles.scenarioNote}>Example areas for discovery. Scope and integrations are agreed for each deployment.</p></div>
    </section>

    <section className={`${styles.section} ${styles.teamSection}`} aria-labelledby="agents-team-title">
      <div className={styles.shell}>
        <div className={styles.headingRow}><h2 id="agents-team-title">A working agent<br />needs a working team.</h2><p>Think beyond the first answer. Build the ownership, access and feedback that help an agent become useful in daily work.</p></div>
        <div className={styles.principles}>{operatingPrinciples.map(({ icon: Icon, title, text }) => <article key={title}><Icon size={29} strokeWidth={1.2} aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>)}</div>
        <div className={styles.productProof}>
          <div className={styles.proofHeading}><span>Inside Century</span><h3>Real controls. Inspectable responses.</h3><p>A direct look at model selection and response details in the Century application.</p></div>
          <div className={styles.captureGrid}><AppScreenshot capture="model-choice" className={styles.capture} /><AppScreenshot capture="response" className={styles.capture} /></div>
        </div>
      </div>
    </section>

    <section className={`${styles.section} ${styles.connected}`} aria-labelledby="agents-connected-title"><div className={styles.shell}>
      <div className={styles.headingRow}><h2 id="agents-connected-title">Part of a connected platform.</h2><a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className={styles.textLink}>Talk through your use case <ArrowUpRight size={18} /></a></div>
      <div className={styles.relatedGrid}>
        <a href="/ai-os/"><Layers3 size={28} strokeWidth={1.2} /><h3>Century AI OS</h3><p>A shared foundation for knowledge, people and AI.</p><span>Explore<ArrowRight size={18} /></span></a>
        <a href="/systems/"><Workflow size={28} strokeWidth={1.2} /><h3>Century Systems</h3><p>Business workspaces shaped around your process.</p><span>Explore<ArrowRight size={18} /></span></a>
        <a href="/ai-gateway/"><Network size={28} strokeWidth={1.2} /><h3>Century AI Gateway</h3><p>Bring model choices and oversight together.</p><span>Explore<ArrowRight size={18} /></span></a>
      </div>
    </div></section>
  </div>;
}
