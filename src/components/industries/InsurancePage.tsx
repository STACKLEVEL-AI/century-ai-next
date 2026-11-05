import { ChartNoAxesColumnIncreasing, Expand, Settings2 } from "lucide-react";
import Header from "@/components/Header";
import TelegramLink from "@/components/TelegramLink";
import { companyLinks, industryLinks, platformLinks } from "@/lib/navigation";
import styles from "./InsurancePage.module.css";

const benefits = [
  { title: "Flexible capacity", description: "Give teams room to handle busy periods by reducing repetitive work and paperwork.", icon: ChartNoAxesColumnIncreasing },
  { title: "Business growth", description: "Help people prepare relevant proposals with a clearer view of customer needs and policy information.", icon: Expand },
  { title: "Efficient operations", description: "Connect the information behind claims, underwriting and service, with a clear next step for every task.", icon: Settings2 },
];

const workflows = [
  { title: "Sales and underwriting", description: "Prepare submissions, find missing information and bring relevant policy guidance to the reviewer." },
  { title: "Policy service and renewals", description: "Find coverage information, prepare policy changes and help teams respond with the right context." },
  { title: "Claims handling", description: "Organise incoming documents, assemble the claim history and prepare a case for assessment." },
  { title: "Risk and oversight", description: "Surface relevant evidence, document the review and keep responsibility with the right person." },
];

const reasons = [
  { title: "Advanced AI, applied to real work", description: "Select models around a defined task, evaluate their output and keep the information behind an answer visible to the people using it.", image: "frontier-ai.png", alt: "An AI model surrounded by evaluation, accuracy, guardrails and deployment controls" },
  { title: "One platform for the entire insurer", description: "Bring knowledge and workflows together across insurance teams. Plan connections to existing systems around the scope of each deployment.", image: "platform.svg", alt: "Century connects property, life and health insurance workflows with policy systems, CRM and core systems" },
  { title: "Control and traceability, by design", description: "Define access, source boundaries and review responsibilities before rollout. Discuss retention, hosting and compliance requirements for your environment.", image: "audit-ready.png", alt: "A document surrounded by a protective field of data points" },
  { title: "A team that delivers alongside yours", description: "Work with Century from the first scoped workflow through implementation and handover, with clear ownership and practical support for your team.", image: "deployment-partner.png", alt: "A shared workspace connecting people, delivery and operational knowledge" },
];

function InsuranceFooter() {
  return <footer className={styles.footer}>
    <div className={styles.footerInner}>
      <div className={styles.footerLead}>
        <a href="/" aria-label="Century home"><img src="/brand/century-logo-white.svg" alt="Century" width={221} height={58} /></a>
        <p>A new chapter for your insurance operations.</p>
        <TelegramLink className={styles.lightButton}>Get in touch</TelegramLink>
        <small>© {new Date().getFullYear()} Century.</small>
      </div>
      <nav className={styles.footerNav} aria-label="Footer navigation">
        <div><h2>Platform</h2>{platformLinks.map(link => <a href={link.href} key={link.href}>{link.title}</a>)}</div>
        <div><h2>Industries</h2>{industryLinks.map(link => <a href={link.href} key={link.href}>{link.title}</a>)}</div>
        <div><h2>Company</h2>{companyLinks.map(link => <a href={link.href} key={link.href}>{link.title}</a>)}<a href="/blog/">Blog</a></div>
        <div><h2>Social</h2><TelegramLink className="">Telegram</TelegramLink></div>
        <div><h2>Legal</h2><a href="/privacy/">Privacy information</a><a href="/security/">Security &amp; control</a></div>
      </nav>
    </div>
  </footer>;
}

/** Insurance has its own reference layout; other industries keep their existing template. */
export default function InsurancePage() {
  return <div className={styles.page}>
    <Header variant="overlay" showAnnouncement={false} />
    <main className={`inner-page ${styles.main}`} id="main-content" tabIndex={-1}>
      <section className={styles.hero} aria-labelledby="insurance-title">
        <picture className={styles.heroPicture}>
          <source media="(max-width: 879px)" srcSet="/media/insurance/hero-mobile.webp" />
          <img src="/media/insurance/hero.webp" srcSet="/media/insurance/hero-1600.webp 1600w, /media/insurance/hero.webp 2560w" sizes="100vw" alt="" width={2560} height={1429} fetchPriority="high" />
        </picture>
        <div className={styles.heroShade} />
        <div className={styles.heroContent}>
          <h1 id="insurance-title">Insurance</h1>
          <div className={styles.heroDescription}><p>Bring complex insurance workflows into everyday operation, with clear oversight from start to finish.</p></div>
        </div>
      </section>

      <section className={styles.benefits} aria-labelledby="insurance-benefits-title">
        <div className={styles.benefitBackground} aria-hidden="true" />
        <div className={styles.container}>
          <h2 id="insurance-benefits-title">Transform your insurance operations with AI</h2>
          <div className={styles.benefitGrid}>
            {benefits.map(({ title, description, icon: Icon }) => <article className={styles.benefit} key={title}>
              <Icon size={32} strokeWidth={1.15} aria-hidden="true" />
              <div><h3>{title}</h3><p>{description}</p></div>
            </article>)}
          </div>
        </div>
      </section>

      <section className={styles.workflows} aria-labelledby="insurance-workflows-title">
        <div className={styles.workflowLayout}>
          <div className={styles.workflowCopy}>
            <h2 id="insurance-workflows-title">Streamline your most critical workflows</h2>
            <div className={styles.workflowGrid}>
              {workflows.map(({ title, description }) => <article className={styles.workflow} key={title}><h3>{title}</h3><p>{description}</p></article>)}
            </div>
          </div>
          <img className={styles.workflowPhoto} src="/media/insurance/workflows.webp" alt="An insurance specialist reviewing a claim on a laptop" width={1920} height={1072} loading="lazy" />
        </div>
      </section>

      <section className={styles.why} aria-labelledby="insurance-why-title">
        <div className={styles.whyHeading}>
          <h2 id="insurance-why-title">Why insurers choose Century</h2>
          <p>Connect the knowledge, people and systems behind each insurance workflow. Begin with a clear scope, keep review visible, and give your teams a practical foundation they can build on across the operation.</p>
        </div>
        <div className={styles.reasonList}>
          {reasons.map(({ title, description, image, alt }) => <article className={styles.reason} key={title} tabIndex={0}>
            <div className={styles.reasonInner}>
              <h3>{title}</h3>
              <img className={styles.reasonImage} src={`/media/insurance/${image}`} alt={alt} width={1280} height={808} loading="lazy" />
              <p>{description}</p>
            </div>
          </article>)}
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="insurance-contact-title">
        <div className={styles.ctaBackground} aria-hidden="true" />
        <div className={styles.ctaContent}><h2 id="insurance-contact-title">Build your next chapter in insurance with Century</h2><TelegramLink className={styles.lightButton}>Get in touch</TelegramLink></div>
      </section>
    </main>
    <InsuranceFooter />
  </div>;
}
