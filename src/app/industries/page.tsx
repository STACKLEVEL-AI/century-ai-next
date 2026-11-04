import { ArrowDown, ArrowUpRight, BookOpen, Focus, UserRoundCheck } from "lucide-react";
import { IndustryIcon } from "@/components/industries/IndustryArtwork";
import IndustryPhoto, { industryVisuals } from "@/components/industries/IndustryVisual";
import PageFrame from "@/components/site/PageFrame";
import { RelatedPages } from "@/components/site/Sections";
import { industries } from "@/lib/industries";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "AI by Industry",
  "Explore practical Century AI workflows for banking, telecommunications, healthcare, utilities, insurance, retail and airlines.",
  "/industries",
);

const principles = [
  { title: "Start with a real workflow", description: "Choose a recurring task, the people who own it and the outcome that would make their work easier.", icon: Focus },
  { title: "Work from approved knowledge", description: "Identify the sources, versions and access permissions that a useful answer depends on.", icon: BookOpen },
  { title: "Design the review step", description: "Agree what the system prepares, what an employee checks and who remains responsible for the next action.", icon: UserRoundCheck },
];

export default function IndustriesPage() {
  return <PageFrame>
    <div className="sector-hub">
      <section className="sector-hub-hero">
        <div className="shell">
          <p className="sector-eyebrow"><span aria-hidden="true" />Century across industries</p>
          <h1>Different industries.<br /><span>Your context comes first.</span></h1>
          <div className="sector-hub-intro">
            <p>The best starting point is a specific problem your team understands. Explore how knowledge, document preparation and workflow support can fit the way your industry operates.</p>
            <a className="sector-text-link" href="#sectors">Find your industry<ArrowDown size={18} aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      <section className="sector-directory" id="sectors" aria-labelledby="sector-directory-title">
        <div className="shell">
          <div className="sector-directory-heading">
            <h2 id="sector-directory-title">Find your world.</h2>
            <p>Seven industries. A practical place to begin.</p>
          </div>
          <nav className="sector-index" aria-label="Find an industry">
            {industries.map(industry => <a href={`#sector-${industry.slug}`} key={industry.slug}>{industry.title}<ArrowDown size={13} aria-hidden="true" /></a>)}
          </nav>
          <div className="sector-directory-grid">
            {industries.map((industry, index) => <a className={`sector-card${industry.title.length > 14 ? " sector-card-long" : ""}`} href={`/industries/${industry.slug}/`} id={`sector-${industry.slug}`} key={industry.slug}>
              <div className="sector-card-media">
                <IndustryPhoto slug={industry.slug} />
                <div className="sector-card-top"><IndustryIcon slug={industry.slug} size={25} /><span>{String(index + 1).padStart(2, "0")}</span></div>
                <div className="sector-card-title"><h3>{industry.title}</h3><span className="sector-card-arrow" aria-hidden="true"><ArrowUpRight size={23} /></span></div>
              </div>
              <div className="sector-card-copy">
                <p className="sector-card-focus">{industryVisuals[industry.slug].focus}</p>
                <p>{industry.intro}</p>
                <span className="sector-card-cta">Explore the possibilities<ArrowUpRight size={16} aria-hidden="true" /></span>
              </div>
            </a>)}
            <div className="sector-invitation">
              <p className="sector-eyebrow"><span aria-hidden="true" />Your next chapter</p>
              <h3>A different industry.<br />A familiar challenge?</h3>
              <p>Start with the task, the sources and the people involved. We can explore the scope together.</p>
              <a className="btn btn-primary" href="/contact/">Talk to Century<ArrowUpRight size={17} aria-hidden="true" /></a>
              <span className="sector-invitation-rule" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      <section className="sector-section sector-principles" aria-labelledby="sector-principles-title">
        <div className="shell">
          <div className="sector-section-heading">
            <div><p className="sector-eyebrow"><span aria-hidden="true" />A common foundation</p><h2 id="sector-principles-title">Your industry shapes<br />the implementation.</h2></div>
            <p>The details change from team to team. The starting questions stay practical.</p>
          </div>
          <div className="sector-principle-grid">
            {principles.map(({ title, description, icon: Icon }, index) => <article className="sector-principle" key={title}>
              <div className="sector-principle-top"><Icon size={26} strokeWidth={1.4} aria-hidden="true" /><span>{String(index + 1).padStart(2, "0")}</span></div>
              <h3>{title}</h3><p>{description}</p>
            </article>)}
          </div>
        </div>
      </section>

      <RelatedPages title="From an idea to a defined next step." links={[
        { href: "/ai-transformation/", title: "AI transformation", description: "Turn a business challenge into a workflow with a clear scope and accountable owners.", eyebrow: "Find your starting point" },
        { href: "/ai-os/", title: "AI operating system", description: "Explore the building blocks for knowledge, assistants and workflows across your organization.", eyebrow: "Connect the foundations" },
        { href: "/deployment/", title: "Deployment", description: "Consider the environment, access requirements and integrations your workflow will need.", eyebrow: "Plan the implementation" },
      ]} />
    </div>
  </PageFrame>;
}
