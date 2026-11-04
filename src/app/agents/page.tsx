import { ArrowUpRight, BookOpen, GitBranch, Headphones } from "lucide-react";
import PageFrame from "@/components/site/PageFrame";
import { CapabilityAccordion, RelatedPages, SectionHeading } from "@/components/site/Sections";
import ProductIntro from "@/components/products/ProductIntro";
import AppScreenshot from "@/components/AppScreenshot";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Century Agents", "AI assistance for company knowledge, document workflows and support, with source references and human review.", "/agents");

const useCases = [
  { title: "Find the knowledge.", description: "Help employees navigate policies, procedures and internal documents. Bring the relevant information and inspectable source references into the answer.", note: "Company knowledge", icon: BookOpen },
  { title: "Move the document forward.", description: "Extract information, compare it with defined rules and prepare the next step for the person responsible for the decision.", note: "Document workflows", icon: GitBranch },
  { title: "Support the people who help.", description: "Prepare answers to recurring requests. When a person needs to take over, pass along the context they need to continue.", note: "Customer & employee support", icon: Headphones },
];

export default function AgentsPage() {
  return <PageFrame><div className="product-page product-page-agents">
    <ProductIntro eyebrow="Century Agents" title={<>Knowledge that<br />moves work forward.</>}
      description="Help your people find answers, prepare decisions and take the next step. Start with approved knowledge and keep a clear path to human review."
      image={{ src: "/media/knowledge.webp", alt: "Warm light across an operations workspace, seen through glass", width: 1200, height: 675 }}
      secondary={{ href: "#agent-work", label: "Explore the use cases" }} />

    <nav className="product-page-nav" aria-label="Agents page sections"><div className="shell"><a href="#agent-work"><span>01</span>Where agents help</a><a href="#inside-agents"><span>02</span>Inside Century</a><a href="#agent-design"><span>03</span>How we design</a></div></nav>

    <section className="product-section" id="agent-work"><div className="shell">
      <SectionHeading eyebrow="From information to action" title={<>A useful answer is a beginning.<br />A useful next step goes further.</>} />
      <div className="product-use-cases">{useCases.map(({ title, description, note, icon: Icon }, index) => <article key={title}><div className="product-use-case-label"><span>0{index + 1}</span><Icon size={22} strokeWidth={1.4} aria-hidden="true" /><p>{note}</p></div><h3>{title}</h3><p>{description}</p></article>)}</div>
    </div></section>

    <section className="product-section product-dark" id="inside-agents"><div className="shell">
      <div className="product-heading-row"><SectionHeading eyebrow="Inside Century" title={<>Choose the model.<br />Inspect the response.</>} /><p>Real application details give your team something concrete to review: a model choice, the information used and the response that follows.</p></div>
      <div className="product-agent-captures"><AppScreenshot capture="model-choice" /><AppScreenshot capture="response" /></div>
      <a className="product-text-link" href="/ai-gateway/">Explore models and control<ArrowUpRight size={18} aria-hidden="true" /></a>
    </div></section>

    <section className="product-section" id="agent-design"><div className="shell product-accordion-layout">
      <SectionHeading eyebrow="Designed around the work" title={<>Capable assistance.<br />Clear boundaries.</>} description="Define the information an agent uses, the steps it can prepare and the decisions that remain with your people." />
      <CapabilityAccordion label="Agent design considerations" items={[
        { title: "Knowledge before action", description: "Identify the authoritative sources and permitted context for each task. Source-linked answers help a reviewer check the basis for a recommendation." },
        { title: "Work with your existing systems", description: "Review available interfaces and access requirements. Connect the integrations needed for the agreed use case, with an owner for each connection." },
        { title: "Give exceptions an owner", description: "Specify when work should pause or move to a person, and what context that person needs. Design the handover alongside the workflow." },
        { title: "Learn before expanding", description: "Evaluate representative requests against agreed criteria. Review usefulness, corrections and human effort before considering a broader rollout." },
      ]} />
    </div></section>

    <section className="product-section product-muted"><div className="shell product-editorial-pair"><div><p className="product-kicker">From first use to everyday work</p><h2>A working agent<br />needs a working team.</h2></div><div className="product-editorial-copy"><p>Name the workflow owner. Establish the baseline. Involve the people who will use, review and improve the result.</p><p>Build feedback into the process so the next decision is grounded in the work: refine the scope, reuse what helps or choose a different starting point.</p><a className="product-text-link" href="/deployment/">See the delivery path<ArrowUpRight size={18} aria-hidden="true" /></a></div></div></section>
    <RelatedPages links={[{ href: "/ai-os/", title: "The shared foundation", description: "Knowledge, integrations and oversight considered together." }, { href: "/systems/", title: "A workspace that fits", description: "Bring assistance into a focused business process." }, { href: "/deployment/", title: "From scope to operation", description: "Build a first workflow around a meaningful business need." }]} />
  </div></PageFrame>;
}
