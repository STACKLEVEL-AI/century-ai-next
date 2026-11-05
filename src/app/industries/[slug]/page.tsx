import { ArrowDown, ArrowRight, ArrowUpRight, BookOpen, FileCheck2, Plus, ShieldCheck, UserRoundCheck } from "lucide-react";
import { notFound } from "next/navigation";
import AppScreenshot from "@/components/AppScreenshot";
import IndustryPhoto, { industryVisuals } from "@/components/industries/IndustryVisual";
import InsurancePage from "@/components/industries/InsurancePage";
import PageFrame from "@/components/site/PageFrame";
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

  if (industry.slug === "insurance") return <InsurancePage />;

  const visual = industryVisuals[industry.slug];
  const controlIcons = [ShieldCheck, UserRoundCheck, BookOpen];
  const related = industry.relatedSlugs.flatMap(relatedSlug => {
    const sector = getIndustry(relatedSlug);
    return sector ? [sector] : [];
  });

  return <PageFrame headerVariant="overlay">
    <div className={`sector-story sector-story-${industry.slug}`}>
      <section className={`sector-hero${industry.title.length > 14 ? " sector-hero-long" : ""}`}>
        <IndustryPhoto slug={industry.slug} className="sector-hero-photo" priority decorative />
        <div className="shell sector-hero-content">
          <nav className="sector-breadcrumb" aria-label="Breadcrumb"><a href="/industries/">Industries</a><span aria-hidden="true">/</span><span aria-current="page">{industry.title}</span></nav>
          <h1>{industry.title}</h1>
          <div className="sector-hero-bottom">
            <p>{industry.headline.join(" ")}</p>
            <a className="btn btn-light" href="#workflows">Explore workflows<ArrowDown size={17} aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      <nav className="sector-page-nav" aria-label="On this page">
        <div className="shell"><span>{industry.eyebrow}</span><div><a href="#opportunity">The opportunity</a><a href="#workflows">Workflows</a><a href="#approach">Our approach</a><a href="#controls">Controls</a></div></div>
      </nav>

      <section className="sector-section sector-opportunity" id="opportunity" aria-labelledby="sector-opportunity-title">
        <div className="shell">
          <div className="sector-section-heading">
            <div><p className="sector-eyebrow"><span aria-hidden="true" />The opportunity</p><h2 id="sector-opportunity-title">{industry.goalsTitle}</h2></div>
            <p className="sector-intro-description">{industry.intro}</p>
          </div>
          <div className="sector-goal-grid">
            {industry.goals.map((goal, index) => <article className="sector-goal" key={goal.title}>
              <span className="sector-goal-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{goal.title}</h3><p>{goal.description}</p>
            </article>)}
          </div>
        </div>
      </section>

      <section className="sector-section sector-workflows" id="workflows" aria-labelledby="sector-workflows-title">
        <div className="shell sector-workflow-layout">
          <div className="sector-workflow-intro">
            <p className="sector-eyebrow"><span aria-hidden="true" />Where to begin</p>
            <h2 id="sector-workflows-title">Real work.<br />A defined scope.</h2>
            <p>Four starting points for {industry.title.toLowerCase()} teams. Each connects the right information, a responsible reviewer and a useful outcome.</p>
            <a className="sector-text-link" href="/ai-transformation/">How we scope a workflow<ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
          <div className="sector-workflow-list">
            {industry.workflows.map((workflow, index) => <details className="sector-workflow" key={workflow.title} name="sector-workflows" open={index === 0}>
              <summary><span className="sector-workflow-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3>{workflow.title}</h3><Plus className="sector-workflow-toggle" size={22} strokeWidth={1.3} aria-hidden="true" /></summary>
              <div className="sector-workflow-body">
                <p>{workflow.summary}</p>
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

      <section className="sector-section sector-evidence" aria-labelledby="sector-evidence-title">
        <div className="shell sector-evidence-layout">
          <div className="sector-evidence-copy">
            <p className="sector-eyebrow"><span aria-hidden="true" />Inside Century</p>
            <h2 id="sector-evidence-title">The workspace<br />behind the workflow.</h2>
            <p>Bring the information and tools for a defined task into a shared workspace. These are real views from the Century application.</p>
            <a className="sector-text-link" href="/ai-os/">Explore the platform<ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
          <div className="sector-evidence-visual"><AppScreenshot capture={visual.capture} /></div>
        </div>
      </section>

      <section className="sector-section sector-process" id="approach" aria-labelledby="sector-process-title">
        <div className="shell">
          <div className="sector-section-heading">
            <div><p className="sector-eyebrow"><span aria-hidden="true" />A workflow in practice</p><h2 id="sector-process-title">{industry.processTitle}</h2></div>
            <p>{industry.processContext}</p>
          </div>
          <ol className="sector-process-steps">
            {industry.process.map((step, index) => <li key={step.title}>
              <div className="sector-process-step-top"><span>{String(index + 1).padStart(2, "0")}</span>{index < industry.process.length - 1 && <ArrowRight size={21} strokeWidth={1.4} aria-hidden="true" />}</div>
              <h3>{step.title}</h3><p>{step.description}</p>
            </li>)}
          </ol>
          <div className="sector-process-end"><span aria-hidden="true" /><p>Defined sources. Visible review. An accountable next step.</p></div>
        </div>
      </section>

      <section className="sector-section sector-controls" id="controls" aria-labelledby="sector-controls-title">
        <div className="shell">
          <div className="sector-section-heading">
            <div><p className="sector-eyebrow"><span aria-hidden="true" />Built around your requirements</p><h2 id="sector-controls-title">The boundaries are<br />part of the design.</h2></div>
            <div className="sector-controls-intro"><p>{industry.controlIntro}</p><a className="sector-text-link" href="/deployment/">Explore deployment<ArrowUpRight size={17} aria-hidden="true" /></a></div>
          </div>
          <div className="sector-control-grid">
            {industry.controls.map((control, index) => {
              const Icon = controlIcons[index % controlIcons.length];
              return <article className="sector-control" key={control.title}><Icon size={29} strokeWidth={1.3} aria-hidden="true" /><h3>{control.title}</h3><p>{control.description}</p></article>;
            })}
          </div>
        </div>
      </section>

      <section className="sector-section sector-related" aria-labelledby="sector-related-title">
        <div className="shell">
          <div className="sector-related-heading"><div><p className="sector-eyebrow"><span aria-hidden="true" />Keep exploring</p><h2 id="sector-related-title">Different industries.<br />Shared possibilities.</h2></div><a className="sector-text-link" href="/industries/">All industries<ArrowUpRight size={17} aria-hidden="true" /></a></div>
          <div className="sector-related-grid">
            {related.map(sector => <a className={`sector-related-card${sector.title.length > 14 ? " sector-related-card-long" : ""}`} href={`/industries/${sector.slug}/`} key={sector.slug}>
              <IndustryPhoto slug={sector.slug} decorative />
              <div><span className="sector-eyebrow">Explore an industry</span><h3>{sector.title}</h3><ArrowUpRight size={24} strokeWidth={1.4} aria-hidden="true" /></div>
            </a>)}
          </div>
        </div>
      </section>
    </div>
  </PageFrame>;
}
