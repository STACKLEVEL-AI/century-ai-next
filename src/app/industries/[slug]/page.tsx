import { ArrowRight, BookOpen, FileCheck2, ShieldCheck, UserRoundCheck } from "lucide-react";
import { notFound } from "next/navigation";
import IndustryArtwork from "@/components/industries/IndustryArtwork";
import PageFrame from "@/components/site/PageFrame";
import PageHero from "@/components/site/PageHero";
import { FeatureGrid, RelatedPages, SectionHeading } from "@/components/site/Sections";
import { getIndustry, industries } from "@/lib/industries";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map(({ slug }) => ({ slug }));
}

type IndustryPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();
  return pageMetadata(`AI for ${industry.title}`, industry.description, `/industries/${industry.slug}`);
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const controlIcons = [<ShieldCheck size={25} key="access" />, <UserRoundCheck size={25} key="review" />, <BookOpen size={25} key="source" />];
  const related = industry.relatedSlugs.flatMap((relatedSlug) => {
    const sector = getIndustry(relatedSlug);
    return sector ? [{ href: `/industries/${sector.slug}/`, title: sector.title, description: sector.description, eyebrow: "Explore an industry" }] : [];
  });

  return <PageFrame>
    <div className={`industry-page industry-page-${industry.slug}`}>
      <PageHero
        eyebrow={industry.eyebrow}
        title={<>{industry.headline[0]}<br /><span>{industry.headline[1]}</span></>}
        description={industry.intro}
        secondary={{ href: "#workflows", label: "Explore workflows" }}
      ><IndustryArtwork industry={industry} /></PageHero>

      <div className="shell industry-breadcrumbs">
        <nav aria-label="Breadcrumb"><a href="/industries/">Industries</a><span aria-hidden="true">/</span><span aria-current="page">{industry.title}</span></nav>
        <span className="industry-breadcrumb-note">A practical starting point for your team</span>
      </div>

      <section className="section industry-goals">
        <div className="shell">
          <SectionHeading eyebrow="The opportunity" title={industry.goalsTitle} />
          <FeatureGrid items={industry.goals} columns={3} />
        </div>
      </section>

      <section className="section industry-workflows" id="workflows">
        <div className="shell industry-workflow-layout">
          <div className="industry-workflow-intro">
            <SectionHeading eyebrow="Where to begin" title="Real work. A defined scope." description={`Explore four starting points for ${industry.title.toLowerCase()} teams. Each brings together the information to use, the person who reviews it and the output they need.`} />
            <a className="industry-text-link" href="/ai-transformation/">How we scope a workflow <ArrowRight size={17} aria-hidden="true" /></a>
          </div>
          <div className="industry-workflow-list">
            {industry.workflows.map((workflow, index) => <details className="industry-workflow" key={workflow.title} open={index === 0}>
              <summary>
                <span className="industry-workflow-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3>{workflow.title}</h3>
                <span className="industry-workflow-toggle" aria-hidden="true">+</span>
              </summary>
              <div className="industry-workflow-body">
                <p className="industry-workflow-summary">{workflow.summary}</p>
                <dl>
                  <div><dt><BookOpen size={16} aria-hidden="true" />Information in</dt><dd>{workflow.inputs}</dd></div>
                  <div><dt><UserRoundCheck size={16} aria-hidden="true" />Human review</dt><dd>{workflow.review}</dd></div>
                  <div><dt><FileCheck2 size={16} aria-hidden="true" />Prepared outcome</dt><dd>{workflow.outcome}</dd></div>
                </dl>
              </div>
            </details>)}
          </div>
        </div>
      </section>

      <section className="section industry-process">
        <div className="shell">
          <div className="industry-process-heading">
            <SectionHeading eyebrow="A workflow in practice" title={industry.processTitle} />
            <p className="industry-process-context">{industry.processContext}</p>
          </div>
          <ol className="industry-process-steps">
            {industry.process.map((step, index) => <li key={step.title}>
              <div className="industry-process-step-top"><span>{String(index + 1).padStart(2, "0")}</span>{index < industry.process.length - 1 && <ArrowRight size={19} aria-hidden="true" />}</div>
              <h3>{step.title}</h3><p>{step.description}</p>
            </li>)}
          </ol>
          <div className="industry-process-footer"><span className="industry-process-dot" aria-hidden="true" /><p>Defined sources. Visible review. An accountable next step.</p></div>
        </div>
      </section>

      <section className="section industry-controls">
        <div className="shell">
          <div className="industry-controls-heading">
            <SectionHeading eyebrow="Built around your requirements" title="The boundaries are part of the design." description={industry.controlIntro} />
            <a className="industry-text-link" href="/deployment/">Explore deployment <ArrowRight size={17} aria-hidden="true" /></a>
          </div>
          <FeatureGrid items={industry.controls.map((control, index) => ({ ...control, icon: controlIcons[index] }))} columns={3} />
        </div>
      </section>

      <RelatedPages links={related} title="Different industries. Shared possibilities." />
    </div>
  </PageFrame>;
}
