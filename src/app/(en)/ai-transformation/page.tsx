import { ArrowUpRight } from "lucide-react";
import PlatformFrame from "@/components/platform/PlatformFrame";
import styles from "@/components/platform/TransformationPage.module.css";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "AI Transformation",
  "Build AI capability with Century: assess automation opportunities, choose the right approach, agree value and evidence, and connect your team's work from specification to governance",
  "/ai-transformation",
);

const approaches = [
  {
    title: "Agentic",
    description: "Repeatable workflows with clear inputs and outcomes, with human confirmation where needed.",
  },
  {
    title: "RPA",
    description: "Defined transfers and reconciliation handled by reliable integrations or scripts.",
  },
  {
    title: "Chat",
    description: "Knowledge support for varied expert work, with the employee responsible for the decision.",
  },
  {
    title: "Redesign",
    description: "Improve the process, rules or data before introducing automation.",
  },
  {
    title: "Human-only",
    description: "Keep judgment, negotiation and personally accountable decisions with people.",
  },
];

const principles = [
  {
    title: "Create one shared register",
    description: [
      "Bring requests into one register through AI interviews or questionnaires. Capture the process owner, current work, data, expected effect and open questions.",
      "Century assesses requests across 27 blocks in seven categories. AI-assisted intake and analyst review clarify readiness and risks, helping prioritize work by value, complexity and data readiness.",
      "Track requests as Draft, Clarification or Ready to implement.",
    ],
  },
  {
    title: "Choose the right approach",
    description: [
      "Assessment identifies the appropriate approach and any work needed before implementation can begin.",
    ],
    approaches,
  },
  {
    title: "Agree value and evidence",
    description: [
      "Before committing effort, agree the baseline, expected benefit and quality criteria with the process owner. Consider both implementation and operating costs, including the effort to review and maintain the result.",
      "Use an agreed control set to compare the workflow with the current way of working. After launch, review actual quality, processing time and running costs before deciding what to expand.",
    ],
  },
  {
    title: "Build capability inside your team",
    description: [
      "Develop a repeatable practice for specifying, building, testing and operating automation. Your team learns through practical work, co-building and mentoring.",
      "Take forward requirements and design templates, control sets, acceptance practices and operating rules. These give your team a foundation for maintaining current workflows and developing the next ones.",
    ],
  },
  {
    title: "Connect specification to governance",
    description: [
      "Keep specification, development and governance in one working cycle. Business owners and analysts define requirements; developers build and test; responsible teams review and approve releases, then oversee quality, access and changes.",
      "Compare actual effect with the expected result. Bring findings from operation back into specifications, refine estimates and reprioritize the next tasks.",
    ],
  },
];

export default function TransformationPage() {
  return (
    <PlatformFrame
      headerVariant="overlay"
      contactTitle={<>Build the next chapter<br />of your organization</>}
    >
      <div className={styles.page}>
        <section className={styles.hero} aria-labelledby="transformation-title">
          <picture className={styles.heroImage}>
            <img
              src="/media/strategy.webp"
              alt=""
              width={1054}
              height={1451}
              fetchPriority="high"
            />
          </picture>
          <div className={styles.heroShade} aria-hidden="true" />
          <div className={styles.heroContent}>
            <h1 id="transformation-title">Build AI capability<br /> inside your organization</h1>
          </div>
        </section>

        <section className={styles.editorialSection} aria-labelledby="transformation-approach-title">
          <div className={`${styles.shell} ${styles.editorialGrid}`}>
            <h2 id="transformation-approach-title">A platform and a process<br />for lasting change</h2>
            <div className={styles.editorialCopy}>
              <p>Century connects a shared AI platform, a practical working method and a trained internal team. Together, they give your organization a consistent way to choose, build and operate automation.</p>
              <p>Bring opportunities from across the business into one register. Agree who owns each process, what should improve and what needs to be ready before work begins.</p>
              <p>Once a task is agreed, deployment takes it into the approved environment. The broader method keeps priorities, ownership and learning connected as more workflows follow.</p>
            </div>
          </div>
        </section>

        <section className={styles.principlesSection} id="transformation-principles" aria-labelledby="transformation-principles-title">
          <div className={`${styles.shell} ${styles.principlesGrid}`}>
            <h2 id="transformation-principles-title">Five decisions<br />that shape the work</h2>
            <div className={styles.principles}>
              {principles.map((principle, index) => (
                <details key={principle.title} name="century-transformation-principles" open={index === 0} className={styles.principle}>
                  <summary>
                    <span className={styles.principleNumber} aria-hidden="true">0{index + 1}</span>
                    <span className={styles.principleTitle}>{principle.title}</span>
                    <span className={styles.principleToggle} aria-hidden="true" />
                  </summary>
                  <div className={styles.principleBody}>
                    {principle.description.map(description => <p key={description}>{description}</p>)}
                    {principle.approaches && (
                      <ul className={styles.approachList}>
                        {principle.approaches.map(approach => (
                          <li key={approach.title}><strong>{approach.title}</strong> {approach.description}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.relatedSection} aria-labelledby="transformation-related-title">
          <div className={styles.shell}>
            <h2 id="transformation-related-title">Connect the strategy<br />to the work</h2>
            <div className={styles.relatedCards}>
              <a className={styles.relatedCard} href="/platform/">
                <picture className={styles.cardImage}>
                  <source media="(max-width: 700px)" srcSet="/images/enterprise-atrium-640.webp 640w, /images/enterprise-atrium-960.webp 960w" sizes="100vw" />
                  <img src="/images/enterprise-atrium.webp" srcSet="/images/enterprise-atrium-640.webp 640w, /images/enterprise-atrium-960.webp 960w, /images/enterprise-atrium.webp 1672w" sizes="(max-width: 700px) 100vw, 60vw" alt="" width={1672} height={941} loading="lazy" />
                </picture>
                <div className={styles.cardShade} aria-hidden="true" />
                <ArrowUpRight className={styles.cardArrow} size={28} strokeWidth={1.4} aria-hidden="true" />
                <div className={styles.cardContent}>
                  <h3>AI Platform</h3>
                  <p>Models, knowledge, agents and controls in one environment for building and running AI workflows</p>
                </div>
              </a>
              <a className={styles.relatedCard} href="/deployment/">
                <picture className={styles.cardImage}>
                  <source media="(max-width: 700px)" srcSet="/media/century/photos/team-workshop-768.webp" />
                  <img src="/media/century/photos/team-workshop.webp" srcSet="/media/century/photos/team-workshop-768.webp 768w, /media/century/photos/team-workshop.webp 1600w" sizes="(max-width: 700px) 100vw, 60vw" alt="" width={1600} height={900} loading="lazy" />
                </picture>
                <div className={styles.cardShade} aria-hidden="true" />
                <ArrowUpRight className={styles.cardArrow} size={28} strokeWidth={1.4} aria-hidden="true" />
                <div className={styles.cardContent}>
                  <h3>Deployment</h3>
                  <p>Bring an agreed workflow into your environment, validate the result and equip your team to operate it</p>
                </div>
              </a>
            </div>
          </div>
        </section>
      </div>
    </PlatformFrame>
  );
}
