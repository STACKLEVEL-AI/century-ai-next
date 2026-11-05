import { ArrowUpRight } from "lucide-react";
import PlatformFrame from "@/components/platform/PlatformFrame";
import styles from "@/components/platform/TransformationPage.module.css";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "AI Transformation",
  "Make AI part of how your organization works. Connect the business need, your people and the technology through a practical path to lasting change.",
  "/ai-transformation",
);

const principles = [
  {
    title: "Choose the problem and the sequence",
    description: "Begin with a business process you can describe, an owner who can make decisions and an outcome you can evaluate. Give the first workflow a clear boundary. Use what it teaches you to decide which capability to build next.",
  },
  {
    title: "Work across the whole process",
    description: "Follow the work between people, documents and systems. Consider how an answer becomes an action, where review is needed and what happens when something falls outside the expected path. A useful result needs a useful place to go.",
  },
  {
    title: "Build capability within your team",
    description: "Bring process owners, users and technical teams into the implementation. Share the reasoning behind the choices and document the knowledge needed to operate the workflow. The organization should understand what it is adopting.",
  },
  {
    title: "Keep your options and your control",
    description: "Make access, data boundaries and external dependencies explicit. Choose models and deployment arrangements around the work they need to support. Keep the design understandable so that the team can revisit those choices as its requirements change.",
  },
  {
    title: "Measure the work that gets done",
    description: "Compare the workflow with a practical baseline: the time it takes, the usefulness of its results, the corrections it needs and the effort of review. Let that evidence guide the decision to improve, expand or stop.",
  },
];

export default function TransformationPage() {
  return (
    <PlatformFrame
      headerVariant="overlay"
      contactTitle={<>Build the next chapter<br />of your organization.</>}
      contactImage={{
        src: "/media/platform/ai-transformation/contact.webp",
        width: 1920,
        height: 1076,
        position: "center",
      }}
    >
      <div className={styles.page}>
        <section className={styles.hero} aria-labelledby="transformation-title">
          <picture className={styles.heroImage}>
            <source media="(max-width: 700px)" srcSet="/media/platform/ai-transformation/hero-mobile.webp" />
            <img
              src="/media/platform/ai-transformation/hero.webp"
              srcSet="/media/platform/ai-transformation/hero-1280.webp 1280w, /media/platform/ai-transformation/hero.webp 2000w"
              sizes="100vw"
              alt=""
              width={2000}
              height={1121}
              fetchPriority="high"
            />
          </picture>
          <div className={styles.heroShade} aria-hidden="true" />
          <div className={styles.heroContent}>
            <h1 id="transformation-title">AI changes your technology.<br /> And the way your organization works.</h1>
          </div>
        </section>

        <section className={styles.editorialSection} aria-labelledby="transformation-approach-title">
          <div className={`${styles.shell} ${styles.editorialGrid}`}>
            <h2 id="transformation-approach-title">An organization ready<br />for what comes next.</h2>
            <div className={styles.editorialCopy}>
              <p>AI can help people find knowledge, prepare decisions and move work between systems. Making that assistance useful means understanding the organization around it.</p>
              <p>Start with the work itself. Look at the information people need, the steps they repeat and the handovers that slow a process down. Decide where assistance belongs and where a person needs to remain responsible.</p>
              <p>The first workflow is an opportunity to build shared understanding. It reveals what the data can support, which integrations matter and what the team needs to operate with confidence.</p>
              <p>Century connects those practical decisions to a wider direction: a sequence of useful changes, with clear ownership and evidence for the next investment.</p>
            </div>
          </div>
        </section>

        <section className={styles.principlesSection} id="transformation-principles" aria-labelledby="transformation-principles-title">
          <div className={`${styles.shell} ${styles.principlesGrid}`}>
            <h2 id="transformation-principles-title">Five principles for<br />lasting change.</h2>
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
            <h2 id="transformation-related-title">Connect the strategy<br />to the work.</h2>
            <div className={styles.relatedCards}>
              <a className={styles.relatedCard} href="/ai-os/">
                <picture className={styles.cardImage}>
                  <source media="(max-width: 700px)" srcSet="/media/platform/ai-transformation/ai-os-mobile.webp" />
                  <img src="/media/platform/ai-transformation/ai-os.webp" alt="" width={1400} height={785} loading="lazy" />
                </picture>
                <div className={styles.cardShade} aria-hidden="true" />
                <ArrowUpRight className={styles.cardArrow} size={28} strokeWidth={1.4} aria-hidden="true" />
                <div className={styles.cardContent}>
                  <h3>AI OS</h3>
                  <p>Bring knowledge, workflows and oversight together in the foundation for everyday AI.</p>
                </div>
              </a>
              <a className={styles.relatedCard} href="/deployment/">
                <picture className={styles.cardImage}>
                  <source media="(max-width: 700px)" srcSet="/media/platform/ai-transformation/deployment-mobile.webp" />
                  <img src="/media/platform/ai-transformation/deployment.webp" alt="" width={1400} height={781} loading="lazy" />
                </picture>
                <div className={styles.cardShade} aria-hidden="true" />
                <ArrowUpRight className={styles.cardArrow} size={28} strokeWidth={1.4} aria-hidden="true" />
                <div className={styles.cardContent}>
                  <h3>Deployment</h3>
                  <p>Move from a focused use case to a working implementation and ownership within your team.</p>
                </div>
              </a>
            </div>
          </div>
        </section>
      </div>
    </PlatformFrame>
  );
}
