import { ArrowUpRight, Network, Plus, Server } from "lucide-react";
import PlatformFrame from "@/components/platform/PlatformFrame";
import DeploymentJourney from "@/components/platform/DeploymentJourney";
import styles from "@/components/platform/DeploymentPage.module.css";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Deployment",
  "Bring an agreed workflow into operation with Century: configure your environment, connect approved systems, validate the result and equip your team to maintain it",
  "/deployment",
);

export default function DeploymentPage() {
  return (
    <PlatformFrame headerVariant="overlay" contactTitle={<>Put your next workflow<br />to work with Century</>}>
      <div className={styles.page}>
        <section className={styles.hero} aria-labelledby="deployment-title">
          <div className={styles.heroImage}>
            <img src="/media/century/photos/employee-workspace.webp" alt="A colleague in a contemporary office" width={1600} height={900} fetchPriority="high" />
          </div>
          <div className={styles.heroShade} aria-hidden="true" />
          <div className={styles.heroContent}>
            <h1 id="deployment-title">From a selected workflow<br /> to working AI</h1>
            <p>Configure the platform, connect your systems and validate the result in your environment. Build with Century and the people who will operate it</p>
          </div>
        </section>

        <section className={styles.teamSection} id="your-team" aria-labelledby="team-title">
          <div className={styles.shell}>
            <div className={styles.teamIntro}>
              <div>
                <h2 id="team-title">Built with the people<br /> who will run it</h2>
                <p>Start with a selected workflow, its owner and agreed acceptance criteria. Century brings the platform and engineering support; your business, IT and security teams bring the process knowledge and operating requirements</p>
              </div>
              <div className={styles.teamStatement}>
                <span>Two ways to work together</span>
                <p>Your team<br />+ Century</p>
              </div>
            </div>
            <div className={styles.roleCards}>
              <article className={styles.roleCard}>
                <img src="/media/century/photos/team-collaboration.webp" srcSet="/media/century/photos/team-collaboration-768.webp 768w, /media/century/photos/team-collaboration.webp 1600w" sizes="(max-width: 1439px) 100vw, 58vw" alt="Colleagues discussing their work around a shared table" width={1600} height={900} loading="lazy" decoding="async" />
                <div className={styles.cardShade} aria-hidden="true" />
                <div className={styles.cardContent}>
                  <span className={styles.cardLabel}>Build with your developers</span>
                  <h3>Your team builds from day one</h3>
                  <p>Century trains your developers and supports architecture, difficult integrations and new connectors. Your team applies the method directly to its own workflows</p>
                </div>
              </article>
              <article className={styles.roleCard}>
                <img src="/media/century/photos/team-workshop.webp" srcSet="/media/century/photos/team-workshop-768.webp 768w, /media/century/photos/team-workshop.webp 1600w" sizes="(max-width: 1439px) 100vw, 42vw" alt="A team reviewing a workflow together at a workshop table" width={1600} height={900} loading="lazy" decoding="async" />
                <div className={styles.cardShade} aria-hidden="true" />
                <div className={styles.cardContent}>
                  <span className={styles.cardLabel}>Co-build with Century</span>
                  <h3>Build the first workflows together</h3>
                  <p>Work through requirements, design, implementation and acceptance with Century. Your developers take forward the testing and maintenance practices needed to lead the next workflows</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.ownershipSection} id="delivery-path" aria-labelledby="delivery-path-title">
          <div className={styles.narrowShell}>
            <h2 id="delivery-path-title">From the first build<br />to everyday operation</h2>
            <DeploymentJourney />
          </div>
        </section>

        <section className={styles.environmentsSection} id="deployment-options" aria-labelledby="environment-title">
          <div className={styles.shell}>
            <div className={styles.environmentHeading}>
              <h2 id="environment-title">Your environment<br />Your data rules</h2>
              <p>Where the platform runs and which models it uses are separate decisions. Both follow your workload, operating requirements and data policies</p>
            </div>
            <div className={styles.environmentGrid}>
              <article>
                <Server size={36} strokeWidth={1.2} aria-hidden="true" />
                <span className={styles.detailLabel}>Platform environment</span>
                <h3>Owned or rented infrastructure</h3>
                <p>Configure Century on your own servers or rented infrastructure. Knowledge, agents, workflows, access rules and logs sit within the agreed platform environment</p>
                <p className={styles.environmentDetail}>Capacity follows document volumes, concurrency and the selected workload</p>
              </article>
              <article>
                <Network size={36} strokeWidth={1.2} aria-hidden="true" />
                <span className={styles.detailLabel}>Model connections</span>
                <h3>Local or permitted external models</h3>
                <p>Evaluate suitable models for each task. Use local models or external providers only where data rules allow, with explicit decisions about what may be sent and how usage is logged</p>
                <p className={styles.environmentDetail}>Compute and any GPU requirements depend on the models you choose</p>
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
              <p>Still deciding what to automate? Explore how Century helps assess processes, choose the right approach and set priorities</p>
              <div className={styles.relatedLinks}>
                <a href="/ai-transformation/">Explore AI transformation<ArrowUpRight size={17} aria-hidden="true" /></a>
                <a href="/security/">Security & governance<ArrowUpRight size={17} aria-hidden="true" /></a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PlatformFrame>
  );
}
