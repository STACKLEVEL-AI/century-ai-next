import PageFrame from "@/components/site/PageFrame";
import PageHero from "@/components/site/PageHero";
import { CapabilityAccordion, RelatedPages, SectionHeading } from "@/components/site/Sections";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("AI Transformation", "Choose an AI starting point, evaluate the workflow and plan the next step with clear ownership and measurable outcomes.", "/ai-transformation");

export default function TransformationPage() {
  return <PageFrame>
    <PageHero eyebrow="Strategy & transformation" title={<>Make AI part of<br />how work gets done.</>} description="The starting point is a business process worth improving. The roadmap follows the evidence you build along the way." secondary={{ href: "#transformation-principles", label: "Explore the principles" }} />
    <section className="section prod-section"><div className="shell prod-editorial"><p className="eyebrow">Begin with the work</p><div><h2>A useful tool is a start.<br />A useful workflow is the goal.</h2><p>A request rarely belongs to one application or one department. It moves between people, documents, systems and decisions. Introducing AI into that process means considering those connections together.</p><p>Start by understanding where the work slows down, who owns the next step and which information the team relies on. Then decide where assistance, document processing or a reviewed action could make a meaningful difference.</p><p>The first use case should teach you something practical. Use that evidence to shape the next investment, the operating responsibilities and the pace of change.</p></div></div></section>
    <section className="section prod-section prod-bg-lavender" id="transformation-principles"><div className="shell prod-split-section"><SectionHeading eyebrow="Five working principles" title={<>A deliberate path<br />to useful AI.</>} description="Keep the business need, operating model and evaluation criteria connected as the scope develops." /><CapabilityAccordion label="AI transformation principles" items={[
      { title: "Choose the problem before the tool", description: "Identify a focused workflow with a clear owner and a worthwhile outcome. Prioritize the work you can define and evaluate, rather than starting with a technology list." },
      { title: "Follow the whole workflow", description: "Map handovers between people and systems. Improving one step is useful only if the surrounding process can use the result and handle its exceptions." },
      { title: "Build understanding inside the team", description: "Involve process owners and reviewers throughout implementation. Document the sources, decisions and responsibilities needed to operate the workflow." },
      { title: "Keep control and choices explicit", description: "Agree data boundaries, access and external dependencies. Assess model and deployment choices against the requirements of the specific use case." },
      { title: "Measure what changes in the work", description: "Compare time, usefulness, corrections and review effort against a baseline. Use the results to refine the workflow, expand it or stop." },
    ]} /></div></section>
    <section className="section prod-section"><div className="shell"><SectionHeading eyebrow="Turn intent into a starting brief" title="Three questions before the first build." /><ol className="prod-roadmap">{[
      { title: "What needs to improve?", text: "Describe the recurring work, the process owner and the effort or friction you see today." },
      { title: "What does the workflow need?", text: "Identify the relevant documents, systems, access rules and decisions that require a person." },
      { title: "What would useful look like?", text: "Agree the evidence you need to make a confident decision about the next step." },
    ].map((item, index) => <li key={item.title}><span aria-hidden="true">0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></li>)}</ol></div></section>
    <RelatedPages title="Connect the approach to the work." links={[{ href: "/ai-os/", title: "The platform foundation", description: "Explore how knowledge, workflows and oversight fit together." }, { href: "/deployment/", title: "The delivery path", description: "Move from a bounded use case to evidence and operating ownership." }]} />
  </PageFrame>;
}
