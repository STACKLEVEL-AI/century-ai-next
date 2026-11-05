import { ArrowDown, ArrowUpRight, Plus } from "lucide-react";
import TelegramLink from "@/components/TelegramLink";
import PlatformFrame from "@/components/platform/PlatformFrame";
import DeploymentJourney from "@/components/platform/DeploymentJourney";
import styles from "@/components/platform/DeploymentPage.module.css";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Deployment",
  "Turn a business process into working AI with Century: scope the task, evaluate the workflow, configure your environment and build the skills to operate and improve it",
  "/deployment",
);

const approaches = [
  { title: "Agentic", description: "Repeatable work with defined inputs, outcomes and human checkpoints" },
  { title: "RPA", description: "Deterministic transfers and checks handled by integrations or scripts" },
  { title: "Chat", description: "Knowledge support for expert work, with the employee making the decisions" },
  { title: "Redesign", description: "Improve the process, rules or data before introducing automation" },
  { title: "Human-only", description: "Keep judgment, negotiation and accountable decisions with people" },
];

const roles = [
  { title: "Process owners", description: "Explain the work, provide representative examples and agree what a useful result looks like" },
  { title: "IT & security", description: "Define the environment, access and data requirements, and review the integration plan" },
  { title: "Your developers", description: "Build and test alongside Century, maintain the workflows and lead the next use cases" },
  { title: "Century", description: "Bring the platform, analysis and engineering expertise, training and help with complex integrations" },
];

const evidence = [
  { title: "Quality", description: "Test extraction, answers or usable drafts against a control set agreed with the people who know the work" },
  { title: "Process impact", description: "Compare processing time and manual effort with the starting baseline, using measures relevant to the task" },
  { title: "Operational readiness", description: "Check access, integrations, human review and the responsibilities for running and maintaining the workflow" },
];

export default function DeploymentPage() {
  return (
    <PlatformFrame headerVariant="light" showContact={false}>
      <div className={styles.page}>
        <section className={styles.hero} aria-labelledby="deployment-title">
          <div className={styles.shell}>
            <div className={styles.heroGrid}>
              <div className={styles.heroContent}>
                <p className={styles.eyebrow}>Century deployment</p>
                <h1 id="deployment-title">From process<br />to working AI</h1>
                <p className={styles.heroLead}>A ready platform, a practical delivery method and the skills to keep improving. We work with your team to define the task, test the result and put it to work in your environment</p>
                <div className={styles.heroActions}>
                  <TelegramLink className={styles.primaryAction}>Discuss your process</TelegramLink>
                  <a href="#delivery-path" className={styles.textLink}>How deployment works<ArrowDown size={17} aria-hidden="true" /></a>
                </div>
              </div>
              <figure className={styles.heroFigure}>
                <picture>
                  <source media="(max-width: 700px)" srcSet="/media/century/photos/team-workshop-768.webp" />
                  <img src="/media/century/photos/team-workshop.webp" srcSet="/media/century/photos/team-workshop-768.webp 768w, /media/century/photos/team-workshop.webp 1600w" sizes="(max-width: 800px) calc(100vw - 40px), 42vw" alt="Colleagues reviewing a process together at a workshop table" width={1600} height={900} fetchPriority="high" />
                </picture>
                <figcaption>Process knowledge and engineering, brought together</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <nav className={styles.sectionNav} aria-label="On this page">
          <div className={styles.shell}>
            <a href="#delivery-path">Delivery path</a>
            <a href="#your-team">Your team</a>
            <a href="#acceptance">Acceptance</a>
            <a href="#deployment-options">Infrastructure</a>
          </div>
        </nav>

        <section className={styles.section} id="delivery-path" aria-labelledby="delivery-path-title">
          <div className={styles.shell}>
            <div className={styles.sectionHeading}>
              <div><p className={styles.eyebrow}>The delivery path</p><h2 id="delivery-path-title">Clear work<br />at every step</h2></div>
              <p>Start with a bounded process and an agreed outcome. The sequence and scope adapt to your data, infrastructure and team readiness; assessment, building and learning can overlap</p>
            </div>
            <DeploymentJourney />
            <div className={styles.approaches}>
              <h3>Choose the right approach for the task</h3>
              <p>Assessment considers value, complexity and control points before deciding how the work should change</p>
              <ul>
                {approaches.map(approach => <li key={approach.title}><h4>{approach.title}</h4><p>{approach.description}</p></li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.teamSection}`} id="your-team" aria-labelledby="team-title">
          <div className={styles.shell}>
            <div className={styles.sectionHeading}>
              <div><p className={styles.eyebrow}>People & ownership</p><h2 id="team-title">Built with the people<br />who will run it</h2></div>
              <p>Your team gains the method as well as the platform: how to specify a workflow, build it, test it and keep it useful as the business changes</p>
            </div>
            <div className={styles.workingModes}>
              <article>
                <span className={styles.detailLabel}>Start with your developers</span>
                <h3>Your team builds from day one</h3>
                <p>Century trains your developers and supports architecture, difficult integrations and new connectors. Your team applies the method directly to its own workflows</p>
              </article>
              <article>
                <span className={styles.detailLabel}>Start by building together</span>
                <h3>We co-build the first workflows</h3>
                <p>Work through requirements, design, implementation and acceptance together. Then hand over maintenance practices so your developers can lead the next scenarios</p>
              </article>
            </div>
            <dl className={styles.roles}>
              {roles.map(role => <div key={role.title}><dt>{role.title}</dt><dd>{role.description}</dd></div>)}
            </dl>
          </div>
        </section>

        <section className={`${styles.section} ${styles.evidenceSection}`} id="acceptance" aria-labelledby="acceptance-title">
          <div className={styles.shell}>
            <div className={styles.sectionHeading}>
              <div><p className={styles.eyebrow}>Acceptance & improvement</p><h2 id="acceptance-title">Evidence before<br />expansion</h2></div>
              <p>Agree the measures before building, then review the result with the process owner. Each workflow has its own acceptance criteria and a defined way to capture feedback</p>
            </div>
            <div className={styles.evidenceGrid}>
              {evidence.map((item, index) => <article key={item.title}><span className={styles.evidenceNumber}>0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}
            </div>
            <p className={styles.evidenceNote}>A pilot can use synthetic examples when access to real data is restricted. Results on real data still need to be validated in the approved operating environment</p>
          </div>
        </section>

        <section className={styles.section} id="deployment-options" aria-labelledby="environment-title">
          <div className={styles.shell}>
            <div className={styles.sectionHeading}>
              <div><p className={styles.eyebrow}>Infrastructure & control</p><h2 id="environment-title">Your environment<br />Your data rules</h2></div>
              <p>Where the platform runs and which models it uses are separate decisions. Both follow the workflow, your operating requirements and the data you permit each model to receive</p>
            </div>
            <div className={styles.environmentGrid}>
              <article>
                <span className={styles.detailLabel}>01 / Platform environment</span>
                <h3>Owned or rented infrastructure</h3>
                <p>Configure Century on your own servers or rented infrastructure. Knowledge, agents, workflows, access rules and logs sit within the agreed platform environment</p>
                <p className={styles.environmentDetail}>Capacity follows document volumes, concurrency and the selected workload</p>
              </article>
              <article>
                <span className={styles.detailLabel}>02 / Model connections</span>
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
            <a href="/security/" className={`${styles.textLink} ${styles.securityLink}`}>Explore security & governance<ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
        </section>

        <section className={styles.contact} id="contact" aria-labelledby="deployment-contact-title">
          <div className={styles.shell}>
            <div><h2 id="deployment-contact-title">Start with one process</h2><p>Bring its owner, the current workflow, a few examples and the outcome you want to improve</p></div>
            <TelegramLink className={styles.contactAction}>Discuss your process</TelegramLink>
          </div>
        </section>
      </div>
    </PlatformFrame>
  );
}
