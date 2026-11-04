import { BookOpen, GitBranch, Headphones, Layers3, ListChecks, UserRoundCheck } from "lucide-react";
import PageFrame from "@/components/site/PageFrame";
import PageHero from "@/components/site/PageHero";
import { CapabilityAccordion, FeatureGrid, RelatedPages, SectionHeading } from "@/components/site/Sections";
import AppScreenshot from "@/components/AppScreenshot";
import Brain from "@/components/Brain";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Century Agents", "AI assistance for company knowledge, document workflows and support, with source references and human review.", "/agents");

export default function AgentsPage() {
  return <PageFrame>
    <PageHero eyebrow="Century Agents" title={<>Give your teams<br />a capable next step.</>} description="Help people find answers, prepare decisions and move routine work forward. Start with approved knowledge and keep a clear path to human review." secondary={{ href: "#agent-work", label: "Explore use cases" }}><div className="app-hero-stack"><AppScreenshot capture="model-choice" priority /><AppScreenshot capture="response" priority /></div></PageHero>
    <section className="section prod-section" id="agent-work"><div className="shell"><SectionHeading eyebrow="Where assistance becomes useful" title="Three ways to move work forward." /><FeatureGrid columns={3} items={[
      { title: "Find company knowledge", description: "Help employees navigate policies, procedures and internal documents. Include references they can inspect before relying on an answer.", icon: <BookOpen size={25} /> },
      { title: "Prepare document workflows", description: "Extract information, compare it with defined rules and prepare a next step for the person responsible for the decision.", icon: <GitBranch size={25} /> },
      { title: "Support the support team", description: "Draft answers to recurring requests and pass exceptions to a person with the context needed to take over.", icon: <Headphones size={25} /> },
    ]} /></div></section>
    <section className="section prod-section prod-bg-lavender"><div className="shell prod-split-section"><SectionHeading eyebrow="Built around the work" title={<>Useful assistance.<br />Clear boundaries.</>} description="An agent's scope should be explicit: the information it uses, the steps it can prepare and the decisions that remain with people." /><CapabilityAccordion label="Agent design considerations" items={[
      { title: "Knowledge before action", description: "Define the authoritative sources and permitted context for each task. Source-linked answers help a reviewer check the basis for a recommendation." },
      { title: "The systems you already use", description: "Review available interfaces and access requirements before connecting the workflow. Start with the integrations needed for the agreed use case." },
      { title: "Exceptions need an owner", description: "Specify when work should pause or move to a person, and what context that person needs. A handover is part of the process design." },
      { title: "Evaluate before expanding", description: "Use representative requests and agreed criteria to assess usefulness, corrections and review effort before considering a broader rollout." },
    ]} /></div></section>
    <Brain />
    <section className="section prod-section"><div className="shell"><SectionHeading eyebrow="From first version to everyday use" title="Give the workflow a working team." /><FeatureGrid columns={3} items={[
      { title: "A clear owner", description: "Name the people responsible for the workflow, its sources and its review decisions.", icon: <UserRoundCheck size={23} /> },
      { title: "A useful baseline", description: "Compare the proposed workflow with the effort and quality of the existing process.", icon: <ListChecks size={23} /> },
      { title: "A considered next step", description: "Use feedback to refine the scope, reuse what works and decide whether to expand.", icon: <Layers3 size={23} /> },
    ]} /></div></section>
    <RelatedPages links={[{ href: "/ai-os/", title: "The shared foundation", description: "Knowledge, integrations and oversight considered together." }, { href: "/deployment/", title: "From scope to operation", description: "Plan a first workflow around a measurable business need." }]} />
  </PageFrame>;
}
