import { ArrowUpRight } from "lucide-react";
import PageFrame from "@/components/site/PageFrame";
import { RelatedPages } from "@/components/site/Sections";
import { CompanyCTA, CompanyHeading, CompanyMasthead, CompanyPhoto, CompanyTeam } from "@/components/company/CompanyElements";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("About us", "Meet Century: enterprise AI shaped around your knowledge, workflows and people. Explore our approach and the founders behind it.", "/about-us");

const principles = [
  { title: "Start with the work.", description: "Understand the people, decisions and handoffs behind a process. Give the first project a clear purpose and an outcome that the team can evaluate." },
  { title: "Keep the context.", description: "Connect answers to approved knowledge. Make the sources, constraints and exceptions visible to the people relying on the result." },
  { title: "Make control practical.", description: "Define access, review and ownership as part of the workflow. Give people the information they need to make a responsible decision." },
];

export default function AboutPage() {
  return (
    <PageFrame showContact={false}>
      <div className="co-page co-about">
        <CompanyMasthead eyebrow="About Century" title={<>Good technology.<br />A human purpose.</>} description="We believe AI should help people do useful work—with the knowledge, context and control their business needs." link={{ href: "#founders", label: "Meet the founders" }} />
        <div className="shell"><CompanyPhoto src="/images/enterprise-atrium.webp" alt="Illustrative sunlit business courtyard with people walking between buildings" caption="Connection. Clarity. Room to build." priority className="co-about-photo" /></div>
        <section className="co-section">
          <div className="shell co-editorial-split">
            <CompanyHeading eyebrow="Our perspective" title={<>Bring intelligence<br />closer to the work.</>} />
            <div className="co-prose">
              <p className="co-lead">Businesses hold valuable knowledge in documents, systems and the experience of their teams.</p>
              <p>Turning that knowledge into a useful answer or a completed task takes context. It takes clear responsibilities. And it takes technology that fits the environment around it.</p>
              <p>Century brings these pieces together. We work from a concrete business process towards an AI solution that people can understand, evaluate and use. The starting point is a real question about your work.</p>
              <a className="co-text-link" href="/ai-os/">Explore the platform<ArrowUpRight size={18} aria-hidden="true" /></a>
            </div>
          </div>
        </section>
        <section className="co-section co-warm">
          <div className="shell co-editorial-split">
            <CompanyHeading eyebrow="The way we work" title={<>A clear purpose.<br />At every step.</>} description="Three principles that keep the technology connected to the people using it." />
            <div className="co-principles">{principles.map((item, i) => <article className="co-principle" key={item.title}><span className="co-index" aria-hidden="true">0{i + 1}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div>
          </div>
        </section>
        <section className="co-section" id="founders" aria-labelledby="co-founders-title">
          <div className="shell">
            <div className="co-section-top"><div className="co-heading"><p className="co-eyebrow">The people behind the work</p><h2 id="co-founders-title">Building the next<br />chapter of Century.</h2></div><p>Business knowledge, engineering and applied AI. Different perspectives, working towards a useful result.</p></div>
            <CompanyTeam />
          </div>
        </section>
        <section className="co-section co-join">
          <div className="shell co-join-grid">
            <CompanyPhoto src="/media/deployment.webp" alt="Illustrative scene of a business workshop around a whiteboard" />
            <div className="co-join-copy"><CompanyHeading eyebrow="Building together" title={<>From a first conversation<br />to work people use.</>} /><p>A useful AI project brings business knowledge and engineering into the same conversation. That is how we approach the work, and how we think about the team behind it.</p><a className="co-text-link" href="/careers/">Explore working with Century<ArrowUpRight size={18} aria-hidden="true" /></a></div>
          </div>
        </section>
        <RelatedPages title="A closer look at Century." links={[
          { href: "/blog/", eyebrow: "Ideas", title: "A useful starting point", description: "Practical guides to knowledge, workflows and deployment." },
          { href: "/security/", eyebrow: "Our approach", title: "Security & control", description: "The decisions that shape a responsible deployment." },
          { href: "/press/", eyebrow: "Company", title: "Press & brand", description: "Company information, people and original brand materials." },
        ]} />
        <CompanyCTA />
      </div>
    </PageFrame>
  );
}
