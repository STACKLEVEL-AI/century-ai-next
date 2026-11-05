import { ArrowUpRight } from "lucide-react";
import PageFrame from "@/components/site/PageFrame";
import { RelatedPages } from "@/components/site/Sections";
import { CompanyCTA, CompanyHeading, CompanyMasthead, CompanyPhoto, CompanyTeam } from "@/components/company/CompanyElements";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("About us", "Century connects specification, development and governance for regulated enterprises, with a platform and a method your team can own.", "/about-us");

const principles = [
  { title: "Specification", description: "Collect requests from departments and record the owner, workload, data, risks and acceptance criteria. Prioritize work by readiness and expected value" },
  { title: "Development", description: "Choose agents, RPA or corporate chat to fit the process. Build and test with your team, using approved knowledge, integrations and models" },
  { title: "Governance", description: "Review quality and business impact, manage versions and access, and agree release approvals. Feed operational findings into the next specification" },
];

export default function AboutPage() {
  return (
    <PageFrame showContact={false}>
      <div className="co-page co-about">
        <CompanyMasthead eyebrow="About Century" title={<>Innovation<br />Put into practice</>} description="Century is an innovation management system for regulated enterprises, combining a platform, an implementation method and the skills to keep improving" link={{ href: "#founders", label: "Meet the founders" }} />
        <div className="shell"><CompanyPhoto src="/images/enterprise-atrium.webp" alt="Sunlit business courtyard with people walking between buildings" caption="Connection, clarity, room to build" priority className="co-about-photo" /></div>
        <section className="co-section">
          <div className="shell co-editorial-split">
            <CompanyHeading eyebrow="Our perspective" title={<>Bring intelligence<br />closer to the work</>} />
            <div className="co-prose">
              <p className="co-lead">Useful AI starts with a business process and a team that can own it.</p>
              <p>Century connects specification, development and governance in a shared environment. Business teams submit requests; the automation team designs, builds and tests; security, compliance and management review each release.</p>
              <p>Knowledge, models, agents and operating records stay connected throughout that cycle. We help establish the first workflows and transfer requirements, testing and maintenance practices so your team can continue the work.</p>
              <a className="co-text-link" href="/ai-os/">Explore the platform<ArrowUpRight size={18} aria-hidden="true" /></a>
            </div>
          </div>
        </section>
        <section className="co-section co-warm">
          <div className="shell co-editorial-split">
            <CompanyHeading eyebrow="The way we work" title={<>One cycle<br />From request to operation</>} description="Three stages connect business intent, implementation and the evidence needed to improve" />
            <div className="co-principles">{principles.map((item, i) => <article className="co-principle" key={item.title}><span className="co-index" aria-hidden="true">0{i + 1}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div>
          </div>
        </section>
        <section className="co-section" id="founders" aria-labelledby="co-founders-title">
          <div className="shell">
            <div className="co-section-top"><div className="co-heading"><p className="co-eyebrow">The people behind the work</p><h2 id="co-founders-title">Building the next<br />chapter of Century</h2></div><p>Sales and market development, platform architecture, and agent engineering. The founders bring these disciplines into one team</p></div>
            <CompanyTeam />
          </div>
        </section>
        <section className="co-section co-join">
          <div className="shell co-join-grid">
            <CompanyPhoto src="/media/deployment.webp" alt="A business workshop around a whiteboard" />
            <div className="co-join-copy"><CompanyHeading eyebrow="Building together" title={<>Build useful workflows<br />Share what you know</>} /><p>Our work connects business analysis, platform engineering and applied AI. We value people who can understand a process, test a solution and help a customer team learn to maintain it.</p><a className="co-text-link" href="/careers/">Explore careers at Century<ArrowUpRight size={18} aria-hidden="true" /></a></div>
          </div>
        </section>
        <RelatedPages title="A closer look at Century" links={[
          { href: "/blog/", eyebrow: "Ideas", title: "A useful starting point", description: "Practical guides to knowledge, workflows and deployment" },
          { href: "/security/", eyebrow: "Our approach", title: "Security & control", description: "The decisions that shape a responsible deployment" },
          { href: "/press/", eyebrow: "Company", title: "Press & brand", description: "Company information, people and original brand materials" },
        ]} />
        <CompanyCTA />
      </div>
    </PageFrame>
  );
}
