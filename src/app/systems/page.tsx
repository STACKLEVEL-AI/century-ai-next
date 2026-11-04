import { ArrowUpRight, BookOpen, BriefcaseBusiness, ContactRound, Files } from "lucide-react";
import PageFrame from "@/components/site/PageFrame";
import { RelatedPages, SectionHeading } from "@/components/site/Sections";
import ProductIntro from "@/components/products/ProductIntro";
import AppScreenshot from "@/components/AppScreenshot";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Century Systems", "Design AI-assisted business workspaces around your requirements, existing systems and review responsibilities.", "/systems");

const principles = [
  { title: "Begin with the process.", text: "Understand the owner, the information and the decisions. Identify what already works and where a focused application could remove friction." },
  { title: "Make every role clear.", text: "Give requesters, operators and reviewers the context and permitted actions they need to do their part." },
  { title: "Improve with evidence.", text: "Introduce one bounded workflow, evaluate it with the team and expand when the results support the next step." },
];
const functions = [
  { title: "Customer operations", description: "Bring request context and review steps together for the teams serving your customers.", icon: ContactRound },
  { title: "Knowledge workspaces", description: "Make approved information easier to find, inspect and use in a specific business process.", icon: BookOpen },
  { title: "People processes", description: "Work with policies, recurring internal requests and document-based approvals.", icon: BriefcaseBusiness },
  { title: "Document operations", description: "Connect incoming documents to extraction, checks, exceptions and a reviewed next step.", icon: Files },
];

export default function SystemsPage() {
  return <PageFrame><div className="product-page product-page-systems">
    <ProductIntro eyebrow="Century Systems" variant="editorial" title={<>Software shaped<br />around your work.</>}
      description="Bring information, process steps and decisions into a focused workspace. Build around how your team works and the systems you already use."
      image={{ src: "/images/enterprise-atrium.webp", alt: "A sunlit courtyard framed by curved stone and glass architecture", width: 1672, height: 941 }}
      secondary={{ href: "#system-design", label: "Explore the approach" }} />

    <section className="product-section" id="system-design"><div className="shell product-accordion-layout"><SectionHeading eyebrow="Your requirements come first" title={<>Let the work<br />shape the system.</>} description="Map the process before deciding what to automate, connect or replace." /><ol className="product-principles">{principles.map((item, index) => <li key={item.title}><span>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></li>)}</ol></div></section>

    <section className="product-section product-dark"><div className="shell">
      <div className="product-heading-row"><SectionHeading eyebrow="Inside the application" title={<>The information you have.<br />A place to work with it.</>} /><p>Choose a document or work with existing files. These details come directly from the Century workspace.</p></div>
      <div className="product-system-captures"><AppScreenshot capture="files" /><AppScreenshot capture="document" /></div>
    </div></section>

    <section className="product-section"><div className="shell"><SectionHeading eyebrow="Where to begin" title="A focused system. A useful business function." description="Explore an initial application around one of the workflows your team already handles." /><div className="product-capabilities product-capabilities-four">{functions.map(({ title, description, icon: Icon }, index) => <article key={title}><div className="product-capability-top"><Icon size={24} strokeWidth={1.4} aria-hidden="true" /><span>0{index + 1}</span></div><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>

    <section className="product-section product-muted"><div className="shell product-delivery-pair"><article><p className="product-kicker">Implementation</p><h2>Connect to the<br />existing business.</h2><p>Review the systems, interfaces and responsibilities already in place. Plan access and any migration before changing how a team works.</p><a className="product-text-link" href="/deployment/">Explore deployment<ArrowUpRight size={18} aria-hidden="true" /></a></article><article><p className="product-kicker">Operating ownership</p><h2>Agree where it runs.<br />Know who owns it.</h2><p>Define processing location, retention and support arrangements. Keep review responsibilities as clear as the application itself.</p><a className="product-text-link" href="/ai-gateway/">Explore usage and control<ArrowUpRight size={18} aria-hidden="true" /></a></article></div></section>
    <RelatedPages links={[{ href: "/ai-os/", title: "Century AI OS", description: "A common foundation for connected workflows." }, { href: "/agents/", title: "Century Agents", description: "Useful assistance inside a defined business process." }]} />
  </div></PageFrame>;
}
