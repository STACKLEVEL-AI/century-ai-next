import { ArrowUpRight, Cloud, Code2, Database, Server, UsersRound } from "lucide-react";
import PageFrame from "@/components/site/PageFrame";
import { RelatedPages, SectionHeading } from "@/components/site/Sections";
import ProductIntro from "@/components/products/ProductIntro";
import DeploymentPhases from "@/components/products/DeploymentPhases";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Deployment", "Plan a Century AI workflow from discovery through implementation and operating ownership, with deployment choices agreed around your environment.", "/deployment");

const environments = [
  { title: "Shared cloud", description: "Assess isolation, provider dependencies and service arrangements for a shared environment.", icon: Cloud },
  { title: "Dedicated environment", description: "Consider a separate environment for specific configuration and access requirements.", icon: Database },
  { title: "Your cloud", description: "Review the connections and responsibilities of infrastructure your organization manages.", icon: Cloud },
  { title: "On-premises", description: "Discuss local infrastructure, model dependencies and the support your environment needs.", icon: Server },
];

export default function DeploymentPage() {
  return <PageFrame headerVariant="overlay"><div className="product-page product-page-deployment">
    <ProductIntro eyebrow="Deployment" variant="immersive" dark
      title={<>From the first brief<br />to everyday use.</>}
      description="Build with the people who know the work. Start with a focused workflow, evaluate it together and agree how it will be operated."
      image={{ src: "/media/deployment.webp", alt: "", width: 1200, height: 670 }}
      secondary={{ href: "#delivery-path", label: "See the delivery path" }} />

    <section className="product-section"><div className="shell"><div className="product-heading-row"><SectionHeading eyebrow="Two perspectives. One use case." title={<>Make it work.<br />Make it useful.</>} /><p>Technical implementation and business ownership belong in the same conversation from the beginning.</p></div><div className="product-delivery-perspectives"><article><Code2 size={28} strokeWidth={1.4} aria-hidden="true" /><div><h3>The technical foundation.</h3><p>Review sources, interfaces, access and infrastructure. Build the agreed workflow with the checks and review points it needs in your environment.</p></div></article><article><UsersRound size={28} strokeWidth={1.4} aria-hidden="true" /><div><h3>The business outcome.</h3><p>Identify the process owner, current effort and evaluation criteria. Involve the people doing the work so the result can be assessed against a meaningful baseline.</p></div></article></div></div></section>

    <section className="product-section product-muted product-deployment-path" id="delivery-path"><div className="shell"><SectionHeading eyebrow="A practical delivery path" title={<>A shared brief.<br />A working pilot. A clear next step.</>} description="Move from discovery to implementation and operating ownership, with a decision at each stage." /><DeploymentPhases /></div></section>

    <section className="product-section" id="deployment-options"><div className="shell"><div className="product-heading-row"><SectionHeading eyebrow="Infrastructure is part of the design" title={<>The environment<br />that fits your requirements.</>} /><p>Compare deployment options against your architecture, data requirements and operating responsibilities.</p></div><div className="product-capabilities product-capabilities-four">{environments.map(({ title, description, icon: Icon }, index) => <article key={title}><div className="product-capability-top"><Icon size={24} strokeWidth={1.4} aria-hidden="true" /><span>0{index + 1}</span></div><h3>{title}</h3><p>{description}</p></article>)}</div><div className="product-deployment-note"><p>Availability, processing location, retention, external services and support access are agreed for each deployment.</p><a className="product-text-link" href="/security/">Explore security considerations<ArrowUpRight size={18} aria-hidden="true" /></a></div></div></section>
    <RelatedPages links={[{ href: "/ai-transformation/", title: "Choose the right starting point", description: "Shape the roadmap around a business need and useful evidence." }, { href: "/ai-os/", title: "Build on a common foundation", description: "Consider knowledge, integrations and oversight together." }]} />
  </div></PageFrame>;
}
