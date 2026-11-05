import { ArrowUpRight, Cloud, Database, Network, Server } from "lucide-react";
import PlatformFrame from "@/components/platform/PlatformFrame";
import DeploymentJourney from "@/components/platform/DeploymentJourney";
import styles from "@/components/platform/DeploymentPage.module.css";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Deployment",
  "Deploy Century around your workflows and infrastructure, with agreed success criteria, model evaluation and a practical handover to your team",
  "/deployment",
);

const environments = [
  { title: "Rented infrastructure", description: "Start on rented infrastructure, with a deployment you can move to your own servers as your requirements change", icon: Cloud },
  { title: "On-premises", description: "Keep knowledge, agents, access rules and logs together on infrastructure your organization manages", icon: Database },
  { title: "Kubernetes", description: "Run platform services in your cluster and connect existing identity, storage and monitoring", icon: Network },
  { title: "Closed environment", description: "Use local models and internal delivery of images and updates when external API and cloud calls are not permitted", icon: Server },
];

export default function DeploymentPage() {
  return (
    <PlatformFrame
      headerVariant="overlay"
      contactTitle={<>Bring the next AI workflow<br />into everyday work</>}
      contactImage={{ src: "/media/closing.webp", width: 1200, height: 495, position: "center bottom" }}
    >
      <div className={styles.page}>
        <section className={styles.hero} aria-labelledby="deployment-title">
          <picture className={styles.heroImage}>
            <source media="(max-width: 700px)" srcSet="/media/century/photos/team-workshop-768.webp" />
            <img src="/media/century/photos/team-workshop.webp" srcSet="/media/century/photos/team-workshop-768.webp 768w, /media/century/photos/team-workshop.webp 1600w" sizes="100vw" alt="" width={1600} height={900} fetchPriority="high" />
          </picture>
          <div className={styles.heroShade} aria-hidden="true" />
          <div className={styles.heroContent}>
            <h1 id="deployment-title">From a scoped pilot<br /> to AI your team can run</h1>
            <p>Agree the outcome, test the workflow and choose the infrastructure, then build the skills to operate and extend it with your own team</p>
          </div>
        </section>

        <section className={styles.teamSection} aria-labelledby="delivery-team-title">
          <div className={styles.shell}>
            <div className={styles.teamIntro}>
              <div>
                <h2 id="delivery-team-title">A delivery team<br />built around the process</h2>
                <p>Century pairs business analysis with engineering. Together we turn process requirements into tested workflows and train your developers to maintain them</p>
              </div>
              <div className={styles.teamStatement}><span>Business + technology</span><p>Built<br />together</p></div>
            </div>
            <div className={styles.roleCards}>
              <article className={styles.roleCard}>
                <img src="/media/deployment.webp" alt="A workshop participant explaining a process to colleagues" width={1200} height={670} loading="lazy" />
                <div className={styles.cardShade} aria-hidden="true" />
                <div className={styles.cardContent}>
                  <span className={styles.cardLabel}>Engineering</span>
                  <h3>Build, test and integrate</h3>
                  <p>Connect approved sources and business systems, assemble agents and workflows, and test them against agreed questions and control datasets</p>
                </div>
              </article>
              <article className={styles.roleCard}>
                <img src="/media/century/photos/banking-advice.webp" srcSet="/media/century/photos/banking-advice-768.webp 768w, /media/century/photos/banking-advice.webp 1600w" sizes="(max-width: 700px) 100vw, 40vw" alt="People reviewing information during an advisory conversation" width={1600} height={900} loading="lazy" />
                <div className={styles.cardShade} aria-hidden="true" />
                <div className={styles.cardContent}>
                  <span className={styles.cardLabel}>Business analysis</span>
                  <h3>Define value and acceptance</h3>
                  <p>Record owners, workload and current effort, assess data readiness and risks, then agree the expected effect and success criteria with the process owner</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.ownershipSection} id="delivery-path" aria-labelledby="delivery-path-title">
          <div className={styles.shell}>
            <h2 id="delivery-path-title">From building with Century<br />to ownership within your team</h2>
            <DeploymentJourney />
          </div>
        </section>

        <section className={styles.environmentsSection} id="deployment-options" aria-labelledby="environments-title">
          <div className={styles.narrowShell}>
            <div className={styles.environmentHeading}>
              <h2 id="environments-title">The right place to run</h2>
              <p>Use owned or rented infrastructure, with models and compute<br className={styles.desktopBreak} /> chosen for your data and workloads</p>
            </div>
            <div className={styles.environmentGrid}>
              {environments.map(({ title, description, icon: Icon }) => (
                <article key={title}><Icon size={36} strokeWidth={1.25} aria-hidden="true" /><h3>{title}</h3><p>{description}</p></article>
              ))}
            </div>
            <div className={styles.environmentNote}>
              <p>Size compute, storage and any GPU around the selected models, document volumes and concurrency; agree data flows and support access before rollout</p>
              <a href="/security/">Security considerations<ArrowUpRight size={18} aria-hidden="true" /></a>
            </div>
          </div>
        </section>
      </div>
    </PlatformFrame>
  );
}
