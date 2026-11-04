import { ArrowUpRight, BookOpen, Focus, UserRoundCheck } from "lucide-react";
import { IndustryIcon } from "@/components/industries/IndustryArtwork";
import PageFrame from "@/components/site/PageFrame";
import PageHero from "@/components/site/PageHero";
import { FeatureGrid, RelatedPages, SectionHeading } from "@/components/site/Sections";
import { industries } from "@/lib/industries";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "AI by Industry",
  "Explore practical Century AI workflows for banking, telecommunications, healthcare, utilities, insurance, retail and airlines.",
  "/industries",
);

const principles = [
  { title: "Start with a real workflow", description: "Choose a recurring task, the people who own it and the outcome that would make their work easier.", icon: <Focus size={25} /> },
  { title: "Work from approved knowledge", description: "Identify the sources, versions and access permissions that a useful answer depends on.", icon: <BookOpen size={25} /> },
  { title: "Design the review step", description: "Agree what the system prepares, what an employee checks and who remains responsible for the next action.", icon: <UserRoundCheck size={25} /> },
];

export default function IndustriesPage() {
  return <PageFrame>
    <div className="industry-index">
      <PageHero
        eyebrow="Century across industries"
        title={<>Different industries.<br /><span>Your context comes first.</span></>}
        description="The best starting point is a specific problem your team understands. Explore how knowledge, document preparation and workflow support can fit the way your industry operates."
        secondary={{ href: "#sectors", label: "Find your industry" }}
      />

      <section className="section industry-directory" id="sectors">
        <div className="shell">
          <SectionHeading eyebrow="Explore the possibilities" title="Seven industries. Practical places to begin." description="Each industry guide outlines concrete workflows, information requirements and review points to discuss with your team." />
          <div className="industry-directory-grid">
            {industries.map((industry, index) => <a className="industry-directory-card" href={`/industries/${industry.slug}/`} key={industry.slug}>
              <div className="industry-directory-card-top"><span className="industry-directory-icon"><IndustryIcon slug={industry.slug} size={30} /></span><span className="industry-directory-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span></div>
              <div className="industry-directory-card-title"><h3>{industry.title}</h3><ArrowUpRight size={23} aria-hidden="true" /></div>
              <p>{industry.description.replace(/^Explore Century (?:workflows )?for /, "Workflows for ").replace(/^Explore Century for /, "Workflows for ")}</p>
              <span className="industry-directory-card-link">Explore workflows <span aria-hidden="true">→</span></span>
            </a>)}
            <div className="industry-directory-note">
              <span className="eyebrow">Your starting point</span>
              <h3>Have a different workflow in mind?</h3>
              <p>Start with the task, the sources and the people involved. We can explore the scope together.</p>
              <a href="/contact/">Talk to Century <ArrowUpRight size={18} aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="section industry-principles">
        <div className="shell">
          <SectionHeading eyebrow="A common foundation" title="Your industry shapes the implementation." description="The details change from team to team. The starting questions stay practical." />
          <FeatureGrid items={principles} columns={3} />
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
