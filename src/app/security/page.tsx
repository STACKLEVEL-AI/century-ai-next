import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import PageFrame from "@/components/site/PageFrame";
import { RelatedPages } from "@/components/site/Sections";
import { CompanyAccordion, CompanyCTA, CompanyHeading } from "@/components/company/CompanyElements";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Security & control", "Explore the decisions behind a Century deployment: data location, access boundaries, human oversight and operational visibility.", "/security");

const controls = [
  { title: "Deployment choices", description: "Discuss on-premises or private infrastructure to match the requirements of your environment." },
  { title: "Access boundaries", description: "Define which sources a user or workflow is allowed to use." },
  { title: "Human oversight", description: "Set review points for exceptions and actions that require approval." },
  { title: "Operational visibility", description: "Review activity, outputs and usage to support ongoing evaluation." },
];
const deploymentDecisions = [
  { title: "Data & processing locations", description: "Identify the information used by the workflow, where it is processed and stored, and every external service involved. Include generated outputs and diagnostic data in that discussion." },
  { title: "Users & permissions", description: "Define who may access each source, who may request an action and who may approve it. Agree how permission changes and revoked access will reach the workflow." },
  { title: "Retention & support access", description: "Agree which records are needed, how long they remain available and who can use them for support. Set expectations for deletion, backups and access to sensitive information." },
  { title: "Integrations & action boundaries", description: "Separate reading information from changing another system. Document the permitted actions, credentials, approval requirements and behaviour when a connected service is unavailable." },
  { title: "Evaluation & acceptance", description: "Review representative requests, exceptions and out-of-scope cases with the process owner. Record the expected behaviour and the limitations that remain before introducing the workflow to users." },
  { title: "Ownership & ongoing operation", description: "Name the people responsible for sources, access and system changes. Agree how to report an issue, inspect a result and pause a workflow when necessary." },
];
const questions = [
  { title: "Can Century work with our existing systems?", description: "We scope the required sources and integrations around the first workflow. Available interfaces, access rules and implementation effort are reviewed before the project starts." },
  { title: "Where will our data be processed?", description: "The processing location and external dependencies depend on the agreed deployment. These are defined before implementation rather than assumed from the website’s domain." },
  { title: "Does the platform automatically make us compliant?", description: "No. Compliance depends on your use case, configuration, contracts and operating processes. Technical controls support that work but do not replace it." },
];

export default function SecurityPage() {
  return (
    <PageFrame showContact={false} headerVariant="overlay">
      <div className="co-page co-security">
        <header className="co-immersive-hero co-security-hero">
          <Image src="/media/platform.webp" alt="" fill sizes="100vw" priority />
          <div className="shell co-immersive-content"><p className="co-eyebrow">Security & control</p><h1>Confidence comes<br />from clear boundaries.</h1><div className="co-immersive-bottom"><p>Design the deployment around your environment. Decide what AI can access, what it can do and where people stay involved.</p><a className="co-text-link" href="#deployment-brief">Explore deployment decisions<ArrowDown size={18} aria-hidden="true" /></a></div></div>
        </header>
        <section className="co-section">
          <div className="shell">
            <div className="co-section-top"><CompanyHeading eyebrow="Designed around your business" title={<>Your environment.<br />Your boundaries.</>} /><p>Decide where AI runs and how it is controlled. Agree the deployment model, permitted sources and review responsibilities before introducing AI into a business process.</p></div>
            <div className="co-controls-grid">{controls.map((item, i) => <article key={item.title}><span className="co-index" aria-hidden="true">0{i + 1}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
            <p className="co-footnote">Data location, retention, support access and external services are agreed for each deployment.</p>
          </div>
        </section>
        <section className="co-section co-warm" id="deployment-brief">
          <div className="shell co-security-brief">
            <div><CompanyHeading eyebrow="Before implementation" title={<>Six decisions.<br />One shared brief.</>} description="Bring the business owner, technical team and people responsible for data into the same conversation. Define the conditions for your deployment before it becomes part of daily work." /><a className="co-text-link" href="/blog/plan-ai-deployment/">Read the deployment guide<ArrowUpRight size={18} aria-hidden="true" /></a></div>
            <CompanyAccordion items={deploymentDecisions} label="Deployment decisions" firstOpen />
          </div>
        </section>
        <section className="co-section" id="security">
          <div className="shell co-security-brief"><CompanyHeading eyebrow="A few practical questions" title={<>Before<br />we start.</>} /><CompanyAccordion items={questions} label="Security questions" /></div>
        </section>
        <section className="co-section co-security-scope">
          <div className="shell co-editorial-split"><CompanyHeading eyebrow="A shared responsibility" title={<>Controls need<br />an operating process.</>} /><div className="co-prose"><p>Security and compliance depend on the use case, configuration, contractual arrangements and how a system is operated. The controls described here are topics for a deployment discussion, not a certification or a guarantee that every configuration meets every requirement.</p><p>For a specific project, the relevant controls, responsibilities and evidence should be documented and reviewed with your team. The <a href="/privacy/">public website’s privacy information</a> describes this website; it does not determine the data handling of a customer deployment.</p></div></div>
        </section>
        <RelatedPages title="Put the principles into practice." links={[
          { href: "/blog/answers-need-sources/", eyebrow: "Knowledge", title: "Answers you can inspect", description: "Keep the evidence and access rules connected to the answer." },
          { href: "/blog/human-review/", eyebrow: "Workflows", title: "A meaningful review point", description: "Give people the context they need to make a decision." },
        ]} />
        <CompanyCTA title={<>Define the boundaries.<br />Then build with confidence.</>} description="Start with your process and environment. Discuss the sources, review points and deployment decisions with Vitali." />
      </div>
    </PageFrame>
  );
}
