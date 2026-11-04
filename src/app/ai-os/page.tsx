import { ArrowUpRight, Database, Layers3, ShieldCheck, SlidersHorizontal } from "lucide-react";
import PageFrame from "@/components/site/PageFrame";
import { RelatedPages, SectionHeading } from "@/components/site/Sections";
import InfrastructureExplorer from "@/components/products/InfrastructureExplorer";
import ProductIntro from "@/components/products/ProductIntro";
import AppScreenshot from "@/components/AppScreenshot";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Century AI OS", "A common foundation for company knowledge, AI workflows and human oversight. Explore Century's approach to enterprise AI.", "/ai-os");

const foundations = [
  { title: "Shared context", description: "Bring approved knowledge into the work, with access defined for the people and tasks involved.", icon: Database },
  { title: "Reusable foundations", description: "Carry useful instructions, integrations and review patterns into the next use case.", icon: Layers3 },
  { title: "Deliberate model choices", description: "Balance quality, response time, data requirements and cost around the job being done.", icon: SlidersHorizontal },
  { title: "Accountable operations", description: "Keep the workflow owner, the exception reviewer and the next decision visible.", icon: ShieldCheck },
];

export default function AiOsPage() {
  return <PageFrame headerVariant="overlay"><div className="product-page product-page-os">
    <ProductIntro eyebrow="Century AI OS" variant="center" dark
      title={<>One connected layer.<br /><span>More possibilities at work.</span></>}
      description="Bring company knowledge, business processes and human oversight together. Give every workflow a foundation to build on."
      image={{ src: "/media/platform.webp", alt: "", width: 1800, height: 1009 }}
      secondary={{ href: "#infrastructure", label: "Explore the foundation" }} />

    <section className="product-section product-dark product-os-workspace" aria-labelledby="workspace-title">
      <div className="shell">
        <div className="product-proof-heading"><div><p className="product-kicker">Inside Century</p><h2 id="workspace-title">Your knowledge.<br />The tools to use it.</h2></div><p>Model controls and a shared file library, shown directly from the Century application.</p></div>
        <div className="product-capture-pair"><AppScreenshot capture="models" /><AppScreenshot capture="files" /></div>
      </div>
    </section>

    <section className="product-section" id="infrastructure"><div className="shell">
      <div className="product-heading-row"><SectionHeading eyebrow="The operating layer" title={<>Every part of the workflow.<br />Considered together.</>} /><p>Start with a business need. Connect the knowledge, tools, permissions and review steps that make it useful.</p></div>
      <InfrastructureExplorer />
    </div></section>

    <section className="product-section product-muted"><div className="shell">
      <SectionHeading eyebrow="A common foundation" title={<>Build once.<br />Learn with every workflow.</>} />
      <div className="product-capabilities product-capabilities-four">{foundations.map(({ title, description, icon: Icon }, index) => <article key={title}><div className="product-capability-top"><Icon size={24} strokeWidth={1.4} aria-hidden="true" /><span>0{index + 1}</span></div><h3>{title}</h3><p>{description}</p></article>)}</div>
    </div></section>

    <section className="product-section"><div className="shell product-editorial-pair"><div><p className="product-kicker">Your environment, your boundaries</p><h2>Connected work.<br />Clear ownership.</h2></div><div className="product-editorial-copy"><p>Where the workflow runs, which information it uses and who reviews its outputs are part of the same design.</p><p>Agree processing location, retention and external dependencies with your team before connecting a new business process.</p><a className="product-text-link" href="/deployment/">Explore deployment<ArrowUpRight size={18} aria-hidden="true" /></a></div></div></section>

    <RelatedPages links={[
      { href: "/agents/", title: "Century Agents", description: "Put approved knowledge to work alongside your people." },
      { href: "/systems/", title: "Century Systems", description: "Shape a workspace around a real business process." },
      { href: "/ai-gateway/", title: "Century Gateway", description: "Bring model choices and response details into view." },
    ]} />
  </div></PageFrame>;
}
