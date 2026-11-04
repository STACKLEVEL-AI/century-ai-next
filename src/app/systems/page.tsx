import { ArrowUpRight, BookOpen, BriefcaseBusiness, ContactRound, Files } from "lucide-react";
import PageFrame from "@/components/site/PageFrame";
import PageHero from "@/components/site/PageHero";
import { FeatureGrid, RelatedPages, SectionHeading } from "@/components/site/Sections";
import AppScreenshot from "@/components/AppScreenshot";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Century Systems", "Design AI-assisted business workspaces around your requirements, existing systems and review responsibilities.", "/systems");

export default function SystemsPage() {
  return <PageFrame>
    <PageHero eyebrow="Century Systems" title={<>Software shaped<br />around your work.</>} description="Bring the information, process steps and decisions of a focused business workflow into a workspace your team can understand and use." secondary={{ href: "#system-design", label: "Explore the approach" }}><AppScreenshot capture="files" priority /></PageHero>
    <section className="section prod-section" id="system-design"><div className="shell prod-split-section"><SectionHeading eyebrow="Start with your requirements" title={<>Let the process<br />shape the system.</>} description="Map how the work happens before deciding what to automate, connect or replace." /><ol className="prod-principles-list">{[
      { title: "Your requirements come first", text: "Start with the process owner, data and decisions. Identify what is already working and where a focused application could remove friction." },
      { title: "A useful view for each role", text: "Consider what a requester, operator and reviewer need to see. Keep context and permitted actions aligned with their responsibilities." },
      { title: "Change with evidence", text: "Introduce a bounded workflow, evaluate it and improve it with the team. Expand the scope when the results support the next step." },
    ].map((item, index) => <li key={item.title}><span aria-hidden="true">0{index + 1}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></li>)}</ol></div></section>
    <section className="section prod-section prod-bg-lavender"><div className="shell"><SectionHeading eyebrow="Inside the application" title="Work with the information you already have." description="Bring a document into the workspace or work with an existing file. These interface details come directly from Century." /><div className="app-capture-grid"><AppScreenshot capture="document" /><AppScreenshot capture="files" /></div></div></section>
    <section className="section prod-section"><div className="shell"><SectionHeading eyebrow="Possible starting points" title="Build around a business function." description="These are workflow areas to explore. The application, integration and migration scope is agreed around your existing environment." /><FeatureGrid columns={4} items={[
      { title: "Customer operations", description: "Bring request context and review steps together for the teams serving your customers.", icon: <ContactRound size={24} /> },
      { title: "Knowledge workspaces", description: "Make approved information easier to find, inspect and use in a specific business process.", icon: <BookOpen size={24} /> },
      { title: "People processes", description: "Help internal teams work with policies, recurring requests and document-based approvals.", icon: <BriefcaseBusiness size={24} /> },
      { title: "Document operations", description: "Connect incoming documents to extraction, checks, exceptions and a reviewed next step.", icon: <Files size={24} /> },
    ]} /></div></section>
    <section className="section prod-section prod-bg-charcoal"><div className="shell prod-delivery-pair"><div><p className="eyebrow">Implementation</p><h2>Fit the new workflow<br />into the existing business.</h2><p>Understand the systems, interfaces and responsibilities already in place. Plan data access and any migration before changing how a team works.</p><a className="text-link" href="/deployment/">Explore deployment<ArrowUpRight size={18} aria-hidden="true" /></a></div><div><p className="eyebrow">Control</p><h2>Agree where it runs<br />and who owns it.</h2><p>Discuss infrastructure, processing location, retention and support arrangements. Define review responsibilities alongside the application itself.</p><a className="text-link" href="/ai-gateway/">Explore usage and control<ArrowUpRight size={18} aria-hidden="true" /></a></div></div></section>
    <RelatedPages links={[{ href: "/ai-os/", title: "Century AI OS", description: "A common foundation for connected workflows." }, { href: "/agents/", title: "Century Agents", description: "Useful assistance inside a defined business process." }]} />
  </PageFrame>;
}
