import { ArrowUpRight, Database, Layers3, ShieldCheck, SlidersHorizontal } from "lucide-react";
import PageFrame from "@/components/site/PageFrame";
import { FeatureGrid, RelatedPages, SectionHeading } from "@/components/site/Sections";
import TelegramLink from "@/components/TelegramLink";
import InfrastructureExplorer from "@/components/products/InfrastructureExplorer";
import { PlatformConstellation } from "@/components/products/ProductVisuals";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Century AI OS", "A common foundation for company knowledge, AI workflows and human oversight. Explore Century's approach to enterprise AI.", "/ai-os");

export default function AiOsPage() {
  return <PageFrame>
    <section className="prod-os-hero">
      <div className="shell">
        <p className="prod-os-wordmark"><span className="brand-mark" aria-hidden="true" />Century AI OS</p>
        <h1>A common foundation.<br />For your next AI workflow.</h1>
        <p className="prod-os-description">Bring company knowledge, business processes and human oversight into a connected way of working.</p>
        <div className="prod-hero-actions"><TelegramLink className="btn btn-light">Get in touch</TelegramLink><a className="btn btn-outline-light" href="#infrastructure">Explore the foundation<ArrowUpRight size={17} aria-hidden="true" /></a></div>
        <PlatformConstellation />
      </div>
    </section>
    <section className="section prod-section" id="infrastructure"><div className="shell">
      <SectionHeading eyebrow="The operating layer" title={<>Everything a workflow needs.<br />Considered together.</>} description="Start with a business need. Then connect the knowledge, access rules, tools and review steps that make it useful." />
      <InfrastructureExplorer />
    </div></section>
    <section className="section prod-section prod-bg-lavender"><div className="shell">
      <SectionHeading eyebrow="Build on a shared foundation" title="More connected work. Clearer ownership." />
      <FeatureGrid columns={4} items={[
        { title: "Shared context", description: "Use approved knowledge across related workflows, with source access defined for the people and tasks involved.", icon: <Database size={24} /> },
        { title: "Reusable foundations", description: "Identify the instructions, integrations and review patterns worth carrying forward into the next use case.", icon: <Layers3 size={24} /> },
        { title: "Deliberate model choices", description: "Balance quality, latency, data requirements and cost around the specific job being done.", icon: <SlidersHorizontal size={24} /> },
        { title: "Accountable operations", description: "Keep responsibilities visible: who owns the workflow, who reviews exceptions and who decides what changes.", icon: <ShieldCheck size={24} /> },
      ]} />
    </div></section>
    <section className="section prod-section"><div className="shell prod-boundary-callout"><div><p className="eyebrow">Your environment, your boundaries</p><h2>Define the controls<br />before you connect the work.</h2></div><div><p>Deployment, processing location, retention and external dependencies are part of the implementation discussion. Agree them with your team before introducing AI into a business process.</p><a className="text-link" href="/deployment/">Explore deployment<ArrowUpRight size={18} aria-hidden="true" /></a></div></div></section>
    <RelatedPages links={[
      { href: "/agents/", title: "Century Agents", description: "Put approved knowledge to work alongside your people." },
      { href: "/systems/", title: "Century Systems", description: "Shape a workspace around a real business process." },
      { href: "/ai-gateway/", title: "Century Gateway", description: "Explore a clearer view of AI usage and control." },
    ]} />
  </PageFrame>;
}
