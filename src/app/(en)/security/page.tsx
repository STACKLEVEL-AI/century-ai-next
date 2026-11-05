import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import PageFrame from "@/components/site/PageFrame";
import { RelatedPages } from "@/components/site/Sections";
import { CompanyAccordion, CompanyCTA, CompanyHeading } from "@/components/company/CompanyElements";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Security & control", "Configure Century around corporate identity, knowledge access, model data boundaries, verification and audit logs", "/security");

const controls = [
  { title: "Corporate identity", description: "Connect SSO and define access to agents, documents and tools through roles" },
  { title: "Knowledge access", description: "Limit retrieval to permitted documents and show the source and version behind answers" },
  { title: "Model boundaries", description: "Set rules for which data can reach each model, including approved external services" },
  { title: "Audit and monitoring", description: "Track user and agent actions, review quality and resource use, and export logs to SIEM" },
];
const deploymentDecisions = [
  { title: "Data & model routes", description: "Choose local or external models for each task. Define the data each model may receive, and configure a closed environment when external API and cloud calls are not permitted" },
  { title: "Identity & knowledge access", description: "Connect corporate SSO, assign roles and scope document access by team or responsibility. Source and version references let reviewers inspect the information behind an answer" },
  { title: "Records & support access", description: "Keep source documents, versions and activity logs in the agreed deployment. Define retention, backup and support access with the teams responsible for operating it" },
  { title: "Tools & human review", description: "Connect APIs, databases and MCP services with permission checks and logging. Set employee confirmation points for actions that require review, and define recovery steps for failed calls" },
  { title: "Evaluation & acceptance", description: "Agree control questions, datasets and target metrics with process owners. Check source support and citations, then measure answer quality, corrections and processing time before rollout" },
  { title: "Operations & ownership", description: "Name the owners of data, policies and workflows. Connect logs to your SIEM, monitor quality and resource use, and train your team to maintain the deployment" },
];
const questions = [
  { title: "Can Century connect to our existing systems?", description: "Century connects through APIs, databases and MCP. Corporate identity, source access and SIEM integration are configured around the selected workflows and your infrastructure." },
  { title: "Can processing stay in our environment?", description: "A closed deployment can use local models and operate without external API or cloud calls. If an external model is selected, the allowed data and processing route are defined explicitly." },
  { title: "How do we check model quality?", description: "Evaluate candidate models on your documents and control questions, with agreed success criteria. Compare results before selecting the model and confirm performance on approved real data after deployment." },
];

export default function SecurityPage() {
  return (
    <PageFrame showContact={false} headerVariant="overlay">
      <div className="co-page co-security">
        <header className="co-immersive-hero co-security-hero">
          <Image src="/media/platform.webp" alt="" fill sizes="100vw" priority />
          <div className="shell co-immersive-content"><p className="co-eyebrow">Security & control</p><h1>Confidence comes<br />from clear boundaries</h1><div className="co-immersive-bottom"><p>Connect identity and knowledge access, govern model routes and keep an audit trail of the work your agents perform</p><a className="co-text-link" href="#deployment-brief">Explore deployment decisions<ArrowDown size={18} aria-hidden="true" /></a></div></div>
        </header>
        <section className="co-section">
          <div className="shell">
            <div className="co-section-top"><CompanyHeading eyebrow="Designed around your business" title={<>Your environment<br />Your boundaries</>} /><p>Bring knowledge, agents, permissions and logs into one deployment. Apply your access rules and choose the models each workflow is allowed to use</p></div>
            <div className="co-controls-grid">{controls.map((item, i) => <article key={item.title}><span className="co-index" aria-hidden="true">0{i + 1}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
            <p className="co-footnote">Local and external models have different data flows; processing location, retention and support access are agreed for each deployment</p>
          </div>
        </section>
        <section className="co-section co-warm" id="deployment-brief">
          <div className="shell co-security-brief">
            <div><CompanyHeading eyebrow="Before implementation" title={<>Six decisions<br />One shared brief</>} description="Bring process owners, IT and security together to define identity, data access, model use and acceptance before rollout" /><a className="co-text-link" href="/blog/plan-ai-deployment/">Read the deployment guide<ArrowUpRight size={18} aria-hidden="true" /></a></div>
            <CompanyAccordion items={deploymentDecisions} label="Deployment decisions" firstOpen />
          </div>
        </section>
        <section className="co-section" id="security">
          <div className="shell co-security-brief"><CompanyHeading eyebrow="A few practical questions" title={<>Before<br />we start</>} /><CompanyAccordion items={questions} label="Security questions" /></div>
        </section>
        <section className="co-section co-security-scope">
          <div className="shell co-editorial-split"><CompanyHeading eyebrow="Built for ongoing operation" title={<>Controls and practices<br />that work together</>} /><div className="co-prose"><p>Access policies, verification and audit logs are configured for the selected workflow. Process owners and technical teams review the evidence, agree acceptance and keep the operating practices up to date.</p><p>Document the data flows, responsibilities and support access with your team. The <a href="/privacy/">website privacy information</a> describes the public website; your deployment follows its own agreed configuration and terms.</p></div></div>
        </section>
        <RelatedPages title="Put the principles into practice" links={[
          { href: "/blog/answers-need-sources/", eyebrow: "Knowledge", title: "Answers you can inspect", description: "Keep the evidence and access rules connected to the answer" },
          { href: "/blog/human-review/", eyebrow: "Workflows", title: "A meaningful review point", description: "Give people the context they need to make a decision" },
        ]} />
        <CompanyCTA title={<>Define the boundaries<br />Then build with confidence</>} description="Discuss your infrastructure, data boundaries, model choices and acceptance criteria with the Century team" />
      </div>
    </PageFrame>
  );
}
