import { ArrowUpRight, Network, Plus, Server } from "lucide-react";
import PlatformFrame from "@/components/platform/PlatformFrame";
import DeploymentJourney from "@/components/platform/DeploymentJourney";
import styles from "@/components/platform/DeploymentPage.module.css";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Deployment",
  "Deploy Century around your data, systems and access rules. Build and test workflows with your team, then transfer the skills and practices to maintain them",
  "/deployment",
);

export default function DeploymentPage() {
  return (
    <PlatformFrame headerVariant="overlay" contactTitle={<>Bring us<br />a workflow</>}>
      <div className={styles.page}>
        <section className={styles.hero} aria-labelledby="deployment-title">
          <picture className={styles.heroImage}>
            <source media="(max-width: 700px)" srcSet="/media/century/photos/deployment-hero-mobile.webp" />
            <img src="/media/century/photos/deployment-hero.webp" srcSet="/media/century/photos/deployment-hero-960.webp 960w, /media/century/photos/deployment-hero.webp 1672w" sizes="100vw" alt="" width={1672} height={941} fetchPriority="high" />
          </picture>
          <div className={styles.heroShade} aria-hidden="true" />
          <div className={styles.heroContent}>
            <h1 id="deployment-title">Bring AI into<br /> everyday work</h1>
            <p>A ready platform, connected to your systems. Build the first workflows with Century, test them on your tasks and give your team the skills to run them</p>
          </div>
        </section>

        <section className={styles.teamSection} id="your-team" aria-labelledby="team-title">
          <div className={styles.shell}>
            <div className={styles.teamIntro}>
              <h2 id="team-title">The workflow and<br /> the skills to run it</h2>
              <div className={styles.teamCopy}>
                <p>A service assistant needs the right documents and permissions. A document workflow needs reliable extraction and a point for human review. We define the useful result with its owner, then connect it to the systems the team uses</p>
                <p>Century brings the platform, engineering and training. Your people bring the process knowledge. Together, we build the workflow, test its behaviour and prepare the people who will maintain it</p>
              </div>
            </div>
            <div className={styles.roleCards}>
              <article className={styles.roleCard}>
                <img src="/media/century/photos/team-collaboration.webp" srcSet="/media/century/photos/team-collaboration-768.webp 768w, /media/century/photos/team-collaboration.webp 1600w" sizes="(max-width: 800px) 100vw, (max-width: 1400px) 54vw, 676px" alt="Colleagues discussing their work around a shared table" width={1600} height={900} loading="lazy" decoding="async" />
                <div className={styles.cardShade} aria-hidden="true" />
                <div className={styles.cardContent}>
                  <span className={styles.cardLabel}>Your developers lead</span>
                  <h3>Build from day one</h3>
                  <p>Your team starts building on Century. We train your developers, advise on architecture and help with difficult integrations and new connectors</p>
                </div>
              </article>
              <article className={styles.roleCard}>
                <img src="/media/century/photos/team-workshop.webp" srcSet="/media/century/photos/team-workshop-768.webp 768w, /media/century/photos/team-workshop.webp 1600w" sizes="(max-width: 800px) 100vw, (max-width: 1400px) 46vw, 588px" alt="A team reviewing a workflow together at a workshop table" width={1600} height={900} loading="lazy" decoding="async" />
                <div className={styles.cardShade} aria-hidden="true" />
                <div className={styles.cardContent}>
                  <span className={styles.cardLabel}>Century leads the first builds</span>
                  <h3>Learn by building together</h3>
                  <p>We build the first workflows with your developers, from requirements through acceptance. Your team learns to maintain them, test changes and lead the next implementations</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.ownershipSection} id="delivery-path" aria-labelledby="delivery-path-title">
          <div className={styles.narrowShell}>
            <h2 id="delivery-path-title">From the first build<br />to everyday use</h2>
            <DeploymentJourney />
          </div>
        </section>

        <section className={styles.environmentsSection} id="deployment-options" aria-labelledby="environment-title">
          <div className={styles.shell}>
            <div className={styles.environmentHeading}>
              <h2 id="environment-title">Your environment<br />Your data rules</h2>
              <p>Choose where Century runs and which models each task uses. These are separate decisions, shaped by the workload and the information each model may receive</p>
            </div>
            <div className={styles.environmentGrid}>
              <article>
                <Server size={36} strokeWidth={1.2} aria-hidden="true" />
                <span className={styles.detailLabel}>Platform environment</span>
                <h3>Your servers or rented infrastructure</h3>
                <p>Keep knowledge, workflows, access rules and logs in the agreed Century environment. Size the deployment for the document volumes, concurrent work and services it needs to support</p>
              </article>
              <article>
                <Network size={36} strokeWidth={1.2} aria-hidden="true" />
                <span className={styles.detailLabel}>Model connections</span>
                <h3>Models selected for the task</h3>
                <p>Evaluate local or permitted external models on your examples. Define which data each model may receive, record its use and size model infrastructure for the chosen workload</p>
              </article>
            </div>
            <details className={styles.readiness}>
              <summary>What we agree before installation<Plus size={19} aria-hidden="true" /></summary>
              <dl>
                <div><dt>Infrastructure</dt><dd>Compute, storage, network access, deployment form and how images and updates reach the environment</dd></div>
                <div><dt>Identity & data</dt><dd>Required identity integration, roles, knowledge access, tool permissions and permitted model data flows</dd></div>
                <div><dt>Operations</dt><dd>Logging and monitoring integrations, support access, maintainers and checks for operational acceptance</dd></div>
              </dl>
            </details>
            <div className={styles.environmentNote}>
              <p>Still deciding where to start? See how Century assesses processes and helps your team choose what to automate</p>
              <div className={styles.relatedLinks}>
                <a href="/ai-transformation/">Explore AI Transformation<ArrowUpRight size={17} aria-hidden="true" /></a>
                <a href="/security/">Security & governance<ArrowUpRight size={17} aria-hidden="true" /></a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PlatformFrame>
  );
}
