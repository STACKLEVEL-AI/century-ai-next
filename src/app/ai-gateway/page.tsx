import { ArrowUpRight, Eye, ListChecks, Network, Scale } from "lucide-react";
import PlatformFrame from "@/components/platform/PlatformFrame";
import GatewayWorkspace from "@/components/platform/GatewayWorkspace";
import GatewayIllustration, { GatewayMap, type GatewayIllustrationKind } from "@/components/platform/GatewayIllustrations";
import OperatingLayerRelated from "@/components/platform/OperatingLayerRelated";
import { pageMetadata } from "@/lib/metadata";
import styles from "@/components/platform/Gateway.module.css";

export const metadata = pageMetadata("Century AI Gateway", "Explore model choices, response details and AI operating responsibilities through real views from the Century application.", "/ai-gateway");

const capabilities: { title: string; description: string; illustration: GatewayIllustrationKind }[] = [
  { title: "Connect your AI landscape", description: "Start with the applications, agents and providers involved in your workflow. Bring their interfaces, information flows and operating owners into one implementation plan.", illustration: "connect" },
  { title: "Put usage in context", description: "Inspect the signals behind an answer and the work it supports. Agree how usage and cost should be reviewed alongside quality and useful outcomes.", illustration: "usage" },
  { title: "Make model access deliberate", description: "Match access to a person's role, the task and the information involved. Define permissions and responsibilities before extending a workflow to another team.", illustration: "access" },
  { title: "Choose the right path", description: "Compare model suitability, response time and cost. Decide what the workflow should do when the preferred model or an external provider is unavailable.", illustration: "routing" },
  { title: "Define data boundaries", description: "Establish which information a process may use and where it may go. Review external processing, retention and the requirements of your organization.", illustration: "privacy" },
  { title: "Inspect the detail", description: "Keep response details and human feedback close to the work. Define the records and review process your team needs to understand exceptions and improve decisions.", illustration: "observe" },
];

const outcomes = [
  { title: "A shared operating picture", text: "Connect the discussion across teams, tools and workflows. Give the people responsible a common starting point.", icon: Network },
  { title: "Evidence behind decisions", text: "Use inspectable application details and workflow feedback when reviewing what is working and what needs attention.", icon: Eye },
  { title: "Deliberate model choices", text: "Discuss quality, cost and response time together. Match the model decision to the work it needs to support.", icon: Scale },
  { title: "Clear ownership", text: "Make access, data handling and escalation responsibilities explicit as the implementation grows.", icon: ListChecks },
];

export default function GatewayPage() {
  return <PlatformFrame headerVariant="overlay" showContact={false}>
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="gateway-title">
        <picture className={styles.heroBackdrop}>
          <img src="/media/strategy.webp" alt="" width={1054} height={1451} fetchPriority="high" />
        </picture>
        <div className={styles.heroShade} />
        <div className={styles.heroTitle}>
          <p className={styles.heroLockup}><img src="/brand/century-logo-white.svg" alt="Century" width={155} height={41} /><span>AI Gateway</span></p>
          <h1 id="gateway-title">A common control point<br />for enterprise AI.</h1>
          <p>Bring model choices, usage and operating responsibilities into a clearer picture.</p>
        </div>
        <div className={styles.heroWorkspace}><GatewayWorkspace /></div>
      </section>

      <section className={styles.connections} aria-labelledby="gateway-connections">
        <div className={styles.container}>
          <div className={styles.sectionHeading}><h2 id="gateway-connections">Connect the tools.<br />Keep the context.</h2><p>Start with the people, applications and providers in scope. Define how each connection should work and who owns it.</p></div>
          <GatewayMap />
        </div>
      </section>

      <section className={styles.features} aria-label="AI gateway capabilities">
        <div className={styles.container}>
          <div className={styles.featureGrid}>{capabilities.map(capability => <article key={capability.title} className={styles.featureCard}>
            <GatewayIllustration kind={capability.illustration} />
            <div className={styles.featureCopy}><h3>{capability.title}</h3><p>{capability.description}</p></div>
          </article>)}</div>
        </div>
      </section>

      <section className={styles.decisions} aria-labelledby="gateway-decisions">
        <div className={styles.container}>
          <div className={styles.sectionHeading + " " + styles.decisionIntro}>
            <h2 id="gateway-decisions">As AI grows,<br />keep the whole picture.</h2>
            <p>Different teams bring different tools and requirements. A shared view makes it easier to agree the boundaries, examine trade-offs and decide what to build next.</p>
          </div>
          <div className={styles.outcomeGrid}>{outcomes.map(({ title, text, icon: Icon }) => <article key={title}>
            <Icon size={28} strokeWidth={1.1} aria-hidden="true" /><h3>{title}</h3><p>{text}</p>
          </article>)}</div>
          <a className={styles.planningLink} href="/deployment/">Plan the implementation<ArrowUpRight size={18} aria-hidden="true" /></a>
        </div>
      </section>
      <OperatingLayerRelated current="ai-gateway" />
    </div>
  </PlatformFrame>;
}
