import { ArrowUpRight, Eye, ListChecks, Network, Scale } from "lucide-react";
import PlatformFrame from "@/components/platform/PlatformFrame";
import GatewayWorkspace from "@/components/platform/GatewayWorkspace";
import GatewayIllustration, { GatewayMap, type GatewayIllustrationKind } from "@/components/platform/GatewayIllustrations";
import OperatingLayerRelated from "@/components/platform/OperatingLayerRelated";
import { pageMetadata } from "@/lib/metadata";
import styles from "@/components/platform/Gateway.module.css";

export const metadata = pageMetadata("Century AI Gateway", "Connect models through one gateway, control which data they can use and evaluate quality on your own documents and questions", "/ai-gateway");

const capabilities: { title: string; description: string; illustration: GatewayIllustrationKind }[] = [
  { title: "One gateway for connected models", description: "Connect language, transcription, OCR and embedding models through a shared gateway, with APIs for your applications and agents", illustration: "connect" },
  { title: "See usage beside quality", description: "Review response timing, token use and request cost alongside answer quality to understand what each workflow needs to operate", illustration: "usage" },
  { title: "Apply your access rules", description: "Set roles for the people and agents using company knowledge and tools, with permissions defined for the sources each workflow needs", illustration: "access" },
  { title: "Choose models for each step", description: "Select a model for each workflow step and compare cloud and self-hostable options on the same tasks before making a production decision", illustration: "routing" },
  { title: "Control where data goes", description: "Define which data may be sent to each model and record those decisions in logs, with cloud processing governed by your organisation's policies", illustration: "privacy" },
  { title: "Evaluate on your own work", description: "Test answers against agreed control questions, check retrieved sources and citations, and review feedback before expanding a workflow", illustration: "observe" },
];

const outcomes = [
  { title: "A separate model layer", text: "Keep applications and workflows connected to the platform while choosing models for their specific tasks", icon: Network },
  { title: "Evidence for model choices", text: "Compare answers on the same documents and questions, then use measured quality to guide the choice", icon: Eye },
  { title: "Visible operating costs", text: "Review request cost, resource use and response time alongside the value the workflow is meant to deliver", icon: Scale },
  { title: "Rules that stay inspectable", text: "Keep data permissions and activity logs available to the people responsible for reviewing the workflow", icon: ListChecks },
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
          <h1 id="gateway-title">Choose models<br />Keep data use under control</h1>
          <p>Connect models, set data rules and evaluate quality on your own work</p>
        </div>
        <div className={styles.heroWorkspace}><GatewayWorkspace /></div>
      </section>

      <section className={styles.connections} aria-labelledby="gateway-connections">
        <div className={styles.container}>
          <div className={styles.sectionHeading}><h2 id="gateway-connections">Connect your applications<br />to the model layer</h2><p>Give people, applications and agents a common gateway to models and tools, with the permissions and data policies each workflow needs</p></div>
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
            <h2 id="gateway-decisions">Test the fit<br />Keep the evidence</h2>
            <p>Model quality depends on the task, the documents and the questions, so compare options on representative work before committing to a production setup</p>
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
