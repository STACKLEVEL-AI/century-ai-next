import { ArrowUpRight } from "lucide-react";
import PlatformFrame from "@/components/platform/PlatformFrame";
import styles from "@/components/platform/TransformationPage.module.css";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "AI Transformation",
  "Build AI capability with Century through a shared task register, the right automation approach, measurable acceptance and skills transferred to your team",
  "/ai-transformation",
);

const principles = [
  {
    title: "Agentic: repeatable workflows",
    description: "Use agents and multistep workflows when the input, steps and expected result are clear. Add employee confirmation at decisions and actions that need review",
  },
  {
    title: "RPA: predictable operations",
    description: "Use reliable integrations and scripts to transfer or reconcile data between systems. Deterministic tasks can follow defined rules without a language model",
  },
  {
    title: "Chat: expert assistance",
    description: "Support varied expert work with corporate chat and an approved knowledge base. AI helps prepare the answer while the employee remains responsible for the decision",
  },
  {
    title: "Redesign: prepare the process",
    description: "Improve the process, rules or data before automating. Resolve unclear ownership and missing inputs so the next implementation has a usable foundation",
  },
  {
    title: "Human-only: accountable decisions",
    description: "Keep decisions that depend on personal responsibility, judgment or negotiation with people. Define the human role explicitly when assessing each automation opportunity",
  },
];

export default function TransformationPage() {
  return (
    <PlatformFrame
      headerVariant="overlay"
      contactTitle={<>Build the next chapter<br />of your organization</>}
      contactImage={{
        src: "/media/closing.webp",
        width: 1200,
        height: 495,
        position: "center",
      }}
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
              <p>Century brings models, knowledge, agents and policies into one operating environment. Our implementation method takes a workflow from discovery through requirements, testing and production.</p>
              <p>Build a shared automation register through AI interviews or questionnaires. Capture the process owner, volume and time spent, inputs, data readiness, risks and expected effect, then prioritize the work.</p>
              <p>Agree success criteria with process and knowledge owners. Use control questions and approved data to compare quality, review effort and processing time with the current baseline.</p>
              <p>Co-build with Century or involve your developers from the start. Training and documented practices for building, evaluating and operating workflows help your team take responsibility for what comes next.</p>
            </div>
          </div>
        </section>

        <section className={styles.principlesSection} id="transformation-principles" aria-labelledby="transformation-principles-title">
          <div className={`${styles.shell} ${styles.principlesGrid}`}>
            <h2 id="transformation-principles-title">Five approaches<br />to the work</h2>
            <div className={styles.principles}>
              {principles.map((principle, index) => (
                <details key={principle.title} name="century-transformation-principles" open={index === 0} className={styles.principle}>
                  <summary>
                    <span className={styles.principleNumber} aria-hidden="true">0{index + 1}</span>
                    <span className={styles.principleTitle}>{principle.title}</span>
                    <span className={styles.principleToggle} aria-hidden="true" />
                  </summary>
                  <p>{principle.description}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.relatedSection} aria-labelledby="transformation-related-title">
          <div className={styles.shell}>
            <h2 id="transformation-related-title">Connect the strategy<br />to the work</h2>
            <div className={styles.relatedCards}>
              <a className={styles.relatedCard} href="/ai-os/">
                <picture className={styles.cardImage}>
                  <source media="(max-width: 700px)" srcSet="/images/enterprise-atrium-640.webp 640w, /images/enterprise-atrium-960.webp 960w" sizes="100vw" />
                  <img src="/images/enterprise-atrium.webp" srcSet="/images/enterprise-atrium-640.webp 640w, /images/enterprise-atrium-960.webp 960w, /images/enterprise-atrium.webp 1672w" sizes="(max-width: 700px) 100vw, 60vw" alt="" width={1672} height={941} loading="lazy" />
                </picture>
                <div className={styles.cardShade} aria-hidden="true" />
                <ArrowUpRight className={styles.cardArrow} size={28} strokeWidth={1.4} aria-hidden="true" />
                <div className={styles.cardContent}>
                  <h3>AI OS</h3>
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
                  <p>Test the first workflow, select infrastructure and transfer the operating knowledge to your team</p>
                </div>
              </a>
            </div>
          </div>
        </section>
      </div>
    </PlatformFrame>
  );
}
