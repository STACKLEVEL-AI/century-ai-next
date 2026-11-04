import { ArrowUpRight } from "lucide-react";
import PageFrame from "@/components/site/PageFrame";
import { CapabilityAccordion, RelatedPages, SectionHeading } from "@/components/site/Sections";
import ProductIntro from "@/components/products/ProductIntro";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("AI Transformation", "Choose an AI starting point, evaluate the workflow and plan the next step with clear ownership and measurable outcomes.", "/ai-transformation");

export default function TransformationPage() {
  return <PageFrame><div className="product-page product-page-strategy">
    <ProductIntro eyebrow="Strategy & transformation" title={<>Make AI part of<br />how work gets done.</>}
      description="Choose a business process worth improving. Build the evidence, the understanding and the ownership to make the next step a deliberate one."
      image={{ src: "/media/strategy.webp", alt: "Abstract blue photographic motion with a warm amber accent", width: 1054, height: 1451 }}
      secondary={{ href: "#transformation-principles", label: "Explore the principles" }} />

    <section className="product-section"><div className="shell product-editorial-pair product-strategy-statement"><div><p className="product-kicker">Begin with the work</p><h2>A useful tool is a start.<br /><span>A useful workflow<br />is the goal.</span></h2></div><div className="product-editorial-copy"><p>Work moves between people, documents, systems and decisions. Introducing AI means considering those connections together.</p><p>Understand where the process slows down, who owns the next step and which information the team relies on. Then decide where assistance could make a meaningful difference.</p><p>Let the first use case teach you something practical. Use that evidence to shape the next investment and the pace of change.</p></div></div></section>

    <section className="product-section product-dark" id="transformation-principles"><div className="shell product-accordion-layout"><SectionHeading eyebrow="Five working principles" title={<>A deliberate path<br />to useful AI.</>} description="Keep the business need, operating model and evaluation criteria connected as the scope develops." /><CapabilityAccordion label="AI transformation principles" items={[
      { title: "Choose the problem before the tool", description: "Identify a focused workflow with a clear owner and a worthwhile outcome. Prioritize work you can define and evaluate before choosing the technology." },
      { title: "Follow the whole workflow", description: "Map the handovers between people and systems. The surrounding process needs to use the result and handle its exceptions." },
      { title: "Build understanding inside the team", description: "Involve process owners and reviewers throughout implementation. Document the sources, decisions and responsibilities needed to operate the workflow." },
      { title: "Keep control and choices explicit", description: "Agree data boundaries, access and external dependencies. Assess model and deployment choices against the requirements of the use case." },
      { title: "Measure what changes in the work", description: "Compare time, usefulness, corrections and review effort against a baseline. Use the results to refine the workflow, expand it or stop." },
    ]} /></div></section>

    <section className="product-section"><div className="shell"><div className="product-heading-row"><SectionHeading eyebrow="From intent to a starting brief" title={<>Three questions.<br />A clearer place to begin.</>} /><a className="product-text-link" href="/deployment/">See how we build<ArrowUpRight size={18} aria-hidden="true" /></a></div><ol className="product-brief">{[
      { title: "What needs to improve?", text: "Describe the recurring work, the process owner and the effort or friction you see today.", label: "The opportunity" },
      { title: "What does the workflow need?", text: "Identify the documents, systems, access rules and decisions that require a person.", label: "The requirements" },
      { title: "What would useful look like?", text: "Agree the evidence you need to make a confident decision about the next step.", label: "The outcome" },
    ].map((item, index) => <li key={item.title}><div className="product-brief-top"><span>0{index + 1}</span><p>{item.label}</p></div><h3>{item.title}</h3><p>{item.text}</p></li>)}</ol></div></section>
    <RelatedPages title="Connect the approach to the work." links={[{ href: "/ai-os/", title: "The platform foundation", description: "Explore how knowledge, workflows and oversight fit together." }, { href: "/deployment/", title: "The delivery path", description: "Move from a bounded use case to evidence and operating ownership." }]} />
  </div></PageFrame>;
}
