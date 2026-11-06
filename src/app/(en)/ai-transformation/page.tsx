import { ArrowUpRight } from "lucide-react";
import PlatformFrame from "@/components/platform/PlatformFrame";
import styles from "@/components/platform/TransformationPage.module.css";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "AI Transformation",
  "Find the work worth changing with Century. Assess processes, choose the right approach, measure value and build the internal skills to keep improving",
  "/ai-transformation",
);

const approaches = [
  { title: "Agentic", description: "Repeatable work with clear inputs and outcomes, with human confirmation where needed." },
  { title: "RPA", description: "Move or reconcile data through defined rules, integrations and scripts." },
  { title: "Chat", description: "Help an expert find and prepare an answer. The employee remains responsible for the decision." },
  { title: "Redesign", description: "Improve the process, rules or data before introducing automation." },
  { title: "Human-only", description: "Keep judgment, negotiation and personally accountable decisions with people." },
];

const principles = [
  {
    title: "Build one view of the work",
    summary: "A shared register, clear owners and a next action",
    description: [
      "Capture requests through AI interviews or questionnaires, supported by documents and examples. Record the owner, current effort, data and expected result. Century assesses readiness across 27 blocks in seven categories, with analyst review to resolve missing information.",
      "Prioritize by value, complexity and data readiness. Track each request as Draft, Clarification or Ready to implement.",
    ],
  },
  {
    title: "Choose the right kind of change",
    summary: "Agentic · RPA · Chat · Redesign · Human-only",
    description: ["The assessment can lead to five approaches. Match the intervention to the work and the responsibility it carries."],
    approaches,
  },
  {
    title: "Make the value measurable",
    summary: "Expected benefit, quality and the full cost to run",
    description: [
      "Compare current effort with the expected benefit, including what the workflow will cost to build and run. Agree quality criteria with the process owner before committing to implementation.",
      "Measure what matters for the task: correctly extracted fields, drafts accepted with minimal changes or processing time against the manual baseline.",
    ],
  },
  {
    title: "Build capability inside your team",
    summary: "Specification, development and governance, connected",
    description: [
      "Business owners and analysts define the requirements. Developers build and test. Responsible teams approve releases and oversee quality, access and changes.",
      "Through practical work and mentoring, your team takes forward the templates, tests and operating rules it will use to maintain current workflows and build the next ones.",
    ],
  },
  {
    title: "Let results shape the next step",
    summary: "Actual impact feeds the next decision",
    description: [
      "After launch, compare the actual effect with the original estimate. Review quality, processing time, operating effort and running costs.",
      "Bring the findings back into the specification, refine estimates and reprioritize the next work. The register becomes a continuing plan shaped by what your organization learns.",
    ],
  },
];

export default function TransformationPage() {
  return (
    <PlatformFrame headerVariant="overlay" contactTitle={<>Choose your starting point</>}>
      <div className={styles.page}>
        <section className={styles.hero} aria-labelledby="transformation-title">
          <picture className={styles.heroImage}>
            <img
              src="/media/century/photos/transformation-hero.webp"
              srcSet="/media/century/photos/transformation-hero-960.webp 960w, /media/century/photos/transformation-hero.webp 1672w"
              sizes="100vw"
              alt=""
              width={1672}
              height={941}
              fetchPriority="high"
            />
          </picture>
          <div className={styles.heroShade} aria-hidden="true" />
          <div className={styles.heroContent}>
            <h1 id="transformation-title">Make AI part of<br /> how you work</h1>
          </div>
        </section>

        <section className={styles.editorialSection} aria-labelledby="transformation-approach-title">
          <div className={`${styles.shell} ${styles.editorialGrid}`}>
            <h2 id="transformation-approach-title">Find the work<br /> worth changing</h2>
            <div className={styles.editorialCopy}>
              <p>Start with the work your teams already do: answering questions, checking documents and moving information between systems. Century brings those requests into one register, with a process owner, the current effort, required data and an expected result.</p>
              <p>See which tasks are ready to build, which need better data or integrations, and which call for a different approach. Your team gets a prioritized plan and a consistent way to carry the work through specification, development and governance.</p>
            </div>
          </div>
        </section>

        <section className={styles.principlesSection} id="transformation-principles" aria-labelledby="transformation-principles-title">
          <div className={styles.shell}>
            <div className={styles.principlesHeading}>
              <h2 id="transformation-principles-title">AI transformation principles</h2>
              <p>A clear decision at every step</p>
            </div>
            <div className={styles.principles}>
              {principles.map((principle, index) => (
                <details key={principle.title} name="century-transformation-principles" open={index === 0} className={styles.principle}>
                  <summary>
                    <span className={styles.principleNumber} aria-hidden="true">0{index + 1}</span>
                    <span className={styles.principleHeading}>
                      <span className={styles.principleTitle}>{principle.title}</span>
                      <span className={styles.principleSummary}>{principle.summary}</span>
                    </span>
                    <span className={styles.principleToggle} aria-hidden="true" />
                  </summary>
                  <div className={styles.principleBody}>
                    {principle.description.map(description => <p key={description}>{description}</p>)}
                    {principle.approaches && (
                      <dl className={styles.approachList}>
                        {principle.approaches.map(approach => (
                          <div key={approach.title}><dt>{approach.title}</dt><dd>{approach.description}</dd></div>
                        ))}
                      </dl>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.relatedSection} aria-labelledby="transformation-related-title">
          <div className={styles.shell}>
            <h2 id="transformation-related-title">Put the plan into practice</h2>
            <div className={styles.relatedCards}>
              <a className={styles.relatedCard} href="/platform/">
                <picture className={styles.cardImage}>
                  <img src="/images/enterprise-atrium.webp" srcSet="/images/enterprise-atrium-640.webp 640w, /images/enterprise-atrium-960.webp 960w, /images/enterprise-atrium.webp 1672w" sizes="(max-width: 700px) 100vw, 60vw" alt="" width={1672} height={941} loading="lazy" />
                </picture>
                <div className={styles.cardShade} aria-hidden="true" />
                <ArrowUpRight className={styles.cardArrow} size={28} strokeWidth={1.4} aria-hidden="true" />
                <div className={styles.cardContent}>
                  <h3>AI Platform</h3>
                  <p>The shared environment for company knowledge, agents, workflows and controls</p>
                </div>
              </a>
              <a className={styles.relatedCard} href="/deployment/">
                <picture className={styles.cardImage}>
                  <img src="/media/century/photos/team-workshop.webp" srcSet="/media/century/photos/team-workshop-768.webp 768w, /media/century/photos/team-workshop.webp 1600w" sizes="(max-width: 700px) 100vw, 60vw" alt="" width={1600} height={900} loading="lazy" />
                </picture>
                <div className={styles.cardShade} aria-hidden="true" />
                <ArrowUpRight className={styles.cardArrow} size={28} strokeWidth={1.4} aria-hidden="true" />
                <div className={styles.cardContent}>
                  <h3>Deployment</h3>
                  <p>Build the first workflows with your team, test the result and prepare them for everyday use</p>
                </div>
              </a>
            </div>
          </div>
        </section>
      </div>
    </PlatformFrame>
  );
}
