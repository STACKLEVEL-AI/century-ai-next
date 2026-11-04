import { Cloud, Code2, Database, Server, UsersRound } from "lucide-react";
import PageFrame from "@/components/site/PageFrame";
import PageHero from "@/components/site/PageHero";
import { FeatureGrid, RelatedPages, SectionHeading } from "@/components/site/Sections";
import AppScreenshot from "@/components/AppScreenshot";
import DeploymentPhases from "@/components/products/DeploymentPhases";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Deployment", "Plan a Century AI workflow from discovery through implementation and operating ownership, with deployment choices agreed around your environment.", "/deployment");

export default function DeploymentPage() {
  return <PageFrame>
    <PageHero eyebrow="Deployment" title={<>Bring AI into the work.<br />With your team.</>} description="Start with a real business need. Build a focused workflow, evaluate it with the people who use it and agree how it will be operated." secondary={{ href: "#delivery-path", label: "See the delivery path" }}><AppScreenshot capture="files" priority /></PageHero>
    <section className="section prod-section"><div className="shell"><SectionHeading eyebrow="Two perspectives, one use case" title="Make it work. Make it useful." description="Technical implementation and business ownership belong in the same process from the beginning." /><FeatureGrid columns={2} items={[
      { title: "The technical foundation", description: "Review sources, interfaces, access and infrastructure. Build the agreed workflow with the checks and review points it needs to operate in your environment.", icon: <Code2 size={27} /> },
      { title: "The business outcome", description: "Identify the process owner, current effort and evaluation criteria. Involve the people doing the work so the result can be assessed against a meaningful baseline.", icon: <UsersRound size={27} /> },
    ]} /></div></section>
    <section className="section prod-section prod-bg-lavender" id="delivery-path"><div className="shell"><SectionHeading eyebrow="A practical delivery path" title={<>From the first question<br />to a clear next decision.</>} description="Move through discovery, implementation and operating ownership with an agreed scope at each stage." /><DeploymentPhases /></div></section>
    <section className="section prod-section"><div className="shell"><SectionHeading eyebrow="Infrastructure is part of the decision" title="Compare the options. Confirm the fit." description="The deployment model depends on your architecture, data requirements and operating responsibilities. Availability and scope are confirmed during the implementation discussion." /><FeatureGrid columns={4} items={[
      { title: "Shared cloud service", description: "Assess isolation, provider dependencies and service arrangements when a shared environment is appropriate.", icon: <Cloud size={24} /> },
      { title: "Dedicated environment", description: "Consider a separate environment where configuration and access requirements call for stronger isolation.", icon: <Database size={24} /> },
      { title: "Your cloud", description: "Review the responsibilities and connections involved in running within infrastructure your organization manages.", icon: <Cloud size={24} /> },
      { title: "On-premises", description: "Discuss local infrastructure, model dependencies and the operating support required by your environment.", icon: <Server size={24} /> },
    ]} /><p className="prod-boundary-note">Processing location, retention, external services, support access and commercial terms are agreed for each deployment.</p></div></section>
    <RelatedPages links={[{ href: "/ai-transformation/", title: "Choose the right starting point", description: "Shape the roadmap around a business need and useful evidence." }, { href: "/ai-os/", title: "Build on a common foundation", description: "Consider knowledge, integrations and oversight together." }]} />
  </PageFrame>;
}
