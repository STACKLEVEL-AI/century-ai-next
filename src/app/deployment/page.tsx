import { ArrowUpRight, Cloud, Database, Network, Server } from "lucide-react";
import PlatformFrame from "@/components/platform/PlatformFrame";
import DeploymentJourney from "@/components/platform/DeploymentJourney";
import styles from "@/components/platform/DeploymentPage.module.css";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Deployment",
  "Bring enterprise AI into everyday work with Century. Connect the technical implementation, the business outcome and the people who will operate it.",
  "/deployment",
);

const environments = [
  { title: "Shared cloud", description: "A shared environment with data separation, access boundaries and service responsibilities defined for your workflow.", icon: Cloud },
  { title: "Dedicated environment", description: "A separate environment for organization-specific configuration, access requirements and operating arrangements.", icon: Database },
  { title: "Your own cloud", description: "Build around the cloud infrastructure your organization manages, with your team involved in security and operations.", icon: Network },
  { title: "On-premises", description: "Plan around local infrastructure, including the models, integrations and support needed to operate the agreed workflow.", icon: Server },
];

export default function DeploymentPage() {
  return (
    <PlatformFrame
      headerVariant="overlay"
      contactTitle={<>Bring the next AI workflow<br />into everyday work.</>}
      contactImage={{ src: "/media/platform/deployment/contact.webp", width: 1920, height: 700, position: "center bottom" }}
    >
      <div className={styles.page}>
        <section className={styles.hero} aria-labelledby="deployment-title">
          <picture className={styles.heroImage}>
            <source media="(max-width: 700px)" srcSet="/media/platform/deployment/hero-mobile.webp" />
            <img src="/media/platform/deployment/hero.webp" srcSet="/media/platform/deployment/hero-1280.webp 1280w, /media/platform/deployment/hero.webp 2000w" sizes="100vw" alt="" width={2000} height={1116} fetchPriority="high" />
          </picture>
          <div className={styles.heroShade} aria-hidden="true" />
          <div className={styles.heroContent}>
            <h1 id="deployment-title">Enterprise AI succeeds<br /> when it becomes everyday work.</h1>
            <p>Century works with your people to connect the data, build a useful first workflow and establish the ownership to run it.</p>
          </div>
        </section>

        <section className={styles.teamSection} aria-labelledby="delivery-team-title">
          <div className={styles.shell}>
            <div className={styles.teamIntro}>
              <div>
                <h2 id="delivery-team-title">A delivery team<br />close to the work.</h2>
                <p>Technical implementation and business ownership belong together. We work through the sources, systems and decisions with the people who know the process.</p>
              </div>
              <div className={styles.teamStatement}><span>Business + technology</span><p>Built<br />together.</p></div>
            </div>
            <div className={styles.roleCards}>
              <article className={styles.roleCard}>
                <img src="/media/platform/deployment/engineering.webp" alt="People discussing an implementation during a workshop" width={1456} height={816} loading="lazy" />
                <div className={styles.cardShade} aria-hidden="true" />
                <div className={styles.cardContent}>
                  <span className={styles.cardLabel}>Engineering</span>
                  <h3>Make the pieces work together.</h3>
                  <p>Connect approved data, tools and workflows. Resolve the access, integration and review requirements that turn a concept into something people can use.</p>
                </div>
              </article>
              <article className={styles.roleCard}>
                <img src="/media/platform/deployment/strategy.webp" alt="A person moving through a collaborative workspace" width={765} height={542} loading="lazy" />
                <div className={styles.cardShade} aria-hidden="true" />
                <div className={styles.cardContent}>
                  <span className={styles.cardLabel}>Delivery strategy</span>
                  <h3>Make the outcome useful.</h3>
                  <p>Agree the use case, the owner and the evidence that matters. Bring the people doing the work into the decisions about adoption and what comes next.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.ownershipSection} id="delivery-path" aria-labelledby="delivery-path-title">
          <div className={styles.shell}>
            <h2 id="delivery-path-title">From building with Century<br />to ownership within your team.</h2>
            <DeploymentJourney />
          </div>
        </section>

        <section className={styles.environmentsSection} id="deployment-options" aria-labelledby="environments-title">
          <div className={styles.narrowShell}>
            <div className={styles.environmentHeading}>
              <h2 id="environments-title">The right place to run.</h2>
              <p>Choose the deployment model around your infrastructure,<br className={styles.desktopBreak} /> data requirements and operating responsibilities.</p>
            </div>
            <div className={styles.environmentGrid}>
              {environments.map(({ title, description, icon: Icon }) => (
                <article key={title}><Icon size={36} strokeWidth={1.25} aria-hidden="true" /><h3>{title}</h3><p>{description}</p></article>
              ))}
            </div>
            <div className={styles.environmentNote}>
              <p>Processing location, retention, external services and support access are agreed for each deployment.</p>
              <a href="/security/">Security considerations<ArrowUpRight size={18} aria-hidden="true" /></a>
            </div>
          </div>
        </section>
      </div>
    </PlatformFrame>
  );
}
