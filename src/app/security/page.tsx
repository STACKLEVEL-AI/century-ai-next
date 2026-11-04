import { ArrowUpRight, Check, LockKeyhole } from "lucide-react";
import PageFrame from "@/components/site/PageFrame";
import PageHero from "@/components/site/PageHero";
import { CapabilityAccordion, RelatedPages, SectionHeading } from "@/components/site/Sections";
import Trust from "@/components/Trust";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Security & control", "Explore the decisions behind a Century deployment: data location, access boundaries, human oversight and operational visibility.", "/security");

const deploymentDecisions = [
  { title: "Data & processing locations", description: "Identify the information used by the workflow, where it is processed and stored, and every external service involved. Include generated outputs and diagnostic data in that discussion." },
  { title: "Users & permissions", description: "Define who may access each source, who may request an action and who may approve it. Agree how permission changes and revoked access will reach the workflow." },
  { title: "Retention & support access", description: "Agree which records are needed, how long they remain available and who can use them for support. Set expectations for deletion, backups and access to sensitive information." },
  { title: "Integrations & action boundaries", description: "Separate reading information from changing another system. Document the permitted actions, credentials, approval requirements and behaviour when a connected service is unavailable." },
  { title: "Evaluation & acceptance", description: "Review representative requests, exceptions and out-of-scope cases with the process owner. Record the expected behaviour and the limitations that remain before introducing the workflow to users." },
  { title: "Ownership & ongoing operation", description: "Name the people responsible for sources, access and system changes. Agree how to report an issue, inspect a result and pause a workflow when necessary." },
];

export default function SecurityPage() {
  return <PageFrame>
    <PageHero eyebrow="Security & control" title={<>Confidence comes<br />from clear boundaries.</>} description="Design the deployment around your environment. Decide what AI can access, what it can do and where people stay involved." secondary={{href:"#deployment-brief",label:"Explore deployment decisions"}}>
      <div className="company-control-art"><div className="company-control-top"><span className="eyebrow">A deployment conversation</span><LockKeyhole size={23} aria-hidden="true" /></div><h2>Your business.<br />Your boundaries.</h2><div className="company-control-items">{["An agreed environment","Approved knowledge sources","Defined review responsibilities","Visibility into the work"].map((item) => <span key={item}><Check size={17} aria-hidden="true" />{item}</span>)}</div><p>Configured for the agreed workflow.</p></div>
    </PageHero>
    <Trust />
    <section className="section company-deployment-section" id="deployment-brief"><div className="shell company-two-column"><div><SectionHeading eyebrow="Before implementation" title={<>Six decisions.<br />One shared brief.</>} description="Bring the business owner, technical team and people responsible for data into the same conversation. Define the conditions for your deployment before it becomes part of daily work." /><a className="company-text-link" href="/blog/plan-ai-deployment/">Read the deployment guide<ArrowUpRight size={18} aria-hidden="true" /></a></div><CapabilityAccordion items={deploymentDecisions} label="Deployment planning decisions" /></div></section>
    <section className="section company-security-note"><div className="shell company-two-column"><SectionHeading eyebrow="Clear expectations" title={<>Controls need<br />an operating process.</>} /><div className="company-prose"><p>Security and compliance depend on the use case, configuration, contractual arrangements and how a system is operated. The controls described here are topics for a deployment discussion, not a certification or a guarantee that every configuration meets every requirement.</p><p>For a specific project, the relevant controls, responsibilities and evidence should be documented and reviewed with your team. The <a href="/privacy/">public website’s privacy information</a> describes this website; it does not determine the data handling of a customer deployment.</p></div></div></section>
    <RelatedPages title="Make the decisions concrete." links={[{href:"/blog/answers-need-sources/",title:"Answers with sources",description:"Make it possible for people to inspect the evidence behind a response.",eyebrow:"Knowledge"},{href:"/blog/human-review/",title:"Meaningful human review",description:"Put approval and responsibility at the consequential steps.",eyebrow:"Workflows"}]} />
  </PageFrame>;
}
